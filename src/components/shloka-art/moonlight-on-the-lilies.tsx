/**
 * Shloka 87 — "Knowledge and ignorance, and the moonlight in Kāmeśa's eyes".
 *
 * Under the card her light as moonlight, its rings going out over a pool,
 * and on the pool two white night lilies opening to it. At the pool's left
 * the same water risen as a wave, broken into foam, rounded into bubbles. At
 * the right of the crown the logicians' hill, smoke going up from it and the
 * fire behind its ridge unseen; and on the near bank a rope lying by a lamp,
 * plainly a rope where the lamp reaches and a snake where it does not. Which
 * name each part answers to is written up for readers in the registry, next
 * to this artwork's entry.
 */

import { artIds, NightLily, partProps, round, StillLamp, taper, through } from "./primitives";
import type { ArtProps } from "./types";

/* ── Her light as moonlight, and the night lilies ──────────────────────── */

const HER = { x: 300, y: 474 };
const RINGS = [56, 80, 104, 128, 152];
const POND = { x: 300, y: 576, rx: 180, ry: 30 };
const PADS = [
  { x: 290, y: 588, r: 14 },
  { x: 424, y: 572, r: 11 },
  { x: 360, y: 594, r: 10 },
];
const LILIES = [
  { x: 340, y: 570, s: 3 },
  { x: 398, y: 584, s: 2.4 },
];
const GLADE = Array.from({ length: 5 }, (_, k) => ({ y: POND.y - 14 + k * 7, w: 4 + (k % 2) * 3 + k * 1.6 }));

/* ── One water as wave, foam and bubble ────────────────────────────────── */

const WAVE =
  "M 124 578 C 148 572 156 540 172 520 C 188 511 208 514 215 527 C 218 534 212 540 205 536 C 199 531 191 531 187 538 C 181 551 198 568 236 578 Z";
const WAVE_LINE = "M 140 574 C 154 566 162 540 174 528 C 186 521 200 522 206 530";
const FOAM = [
  { x: 214, y: 522, r: 2.6 },
  { x: 219, y: 529, r: 1.8 },
  { x: 208, y: 515, r: 2 },
  { x: 199, y: 512, r: 1.6 },
  { x: 222, y: 518, r: 1.2 },
  { x: 226, y: 526, r: 1 },
  { x: 214, y: 508, r: 1.1 },
  { x: 230, y: 534, r: 0.9 },
];
const BUBBLES = [
  { x: 248, y: 572, r: 5 },
  { x: 262, y: 578, r: 3.4 },
  { x: 240, y: 584, r: 2.6 },
];

/* ── The logicians' hill: smoke seen, fire unseen ──────────────────────── */

const HILL = "M 356 210 C 392 180 418 132 446 116 C 460 108 474 114 490 136 C 508 162 530 192 556 210 Z";
const PEAK = { x: 452, y: 112 };
const SMOKE = through([
  { x: 452, y: 110 },
  { x: 446, y: 84 },
  { x: 456, y: 60 },
  { x: 440, y: 36 },
  { x: 446, y: 12 },
]);

/* ── The rope by the lamp ──────────────────────────────────────────────── */

const LAMP = { x: 506, y: 628 };
const ROPE = through([
  { x: 318, y: 660 },
  { x: 342, y: 644 },
  { x: 372, y: 656 },
  { x: 404, y: 672 },
  { x: 436, y: 658 },
  { x: 462, y: 642 },
  { x: 488, y: 646 },
]);
const ROPE_D = ROPE.map((p, k) => `${k ? "L" : "M"} ${round(p.x)} ${round(p.y)}`).join(" ");
const HEAD = { x: 313, y: 664, deg: 146 };
const FRAY = { x: 488, y: 646 };

