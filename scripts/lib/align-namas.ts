/**
 * Aligns the thousand names to the verses that contain them.
 *
 * In the verse text the names are mostly written as separate words, but sandhi
 * fuses some adjacent pairs into one written word, so whitespace tokenization
 * finds only ~951 of the 1000. The nāmāvalī lists all thousand in order, which
 * lets us recover the missing boundaries.
 *
 * Matching cannot be exact: the nāmāvalī cites names in the dative
 * (`śrīmātre`) where the verse has the nominative (`śrīmātā`), and sandhi
 * further alters the seam between neighbours. Nor can it be greedy — small
 * errors compound over a thousand names. So this solves the whole alignment at
 * once with dynamic programming: each written word may carry one to three
 * names, a name may span up to three words, and we take the assignment with
 * the lowest total edit distance. The search is banded because the two
 * sequences never drift far apart.
 */

import { foldIast, toIast } from "./itrans";

export interface StreamToken {
  verseIndex: number;
  /** The word in IAST, as written in the source. */
  iast: string;
  skeleton: string;
}

export interface AlignedNama {
  index: number;
  verseIndex: number;
  /** The IAST text belonging to this name. */
  iast: string;
  /** True when this name shares a written word with a neighbour. */
  fused: boolean;
  /** Indices of the words this name draws from. */
  tokenIndices: number[];
  /** Normalized edit distance for the group this name was aligned in. */
  score: number;
}

export interface AlignmentResult {
  namas: AlignedNama[];
  byVerse: Map<number, AlignedNama[]>;
  warnings: string[];
}

/** Maximum names one written word may carry. */
const MAX_NAMES_PER_TOKEN = 3;
/** Maximum words one name may span. */
const MAX_TOKENS_PER_NAME = 2;

/**
 * Cost of reading several names out of one written word. Sandhi fuses roughly
 * fifty pairs across the text, so this is common and priced cheaply.
 */
const FUSION_PENALTY = 0.28;

/**
 * Cost of reading one name across several written words. This is genuinely
 * rare here, and pricing it too low lets the solver swallow a neighbouring
 * name, so it is charged heavily.
 */
const SPAN_PENALTY = 1.1;

// ---------------------------------------------------------------------------
// Folding
// ---------------------------------------------------------------------------

/**
 * Fold IAST to a bare ASCII skeleton, returning a map from each skeleton
 * character back to its index in the original IAST string. Folding only drops
 * characters, so the mapping is exact.
 */
export function foldWithMap(iast: string): { skeleton: string; map: number[] } {
  const skeleton: string[] = [];
  const map: number[] = [];
  Array.from(iast).forEach((ch, i) => {
    const folded = ch
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    for (const f of folded) {
      if (f >= "a" && f <= "z") {
        skeleton.push(f);
        map.push(i);
      }
    }
  });
  return { skeleton: skeleton.join(""), map };
}

/**
 * Plausible nominative skeletons for a nāmāvalī dative form.
 *
 * The nāmāvalī cites every name in the dative, and reversing that depends on
 * the stem class: `-āyai` comes from an ā-stem, `-yai` from an ī-stem, `-aye`
 * from an i-stem whose nominative ends in visarga (`kalānidhaye` ->
 * `kalānidhiḥ`), `-ave` from a u-stem, `-re` from an ṛ-stem. Rather than try to
 * infer the stem class, we generate every plausible reversal and let the
 * aligner score against whichever fits the verse best.
 */
