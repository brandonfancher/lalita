/**
 * Shloka 63 — "The fourth, and then the first of the five acts".
 *
 * The verse is a hinge between sleep and making, and the picture draws the
 * scene the Purāṇas hinge them on. In the one ocean of the night between
 * worlds, with no shore and no horizon, Viṣṇu sleeps on the coils of the
 * serpent, its hoods spread over him; the sleep that holds him is a veil of
 * night, and that sleep is she. From his navel a lotus rises, and on it
 * Brahmā's four faces are lit, and the fourteen worlds are let out of it, seven
 * rising and seven sinking. Apart from all of it, in the crown, her light is the half-measure
 * over ॐ that cannot be spoken, the fourth, and the three measures that are
 * the three states hang in a row below it and do not touch it. Which name
 * each part answers to is written up for readers in the registry, next to
 * this artwork's entry.
 */

import { BrahmaLotus, BrahmaLotusDefs, GanesaEmblem, Star, artIds, cubicAt, eggPath, glint, hash, litPart, partProps, round, taper, through } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];
const CX = 320;

/* ── The one ocean ─────────────────────────────────────────────────────── */

/** Where the coils float. There is no horizon: the water fades up into the night. */
const WATERLINE = 584;
/** Level lines, closer together as they go away, none of them a shore. */
const LEVELS = Array.from({ length: 16 }, (_, k) => {
  const t = k / 15;
  return { y: round(470 + 340 * t ** 1.55), o: round(0.14 + 0.46 * Math.sin(Math.PI * Math.min(t * 1.1, 1))), w: round(0.5 + 0.5 * t) };
});

/* ── The serpent's coils ───────────────────────────────────────────────── */

const T = 22;
const BANDS = [
  { y: 574, x0: 170, x1: 476 },
  { y: 552, x0: 182, x1: 476 },
  { y: 530, x0: 182, x1: 462 },
];
const R = T / 2;
/** One tube along the lowest coil, round each end and up into the neck. */
const BODY = [
  `M ${BANDS[0].x0} ${BANDS[0].y} H ${BANDS[0].x1}`,
  `A ${R} ${R} 0 0 0 ${BANDS[1].x1} ${BANDS[1].y}`,
  `H ${BANDS[1].x0}`,
  `A ${R} ${R} 0 0 1 ${BANDS[2].x0} ${BANDS[2].y}`,
  `H ${BANDS[2].x1}`,
  "C 486 530 500 512 498 490",
  "C 496 474 486 466 476 462",
].join(" ");
/** A sheen along the top of each straight run of the coil. */
const SHEEN = BANDS.map((b) => `M ${b.x0 + 8} ${b.y - 6} H ${b.x1 - 8}`).join(" ");
/** Scales along each run, small arcs facing the tail. */
const SCALES = BANDS.flatMap((b, i) =>
  [-1.5, 3.5].flatMap((dy, j) =>
    Array.from({ length: Math.floor((b.x1 - b.x0 - 18) / 10) }, (_, k) => {
      const x = round(b.x0 + 10 + k * 10 + ((i + j) % 2) * 5);
      return `M ${x} ${b.y + dy} q 3.5 3.8 7 0`;
    }),
  ),
).join(" ");
/** The pale belly where each run turns under. */
const BELLY = BANDS.map((b) => `M ${b.x0 + 6} ${b.y + 8} H ${b.x1 - 6}`).join(" ");
const TAIL_LINE = through(
  [
    { x: 174, y: 574 },
    { x: 148, y: 578 },
    { x: 126, y: 586 },
    { x: 116, y: 580 },
    { x: 118, y: 570 },
    { x: 130, y: 566 },
  ],
  10,
);
const TAIL = taper(TAIL_LINE, (t) => T * (1 - t) ** 0.85 + 0.8);

/** Seven hoods fanned from the neck, leaning over the sleeper's head. */
const HOOD_AT = { x: 474, y: 466 };
const HOOD_LEAN = -26;
const HOODS = [-63, -42, -21, 0, 21, 42, 63].map((deg, i) => ({ deg, i, l: round(58 - Math.abs(deg) * 0.12) }));
/** A cobra's hood from the side it faces us: broad shoulders, narrowing to a small head with a snout. */
const hoodShape = (l: number) =>
  [
    `M -6 0`,
    `C -18 ${round(-l * 0.3)} -20 ${round(-l * 0.64)} -11 ${round(-l * 0.82)}`,
    `C -8 ${round(-l * 0.88)} -6 ${round(-l * 0.9)} -5.4 ${round(-l * 0.95)}`,
    `C -5 ${round(-l * 1.06)} -2 ${round(-l * 1.12)} 0 ${round(-l * 1.12)}`,
    `C 2 ${round(-l * 1.12)} 5 ${round(-l * 1.06)} 5.4 ${round(-l * 0.95)}`,
    `C 6 ${round(-l * 0.9)} 8 ${round(-l * 0.88)} 11 ${round(-l * 0.82)}`,
    `C 20 ${round(-l * 0.64)} 18 ${round(-l * 0.3)} 6 0 Z`,
  ].join(" ");
