/**
 * Devanagari akṣara decomposition.
 *
 * Devanagari writes *orthographic syllables*, not letters: श्री is one written
 * unit built from śa + ra + ī. Learners reading romanized Sanskrit never have
 * to think about this, which is exactly why moving to the script is hard. This
 * module pulls each cluster apart so the UI can show its construction.
 *
 * Everything here is derived from Unicode code points, so it needs no data
 * files and works for any Devanagari input.
 */

import type {
  Aksara,
  AksaraPart,
  Articulation,
  Voicing,
} from "./types";

// ---------------------------------------------------------------------------
// Character tables
// ---------------------------------------------------------------------------

interface ConsonantInfo {
  iast: string;
  articulation: Articulation;
  voicing: Voicing;
  aspirated: boolean;
  /** Traditional class, used for grouping in the sounds reference page. */
  class:
    | "stop"
    | "nasal"
    | "semivowel"
    | "sibilant"
    | "aspirate"
    | "lateral";
}

/**
 * Consonants carry an inherent "a" unless a vowel sign or virāma cancels it,
 * so the IAST here is the bare consonant without that vowel.
 */
const CONSONANTS: Record<string, ConsonantInfo> = {
  // Guttural (kaṇṭhya)
  "क": { iast: "k", articulation: "guttural", voicing: "unvoiced", aspirated: false, class: "stop" },
  "ख": { iast: "kh", articulation: "guttural", voicing: "unvoiced", aspirated: true, class: "stop" },
  "ग": { iast: "g", articulation: "guttural", voicing: "voiced", aspirated: false, class: "stop" },
  "घ": { iast: "gh", articulation: "guttural", voicing: "voiced", aspirated: true, class: "stop" },
  "ङ": { iast: "ṅ", articulation: "guttural", voicing: "voiced", aspirated: false, class: "nasal" },
  // Palatal (tālavya)
  "च": { iast: "c", articulation: "palatal", voicing: "unvoiced", aspirated: false, class: "stop" },
  "छ": { iast: "ch", articulation: "palatal", voicing: "unvoiced", aspirated: true, class: "stop" },
  "ज": { iast: "j", articulation: "palatal", voicing: "voiced", aspirated: false, class: "stop" },
  "झ": { iast: "jh", articulation: "palatal", voicing: "voiced", aspirated: true, class: "stop" },
  "ञ": { iast: "ñ", articulation: "palatal", voicing: "voiced", aspirated: false, class: "nasal" },
  // Retroflex (mūrdhanya)
  "ट": { iast: "ṭ", articulation: "retroflex", voicing: "unvoiced", aspirated: false, class: "stop" },
  "ठ": { iast: "ṭh", articulation: "retroflex", voicing: "unvoiced", aspirated: true, class: "stop" },
  "ड": { iast: "ḍ", articulation: "retroflex", voicing: "voiced", aspirated: false, class: "stop" },
  "ढ": { iast: "ḍh", articulation: "retroflex", voicing: "voiced", aspirated: true, class: "stop" },
  "ण": { iast: "ṇ", articulation: "retroflex", voicing: "voiced", aspirated: false, class: "nasal" },
  // Dental (dantya)
  "त": { iast: "t", articulation: "dental", voicing: "unvoiced", aspirated: false, class: "stop" },
  "थ": { iast: "th", articulation: "dental", voicing: "unvoiced", aspirated: true, class: "stop" },
  "द": { iast: "d", articulation: "dental", voicing: "voiced", aspirated: false, class: "stop" },
  "ध": { iast: "dh", articulation: "dental", voicing: "voiced", aspirated: true, class: "stop" },
  "न": { iast: "n", articulation: "dental", voicing: "voiced", aspirated: false, class: "nasal" },
  // Labial (oṣṭhya)
  "प": { iast: "p", articulation: "labial", voicing: "unvoiced", aspirated: false, class: "stop" },
  "फ": { iast: "ph", articulation: "labial", voicing: "unvoiced", aspirated: true, class: "stop" },
  "ब": { iast: "b", articulation: "labial", voicing: "voiced", aspirated: false, class: "stop" },
  "भ": { iast: "bh", articulation: "labial", voicing: "voiced", aspirated: true, class: "stop" },
  "म": { iast: "m", articulation: "labial", voicing: "voiced", aspirated: false, class: "nasal" },
  // Semivowels (antaḥstha)
  "य": { iast: "y", articulation: "palatal", voicing: "voiced", aspirated: false, class: "semivowel" },
  "र": { iast: "r", articulation: "retroflex", voicing: "voiced", aspirated: false, class: "semivowel" },
  "ल": { iast: "l", articulation: "dental", voicing: "voiced", aspirated: false, class: "lateral" },
  "व": { iast: "v", articulation: "labiodental", voicing: "voiced", aspirated: false, class: "semivowel" },
  "ळ": { iast: "ḷ", articulation: "retroflex", voicing: "voiced", aspirated: false, class: "lateral" },
  // Sibilants and aspirate (ūṣman)
  "श": { iast: "ś", articulation: "palatal", voicing: "unvoiced", aspirated: false, class: "sibilant" },
  "ष": { iast: "ṣ", articulation: "retroflex", voicing: "unvoiced", aspirated: false, class: "sibilant" },
  "स": { iast: "s", articulation: "dental", voicing: "unvoiced", aspirated: false, class: "sibilant" },
  "ह": { iast: "h", articulation: "guttural", voicing: "voiced", aspirated: true, class: "aspirate" },
};

