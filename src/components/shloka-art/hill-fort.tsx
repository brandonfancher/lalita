/**
 * Shloka 50 — "The end of the negations, and Durgā".
 *
 * A hill fort (giri-durga), the stronghold the law books rank first. Its
 * walls stand whole on a sheer crag, and the way up is a path cut back and
 * forth across the cliff, narrowing as it climbs. The gate at the top stands
 * open, its spiked doors folded back and its bar laid down, and her light is
 * inside it. Over the gate hangs a garland of blue lotuses, and the flowers
 * of Indra's garden come down into it from a bough in the crown
 * (Saundaryalaharī 43). Lower down her spear has struck into a dark cleft in
 * the rock, the dark breaking away from it, and from the place it struck a
 * spring gushes out and falls to a pool. In the crown a balance hangs level
 * with both its pans empty; by the gate her lion has sat down. Which name
 * each part answers to is written up for readers in the registry, next to
 * this artwork's entry.
 */

import type { CSSProperties } from "react";

import { Balance, Lion, Spear, SpearDefs, artIds, balance, cubicAt, hash, partProps, polyline, radiance, round, taper, through } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const CX = 320;

/* ── Her light, inside the gate ───────────────────────────────────────── */

const HER = { x: CX, y: 462 };
/** Her rays rise from inside the fort, seen only above its walls. */
const RADIANCE = radiance({ cx: HER.x, cy: HER.y, from: 40, long: 230, short: 150 });

/* ── The crag ─────────────────────────────────────────────────────────── */

/** A sheer scarp of rock columns, as the Deccan's fort rocks are, standing on a talus slope. */
const SCARP_FOOT = 640;
const CRAG_TOP = through(
  [
    { x: 146, y: 498 },
    { x: 200, y: 495 },
    { x: 262, y: 497 },
    { x: 320, y: 495 },
    { x: 384, y: 497 },
    { x: 442, y: 494 },
    { x: 494, y: 498 },
  ],
  8,
);
const SCARP_LEFT = through(
  [
    { x: 146, y: 498 },
    { x: 143, y: 522 },
    { x: 148, y: 540 },
    { x: 136, y: 552 },
    { x: 134, y: 590 },
    { x: 140, y: 606 },
    { x: 128, y: 620 },
    { x: 124, y: SCARP_FOOT + 6 },
  ],
  6,
);
const SCARP_RIGHT = through(
  [
    { x: 494, y: 498 },
    { x: 498, y: 526 },
    { x: 510, y: 536 },
    { x: 512, y: 574 },
    { x: 504, y: 590 },
    { x: 514, y: 604 },
    { x: 516, y: SCARP_FOOT + 4 },
  ],
  6,
);
const TALUS_LEFT = through(
  [
    { x: 124, y: SCARP_FOOT + 6 },
    { x: 110, y: 680 },
    { x: 92, y: 722 },
    { x: 70, y: 772 },
    { x: 44, y: 830 },
  ],
  8,
);
const TALUS_RIGHT = through(
  [
    { x: 516, y: SCARP_FOOT + 4 },
    { x: 530, y: 680 },
    { x: 546, y: 722 },
    { x: 572, y: 774 },
    { x: 598, y: 830 },
  ],
  8,
);
const L = (pts: Pt[]) => polyline(pts).replace(/^M/, "L");
const CRAG = `${polyline(CRAG_TOP)} ${L(SCARP_RIGHT)} ${L(TALUS_RIGHT)} ${L([...TALUS_LEFT].reverse())} ${L([...SCARP_LEFT].reverse())} Z`;
const CRAG_EDGES = [polyline([...SCARP_LEFT, ...TALUS_LEFT]), polyline([...SCARP_RIGHT, ...TALUS_RIGHT])];
const SCARP = `${polyline(CRAG_TOP)} ${L(SCARP_RIGHT)} L 516 ${SCARP_FOOT + 14} L 124 ${SCARP_FOOT + 14} ${L([...SCARP_LEFT].reverse())} Z`;

/**
 * The scarp's cracks, jagged and of their own lengths, each with a facet of
 * shade along its right that narrows as it goes down: the rock breaks in blocks.
 */
const CRACKS_AT = [158, 182, 214, 236, 262, 300, 352, 376, 404, 470, 488];
const SCARP_CRACKS = CRACKS_AT.map((x0, k) => {
  const len = 60 + hash(k, 7) * 100;
  const pts = Array.from({ length: 7 }, (_, i) => ({
    x: round(x0 + (i ? (hash(k, i + 20) - 0.5) * 9 : 0) + i * 0.8),
    y: round(499 + (len * i) / 6),
  }));
  const w = 7 + hash(k, 5) * 10;
  const edge = pts.map((p, i) => ({ x: round(p.x + w * (1 - i / 6) ** 0.7), y: p.y }));
  return {
    crack: polyline(pts),
    facet: `${polyline(pts)} ${polyline([...edge].reverse()).replace(/^M/, "L")} Z`,
    o: round(0.07 + hash(k, 13) * 0.08),
  };
});
/** Two broken bedding lines across the face. */
const BEDS = [
  { y: 556, from: 140, to: 300 },
  { y: 548, from: 360, to: 508 },
  { y: 604, from: 130, to: 260 },
  { y: 612, from: 470, to: 514 },
].map(({ y, from, to }) =>
  polyline(Array.from({ length: 7 }, (_, k) => ({ x: round(from + ((to - from) * k) / 6), y: round(y + 2.4 * Math.sin(k * 1.7 + from)) }))),
);
/** The bands across the talus, and the stones lying on it. */
const STRATA = [
  { y: 676, from: 122, to: 520 },
  { y: 726, from: 96, to: 546 },
  { y: 778, from: 70, to: 572 },
].map(({ y, from, to }) =>
  polyline(Array.from({ length: 15 }, (_, k) => ({ x: round(from + ((to - from) * k) / 14), y: round(y + 3 * Math.sin(k * 1.3 + y) + (k % 3) * 0.8) }))),
);
const BOULDERS = [
  { x: 92, y: 798, rx: 14, ry: 7 },
  { x: 118, y: 808, rx: 9, ry: 5 },
  { x: 156, y: 664, rx: 9, ry: 4.6 },
  { x: 498, y: 700, rx: 10, ry: 5 },
  { x: 548, y: 800, rx: 12, ry: 6 },
  { x: 572, y: 810, rx: 16, ry: 7 },
  { x: 380, y: 760, rx: 11, ry: 5.4 },
  { x: 420, y: 806, rx: 8, ry: 4 },
];

