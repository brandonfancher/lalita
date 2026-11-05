/**
 * Shloka 43 — "The autumn moon, and then the turn to nothing".
 *
 * Six names of praise, then two that take it back. In the crown the autumn
 * moon, the face of the oldest comparison, full and haloless in a sky the
 * rains have washed, the last clouds going off at the edges. On the left
 * Śaṅkara's trident with his drum tied to it, the drum drawn in at the
 * waist; on the right Śrī's lotus with gold falling from it. Below the card
 * the praise comes down to earth: a pool so still the moon lies in it
 * whole, and a plumb line hanging straight beside it. Then the turn: to the
 * right her light hangs over an empty seat with nothing under it, and the
 * pigment that is thrown at it slides off and falls away. Which name each
 * part answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { MoonDeer, OpenLotus, artIds, lotusPetals, partProps, round } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── The autumn moon ───────────────────────────────────────────────────── */

/** The title can run on one line to x ≈ 480 at y ≈ 84–147, so the crown sits above it. */
const MOON = { x: 330, y: 44, r: 34 };
const MOONLIGHT = [MOON.r + 16, MOON.r + 32];
const DEER_AT = { x: MOON.x - 2, y: MOON.y + 6, s: 0.4 };

/** The last clouds of the rains, going off to either side. */
const CLOUDS = [
  { x: 120, y: 36, s: 0.8, flip: 1 },
  { x: 548, y: 46, s: 0.7, flip: -1 },
];
const CLOUD_PUFFS = [
  { x: -30, y: 6, rx: 44, ry: 22 },
  { x: 0, y: -4, rx: 46, ry: 28 },
  { x: 30, y: 8, rx: 40, ry: 20 },
];

/* ── Śaṅkara's trident, and the drum tied to it ────────────────────────── */

const TRIDENT = { x: 230, top: 8, foot: 84 };
const TRIDENT_HEAD = [
  `M ${TRIDENT.x} ${TRIDENT.top + 2} L ${TRIDENT.x} ${TRIDENT.top + 44}`,
  `M ${TRIDENT.x - 15} ${TRIDENT.top + 14} C ${TRIDENT.x - 16} ${TRIDENT.top + 34} ${TRIDENT.x - 8} ${TRIDENT.top + 42} ${TRIDENT.x} ${TRIDENT.top + 42}`,
  `M ${TRIDENT.x + 15} ${TRIDENT.top + 14} C ${TRIDENT.x + 16} ${TRIDENT.top + 34} ${TRIDENT.x + 8} ${TRIDENT.top + 42} ${TRIDENT.x} ${TRIDENT.top + 42}`,
].join(" ");
const PRONG_TIPS = [
  { x: TRIDENT.x, y: TRIDENT.top - 4 },
  { x: TRIDENT.x - 15, y: TRIDENT.top + 8 },
  { x: TRIDENT.x + 15, y: TRIDENT.top + 8 },
];
/** The drum hangs upright from a cord tied under the prongs. */
const TIE = { x: TRIDENT.x, y: TRIDENT.top + 48 };
const DRUM = { x: TRIDENT.x + 20, y: TRIDENT.top + 64, half: 12, face: 8, waist: 1.8 };
const DRUM_BODY = `M ${DRUM.x - DRUM.face} ${DRUM.y - DRUM.half} L ${DRUM.x} ${DRUM.y - DRUM.waist} L ${DRUM.x + DRUM.face} ${DRUM.y - DRUM.half} Z M ${DRUM.x - DRUM.face} ${DRUM.y + DRUM.half} L ${DRUM.x} ${DRUM.y + DRUM.waist} L ${DRUM.x + DRUM.face} ${DRUM.y + DRUM.half} Z`;
const DRUM_CORD = `M ${TIE.x} ${TIE.y} C ${TIE.x + 10} ${TIE.y + 2} ${DRUM.x} ${DRUM.y - DRUM.half - 12} ${DRUM.x} ${DRUM.y - DRUM.half}`;
const DRUM_BEADS = `M ${DRUM.x} ${DRUM.y} C ${DRUM.x + 10} ${DRUM.y + 2} ${DRUM.x + 14} ${DRUM.y + 8} ${DRUM.x + 15} ${DRUM.y + 16}`;

