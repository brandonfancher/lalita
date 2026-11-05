/**
 * Shloka 49 — "No division, no death, no act".
 *
 * One rain falls on one peak in the crown, and runs off it as two rivers, a
 * white one and a dark one, each with its name written along it. They come
 * down either side of the card and enter one sea below it, where their names
 * break off and their colours are lost (Kaṭha 4.14–15, Chāndogya 6.10). Her
 * light hangs low over the sea, its reflection trembling in the water while
 * it does not move; the far sea round it lies without a ripple. Offering
 * lamps on leaf boats ride the dark river out past her, untaken, and on the
 * bank of the white one a ripe cucumber has come away from its stalk, as the
 * oldest prayer against death asks to. The cloud is the sea's own water come
 * back, and in it is the sky-flower. Which name each part answers to is
 * written up for readers in the registry, next to this artwork's entry.
 */

import { Lamp, WavePattern, along, artIds, partProps, polar, radiance, rainGroups, round, seaSurface, taper, through } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── Her light, low over the sea ──────────────────────────────────────── */

const HER = { x: 320, y: 450 };
/** The far edge of the sea. */
const HY = 500;
const RADIANCE = radiance({ cx: HER.x, cy: HER.y, from: 20, long: 128, short: 84 });

/* ── The peak, and the cloud and rain over it ─────────────────────────── */

const SKYLINE = through(
  [
    { x: 120, y: 214 },
    { x: 176, y: 184 },
    { x: 236, y: 150 },
    { x: 296, y: 116 },
    { x: 350, y: 82 },
    { x: 392, y: 60 },
    { x: 428, y: 74 },
    { x: 470, y: 102 },
    { x: 516, y: 140 },
    { x: 556, y: 178 },
    { x: 596, y: 214 },
  ],
  10,
);
const PEAK = `${SKYLINE.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ")} L 596 300 L 120 300 Z`;
/** Bands of rock across the upper face, each a short run of the skyline dropped and narrowed. */
const STRATA = [
  { dy: 26, from: 0.4, to: 0.56 },
  { dy: 44, from: 0.34, to: 0.48 },
  { dy: 40, from: 0.6, to: 0.74 },
].map(({ dy, from, to }) => {
  const pts = SKYLINE.slice(Math.round(from * (SKYLINE.length - 1)), Math.round(to * (SKYLINE.length - 1)));
  return pts.map((p, i) => `${i ? "L" : "M"} ${p.x} ${round(p.y + dy + 1.5 * Math.sin(i * 0.7))}`).join(" ");
});

const CLOUD = { x: 400, y: 50 };
/** The cloud's lobes, as circles whose union is its outline; its foot is cut flat. */
const LOBES = [
  { x: -78, y: -4, r: 14 },
  { x: -56, y: -14, r: 20 },
  { x: -26, y: -24, r: 26 },
  { x: 8, y: -28, r: 24 },
  { x: 38, y: -18, r: 21 },
  { x: 64, y: -8, r: 15 },
  { x: 84, y: -2, r: 10 },
];
const RAIN = rainGroups({ x: CLOUD.x - 76, y: CLOUD.y - 6, w: 150, h: 34, count: 42 });

/** The sky-flower (khapuṣpa): five petals in dotted outline, on no stalk. */
const SKY_FLOWER = { x: 282, y: 36, r: 12 };
const SKY_PETALS = Array.from({ length: 5 }, (_, k) => {
  const deg = 90 + k * 72;
  const tip = polar(SKY_FLOWER.x, SKY_FLOWER.y, SKY_FLOWER.r, deg);
  const a = polar(SKY_FLOWER.x, SKY_FLOWER.y, SKY_FLOWER.r * 0.55, deg - 30);
  const b = polar(SKY_FLOWER.x, SKY_FLOWER.y, SKY_FLOWER.r * 0.55, deg + 30);
  return `M ${SKY_FLOWER.x} ${SKY_FLOWER.y} Q ${a.x} ${a.y} ${tip.x} ${tip.y} Q ${b.x} ${b.y} ${SKY_FLOWER.x} ${SKY_FLOWER.y} Z`;
}).join(" ");

/* ── The two rivers ───────────────────────────────────────────────────── */

