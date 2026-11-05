/**
 * Shloka 62 — "Meditation, the meditator, and the thing meditated on".
 *
 * The Māṇḍūkya says the dreamer has the same seven limbs and nineteen mouths
 * as the waker, turned inward, and the picture takes that literally: the
 * waking world stands along a far bank under the sun, and the dream is the
 * same world turned over in the water, with no sun in it, lit from within.
 * On the water between them floats a lamp in a windless place, its flame
 * rising toward the one world and its reflection going down into the other,
 * one light; beside it a lotus leaf that the water stands on in beads. Which
 * name each part answers to is written up for readers in the registry, next
 * to this artwork's entry.
 */

import { Horse, LotusLeaf, StillLamp, artIds, hash, partProps, polyline, round, sunRays, through } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];
const CX = 320;
/** The far bank, where the world meets the water, and the line it is turned over on. */
const WL = 526;
/** The world is drawn with its bank at y 506 and brought up to this scale on the plate's bank. */
const W0 = 506;
const WS = 1.25;
const FRIEZE = `translate(${CX} ${WL}) scale(${WS}) translate(${-CX} ${-W0})`;
const MIRROR = `translate(0 ${2 * WL}) scale(1 -1) ${FRIEZE}`;

/* ── The world, awake ──────────────────────────────────────────────────── */

const HILLS_LINE = through(
  [
    { x: -40, y: 472 },
    { x: 40, y: 454 },
    { x: 110, y: 436 },
    { x: 170, y: 450 },
    { x: 232, y: 428 },
    { x: 296, y: 444 },
    { x: 356, y: 424 },
    { x: 428, y: 442 },
    { x: 500, y: 420 },
    { x: 562, y: 442 },
    { x: 620, y: 430 },
    { x: 680, y: 452 },
  ],
  8,
);
/** A higher, fainter range behind them. */
const FAR_LINE = through(
  [
    { x: -40, y: 430 },
    { x: 30, y: 404 },
    { x: 92, y: 376 },
    { x: 150, y: 398 },
    { x: 214, y: 366 },
    { x: 270, y: 392 },
    { x: 330, y: 360 },
    { x: 392, y: 388 },
    { x: 458, y: 362 },
    { x: 520, y: 380 },
    { x: 576, y: 358 },
    { x: 632, y: 392 },
    { x: 680, y: 410 },
  ],
  8,
);
const FAR = `${polyline(FAR_LINE)} L 680 ${W0} L -40 ${W0} Z`;
const HILLS = `${polyline(HILLS_LINE)} L 680 ${W0} L -40 ${W0} Z`;
const BANKS = [
  `M -40 482 C 40 480 150 486 230 494 C 260 497 280 501 296 ${W0} L -40 ${W0} Z`,
  `M 680 480 C 600 480 500 486 420 494 C 390 497 366 501 350 ${W0} L 680 ${W0} Z`,
];
const BANK_EDGES = [
  `M -40 482 C 40 480 150 486 230 494 C 260 497 280 501 296 ${W0}`,
  `M 680 480 C 600 480 500 486 420 494 C 390 497 366 501 350 ${W0}`,
];
/** The road along the left bank, down to the water. */
const ROAD = "M 96 492 C 150 494 210 497 252 500 C 270 501 284 503 292 505";

type House = { x: number; w: number; h: number; base: number };
const HOUSES: House[] = [
  { x: 180, w: 20, h: 13, base: 489 },
  { x: 205, w: 24, h: 16, base: 490 },
  { x: 231, w: 18, h: 12, base: 492 },
];
const house = ({ x, w, h, base }: House) => ({
  walls: `M ${x - w / 2} ${base} L ${x - w / 2} ${base - h} L ${x + w / 2} ${base - h} L ${x + w / 2} ${base} Z`,
  roof: `M ${x - w / 2 - 3} ${base - h + 1} L ${round(x - w * 0.18)} ${round(base - h - w * 0.42)} L ${round(x + w * 0.18)} ${round(base - h - w * 0.42)} L ${x + w / 2 + 3} ${base - h + 1} Z`,
  door: `M ${x - 2} ${base} L ${x - 2} ${base - 6} L ${x + 2} ${base - 6} L ${x + 2} ${base} Z`,
  window: { x: x + round(w * 0.28), y: base - round(h * 0.55) },
});

