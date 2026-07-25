/**
 * Build an offline Sanskrit-English dataset from the Monier-Williams Sanskrit
 * Dictionary (1899), which is in the public domain.
 *
 *   pnpm tsx scripts/build-lexicon.ts
 *
 * Source: the Cologne Digital Sanskrit Dictionaries (CDSL) "mwxml" release,
 * https://www.sanskrit-lexicon.uni-koeln.de/scans/MWScan/2020/downloads/mwxml.zip
 * That archive holds `mw.xml` (one record per line, headwords in SLP1), its
 * DTD, and `mw-meta2.txt` documenting the markup conventions used below.
 *
 * The script is idempotent: the archive is only fetched when it is missing, and
 * it is only unpacked when `mw.xml` is missing. Delete `sources/lexicon/` to
 * force a clean rebuild.
 *
 * Homonyms are MERGED. Monier-Williams splits e.g. śrī into six numbered
 * homonyms plus dozens of continuation records; a reader looking the word up on
 * a website wants all of that under one heading, so every record sharing a
 * `<key1>` collapses into a single entry whose `senses` run in dictionary order
 * and whose `grammar` lists each distinct part-of-speech marker encountered.
 */

import { existsSync, closeSync, mkdirSync, openSync, readFileSync, statSync, writeFileSync, writeSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';

import Sanscript from '@indic-transliteration/sanscript';
import { XMLParser } from 'fast-xml-parser';

import { filterLexicon, lookup, type LexEntry } from './lib/lexicon';

const SOURCE_URL =
  'https://www.sanskrit-lexicon.uni-koeln.de/scans/MWScan/2020/downloads/mwxml.zip';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(moduleDir, '../sources/lexicon');
const ZIP_PATH = path.join(OUT_DIR, 'mwxml.zip');
const XML_PATH = path.join(OUT_DIR, 'xml/mw.xml');
const JSON_PATH = path.join(OUT_DIR, 'mw-normalized.json');

const SANITY_WORDS = [
  'śrī', 'mātṛ', 'devī', 'cakra', 'rāja', 'siṃha',
  'āsana', 'īśvarī', 'lalitā', 'sundarī', 'kāma', 'agni',
];

const transliterate = Sanscript as unknown as {
  t: (text: string, from: string, to: string) => string;
};

// ---------------------------------------------------------------------------
// Download + extract
// ---------------------------------------------------------------------------

async function ensureArchive(): Promise<void> {
  mkdirSync(OUT_DIR, { recursive: true });

  if (existsSync(ZIP_PATH) && statSync(ZIP_PATH).size > 0) {
    console.log(`archive already present, skipping download (${ZIP_PATH})`);
  } else {
    console.log(`downloading ${SOURCE_URL}`);
    const response = await fetch(SOURCE_URL);
    if (!response.ok) {
      throw new Error(`download failed: ${response.status} ${response.statusText}`);
    }
    writeFileSync(ZIP_PATH, Buffer.from(await response.arrayBuffer()));
    console.log(`wrote ${ZIP_PATH} (${mib(statSync(ZIP_PATH).size)})`);
  }

  if (existsSync(XML_PATH)) {
    console.log(`mw.xml already extracted, skipping unzip (${XML_PATH})`);
    return;
  }
  extractZip(ZIP_PATH, OUT_DIR);
  if (!existsSync(XML_PATH)) throw new Error(`archive did not contain xml/mw.xml`);
  console.log(`extracted ${XML_PATH} (${mib(statSync(XML_PATH).size)})`);
}

/**
 * Minimal store/deflate zip reader, so the build does not depend on an `unzip`
 * binary being on PATH.
 */
function extractZip(zipPath: string, destDir: string): void {
  const buf = readFileSync(zipPath);

  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i >= buf.length - 22 - 0xffff; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error('not a zip archive: no end-of-central-directory record');

  const fileCount = buf.readUInt16LE(eocd + 10);
  let offset = buf.readUInt32LE(eocd + 16);

  for (let i = 0; i < fileCount; i++) {
    if (buf.readUInt32LE(offset) !== 0x02014b50) throw new Error('corrupt central directory');

    const method = buf.readUInt16LE(offset + 10);
    const compressedSize = buf.readUInt32LE(offset + 20);
    const nameLength = buf.readUInt16LE(offset + 28);
    const extraLength = buf.readUInt16LE(offset + 30);
    const commentLength = buf.readUInt16LE(offset + 32);
    const localOffset = buf.readUInt32LE(offset + 42);
    const name = buf.toString('utf8', offset + 46, offset + 46 + nameLength);
    offset += 46 + nameLength + extraLength + commentLength;

    const target = path.join(destDir, name);
    if (!target.startsWith(destDir + path.sep)) throw new Error(`unsafe zip path: ${name}`);

    if (name.endsWith('/')) {
      mkdirSync(target, { recursive: true });
      continue;
    }

    const localNameLength = buf.readUInt16LE(localOffset + 26);
    const localExtraLength = buf.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const data = buf.subarray(dataStart, dataStart + compressedSize);

    if (method !== 0 && method !== 8) throw new Error(`unsupported zip method ${method}`);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, method === 0 ? data : inflateRawSync(data));
  }
}

