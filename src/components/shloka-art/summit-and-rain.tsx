/**
 * Shloka 39 — "The last knot, the summit, and the rain that comes back down".
 *
 * The climb of Shloka 38 finished. The channel is lit now from the root to
 * the crown, and the centres below, already passed, glow quietly with the
 * two split knots between them. At the brow, the wheel of command, two
 * white petals, and her light inside it; just above, the knot of Rudra, the
 * last, split. At the top the thousand-petalled lotus is lit, and her light
 * is mounted on it. From its rim the nectar comes back down over the whole
 * body in two falls of drops, and a fine rain under the lotus. Which name
 * each part answers to is written up for readers in the registry, next to
 * this artwork's entry.
 */

import { CakraLotus, SplitKnot, artIds, glint, partProps, polar, round, tattvaSign, yantraPetals, type Cakra } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

const AXIS = 320;
const ROOT_Y = 596;
const TOP_Y = 102;

const ROOT: Cakra = { y: ROOT_Y, petals: 4, sign: "earth", r0: 14, r1: 34 };
const SVADHISTHANA: Cakra = { y: 518, petals: 6, sign: "water", r0: 9, r1: 22 };
const NAVEL: Cakra = { y: 456, petals: 10, sign: "fire", r0: 15, r1: 36 };
const HEART: Cakra = { y: 350, petals: 12, sign: "air", r0: 11, r1: 26 };
const THROAT: Cakra = { y: 282, petals: 16, sign: "space", r0: 11, r1: 26 };
const BROW = { y: 212 };
const KNOTS = { brahma: 552, visnu: 408, rudra: 182 };

/** The thousand-petalled lotus, lit: four rings of fine petals. */
const THOUSAND = [
  { n: 40, r0: 9, r1: 24 },
  { n: 56, r0: 20, r1: 38 },
  { n: 72, r0: 33, r1: 52 },
  { n: 90, r0: 46, r1: 64 },
];

