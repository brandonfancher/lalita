/**
 * Shapes for the hand-written half of the nāma dataset, plus the compact
 * authoring form the batch files in `namas-content-*.ts` use.
 *
 * Authoring form only carries what has to be judged by hand. Everything a
 * machine can work out — Devanagari for every IAST string, the declension
 * class, the stem for regular vowel stems, and the default feminine nominative
 * singular morphology that nearly every epithet of the goddess has — is filled
 * in by `scripts/build-namas.ts`.
 */

export type CompoundType =
  | "tatpuruṣa"
  | "karmadhāraya"
  | "bahuvrīhi"
  | "dvandva"
  | "dvigu"
  | "avyayībhāva";

/** A constituent that is itself simple: just an IAST stem and its meaning. */
export type LeafSpec = [iast: string, gloss: string];

/** A constituent that is itself a compound, analysed recursively. */
export interface NestedSpec {
  iast: string;
  type: CompoundType;
  gloss: string;
  vigraha: string;
  children: ChildSpec[];
}

export type ChildSpec = LeafSpec | NestedSpec;

export interface CompoundSpec {
  type: CompoundType;
  /** Meaning of the whole compound, lower case. */
  gloss: string;
  /** The traditional paraphrase that unpacks the compound. */
  vigraha: string;
  children: ChildSpec[];
  /** IAST of the compound; defaults to the name's own nominative. */
  iast?: string;
}

/** What each batch file supplies for one nāma. */
export interface NamaContent {
  /** Short title-case rendering, a few words. */
  gloss: string;
  /** A sentence of original prose. */
  translation: string;
  /** Omitted for names that are not compounds. */
  compound?: CompoundSpec;

  // Morphology overrides. Anything omitted falls back to the default of a
  // feminine nominative singular noun whose stem class is read off the ending.
  pos?: string;
  gender?: string;
  grammaticalCase?: string;
  caseNumber?: number;
  number?: string;
  declension?: string;
  /** IAST of the stem, when it cannot be read off the nominative. */
  stem?: string;
  note?: string;
}

export type Batch = Record<number, NamaContent>;

/** Narrowing helper: is this constituent itself a compound? */
export function isNested(child: ChildSpec): child is NestedSpec {
  return !Array.isArray(child);
}
