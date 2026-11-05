/**
 * Shloka 46 — "Without a cause, without a master".
 *
 * Four removals, then two pairs that turn outward. Below the card her light
 * sits on the couch of the five Brahmās, so the god called the Lord, Īśvara,
 * is one of the legs under her seat. On the seat beside her stands a crystal
 * with a red hibiscus held up to it, and the crystal stays clear. Before the
 * couch a line of lamps runs out toward us, each lit from the one before, back
 * to her light, which nothing lit. At the right an elephant holds up the far
 * end of her noose in its trunk: the cord is red at its end and undyed at
 * hers, the red wearing off it on the way. Its rut has dried at the temple,
 * and the bees that drank it are leaving. In the crown the moon has no mark
 * on it. Which name each part answers to is written up for readers in the
 * registry, next to this artwork's entry.
 */

import {
  BrahmaCouch,
  Crystal,
  CrystalDefs,
  ELEPHANT_TRUNK,
  Elephant,
  ElephantDefs,
  Embers,
  Hibiscus,
  HibiscusGradient,
  Lamp,
  MoonDeer,
  artIds,
  cubicAt,
  glint,
  hibiscus,
  partProps,
  radiance,
  round,
} from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── Her light, on the couch of the five Brahmās ───────────────────────── */

const HER = { x: 266, y: 460 };
/** The couch is drawn at Shloka 22's size and brought up to this scale. */
const COUCH_K = 2;
const PLANK_Y = HER.y + 12 * COUCH_K;
const COUCH_FLOOR = 40;
const FLOOR_Y = round(PLANK_Y + COUCH_FLOOR * COUCH_K);
const RADIANCE = radiance({ cx: HER.x, cy: HER.y, from: 18, long: 360, short: 220 });
/** The stone dais the couch stands on. */
const DAIS = { x0: HER.x - 150, x1: HER.x + 150, h: 14 };

/* ── The crystal, and the flower held up to it ─────────────────────────── */

const CRYSTAL = { x: 196, k: 1.9 };
const CRYSTAL_Y = round(PLANK_Y - 22 * CRYSTAL.k);
const FLOWER = { x: 162, y: 446, k: 0.36 };
const HIBISCUS = hibiscus({ x: 0, y: 0 });

/* ── The lamps, each lit from the one before ───────────────────────────── */

const LAMPS = [
  { x: HER.x, y: FLOOR_Y + DAIS.h * 2 + 30, k: 2.2 },
  { x: 236, y: FLOOR_Y + DAIS.h * 2 + 58, k: 2.6 },
  { x: 204, y: FLOOR_Y + DAIS.h * 2 + 90, k: 3 },
  { x: 174, y: FLOOR_Y + DAIS.h * 2 + 126, k: 3.4 },
  { x: 148, y: FLOOR_Y + DAIS.h * 2 + 166, k: 3.8 },
  { x: 126, y: FLOOR_Y + DAIS.h * 2 + 210, k: 4.2 },
];
const flameTip = (l: (typeof LAMPS)[number]) => ({ x: l.x, y: round(l.y - 11.6 * l.k) });
/** The thread of flame passed from each light to the next, first from hers. */
const KINDLING = LAMPS.map((l, i) => {
  const from = i === 0 ? { x: HER.x, y: HER.y + 8 } : flameTip(LAMPS[i - 1]);
  const to = flameTip(l);
  return `M ${from.x} ${from.y} Q ${round((from.x + to.x) / 2)} ${round(Math.min(from.y, to.y) - 8)} ${to.x} ${to.y}`;
});

/* ── The elephant, and the far end of her noose ────────────────────────── */

