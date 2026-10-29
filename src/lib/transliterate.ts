/**
 * The verse and the names in every spelling people search for them in.
 *
 * Devanagari and IAST come from the data; everything else is derived here at
 * build time, so it never ships to the browser.
 */

import Sanscript from "@indic-transliteration/sanscript";

import { bengaliConventions, devanagariToTamil, MEMBER_START, odiaConventions } from "./print-conventions";
import { toDevanagariDigits } from "./utils";

export type SpellingId =
  | "deva"
  | "iast"
  | "plain"
  | "itrans"
  | "hk"
  | "telugu"
  | "kannada"
  | "malayalam"
  | "tamil"
  | "gujarati"
  | "bengali"
  | "odia";

export type Spelling = {
  id: SpellingId;
  label: string;
  /** BCP 47 tag for the text, so browsers pick the right font and screen readers the right voice. */
  lang: string;
  /** What the reader should know before relying on this spelling. */
  note?: string;
};

export const SPELLINGS: Record<SpellingId, Spelling> = {
  deva: { id: "deva", label: "Devanagari", lang: "sa-Deva" },
  iast: { id: "iast", label: "IAST", lang: "sa-Latn" },
  plain: {
    id: "plain",
    label: "Simple English spelling",
    lang: "sa-Latn",
    note: "Without diacritics, as it is often typed. It cannot show long vowels or the retroflex sounds, so learn the pronunciation from the IAST or the audio.",
  },
  itrans: { id: "itrans", label: "ITRANS", lang: "sa-Latn" },
  hk: { id: "hk", label: "Harvard-Kyoto", lang: "sa-Latn" },
  telugu: { id: "telugu", label: "Telugu", lang: "sa-Telu" },
  kannada: { id: "kannada", label: "Kannada", lang: "sa-Knda" },
  malayalam: { id: "malayalam", label: "Malayalam", lang: "sa-Mlym" },
  tamil: {
    id: "tamil",
    label: "Tamil",
    lang: "sa-Taml",
    note: "Tamil has one letter for each set of four stops, so the small numbers after a letter mark the aspirated and voiced sounds, as stotra books print them: க ka, க² kha, க³ ga, க⁴ gha.",
  },
  gujarati: { id: "gujarati", label: "Gujarati", lang: "sa-Gujr" },
  bengali: {
    id: "bengali",
    label: "Bengali",
    lang: "sa-Beng",
    note: "Bengali writes b and v with the same letter, ব, so check the IAST or the audio for which is meant.",
  },
  odia: {
    id: "odia",
    label: "Odia",
    lang: "sa-Orya",
    note: "Odia writes b and v with the same letter, ବ, except after a consonant, so check the IAST or the audio for which is meant.",
  },
};

/** The order spellings are offered in, after Devanagari and IAST. */
export const OTHER_SPELLINGS: SpellingId[] = [
  "plain",
  "itrans",
  "hk",
  "telugu",
  "kannada",
  "malayalam",
  "tamil",
  "gujarati",
  "bengali",
  "odia",
];

const PLAIN: Record<string, string> = {
  ch: "chh",
  c: "ch",
  ś: "sh",
  ṣ: "sh",
  ṛ: "ri",
  ṝ: "ri",
  ḷ: "li",
  ḹ: "li",
  ā: "a",
  ī: "i",
  ū: "u",
  ṃ: "m",
  ṁ: "m",
  ḥ: "h",
  ṅ: "n",
  ñ: "n",
  ṇ: "n",
  ṭ: "t",
  ḍ: "d",
};

/** IAST without diacritics, the way a verse is usually typed into a search box. */
export function plainSpelling(iast: string): string {
  return iast
    .normalize("NFC")
    .toLowerCase()
    .replace(/ch|[cśṣṛṝḷḹāīūṃṁḥṅñṇṭḍ]/g, (m) => PLAIN[m])
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Text in the given spelling, from its Devanagari and IAST forms.
 *
 * `members` is the Devanagari with its compounds hyphenated. Some scripts
 * spell a sound differently at the start of a word, and a compound member
 * counts as one, so where it is given it marks those starts.
 */
export function spell(id: SpellingId, deva: string, iast: string, members?: string): string {
  if (members && members.replaceAll("-", "") === deva) {
    return convert(id, members.replaceAll("-", MEMBER_START), iast).replaceAll(MEMBER_START, "");
  }
  return convert(id, deva, iast);
}

function convert(id: SpellingId, deva: string, iast: string): string {
  switch (id) {
    case "deva":
      return deva;
    case "iast":
      return iast;
    case "plain":
      return plainSpelling(iast);
    case "tamil":
      // Tamil sources write śrī with ஸ, and searches follow them.
      return devanagariToTamil(deva).replaceAll("ஶ்ரீ", "ஸ்ரீ");
    case "malayalam":
      // Malayalam numerals have fallen out of use.
      return Sanscript.t(deva, "devanagari", "malayalam").replace(/[൦-൯]/g, (d) => String(d.charCodeAt(0) - 0x0d66));
    case "bengali":
      return bengaliConventions(Sanscript.t(deva, "devanagari", "bengali"));
    case "odia":
      return odiaConventions(Sanscript.t(deva, "devanagari", "oriya"));
    default:
      return Sanscript.t(deva, "devanagari", id);
  }
}

/** What a reader of each script calls it, for choosing one. */
export const NATIVE_LABELS: Partial<Record<SpellingId, string>> = {
  telugu: "తెలుగు",
  kannada: "ಕನ್ನಡ",
  malayalam: "മലയാളം",
  tamil: "தமிழ்",
  gujarati: "ગુજરાતી",
  bengali: "বাংলা",
  odia: "ଓଡ଼ିଆ",
};

export type SpelledText = Spelling & { text: string; native?: string };

/**
 * A verse in every spelling, line by line, closed with daṇḍas and the verse
 * number as printed editions do. Devanagari and IAST come first.
 */
export function verseSpellings(lines: VerseLine[], number: number | null): SpelledText[] {
  const ids: SpellingId[] = ["deva", "iast", ...OTHER_SPELLINGS];
  return ids.map((id) => ({
    ...SPELLINGS[id],
    text: spellVerse(id, lines, number).join("\n"),
    native: NATIVE_LABELS[id],
  }));
}

type VerseLine = { deva: string; iast: string; tokens?: { deva: string; hyphenated?: { deva: string } }[] };

/** A line's Devanagari with its compounds hyphenated, when the tokens say where they divide. */
const lineMembers = (line: VerseLine) => line.tokens?.map((t) => t.hyphenated?.deva ?? t.deva).join(" ");

/** A verse's lines in one spelling, each closed with its daṇḍa; null for the unnumbered dhyāna. */
export function spellVerse(id: SpellingId, lines: VerseLine[], number: number | null): string[] {
  const latin = SPELLINGS[id].lang === "sa-Latn";
  return lines.map((line, i) => {
    const body = spell(id, line.deva, line.iast, lineMembers(line));
    if (number === null) return body;
    const last = i === lines.length - 1;
    if (latin) return `${body} ${last ? `|| ${number} ||` : "|"}`;
    return `${body} ${last ? `॥ ${spell(id, toDevanagariDigits(number), String(number))} ॥` : "।"}`;
  });
}

/** Capitalise each word, for names written as proper nouns in running English. */
export const titleCase = (s: string) => s.replace(/(^|[\s-])(\p{L})/gu, (_, sep, ch) => sep + ch.toUpperCase());

/** Capitalise only the first letter, so a hyphenated form still matches its plain spelling. */
export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
