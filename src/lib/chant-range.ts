/**
 * The range of shlokas the chant page plays. It comes from `?from=&to=`, or
 * else the last range chanted, remembered in a cookie.
 */
export const CHANT_RANGE_COOKIE = "chant-range";

export const CHANT_MIN = 0;
export const CHANT_MAX = 182;

/** The range the chant page is prerendered with. */
export const DEFAULT_CHANT_RANGE = { from: 1, to: 3 };

export type ChantRange = { from: number; to: number };

const ONE_YEAR = 60 * 60 * 24 * 365;

export function parseChantRange(value: string | undefined): { from: string; to: string } | null {
  const match = value?.match(/^(\d+)-(\d+)$/);
  return match ? { from: match[1], to: match[2] } : null;
}

export function rememberChantRange({ from, to }: ChantRange) {
  document.cookie = `${CHANT_RANGE_COOKIE}=${from}-${to}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}

export function clampShloka(raw: string | null | undefined, fallback: number): number {
  const n = Number.parseInt(raw ?? "", 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(CHANT_MAX, Math.max(CHANT_MIN, n));
}

/** The range asked for by the URL, or else the remembered one, in order. */
export function resolveChantRange(from: string | null, to: string | null, cookies: string): ChantRange {
  const remembered =
    from === null && to === null
      ? parseChantRange(cookies.match(new RegExp(`(?:^|; )${CHANT_RANGE_COOKIE}=([^;]*)`))?.[1])
      : null;
  const a = clampShloka(remembered?.from ?? from, DEFAULT_CHANT_RANGE.from);
  const b = clampShloka(remembered?.to ?? to, DEFAULT_CHANT_RANGE.to);
  return { from: Math.min(a, b), to: Math.max(a, b) };
}

/**
 * Run before the prerendered page paints: when it is about to load a range
 * other than the one it was built with, its session stays hidden until then.
 */
export const CHANT_PENDING_SCRIPT = `try{var q=new URLSearchParams(location.search),c=document.cookie.match(/(?:^|; )${CHANT_RANGE_COOKIE}=([^;]*)/);if(q.has("from")||q.has("to")||(c&&c[1]!=="${DEFAULT_CHANT_RANGE.from}-${DEFAULT_CHANT_RANGE.to}"))document.documentElement.dataset.chantPending=""}catch(e){}`;
