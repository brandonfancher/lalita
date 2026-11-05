/**
 * Shloka 57 — "Witness of the dance at the end of the world".
 *
 * The great dissolution as Śiva's dance, with no dancer drawn: a ring of fire
 * wheeling round the card, its flames raked back by the turn, carrying the
 * worlds and the emblems of the gods who ran them into the fire, and over it,
 * at the upper right, the drum of the dance being shaken, its beats flung up
 * over the title. Below the card, inside the ring and untouched by it, one
 * throne for two: his seat empty, because he is the one dancing, and on hers
 * her light, perfectly still, watching. Three small cities, of gold, silver
 * and iron, stand round the throne at the points of a triangle, the iron one
 * on the ground of ash that is all the fire leaves. Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import type { CSSProperties } from "react";
import {
  Damaru,
  GanesaEmblem,
  OpenLotus,
  Vajra,
  artIds,
  eggPath,
  hash,
  litPart,
  partProps,
  polar,
  round,
  tongue,
  trident,
} from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];
const LICK = ["m-lick", "m-lick m-late", "m-lick m-later"];
const CX = 320;

/* ── The ring of fire, wheeling clockwise ──────────────────────────────── */

/** A hoop turned a little, so it reads as spinning. Its flames stay under the title (y ≈ 141). */
const RING = { x: CX, y: 376, rx: 238, ry: 208, tilt: -6 };
const TILT = (RING.tilt * Math.PI) / 180;

function onRing(deg: number, grow = 0): Pt {
  const t = (deg * Math.PI) / 180;
  const ex = (RING.rx + grow) * Math.cos(t);
  const ey = (RING.ry + grow) * Math.sin(t);
  return { x: round(RING.x + ex * Math.cos(TILT) - ey * Math.sin(TILT)), y: round(RING.y + ex * Math.sin(TILT) + ey * Math.cos(TILT)) };
}
const at = (deg: number, grow: number) => {
  const p = onRing(deg, grow);
  return `${p.x} ${p.y}`;
};

const unit = (x: number, y: number) => {
  const l = Math.hypot(x, y);
  return { x: x / l, y: y / l };
};
const turn = (v: Pt) => ({ x: v.x * Math.cos(TILT) - v.y * Math.sin(TILT), y: v.x * Math.sin(TILT) + v.y * Math.cos(TILT) });

/** The outward normal, and the way the ring is turning (increasing deg is clockwise on screen). */
function frame(deg: number) {
  const t = (deg * Math.PI) / 180;
  const normal = turn(unit(Math.cos(t) / RING.rx, Math.sin(t) / RING.ry));
  const ahead = turn(unit(-RING.rx * Math.sin(t), RING.ry * Math.cos(t)));
  return { normal, ahead };
}
const angleOf = (v: Pt) => (Math.atan2(v.y, v.x) * 180) / Math.PI;

const CRESTS = 90;
const STEP = 360 / CRESTS;
/** Degrees of the ring per unit of its length. */
const PER_UNIT = 180 / (Math.PI * 222);
const BAND = -16;

/** Tall, short, middling: the rhythm that keeps the edge from reading as teeth. */
const RHYTHM = [1, 0.5, 0.74];

/** Each crest's height: uneven, lower across the top where the title sits, and toward the ground. */
const CREST_H = Array.from({ length: CRESTS }, (_, i) => {
  const y = onRing((i + 0.5) * STEP).y;
  const f = y < 240 ? 0.46 + (0.54 * (y - 168)) / 72 : y > 548 ? 0.72 : 1;
  return round((40 + 18 * hash(i, 57)) * RHYTHM[i % 3] * f);
});

/**
 * One layer of the fire as a closed band: crests along the outer edge, each
 * tip thrown back against the turn, round an inner edge at `BAND`.
 */
