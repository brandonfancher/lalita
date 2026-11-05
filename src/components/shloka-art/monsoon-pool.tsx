/**
 * Shloka 51 — "Thick compassion".
 *
 * A monsoon. Her compassion is one dense rain cloud heaped over the whole
 * sky, crown to sides, its dark belly just under the card pouring rain
 * (sāndra is a word for clouds, and ghana, "dense", is a name for one). Below
 * it her light hangs low over a forest pool, where a tiger and a spotted deer
 * drink side by side, enmity laid down in her presence (Yoga Sūtra 2.35). An
 * owl sits nearest her light with its eyes shut, as Bhartṛhari's owl can't
 * see the sun. A pearl lies in an open shell in the shallows, a raindrop
 * hardened without a flaw. One flash of lightning shows everything at once
 * (Kena 4.4), and the sun and the moon are behind the cloud, neither seen to
 * equal her (Śvetāśvatara 6.8). Which name each part answers to is written
 * up for readers in the registry, next to this artwork's entry.
 */

import { CloudLobes, MoonDeer, Pearl, artIds, cloudArc, glint, hash, partProps, rainGroups, round, taper, through, type Lobe } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── Her light, low over the pool ─────────────────────────────────────── */

const HER = { x: 320, y: 478 };

/* ── The cloud ────────────────────────────────────────────────────────── */

/** The cloud's flat foot, just under the card. */
const FOOT = 424;
const LOBES: Lobe[] = [
  // the left flank, from the foot up
  { x: 108, y: 394, r: 40 },
  { x: 88, y: 350, r: 26 },
  { x: 102, y: 316, r: 34 },
  { x: 84, y: 272, r: 24 },
  { x: 104, y: 236, r: 34 },
  { x: 96, y: 190, r: 26 },
  // over the crown, heaped highest left of centre
  { x: 132, y: 156, r: 34 },
  { x: 168, y: 118, r: 38 },
  { x: 216, y: 88, r: 44 },
  { x: 272, y: 66, r: 50 },
  { x: 330, y: 70, r: 44 },
  { x: 380, y: 88, r: 38 },
  { x: 428, y: 110, r: 36 },
  { x: 470, y: 132, r: 30 },
  { x: 504, y: 160, r: 34 },
  // the right flank, down to the foot
  { x: 544, y: 196, r: 26 },
  { x: 532, y: 234, r: 32 },
  { x: 552, y: 276, r: 26 },
  { x: 534, y: 314, r: 34 },
  { x: 550, y: 356, r: 26 },
  { x: 530, y: 394, r: 40 },
  // the body behind the card and the broad belly
  { x: 320, y: 270, r: 180 },
  { x: 150, y: 376, r: 60 },
  { x: 200, y: 372, r: 62 },
  { x: 320, y: 380, r: 140 },
  { x: 440, y: 372, r: 62 },
  { x: 490, y: 376, r: 60 },
];
/** Lobes heaped up behind the crest, greyer for being further off. */
const BACK_LOBES: Lobe[] = [
  { x: 226, y: 54, r: 28 },
  { x: 272, y: 32, r: 30 },
  { x: 322, y: 38, r: 28 },
  { x: 372, y: 62, r: 24 },
];
/** Lobes rolling in front of the sun and the moon, so both are behind the cloud. */
const VEIL_LOBES: Lobe[] = [
  { x: 180, y: 150, r: 24 },
  { x: 212, y: 154, r: 20 },
  { x: 418, y: 150, r: 22 },
  { x: 448, y: 146, r: 18 },
];
const ARCS = [...LOBES.slice(6, 15), ...LOBES.slice(1, 6), ...LOBES.slice(15, 20), ...BACK_LOBES.slice(1, 3)];

const SUN = { x: 200, y: 120, r: 30 };
const MOON = { x: 432, y: 120, r: 27 };

/** Rain in sheets from the foot to the ground, and a copy lit gold where it falls through her light. */
const RAIN = rainGroups({ x: 104, y: FOOT + 2, w: 446, h: 300, count: 300 });

/** One flash of lightning in the right flank: a zigzag with a short fork. */
const BOLT = "M 520 214 L 508 246 L 524 262 L 506 300 L 522 316 L 504 360 L 516 372 L 502 404";
const FORK = "M 524 262 L 540 284 L 534 296 L 548 318";

