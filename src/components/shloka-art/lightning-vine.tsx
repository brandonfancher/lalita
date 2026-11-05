/**
 * Shloka 40 — "Lightning above the six wheels, and the name at last".
 *
 * What has been climbing for two verses, named. Up the middle of the plate
 * runs a streak of lightning drawn out like a climbing vine, sharp-angled
 * and thin, through the six wheels, and its tendrils grip the way a
 * creeper's do. At its foot, round the root centre, it is still coiled three
 * and a half times, the coiled one; above the six wheels, under the title,
 * it ends in her light. At the right a lotus stalk has been broken and its
 * fine fibres drawn out between the two pieces: she is finer than these.
 * Which name each part answers to is written up for readers in the
 * registry, next to this artwork's entry.
 */

import { CakraLotus, OpenLotus, artIds, creeperTendril, glint, partProps, polyline, round, type Cakra } from "./primitives";
import type { ArtProps } from "./types";

const AXIS = 320;
const ROOT_Y = 604;
const TOP = { x: AXIS, y: 166 };

const WHEELS: { c: Cakra; petal: string }[] = [
  { c: { y: ROOT_Y, petals: 4, sign: "earth", r0: 12, r1: 28 }, petal: "var(--art-crimson)" },
  { c: { y: 542, petals: 6, sign: "water", r0: 8, r1: 20 }, petal: "var(--art-vermilion)" },
  { c: { y: 482, petals: 10, sign: "fire", r0: 11, r1: 26 }, petal: "var(--art-hair)" },
  { c: { y: 418, petals: 12, sign: "air", r0: 10, r1: 24 }, petal: "var(--art-vermilion)" },
  { c: { y: 330, petals: 16, sign: "space", r0: 10, r1: 24 }, petal: "var(--lotus)" },
];
const BROW_Y = 254;
const STOPS = [...WHEELS.map((w) => w.c.y), BROW_Y, TOP.y];

/** The lightning: sharp zigzags between the wheels, meeting the axis at each. */
const BOLT = (() => {
  const pts: { x: number; y: number }[] = [];
  STOPS.forEach((y, i) => {
    pts.push({ x: AXIS, y });
    const next = STOPS[i + 1];
    if (next === undefined) return;
    const steps = 3;
    for (let k = 1; k < steps; k++) {
      const yy = round(y + ((next - y) * k) / steps);
      pts.push({ x: AXIS + (k % 2 ? 1 : -1) * (i % 2 ? -11 : 11), y: yy });
    }
  });
  return pts;
})();
const BOLT_D = polyline(BOLT);
/** Tendrils off the zigzag's corners, gripping as a creeper's do. */
const TENDRILS = BOLT.filter((p) => p.x !== AXIS)
  .filter((_, i) => i % 2 === 0)
  .map((p, i) => creeperTendril({ x: p.x, y: p.y, angle: -90, s: 0 }, p.x > AXIS ? 1 : -1, 6 + (i % 3), 1.6));

/** Coiled three and a half times round the root, seen a little from above, rising into the bolt. */
const COIL = (() => {
  const n = 140;
  const turns = 3.5;
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const a = Math.PI / 2 + t * turns * 2 * Math.PI;
    const r = 48 - 12 * t;
    return { x: round(AXIS + Math.cos(a) * r), y: round(ROOT_Y + 6 - 12 * t + Math.sin(a) * r * 0.3) };
  });
  return polyline(pts) + ` Q ${AXIS - 10} ${ROOT_Y - 14} ${AXIS} ${ROOT_Y - 30}`;
})();

/** A lotus stalk broken in two, its fibres drawn out between the pieces. */
const STALK = { x: 462, y: 524 };
const FIBRES = [-2.4, -1.2, 0, 1.2, 2.4].map((dy, k) => `M ${STALK.x - 14} ${STALK.y + dy} Q ${STALK.x + 4} ${STALK.y + dy + 6 + (k % 2) * 3} ${STALK.x + 22} ${STALK.y + dy * 0.8 + 2}`).join(" ");

