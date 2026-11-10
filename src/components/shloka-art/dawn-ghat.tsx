/**
 * Shloka 90 — "Consciousness and dead matter, and the brahmin's daily prayer".
 *
 * Dawn at a river ghat. In the crown the seam of night and day, the last
 * stars above it. Under the card the sun half risen over the river, and on
 * the water twenty-four floating lamps in three rows of eight. Birds rise from
 * the reeds on the far bank. On the stone steps of the near bank a lodestone
 * with iron filings standing round it, and a row of copper water vessels,
 * one tipped to pour toward the sun. Up the right side, earth, air and sky:
 * भूः on the steps, भुवः over the water, स्वः among the stars. Which name each
 * part answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { artIds, glint, Goose, Lamp, partProps, round, seaSurface, sunRays } from "./primitives";
import type { ArtProps } from "./types";

/* ── The sun half risen over the river ─────────────────────────────────── */

const HY = 470;
const SUN = { x: 320, r: 34 };
const RAYS = sunRays({ cx: SUN.x, cy: HY, r: SUN.r, long: 74, short: 60 });
const BANK = 576;
const SEA = seaSurface({ cx: SUN.x, horizon: HY, column: 10, half: 214 });

/* ── Twenty-four lamps on the water ────────────────────────────────────── */

const ROWS = [
  { y: 494, s: 1.15, gap: 24 },
  { y: 518, s: 1.45, gap: 30 },
  { y: 548, s: 1.85, gap: 38 },
];
const LAMPS = ROWS.flatMap((r, row) =>
  Array.from({ length: 8 }, (_, k) => ({ x: round(SUN.x + (k - 3.5) * r.gap), y: r.y, s: r.s, k: row * 8 + k })),
);

/* ── Birds waking on the far bank ──────────────────────────────────────── */

const REEDS = Array.from({ length: 11 }, (_, k) => {
  const x = 140 + k * 9 + (k % 3) * 2;
  const h = 12 + ((k * 7) % 5) * 3;
  return `M ${x} ${HY + 2} Q ${x + (k % 2 ? 2 : -2)} ${HY - h / 2} ${x + (k % 2 ? 4 : -3)} ${HY - h}`;
}).join(" ");
const BIRDS = [
  { x: 172, y: 452, s: 1.6, up: true },
  { x: 206, y: 438, s: 1.7, up: false },
  { x: 244, y: 448, s: 1.45, up: true },
  { x: 146, y: 430, s: 1.3, up: false },
  { x: 222, y: 462, s: 1.35, up: false },
];

/* ── The steps of the ghat ─────────────────────────────────────────────── */

const STEPS = [BANK, 594, 616, 642, 674, 712];

/* ── A lodestone, and the iron filings standing round it ───────────────── */

const STONE = { x: 186, y: 608 };
const STONE_PATH =
  "M -18 2 C -20 -6 -14 -13 -4 -14 C 6 -16 16 -12 19 -5 C 21 1 16 6 6 7 C -4 8 -15 7 -18 2 Z";
/** Field lines from pole to pole over the stone, and open ones fanning out from each end, dashed as filings. */
const FIELD = [
  ...[10, 18, 28, 40].map((h, k) => {
    const half = 15 + k * 7;
    return `M ${STONE.x - half} ${STONE.y - 4} C ${STONE.x - half} ${STONE.y - 4 - h * 1.3} ${STONE.x + half} ${STONE.y - 4 - h * 1.3} ${STONE.x + half} ${STONE.y - 4}`;
  }),
  ...[-1, 1].flatMap((side) =>
    [150, 180, 210].map((deg) => {
      const t = ((side < 0 ? deg : 180 - deg) * Math.PI) / 180;
      const x0 = STONE.x + side * 20;
      return `M ${x0} ${STONE.y - 4} Q ${round(x0 + Math.cos(t) * 14)} ${round(STONE.y - 4 - Math.sin(t) * 14 - 6)} ${round(x0 + Math.cos(t) * 26)} ${round(STONE.y - 4 - Math.sin(t) * 22)}`;
    }),
  ),
].join(" ");

/* ── Copper vessels on the steps ───────────────────────────────────────── */

