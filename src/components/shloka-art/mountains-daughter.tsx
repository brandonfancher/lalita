/**
 * Shloka 60 — "The king of diagrams, and the mountain's daughter".
 *
 * The verse starts from very far away and comes close enough to see her
 * eyes, and so does the picture. Himavat stands over the whole plate, three
 * snow peaks in the crown and his flanks coming down both sides of the card,
 * with deodars on them and wild geese coming in over the snows: the world
 * that moves and the world that does not. At his foot, below the card, a
 * cave opens in the rock, and on its back wall stands the Śrīcakra, the house
 * she lives in, with her light at its bindu, red as a ruby, filling the cave.
 * Before its mouth, in a pool, two lotuses have opened. Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import {
  Goose,
  LotusLeaf,
  OpenLotus,
  RathaDefs,
  SRI_BINDU_V,
  SriCakraFace,
  artIds,
  hash,
  partProps,
  polyline,
  round,
  swingFrom,
  through,
} from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];
const CX = 320;

/* ── Himavat ───────────────────────────────────────────────────────────── */

/** Three snow peaks in the crown, the middle one highest, and the flanks down both sides of the card. */
const SKYLINE = through(
  [
    { x: -40, y: 720 },
    { x: 24, y: 610 },
    { x: 70, y: 480 },
    { x: 108, y: 366 },
    { x: 146, y: 256 },
    { x: 182, y: 166 },
    { x: 212, y: 120 },
    { x: 238, y: 138 },
    { x: 266, y: 104 },
    { x: 298, y: 60 },
    { x: 322, y: 34 },
    { x: 348, y: 62 },
    { x: 378, y: 102 },
    { x: 404, y: 114 },
    { x: 434, y: 88 },
    { x: 466, y: 64 },
    { x: 494, y: 96 },
    { x: 524, y: 156 },
    { x: 556, y: 256 },
    { x: 586, y: 366 },
    { x: 618, y: 480 },
    { x: 660, y: 610 },
    { x: 700, y: 720 },
  ],
  10,
);
const MOUNTAIN = `${polyline(SKYLINE)} L 700 830 L -40 830 Z`;
const SKYLINE_D = polyline(SKYLINE);
const PEAKS = [
  { x: 212, y: 120 },
  { x: 322, y: 34 },
  { x: 466, y: 64 },
];
/** The snow: everything above a wandering snowline, with tongues of it running down the gullies. */
const SNOWLINE = [
  { x: 140, y: 262 },
  { x: 156, y: 240 },
  { x: 166, y: 246 },
  { x: 178, y: 222 },
  { x: 188, y: 230 },
  { x: 196, y: 206 },
  { x: 203, y: 226 },
  { x: 209, y: 256 },
  { x: 215, y: 232 },
  { x: 226, y: 214 },
  { x: 238, y: 200 },
  { x: 246, y: 210 },
  { x: 258, y: 186 },
  { x: 270, y: 192 },
  { x: 281, y: 172 },
  { x: 290, y: 180 },
  { x: 296, y: 206 },
  { x: 302, y: 244 },
  { x: 308, y: 210 },
  { x: 316, y: 184 },
  { x: 326, y: 178 },
  { x: 336, y: 194 },
  { x: 346, y: 170 },
  { x: 356, y: 176 },
  { x: 368, y: 160 },
  { x: 382, y: 170 },
  { x: 394, y: 160 },
  { x: 406, y: 168 },
  { x: 418, y: 156 },
  { x: 426, y: 174 },
  { x: 431, y: 200 },
  { x: 436, y: 222 },
  { x: 441, y: 196 },
  { x: 450, y: 178 },
  { x: 462, y: 170 },
  { x: 472, y: 184 },
  { x: 484, y: 176 },
  { x: 498, y: 190 },
  { x: 508, y: 188 },
  { x: 520, y: 204 },
  { x: 532, y: 222 },
  { x: 544, y: 236 },
  { x: 562, y: 268 },
];
const SNOW = `${polyline(SNOWLINE)} L 562 0 L 140 0 Z`;
/** Ridges falling from each peak, and the shaded far side of each. */
const RIDGES = [
  "M 322 34 C 318 80 312 130 306 190",
  "M 212 120 C 206 150 196 180 186 214",
  "M 466 64 C 462 104 470 140 478 172",
  "M 404 114 C 398 140 392 160 388 176",
];
const SHADE = [
  "M 322 34 C 318 80 312 130 306 190 L 346 172 L 362 150 L 378 102 L 348 62 Z",
  "M 212 120 C 206 150 196 180 186 214 L 214 206 L 230 182 L 238 138 Z",
  "M 466 64 C 462 104 470 140 478 172 L 508 166 L 524 156 L 494 96 Z",
];
const STRATA = [
  "M 120 330 C 200 300 260 296 320 300 C 380 296 440 300 520 330",
  "M 98 400 C 170 372 250 366 320 370 C 390 366 470 372 542 400",
  "M 78 470 C 160 440 240 434 320 436 C 400 434 480 440 562 470",
];

