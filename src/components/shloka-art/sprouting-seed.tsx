/**
 * Shloka 10 — "Teeth like sprouts of pure knowledge".
 *
 * The verse closes the first ten with her mouth, in two names far apart in
 * register, and the artwork draws neither mouth nor teeth. Her light is a
 * seed, split open, and from it rises one sprout of the pure knowledge: two
 * seed-leaves, each drawn as a row of sixteen points of white light, the two
 * rows of the name. Around it the scent of her camphor betel is seen only as
 * what it does: it does not spread but pulls, and the horizon, pinned at the
 * eight quarters, is drawn in toward her ring after ring. Which name each
 * part answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import type { CSSProperties } from "react";

import { artIds, cubicAt, glint, partProps, round } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };
type Cubic = [Pt, Pt, Pt, Pt];

const CX = 320;
/** Her light: the heart of the seed, and the point every ring is drawn toward. */
const S = { x: CX, y: 560 };

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

const line = (ps: Pt[]) => ps.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");

/* ── The horizon, drawn in ──────────────────────────────────────────────── */

/** Half-width of the horizon, how far it dips between the quarters, and how much taller it stands above her than below. */
const R0 = 296;
const SAG = 0.1;
const RISE = 1.28;
const FALL = 0.88;

function horizonPoint(deg: number, s = 1): Pt {
  const r = R0 * s * (1 - SAG * Math.abs(Math.sin(((deg - 90) * Math.PI) / 45)) ** 1.5);
  const t = (deg * Math.PI) / 180;
  const k = Math.sin(t) > 0 ? RISE : FALL;
  return { x: round(S.x + r * Math.cos(t)), y: round(S.y - r * k * Math.sin(t)) };
}

const HORIZON = line(Array.from({ length: 360 }, (_, k) => horizonPoint(k))) + " Z";
const QUARTERS = Array.from({ length: 8 }, (_, k) => horizonPoint(90 + k * 45));

/**
 * The rings being drawn in. Each is the whole horizon, shrunk toward her by
 * `m-gather`; when motion is reduced, each rests where it would be at that
 * moment of the cycle.
 */
const GATHER_S = 24;
const RINGS = Array.from({ length: 7 }, (_, k) => {
  const p = (k + 0.5) / 7;
  return { scale: round(1 - 0.88 * p ** 1.7), delay: round(-p * GATHER_S) };
});
const ringStyle = (r: (typeof RINGS)[number]): CSSProperties =>
  ({
    transformOrigin: `${S.x}px ${S.y}px`,
    transform: `scale(${r.scale})`,
    "--dur": `${GATHER_S}s`,
    "--delay": `${r.delay}s`,
  }) as CSSProperties;

/* ── The sprout ─────────────────────────────────────────────────────────── */

/** A filled shape of varying width along a centre line, so a stroke can taper. */
function taper(pts: Pt[], width: (t: number) => number) {
  const n = pts.length - 1;
  const left: Pt[] = [];
  const right: Pt[] = [];
  pts.forEach((p, i) => {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(n, i + 1)];
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const nx = -(b.y - a.y) / len;
    const ny = (b.x - a.x) / len;
    const w = width(i / n) / 2;
    left.push({ x: round(p.x + nx * w), y: round(p.y + ny * w) });
    right.push({ x: round(p.x - nx * w), y: round(p.y - ny * w) });
  });
  return line(left) + " " + line([...right].reverse()).replace(/^M/, "L") + " Z";
}

/** Where the seed-leaves part, at the top of the short stem. */
const NODE = { x: CX, y: 526 };

/** The two seed-leaves, from the node up and out to their tips, the left a little taller. */
const LEAF_SPINES: Cubic[] = [
  [NODE, { x: 308, y: 500 }, { x: 258, y: 468 }, { x: 238, y: 400 }],
  [NODE, { x: 332, y: 502 }, { x: 380, y: 472 }, { x: 400, y: 410 }],
];
const ROW = 16;

const LEAVES = LEAF_SPINES.map((c, side) => {
  const spine = Array.from({ length: 49 }, (_, i) => cubicAt(...c, i / 48));
  const blade = taper(spine, (t) => 52 * Math.sin(Math.PI * t ** 0.75) ** 0.8);
  const rib = line(spine.slice(1, 46).map((p) => ({ x: round(p.x), y: round(p.y) })));
  const beads = Array.from({ length: ROW }, (_, k) => {
    const t = 0.08 + (k / (ROW - 1)) * 0.84;
    const p = cubicAt(...c, t);
    return { x: round(p.x), y: round(p.y), r: round(3.7 - 2 * (k / (ROW - 1))), group: (k + side) % 3 };
  });
  return { blade, rib, beads };
});

const STEM = taper(
  Array.from({ length: 9 }, (_, i) => ({ x: CX, y: round(S.y - 9 - (i / 8) * (S.y - 9 - NODE.y)) })),
  (t) => 4.5 - 1.5 * t,
);

