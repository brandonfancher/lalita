/**
 * Shloka 47 — "Without I, without mine".
 *
 * Two solitary names, then three pairs, each said once of her and once of
 * what she does to whoever comes near, drawn as the Muṇḍaka Upaniṣad's two
 * birds on one tree (3.1.1–3): one eats the fruit, sunk, grieving and
 * deluded; the other looks on and does not eat, and when the first sees it,
 * its grief goes and it shakes off good and evil. A great pippala fills the
 * plate, rising from the kerb of a temple tank, its crown spreading behind
 * the card and over it. On a bough just below the card, where the second bird
 * should sit, there is only her light; the leaves round her hang still while
 * the rest of the tree trembles, and the figs by her are untouched. Mist lies
 * over the lower tree and never reaches her. Lower down, in it, the other
 * bird has turned its head up to her through a lane the mist has cleared,
 * the fig it held is falling, and it shakes dark motes from its wings. In the
 * tank a white lotus stands clear of the water. Which name each part answers
 * to is written up for readers in the registry, next to this artwork's entry.
 */

import type { CSSProperties } from "react";
import { LotusLeaf, OpenLotus, along, artIds, partProps, radiance, round, taper, through } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const SWAY = ["m-sway", "m-sway m-late", "m-sway m-later"];

/* ── The tree ──────────────────────────────────────────────────────────── */

const TRUNK = through(
  [
    { x: 224, y: 642 },
    { x: 234, y: 592 },
    { x: 246, y: 552 },
    { x: 258, y: 512 },
    { x: 268, y: 474 },
    { x: 278, y: 424 },
    { x: 290, y: 356 },
    { x: 302, y: 280 },
    { x: 312, y: 210 },
    { x: 318, y: 160 },
  ],
  10,
);

type Bough = { pts: Pt[]; w0: number; w1: number };
const bough = (pts: Pt[], w0: number, w1: number): Bough => ({ pts: through(pts, 10), w0, w1 });

/** The bough she rests on. */
const HER_BOUGH = bough(
  [
    { x: 266, y: 484 },
    { x: 300, y: 468 },
    { x: 336, y: 458 },
    { x: 372, y: 454 },
    { x: 406, y: 446 },
    { x: 438, y: 430 },
  ],
  10,
  1.6,
);
/** The low bough the other bird sits on, in the mist. */
const BIRD_BOUGH = bough(
  [
    { x: 238, y: 582 },
    { x: 290, y: 586 },
    { x: 350, y: 588 },
    { x: 410, y: 584 },
    { x: 458, y: 574 },
    { x: 498, y: 558 },
    { x: 524, y: 546 },
  ],
  9,
  1.4,
);
const OTHER_BOUGHS = [
  bough(
    [
      { x: 252, y: 540 },
      { x: 216, y: 522 },
      { x: 182, y: 514 },
      { x: 154, y: 518 },
    ],
    7,
    1.4,
  ),
  bough(
    [
      { x: 318, y: 160 },
      { x: 282, y: 122 },
      { x: 238, y: 96 },
      { x: 192, y: 88 },
    ],
    9,
    1.6,
  ),
  bough(
    [
      { x: 318, y: 162 },
      { x: 334, y: 104 },
      { x: 352, y: 62 },
      { x: 362, y: 30 },
    ],
    8,
    1.4,
  ),
  bough(
    [
      { x: 316, y: 166 },
      { x: 380, y: 132 },
      { x: 440, y: 112 },
      { x: 500, y: 114 },
      { x: 550, y: 134 },
    ],
    9,
    1.4,
  ),
  bough(
    [
      { x: 436, y: 113 },
      { x: 466, y: 76 },
      { x: 500, y: 52 },
    ],
    4,
    1.2,
  ),
  bough(
    [
      { x: 298, y: 300 },
      { x: 380, y: 278 },
      { x: 460, y: 262 },
      { x: 520, y: 266 },
      { x: 556, y: 284 },
    ],
    7,
    1.4,
  ),
];

/** Pippala roots gripping the kerb of the tank. */
const ROOTS = [
  "M 214 626 C 200 630 184 630 166 634",
  "M 218 632 C 210 644 204 652 198 664",
  "M 232 632 C 240 644 248 652 262 660",
  "M 236 626 C 252 628 268 628 288 632",
];