/* ── The path up the cliff ────────────────────────────────────────────── */

/** Back and forth up the talus, broad and worn at the foot; few walk it to the end, and it narrows as it climbs. */
const TURNS: Pt[] = [
  { x: 122, y: 812 },
  { x: 318, y: 790 },
  { x: 176, y: 758 },
  { x: 336, y: 728 },
  { x: 196, y: 698 },
  { x: 300, y: 668 },
  { x: 226, y: 650 },
];
const LEGS = TURNS.slice(1).map((b, i) => {
  const a = TURNS[i];
  const w = round(6.4 - (i * 2.4) / (TURNS.length - 2));
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const steps = Math.floor(len / 7);
  const ticks = Array.from({ length: steps - 1 }, (_, k) => {
    const t = (k + 1) / steps;
    const x = round(a.x + (b.x - a.x) * t);
    const y = round(a.y + (b.y - a.y) * t);
    return `M ${x} ${round(y - w * 0.34)} L ${x} ${round(y + w * 0.34)}`;
  }).join(" ");
  return { d: `M ${a.x} ${a.y} L ${b.x} ${b.y}`, w, ticks };
});
/** Then a stair cut slantwise up the sheer face, to the ledge before the gate. */
const STAIR = { from: { x: 226, y: 650 }, to: { x: 290, y: 497 }, w: 7 };
const STAIR_EDGES = (() => {
  const { from: a, to: b, w } = STAIR;
  return `M ${a.x - w / 2} ${a.y} L ${b.x - w / 2} ${b.y} M ${a.x + w / 2} ${a.y} L ${b.x + w / 2} ${b.y}`;
})();
const STAIR_BAND = `M ${STAIR.from.x - STAIR.w / 2} ${STAIR.from.y} L ${STAIR.to.x - STAIR.w / 2} ${STAIR.to.y} L ${STAIR.to.x + STAIR.w / 2} ${STAIR.to.y} L ${STAIR.from.x + STAIR.w / 2} ${STAIR.from.y} Z`;
const STAIR_TREADS = Array.from({ length: 25 }, (_, k) => {
  const t = (k + 0.5) / 25;
  const x = round(STAIR.from.x + (STAIR.to.x - STAIR.from.x) * t);
  const y = round(STAIR.from.y + (STAIR.to.y - STAIR.from.y) * t);
  return `M ${round(x - STAIR.w / 2)} ${y} L ${round(x + STAIR.w / 2)} ${y}`;
}).join(" ");

/* ── The walls ────────────────────────────────────────────────────────── */

const WALL = { left: 176, right: 464, top: 436, base: 486 };
const BASTION_R = 28;
const BASTIONS = [WALL.left, WALL.right];
const TOWER = { half: 19, top: 402 };
const TOWERS = [CX - 43, CX + 43];
const GATEHOUSE = { left: CX - 24, right: CX + 24, top: 408 };

/** Bud-shaped merlons (kaṅgūra) along a top edge at `y`, with a slit in each. */
const merlon = (x: number, y: number, s = 1) =>
  `M ${round(x - 4 * s)} ${y} V ${round(y - 6 * s)} Q ${round(x - 4 * s)} ${round(y - 11 * s)} ${x} ${round(y - 13 * s)} Q ${round(x + 4 * s)} ${round(y - 11 * s)} ${round(x + 4 * s)} ${round(y - 6 * s)} V ${y} Z`;
const free = (x: number) =>
  BASTIONS.every((b) => Math.abs(x - b) > BASTION_R + 6) && TOWERS.every((t) => Math.abs(x - t) > TOWER.half + 6) && Math.abs(x - CX) > GATEHOUSE.right - CX + 6;
const CURTAIN_MERLONS = Array.from({ length: 25 }, (_, k) => WALL.left + 12 + k * 11.5).filter(free);
const BASTION_MERLONS = [-20, -10, 0, 10, 20];
const TOWER_MERLONS = [-12, 0, 12];

/** Ashlar courses, every joint broken by the course above: not one stone out. */
function courses(left: number, right: number, top: number, base: number, h = 8, w = 17) {
  let d = "";
  for (let y = top + h, row = 0; y < base; y += h, row++) d += `M ${left} ${y} L ${right} ${y} `;
  for (let y = top, row = 0; y < base; y += h, row++) {
    for (let x = left + (row % 2 ? w / 2 : w); x < right - 2; x += w) d += `M ${round(x)} ${y} L ${round(x)} ${Math.min(base, y + h)} `;
  }
  return d.trim();
}
const CURTAIN_COURSES = courses(WALL.left, WALL.right, WALL.top, WALL.base);
const bastionCourses = (x: number) =>
  Array.from({ length: 8 }, (_, k) => {
    const y = 422 + k * 8;
    const r = round(BASTION_R + (k * 2.4) / 8);
    return `M ${x - r} ${y} Q ${x} ${y + 6} ${x + r} ${y}`;
  }).join(" ");
