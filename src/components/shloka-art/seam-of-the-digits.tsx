/**
 * Shloka 70 — "Where the fourth digit ends and the fifth begins".
 *
 * The hymn's divisions are named for the sun's twelve digits, and the seam
 * between the fourth and the fifth falls inside this verse. The twelve burn
 * in a row along the card's top edge, and the gap between the fourth and the
 * fifth is the plate's axis: a gold seam runs down from it behind the card to
 * ह्रीं, the syllable the fifth division opens with, and on to her light in
 * the heart's lotus of twelve petals, floating on still water. From it spread
 * rings that never break, the sound before it divides. Left of the seam, on
 * the first line's side, a river comes down into the pool and its banks end
 * there, its name gone, and an empty banyan leaf floats where the god of the
 * waters rests. Right of it, on the second line's side, a touch-me-not has
 * folded its leaves, and a winnowing fan lies idle on the bank, its rice not
 * sorted from its husk. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { artIds, partProps, polar, round, tattvaSign, tongue, yantraPetals } from "./primitives";
import type { ArtProps } from "./types";

const FLICKER = ["m-flicker", "m-flicker m-late", "m-flicker m-later"];

/* ── The sun's twelve digits, and the seam ─────────────────────────────── */

const SEAM = 320;
const ROW = 178;
const DIGITS = Array.from({ length: 12 }, (_, i) => ({
  x: round(SEAM + (i - 3.5) * 25 + (i < 4 ? -6 : 6)),
  lean: round(Math.sin(i * 1.7) * 0.35),
  h: 13 + (i % 3) * 1.5,
}));

/* ── The syllable, and her light in the heart ──────────────────────────── */

const HRIM = { x: SEAM, y: 424, r: 17 };
const HER = { x: SEAM, y: 528 };
const LOTUS = { x: SEAM, y: 542, flat: 0.42, k: 1.25 };
const LOTUS_OUTER = yantraPetals(12, 13, 32, 15);
const LOTUS_INNER = yantraPetals(12, 13, 25);
const HEART_SIGN = tattvaSign("air", 7.5);

/* ── The waters, and the rings of sound on them ────────────────────────── */

const POOL = { cx: 310, cy: 562, rx: 212, ry: 64 };
const RINGS = Array.from({ length: 6 }, (_, i) => ({ rx: 48 + i * 34, opacity: round(0.85 - i * 0.12) }));
const RIPPLES = [
  { x: 150, y: 548, w: 30 },
  { x: 214, y: 610, w: 44 },
  { x: 410, y: 606, w: 38 },
  { x: 470, y: 556, w: 26 },
];

/* ── The river that loses its name ─────────────────────────────────────── */

const RIVER_MID = [
  { x: 92, y: 450 },
  { x: 124, y: 470 },
  { x: 128, y: 494 },
  { x: 150, y: 512 },
  { x: 182, y: 524 },
];
const RIVER = (() => {
  const left: string[] = [];
  const right: string[] = [];
  RIVER_MID.forEach((p, i) => {
    const a = RIVER_MID[Math.max(0, i - 1)];
    const b = RIVER_MID[Math.min(RIVER_MID.length - 1, i + 1)];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    const nx = -(b.y - a.y) / len;
    const ny = (b.x - a.x) / len;
    const w = 3 + (i / (RIVER_MID.length - 1)) ** 2 * 11;
    left.push(`${round(p.x + nx * w)} ${round(p.y + ny * w)}`);
    right.push(`${round(p.x - nx * w)} ${round(p.y - ny * w)}`);
  });
  const bank = (pts: string[]) => `M ${pts[0]} C ${pts[1]} ${pts[1]} ${pts[2]} S ${pts[3]} ${pts[4]}`;
  const mid = RIVER_MID.map((p) => `${p.x} ${p.y}`);
  return {
    left: bank(left),
    right: bank(right),
    current: bank(mid),
    water: `${bank(left)} L ${right[4]} C ${right[3]} ${right[3]} ${right[2]} S ${right[1]} ${right[0]} Z`,
  };
})();

/* ── The empty banyan leaf ─────────────────────────────────────────────── */

const LEAF = { x: 168, y: 586, flat: 0.52 };
const LEAF_BLADE = "M -28 0 C -27 -13 -8 -18 8 -14 C 20 -10 30 -4 38 0 C 30 4 20 10 8 14 C -8 18 -27 13 -28 0 Z";
const LEAF_VEINS = "M -26 0 L 34 0 M -12 0 C -10 -6 -6 -10 -2 -12 M -12 0 C -10 6 -6 10 -2 12 M 4 0 C 7 -5 11 -8 14 -9 M 4 0 C 7 5 11 8 14 9 M 18 0 C 20 -3 23 -5 26 -5 M 18 0 C 20 3 23 5 26 5";

