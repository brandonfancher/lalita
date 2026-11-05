/**
 * Shloka 44 — "Ten things taken away".
 *
 * Ten names, eight of them removals. In the crown the moon, whole, with no
 * digit taken from it, and Rāhu's shadow, the swallower of moons, going
 * past it without touching. Below the card her light is a glow with no
 * outline, and round it one ring that does not begin or end. About her the
 * things that have no hold on her: at the left a lamp in a windless niche
 * that does not flicker, a clear crystal, a lotus leaf the water runs off;
 * at the right a rope of three strands that comes undone before it reaches
 * her, a fire burnt down to quiet embers, and the flower arrow of desire
 * lying where it fell. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { Crystal, CrystalDefs, FlowerArrow, LotusLeaf, MoonDeer, StillLamp, archPath, artIds, partProps, round } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── The moon nothing eats ─────────────────────────────────────────────── */

const MOON = { x: 300, y: 106, r: 42 };
const RAHU = { x: 452, y: 64, r: 30 };
/** Rāhu's way past the moon: over it and off, never across it. */
const RAHU_PATH = `M ${MOON.x - 132} ${MOON.y + 18} C ${MOON.x - 110} ${MOON.y - 70} ${RAHU.x - 120} ${RAHU.y - 30} ${RAHU.x - RAHU.r - 4} ${RAHU.y + 2}`;

/* ── Her light, without outline, in a ring without end ─────────────────── */

const HER = { x: 320, y: 506 };
const RING_R = 46;

/* ── At the left ───────────────────────────────────────────────────────── */

const NICHE = { cx: 170, cy: 456, bottom: 500 };
const NICHE_R = 24;
const LAMP = { x: NICHE.cx, y: 494 };

const CRYSTAL = { x: 232, y: 584 };

const LEAF = { x: 148, y: 604, turn: -6 };
/** Water running off the leaf's edge, leaving nothing on it. */
const RUNOFF = [
  { x: LEAF.x + 38, y: LEAF.y + 8, r: 1.8, k: 0 },
  { x: LEAF.x + 40, y: LEAF.y + 18, r: 1.5, k: 1 },
  { x: LEAF.x + 41, y: LEAF.y + 30, r: 1.2, k: 2 },
];

/* ── At the right ──────────────────────────────────────────────────────── */

/** The three strands of nature, ivory, red and dark, twisted into one rope that comes undone short of her. */
const ROPE = { from: 548, to: 420, fray: 384, y: 476 };
const STRANDS = [
  { color: "var(--art-ivory)", phase: 0, end: { x: ROPE.fray, y: ROPE.y - 20 } },
  { color: "var(--art-vermilion)", phase: (Math.PI * 2) / 3, end: { x: ROPE.fray - 6, y: ROPE.y + 4 } },
  { color: "var(--art-musk)", phase: (Math.PI * 4) / 3, end: { x: ROPE.fray + 2, y: ROPE.y + 26 } },
];
const strandPath = (phase: number, end: { x: number; y: number }) => {
  const n = 40;
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const x = ROPE.from + ((ROPE.to - ROPE.from) * i) / n;
    return `${i ? "L" : "M"} ${round(x)} ${round(ROPE.y + Math.sin(i * 0.9 + phase) * 3)}`;
  }).join(" ");
  const last = { x: ROPE.to, y: round(ROPE.y + Math.sin(n * 0.9 + phase) * 3) };
  return `${pts} C ${last.x - 14} ${last.y} ${end.x + 16} ${round((last.y + end.y) / 2)} ${end.x} ${end.y}`;
};

const GROUND = 604;
const HEARTH = { x: 412, y: GROUND - 4 };
const EMBERS = [
  { x: -13, y: -3, r: 2.6 },
  { x: 2, y: -7, r: 3.2 },
  { x: 15, y: -2, r: 2.2 },
  { x: -3, y: 0, r: 2 },
  { x: 8, y: -1, r: 1.6 },
];
const SMOKE = `M ${HEARTH.x + 2} ${HEARTH.y - 12} L ${HEARTH.x + 2} ${HEARTH.y - 70}`;

/** Lying on the ground, head to the right, a little askew. */
const ARROW = { x: 452, y: GROUND - 3, turn: 93 };