/* ── Śrī's lotus, and what falls from it ───────────────────────────────── */

const SRI = { x: 428, y: 36, s: 0.52 };
const GOLD_FALL = Array.from({ length: 9 }, (_, k) => ({
  x: round(SRI.x - 20 + (k % 3) * 20 + ((k * 7) % 5) - 2),
  y: SRI.y + 16 + Math.floor(k / 3) * 11 + (k % 2) * 4,
  r: k % 2 ? 1.4 : 2.1,
  k,
}));

/* ── Below: the still pool, the plumb line ─────────────────────────────── */

const POOL = { x: 200, y: 566, hw: 100 };
const REFLECTION = { x: POOL.x - 18, y: POOL.y + 6, rx: 22, ry: 8 };
const LEAF_AT = { x: POOL.x + 54, y: POOL.y + 14 };
/** Level lines, closer toward the far edge, broken where the moon lies on them. */
const POOL_LINES = Array.from({ length: 8 }, (_, i) => {
  const t = i / 7;
  const y = round(POOL.y - 22 + 48 * t * t);
  const hw = round(POOL.hw * (0.6 + 0.4 * t));
  const dy = (y - REFLECTION.y) / (REFLECTION.ry + 6);
  const gap = Math.abs(dy) < 1 ? round((REFLECTION.rx + 8) * Math.sqrt(1 - dy * dy)) : 0;
  return { y, hw, gap, i };
});

const PLUMB = { x: 320, top: 452, bob: 556 };
const BOB = `M ${PLUMB.x} ${PLUMB.bob - 6} C ${PLUMB.x + 6} ${PLUMB.bob - 4} ${PLUMB.x + 6} ${PLUMB.bob + 6} ${PLUMB.x} ${PLUMB.bob + 14} C ${PLUMB.x - 6} ${PLUMB.bob + 6} ${PLUMB.x - 6} ${PLUMB.bob - 4} ${PLUMB.x} ${PLUMB.bob - 6} Z`;

/* ── The turn: her light with nothing under it, and nothing on it ──────── */

const LIGHT = { x: 438, y: 478 };
/** The empty seat, a lotus pedestal drawn only in dots. */
const SEAT = { x: LIGHT.x, y: 592 };
const SEAT_PETALS = lotusPetals({ x: SEAT.x - 42, width: 84, count: 6, base: SEAT.y, height: 22 });
const SEAT_BASE = `M ${SEAT.x - 48} ${SEAT.y} L ${SEAT.x + 48} ${SEAT.y} M ${SEAT.x - 40} ${SEAT.y + 8} L ${SEAT.x + 40} ${SEAT.y + 8}`;
/** On the pool, a lotus leaf that water stands on in beads and does not wet. */
const LEAF = { x: 0, y: 0, rx: 34, ry: 10 };
const LEAF_D = `M 0 0 L ${-LEAF.rx * 0.2} ${-LEAF.ry} A ${LEAF.rx} ${LEAF.ry} 0 1 0 ${LEAF.rx * 0.2} ${-LEAF.ry} Z`;
const LEAF_VEINS = Array.from({ length: 9 }, (_, k) => {
  const a = (Math.PI * 2 * (k + 0.5)) / 9 + Math.PI / 2 + 0.35;
  return `M 0 0 L ${round(Math.cos(a) * LEAF.rx * 0.82)} ${round(Math.sin(a) * LEAF.ry * 0.82)}`;
}).join(" ");
const BEADS = [
  { x: -14, y: -1, r: 3.4 },
  { x: 2, y: 3, r: 2.6 },
  { x: 16, y: -2, r: 2.2 },
  { x: 33, y: 2, r: 1.8 },
];

