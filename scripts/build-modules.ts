/**
 * Compiles the study modules.
 *
 * Reads the ITRANS sources, aligns the thousand names to their verses, and
 * merges in whatever enrichment data is available (name meanings, chant
 * timings, commentary). Emits one JSON file per module plus an index.
 *
 * Enrichment inputs are optional so the site can be built and developed before
 * every dataset is finished; missing pieces simply leave fields empty.
 *
 * Run: pnpm tsx scripts/build-modules.ts
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { parseSource, parseNamavali } from "./lib/parse-source";
import { alignNamas, type Anchor } from "./lib/align-namas";
import { toDevanagari, toIast, iastToDeva } from "./lib/itrans";
import { analyzeAksaras } from "../src/lib/aksara";
import type {
  Commentary,
  Morphology,
  Nama,
  Reference,
  StudyModule,
  ModuleSummary,
  Token,
  VerseLine,
  ChantTiming,
  CompoundNode,
  WordGloss,
} from "../src/lib/types";

const root = resolve(import.meta.dirname, "..");
const dataDir = resolve(root, "data");
const modulesDir = resolve(dataDir, "modules");

/** Optional enrichment produced by the name-meanings pipeline. */
interface NamaEnrichment {
  index: number;
  iast?: string;
  deva?: string;
  namavaliIast?: string;
  namavaliDeva?: string;
  gloss?: string;
  translation?: string;
  morphology?: Morphology;
  compound?: CompoundNode;
  commentary?: string;
}

interface ChantTimings {
  verses?: { number: number; startSec: number; endSec: number; confidence?: string }[];
  sections?: { dhyana?: { startSec: number; endSec: number } };
  dhyanaVerses?: { index: number; startSec: number; endSec: number }[];
}

function readJsonIfPresent<T>(path: string): T | null {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8")) as T;
  } catch (err) {
    console.warn(`  ! could not parse ${path}: ${(err as Error).message}`);
    return null;
  }
}

type CommentaryEntry = { commentary?: Commentary; references?: Reference[]; subtitle?: string };

/**
 * Commentary is keyed by module id and may be split across any number of files
 * in `data/commentary/`, so that it can be written in parallel batches without
 * contention. A single `data/commentary.json` is still honoured.
 */
function loadCommentary(dataDir: string): Record<string, CommentaryEntry> {
  const merged: Record<string, CommentaryEntry> = {
    ...(readJsonIfPresent<Record<string, CommentaryEntry>>(resolve(dataDir, "commentary.json")) ?? {}),
  };

  const dir = resolve(dataDir, "commentary");
  if (!existsSync(dir)) return merged;

  for (const file of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
    const part = readJsonIfPresent<Record<string, CommentaryEntry>>(resolve(dir, file));
    if (!part) continue;
    for (const [id, entry] of Object.entries(part)) {
      if (merged[id]) console.warn(`  ! duplicate commentary for module ${id} in ${file}`);
      merged[id] = entry;
    }
  }
  return merged;
}

/** Build the clickable token list for a line of verse. */
function buildTokens(
  lineItrans: string,
  lineIndex: number,
  /** Nāma numbers carried by each word, keyed `${lineIndex}-${wordIndex}`. */
  namaLookup: Map<string, number[]>,
  words?: Map<string, WordGloss>,
): Token[] {
  return lineItrans
    .split(/\s+/)
    .filter(Boolean)
    .map((word, i) => {
      const deva = toDevanagari(word);
      const iast = toIast(word);
      const namaIndices = namaLookup.get(`${lineIndex}-${i}`);
      return {
        id: `l${lineIndex}-t${i}`,
        deva,
        iast,
        namaIndices: namaIndices?.length ? namaIndices : undefined,
        word: words?.get(`${lineIndex}-${i}`),
        aksaras: analyzeAksaras(deva),
      };
    });
}

