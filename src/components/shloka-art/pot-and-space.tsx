/**
 * Shloka 45 — "Forever pure, forever awake, forever free".
 *
 * Eight names that say nothing about her ever happened. In the crown her
 * light is the pole star, the one star that never sets, and the other stars
 * wheel round it on their trails, all of them held by it while it leans on
 * nothing. Below the card, the old Vedānta picture of the self as space: a
 * row of clay pots of every shape, the manifold, and one band of her light
 * running through them and between them without a break. One pot has been
 * broken and the space where it stood is just as it was: it was never shut
 * in. At the left the lump of clay they are all made of, still clay; at the
 * right a palm leaf with nothing written on it; and smoke drifting in that
 * thins away without dimming the light. Which name each part answers to is
 * written up for readers in the registry, next to this artwork's entry.
 */

import { Star, artIds, partProps, polar, round } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── The pole star, and the stars wheeling round it ────────────────────── */

const DHRUVA = { x: 384, y: 58 };
/** Arcs of the circling stars, each a part of a circle round the pole, with its star at the leading end. */
const TRAILS = [
  { r: 26, from: 150, sweep: 120 },
  { r: 40, from: 20, sweep: 110 },
  { r: 40, from: 200, sweep: 90 },
  { r: 54, from: 120, sweep: 100 },
  { r: 54, from: -30, sweep: 80 },
  { r: 68, from: 160, sweep: 70 },
  { r: 68, from: 30, sweep: 70 },
].map((t, i) => {
  const a = polar(DHRUVA.x, DHRUVA.y, t.r, t.from);
  const b = polar(DHRUVA.x, DHRUVA.y, t.r, t.from + t.sweep);
  return { d: `M ${round(a.x)} ${round(a.y)} A ${t.r} ${t.r} 0 0 0 ${round(b.x)} ${round(b.y)}`, head: b, i };
});

/* ── Below: the pots, and the one space ────────────────────────────────── */

const GROUND = 600;
const SPACE = { x: 310, y: 560, rx: 210, ry: 48 };

type Pot = { x: number; d: string; mouth: number; rim: number; band: string };
/** A pot's outline standing on the ground at x, from its widths at the foot, belly and neck. */
function pot(x: number, foot: number, belly: number, bellyAt: number, neck: number, h: number, lip: number): Pot {
  const top = GROUND - h;
  const by = GROUND - bellyAt;
  const d = [
    `M ${x - foot} ${GROUND}`,
    `C ${x - belly - 4} ${GROUND - 4} ${x - belly} ${by + (bellyAt * 0.35)} ${x - belly} ${by}`,
    `C ${x - belly} ${by - (h - bellyAt) * 0.6} ${x - neck} ${top + 8} ${x - neck} ${top + 4}`,
    `L ${x - lip} ${top}`,
    `L ${x + lip} ${top}`,
    `L ${x + neck} ${top + 4}`,
    `C ${x + neck} ${top + 8} ${x + belly} ${by - (h - bellyAt) * 0.6} ${x + belly} ${by}`,
    `C ${x + belly} ${by + (bellyAt * 0.35)} ${x + belly + 4} ${GROUND - 4} ${x + foot} ${GROUND}`,
    "Z",
  ].join(" ");
  const band = `M ${x - belly + 1} ${by} Q ${x} ${by + 6} ${x + belly - 1} ${by}`;
  return { x, d, mouth: top, rim: lip, band };
}
const POTS = [
  pot(214, 12, 24, 30, 10, 78, 13),
  pot(288, 16, 34, 26, 16, 56, 19),
  pot(432, 10, 20, 18, 9, 42, 12),
];
/** Where the fourth pot stood, broken: its shards on the ground. */
const BROKEN = { x: 362 };
const SHARDS = [
  { d: "M -26 0 C -28 -10 -22 -20 -12 -24 L -6 -14 L -14 -6 L -10 0 Z", turn: -6, dx: -4 },
  { d: "M 0 0 C 0 -6 4 -12 12 -14 L 18 -6 L 10 0 Z", turn: 10, dx: 8 },
  { d: "M -6 0 L -2 -8 L 6 -9 L 8 0 Z", turn: 0, dx: 26 },
  { d: "M -8 0 C -6 -4 0 -6 6 -5 L 4 0 Z", turn: 0, dx: -30 },
];

/** The lump of clay, not yet turned into anything. */
const CLAY = { x: 144, y: GROUND };
const CLAY_D = `M ${CLAY.x - 22} ${CLAY.y} C ${CLAY.x - 26} ${CLAY.y - 12} ${CLAY.x - 16} ${CLAY.y - 26} ${CLAY.x - 2} ${CLAY.y - 26} C ${CLAY.x + 8} ${CLAY.y - 27} ${CLAY.x + 12} ${CLAY.y - 21} ${CLAY.x + 16} ${CLAY.y - 19} C ${CLAY.x + 24} ${CLAY.y - 15} ${CLAY.x + 26} ${CLAY.y - 6} ${CLAY.x + 21} ${CLAY.y} Z`;
const CLAY_MARKS = `M ${CLAY.x - 6} ${CLAY.y - 20} C ${CLAY.x - 2} ${CLAY.y - 16} ${CLAY.x + 4} ${CLAY.y - 16} ${CLAY.x + 8} ${CLAY.y - 19}`;

