/**
 * Checks the text in every script against the Devanagari it is made from.
 *
 *   pnpm scripts:check
 *
 * 1. The IAST in the data must be exactly what the Devanagari transliterates to.
 * 2. No script may leave Devanagari letters behind.
 * 3. Each script, read back into Devanagari, must give the original. Where a
 *    script cannot tell two sounds apart (b and v in Bengali and Odia; ṛ and
 *    ru, ṃ and m in Tamil), both sides are folded together first, and the
 *    lines that depend on the distinction are counted.
 *
 * Exits non-zero on any failure.
 */

import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import Sanscript from "@indic-transliteration/sanscript";

import { TAMIL_CONSONANTS, TAMIL_SIGNS, TAMIL_VOWELS } from "../src/lib/print-conventions";
import { OTHER_SPELLINGS, spell, SPELLINGS, type SpellingId } from "../src/lib/transliterate";

type Text = { id: string; deva: string; iast: string; members?: string };

const root = resolve(import.meta.dirname, "..");
const texts: Text[] = [];
for (const file of readdirSync(resolve(root, "data/modules")).sort()) {
  const mod = JSON.parse(readFileSync(resolve(root, "data/modules", file), "utf8"));
  mod.lines.forEach((l: Text & { tokens: { deva: string; hyphenated?: { deva: string } }[] }, i: number) =>
    texts.push({
      id: `shloka ${mod.id} line ${i + 1}`,
      deva: l.deva,
      iast: l.iast,
      members: l.tokens.map((t) => t.hyphenated?.deva ?? t.deva).join(" "),
    }),
  );
}
for (const n of JSON.parse(readFileSync(resolve(root, "data/namas-index.json"), "utf8"))) {
  texts.push({ id: `name ${n.index}`, deva: n.deva, iast: n.iast, members: n.hyphenated?.deva });
  if (n.namavaliDeva) {
    const members = n.namavaliHyphenated?.deva;
    texts.push({ id: `name ${n.index} nāmāvalī`, deva: n.namavaliDeva, iast: n.namavaliIast, members });
  }
}

let failures = 0;
const fail = (msg: string) => {
  if (failures++ < 40) console.log(`  ✗ ${msg}`);
};

console.log(`${texts.length} texts: every line of the stotra, every name, every nāmāvalī form\n`);

console.log("IAST matches Devanagari");
for (const t of texts) {
  const derived = Sanscript.t(t.deva, "devanagari", "iast").normalize("NFC");
  if (derived !== t.iast.normalize("NFC")) fail(`${t.id}: data "${t.iast}", Devanagari gives "${derived}"`);
}

const SANSCRIPT: Partial<Record<SpellingId, string>> = {
  telugu: "telugu",
  kannada: "kannada",
  malayalam: "malayalam",
  gujarati: "gujarati",
  bengali: "bengali",
  odia: "oriya",
};

/** Undo the print conventions so Sanscript can read the text back. */
const UNDO: Partial<Record<SpellingId, (s: string) => string>> = {
  bengali: (s) => s.replaceAll("য\u09BC", "য").replaceAll("ৎ", "ত্"),
  odia: (s) => s.replaceAll("ର୍ଯ୍ୟ", "ର୍ଯ").replaceAll("ୟ", "ଯ").replaceAll("ୱ", "ଵ"),
  malayalam: (s) => s.replace(/[0-9]/g, (d) => String.fromCharCode(0x0d66 + Number(d))),
};

/** Distinctions a script cannot write, folded out of the Devanagari before comparing. */
const FOLD: Partial<Record<SpellingId, (s: string) => string>> = {
  bengali: (s) => s.replaceAll("व", "ब"),
  odia: (s) => s.replaceAll("व", "ब"),
  tamil: (s) =>
    s.replaceAll("ृ", "्रु").replaceAll("ॄ", "्रू").replaceAll("ॢ", "्लु").replaceAll("ं", "म्").replaceAll("ऽ", ""),
};

const TAMIL_BACK = new Map<string, string>();
for (const [deva, [letter, mark]] of Object.entries(TAMIL_CONSONANTS)) TAMIL_BACK.set(letter + mark, deva);
TAMIL_BACK.set("ன", "न");
const invert = (o: Record<string, string>) => new Map(Object.entries(o).map(([k, v]) => [v, k]));
const TAMIL_SIGNS_BACK = invert(TAMIL_SIGNS);
const TAMIL_VOWELS_BACK = invert(TAMIL_VOWELS);
const TAMIL_OTHER_BACK = new Map([["ஃ", "ः"]]);
const MARKS = new Set(["²", "³", "⁴"]);
const TAMIL_LETTERS = new Set([...TAMIL_BACK.keys()].map((k) => k[0]));

function tamilToDevanagari(text: string): string {
  const chars = [...text.replaceAll("ஸ்ரீ", "ஶ்ரீ")];
  let out = "";
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (TAMIL_LETTERS.has(c)) {
      let sign = "";
      if (TAMIL_SIGNS_BACK.has(chars[i + 1])) sign = TAMIL_SIGNS_BACK.get(chars[++i])!;
      const mark = MARKS.has(chars[i + 1]) ? chars[++i] : "";
      const consonant = TAMIL_BACK.get(c + mark);
      if (!consonant) return `<unreadable ${c}${mark}>`;
      out += consonant + sign;
    } else if (TAMIL_VOWELS_BACK.has(c)) {
      out += TAMIL_VOWELS_BACK.get(c);
    } else if (TAMIL_OTHER_BACK.has(c)) {
      out += TAMIL_OTHER_BACK.get(c);
    } else {
      out += c;
    }
  }
  return out;
}

const DEVANAGARI_LETTER = /[\u0900-\u0963\u0971-\u097F]/;

for (const id of OTHER_SPELLINGS) {
  if (SPELLINGS[id].lang === "sa-Latn") continue;
  let folded = 0;
  const before = failures;
  for (const t of texts) {
    const out = spell(id, t.deva, t.iast, t.members);
    if (DEVANAGARI_LETTER.test(out)) fail(`${id}, ${t.id}: Devanagari left in "${out}"`);
    const back =
      id === "tamil" ? tamilToDevanagari(out) : Sanscript.t((UNDO[id] ?? ((s) => s))(out), SANSCRIPT[id]!, "devanagari");
    const fold = FOLD[id] ?? ((s: string) => s);
    if (fold(back) !== fold(t.deva)) fail(`${id}, ${t.id}:\n      source  ${t.deva}\n      ${id.padEnd(7)} ${out}\n      back    ${back}`);
    else if (back !== t.deva) folded++;
  }
  const status = failures === before ? "✓" : "✗";
  console.log(
    `${status} ${SPELLINGS[id].label}: reads back to the source` +
      (folded ? `, with ${folded} texts relying on a distinction the script cannot write` : " exactly"),
  );
}

if (failures) {
  console.log(`\n${failures} problem${failures === 1 ? "" : "s"} found.`);
  process.exit(1);
}
console.log("\nNo problems found.");