/** A tiny deterministic generator, so the leaves fall the same way on every render. */
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type Leaf = Pt & { turn: number; k: number; o: number };
type Twig = { d: string; leaves: Leaf[] };

/**
 * Twigs leaving a bough on alternate sides, each ending in a loose spray of
 * leaves hung on long stalks and drooping, as a pippala's do.
 */
function twigsOn(b: Bough, seed: number, step: number, from: number, per = 4): Twig[] {
  const rand = lcg(seed);
  return along(b.pts, step, from).map((m, i) => {
    const side = i % 2 ? 1 : -1;
    const a = ((m.angle + side * (40 + rand() * 25)) * Math.PI) / 180;
    const len = 12 + rand() * 12;
    const end = { x: round(m.x + Math.cos(a) * len), y: round(m.y + Math.sin(a) * len) };
    const n = per - (rand() < 0.4 ? 1 : 0);
    const leaves = Array.from({ length: n }, (_, j) => ({
      x: end.x,
      y: end.y,
      turn: round(30 + (j + 0.5) * (120 / n) + (rand() - 0.5) * 18),
      k: round(0.95 + rand() * 0.4),
      o: round(0.78 + rand() * 0.22),
    }));
    return { d: `M ${m.x} ${m.y} L ${end.x} ${end.y}`, leaves };
  });
}

const TREMBLING: Twig[] = [
  ...twigsOn(BIRD_BOUGH, 3, 34, 150, 3),
  ...twigsOn(OTHER_BOUGHS[0], 5, 26, 24, 3),
  ...twigsOn(OTHER_BOUGHS[1], 7, 24, 30),
  ...twigsOn(OTHER_BOUGHS[2], 11, 24, 36),
  ...twigsOn(OTHER_BOUGHS[3], 13, 24, 50),
  ...twigsOn(OTHER_BOUGHS[4], 17, 22, 10),
  ...twigsOn(OTHER_BOUGHS[5], 19, 28, 150, 3),
];
/** The crown's mass of leaves behind the sprays. */
const CANOPY = [
  { x: 236, y: 104, rx: 64, ry: 34 },
  { x: 352, y: 70, rx: 46, ry: 50 },
  { x: 452, y: 112, rx: 70, ry: 36 },
  { x: 526, y: 140, rx: 44, ry: 28 },
  { x: 498, y: 70, rx: 34, ry: 26 },
];

/* ── Her light, on the bough where the second bird should be ──────────── */

const HER = { x: 356, y: 434 };
const RADIANCE = radiance({ cx: HER.x, cy: HER.y, from: 20, long: 230, short: 130 });
const STILL: Twig[] = twigsOn(HER_BOUGH, 23, 27, 34, 4).filter((t) => {
  const end = t.leaves[0];
  return Math.hypot(end.x - HER.x, end.y - HER.y) > 30;
});
/** The figs by her, ripe, in pairs at the leaf joints. */
const FIGS = along(HER_BOUGH.pts, 30, 46).flatMap((m, i) => [
  { x: round(m.x - 2), y: round(m.y + 7), r: 4.4 + (i % 2) * 0.4 },
  { x: round(m.x + 5), y: round(m.y + 5), r: 4.1 },
]).filter((f) => Math.abs(f.x - HER.x) > 14);

/* ── The other bird, in the mist ──────────────────────────────────────── */

