import type { Metadata } from "next";

import { SITE_NAME } from "./site";

/** The site's own card, for pages without one of their own. */
const SITE_CARD = {
  url: "/card.jpg",
  alt: "Lalitā Sahasranāma: learn, study, and chant the thousand names of the Divine Mother",
};

/**
 * A page's title, description, canonical address and share tags together.
 *
 * Open Graph and Twitter settings replace the layout's rather than merging
 * with them, so every page builds its own here.
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  shareTitle,
  type = "website",
  card = SITE_CARD,
}: {
  /** Filled into the layout's title template. */
  title?: string;
  /** Used as the whole title, without the template. */
  absoluteTitle?: string;
  description: string;
  path: string;
  /** The headline on a share preview, if it should differ from the page title. */
  shareTitle?: string;
  type?: "website" | "article";
  /** The route's own share card (a `card.jpg` route beside the page), if it has one. */
  card?: { url: string; alt: string };
}): Metadata {
  const heading = shareTitle ?? absoluteTitle ?? title ?? SITE_NAME;
  const images = [{ ...card, width: 1200, height: 630, type: "image/jpeg" }];
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type, siteName: SITE_NAME, url: path, title: heading, description, images },
    twitter: { card: "summary_large_image", title: heading, description, images },
  };
}