/* ── Her house in the rock ─────────────────────────────────────────────── */

/** Two nearer foothills, one either side of the cave, that the deodars and the yak stand on. */
const FOOTHILLS = [
  "M -40 560 C 30 506 110 476 180 482 C 222 488 240 516 246 560 L 250 830 L -40 830 Z",
  "M 680 540 C 620 500 560 492 500 500 C 450 506 410 520 394 560 L 390 830 L 680 830 Z",
];
const FOOTHILL_RIDGES = [
  "M -40 560 C 30 506 110 476 180 482 C 222 488 240 516 246 560",
  "M 680 540 C 620 500 560 492 500 500 C 450 506 410 520 394 560",
];

const CAVE = "M 244 590 C 240 544 250 500 274 474 C 292 456 348 452 368 472 C 392 496 400 544 396 590 Z";
const CAVE_LIP = "M 232 594 C 226 540 238 492 266 462 C 290 440 350 436 376 460 C 404 486 414 540 408 594";
const YANTRA = { x: CX, y: 528, s: 0.86 };
const BINDU = { x: CX, y: round(YANTRA.y + SRI_BINDU_V * YANTRA.s) };

/* ── The pool at her door, and its lotuses ─────────────────────────────── */

const POOL = { x: CX, y: 614, rx: 136, ry: 17 };
const LOTUSES = [
  { x: 266, y: 612, s: 0.46 },
  { x: 376, y: 614, s: 0.46 },
];
const BUDS = [
  { x: 226, y: 620, h: 20, lean: -4 },
  { x: 418, y: 622, h: 18, lean: 4 },
  { x: 328, y: 624, h: 14, lean: 2 },
];
const PADS = [
  { x: 296, y: 622, s: 0.32, turn: -8 },
  { x: 350, y: 626, s: 0.28, turn: 10 },
  { x: 204, y: 616, s: 0.26, turn: 4 },
];

/* ── What moves on him and what does not ───────────────────────────────── */

/** A deodar: a straight trunk under tiers of drooping branches, widest near the foot. */
function deodar(x: number, foot: number, h: number) {
  const tiers = 6;
  return Array.from({ length: tiers }, (_, k) => {
    const t = k / (tiers - 1);
    const y = round(foot - h * (0.18 + t * 0.78));
    const w = round(h * (0.36 - t * 0.27));
    const drop = round(h * 0.07);
    return `M ${x} ${round(y - h * 0.14)} C ${round(x - w * 0.4)} ${round(y - h * 0.06)} ${round(x - w * 0.8)} ${y} ${x - w} ${y + drop} C ${round(x - w * 0.5)} ${y + round(drop * 0.4)} ${round(x + w * 0.5)} ${y + round(drop * 0.4)} ${x + w} ${y + drop} C ${round(x + w * 0.8)} ${y} ${round(x + w * 0.4)} ${round(y - h * 0.06)} ${x} ${round(y - h * 0.14)} Z`;
  }).join(" ");
}
const DEODARS = [
  { x: 128, foot: 488, h: 92 },
  { x: 182, foot: 490, h: 48 },
  { x: 150, foot: 540, h: 64 },
  { x: 514, foot: 504, h: 92 },
  { x: 552, foot: 538, h: 70 },
].map((d) => ({ ...d, d: deodar(d.x, d.foot, d.h) }));
/** A skein of wild geese crossing the sky beside the peaks, heading left. */
const SKEIN = Array.from({ length: 7 }, (_, i) => {
  const j = Math.ceil(i / 2);
  const side = i % 2 ? 1 : -1;
  return {
    x: 176 + j * 17,
    y: 72 + side * j * 9 - j * 5,
    up: (i + j) % 2 === 0,
  };
});