/** A palm leaf with nothing written on it, and the stylus laid beside it. */
const LEAF = { x: 492, y: GROUND - 6, hw: 34, hh: 4 };

/** Smoke drifting in from the right, thinning to nothing before it reaches her. */
const SMOKE = `M 552 506 C 530 494 512 516 488 504 C 466 492 450 512 426 500 C 410 492 398 500 384 496`;

export function PotAndSpace({ idPrefix = "sa45", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("dhruva")} cx={DHRUVA.x} cy={DHRUVA.y} r={40} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("space")} cx={SPACE.x} cy={SPACE.y} r={SPACE.rx} gradientUnits="userSpaceOnUse" gradientTransform={`translate(0 ${SPACE.y}) scale(1 ${SPACE.ry / SPACE.rx}) translate(0 ${-SPACE.y})`}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.55 }} />
          <stop offset="0.75" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.32 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("smoke")} x1={552} y1={0} x2={384} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("ground")} x1={110} y1={0} x2={530} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.2" style={{ stopColor: "var(--gold)", stopOpacity: 0.6 }} />
          <stop offset="0.8" style={{ stopColor: "var(--gold)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>

      {/* The stars wheeling round, all held by her */}
      <g {...part("held")} strokeLinecap="round">
        {TRAILS.map((t) => (
          <g key={t.i}>
            <path d={t.d} stroke="var(--gold-soft)" strokeWidth={0.8} strokeOpacity={0.55} />
            <Star x={round(t.head.x)} y={round(t.head.y)} s={3.2} className={TWINKLE[t.i % 3]} />
          </g>
        ))}
      </g>

      {/* The pole star, which never sets */}
      <g {...part("awake")}>
        <circle className="m-breathe" cx={DHRUVA.x} cy={DHRUVA.y} r={40} fill={url("dhruva")} />
        <circle cx={DHRUVA.x} cy={DHRUVA.y} r={5} fill="var(--art-core)" />
        <Star x={DHRUVA.x} y={DHRUVA.y} s={12} fill="var(--art-ivory)" />
      </g>

      {/* One space, running through the pots and between them without a gap */}
      <g {...part("space")}>
        <ellipse className="m-shimmer" cx={SPACE.x} cy={SPACE.y} rx={SPACE.rx} ry={SPACE.ry} fill={url("space")} />
        <path d={`M 110 ${GROUND} L 530 ${GROUND}`} stroke={url("ground")} strokeWidth={1} />
      </g>

      {/* The pots: many shapes */}
      <g {...part("pots")} strokeLinejoin="round">
        {POTS.map((p, i) => (
          <g key={i}>
            <path d={p.d} fill="var(--art-turmeric)" fillOpacity={0.14} stroke="var(--art-turmeric)" strokeWidth={1.6} />
            <path d={p.d} stroke="var(--art-musk)" strokeWidth={0.5} strokeOpacity={0.5} />
            <ellipse cx={p.x} cy={p.mouth} rx={p.rim} ry={2.4} stroke="var(--art-turmeric)" strokeWidth={1.2} />
            <path d={p.band} stroke="var(--art-vermilion)" strokeWidth={1.2} strokeOpacity={0.7} />
          </g>
        ))}
      </g>

      {/* The pot that broke: nothing in it was ever shut in */}
      <g {...part("free")} strokeLinejoin="round">
        {SHARDS.map((s, i) => (
          <path
            key={i}
            d={s.d}
            transform={`translate(${BROKEN.x + s.dx} ${GROUND}) rotate(${s.turn})`}
            fill="var(--art-turmeric)"
            fillOpacity={0.5}
            stroke="var(--art-turmeric)"
            strokeWidth={1.2}
          />
        ))}
      </g>

      {/* The clay they are all made of, still clay */}
      <g {...part("clay")}>
        <ellipse cx={CLAY.x} cy={GROUND + 1} rx={28} ry={3.5} fill="var(--art-musk)" fillOpacity={0.2} />
        <path d={CLAY_D} fill="var(--art-vermilion)" fillOpacity={0.55} stroke="var(--art-musk)" strokeWidth={0.8} strokeOpacity={0.7} />
        <path d={CLAY_MARKS} stroke="var(--art-musk)" strokeWidth={0.7} strokeOpacity={0.5} strokeLinecap="round" />
      </g>

      {/* A palm leaf with nothing written on it */}
      <g {...part("blameless")}>
        <rect x={LEAF.x - LEAF.hw} y={LEAF.y - LEAF.hh} width={LEAF.hw * 2} height={LEAF.hh * 2} rx={LEAF.hh} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.7} />
        <circle cx={LEAF.x - LEAF.hw * 0.55} cy={LEAF.y} r={1} fill="var(--art-musk)" />
        <circle cx={LEAF.x + LEAF.hw * 0.55} cy={LEAF.y} r={1} fill="var(--art-musk)" />
        <path d={`M ${LEAF.x - 26} ${LEAF.y - 10} L ${LEAF.x + 22} ${LEAF.y - 13}`} stroke="var(--gold)" strokeWidth={1.4} strokeLinecap="round" />
      </g>

      {/* Smoke drifting in, thinning away, leaving the light as it was */}
      <g {...part("pure")}>
        <g className="m-sway">
          <path d={SMOKE} stroke={url("smoke")} strokeWidth={5} strokeLinecap="round" strokeOpacity={0.5} />
          <path d={SMOKE} stroke={url("smoke")} strokeWidth={1.4} strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