/* ── The pool ─────────────────────────────────────────────────────────── */

const POOL = { x: 320, y: 604, rx: 190, ry: 40 };
/** The pool's edge, an ellipse with a gently uneven bank. */
const POOL_EDGE = (() => {
  const pts = Array.from({ length: 48 }, (_, k) => {
    const t = (k / 48) * Math.PI * 2;
    const wob = 1 + 0.035 * Math.sin(t * 5 + 0.7) + 0.02 * Math.sin(t * 9);
    return { x: round(POOL.x + POOL.rx * wob * Math.cos(t)), y: round(POOL.y + POOL.ry * wob * Math.sin(t)) };
  });
  return `M ${pts.map((p) => `${p.x} ${p.y}`).join(" L ")} Z`;
})();
/** Level lines across the still water, closer toward the far bank. */
const WATER_LINES = [10, 20, 32, 46, 62].map((dy, k) => {
  const y = POOL.y - POOL.ry + dy;
  const half = POOL.rx * Math.sqrt(Math.max(0, 1 - ((y - POOL.y) / POOL.ry) ** 2)) - 14;
  const gap = 20 + k * 6;
  return `M ${round(POOL.x - half)} ${y} L ${POOL.x - gap} ${y} M ${POOL.x + gap} ${y} L ${round(POOL.x + half)} ${y}`;
});
/** Rings where the rain strikes the water, in three groups. */
const RINGS = Array.from({ length: 30 }, (_, k) => {
  const u = hash(k, 51);
  const v = hash(k, 52);
  const t = u * Math.PI * 2;
  const rr = 0.25 + 0.7 * Math.sqrt(v);
  return {
    x: round(POOL.x + POOL.rx * 0.92 * rr * Math.cos(t)),
    y: round(POOL.y + POOL.ry * 0.82 * rr * Math.sin(t)),
    r: round(4 + 5 * hash(k, 53)),
    g: k % 3,
  };
}).filter((r) => Math.abs(r.x - POOL.x) > 26);
/** Her light on the water: a column of lozenges from the far bank to the shallows. */
const REFLECTION = [0, 1, 2].map((g) =>
  [574, 584, 594, 605, 617, 630]
    .map((y, k) => {
      const w = 5 + k * 1.6;
      const x0 = POOL.x - w * (1 + 0.6 * hash(k, g)) + (g - 1) * (6 + k);
      const h = 1.4 + k * 0.2;
      return (k + g) % 3 === 0 ? "" : `M ${round(x0)} ${y + g * 2} Q ${round(x0 + w)} ${round(y + g * 2 - h)} ${round(x0 + 2 * w)} ${y + g * 2} Q ${round(x0 + w)} ${round(y + g * 2 + h)} ${round(x0)} ${y + g * 2} Z`;
    })
    .join(" "),
);
/** Reeds and grass at the ends of the pool. */
const REEDS = [
  { x: 136, y: 598, h: 46, lean: -8 },
  { x: 146, y: 604, h: 34, lean: 4 },
  { x: 128, y: 610, h: 28, lean: -12 },
  { x: 496, y: 606, h: 40, lean: 8 },
  { x: 506, y: 600, h: 30, lean: -4 },
  { x: 488, y: 614, h: 26, lean: 12 },
  { x: 214, y: 650, h: 22, lean: -6 },
  { x: 430, y: 652, h: 22, lean: 6 },
];
const blade = (h: number, lean: number) => `M -2.2 0 C -2 ${round(-h * 0.5)} ${round(lean * 0.5 - 0.6)} ${round(-h * 0.8)} ${lean} ${-h} C ${round(lean * 0.5 + 0.8)} ${round(-h * 0.8)} 2 ${round(-h * 0.5)} 2.2 0 Z`;

/* ── The tiger, drinking ──────────────────────────────────────────────── */

