/**
 * Shloka 38 — "The root centre, the navel, and the first two knots".
 *
 * The hymn turns inward, to the body of whoever is chanting. A channel of
 * light runs up the plate through the six centres, each a small lotus seen
 * face on with its element's sign. At the foot, the root centre, four petals
 * round the square of earth, with her light seated in it. Above it the knot
 * of Brahmā, split, its two halves pushed apart. Then the navel wheel, ten
 * petals round the triangle of fire, and inside it her light coming up into
 * view like the sun; above that the knot of Viṣṇu, split. From there up the
 * channel is unlit, the centres the verse passes over are drawn faint, and
 * the thousand-petalled lotus at the top is still dark. Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { artIds, glint, partProps, sunRays, tattvaSign, yantraPetals, type Tattva } from "./primitives";
import type { ArtProps } from "./types";

const AXIS = 320;
const ROOT_Y = 596;
const NAVEL_Y = 456;
const TOP_Y = 162;
const LIT_TO = 392;

type Centre = { y: number; petals: number; sign: Tattva; r0: number; r1: number };
const ROOT: Centre = { y: ROOT_Y, petals: 4, sign: "earth", r0: 14, r1: 34 };
const SVADHISTHANA: Centre = { y: 518, petals: 6, sign: "water", r0: 9, r1: 22 };
const NAVEL: Centre = { y: NAVEL_Y, petals: 10, sign: "fire", r0: 15, r1: 36 };
const HEART: Centre = { y: 336, petals: 12, sign: "air", r0: 9, r1: 21 };
const THROAT: Centre = { y: 270, petals: 16, sign: "space", r0: 9, r1: 21 };
const BROW = { y: 220 };

const KNOTS = { brahma: 552, visnu: 408 };
/** A knot as a cord wound round the channel, seen a little from above, cut through at the front; one half of it. */
const KNOT_HALF = "M 0 -7 A 26 7 0 0 0 -26 0 A 26 7 0 0 0 -7 6.7 M -7 6.7 L -4 11 M -7 6.7 L -2.6 8.4 M -7 6.7 L -5.6 11.6";
const SUN = sunRays({ cx: AXIS, cy: NAVEL_Y + 3, r: 8, long: 24, short: 17, count: 10, span: 180 });

/** The thousand-petalled lotus, unlit: three rings of many fine petals. */
const THOUSAND = [
  { n: 40, r0: 8, r1: 20 },
  { n: 52, r0: 17, r1: 29 },
  { n: 64, r0: 26, r1: 36 },
];

/** A knot across the channel, split: its two halves pushed apart, musk with a moon hairline. */
function SplitKnot({ x, y }: { x: number; y: number }) {
  return (
    <>
      {[-1, 1].map((side) => (
        <g key={side} transform={`translate(${x + side * 6} ${y}) scale(${-side} 1)`}>
          <path d={KNOT_HALF} stroke="var(--art-musk)" strokeWidth={2.4} strokeLinecap="round" />
          <path d={KNOT_HALF} stroke="var(--art-moon)" strokeWidth={0.5} strokeOpacity={0.7} strokeLinecap="round" />
        </g>
      ))}
    </>
  );
}

function CentreLotus({ c, lit, petal, glow }: { c: Centre; lit: boolean; petal: string; glow?: string }) {
  return (
    <g transform={`translate(${AXIS} ${c.y})`}>
      {glow && <circle r={c.r1 + 16} fill={glow} />}
      <path d={yantraPetals(c.petals, c.r0, c.r1)} fill={petal} fillOpacity={lit ? 0.75 : 0.18} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={lit ? 0.9 : 0.35} />
      <circle r={c.r0} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={lit ? 0.9 : 0.35} />
    </g>
  );
}

