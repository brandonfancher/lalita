/**
 * Shloka 54 — "Seven great-names, from mortal sin to the great delight".
 *
 * A lake at night under the Milky Way. Her light stands on a white lotus in
 * the middle of the still water, and every stir in it spreads out from her,
 * since without her nothing so much as moves (Saundaryalaharī 1). Flowers
 * offered anywhere drift across the lake to her. At the right a tuft of reed
 * catches fire from her and is gone, as the Chāndogya says sins burn (5.24.3).
 * At the left a pair of cakravākas, the lovers parted every night, are
 * together. On the steps of the near bank nine vessels each hold her whole
 * light: one, seen as many. Over it all the Milky Way rises from the far shore
 * and arches through the sky, the only thing drawn big enough to stand for her
 * form. Which name each part answers to is written up for readers in the
 * registry, next to this artwork's entry.
 */

import { Cakravaka, OpenLotus, artIds, hash, partProps, polar, round, taper, through, tongue } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── Her light, on a white lotus ──────────────────────────────────────── */

const HER = { x: 320, y: 486 };
const LOTUS = { x: 320, y: 506, k: 0.8 };
/** Lotus pads round hers, clear of the birds and of her light on the water. */
const PADS = [
  { x: 258, y: 528, rx: 17, turn: 30 },
  { x: 386, y: 532, rx: 19, turn: 150 },
  { x: 236, y: 496, rx: 11, turn: 70 },
  { x: 408, y: 492, rx: 12, turn: 110 },
  { x: 286, y: 566, rx: 15, turn: 200 },
  { x: 360, y: 572, rx: 13, turn: 320 },
];

/* ── The lake ─────────────────────────────────────────────────────────── */

const FAR = 440;
const NEAR = 590;
/** The far shore, a low line of trees just under the card. */
const SHORE = `M 100 ${FAR} ${Array.from({ length: 23 }, (_, k) => {
  const x = 100 + k * 20;
  const h = 3 + 7 * hash(k, 51) + (k < 4 || k > 18 ? 4 : 0);
  return `Q ${x + 10} ${round(FAR - h * 2)} ${x + 20} ${FAR}`;
}).join(" ")} Z`;
/** Level lines across the water, closer toward the far bank. */
const WATER_LINES = [6, 14, 24, 37, 53, 72, 94, 120].map((dy, k) => {
  const y = FAR + dy;
  const gap = 30 + k * 6;
  return `M ${120 + k * 2} ${y} L ${HER.x - gap} ${y} M ${HER.x + gap} ${y} L ${520 - k * 2} ${y}`;
});
/** Her light on the water: a column of lozenges from the lotus to the near bank. */
const REFLECTION = [0, 1, 2].map((g) =>
  [526, 535, 545, 556, 568, 580]
    .map((y, k) => {
      const w = 5 + k * 1.8;
      const x0 = HER.x - w * (1 + 0.6 * hash(k, g + 4)) + (g - 1) * (5 + k);
      const h = 1.4 + k * 0.22;
      return (k + g) % 3 === 0 ? "" : `M ${round(x0)} ${y + g * 2} Q ${round(x0 + w)} ${round(y + g * 2 - h)} ${round(x0 + 2 * w)} ${y + g * 2} Q ${round(x0 + w)} ${round(y + g * 2 + h)} ${round(x0)} ${y + g * 2} Z`;
    })
    .join(" "),
);
/** Rings spreading out from her across the whole lake. */
const RIPPLE_C = { x: 320, y: 512 };
const RIPPLES = [42, 66, 94, 126, 162, 202, 246].map((rx, k) => ({ rx, ry: round(rx * 0.17), o: round(0.85 - k * 0.1) }));

/* ── The flowers and lamps drifting to her ────────────────────────────── */