/** A coconut palm: a leaning trunk and a crown of drooping fronds. */
function palm(x: number, base: number, h: number, lean: number) {
  const top = { x: x + lean, y: base - h };
  const trunk = `M ${x} ${base} Q ${x + lean * 0.2} ${round(base - h * 0.6)} ${top.x} ${top.y}`;
  const fronds = [-150, -120, -80, -50, -20, 10]
    .map((deg, i) => {
      const a = (deg * Math.PI) / 180;
      const l = 15 + hash(i, x) * 5;
      const tip = { x: round(top.x + Math.cos(a) * l), y: round(top.y + Math.sin(a) * l * 0.55 + 8) };
      const mid = { x: round(top.x + Math.cos(a) * l * 0.55), y: round(top.y + Math.sin(a) * l * 0.55 - 3) };
      return `M ${top.x} ${top.y} Q ${mid.x} ${mid.y} ${tip.x} ${tip.y}`;
    })
    .join(" ");
  return { trunk, fronds };
}
const PALMS = [palm(160, 487, 38, 6), palm(248, 494, 30, -5)];

const TEMPLE = { x: 440, base: 495 };
const T = TEMPLE;
const TEMPLE_PLINTH = `M ${T.x - 22} ${T.base} L ${T.x - 22} ${T.base - 5} L ${T.x + 22} ${T.base - 5} L ${T.x + 22} ${T.base} Z`;
const TEMPLE_WALLS = `M ${T.x - 15} ${T.base - 5} L ${T.x - 15} ${T.base - 19} L ${T.x + 15} ${T.base - 19} L ${T.x + 15} ${T.base - 5} Z`;
const TEMPLE_TOWER = `M ${T.x - 14} ${T.base - 19} C ${T.x - 13} ${T.base - 34} ${T.x - 8} ${T.base - 46} ${T.x - 3} ${T.base - 51} L ${T.x + 3} ${T.base - 51} C ${T.x + 8} ${T.base - 46} ${T.x + 13} ${T.base - 34} ${T.x + 14} ${T.base - 19} Z`;
const TEMPLE_BANDS = [0.25, 0.5, 0.72].map((t) => {
  const y = round(T.base - 19 - 32 * t);
  const hw = round(14 - 11 * t ** 1.4);
  return `M ${T.x - hw} ${y} L ${T.x + hw} ${y}`;
});
const TEMPLE_DOOR = `M ${T.x - 3.5} ${T.base - 5} L ${T.x - 3.5} ${T.base - 13} Q ${T.x} ${T.base - 16} ${T.x + 3.5} ${T.base - 13} L ${T.x + 3.5} ${T.base - 5} Z`;

/** Round-headed trees on the right bank: a banyan and a mango. */
const TREES = [
  {
    x: 512,
    base: 486,
    lobes: [
      { x: -14, y: -22, r: 12 },
      { x: 0, y: -28, r: 14 },
      { x: 15, y: -22, r: 12 },
      { x: 0, y: -16, r: 12 },
    ],
    trunk: 16,
  },
  {
    x: 392,
    base: 498,
    lobes: [
      { x: -6, y: -16, r: 8 },
      { x: 5, y: -19, r: 9 },
      { x: 0, y: -11, r: 8 },
    ],
    trunk: 10,
  },
];