const TIGER = { x: 266, y: 560, k: 1.04 };
const TIGER_BODY =
  "M -144 -48 C -150 -62 -136 -72 -114 -70 C -92 -68 -70 -62 -48 -64 C -30 -66 -14 -62 -4 -52 C 4 -46 10 -40 16 -35 C 26 -32 34 -24 40 -12 C 43 -6 46 -1 46 3 C 46 7 42 9 38 9 C 32 9 26 6 20 1 C 12 -4 6 -9 0 -13 C -3 -14 -5 -12 -5 -8 L -3 -1 C -2 1 -4 2 -6 2 L -20 2 C -22 2 -22 0 -22 -2 C -24 -12 -25 -20 -30 -26 C -44 -30 -64 -30 -80 -30 C -92 -30 -100 -33 -104 -37 C -105 -30 -105 -20 -110 -12 L -106 -1 C -105 1 -107 2 -109 2 L -122 2 C -124 2 -125 0 -124 -2 L -125 -8 C -132 -16 -138 -30 -144 -48 Z";
const TIGER_FAR_LEGS =
  "M -34 -26 C -32 -16 -32 -8 -30 -1 L -16 -1 L -18 -6 C -20 -14 -22 -22 -22 -27 Z M -116 -34 C -118 -24 -120 -16 -124 -9 L -122 -1 L -136 -1 L -136 -6 C -132 -14 -130 -26 -132 -36 Z";
const TIGER_TAIL = "M -142 -52 C -156 -50 -162 -34 -156 -16 C -152 -4 -142 0 -136 -8";
const TIGER_BELLY = "M -28 -26 C -44 -30 -64 -30 -80 -30 C -92 -30 -100 -33 -104 -37 L -100 -42 C -88 -38 -70 -36 -52 -36 C -40 -36 -32 -34 -26 -31 Z";
const TIGER_MUZZLE = "M 22 1 C 28 7 34 9 39 9 C 43 9 46 7 46 3 C 44 -2 40 -6 35 -6 C 30 -6 25 -3 22 1 Z";
const TIGER_RUFF = "M 4 -12 C 8 -16 12 -14 14 -20 C 16 -14 20 -14 22 -18 C 22 -10 18 -3 14 -2 C 10 -4 6 -8 4 -12 Z";
const TIGER_EAR = "M 10 -36 C 8 -46 16 -50 22 -42 C 20 -38 16 -36 10 -36 Z";
/** Stripes: tapered marks from the back down the flank, closer and shorter toward the shoulder. */
const stripe = (x: number, y: number, len: number, lean: number, w: number) => {
  const mx = x + lean / 2;
  const my = y + len / 2;
  return `M ${x} ${y} Q ${round(mx + w)} ${round(my)} ${round(x + lean)} ${round(y + len)} Q ${round(mx - w)} ${round(my)} ${x} ${y} Z`;
};
const TIGER_STRIPES = [
  [-134, -66, 24, -6, 2.6],
  [-122, -72, 30, -5, 3],
  [-110, -72, 34, -3, 3.2],
  [-98, -70, 30, -2, 3],
  [-86, -68, 34, 0, 3.2],
  [-74, -66, 28, 1, 3],
  [-62, -66, 32, 2, 3.2],
  [-50, -67, 26, 4, 3],
  [-38, -68, 24, 6, 2.8],
  [-26, -66, 20, 7, 2.6],
  [-14, -60, 16, 8, 2.2],
  [-2, -54, 12, 8, 1.8],
  // the haunch, curving round
  [-140, -42, 14, 8, 2.2],
  [-134, -30, 12, 10, 2],
  // the forelegs, across
  [-22, -18, 10, 8, 1.6],
  [-24, -9, 10, 8, 1.4],
  // the brow and cheek
  [18, -32, 8, 4, 1.4],
  [26, -27, 7, 4, 1.2],
  [12, -18, 8, -4, 1.2],
]
  .map(([x, y, l, lean, w]) => stripe(x, y, l, lean, w))
  .join(" ");

/* ── The deer, drinking beside it ─────────────────────────────────────── */