// ---------------------------------------------------------------------------
// XML -> plain text
// ---------------------------------------------------------------------------

type XmlNode = Record<string, unknown>;

const parser = new XMLParser({
  preserveOrder: true,
  ignoreAttributes: false,
  attributeNamePrefix: '',
  attributesGroupName: ':@',
  textNodeName: '#text',
  trimValues: false,
  parseTagValue: false,
  parseAttributeValue: false,
  processEntities: true,
});

/**
 * Markup carrying no readable English: scan-page and column references, source
 * citations, Cologne bookkeeping, and cognate text in non-Latin scripts.
 */
const DROP_TAGS = new Set([
  'info', 'L', 'pc', 'pb', 'pcol', 'ls', 'mark', 'note', 'pic', 'lbinfo', 'edit',
  'hwtype', 'listinfo', 'srs', 'shortlong', 'C', 'sic', 'symbol', 'root', 'vlex',
  'type', 'old', 'gk', 'heb', 'arab', 'rus', 'mong', 'ocs', 'tib', 'zen', 'toch',
]);

const SPACE_TAGS = new Set(['br', 'lb', 'P', 'H']);

/** Placeholder for `<div n="to"/>`, which marks a new sense inside verb entries. */
const SENSE_BREAK = '\u0001';

interface RenderContext {
  /** Text of every `<lex>` element without a `type` attribute, in order. */
  lexMarkers: string[];
  infoLex?: string;
  infoVerb?: string;
}

function childrenOf(node: XmlNode, tag: string): XmlNode[] {
  const value = node[tag];
  return Array.isArray(value) ? (value as XmlNode[]) : [];
}

function attrsOf(node: XmlNode): Record<string, string> {
  return (node[':@'] as Record<string, string> | undefined) ?? {};
}

/** Concatenate raw text content, ignoring all markup. */
function rawText(nodes: XmlNode[]): string {
  let out = '';
  for (const node of nodes) {
    for (const tag of Object.keys(node)) {
      if (tag === ':@') continue;
      if (tag === '#text') out += String(node[tag]);
      else out += rawText(childrenOf(node, tag));
    }
  }
  return out;
}