/* ── The yak on the foothill ──────────────────────────────────────────────── */

const YAK = { x: 470, y: 508, s: 1.1 };
/** Where its tail springs from, in plate units, for the swing. */
const TAIL_ROOT = {
  x: round(YAK.x + 24 * YAK.s),
  y: round(YAK.y - 29 * YAK.s),
};

/** Its shaggy skirt: a ragged hem of hair hanging nearly to the ground. */
const SKIRT = Array.from({ length: 13 }, (_, i) => {
  const x = round(-26 + i * 4.2);
  return `${x} ${i % 2 ? -4 - round(hash(i, 5) * 2) : -9}`;
}).join(" L ");

/**
 * A yak in profile facing left, feet at the origin: a great hump over the
 * shoulders, the head carried low, horns curving up, a skirt of hair to the
 * ground. Its face and chest catch the light from the cave.
 */
function Yak() {
  const body = `M 24 -30 C 14 -36 2 -38 -6 -42 C -14 -45 -22 -41 -27 -34 C -32 -33 -38 -30 -42 -25 C -45 -22 -46 -18 -44 -15 C -41 -13 -37 -14 -34 -16 C -31 -15 -29 -13 -27 -10 L ${SKIRT} L 28 -10 C 30 -16 30 -25 24 -30 Z`;
  return (
    <>
      {[-22, -17, 15, 20].map((x) => (
        <path key={x} d={`M ${x} -8 L ${x} -1`} stroke="var(--art-musk)" strokeWidth={3} />
      ))}
      {[-22, -17, 15, 20].map((x) => (
        <path key={x} d={`M ${x - 1.6} 0 L ${x + 1.6} 0`} stroke="var(--gold)" strokeWidth={1} />
      ))}
      <path d={body} fill="var(--art-musk)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
      <path d={body} fill="var(--gold)" fillOpacity={0.14} />
      <path
        d="M 8 -34 C 7 -26 9 -18 6 -8 M -2 -37 C -4 -28 -2 -18 -4 -7 M 18 -31 C 17 -24 19 -16 17 -9 M -14 -38 C -16 -30 -14 -20 -16 -8"
        stroke="var(--gold-soft)"
        strokeWidth={0.6}
        strokeOpacity={0.6}
      />
      <path
        d="M -6 -42 C -14 -45 -22 -41 -27 -34 C -32 -33 -38 -30 -42 -25 C -45 -22 -46 -18 -44 -15 M -34 -16 C -31 -15 -29 -13 -27 -10"
        stroke="var(--art-core)"
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <path
        d="M -33 -31 C -30 -36 -32 -41 -37 -43 M -29 -33 C -25 -38 -26 -42 -30 -45"
        stroke="var(--art-ivory)"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <circle cx={-38} cy={-24} r={1} fill="var(--art-core)" />
    </>
  );
}