/** Drawn facing right and turned to face the tiger. */
const DEER = { x: 368, y: 560, k: 1.06 };
const DEER_BODY =
  "M -102 -50 C -106 -60 -96 -66 -80 -64 C -62 -62 -44 -62 -30 -62 C -20 -62 -14 -58 -8 -52 C 0 -42 8 -30 14 -18 C 18 -10 22 -2 26 4 C 28 7 27 10 24 10 C 20 10 15 7 12 3 C 8 -3 4 -8 0 -14 C -4 -20 -8 -26 -12 -30 C -13 -26 -14 -24 -14 -22 L -12 0 L -16 0 L -19 -24 C -32 -27 -60 -27 -76 -29 C -77 -24 -79 -20 -80 -15 L -78 0 L -82 0 L -86 -14 C -92 -22 -98 -34 -102 -50 Z";
const DEER_FAR_LEGS = "M -22 -25 L -24 -1 M -82 -26 L -88 -14 L -86 -1";
const DEER_BELLY = "M -19 -24 C -32 -27 -60 -27 -76 -29 L -76 -33 C -60 -31 -34 -31 -20 -29 Z";
const DEER_THROAT = "M 6 -20 C 9 -15 12 -10 13 -6 C 10 -6 7 -9 4 -14 Z";
const DEER_EAR = "M 6 -26 C 0 -36 -6 -40 -8 -38 C -8 -34 -2 -28 4 -24 Z";
/** Chital antlers: a main beam rising in a lyre, a brow tine forward, a fork at the top. */
const ANTLER = "M 9 -27 C 4 -40 1 -54 5 -68 M 5 -68 L 12 -78 M 5 -68 L -3 -76 M 7 -33 C 12 -36 16 -36 20 -40";
const DEER_SPOTS = Array.from({ length: 30 }, (_, k) => {
  const row = k % 3;
  const col = Math.floor(k / 3);
  return {
    x: round(-92 + col * 7.4 + (row % 2) * 3.4 + 2 * hash(k, 7)),
    y: round(-55 + row * 8 + 2 * hash(k, 8)),
    r: round(1.4 + 0.6 * hash(k, 9)),
  };
}).filter((s) => s.x < -18);

/* ── The owl, eyes shut ───────────────────────────────────────────────── */

const OWL = { x: 130, y: 460 };
const OWL_BODY =
  "M -10 -48 L -15 -60 L -19 -46 C -23 -40 -23 -30 -21 -22 C -19 -10 -11 -2 0 -2 C 11 -2 19 -10 21 -22 C 23 -30 23 -40 19 -46 L 15 -60 L 10 -48 C 4 -50 -4 -50 -10 -48 Z";
const OWL_WINGS = "M -20 -30 C -22 -18 -18 -8 -10 -4 M 20 -30 C 22 -18 18 -8 10 -4";
const OWL_CHEVRONS = [-24, -17, -10]
  .flatMap((y, row) => [-8, 0, 8].slice(row === 2 ? 1 : 0, row === 2 ? 3 : 3).map((x) => `M ${x - 3 + (row === 2 ? -4 : 0)} ${y} L ${x + (row === 2 ? -4 : 0)} ${y + 2.6} L ${x + 3 + (row === 2 ? -4 : 0)} ${y}`))
  .join(" ");
const BRANCH = through(
  [
    { x: 18, y: 488 },
    { x: 70, y: 474 },
    { x: 120, y: 462 },
    { x: 172, y: 452 },
  ],
  8,
);
const BRANCH_TWIGS = "M 92 469 C 98 458 100 448 110 440 M 160 454 L 176 440 M 150 457 C 160 462 170 470 174 478";

/* ── The cātaka, on a reed ────────────────────────────────────────────── */

/** A pied cuckoo perched on a reed's tip, facing in, its head thrown back and its beak open to the rain. */
const CATAKA = { x: 512, y: 512 };
const CATAKA_REED = "M 522 612 C 520 580 515 546 512 512";
const CATAKA_TAIL = "M 3 -8 C 8 0 12 10 15 24";
const CATAKA_BODY = "M -3 -26 C -9 -22 -11 -12 -8 -4 C -5 1 2 1 5 -4 C 8 -10 6 -20 2 -25 Z";
const CATAKA_BACK = "M 2 -25 C 7 -19 8 -10 5 -4 C 3 -1 0 0 -2 -1 C 2 -8 3 -18 -1 -25 Z";
const CATAKA_HEAD = "M -9 -30 C -9 -35 -5 -38 -1 -37 C 3 -36 4 -32 2 -27 C 0 -25 -6 -25 -9 -30 Z";
const CATAKA_CREST = "M -2 -36 L 7 -42 L 2 -32 Z";
const CATAKA_BEAK = "M -8 -33 L -16 -42 L -7.6 -35.4 M -8.6 -30.6 L -17 -36 L -8 -31.6";
/** The raindrop falling into its beak. */
const DROP = { x: 495, y: 462 };