/** `<s>` holds a Sanskrit word in SLP1; accents and length marks are editorial. */
function slp1ToIast(slp1: string): string {
  const cleaned = slp1
    .replace(/[/\\^_˘¯]/g, '')
    .replace(/—/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return '';

  // `√` (verbal root) and `°` (the part of a word the print left off) are
  // notation rather than sounds, so they bypass the transliterator. Dropping
  // the `°` would silently turn an abbreviation into a different word.
  return cleaned
    .split(/([√°˚])/)
    .map((part) => {
      if (part === '˚') return '°';
      if (part === '√' || part === '°') return part;
      return part.trim() ? transliterate.t(part, 'slp1', 'iast') : part;
    })
    .join('');
}

function render(nodes: XmlNode[], out: string[], ctx: RenderContext): void {
  for (const node of nodes) {
    for (const tag of Object.keys(node)) {
      if (tag === ':@') continue;

      if (tag === '#text') {
        out.push(String(node[tag]));
        continue;
      }

      const kids = childrenOf(node, tag);
      const attrs = attrsOf(node);

      if (tag === 'info') {
        if (attrs.lex && attrs.lex !== 'inh') ctx.infoLex ??= attrs.lex;
        if (attrs.verb) ctx.infoVerb ??= attrs.verb;
        continue;
      }
      if (DROP_TAGS.has(tag)) continue;
      if (SPACE_TAGS.has(tag)) {
        out.push(' ');
        continue;
      }

      switch (tag) {
        case 's':
          out.push(slp1ToIast(rawText(kids)));
          break;
        case 'ab':
        case 's1': {
          // `n` carries the expansion of a word the print abbreviated with a
          // trailing ˚, e.g. <ab n="according">accord˚</ab>.
          out.push(attrs.n ?? rawText(kids));
          break;
        }
        case 'lex': {
          const marker = collapse(renderToString(kids, ctx));
          if (!attrs.type && marker) ctx.lexMarkers.push(marker);
          out.push(` ${marker} `);
          break;
        }
        case 'div':
          if (attrs.n === 'to') out.push(SENSE_BREAK);
          render(kids, out, ctx);
          break;
        default:
          render(kids, out, ctx);
      }
    }
  }
}

function renderToString(nodes: XmlNode[], ctx: RenderContext): string {
  const out: string[] = [];
  render(nodes, out, ctx);
  return out.join('');
}

// ---------------------------------------------------------------------------
// Text cleanup
// ---------------------------------------------------------------------------

const collapse = (text: string) => text.replace(/\s+/g, ' ').trim();

/** Drop brackets left dangling once citations and page references are removed. */
function balanceBrackets(text: string): string {
  const dropped = new Set<number>();
  const stack: Array<{ ch: string; at: number }> = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '(' || ch === '[') {
      stack.push({ ch, at: i });
    } else if (ch === ')' || ch === ']') {
      const wanted = ch === ')' ? '(' : '[';
      let found = -1;
      for (let j = stack.length - 1; j >= 0; j--) {
        if (stack[j].ch === wanted) {
          found = j;
          break;
        }
      }
      if (found >= 0) stack.splice(found, 1);
      else dropped.add(i);
    }
  }
  for (const open of stack) dropped.add(open.at);
  if (dropped.size === 0) return text;

  return Array.from(text, (ch, i) => (dropped.has(i) ? '' : ch)).join('');
}

/** Delete brackets whose entire contents were markup we dropped. */
function dropEmptyBrackets(text: string): string {
  let out = text;
  for (let pass = 0; pass < 4; pass++) {
    const before = out;
    out = out
      .replace(/\(\s*[,;:.\u2013\u2014-]*\s*\)/g, ' ')
      .replace(/\[\s*[,;:.\u2013\u2014-]*\s*\]/g, ' ')
      .replace(/\u2018\s*\u2019/g, ' ');
    if (out === before) break;
  }
  return out;
}

function cleanText(raw: string): string {
  let text = raw
    .replace(/&c\.?/g, 'etc.')
    .replace(/[\u00a6<>]/g, ' ')
    .replace(/\u02da/g, '\u00b0');
  text = dropEmptyBrackets(collapse(text));

  // A dropped citation often leaves behind a bare "see" or a comma hanging
  // against the bracket that used to enclose the reference.
  text = dropEmptyBrackets(text.replace(/\b[Ss]ee\.?\s*([,;)\]])/g, '$1'));

  text = balanceBrackets(text);
  text = text
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\[\s+/g, '[')
    .replace(/\s+\]/g, ']')
    .replace(/\s+([,;:.!?])/g, '$1')
    .replace(/([,;])(?:\s*[,;])+/g, '$1')
    .replace(/[,;]\s*([)\]])/g, '$1')
    .replace(/([([])\s*[,;]\s*/g, '$1')
    .replace(/(\betc\.)(?:\s+etc\.)+/g, '$1')
    .replace(/[\s,;]*\betc\.\s*$/, '');

  text = dropEmptyBrackets(text);

  return collapse(text)
    .replace(/^[\s,;:.\u2013\u2014-]+/, '')
    .replace(/[\s,;:]+$/, '')
    .trim();
}

/**
 * Each record repeats its headword before a `¦` separator, which the XML
 * release renders as a run of spaces. Everything up to that run is typesetting,
 * not meaning.
 */
function stripHeadwordPart(text: string): string {
  const match = /\s{2,}/.exec(text);
  if (match && match.index < 120) return text.slice(match.index + match[0].length);
  return text;
}

const LEADING_PAREN = /^\((?:[^()]*)\)\s*[,;]?\s*/;
const LEADING_GRAMMAR = /^(?:mfn?\.|mf\([^)]*\)\.|[mfn]{1,3}\.|ind\.|etc\.)\s*[,;]?\s*/i;

/**
 * Monier-Williams repeats a headword as a bare pointer ("(ī), f. See s.v.")
 * wherever the same string appears in more than one place in the printed
 * alphabet. Merging homonyms puts the pointer and its target under one key, so
 * the pointer is pure noise.
 */
