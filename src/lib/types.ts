/**
 * Shared data contract for the study site.
 *
 * The pipeline in `scripts/` emits JSON matching these types into `data/`,
 * and the app reads that JSON at build time. Nothing here is fetched at runtime.
 */

/** Transliteration schemes used throughout. */
export type Script = "devanagari" | "iast";

// ---------------------------------------------------------------------------
// Akṣara (syllable) decomposition
// ---------------------------------------------------------------------------

export type AksaraRole =
  | "consonant"
  | "vowel"
  | "vowel-sign"
  | "virama"
  | "anusvara"
  | "visarga"
  | "candrabindu"
  | "avagraha"
  | "nukta"
  | "other";

/** The five Sanskrit places of articulation, plus the compound ones. */
export type Articulation =
  | "guttural"
  | "palatal"
  | "retroflex"
  | "dental"
  | "labial"
  | "labiodental"
  | "guttural-palatal"
  | "guttural-labial"
  | "nasal"
  | "glottal";

export type Voicing = "voiced" | "unvoiced";

/** One atomic piece inside a written syllable cluster. */
export interface AksaraPart {
  /** The bare Devanagari character, e.g. "श" or "ी". */
  char: string;
  role: AksaraRole;
  /** Romanized value of this part alone, e.g. "śa", "ī". */
  iast: string;
  /** Traditional name, e.g. "śa", "dīrgha ī". */
  name: string;
  articulation?: Articulation;
  voicing?: Voicing;
  aspirated?: boolean;
  /**
   * True when a consonant carries the inherent "a" because no vowel sign or
   * virāma follows it. This is the single most common source of confusion for
   * learners reading Devanagari, so the UI calls it out explicitly.
   */
  inherentVowel?: boolean;
}

/** One written syllable cluster, e.g. "श्री". */
export interface Aksara {
  /** The cluster as written. */
  text: string;
  /** Romanization of the whole cluster. */
  iast: string;
  parts: AksaraPart[];
  /** True when two or more consonants are joined into a ligature. */
  isConjunct: boolean;
}

// ---------------------------------------------------------------------------
// Grammar
// ---------------------------------------------------------------------------

export type PartOfSpeech =
  | "noun"
  | "adjective"
  | "pronoun"
  | "verb"
  | "participle"
  | "indeclinable"
  | "prefix"
  | "particle"
  | "numeral";

export type Gender = "feminine" | "masculine" | "neuter";
export type GrammaticalNumber = "singular" | "dual" | "plural";

/** The eight Sanskrit cases, in the traditional order. */
export type Case =
  | "nominative"
  | "accusative"
  | "instrumental"
  | "dative"
  | "ablative"
  | "genitive"
  | "locative"
  | "vocative";

export type Tense =
  | "present"
  | "imperfect"
  | "perfect"
  | "aorist"
  | "future"
  | "conditional"
  | "imperative"
  | "optative"
  | "benedictive";

export type Person = "first" | "second" | "third";
export type Voice = "active" | "middle" | "passive";

export interface Morphology {
  pos: PartOfSpeech;
  /** Dictionary/stem form in Devanagari. */
  stem: string;
  /** Dictionary/stem form in IAST. */
  stemIast: string;
  gender?: Gender;
  case?: Case;
  number?: GrammaticalNumber;
  /** Traditional case number 1-8, for learners following Sanskrit convention. */
  caseNumber?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /** Declension class, e.g. "ā-stem", "ī-stem", "consonant stem". */
  declension?: string;
  tense?: Tense;
  person?: Person;
  voice?: Voice;
  /** Verbal root, when relevant, e.g. "√lal". */
  root?: string;
  rootMeaning?: string;
  /** Free-text note on anything irregular or noteworthy. */
  note?: string;
}

/** The classical compound types. */
export type CompoundType =
  | "tatpurusha"
  | "karmadharaya"
  | "bahuvrihi"
  | "dvandva"
  | "dvigu"
  | "avyayibhava"
  | "upapada";

/**
 * A node in a compound-analysis tree. Leaves are individual stems; internal
 * nodes are the compounds that bind them. Nearly every nāma in this text is a
 * compound, so this tree is the primary grammatical diagram on a module page.
 */
export interface CompoundNode {
  text: string;
  iast: string;
  /** Present on internal nodes; absent on leaves. */
  type?: CompoundType;
  /** How this node resolves, e.g. "she whose throne is the lion-seat". */
  gloss: string;
  /**
   * The paraphrase (vigraha) that unpacks the compound into separate words,
   * which is how the tradition itself explains compounds.
   */
  vigraha?: string;
  /** Leaf-level grammar. */
  morphology?: Morphology;
  children?: CompoundNode[];
}

// ---------------------------------------------------------------------------
// Words and nāmas
// ---------------------------------------------------------------------------

/**
 * A word as it actually appears in the verse, after sandhi. Clicking one of
 * these in either script pane opens the word inspector.
 */
