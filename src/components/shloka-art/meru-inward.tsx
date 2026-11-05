/**
 * Shloka 22 — "From the world-mountain inward to the couch of the five gods".
 *
 * The verse moves inward, and the artwork rises with it. Meru stands at the
 * bottom with its three summits; on the middle one the city climbs in walls
 * of different metals, each inside the last; on the innermost terrace stands
 * a pavilion of the wish-granting gem; and in the pavilion is the couch whose
 * legs are four gods and whose plank is a fifth, with her presence seated on
 * it. Which name each part answers to is written up for readers in the
 * registry, next to this artwork's entry.
 */

import { BrahmaCouch, artIds, glint, partProps, polyline, radiance, round, through } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const CX = 320;

/* ── Meru and its three summits ────────────────────────────────────────── */

const SUMMIT_Y = 624;
const MERU = through([
  { x: -30, y: 790 },
  { x: 70, y: 716 },
  { x: 136, y: 652 },
  { x: 156, y: 640 },
  { x: 178, y: 652 },
  { x: 204, y: 690 },
  { x: 222, y: 664 },
  { x: 236, y: SUMMIT_Y + 2 },
  { x: 320, y: SUMMIT_Y },
  { x: 404, y: SUMMIT_Y + 2 },
  { x: 418, y: 666 },
  { x: 436, y: 692 },
  { x: 462, y: 654 },
  { x: 484, y: 642 },
  { x: 506, y: 654 },
  { x: 574, y: 718 },
  { x: 670, y: 792 },
]);
const MERU_PATH = polyline(MERU) + " L 670 840 L -30 840 Z";
/** Ridges running down from each summit. */
const RIDGES = [
  [{ x: 156, y: 644 }, { x: 140, y: 700 }, { x: 118, y: 770 }],
  [{ x: 156, y: 644 }, { x: 172, y: 712 }, { x: 180, y: 790 }],
  [{ x: 484, y: 646 }, { x: 468, y: 716 }, { x: 462, y: 790 }],
  [{ x: 484, y: 646 }, { x: 502, y: 706 }, { x: 530, y: 770 }],
  [{ x: 262, y: 630 }, { x: 250, y: 700 }, { x: 240, y: 790 }],
  [{ x: 378, y: 630 }, { x: 392, y: 700 }, { x: 404, y: 790 }],
  [{ x: 320, y: 630 }, { x: 318, y: 720 }, { x: 322, y: 800 }],
].map((pts) => polyline(through(pts as Pt[], 10)));

/* ── The city: walls of different metals, each inside the last ─────────── */

const FLOOR_Y = 540;
const TIERS = [
  { name: "iron", fill: "var(--art-hair)" },
  { name: "copper", fill: "var(--sindura)" },
  { name: "silver", fill: "var(--art-moon)" },
  { name: "gold", fill: "var(--gold)" },
  { name: "ruby", fill: "var(--art-vermilion)" },
  { name: "emerald", fill: "var(--leaf)" },
].map((t, k) => {
  const n = 6;
  const bottom = round(SUMMIT_Y - k * ((SUMMIT_Y - FLOOR_Y) / n));
  const top = round(bottom - (SUMMIT_Y - FLOOR_Y) / n);
  const half = round(150 - k * 12);
  return { ...t, top, bottom, half, k };
});
const TIER_H = (SUMMIT_Y - FLOOR_Y) / 6;
/** The merlons along a wall's top. */
const merlons = (half: number, top: number) => {
  const n = Math.floor((half * 2) / 9);
  const step = (half * 2) / n;
  return Array.from({ length: n }, (_, k) => `M ${round(CX - half + k * step + 1.8)} ${top} h ${round(step - 4)} v -5 h ${round(-(step - 4))} Z`).join(" ");
};
const GATE = { w: 18, h: TIER_H + 3 };

/* ── The pavilion of the wish-gem ──────────────────────────────────────── */

