/**
 * Shloka 71 — "A queen in her own right, and bells at the waist".
 *
 * Her light sits alone on a seat made for one, and round it, at the waist,
 * runs a girdle of bells that are ringing, because she has just moved. At the
 * foot of the seat Kubera's mongoose, the treasurer of the gods on the wrong
 * side of the transaction, spits out its jewels for her. At the left a length
 * of white cloth hangs into a pot of red dye, and the red is climbing it. From
 * the right a mango bough comes in with a flush of young copper leaves, a koel
 * on it and a ripe fruit dripping. In a bowl before the seat stand two blue
 * lotuses, long and cool. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { Bell, Pearl, Ruby, artIds, glint, partProps, polar, round, swingFrom } from "./primitives";
import type { ArtProps } from "./types";

const SWAY = ["m-sway", "m-sway m-late", "m-sway m-later"];

/* ── Her light, and the seat for one ───────────────────────────────────── */

const HER = { x: 320, y: 468 };
const SEAT = { x: 320, top: 500 };
const BACK = `M ${SEAT.x - 34} ${SEAT.top} V 446 C ${SEAT.x - 34} 418 ${SEAT.x - 14} 406 ${SEAT.x} 404 C ${SEAT.x + 14} 406 ${SEAT.x + 34} 418 ${SEAT.x + 34} 446 V ${SEAT.top} Z`;
const BACK_PANEL = `M ${SEAT.x - 26} ${SEAT.top} V 448 C ${SEAT.x - 26} 426 ${SEAT.x - 10} 416 ${SEAT.x} 414 C ${SEAT.x + 10} 416 ${SEAT.x + 26} 426 ${SEAT.x + 26} 448 V ${SEAT.top} Z`;
/** An armrest rolled into a volute, for the right side; mirrored for the left. */
const ARM = "M 34 0 L 34 -18 C 34 -26 44 -30 50 -26 C 56 -22 54 -14 48 -13 C 44 -12 42 -16 45 -18 L 46 0 Z";
const SLAB = { x: SEAT.x - 50, y: SEAT.top, w: 100, h: 14 };
const SEAT_PETALS = Array.from({ length: 9 }, (_, i) => SEAT.x - 44 + i * 11);
/** A leg carved as a lion's paw, for the right side; mirrored for the left. */
const PAW = "M 34 14 L 42 14 C 44 24 44 32 48 38 C 50 42 46 44 42 44 L 30 44 C 28 40 32 36 33 30 C 34 24 34 18 34 14 Z";
const BASE = { y: SEAT.top + 44 };
/** The seat, her light and the girdle are drawn at 1.2, their base brought down to the floor. */
const LIFT = `translate(${SEAT.x} 566) scale(1.2) translate(${-SEAT.x} ${-BASE.y})`;

/* ── The ringing girdle ────────────────────────────────────────────────── */

const GIRDLE = { cx: HER.x, cy: 480, rx: 50, ry: 12 };
const girdleAt = (deg: number) => {
  const t = (deg * Math.PI) / 180;
  return {
    x: round(GIRDLE.cx + GIRDLE.rx * Math.cos(t)),
    y: round(GIRDLE.cy + GIRDLE.ry * Math.sin(t)),
  };
};
const GIRDLE_FAR = `M ${GIRDLE.cx - GIRDLE.rx} ${GIRDLE.cy} A ${GIRDLE.rx} ${GIRDLE.ry} 0 0 1 ${GIRDLE.cx + GIRDLE.rx} ${GIRDLE.cy}`;
const GIRDLE_NEAR = `M ${GIRDLE.cx - GIRDLE.rx} ${GIRDLE.cy} A ${GIRDLE.rx} ${GIRDLE.ry} 0 0 0 ${GIRDLE.cx + GIRDLE.rx} ${GIRDLE.cy}`;
const BELLS = [20, 45, 135, 160].map((deg) => girdleAt(deg));
const KNOT = girdleAt(90);
/** Broken arcs of ringing rising off the girdle on either side. */
const RINGING = [0, 1, 2].flatMap((k) =>
  [-1, 1].map((side) => {
    const r = 58 + k * 14;
    const a = polar(GIRDLE.cx, GIRDLE.cy + 6, r, side < 0 ? 196 : -16);
    const b = polar(GIRDLE.cx, GIRDLE.cy + 6, r, side < 0 ? 168 : 12);
    return {
      d: `M ${a.x} ${a.y} A ${r} ${r} 0 0 ${side < 0 ? 1 : 0} ${b.x} ${b.y}`,
      k,
    };
  }),
);

