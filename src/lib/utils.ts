import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format seconds as m:ss for the chant controls. */
export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const CASE_LABELS: Record<string, { short: string; sanskrit: string; sense: string }> = {
  nominative: { short: "nom.", sanskrit: "prathamā", sense: "the subject; who or what it is" },
  accusative: { short: "acc.", sanskrit: "dvitīyā", sense: "the object; what is acted upon" },
  instrumental: { short: "inst.", sanskrit: "tṛtīyā", sense: "by, with, through" },
  dative: { short: "dat.", sanskrit: "caturthī", sense: "to, for" },
  ablative: { short: "abl.", sanskrit: "pañcamī", sense: "from, out of" },
  genitive: { short: "gen.", sanskrit: "ṣaṣṭhī", sense: "of, belonging to" },
  locative: { short: "loc.", sanskrit: "saptamī", sense: "in, on, among" },
  vocative: { short: "voc.", sanskrit: "sambodhana", sense: "direct address" },
};

export const caseInfo = (c?: string) => (c ? CASE_LABELS[c] : undefined);

export const COMPOUND_LABELS: Record<string, { name: string; sense: string }> = {
  tatpurusha: {
    name: "tatpuruṣa",
    sense: "the first member modifies the second through a case relation, like “king of the mountain”",
  },
  karmadharaya: {
    name: "karmadhāraya",
    sense: "both members refer to the same thing, one describing the other, like “dark cloud”",
  },
  bahuvrihi: {
    name: "bahuvrīhi",
    sense: "the compound describes someone outside itself: “she who has X”",
  },
  dvandva: { name: "dvandva", sense: "a pairing of equals: “X and Y”" },
  dvigu: { name: "dvigu", sense: "a numeral compound: “the set of three X”" },
  avyayibhava: { name: "avyayībhāva", sense: "an adverbial compound, indeclinable" },
  upapada: { name: "upapada", sense: "the second member is a verbal root that cannot stand alone" },
};