interface VowelInfo {
  iast: string;
  articulation: Articulation;
  long: boolean;
  name: string;
}

/** Independent vowel letters, used word-initially. */
const INDEPENDENT_VOWELS: Record<string, VowelInfo> = {
  "अ": { iast: "a", articulation: "guttural", long: false, name: "a" },
  "आ": { iast: "ā", articulation: "guttural", long: true, name: "ā" },
  "इ": { iast: "i", articulation: "palatal", long: false, name: "i" },
  "ई": { iast: "ī", articulation: "palatal", long: true, name: "ī" },
  "उ": { iast: "u", articulation: "labial", long: false, name: "u" },
  "ऊ": { iast: "ū", articulation: "labial", long: true, name: "ū" },
  "ऋ": { iast: "ṛ", articulation: "retroflex", long: false, name: "ṛ" },
  "ॠ": { iast: "ṝ", articulation: "retroflex", long: true, name: "ṝ" },
  "ऌ": { iast: "ḷ", articulation: "dental", long: false, name: "ḷ" },
  "ॡ": { iast: "ḹ", articulation: "dental", long: true, name: "ḹ" },
  "ए": { iast: "e", articulation: "guttural-palatal", long: true, name: "e" },
  "ऐ": { iast: "ai", articulation: "guttural-palatal", long: true, name: "ai" },
  "ओ": { iast: "o", articulation: "guttural-labial", long: true, name: "o" },
  "औ": { iast: "au", articulation: "guttural-labial", long: true, name: "au" },
};

/** Dependent vowel signs (mātrās) that attach to a consonant. */
const VOWEL_SIGNS: Record<string, VowelInfo> = {
  "ा": { iast: "ā", articulation: "guttural", long: true, name: "ā-kāra" },
  "ि": { iast: "i", articulation: "palatal", long: false, name: "i-kāra" },
  "ी": { iast: "ī", articulation: "palatal", long: true, name: "ī-kāra" },
  "ु": { iast: "u", articulation: "labial", long: false, name: "u-kāra" },
  "ू": { iast: "ū", articulation: "labial", long: true, name: "ū-kāra" },
  "ृ": { iast: "ṛ", articulation: "retroflex", long: false, name: "ṛ-kāra" },
  "ॄ": { iast: "ṝ", articulation: "retroflex", long: true, name: "ṝ-kāra" },
  "ॢ": { iast: "ḷ", articulation: "dental", long: false, name: "ḷ-kāra" },
  "ॣ": { iast: "ḹ", articulation: "dental", long: true, name: "ḹ-kāra" },
  "े": { iast: "e", articulation: "guttural-palatal", long: true, name: "e-kāra" },
  "ै": { iast: "ai", articulation: "guttural-palatal", long: true, name: "ai-kāra" },
  "ो": { iast: "o", articulation: "guttural-labial", long: true, name: "o-kāra" },
  "ौ": { iast: "au", articulation: "guttural-labial", long: true, name: "au-kāra" },
};

