/**
 * Shloka 24 — "The court assembles in praise, and the army moves out".
 *
 * Two names a line long, and the hymn turns from description to story. The
 * artwork splits the same way. Above, the assembled gods and seers, company
 * after company, are drawn as arcs of lamps held up round her light, the
 * praise in which her glory is sung. Below, the army of her powers issues
 * from that light and moves out: śakti means a power and also a spear, so the
 * army is ranks of spears under pennants, levelled toward a bank of ash, the
 * stuff Bhaṇḍa was made of. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { Ash, AshDefs, Lamp, Spear, SpearDefs, SPEAR_LEAN, artIds, partProps, polar, radiance, round } from "./primitives";
import type { ArtProps } from "./types";

const CX = 320;

/** Her light, just below the card, the centre the court is gathered round. */
const BINDU = { x: CX, y: 474 };
const RADIANCE = radiance({ cx: BINDU.x, cy: BINDU.y, from: 14, long: 262, short: 170 });

/* ── The court: company after company of lamps ─────────────────────────── */

type LampAt = { x: number; y: number; s: number; k: number };

/** Inner rows are the gods, outer rows the seers; each row is broken into companies of five. */
const ROWS = [
  { r: 282, s: 0.8, seer: false },
  { r: 314, s: 0.9, seer: false },
  { r: 348, s: 1, seer: true },
  { r: 384, s: 1.1, seer: true },
];

const COURT = ROWS.map((row, ri) => {
  const step = (12.5 * row.s) / row.r;
  const from = Math.max((20 * Math.PI) / 180, Math.acos(Math.min(1, 296 / row.r)));
  const n = Math.floor((Math.PI - 2 * from) / step);
  const start = (Math.PI - n * step) / 2;
  const lamps: LampAt[] = [];
  for (let i = 0; i <= n; i++) {
    if ((i + ri * 3) % 7 >= 5) continue;
    const p = polar(BINDU.x, BINDU.y, row.r, ((start + i * step) * 180) / Math.PI);
    lamps.push({ x: p.x, y: p.y, s: row.s, k: (i + ri) % 3 });
  }
  return { ...row, lamps };
});


/* ── The army of śaktis ────────────────────────────────────────────────── */

type Rank = { x: number; y: number; s: number; k: number };

/** Rank after rank, each nearer, larger and further right than the one before, widening as it comes. */
const ARMY: Rank[] = Array.from({ length: 6 }, (_, r) => {
  const cx = 334 + r * 16;
  const y = 516 + r * 30;
  const count = 3 + r;
  const gap = 25 + r * 3;
  const s = round(0.66 + r * 0.1);
  return Array.from({ length: count }, (_, i) => ({
    x: round(cx + (i - (count - 1) / 2) * gap + ((r * 5 + i * 3) % 4) - 2),
    y: round(y + ((r + i * 2) % 3) * 2),
    s,
    k: (r + i) % 3,
  }));
}).flat();

/** The ash he was made from, banked at the right where the spears are pointed. */
const ASH = [
  { x: 548, y: 560, r: 46 },
  { x: 590, y: 600, r: 58 },
  { x: 532, y: 620, r: 40 },
  { x: 604, y: 530, r: 36 },
  { x: 566, y: 666, r: 48 },
];
const FLECKS = Array.from({ length: 22 }, (_, k) => ({
  x: round(486 + ((k * 47) % 130)),
  y: round(500 + ((k * 31) % 190)),
  r: round(0.8 + (k % 3) * 0.5),
}));

export function CourtAndArmy({ idPrefix = "sa24", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={BINDU.x} cy={BINDU.y} r={300} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.65 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={BINDU.x} cy={BINDU.y} r={262} gradientUnits="userSpaceOnUse">
          <stop offset="0.05" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.2" style={{ stopColor: "var(--gold)", stopOpacity: 0.8 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0.1 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <AshDefs id={id} />
        <SpearDefs id={id} />
      </defs>

      {/* Her glory, the light the whole court is gathered round */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={BINDU.x} cy={BINDU.y} r={300} fill={url("glow")} />
        <path className="m-shimmer" d={RADIANCE} stroke={url("radiance")} strokeWidth={0.7} />
        <circle className="m-breathe" cx={BINDU.x} cy={BINDU.y} r={46} fill={url("bindu-glow")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={6.4} fill="var(--art-core)" />
        <circle cx={BINDU.x} cy={BINDU.y} r={10} stroke="var(--gold)" strokeWidth={0.9} />
      </g>

      {/* The assembled gods and seers, company after company, holding up their lamps in praise */}
      <g {...part("court")}>
        {COURT.map((row) => (
          <g key={row.r}>
            {row.lamps.map((l, i) => (
              <g key={i} transform={`translate(${l.x} ${l.y}) scale(${l.s})`}>
                <Lamp k={l.k} seer={row.seer} />
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* The army of her powers, spears under pennants, moving out toward the ash of Bhaṇḍa */}
      <g {...part("army")}>
        <Ash clouds={ASH} flecks={FLECKS} url={url} />
        {ARMY.map((sp, i) => (
          <g key={i} transform={`translate(${sp.x} ${sp.y}) rotate(${SPEAR_LEAN}) scale(${sp.s})`}>
            <Spear k={sp.k} shaft={url("shaft")} />
          </g>
        ))}
      </g>
    </svg>
  );
}