/** Each river leaves the summit as a rill, crosses the face, and meanders down beside the card to the sea. */
const WHITE = through(
  [
    { x: 384, y: 76 },
    { x: 360, y: 92 },
    { x: 334, y: 116 },
    { x: 296, y: 136 },
    { x: 252, y: 160 },
    { x: 206, y: 184 },
    { x: 166, y: 212 },
    { x: 140, y: 250 },
    { x: 128, y: 292 },
    { x: 146, y: 332 },
    { x: 128, y: 374 },
    { x: 146, y: 414 },
    { x: 178, y: 452 },
    { x: 212, y: 486 },
    { x: 238, y: 514 },
    { x: 250, y: 534 },
  ],
  10,
);
const DARK = through(
  [
    { x: 398, y: 76 },
    { x: 422, y: 96 },
    { x: 448, y: 120 },
    { x: 474, y: 146 },
    { x: 494, y: 180 },
    { x: 508, y: 220 },
    { x: 498, y: 262 },
    { x: 512, y: 302 },
    { x: 498, y: 342 },
    { x: 512, y: 382 },
    { x: 494, y: 422 },
    { x: 464, y: 458 },
    { x: 432, y: 490 },
    { x: 406, y: 516 },
    { x: 392, y: 536 },
  ],
  10,
);
/** Narrow at the summit, widening as it comes down, swelling and narrowing a little as rivers do, and opening at the mouth. */
const riverWidth = (t: number) => (1.6 + 21 * t ** 0.8) * (1 + 0.14 * Math.sin(t * 41)) + (18 * Math.max(0, t - 0.86)) / 0.14;
function riverShape(pts: { x: number; y: number }[]) {
  const n = pts.length - 1;
  const left: string[] = [];
  const right: string[] = [];
  pts.forEach((p, i) => {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(n, i + 1)];
    const l = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const w = riverWidth(i / n) / 2;
    const nx = -(b.y - a.y) / l;
    const ny = (b.x - a.x) / l;
    left.push(`${i ? "L" : "M"} ${round(p.x + nx * w)} ${round(p.y + ny * w)}`);
    right.push(`${i ? "L" : "M"} ${round(p.x - nx * w)} ${round(p.y - ny * w)}`);
  });
  return { body: taper(pts, riverWidth), banks: [left.join(" "), right.join(" ")] };
}
const RIVERS = [
  { pts: WHITE, fill: "var(--art-moon)", fillOpacity: 0.95, name: "गङ्गा", ink: "var(--sindura)" },
  { pts: DARK, fill: "var(--art-hair)", fillOpacity: 0.6, name: "यमुना", ink: "var(--art-ivory)" },
].map((r) => {
  const marks = along(r.pts, 1);
  const len = marks[marks.length - 1].s;
  const at = (f: number) => marks[Math.min(marks.length - 1, Math.round(f * len))];
  /** Where its name is written: along the side, then twice more toward the mouth, fading. */
  const names = [0.47, 0.64, 0.8].map((f, i) => ({ ...at(f), opacity: [0.95, 0.7, 0.3][i] }));
  return { ...r, ...riverShape(r.pts), names, mouth: r.pts[r.pts.length - 1] };
});
/** Rain on the summit runs off it every way: short rills that fade out, besides the two that become rivers. */
const RILLS = [
  "M 390 66 C 382 80 372 96 368 112",
  "M 392 64 C 394 82 392 102 386 120",
  "M 394 66 C 402 84 412 98 424 110",
  "M 388 70 C 372 78 352 84 334 98",
  "M 396 70 C 414 78 432 86 448 102",
];

/* ── The sea ──────────────────────────────────────────────────────────── */

const SEA = seaSurface({ cx: HER.x, horizon: HY, column: 9, half: 210 });
/** The far sea round her reflection, where no ripple runs: long level lines, closer toward the horizon. */
const CALM = [3, 7, 12, 18].map((dy, k) => {
  const half = 70 + k * 22;
  return `M ${HER.x - half} ${HY + dy} L ${HER.x - 14 - k * 2} ${HY + dy} M ${HER.x + 14 + k * 2} ${HY + dy} L ${HER.x + half} ${HY + dy}`;
});

/* ── Offering lamps on leaf boats, riding the dark river out ──────────── */