const VIRAMA = "\u094D";
const ANUSVARA = "\u0902";
const CANDRABINDU = "\u0901";
const VISARGA = "\u0903";
const AVAGRAHA = "\u093D";
const NUKTA = "\u093C";
const ZWJ = "\u200D";
const ZWNJ = "\u200C";

const MODIFIERS: Record<string, { iast: string; name: string; role: AksaraPart["role"]; articulation?: Articulation }> = {
  [ANUSVARA]: { iast: "ṃ", name: "anusvāra", role: "anusvara", articulation: "nasal" },
  [CANDRABINDU]: { iast: "m̐", name: "candrabindu", role: "candrabindu", articulation: "nasal" },
  [VISARGA]: { iast: "ḥ", name: "visarga", role: "visarga", articulation: "glottal" },
};

// ---------------------------------------------------------------------------
// Classification helpers
// ---------------------------------------------------------------------------

export const isConsonant = (ch: string): boolean => ch in CONSONANTS;
export const isIndependentVowel = (ch: string): boolean => ch in INDEPENDENT_VOWELS;
export const isVowelSign = (ch: string): boolean => ch in VOWEL_SIGNS;
export const isModifier = (ch: string): boolean => ch in MODIFIERS;
export const isDevanagari = (ch: string): boolean => {
  const cp = ch.codePointAt(0);
  return cp !== undefined && cp >= 0x0900 && cp <= 0x097f;
};

/** Human-readable label for a place of articulation, with its Sanskrit name. */
export const ARTICULATION_LABELS: Record<Articulation, { en: string; sa: string }> = {
  guttural: { en: "throat", sa: "kaṇṭhya" },
  palatal: { en: "hard palate", sa: "tālavya" },
  retroflex: { en: "roof of the mouth", sa: "mūrdhanya" },
  dental: { en: "teeth", sa: "dantya" },
  labial: { en: "lips", sa: "oṣṭhya" },
  labiodental: { en: "teeth and lips", sa: "dantoṣṭhya" },
  "guttural-palatal": { en: "throat and palate", sa: "kaṇṭhatālavya" },
  "guttural-labial": { en: "throat and lips", sa: "kaṇṭhoṣṭhya" },
  nasal: { en: "nose", sa: "nāsikya" },
  glottal: { en: "glottis", sa: "kaṇṭhya" },
};

// ---------------------------------------------------------------------------
// Decomposition
// ---------------------------------------------------------------------------

/**
 * Split Devanagari text into orthographic syllable clusters.
 *
 * A cluster is `(C + virāma)* C (vowel sign)? (modifier)?` or a standalone
 * independent vowel with an optional modifier. Anything else (punctuation,
 * spaces, digits) is passed through as its own cluster so callers can render
 * text verbatim.
 */
export function splitAksaras(text: string): string[] {
  const chars = Array.from(text);
  const clusters: string[] = [];
  let i = 0;

  while (i < chars.length) {
    const ch = chars[i];

    if (!isConsonant(ch) && !isIndependentVowel(ch)) {
      // Pass through punctuation, whitespace, avagraha, and anything unknown.
      clusters.push(ch);
      i += 1;
      continue;
    }

    let cluster = ch;
    i += 1;

    if (isConsonant(ch)) {
      // Absorb nukta immediately after the consonant.
      if (i < chars.length && chars[i] === NUKTA) {
        cluster += chars[i];
        i += 1;
      }
      // Absorb any number of `virāma + consonant` pairs to form a conjunct.
      while (i < chars.length && chars[i] === VIRAMA) {
        cluster += chars[i];
        i += 1;
        // A virāma may be followed by a joiner control character.
        while (i < chars.length && (chars[i] === ZWJ || chars[i] === ZWNJ)) {
          cluster += chars[i];
          i += 1;
        }
        if (i < chars.length && isConsonant(chars[i])) {
          cluster += chars[i];
          i += 1;
          if (i < chars.length && chars[i] === NUKTA) {
            cluster += chars[i];
            i += 1;
          }
        } else {
          // Trailing virāma with no following consonant ends the cluster.
          break;
        }
      }
      // A single vowel sign may follow the final consonant.
      if (i < chars.length && isVowelSign(chars[i])) {
        cluster += chars[i];
        i += 1;
      }
    }

    // Any cluster may end with anusvāra, candrabindu, or visarga.
    if (i < chars.length && isModifier(chars[i])) {
      cluster += chars[i];
      i += 1;
    }

    clusters.push(cluster);
  }

  return clusters;
}