export function TenTakenAway({ idPrefix = "sa44", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
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
        <radialGradient id={id("rahu")}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.5 }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("her")} cx={HER.x} cy={HER.y} r={84} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.14" style={{ stopColor: "var(--art-core)", stopOpacity: 0.8 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("niche")} cx={NICHE.cx} cy={NICHE.bottom} r={40} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <CrystalDefs id={id} />
        <radialGradient id={id("hearth")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.34 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("ash")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.75 }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("smoke")} x1={0} y1={HEARTH.y - 12} x2={0} y2={HEARTH.y - 70} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>

      {/* Rāhu's shadow, going past */}
      <g {...part("calamity")}>
        <path d={RAHU_PATH} stroke="var(--art-musk)" strokeWidth={1} strokeOpacity={0.5} strokeDasharray="1.5 4" strokeLinecap="round" />
        <circle className="m-sink" cx={RAHU.x} cy={RAHU.y} r={RAHU.r + 12} fill={url("rahu")} />
        <circle cx={RAHU.x} cy={RAHU.y} r={RAHU.r} stroke="var(--art-musk)" strokeWidth={0.8} strokeOpacity={0.4} />
      </g>

      {/* The moon, whole */}
      <g {...part("partless")}>
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r + 46} fill={url("moon-glow")} />
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill="var(--art-moon)" />
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill={url("moon-limb")} />
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} stroke="var(--gold)" strokeWidth={1.6} />
        <g transform={`translate(${MOON.x - 2} ${MOON.y + 6}) scale(0.5)`}>
          <MoonDeer smudge={url("smudge")} />
        </g>
      </g>

      {/* Her light: a glow with no outline */}
      <g {...part("formless")}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={84} fill={url("her")} />
      </g>

      {/* One ring round it, without beginning or end */}
      <g {...part("eternal")} className="m-shimmer">
        <circle cx={HER.x} cy={HER.y} r={RING_R} stroke="var(--gold)" strokeWidth={1.4} />
        <circle cx={HER.x} cy={HER.y} r={RING_R + 5} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.6} />
      </g>

      {/* A lamp in a windless niche, not flickering */}
      <g {...part("unperturbed")}>
        <circle cx={NICHE.cx} cy={NICHE.bottom} r={40} fill={url("niche")} />
        <path d={`${archPath(NICHE, NICHE_R)} Z`} fill="var(--art-musk)" fillOpacity={0.12} />
        <path d={archPath(NICHE, NICHE_R)} stroke="var(--gold)" strokeWidth={1.2} strokeLinejoin="round" />
        <path d={`M ${NICHE.cx - NICHE_R - 8} ${NICHE.bottom} L ${NICHE.cx + NICHE_R + 8} ${NICHE.bottom}`} stroke="var(--gold)" strokeWidth={1.6} strokeLinecap="round" />
        <g transform={`translate(${LAMP.x} ${LAMP.y}) scale(2.2)`}>
          <StillLamp />
        </g>
      </g>

      {/* A clear crystal */}
      <g {...part("stainless")}>
        <Crystal x={CRYSTAL.x} y={CRYSTAL.y} url={url} />
      </g>

      {/* A lotus leaf, and the water running off it */}
      <g {...part("untainted")}>
        <g transform={`translate(${LEAF.x} ${LEAF.y}) rotate(${LEAF.turn})`}>
          <LotusLeaf />
        </g>
        <g fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.4}>
          {RUNOFF.map((d) => (
            <circle key={d.k} className={TWINKLE[d.k]} cx={d.x} cy={d.y} r={d.r} />
          ))}
        </g>
      </g>

      {/* The three strands, coming undone short of her */}
      <g {...part("strands")} strokeLinecap="round">
        {STRANDS.map((s, i) => (
          <g key={i}>
            {i === 0 && <path d={strandPath(s.phase, s.end)} stroke="var(--gold)" strokeWidth={3} strokeOpacity={0.7} />}
            <path d={strandPath(s.phase, s.end)} stroke={s.color} strokeWidth={2.2} strokeOpacity={i === 2 ? 0.8 : 1} />
          </g>
        ))}
        <path d={`M ${ROPE.from} ${ROPE.y} L ${ROPE.to} ${ROPE.y}`} stroke="var(--gold)" strokeWidth={0.5} strokeOpacity={0.5} />
      </g>

      {/* A fire burnt down to its embers */}
      <g {...part("tranquil")}>
        <circle cx={HEARTH.x} cy={HEARTH.y - 4} r={40} fill={url("hearth")} />
        <path d={SMOKE} stroke={url("smoke")} strokeWidth={1.2} strokeLinecap="round" />
        <ellipse cx={HEARTH.x} cy={HEARTH.y} rx={34} ry={12} fill={url("ash")} />
        <g transform={`translate(${HEARTH.x} ${HEARTH.y})`}>
          {EMBERS.map((e, i) => (
            <circle key={i} className={i % 2 ? "m-breathe m-late" : "m-breathe"} cx={e.x} cy={e.y} r={e.r} fill={i % 2 ? "var(--art-vermilion)" : "var(--art-saffron)"} fillOpacity={0.85} />
          ))}
        </g>
      </g>

      {/* The flower arrow of desire, lying where it fell */}
      <g {...part("desireless")}>
        <ellipse cx={ARROW.x + 40} cy={GROUND + 3} rx={50} ry={4} fill="var(--art-musk)" fillOpacity={0.14} />
        <g transform={`translate(${ARROW.x} ${ARROW.y}) rotate(${ARROW.turn}) scale(0.8)`}>
          <FlowerArrow length={84} />
        </g>
      </g>
    </svg>
  );
}