/** The husk, split open at the top around her light and whole below, where the seed-syllable is engraved. */
const HUSK =
  "M 0 26 C -14 26 -24 14 -23 -2 C -22 -13 -17 -20 -11 -26 C -12 -17 -13 -9 -11 -2 C -9 4 -5 8 0 9 " +
  "C 5 8 9 4 11 -2 C 13 -9 12 -17 11 -26 C 17 -20 22 -13 23 -2 C 24 14 14 26 0 26 Z";
const HUSK_SHEEN = "M -19 -2 C -19 -10 -16 -16 -13 -20";
const HUSK_SCALE = 1.6;
const SEED = { x: CX, y: S.y + 10 };
const BIJA = { x: CX, y: round(SEED.y + 17.5 * HUSK_SCALE) };
const ROOT_Y = SEED.y + 26 * HUSK_SCALE;
const ROOT = `M ${CX} ${ROOT_Y} C ${CX + 2} ${ROOT_Y + 12} ${CX - 8} ${ROOT_Y + 22} ${CX - 2} ${ROOT_Y + 32} C ${CX + 2} ${ROOT_Y + 38} ${CX + 8} ${ROOT_Y + 36} ${CX + 7} ${ROOT_Y + 31}`;

export function SproutingSeed({ idPrefix = "sa10", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  const rings = (stroke: string) =>
    RINGS.map((r, k) => <path key={k} className="m-gather" d={HORIZON} stroke={stroke} style={ringStyle(r)} />);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={S.x} cy={S.y - 30} r={250} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="0.12" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.4 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("near")} cx={S.x} cy={S.y} r={170} gradientUnits="userSpaceOnUse">
          <stop offset="0.3" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <radialGradient id={id("far")} cx={S.x} cy={S.y} r={170} gradientUnits="userSpaceOnUse">
          <stop offset="0.3" stopColor="#000" />
          <stop offset="1" stopColor="#fff" />
        </radialGradient>
        <mask id={id("near-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("near")} />
        </mask>
        <mask id={id("far-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("far")} />
        </mask>
        <linearGradient id={id("leaf")} x1={CX} y1={NODE.y} x2={CX} y2={400} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.3 }} />
        </linearGradient>
      </defs>

      {/* Her light, the heart of the seed */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={S.x} cy={S.y - 30} r={250} fill={url("glow")} />
        <circle className="m-shimmer" cx={S.x} cy={S.y} r={22} fill={url("bindu-glow")} />
        <circle cx={S.x} cy={S.y} r={7} stroke="var(--art-core)" strokeWidth={0.8} />
        <circle cx={S.x} cy={S.y} r={3.8} fill="var(--art-core)" />
      </g>

      {/* The fragrance of her camphor betel, which draws the horizon in from the eight quarters */}
      <g {...part("fragrance")}>
        <path d={HORIZON} stroke="var(--gold)" strokeWidth={1.1} strokeOpacity={0.7} />
        <g mask={url("far-mask")} strokeWidth={1.3} strokeOpacity={0.7}>
          {rings("var(--gold)")}
        </g>
        <g mask={url("near-mask")} strokeWidth={1.6}>
          {rings("var(--art-moon)")}
        </g>
        <g fill="var(--gold)">
          {QUARTERS.map((q, k) => (
            <g key={k} transform={`translate(${q.x} ${q.y})`}>
              <path d={glint(7)} />
              <circle r={1.6} fill="var(--art-core)" />
            </g>
          ))}
        </g>
      </g>

      {/* Her teeth: one sprout of the pure knowledge, its two seed-leaves two rows of light */}
      <g {...part("sprout")}>
        <path d={ROOT} stroke="var(--gold)" strokeWidth={1.1} strokeLinecap="round" strokeOpacity={0.85} />
        <g transform={`translate(${SEED.x} ${SEED.y}) scale(${HUSK_SCALE})`}>
          <path d={HUSK} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} strokeLinejoin="round" />
          {[1, -1].map((side) => (
            <path
              key={side}
              d={HUSK_SHEEN}
              transform={`scale(${side} 1)`}
              stroke="var(--art-core)"
              strokeWidth={1.1}
              strokeOpacity={0.7}
              strokeLinecap="round"
            />
          ))}
        </g>
        <path d={STEM} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.6} />
        {LEAVES.map((l, i) => (
          <g key={i}>
            <path d={l.blade} fill={url("leaf")} stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round" />
            <path d={l.rib} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.6} />
            {l.beads.map((b, k) => (
              <g key={k}>
                <circle cx={b.x} cy={b.y} r={b.r} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
                <circle className={TWINKLE[b.group]} cx={round(b.x - b.r * 0.3)} cy={round(b.y - b.r * 0.3)} r={round(b.r * 0.45)} fill="var(--art-core)" />
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* The seed-syllable, engraved on the husk: a mantra's syllables are its seeds */}
      <g {...part("seed")} fill="var(--art-carve)" style={{ fontFamily: "var(--font-tiro), serif" }}>
        <text x={BIJA.x} y={BIJA.y} fontSize={17} textAnchor="middle" dominantBaseline="central">
          ह्रीं
        </text>
      </g>
    </svg>
  );
}
