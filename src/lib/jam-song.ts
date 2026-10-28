/**
 * The song on the Jam page, written as pointers into the text rather than as
 * lyrics, so every word it sings carries the same spelling, word breaks and
 * glosses as the shloka it comes from.
 */

/** Lines of a shloka, sung as printed. Line numbers count from 0; all lines when omitted. */
export type SungShloka = { shloka: number; lines?: number[] };

/** A word sung on its own: one of the thousand names, or a word that is not one of them. */
export type SungWord = { nama: number } | { deva: string; iast: string; gloss: string };

export type SongSection =
  | { kind: "verse"; label: string; shlokas: SungShloka[] }
  | { kind: "chorus" | "tag"; label: string; words: SungWord[] };

export const JAM_VIDEO = {
  youtubeId: "66B6kSf9wn4",
  title: "The Kirtan Everyone Asked For — Mahagauri Night, Navaratri 2026",
  artist: "Swami Aniruddha",
  artistUrl: "https://www.youtube.com/@SwamiAniruddha",
};

export const JAM_SONG: SongSection[] = [
  { kind: "verse", label: "Verse 1", shlokas: [{ shloka: 1 }, { shloka: 2 }] },
  {
    kind: "chorus",
    label: "Chorus",
    words: [
      { deva: "जय ओ", iast: "jaya o", gloss: "Victory to you, O —" },
      { nama: 1000 },
      { nama: 457 },
      { nama: 202 },
      { nama: 718 },
    ],
  },
  { kind: "tag", label: "Tag", words: [{ nama: 935 }] },
  { kind: "verse", label: "Verse 2", shlokas: [{ shloka: 41 }, { shloka: 42 }] },
  { kind: "verse", label: "Verse 3", shlokas: [{ shloka: 52 }, { shloka: 53 }] },
  { kind: "verse", label: "Verse 4", shlokas: [{ shloka: 55 }, { shloka: 56 }] },
  { kind: "verse", label: "Verse 5", shlokas: [{ shloka: 109 }, { shloka: 118 }] },
  { kind: "verse", label: "Verse 6", shlokas: [{ shloka: 164 }, { shloka: 182, lines: [0, 1] }] },
];