/** Decompose a single cluster into its constituent parts. */
export function decomposeAksara(cluster: string): Aksara {
  const chars = Array.from(cluster);
  const parts: AksaraPart[] = [];
  let iast = "";
  let consonantCount = 0;

  for (let i = 0; i < chars.length; i += 1) {
    const ch = chars[i];

    if (isConsonant(ch)) {
      const info = CONSONANTS[ch];
      consonantCount += 1;
      // The inherent "a" sounds only if nothing cancels it: no virāma and no
      // vowel sign anywhere later in the cluster.
      const rest = chars.slice(i + 1);
      const nextIsVirama = rest[0] === VIRAMA || rest[0] === NUKTA && rest[1] === VIRAMA;
      const hasLaterVowelSign = rest.some(isVowelSign);
      const inherent = !nextIsVirama && !hasLaterVowelSign;

      parts.push({
        char: ch,
        role: "consonant",
        iast: inherent ? `${info.iast}a` : info.iast,
        name: `${info.iast}a`,
        articulation: info.articulation,
        voicing: info.voicing,
        aspirated: info.aspirated,
        inherentVowel: inherent || undefined,
      });
      iast += inherent ? `${info.iast}a` : info.iast;
      continue;
    }

    if (isIndependentVowel(ch)) {
      const info = INDEPENDENT_VOWELS[ch];
      parts.push({
        char: ch,
        role: "vowel",
        iast: info.iast,
        name: `${info.name} (independent)`,
        articulation: info.articulation,
        voicing: "voiced",
      });
      iast += info.iast;
      continue;
    }

    if (isVowelSign(ch)) {
      const info = VOWEL_SIGNS[ch];
      parts.push({
        char: ch,
        role: "vowel-sign",
        iast: info.iast,
        name: info.name,
        articulation: info.articulation,
        voicing: "voiced",
      });
      iast += info.iast;
      continue;
    }

    if (ch === VIRAMA) {
      parts.push({
        char: ch,
        role: "virama",
        iast: "",
        name: "virāma (cancels the inherent a)",
      });
      continue;
    }

    if (isModifier(ch)) {
      const info = MODIFIERS[ch];
      parts.push({
        char: ch,
        role: info.role,
        iast: info.iast,
        name: info.name,
        articulation: info.articulation,
      });
      iast += info.iast;
      continue;
    }

    if (ch === AVAGRAHA) {
      parts.push({ char: ch, role: "avagraha", iast: "'", name: "avagraha (elided a)" });
      iast += "'";
      continue;
    }

    if (ch === NUKTA) {
      parts.push({ char: ch, role: "nukta", iast: "", name: "nukta" });
      continue;
    }

    if (ch === ZWJ || ch === ZWNJ) {
      continue;
    }

    parts.push({ char: ch, role: "other", iast: ch, name: ch });
    iast += ch;
  }

  return {
    text: cluster,
    iast,
    parts,
    isConjunct: consonantCount > 1,
  };
}

/** Decompose a whole word or line into akṣaras. */
export function analyzeAksaras(text: string): Aksara[] {
  return splitAksaras(text)
    .filter((c) => c.trim().length > 0)
    .map(decomposeAksara);
}

/** Count syllables, which for verse is the count of vowel-bearing clusters. */
export function countSyllables(text: string): number {
  return analyzeAksaras(text).filter((a) =>
    a.parts.some(
      (p) =>
        p.role === "vowel" ||
        p.role === "vowel-sign" ||
        (p.role === "consonant" && p.inherentVowel),
    ),
  ).length;
}

export { CONSONANTS, INDEPENDENT_VOWELS, VOWEL_SIGNS };