/* ── The touch-me-not, its leaves folded ───────────────────────────────── */

const MIMOSA = { x: 470, y: 484 };
type Frond = { deg: number; len: number; open: boolean };
const FRONDS: Frond[] = [
  { deg: 150, len: 30, open: false },
  { deg: 122, len: 38, open: false },
  { deg: 96, len: 42, open: false },
  { deg: 70, len: 36, open: true },
  { deg: 40, len: 30, open: true },
  { deg: 14, len: 26, open: false },
];
/** Each frond is a stalk ending in two pinnae, with leaflets spread open across them or folded flat along them. */
const MIMOSA_LEAVES = FRONDS.map((f) => {
  const droop = f.open ? 0 : 26;
  const deg = f.deg > 90 ? f.deg + droop : f.deg - droop;
  const fork = polar(MIMOSA.x, MIMOSA.y, f.len, deg);
  const stalk = `M ${MIMOSA.x} ${MIMOSA.y} L ${fork.x} ${fork.y}`;
  const pinnae: string[] = [];
  const leaflets: string[] = [];
  for (const spread of [-16, 16]) {
    const pd = deg + spread;
    const tip = polar(fork.x, fork.y, 22, pd);
    pinnae.push(`M ${fork.x} ${fork.y} L ${tip.x} ${tip.y}`);
    for (let k = 1; k <= 7; k++) {
      const p = polar(fork.x, fork.y, k * 3, pd);
      for (const side of [-1, 1]) {
        const q = f.open ? polar(p.x, p.y, 4.2, pd + side * 80) : polar(p.x, p.y, 3.2, pd + side * 12);
        leaflets.push(`M ${p.x} ${p.y} L ${q.x} ${q.y}`);
      }
    }
  }
  return { stalk, pinnae: pinnae.join(" "), leaflets: leaflets.join(" "), open: f.open };
});
const PUFFS = [
  { x: 448, y: 452 },
  { x: 494, y: 448 },
];
const PUFF_RAYS = Array.from({ length: 16 }, (_, k) => polar(0, 0, 5.4, k * 22.5));

/* ── The idle winnowing fan ────────────────────────────────────────────── */

const WINNOW = { x: 452, y: 646 };
/** Its floor, wide at the open front and narrowing to the back, and the wall that rises round the back and dies away along the sides. */
const FAN = "M -42 2 C -20 7 20 7 42 2 L 30 -16 C 12 -20 -12 -20 -30 -16 Z";
const FAN_WALL = "M -42 2 L -30 -16 C -12 -20 12 -20 30 -16 L 42 2 L 36 -14 C 34 -22 32 -28 28 -30 C 10 -35 -10 -35 -28 -30 C -32 -28 -34 -22 -36 -14 Z";
const FAN_RIM = "M -42 2 L -36 -14 C -34 -22 -32 -28 -28 -30 C -10 -35 10 -35 28 -30 C 32 -28 34 -22 36 -14 L 42 2";
const WEAVE = [
  "M -38 -4 C -14 1 14 1 38 -4",
  "M -34 -10 C -12 -6 12 -6 34 -10",
  "M -24 -17 L -32 3 M -12 -19 L -16 5 M 0 -19 L 0 6 M 12 -19 L 16 5 M 24 -17 L 32 3",
  "M -26 -27 C -8 -31 8 -31 26 -27 M -30 -22 C -10 -26 10 -26 30 -22",
];
const RICE = Array.from({ length: 22 }, (_, i) => {
  const a = i * 2.39996;
  const r = Math.sqrt(i / 22) * 15;
  return { x: round(Math.cos(a) * r), y: round(-9 + Math.sin(a) * r * 0.38), rot: round((a * 57.3) % 180), husk: i % 3 === 1 };
});