/** Four lines of offered flowers, converging on her lotus from every shore. */
const DRIFTS = [
  { from: { x: 126, y: 454 }, n: 4 },
  { from: { x: 514, y: 458 }, n: 4 },
  { from: { x: 132, y: 582 }, n: 4 },
  { from: { x: 506, y: 584 }, n: 4 },
];
const FLOWERS = DRIFTS.flatMap(({ from, n }, j) =>
  Array.from({ length: n }, (_, k) => {
    const t = 0.1 + (k / n) * 0.64;
    const to = { x: LOTUS.x + (from.x < 320 ? -42 : 42), y: LOTUS.y + (from.y > 520 ? 12 : 0) };
    return {
      x: round(from.x + (to.x - from.x) * t),
      y: round(from.y + (to.y - from.y) * t),
      s: round(0.8 + 0.45 * ((from.y + (to.y - from.y) * t - FAR) / (NEAR - FAR))),
      kind: (j + k) % 3,
      g: (j + k) % 3,
    };
  }),
).filter((f) => !(f.x < 240 && f.y > 520 && f.y < 562) && !(f.x > 450 && f.y > 470));
const MARIGOLD = Array.from({ length: 10 }, (_, k) => polar(0, 0, 3.6, k * 36));
/** Leaf-cup lamps set afloat, among the flowers. */
const LAMPS = [
  { x: 166, y: 472, s: 1.2 },
  { x: 440, y: 476, s: 1.2 },
  { x: 432, y: 568, s: 1.45 },
];

/* ── The reed tuft, burning away ──────────────────────────────────────── */

const REED_BASE = NEAR + 2;
const REEDS = [
  { x0: 496, x1: 492, y1: 466 },
  { x0: 504, x1: 512, y1: 488 },
  { x0: 488, x1: 472, y1: 500 },
  { x0: 510, x1: 526, y1: 512 },
  { x0: 482, x1: 462, y1: 526 },
  { x0: 500, x1: 500, y1: 478 },
  { x0: 516, x1: 534, y1: 534 },
];
const BLADES = [
  { x: 494, y: 560, l: 26, d: -64 },
  { x: 502, y: 540, l: 22, d: 46 },
  { x: 490, y: 528, l: 18, d: -34 },
  { x: 512, y: 566, l: 20, d: 58 },
];
/** The plume of the tallest reed: fine wisps, the upper ones already alight. */
const PLUME = Array.from({ length: 14 }, (_, k) => {
  const deg = 64 + k * 4 + 10 * (hash(k, 61) - 0.5);
  const l = 14 + 8 * hash(k, 62);
  const a = polar(492, 468, 2, deg);
  const b = polar(492, 468, l, deg);
  return `M ${a.x} ${a.y} Q ${round((a.x + b.x) / 2 + 3)} ${round((a.y + b.y) / 2)} ${b.x} ${b.y}`;
});
/** The lesser plumes, still whole. */
const SEED_HEADS = [
  { x: 512, y: 488, deg: 70 },
  { x: 472, y: 500, deg: 110 },
  { x: 526, y: 512, deg: 60 },
];
const FLAMES = [
  { x: 487, y: 460, h: 22, w: 8, lean: -3 },
  { x: 495, y: 458, h: 32, w: 10, lean: 1 },
  { x: 502, y: 462, h: 18, w: 7, lean: 4 },
];
const ASH = Array.from({ length: 10 }, (_, k) => ({
  x: round(490 + 24 * (hash(k, 64) - 0.4)),
  y: round(420 + 22 * hash(k, 65)),
  r: round(0.8 + 0.8 * hash(k, 66)),
  g: k % 3,
}));

/* ── The cakravākas, together ─────────────────────────────────────────── */

const DUCKS = [
  { x: 160, y: 550, flip: false },
  { x: 226, y: 550, flip: true },
];

/* ── The vessels on the ghat steps ────────────────────────────────────── */