export function FirstTwoKnots({ idPrefix = "sa38", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <linearGradient id={id("channel")} x1={0} y1={ROOT_Y} x2={0} y2={LIT_TO - 20} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.8" style={{ stopColor: "var(--gold)", stopOpacity: 0.8 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("channel-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.45 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("root-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("navel-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("split")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The channel, lit from the root up past the second knot, and the light rising in it */}
      <g {...part("channel")}>
        <ellipse className="m-shimmer" cx={AXIS} cy={(ROOT_Y + LIT_TO) / 2 + 10} rx={120} ry={(ROOT_Y - LIT_TO) / 2 + 90} fill={url("channel-glow")} />
        <path d={`M ${AXIS} ${LIT_TO} V ${TOP_Y + 40}`} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.35} strokeDasharray="1.5 4" strokeLinecap="round" />
        <path d={`M ${AXIS} ${ROOT_Y} V ${LIT_TO - 20}`} stroke={url("channel")} strokeWidth={2.2} strokeLinecap="round" />
      </g>

      {/* The centres the verse passes over, and the thousand-petalled lotus not yet reached */}
      <g {...part("silent")}>
        <CentreLotus c={SVADHISTHANA} lit={false} petal="var(--art-vermilion)" />
        <CentreLotus c={HEART} lit={false} petal="var(--art-vermilion)" />
        <CentreLotus c={THROAT} lit={false} petal="var(--lotus)" />
        <g transform={`translate(${AXIS} ${BROW.y})`} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.35}>
          <path d="M -6 0 C -14 -12 -26 -10 -28 0 C -26 10 -14 12 -6 0 Z M 6 0 C 14 -12 26 -10 28 0 C 26 10 14 12 6 0 Z" fill="var(--art-ivory)" fillOpacity={0.18} />
          <circle r={6} />
        </g>
        <g transform={`translate(${AXIS} ${TOP_Y})`}>
          {THOUSAND.map((t, i) => (
            <path key={i} d={yantraPetals(t.n, t.r0, t.r1, i * 3)} stroke="var(--gold)" strokeWidth={0.4} strokeOpacity={0.35} fill="var(--lotus)" fillOpacity={0.08} />
          ))}
        </g>
      </g>

      {/* The root centre, four petals round the square of earth, her light seated in it */}
      <g {...part("root")}>
        <CentreLotus c={ROOT} lit petal="var(--art-crimson)" glow={url("root-glow")} />
        <path d={tattvaSign("earth", ROOT.r0 * 0.78)} transform={`translate(${AXIS} ${ROOT_Y})`} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.5} />
        <circle className="m-breathe" cx={AXIS} cy={ROOT_Y} r={22} fill={url("bindu-glow")} />
        <circle cx={AXIS} cy={ROOT_Y} r={4} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.6} />
      </g>

      {/* The knot of Brahmā, split */}
      <g {...part("brahma")}>
        <circle className="m-breathe" cx={AXIS} cy={KNOTS.brahma} r={16} fill={url("split")} />
        <SplitKnot x={AXIS} y={KNOTS.brahma} />
        <path className="m-lick" d={glint(5)} transform={`translate(${AXIS} ${KNOTS.brahma})`} fill="var(--art-core)" />
      </g>

      {/* The navel wheel, ten petals round the triangle of fire, and her light coming up in it like the sun */}
      <g {...part("manipura")}>
        <CentreLotus c={NAVEL} lit petal="var(--art-hair)" glow={url("navel-glow")} />
        <path d={tattvaSign("fire", NAVEL.r0 * 0.9)} transform={`translate(${AXIS} ${NAVEL_Y + 1}) rotate(180)`} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.5} />
        <g className="m-shimmer">
          {SUN.map((ray, i) => (
            <path key={i} d={ray.d} fill={ray.long ? "var(--art-saffron)" : "var(--gold)"} />
          ))}
        </g>
        <circle className="m-breathe" cx={AXIS} cy={NAVEL_Y + 3} r={24} fill={url("bindu-glow")} />
        <path d={`M ${AXIS - 7} ${NAVEL_Y + 3} A 7 7 0 0 1 ${AXIS + 7} ${NAVEL_Y + 3} Z`} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.6} />
      </g>

      {/* The knot of Viṣṇu, split */}
      <g {...part("visnu")}>
        <circle className="m-breathe m-late" cx={AXIS} cy={KNOTS.visnu} r={16} fill={url("split")} />
        <SplitKnot x={AXIS} y={KNOTS.visnu} />
        <path className="m-lick" d={glint(5)} transform={`translate(${AXIS} ${KNOTS.visnu})`} fill="var(--art-core)" />
      </g>
    </svg>
  );
}
