/**
 * The last range practiced, remembered in a cookie so the practice page can
 * render it on the server when it is opened without `?from=&to=`.
 */
export const PRACTICE_RANGE_COOKIE = "practice-range";

const ONE_YEAR = 60 * 60 * 24 * 365;

export function parsePracticeRange(value: string | undefined): { from: string; to: string } | null {
  const match = value?.match(/^(\d+)-(\d+)$/);
  return match ? { from: match[1], to: match[2] } : null;
}

export function rememberPracticeRange(from: number, to: number) {
  document.cookie = `${PRACTICE_RANGE_COOKIE}=${from}-${to}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}