/** The tail, from its root: a long white plume thrown up and back like a whisk. */
function YakTail() {
  return (
    <>
      <path
        d="M 0 0 C 4 -8 12 -16 22 -20 C 30 -23 38 -20 40 -14 C 36 -16 30 -15 26 -12 C 32 -11 36 -6 36 0 C 31 -5 25 -7 19 -6 C 23 -3 25 2 24 7 C 18 1 10 -1 2 3 Z"
        fill="var(--art-moon)"
        stroke="var(--gold)"
        strokeWidth={0.6}
        strokeLinejoin="round"
      />
      <path d="M 4 -2 C 12 -10 22 -16 34 -16 M 6 0 C 14 -5 22 -8 30 -6 M 6 2 C 12 0 18 0 21 3" stroke="var(--gold-soft)" strokeWidth={0.5} />
    </>
  );
}

export function MountainsDaughter({ idPrefix = "sa60", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);
  const yantra = `translate(${YANTRA.x} ${YANTRA.y}) scale(${YANTRA.s})`;

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <RathaDefs id={id} />
        <linearGradient id={id("face")} x1={0} y1={30} x2={0} y2={720} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.28 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.08 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("hill")} x1={0} y1={480} x2={0} y2={660} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--leaf)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--leaf)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("ridge")} x1={0} y1={480} x2={0} y2={600} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 1 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("ground-fade")} x1={0} y1={560} x2={0} y2={790} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity={1} />
          <stop offset="1" stopColor="white" stopOpacity={0} />
        </linearGradient>
        <mask id={id("ground")} maskUnits="userSpaceOnUse" x={-60} y={0} width={760} height={830}>
          <rect x={-60} y={0} width={760} height={830} fill={url("ground-fade")} />
        </mask>
        <clipPath id={id("rock")}>
          <path d={MOUNTAIN} />
        </clipPath>
        <radialGradient id={id("cave")} cx={BINDU.x} cy={BINDU.y} r={90} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.85 }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-crimson)", stopOpacity: 0.75 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.85 }} />
        </radialGradient>
        <radialGradient id={id("ruby")} cx={BINDU.x} cy={BINDU.y} r={170} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.12" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.55 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-crimson)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("water")} x1={0} y1={POOL.y - POOL.ry} x2={0} y2={POOL.y + POOL.ry} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.06 }} />
        </linearGradient>
        <radialGradient id={id("path")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Himavat, her father, the rock she is named from */}
      <g {...part("mountain")}>
        <g mask={url("ground")}>
          <path d={MOUNTAIN} fill="var(--art-stone)" />
          <path d={MOUNTAIN} fill={url("face")} />
          <g clipPath={url("rock")}>
            {SHADE.map((d, i) => (
              <path key={i} d={d} fill="var(--art-hair)" fillOpacity={0.1} />
            ))}
            <path d={SNOW} fill="var(--art-moon)" />
            <path d={polyline(SNOWLINE)} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.6} />
            {SHADE.map((d, i) => (
              <path key={i} d={d} fill="var(--art-hair)" fillOpacity={0.08} />
            ))}
            <path d={STRATA.join(" ")} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.5} />
          </g>
          <path d={RIDGES.join(" ")} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.6} strokeLinecap="round" />
          <path d={SKYLINE_D} stroke="var(--gold)" strokeWidth={1.5} strokeLinejoin="round" />
          {PEAKS.map((p, i) => (
            <circle key={i} className={TWINKLE[i]} cx={p.x} cy={p.y + 4} r={1.8} fill="var(--art-core)" />
          ))}
          <path d={CAVE_LIP} stroke="var(--gold)" strokeWidth={1.2} strokeOpacity={0.7} strokeLinecap="round" />
          {FOOTHILLS.map((d, i) => (
            <g key={i}>
              <path d={d} fill="var(--art-stone)" />
              <path d={d} fill={url("hill")} />
            </g>
          ))}
          <path d={FOOTHILL_RIDGES.join(" ")} stroke={url("ridge")} strokeWidth={1.1} strokeLinecap="round" />
        </g>
      </g>

      {/* What moves and what does not: the deodars on his flanks, and the geese coming in */}
      <g {...part("world")}>
        {DEODARS.map((t, i) => (
          <g key={i}>
            <path
              d={`M ${t.x} ${t.foot} L ${t.x} ${round(t.foot - t.h * 0.9)}`}
              stroke="var(--art-musk)"
              strokeWidth={round(t.h * 0.035)}
              strokeLinecap="round"
            />
            <path d={t.d} fill="var(--leaf)" fillOpacity={0.9} stroke="var(--gold)" strokeWidth={0.5} strokeOpacity={0.7} strokeLinejoin="round" />
          </g>
        ))}
        {SKEIN.map((g, i) => (
          <g key={i} transform={`translate(${g.x} ${g.y}) scale(1.05)`}>
            <Goose up={g.up} />
          </g>
        ))}
      </g>

      {/* The king of diagrams, her house, on the back wall of the cave */}
      <g {...part("cakra")}>
        <path d={CAVE} fill="var(--art-musk)" fillOpacity={0.5} />
        <path d={CAVE} fill={url("cave")} />
        <g transform={yantra} opacity={0.92}>
          <SriCakraFace url={url} />
        </g>
      </g>

      {/* The pool at her door, and the lotuses open in it */}
      <g {...part("lotuses")}>
        <ellipse cx={POOL.x} cy={POOL.y} rx={POOL.rx} ry={POOL.ry} fill="var(--art-stone)" />
        <ellipse cx={POOL.x} cy={POOL.y} rx={POOL.rx} ry={POOL.ry} fill={url("water")} stroke="var(--gold)" strokeWidth={1} />
        {PADS.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.turn}) scale(${p.s} ${round(p.s * 0.5)})`}>
            <LotusLeaf />
          </g>
        ))}
        {BUDS.map((b, i) => (
          <g key={i}>
            <path
              d={`M ${b.x} ${b.y} Q ${b.x + b.lean * 0.3} ${b.y - b.h * 0.5} ${b.x + b.lean} ${b.y - b.h}`}
              stroke="var(--leaf)"
              strokeWidth={1.1}
            />
            <path
              d={`M ${b.x + b.lean} ${b.y - b.h + 2} C ${b.x + b.lean - 5} ${b.y - b.h - 2} ${b.x + b.lean - 3} ${b.y - b.h - 9} ${b.x + b.lean} ${b.y - b.h - 13} C ${b.x + b.lean + 3} ${b.y - b.h - 9} ${b.x + b.lean + 5} ${b.y - b.h - 2} ${b.x + b.lean} ${b.y - b.h + 2} Z`}
              fill="var(--lotus)"
              stroke="var(--gold)"
              strokeWidth={0.5}
            />
          </g>
        ))}
        {LOTUSES.map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) scale(${l.s})`}>
            <OpenLotus shade="var(--art-crimson)" />
          </g>
        ))}
      </g>

      {/* Her light at the bindu, red as a ruby */}
      <g {...part("ruby")}>
        <circle className="m-shimmer" cx={BINDU.x} cy={BINDU.y} r={170} fill={url("ruby")} />
        <ellipse className="m-shimmer" cx={BINDU.x} cy={POOL.y + 2} rx={30} ry={8} fill={url("path")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={13} fill={url("bindu")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={3.2} fill="var(--art-core)" />
        <circle cx={BINDU.x} cy={BINDU.y} r={3.2} stroke="var(--art-crimson)" strokeWidth={0.9} />
      </g>

      {/* The yak on the ledge, fanning the king of mountains with its tail */}
      <g {...part("yak")}>
        <g transform={`translate(${YAK.x} ${YAK.y}) scale(${YAK.s})`}>
          <Yak />
        </g>
        <g className="m-sway" style={swingFrom(TAIL_ROOT)}>
          <g transform={`translate(${TAIL_ROOT.x} ${TAIL_ROOT.y}) scale(${YAK.s}) rotate(-24)`}>
            <YakTail />
          </g>
        </g>
      </g>
    </svg>
  );
}