function main() {
  console.log("Building modules...\n");

  const raw = readFileSync(resolve(root, "sources/text/lalitacomplete.itx"), "utf8");
  const namavaliRaw = readFileSync(resolve(root, "sources/text/lalitaa1000.itx"), "utf8");

  const { verses, dhyanaVerses, kalaMarkers } = parseSource(raw);
  const namavali = parseNamavali(namavaliRaw);
  console.log(`  parsed ${verses.length} verses, ${dhyanaVerses.length} dhyāna verses, ${namavali.length} names`);

  // Align names to verses, excluding the closing narrative line.
  const lastIdx = verses.length - 1;
  const words: { verseIndex: number; iast: string }[] = [];
  // Where each word of that flat stream sits in the printed text, so the
  // alignment can be read back onto the tokens the reader actually taps.
  const wordPlaces: { verseIndex: number; lineIndex: number; tokenIndex: number }[] = [];
  verses.forEach((v, vi) => {
    const lines = vi === lastIdx ? v.lines.slice(0, 1) : v.lines;
    lines.forEach((line, li) => {
      line
        .split(/\s+/)
        .filter(Boolean)
        .forEach((w, ti) => {
          words.push({ verseIndex: vi, iast: toIast(w) });
          wordPlaces.push({ verseIndex: vi, lineIndex: li, tokenIndex: ti });
        });
    });
  });

  const anchors: Anchor[] = kalaMarkers.map((m) => ({
    namesBefore: m.firstNama - 1,
    wordIndex: words.findIndex((w) => w.verseIndex >= m.verseIndex) + m.wordsIntoVerse,
  }));

  // Verse boundaries taken from a published enumeration pin the alignment
  // exactly. Only verses whose text is identical to ours are anchored, so a
  // recension variant can never drag a name into the wrong verse.
  const verseAnchors =
    readJsonIfPresent<{ anchors: { verse: number; firstNama: number }[] }>(
      resolve(dataDir, "verse-anchors.json"),
    )?.anchors ?? [];
  for (const a of verseAnchors) {
    const wordIndex = words.findIndex((w) => w.verseIndex === a.verse - 1);
    if (wordIndex >= 0) anchors.push({ namesBefore: a.firstNama - 1, wordIndex, hard: true });
  }
  console.log(`  verse anchors: ${verseAnchors.length} hard, ${kalaMarkers.length} soft`);

  const { byVerse, namas: aligned, warnings } = alignNamas(words, namavali, anchors);
  console.log(`  aligned ${aligned.length} names (${warnings.length} warnings)`);

  // Read the alignment back onto the printed words. Matching a nāma to a token
  // by string equality would miss every word that sandhi has altered or fused,
  // and those are exactly the words a reader most needs explained.
  const namasAtWord = new Map<string, number[]>();
  for (const nama of aligned) {
    for (const wi of nama.tokenIndices) {
      const place = wordPlaces[wi];
      if (!place) continue;
      const key = `${place.verseIndex}:${place.lineIndex}-${place.tokenIndex}`;
      const list = namasAtWord.get(key);
      if (list) list.push(nama.index);
      else namasAtWord.set(key, [nama.index]);
    }
  }

  // Optional enrichment.
  const enrichment = readJsonIfPresent<NamaEnrichment[]>(resolve(dataDir, "namas.json"));
  const enrichmentBy = new Map<number, NamaEnrichment>();
  for (const e of enrichment ?? []) enrichmentBy.set(e.index, e);
  console.log(`  name meanings: ${enrichment ? `${enrichment.length} entries` : "not yet available"}`);

  const timings = readJsonIfPresent<ChantTimings>(resolve(dataDir, "chant/timings.json"));
  console.log(`  chant timings: ${timings?.verses ? `${timings.verses.length} verses` : "not yet available"}`);

  // Word-by-word meanings for the dhyāna, whose verses are not made of nāmas
  // and so have nothing else to hang an explanation on.
  const dhyanaWordList =
    readJsonIfPresent<{ words: ({ line: number; token: number } & WordGloss)[] }>(
      resolve(dataDir, "dhyana-words.json"),
    )?.words ?? [];
  const dhyanaWords = new Map<string, WordGloss>();
  for (const { line, token, ...gloss } of dhyanaWordList) {
    dhyanaWords.set(`${line}-${token}`, gloss);
  }
  console.log(`  dhyāna words: ${dhyanaWordList.length ? `${dhyanaWordList.length} glossed` : "not yet available"}`);

  // The stotra is nāmas throughout except for its closing line, which reports
  // that the names have been sung. Those words have no nāma behind them, so
  // they carry their own analysis in the same way the dhyāna's do.
  const frameWordList =
    readJsonIfPresent<{ words: ({ module: string; line: number; token: number } & WordGloss)[] }>(
      resolve(dataDir, "frame-words.json"),
    )?.words ?? [];
  const frameWords = new Map<string, Map<string, WordGloss>>();
  for (const { module: modId, line, token, ...gloss } of frameWordList) {
    const byModule = frameWords.get(modId) ?? new Map<string, WordGloss>();
    byModule.set(`${line - 1}-${token}`, gloss);
    frameWords.set(modId, byModule);
  }
  console.log(`  frame words: ${frameWordList.length ? `${frameWordList.length} glossed` : "not yet available"}`);

  const commentaryAll = loadCommentary(dataDir);
  const commentaryCount = Object.keys(commentaryAll).length;
  console.log(`  commentary: ${commentaryCount ? `${commentaryCount} modules` : "not yet available"}`);

  mkdirSync(modulesDir, { recursive: true });

  const summaries: ModuleSummary[] = [];
  const modules: StudyModule[] = [];

  // --- Module 000: the dhyāna verses -------------------------------------
  {
    // Keyed by the line's position in the printed dhyāna, counting from 1, so
    // the word data can be written against what the reader actually sees.
    const lines: VerseLine[] = [];
    dhyanaVerses.forEach((verse) => {
      verse.forEach((line) => {
        const lineNo = lines.length + 1;
        lines.push({
          deva: toDevanagari(line),
          iast: toIast(line),
          tokens: buildTokens(line, lineNo, new Map(), dhyanaWords),
        });
      });
    });

    const extra = commentaryAll["000"] ?? {};
    const chant: ChantTiming | undefined = timings?.sections?.dhyana
      ? { ...timings.sections.dhyana, confidence: "detected" }
      : undefined;

    const mod: StudyModule = {
      id: "000",
      kind: "dhyana",
      number: null,
      title: "Dhyāna",
      subtitle: extra.subtitle ?? "The meditation verses",
      lines,
      namas: [],
      chant,
      commentary: extra.commentary ?? { meaning: "" },
      references: extra.references ?? [],
    };
    modules.push(mod);
    summaries.push({
      id: mod.id,
      kind: mod.kind,
      number: null,
      title: mod.title,
      subtitle: mod.subtitle,
      previewDeva: lines[0]?.deva ?? "",
      previewIast: lines[0]?.iast ?? "",
      namaCount: 0,
    });
  }

  // --- Modules 001..182: the stotra ---------------------------------------
  verses.forEach((verse, vi) => {
    const number = verse.number ?? 182;
    const id = String(number).padStart(3, "0");
    const verseNamas = byVerse.get(vi) ?? [];

    // The final half-verse belongs with verse 182.
    const isTrailingHalf = verse.number === null;
    const existing = modules.find((m) => m.id === id);

    // Lines appended to an existing module have to keep counting from where
    // that module left off, or their token ids collide with the lines already
    // there and tapping a word in the first half opens a word from the second.
    const lineOffset = isTrailingHalf ? (existing?.lines.length ?? 0) : 0;

    const namaLookup = new Map<string, number[]>();
    for (const [key, list] of namasAtWord) {
      const [v, rest] = key.split(":");
      if (Number(v) !== vi) continue;
      const [li, ti] = rest.split("-");
      namaLookup.set(`${lineOffset + Number(li)}-${ti}`, list);
    }

    const lines: VerseLine[] = verse.lines.map((line, li) => ({
      deva: toDevanagari(line),
      iast: toIast(line),
      tokens: buildTokens(line, lineOffset + li, namaLookup, frameWords.get(id)),
    }));

    const namas: Nama[] = verseNamas.map((a) => {
      const e = enrichmentBy.get(a.index);
      const iast = e?.iast ?? a.iast;
      const deva = e?.deva ?? iastToDeva(iast);
      const morphology: Morphology =
        e?.morphology ?? {
          pos: "noun",
          stem: deva,
          stemIast: iast,
          gender: "feminine",
          case: "nominative",
          caseNumber: 1,
          number: "singular",
        };
      return {
        index: a.index,
        // The nāmāvalī-derived citation form is authoritative; the aligned
        // slice is only used when enrichment has not reached this name yet.
        deva,
        iast,
        namavaliDeva: e?.namavaliDeva,
        namavaliIast: e?.namavaliIast,
        gloss: e?.gloss ?? "",
        translation: e?.translation ?? "",
        aksaras: analyzeAksaras(deva),
        morphology,
        compound: e?.compound,
        commentary: e?.commentary,
      };
    });

    if (isTrailingHalf && existing) {
      existing.lines.push(...lines);
      existing.namas.push(...namas);
      if (existing.namas.length) {
        existing.namaRange = [
          existing.namas[0].index,
          existing.namas[existing.namas.length - 1].index,
        ];
      }
      return;
    }

    const extra = commentaryAll[id] ?? {};
    const timing = timings?.verses?.find((v) => v.number === number);
    const chant: ChantTiming | undefined = timing
      ? {
          startSec: timing.startSec,
          endSec: timing.endSec,
          confidence: (timing.confidence as ChantTiming["confidence"]) ?? "detected",
        }
      : undefined;

    const mod: StudyModule = {
      id,
      kind: "shloka",
      number,
      title: `Shloka ${number}`,
      subtitle: extra.subtitle,
      lines,
      namas,
      namaRange: namas.length ? [namas[0].index, namas[namas.length - 1].index] : undefined,
      chant,
      commentary: extra.commentary ?? { meaning: "" },
      references: extra.references ?? [],
    };
    modules.push(mod);
  });

  // Summaries for every stotra module, in order.
  for (const mod of modules) {
    if (mod.kind === "dhyana") continue;
    summaries.push({
      id: mod.id,
      kind: mod.kind,
      number: mod.number,
      title: mod.title,
      subtitle: mod.subtitle,
      namaRange: mod.namaRange,
      previewDeva: mod.lines[0]?.deva ?? "",
      previewIast: mod.lines[0]?.iast ?? "",
      namaCount: mod.namas.length,
    });
  }

  for (const mod of modules) {
    writeFileSync(resolve(modulesDir, `${mod.id}.json`), JSON.stringify(mod), "utf8");
  }
  writeFileSync(resolve(dataDir, "index.json"), JSON.stringify(summaries, null, 2), "utf8");

  // A flat name list powers search and the nāma index.
  const flat = modules
    .flatMap((m) => m.namas.map((n) => ({ ...n, moduleId: m.id, aksaras: undefined })))
    .sort((a, b) => a.index - b.index);
  writeFileSync(resolve(dataDir, "namas-index.json"), JSON.stringify(flat), "utf8");

  const totalNamas = modules.reduce((a, m) => a + m.namas.length, 0);
  console.log(`\n  wrote ${modules.length} modules to data/modules/`);
  console.log(`  total names across modules: ${totalNamas}`);
  console.log(`  modules with chant timing: ${modules.filter((m) => m.chant).length}`);
  console.log(`  modules with commentary:   ${modules.filter((m) => m.commentary.meaning).length}`);
  console.log(`  names with meanings:       ${modules.flatMap((m) => m.namas).filter((n) => n.gloss).length}`);

  if (totalNamas !== 1000) {
    console.warn(`\n  WARNING: expected 1000 names across modules, got ${totalNamas}`);
  }
}

main();