export interface Token {
  id: string;
  deva: string;
  iast: string;
  /**
   * The nāmas this written word carries, by their number in the thousand.
   *
   * Usually one. Sandhi regularly fuses two names into a single written word
   * (`ayoniryoninilayā` is `ayoniḥ` and `yoninilayā`), and conversely a long
   * name is sometimes printed as two words, in which case both words point back
   * at the same nāma.
   */
  namaIndices?: number[];
  /**
   * Word-level analysis for verses not built out of the thousand names — the
   * dhyāna verses above all, where every word still has to be inspectable.
   */
  word?: WordGloss;
  aksaras: Aksara[];
  /** Sandhi note explaining how this surface form arose, when it isn't obvious. */
  sandhi?: string;
}

/** The meaning and grammar of a single word that is not one of the nāmas. */
export interface WordGloss {
  /** Short gloss, a few words. */
  gloss: string;
  /** A fuller rendering of the word in context. */
  translation?: string;
  /** Dictionary form, IAST. */
  lemma?: string;
  lemmaDeva?: string;
  morphology?: Morphology;
  compound?: CompoundNode;
  /**
   * Set when the printed text breaks a single compound across a space, so the
   * reader is told which neighbouring words belong with this one.
   */
  partOf?: string;
  note?: string;
}

/** One of the thousand names. */
export interface Nama {
  /** Position in the sahasranāma, 1-1000. */
  index: number;
  /** Citation form (as it appears in the nāmāvalī), Devanagari. */
  deva: string;
  /** Citation form, IAST. */
  iast: string;
  /** The dative form used in ritual recitation, e.g. "śrīmātre namaḥ". */
  namavaliDeva?: string;
  namavaliIast?: string;
  /** Short gloss, a few words. */
  gloss: string;
  /** Fuller rendering into English. */
  translation: string;
  aksaras: Aksara[];
  morphology: Morphology;
  /** Compound analysis. Absent for simple, non-compound names. */
  compound?: CompoundNode;
  /** Original commentary on this specific name. */
  commentary?: string;
}

// ---------------------------------------------------------------------------
// Commentary and references
// ---------------------------------------------------------------------------

export type ReferenceKind =
  | "text"
  | "book"
  | "article"
  | "video"
  | "audio"
  | "website"
  | "dictionary";

export interface Reference {
  kind: ReferenceKind;
  title: string;
  /** Author, editor, or performer. */
  author?: string;
  url?: string;
  /** Why this is worth your time. */
  note?: string;
  /** For videos: start at this second. */
  startSec?: number;
}

/**
 * A passage quoted from another text, translated and shown inline so that
 * following a cross-reference never means leaving the site.
 */
export interface CrossReference {
  /** e.g. "Saundaryalaharī 8" or "Devī Māhātmya 1.78". */
  source: string;
  deva?: string;
  iast?: string;
  translation: string;
  /** How this passage bears on the present verse. */
  relevance: string;
}

export interface Commentary {
  /** Plain sense of the verse as a whole. */
  meaning: string;
  /** History, mythology, and background. Markdown. */
  history?: string;
  /** Practice or contemplative notes. Markdown. */
  practice?: string;
  crossReferences?: CrossReference[];
}

// ---------------------------------------------------------------------------
// Modules
// ---------------------------------------------------------------------------

/** A line of verse, in both scripts. */
export interface VerseLine {
  deva: string;
  iast: string;
  tokens: Token[];
}

export interface ChantTiming {
  startSec: number;
  endSec: number;
  confidence?: "detected" | "interpolated" | "manual";
}

export type ModuleKind = "dhyana" | "shloka";

/** One study module: the dhyāna set, or one shloka of the main stotra. */
export interface StudyModule {
  /** Zero-padded id: "000" for dhyāna, "001".."182" for the stotra. */
  id: string;
  kind: ModuleKind;
  /** Verse number in the stotra; null for the dhyāna module. */
  number: number | null;
  /** Short human title, e.g. "Shloka 1" or "Dhyāna". */
  title: string;
  /** A memorable epithet drawn from the verse's content. */
  subtitle?: string;
  lines: VerseLine[];
  namas: Nama[];
  /** Inclusive range of nāma indices covered, e.g. [1, 6]. */
  namaRange?: [number, number];
  chant?: ChantTiming;
  commentary: Commentary;
  references: Reference[];
}

/** Lightweight entry for the index page and search, avoiding full module loads. */
export interface ModuleSummary {
  id: string;
  kind: ModuleKind;
  number: number | null;
  title: string;
  subtitle?: string;
  namaRange?: [number, number];
  /** First line, for preview. */
  previewDeva: string;
  previewIast: string;
  namaCount: number;
}

// ---------------------------------------------------------------------------
// Dictionary
// ---------------------------------------------------------------------------

export interface LexEntry {
  key: string;
  slp1?: string;
  deva: string;
  senses: string[];
  grammar?: string;
  etymology?: string;
}