const BIRD = { x: 432, y: 580, k: 1.8 };
/** Its head is turned up toward her: the beak's direction, in degrees. */
const LOOK = round((Math.atan2(HER.y - (BIRD.y - 25 * BIRD.k), HER.x - (BIRD.x - 12 * BIRD.k)) * 180) / Math.PI);
const HEAD = { x: -12, y: -25, r: 6.5 };
const lookDir = { x: Math.cos((LOOK * Math.PI) / 180), y: Math.sin((LOOK * Math.PI) / 180) };
const BEAK = {
  tip: { x: round(HEAD.x + lookDir.x * 14), y: round(HEAD.y + lookDir.y * 14) },
  a: { x: round(HEAD.x + lookDir.x * 5 - lookDir.y * 2.6), y: round(HEAD.y + lookDir.y * 5 + lookDir.x * 2.6) },
  b: { x: round(HEAD.x + lookDir.x * 5 + lookDir.y * 2.6), y: round(HEAD.y + lookDir.y * 5 - lookDir.x * 2.6) },
};
const EYE = { x: round(HEAD.x + lookDir.x * 1.5 + lookDir.y * 2.4), y: round(HEAD.y + lookDir.y * 1.5 - lookDir.x * 2.4) };
const BEAK_PLATE = { x: round(BIRD.x + BEAK.tip.x * BIRD.k), y: round(BIRD.y + BEAK.tip.y * BIRD.k) };
const HEAD_PLATE = { x: round(BIRD.x + HEAD.x * BIRD.k), y: round(BIRD.y + HEAD.y * BIRD.k) };
/** The lane through the mist from her light down to its eye. */
const LANE = (() => {
  const dx = HEAD_PLATE.x - HER.x;
  const dy = HEAD_PLATE.y - HER.y;
  const len = Math.hypot(dx, dy);
  const n = { x: -dy / len, y: dx / len };
  const w0 = 7;
  const w1 = 22;
  const p = (c: Pt, s: number) => `${round(c.x + n.x * s)} ${round(c.y + n.y * s)}`;
  return `M ${p(HER, w0)} L ${p(HEAD_PLATE, w1)} L ${p(HEAD_PLATE, -w1)} L ${p(HER, -w0)} Z`;
})();

/** The fig it let go of, falling to the water. */
const FALLING = { x: 386, y: 612, r: 5.6 };
const FALL_PATH = `M ${BEAK_PLATE.x} ${BEAK_PLATE.y + 4} C ${BEAK_PLATE.x - 14} ${BEAK_PLATE.y + 30} ${FALLING.x - 4} ${FALLING.y - 40} ${FALLING.x} ${FALLING.y - 6}`;
const RIPPLE = { x: 382, y: 676 };

/** The dark motes it shakes from its wings, going out as they fall. */
const MOTES = [
  { x: 458, y: 568, r: 2.4, dur: 9, delay: 0 },
  { x: 474, y: 560, r: 2, dur: 11, delay: 2.4 },
  { x: 466, y: 586, r: 2.2, dur: 10, delay: 4.1 },
  { x: 486, y: 576, r: 1.8, dur: 12, delay: 1.2 },
  { x: 452, y: 600, r: 2, dur: 9.5, delay: 5.6 },
  { x: 480, y: 596, r: 1.7, dur: 10.5, delay: 3.3 },
  { x: 462, y: 614, r: 1.6, dur: 11.5, delay: 6.8 },
  { x: 494, y: 588, r: 1.5, dur: 12.5, delay: 7.7 },
  { x: 474, y: 622, r: 1.3, dur: 13, delay: 8.6 },
  { x: 448, y: 626, r: 1.2, dur: 10, delay: 9.4 },
];

/* ── The mist, lying below her ─────────────────────────────────────────── */

const MIST = [
  { x: 176, y: 556, rx: 92, ry: 22 },
  { x: 282, y: 544, rx: 96, ry: 24 },
  { x: 506, y: 548, rx: 78, ry: 22 },
  { x: 236, y: 594, rx: 112, ry: 22 },
  { x: 350, y: 604, rx: 92, ry: 20 },
  { x: 488, y: 598, rx: 104, ry: 22 },
  { x: 150, y: 604, rx: 60, ry: 18 },
];
const WISPS = [
  "M 132 548 C 170 542 214 546 252 540 C 280 536 310 540 336 536",
  "M 168 584 C 214 578 262 582 304 578",
  "M 452 540 C 482 536 516 540 548 534",
  "M 300 612 C 340 606 380 610 420 606 C 450 603 486 606 520 602",
];

/* ── The tank, and the lotus in it ─────────────────────────────────────── */

const KERB = { y: 630, x0: 112, x1: 600, h: 10 };
const WATER = [654, 666, 680, 696];
const LOTUS = { x: 318, y: 642, k: 0.72, stem: 684 };
const PAD = { x: 274, y: 676, k: 0.85 };