export function nominativeCandidates(namavaliItrans: string): string[] {
  // The first entry carries the bīja mantras aiṃ hrīṃ śrīṃ before the name.
  const s = foldIast(toIast(namavaliItrans)).replace(/^(?:aim|hrim|shrim)+/, "");
  const out = new Set<string>();

  if (s.endsWith("ayai")) out.add(`${s.slice(0, -4)}a`);
  if (s.endsWith("yai")) out.add(`${s.slice(0, -3)}i`);
  if (s.endsWith("ai")) out.add(`${s.slice(0, -2)}i`);
  if (s.endsWith("aye")) {
    out.add(`${s.slice(0, -3)}ih`);
    out.add(`${s.slice(0, -3)}i`);
  }
  if (s.endsWith("ave")) {
    out.add(`${s.slice(0, -3)}uh`);
    out.add(`${s.slice(0, -3)}u`);
  }
  if (s.endsWith("tre")) {
    out.add(`${s.slice(0, -3)}ta`);
    out.add(`${s.slice(0, -3)}tr`);
  }
  if (s.endsWith("re")) out.add(`${s.slice(0, -2)}ra`);
  if (s.endsWith("e")) {
    const base = s.slice(0, -1);
    out.add(base);
    out.add(`${base}h`);
    out.add(`${base}ah`);
  }
  // Consonant stems often end in visarga or a plain consonant in the verse.
  out.add(s);

  return [...out].filter((c) => c.length > 0);
}

/** The single most likely nominative skeleton, used where one form is needed. */
export function nominativeSkeleton(namavaliItrans: string): string {
  return nominativeCandidates(namavaliItrans)[0] ?? "";
}

/** Levenshtein distance. Strings here are short, so the simple form is fine. */
export function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prev = new Array<number>(b.length + 1);
  let cur = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j += 1) prev[j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    cur[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, cur] = [cur, prev];
  }
  return prev[b.length];
}

const normalizedCost = (a: string, b: string): number =>
  editDistance(a, b) / Math.max(1, Math.max(a.length, b.length));

// ---------------------------------------------------------------------------
// Alignment
// ---------------------------------------------------------------------------

interface Step {
  /** Names consumed at this step. */
  names: number;
  /** Words consumed at this step. */
  tokens: number;
  cost: number;
}

export interface Anchor {
  /** Number of names that should be complete at this point. */
  namesBefore: number;
  /** Word index where that is expected to fall. */
  wordIndex: number;
}