/* ── Kubera's mongoose and its jewels ──────────────────────────────────── */

const MONGOOSE = { x: 178, y: 618, k: 1.2 };
const MONGOOSE_BODY =
  "M -28 -6 C -28 -16 -14 -24 2 -24 C 14 -24 20 -26 26 -30 C 32 -34 40 -32 44 -27 C 47 -24 50 -21 54 -19 L 50 -16 C 44 -15 38 -16 34 -14 C 30 -10 28 -6 26 -4 L 25 0 L 19 0 L 19 -4 C 8 -4 -6 -4 -14 -5 L -14 0 L -20 0 L -22 -4 C -26 -4 -28 -5 -28 -6 Z";
const MONGOOSE_TAIL = "M -24 -14 C -38 -20 -54 -14 -62 -2 C -65 3 -63 7 -59 6 C -55 1 -50 -2 -44 -3 C -38 -4 -32 -3 -26 -4 Z";
const MONGOOSE_FUR =
  "M -20 -15 l 2 3 M -12 -19 l 2 3 M -4 -21 l 2 3 M 4 -21 l 2 3 M 12 -21 l 2 3 M 20 -24 l 2 3 M -14 -11 l 2 3 M -4 -13 l 2 3 M 6 -13 l 2 3 M -36 -14 l 1 3 M -44 -12 l 1 3 M -52 -8 l 1 3 M -40 -8 l 1 3 M -48 -5 l 1 3";
const JEWELS = [
  { x: 250, y: 612, kind: "ruby", r: 2.8 },
  { x: 262, y: 618, kind: "pearl", r: 2.6 },
  { x: 255, y: 625, kind: "ruby", r: 2.4 },
  { x: 274, y: 612, kind: "pearl", r: 2.2 },
  { x: 270, y: 626, kind: "diamond", r: 2.6 },
  { x: 286, y: 619, kind: "ruby", r: 2.6 },
  { x: 282, y: 607, kind: "pearl", r: 2 },
  { x: 298, y: 613, kind: "pearl", r: 2.4 },
  { x: 294, y: 626, kind: "ruby", r: 2.2 },
  { x: 310, y: 621, kind: "diamond", r: 2.2 },
  { x: 244, y: 621, kind: "pearl", r: 2 },
] as const;
/** The last jewels still in the air between its mouth and the heap. */
const FALLING = [
  { x: 240, y: 600, kind: "ruby", r: 2.2 },
  { x: 236, y: 596, kind: "pearl", r: 1.8 },
] as const;

/* ── Cloth taking the dye ──────────────────────────────────────────────── */

const POLE = { x1: 108, x2: 196, y: 414 };
const CLOTH_FRONT = "M 132 414 C 130 440 134 470 132 496 C 131 512 134 526 136 540 L 158 540 C 158 524 156 510 157 494 C 158 468 156 440 158 414 Z";
const CLOTH_BACK = "M 158 414 C 166 418 168 432 166 446 L 176 448 C 178 432 176 418 168 412 Z";
const CLOTH_FOLDS = "M 140 420 C 139 450 142 480 141 512 M 150 420 C 151 452 148 486 150 520";
const DYE_POT = { x: 147, y: 566 };

/* ── The mango bough ───────────────────────────────────────────────────── */

const BOUGH = "M 650 140 C 612 160 580 196 562 240 C 544 286 528 336 506 376 C 490 404 470 424 446 436";
const BOUGH_TWIG = "M 528 330 C 512 318 500 300 498 282";
type MangoLeaf = {
  x: number;
  y: number;
  deg: number;
  len: number;
  young?: boolean;
};
const LEAVES: MangoLeaf[] = [
  { x: 626, y: 152, deg: 70, len: 44 },
  { x: 612, y: 162, deg: -50, len: 46 },
  { x: 594, y: 178, deg: 150, len: 44 },
  { x: 580, y: 194, deg: 40, len: 42 },
  { x: 566, y: 226, deg: 170, len: 42 },
  { x: 556, y: 262, deg: 20, len: 40 },
  { x: 546, y: 290, deg: 190, len: 40 },
  { x: 498, y: 282, deg: -110, len: 36 },
  { x: 498, y: 282, deg: -160, len: 34 },
  { x: 498, y: 282, deg: -60, len: 32 },
  { x: 534, y: 318, deg: 10, len: 40 },
  { x: 516, y: 358, deg: 30, len: 38 },
  { x: 444, y: 436, deg: 120, len: 30, young: true },
  { x: 444, y: 436, deg: 100, len: 36, young: true },
  { x: 444, y: 436, deg: 80, len: 32, young: true },
  { x: 444, y: 436, deg: 140, len: 26, young: true },
  { x: 444, y: 436, deg: 62, len: 26, young: true },
];
const leafPath = (len: number, w: number) =>
  `M 0 0 C ${round(len * 0.3)} ${-w} ${round(len * 0.7)} ${round(-w * 0.75)} ${len} 0 C ${round(len * 0.7)} ${round(w * 0.75)} ${round(len * 0.3)} ${w} 0 0 Z`;
