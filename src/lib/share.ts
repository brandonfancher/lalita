import type { ShareContent } from "@/components/share-bar";

import { absoluteUrl, namaPath, namaRangeLabel, shlokaPath } from "./site";
import type { Nama, StudyModule } from "./types";
import { toDevanagariDigits } from "./utils";

/** The opening sentence of a passage, if it is short enough to quote in a chat message. */
function firstSentence(text: string | undefined, max = 240): string | null {
  if (!text) return null;
  const sentence = text.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? text;
  return sentence.length <= max ? sentence : null;
}

/** Name of a shloka for a sentence: "Shloka 12" or "The dhyāna verses". */
export const shlokaName = (mod: StudyModule) => (mod.number === null ? "The dhyāna verses" : `Shloka ${mod.number}`);

/**
 * Sharing a shloka sends the verse itself, so whoever receives it can read
 * and chant it before deciding to open the link.
 */
export function shlokaShare(mod: StudyModule): ShareContent {
  const isDhyana = mod.number === null;
  const lines = isDhyana ? mod.lines.slice(0, 4) : mod.lines;
  const deva = lines
    .map((l, i) => {
      if (isDhyana) return l.deva;
      return `${l.deva} ${i === lines.length - 1 ? `॥ ${toDevanagariDigits(mod.number!)} ॥` : "।"}`;
    })
    .join("\n");
  const iast = lines.map((l) => l.iast).join("\n");
  const range = namaRangeLabel(mod.namaRange);
  const heading = isDhyana
    ? "*Lalitā Sahasranāma · the dhyāna verses*"
    : `*Lalitā Sahasranāma · Shloka ${mod.number}*${range ? ` (${range})` : ""}`;
  const gist = firstSentence(mod.commentary.meaning);

  const text = [
    heading,
    mod.subtitle ? `_${mod.subtitle}_` : null,
    deva,
    iast,
    gist,
    isDhyana
      ? "Hear them chanted, and read every word with its meaning:"
      : "Hear it chanted, loop it until you know it, and learn each name word by word:",
  ]
    .filter(Boolean)
    .join("\n\n");

  const shortText = isDhyana
    ? `The dhyāna verses of the Lalitā Sahasranāma: ${mod.lines[0].iast}… Chant them and learn every word:`
    : `Shloka ${mod.number} of the Lalitā Sahasranāma${mod.subtitle ? ` — “${mod.subtitle}”` : ""}. ${mod.lines[0].iast}… Chant it and learn it word by word:`;

  return {
    kind: "shloka",
    url: absoluteUrl(shlokaPath(mod.id)),
    title: `${shlokaName(mod)} of the Lalitā Sahasranāma`,
    text,
    shortText,
  };
}

/** Sharing a name sends it with its meaning and the words to chant it with. */
export function namaShare(nama: Nama, mod: StudyModule): ShareContent {
  const chant = nama.namavaliDeva
    ? `ॐ ${nama.namavaliDeva} नमः\noṃ ${nama.namavaliIast} namaḥ`
    : null;

  const text = [
    `*Name ${nama.index} of the Lalitā Sahasranāma*`,
    `${nama.deva} · ${nama.iast}\n_${nama.gloss}_`,
    nama.translation,
    chant ? `To chant it:\n${chant}` : null,
    `It is chanted in Shloka ${mod.number}. See how the name is built, and how to say every syllable:`,
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    kind: "nama",
    url: absoluteUrl(namaPath(nama.index)),
    title: `${nama.iast} — name ${nama.index} of the Lalitā Sahasranāma`,
    text,
    shortText: `${nama.iast} (${nama.deva}), “${nama.gloss}”: name ${nama.index} of the Lalitā Sahasranāma. Its meaning and how to chant it:`,
  };
}

/** For pages that aren't a single verse or name. */
export function pageShare(kind: string, path: string, title: string, text: string): ShareContent {
  return { kind, url: absoluteUrl(path), title, text: `*${title}*\n\n${text}`, shortText: `${title}. ${text}` };
}