function fireBand(scale: number, lift: number) {
  const crests = CREST_H.map((h0, i) => {
    const h = h0 * scale;
    const a = i * STEP;
    const b = a + STEP;
    const tip = a + STEP / 2 - h * (0.3 + 0.28 * hash(i, 3)) * PER_UNIT;
    return [
      i === 0 ? `M ${at(a, lift)}` : "",
      `C ${at(a - STEP * 0.22, lift + h * 0.4)} ${at(tip + STEP * 0.5, lift + h * 0.7)} ${at(tip, lift + h)}`,
      `C ${at(tip + STEP * 0.36, lift + h * 0.86)} ${at(b + STEP * 0.16, lift + h * 0.52)} ${at(b, lift)}`,
    ].join(" ");
  }).join(" ");
  const rx = RING.rx + BAND;
  const ry = RING.ry + BAND;
  const inner = `M ${at(0, BAND)} A ${rx} ${ry} ${RING.tilt} 0 0 ${at(180, BAND)} A ${rx} ${ry} ${RING.tilt} 0 0 ${at(0, BAND)} Z`;
  return `${crests} Z ${inner}`;
}
const FIRE = [
  { d: fireBand(1, 0), fill: "var(--art-vermilion)", o: 0.94 },
  { d: fireBand(0.68, -3), fill: "var(--art-saffron)", o: 0.95 },
  { d: fireBand(0.36, -6), fill: "var(--art-core)", o: 0.9 },
];

/** Licks torn off the tallest crests, flying back behind them. */
const LICKS = CREST_H.flatMap((h, i) => {
  if (i % 6 !== 0) return [];
  const deg = i * STEP + STEP / 2 - h * 0.8 * PER_UNIT;
  const base = onRing(deg, h * 0.82);
  const { normal, ahead } = frame(deg);
  const rake = (38 * Math.PI) / 180;
  const dir = { x: normal.x * Math.cos(rake) - ahead.x * Math.sin(rake), y: normal.y * Math.cos(rake) - ahead.y * Math.sin(rake) };
  const s = h / 50;
  return [{ transform: `translate(${base.x} ${base.y}) rotate(${round(angleOf(dir) + 90)})`, d: tongue(round(17 * s), round(5 * s), round(-3 * s)), k: (i / 6) % 3 }];
});

/** Sparks thrown up off the fire at both sides. */
const SPARKS = Array.from({ length: 16 }, (_, i) => {
  const deg = i % 2 ? 160 + (i % 5) * 9 : 340 + (i % 5) * 9;
  const p = onRing(deg, 30 + (i % 4) * 8);
  return { x: p.x, y: p.y, r: round(1 + (i % 3) * 0.5), dx: round((i % 2 ? -1 : 1) * (10 + (i % 4) * 6)), dur: 7 + (i % 5), delay: round(i * 0.9) };
});

const ringEllipse = (grow: number) => ({
  cx: RING.x,
  cy: RING.y,
  rx: RING.rx + grow,
  ry: RING.ry + grow,
  transform: `rotate(${RING.tilt} ${RING.x} ${RING.y})`,
});

/** Swept along the ring: worlds, and the emblems of Brahmā, Viṣṇu and Indra (Saundaryalaharī 26). */
type Swept = { deg: number; kind: "egg" | "lotus" | "discus" | "vajra"; s: number; spin: number };
const SWEPT: Swept[] = [
  { deg: 160, kind: "egg", s: 1.3, spin: 30 },
  { deg: 186, kind: "egg", s: 1.1, spin: -20 },
  { deg: 238, kind: "egg", s: 1.2, spin: 40 },
  { deg: 264, kind: "egg", s: 1, spin: -10 },
  { deg: 300, kind: "egg", s: 1.05, spin: 10 },
  { deg: 334, kind: "lotus", s: 0.42, spin: -14 },
  { deg: 10, kind: "discus", s: 1.7, spin: 0 },
  { deg: 36, kind: "egg", s: 1.25, spin: -35 },
  { deg: 62, kind: "egg", s: 1.3, spin: 25 },
  { deg: 212, kind: "vajra", s: 1.15, spin: 20 },
];
const SWEPT_AT = SWEPT.map((t) => {
  const p = onRing(t.deg, BAND + 8);
  const { ahead } = frame(t.deg);
  return { ...t, at: p, rot: round(angleOf(ahead) + t.spin) };
});
const CRACK = "M -2 -12 L 1.5 -6 L -2.5 -1 L 2 4 L -1 8";

/* ── The drum of the dance, shaken ─────────────────────────────────────── */