/** The paler inside of the hood. */
const hoodFace = (l: number) =>
  `M -3 ${round(-l * 0.08)} C -12 ${round(-l * 0.32)} -13 ${round(-l * 0.62)} -7 ${round(-l * 0.76)} Q 0 ${round(-l * 0.84)} 7 ${round(-l * 0.76)} C 13 ${round(-l * 0.62)} 12 ${round(-l * 0.32)} 3 ${round(-l * 0.08)} Z`;
/** The spectacle mark on a cobra's hood. */
const hoodMark = (l: number) => {
  const y = round(-l * 0.56);
  return `M -7 ${y} q 3.5 -5 7 0 q 3.5 -5 7 0`;
};
const hoodEyes = (l: number) => [-2.4, 2.4].map((x) => ({ x, y: round(-l * 1.01) }));

/* ── The sleeper ───────────────────────────────────────────────────────── */

const SLEEPER = { x: 330, y: 511, rx: 112, ry: 13 };
const HEAD = { x: 438, y: 502 };
const NAVEL = { x: 330, y: 514 };
/** The veil of sleep over him, drawn up over his head under the hoods, its hem along the coil. */
const VEIL =
  "M 204 521 C 210 506 240 497 284 495 C 330 493 376 497 404 502 C 412 494 424 484 438 484 C 452 484 460 496 460 508 C 460 513 459 517 458 521 Z";
const VEIL_HEM =
  "M 206 518 C 212 505 242 497 284 495 C 330 493 376 497 404 502 C 412 494 424 484 438 484 C 452 484 460 496 460 508 C 460 512 459 515 458 518";
const VEIL_FOLDS = ["M 250 500 C 254 508 256 514 256 520", "M 306 495 C 304 504 304 512 306 520", "M 370 498 C 372 506 372 514 370 520"];
const VEIL_STARS = Array.from({ length: 26 }, (_, i) => {
  const x = round(216 + (i / 25) * 232 + (hash(i, 63) - 0.5) * 8);
  const top = x > 410 ? 488 + Math.abs(x - 438) * 0.5 : 504 - Math.sin(((x - 204) / 218) * Math.PI) * 9;
  return { x, y: round(top + 2 + hash(i, 5) * (520 - top - 4)), r: round(0.5 + hash(i, 9) * 0.7) };
});

/* ── The lotus from his navel, and Brahmā on it ────────────────────────── */

const LOTUS = { x: 290, y: 458 };
const STALK = taper(
  through(
    [
      NAVEL,
      { x: 330, y: 500 },
      { x: 316, y: 486 },
      { x: 296, y: 476 },
      { x: LOTUS.x, y: LOTUS.y + 3 },
    ],
    8,
  ),
  (t) => 4.4 - t * 1.4,
);
const STALK_LINE = "M 329 508 C 330 496 312 484 296 476";

/* ── The worlds let out ────────────────────────────────────────────────── */

/** Seven worlds above, rising past the card on the left; seven below, sinking into the water on the right. */
const ARCS = [
  [
    { x: 256, y: 440 },
    { x: 136, y: 450 },
    { x: 106, y: 436 },
    { x: 128, y: 168 },
  ],
  [
    { x: 344, y: 604 },
    { x: 404, y: 646 },
    { x: 470, y: 664 },
    { x: 500, y: 694 },
  ],
] as const;
const EGGS = ARCS.flatMap((arc, side) =>
  Array.from({ length: 7 }, (_, k) => {
    const t = 0.1 + k * 0.15;
    const p = cubicAt(arc[0], arc[1], arc[2], arc[3], t);
    const h = round(5.5 + k * 1.8);
    return { x: round(p.x), y: round(p.y), h, w: round(h * 0.78), k, side, tilt: round((side ? 1 : -1) * (8 - k * 2.4)) };
  }),
);

/* ── The fourth, and the three measures ────────────────────────────────── */

