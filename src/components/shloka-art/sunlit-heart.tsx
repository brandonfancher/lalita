/**
 * Shloka 88 — "Sunlight into the heart, and four ways of standing next to Śiva".
 *
 * From the sun at the right of the crown an unbroken stream of rays comes
 * down through the lattice of a dark stone chamber, the heart, and lies
 * across its floor. Under the card her light stands as the liṅga on its
 * seat, the form in which Śiva is seen. To the right his trident goes off
 * down a road toward a dark fort with her letter tied to it; in front, his
 * crescent and bilva leaves are laid at her footprints, and a full pot is set
 * on a threshold marked with turmeric and kumkum. Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { artIds, Footprint, FullPot, litPart, partProps, round, sunRays, trident, Trident } from "./primitives";
import type { ArtProps } from "./types";

/* ── The sun and its stream of rays ────────────────────────────────────── */

const SUN = { x: 456, y: 100, r: 24 };
const SUN_RAYS = sunRays({ cx: SUN.x, cy: SUN.y, r: SUN.r, long: 46, short: 36, count: 32, span: 360 });
const WINDOW = { x: 258, top: 490, foot: 542 };
const FLOOR = 598;
const DIR = (() => {
  const dx = WINDOW.x - SUN.x;
  const dy = (WINDOW.top + WINDOW.foot) / 2 - SUN.y;
  const l = Math.hypot(dx, dy);
  return { x: dx / l, y: dy / l };
})();
/** The rays fade out over the card and in again below it, so the miniature, with no card, shows light and not a pole. */
const GAP = { top: 250, foot: 420 };
const REACH = Math.hypot(WINDOW.x - SUN.x, (WINDOW.top + WINDOW.foot) / 2 - SUN.y) - 34;
/** Seven parallel rays a lattice bar apart, from near the sun to the window and on to the chamber's floor. */
const STREAM = Array.from({ length: 7 }, (_, k) => {
  const y = WINDOW.top + 5 + k * 7;
  const t = (FLOOR - y) / DIR.y;
  const along = (yy: number) => ({ x: round(WINDOW.x + (DIR.x * (yy - y)) / DIR.y), y: yy });
  return {
    start: { x: round(WINDOW.x - DIR.x * REACH), y: round(y - DIR.y * REACH) },
    high: along(GAP.top),
    low: along(GAP.foot),
    at: { x: WINDOW.x, y: round(y) },
    end: { x: round(WINDOW.x + DIR.x * t), y: FLOOR },
    k,
  };
});

/* ── The heart as a dark chamber ───────────────────────────────────────── */

const ROOM = "M 128 606 V 512 Q 128 470 195 464 Q 262 470 262 512 V 606 Z";
const INSIDE = "M 137 598 V 514 Q 138 480 195 474 Q 252 480 253 514 V 598 Z";
const COURSES = [486, 506, 526, 546, 566, 586];

/* ── Her light as the liṅga on its seat ────────────────────────────────── */

const LINGA = { x: 330, foot: 548, h: 58, w: 17 };
const PITHA = { x: 330, y: 552 };

/* ── The trident going as her envoy ────────────────────────────────────── */

const ROAD = "M 392 620 C 420 580 456 520 490 486 L 500 486 C 478 522 456 580 444 620 Z";
const ROAD_EDGES = "M 392 620 C 420 580 456 520 490 486 M 444 620 C 456 580 478 522 500 486";
const FORT = { x: 496, y: 484 };
const ENVOY = trident(0, -96, 0, 0.9);

/* ── Śiva's offering at her feet ───────────────────────────────────────── */

const FEET = { x: 262, y: 652, s: 1.5 };
const BILVA = [
  { x: 304, y: 660, deg: 64 },
  { x: 314, y: 678, deg: 104 },
];
const BILVA_LEAF = "M 0 0 C -4 -5 -5 -12 0 -18 C 5 -12 4 -5 0 0 Z";
const CRESCENT = { x: 220, y: 664, deg: -62 };

/* ── A full pot on a threshold made auspicious ─────────────────────────── */

const SILL = { x: 424, y: 664, hw: 46 };
const MARKS = [-36, -24, -12, 12, 24, 36];

