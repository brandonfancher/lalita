import type { ComponentType, ReactNode } from "react";

/**
 * The name of a separately nameable element of an artwork (kebab-case, named
 * for what it depicts, e.g. "flame", "lion-throne"), so a note can point at it.
 */
export type ArtPart = string;

export type ArtProps = {
  /** Prefix for SVG defs, so two copies of the same artwork can share a page. */
  idPrefix?: string;
  /** When set, every other part recedes. */
  active?: ArtPart | null;
};

export type Spot = ComponentType<{ part: ArtPart; children: ReactNode }>;

/**
 * One line of an artwork's note. Shlokas point at their names by number; the
 * Dhyāna, which has no names, quotes a phrase of the verse instead.
 */
export type NoteEntry = { part: ArtPart; depicts: string } & (
  | { nama: number }
  | { phrase: { label: string; deva: string; iast: string; gloss: string } }
);

export type Artwork = {
  Art: ComponentType<ArtProps>;
  /** Opening words; `Spot` marks a phrase that points at part of the artwork. */
  intro: (Spot: Spot) => ReactNode;
  /** In verse order. */
  entries: NoteEntry[];
  /** A closing detail that points at one more part. */
  detail?: { part: ArtPart; body: ReactNode };
};