const MANGO = { x: 508, y: 440 };
const MANGO_FRUIT = "M 0 -14 C 9 -14 13 -4 12 6 C 11 16 4 22 -3 21 C -10 20 -12 10 -10 0 C -8 -8 -6 -14 0 -14 Z";
const KOEL = { x: 562, y: 244 };
const KOEL_BODY = "M -12 -4 C -10 -12 4 -14 10 -8 C 14 -4 18 2 26 12 L 23 14 C 16 8 10 4 6 2 C 0 5 -8 4 -12 -4 Z";

/* ── Two blue lotuses in a bowl ────────────────────────────────────────── */

const BOWL = { x: 444, y: 628, k: 1.25 };
const LOTUSES = [
  { x: -8, top: -46, lean: -14 },
  { x: 8, top: -38, lean: 16 },
];
const LOTUS_PETALS = [-52, -26, 0, 26, 52];

export function QueenAndGirdle({ idPrefix = "sa71", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  const jewel = (j: { x: number; y: number; kind: string; r: number }, i: number) =>
    j.kind === "ruby" ? (
      <Ruby key={i} x={j.x} y={j.y} r={j.r} />
    ) : j.kind === "pearl" ? (
      <Pearl key={i} x={j.x} y={j.y} r={j.r} />
    ) : (
      <path key={i} d={glint(j.r * 1.6)} transform={`translate(${j.x} ${j.y})`} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.4} />
    );

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("dye")} gradientUnits="userSpaceOnUse" x1={0} y1={414} x2={0} y2={540}>
          <stop offset="0" style={{ stopColor: "var(--art-ivory)" }} />
          <stop offset="0.42" style={{ stopColor: "var(--art-ivory)" }} />
          <stop offset="0.56" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)" }} />
        </linearGradient>
        <linearGradient id={id("young")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-crimson)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-ember)" }} />
        </linearGradient>
        <radialGradient id={id("mango")} cx={0.35} cy={0.3} r={0.75}>
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="0.8" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
      </defs>

      {/* The seat made for one, and her light on it */}
      <g {...part("seat")}>
        <g transform={LIFT}>
          <ellipse cx={SEAT.x} cy={BASE.y + 4} rx={66} ry={7} fill="var(--art-musk)" fillOpacity={0.16} />
          <path d={BACK} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.2} />
          <path d={BACK_PANEL} fill="var(--art-saffron)" fillOpacity={0.3} stroke="var(--gold-soft)" strokeWidth={0.6} />
          <circle cx={SEAT.x} cy={398} r={4} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.4} />
          <path
            d={`M ${SEAT.x} 394 C ${SEAT.x - 3} 390 ${SEAT.x - 1} 386 ${SEAT.x} 383 C ${SEAT.x + 1} 386 ${SEAT.x + 3} 390 ${SEAT.x} 394 Z`}
            fill="var(--gold)"
          />
          {[1, -1].map((side) => (
            <g key={side} transform={`translate(${SEAT.x} ${SEAT.top}) scale(${side} 1)`}>
              <path d={PAW} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
              <path d="M 31 44 L 31 40 M 35 44 L 35 40 M 39 44 L 39 40" stroke="var(--art-carve)" strokeWidth={0.6} />
              <path d={ARM} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.8} />
            </g>
          ))}
          <rect x={SEAT.x - 62} y={BASE.y} width={124} height={8} rx={1.5} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.8} />
          <rect x={SLAB.x} y={SLAB.y} width={SLAB.w} height={SLAB.h} rx={2} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.9} />
          {SEAT_PETALS.map((x) => (
            <path
              key={x}
              d={`M ${x - 4.6} ${SLAB.y + 2} C ${x - 4} ${SLAB.y + 10} ${x + 4} ${SLAB.y + 10} ${x + 4.6} ${SLAB.y + 2} Z`}
              fill="var(--art-saffron)"
              stroke="var(--gold)"
              strokeWidth={0.5}
            />
          ))}
          <ellipse cx={SEAT.x} cy={SEAT.top - 2} rx={36} ry={7} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={1} />
          <ellipse cx={SEAT.x} cy={SEAT.top - 4} rx={28} ry={4.4} stroke="var(--gold-soft)" strokeWidth={0.6} strokeDasharray="2 2" />
        </g>
      </g>

      {/* Her light, the girdle's far half behind it */}
      <g {...part("her-light")}>
        <g transform={LIFT}>
          <path d={GIRDLE_FAR} stroke="var(--gold)" strokeWidth={4} strokeOpacity={0.7} />
          <circle className="m-breathe" cx={HER.x} cy={HER.y} r={42} fill={url("her")} />
          <circle cx={HER.x} cy={HER.y} r={8.4} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
          <circle cx={HER.x} cy={HER.y} r={4} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.8} />
        </g>
      </g>

      {/* The girdle's near half, its bells ringing */}
      <g {...part("bells")}>
        <g transform={LIFT}>
          <path d={GIRDLE_NEAR} stroke="var(--gold)" strokeWidth={4.4} strokeLinecap="round" />
          <path d={GIRDLE_NEAR} stroke="var(--art-carve)" strokeWidth={0.6} strokeDasharray="2 2.4" />
          <path d={GIRDLE_NEAR} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.7} transform="translate(0 -1.2)" />
          {BELLS.map((b, i) => (
            <g key={i} transform={`translate(${b.x} ${b.y})`}>
              <g className={SWAY[i % 3]}>
                <Bell gem={i % 2 ? "var(--leaf)" : "var(--art-vermilion)"} s={0.56} />
              </g>
            </g>
          ))}
          <g className="m-sway" style={swingFrom(KNOT)}>
            {[-5, 5].map((dx) => (
              <g key={dx} transform={`translate(${KNOT.x + dx} ${KNOT.y + 3})`}>
                <path d={`M 0 0 L 0 ${dx < 0 ? 10 : 6}`} stroke="var(--gold)" strokeWidth={0.8} />
                <g transform={`translate(0 ${dx < 0 ? 10 : 6})`}>
                  <Bell gem="var(--art-vermilion)" s={0.62} />
                </g>
              </g>
            ))}
          </g>
          <ellipse cx={KNOT.x} cy={KNOT.y} rx={6.4} ry={4.4} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <Ruby x={KNOT.x} y={KNOT.y} r={2.4} />
          {RINGING.map((r, i) => (
            <path
              key={i}
              className={r.k ? "m-shimmer m-late" : "m-shimmer"}
              d={r.d}
              stroke="var(--gold)"
              strokeWidth={1.1}
              strokeOpacity={round(0.8 - r.k * 0.22)}
              strokeDasharray="5 4"
              strokeLinecap="round"
            />
          ))}
        </g>
      </g>

      {/* Kubera's mongoose spitting out its jewels at the foot of the seat */}
      <g {...part("mongoose")}>
        <ellipse cx={MONGOOSE.x - 6} cy={MONGOOSE.y + 2} rx={58} ry={6} fill="var(--art-musk)" fillOpacity={0.16} />
        <g transform={`translate(${MONGOOSE.x} ${MONGOOSE.y}) scale(${MONGOOSE.k})`}>
          <path d={MONGOOSE_TAIL} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.7} />
          <path d={MONGOOSE_TAIL} fill="var(--art-moon)" fillOpacity={0.25} />
          <path d={MONGOOSE_TAIL} fill="var(--art-turmeric)" fillOpacity={0.15} />
          <path d={MONGOOSE_BODY} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path d={MONGOOSE_BODY} fill="var(--art-moon)" fillOpacity={0.25} />
          <path d={MONGOOSE_BODY} fill="var(--art-turmeric)" fillOpacity={0.15} />
          <path d={MONGOOSE_FUR} stroke="var(--art-ivory)" strokeWidth={0.7} strokeOpacity={0.8} strokeLinecap="round" />
          <path d="M 31 -31 C 30 -36 36 -37 37 -32" fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.6} />
          <circle cx={42} cy={-26} r={1.4} fill="var(--art-vermilion)" />
          <circle cx={54} cy={-18.6} r={1} fill="var(--art-carve)" />
          <path d="M 14 -24 C 22 -27 28 -31 36 -33" stroke="var(--art-ivory)" strokeWidth={0.7} strokeOpacity={0.7} strokeLinecap="round" />
        </g>
        {FALLING.map(jewel)}
        {JEWELS.map(jewel)}
      </g>

      {/* A length of white cloth hanging into red dye, and the red climbing it */}
      <g {...part("dye")}>
        <path d={`M ${POLE.x2} ${POLE.y - 2} L ${POLE.x2 + 2} ${DYE_POT.y + 8}`} stroke="var(--art-hair)" strokeOpacity={0.55} strokeWidth={3} strokeLinecap="round" />
        <path
          d={`M ${POLE.x2 - 8} ${POLE.y - 12} L ${POLE.x2} ${POLE.y} L ${POLE.x2 + 7} ${POLE.y - 11}`}
          stroke="var(--art-hair)"
          strokeOpacity={0.55}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
        <path d={CLOTH_BACK} fill="var(--art-ivory)" stroke="var(--gold-soft)" strokeWidth={0.6} />
        <path d={`M ${POLE.x1} ${POLE.y} L ${POLE.x2 + 4} ${POLE.y - 2}`} stroke="var(--art-turmeric)" strokeWidth={3.2} strokeLinecap="round" />
        <path d={`M ${POLE.x1 + 30} ${POLE.y - 1.4} v 3 M ${POLE.x1 + 66} ${POLE.y - 2} v 3`} stroke="var(--gold)" strokeWidth={0.8} />
        <path d={CLOTH_FRONT} fill={url("dye")} stroke="var(--gold-soft)" strokeWidth={0.6} />
        <path d={CLOTH_FOLDS} stroke="var(--art-carve)" strokeWidth={0.5} strokeOpacity={0.35} />
        <g transform={`translate(${DYE_POT.x} ${DYE_POT.y})`}>
          <ellipse cy={22} rx={28} ry={4} fill="var(--art-musk)" fillOpacity={0.16} />
          <path
            d="M -24 -24 C -32 -10 -30 12 -14 20 C -6 24 6 24 14 20 C 30 12 32 -10 24 -24 Z"
            fill="var(--art-ember)"
            stroke="var(--gold)"
            strokeWidth={0.8}
          />
          <path d="M -28 -6 C -10 0 10 0 28 -6" stroke="var(--art-ivory)" strokeWidth={0.8} strokeOpacity={0.45} />
          <ellipse cy={-24} rx={25} ry={5} fill="var(--art-crimson)" stroke="var(--gold)" strokeWidth={1.2} />
          <path className="m-shimmer" d="M -14 -25 C -6 -27 4 -27 12 -25" stroke="var(--art-vermilion)" strokeWidth={1.2} strokeLinecap="round" />
        </g>
        <path d="M 136 540 C 140 543 154 543 158 540" stroke="var(--art-crimson)" strokeWidth={2} />
      </g>

      {/* The mango bough: its young copper leaves, the koel on it and the ripe fruit */}
      <g {...part("bough")}>
        <path d={BOUGH} stroke="var(--art-hair)" strokeWidth={5} strokeOpacity={0.55} strokeLinecap="round" />
        <path d={BOUGH} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.7} transform="translate(0 -1.8)" />
        <path d={BOUGH_TWIG} stroke="var(--art-hair)" strokeWidth={2.4} strokeOpacity={0.55} strokeLinecap="round" />
        {LEAVES.filter((l) => !l.young).map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.deg})`}>
            <path d={leafPath(l.len, 6.4)} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.5} />
            <path d={`M 2 0 L ${l.len - 3} 0`} stroke="var(--gold-soft)" strokeWidth={0.5} />
          </g>
        ))}
        <g className="m-sway" style={swingFrom({ x: 444, y: 436 })}>
          {LEAVES.filter((l) => l.young).map((l, i) => (
            <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.deg})`}>
              <path d={leafPath(l.len, 4.6)} fill={url("young")} stroke="var(--gold)" strokeWidth={0.5} />
              <path d={`M 2 0 L ${l.len - 3} 0`} stroke="var(--art-core)" strokeWidth={0.4} strokeOpacity={0.6} />
            </g>
          ))}
        </g>
      </g>
      <g {...part("koel")}>
        <g transform={`translate(${KOEL.x} ${KOEL.y - 8})`}>
          <path d={KOEL_BODY} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
          <circle cx={-10} cy={-8} r={5.4} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.6} />
          <path d="M -15 -9.4 L -21 -8 L -15 -6.4 Z" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.3} />
          <circle cx={-11} cy={-9} r={1.3} fill="var(--art-vermilion)" />
          <path d="M -2 -8 C 4 -9 9 -6 12 -2" stroke="var(--gold-soft)" strokeWidth={0.6} strokeLinecap="round" />
          <path d="M 0 3 L -1 8 M 4 3 L 4 8" stroke="var(--gold)" strokeWidth={0.8} strokeLinecap="round" />
          {[0, 1].map((k) => (
            <path
              key={k}
              className={k ? "m-shimmer m-late" : "m-shimmer"}
              d={`M ${-26 - k * 6} ${-15 - k * 3} A ${10 + k * 6} ${10 + k * 6} 0 0 0 ${-26 - k * 6} ${-1 + k * 3}`}
              stroke="var(--gold)"
              strokeWidth={0.9}
              strokeDasharray="3 3"
              strokeLinecap="round"
            />
          ))}
        </g>
      </g>
      <g {...part("mango")}>
        <path
          d={`M ${MANGO.x - 6} 384 C ${MANGO.x - 2} 396 ${MANGO.x} 410 ${MANGO.x} ${MANGO.y - 14}`}
          stroke="var(--art-hair)"
          strokeWidth={1.4}
          strokeOpacity={0.7}
        />
        <g className="m-sway" style={swingFrom({ x: MANGO.x - 6, y: 384 })}>
          <g transform={`translate(${MANGO.x} ${MANGO.y})`}>
            <path d={MANGO_FRUIT} fill={url("mango")} stroke="var(--gold)" strokeWidth={0.7} />
            <path d="M -6 -6 C -8 0 -8 6 -6 10" stroke="var(--art-ivory)" strokeWidth={1.1} strokeOpacity={0.7} strokeLinecap="round" />
            <path d="M -3 21 C -4 24 -2 26 -1 26 C 0 26 2 24 -1 21 Z" fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.3} />
          </g>
        </g>
        <path
          className="m-twinkle"
          d={`M ${MANGO.x - 1} ${MANGO.y + 36} c -2 4 0 7 1 7 c 1 0 3 -3 1 -7 Z`}
          fill="var(--art-turmeric)"
          stroke="var(--gold)"
          strokeWidth={0.3}
        />
      </g>

      {/* Two blue lotuses, long and cool, in a bowl before the seat */}
      <g {...part("lotuses")}>
        <g transform={`translate(${BOWL.x} ${BOWL.y}) scale(${BOWL.k})`}>
          <ellipse cy={3} rx={24} ry={3.6} fill="var(--art-musk)" fillOpacity={0.16} />
          {LOTUSES.map((l, i) => {
            const tip = { x: l.x + l.lean * 0.7, y: l.top };
            return (
              <g key={i}>
                <path d={`M ${l.x * 0.4} -8 C ${l.x} -20 ${tip.x} ${l.top + 16} ${tip.x} ${l.top + 6}`} stroke="var(--leaf)" strokeWidth={1.4} />
                <g transform={`translate(${tip.x} ${l.top + 6}) rotate(${l.lean})`}>
                  {LOTUS_PETALS.map((deg) => (
                    <g key={deg} transform={`rotate(${deg * 0.6})`}>
                      <path
                        d="M 0 0 C -4 -6 -4 -16 0 -22 C 4 -16 4 -6 0 0 Z"
                        fill="var(--art-hair)"
                        stroke={deg === 0 ? "var(--gold)" : "var(--gold-soft)"}
                        strokeWidth={0.6}
                      />
                    </g>
                  ))}
                  <path d="M -5 0 C -4 3 4 3 5 0 Z" fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.4} />
                </g>
              </g>
            );
          })}
          <path d="M -18 -10 C -16 2 16 2 18 -10 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <ellipse cy={-10} rx={18} ry={3.4} fill="var(--art-moon)" fillOpacity={0.8} stroke="var(--gold)" strokeWidth={0.6} />
        </g>
      </g>
    </svg>
  );
}