const DARK_MARKS = along(DARK, 1);
const DARK_LEN = DARK_MARKS[DARK_MARKS.length - 1].s;
const BOATS = [
  { ...DARK_MARKS[Math.round(DARK_LEN * 0.7)], k: 0.95 },
  { ...DARK_MARKS[Math.round(DARK_LEN * 0.84)], k: 1.1 },
  { x: 384, y: 556, angle: 130, s: 0, k: 1.3 },
  { x: 362, y: 594, angle: 120, s: 0, k: 1.5 },
];
const HULL = "M -13 -2 C -9 5 9 5 13 -2 C 7 0 -7 0 -13 -2 Z";

/* ── The cucumber vine on the bank of the white river ─────────────────── */

const VINE = through(
  [
    { x: 186, y: 404 },
    { x: 208, y: 422 },
    { x: 236, y: 432 },
    { x: 262, y: 446 },
    { x: 280, y: 470 },
  ],
  10,
);
/** Leaves on long stalks, by turns above and below the runner, tilted up off it (degrees from straight up). */
const VINE_LEAVES = [
  { at: 4, tilt: -40, stalk: 9, l: 17 },
  { at: 12, tilt: 30, stalk: 11, l: 19 },
  { at: 21, tilt: -20, stalk: 10, l: 18 },
  { at: 30, tilt: 44, stalk: 8, l: 15 },
];
/** A cucumber leaf, stalk at the origin, pointing up: five angular pointed lobes and a heart-shaped base. */
function cucumberLeaf(l: number) {
  const pt = (deg: number, r: number) => `${round(r * Math.sin((deg * Math.PI) / 180))} ${round(-r * Math.cos((deg * Math.PI) / 180))}`;
  const ring: [number, number][] = [
    [-118, 0.3],
    [-78, 0.68],
    [-58, 0.5],
    [-38, 0.9],
    [-18, 0.6],
    [0, 1],
    [18, 0.6],
    [38, 0.9],
    [58, 0.5],
    [78, 0.68],
    [118, 0.3],
  ];
  return {
    blade: `M 0 0 ${ring.map(([d, r]) => `L ${pt(d, r * l)}`).join(" ")} Z`,
    veins: [-78, -38, 0, 38, 78].map((d) => `M 0 0 L ${pt(d, l * 0.62)}`).join(" "),
  };
}
/** The ripe one lies on the bank below the stalk it came away from. */
const RIPE = { x: 262, y: 488, turn: -8 };
const STALK_END = { x: 262, y: 462 };
const YOUNG = { x: 222, y: 440 };
const FLOWER = { x: 242, y: 425 };