export function AutumnMoonTurn({ idPrefix = "sa43", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("moon-glow")} cx={MOON.x} cy={MOON.y} r={MOON.r + 40} gradientUnits="userSpaceOnUse">
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
        <radialGradient id={id("cloud")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.14 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("sri")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.34 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("pool")} x1={POOL.x - POOL.hw} y1={0} x2={POOL.x + POOL.hw} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="0.25" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.7 }} />
          <stop offset="0.75" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("reflection")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.95 }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("light")} cx={LIGHT.x} cy={LIGHT.y} r={64} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The last clouds of the rains, going off */}
      <g {...part("clouds")}>
        {CLOUDS.map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y}) scale(${c.s * c.flip} ${c.s})`}>
            <g className={i ? "m-sway m-late" : "m-sway"}>
              {CLOUD_PUFFS.map((p, j) => (
                <ellipse key={j} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry} fill={url("cloud")} />
              ))}
            </g>
          </g>
        ))}
      </g>

      {/* The autumn moon: her face, the oldest comparison */}
      <g {...part("face")}>
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r + 40} fill={url("moon-glow")} />
        <g className="m-shimmer">
          {MOONLIGHT.map((r, i) => (
            <circle key={r} cx={MOON.x} cy={MOON.y} r={r} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.45 - i * 0.12} />
          ))}
        </g>
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill="var(--art-moon)" />
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill={url("moon-limb")} />
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} stroke="var(--gold)" strokeWidth={1.6} />
        <g transform={`translate(${DEER_AT.x} ${DEER_AT.y}) scale(${DEER_AT.s})`}>
          <MoonDeer smudge={url("smudge")} />
        </g>
      </g>

      {/* Śaṅkara's trident */}
      <g {...part("sankara")} strokeLinecap="round">
        <path d={`M ${TRIDENT.x} ${TRIDENT.top + 40} L ${TRIDENT.x} ${TRIDENT.foot}`} stroke="var(--art-turmeric)" strokeWidth={3} />
        <path d={`M ${TRIDENT.x} ${TRIDENT.top + 40} L ${TRIDENT.x} ${TRIDENT.foot}`} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.8} />
        <path d={TRIDENT_HEAD} stroke="var(--gold)" strokeWidth={2.4} />
        <path d={`M ${TRIDENT.x - 8} ${TRIDENT.top + 44} L ${TRIDENT.x + 8} ${TRIDENT.top + 44}`} stroke="var(--gold)" strokeWidth={2.4} />
        {PRONG_TIPS.map((p, i) => (
          <path key={i} d={`M ${p.x} ${p.y} L ${p.x + 3.4} ${p.y + 9} L ${p.x - 3.4} ${p.y + 9} Z`} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
        ))}
      </g>

      {/* His drum, tied to it, drawn in at the waist */}
      <g {...part("waist")} strokeLinejoin="round">
        <path d={DRUM_CORD} stroke="var(--art-vermilion)" strokeWidth={0.9} strokeLinecap="round" />
        <path d={DRUM_BODY} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={1} />
        <ellipse cx={DRUM.x} cy={DRUM.y - DRUM.half} rx={DRUM.face} ry={2.6} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} />
        <ellipse cx={DRUM.x} cy={DRUM.y + DRUM.half} rx={DRUM.face} ry={2.6} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} />
        <path d={`M ${DRUM.x - DRUM.waist - 1.4} ${DRUM.y} L ${DRUM.x + DRUM.waist + 1.4} ${DRUM.y}`} stroke="var(--art-vermilion)" strokeWidth={2.2} strokeLinecap="round" />
        <path d={DRUM_BEADS} stroke="var(--art-vermilion)" strokeWidth={0.8} strokeLinecap="round" />
        <circle cx={DRUM.x + 15} cy={DRUM.y + 17} r={2} fill="var(--gold)" />
      </g>

      {/* Śrī's lotus, and the gold that falls from it */}
      <g {...part("sri")}>
        <circle className="m-shimmer" cx={SRI.x} cy={SRI.y} r={40} fill={url("sri")} />
        <g transform={`translate(${SRI.x} ${SRI.y}) scale(${SRI.s})`}>
          <OpenLotus pad={false} shade="var(--art-crimson)" />
        </g>
        <g fill="var(--gold)">
          {GOLD_FALL.map((g) => (
            <circle key={g.k} className={TWINKLE[g.k % 3]} cx={g.x} cy={g.y} r={g.r} />
          ))}
        </g>
      </g>

      {/* A pool so still the moon lies in it whole */}
      <g {...part("peace")}>
        {POOL_LINES.map((l) => (
          <path
            key={l.i}
            d={
              l.gap
                ? `M ${POOL.x - l.hw} ${l.y} L ${REFLECTION.x - l.gap} ${l.y} M ${REFLECTION.x + l.gap} ${l.y} L ${POOL.x + l.hw} ${l.y}`
                : `M ${POOL.x - l.hw} ${l.y} L ${POOL.x + l.hw} ${l.y}`
            }
            stroke={url("pool")}
            strokeWidth={l.i === 0 ? 1 : 0.6}
            strokeOpacity={l.i === 0 ? 0.9 : 0.6}
          />
        ))}
        <ellipse className="m-shimmer" cx={REFLECTION.x} cy={REFLECTION.y} rx={REFLECTION.rx + 16} ry={REFLECTION.ry + 7} fill={url("reflection")} fillOpacity={0.4} />
        <ellipse cx={REFLECTION.x} cy={REFLECTION.y} rx={REFLECTION.rx} ry={REFLECTION.ry} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1} />
        <g transform={`translate(${REFLECTION.x - 1} ${REFLECTION.y + 1}) scale(0.24 -0.09)`}>
          <MoonDeer smudge={url("smudge")} />
        </g>
      </g>

      {/* A plumb line, hanging straight */}
      <g {...part("true")}>
        <circle cx={PLUMB.x} cy={PLUMB.top} r={2.6} fill="var(--gold)" />
        <path d={`M ${PLUMB.x} ${PLUMB.top} L ${PLUMB.x} ${PLUMB.bob - 6}`} stroke="var(--gold)" strokeWidth={0.8} />
        <path d={BOB} fill="var(--gold)" stroke="var(--gold-soft)" strokeWidth={0.6} />
        <path d={`M ${PLUMB.x - 2} ${PLUMB.bob - 2} L ${PLUMB.x - 2} ${PLUMB.bob + 5}`} stroke="var(--art-moon)" strokeWidth={0.9} strokeLinecap="round" strokeOpacity={0.8} />
      </g>

      {/* Her light, with nothing under it */}
      <g {...part("unsupported")}>
        <g stroke="var(--gold)" strokeWidth={1} strokeDasharray="1.5 3.5" strokeLinecap="round" strokeOpacity={0.7}>
          <path d={SEAT_PETALS.join(" ")} />
          <path d={SEAT_BASE} />
        </g>
        <circle className="m-breathe" cx={LIGHT.x} cy={LIGHT.y} r={64} fill={url("light")} />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={9} fill="var(--art-core)" />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={13} stroke="var(--gold)" strokeWidth={0.9} strokeOpacity={0.8} />
      </g>

      {/* A lotus leaf the water does not wet */}
      <g {...part("unstained")} transform={`translate(${LEAF_AT.x} ${LEAF_AT.y})`}>
        <path d={LEAF_D} fill="var(--leaf)" fillOpacity={0.85} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.6} strokeLinejoin="round" />
        <path d={LEAF_VEINS} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.55} />
        {BEADS.map((b, i) => (
          <g key={i} className={TWINKLE[i % 3]}>
            <circle cx={b.x} cy={b.y - b.r * 0.6} r={b.r} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
            <circle cx={round(b.x - b.r * 0.35)} cy={round(b.y - b.r)} r={round(b.r * 0.3)} fill="var(--art-moon)" />
          </g>
        ))}
      </g>
    </svg>
  );
}