/** Clear of the title, which reaches x ≈ 426 at 1100px. */
const DRUM_T = trident(0, -86, 0, 2.4);
const DRUM = { x: 490, y: 106, tilt: -24 };
const drumAt = (p: Pt) => {
  const t = (DRUM.tilt * Math.PI) / 180;
  const x = p.x - DRUM_T.drum.x;
  const y = p.y - DRUM_T.drum.y;
  return { x: round(DRUM.x + x * Math.cos(t) - y * Math.sin(t)), y: round(DRUM.y + x * Math.sin(t) + y * Math.cos(t)) };
};
const HEADS = [drumAt({ x: DRUM_T.drum.x, y: DRUM_T.drum.y - DRUM_T.drum.half }), drumAt({ x: DRUM_T.drum.x, y: DRUM_T.drum.y + DRUM_T.drum.half })];
/** The bead cords flung out by the shake, one striking each head. */
const BEAD_CORDS = [
  { d: "M 0 0 C 13 -5 23 -15 25 -27", bead: { x: 25, y: -28 } },
  { d: "M 0 0 C -12 6 -21 16 -24 28", bead: { x: -24, y: 29 } },
];
/** Broken rings of sound from each head, widening. */
const SOUND = HEADS.flatMap((h, hi) =>
  [20, 32, 45].map((r, k) => {
    const mid = hi ? 270 + DRUM.tilt : 90 + DRUM.tilt;
    const a = polar(h.x, h.y, r, mid - 36);
    const b = polar(h.x, h.y, r, mid + 36);
    return { d: `M ${a.x} ${a.y} A ${r} ${r} 0 0 0 ${b.x} ${b.y}`, o: 0.85 - k * 0.2, k };
  }),
);

/** Nine beats and then five, flung up over the drum, above the title (Nandikeśvara's Kāśikā 1). */
const BEATS = [
  ...Array.from({ length: 9 }, (_, i) => polar(470, 158, 124, 62 + i * 8)),
  ...Array.from({ length: 5 }, (_, i) => polar(470, 158, 102, 74 + i * 10)),
].map((p, i) => ({ ...p, r: i < 9 ? 2.6 : 2.1, k: i % 3 }));

/* ── The throne for two ────────────────────────────────────────────────── */

const SEAT = { x0: 230, x1: 410, top: 524, slab: 10, foot: 556 };
const BACK = { x0: 246, x1: 394, top: 478 };
const SCALLOPS = 8;
const SCALLOP = (BACK.x1 - BACK.x0) / SCALLOPS;
const BACK_PATH = [
  `M ${BACK.x0} ${SEAT.top} L ${BACK.x0} ${BACK.top}`,
  ...Array.from({ length: SCALLOPS }, () => `a ${round(SCALLOP / 2)} ${round(SCALLOP / 2)} 0 0 1 ${round(SCALLOP)} 0`),
  `L ${BACK.x1} ${SEAT.top} Z`,
].join(" ");
/** A scroll rolled outward at each top corner of the back. */
const scroll = (x: number, side: 1 | -1) => {
  const s = (n: number) => round(x + side * n);
  return `M ${x} ${BACK.top + 22} C ${s(-14)} ${BACK.top + 20} ${s(-17)} ${BACK.top} ${s(-7)} ${BACK.top - 5} C ${s(1)} ${BACK.top - 8} ${s(4)} ${BACK.top + 3} ${s(-3)} ${BACK.top + 5}`;
};
const PANELS = [
  { x0: 252, x1: 314, mine: false },
  { x0: 326, x1: 388, mine: true },
];
const HER = { x: 357, y: 494 };
const HIS = { x: 283, y: 460 };
/** An armrest at each end, lower than the back, its front rolled into a volute. */
const arm = (x: number, side: 1 | -1) => {
  const s = (n: number) => round(x + side * n);
  return `M ${x} ${SEAT.top} L ${x} ${SEAT.top - 20} C ${x} ${SEAT.top - 27} ${s(-10)} ${SEAT.top - 29} ${s(-16)} ${SEAT.top - 24} C ${s(-21)} ${SEAT.top - 19} ${s(-17)} ${SEAT.top - 12} ${s(-12)} ${SEAT.top - 14} L ${s(-12)} ${SEAT.top} Z`;
};
const FEET = [SEAT.x0 + 12, SEAT.x0 + 66, SEAT.x1 - 66, SEAT.x1 - 12];

/* ── The three cities ──────────────────────────────────────────────────── */