const bastion = (x: number) =>
  `M ${x - BASTION_R} 414 L ${x - BASTION_R - 3} ${WALL.base} Q ${x} ${WALL.base + 8} ${x + BASTION_R + 3} ${WALL.base} L ${x + BASTION_R} 414 Q ${x} 419 ${x - BASTION_R} 414 Z`;
/** A domed kiosk (chatrī) on each bastion. */
const CHATRI_POSTS = [-12, -4, 4, 12];

/* ── The gate ─────────────────────────────────────────────────────────── */

const ARCH = { left: CX - 18, right: CX + 18, spring: 456, apex: 428 };
const OPENING = `M ${ARCH.left} ${WALL.base} V ${ARCH.spring} C ${ARCH.left} 442 ${CX - 8} 434 ${CX} ${ARCH.apex} C ${CX + 8} 434 ${ARCH.right} 442 ${ARCH.right} ${ARCH.spring} V ${WALL.base} Z`;
const ARCH_FRAME = `M ${ARCH.left - 5} ${WALL.base} V ${ARCH.spring} C ${ARCH.left - 5} 438 ${CX - 9} 428 ${CX} ${ARCH.apex - 7} C ${CX + 9} 428 ${ARCH.right + 5} 438 ${ARCH.right + 5} ${ARCH.spring} V ${WALL.base}`;
/** Each door leaf folded flat back against the wall beside the opening, so its arched head is turned outward. */
const leaf = (side: -1 | 1) => {
  const hinge = side < 0 ? ARCH.left : ARCH.right;
  const edge = hinge + side * 18;
  return `M ${hinge} ${WALL.base} V ${ARCH.spring} C ${hinge} 442 ${edge - side * 10} 434 ${edge} ${ARCH.apex} V ${WALL.base} Z`;
};
const LEAVES = [-1, 1].map((side) => {
  const hinge = side < 0 ? ARCH.left : ARCH.right;
  const x = (f: number) => round(hinge + side * 18 * f);
  return {
    leaf: leaf(side as -1 | 1),
    straps: [450, 464, 478].map((y) => `M ${x(0.06)} ${y} L ${x(0.94)} ${y}`).join(" "),
    /* The spikes set in a gate against elephants, never needed */
    spikes: [442, 457, 471].flatMap((y) => [0.32, 0.7].map((f) => ({ x: x(f), y }))),
  };
});
const THRESHOLD = [
  { x: CX - 22, y: WALL.base, w: 44, h: 4 },
  { x: CX - 27, y: WALL.base + 4, w: 54, h: 4 },
];

/* ── The garland over the gate, and the flowers of Indra's garden ─────── */

const HOOKS = [
  { x: TOWERS[0], y: TOWER.top + 2 },
  { x: TOWERS[1], y: TOWER.top + 2 },
];
const SAG = 20;
const swagAt = (t: number): Pt => ({
  x: round(HOOKS[0].x + (HOOKS[1].x - HOOKS[0].x) * t),
  y: round(HOOKS[0].y + 4 * SAG * t * (1 - t)),
});
const SWAG = polyline(Array.from({ length: 25 }, (_, k) => swagAt(k / 24)));
const GARLAND = Array.from({ length: 7 }, (_, k) => ({ ...swagAt((k + 0.5) / 7), blue: k % 2 === 0 }));
/** The garland's two ends, hanging down the towers with a bud at each. */
const ENDS = HOOKS.map((h, i) => {
  const s = i ? 1 : -1;
  return { d: `M ${h.x} ${h.y} Q ${h.x + s * 4} ${h.y + 18} ${h.x + s * 2} ${h.y + 34}`, bud: { x: h.x + s * 2, y: h.y + 38 } };
});

/** A blue lotus (nīlotpala) seen face on: eight narrow pointed petals over eight more, a gold heart. */
const uPetal = (l: number, w: number) => `M 0 0 C ${round(-w)} ${round(-l * 0.35)} ${round(-w * 0.7)} ${round(-l * 0.78)} 0 ${-l} C ${round(w * 0.7)} ${round(-l * 0.78)} ${round(w)} ${round(-l * 0.35)} 0 0 Z`;
const OUTER_PETAL = uPetal(8.4, 2.6);
const INNER_PETAL = uPetal(5.6, 2);
const PETAL_TURNS = Array.from({ length: 8 }, (_, k) => k * 45);

/** Night jasmine (pārijāta): six white petals turned like a pinwheel round its orange tube. */
const PARIJATA_PETAL = "M 0 0 C 1.6 -1.6 4.2 -2.6 6.6 -2 C 7.4 -0.6 6.6 1 5 1.2 C 3.4 1.4 1.6 1 0 0 Z";
const PARIJATA_TURNS = Array.from({ length: 6 }, (_, k) => k * 60);