const SUN = { x: 456, y: 100, r: 26 };
const RAYS = sunRays({ cx: SUN.x, cy: SUN.y, r: SUN.r, long: SUN.r + 30, short: SUN.r + 20, count: 32, span: 360 });
/** Birds out in the morning, high over the bank. */
const BIRDS = [
  { x: 300, y: 78, s: 1 },
  { x: 322, y: 66, s: 0.85 },
  { x: 340, y: 84, s: 0.9 },
  { x: 268, y: 96, s: 0.75 },
].map(
  ({ x, y, s }) =>
    `M ${round(x - 7 * s)} ${round(y - 2 * s)} Q ${round(x - 3 * s)} ${round(y - 5 * s)} ${x} ${y} Q ${round(x + 3 * s)} ${round(y - 5 * s)} ${round(x + 7 * s)} ${round(y - 2 * s)}`,
);

/* ── The lamp, the leaf ────────────────────────────────────────────────── */

const LAMP = { x: CX, y: 578, s: 4.4 };
const FLAME_TIP = round(LAMP.y - 11.6 * LAMP.s);
/** The lamp's reflection is turned over on the foot of its bowl, where it sits on the water. */
const LAMP_AXIS = round(LAMP.y + 2 * LAMP.s);
const LEAF = { x: 424, y: 604, s: 1.3 };

/* ── The water ─────────────────────────────────────────────────────────── */

/** Bands of the reflection, a thin dark gap between each, as still water breaks it. */
const RIPPLES = Array.from({ length: 40 }, (_, i) => ({ y: round(WL + 1 + i * 4.6), h: 3.6, o: round(Math.max(0.25, 1 - i * 0.022)) }));

/** A small chariot on the road, with its horse, drawn in the world's frame. */
const CHARIOT = { x: 268, y: 502, s: 1.3 };

