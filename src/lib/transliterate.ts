/**
 * The verse and the names in every spelling people search for them in.
 *
 * Devanagari and IAST come from the data; everything else is derived here at
 * build time, so it never ships to the browser.
 */

import Sanscript from "@indic-transliteration/sanscript";

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
  | "bengali";

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
    note: "Tamil script has no letters for the aspirated and voiced stops, so several Sanskrit sounds share one letter here.",
  },
  gujarati: { id: "gujarati", label: "Gujarati", lang: "sa-Gujr" },
  bengali: { id: "bengali", label: "Bengali", lang: "sa-Beng" },
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

/** Text in the given spelling, from its Devanagari and IAST forms. */
export function spell(id: SpellingId, deva: string, iast: string): string {
  switch (id) {
    case "deva":
      return deva;
    case "iast":
      return iast;
    case "plain":
      return plainSpelling(iast);
    case "tamil":
      // Tamil sources write śrī with ஸ, and searches follow them.
      return Sanscript.t(deva, "devanagari", "tamil").replaceAll("ஶ்ரீ", "ஸ்ரீ");
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
};

export type SpelledText = Spelling & { text: string; native?: string };

/**
 * A verse in every spelling, line by line, closed with daṇḍas and the verse
 * number as printed editions do. Devanagari and IAST come first.
 */
export function verseSpellings(lines: { deva: string; iast: string }[], number: number | null): SpelledText[] {
  const ids: SpellingId[] = ["deva", "iast", ...OTHER_SPELLINGS];
  return ids.map((id) => {
    const latin = SPELLINGS[id].lang === "sa-Latn";
    const text = lines
      .map((line, i) => {
        const body = spell(id, line.deva, line.iast);
        if (number === null) return body;
        const last = i === lines.length - 1;
        if (latin) return `${body} ${last ? `|| ${number} ||` : "|"}`;
        return `${body} ${last ? `॥ ${spell(id, toDevanagariDigits(number), String(number))} ॥` : "।"}`;
      })
      .join("\n");
    return { ...SPELLINGS[id], text, native: NATIVE_LABELS[id] };
  });
}

/** Capitalise each word, for names written as proper nouns in running English. */
export const titleCase = (s: string) => s.replace(/(^|[\s-])(\p{L})/gu, (_, sep, ch) => sep + ch.toUpperCase());

/** Capitalise only the first letter, so a hyphenated form still matches its plain spelling. */
export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