export function SeamOfTheDigits({ idPrefix = "sa70", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("seed")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("digit")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("water")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.3 }} />
        </linearGradient>
        <linearGradient id={id("river")} gradientUnits="userSpaceOnUse" x1={96} y1={0} x2={196} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.6 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.45 }} />
          <stop offset="0.8" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("riverShade")} gradientUnits="userSpaceOnUse" x1={96} y1={0} x2={196} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.2 }} />
          <stop offset="0.8" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("current")} gradientUnits="userSpaceOnUse" x1={96} y1={0} x2={186} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-ivory)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--art-ivory)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("pool")} cx={0.5} cy={0.42} r={0.5}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.55 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.3 }} />
          <stop offset="0.9" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("seam")} gradientUnits="userSpaceOnUse" x1={0} y1={ROW} x2={0} y2={HRIM.y}>
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0.9 }} />
          <stop offset="0.5" style={{ stopColor: "var(--gold)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0.9 }} />
        </linearGradient>
        <linearGradient id={id("bank")} gradientUnits="userSpaceOnUse" x1={100} y1={0} x2={184} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0.9 }} />
          <stop offset="0.7" style={{ stopColor: "var(--gold)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </linearGradient>
        <clipPath id={id("poolClip")}>
          <ellipse cx={POOL.cx} cy={POOL.cy} rx={POOL.rx} ry={POOL.ry} />
        </clipPath>
      </defs>

      {/* The sun's twelve digits along the card's top edge, and the seam between the fourth and the fifth */}
      <g {...part("digits")}>
        {DIGITS.map((d, i) => (
          <g key={i} transform={`translate(${d.x} ${ROW})`}>
            <circle className={FLICKER[i % 3]} cy={-7} r={11} fill={url("digit")} />
            <path d="M -4.6 0 C -4.4 3.6 4.4 3.6 4.6 0 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.4} />
            <g className={FLICKER[(i + 1) % 3]}>
              <path d={tongue(d.h, 5.6, d.lean)} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.4} strokeLinejoin="round" />
              <path d={tongue(d.h * 0.5, 2.6, d.lean * 0.5)} fill="var(--art-core)" fillOpacity={0.9} />
            </g>
          </g>
        ))}
      </g>
      <g {...part("seam")}>
        <path d={`M ${SEAM} ${ROW - 18} V ${HRIM.y - HRIM.r}`} stroke={url("seam")} strokeWidth={1} />
        <path d={`M ${SEAM - 4} ${ROW - 18} H ${SEAM + 4}`} stroke="var(--gold)" strokeWidth={1} strokeLinecap="round" />
        <path d={`M ${SEAM} ${HRIM.y + HRIM.r} V ${HER.y - 12}`} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.7} strokeDasharray="1.5 3" />
      </g>

      {/* The still waters */}
      <g {...part("waters")}>
        <ellipse cx={POOL.cx} cy={POOL.cy} rx={POOL.rx} ry={POOL.ry} fill={url("pool")} />
        {RIPPLES.map((r, i) => (
          <path key={i} d={`M ${r.x - r.w / 2} ${r.y} q ${r.w / 2} -2 ${r.w} 0`} stroke="var(--art-ivory)" strokeWidth={0.8} strokeOpacity={0.6} strokeLinecap="round" />
        ))}
        <g transform={`translate(${LEAF.x} ${LEAF.y})`}>
          <ellipse cy={3} rx={32} ry={6} fill="var(--art-hair)" fillOpacity={0.18} />
          <g transform={`rotate(-8) scale(1 ${LEAF.flat})`}>
            <path d={LEAF_BLADE} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            <path d={LEAF_VEINS} stroke="var(--gold-soft)" strokeWidth={0.6} vectorEffect="non-scaling-stroke" strokeLinecap="round" />
            <path d="M -28 0 C -34 0 -38 4 -36 9" stroke="var(--leaf)" strokeWidth={1.6} vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          </g>
        </g>
      </g>

      {/* The river coming down into the pool, its banks ending where it meets the water */}
      <g {...part("river")}>
        <path d={RIVER.water} fill={url("river")} />
        <path d={RIVER.water} fill={url("riverShade")} />
        {[-2.4, 2.4].map((dy) => (
          <path key={dy} className="m-shimmer" d={RIVER.current} transform={`translate(0 ${dy})`} stroke={url("current")} strokeWidth={0.7} strokeLinecap="round" />
        ))}
        <path d={RIVER.left} stroke={url("bank")} strokeWidth={2.2} strokeLinecap="round" />
        <path d={RIVER.right} stroke={url("bank")} strokeWidth={2.2} strokeLinecap="round" />
      </g>

      {/* Rings of sound on the water that never break */}
      <g {...part("nada")}>
        <g clipPath={url("poolClip")}>
          {RINGS.slice(0, 5).map((r, i) => (
            <g key={i} className={i % 2 ? "m-shimmer m-late" : "m-shimmer"}>
              <ellipse cx={LOTUS.x} cy={LOTUS.y} rx={r.rx} ry={round(r.rx * 0.3)} stroke="var(--gold-soft)" strokeWidth={1.8} strokeOpacity={r.opacity * 0.7} />
              <ellipse cx={LOTUS.x} cy={LOTUS.y} rx={r.rx} ry={round(r.rx * 0.3)} stroke="var(--art-moon)" strokeWidth={0.9} strokeOpacity={r.opacity} />
            </g>
          ))}
        </g>
      </g>

      {/* The heart's lotus of twelve petals, and her light in it */}
      <g {...part("heart")}>
        <g transform={`translate(${LOTUS.x} ${LOTUS.y}) scale(${LOTUS.k} ${round(LOTUS.k * LOTUS.flat)})`}>
          <path d={LOTUS_OUTER} fill="var(--art-vermilion)" fillOpacity={0.55} stroke="var(--gold)" strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
          <path d={LOTUS_INNER} fill="var(--art-vermilion)" fillOpacity={0.85} stroke="var(--gold)" strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
          <circle r={13} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
          <path d={HEART_SIGN} fill="var(--art-hair)" fillOpacity={0.7} />
        </g>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={40} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={8} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={3.8} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.8} />
      </g>

      {/* ह्रीं, where the fifth digit opens */}
      <g {...part("hrim")}>
        <circle className="m-breathe" cx={HRIM.x} cy={HRIM.y} r={32} fill={url("seed")} />
        <circle cx={HRIM.x} cy={HRIM.y} r={HRIM.r} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.7} />
        <circle cx={HRIM.x} cy={HRIM.y} r={HRIM.r - 2.6} stroke="var(--art-carve)" strokeWidth={0.4} strokeOpacity={0.6} />
        <text
          x={HRIM.x}
          y={HRIM.y + 5}
          textAnchor="middle"
          fontSize={15}
          fill="var(--art-carve)"
          style={{ fontFamily: "var(--font-tiro), serif" }}
        >
          ह्रीं
        </text>
      </g>

      {/* The touch-me-not on the bank, its leaves folded shut */}
      <g {...part("mimosa")}>
        <ellipse cx={MIMOSA.x} cy={MIMOSA.y + 2} rx={20} ry={3.4} fill="var(--art-musk)" fillOpacity={0.14} />
        {MIMOSA_LEAVES.map((l, i) => (
          <g key={i}>
            <path d={l.stalk} stroke="var(--leaf)" strokeWidth={1.1} strokeLinecap="round" />
            <path d={l.pinnae} stroke="var(--leaf)" strokeWidth={0.7} strokeLinecap="round" />
            <path d={l.leaflets} stroke="var(--leaf)" strokeWidth={l.open ? 1.6 : 1.3} strokeLinecap="round" />
          </g>
        ))}
        {PUFFS.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            <path d={`M 0 0 L ${round((MIMOSA.x - p.x) * 0.9)} ${round((MIMOSA.y - p.y) * 0.9)}`} stroke="var(--leaf)" strokeWidth={0.7} />
            {PUFF_RAYS.map((q, k) => (
              <path key={k} d={`M 0 0 L ${q.x} ${q.y}`} stroke="var(--lotus)" strokeWidth={0.7} strokeLinecap="round" />
            ))}
            <circle r={2.2} fill="var(--lotus)" />
            {PUFF_RAYS.filter((_, k) => k % 2 === 0).map((q, k) => (
              <circle key={k} cx={q.x} cy={q.y} r={0.7} fill="var(--art-turmeric)" />
            ))}
          </g>
        ))}
      </g>

      {/* The winnowing fan laid down on the bank, its rice and husk left together */}
      <g {...part("winnow")}>
        <g transform={`translate(${WINNOW.x} ${WINNOW.y})`}>
          <ellipse cy={3} rx={44} ry={5} fill="var(--art-musk)" fillOpacity={0.14} />
          <path d={FAN_WALL} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
          <path d={FAN} fill="var(--art-turmeric)" fillOpacity={0.6} stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
          {WEAVE.map((d, i) => (
            <path key={i} d={d} stroke="var(--art-carve)" strokeWidth={0.5} strokeOpacity={0.45} />
          ))}
          <path d={FAN_RIM} stroke="var(--gold)" strokeWidth={2.6} strokeLinejoin="round" strokeLinecap="round" />
          <path d={FAN_RIM} stroke="var(--art-carve)" strokeWidth={0.4} strokeOpacity={0.6} />
          {RICE.map((r, i) => (
            <ellipse
              key={i}
              cx={r.x}
              cy={r.y}
              rx={1.8}
              ry={0.8}
              transform={`rotate(${r.rot} ${r.x} ${r.y})`}
              fill={r.husk ? "var(--art-ember)" : "var(--art-ivory)"}
              stroke="var(--art-carve)"
              strokeWidth={0.2}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
