/**
 * Offline lookup helpers for the normalized Monier-Williams dataset produced by
 * `scripts/build-lexicon.ts`.
 *
 * The dataset on disk is a single JSON object keyed by the lowercase IAST
 * headword, so a subset of it (see `filterLexicon`) can be shipped straight to
 * the browser without any further transformation.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Sanscript from '@indic-transliteration/sanscript';

export interface LexEntry {
  /** Headword in IAST, lowercase. Doubles as the dataset key. */
  key: string;
  /** Headword in SLP1, exactly as it appears in the CDSL `<key1>` field. */
  slp1: string;
  /** Headword in Devanagari. */
  deva: string;
  /** Plain-English glosses, one per Monier-Williams sub-entry. */
  senses: string[];
  /** Part-of-speech / gender markers, e.g. `mfn.`, `f.`, `m., n.`. */
  grammar: string;
  /** Cognates and derivation notes, when Monier-Williams supplies them. */
  etymology?: string;
}

/** Shape of the JSON file written by the build script. */
export type LexiconFile = Record<string, LexEntry>;

const moduleDir = path.dirname(fileURLToPath(import.meta.url));

export const DEFAULT_LEXICON_PATH = path.resolve(
  moduleDir,
  '../../sources/lexicon/mw-normalized.json',
);

const transliterate = Sanscript as unknown as {
  t: (text: string, from: string, to: string) => string;
};

const DEVANAGARI = /[\u0900-\u097f]/;
const ASCII_ONLY = /^[\x20-\x7e]+$/;
/** ASCII letters SLP1 uses for sounds that plain-ASCII IAST would never need. */
const SLP1_MARKERS = /[fFxXEOMHKGCJWQRTDPBSYzN]/;

/**
 * Collapse a word to a bare `a-z` skeleton so `sri`, `śrī` and `shri` can all
 * find `śrī`. Diacritics decompose to combining marks under NFD and are then
 * dropped, which also folds ṃ→m, ś→s, ṛ→r, ñ→n and friends.
 */
export function foldDiacritics(word: string): string {
  return word
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}

/**
 * Convert user input in Devanagari, SLP1 or IAST into the dataset's key form
 * (lowercase IAST). Input that is already lowercase ASCII is left alone so the
 * caller can fall back to diacritic-insensitive matching.
 */
export function toIastKey(word: string): string {
  const trimmed = word.trim().normalize('NFC');
  if (!trimmed) return '';

  if (DEVANAGARI.test(trimmed)) {
    const slp1 = transliterate.t(trimmed, 'devanagari', 'slp1');
    return transliterate.t(slp1, 'slp1', 'iast').toLowerCase();
  }

  // SLP1 is pure ASCII and leans on capitals (A = ā, I = ī, S = ś ...).
  if (ASCII_ONLY.test(trimmed) && (/[A-Z]/.test(trimmed) || SLP1_MARKERS.test(trimmed))) {
    return transliterate.t(trimmed, 'slp1', 'iast').toLowerCase();
  }

  return trimmed.toLowerCase();
}

const foldIndexes = new WeakMap<Map<string, LexEntry>, Map<string, string>>();

function foldIndexFor(map: Map<string, LexEntry>): Map<string, string> {
  const cached = foldIndexes.get(map);
  if (cached) return cached;

  const index = new Map<string, string>();
  for (const [key, entry] of map) {
    const folded = foldDiacritics(key);
    if (!folded) continue;
    // Several headwords can share a skeleton (śri and śrī both fold to "sri").
    // The one Monier-Williams treats at greatest length is the likelier target.
    const incumbent = index.get(folded);
    if (!incumbent || entry.senses.length > (map.get(incumbent)?.senses.length ?? 0)) {
      index.set(folded, key);
    }
  }
  foldIndexes.set(map, index);
  return index;
}

export async function loadLexicon(
  filePath: string = DEFAULT_LEXICON_PATH,
): Promise<Map<string, LexEntry>> {
  const raw = await readFile(filePath, 'utf8');
  const parsed = JSON.parse(raw) as LexiconFile;
  return new Map(Object.entries(parsed));
}

/**
 * Find the best entry for `word`, accepting Devanagari, SLP1, IAST, or IAST
 * with the diacritics left off. Matching runs through progressively looser
 * tiers and stops at the first hit.
 */
export function lookup(map: Map<string, LexEntry>, word: string): LexEntry | undefined {
  const iast = toIastKey(word);
  if (!iast) return undefined;

  const exact = map.get(iast);
  if (exact) return exact;

  // Nominative endings and anusvāra that a user may have typed in.
  const bare = iast.replace(/[ḥṃ]$/u, '');
  if (bare !== iast) {
    const hit = map.get(bare);
    if (hit) return hit;
  }

  const index = foldIndexFor(map);
  const folded = foldDiacritics(bare);
  const byFold = index.get(folded);
  if (byFold) return map.get(byFold);

  // Last resorts, in order of how much they assume about the input:
  //   - many feminines (īśvarī, from an mf(ī) stem) are not headwords of their
  //     own in Monier-Williams, so fall back to the stem they derive from;
  //   - "sh" is the usual anglicization of ś.
  const guesses = [
    bare.replace(/[īā]$/u, 'a'),
    folded.replace(/i$/, 'a'),
    folded.replace(/sh/g, 's'),
  ];
  for (const guess of guesses) {
    if (!guess || guess === bare || guess === folded) continue;
    const key = index.get(foldDiacritics(guess)) ?? (map.has(guess) ? guess : undefined);
    if (key) return map.get(key);
  }

  return undefined;
}

/**
 * Build a small plain object holding just the requested words, ready to be
 * serialized into a page bundle. Keys are the canonical dataset keys, not the
 * (possibly loosely spelled) inputs, and misses are skipped.
 */
export function filterLexicon(
  map: Map<string, LexEntry>,
  keys: string[],
): Record<string, LexEntry> {
  const subset: Record<string, LexEntry> = {};
  for (const key of keys) {
    const entry = lookup(map, key);
    if (entry) subset[entry.key] = entry;
  }
  return subset;
}
