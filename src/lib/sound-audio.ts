/**
 * Maps Sanskrit phonemes to the learnsanskrit.org sound clips hosted under
 * `/audio/learnsanskrit/`. Filenames match the site's `/static/audio/*.OGG`
 * inventory (stored here as lowercase `.ogg`, except `R` / `RR`).
 */

import type { Aksara, AksaraPart } from "./types";

const AUDIO_BASE = "/audio/learnsanskrit";

/** IAST / traditional letter name → filename stem (no extension). */
const SOUND_FILES: Record<string, string> = {
  // Vowels
  a: "a",
  ā: "aa",
  i: "i",
  ī: "ii",
  u: "u",
  ū: "uu",
  ṛ: "R",
  ṝ: "RR",
  ḷ: "la", // no dedicated clip; closest available
  e: "e",
  ai: "ai",
  o: "o",
  au: "au",

  // Stops + nasals
  ka: "ka",
  kha: "kha",
  ga: "ga",
  gha: "gha",
  ṅa: "na_k",
  ca: "ca",
  cha: "cha",
  ja: "ja",
  jha: "jha",
  ña: "na_j",
  ṭa: "ta1",
  ṭha: "tha1",
  ḍa: "da1",
  ḍha: "dha1",
  ṇa: "na1",
  ta: "ta",
  tha: "tha",
  da: "da",
  dha: "dha",
  na: "na",
  pa: "pa",
  pha: "pha",
  ba: "ba",
  bha: "bha",
  ma: "ma",

  // Semivowels, sibilants, aspirate
  ya: "ya",
  ra: "ra",
  la: "la",
  va: "va",
  ḷa: "la",
  śa: "sha",
  ṣa: "shha",
  sa: "sa",
  ha: "ha",

  // Modifiers (taught as aṃ / aḥ)
  ṃ: "anusvara",
  aṃ: "anusvara",
  ḥ: "visarga",
  aḥ: "visarga",
  m̐: "anusvara",

  // Common conjuncts with dedicated clips
  jña: "jna",
  hma: "hma",
  hna: "hma",
};

/** Resolve a phoneme key (IAST letter or Ca-name) to a playable URL. */
export function soundUrl(key: string): string | null {
  const stem = SOUND_FILES[key];
  if (!stem) return null;
  return `${AUDIO_BASE}/${stem}.ogg`;
}

/** True when we have a clip for this key. */
export function hasSound(key: string): boolean {
  return key in SOUND_FILES;
}

/**
 * Pick the learnsanskrit key for one decomposed letter. Virāma and decorative
 * marks have no clip of their own.
 */
export function soundKeyForPart(part: AksaraPart): string | null {
  switch (part.role) {
    case "virama":
    case "nukta":
    case "avagraha":
    case "other":
      return null;
    case "anusvara":
    case "candrabindu":
      return "aṃ";
    case "visarga":
      return "aḥ";
    case "vowel":
    case "vowel-sign":
      return SOUND_FILES[part.iast] ? part.iast : null;
    case "consonant": {
      // `name` is always the traditional Ca form ("ka", "śa", …).
      if (SOUND_FILES[part.name]) return part.name;
      const withA = part.iast.endsWith("a") ? part.iast : `${part.iast}a`;
      return SOUND_FILES[withA] ? withA : null;
    }
    default:
      return null;
  }
}

/** Ordered clip keys for one written syllable. */
export function soundKeysForAksara(aksara: Aksara): string[] {
  // Prefer a dedicated conjunct clip when one exists.
  if (SOUND_FILES[aksara.iast]) return [aksara.iast];

  const keys: string[] = [];
  for (const part of aksara.parts) {
    const key = soundKeyForPart(part);
    if (key && keys[keys.length - 1] !== key) keys.push(key);
  }
  return keys;
}

/** Ordered clip keys for a whole word (all of its akṣaras). */
export function soundKeysForAksaras(aksaras: Aksara[]): string[] {
  return aksaras.flatMap(soundKeysForAksara);
}

// ---------------------------------------------------------------------------
// Playback (browser only)
// ---------------------------------------------------------------------------

let current: HTMLAudioElement | null = null;
let queue: string[] = [];
let generation = 0;

/** Stop any in-flight phoneme sequence. */
export function stopSounds(): void {
  generation += 1;
  queue = [];
  if (current) {
    current.onended = null;
    current.onerror = null;
    current.pause();
    current = null;
  }
}

/**
 * Play one or more phoneme clips in order. Each new call cancels the previous
 * sequence so rapid taps stay responsive.
 */
export function playSounds(keys: string[]): void {
  if (typeof window === "undefined") return;
  stopSounds();
  const urls = keys.map(soundUrl).filter((u): u is string => Boolean(u));
  if (!urls.length) return;

  const gen = generation;
  queue = urls.slice(1);

  const play = (url: string) => {
    if (gen !== generation) return;
    const audio = new Audio(url);
    current = audio;
    const advance = () => {
      if (gen !== generation) return;
      current = null;
      const next = queue.shift();
      if (next) play(next);
    };
    audio.addEventListener("ended", advance);
    audio.addEventListener("error", advance);
    void audio.play().catch(() => advance());
  };

  play(urls[0]);
}

export function playPart(part: AksaraPart): void {
  const key = soundKeyForPart(part);
  if (key) playSounds([key]);
}

export function playAksara(aksara: Aksara): void {
  playSounds(soundKeysForAksara(aksara));
}

export function playAksaras(aksaras: Aksara[]): void {
  playSounds(soundKeysForAksaras(aksaras));
}
