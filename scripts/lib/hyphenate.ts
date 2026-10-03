/**
 * Word breaks for the long compounds, as printed editions mark them:
 * padma-rāga-śilādarśa-paribhāvi-kapolabhūḥ.
 *
 * The constituents come from the compound analyses already in the data. Each
 * is aligned against the printed word, and a break is kept only where both
 * scripts can take it by adding a hyphen and nothing else:
 *
 * - The next constituent has to begin with a consonant. Where it begins with a
 *   vowel, sandhi has either fused two vowels into one (śilā + ādarśa =
 *   śilādarśa), which no hyphen can divide, or joined the vowel to the final
 *   consonant before it, which Devanagari writes as a single syllable.
 * - Transliterating the two halves separately has to give back exactly the
 *   Devanagari of the whole, so every break falls in the same place in both.
 */

import type { CompoundNode, Hyphenated } from "../../src/lib/types";
import { iastToDeva } from "./itrans";

const VOWELS = new Set([..."aāiīuūṛṝḷḹeo"]);

/**
 * Bound forms that are never printed apart from the word they qualify:
 * prefixes stay with what follows (nirguṇā, sumukhī, svarūpiṇī, govinda), and
 * the endings that make a noun of a verb stay with what precedes (cinmayī,
 * śaṅkarī, padmāsanasthā, kapolabhūḥ, kṣetrajña).
 */
const PREFIXES = new Set([
  "a", "an", "ā", "nis", "nir", "niḥ", "dus", "dur", "duḥ", "su", "vi", "sa", "sva", "go",
]);
const SUFFIXES = new Set([
  "maya", "mayī", "kara", "karī", "kāra", "kārī", "stha", "sthā", "ga", "gā", "ja", "jā",
  "jña", "da", "dā", "bhū", "ghna", "ghnī", "duh", "dhuk",
]);

const chars = (s: string) => [...s.normalize("NFC")];
const base = (c: string) => c.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const isVowel = (c: string | undefined) => c !== undefined && VOWELS.has(c);

/** Syllables in a stretch of IAST, counting ai and au as one. */
function syllables(s: string[]): number {
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    if (!isVowel(s[i])) continue;
    if ((s[i] === "i" || s[i] === "u") && s[i - 1] === "a") continue;
    n++;
  }
  return n;
}

/** The simple constituents of a compound, in order. */
export function compoundLeaves(node: CompoundNode | undefined): string[] {
  if (!node) return [];
  if (!node.children?.length) return [node.iast];
  return node.children.flatMap(compoundLeaves);
}

function substitution(a: string, b: string): number {
  if (a === b) return 0;
  return base(a) === base(b) ? 0.5 : 1;
}

/**
 * Consonants that sandhi adds in front of a word: radana + chada = radanacchada,
 * lasat + hema = lasaddhema. The r and sibilants a visarga turns into belong to
 * the word before (dayāmūrtir-mahā), so they get no discount.
 */
const LEADING = new Set([..."kgcjṭḍtdpbṅñṇn"]);
const TRAILING = new Set([..."rsśṣḥ"]);

/** Edit cost of reading `leaf` as `surface[start, end)`, for every `end`. */
function costsFrom(leaf: string[], surface: string[], start: number): number[] {
  const n = surface.length - start;
  let prev = [0];
  for (let c = 1; c <= n; c++) {
    prev[c] = prev[c - 1] + (LEADING.has(surface[start + c - 1]) ? 0.5 : 1);
  }
  for (let r = 1; r <= leaf.length; r++) {
    const row = [r];
    for (let c = 1; c <= n; c++) {
      const ch = surface[start + c - 1];
      row[c] = Math.min(
        prev[c] + 1,
        row[c - 1] + (r === leaf.length && TRAILING.has(ch) ? 0.5 : 1),
        prev[c - 1] + substitution(leaf[r - 1], ch),
      );
    }
    prev = row;
  }
  return prev;
}

const SKIP = 0.3;

interface Segment {
  leaf: string[];
  start: number;
  end: number;
  cost: number;
}

/**
 * Lay the constituents over the word at least cost. Constituents may be left
 * off either end, for a word that carries only part of a compound printed
 * across a space; none may be left out of the middle.
 */