type City = { x: number; y: number; s: number; wall: string; dome: string; name: string };
const CITIES: City[] = [
  { x: 190, y: 514, s: 0.86, wall: "var(--art-turmeric)", dome: "var(--gold)", name: "gold" },
  { x: 450, y: 506, s: 0.86, wall: "var(--art-moon)", dome: "var(--art-moon)", name: "silver" },
  { x: CX, y: 664, s: 1.05, wall: "var(--art-hair)", dome: "var(--art-hair)", name: "iron" },
];
/** A walled town seen from the front, its gate toward us: a wall with merlons, and towers. */
const CITY_WALL = "M -34 0 L -34 -15 L 34 -15 L 34 0 Z";
const CITY_MERLONS = Array.from({ length: 12 }, (_, i) => `M ${-33 + i * 6} -15 l 0 -3.4 l 3.4 0 l 0 3.4`).join(" ");
const CITY_TOWERS = [
  { x: -22, w: 8, h: 22 },
  { x: -9, w: 9, h: 30 },
  { x: 8, w: 10, h: 36 },
  { x: 23, w: 8, h: 24 },
];
const tower = (t: (typeof CITY_TOWERS)[number]) =>
  `M ${t.x - t.w / 2} -15 L ${t.x - t.w / 2} ${-t.h + t.w * 0.4} Q ${t.x - t.w / 2} ${-t.h - t.w * 0.5} ${t.x} ${-t.h - t.w * 1.05} Q ${t.x + t.w / 2} ${-t.h - t.w * 0.5} ${t.x + t.w / 2} ${-t.h + t.w * 0.4} L ${t.x + t.w / 2} -15 Z`;
const CITY_GATE = "M -6 0 L -6 -7 A 6 6 0 0 1 6 -7 L 6 0 Z";
const TRIANGLE = `M ${CITIES[0].x} ${CITIES[0].y - 12} L ${CITIES[1].x} ${CITIES[1].y - 12} L ${CITIES[2].x} ${CITIES[2].y - 14} Z`;

/* ── The ground of ash ─────────────────────────────────────────────────── */

/** A broad field of ash under the ring, seen a little from above, drifted in long low ridges. */
const FIELD = { x: CX, y: 690, rx: 236, ry: 62 };
const DRIFTS = [
  { y: 652, half: 150, sag: 6 },
  { y: 670, half: 196, sag: 8 },
  { y: 692, half: 214, sag: 9 },
  { y: 716, half: 190, sag: 8 },
  { y: 738, half: 140, sag: 6 },
].map(({ y, half, sag }, i) => {
  const off = (i % 2 ? 1 : -1) * 18;
  return `M ${CX - half + off} ${y} C ${CX - half * 0.4 + off} ${y - sag} ${CX + half * 0.2 + off} ${y + sag} ${CX + half + off} ${y - 2}`;
});
/** Low heaps of what the worlds were, banked either side of the iron city. */
const HEAPS = [
  { x: 214, y: 676, w: 46, h: 12 },
  { x: 432, y: 680, w: 52, h: 13 },
  { x: 268, y: 712, w: 34, h: 8 },
  { x: 384, y: 718, w: 40, h: 9 },
  { x: 160, y: 704, w: 30, h: 7 },
  { x: 488, y: 708, w: 32, h: 7 },
];
const heap = (h: (typeof HEAPS)[number]) => `M ${h.x - h.w} ${h.y} C ${h.x - h.w * 0.5} ${h.y - h.h} ${h.x + h.w * 0.4} ${h.y - h.h * 1.1} ${h.x + h.w} ${h.y} Z`;
/** Embers still glowing in the ash, clear of the iron city's gate. */
const CINDERS = Array.from({ length: 30 }, (_, i) => {
  const t = hash(i, 7) * Math.PI * 2;
  const r = Math.sqrt(hash(i, 11));
  const x = round(FIELD.x + Math.cos(t) * r * (FIELD.rx - 30));
  const y = round(FIELD.y + Math.sin(t) * r * (FIELD.ry - 10));
  return { x, y, r: round(0.9 + hash(i, 13) * 1.3), hot: i % 3 === 0 };
}).filter((c) => Math.abs(c.x - CX) > 46 || c.y > 676);