export function MonsoonPool({ idPrefix = "sa51", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={230} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <clipPath id={id("foot-cut")}>
          <rect x={0} y={0} width={640} height={FOOT} />
        </clipPath>
        <clipPath id={id("cloud-shape")}>
          {LOBES.map((l, i) => (
            <circle key={i} cx={l.x} cy={l.y} r={l.r} />
          ))}
        </clipPath>
        <linearGradient id={id("belly")} x1={0} y1={20} x2={0} y2={FOOT} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.08 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.2 }} />
          <stop offset="0.75" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.34 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.56 }} />
        </linearGradient>
        <radialGradient id={id("belly-lit")} cx={HER.x} cy={FOOT} r={150} gradientUnits="userSpaceOnUse" gradientTransform={`translate(${HER.x} ${FOOT}) scale(1 0.4) translate(${-HER.x} ${-FOOT})`}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("rain")} x1={0} y1={FOOT} x2={0} y2={FOOT + 330} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.75 }} />
          <stop offset="0.6" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("lit-fade")} cx={HER.x} cy={HER.y + 20} r={130} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </radialGradient>
        <mask id={id("lit-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("lit-fade")} />
        </mask>
        <radialGradient id={id("sun")} cx={SUN.x} cy={SUN.y} r={SUN.r + 14} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.55 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("moon-smudge")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("moon-shade")} cx={MOON.x - 6} cy={MOON.y - 6} r={MOON.r + 6} gradientUnits="userSpaceOnUse">
          <stop offset="0.6" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.4 }} />
        </radialGradient>
        <linearGradient id={id("bolt-fade")} x1={0} y1={214} x2={0} y2={404} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={0.2} />
          <stop offset="0.3" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={1} />
        </linearGradient>
        <mask id={id("bolt-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("bolt-fade")} />
        </mask>
        <radialGradient id={id("water")} cx={POOL.x} cy={POOL.y - 20} r={POOL.rx} gradientUnits="userSpaceOnUse" gradientTransform={`translate(${POOL.x} ${POOL.y - 20}) scale(1 0.32) translate(${-POOL.x} ${-(POOL.y - 20)})`}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.42 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.26 }} />
        </radialGradient>
        <linearGradient id={id("bank")} x1={110} y1={0} x2={530} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
          <stop offset="0.2" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.2 }} />
          <stop offset="0.8" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("tiger")} x1={0} y1={-72} x2={0} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-turmeric)" }} />
        </linearGradient>
        <clipPath id={id("tiger-clip")}>
          <path d={TIGER_BODY} />
        </clipPath>
        <linearGradient id={id("deer")} x1={0} y1={-66} x2={0} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-crimson)" }} />
          <stop offset="0.6" style={{ stopColor: "var(--sindura)" }} />
        </linearGradient>
        <clipPath id={id("deer-clip")}>
          <path d={DEER_BODY} />
        </clipPath>
        <linearGradient id={id("owl")} x1={0} y1={-60} x2={0} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold)" }} />
        </linearGradient>
      </defs>

      {/* Her light, low over the pool */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={230} fill={url("glow")} />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={48} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={15} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={11} fill="var(--art-saffron)" fillOpacity={0.5} />
        <circle cx={HER.x} cy={HER.y} r={6.5} fill="var(--art-core)" />
      </g>

      {/* The one cloud, heaped over the whole sky, and its rain */}
      <g {...part("cloud")}>
        <g mask={url("lit-mask")}>
          {RAIN.map((d, i) => (
            <path key={i} d={d} stroke="var(--art-core)" strokeWidth={0.9} strokeLinecap="round" strokeOpacity={0.9} />
          ))}
        </g>
        {RAIN.map((d, i) => (
          <path key={i} className={i === 1 ? "m-shimmer" : undefined} d={d} stroke={url("rain")} strokeWidth={0.7} strokeLinecap="round" />
        ))}
        <CloudLobes lobes={BACK_LOBES} />
        <g fill="var(--art-carve)" fillOpacity={0.3}>
          {BACK_LOBES.map((l, i) => (
            <circle key={i} cx={l.x} cy={l.y} r={l.r} />
          ))}
        </g>
        <g fill="var(--art-hair)" fillOpacity={0.18}>
          {BACK_LOBES.map((l, i) => (
            <circle key={i} cx={l.x} cy={l.y} r={l.r} />
          ))}
        </g>
        <g clipPath={url("foot-cut")}>
          <CloudLobes lobes={LOBES} />
          <g clipPath={url("cloud-shape")}>
            <rect x={0} y={0} width={640} height={FOOT} fill="var(--art-carve)" fillOpacity={0.3} />
            <rect x={0} y={0} width={640} height={FOOT} fill={url("belly")} />
            <rect x={0} y={FOOT - 70} width={640} height={70} fill={url("belly-lit")} />
          </g>
          {ARCS.map((l, i) => (
            <path key={i} d={cloudArc(l)} stroke="var(--gold-soft)" strokeWidth={0.7} />
          ))}
        </g>
        <path d={`M 84 ${FOOT} L 556 ${FOOT}`} stroke="var(--gold)" strokeWidth={1.2} />
      </g>

      {/* The sun and the moon, behind the cloud */}
      <g {...part("veiled")}>
        <circle cx={SUN.x} cy={SUN.y} r={SUN.r + 14} fill={url("sun")} />
        <circle cx={SUN.x} cy={SUN.y} r={SUN.r} stroke="var(--gold)" strokeWidth={1.3} strokeOpacity={0.7} />
        <circle cx={SUN.x} cy={SUN.y} r={SUN.r - 9} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.4} />
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r + 10} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.45} />
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill="var(--art-moon)" />
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill={url("moon-shade")} stroke="var(--gold)" strokeWidth={1.3} strokeOpacity={0.7} />
        <g transform={`translate(${MOON.x - 12} ${MOON.y - 6}) scale(0.42)`} opacity={0.4}>
          <MoonDeer smudge={url("moon-smudge")} />
        </g>
        <CloudLobes lobes={VEIL_LOBES} />
        {VEIL_LOBES.map((l, i) => (
          <path key={i} d={cloudArc(l)} stroke="var(--gold-soft)" strokeWidth={0.7} />
        ))}
      </g>

      {/* One flash that shows everything at once */}
      <g {...part("lightning")} strokeLinecap="round" strokeLinejoin="round" mask={url("bolt-mask")}>
        <path d={`${BOLT} ${FORK}`} stroke="var(--art-core)" strokeWidth={7} strokeOpacity={0.3} />
        <path className="m-flicker" d={`${BOLT} ${FORK}`} stroke="var(--gold)" strokeWidth={2.6} />
        <path className="m-flicker" d={`${BOLT} ${FORK}`} stroke="var(--art-ivory)" strokeWidth={1.1} />
      </g>

      {/* The forest pool */}
      <g {...part("pool")}>
        <path d={`M 100 566 C 180 552 460 552 540 566 L 540 586 L 100 586 Z`} fill={url("bank")} />
        <path d={POOL_EDGE} fill={url("water")} />
        <path d={POOL_EDGE} stroke="var(--gold)" strokeWidth={1.2} />
        <g stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.7}>
          {WATER_LINES.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g stroke="var(--gold-soft)" strokeWidth={0.6}>
          {RINGS.map((r, i) => (
            <ellipse key={i} className={TWINKLE[r.g]} cx={r.x} cy={r.y} rx={r.r} ry={round(r.r * 0.26)} />
          ))}
        </g>
        <g fill="var(--art-saffron)" fillOpacity={0.9}>
          {REFLECTION.map((d, i) => (
            <path key={i} className={TWINKLE[i]} d={d} fill={i === 2 ? "var(--art-core)" : undefined} />
          ))}
        </g>
        <g fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.4}>
          {REEDS.map((r, i) => (
            <g key={i} transform={`translate(${r.x} ${r.y})`}>
              <path d={blade(r.h, r.lean)} />
              <path d={blade(r.h * 0.7, r.lean * 1.6 + 6)} />
              <path d={blade(r.h * 0.6, -r.lean - 6)} />
            </g>
          ))}
        </g>
      </g>

      {/* The tiger and the deer, drinking together */}
      <g {...part("drinking")}>
        <g transform={`translate(${TIGER.x} ${TIGER.y}) scale(${TIGER.k})`}>
          <path d={TIGER_TAIL} stroke="var(--gold)" strokeWidth={8.4} strokeLinecap="round" />
          <path d={TIGER_TAIL} stroke="var(--art-saffron)" strokeWidth={6.4} strokeLinecap="round" />
          <path d={TIGER_TAIL} stroke="var(--art-hair)" strokeWidth={6.6} strokeDasharray="4 7" strokeOpacity={0.85} />
          <path d={TIGER_FAR_LEGS} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.8} />
          <path d={TIGER_FAR_LEGS} fill="var(--art-hair)" fillOpacity={0.25} />
          <path d={TIGER_BODY} fill={url("tiger")} stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round" />
          <g clipPath={url("tiger-clip")}>
            <path d={TIGER_BELLY} fill="var(--art-ivory)" fillOpacity={0.9} />
            <path d={TIGER_MUZZLE} fill="var(--art-ivory)" />
            <path d={TIGER_RUFF} fill="var(--art-ivory)" fillOpacity={0.9} />
            <path d={TIGER_STRIPES} fill="var(--art-hair)" fillOpacity={0.88} />
          </g>
          <path d={TIGER_EAR} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.8} />
          <path d="M 14 -40 C 15 -43 18 -44 19 -41" stroke="var(--art-hair)" strokeWidth={1.4} strokeLinecap="round" />
          <path d="M 28 -20 C 31 -21 34 -19 35 -16" stroke="var(--art-hair)" strokeWidth={1.6} strokeLinecap="round" />
          <circle cx={45} cy={3} r={1.8} fill="var(--art-crimson)" />
          <path d="M 38 9 C 39 11 41 12 42 11" stroke="var(--art-crimson)" strokeWidth={1.2} strokeLinecap="round" />
        </g>
        <g transform={`translate(${DEER.x} ${DEER.y}) scale(${-DEER.k} ${DEER.k})`}>
          <path d={DEER_FAR_LEGS} stroke="var(--art-crimson)" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
          <g transform="translate(-6 -2)" stroke="var(--gold)" strokeWidth={2} strokeOpacity={0.7} strokeLinecap="round">
            <path d={ANTLER} />
          </g>
          <path d={DEER_BODY} fill={url("deer")} stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round" />
          <g clipPath={url("deer-clip")}>
            <path d={DEER_BELLY} fill="var(--art-ivory)" fillOpacity={0.9} />
            <path d={DEER_THROAT} fill="var(--art-ivory)" fillOpacity={0.9} />
            <path d="M -96 -60 C -70 -60 -40 -60 -14 -58" stroke="var(--art-crimson)" strokeWidth={3} strokeLinecap="round" />
            <g fill="var(--art-ivory)">
              {DEER_SPOTS.map((s, i) => (
                <circle key={i} cx={s.x} cy={s.y} r={s.r} />
              ))}
            </g>
          </g>
          <path d={DEER_EAR} fill="var(--sindura)" stroke="var(--gold)" strokeWidth={0.8} />
          <g stroke="var(--gold)" strokeWidth={2.6} strokeLinecap="round">
            <path d={ANTLER} />
          </g>
          <circle cx={14} cy={-16} r={1.6} fill="var(--art-hair)" />
          <circle cx={25} cy={8} r={1.6} fill="var(--art-hair)" />
          <path d="M -98 -50 C -102 -44 -102 -40 -100 -36" stroke="var(--art-ivory)" strokeWidth={2.4} strokeLinecap="round" />
        </g>
      </g>

      {/* The owl, nearest her and seeing nothing */}
      <g {...part("owl")}>
        <path d={taper(BRANCH, (t) => 9 - 6 * t)} fill="var(--art-hair)" fillOpacity={0.55} stroke="var(--gold)" strokeWidth={0.7} strokeLinejoin="round" />
        <path d={BRANCH_TWIGS} stroke="var(--art-hair)" strokeOpacity={0.6} strokeWidth={2} strokeLinecap="round" />
        <g transform={`translate(${OWL.x} ${OWL.y})`}>
          <path d={OWL_BODY} fill={url("owl")} stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
          <path d={OWL_WINGS} stroke="var(--art-carve)" strokeWidth={1.2} strokeOpacity={0.8} strokeLinecap="round" />
          <path d={OWL_CHEVRONS} stroke="var(--art-carve)" strokeWidth={1} strokeOpacity={0.85} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={-7.6} cy={-37} r={8} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} />
          <circle cx={7.6} cy={-37} r={8} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} />
          <path d="M -12.4 -37.6 Q -7.6 -33.6 -2.8 -37.6 M 2.8 -37.6 Q 7.6 -33.6 12.4 -37.6" stroke="var(--art-hair)" strokeWidth={1.5} strokeLinecap="round" />
          <path d="M -1.8 -34 L 0 -28 L 1.8 -34 Z" fill="var(--art-hair)" />
          <path d="M -6 -2 L -7 2 M -3 -2 L -3 2.4 M 3 -2 L 3 2.4 M 6 -2 L 7 2" stroke="var(--art-hair)" strokeWidth={1.2} strokeLinecap="round" />
        </g>
      </g>

      {/* The pearl in the shallows, without a flaw */}
      <g {...part("pearl")}>
        <g transform="translate(320 636) scale(1.4)">
          <path d="M -16 -2 C -14 -14 14 -14 16 -2 C 8 -6 -8 -6 -16 -2 Z" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path d="M -16 0 C -10 10 10 10 16 0 C 8 3 -8 3 -16 0 Z" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path d="M -10 6 L -8 1.8 M -4 7.6 L -3 2.4 M 4 7.6 L 3 2.4 M 10 6 L 8 1.8 M -9 -9 L -7 -4.6 M 0 -11 L 0 -5 M 9 -9 L 7 -4.6" stroke="var(--gold-soft)" strokeWidth={0.6} />
          <Pearl x={0} y={-2.6} r={4.8} />
          <path className="m-twinkle" d={glint(5)} transform="translate(-2 -6)" fill="var(--art-core)" />
        </g>
      </g>

      {/* The cātaka, drinking the rain from the cloud */}
      <g {...part("cataka")}>
        <path d={CATAKA_REED} stroke="var(--leaf)" strokeWidth={2.2} strokeLinecap="round" />
        <path d="M 520 590 C 528 578 534 570 540 560" stroke="var(--leaf)" strokeWidth={1.6} strokeLinecap="round" />
        <g transform={`translate(${CATAKA.x} ${CATAKA.y})`}>
          <path d={CATAKA_TAIL} stroke="var(--gold)" strokeWidth={6.4} strokeLinecap="round" />
          <path d={CATAKA_TAIL} stroke="var(--art-hair)" strokeWidth={4.6} strokeLinecap="round" />
          <path d={CATAKA_BODY} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path d={CATAKA_BACK} fill="var(--art-hair)" />
          <path d="M 3.6 -14 C 4.6 -12 4.6 -10 3.8 -8.6" stroke="var(--art-ivory)" strokeWidth={1.4} strokeLinecap="round" />
          <path d={CATAKA_HEAD} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
          <path d={CATAKA_CREST} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
          <path d={CATAKA_BEAK} stroke="var(--art-hair)" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={-4} cy={-32} r={1} fill="var(--art-ivory)" />
          <path d="M -1 0 L -3 5 M 2 0 L 2 5" stroke="var(--art-hair)" strokeWidth={1} strokeLinecap="round" />
        </g>
        <path className="m-twinkle" d={`M ${DROP.x} ${DROP.y - 5} C ${DROP.x - 2.4} ${DROP.y - 1} ${DROP.x - 2.4} ${DROP.y + 2} ${DROP.x} ${DROP.y + 2.6} C ${DROP.x + 2.4} ${DROP.y + 2} ${DROP.x + 2.4} ${DROP.y - 1} ${DROP.x} ${DROP.y - 5} Z`} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.5} />
      </g>
    </svg>
  );
}