export function LightningVine({ idPrefix = "sa40", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.32 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("top-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.8 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-core)", stopOpacity: 0.25 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("coil-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The six wheels */}
      <g {...part("wheels")}>
        <ellipse className="m-shimmer" cx={AXIS} cy={(ROOT_Y + TOP.y) / 2} rx={120} ry={(ROOT_Y - TOP.y) / 2 + 70} fill={url("glow")} />
        {WHEELS.map((w, i) => (
          <CakraLotus key={i} x={AXIS} c={w.c} lit petal={w.petal} />
        ))}
        <g transform={`translate(${AXIS} ${BROW_Y})`} stroke="var(--gold)" strokeWidth={0.6}>
          <path d="M -7 0 C -15 -13 -29 -11 -32 0 C -29 11 -15 13 -7 0 Z M 7 0 C 15 -13 29 -11 32 0 C 29 11 15 13 7 0 Z" fill="var(--art-ivory)" fillOpacity={0.75} />
          <circle r={7} />
        </g>
      </g>

      {/* Her brightness, a streak of lightning drawn out like a climbing vine */}
      <g {...part("lightning")}>
        <path className="m-shimmer" d={BOLT_D} stroke="var(--art-core)" strokeWidth={7} strokeOpacity={0.3} strokeLinejoin="miter" strokeLinecap="round" />
        <path d={BOLT_D} stroke="var(--gold)" strokeWidth={2.6} strokeLinejoin="miter" strokeLinecap="round" />
        <path className="m-flicker" d={BOLT_D} stroke="var(--art-ivory)" strokeWidth={1.1} strokeLinejoin="miter" strokeLinecap="round" />
      </g>

      {/* Its tendrils, gripping: a great clinging */}
      <g {...part("clinging")} stroke="var(--gold)" strokeWidth={0.9} strokeLinecap="round">
        {TENDRILS.map((d, i) => (
          <path key={i} className={i % 2 ? "m-sway m-late" : "m-sway"} d={d} />
        ))}
      </g>

      {/* Still coiled at its foot, three and a half times round the root */}
      <g {...part("kundalini")}>
        <ellipse className="m-breathe" cx={AXIS} cy={ROOT_Y} rx={70} ry={34} fill={url("coil-glow")} />
        <path d={COIL} stroke="var(--art-vermilion)" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
        <path d={COIL} stroke="var(--art-saffron)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        <path d={COIL} stroke="var(--art-core)" strokeWidth={0.5} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Above the six wheels, her light */}
      <g {...part("above")}>
        <circle className="m-breathe" cx={TOP.x} cy={TOP.y} r={46} fill={url("top-glow")} />
        <circle cx={TOP.x} cy={TOP.y} r={6} fill="var(--art-core)" />
        <circle cx={TOP.x} cy={TOP.y} r={9.6} stroke="var(--gold)" strokeWidth={0.9} />
        <path className="m-lick" d={glint(10)} transform={`translate(${TOP.x} ${TOP.y})`} fill="var(--art-ivory)" />
      </g>

      {/* A lotus stalk broken, its fibres drawn out: she is finer than these */}
      <g {...part("fibre")}>
        <path d={`M ${STALK.x - 14} ${STALK.y} C ${STALK.x - 30} ${STALK.y + 2} ${STALK.x - 44} ${STALK.y + 14} ${STALK.x - 58} ${STALK.y + 40}`} stroke="var(--leaf)" strokeWidth={6} strokeLinecap="round" />
        <path d={`M ${STALK.x + 22} ${STALK.y + 2} C ${STALK.x + 34} ${STALK.y - 2} ${STALK.x + 44} ${STALK.y - 14} ${STALK.x + 50} ${STALK.y - 34}`} stroke="var(--leaf)" strokeWidth={6} strokeLinecap="round" />
        <path d={`M ${STALK.x - 14} ${STALK.y - 3} L ${STALK.x - 14} ${STALK.y + 3} M ${STALK.x + 22} ${STALK.y - 1} L ${STALK.x + 22} ${STALK.y + 5}`} stroke="var(--art-ivory)" strokeWidth={1.4} strokeLinecap="round" />
        <ellipse cx={STALK.x - 66} cy={STALK.y + 46} rx={30} ry={7} fill="var(--leaf)" fillOpacity={0.8} stroke="var(--gold)" strokeWidth={0.4} />
        <g transform={`translate(${STALK.x + 51} ${STALK.y - 36}) rotate(18) scale(0.36)`}>
          <OpenLotus pad={false} />
        </g>
        <path d={FIBRES} stroke="var(--art-ivory)" strokeWidth={0.35} />
        <path d={FIBRES} stroke="var(--gold)" strokeWidth={0.2} strokeOpacity={0.8} />
      </g>
    </svg>
  );
}
