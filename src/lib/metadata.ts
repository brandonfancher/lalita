import type { Metadata } from "next";

import { SITE_NAME } from "./site";

/**
 * A page's title, description, canonical address and share tags together.
 *
 * Open Graph and Twitter settings replace the layout's rather than merging
 * with them, so every page builds its own here. Share images come from the
 * nearest `opengraph-image` file.
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  shareTitle,
  type = "website",
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
}): Metadata {
  const heading = shareTitle ?? absoluteTitle ?? title ?? SITE_NAME;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type, siteName: SITE_NAME, url: path, title: heading, description },
    twitter: { card: "summary_large_image", title: heading, description },
  };
}