export function alignNamas(
  words: { verseIndex: number; iast: string }[],
  namavali: string[],
  /**
   * Soft anchors from the source's every-hundred markers. They are soft rather
   * than hard because a hundred-boundary does not always coincide with a verse
   * boundary, and forcing it to shreds names at the seam.
   */
  anchors: Anchor[] = [],
): AlignmentResult {
  const tokens: StreamToken[] = words
    .map((w) => ({ ...w, skeleton: foldWithMap(w.iast).skeleton }))
    .filter((t) => t.skeleton.length > 0);

  const candidates = namavali.map(nominativeCandidates);
  const targets = candidates.map((c) => c[0] ?? "");
  const N = targets.length;
  const M = tokens.length;
  const warnings: string[] = [];

  /**
   * Cost of reading `count` consecutive names as the given text. For a single
   * name every candidate reversal of the dative is tried; for fused groups the
   * primary reversal is used, since the combinations multiply.
   */
  const groupCost = (from: number, count: number, text: string): number => {
    if (count === 1) {
      let best = Infinity;
      for (const cand of candidates[from]) {
        const c = normalizedCost(cand, text);
        if (c < best) best = c;
      }
      return best;
    }
    return normalizedCost(concatNamesPrimary(from, count), text);
  };

  const concatNamesPrimary = (from: number, count: number) =>
    targets.slice(from, from + count).join("");

  // The two sequences differ in length by (N - M); allow generous slack.
  const band = Math.max(40, Math.abs(N - M) * 2 + 30);
  const inBand = (i: number, j: number) => Math.abs(i - j - (0)) <= band + Math.abs(N - M);

  const INF = Infinity;
  // f[i][j] = best cost aligning the first i names with the first j words.
  const f: number[][] = Array.from({ length: N + 1 }, () => new Array<number>(M + 1).fill(INF));
  const back: (Step | null)[][] = Array.from({ length: N + 1 }, () =>
    new Array<Step | null>(M + 1).fill(null),
  );
  f[0][0] = 0;

  const concatTokens = (from: number, count: number) =>
    tokens.slice(from, from + count).map((t) => t.skeleton).join("");

  /** Penalty for arriving at a state that disagrees with an anchor. */
  const anchorByName = new Map(anchors.map((a) => [a.namesBefore, a.wordIndex]));
  const ANCHOR_WEIGHT = 0.6;
  const anchorPenalty = (nameCount: number, wordCount: number): number => {
    const expected = anchorByName.get(nameCount);
    return expected === undefined ? 0 : ANCHOR_WEIGHT * Math.abs(wordCount - expected);
  };

  for (let i = 0; i <= N; i += 1) {
    for (let j = 0; j <= M; j += 1) {
      if (f[i][j] === INF) continue;
      if (!inBand(i, j)) continue;

      // One word carries k names.
      for (let k = 1; k <= MAX_NAMES_PER_TOKEN; k += 1) {
        if (i + k > N || j + 1 > M) break;
        const cost = groupCost(i, k, tokens[j].skeleton);
        // Prefer the simple one-to-one reading; charge a little for fusing.
        const penalty = (k - 1) * FUSION_PENALTY + anchorPenalty(i + k, j + 1);
        const next = f[i][j] + cost + penalty;
        if (next < f[i + k][j + 1]) {
          f[i + k][j + 1] = next;
          back[i + k][j + 1] = { names: k, tokens: 1, cost };
        }
      }

      // One name spans m words.
      for (let m = 2; m <= MAX_TOKENS_PER_NAME; m += 1) {
        if (i + 1 > N || j + m > M) break;
        const cost = groupCost(i, 1, concatTokens(j, m));
        const penalty = (m - 1) * SPAN_PENALTY + anchorPenalty(i + 1, j + m);
        const next = f[i][j] + cost + penalty;
        if (next < f[i + 1][j + m]) {
          f[i + 1][j + m] = next;
          back[i + 1][j + m] = { names: 1, tokens: m, cost };
        }
      }
    }
  }

  if (f[N][M] === INF) {
    throw new Error("Alignment failed: no path covers all names and words");
  }

  // Walk the optimal path backwards.
  interface Group {
    nameFrom: number;
    nameCount: number;
    tokenFrom: number;
    tokenCount: number;
    cost: number;
  }
  const groups: Group[] = [];
  let i = N;
  let j = M;
  while (i > 0 || j > 0) {
    const step = back[i][j];
    if (!step) throw new Error(`Broken backtrace at (${i}, ${j})`);
    groups.push({
      nameFrom: i - step.names,
      nameCount: step.names,
      tokenFrom: j - step.tokens,
      tokenCount: step.tokens,
      cost: step.cost,
    });
    i -= step.names;
    j -= step.tokens;
  }
  groups.reverse();

  // Turn groups into per-name records, splitting words that carry several names.
  const namas: AlignedNama[] = [];
  const byVerse = new Map<number, AlignedNama[]>();

  for (const g of groups) {
    const groupTokens = tokens.slice(g.tokenFrom, g.tokenFrom + g.tokenCount);
    const verseIndex = groupTokens[0].verseIndex;
    const tokenIndices = Array.from({ length: g.tokenCount }, (_, x) => g.tokenFrom + x);

    if (g.nameCount === 1) {
      const iast = groupTokens.map((t) => t.iast).join(" ");
      const nama: AlignedNama = {
        index: g.nameFrom + 1,
        verseIndex,
        iast,
        fused: false,
        tokenIndices,
        score: g.cost,
      };
      namas.push(nama);
      byVerse.set(verseIndex, [...(byVerse.get(verseIndex) ?? []), nama]);
      continue;
    }

    // Several names inside one word: find the split points that minimise the
    // total edit distance against the expected forms.
    const token = groupTokens[0];
    const { skeleton, map } = foldWithMap(token.iast);
    const pieces = splitByBestCost(
      skeleton,
      targets.slice(g.nameFrom, g.nameFrom + g.nameCount),
    );

    let cursor = 0;
    pieces.forEach((len, idx) => {
      const from = cursor;
      const to = cursor + len;
      cursor = to;
      const a = map[from] ?? 0;
      const b = to - 1 < map.length ? map[to - 1] + 1 : Array.from(token.iast).length;
      const iast = Array.from(token.iast).slice(a, b).join("");
      const nama: AlignedNama = {
        index: g.nameFrom + idx + 1,
        verseIndex,
        iast,
        fused: true,
        tokenIndices,
        score: g.cost,
      };
      namas.push(nama);
      byVerse.set(verseIndex, [...(byVerse.get(verseIndex) ?? []), nama]);
    });

    if (g.cost > 0.5) {
      warnings.push(
        `names ${g.nameFrom + 1}-${g.nameFrom + g.nameCount} fused in "${token.iast}" (cost ${g.cost.toFixed(2)})`,
      );
    }
  }

  namas.sort((a, b) => a.index - b.index);
  for (const [k, list] of byVerse) {
    byVerse.set(k, list.sort((a, b) => a.index - b.index));
  }

  return { namas, byVerse, warnings };
}

