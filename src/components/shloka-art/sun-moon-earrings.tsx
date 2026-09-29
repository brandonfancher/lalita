/**
 * Shloka 8 — "Kadamba flowers, and the sun and moon for earrings".
 *
 * The verse turns to her ears and sets two things of wildly different size
 * side by side without comment: a sprig of kadamba tucked over each ear, and
 * the discs of the sun and the moon hanging from them as a pair of pendants.
 * Her face is only the light between them. The kadamba head is itself a small
 * sun, an orange ball ringed with pale styles, so the small globes and the
 * great discs rhyme without either becoming the other. Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import type { CSSProperties } from "react";

import { artIds, MoonDeer, MoonHalo, partProps, polar, round, Ruby, sunRays } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const CX = 320;

/** Her right ear (the viewer's left) wears the sun, her left the moon, as her right eye is the sun and her left the moon. */
const SUN_X = 206;
const MOON_X = 2 * CX - SUN_X;
/** The ear-lobe, where each pendant is hung and from which it swings, just below the card. */
const LOBE_Y = 466;
const R = 56;
const BAIL_Y = LOBE_Y + 32;
const DISC_Y = BAIL_Y + R;

const swingFrom = (x: number): CSSProperties => ({ transformBox: "view-box", transformOrigin: `${x}px ${LOBE_Y}px` });

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── The sun ────────────────────────────────────────────────────────────── */

/** The full disc's rays, at the half-risen sun's spacing, clear of the bail above and the drop below. */
const SUN_RAYS = sunRays({ cx: SUN_X, cy: DISC_Y, r: R, long: 80, short: 69, count: 32, span: 360 }).filter(
  (r) => Math.abs(r.deg - 90) > 10 && Math.abs(r.deg - 270) > 10,
);
const SUN_BEADS = Array.from({ length: 40 }, (_, k) => polar(SUN_X, DISC_Y, R + 2.8, k * 9));

/** The sun's radiance across the day half of the sky: 108 gold hairlines, alternating long and short. */
const RADIANCE = Array.from({ length: 108 }, (_, k) => {
  const deg = k * (360 / 108) + 1.7;
  const a = polar(SUN_X, DISC_Y, R + 6, deg);
  const b = polar(SUN_X, DISC_Y, k % 2 ? 330 : 560, deg);
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}).join(" ");

/** The moon's light across the night half: fine rings, fading outward. */
const MOONLIGHT_RINGS = Array.from({ length: 17 }, (_, k) => ({ r: R + 62 + k * 26, opacity: round(0.46 - k * 0.022) }));

/* ── The moon ───────────────────────────────────────────────────────────── */

/** The little boat (uḍupa) the moon hangs from: a gold crescent, horns up, riding the top of the disc. */
const BOAT = { x: MOON_X, y: BAIL_Y - 10, r: 13 };
const BOAT_HULL = `M ${BOAT.x - BOAT.r} ${BOAT.y} A ${BOAT.r} ${BOAT.r} 0 0 0 ${BOAT.x + BOAT.r} ${BOAT.y} A ${BOAT.r} 7 0 0 1 ${BOAT.x - BOAT.r} ${BOAT.y} Z`;
const BOAT_BEADS = [-7, 0, 7].map((dx) => ({ x: BOAT.x + dx, y: round(BOAT.y + Math.sqrt(BOAT.r ** 2 - dx ** 2) - 3.4) }));

/* ── The pendants' fittings ─────────────────────────────────────────────── */

/** The link from the stud in the lobe down to where the pendant is caught, with two gold beads on it. */
const link = (x: number, bottom: number) => ({
  d: `M ${x} ${LOBE_Y + 5} L ${x} ${bottom}`,
  beads: [0.35, 0.7].map((u) => ({ x, y: round(LOBE_Y + 5 + u * (bottom - LOBE_Y - 5)) })),
});
const SUN_LINK = link(SUN_X, BAIL_Y - 17);
const MOON_LINK = link(MOON_X, BAIL_Y - 12);

/** The drop beneath each disc: a ruby under the sun, a pearl under the moon. */
const DROP_Y = DISC_Y + R + 13;
const PEARL_R = 6;

/* ── The kadamba ────────────────────────────────────────────────────────── */

type Head = { x: number; y: number; r: number };
type Leaf = { a: number; l: number; w: number };
type Spray = { at: Pt; heads: Head[]; leaves: Leaf[] };

