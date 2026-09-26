import type { ComponentType, ReactNode } from "react";

/** The separately nameable elements of an artwork, so a note can point at them. */
export type ArtPart = "frame" | "rays" | "parasol" | "throne" | "flame" | "embers" | "sri";

export type ArtProps = {
  /** Prefix for SVG defs, so two copies of the same artwork can share a page. */
  idPrefix?: string;
  /** When set, every other part recedes. */
  active?: ArtPart | null;
};

export type Spot = ComponentType<{ part: ArtPart; children: ReactNode }>;

export type Artwork = {
  Art: ComponentType<ArtProps>;
  /** Opening words; `Spot` marks a phrase that points at part of the artwork. */
  intro: (Spot: Spot) => ReactNode;
  /** One entry per name of the verse, in verse order. */
  names: { nama: number; part: ArtPart; depicts: string }[];
  /** A closing detail that points at one more part. */
  detail?: { part: ArtPart; body: ReactNode };
};