export function WitnessOfTheDance({ idPrefix = "sa57", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <linearGradient id={id("flame")} x1={0} y1={1} x2={0} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)" }} />
        </linearGradient>
        <radialGradient id={id("inside")} cx={RING.x} cy={RING.y} r={RING.rx} gradientUnits="userSpaceOnUse">
          <stop offset="0.5" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
          <stop offset="0.9" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.24 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.34 }} />
        </radialGradient>
        <radialGradient id={id("burn")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.8 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("scorch")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0.3" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.8 }} />
        </linearGradient>
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={170} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu")} cx={HER.x} cy={HER.y} r={38} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("riser")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--gold)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-turmeric)" }} />
        </linearGradient>
        <radialGradient id={id("gate")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-core)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("shadow")}>
          <stop offset="0" style={{ stopColor: "var(--art-carve)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--art-carve)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("field")} cx={FIELD.x} cy={FIELD.y} r={FIELD.rx} gradientUnits="userSpaceOnUse" gradientTransform={`translate(0 ${FIELD.y}) scale(1 ${round(FIELD.ry / FIELD.rx)}) translate(0 ${-FIELD.y})`}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.2 }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("field-pale")} cx={FIELD.x} cy={FIELD.y} r={FIELD.rx} gradientUnits="userSpaceOnUse" gradientTransform={`translate(0 ${FIELD.y}) scale(1 ${round(FIELD.ry / FIELD.rx)}) translate(0 ${-FIELD.y})`}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.14 }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.08 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("firelight")} cx={CX} cy={FIELD.y - 40} r={FIELD.rx} gradientUnits="userSpaceOnUse" gradientTransform={`translate(0 ${FIELD.y - 40}) scale(1 0.3) translate(0 ${-(FIELD.y - 40)})`}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("cinder")}>
          <stop offset="0" style={{ stopColor: "var(--art-ember)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-ember)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The great dance: a ring of fire wheeling, and the drum that keeps its time */}
      <g {...part("dance")}>
        <ellipse {...ringEllipse(0)} fill={url("inside")} />
        <ellipse {...ringEllipse(BAND + 6)} stroke="var(--art-saffron)" strokeWidth={26} strokeOpacity={0.22} />
        {LICKS.map((l, i) => (
          <g key={i} transform={l.transform}>
            <path className={LICK[l.k]} d={l.d} fill={url("flame")} />
          </g>
        ))}
        {FIRE.map((f) => (
          <path key={f.fill} d={f.d} fill={f.fill} fillOpacity={f.o} />
        ))}
        <ellipse {...ringEllipse(BAND)} stroke="var(--gold)" strokeWidth={1.8} />
        <ellipse {...ringEllipse(BAND - 6)} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.8} />
        <g fill="var(--art-ember)">
          {SPARKS.map((e, i) => (
            <circle
              key={i}
              className="m-ember"
              cx={e.x}
              cy={e.y}
              r={e.r}
              style={{ "--dx": `${e.dx}px`, "--dur": `${e.dur}s`, "--delay": `${e.delay}s` } as CSSProperties}
            />
          ))}
        </g>
        <g transform={`translate(${DRUM.x} ${DRUM.y}) rotate(${DRUM.tilt}) translate(${-DRUM_T.drum.x} ${-DRUM_T.drum.y})`} strokeLinejoin="round">
          <Damaru t={DRUM_T} hung={false} />
        </g>
        <g transform={`translate(${DRUM.x} ${DRUM.y}) rotate(${DRUM.tilt})`} strokeLinecap="round">
          {BEAD_CORDS.map((c, i) => (
            <g key={i}>
              <path d={c.d} stroke="var(--art-vermilion)" strokeWidth={1.8} />
              <circle cx={c.bead.x} cy={c.bead.y} r={4.2} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
            </g>
          ))}
        </g>
        {SOUND.map((s, i) => (
          <path key={i} className={TWINKLE[s.k]} d={s.d} stroke="var(--gold)" strokeWidth={1.5} strokeOpacity={s.o} strokeDasharray="5 3" strokeLinecap="round" />
        ))}
      </g>

      {/* The worlds, and the emblems of the gods who ruled them, going into the fire; and what is left */}
      <g {...part("worlds")}>
        <ellipse cx={FIELD.x} cy={FIELD.y} rx={FIELD.rx} ry={FIELD.ry} fill={url("field")} />
        <ellipse cx={FIELD.x} cy={FIELD.y} rx={FIELD.rx} ry={FIELD.ry} fill={url("field-pale")} />
        <ellipse cx={CX} cy={FIELD.y - 40} rx={FIELD.rx} ry={round(FIELD.rx * 0.3)} fill={url("firelight")} />
        {DRIFTS.map((d, i) => (
          <path key={i} d={d} stroke="var(--art-musk)" strokeWidth={0.8} strokeOpacity={0.2} strokeLinecap="round" />
        ))}
        {HEAPS.map((h, i) => (
          <g key={i}>
            <path d={heap(h)} fill="var(--art-musk)" fillOpacity={0.2} />
            <path d={heap(h)} fill="var(--art-moon)" fillOpacity={0.14} />
          </g>
        ))}
        {CINDERS.map((c, i) => (
          <g key={i}>
            {c.hot && <circle cx={c.x} cy={c.y} r={c.r * 4} fill={url("cinder")} />}
            <circle cx={c.x} cy={c.y} r={c.r} fill={c.hot ? "var(--art-ember)" : "var(--art-musk)"} fillOpacity={c.hot ? 0.9 : 0.35} />
          </g>
        ))}
        {SWEPT_AT.map((t, i) => (
          <g key={i} transform={`translate(${t.at.x} ${t.at.y}) rotate(${t.rot}) scale(${t.s})`}>
            <circle r={21} fill={url("burn")} />
            {t.kind === "egg" && (
              <>
                <path d={eggPath(0, 0, 11, 15)} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.1} />
                <path d={eggPath(0, 0, 11, 15)} fill={url("scorch")} />
                <path d={CRACK} stroke="var(--art-crimson)" strokeWidth={1.2} strokeLinejoin="round" />
                <path d={tongue(14, 6, 2)} transform="translate(1 -4) rotate(-10)" fill="var(--art-saffron)" fillOpacity={0.9} />
              </>
            )}
            {t.kind === "lotus" && (
              <g transform="rotate(-30)">
                <OpenLotus fill="var(--art-vermilion)" pad={false} />
              </g>
            )}
            {t.kind === "discus" && <GanesaEmblem name="discus" />}
            {t.kind === "vajra" && (
              <g stroke="var(--gold)" strokeLinecap="round">
                <Vajra />
              </g>
            )}
          </g>
        ))}
      </g>

      {/* The beats that end the dance: nine and then five */}
      <g {...part("beats")}>
        {BEATS.map((b, i) => (
          <g key={i}>
            <circle cx={b.x} cy={b.y} r={b.r + 1.6} stroke="var(--gold)" strokeWidth={0.7} />
            <circle className={TWINKLE[b.k]} cx={b.x} cy={b.y} r={b.r} fill="var(--art-core)" />
          </g>
        ))}
      </g>

      {/* The three cities, gold, silver and iron, at the points of a triangle round her */}
      <g {...part("cities")}>
        <path d={TRIANGLE} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.55} strokeDasharray="1.5 4" strokeLinecap="round" />
        {CITIES.map((c) => (
          <g key={c.name} transform={`translate(${c.x} ${c.y}) scale(${c.s})`}>
            <ellipse cy={2} rx={42} ry={5} fill={url("shadow")} />
            {CITY_TOWERS.map((t, i) => (
              <path key={i} d={tower(t)} fill={c.dome} fillOpacity={c.name === "iron" ? 0.75 : 0.95} stroke="var(--gold)" strokeWidth={0.9} />
            ))}
            <path d={CITY_WALL} fill={c.wall} fillOpacity={c.name === "iron" ? 0.8 : 0.95} stroke="var(--gold)" strokeWidth={1} />
            <path d={CITY_MERLONS} fill={c.wall} stroke="var(--gold)" strokeWidth={0.7} />
            <path d={CITY_GATE} fill="var(--art-carve)" fillOpacity={0.6} stroke="var(--gold)" strokeWidth={0.8} />
            <circle cy={-4} r={11} fill={url("gate")} />
            <circle cy={-4} r={1.8} fill="var(--art-core)" />
          </g>
        ))}
      </g>

      {/* The throne they share: his seat empty under his crescent, hers lit */}
      <g {...part("throne")}>
        <ellipse cx={CX} cy={SEAT.foot + 4} rx={124} ry={7} fill={url("shadow")} />
        <path d={BACK_PATH} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.5} />
        {PANELS.map((p) => (
          <rect
            key={p.x0}
            x={p.x0}
            y={BACK.top + 8}
            width={p.x1 - p.x0}
            height={SEAT.top - BACK.top - 14}
            rx={4}
            fill={p.mine ? "var(--art-saffron)" : "var(--gold-soft)"}
            fillOpacity={p.mine ? 0.22 : 0.14}
            stroke="var(--gold)"
            strokeWidth={0.7}
          />
        ))}
        <path d={`${scroll(BACK.x0, -1)} ${scroll(BACK.x1, 1)}`} stroke="var(--gold)" strokeWidth={2.4} strokeLinecap="round" />
        <path d={`M ${CX} ${SEAT.top} L ${CX} ${BACK.top - 4}`} stroke={url("riser")} strokeWidth={6} />
        <path d={`M ${CX} ${BACK.top - 22} C ${CX + 6} ${BACK.top - 16} ${CX + 5} ${BACK.top - 9} ${CX} ${BACK.top - 6} C ${CX - 5} ${BACK.top - 9} ${CX - 6} ${BACK.top - 16} ${CX} ${BACK.top - 22} Z`} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
        <path d={`M ${HIS.x} ${BACK.top - 7} L ${HIS.x} ${HIS.y + 8}`} stroke="var(--gold)" strokeWidth={1.6} />
        <g transform={`translate(${HIS.x} ${HIS.y}) rotate(180)`}>
          <path d={litPart(4, 13)} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.1} />
        </g>
        <path d={`${arm(SEAT.x0 + 4, -1)} ${arm(SEAT.x1 - 4, 1)}`} fill={url("riser")} stroke="var(--gold)" strokeWidth={1} />
        {PANELS.map((p) => {
          const x = (p.x0 + p.x1) / 2;
          return (
            <g key={p.x0}>
              <path
                d={`M ${x - 31} ${SEAT.top} C ${x - 33} ${SEAT.top - 12} ${x + 33} ${SEAT.top - 12} ${x + 31} ${SEAT.top} Z`}
                fill="var(--art-vermilion)"
                fillOpacity={p.mine ? 0.92 : 0.62}
                stroke="var(--gold)"
                strokeWidth={0.8}
              />
              <path d={`M ${x - 24} ${SEAT.top - 4} C ${x - 10} ${SEAT.top - 8} ${x + 10} ${SEAT.top - 8} ${x + 24} ${SEAT.top - 4}`} stroke="var(--gold-soft)" strokeWidth={0.8} strokeDasharray="2 2" />
            </g>
          );
        })}
        <rect x={SEAT.x0} y={SEAT.top} width={SEAT.x1 - SEAT.x0} height={SEAT.slab} rx={2} fill={url("riser")} stroke="var(--gold)" strokeWidth={0.9} />
        <rect x={SEAT.x0 + 8} y={SEAT.top + SEAT.slab} width={SEAT.x1 - SEAT.x0 - 16} height={SEAT.foot - SEAT.top - SEAT.slab - 6} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.9} />
        <g fill="var(--art-vermilion)" fillOpacity={0.75}>
          {Array.from({ length: 9 }, (_, i) => SEAT.x0 + 26 + i * 16).map((x) => (
            <path key={x} d={`M ${x} ${SEAT.top + 14} l 4.5 4.5 l -4.5 4.5 l -4.5 -4.5 z`} />
          ))}
        </g>
        {FEET.map((x) => (
          <path key={x} d={`M ${x - 6} ${SEAT.foot} C ${x - 6} ${SEAT.foot - 8} ${x + 6} ${SEAT.foot - 8} ${x + 6} ${SEAT.foot} Z`} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
        ))}
      </g>

      {/* Her light on her seat, watching, and not moving */}
      <g {...part("light")}>
        <circle cx={HER.x} cy={HER.y} r={170} fill={url("glow")} />
        <circle cx={HER.x} cy={HER.y} r={38} fill={url("bindu")} />
        <circle cx={HER.x} cy={HER.y} r={6.4} fill="var(--art-core)" />
        <circle cx={HER.x} cy={HER.y} r={10.5} stroke="var(--gold)" strokeWidth={1} />
      </g>
    </svg>
  );
}
