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

import { artIds, litPart, MoonDeer, MoonHalo, partProps, round } from "./primitives";
import type { ArtProps } from "./types";

const CX = 320;

/** The eighth-night moon, its flat edge resting just above the card. */
const HALF = { y: 178, r: 82 };
/** The full moon of her face, below the card. */
const FULL = { y: 500, r: 94 };

const upperHalf = (cy: number, r: number) => `M ${CX - r} ${cy} A ${r} ${r} 0 0 1 ${CX + r} ${cy} Z`;
const lowerHalf = (cy: number, r: number) => `M ${CX + r} ${cy} A ${r} ${r} 0 0 1 ${CX - r} ${cy} Z`;

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/** The moonlight spreading from both moons: fine rings that cross in the space between them. */
const LIGHT_RINGS = Array.from({ length: 9 }, (_, k) => ({ r: 158 + k * 22, opacity: round(0.42 - k * 0.042) }));

/** Where the deer in the musk leaps. */
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
        <MoonHalo cx={CX} cy={HALF.y} r={HALF.r} from={-16} to={196} />
        <path d={lowerHalf(HALF.y, HALF.r)} fill="var(--art-hair)" fillOpacity={0.16} />
        <path d={lowerHalf(HALF.y, HALF.r)} stroke="var(--gold-soft)" strokeWidth={0.8} strokeOpacity={0.5} />
        <path d={upperHalf(HALF.y, HALF.r)} fill="var(--art-moon)" />
        <path d={upperHalf(HALF.y, HALF.r)} fill={url("half-limb")} />
        <path d={upperHalf(HALF.y, HALF.r)} stroke="var(--gold)" strokeWidth={1.6} strokeLinejoin="round" />
      </g>

      {/* The full moon of her face, and the dab of musk that is its spot */}
      <g {...part("face-moon")}>
        <circle cx={CX} cy={FULL.y} r={FULL.r + 44} fill={url("full-glow")} />
        <MoonHalo cx={CX} cy={FULL.y} r={FULL.r} />
        <circle cx={CX} cy={FULL.y} r={FULL.r} fill="var(--art-moon)" />
        <circle cx={CX} cy={FULL.y} r={FULL.r} fill={url("full-limb")} />
        <circle cx={CX} cy={FULL.y} r={FULL.r} stroke="var(--gold)" strokeWidth={1.6} />
        <g transform={`translate(${DEER_AT.x} ${DEER_AT.y}) scale(${DEER_AT.s})`}>
          <MoonDeer smudge={url("smudge")} />
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