/** A bough of Indra's garden reaching in at the top left, above the title. */
const BOUGH = through(
  [
    { x: -12, y: 16 },
    { x: 60, y: 24 },
    { x: 130, y: 24 },
    { x: 196, y: 30 },
    { x: 254, y: 36 },
    { x: 300, y: 38 },
  ],
  10,
);
const BOUGH_PATH = polyline(BOUGH);
const TWIGS = [
  { from: 0.26, to: { x: 84, y: 52 } },
  { from: 0.42, to: { x: 128, y: 6 } },
  { from: 0.58, to: { x: 178, y: 58 } },
  { from: 0.74, to: { x: 226, y: 12 } },
  { from: 0.9, to: { x: 270, y: 60 } },
].map(({ from, to }) => {
  const a = BOUGH[Math.round(from * (BOUGH.length - 1))];
  return { d: `M ${a.x} ${a.y} Q ${round((a.x + to.x) / 2 + 4)} ${round((a.y + to.y) / 2)} ${to.x} ${to.y}`, tip: to };
});
const BOUGH_LEAVES = [
  { at: 0.12, side: 1 },
  { at: 0.2, side: -1 },
  { at: 0.34, side: 1 },
  { at: 0.5, side: -1 },
  { at: 0.66, side: 1 },
  { at: 0.82, side: -1 },
  { at: 0.97, side: -1 },
].map(({ at, side }) => {
  const i = Math.round(at * (BOUGH.length - 1));
  const p = BOUGH[i];
  const q = BOUGH[Math.min(BOUGH.length - 1, i + 1)];
  const deg = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
  return { ...p, rot: round(deg + side * 58) };
});
const BOUGH_LEAF = "M 0 0 C 4 -5 12 -6 20 -3 C 24 -1.5 26 0 28 0 C 26 0.4 24 1.6 20 3 C 12 6 4 5 0 0 Z";
const BOUGH_FLOWERS = TWIGS.flatMap((t, i) =>
  [0, 1, 2].map((k) => ({ x: round(t.tip.x + (k - 1) * 7 + (i % 2) * 2), y: round(t.tip.y + (k === 1 ? -5 : 2)), rot: (i * 37 + k * 23) % 60 })),
);
/** The flowers coming down from it, across the sky and behind the card, into the garland; clear of the title. */
const FALLING = [
  { x: 312, y: 60 },
  { x: 336, y: 78 },
  { x: 314, y: 104 },
  { x: 342, y: 122 },
  { x: 322, y: 150 },
  { x: 348, y: 172 },
  { x: 304, y: 202 },
  { x: 338, y: 240 },
  { x: 310, y: 286 },
  { x: 334, y: 334 },
  { x: 316, y: 372 },
].map((p, k) => ({ ...p, rot: (k * 41) % 60, s: round(0.85 + 0.3 * hash(k, 2)) }));

/* ── Sorrow struck down, and the spring ───────────────────────────────── */

const CLEFT = "M 428 540 L 440 558 L 436 572 L 454 590 L 446 604 L 462 630 L 446 624 L 436 640 L 430 618 L 416 604 L 424 588 L 410 572 L 422 560 Z";
const CRACKS = "M 454 590 L 470 584 L 480 590 M 462 630 L 474 640 M 410 572 L 396 566 L 388 572 M 416 604 L 402 612 L 398 624 M 428 540 L 424 524 L 430 512";
/** Her spear, flung from her light, its blade in the cleft and its shaft fading back toward her. */
const SPEAR_TIP = { x: 440, y: 606 };
const SPEAR_DIR = (() => {
  const dx = SPEAR_TIP.x - HER.x;
  const dy = SPEAR_TIP.y - HER.y;
  const len = Math.hypot(dx, dy);
  return { x: dx / len, y: dy / len };
})();
const SPEAR_SCALE = 2.2;
const SPEAR_AT = {
  x: round(SPEAR_TIP.x - 27 * SPEAR_SCALE * SPEAR_DIR.x),
  y: round(SPEAR_TIP.y - 27 * SPEAR_SCALE * SPEAR_DIR.y),
  rot: round((Math.atan2(SPEAR_DIR.x, -SPEAR_DIR.y) * 180) / Math.PI),
};
/** The dark it breaks off, falling away. */
const SHARDS = [
  { x: 462, y: 572, s: 7, rot: 20, dur: 9, delay: 0 },
  { x: 474, y: 600, s: 5, rot: 70, dur: 11, delay: 4 },
  { x: 404, y: 584, s: 6, rot: -30, dur: 10, delay: 2 },
  { x: 396, y: 618, s: 4.5, rot: 110, dur: 12, delay: 7 },
  { x: 480, y: 636, s: 4, rot: -60, dur: 8, delay: 5 },
  { x: 414, y: 648, s: 5.5, rot: 40, dur: 13, delay: 9 },
  { x: 488, y: 676, s: 3.6, rot: 150, dur: 10, delay: 1 },
  { x: 402, y: 690, s: 3.2, rot: 80, dur: 14, delay: 6 },
];
const SHARD = (s: number) => `M 0 ${-s} L ${round(s * 0.7)} ${round(s * 0.4)} L ${round(-s * 0.5)} ${round(s * 0.7)} Z`;