/** The seedling in a crack of the kerb. */
const SEEDLING = { x: 488, y: KERB.y };

/* ── Drawing ───────────────────────────────────────────────────────────── */

const PIPPAL_LEAF = "M 6 0 C 4 -5 6 -11 12 -11.5 C 18 -12 24 -7 28 -2.6 C 31 -1.2 35 -0.4 40 0 C 35 0.4 31 1.2 28 2.6 C 24 7 18 12 12 11.5 C 6 11 4 5 6 0 Z";
const PIPPAL_VEINS = "M 6 0 L 38 0 M 10 0 Q 13 -5 16 -9 M 16 0 Q 19 -4 22 -7.5 M 22 0 Q 24 -3 26 -4.5 M 10 0 Q 13 5 16 9 M 16 0 Q 19 4 22 7.5 M 22 0 Q 24 3 26 4.5";

/** A pippala leaf on its long stalk, from the origin toward +x, with its drawn-out tip. */
function PippalLeaf() {
  return (
    <>
      <path d="M 0 0 L 6 0" stroke="var(--leaf)" strokeWidth={0.9} />
      <path d={PIPPAL_LEAF} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.4} strokeOpacity={0.5} />
      <path d={PIPPAL_VEINS} stroke="var(--gold-soft)" strokeWidth={0.45} strokeOpacity={0.75} />
    </>
  );
}

function Wood({ b }: { b: Bough }) {
  return <path d={taper(b.pts, (t) => b.w0 + (b.w1 - b.w0) * t)} fill="var(--art-hair)" fillOpacity={0.55} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.7} />;
}

/** A perched bird facing left, its feet at the origin, its head turned up along `LOOK`. */
function Bird() {
  return (
    <>
      <path d="M 7 -11 L 28 1 L 24 4.5 L 4 -6 Z" fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
      <path d="M 9 -9.5 L 25 1.6" stroke="var(--gold-soft)" strokeWidth={0.4} />
      <ellipse cx={0} cy={-14} rx={13.5} ry={8.4} transform="rotate(28 0 -14)" fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.6} />
      <ellipse cx={-6.5} cy={-12.5} rx={7} ry={6} transform="rotate(28 -6.5 -12.5)" fill="var(--art-saffron)" />
      <path d="M -4 -21 C 4 -23 13 -15 18 -6 C 10 -7.5 2 -11 -5 -14 Z" fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.5} />
      <path d="M 0 -18.5 C 5 -17 9 -13 12 -9 M 3 -20 C 8 -18 12 -14 15 -8.5" stroke="var(--gold-soft)" strokeWidth={0.45} />
      <circle cx={HEAD.x} cy={HEAD.y} r={HEAD.r} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.6} />
      <path d={`M ${BEAK.a.x} ${BEAK.a.y} L ${BEAK.tip.x} ${BEAK.tip.y} L ${BEAK.b.x} ${BEAK.b.y} Z`} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.4} strokeLinejoin="round" />
      <circle cx={EYE.x} cy={EYE.y} r={1.9} fill="var(--art-ivory)" />
      <circle cx={EYE.x} cy={EYE.y} r={1} fill="var(--art-carve)" />
      <path d="M -3 -7 L -4 0 M 2 -6 L 2.5 0 M -6.5 0 L -1.5 0 M -0.5 0.2 L 4.5 0.2" stroke="var(--gold)" strokeWidth={0.9} strokeLinecap="round" />
    </>
  );
}

function Fig({ x, y, r, url }: Pt & { r: number; url: (name: string) => string }) {
  return (
    <>
      <circle cx={x} cy={y} r={r} fill={url("fig")} stroke="var(--gold)" strokeWidth={0.5} />
      <circle cx={round(x - r * 0.35)} cy={round(y - r * 0.35)} r={round(r * 0.26)} fill="var(--art-ivory)" fillOpacity={0.8} />
    </>
  );
}