export function WakingAndDream({ idPrefix = "sa62", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);
  const houses = HOUSES.map(house);

  /** The world's shapes, drawn once awake and once turned over in the water. */
  const world = (dream: boolean) => {
    const line = dream ? { stroke: "var(--gold)", strokeWidth: 0.9 } : { stroke: "var(--gold)", strokeWidth: 0.7 };
    const fill = (awake: string, o = 0.16) => (dream ? { fill: "var(--art-core)", fillOpacity: round(o * 1.9) } : { fill: awake });
    return (
      <>
        <path d={FAR} {...fill("var(--art-stone)", 0.05)} />
        {!dream && <path d={FAR} fill="var(--art-hair)" fillOpacity={0.08} />}
        <path d={polyline(FAR_LINE)} {...line} strokeOpacity={dream ? 0.35 : 0.3} />
        <path d={HILLS} {...fill("var(--art-stone)", 0.1)} />
        {!dream && <path d={HILLS} fill="var(--art-hair)" fillOpacity={0.14} />}
        <path d={polyline(HILLS_LINE)} {...line} strokeOpacity={dream ? 0.6 : 0.5} />
        {BANKS.map((d, i) => (
          <path key={i} d={d} {...fill("var(--art-stone)", 0.12)} />
        ))}
        {!dream && BANKS.map((d, i) => <path key={i} d={d} fill="var(--leaf)" fillOpacity={0.22} />)}
        <path d={BANK_EDGES.join(" ")} {...line} />
        <path
          d={ROAD}
          stroke={dream ? "var(--art-core)" : "var(--art-ivory)"}
          strokeWidth={2.6}
          strokeOpacity={dream ? 0.55 : 0.75}
          strokeLinecap="round"
        />
        {PALMS.map((p, i) => (
          <g key={i}>
            <path d={p.trunk} stroke={dream ? "var(--gold)" : "var(--art-musk)"} strokeWidth={1.8} strokeLinecap="round" />
            <path d={p.fronds} stroke={dream ? "var(--art-core)" : "var(--leaf)"} strokeWidth={2} strokeLinecap="round" />
          </g>
        ))}
        {TREES.map((t, i) => (
          <g key={i} transform={`translate(${t.x} ${t.base})`}>
            <path d={`M 0 0 L 0 ${-t.trunk}`} stroke={dream ? "var(--gold)" : "var(--art-musk)"} strokeWidth={2.2} />
            {t.lobes.map((l, j) => (
              <circle
                key={j}
                cx={l.x}
                cy={l.y}
                r={l.r}
                {...fill("var(--leaf)", 0.2)}
                stroke={dream ? "var(--art-core)" : "var(--gold)"}
                strokeWidth={0.6}
                strokeOpacity={0.7}
              />
            ))}
          </g>
        ))}
        {houses.map((h, i) => (
          <g key={i}>
            <path d={h.walls} {...fill("var(--art-ivory)", 0.22)} {...line} />
            <path d={h.roof} {...fill("var(--art-vermilion)", 0.3)} {...line} strokeLinejoin="round" />
            <path d={h.door} fill={dream ? "var(--art-core)" : "var(--art-musk)"} />
          </g>
        ))}
        <path d={TEMPLE_PLINTH} {...fill("var(--art-stone)", 0.2)} {...line} />
        <path d={TEMPLE_WALLS} {...fill("var(--art-ivory)", 0.22)} {...line} />
        <path d={TEMPLE_TOWER} {...fill("var(--art-ivory)", 0.22)} {...line} />
        <path d={TEMPLE_BANDS.join(" ")} stroke={dream ? "var(--art-core)" : "var(--gold-soft)"} strokeWidth={0.6} />
        <ellipse cx={T.x} cy={T.base - 52.5} rx={4.6} ry={1.8} {...fill("var(--gold)", 0.5)} {...line} />
        <path d={`M ${T.x} ${T.base - 54} L ${T.x} ${T.base - 59}`} stroke="var(--gold)" strokeWidth={1.2} />
        <path d={TEMPLE_DOOR} fill={dream ? "var(--art-core)" : "var(--art-musk)"} />
      </>
    );
  };

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("day")} cx={SUN.x} cy={SUN.y} r={300} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.3 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("sun")} cx={SUN.x} cy={SUN.y} r={SUN.r} gradientUnits="userSpaceOnUse">
          <stop offset="0.25" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
        <linearGradient id={id("water")} x1={0} y1={WL} x2={0} y2={720} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient
          id={id("within")}
          cx={CX}
          cy={WL + 40}
          r={260}
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(0 ${WL + 40}) scale(1 0.32) translate(0 ${-(WL + 40)})`}
        >
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-core)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("bank-line")} x1={60} y1={0} x2={580} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.2" style={{ stopColor: "var(--gold)", stopOpacity: 0.8 }} />
          <stop offset="0.8" style={{ stopColor: "var(--gold)", stopOpacity: 0.8 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("flame")} cx={LAMP.x} cy={round(LAMP.y - 5 * LAMP.s)} r={54} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.7 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("flame-low")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <mask id={id("ripples")} maskUnits="userSpaceOnUse" x={-60} y={WL} width={760} height={200}>
          {RIPPLES.map((r) => (
            <rect key={r.y} x={-60} y={r.y} width={760} height={r.h} fill="white" fillOpacity={r.o} />
          ))}
        </mask>
      </defs>

      {/* The world, which is her body */}
      <g {...part("world")}>
        <g transform={FRIEZE}>{world(false)}</g>
        <path d={BIRDS.join(" ")} stroke="var(--art-musk)" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* The sun up, and the world awake in its light */}
      <g {...part("sun")}>
        <circle className="m-shimmer" cx={SUN.x} cy={SUN.y} r={300} fill={url("day")} />
        {RAYS.map((r, i) => (
          <path key={i} className={r.long ? "m-shimmer" : undefined} d={r.d} fill={r.long ? "var(--art-vermilion)" : "var(--art-saffron)"} />
        ))}
        <circle cx={SUN.x} cy={SUN.y} r={SUN.r} fill={url("sun")} stroke="var(--gold)" strokeWidth={1.3} />
        <circle cx={SUN.x} cy={SUN.y} r={SUN.r - 9} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.6} />
      </g>

      {/* The water, and the same world turned over in it: the dream */}
      <g {...part("dream")}>
        <rect x={-60} y={WL} width={760} height={194} fill={url("water")} />
        <g mask={url("ripples")}>
          <g transform={MIRROR}>{world(true)}</g>
        </g>
        <path d={`M 60 ${WL} H 580`} stroke={url("bank-line")} strokeWidth={1} />
      </g>

      {/* Lit from within, with no sun in it: the self that dreams is its own light */}
      <g {...part("taijasa")}>
        <ellipse className="m-breathe" cx={CX} cy={WL + 40} rx={260} ry={84} fill={url("within")} />
        <g mask={url("ripples")}>
          <g transform={MIRROR}>
            {houses.map((h, i) => (
              <rect key={i} className={TWINKLE[i % 3]} x={h.window.x - 2} y={h.window.y - 2} width={4} height={4} fill="var(--art-core)" />
            ))}
            <circle className="m-twinkle m-late" cx={T.x} cy={T.base - 9} r={2.2} fill="var(--art-core)" />
          </g>
        </g>
      </g>

      {/* In the dream there are chariots, though on the road there are none (Bṛhadāraṇyaka 4.3.10) */}
      <g {...part("chariot")}>
        <g mask={url("ripples")}>
          <g transform={MIRROR}>
            <g transform={`translate(${CHARIOT.x} ${CHARIOT.y}) scale(${CHARIOT.s})`}>
              <g transform="translate(20 -1) scale(0.36)">
                <Horse fill="var(--art-core)" />
              </g>
              <path d="M 4 -6 L 16 -4" stroke="var(--gold)" strokeWidth={1} />
              <path d="M -10 -4 L -10 -12 Q -6 -14 4 -12 L 5 -4 Z" fill="var(--art-core)" fillOpacity={0.8} stroke="var(--gold)" strokeWidth={0.8} />
              <circle cx={-3} cy={-3.6} r={4.4} fill="var(--art-core)" fillOpacity={0.35} stroke="var(--gold)" strokeWidth={1.1} />
              <path d="M -3 -8 L -3 0.8 M -7.4 -3.6 L 1.4 -3.6" stroke="var(--gold)" strokeWidth={0.5} />
            </g>
          </g>
        </g>
      </g>

      {/* The lotus leaf the water stands on in beads */}
      <g {...part("leaf")}>
        <g transform={`translate(${LEAF.x} ${LEAF.y}) scale(${LEAF.s})`}>
          <LotusLeaf />
        </g>
      </g>

      {/* The lamp in a windless place, its flame and the flame it sees one light */}
      <g {...part("lamp")}>
        <circle className="m-shimmer" cx={LAMP.x} cy={round(LAMP.y - 5 * LAMP.s)} r={54} fill={url("flame")} />
        <circle className="m-shimmer" cx={LAMP.x} cy={round(2 * LAMP_AXIS - LAMP.y + 5 * LAMP.s)} r={40} fill={url("flame-low")} />
        <g mask={url("ripples")}>
          <g transform={`translate(${LAMP.x} ${round(2 * LAMP_AXIS - LAMP.y)}) scale(${LAMP.s} ${-LAMP.s})`} opacity={0.8}>
            <StillLamp />
          </g>
        </g>
        <g transform={`translate(${LAMP.x} ${LAMP.y}) scale(${LAMP.s})`}>
          <StillLamp />
        </g>
        <path
          d={`M ${LAMP.x} ${FLAME_TIP - 6} L ${LAMP.x} ${FLAME_TIP - 16}`}
          stroke="var(--art-core)"
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeOpacity={0.7}
        />
      </g>
    </svg>
  );
}