const ELEPHANT = { x: 500, y: 650, k: 1.45 };
/** A point in the elephant's own frame (facing right) carried to the plate, where it faces left. */
const onElephant = (p: Pt) => ({ x: round(ELEPHANT.x - p.x * ELEPHANT.k), y: round(ELEPHANT.y + p.y * ELEPHANT.k) });
const LOOP = { ...onElephant({ x: 60, y: -124 }), r: 15 };
const CORD: [Pt, Pt, Pt, Pt] = [
  { x: LOOP.x - 4, y: LOOP.y + LOOP.r - 2 },
  { x: LOOP.x - 30, y: LOOP.y + 40 },
  { x: HER.x + 56, y: HER.y + 30 },
  { x: HER.x + 16, y: HER.y + 2 },
];
/** The cord in two halves: the red end the elephant holds, and her undyed end. */
function cordHalf(from: number, to: number) {
  const n = 24;
  return Array.from({ length: n + 1 }, (_, i) => {
    const p = cubicAt(...CORD, from + ((to - from) * i) / n);
    return `${i ? "L" : "M"} ${round(p.x)} ${round(p.y)}`;
  }).join(" ");
}
const CORD_RED = cordHalf(0, 0.5);
const CORD_PALE = cordHalf(0.5, 1);
const CORD_BEADS = [0.2, 0.38, 0.62, 0.8].map((t) => cubicAt(...CORD, t));
const TASSEL = { x: HER.x + 16, y: HER.y + 2 };
/** The red rubbed off the cord, drifting down. */
const FLECKS = [0.08, 0.16, 0.24, 0.32, 0.4, 0.46].map((t, i) => {
  const p = cubicAt(...CORD, t);
  return { x: round(p.x + (i % 2 ? 3 : -2)), y: round(p.y + 4), r: i % 3 ? 1.2 : 1.6, dx: i % 2 ? 8 : -6, dur: 9 + i * 1.3, delay: i * 1.7 };
});

/** The trace of rut on its temple, dried. */
const MADA = "M 37 -79 C 36 -72 34 -66 33 -59";
/** The bees that drank it, leaving, further apart as they go. */
const BEES = [
  { x: 444, y: 500, turn: -30 },
  { x: 462, y: 470, turn: -70 },
  { x: 488, y: 448, turn: -40 },
  { x: 506, y: 414, turn: -80 },
  { x: 532, y: 392, turn: -35 },
  { x: 544, y: 352, turn: -85 },
  { x: 566, y: 322, turn: -50 },
];
const BEE_PATH = `M 432 524 C 446 496 456 474 482 452 C 504 434 500 418 516 400 C 534 380 544 360 552 332 C 558 316 566 310 574 300`;

/* ── The moon, and the deer that was its mark ──────────────────────────── */

const MOON = { x: 452, y: 96, r: 50 };
const MOON_RINGS = [74, 98, 122, 146, 170];
const DEER = { x: 528, y: 34, k: 0.6, turn: -18 };

/** A single bee heading +x at the origin, drawn as the bees of Kāma's bowstring are. */
function Bee() {
  return (
    <>
      <ellipse cx={-0.8} cy={1.9} rx={1.7} ry={0.9} transform="rotate(-35 -0.8 1.9)" fill="var(--art-carve)" fillOpacity={0.85} stroke="var(--gold-soft)" strokeWidth={0.3} />
      <ellipse cx={-0.8} cy={-1.9} rx={1.7} ry={0.9} transform="rotate(35 -0.8 -1.9)" fill="var(--art-carve)" fillOpacity={0.85} stroke="var(--gold-soft)" strokeWidth={0.3} />
      <ellipse rx={2.6} ry={1.45} fill="var(--gold-soft)" />
      <circle cx={3.2} r={1.05} fill="var(--gold-soft)" />
      <path d="M -0.9 1.35 L -0.9 -1.35 M 0.7 1.35 L 0.7 -1.35" stroke="var(--art-carve)" strokeWidth={0.55} />
    </>
  );
}