function isCrossReferenceStub(sense: string): boolean {
  let stub = sense.replace(LEADING_PAREN, '');
  for (let pass = 0; pass < 2; pass++) stub = stub.replace(LEADING_GRAMMAR, '');
  return stub.length <= 60 && /^(?:see|cf\.)\b/i.test(stub);
}

/** Turn `<info lex="m:f:n"/>` into the abbreviation a reader would recognise. */
function grammarFromInfoLex(value: string): string {
  const genders = value.split(':').map((part) => part.split('#')[0]);
  if (value === 'ind') return 'ind.';
  if (genders.length === 3 && genders.join('') === 'mfn') return 'mfn.';
  const known = genders.filter((g) => g === 'm' || g === 'f' || g === 'n');
  return known.length ? `${known.join('')}.` : '';
}

// ---------------------------------------------------------------------------
// Parse
// ---------------------------------------------------------------------------

interface Record_ {
  /** `H1`..`H4` for a main record; `A`/`B`/`C`/`E` suffixes are continuations. */
  suffix: string;
  key1: string;
  text: string;
  lexMarkers: string[];
  infoLex?: string;
  infoVerb?: string;
}

interface Group {
  key1: string;
  senses: string[];
  grammars: string[];
  etymologies: string[];
  /** True when Monier-Williams treats this headword as a verbal root. */
  isRoot: boolean;
}

const RECORD_TAG = /^<(H[1-4])([ABCE]?)>/;

function parseRecord(line: string): Record_ | null {
  const tagMatch = RECORD_TAG.exec(line);
  if (!tagMatch) return null;

  const tree = parser.parse(line) as XmlNode[];
  const root = tree.find((node) => Object.keys(node).some((k) => k !== ':@'));
  if (!root) return null;
  const rootTag = Object.keys(root).find((k) => k !== ':@')!;
  const parts = childrenOf(root, rootTag);

  const head = parts.find((node) => 'h' in node);
  const body = parts.find((node) => 'body' in node);
  if (!head || !body) return null;

  const key1Node = childrenOf(head, 'h').find((node) => 'key1' in node);
  const key1 = key1Node ? rawText(childrenOf(key1Node, 'key1')).trim() : '';
  if (!key1) return null;

  const ctx: RenderContext = { lexMarkers: [] };
  const rendered = renderToString(childrenOf(body, 'body'), ctx);

  return {
    suffix: tagMatch[2],
    key1,
    text: stripHeadwordPart(rendered),
    lexMarkers: ctx.lexMarkers,
    infoLex: ctx.infoLex,
    infoVerb: ctx.infoVerb,
  };
}

function buildGroups(lines: string[]): { groups: Group[]; records: number } {
  const groups: Group[] = [];
  let current: Group | null = null;
  let records = 0;

  for (const line of lines) {
    if (!line.startsWith('<H')) continue;
    const record = parseRecord(line);
    if (!record) continue;
    records++;

    // A record with no letter suffix starts a new headword. A suffixed record
    // continues the previous one, unless it introduces its own key1 (which the
    // `B` records do when a feminine stem gets its own spelling).
    if (!record.suffix || !current || current.key1 !== record.key1) {
      current = {
        key1: record.key1,
        senses: [],
        grammars: [],
        etymologies: [],
        isRoot: false,
      };
      groups.push(current);
    }

    let grammar = record.lexMarkers[0] ?? '';
    if (!grammar && record.infoLex) grammar = grammarFromInfoLex(record.infoLex);
    if (record.infoVerb) {
      current.isRoot = true;
      grammar ||= 'root';
    }
    if (grammar && !current.grammars.includes(grammar)) current.grammars.push(grammar);

    if (record.suffix === 'E') {
      // The print wraps etymology blocks in square brackets; drop them.
      const etymology = cleanText(record.text.replace(/[[\]]/g, ' '));
      if (etymology) current.etymologies.push(etymology);
      continue;
    }

    // In a root entry everything before the first `<div n="to"/>` is
    // conjugation apparatus (class, pada, principal parts) rather than a gloss.
    const chunks = record.text.split(SENSE_BREAK);
    if (record.infoVerb && chunks.length > 1) chunks.shift();

    // Drop the leading gender marker when it just restates the entry's primary
    // grammar; keep it when the sub-entry switches gender.
    const primary = current.grammars[0];
    for (const chunk of chunks) {
      let sense = cleanText(chunk);
      const marker = record.lexMarkers[0];
      if (marker && marker === primary && sense.startsWith(marker)) {
        sense = cleanText(sense.slice(marker.length));
      }
      if (sense && !current.senses.includes(sense)) current.senses.push(sense);
    }
  }

  return { groups, records };
}