const POOL = { x: 462, y: 664, rx: 46, ry: 9 };
/** The pool lies in a hollow of the rock, its rim uneven. */
const POOL_RIM = through(
  Array.from({ length: 13 }, (_, k) => {
    const t = (k / 12) * 2 * Math.PI;
    const j = k === 12 ? 1 : 1 + (hash(k, 17) - 0.5) * 0.16;
    return { x: round(POOL.x + POOL.rx * j * Math.cos(t)), y: round(POOL.y + POOL.ry * j * Math.sin(t)) };
  }),
  6,
);
const POOL_PATH = `${polyline(POOL_RIM)} Z`;
const RIM_STONES = [
  { x: 420, y: 664, rx: 7, ry: 4 },
  { x: 430, y: 673, rx: 9, ry: 4.4 },
  { x: 500, y: 668, rx: 8, ry: 4 },
  { x: 486, y: 675, rx: 6, ry: 3.4 },
  { x: 452, y: 676, rx: 7, ry: 3 },
];
/** The spring: three jets bursting from the struck place, widening as they fall into the pool. */
const JETS = [
  { c: [{ x: 444, y: 616 }, { x: 464, y: 612 }, { x: 480, y: 630 }, { x: 482, y: 660 }], w0: 3.6, w1: 8 },
  { c: [{ x: 445, y: 620 }, { x: 458, y: 620 }, { x: 466, y: 636 }, { x: 466, y: 660 }], w0: 3, w1: 6.4 },
  { c: [{ x: 446, y: 612 }, { x: 470, y: 600 }, { x: 494, y: 620 }, { x: 498, y: 656 }], w0: 1.8, w1: 4 },
].map(({ c, w0, w1 }) => {
  const pts = Array.from({ length: 17 }, (_, k) => cubicAt(c[0], c[1], c[2], c[3], k / 16));
  return { body: taper(pts, (t) => w0 + (w1 - w0) * t), line: polyline(pts.map((p) => ({ x: round(p.x), y: round(p.y) }))) };
});
const RIPPLES = [10, 18, 28].map((r, k) => ({ rx: r, ry: round(r * 0.2), o: round(0.8 - k * 0.22) }));
const SPRAY = [
  { x: 456, y: 652, r: 1.4 },
  { x: 488, y: 650, r: 1.6 },
  { x: 474, y: 646, r: 1 },
  { x: 504, y: 646, r: 1.1 },
  { x: 460, y: 642, r: 1.1 },
];
const POOL_LINES = [-4, 0, 4].map((dy, k) => {
  const half = POOL.rx * Math.sqrt(1 - (dy / POOL.ry) ** 2) - 8;
  return `M ${round(POOL.x - half)} ${POOL.y + dy} L ${round(POOL.x - 4 - k * 3)} ${POOL.y + dy}`;
});
/** It brims over and runs on down the slope. */
const RUNOFF = "M 494 670 C 504 690 494 712 506 736 C 514 752 512 770 522 790 L 513 792 C 503 772 503 754 497 738 C 485 714 496 692 486 672 Z";

/* ── The balance with nothing to weigh ────────────────────────────────── */

const SCALES = balance(0, 84);
const SCALES_AT = { x: 440, s: 0.4 };

/* ── Her lion, sat down by the gate ───────────────────────────────────── */

const LION = { x: 424, y: WALL.base, s: 0.36 };

const SWAY = ["m-sway", "m-sway m-late", "m-sway m-later"];
const SHIMMER = ["m-shimmer", "m-shimmer m-late", "m-shimmer m-later"];

type Stone = { x: number; y: number; rx: number; ry: number };

/** Loose stones, lit on top, so they never read as holes by lamplight. */
function Stones({ stones }: { stones: Stone[] }) {
  return (
    <>
      {stones.map((b, i) => (
        <g key={i}>
          <ellipse cx={b.x} cy={b.y} rx={b.rx} ry={b.ry} fill="var(--art-stone)" />
          <ellipse cx={b.x} cy={b.y} rx={b.rx} ry={b.ry} fill="var(--art-saffron)" fillOpacity={0.22} stroke="var(--gold)" strokeWidth={0.8} />
          <path
            d={`M ${round(b.x - b.rx * 0.6)} ${round(b.y - b.ry * 0.3)} Q ${b.x} ${round(b.y - b.ry * 0.95)} ${round(b.x + b.rx * 0.6)} ${round(b.y - b.ry * 0.3)}`}
            stroke="var(--gold-soft)"
            strokeWidth={0.8}
          />
        </g>
      ))}
    </>
  );
}