const VESSEL = "M -4 -20 L 4 -20 L 3.4 -16 C 10 -14 12 -8 11 -3 C 10 2 6 4 0 4 C -6 4 -10 2 -11 -3 C -12 -8 -10 -14 -3.4 -16 Z";
const LIP = "M -6.4 -22 L 6.4 -22 L 4.6 -19.4 L -4.6 -19.4 Z";
const VESSELS = [
  { x: 340, y: STEPS[2] + 2 },
  { x: 370, y: STEPS[2] + 2 },
  { x: 400, y: STEPS[2] + 2 },
  { x: 430, y: STEPS[2] + 2 },
];
const POURING = { x: 290, y: BANK + 4, deg: 70 };
const ARGHYA = "M 311 572 C 315 569 318 567 322 566";

/* ── The three vyāhṛtis on three levels ────────────────────────────────── */

const VYAHRTI = [
  { text: "भूः", x: 488, y: 660 },
  { text: "भुवः", x: 486, y: 452 },
  { text: "स्वः", x: 470, y: 66 },
];

/* ── The seam of night and day ─────────────────────────────────────────── */

const SEAM = 120;
const STARS = [
  { x: 360, y: 30, s: 3.4 },
  { x: 404, y: 60, s: 2.6 },
  { x: 528, y: 34, s: 3 },
  { x: 560, y: 84, s: 2.4 },
  { x: 312, y: 74, s: 2.2 },
  { x: 436, y: 20, s: 2 },
];
const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