const PAV = { half: 92, floor: FLOOR_Y, lintel: 438, lintelH: 8 };
const PILLARS = [-80, -36, 36, 80].map((dx) => CX + dx);
/** The roof: the wish-gem itself, cut with facets, standing on the lintel. */
const GEM_ROOF = {
  girdle: [
    { x: CX - PAV.half - 6, y: PAV.lintel },
    { x: CX - 70, y: 380 },
    { x: CX - 30, y: 346 },
    { x: CX, y: 326 },
    { x: CX + 30, y: 346 },
    { x: CX + 70, y: 380 },
    { x: CX + PAV.half + 6, y: PAV.lintel },
  ],
};
const ROOF_PATH = polyline(GEM_ROOF.girdle) + " Z";
const ROOF_FACETS = [
  `M ${CX - 70} 380 L ${CX - 26} 404 L ${CX + 26} 404 L ${CX + 70} 380`,
  `M ${CX - 30} 346 L ${CX - 26} 404 M ${CX + 30} 346 L ${CX + 26} 404 M ${CX} 326 L ${CX} 404`,
  `M ${CX - PAV.half - 6} ${PAV.lintel} L ${CX - 26} 404 M ${CX + PAV.half + 6} ${PAV.lintel} L ${CX + 26} 404`,
  `M ${CX - 70} 380 L ${CX - 30} 346 M ${CX + 70} 380 L ${CX + 30} 346`,
].join(" ");

/* ── The couch of the five Brahmās ─────────────────────────────────────── */

const PLANK = { y: 506 };
const BINDU = { x: CX, y: PLANK.y - 12 };
const RADIANCE = radiance({ cx: BINDU.x, cy: BINDU.y, from: 16, long: 430, short: 250 });

const LICK = ["m-lick", "m-lick m-late", "m-lick m-later"];