/** A sprig tucked over each ear, fanning out sideways, kept clear of the card above. */
const SPRAYS: Spray[] = [
  {
    at: { x: SUN_X - 8, y: LOBE_Y - 2 },
    heads: [
      { x: -78, y: 20, r: 10 },
      { x: -58, y: -8, r: 13 },
      { x: -8, y: -12, r: 11 },
      { x: -50, y: 26, r: 11.5 },
      { x: -30, y: -6, r: 14 },
    ],
    leaves: [
      { a: 160, l: 88, w: 18 },
      { a: 184, l: 98, w: 19 },
      { a: 214, l: 76, w: 16 },
    ],
  },
  {
    at: { x: MOON_X + 8, y: LOBE_Y - 2 },
    heads: [
      { x: 76, y: 24, r: 9.5 },
      { x: 9, y: -12, r: 11.5 },
      { x: 60, y: -6, r: 12.5 },
      { x: 46, y: 30, r: 11 },
      { x: 33, y: -4, r: 14 },
    ],
    leaves: [
      { a: 20, l: 84, w: 17 },
      { a: -4, l: 100, w: 19 },
      { a: -34, l: 74, w: 16 },
    ],
  },
];

/** A kadamba leaf: broad, pointed, glossy, base at the origin, pointing along +x. */
function kadambaLeaf(l: number, w: number) {
  const blade = `M 0 0 C ${round(l * 0.2)} ${-w} ${round(l * 0.72)} ${round(-w * 0.9)} ${l} 0 C ${round(l * 0.72)} ${round(w * 0.9)} ${round(l * 0.2)} ${w} 0 0 Z`;
  const rib = `M 2 0 L ${round(l * 0.95)} 0`;
  const veins = [0.22, 0.38, 0.54, 0.7]
    .map((u) => {
      const x = round(u * l);
      const h = round(w * 0.62 * (1 - u * 0.55));
      const x2 = round(x + l * 0.14);
      return `M ${x} 0 Q ${round(x + l * 0.04)} ${round(-h * 0.7)} ${x2} ${-h} M ${x} 0 Q ${round(x + l * 0.04)} ${round(h * 0.7)} ${x2} ${h}`;
    })
    .join(" ");
  return { blade, rib, veins };
}

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

const dot = (x: number, y: number, r: number) =>
  `M ${round(x - r)} ${round(y)} a ${r} ${r} 0 1 0 ${round(2 * r)} 0 a ${r} ${r} 0 1 0 ${round(-2 * r)} 0 `;

/**
 * One kadamba head: an orange ball of tiny florets whose pale styles stand
 * out all over it, so it looks like a pincushion with a fuzzy corona.
 */
function kadambaHead({ x, y, r }: Head, seed: number) {
  const n = Math.round(r * 2.6);
  const styles: string[] = [];
  const tips = ["", "", ""];
  for (let k = 0; k < n; k++) {
    const deg = (k * 360) / n + ((seed * 37 + k * 53) % 11) - 5;
    const reach = r * (1.24 + ((seed + k * 7) % 5) * 0.03);
    const a = polar(x, y, r * 0.78, deg);
    const b = polar(x, y, reach, deg);
    styles.push(`M ${a.x} ${a.y} L ${b.x} ${b.y}`);
    tips[(k + seed) % 3] += dot(b.x, b.y, 1.05);
  }
  const florets = Array.from({ length: Math.round(r * r * 0.11) }, (_, i) => {
    const rr = r * 0.84 * Math.sqrt((i + 0.5) / Math.round(r * r * 0.11));
    const t = i * GOLDEN + seed;
    return { x: round(x + rr * Math.cos(t)), y: round(y + rr * Math.sin(t)) };
  });
  return { x, y, r, styles: styles.join(" "), tips, florets };
}

const KADAMBA = SPRAYS.map((s, si) => ({
  ...s,
  stalks: s.heads
    .map((h) => {
      const hx = s.at.x + h.x;
      const hy = s.at.y + h.y;
      return `M ${s.at.x} ${s.at.y} Q ${round(s.at.x + h.x * 0.35)} ${round(s.at.y + h.y * 0.7)} ${round(hx)} ${round(hy)}`;
    })
    .join(" "),
  leafShapes: s.leaves.map((l) => ({ ...kadambaLeaf(l.l, l.w), at: `translate(${s.at.x} ${s.at.y}) rotate(${-l.a})` })),
  headShapes: s.heads.map((h, hi) => kadambaHead({ x: s.at.x + h.x, y: s.at.y + h.y, r: h.r }, si * 5 + hi)),
}));

