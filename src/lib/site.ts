/**
 * Where the site lives and what it is called, for canonical URLs, share
 * links, structured data and the sitemap. Previews point back here too, so
 * search engines and shared links always settle on the one public address.
 */

export const SITE_URL = "https://lalita.study";

export const SITE_NAME = "Lalitā Sahasranāma";

/** The plain spelling people type into a search box. */
export const SITE_NAME_PLAIN = "Lalita Sahasranama";

export const SITE_TAGLINE = "Learn, study, and chant the thousand names";

export const SITE_DESCRIPTION =
  "Learn to chant the Lalita Sahasranama one shloka at a time: all 182 verses and 1,000 names with audio, Devanagari and transliteration, word-by-word meaning, grammar, and commentary.";

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

export const shlokaPath = (id: string) => `/shloka/${id}`;

export const namaPath = (index: number) => `/nama/${index}`;

/** Inclusive ids for a module's names, as "names 1–5" or "name 6". */
export function namaRangeLabel(range: [number, number] | undefined): string | null {
  if (!range) return null;
  return range[0] === range[1] ? `name ${range[0]}` : `names ${range[0]}–${range[1]}`;
}