const FOURTH = { x: 482, y: 96 };
const CRESCENT = { x: FOURTH.x, y: FOURTH.y + 10, r: 24 };
const MEASURES = [
  { x: 286, y: 160, letter: "अ" },
  { x: 342, y: 167, letter: "उ" },
  { x: 398, y: 160, letter: "म" },
];
/** The string they hang on, tied off at both ends, nowhere near her. */
const STRING = "M 254 150 Q 342 182 430 150";

/* ── The night ─────────────────────────────────────────────────────────── */

const STARS = [
  { x: 118, y: 412, s: 3 },
  { x: 170, y: 448, s: 2.2 },
  { x: 136, y: 120, s: 2.6 },
  { x: 214, y: 44, s: 3 },
  { x: 300, y: 24, s: 2.2 },
  { x: 392, y: 46, s: 2.8 },
  { x: 572, y: 62, s: 2.6 },
  { x: 556, y: 178, s: 3 },
  { x: 540, y: 446, s: 2.4 },
  { x: 154, y: 476, s: 1.8 },
  { x: 446, y: 30, s: 2 },
  { x: 586, y: 300, s: 2.2 },
];
/** The fainter stars, scattered over the whole night sky. */
const DUST = Array.from({ length: 90 }, (_, i) => {
  const x = round(70 + hash(i, 631) * 520);
  const y = round(14 + hash(i, 632) * 440);
  return { x, y, r: round(0.5 + hash(i, 633) * 0.8), g: i % 3 };
}).filter((d) => Math.hypot(d.x - FOURTH.x, d.y - FOURTH.y) > 60 && !(d.y > 470 && d.x > 150 && d.x < 500));

/* ── The banyan leaf ───────────────────────────────────────────────────── */

const LEAF = { x: 196, y: 628 };
const BANYAN = "M -22 0 C -16 -9 0 -12 12 -9 C 19 -7 24 -3 26 0 C 24 3 19 7 12 9 C 0 12 -16 9 -22 0 Z";
const BANYAN_VEINS = "M -22 0 H 24 M -10 0 L -4 -8 M -10 0 L -4 8 M 2 0 L 8 -8 M 2 0 L 8 8 M 12 0 L 16 -6 M 12 0 L 16 6";