function toEntries(groups: Group[]): Map<string, LexEntry> {
  const byKey = new Map<string, Group[]>();
  for (const group of groups) {
    const key = transliterate.t(group.key1, 'slp1', 'iast').toLowerCase();
    if (!key) continue;
    const bucket = byKey.get(key);
    if (bucket) bucket.push(group);
    else byKey.set(key, [group]);
  }

  const entries = new Map<string, LexEntry>();

  for (const [key, bucket] of byKey) {
    // A word spelled like a verbal root is far more often looked up for its
    // nominal senses, so the root's homonym sinks to the bottom.
    const ordered = [
      ...bucket.filter((group) => !group.isRoot),
      ...bucket.filter((group) => group.isRoot),
    ];

    const senses: string[] = [];
    const grammars: string[] = [];
    const etymologies: string[] = [];

    for (const group of ordered) {
      for (const sense of group.senses) if (!senses.includes(sense)) senses.push(sense);
      for (const grammar of group.grammars) {
        if (!grammars.includes(grammar)) grammars.push(grammar);
      }
      etymologies.push(...group.etymologies);
    }

    // Pointer-only senses are noise unless they are all the entry has.
    const meaningful = senses.filter((sense) => !isCrossReferenceStub(sense));
    const finalSenses = meaningful.length > 0 ? meaningful : senses;
    if (finalSenses.length === 0 && etymologies.length === 0) continue;

    entries.set(key, {
      key,
      slp1: ordered[0].key1,
      deva: transliterate.t(ordered[0].key1, 'slp1', 'devanagari'),
      senses: finalSenses,
      grammar: grammars.join(', '),
      ...(etymologies.length > 0 ? { etymology: etymologies.join(' ') } : {}),
    });
  }

  return entries;
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

function writeJson(entries: Map<string, LexEntry>): void {
  const fd = openSync(JSON_PATH, 'w');
  try {
    let buffer = '{';
    let first = true;
    for (const [key, entry] of entries) {
      buffer += `${first ? '' : ','}${JSON.stringify(key)}:${JSON.stringify(entry)}`;
      first = false;
      if (buffer.length > 4 << 20) {
        writeSync(fd, buffer);
        buffer = '';
      }
    }
    writeSync(fd, `${buffer}}`);
  } finally {
    closeSync(fd);
  }
}

const mib = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MiB`;

// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  await ensureArchive();

  console.log('parsing mw.xml ...');
  const started = Date.now();
  const lines = readFileSync(XML_PATH, 'utf8').split('\n');
  const { groups, records } = buildGroups(lines);
  const entries = toEntries(groups);
  console.log(
    `parsed ${records.toLocaleString()} records -> ${groups.length.toLocaleString()} headword groups ` +
      `-> ${entries.size.toLocaleString()} entries in ${((Date.now() - started) / 1000).toFixed(1)}s`,
  );

  writeJson(entries);
  console.log(`wrote ${JSON_PATH} (${mib(statSync(JSON_PATH).size)})`);

  const senseCount = [...entries.values()].reduce((sum, e) => sum + e.senses.length, 0);
  const withGrammar = [...entries.values()].filter((e) => e.grammar).length;
  const withEtymology = [...entries.values()].filter((e) => e.etymology).length;
  console.log(
    `senses: ${senseCount.toLocaleString()} | with grammar: ${withGrammar.toLocaleString()} | ` +
      `with etymology: ${withEtymology.toLocaleString()}`,
  );

  console.log('\nsanity check:');
  const missing: string[] = [];
  for (const word of SANITY_WORDS) {
    const entry = lookup(entries, word);
    if (!entry) {
      missing.push(word);
      console.log(`  ${word.padEnd(8)} MISSING`);
      continue;
    }
    const note = entry.key === word ? '' : ` (matched ${entry.key})`;
    console.log(
      `  ${word.padEnd(8)} ${entry.deva.padEnd(10)} [${entry.grammar || '-'}]${note} ${entry.senses[0] ?? '(no senses)'}`,
    );
  }
  console.log(missing.length ? `\nunresolved: ${missing.join(', ')}` : '\nall sanity words resolved');

  const subset = filterLexicon(entries, SANITY_WORDS);
  console.log(
    `filterLexicon subset: ${Object.keys(subset).length} entries, ` +
      `${(Buffer.byteLength(JSON.stringify(subset)) / 1024).toFixed(1)} KiB`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