/** A wide-mouthed clay pot, base at the origin, about 38 wide and 30 to its rim. */
const POT = "M -11 -30 C -12 -27 -16 -25 -18 -19 C -21 -11 -16 -2 -9 0 L 9 0 C 16 -2 21 -11 18 -19 C 16 -25 12 -27 11 -30 Z";
/** A brass lota, base at the origin: round belly, short neck, flared lip. */
const LOTA_BELLY = "M -5 -25 C -13 -24 -17 -18 -16 -11 C -15 -4 -9 0 0 0 C 9 0 15 -4 16 -11 C 17 -18 13 -24 5 -25 Z";
const LOTA_NECK = "M -5 -25 L -4.4 -30 L 4.4 -30 L 5 -25 Z";
const STEP = { top: NEAR, row1: 612, lip: 618, row2: 670, lip2: 678 };
const VESSELS = [
  ...[152, 204, 256, 384, 436, 488].map((x) => ({ x, y: STEP.row1, k: 0.92, lota: false })),
  { x: 222, y: STEP.row2, k: 1.36, lota: true },
  { x: 418, y: STEP.row2, k: 1.36, lota: true },
  { x: 320, y: STEP.row2, k: 1.8, lota: false },
];
const SIVA_POT = VESSELS[VESSELS.length - 1];
/** The i-sign of शिव, drawn by hand so it can be lit: a stem left of श, hooked over it. */
const SIVA_I = "M -7.4 0 L -7.4 -10 C -7.4 -16 0 -17 2 -12";
/** Joints between the stones of the step faces. */
const JOINTS = Array.from({ length: 16 }, (_, k) => {
  const x = round(124 + k * 26 + 8 * hash(k, 81));
  return k % 2 ? `M ${x} ${STEP.lip + 1} L ${x} ${STEP.lip + 6}` : `M ${x} ${STEP.lip2 + 1} L ${x} ${STEP.lip2 + 8}`;
}).join(" ");

/* ── The Milky Way ────────────────────────────────────────────────────── */

const GALAXY = through(
  [
    { x: 552, y: FAR - 4 },
    { x: 546, y: 340 },
    { x: 530, y: 244 },
    { x: 504, y: 156 },
    { x: 466, y: 86 },
    { x: 420, y: 36 },
    { x: 366, y: -4 },
  ],
  10,
);
/** Broadening as it climbs from the horizon. */
const girth = (t: number) => 30 + 56 * t ** 0.7;
/** Soft-edged: the band is laid down as many faint widths, one over another. */
const BAND = Array.from({ length: 10 }, (_, k) => taper(GALAXY, (t) => girth(t) * (1.9 - k * 0.18)));
/** The dark rift down one side of it, in broken wisps. */
const RIFT = [
  [10, 24],
  [27, 44],
  [48, 57],
].flatMap(([a, b]) =>
  [1, 0.55].map((f) =>
    taper(
      GALAXY.slice(a, b).map((p, i) => ({ x: round(p.x - 8 - 4 * Math.sin((a + i) / 6)), y: round(p.y + 6) })),
      (t) => f * (2 + 9 * Math.sin(Math.PI * t)),
    ),
  ),
);
/** Star clouds, the brighter knots in it. */
const CLOUDS = [
  { i: 18, r: 24, o: 0.5 },
  { i: 31, r: 30, o: 0.6 },
  { i: 45, r: 58, o: 1 },
  { i: 45, r: 26, o: 0.9 },
].map(({ i, r, o }) => ({ x: round(GALAXY[i].x + 6), y: round(GALAXY[i].y - 4), r, o }));
const GALAXY_STARS = Array.from({ length: 360 }, (_, k) => {
  const i = 1 + Math.floor(hash(k, 71) * (GALAXY.length - 2));
  const p = GALAXY[i];
  const a = GALAXY[i - 1];
  const b = GALAXY[i + 1];
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const spread = (hash(k, 72) + hash(k, 73) + hash(k, 74) - 1.5) * girth(i / (GALAXY.length - 1)) * 0.8;
  return {
    x: round(p.x - ((b.y - a.y) / len) * spread),
    y: round(p.y + ((b.x - a.x) / len) * spread),
    r: round(0.4 + 0.95 * hash(k, 75) ** 3),
    g: k % 3,
  };
}).filter((s) => s.y < FAR - 6 && s.y > 0 && s.x > 104 && s.x < 600);
const CENTRE = CLOUDS[2];
/** The thick of it, at the galaxy's centre over the crown. */
const KNOT = Array.from({ length: 70 }, (_, k) => {
  const p = polar(CENTRE.x, CENTRE.y, 30 * (hash(k, 77) + hash(k, 78)) * 0.5 * (0.3 + hash(k, 79)), 360 * hash(k, 76));
  return { x: p.x, y: p.y, r: round(0.45 + 0.6 * hash(k, 80) ** 2), g: k % 3 };
});
const BRIGHT = GALAXY_STARS.filter((s) => s.r > 1.1);
/** Stars of the open sky, kept off the title and out from under the card. */
const FIELD = Array.from({ length: 140 }, (_, k) => ({
  x: round(104 + 470 * hash(k, 91)),
  y: round(4 + 430 * hash(k, 92)),
  r: round(0.4 + 0.7 * hash(k, 93) ** 2),
  g: k % 3,
})).filter((s) => !(s.x < 400 && s.y > 16 && s.y < 152) && !(s.x > 140 && s.x < 500 && s.y > 220) && !(s.x < 110 && s.y > 360));
/** The sky again, in the still water. */
const WATER_STARS = Array.from({ length: 22 }, (_, k) => ({
  x: round(128 + 384 * hash(k, 95)),
  y: round(FAR + 4 + 60 * hash(k, 96) ** 1.6),
  g: k % 3,
})).filter((s) => Math.abs(s.x - HER.x) > 60);