export function OtherEndOfTheRope({ idPrefix = "sa46", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={300} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={HER.x} cy={HER.y} r={330} gradientUnits="userSpaceOnUse">
          <stop offset="0.05" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.16" style={{ stopColor: "var(--gold)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("cord")} x1={CORD[0].x} y1={0} x2={CORD[3].x} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="0.62" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.7 }} />
          <stop offset="0.8" style={{ stopColor: "var(--art-ivory)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-ivory)" }} />
        </linearGradient>
        <radialGradient id={id("moon-glow")} cx={MOON.x} cy={MOON.y} r={MOON.r + 46} gradientUnits="userSpaceOnUse">
          <stop offset="0.6" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("moon-limb")} cx={MOON.x} cy={MOON.y} r={MOON.r} gradientUnits="userSpaceOnUse">
          <stop offset="0.55" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.2 }} />
        </radialGradient>
        <radialGradient id={id("smudge")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("floor")} cx={HER.x} cy={FLOOR_Y} r={120} gradientUnits="userSpaceOnUse" gradientTransform={`translate(0 ${FLOOR_Y}) scale(1 0.16) translate(0 ${-FLOOR_Y})`}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <CrystalDefs id={id} />
        <HibiscusGradient h={HIBISCUS} id={id} />
        <ElephantDefs id={id} />
      </defs>

      {/* Her light, which nothing lit */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={300} fill={url("glow")} />
        <path className="m-shimmer" d={RADIANCE} stroke={url("radiance")} strokeWidth={0.7} />
      </g>

      {/* The moon, with no mark on it */}
      <g {...part("moon")}>
        <g className="m-shimmer">
          {MOON_RINGS.map((r, i) => (
            <circle key={r} cx={MOON.x} cy={MOON.y} r={r} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.45 - i * 0.09} />
          ))}
        </g>
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r + 46} fill={url("moon-glow")} />
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill="var(--art-moon)" />
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill={url("moon-limb")} />
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} stroke="var(--gold)" strokeWidth={1.6} />
      </g>

      {/* The deer that was the moon's mark, leaping away */}
      <g {...part("deer")}>
        <g transform={`translate(${DEER.x} ${DEER.y}) rotate(${DEER.turn}) scale(${DEER.k})`}>
          <MoonDeer smudge={url("smudge")} />
        </g>
      </g>

      {/* The couch: four gods for legs, the fifth its plank, and Īśvara under her */}
      <g {...part("couch")}>
        <ellipse cx={HER.x} cy={FLOOR_Y} rx={170} ry={22} fill={url("floor")} />
        <rect x={DAIS.x0} y={FLOOR_Y} width={DAIS.x1 - DAIS.x0} height={DAIS.h} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1} />
        <rect x={DAIS.x0 - 14} y={FLOOR_Y + DAIS.h} width={DAIS.x1 - DAIS.x0 + 28} height={DAIS.h - 2} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1} />
        <g fill="var(--sindura)" fillOpacity={0.55}>
          {Array.from({ length: 15 }, (_, i) => DAIS.x0 + 12 + i * 19.7).map((x) => (
            <path key={x} d={`M ${round(x)} ${FLOOR_Y + 4} h 8 l -4 7 z`} />
          ))}
        </g>
        <g transform={`translate(${HER.x} ${PLANK_Y}) scale(${COUCH_K})`}>
          <BrahmaCouch cx={0} plank={0} floor={COUCH_FLOOR} />
        </g>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={84} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={26} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.5} strokeDasharray="0.1 3.4" strokeLinecap="round" />
        <circle cx={HER.x} cy={HER.y} r={17} stroke="var(--gold)" strokeWidth={1.2} />
        <circle cx={HER.x} cy={HER.y} r={10} fill="var(--art-core)" />
      </g>

      {/* The lamps, each lit from the one before, back to her */}
      <g {...part("lamps")}>
        <g stroke="var(--art-core)" strokeWidth={1} strokeDasharray="0.1 3.2" strokeLinecap="round">
          {KINDLING.map((d, i) => (
            <path key={i} className={TWINKLE[i % 3]} d={d} />
          ))}
        </g>
        {LAMPS.map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) scale(${l.k})`}>
            <Lamp k={i % 3} />
          </g>
        ))}
      </g>

      {/* A crystal, and a red flower held up beside it that does not redden it */}
      <g {...part("crystal")}>
        <g transform={`translate(${CRYSTAL.x} ${CRYSTAL_Y}) scale(${CRYSTAL.k})`}>
          <Crystal x={0} y={0} url={url} />
        </g>
        <path d={`M ${FLOWER.x + 2} ${FLOWER.y + 6} C ${FLOWER.x + 4} ${FLOWER.y + 14} ${FLOWER.x + 6} ${PLANK_Y - 6} ${FLOWER.x + 10} ${PLANK_Y}`} stroke="var(--leaf)" strokeWidth={1.6} strokeLinecap="round" />
        <g transform={`translate(${FLOWER.x} ${FLOWER.y}) scale(${FLOWER.k})`}>
          <Hibiscus h={HIBISCUS} url={url} />
        </g>
      </g>

      {/* The elephant, its rut dried */}
      <g {...part("elephant")}>
        <ellipse cx={ELEPHANT.x} cy={ELEPHANT.y + 1} rx={96} ry={7} fill="var(--art-musk)" fillOpacity={0.14} />
        <g transform={`translate(${ELEPHANT.x} ${ELEPHANT.y}) scale(${-ELEPHANT.k} ${ELEPHANT.k})`}>
          <Elephant trunk={ELEPHANT_TRUNK.raised} url={url}>
            <path d={MADA} stroke="var(--art-musk)" strokeWidth={2.4} strokeOpacity={0.5} strokeLinecap="round" />
          </Elephant>
        </g>
      </g>

      {/* The bees that drank its rut, leaving; none go to her */}
      <g {...part("bees")}>
        <path d={BEE_PATH} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.5} strokeDasharray="1 4" />
        {BEES.map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.turn}) scale(1.5)`}>
            <g className={TWINKLE[i % 3]}>
              <Bee />
            </g>
          </g>
        ))}
      </g>

      {/* The far end of her noose, red, held in the trunk; the red wearing off */}
      <g {...part("noose")} strokeLinecap="round">
        <circle cx={LOOP.x} cy={LOOP.y} r={LOOP.r} stroke="var(--gold)" strokeWidth={6.4} strokeOpacity={0.6} />
        <circle cx={LOOP.x} cy={LOOP.y} r={LOOP.r} stroke="var(--art-vermilion)" strokeWidth={5} />
        <circle cx={LOOP.x} cy={LOOP.y} r={LOOP.r} stroke="var(--art-carve)" strokeWidth={1.1} strokeDasharray="1.2 3" />
        <path d={CORD_RED} stroke="var(--gold)" strokeWidth={6.4} strokeOpacity={0.6} />
        <path d={CORD_RED} stroke={url("cord")} strokeWidth={5} />
        <path d={CORD_RED} stroke="var(--art-carve)" strokeWidth={1.1} strokeDasharray="1.2 3" strokeOpacity={0.8} />
        <rect x={CORD[0].x - 6} y={CORD[0].y - 7} width={12} height={10} rx={2.4} fill="var(--gold)" />
        {CORD_BEADS.slice(0, 2).map((b, i) => (
          <circle key={i} cx={round(b.x)} cy={round(b.y)} r={3.4} fill="var(--gold)" />
        ))}
        <g fill="var(--art-vermilion)">
          <Embers embers={FLECKS} />
        </g>
      </g>

      {/* Her end of the cord, which the dye never reached */}
      <g {...part("undyed")} strokeLinecap="round">
        <path d={CORD_PALE} stroke="var(--gold)" strokeWidth={6.4} strokeOpacity={0.6} />
        <path d={CORD_PALE} stroke={url("cord")} strokeWidth={5} />
        <path d={CORD_PALE} stroke="var(--gold-soft)" strokeWidth={1.1} strokeDasharray="1.2 3" />
        {CORD_BEADS.slice(2).map((b, i) => (
          <circle key={i} cx={round(b.x)} cy={round(b.y)} r={3.4} fill="var(--gold)" />
        ))}
        <g fill="var(--gold)">
          <path d={`M ${TASSEL.x - 4} ${TASSEL.y + 1} Q ${TASSEL.x} ${TASSEL.y - 4} ${TASSEL.x + 4} ${TASSEL.y + 1} L ${TASSEL.x + 5.5} ${TASSEL.y + 8} L ${TASSEL.x - 5.5} ${TASSEL.y + 8} Z`} />
        </g>
        <g stroke="var(--gold)" strokeWidth={1.1}>
          {[-4, -2, 0, 2, 4].map((dx) => (
            <path key={dx} d={`M ${TASSEL.x + dx} ${TASSEL.y + 8} L ${round(TASSEL.x + dx * 1.6)} ${TASSEL.y + 24}`} />
          ))}
        </g>
        <path className="m-lick" d={glint(6)} transform={`translate(${TASSEL.x + 8} ${TASSEL.y - 6})`} fill="var(--art-core)" />
      </g>
    </svg>
  );
}
