/**
 * The last range chanted, remembered in a cookie so the chant page can render
 * it on the server when it is opened without `?from=&to=`.
 */
export const CHANT_RANGE_COOKIE = "chant-range";

const ONE_YEAR = 60 * 60 * 24 * 365;

export function parseChantRange(value: string | undefined): { from: string; to: string } | null {
  const match = value?.match(/^(\d+)-(\d+)$/);
  return match ? { from: match[1], to: match[2] } : null;
}

export function rememberChantRange(from: number, to: number) {
  document.cookie = `${CHANT_RANGE_COOKIE}=${from}-${to}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}
