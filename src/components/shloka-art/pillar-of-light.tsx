/**
 * Shloka 89 — "Approved by the learned, and out of reach of speech".
 *
 * Her light as a pillar standing through the whole picture, fading out above
 * and below: the goose flies up beside it and the boar digs down at its
 * foot, and neither comes to an end of it. At the crown's right Śiva's
 * crescent, and between it and the pillar two lines of regard, his toward
 * her and hers toward him. At the left a sun and a moon gone pale, lit only on
 * the side that faces her; at the right a line of letters and a line of
 * thought rising toward her and turning back. In front, the seers' lamps and
 * flowers offered at the pillar's foot. Which name each part answers to is
 * written up for readers in the registry, next to this artwork's entry.
 */

import { artIds, Boar, glint, Goose, Lamp, litPart, partProps, polar, round, taper, through } from "./primitives";
import type { ArtProps } from "./types";

/* ── The pillar, the goose and the boar ────────────────────────────────── */

const PILLAR = { x: 320, top: 24, foot: 790, w: 15 };
const GOOSE = { x: 276, y: 446, s: 2.2 };
const BOAR = { x: 262, y: 716, s: 0.9 };
const CLODS = [
  { x: 228, y: 700, r: 2.6 },
  { x: 220, y: 690, r: 1.8 },
  { x: 236, y: 686, r: 1.6 },
  { x: 212, y: 702, r: 1.4 },
  { x: 230, y: 676, r: 1.2 },
];

/* ── His crescent, and the two lines of regard ─────────────────────────── */

const CRESCENT = { x: 482, y: 438 };
const HIS_LOOK = "M 468 426 C 436 404 380 408 344 430";
const HER_LOOK = "M 344 452 C 380 474 436 470 468 450";

/* ── The sun and the moon, lit from her ────────────────────────────────── */

const SUN = { x: 170, y: 492, r: 26 };
const MOON = { x: 222, y: 566, r: 15 };
const STARS = [
  { x: 136, y: 552, s: 5 },
  { x: 236, y: 504, s: 4 },
  { x: 152, y: 604, s: 3.6 },
];

/* ── Letters and thought, turning back ─────────────────────────────────── */

const WORDS = through([
  { x: 500, y: 716 },
  { x: 480, y: 636 },
  { x: 434, y: 572 },
  { x: 392, y: 562 },
  { x: 384, y: 586 },
  { x: 396, y: 610 },
]);
const LETTERS = ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ"];
const MIND = through([
  { x: 518, y: 680 },
  { x: 500, y: 616 },
  { x: 460, y: 562 },
  { x: 416, y: 530 },
  { x: 398, y: 534 },
  { x: 404, y: 556 },
]);
const pick = (pts: { x: number; y: number }[], n: number) =>
  Array.from({ length: n }, (_, k) => pts[Math.round((k / (n - 1)) * (pts.length - 1))]);
const LETTER_AT = pick(WORDS, LETTERS.length);
const THOUGHT_AT = pick(MIND, 15);

/* ── The seers' lamps, and the flowers offered ─────────────────────────── */

const LAMPS = [
  { x: 166, y: 668 },
  { x: 204, y: 660 },
  { x: 242, y: 666 },
];
const FLOWERS = [
  { x: 344, y: 690, k: 0 },
  { x: 356, y: 684, k: 1 },
  { x: 368, y: 692, k: 2 },
  { x: 350, y: 698, k: 3 },
  { x: 362, y: 700, k: 4 },
  { x: 378, y: 686, k: 5 },
  { x: 338, y: 702, k: 6 },
];
const PETALS = Array.from({ length: 5 }, (_, k) => polar(0, 0, 2.4, 90 + k * 72));
const FLOWER_FILL = ["var(--art-vermilion)", "var(--art-ivory)", "var(--art-saffron)", "var(--lotus)"];