/** Two falls of nectar from the lotus's rim, out and down past the body to the root. */
const FALLS = [-1, 1].map((side) => {
  const from = polar(AXIS, TOP_Y, 60, side < 0 ? 200 : -20);
  const to = { x: AXIS + side * 60, y: ROOT_Y + 10 };
  const c1 = { x: AXIS + side * 168, y: TOP_Y + 120 };
  const c2 = { x: AXIS + side * 150, y: ROOT_Y - 160 };
  const at = (t: number) => {
    const u = 1 - t;
    return {
      x: round(u * u * u * from.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * to.x),
      y: round(u * u * u * from.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * to.y),
    };
  };
  return {
    d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`,
    drops: Array.from({ length: 14 }, (_, k) => ({ ...at(0.05 + k * 0.068), k })),
  };
});
/** A fine rain straight down under the lotus. */
const RAIN = Array.from({ length: 18 }, (_, k) => ({
  x: round(AXIS - 52 + ((k * 37) % 104)),
  y: round(TOP_Y + 72 + ((k * 23) % 60)),
  k,
}));
const DROP = "M 0 -4.4 C 1.6 -1.6 2.6 0 2.6 1.4 A 2.6 2.6 0 0 1 -2.6 1.4 C -2.6 0 -1.6 -1.6 0 -4.4 Z";

export function SummitAndRain({ idPrefix = "sa39", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <linearGradient id={id("channel")} x1={0} y1={ROOT_Y} x2={0} y2={TOP_Y} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
        </linearGradient>
        <radialGradient id={id("channel-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.3 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("crown-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.7 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("brow-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
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
        <radialGradient id={id("nectar-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The channel, lit now from the root to the crown */}
      <g {...part("channel")}>
        <ellipse className="m-shimmer" cx={AXIS} cy={(ROOT_Y + TOP_Y) / 2} rx={110} ry={(ROOT_Y - TOP_Y) / 2 + 60} fill={url("channel-glow")} />
        <path d={`M ${AXIS} ${ROOT_Y} V ${TOP_Y}`} stroke={url("channel")} strokeWidth={2.2} strokeLinecap="round" />
      </g>

      {/* Below, the centres already passed and the two knots already split */}
      <g {...part("passed")}>
        <CakraLotus x={AXIS} c={ROOT} lit petal="var(--art-crimson)" />
        <path d={tattvaSign("earth", ROOT.r0 * 0.78)} transform={`translate(${AXIS} ${ROOT_Y})`} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.5} />
        <CakraLotus x={AXIS} c={SVADHISTHANA} lit petal="var(--art-vermilion)" />
        <CakraLotus x={AXIS} c={NAVEL} lit petal="var(--art-hair)" />
        <path d={tattvaSign("fire", NAVEL.r0 * 0.9)} transform={`translate(${AXIS} ${NAVEL.y + 1}) rotate(180)`} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.5} />
        <CakraLotus x={AXIS} c={HEART} lit petal="var(--art-vermilion)" />
        <CakraLotus x={AXIS} c={THROAT} lit petal="var(--lotus)" />
        <SplitKnot x={AXIS} y={KNOTS.brahma} />
        <SplitKnot x={AXIS} y={KNOTS.visnu} />
      </g>

      {/* The wheel of command at the brow, two white petals, her light inside it */}
      <g {...part("ajna")}>
        <circle className="m-shimmer" cx={AXIS} cy={BROW.y} r={44} fill={url("brow-glow")} />
        <g transform={`translate(${AXIS} ${BROW.y})`} stroke="var(--gold)" strokeWidth={0.7}>
          <path d="M -8 0 C -18 -15 -34 -13 -37 0 C -34 13 -18 15 -8 0 Z M 8 0 C 18 -15 34 -13 37 0 C 34 13 18 15 8 0 Z" fill="var(--art-ivory)" fillOpacity={0.85} />
          <circle r={8} />
        </g>
        <circle className="m-breathe" cx={AXIS} cy={BROW.y} r={16} fill={url("bindu-glow")} />
        <circle cx={AXIS} cy={BROW.y} r={3.4} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.6} />
      </g>

      {/* The knot of Rudra, the last, split */}
      <g {...part("rudra")}>
        <circle className="m-breathe" cx={AXIS} cy={KNOTS.rudra} r={16} fill={url("split")} />
        <SplitKnot x={AXIS} y={KNOTS.rudra} />
        <path className="m-lick" d={glint(5)} transform={`translate(${AXIS} ${KNOTS.rudra})`} fill="var(--art-core)" />
      </g>

      {/* The thousand-petalled lotus, lit, and her light mounted on it */}
      <g {...part("summit")}>
        <circle className="m-shimmer" cx={AXIS} cy={TOP_Y} r={130} fill={url("crown-glow")} />
        <g transform={`translate(${AXIS} ${TOP_Y})`}>
          {THOUSAND.map((t, i) => (
            <path
              key={i}
              d={yantraPetals(t.n, t.r0, t.r1, i * 2.5)}
              fill={i % 2 ? "var(--lotus)" : "var(--art-ivory)"}
              fillOpacity={0.55 - i * 0.08}
              stroke="var(--gold)"
              strokeWidth={0.4}
              strokeOpacity={0.8}
            />
          ))}
        </g>
        <circle className="m-breathe" cx={AXIS} cy={TOP_Y} r={30} fill={url("bindu-glow")} />
        <circle cx={AXIS} cy={TOP_Y} r={6} fill="var(--art-core)" />
        <circle cx={AXIS} cy={TOP_Y} r={9.4} stroke="var(--gold)" strokeWidth={0.9} />
      </g>

      {/* The nectar coming back down from it over the whole body */}
      <g {...part("rain")}>
        {FALLS.map((f, i) => (
          <g key={i}>
            <path d={f.d} stroke="var(--art-moon)" strokeWidth={0.7} strokeOpacity={0.5} strokeDasharray="1 5" strokeLinecap="round" />
            {f.drops.map((d) => (
              <g key={d.k} className={TWINKLE[(d.k + i) % 3]} transform={`translate(${d.x} ${d.y})`}>
                <circle r={7} fill={url("nectar-glow")} />
                <path d={DROP} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
              </g>
            ))}
          </g>
        ))}
        {RAIN.map((r) => (
          <path key={r.k} className={TWINKLE[r.k % 3]} d={DROP} transform={`translate(${r.x} ${r.y}) scale(0.6)`} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.6} />
        ))}
      </g>
    </svg>
  );
}