export function MoonlightOnTheLilies({ idPrefix = "sa87", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("pond")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.6 }} />
          <stop offset="0.8" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("wave")} x1={0} y1={510} x2={0} y2={580} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.95 }} />
          <stop offset="1" style={{ stopColor: "var(--leaf)", stopOpacity: 0.45 }} />
        </linearGradient>
        <linearGradient id={id("hill")} x1={0} y1={110} x2={0} y2={210} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--leaf)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--leaf)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("ridge")} x1={0} y1={110} x2={0} y2={200} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("fire")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.45 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-ember)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-ember)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("smoke")} x1={0} y1={112} x2={0} y2={10} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("smoke-line")} x1={0} y1={112} x2={0} y2={10} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("lamplight")} gradientUnits="userSpaceOnUse" cx={LAMP.x} cy={LAMP.y} r={200}>
          <stop offset="0.5" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="0.62" style={{ stopColor: "white", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("dusk")} gradientUnits="userSpaceOnUse" cx={LAMP.x} cy={LAMP.y} r={200}>
          <stop offset="0.5" style={{ stopColor: "white", stopOpacity: 0 }} />
          <stop offset="0.62" style={{ stopColor: "white", stopOpacity: 1 }} />
        </radialGradient>
        <radialGradient id={id("glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <mask id={id("lit")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={830} fill={url("lamplight")} />
        </mask>
        <mask id={id("unlit")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={830} fill={url("dusk")} />
        </mask>
      </defs>

      {/* The logicians' hill: smoke going up, the fire behind the ridge */}
      <g {...part("hill")}>
        <ellipse className="m-breathe" cx={PEAK.x + 2} cy={PEAK.y + 4} rx={20} ry={10} fill={url("fire")} />
        <path d={HILL} fill={url("hill")} />
        <path d={HILL} fill={url("hill")} transform="translate(452 210) scale(1.2 0.5) translate(-452 -210)" />
        <path d="M 356 210 C 392 180 418 132 446 116 C 460 108 474 114 490 136 C 508 162 530 192 556 210" stroke={url("ridge")} strokeWidth={1} />
        <g className="m-sway" style={{ transformBox: "view-box", transformOrigin: `${PEAK.x}px ${PEAK.y}px` }}>
          <path d={taper(SMOKE, (t) => 3 + t * 18)} fill={url("smoke")} />
          <path d={taper(SMOKE, (t) => 0.9 + t * 3.4)} fill={url("smoke-line")} />
        </g>
      </g>

      {/* The pool, and her light on it as moonlight */}
      <g {...part("moonlight")}>
        <ellipse cx={POND.x} cy={POND.y} rx={POND.rx} ry={POND.ry} fill={url("pond")} />
        <ellipse cx={POND.x} cy={POND.y} rx={POND.rx - 14} ry={POND.ry - 4} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.5} />
        {RINGS.map((r, k) => (
          <circle key={r} className="m-shimmer" cx={HER.x} cy={HER.y} r={r} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.45 - k * 0.08} />
        ))}
        {GLADE.map((g, k) => (
          <path key={k} className={k % 2 ? "m-twinkle m-late" : "m-twinkle"} d={`M ${HER.x - g.w} ${g.y} H ${HER.x + g.w}`} stroke="var(--art-core)" strokeWidth={0.9} strokeLinecap="round" strokeOpacity={0.8} />
        ))}
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={48} fill={url("her")} />
        {PADS.map((p, k) => (
          <path
            key={k}
            d={`M ${p.x} ${p.y} L ${p.x + p.r * 0.9} ${p.y - 1} A ${p.r} ${round(p.r * 0.36)} 0 1 1 ${p.x + p.r * 0.9} ${p.y + 1} Z`}
            fill="var(--leaf)"
            stroke="var(--gold-soft)"
            strokeWidth={0.4}
          />
        ))}
        {LILIES.map((l, k) => (
          <g key={k} transform={`translate(${l.x} ${l.y}) scale(${l.s})`}>
            <NightLily />
          </g>
        ))}
      </g>

      {/* One water risen as a wave, broken into foam, rounded into bubbles */}
      <g {...part("water")}>
        <path d={WAVE} fill={url("wave")} stroke="var(--gold-soft)" strokeWidth={0.7} strokeLinejoin="round" />
        <path d={WAVE_LINE} stroke="var(--art-core)" strokeWidth={0.9} strokeOpacity={0.7} strokeLinecap="round" />
        {FOAM.map((f, k) => (
          <circle key={k} className={k % 3 ? undefined : "m-twinkle"} cx={f.x} cy={f.y} r={f.r} fill="var(--art-ivory)" stroke="var(--gold-soft)" strokeWidth={0.4} />
        ))}
        {BUBBLES.map((b, k) => (
          <g key={k}>
            <circle cx={b.x} cy={b.y} r={b.r} fill="var(--art-moon)" fillOpacity={0.35} stroke="var(--gold-soft)" strokeWidth={0.7} />
            <path d={`M ${b.x - b.r * 0.55} ${b.y - b.r * 0.2} A ${b.r * 0.6} ${b.r * 0.6} 0 0 1 ${b.x - b.r * 0.1} ${b.y - b.r * 0.6}`} stroke="var(--art-core)" strokeWidth={0.8} strokeLinecap="round" />
          </g>
        ))}
      </g>

      {/* A rope by a lamp: a rope in its light, a snake out of it */}
      <g {...part("rope")}>
        <ellipse cx={404} cy={666} rx={100} ry={8} fill="var(--art-musk)" fillOpacity={0.12} />
        <g mask={`url(#${id("unlit")})`}>
          <path d={ROPE_D} stroke="var(--art-hair)" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
          <path d={ROPE_D} stroke="var(--art-moon)" strokeWidth={0.8} strokeOpacity={0.6} strokeDasharray="0.8 2.6" strokeLinecap="round" />
          <ellipse cx={HEAD.x} cy={HEAD.y} rx={8} ry={5.2} transform={`rotate(${HEAD.deg} ${HEAD.x} ${HEAD.y})`} fill="var(--art-hair)" />
        </g>
        <circle className="m-breathe" cx={LAMP.x} cy={LAMP.y - 12} r={72} fill={url("glow")} />
        <g mask={`url(#${id("lit")})`}>
          <path d={ROPE_D} stroke="var(--art-turmeric)" strokeWidth={6.6} strokeLinecap="round" strokeLinejoin="round" />
          <path d={ROPE_D} stroke="var(--art-carve)" strokeWidth={6.6} strokeOpacity={0.45} strokeDasharray="1.1 2.4" />
          <path d={ROPE_D} stroke="var(--gold)" strokeWidth={0.5} strokeOpacity={0.6} />
        </g>
        <path d={`M ${FRAY.x} ${FRAY.y} l 8 -3 M ${FRAY.x} ${FRAY.y} l 8 1 M ${FRAY.x} ${FRAY.y} l 7 5`} stroke="var(--art-turmeric)" strokeWidth={0.9} strokeLinecap="round" />
        <g transform={`translate(${LAMP.x} ${LAMP.y}) scale(2.4)`}>
          <StillLamp />
        </g>
      </g>
    </svg>
  );
}