export function PillarOfLight({ idPrefix = "sa89", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={id("column")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.7 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("halo")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("ends")} x1={0} y1={PILLAR.top} x2={0} y2={PILLAR.foot} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "white", stopOpacity: 0 }} />
          <stop offset="0.16" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="0.8" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="1" style={{ stopColor: "white", stopOpacity: 0 }} />
        </linearGradient>
        <mask id={id("pillar")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect x={0} y={PILLAR.top} width={640} height={PILLAR.foot - PILLAR.top} fill={url("ends")} />
        </mask>
        <radialGradient id={id("pale")}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.28 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.16 }} />
        </radialGradient>
        <linearGradient id={id("lit-side")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0.5" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0.85 }} />
        </linearGradient>
        <radialGradient id={id("hollow")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Her light as a pillar without end: the goose flying up, the boar digging down */}
      <g {...part("pillar")}>
        <g mask={`url(#${id("pillar")})`}>
          <rect className="m-breathe" x={PILLAR.x - 52} y={PILLAR.top} width={104} height={PILLAR.foot - PILLAR.top} fill={url("halo")} />
          <rect x={PILLAR.x - PILLAR.w} y={PILLAR.top} width={PILLAR.w * 2} height={PILLAR.foot - PILLAR.top} fill={url("column")} />
          <path d={`M ${PILLAR.x - PILLAR.w} ${PILLAR.top} V ${PILLAR.foot} M ${PILLAR.x + PILLAR.w} ${PILLAR.top} V ${PILLAR.foot}`} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.6} />
        </g>
        <g transform={`translate(${GOOSE.x} ${GOOSE.y}) rotate(-60) scale(${-GOOSE.s} ${GOOSE.s})`}>
          <g className="m-sway">
            <Goose up />
          </g>
        </g>
        <ellipse cx={PILLAR.x - 22} cy={BOAR.y + 26} rx={44} ry={12} fill={url("hollow")} />
        <g transform={`translate(${BOAR.x} ${BOAR.y}) rotate(30) scale(${BOAR.s})`}>
          <Boar />
        </g>
        {CLODS.map((c, k) => (
          <circle key={k} cx={c.x} cy={c.y} r={c.r} fill="var(--art-ember)" fillOpacity={0.7} stroke="var(--art-musk)" strokeWidth={0.4} />
        ))}
      </g>

      {/* Śiva's crescent, and his regard going to her */}
      <g {...part("dear")}>
        <g transform={`translate(${CRESCENT.x} ${CRESCENT.y + 4}) rotate(160)`}>
          <path d={litPart(4, 13)} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1} />
        </g>
        <path className="m-shimmer" d={HIS_LOOK} stroke="var(--gold)" strokeWidth={1.2} strokeDasharray="1 5" strokeLinecap="round" />
      </g>

      {/* Her regard going to him */}
      <g {...part("intent")}>
        <path className="m-shimmer m-late" d={HER_LOOK} stroke="var(--art-vermilion)" strokeWidth={1.2} strokeDasharray="1 5" strokeLinecap="round" />
      </g>

      {/* The sun and the moon gone pale, lit only from her side */}
      <g {...part("self-lit")}>
        {[SUN, MOON].map((b) => (
          <g key={b.r}>
            <circle cx={b.x} cy={b.y} r={b.r} fill={url("pale")} stroke="var(--gold-soft)" strokeWidth={0.8} />
            <circle cx={b.x} cy={b.y} r={b.r} fill={url("lit-side")} />
          </g>
        ))}
        <circle cx={SUN.x} cy={SUN.y} r={SUN.r - 8} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.6} />
        {STARS.map((s, k) => (
          <path key={k} transform={`translate(${s.x} ${s.y})`} d={glint(s.s)} fill="var(--art-hair)" fillOpacity={0.4} />
        ))}
      </g>

      {/* Letters and thought rising toward her, and turning back */}
      <g {...part("beyond-words")}>
        <path d={taper(MIND, (t) => 0.4 + (1 - Math.abs(t - 0.5) * 2) * 0.4)} fill="var(--gold-soft)" fillOpacity={0.3} />
        {THOUGHT_AT.map((p, k) => (
          <circle key={k} className={k % 3 ? undefined : "m-twinkle"} cx={round(p.x)} cy={round(p.y)} r={round(2.8 - k * 0.12)} stroke="var(--gold-soft)" strokeWidth={0.7} />
        ))}
        {LETTER_AT.map((p, k) => (
          <text
            key={k}
            x={round(p.x)}
            y={round(p.y)}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={round(15 - k * 0.6)}
            fill="var(--gold)"
            fillOpacity={round(1 - k * 0.05)}
            style={{ fontFamily: "var(--font-tiro), serif" }}
          >
            {LETTERS[k]}
          </text>
        ))}
      </g>

      {/* The seers' lamps raised to her */}
      <g {...part("learned")}>
        {LAMPS.map((l, k) => (
          <g key={k} transform={`translate(${l.x} ${l.y}) scale(2.2)`}>
            <Lamp k={k} seer />
          </g>
        ))}
      </g>

      {/* Flowers offered at the pillar's foot */}
      <g {...part("worship")}>
        {FLOWERS.map((f) => (
          <g key={f.k} transform={`translate(${f.x} ${f.y}) scale(1.7)`}>
            {PETALS.map((p, k) => (
              <circle key={k} cx={p.x} cy={p.y} r={1.9} fill={FLOWER_FILL[f.k % 4]} stroke="var(--gold)" strokeWidth={0.3} />
            ))}
            <circle r={1.2} fill="var(--art-turmeric)" />
          </g>
        ))}
      </g>
    </svg>
  );
}