export function RiversToTheSea({ idPrefix = "sa49", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <WavePattern id={id("waves")} />
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={240} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={HER.x} cy={HER.y} r={130} gradientUnits="userSpaceOnUse">
          <stop offset="0.15" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.45" style={{ stopColor: "var(--gold)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("peak")} x1={0} y1={60} x2={0} y2={260} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-stone)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-stone)", stopOpacity: 0.4 }} />
        </linearGradient>
        <linearGradient id={id("peak-tint")} x1={0} y1={60} x2={0} y2={240} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.26 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.04 }} />
        </linearGradient>
        <clipPath id={id("peak-clip")}>
          <path d={PEAK} />
        </clipPath>
        <linearGradient id={id("peak-fade")} x1={0} y1={176} x2={0} y2={236} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <mask id={id("peak-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("peak-fade")} />
        </mask>
        <linearGradient id={id("rill")} x1={0} y1={62} x2={0} y2={122} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <mask id={id("rill-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("rill")} />
        </mask>
        <linearGradient id={id("rain")} x1={0} y1={CLOUD.y - 6} x2={0} y2={CLOUD.y + 76} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.7 }} />
          <stop offset="0.6" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("cloud-foot")} x1={0} y1={CLOUD.y - 30} x2={0} y2={CLOUD.y} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.3 }} />
        </linearGradient>
        <clipPath id={id("cloud-cut")}>
          <rect x={0} y={0} width={640} height={CLOUD.y} />
        </clipPath>
        <linearGradient id={id("mouth-fade")} x1={0} y1={462} x2={0} y2={536} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <mask id={id("mouth-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("mouth-fade")} />
        </mask>
        <radialGradient id={id("white-spread")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.95 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("dark-spread")}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.42 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("horizon")} x1={HER.x - 200} y1={0} x2={HER.x + 200} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.25" style={{ stopColor: "var(--gold)", stopOpacity: 0.9 }} />
          <stop offset="0.75" style={{ stopColor: "var(--gold)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("sea-fade")} x1={HER.x - 220} y1={0} x2={HER.x + 220} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={0} />
          <stop offset="0.25" stopColor="#fff" stopOpacity={1} />
          <stop offset="0.75" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <radialGradient id={id("calm-hole")} cx={HER.x} cy={HY} r={1} gradientUnits="userSpaceOnUse" gradientTransform={`translate(${HER.x} ${HY}) scale(170 34) translate(${-HER.x} ${-HY})`}>
          <stop offset="0.55" stopColor="#000" />
          <stop offset="1" stopColor="#000" stopOpacity={0} />
        </radialGradient>
        <mask id={id("sea-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("sea-fade")} />
          <rect width="640" height="830" fill={url("calm-hole")} />
        </mask>
        <linearGradient id={id("calm")} x1={0} y1={HY} x2={0} y2={HY + 22} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.32 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </linearGradient>
        <mask id={id("calm-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("sea-fade")} />
        </mask>
        <linearGradient id={id("column")} x1={0} y1={HY} x2={0} y2={720} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("ripe")} x1={-15} y1={-6} x2={15} y2={6} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)" }} />
        </linearGradient>
      </defs>

      {/* Her light, low over the sea, untroubled */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={240} fill={url("glow")} />
        <path className="m-shimmer" d={RADIANCE} stroke={url("radiance")} strokeWidth={0.6} />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={46} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={15} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={6.5} fill="var(--art-core)" />
      </g>

      {/* The one peak the rain falls on */}
      <g {...part("peak")}>
        <g mask={url("peak-mask")}>
          <path d={PEAK} fill={url("peak")} />
          <path d={PEAK} fill={url("peak-tint")} />
          <path d="M 392 60 C 398 110 408 170 426 240 L 600 240 L 600 60 Z" fill="var(--art-hair)" fillOpacity={0.1} clipPath={url("peak-clip")} />
        </g>
        <path d={SKYLINE.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ")} stroke="var(--gold)" strokeWidth={1.5} strokeLinejoin="round" />
        <g stroke="var(--art-carve)" strokeWidth={0.6} strokeOpacity={0.7}>
          {STRATA.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g mask={url("rill-mask")} strokeLinecap="round">
          {RILLS.map((d) => (
            <g key={d}>
              <path d={d} stroke="var(--gold)" strokeWidth={2.6} />
              <path d={d} stroke="var(--art-moon)" strokeWidth={1.3} />
            </g>
          ))}
        </g>
      </g>

      {/* The cloud, the sea's own water come back, and its rain */}
      <g {...part("cloud")}>
        {RAIN.map((d, i) => (
          <path key={i} className={i === 1 ? "m-shimmer" : undefined} d={d} stroke={url("rain")} strokeWidth={0.7} strokeLinecap="round" />
        ))}
        <g clipPath={url("cloud-cut")}>
          <g transform={`translate(${CLOUD.x} ${CLOUD.y})`}>
            {LOBES.map((l, i) => (
              <circle key={i} cx={l.x} cy={l.y} r={l.r} stroke="var(--gold)" strokeWidth={2.4} />
            ))}
            {LOBES.map((l, i) => (
              <circle key={i} cx={l.x} cy={l.y} r={l.r} fill="var(--art-moon)" />
            ))}
            <rect x={-94} y={-30} width={190} height={30} fill={url("cloud-foot")} />
            {LOBES.slice(1, 5).map((l, i) => (
              <path key={i} d={`M ${round(l.x - l.r * 0.6)} ${round(l.y - l.r * 0.35)} A ${round(l.r * 0.8)} ${round(l.r * 0.8)} 0 0 1 ${round(l.x + l.r * 0.5)} ${round(l.y - l.r * 0.55)}`} stroke="var(--gold-soft)" strokeWidth={0.7} />
            ))}
          </g>
        </g>
        <path d={`M ${CLOUD.x - 88} ${CLOUD.y} L ${CLOUD.x + 92} ${CLOUD.y}`} stroke="var(--gold)" strokeWidth={1.1} />
      </g>

      {/* The sky-flower, a word with nothing behind it */}
      <g {...part("sky-flower")}>
        <path d={SKY_PETALS} stroke="var(--gold)" strokeWidth={1.3} strokeDasharray="0.1 2.6" strokeLinecap="round" />
        <circle cx={SKY_FLOWER.x} cy={SKY_FLOWER.y} r={2.4} stroke="var(--sindura)" strokeWidth={1.1} strokeDasharray="0.1 2.4" strokeLinecap="round" />
      </g>

      {/* The one sea, with no seam in it */}
      <g {...part("sea")}>
        <path d={`M ${HER.x - 200} ${HY} H ${HER.x + 200}`} stroke={url("horizon")} strokeWidth={1.3} />
        <path d={SEA.ripples.join(" ")} mask={url("sea-mask")} stroke="var(--gold)" strokeWidth={0.9} strokeOpacity={0.6} strokeLinecap="round" />
      </g>

      {/* The far sea, still */}
      <g {...part("calm")}>
        <rect x={HER.x - 170} y={HY + 1} width={340} height={22} fill={url("calm")} mask={url("calm-mask")} />
        {CALM.map((d, k) => (
          <path key={k} d={d} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.85 - k * 0.14} />
        ))}
      </g>

      {/* Her light in the water, trembling while she does not */}
      <g {...part("reflection")}>
        <path d={`M ${HER.x - 8} ${HY} L ${HER.x + 8} ${HY} L ${HER.x + 70} 720 L ${HER.x - 70} 720 Z`} fill={url("column")} className="m-shimmer" />
        <g fill="var(--art-saffron)" fillOpacity={0.95}>
          <path className="m-twinkle" d={SEA.reflection[0]} />
          <path className="m-twinkle m-late" d={SEA.reflection[1]} />
          <path className="m-twinkle m-later" d={SEA.reflection[2]} fill="var(--art-core)" />
        </g>
      </g>

      {/* The two rivers off the one peak */}
      <g {...part("rivers")}>
        <g mask={url("mouth-mask")}>
          {RIVERS.map((r, i) => (
            <g key={r.name}>
              <path d={r.body} fill={r.fill} fillOpacity={r.fillOpacity} />
              <path d={r.body} fill={url("waves")} />
              <g stroke="var(--gold)" strokeLinejoin="round">
                {r.banks.map((d) => (
                  <path key={d} d={d} strokeWidth={1.1} />
                ))}
                <path d={r.banks[0]} transform={`translate(${i ? 3 : -3} 2)`} strokeWidth={0.5} strokeOpacity={0.5} />
                <path d={r.banks[1]} transform={`translate(${i ? -3 : 3} -2)`} strokeWidth={0.5} strokeOpacity={0.5} />
              </g>
            </g>
          ))}
        </g>
      </g>

      {/* Where they reach the sea: names broken off, colours lost */}
      <g {...part("mouths")}>
        <ellipse cx={RIVERS[0].mouth.x + 10} cy={RIVERS[0].mouth.y + 4} rx={70} ry={17} fill={url("white-spread")} />
        <ellipse cx={RIVERS[1].mouth.x - 10} cy={RIVERS[1].mouth.y + 4} rx={70} ry={17} fill={url("dark-spread")} />
        {RIVERS.map((r) =>
          r.names.map((n, i) => (
            <text
              key={`${r.name}-${i}`}
              transform={`translate(${n.x} ${n.y}) rotate(${round(n.angle > 90 ? n.angle - 180 : n.angle)})`}
              fontSize={12}
              textAnchor="middle"
              dominantBaseline="central"
              fill={r.ink}
              fillOpacity={n.opacity}
              style={{ fontFamily: "var(--font-tiro), serif" }}
            >
              {r.name}
            </text>
          )),
        )}
      </g>

      {/* The cucumber come away from its stalk */}
      <g {...part("vine")}>
        <path d={VINE.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ")} stroke="var(--leaf)" strokeWidth={1.6} strokeLinecap="round" />
        {VINE_LEAVES.map((v, i) => {
          const p = VINE[v.at];
          const leaf = cucumberLeaf(v.l);
          const t = (v.tilt * Math.PI) / 180;
          const end = { x: round(p.x + Math.sin(t) * v.stalk), y: round(p.y - Math.cos(t) * v.stalk) };
          return (
            <g key={i}>
              <path d={`M ${p.x} ${p.y} L ${end.x} ${end.y}`} stroke="var(--leaf)" strokeWidth={0.9} />
              <g transform={`translate(${end.x} ${end.y}) rotate(${v.tilt})`}>
                <path d={leaf.blade} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
                <path d={leaf.veins} stroke="var(--gold-soft)" strokeWidth={0.45} />
              </g>
            </g>
          );
        })}
        <path d={`M ${VINE[8].x} ${VINE[8].y} c 4 7 11 6 10 0 c -1 -4 -6 -3 -5 1`} stroke="var(--leaf)" strokeWidth={0.7} />
        <path d={`M ${VINE[26].x} ${VINE[26].y} c 6 3 9 10 4 12 c -4 1 -5 -4 -2 -5`} stroke="var(--leaf)" strokeWidth={0.7} />
        <g transform={`translate(${FLOWER.x} ${FLOWER.y})`}>
          {[0, 72, 144, 216, 288].map((d) => (
            <ellipse key={d} cx={0} cy={-3.6} rx={2.6} ry={3.8} transform={`rotate(${d})`} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.4} />
          ))}
          <circle r={1.4} fill="var(--art-saffron)" />
        </g>
        <path d={`M ${YOUNG.x} ${YOUNG.y - 6} L ${YOUNG.x} ${YOUNG.y}`} stroke="var(--leaf)" strokeWidth={0.8} />
        <path d={`M ${YOUNG.x - 3} ${YOUNG.y + 1} C ${YOUNG.x - 4} ${YOUNG.y + 8} ${YOUNG.x - 2} ${YOUNG.y + 16} ${YOUNG.x} ${YOUNG.y + 18} C ${YOUNG.x + 2} ${YOUNG.y + 16} ${YOUNG.x + 4} ${YOUNG.y + 8} ${YOUNG.x + 3} ${YOUNG.y + 1} Z`} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.4} />
        <path d={`M ${VINE[34].x} ${VINE[34].y} Q ${STALK_END.x + 6} ${STALK_END.y - 8} ${STALK_END.x} ${STALK_END.y}`} stroke="var(--leaf)" strokeWidth={1} strokeLinecap="round" />
        <circle cx={STALK_END.x} cy={STALK_END.y} r={1.3} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.4} />
        <g transform={`translate(${RIPE.x} ${RIPE.y}) rotate(${RIPE.turn})`}>
          <ellipse cx={0} cy={6} rx={21} ry={2.6} fill="var(--art-musk)" fillOpacity={0.2} />
          <path d="M -22 0 C -22 -5 -14 -6.5 0 -6.5 C 13 -6.5 22 -5 22 0 C 22 5 13 6.5 0 6.5 C -14 6.5 -22 5 -22 0 Z" fill={url("ripe")} stroke="var(--gold)" strokeWidth={0.7} />
          <path d="M -18 -3 C -6 -4.6 8 -4.6 19 -2.6 M -19 1 C -6 2 8 2 20 1 M -16 4 C -5 5 6 5 17 4" stroke="var(--art-carve)" strokeWidth={0.4} strokeOpacity={0.7} />
          <path d="M -19 -3.6 C -12 -5.6 -4 -5.8 4 -5.6" stroke="var(--art-ivory)" strokeWidth={0.8} strokeOpacity={0.7} strokeLinecap="round" />
          <circle cx={22} cy={0} r={1.5} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.4} />
        </g>
      </g>

      {/* Offering lamps on leaf boats, going on past her */}
      <g {...part("boats")}>
        {BOATS.map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${b.y}) scale(${b.k})`}>
            <path d="M -9 4 L 9 4" stroke="var(--art-saffron)" strokeWidth={0.8} strokeOpacity={0.6} strokeLinecap="round" className={TWINKLE[i % 3]} />
            <path d={HULL} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.5} />
            <circle cx={-6} cy={-2.4} r={2.1} fill="var(--art-vermilion)" />
            <circle cx={-6} cy={-2.4} r={0.7} fill="var(--art-saffron)" />
            <g transform="translate(3 -1.4) scale(0.9)">
              <Lamp k={i % 3} />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