export function DawnGhat({ idPrefix = "sa90", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={id("night")} x1={0} y1={0} x2={0} y2={SEAM} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.05 }} />
        </linearGradient>
        <linearGradient id={id("day")} x1={0} y1={SEAM} x2={0} y2={230} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.24 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("sides")} x1={0} y1={0} x2={640} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0.12" style={{ stopColor: "white", stopOpacity: 0 }} />
          <stop offset="0.4" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="0.86" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="1" style={{ stopColor: "white", stopOpacity: 0 }} />
        </linearGradient>
        <mask id={id("sky")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={240} fill={url("sides")} />
        </mask>
        <radialGradient id={id("sun")} cx={SUN.x} cy={HY - 10} r={SUN.r} gradientUnits="userSpaceOnUse">
          <stop offset="0.25" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
        <radialGradient id={id("glow")} cx={SUN.x} cy={HY} r={190} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <clipPath id={id("above")}>
          <rect x={0} y={0} width={640} height={HY} />
        </clipPath>
        <linearGradient id={id("river-fade")} x1={0} y1={0} x2={640} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0.14" style={{ stopColor: "white", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="0.7" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="0.86" style={{ stopColor: "white", stopOpacity: 0 }} />
        </linearGradient>
        <mask id={id("river")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect x={0} y={HY} width={640} height={BANK - HY} fill={url("river-fade")} />
        </mask>
        <linearGradient id={id("water")} x1={0} y1={HY} x2={0} y2={BANK} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.3 }} />
        </linearGradient>
        <linearGradient id={id("step-fade")} x1={0} y1={0} x2={640} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0.12" style={{ stopColor: "white", stopOpacity: 0 }} />
          <stop offset="0.24" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="0.8" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="0.9" style={{ stopColor: "white", stopOpacity: 0 }} />
        </linearGradient>
        <mask id={id("steps")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect x={0} y={BANK} width={640} height={STEPS[STEPS.length - 1] - BANK} fill={url("step-fade")} />
        </mask>
        <linearGradient id={id("copper")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-ember)" }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-ember)" }} />
        </linearGradient>
      </defs>

      {/* The seam of night and day */}
      <g {...part("sandhya")}>
        <g mask={`url(#${id("sky")})`}>
          <rect x={0} y={0} width={640} height={SEAM} fill={url("night")} />
          <rect x={0} y={SEAM} width={640} height={110} fill={url("day")} />
          <path d={`M 0 ${SEAM} H 640`} stroke="var(--gold)" strokeWidth={0.9} strokeOpacity={0.8} />
        </g>
        {STARS.map((s, k) => (
          <path key={k} className={TWINKLE[k % 3]} transform={`translate(${s.x} ${s.y})`} d={glint(s.s)} fill="var(--gold-soft)" />
        ))}
      </g>

      {/* The sun of consciousness, half risen */}
      <g {...part("cit")}>
        <circle className="m-breathe" cx={SUN.x} cy={HY} r={190} fill={url("glow")} />
        <g clipPath={`url(#${id("above")})`}>
          {RAYS.map((r, k) => (
            <path key={k} d={r.d} fill={r.long ? "var(--art-vermilion)" : "var(--art-saffron)"} fillOpacity={0.85} />
          ))}
          <circle cx={SUN.x} cy={HY} r={SUN.r} fill={url("sun")} stroke="var(--gold)" strokeWidth={1.3} />
        </g>
        <g mask={`url(#${id("river")})`}>
          <rect x={0} y={HY} width={640} height={BANK - HY} fill={url("water")} />
          <path d={SEA.ripples.join(" ")} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.6} />
          <g fill="var(--art-saffron)">
            <path className="m-twinkle" d={SEA.reflection[0]} />
            <path className="m-twinkle m-late" d={SEA.reflection[1]} />
            <path className="m-twinkle m-later" d={SEA.reflection[2]} fill="var(--art-core)" />
          </g>
        </g>
        <path d={`M 110 ${HY} H 530`} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.7} />
      </g>

      {/* Birds waking and rising from the reeds */}
      <g {...part("sentience")}>
        <path d={REEDS} stroke="var(--leaf)" strokeWidth={1.1} strokeLinecap="round" />
        {BIRDS.map((b, k) => (
          <g key={k} transform={`translate(${b.x} ${b.y}) rotate(-16) scale(${-b.s} ${b.s})`}>
            <Goose up={b.up} />
          </g>
        ))}
      </g>

      {/* Twenty-four lamps on the water, in three rows of eight */}
      <g {...part("gayatri")}>
        {LAMPS.map((l) => (
          <g key={l.k} transform={`translate(${l.x} ${l.y}) scale(${l.s})`}>
            <ellipse cy={1.4} rx={6.4} ry={1.8} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.3} />
            <Lamp k={l.k} />
          </g>
        ))}
      </g>

      {/* The stone steps of the ghat */}
      <g {...part("inert")}>
        <g mask={`url(#${id("steps")})`}>
          {STEPS.slice(0, -1).map((y, k) => (
            <g key={y}>
              <rect x={0} y={y} width={640} height={STEPS[k + 1] - y} fill="var(--art-stone)" fillOpacity={0.55 + k * 0.06} />
              <path d={`M 0 ${y} H 640`} stroke="var(--gold)" strokeWidth={1} />
              <path d={`M 0 ${y + 3} H 640`} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.6} />
            </g>
          ))}
        </g>
      </g>

      {/* A lodestone, the filings standing in its field */}
      <g {...part("matter-power")}>
        <path d={FIELD} stroke="var(--art-hair)" strokeWidth={1} strokeDasharray="2.2 2" strokeLinecap="round" />
        <g transform={`translate(${STONE.x} ${STONE.y})`}>
          <ellipse cy={7} rx={20} ry={3} fill="var(--art-musk)" fillOpacity={0.25} />
          <path d={STONE_PATH} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.7} />
          <path d="M -12 -8 C -6 -11 2 -11 8 -9" stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.7} />
        </g>
      </g>

      {/* Copper vessels, one tipped to pour toward the sun */}
      <g {...part("twice-born")}>
        {VESSELS.map((v, k) => (
          <g key={k} transform={`translate(${v.x} ${v.y})`}>
            <ellipse cy={3.4} rx={11} ry={2.2} fill="var(--art-musk)" fillOpacity={0.2} />
            <path d={VESSEL} fill={url("copper")} stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
            <path d={LIP} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
            <path d="M -9 -6 C -9 -10 -6 -13 -2 -14" stroke="var(--art-core)" strokeWidth={0.9} strokeOpacity={0.7} strokeLinecap="round" />
          </g>
        ))}
        <path className="m-shimmer" d={ARGHYA} stroke="var(--art-moon)" strokeWidth={2.4} strokeLinecap="round" />
        {[8, 14].map((rx) => (
          <ellipse key={rx} className="m-shimmer" cx={326} cy={565} rx={rx} ry={rx * 0.22} stroke="var(--art-core)" strokeWidth={0.7} strokeOpacity={0.8} />
        ))}
        <g transform={`translate(${POURING.x} ${POURING.y}) rotate(${POURING.deg})`}>
          <path d={VESSEL} fill={url("copper")} stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
          <path d={LIP} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
        </g>
      </g>

      {/* Bhūḥ, bhuvaḥ, svaḥ: earth, air and sky */}
      <g {...part("vyahrti")} fill="var(--sindura)" style={{ fontFamily: "var(--font-tiro), serif" }}>
        {VYAHRTI.map((v) => (
          <text key={v.text} x={v.x} y={v.y} textAnchor="middle" dominantBaseline="central" fontSize={20}>
            {v.text}
          </text>
        ))}
      </g>
    </svg>
  );
}