export function SunlitHeart({ idPrefix = "sa88", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("sun")}>
          <stop offset="0.25" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
        <linearGradient id={id("ray-high")} gradientUnits="userSpaceOnUse" x1={0} y1={SUN.y} x2={0} y2={GAP.top}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.75 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("ray-low")} gradientUnits="userSpaceOnUse" x1={0} y1={GAP.foot} x2={0} y2={WINDOW.top}>
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0.8 }} />
        </linearGradient>
        <linearGradient id={id("dark")} x1={0} y1={470} x2={0} y2={600} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.95 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.9 }} />
        </linearGradient>
        <radialGradient id={id("pool")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("linga")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)" }} />
        </linearGradient>
        <radialGradient id={id("glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("road")} x1={0} y1={618} x2={0} y2={482} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-turmeric)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--art-turmeric)", stopOpacity: 0.05 }} />
        </linearGradient>
        <clipPath id={id("inside")}>
          <path d={INSIDE} />
        </clipPath>
      </defs>

      {/* The sun, and the unbroken stream of its rays into the dark of the heart */}
      <g {...part("sunbeams")}>
        <circle className="m-breathe" cx={SUN.x} cy={SUN.y} r={70} fill={url("glow")} />
        {SUN_RAYS.map((r, k) => (
          <path key={k} d={r.d} fill={r.long ? "var(--art-vermilion)" : "var(--art-saffron)"} />
        ))}
        <circle cx={SUN.x} cy={SUN.y} r={SUN.r} fill={url("sun")} stroke="var(--gold)" strokeWidth={1.3} />
        <circle cx={SUN.x} cy={SUN.y} r={SUN.r - 9} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.6} />
        {STREAM.map((s) => (
          <g key={s.k} className="m-shimmer" strokeWidth={2} strokeLinecap="round">
            <path d={`M ${s.start.x} ${s.start.y} L ${s.high.x} ${s.high.y}`} stroke={url("ray-high")} />
            <path d={`M ${s.low.x} ${s.low.y} L ${s.at.x} ${s.at.y}`} stroke={url("ray-low")} />
          </g>
        ))}
        <path d={ROOM} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1} />
        {COURSES.map((y) => (
          <path key={y} d={`M 128 ${y} H 137 M 253 ${y} H 262`} stroke="var(--gold-soft)" strokeWidth={0.6} />
        ))}
        <path d={INSIDE} fill={url("dark")} />
        <g clipPath={`url(#${id("inside")})`}>
          <ellipse className="m-breathe" cx={STREAM[3].end.x} cy={FLOOR} rx={34} ry={8} fill={url("pool")} />
          {STREAM.map((s) => (
            <path key={s.k} d={`M ${s.at.x} ${s.at.y} L ${s.end.x} ${s.end.y}`} stroke="var(--art-core)" strokeWidth={3.6} strokeOpacity={0.7} strokeLinecap="round" />
          ))}
        </g>
        <rect x={253} y={WINDOW.top} width={9} height={WINDOW.foot - WINDOW.top} fill="var(--art-musk)" fillOpacity={0.6} />
        {STREAM.map((s) => (
          <rect key={s.k} x={253} y={s.at.y - 2} width={9} height={4} fill="var(--art-core)" />
        ))}
        <rect x={253} y={WINDOW.top} width={9} height={WINDOW.foot - WINDOW.top} stroke="var(--gold)" strokeWidth={0.8} />
      </g>

      {/* Her light as the liṅga on its seat: the form in which Śiva is seen */}
      <g {...part("form")}>
        <circle className="m-breathe" cx={LINGA.x} cy={LINGA.foot - 26} r={62} fill={url("glow")} />
        <path
          d={`M ${PITHA.x - 50} ${PITHA.y} C ${PITHA.x - 50} ${PITHA.y + 14} ${PITHA.x + 40} ${PITHA.y + 16} ${PITHA.x + 50} ${PITHA.y + 6} L ${PITHA.x + 74} ${PITHA.y + 6} L ${PITHA.x + 74} ${PITHA.y - 2} L ${PITHA.x + 46} ${PITHA.y - 6} C ${PITHA.x + 30} ${PITHA.y - 12} ${PITHA.x - 50} ${PITHA.y - 12} ${PITHA.x - 50} ${PITHA.y} Z`}
          fill="var(--art-stone)"
          stroke="var(--gold)"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        <ellipse cx={PITHA.x} cy={PITHA.y - 4} rx={38} ry={7} fill="var(--art-carve)" fillOpacity={0.3} stroke="var(--gold-soft)" strokeWidth={0.6} />
        <path d={`M ${PITHA.x - 50} ${PITHA.y + 12} V ${PITHA.y + 26} C ${PITHA.x - 30} ${PITHA.y + 34} ${PITHA.x + 30} ${PITHA.y + 34} ${PITHA.x + 50} ${PITHA.y + 26} V ${PITHA.y + 10}`} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1} />
        <path
          d={`M ${LINGA.x - LINGA.w} ${LINGA.foot} V ${LINGA.foot - LINGA.h + LINGA.w} A ${LINGA.w} ${LINGA.w * 1.1} 0 0 1 ${LINGA.x + LINGA.w} ${LINGA.foot - LINGA.h + LINGA.w} V ${LINGA.foot} Z`}
          fill={url("linga")}
          stroke="var(--gold)"
          strokeWidth={1}
        />
      </g>

      {/* His trident gone down the road as her envoy, her letter tied to it */}
      <g {...part("envoy")}>
        <path d={ROAD} fill={url("road")} />
        <path d={ROAD_EDGES} stroke="var(--gold-soft)" strokeWidth={0.8} strokeOpacity={0.8} />
        <path d="M 418 620 C 438 580 466 522 495 486" stroke="var(--gold-soft)" strokeWidth={0.6} strokeDasharray="4 6" strokeOpacity={0.6} />
        <path
          d={`M ${FORT.x - 20} ${FORT.y} V ${FORT.y - 14} h 4 v -4 h 4 v 4 h 4 v -4 h 4 v 4 h 8 v -4 h 4 v 4 h 4 v -4 h 4 v 4 h 4 V ${FORT.y} Z`}
          fill="var(--art-musk)"
          fillOpacity={0.6}
        />
        <g transform="translate(452 572) rotate(14)" strokeLinecap="round" strokeLinejoin="round">
          <Trident t={ENVOY} />
          <path d={`M 0 -50 C 6 -48 10 -44 10 -38`} stroke="var(--art-vermilion)" strokeWidth={1} />
          <g transform="translate(10 -30) rotate(-14)">
            <rect x={-4.4} y={-11} width={8.8} height={27} rx={1.6} fill="var(--art-ivory)" stroke="var(--art-turmeric)" strokeWidth={0.8} />
            <path d="M -4.4 -3 H 4.4 M -4.4 8 H 4.4" stroke="var(--art-vermilion)" strokeWidth={1.1} />
            <circle cy={2.5} r={3.2} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.5} />
          </g>
        </g>
      </g>

      {/* His crescent and bilva leaves laid at her footprints */}
      <g {...part("worship")}>
        {[1, -1].map((side) => (
          <g key={side} fill="var(--art-vermilion)" transform={`translate(${FEET.x + side * 14} ${FEET.y}) scale(${side * FEET.s} ${FEET.s * 0.7})`}>
            <Footprint edge />
          </g>
        ))}
        {BILVA.map((b, k) => (
          <g key={k} transform={`translate(${b.x} ${b.y}) rotate(${b.deg}) scale(1.2 0.8)`}>
            {[-56, 0, 56].map((deg) => (
              <path key={deg} d={BILVA_LEAF} transform={`rotate(${deg}) scale(${deg ? 0.8 : 1})`} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.5} />
            ))}
          </g>
        ))}
        <g transform={`translate(${CRESCENT.x} ${CRESCENT.y}) rotate(${CRESCENT.deg})`}>
          <path d={litPart(5, 13)} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1} />
        </g>
      </g>

      {/* A full pot set on a threshold marked with turmeric and kumkum */}
      <g {...part("auspicious")}>
        <path d={`M ${SILL.x - SILL.hw} ${SILL.y} L ${SILL.x + SILL.hw} ${SILL.y} L ${SILL.x + SILL.hw - 6} ${SILL.y + 12} L ${SILL.x - SILL.hw + 6} ${SILL.y + 12} Z`} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
        <path d={`M ${SILL.x - SILL.hw + 3} ${SILL.y + 2} H ${SILL.x + SILL.hw - 3}`} stroke="var(--art-turmeric)" strokeWidth={3} strokeOpacity={0.8} />
        {MARKS.map((dx, k) => (
          <circle key={dx} cx={SILL.x + dx} cy={SILL.y + 7} r={1.8} fill={k % 2 ? "var(--art-turmeric)" : "var(--art-vermilion)"} />
        ))}
        <g transform={`translate(${SILL.x} ${SILL.y - 17})`}>
          <FullPot />
        </g>
      </g>
    </svg>
  );
}