export function HillFort({ idPrefix = "sa50", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  const nilotpala = (x: number, y: number, s: number, k: number) => (
    <g key={`n${k}`} transform={`translate(${x} ${y}) scale(${s}) rotate(${(k * 13) % 45})`}>
      {PETAL_TURNS.map((deg) => (
        <path key={deg} d={OUTER_PETAL} transform={`rotate(${deg})`} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.6} />
      ))}
      {PETAL_TURNS.map((deg) => (
        <path key={deg} d={INNER_PETAL} transform={`rotate(${deg + 22.5})`} fill="var(--art-hair)" stroke="var(--gold-soft)" strokeWidth={0.5} />
      ))}
      <circle r={1.9} fill="var(--gold)" />
    </g>
  );
  const parijata = (x: number, y: number, s: number, rot: number, key: string, className?: string) => (
    <g key={key} transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
      <g className={className}>
        {PARIJATA_TURNS.map((deg) => (
          <path key={deg} d={PARIJATA_PETAL} transform={`rotate(${deg})`} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.45} />
        ))}
        <circle r={1.7} fill="var(--art-saffron)" stroke="var(--art-vermilion)" strokeWidth={0.6} />
      </g>
    </g>
  );

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <SpearDefs id={id} />
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={210} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("doorway")} cx={HER.x} cy={HER.y} r={40} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-core)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={HER.x} cy={HER.y} r={230} gradientUnits="userSpaceOnUse">
          <stop offset="0.15" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "var(--gold)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("threshold")} cx={CX} cy={WALL.base + 6} r={1} gradientUnits="userSpaceOnUse" gradientTransform={`translate(${CX} ${WALL.base + 6}) scale(76 22) translate(${-CX} ${-WALL.base - 6})`}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <mask id={id("above-walls")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height={WALL.top - 2} fill="#fff" />
          <g fill="#000">
            <rect x={GATEHOUSE.left - 1} y={GATEHOUSE.top - 4} width={GATEHOUSE.right - GATEHOUSE.left + 2} height={60} />
            {TOWERS.map((x) => (
              <rect key={x} x={x - TOWER.half - 2} y={TOWER.top - 16} width={2 * TOWER.half + 4} height={60} />
            ))}
            {BASTIONS.map((x) => (
              <rect key={x} x={x - BASTION_R - 3} y={344} width={2 * BASTION_R + 6} height={100} />
            ))}
          </g>
        </mask>
        <clipPath id={id("opening")}>
          <path d={OPENING} />
        </clipPath>
        <linearGradient id={id("rock")} x1={0} y1={494} x2={0} y2={830} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-stone)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-stone)", stopOpacity: 0.7 }} />
        </linearGradient>
        <linearGradient id={id("rock-tint")} x1={0} y1={494} x2={0} y2={830} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.06 }} />
        </linearGradient>
        <linearGradient id={id("rock-shade")} x1={330} y1={0} x2={600} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.16 }} />
        </linearGradient>
        <clipPath id={id("crag")}>
          <path d={CRAG} />
        </clipPath>
        <clipPath id={id("scarp")}>
          <path d={SCARP} />
        </clipPath>
        <linearGradient id={id("masonry")} x1={0} y1={360} x2={0} y2={WALL.base} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-turmeric)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.22 }} />
        </linearGradient>
        <linearGradient id={id("round")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.2 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.26 }} />
        </linearGradient>
        <linearGradient id={id("fall")} x1={0} y1={604} x2={0} y2={662} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.8 }} />
        </linearGradient>
        <radialGradient id={id("pool")} cx={POOL.x} cy={POOL.y} r={POOL.rx * 1.08} gradientUnits="userSpaceOnUse" gradientTransform={`translate(${POOL.x} ${POOL.y}) scale(1 ${POOL.ry / POOL.rx}) translate(${-POOL.x} ${-POOL.y})`}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)" }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.8 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.35 }} />
        </radialGradient>
        <radialGradient id={id("cleft")} cx={436} cy={594} r={50} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.95 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.7 }} />
        </radialGradient>
        <radialGradient id={id("struck")} cx={SPEAR_TIP.x} cy={SPEAR_TIP.y} r={34} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The balance, level, with both its pans empty */}
      <g {...part("scales")}>
        <g transform={`translate(${round(SCALES_AT.x - 320 * SCALES_AT.s)} 0) scale(${SCALES_AT.s})`}>
          <Balance b={SCALES} />
        </g>
      </g>

      {/* The crag the fort stands on: a sheer scarp of columns over a talus slope */}
      <g {...part("crag")}>
        <path d={CRAG} fill={url("rock")} />
        <path d={CRAG} fill={url("rock-tint")} />
        <g clipPath={url("crag")}>
          <path d={CRAG} fill={url("rock-shade")} />
          <g clipPath={url("scarp")}>
            {SCARP_CRACKS.map((c, i) => (
              <path key={i} d={c.facet} fill="var(--art-hair)" fillOpacity={c.o} />
            ))}
            <g stroke="var(--art-hair)" strokeWidth={0.9} strokeOpacity={0.32} strokeLinejoin="round" strokeLinecap="round">
              {SCARP_CRACKS.map((c, i) => (
                <path key={i} d={c.crack} />
              ))}
            </g>
            <g stroke="var(--gold-soft)" strokeWidth={0.8} strokeOpacity={0.75} strokeLinecap="round">
              {BEDS.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
            <path d={`M 124 ${SCARP_FOOT + 4} L 516 ${SCARP_FOOT + 4}`} stroke="var(--art-hair)" strokeWidth={10} strokeOpacity={0.06} />
          </g>
          {STRATA.map((d, i) => (
            <g key={i}>
              <path d={d} transform="translate(0 2.4)" stroke="var(--art-hair)" strokeWidth={1.2} strokeOpacity={0.12} />
              <path d={d} stroke="var(--gold-soft)" strokeWidth={0.9} strokeOpacity={0.7} />
            </g>
          ))}
        </g>
        {CRAG_EDGES.map((d, i) => (
          <path key={i} d={d} stroke="var(--gold)" strokeWidth={1.6} strokeLinejoin="round" />
        ))}
        <path d={polyline(CRAG_TOP)} stroke="var(--gold)" strokeWidth={1.2} />
        <Stones stones={BOULDERS} />
      </g>

      {/* The way up: back and forth over the slope, then a stair cut up the face */}
      <g {...part("path")}>
        {LEGS.map((l, i) => (
          <path key={`s${i}`} d={l.d} transform="translate(0 2.4)" stroke="var(--art-hair)" strokeWidth={l.w + 1} strokeOpacity={0.18} strokeLinecap="round" />
        ))}
        {LEGS.map((l, i) => (
          <path key={`g${i}`} d={l.d} stroke="var(--gold)" strokeWidth={l.w + 1.6} strokeLinecap="round" />
        ))}
        {LEGS.map((l, i) => (
          <path key={`c${i}`} d={l.d} stroke="var(--art-carve)" strokeWidth={l.w} strokeLinecap="round" />
        ))}
        {LEGS.map((l, i) => (
          <path key={`t${i}`} d={l.ticks} stroke="var(--gold-soft)" strokeWidth={0.6} />
        ))}
        <path d={STAIR_BAND} transform="translate(3 0)" fill="var(--art-hair)" fillOpacity={0.2} />
        <path d={STAIR_BAND} fill="var(--art-carve)" />
        <path d={STAIR_TREADS} stroke="var(--gold-soft)" strokeWidth={0.8} />
        <path d={STAIR_EDGES} stroke="var(--gold)" strokeWidth={0.9} />
      </g>

      {/* The walls, whole: every course laid and every merlon standing */}
      <g {...part("walls")}>
        <rect x={WALL.left} y={WALL.top} width={WALL.right - WALL.left} height={WALL.base - WALL.top} fill="var(--art-stone)" />
        <rect x={WALL.left} y={WALL.top} width={WALL.right - WALL.left} height={WALL.base - WALL.top} fill={url("masonry")} />
        <path d={CURTAIN_COURSES} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.75} />
        <rect x={WALL.left} y={WALL.top} width={WALL.right - WALL.left} height={WALL.base - WALL.top} stroke="var(--gold)" strokeWidth={1.2} />
        <rect x={WALL.left} y={WALL.top - 3} width={WALL.right - WALL.left} height={4} rx={1} fill="var(--gold)" />
        <g fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.9}>
          {CURTAIN_MERLONS.map((x) => (
            <path key={x} d={merlon(round(x), WALL.top - 3)} />
          ))}
        </g>
        <g fill="var(--art-hair)" fillOpacity={0.55}>
          {CURTAIN_MERLONS.map((x) => (
            <rect key={x} x={round(x - 0.8)} y={WALL.top - 12} width={1.6} height={5} rx={0.8} />
          ))}
        </g>

        {BASTIONS.map((x) => (
          <g key={x}>
            <path d={bastion(x)} fill="var(--art-stone)" />
            <path d={bastion(x)} fill={url("masonry")} />
            <path d={bastion(x)} fill={url("round")} />
            <path d={bastionCourses(x)} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.75} />
            <path d={bastion(x)} stroke="var(--gold)" strokeWidth={1.2} strokeLinejoin="round" />
            <ellipse cx={x} cy={413} rx={BASTION_R + 1} ry={3} fill="var(--gold)" />
            <g fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.9}>
              {BASTION_MERLONS.map((dx) => (
                <path key={dx} d={merlon(x + dx, 412)} />
              ))}
            </g>
            <g stroke="var(--gold)" strokeWidth={1.4}>
              {CHATRI_POSTS.map((dx) => (
                <line key={dx} x1={x + dx} y1={383} x2={x + dx} y2={399} />
              ))}
            </g>
            <rect x={x - 17} y={399} width={34} height={3.4} rx={1} fill="var(--gold)" />
            <rect x={x - 19} y={379} width={38} height={4} rx={1.4} fill="var(--gold)" />
            <path d={`M ${x - 15} 379 C ${x - 15} 366 ${x - 7} 360 ${x} 359 C ${x + 7} 360 ${x + 15} 366 ${x + 15} 379 Z`} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1} />
            <path d={`M ${x - 15} 379 C ${x - 15} 366 ${x - 7} 360 ${x} 359 C ${x + 7} 360 ${x + 15} 366 ${x + 15} 379 Z`} fill={url("masonry")} />
            <path d={`M ${x - 2} 359 Q ${x} 350 ${x + 2} 359 Z M ${x} 351 L ${x} 346`} fill="var(--gold)" stroke="var(--gold)" strokeWidth={1} />
          </g>
        ))}

        {TOWERS.map((x) => (
          <g key={x}>
            <rect x={x - TOWER.half} y={TOWER.top} width={2 * TOWER.half} height={WALL.base - TOWER.top} fill="var(--art-stone)" />
            <rect x={x - TOWER.half} y={TOWER.top} width={2 * TOWER.half} height={WALL.base - TOWER.top} fill={url("masonry")} />
            <path d={courses(x - TOWER.half, x + TOWER.half, TOWER.top, WALL.base, 8, 13)} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.75} />
            <rect x={x - TOWER.half} y={TOWER.top} width={2 * TOWER.half} height={WALL.base - TOWER.top} stroke="var(--gold)" strokeWidth={1.2} />
            <rect x={x - TOWER.half - 2} y={TOWER.top - 3} width={2 * TOWER.half + 4} height={4} rx={1} fill="var(--gold)" />
            <g fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.9}>
              {TOWER_MERLONS.map((dx) => (
                <path key={dx} d={merlon(x + dx, TOWER.top - 3)} />
              ))}
            </g>
          </g>
        ))}

        <path
          d={`M ${GATEHOUSE.left} ${GATEHOUSE.top} H ${GATEHOUSE.right} V ${WALL.base} H ${GATEHOUSE.left} Z ${OPENING}`}
          fillRule="evenodd"
          fill="var(--art-stone)"
        />
        <path d={`M ${GATEHOUSE.left} ${GATEHOUSE.top} H ${GATEHOUSE.right} V ${WALL.base} H ${GATEHOUSE.left} Z ${OPENING}`} fillRule="evenodd" fill={url("masonry")} />
        <path d={`M ${GATEHOUSE.left} ${GATEHOUSE.top} H ${GATEHOUSE.right} V ${WALL.base} H ${GATEHOUSE.left} Z`} stroke="var(--gold)" strokeWidth={1.2} />
        <rect x={GATEHOUSE.left - 1} y={GATEHOUSE.top - 3} width={GATEHOUSE.right - GATEHOUSE.left + 2} height={4} rx={1} fill="var(--gold)" />
        <path d={ARCH_FRAME} stroke="var(--gold)" strokeWidth={2} />
        <g fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.5}>
          <circle cx={CX - 15} cy={420} r={2.2} />
          <circle cx={CX + 15} cy={420} r={2.2} />
          <circle cx={CX} cy={414} r={2.6} />
        </g>
      </g>

      {/* Her light, inside the open gate, spilling out over the threshold */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={210} fill={url("glow")} />
        <path d={OPENING} fill={url("doorway")} />
        <g clipPath={url("opening")}>
          <circle className="m-breathe" cx={HER.x} cy={HER.y} r={30} fill={url("bindu-glow")} />
        </g>
        <circle cx={HER.x} cy={HER.y} r={11} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.85} />
        <circle cx={HER.x} cy={HER.y} r={5} fill="var(--art-core)" />
        <path className="m-shimmer" d={RADIANCE} mask={url("above-walls")} stroke={url("radiance")} strokeWidth={0.7} />
        <ellipse className="m-shimmer" cx={CX} cy={WALL.base + 6} rx={76} ry={22} fill={url("threshold")} />
      </g>

      {/* The gate, open: its spiked doors folded back, its bar laid down */}
      <g {...part("gate")}>
        {LEAVES.map((l, i) => (
          <g key={i}>
            <path d={l.leaf} fill="var(--art-crimson)" stroke="var(--gold)" strokeWidth={1.1} strokeLinejoin="round" />
            <path d={l.straps} stroke="var(--gold)" strokeWidth={1.2} />
            <g fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth={0.4}>
              {l.spikes.map((p, k) => (
                <path key={k} d={`M ${p.x - 2} ${p.y + 1.6} L ${p.x} ${p.y - 3} L ${p.x + 2} ${p.y + 1.6} Z`} />
              ))}
            </g>
          </g>
        ))}
        <g fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.9}>
          {THRESHOLD.map((s, i) => (
            <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} />
          ))}
        </g>
        <rect x={250} y={487} width={42} height={4.4} rx={1.6} fill="var(--art-crimson)" stroke="var(--gold)" strokeWidth={0.8} />
        <rect x={248} y={486.4} width={4} height={5.6} rx={1} fill="var(--gold)" />
        <rect x={290} y={486.4} width={4} height={5.6} rx={1} fill="var(--gold)" />
      </g>

      {/* A garland of blue lotuses over the gate, and the flowers of Indra's garden coming down into it */}
      <g {...part("garland")}>
        <path d={BOUGH_PATH} stroke="var(--art-hair)" strokeOpacity={0.6} strokeWidth={3.2} strokeLinecap="round" />
        <path d={BOUGH_PATH} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.8} />
        {TWIGS.map((t, i) => (
          <path key={i} d={t.d} stroke="var(--art-hair)" strokeOpacity={0.6} strokeWidth={1.4} strokeLinecap="round" />
        ))}
        {BOUGH_LEAVES.map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}>
            <path d={BOUGH_LEAF} fill="var(--leaf)" fillOpacity={0.85} stroke="var(--gold)" strokeWidth={0.5} />
            <path d="M 1 0 L 25 0" stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.8} />
          </g>
        ))}
        {BOUGH_FLOWERS.map((f, i) => parijata(f.x, f.y, 1, f.rot, `b${i}`))}
        {FALLING.map((f, i) => parijata(f.x, f.y, f.s, f.rot, `f${i}`, SWAY[i % 3]))}

        <path d={SWAG} stroke="var(--gold)" strokeWidth={1.2} />
        {ENDS.map((e, i) => (
          <g key={i}>
            <path d={e.d} stroke="var(--gold)" strokeWidth={1} />
            {nilotpala(e.bud.x, e.bud.y, 0.9, i + 20)}
          </g>
        ))}
        {GARLAND.map((g, k) => (g.blue ? nilotpala(g.x, g.y, 1.3, k) : parijata(g.x, g.y, 1, (k * 29) % 60, `g${k}`)))}
      </g>

      {/* Her spear struck into the dark cleft, and the dark breaking away */}
      <g {...part("spear")}>
        <path d={CLEFT} fill={url("cleft")} stroke="var(--gold-soft)" strokeWidth={0.6} strokeLinejoin="round" />
        <path d={CRACKS} stroke="var(--art-hair)" strokeWidth={1} strokeOpacity={0.6} strokeLinecap="round" strokeLinejoin="round" />
        <circle className="m-shimmer" cx={SPEAR_TIP.x} cy={SPEAR_TIP.y} r={34} fill={url("struck")} />
        <g transform={`translate(${SPEAR_AT.x} ${SPEAR_AT.y}) rotate(${SPEAR_AT.rot}) scale(${SPEAR_SCALE})`}>
          <Spear k={0} shaft={url("shaft")} />
        </g>
        {SHARDS.map((s, i) => (
          <g key={i} transform={`translate(${s.x} ${s.y})`}>
            <path
              className="m-sink"
              d={SHARD(s.s)}
              transform={`rotate(${s.rot})`}
              fill="var(--art-hair)"
              fillOpacity={0.85}
              stroke="var(--gold-soft)"
              strokeWidth={0.6}
              strokeLinejoin="round"
              style={{ "--dur": `${s.dur}s`, "--delay": `${-s.delay}s` } as CSSProperties}
            />
          </g>
        ))}
      </g>

      {/* The spring that gushes from the struck place, and the pool it fills */}
      <g {...part("spring")}>
        <path d={RUNOFF} fill="var(--art-moon)" fillOpacity={0.6} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.8} />
        <path d={POOL_PATH} fill={url("pool")} />
        <path d={POOL_LINES.join(" ")} stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.8} />
        {RIPPLES.map((r, i) => (
          <g key={i}>
            <ellipse cx={481} cy={POOL.y - 2} rx={r.rx} ry={r.ry} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={r.o} />
            <ellipse cx={467} cy={POOL.y - 1} rx={r.rx * 0.6} ry={r.ry * 0.6} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={r.o * 0.8} />
          </g>
        ))}
        <path d={POOL_PATH} stroke="var(--gold)" strokeWidth={1.1} strokeLinejoin="round" />
        <Stones stones={RIM_STONES} />
        {JETS.map((j, i) => (
          <g key={i}>
            <path d={j.body} fill={url("fall")} stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
            <path className={SHIMMER[i]} d={j.line} stroke="var(--art-ivory)" strokeWidth={0.9} strokeLinecap="round" />
          </g>
        ))}
        <g fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.4}>
          {SPRAY.map((p, i) => (
            <circle key={i} className={SHIMMER[i % 3]} cx={p.x} cy={p.y} r={p.r} />
          ))}
        </g>
      </g>

      {/* Her lion, sat down beside the gate */}
      <g {...part("lion")}>
        <g transform={`translate(${LION.x} ${round(LION.y - 92 * LION.s)}) scale(${-LION.s} ${LION.s})`} style={{ color: "var(--gold)" }} fill="currentColor">
          <Lion />
        </g>
      </g>
    </svg>
  );
}