export function OceanOfSleep({ idPrefix = "sa63", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <linearGradient id={id("water")} x1={0} y1={420} x2={0} y2={820} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.18 }} />
          <stop offset="0.72" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.42 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("sea-fade")} x1={0} y1={0} x2={640} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={0} />
          <stop offset="0.2" stopColor="#fff" stopOpacity={1} />
          <stop offset="0.8" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <mask id={id("sea")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={830} fill={url("sea-fade")} />
        </mask>
        <radialGradient id={id("within")} cx={CX} cy={690} r={260} gradientUnits="userSpaceOnUse" gradientTransform="translate(0 690) scale(1 0.4) translate(0 -690)">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.7 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-core)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("level-fade")} x1={30} y1={0} x2={610} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={0} />
          <stop offset="0.22" stopColor="#fff" stopOpacity={1} />
          <stop offset="0.78" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <mask id={id("levels")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={830} fill={url("level-fade")} />
        </mask>
        <linearGradient id={id("echo-fade")} x1={0} y1={WATERLINE} x2={0} y2={WATERLINE + 70} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={0.5} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <mask id={id("echo")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect x={0} y={WATERLINE} width={640} height={80} fill={url("echo-fade")} />
        </mask>
        <radialGradient id={id("sleeper")}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.75 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.32 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-core)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <BrahmaLotusDefs id={id} />
        <clipPath id={id("above-water")}>
          <rect x={0} y={0} width={640} height={WATERLINE} />
        </clipPath>
      </defs>

      {/* The one ocean: everything become one water, a mass of knowing lit from within */}
      <g {...part("ocean")}>
        <rect x={0} y={420} width={640} height={410} fill={url("water")} mask={url("sea")} />
        <ellipse className="m-shimmer" cx={CX} cy={690} rx={260} ry={104} fill={url("within")} />
        <g mask={url("levels")} stroke="var(--gold-soft)" strokeLinecap="round">
          {LEVELS.map((l, k) => (
            <path key={k} d={`M 30 ${l.y} H 610`} strokeWidth={l.w} strokeOpacity={l.o} />
          ))}
        </g>
        <g mask={url("echo")}>
          <path d={BODY} transform={`translate(0 ${2 * WATERLINE}) scale(1 -1)`} stroke="var(--art-moon)" strokeWidth={T} strokeLinecap="round" strokeOpacity={0.5} />
        </g>
        <g stroke="var(--gold-soft)" strokeWidth={0.8}>
          <ellipse cx={322} cy={WATERLINE + 3} rx={176} ry={7} strokeOpacity={0.6} />
          <ellipse cx={322} cy={WATERLINE + 6} rx={214} ry={12} strokeOpacity={0.32} />
        </g>
      </g>

      {/* The night between worlds, and the sleep that is she, laid over the sleeper */}
      <g {...part("sleep")}>
        <g fill="var(--gold-soft)">
          {DUST.map((d, i) => (
            <circle key={i} className={TWINKLE[d.g]} cx={d.x} cy={d.y} r={d.r} fillOpacity={0.8} />
          ))}
        </g>
        {STARS.map((s, i) => (
          <Star key={i} x={s.x} y={s.y} s={s.s} className={TWINKLE[i % 3]} />
        ))}
        <path d={VEIL} fill="var(--art-hair)" fillOpacity={0.62} />
        <path d={VEIL_FOLDS.join(" ")} stroke="var(--art-hair)" strokeWidth={2.4} strokeOpacity={0.4} strokeLinecap="round" />
        <g fill="var(--gold-soft)">
          {VEIL_STARS.map((s, i) => (
            <circle key={i} className={TWINKLE[i % 3]} cx={s.x} cy={s.y} r={s.r} />
          ))}
        </g>
        <path d={VEIL_HEM} stroke="var(--gold)" strokeWidth={1} />
        <path d={VEIL_HEM} transform="translate(0 3.4)" stroke="var(--gold-soft)" strokeWidth={0.8} strokeDasharray="2 2.4" />
      </g>

      {/* Śeṣa, coiled as a bed, his hoods spread over the sleeper: guarding and hiding */}
      <g {...part("guard")}>
        <g clipPath={url("above-water")}>
          <path d={TAIL} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.1} strokeLinejoin="round" />
          <path d={TAIL} fill="var(--art-hair)" fillOpacity={0.16} />
          <path d={BODY} stroke="var(--gold)" strokeWidth={T + 2.6} strokeLinecap="round" />
          <path d={BODY} stroke="var(--art-moon)" strokeWidth={T} strokeLinecap="round" />
          <path d={BODY} stroke="var(--art-hair)" strokeWidth={T} strokeOpacity={0.16} strokeLinecap="round" />
          <path d={BELLY} stroke="var(--art-turmeric)" strokeWidth={3} strokeOpacity={0.55} strokeLinecap="round" />
          <path d={SCALES} stroke="var(--gold-soft)" strokeWidth={0.75} />
          <path d={SHEEN} stroke="var(--art-ivory)" strokeWidth={2.6} strokeOpacity={0.8} strokeLinecap="round" />
          {BANDS.slice(1).map((b) => (
            <path key={b.y} d={`M ${b.x0 + 4} ${b.y + R - 0.4} H ${b.x1 - 4}`} stroke="var(--art-hair)" strokeWidth={1.6} strokeOpacity={0.4} />
          ))}
        </g>
        <g transform={`translate(${HOOD_AT.x} ${HOOD_AT.y}) rotate(${HOOD_LEAN})`}>
          {[...HOODS]
            .sort((a, b) => Math.abs(b.deg) - Math.abs(a.deg))
            .map(({ deg, l, i }) => (
              <g key={deg} transform={`rotate(${deg}) translate(0 -6)`}>
                <path d={hoodShape(l)} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.1} strokeLinejoin="round" />
                <path d={hoodShape(l)} fill="var(--art-hair)" fillOpacity={0.3} />
                <path d={hoodFace(l)} fill="var(--art-ivory)" fillOpacity={0.9} />
                <path d={hoodMark(l)} stroke="var(--art-hair)" strokeWidth={1.3} strokeOpacity={0.65} strokeLinecap="round" />
                {hoodEyes(l).map((e) => (
                  <circle key={e.x} cx={e.x} cy={e.y} r={0.9} fill="var(--art-hair)" />
                ))}
                <circle className={TWINKLE[i % 3]} cy={round(-l * 0.34)} r={2.8} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.6} />
              </g>
            ))}
        </g>
      </g>

      {/* Govinda asleep on the coils, his conch and discus set down beside him */}
      <g {...part("govinda")}>
        <ellipse className="m-breathe" cx={SLEEPER.x} cy={SLEEPER.y} rx={SLEEPER.rx} ry={SLEEPER.ry} fill={url("sleeper")} />
        <circle className="m-breathe" cx={HEAD.x} cy={HEAD.y} r={22} fill={url("sleeper")} />
        <g transform="translate(196 504) scale(1.4)">
          <GanesaEmblem name="conch" />
        </g>
        <g transform="translate(184 482) scale(1.3)">
          <GanesaEmblem name="discus" />
        </g>
      </g>

      {/* The lotus from his navel, and Brahmā's four faces lit on it */}
      <g {...part("brahma")}>
        <path d={STALK} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.5} />
        <path d={STALK_LINE} stroke="var(--gold-soft)" strokeWidth={0.6} />
        <circle cx={NAVEL.x} cy={NAVEL.y - 1} r={2.8} fill="var(--gold)" />
        <g transform={`translate(${LOTUS.x} ${LOTUS.y})`}>
          <BrahmaLotus url={url} />
        </g>
      </g>

      {/* The worlds let out, rising in two arcs */}
      <g {...part("worlds")}>
        {EGGS.map((e, i) => (
          <g key={i} transform={`rotate(${e.tilt} ${e.x} ${e.y})`} opacity={e.side ? 0.78 : 1}>
            <path d={eggPath(e.x, e.y, e.w, e.h)} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={round(0.8 + e.k * 0.1)} />
            <path d={eggPath(e.x, e.y, e.w, e.h)} fill={e.side ? "var(--art-hair)" : "var(--art-saffron)"} fillOpacity={e.side ? 0.2 : 0.18} />
            <path className={TWINKLE[(i + e.side) % 3]} d={glint(round(e.h * 0.42))} transform={`translate(${e.x} ${round(e.y + e.h * 0.1)})`} fill="var(--art-saffron)" />
          </g>
        ))}
      </g>

      {/* The three measures, a u m, which are the three states, on a string of their own */}
      <g {...part("measures")}>
        <path d={STRING} stroke="var(--gold)" strokeWidth={0.9} strokeOpacity={0.8} />
        {[254, 430].map((x) => (
          <circle key={x} cx={x} cy={150} r={2.2} fill="var(--gold)" />
        ))}
        {MEASURES.map((m) => (
          <g key={m.letter}>
            <circle cx={m.x} cy={m.y} r={13.5} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.2} />
            <circle cx={m.x} cy={m.y} r={10.6} stroke="var(--gold-soft)" strokeWidth={0.6} />
            <text
              x={m.x}
              y={m.y + 1}
              fontSize={16}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--sindura)"
              style={{ fontFamily: "var(--font-tiro), serif" }}
            >
              {m.letter}
            </text>
          </g>
        ))}
      </g>

      {/* Her light, the fourth: the half-measure over the syllable, which is never sounded */}
      <g {...part("fourth")}>
        <circle className="m-shimmer" cx={FOURTH.x} cy={FOURTH.y + 4} r={84} fill={url("glow")} />
        <circle cx={FOURTH.x} cy={FOURTH.y + 4} r={48} stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.7} />
        <path
          d={litPart(4, CRESCENT.r)}
          transform={`translate(${CRESCENT.x} ${CRESCENT.y}) rotate(180) scale(1.12)`}
          stroke="var(--art-moon)"
          strokeWidth={3}
          strokeOpacity={0.45}
        />
        <path d={litPart(4, CRESCENT.r)} transform={`translate(${CRESCENT.x} ${CRESCENT.y}) rotate(180)`} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.4} />
        <circle cx={FOURTH.x} cy={FOURTH.y} r={12} stroke="var(--art-core)" strokeWidth={1} strokeOpacity={0.85} />
        <circle cx={FOURTH.x} cy={FOURTH.y} r={7.4} fill="var(--art-saffron)" />
        <circle cx={FOURTH.x} cy={FOURTH.y} r={4.6} fill="var(--art-core)" />
      </g>

      {/* The infant on the banyan leaf, the same sleeper in another telling */}
      <g {...part("banyan")}>
        <ellipse cx={LEAF.x + 2} cy={LEAF.y + 3} rx={38} ry={5} fill="var(--art-core)" fillOpacity={0.3} />
        <g transform={`translate(${LEAF.x} ${LEAF.y}) rotate(8) scale(1.32 0.7)`}>
          <path d={BANYAN} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={1} />
          <path d={BANYAN_VEINS} stroke="var(--gold-soft)" strokeWidth={0.7} />
        </g>
        <circle cx={LEAF.x - 2} cy={LEAF.y - 4} r={9} fill={url("sleeper")} />
        <circle className="m-breathe" cx={LEAF.x - 2} cy={LEAF.y - 4} r={2.8} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.6} />
      </g>
    </svg>
  );
}