/**
 * Align in segments delimited by the source's own every-hundred `kalā`
 * checkpoints.
 *
 * Each segment is solved independently with exact endpoints, so a mistake in
 * one hundred names cannot propagate into the next and the published nāma
 * numbering is guaranteed to agree with the source's own count.
 */
export function alignNamasSegmented(
  words: { verseIndex: number; iast: string }[],
  namavali: string[],
  /** Verse index at which each hundred begins, e.g. [0, 21, 41, ...]. */
  segmentVerseStarts: number[],
  /** Name number at which each segment begins, e.g. [1, 101, 201, ...]. */
  segmentNameStarts: number[],
): AlignmentResult {
  if (segmentVerseStarts.length !== segmentNameStarts.length) {
    throw new Error("Segment boundary arrays must be the same length");
  }

  const namas: AlignedNama[] = [];
  const byVerse = new Map<number, AlignedNama[]>();
  const warnings: string[] = [];

  for (let s = 0; s < segmentVerseStarts.length; s += 1) {
    const verseFrom = segmentVerseStarts[s];
    const verseTo = s + 1 < segmentVerseStarts.length ? segmentVerseStarts[s + 1] : Infinity;
    const nameFrom = segmentNameStarts[s] - 1;
    const nameTo = s + 1 < segmentNameStarts.length ? segmentNameStarts[s + 1] - 1 : namavali.length;

    const segWords = words.filter((w) => w.verseIndex >= verseFrom && w.verseIndex < verseTo);
    const segNames = namavali.slice(nameFrom, nameTo);

    if (!segWords.length || !segNames.length) {
      warnings.push(`segment ${s + 1}: empty (${segWords.length} words, ${segNames.length} names)`);
      continue;
    }

    const result = alignNamas(segWords, segNames);
    for (const n of result.namas) {
      const shifted: AlignedNama = { ...n, index: n.index + nameFrom };
      namas.push(shifted);
      byVerse.set(shifted.verseIndex, [...(byVerse.get(shifted.verseIndex) ?? []), shifted]);
    }
    warnings.push(...result.warnings.map((w) => `segment ${s + 1}: ${w}`));
  }

  namas.sort((a, b) => a.index - b.index);
  for (const [k, list] of byVerse) {
    byVerse.set(k, list.sort((a, b) => a.index - b.index));
  }

  return { namas, byVerse, warnings };
}

/**
 * Choose lengths that partition `skeleton` into `targets.length` consecutive
 * pieces minimising total normalized edit distance. Exhaustive over split
 * points, which is cheap for two or three pieces.
 */
function splitByBestCost(skeleton: string, targets: string[]): number[] {
  const n = targets.length;
  const L = skeleton.length;
  if (n === 1) return [L];

  let best: number[] = [];
  let bestCost = Infinity;

  const recurse = (start: number, idx: number, acc: number[], cost: number) => {
    if (cost >= bestCost) return;
    if (idx === n - 1) {
      const piece = skeleton.slice(start);
      const total = cost + normalizedCost(piece, targets[idx]);
      if (total < bestCost) {
        bestCost = total;
        best = [...acc, L - start];
      }
      return;
    }
    const remaining = n - idx - 1;
    for (let len = 1; len <= L - start - remaining; len += 1) {
      const piece = skeleton.slice(start, start + len);
      recurse(start + len, idx + 1, [...acc, len], cost + normalizedCost(piece, targets[idx]));
    }
  };

  recurse(0, 0, [], 0);
  return best.length ? best : targets.map(() => Math.floor(L / n));
}
