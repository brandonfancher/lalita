/**
 * Shloka 5 — "The eighth-night moon on her brow".
 *
 * Two names, and both of them are moons. Above, the moon of the eighth night
 * stands at exactly half, flat edge down like a brow, its unlit half ashen.
 * Below, the full moon is her face, and the one mark on it is a dab of musk
 * where the moon's own spot would be. Up close the mark is a leaping deer:
 * musk is "deer's navel", and the moon is "deer-marked". Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { artIds, litPart, partProps, polar, round } from "./primitives";
import type { ArtProps } from "./types";

const CX = 320;

/** The eighth-night moon, its flat edge resting just above the card. */
const HALF = { y: 178, r: 82 };
/** The full moon of her face, below the card. */
const FULL = { y: 500, r: 94 };

const upperHalf = (cy: number, r: number) => `M ${CX - r} ${cy} A ${r} ${r} 0 0 1 ${CX + r} ${cy} Z`;
const lowerHalf = (cy: number, r: number) => `M ${CX + r} ${cy} A ${r} ${r} 0 0 1 ${CX - r} ${cy} Z`;

/** An arc of the circle round (CX, cy), from `from` to `to` degrees (0 = east, counter-clockwise). */
function arc(cy: number, r: number, from: number, to: number) {
  const a = polar(CX, cy, r, from);
  const b = polar(CX, cy, r, to);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 0 ${b.x} ${b.y}`;
}

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/**
 * A moon's halo (pariveṣa): rings, never rays, so it can't be taken for the
 * sun. Like a real lunar halo it is red on its inner edge, then saffron, then
 * gold, with a ring of gold pearls beyond and one faint outer ring.
 */
function Halo({ cy, r, from = -90, to = 270 }: { cy: number; r: number; from?: number; to?: number }) {
  const ring = (rr: number) => (to - from >= 360 ? null : arc(cy, rr, from, to));
  const bands = [
    { d: r + 10, color: "var(--sindura)", width: 2, opacity: 1 },
    { d: r + 14, color: "var(--art-saffron)", width: 1.3, opacity: 0.85 },
    { d: r + 18, color: "var(--gold)", width: 1, opacity: 0.8 },
    { d: r + 40, color: "var(--gold-soft)", width: 0.7, opacity: 0.4 },
  ];
  const count = Math.round(((to - from) / 360) * 64);
  const full = to - from >= 360;
  const pearls = Array.from({ length: count + (full ? 0 : 1) }, (_, k) => polar(CX, cy, r + 28, from + (k * (to - from)) / count));
  return (
    <>
      <g className="m-shimmer" strokeLinecap="round">
        {bands.map((b) =>
          full ? (
            <circle key={b.d} cx={CX} cy={cy} r={b.d} stroke={b.color} strokeWidth={b.width} strokeOpacity={b.opacity} />
          ) : (
            <path key={b.d} d={ring(b.d)!} stroke={b.color} strokeWidth={b.width} strokeOpacity={b.opacity} />
          ),
        )}
      </g>
      <g fill="var(--gold-soft)">
        {pearls.map((p, k) => (
          <circle key={k} className={TWINKLE[k % 3]} cx={p.x} cy={p.y} r={k % 2 ? 1.2 : 1.9} />
        ))}
      </g>
    </>
  );
}

/** The moonlight spreading from both moons: fine rings that cross in the space between them. */
const LIGHT_RINGS = Array.from({ length: 9 }, (_, k) => ({ r: 158 + k * 22, opacity: round(0.42 - k * 0.042) }));

/* ── The deer in the musk ──────────────────────────────────────────────── */

/** A leaping blackbuck facing right, about 44 units nose to hind hoof, centred on the origin. */
const DEER_BODY = [
  "M -12 -3",
  "C -8 -7.5 4 -7.5 9.5 -5.5",
  "C 11.5 -8.5 13 -11.5 14.5 -14.5",
  "C 16.5 -16.5 19.5 -16.5 22 -14.2",
  "C 22.4 -13.4 21.8 -12.6 20.8 -12.6",
  "C 19 -12.6 17.6 -12 16.8 -10.8",
  "C 15.8 -8 14.5 -4.5 11 -1.5",
  "C 5 1 -5 1 -9.5 -0.5",
  "C -12.5 -1 -13.5 -2 -12 -3",
  "Z",
].join(" ");
const DEER_EAR = "M 15.2 -14.5 L 13.2 -18.4 L 16.6 -15.3 Z";
const DEER_LINES = [
  "M -12 -3.5 Q -15 -5.5 -15.5 -8.5",
  "M 16.2 -15.8 Q 15.2 -20 17.4 -23.4",
  "M 17.6 -16 Q 17.4 -19.8 19.8 -22.4",
];
const DEER_LEGS = [
  "M 11.5 -2.5 L 16 1 L 22.5 2.2",
  "M 9.5 -2 L 13 3 L 19 5.6",
  "M -9 -1 L -13 3.5 L -20 4.6",
  "M -7 0 L -10 5 L -16.5 7.6",
];
const DEER_AT = { x: 318, y: 462, s: 1.12 };

/* ── The fifteen nights of the bright fortnight ────────────────────────── */

const NIGHT_R = 9.5;
const NIGHT_STEP = 27;
const fortnightY = (dx: number) => round(684 - 30 * (dx / (7 * NIGHT_STEP)) ** 2);
const fortnight = Array.from({ length: 15 }, (_, i) => {
  const dx = (i - 7) * NIGHT_STEP;
  return { night: i + 1, x: CX + dx, y: fortnightY(dx), lit: litPart(i + 1, NIGHT_R) };
});
const fortnightBeads = fortnight.slice(1).map((m, i) => {
  const dx = m.x - CX - NIGHT_STEP / 2;
  return { x: round(CX + dx), y: fortnightY(dx), i };
});
const fortnightThread = (() => {
  const reach = 7 * NIGHT_STEP + 22;
  const mid = 2 * fortnightY(0) - fortnightY(reach);
  return `M ${CX - reach} ${fortnightY(reach)} Q ${CX} ${round(mid)} ${CX + reach} ${fortnightY(reach)}`;
})();

export function EighthNightMoon({ idPrefix = "sa5", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("moonlight")} cx={CX} cy={340} r={300} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.3 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("half-glow")} cx={CX} cy={HALF.y} r={HALF.r + 44} gradientUnits="userSpaceOnUse">
          <stop offset="0.6" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("full-glow")} cx={CX} cy={FULL.y} r={FULL.r + 44} gradientUnits="userSpaceOnUse">
          <stop offset="0.6" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("half-limb")} cx={CX} cy={HALF.y} r={HALF.r} gradientUnits="userSpaceOnUse">
          <stop offset="0.55" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.2 }} />
        </radialGradient>
        <radialGradient id={id("full-limb")} cx={CX} cy={FULL.y} r={FULL.r} gradientUnits="userSpaceOnUse">
          <stop offset="0.55" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.2 }} />
        </radialGradient>
        <clipPath id={id("frame")}>
          <rect width={640} height={830} />
        </clipPath>
        <radialGradient id={id("smudge")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The night's own light, spreading from both moons and crossing between them */}
      <g {...part("moonlight")}>
        <circle className="m-shimmer" cx={CX} cy={340} r={300} fill={url("moonlight")} />
        <g className="m-shimmer m-late" clipPath={url("frame")} stroke="var(--gold-soft)" strokeWidth={0.6}>
          {LIGHT_RINGS.map((l) => (
            <g key={l.r} strokeOpacity={l.opacity}>
              <circle cx={CX} cy={HALF.y} r={l.r} />
              <circle cx={CX} cy={FULL.y} r={l.r} />
            </g>
          ))}
        </g>
      </g>

      {/* The eighth-night moon, exactly half lit, flat edge down like a brow */}
      <g {...part("half-moon")}>
        <circle cx={CX} cy={HALF.y} r={HALF.r + 44} fill={url("half-glow")} />
        <Halo cy={HALF.y} r={HALF.r} from={-16} to={196} />
        <path d={lowerHalf(HALF.y, HALF.r)} fill="var(--art-hair)" fillOpacity={0.16} />
        <path d={lowerHalf(HALF.y, HALF.r)} stroke="var(--gold-soft)" strokeWidth={0.8} strokeOpacity={0.5} />
        <path d={upperHalf(HALF.y, HALF.r)} fill="var(--art-moon)" />
        <path d={upperHalf(HALF.y, HALF.r)} fill={url("half-limb")} />
        <path d={upperHalf(HALF.y, HALF.r)} stroke="var(--gold)" strokeWidth={1.6} strokeLinejoin="round" />
      </g>

      {/* The full moon of her face, and the dab of musk that is its spot */}
      <g {...part("face-moon")}>
        <circle cx={CX} cy={FULL.y} r={FULL.r + 44} fill={url("full-glow")} />
        <Halo cy={FULL.y} r={FULL.r} />
        <circle cx={CX} cy={FULL.y} r={FULL.r} fill="var(--art-moon)" />
        <circle cx={CX} cy={FULL.y} r={FULL.r} fill={url("full-limb")} />
        <circle cx={CX} cy={FULL.y} r={FULL.r} stroke="var(--gold)" strokeWidth={1.6} />
        <g transform={`translate(${DEER_AT.x} ${DEER_AT.y}) scale(${DEER_AT.s})`}>
          <ellipse cx={1} cy={-5} rx={30} ry={22} fill={url("smudge")} />
          <path d={DEER_BODY + " " + DEER_EAR} fill="var(--art-musk)" />
          <g stroke="var(--art-musk)" strokeLinecap="round" strokeLinejoin="round">
            <path d={DEER_LEGS.join(" ")} strokeWidth={1.7} />
            <path d={DEER_LINES.join(" ")} strokeWidth={1.1} />
          </g>
          <circle cx={19} cy={-14.3} r={0.6} fill="var(--art-moon)" />
        </g>
      </g>

      {/* The fifteen nights of the bright fortnight, waxing left to right */}
      <g {...part("fortnight")}>
        <path d={fortnightThread} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.8} />
        <g fill="var(--art-vermilion)">
          {fortnightBeads.map((b) => (
            <circle key={b.i} cx={b.x} cy={b.y} r={1.6} />
          ))}
        </g>
        {fortnight.map((m, i) => (
          <g key={m.night} transform={`translate(${m.x} ${m.y})`}>
            <g className={TWINKLE[i % 3]}>
              <circle r={NIGHT_R} fill="var(--art-hair)" fillOpacity={0.2} />
              <path d={m.lit} fill="var(--art-moon)" />
            </g>
            <circle r={NIGHT_R} stroke="var(--gold)" strokeWidth={0.8} />
            {m.night === 8 && (
              <>
                <circle r={NIGHT_R + 4} stroke="var(--sindura)" strokeWidth={1.3} />
                <circle r={NIGHT_R + 7} stroke="var(--gold)" strokeWidth={0.7} />
              </>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