export function MeruInward({ idPrefix = "sa22", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <linearGradient id={id("meru")} x1={0} y1={SUMMIT_Y} x2={0} y2={800} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--gold)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.4 }} />
        </linearGradient>
        <radialGradient id={id("glow")} cx={BINDU.x} cy={BINDU.y} r={320} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={BINDU.x} cy={BINDU.y} r={430} gradientUnits="userSpaceOnUse">
          <stop offset="0.04" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.14" style={{ stopColor: "var(--gold)", stopOpacity: 0.75 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("roof")} x1={CX - PAV.half} y1={0} x2={CX + PAV.half} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.75 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--lotus)", stopOpacity: 0.6 }} />
        </linearGradient>
        <linearGradient id={id("inside")} x1={0} y1={PAV.lintel} x2={0} y2={PAV.floor} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.3 }} />
        </linearGradient>
      </defs>

      {/* Meru, the world-mountain, and its three summits */}
      <g {...part("meru")}>
        <path d={MERU_PATH} fill={url("meru")} fillOpacity={0.85} />
        <path d={polyline(MERU)} stroke="var(--gold)" strokeWidth={1.3} />
        <g stroke="var(--art-carve)" strokeWidth={0.7} strokeOpacity={0.45}>
          {RIDGES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {[{ x: 156, y: 640 }, { x: 484, y: 642 }].map((p, i) => (
          <path key={i} className={LICK[i + 1]} d={glint(7)} transform={`translate(${p.x} ${p.y - 2})`} fill="var(--art-core)" />
        ))}
      </g>

      {/* Her light, from her seat at the centre of everything */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={BINDU.x} cy={BINDU.y} r={320} fill={url("glow")} />
        <path className="m-shimmer" d={RADIANCE} stroke={url("radiance")} strokeWidth={0.7} />
      </g>

      {/* The city, wall within wall up the middle summit */}
      <g {...part("city")}>
        {TIERS.map((t) => (
          <g key={t.name}>
            <path d={`M ${CX - t.half} ${t.bottom} V ${t.top} H ${CX + t.half} V ${t.bottom} Z`} fill={t.fill} stroke="var(--gold)" strokeWidth={0.8} />
            <path d={merlons(t.half, t.top)} fill={t.fill} stroke="var(--gold)" strokeWidth={0.6} />
            <path d={`M ${CX - t.half + 2} ${round(t.top + 3)} H ${CX + t.half - 2}`} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.45} />
            {[-1, 1].map((side) => (
              <path key={side} d={`M ${CX + side * t.half - 5} ${t.bottom} V ${round(t.top - 7)} L ${CX + side * t.half} ${round(t.top - 13)} L ${CX + side * t.half + 5} ${round(t.top - 7)} V ${t.bottom} Z`} fill={t.fill} stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
            ))}
          </g>
        ))}
        <path d={`M ${CX - GATE.w / 2} ${SUMMIT_Y} V ${round(SUMMIT_Y - GATE.h + 6)} Q ${CX} ${round(SUMMIT_Y - GATE.h - 4)} ${CX + GATE.w / 2} ${round(SUMMIT_Y - GATE.h + 6)} V ${SUMMIT_Y} Z`} fill="var(--art-core)" fillOpacity={0.85} stroke="var(--gold)" strokeWidth={1} />
        {[-1, 1].map((side) => (
          <path key={side} d={`M ${CX + side * (GATE.w / 2 + 3)} ${SUMMIT_Y} V ${round(SUMMIT_Y - GATE.h - 6)} l ${side * 4} -6 l ${side * 4} 6 V ${SUMMIT_Y}`} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
        ))}
      </g>

      {/* The pavilion of the wish-granting gem */}
      <g {...part("house")}>
        <path d={`M ${CX - PAV.half + 6} ${PAV.lintel + PAV.lintelH} H ${CX + PAV.half - 6} V ${PAV.floor} H ${CX - PAV.half + 6} Z`} fill={url("inside")} />
        <path className="m-shimmer" d={ROOF_PATH} fill={url("roof")} stroke="var(--gold)" strokeWidth={1.3} strokeLinejoin="round" />
        <path d={ROOF_FACETS} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.8} />
        <path className="m-lick" d={glint(10)} transform={`translate(${CX - 40} 376)`} fill="var(--art-core)" />
        <path d={`M ${CX - 7} 326 Q ${CX - 10} 316 ${CX - 3} 312 L ${CX - 4} 306 Q ${CX} 296 ${CX + 4} 306 L ${CX + 3} 312 Q ${CX + 10} 316 ${CX + 7} 326 Z`} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
        <path className="m-lick m-late" d={glint(7)} transform={`translate(${CX + 30} 360)`} fill="var(--art-core)" />
        <rect x={CX - PAV.half - 6} y={PAV.lintel} width={(PAV.half + 6) * 2} height={PAV.lintelH} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.7} />
        {PILLARS.map((x) => (
          <g key={x}>
            <rect x={x - 3.6} y={PAV.lintel + PAV.lintelH} width={7.2} height={PAV.floor - PAV.lintel - PAV.lintelH} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.8} />
            <path d={`M ${x} ${PAV.lintel + PAV.lintelH + 2} V ${PAV.floor - 2}`} stroke="var(--art-core)" strokeWidth={1.2} strokeOpacity={0.8} />
            <rect x={x - 6} y={PAV.lintel + PAV.lintelH} width={12} height={4} fill="var(--gold)" />
            <rect x={x - 6} y={PAV.floor - 4} width={12} height={4} fill="var(--gold)" />
          </g>
        ))}
        <rect x={CX - PAV.half - 10} y={PAV.floor} width={(PAV.half + 10) * 2} height={5} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
      </g>

      {/* The couch: four gods as its legs, a fifth as its plank, and her seated on it */}
      <g {...part("couch")}>
        <BrahmaCouch cx={CX} plank={PLANK.y} floor={PAV.floor} />
        <circle className="m-breathe" cx={BINDU.x} cy={BINDU.y} r={30} fill={url("bindu-glow")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={5.4} fill="var(--art-core)" />
        <circle cx={BINDU.x} cy={BINDU.y} r={9} stroke="var(--gold)" strokeWidth={0.8} />
      </g>
    </svg>
  );
}