export function OneInManyPots({ idPrefix = "sa54", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={220} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("water")} x1={0} y1={FAR} x2={0} y2={NEAR} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.32 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.14 }} />
        </linearGradient>
        <linearGradient id={id("lake-fade")} x1={100} y1={0} x2={540} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={0} />
          <stop offset="0.1" stopColor="#fff" stopOpacity={1} />
          <stop offset="0.9" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <mask id={id("lake-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("lake-fade")} />
        </mask>
        <clipPath id={id("lake")}>
          <rect x={100} y={FAR} width={440} height={NEAR - FAR} />
        </clipPath>
        <radialGradient id={id("water-lit")} cx={HER.x} cy={RIPPLE_C.y} r={180} gradientUnits="userSpaceOnUse" gradientTransform={`translate(${HER.x} ${RIPPLE_C.y}) scale(1 0.4) translate(${-HER.x} ${-RIPPLE_C.y})`}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.42 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("bank")} x1={0} y1={NEAR} x2={0} y2={720} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.3 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("pot")} x1={-20} y1={0} x2={20} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.95 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)", stopOpacity: 0.95 }} />
        </linearGradient>
        <linearGradient id={id("brass")} x1={-16} y1={0} x2={16} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)" }} />
          <stop offset="0.38" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold)" }} />
        </linearGradient>
        <linearGradient id={id("galaxy")} x1={552} y1={FAR} x2={366} y2={-4} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.01 }} />
          <stop offset="0.5" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.045 }} />
          <stop offset="0.75" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.06 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("star-cloud")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.42 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-core)", stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("fire")} cx={495} cy={456} r={32} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The Milky Way, rising from the far shore and across the whole sky */}
      <g {...part("sky")}>
        {BAND.map((d, i) => (
          <path key={i} d={d} fill={url("galaxy")} />
        ))}
        {CLOUDS.map((c, i) => (
          <circle key={i} className={i === 2 ? "m-shimmer" : undefined} cx={c.x} cy={c.y} r={c.r} fill={url("star-cloud")} opacity={c.o} />
        ))}
        {RIFT.map((d, i) => (
          <path key={i} d={d} fill="var(--art-carve)" fillOpacity={0.17} />
        ))}
        <g fill="var(--gold-soft)">
          {GALAXY_STARS.map((s, i) => (
            <circle key={i} className={s.r > 0.9 ? TWINKLE[s.g] : undefined} cx={s.x} cy={s.y} r={s.r} />
          ))}
          {KNOT.map((s, i) => (
            <circle key={`k${i}`} className={s.r > 0.8 ? TWINKLE[s.g] : undefined} cx={s.x} cy={s.y} r={s.r} />
          ))}
          {FIELD.map((s, i) => (
            <circle key={`f${i}`} className={s.r > 0.8 ? TWINKLE[s.g] : undefined} cx={s.x} cy={s.y} r={s.r} fillOpacity={0.8} />
          ))}
        </g>
        <g>
          {WATER_STARS.map((s, i) => (
            <path key={i} className={TWINKLE[s.g]} d={`M ${s.x - 2.4} ${s.y} L ${s.x + 2.4} ${s.y}`} stroke="var(--gold-soft)" strokeWidth={0.8} strokeLinecap="round" />
          ))}
        </g>
        <g fill="var(--art-core)">
          {BRIGHT.map((s, i) => (
            <circle key={i} className={TWINKLE[(s.g + 1) % 3]} cx={s.x} cy={s.y} r={round(s.r * 0.6)} />
          ))}
        </g>
      </g>

      {/* The lake, and every stir in it spreading out from her */}
      <g {...part("ripples")}>
        <g mask={url("lake-mask")}>
          <path d={SHORE} fill="var(--art-hair)" fillOpacity={0.22} />
          <rect x={100} y={FAR} width={440} height={NEAR - FAR} fill={url("water")} />
          <rect x={100} y={FAR} width={440} height={NEAR - FAR} fill={url("water-lit")} />
          <path d={`M 100 ${FAR} L 540 ${FAR}`} stroke="var(--gold)" strokeWidth={1} />
          <g stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.55}>
            {WATER_LINES.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </g>
        <g fill="var(--art-saffron)" fillOpacity={0.9}>
          {REFLECTION.map((d, i) => (
            <path key={i} className={TWINKLE[i]} d={d} fill={i === 2 ? "var(--art-core)" : undefined} />
          ))}
        </g>
        <g clipPath={url("lake")} mask={url("lake-mask")}>
          {RIPPLES.map((r, i) => (
            <ellipse key={r.rx} className={i % 2 ? "m-shimmer" : undefined} cx={RIPPLE_C.x} cy={RIPPLE_C.y} rx={r.rx} ry={r.ry} stroke="var(--gold)" strokeWidth={0.9} strokeOpacity={r.o} />
          ))}
        </g>
      </g>

      {/* The white lotus she stands on, among its pads */}
      <g {...part("lotus")}>
        {PADS.map((p, i) => {
          const a = polar(p.x, p.y, p.rx, p.turn);
          return (
            <g key={i}>
              <ellipse cx={p.x} cy={p.y} rx={p.rx} ry={round(p.rx * 0.3)} fill="var(--leaf)" fillOpacity={0.6} stroke="var(--gold)" strokeWidth={0.5} />
              <path d={`M ${p.x} ${p.y} L ${a.x} ${round(p.y + (a.y - p.y) * 0.3)}`} stroke="var(--art-carve)" strokeWidth={1.4} strokeOpacity={0.6} />
            </g>
          );
        })}
        <g transform={`translate(${LOTUS.x} ${LOTUS.y}) scale(${LOTUS.k})`}>
          <OpenLotus fill="var(--art-ivory)" shade="var(--gold-soft)" />
        </g>
      </g>

      {/* Her light, standing on it */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={220} fill={url("glow")} />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={48} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={15} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={11} fill="var(--art-saffron)" fillOpacity={0.5} />
        <circle cx={HER.x} cy={HER.y} r={6.5} fill="var(--art-core)" />
      </g>

      {/* Flowers and lamps offered anywhere, drifting to her */}
      <g {...part("offerings")}>
        {FLOWERS.map((f, i) => (
          <g key={i} className={TWINKLE[f.g]} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
            <ellipse cx={0} cy={2.4} rx={7} ry={1.6} fill="var(--art-core)" fillOpacity={0.25} />
            {f.kind === 0 && (
              <>
                {MARIGOLD.map((p, j) => (
                  <circle key={j} cx={p.x} cy={round(p.y * 0.6)} r={2.4} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.3} />
                ))}
                <ellipse rx={2.6} ry={1.6} fill="var(--art-turmeric)" />
              </>
            )}
            {f.kind === 1 && (
              <>
                {[-50, 0, 50].map((d) => (
                  <ellipse key={d} cx={0} cy={-3} rx={1.8} ry={4} transform={`rotate(${d} 0 0)`} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.3} />
                ))}
                <circle r={1.2} fill="var(--art-turmeric)" />
              </>
            )}
            {f.kind === 2 && (
              <>
                {[-60, -20, 20, 60].map((d) => (
                  <path key={d} d="M 0 0 C -2.4 -2 -2 -6 0 -7.6 C 2 -6 2.4 -2 0 0 Z" transform={`rotate(${d})`} fill="var(--lotus)" stroke="var(--gold)" strokeWidth={0.3} />
                ))}
              </>
            )}
          </g>
        ))}
        {LAMPS.map((l, i) => (
          <g key={`l${i}`} transform={`translate(${l.x} ${l.y}) scale(${l.s})`}>
            <path d="M -8 4 L 8 4" stroke="var(--art-core)" strokeWidth={1.2} strokeOpacity={0.5} strokeLinecap="round" />
            <path d="M -9 -1 C -6 4 6 4 9 -1 C 4 0 -4 0 -9 -1 Z" fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.5} />
            <path className={i === 1 ? "m-flicker m-late" : "m-flicker"} d={tongue(8, 3, 0.4)} transform="translate(0 -0.5)" fill="var(--art-saffron)" />
            <path d={tongue(4, 1.4, 0.2)} transform="translate(0 -0.5)" fill="var(--art-core)" />
          </g>
        ))}
      </g>

      {/* The reed tuft, catching fire from her and gone */}
      <g {...part("reed")}>
        <circle cx={495} cy={456} r={32} fill={url("fire")} />
        {REEDS.map((r, i) => (
          <path key={i} d={`M ${r.x0} ${REED_BASE} Q ${round((r.x0 + r.x1) / 2 + 3)} ${round((REED_BASE + r.y1) / 2)} ${r.x1} ${r.y1}`} stroke="var(--leaf)" strokeWidth={i === 0 ? 2 : 1.4} strokeLinecap="round" />
        ))}
        {BLADES.map((b, i) => {
          const tip = polar(b.x, b.y, b.l, 90 + b.d);
          return <path key={i} d={`M ${b.x} ${b.y} Q ${round((b.x + tip.x) / 2 + 2)} ${round((b.y + tip.y) / 2 + 2)} ${tip.x} ${tip.y}`} stroke="var(--leaf)" strokeWidth={1.1} strokeLinecap="round" />;
        })}
        <g stroke="var(--gold-soft)" strokeWidth={0.7} strokeLinecap="round">
          {SEED_HEADS.flatMap((h, j) =>
            [-12, -4, 4, 12].map((d) => {
              const b = polar(h.x, h.y, 11, h.deg + d);
              return <path key={`${j}${d}`} d={`M ${h.x} ${h.y} L ${b.x} ${b.y}`} />;
            }),
          )}
        </g>
        <g stroke="var(--art-ivory)" strokeWidth={0.7} strokeLinecap="round" strokeOpacity={0.85}>
          {PLUME.slice(0, 7).map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g stroke="var(--art-ember)" strokeWidth={0.7} strokeLinecap="round" strokeOpacity={0.8}>
          {PLUME.slice(7).map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {FLAMES.map((f, i) => (
          <path key={i} className={i === 1 ? "m-flicker" : "m-flicker m-late"} d={tongue(f.h, f.w, f.lean)} transform={`translate(${f.x} ${f.y})`} fill={i === 1 ? "var(--art-saffron)" : "var(--art-vermilion)"} />
        ))}
        <path d={tongue(14, 4.6, 0.6)} transform="translate(495 459)" fill="var(--art-core)" />
        <g fill="var(--art-ember)">
          {ASH.map((a, i) => (
            <circle key={i} className={TWINKLE[a.g]} cx={a.x} cy={a.y} r={a.r} />
          ))}
        </g>
      </g>

      {/* The cakravākas, parted every night, together */}
      <g {...part("birds")}>
        {DUCKS.map((d, i) => (
          <g key={i} transform={`translate(${d.x} ${d.y}) scale(${d.flip ? -1.1 : 1.1} 1.1)`} strokeLinejoin="round">
            <Cakravaka />
          </g>
        ))}
        <path
          className="m-breathe"
          d="M 187 520 C 189 516 193 516 193 520 C 193 516 197 516 199 520 C 199 524 193 527 193 528 C 193 527 187 524 187 520 Z"
          fill="var(--art-vermilion)"
          fillOpacity={0.85}
        />
      </g>

      {/* The vessels on the ghat steps, each holding her whole light */}
      <g {...part("pots")}>
        <g mask={url("lake-mask")}>
          <path d={`M 100 ${STEP.top} L 540 ${STEP.top} L 540 720 L 100 720 Z`} fill={url("bank")} />
          <rect x={100} y={STEP.lip} width={440} height={6} fill="var(--art-carve)" fillOpacity={0.3} />
          <rect x={100} y={STEP.lip2} width={440} height={8} fill="var(--art-carve)" fillOpacity={0.3} />
          <g stroke="var(--gold)" strokeWidth={0.9}>
            <path d={`M 100 ${STEP.top} L 540 ${STEP.top}`} />
            <path d={`M 100 ${STEP.lip} L 540 ${STEP.lip} M 100 ${STEP.lip2} L 540 ${STEP.lip2}`} />
          </g>
          <path d={`M 100 ${STEP.lip + 6} L 540 ${STEP.lip + 6} M 100 ${STEP.lip2 + 8} L 540 ${STEP.lip2 + 8}`} stroke="var(--gold-soft)" strokeWidth={0.6} />
          <path d={JOINTS} stroke="var(--gold-soft)" strokeWidth={0.6} />
        </g>
        {VESSELS.map((v, i) => (
          <g key={i} transform={`translate(${v.x} ${v.y}) scale(${v.k})`} strokeLinejoin="round">
            <ellipse cx={0} cy={1} rx={20} ry={2.6} fill="var(--art-musk)" fillOpacity={0.2} />
            {v.lota ? (
              <>
                <path d={LOTA_BELLY} fill={url("brass")} stroke="var(--art-ember)" strokeWidth={0.7} />
                <path d={LOTA_NECK} fill="var(--gold)" stroke="var(--art-ember)" strokeWidth={0.6} />
                <path d="M -16 -13 C -8 -10.4 8 -10.4 16 -13 M -15.6 -9.4 C -8 -7 8 -7 15.6 -9.4" stroke="var(--art-ember)" strokeWidth={0.6} strokeOpacity={0.7} />
                <path d="M -10 -21 C -13 -17 -13.4 -12 -11.6 -8" stroke="var(--art-ivory)" strokeWidth={1.6} strokeOpacity={0.75} strokeLinecap="round" />
                <ellipse cx={0} cy={-31} rx={8} ry={2.4} fill="var(--art-turmeric)" stroke="var(--art-ember)" strokeWidth={0.6} />
                <ellipse cx={0} cy={-31} rx={5.6} ry={1.5} fill="var(--art-hair)" fillOpacity={0.75} />
                <circle className="m-breathe" cx={0} cy={-31} r={7} fill={url("bindu-glow")} />
                <circle cx={0} cy={-31} r={1.2} fill="var(--art-core)" />
              </>
            ) : (
              <>
                <path d={POT} fill={url("pot")} stroke="var(--gold)" strokeWidth={0.7} />
                <path d="M -17 -15 C -10 -12 10 -12 17 -15 M -18 -11 C -10 -8 10 -8 18 -11" stroke="var(--art-ivory)" strokeWidth={0.7} strokeOpacity={0.85} />
                <path d="M -12 -24 C -14 -20 -15 -15 -14 -10" stroke="var(--art-core)" strokeWidth={1.2} strokeOpacity={0.5} strokeLinecap="round" />
                <ellipse cx={0} cy={-30} rx={12} ry={3.6} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.7} />
                <ellipse cx={0} cy={-30} rx={9.6} ry={2.6} fill="var(--art-hair)" fillOpacity={0.7} />
                <circle className="m-breathe" cx={0} cy={-30} r={9} fill={url("bindu-glow")} />
                <circle cx={0} cy={-30} r={1.4} fill="var(--art-core)" />
              </>
            )}
          </g>
        ))}
      </g>

      {/* Painted on the nearest pot: शिव, its i-sign lit */}
      <g {...part("siva")}>
        <g transform={`translate(${SIVA_POT.x} ${round(SIVA_POT.y - 4.4 * SIVA_POT.k)}) scale(1.15)`}>
          <text x={3} y={0} textAnchor="middle" fontSize={15} fill="var(--art-hair)" style={{ fontFamily: "var(--font-tiro), serif" }}>
            शव
          </text>
          <circle className="m-breathe" cx={-4} cy={-9} r={10} fill={url("bindu-glow")} />
          <path d={SIVA_I} stroke="var(--art-core)" strokeWidth={3.6} strokeOpacity={0.35} strokeLinecap="round" />
          <path d={SIVA_I} stroke="var(--art-core)" strokeWidth={1.6} strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