export function SunMoonEarrings({ idPrefix = "sa8", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("face")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.42 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("sun-glow")} cx={SUN_X} cy={DISC_Y + 10} r={150} gradientUnits="userSpaceOnUse">
          <stop offset="0.3" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.34 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("sun")} cx={SUN_X} cy={DISC_Y - 8} r={R} gradientUnits="userSpaceOnUse">
          <stop offset="0.25" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
        <radialGradient id={id("moonlight")} cx={MOON_X} cy={DISC_Y + 10} r={150} gradientUnits="userSpaceOnUse">
          <stop offset="0.3" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("moon-glow")} cx={MOON_X} cy={DISC_Y} r={R + 44} gradientUnits="userSpaceOnUse">
          <stop offset="0.6" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("moon-limb")} cx={MOON_X} cy={DISC_Y} r={R} gradientUnits="userSpaceOnUse">
          <stop offset="0.55" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.2 }} />
        </radialGradient>
        <radialGradient id={id("smudge")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={SUN_X} cy={DISC_Y} r={560} gradientUnits="userSpaceOnUse">
          <stop offset="0.1" style={{ stopColor: "var(--gold)", stopOpacity: 0.7 }} />
          <stop offset="0.45" style={{ stopColor: "var(--gold)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("day-side")} x1={CX - 50} y1="0" x2={CX + 30} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient id={id("night-side")} x1={CX - 30} y1="0" x2={CX + 50} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={0} />
          <stop offset="1" stopColor="#fff" stopOpacity={1} />
        </linearGradient>
        <mask id={id("day")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("day-side")} />
        </mask>
        <mask id={id("night")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("night-side")} />
        </mask>
        <clipPath id={id("frame")}>
          <rect width={640} height={830} />
        </clipPath>
        <radialGradient id={id("kadamba")} cx="0.38" cy="0.34" r="0.72">
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
      </defs>

      {/* Her face, seen only as the light between her ears */}
      <g {...part("face-light")}>
        <ellipse className="m-shimmer" cx={CX} cy={410} rx={140} ry={220} fill={url("face")} />
      </g>

      {/* The sun and the moon, become the pair of pendants at her ears */}
      <g {...part("earrings")}>
        <path className="m-shimmer" d={RADIANCE} mask={url("day")} stroke={url("radiance")} strokeWidth={0.7} strokeLinecap="round" />
        <g className="m-shimmer m-late" mask={url("night")} clipPath={url("frame")} stroke="var(--gold-soft)" strokeWidth={0.6}>
          {MOONLIGHT_RINGS.map((l) => (
            <circle key={l.r} cx={MOON_X} cy={DISC_Y} r={l.r} strokeOpacity={l.opacity} />
          ))}
        </g>
        <circle className="m-shimmer" cx={SUN_X} cy={DISC_Y + 10} r={150} fill={url("sun-glow")} />
        <circle className="m-shimmer m-late" cx={MOON_X} cy={DISC_Y + 10} r={150} fill={url("moonlight")} />

        <g className="m-sway" style={swingFrom(SUN_X)}>
          <g className="m-shimmer">
            {SUN_RAYS.map((r, i) => (
              <path key={i} d={r.d} fill={r.long ? "var(--art-vermilion)" : "var(--art-saffron)"} fillOpacity={0.75} />
            ))}
          </g>
          <circle cx={SUN_X} cy={DISC_Y} r={R} fill={url("sun")} fillOpacity={0.92} stroke="var(--gold)" strokeWidth={1.3} />
          <circle cx={SUN_X} cy={DISC_Y} r={R - 9} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.7} />
          <g fill="var(--gold-soft)">
            {SUN_BEADS.map((b, k) => (
              <circle key={k} cx={b.x} cy={b.y} r={1.1} />
            ))}
          </g>
          <path
            d={`M ${SUN_X - 9} ${BAIL_Y + 3} Q ${SUN_X - 9} ${BAIL_Y - 7} ${SUN_X} ${BAIL_Y - 13} Q ${SUN_X + 9} ${BAIL_Y - 7} ${SUN_X + 9} ${BAIL_Y + 3} Z`}
            fill="var(--gold)"
            stroke="var(--art-carve)"
            strokeWidth={0.6}
          />
          <path d={`M ${SUN_X} ${BAIL_Y - 10} V ${BAIL_Y + 1} M ${SUN_X - 5} ${BAIL_Y - 4} Q ${SUN_X} ${BAIL_Y - 1} ${SUN_X + 5} ${BAIL_Y - 4}`} stroke="var(--art-carve)" strokeWidth={0.6} />
          <circle cx={SUN_X} cy={BAIL_Y - 15} r={2.4} stroke="var(--gold)" strokeWidth={1.1} />
          <path d={SUN_LINK.d} stroke="var(--gold)" strokeWidth={1.5} />
          <g fill="var(--gold)">
            {SUN_LINK.beads.map((b, k) => (
              <circle key={k} cx={b.x} cy={b.y} r={2} />
            ))}
          </g>
          <circle cx={SUN_X} cy={LOBE_Y} r={5.6} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <Ruby x={SUN_X} y={LOBE_Y} r={2.6} />
          <circle cx={SUN_X} cy={DISC_Y + R + 3.4} r={2.2} stroke="var(--gold)" strokeWidth={1} />
          <Ruby x={SUN_X} y={DROP_Y} r={4.4} />
        </g>

        <g className="m-sway m-late" style={swingFrom(MOON_X)}>
          <circle cx={MOON_X} cy={DISC_Y} r={R + 44} fill={url("moon-glow")} />
          <MoonHalo cx={MOON_X} cy={DISC_Y} r={R} />
          <circle cx={MOON_X} cy={DISC_Y} r={R} fill="var(--art-moon)" />
          <circle cx={MOON_X} cy={DISC_Y} r={R} fill={url("moon-limb")} />
          <circle cx={MOON_X} cy={DISC_Y} r={R} stroke="var(--gold)" strokeWidth={1.6} />
          <g transform={`translate(${MOON_X - 1} ${DISC_Y - 6}) scale(0.66)`}>
            <MoonDeer smudge={url("smudge")} />
          </g>
          <path d={MOON_LINK.d} stroke="var(--gold)" strokeWidth={1.5} />
          <g fill="var(--gold)">
            {MOON_LINK.beads.map((b, k) => (
              <circle key={k} cx={b.x} cy={b.y} r={2} />
            ))}
          </g>
          <circle cx={MOON_X} cy={LOBE_Y} r={5.6} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <circle cx={MOON_X} cy={LOBE_Y} r={2.8} fill="var(--art-moon)" stroke="var(--gold-soft)" strokeWidth={0.4} />
          <circle cx={MOON_X} cy={DISC_Y + R + 3.4} r={2.2} stroke="var(--gold)" strokeWidth={1} />
          <path
            d={`M ${MOON_X - 2.6} ${DROP_Y - PEARL_R + 0.6} Q ${MOON_X} ${DROP_Y - PEARL_R - 2.4} ${MOON_X + 2.6} ${DROP_Y - PEARL_R + 0.6} Z`}
            fill="var(--gold)"
          />
          <circle cx={MOON_X} cy={DROP_Y} r={PEARL_R} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.7} />
          <path
            d={`M ${round(MOON_X + PEARL_R * 0.75)} ${round(DROP_Y - PEARL_R * 0.2)} A ${PEARL_R * 0.8} ${PEARL_R * 0.8} 0 0 1 ${round(MOON_X - PEARL_R * 0.2)} ${round(DROP_Y + PEARL_R * 0.75)}`}
            stroke="var(--gold-soft)"
            strokeWidth={0.9}
            strokeOpacity={0.7}
          />
          <circle cx={round(MOON_X - PEARL_R * 0.32)} cy={round(DROP_Y - PEARL_R * 0.32)} r={1.2} fill="var(--art-core)" />
        </g>
      </g>

      {/* The moon hangs from a little boat: uḍupa, hidden in the sandhi of tapanoḍupa */}
      <g {...part("boat")}>
        <g className="m-sway m-late" style={swingFrom(MOON_X)}>
          <circle cx={MOON_X} cy={BAIL_Y - 12} r={2.4} stroke="var(--gold)" strokeWidth={1.1} />
          <path d={BOAT_HULL} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} strokeLinejoin="round" />
          <g fill="var(--art-vermilion)">
            {BOAT_BEADS.map((b, k) => (
              <circle key={k} cx={b.x} cy={b.y} r={1.3} />
            ))}
          </g>
        </g>
      </g>

      {/* A sprig of kadamba tucked over each ear */}
      <g {...part("kadamba")}>
        {KADAMBA.map((s, si) => (
          <g key={si}>
            {s.leafShapes.map((l, i) => (
              <g key={i} transform={l.at}>
                <path d={l.blade} fill="var(--leaf)" fillOpacity={0.78} stroke="var(--leaf)" strokeWidth={0.8} />
                <path d={l.veins} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.55} />
                <path d={l.rib} stroke="var(--gold-soft)" strokeWidth={0.9} strokeOpacity={0.85} />
              </g>
            ))}
            <path d={s.stalks} stroke="var(--leaf)" strokeWidth={1.6} strokeLinecap="round" />
            {s.headShapes.map((h, hi) => (
              <g key={hi}>
                <path d={h.styles} stroke="var(--art-saffron)" strokeWidth={0.6} strokeLinecap="round" />
                <circle cx={h.x} cy={h.y} r={h.r} fill={url("kadamba")} />
                <g fill="var(--art-ivory)" fillOpacity={0.85}>
                  {h.florets.map((f, k) => (
                    <circle key={k} cx={f.x} cy={f.y} r={0.7} />
                  ))}
                </g>
                <g fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.35}>
                  {h.tips.map((d, k) => (
                    <path key={k} className={TWINKLE[k]} d={d} />
                  ))}
                </g>
              </g>
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