export function TwoBirds({ idPrefix = "sa47", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={240} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={HER.x} cy={HER.y} r={240} gradientUnits="userSpaceOnUse">
          <stop offset="0.08" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.2" style={{ stopColor: "var(--gold)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("fig")} cx="0.38" cy="0.35" r="0.7">
          <stop offset="0" style={{ stopColor: "var(--lotus)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)" }} />
        </radialGradient>
        <radialGradient id={id("canopy")}>
          <stop offset="0" style={{ stopColor: "var(--leaf)", stopOpacity: 0.32 }} />
          <stop offset="1" style={{ stopColor: "var(--leaf)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("tank-fade")} x1={KERB.x0} y1={0} x2={KERB.x1} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "white", stopOpacity: 0 }} />
          <stop offset="0.12" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="0.88" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="1" style={{ stopColor: "white", stopOpacity: 0 }} />
        </linearGradient>
        <mask id={id("tank")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect x={KERB.x0} y={KERB.y - 20} width={KERB.x1 - KERB.x0} height={140} fill={url("tank-fade")} />
        </mask>
        <radialGradient id={id("mist")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.2 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.24 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("lane")} x1={HER.x} y1={HER.y} x2={HEAD_PLATE.x} y2={HEAD_PLATE.y} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0.08 }} />
        </linearGradient>
        <linearGradient id={id("water")} x1={0} y1={KERB.y + KERB.h} x2={0} y2={720} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.04 }} />
        </linearGradient>
      </defs>

      {/* Her light, where the second bird should sit */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={240} fill={url("glow")} />
        <path className="m-shimmer" d={RADIANCE} stroke={url("radiance")} strokeWidth={0.7} />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={60} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={16} stroke="var(--gold)" strokeWidth={1.1} />
        <circle cx={HER.x} cy={HER.y} r={9} fill="var(--art-core)" />
      </g>

      {/* The tree, trembling */}
      <g {...part("tree")}>
        <path d={taper(TRUNK, (t) => 40 - 30 * t)} fill="var(--art-hair)" fillOpacity={0.55} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.7} />
        <g stroke="var(--art-hair)" strokeOpacity={0.5} strokeWidth={3} strokeLinecap="round">
          {ROOTS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        {OTHER_BOUGHS.map((b, i) => (
          <Wood key={i} b={b} />
        ))}
        <Wood b={BIRD_BOUGH} />
        <Wood b={HER_BOUGH} />
        {CANOPY.map((c, i) => (
          <ellipse key={i} cx={c.x} cy={c.y} rx={c.rx} ry={c.ry} fill={url("canopy")} />
        ))}
        {TREMBLING.map((t, i) => (
          <g key={i}>
            <path d={t.d} stroke="var(--art-hair)" strokeOpacity={0.6} strokeWidth={1.2} strokeLinecap="round" />
            {t.leaves.map((l, j) => (
              <g key={j} transform={`translate(${l.x} ${l.y}) rotate(${l.turn}) scale(${l.k})`} opacity={l.o}>
                <g className={SWAY[(i + j) % 3]}>
                  <PippalLeaf />
                </g>
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* The leaves round her, still */}
      <g {...part("still-leaves")}>
        {STILL.map((t, i) => (
          <g key={i}>
            <path d={t.d} stroke="var(--art-hair)" strokeOpacity={0.6} strokeWidth={1.2} strokeLinecap="round" />
            {t.leaves.map((l, j) => (
              <g key={j} transform={`translate(${l.x} ${l.y}) rotate(${l.turn}) scale(${l.k})`} opacity={l.o}>
                <PippalLeaf />
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* The figs by her, untouched */}
      <g {...part("figs")}>
        {FIGS.map((f, i) => (
          <Fig key={i} {...f} url={url} />
        ))}
      </g>

      {/* The mist, lying below her */}
      <g {...part("mist")}>
        <g className="m-shimmer">
          {MIST.map((m, i) => (
            <ellipse key={i} cx={m.x} cy={m.y} rx={m.rx} ry={m.ry} fill={url("mist")} />
          ))}
        </g>
        <g stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.6} strokeLinecap="round">
          {WISPS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </g>

      {/* The temple tank */}
      <g {...part("tank")}>
        <g mask={url("tank")}>
        <rect x={KERB.x0} y={KERB.y + KERB.h} width={KERB.x1 - KERB.x0} height={720 - KERB.y - KERB.h} fill={url("water")} />
        <rect x={KERB.x0} y={KERB.y} width={KERB.x1 - KERB.x0} height={KERB.h} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.9} />
        <path d={`M ${SEEDLING.x - 5} ${KERB.y} l 4 3 l -2 3 l 5 4`} stroke="var(--art-musk)" strokeWidth={0.8} strokeOpacity={0.6} />
        <g stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.6} strokeLinecap="round">
          {WATER.map((y, i) => (
            <path key={y} d={`M ${KERB.x0 + 20 + i * 14} ${y} L ${KERB.x1 - 30 - i * 18} ${y}`} strokeDasharray={i % 2 ? "18 10" : "30 8"} />
          ))}
        </g>
        </g>
      </g>

      {/* The lotus, standing clear of the water */}
      <g {...part("lotus")}>
        <g transform={`translate(${PAD.x} ${PAD.y}) scale(${PAD.k})`}>
          <LotusLeaf />
        </g>
        <path d={`M ${LOTUS.x + 2} ${LOTUS.stem} C ${LOTUS.x + 4} ${LOTUS.stem - 14} ${LOTUS.x} ${LOTUS.y + 14} ${LOTUS.x} ${LOTUS.y}`} stroke="var(--leaf)" strokeWidth={1.8} strokeLinecap="round" />
        <g transform={`translate(${LOTUS.x} ${LOTUS.y}) scale(${LOTUS.k})`}>
          <OpenLotus fill="var(--art-ivory)" shade="var(--gold-soft)" pad={false} />
        </g>
      </g>

      {/* A pippala seedling in a crack of the kerb */}
      <g {...part("seedling")}>
        <path d={`M ${SEEDLING.x} ${SEEDLING.y + 2} C ${SEEDLING.x} ${SEEDLING.y - 6} ${SEEDLING.x + 3} ${SEEDLING.y - 11} ${SEEDLING.x + 1} ${SEEDLING.y - 18}`} stroke="var(--leaf)" strokeWidth={1.1} strokeLinecap="round" />
        {[
          { x: SEEDLING.x + 1, y: SEEDLING.y - 18, turn: -70 },
          { x: SEEDLING.x + 1.5, y: SEEDLING.y - 11, turn: -160 },
          { x: SEEDLING.x + 0.5, y: SEEDLING.y - 6, turn: -15 },
        ].map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.turn}) scale(0.44)`}>
            <PippalLeaf />
          </g>
        ))}
      </g>

      {/* The other bird, turned up to her through the cleared mist */}
      <g {...part("bird")}>
        <path className="m-shimmer" d={LANE} fill={url("lane")} />
        <g transform={`translate(${BIRD.x} ${BIRD.y}) scale(${BIRD.k})`}>
          <Bird />
        </g>
      </g>

      {/* The fig it let go of */}
      <g {...part("dropped")}>
        <path d={FALL_PATH} stroke="var(--gold)" strokeWidth={1.1} strokeDasharray="0.1 3.6" strokeLinecap="round" />
        <Fig {...FALLING} url={url} />
        <g stroke="var(--gold-soft)" strokeWidth={0.7}>
          <ellipse className="m-twinkle" cx={RIPPLE.x} cy={RIPPLE.y} rx={10} ry={2.4} />
          <ellipse className="m-twinkle m-late" cx={RIPPLE.x} cy={RIPPLE.y} rx={18} ry={4} strokeOpacity={0.6} />
        </g>
      </g>

      {/* The dark motes it shakes off, going out as they fall */}
      <g {...part("shaken")}>
        {MOTES.map((m, i) => (
          <circle
            key={i}
            className="m-sink"
            cx={m.x}
            cy={m.y}
            r={m.r}
            fill="var(--art-hair)"
            fillOpacity={0.85}
            stroke="var(--gold-soft)"
            strokeWidth={0.6}
            style={{ "--dur": `${m.dur}s`, "--delay": `${-m.delay}s` } as CSSProperties}
          />
        ))}
      </g>
    </svg>
  );
}
