/**
 * How Sanskrit is actually printed in the scripts where a plain Unicode
 * mapping would look wrong to the people who read them.
 */

/** Marks where a compound member begins, for the rules that treat it as a word start. */
export const MEMBER_START = "\u2060";

/** Tamil letter for each Devanagari consonant, and the superscript that tells the stops apart. */
export const TAMIL_CONSONANTS: Record<string, [letter: string, mark: string]> = {
  क: ["க", ""],
  ख: ["க", "²"],
  ग: ["க", "³"],
  घ: ["க", "⁴"],
  ङ: ["ங", ""],
  च: ["ச", ""],
  छ: ["ச", "²"],
  ज: ["ஜ", ""],
  झ: ["ஜ", "⁴"],
  ञ: ["ஞ", ""],
  ट: ["ட", ""],
  ठ: ["ட", "²"],
  ड: ["ட", "³"],
  ढ: ["ட", "⁴"],
  ण: ["ண", ""],
  त: ["த", ""],
  थ: ["த", "²"],
  द: ["த", "³"],
  ध: ["த", "⁴"],
  न: ["ந", ""],
  प: ["ப", ""],
  फ: ["ப", "²"],
  ब: ["ப", "³"],
  भ: ["ப", "⁴"],
  म: ["ம", ""],
  य: ["ய", ""],
  र: ["ர", ""],
  ल: ["ல", ""],
  ळ: ["ள", ""],
  व: ["வ", ""],
  श: ["ஶ", ""],
  ष: ["ஷ", ""],
  स: ["ஸ", ""],
  ह: ["ஹ", ""],
};

export const TAMIL_VOWELS: Record<string, string> = {
  अ: "அ",
  आ: "ஆ",
  इ: "இ",
  ई: "ஈ",
  उ: "உ",
  ऊ: "ஊ",
  ऋ: "ரு",
  ॠ: "ரூ",
  ऌ: "லு",
  ए: "ஏ",
  ऐ: "ஐ",
  ओ: "ஓ",
  औ: "ஔ",
};

export const TAMIL_SIGNS: Record<string, string> = {
  "ा": "ா",
  "ि": "ி",
  "ी": "ீ",
  "ु": "ு",
  "ू": "ூ",
  "े": "ே",
  "ै": "ை",
  "ो": "ோ",
  "ौ": "ௌ",
  "्": "்",
};

/** Vocalic r and l have no sign in Tamil; they are written as a consonant, then ru or lu. */
const TAMIL_SYLLABIC: Record<string, string> = { "ृ": "ரு", "ॄ": "ரூ", "ॢ": "லு" };

const TAMIL_OTHER: Record<string, string> = { "ं": "ம்", "ः": "ஃ", "ऽ": "", ॐ: "ஓம்" };

const DENTALS = new Set(["त", "थ", "द", "ध"]);

const startsWord = (prev: string | undefined) => prev === undefined || /[\s\-।॥\u2060]/.test(prev);

/**
 * Sanskrit in Tamil script as stotra books print it. Tamil has one letter
 * for each group of four stops, so a superscript after the consonant's
 * syllable marks the aspirated and voiced ones: க ka, க² kha, க³ ga, க⁴ gha.
 * The dental n is ந at the start of a word and before a dental, ன elsewhere.
 */
export function devanagariToTamil(deva: string): string {
  const chars = [...deva];
  let out = "";
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    const consonant = TAMIL_CONSONANTS[c];
    if (consonant) {
      const mark = consonant[1];
      let letter = consonant[0];
      if (c === "न" && !startsWord(chars[i - 1]) && !(chars[i + 1] === "्" && DENTALS.has(chars[i + 2]))) {
        letter = "ன";
      }
      const next = chars[i + 1];
      if (next in TAMIL_SIGNS) {
        out += letter + TAMIL_SIGNS[next] + mark;
        i++;
      } else if (next in TAMIL_SYLLABIC) {
        out += letter + "்" + mark + TAMIL_SYLLABIC[next];
        i++;
      } else {
        out += letter + mark;
      }
    } else if (c in TAMIL_VOWELS) {
      out += TAMIL_VOWELS[c];
    } else if (c in TAMIL_OTHER) {
      out += TAMIL_OTHER[c];
    } else if (c >= "०" && c <= "९") {
      // Tamil numerals have fallen out of use; books number verses 1, 2, 3.
      out += String(c.charCodeAt(0) - 0x0966);
    } else {
      out += c;
    }
  }
  return out;
}

/** Characters after which a Bengali or Odia ya is no longer at the start of a syllable's onset. */
const AFTER_VOWEL = /[\u0985-\u0994\u09BE-\u09CC\u0995-\u09B9\u0B05-\u0B14\u0B3E-\u0B4C\u0B15-\u0B39]/;

/**
 * Bengali print conventions on top of the Unicode mapping: ya between vowels
 * is য়, as in নারায়ণ, and a t closing a syllable is ৎ, as in উৎপল, except
 * where it joins the next consonant in a conjunct.
 */
export function bengaliConventions(text: string): string {
  return text
    .replace(/য(?!\u09BC)/g, (m, offset: number) => (AFTER_VOWEL.test(text[offset - 1] ?? "") ? "য\u09BC" : m))
    .replace(/ত্(?![তথনমযরব])/g, "ৎ");
}

/**
 * Odia print conventions on top of the Unicode mapping: va is written ୱ
 * after a consonant, as in ଈଶ୍ୱର, and ବ elsewhere, as in ଶିବ; ya is ୟ except
 * at the start of a word, as in ନାରାୟଣ and ଧ୍ୟାନ; and ya after r is
 * doubled, as in ସୂର୍ଯ୍ୟ.
 */
export function odiaConventions(text: string): string {
  const doubled = text
    .replace(/୍ଵ/g, "୍ୱ")
    .replace(/ଵ/g, "ବ")
    .replace(/ର୍ଯ(?!୍)/g, "ର୍ଯ୍ୟ");
  return doubled.replace(/ଯ(?!୍ୟ)/g, (m, offset: number) => {
    const prev = doubled[offset - 1] ?? "";
    const afterVirama = prev === "୍" && doubled[offset - 2] !== "ର";
    return afterVirama || AFTER_VOWEL.test(prev) ? "ୟ" : m;
  });
}
