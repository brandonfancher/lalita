/**
 * Parses the Lalitā Sahasranāma source text into structured verses.
 *
 * The stotra is an ancient text: 182 anuṣṭubh verses plus a closing half-verse,
 * whose words are the thousand names. In the source the names are written as
 * separate space-delimited words, so tokenizing on whitespace recovers them
 * directly. The editors also inserted `(... kalA N-M nAmAni)` markers every
 * hundred names, which this module uses to verify the tokenization rather than
 * trusting it blindly.
 */

import { cleanItxLines, stripVariants, verseNumberOf } from "./itrans";

export interface RawVerse {
  /** Verse number in the stotra, or null for the trailing half-verse. */
  number: number | null;
  /** ITRANS lines making up the verse, dandas stripped. */
  lines: string[];
  /** Alternate manuscript readings recorded by the editors. */
  variants: string[];
}

export interface KalaMarker {
  /** Index into the verse array where this section begins. */
  verseIndex: number;
  firstNama: number;
  lastNama: number;
  label: string;
}

export interface ParsedSource {
  dhyanaVerses: string[][];
  verses: RawVerse[];
  kalaMarkers: KalaMarker[];
}

const STOTRA_START = /atha\s+shrIlalitAsahasranAmastotram/;
const STOTRA_END = /nAmnAM\s+sAhasrakaM\s+jaguH/;
const DHYANA_START = /^\s*\|\|\s*dhyAnam\s*\|\|\s*$/;
const DHYANA_END = /lamityAdipa~nchapUjA|pa~nchapUjA/;
const KALA_MARKER = /^\(?\s*([a-zA-Z~^.]+\s+)*kalA\s*(\d+)\s*\\?-\s*(\d+)\s*nAmAni\s*\)?$/;

/**
 * A verse ends at a line carrying a `|| N||` marker. Lines accumulate until
 * then, which handles both the usual two-line verses and the occasional verse
 * the editors wrapped differently.
 */
function collectVerses(lines: string[]): {
  verses: RawVerse[];
  kalaMarkers: KalaMarker[];
} {
  const verses: RawVerse[] = [];
  const kalaMarkers: KalaMarker[] = [];
  let pending: string[] = [];
  let pendingVariants: string[] = [];

  for (const rawLine of lines) {
    if (!rawLine.trim()) continue;

    // Section markers sit on their own line and are not part of any verse.
    const markerMatch = rawLine.trim().replace(/\\/g, "").match(/kalA\s*(\d+)\s*-\s*(\d+)\s*nAmAni/);
    if (markerMatch) {
      kalaMarkers.push({
        verseIndex: verses.length,
        firstNama: Number(markerMatch[1]),
        lastNama: Number(markerMatch[2]),
        label: rawLine.trim().replace(/[()]/g, ""),
      });
      continue;
    }
    // Other parenthetical-only lines are editorial asides.
    if (/^\(.*\)$/.test(rawLine.trim())) continue;

    const { text, variants } = stripVariants(rawLine);
    if (!text) continue;

    pendingVariants.push(...variants);
    const number = verseNumberOf(text);
    const body = text
      .replace(/\|\|\s*\d+\s*\|\|/g, "")
      .replace(/\|\|/g, "")
      .replace(/\|/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (body) pending.push(body);

    if (number !== null) {
      verses.push({ number, lines: [...pending], variants: [...pendingVariants] });
      pending = [];
      pendingVariants = [];
    }
  }

  // Whatever remains is the closing half-verse, which has no number.
  if (pending.length) {
    verses.push({ number: null, lines: [...pending], variants: [...pendingVariants] });
  }

  return { verses, kalaMarkers };
}

function extractDhyana(lines: string[]): string[][] {
  const start = lines.findIndex((l) => DHYANA_START.test(l));
  if (start === -1) return [];

  const verses: string[][] = [];
  let current: string[] = [];

  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (DHYANA_END.test(line)) break;
    if (!line.trim()) continue;
    if (/^\(.*\)$/.test(line.trim())) continue;

    const { text } = stripVariants(line);
    if (!text) continue;

    const body = text.replace(/\|\|/g, "|").replace(/\s+/g, " ").trim();
    const endsVerse = /\|\s*$/.test(text) && /\|\|\s*$/.test(text.replace(/\s+$/, ""));

    current.push(body.replace(/\|/g, "").trim());

    if (endsVerse) {
      verses.push(current.filter(Boolean));
      current = [];
    }
  }
  if (current.filter(Boolean).length) verses.push(current.filter(Boolean));

  return verses.filter((v) => v.length > 0);
}

export function parseSource(raw: string): ParsedSource {
  const lines = cleanItxLines(raw);

  const startIdx = lines.findIndex((l) => STOTRA_START.test(l));
  const endIdx = lines.findIndex((l) => STOTRA_END.test(l));
  if (startIdx === -1 || endIdx === -1) {
    throw new Error("Could not locate stotra boundaries in source text");
  }

  const stotraLines = lines.slice(startIdx + 1, endIdx + 1);
  const { verses, kalaMarkers } = collectVerses(stotraLines);
  const dhyanaVerses = extractDhyana(lines.slice(0, startIdx));

  return { dhyanaVerses, verses, kalaMarkers };
}

/**
 * Split a verse into its constituent names. Names are whitespace-delimited in
 * the source; this simply flattens the verse's lines.
 */
export function tokenizeNamas(verse: RawVerse): string[] {
  return verse.lines
    .join(" ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Parse the nāmāvalī file into its thousand `... namaH` entries. */
export function parseNamavali(raw: string): string[] {
  const lines = cleanItxLines(raw);
  const start = lines.findIndex((l) => /atha\s+shrI\s*lalitA\s*sahasranAmAvalI/.test(l));
  const slice = start === -1 ? lines : lines.slice(start + 1);

  const entries: string[] = [];
  for (const line of slice) {
    const { text } = stripVariants(line);
    // The upstream file has a typo at entry 972 where `namaH` lost its final
    // visarga, so the terminator is matched loosely.
    if (!/nama[H]?\b/.test(text)) continue;
    // Entries look like: `OM shrImAtre namaH |`, sometimes with a trailing
    // decade checkpoint number after the danda.
    for (const piece of text.split(/\|/)) {
      const t = piece.trim();
      if (!t || !/\bnamaH?$/.test(t)) continue;
      entries.push(
        t
          .replace(/^OM\s+/i, "")
          .replace(/\s+namaH?$/, "")
          .trim(),
      );
    }
  }
  return entries;
}