function align(surface: string[], leaves: string[][]): Segment[] | null {
  const N = surface.length;
  const K = leaves.length;
  if (!N || !K) return null;

  const best: number[][] = Array.from({ length: K + 1 }, () => Array(N + 1).fill(Infinity));
  const from: ([number, number] | null)[][] = Array.from({ length: K + 1 }, () => Array(N + 1).fill(null));
  for (let k = 0; k <= K; k++) best[k][0] = SKIP * k;

  for (let k = 0; k < K; k++) {
    for (let p = 0; p < N; p++) {
      if (best[k][p] === Infinity) continue;
      const costs = costsFrom(leaves[k], surface, p);
      for (let q = p + 1; q <= N; q++) {
        const total = best[k][p] + costs[q - p];
        if (total < best[k + 1][q]) {
          best[k + 1][q] = total;
          from[k + 1][q] = [k, p];
        }
      }
    }
  }

  let end = -1;
  let endCost = Infinity;
  for (let k = 1; k <= K; k++) {
    const total = best[k][N] + SKIP * (K - k);
    if (total < endCost) {
      endCost = total;
      end = k;
    }
  }
  if (end < 0) return null;

  const segments: Segment[] = [];
  let k = end;
  let q = N;
  while (q > 0) {
    const step = from[k][q];
    if (!step) return null;
    const [pk, p] = step;
    const leaf = leaves[pk];
    segments.unshift({ leaf, start: p, end: q, cost: costsFrom(leaf, surface, p)[q - p] });
    k = pk;
    q = p;
  }
  return segments;
}

/** A constituent read off too loosely to trust the breaks on either side of it. */
function untrusted(seg: Segment, last: boolean): boolean {
  // The last constituent also carries the case ending, up to the nāmāvalī's -iṇyai.
  const allowance = Math.max(2, seg.leaf.length * 0.34) + (last ? 4 : 0);
  return seg.cost > allowance;
}

/**
 * Hyphenate text in both scripts, or return undefined when no break can be
 * placed. `deva` is the Devanagari as the site shows it; the result never
 * differs from it, or from `iast`, except by hyphens. Words separated by
 * spaces are hyphenated separately against the same constituents.
 */
export function hyphenate(iast: string, deva: string, leaves: string[]): Hyphenated | undefined {
  const iastWords = iast.split(" ");
  const devaWords = deva.split(" ");
  if (iastWords.length !== devaWords.length) return undefined;
  const words = iastWords.map((w, i) => ({
    iast: w,
    deva: devaWords[i],
    hyphenated: hyphenateWord(w, devaWords[i], leaves) ?? undefined,
  }));
  return joinHyphenated(words);
}

function hyphenateWord(iast: string, deva: string, leaves: string[]): Hyphenated | null {
  const surface = chars(iast);
  if (leaves.length < 2 || surface.includes("-")) return null;

  const segments = align(surface, leaves.map(chars));
  if (!segments || segments.length < 2) return null;

  const cuts: number[] = [];
  let lastCut = 0;
  for (let i = 1; i < segments.length; i++) {
    const left = segments[i - 1];
    const right = segments[i];
    const at = right.start;
    if (untrusted(left, false) || untrusted(right, i === segments.length - 1)) continue;
    if (isVowel(right.leaf[0]) || isVowel(surface[at])) continue;
    if (PREFIXES.has(left.leaf.join("")) || SUFFIXES.has(right.leaf.join(""))) continue;
    // What is left of a constituent whose first vowel sandhi took is too
    // little to stand at the end of a piece: anāhatābja, not anāhatāb-ja.
    if (isVowel(left.leaf[0]) && syllables(surface.slice(left.start, at)) < 2) continue;

    const before = surface.slice(lastCut, at);
    const after = surface.slice(at);
    if (!syllables(before) || !syllables(after)) continue;

    // Both halves must still spell the whole in Devanagari.
    const a = surface.slice(0, at).join("");
    const b = after.join("");
    if (iastToDeva(a) + iastToDeva(b) !== iastToDeva(a + b)) continue;

    cuts.push(at);
    lastCut = at;
  }
  if (!cuts.length) return null;

  const pieces: string[] = [];
  let prev = 0;
  for (const cut of [...cuts, surface.length]) {
    pieces.push(surface.slice(prev, cut).join(""));
    prev = cut;
  }

  const hyphenated: Hyphenated = {
    iast: pieces.join("-"),
    deva: pieces.map(iastToDeva).join("-"),
  };
  if (hyphenated.iast.replaceAll("-", "") !== iast.normalize("NFC")) return null;
  if (hyphenated.deva.replaceAll("-", "") !== deva) return null;
  return hyphenated;
}

/**
 * Hyphenate a run of words separated by spaces, such as a verse line built
 * from tokens that have each been hyphenated already.
 */
export function joinHyphenated(
  words: { deva: string; iast: string; hyphenated?: Hyphenated }[],
): Hyphenated | undefined {
  if (!words.some((w) => w.hyphenated)) return undefined;
  return {
    deva: words.map((w) => w.hyphenated?.deva ?? w.deva).join(" "),
    iast: words.map((w) => w.hyphenated?.iast ?? w.iast).join(" "),
  };
}
