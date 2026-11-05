/**
 * Shloka 41 — "The axe laid to the forest of becoming".
 *
 * One syllable, bha-, turned three ways, then the good said twice. In the
 * crown her light, auspicious in its very shape, sits beside the crescent of
 * Bhava, Rudra as the source of becoming, whose wife she is. Below the card
 * stands the forest of becoming, trunk behind trunk, and a small axe has
 * been taken to it: a clearing is cut through the middle, felled trunks lie
 * in it, chips are still flying. Through the clearing a single steady line
 * of light rises from a lamp that does not flicker, the mind held on her.
 * At the left stands a full pot, the auspicious thing she is fond of; at the
 * right a tray of kumkum, turmeric and bangles, the married woman's good
 * fortune, which she hands out. Which name each part answers to is written
 * up for readers in the registry, next to this artwork's entry.
 */

import { Axe, artIds, litPart, partProps, polar, round } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

const HER = { x: 392, y: 126 };
const BHAVA = { x: 478, y: 112 };
const CRESCENT = litPart(4, 16);

/* ── The forest of becoming ────────────────────────────────────────────── */

const GROUND = 584;
const GAP = { x: 380, half: 34 };
type Tree = { x: number; h: number; w: number; back: boolean };
const TREES: Tree[] = [
  { x: 150, h: 128, w: 30, back: true },
  { x: 196, h: 150, w: 34, back: true },
  { x: 250, h: 136, w: 32, back: true },
  { x: 300, h: 158, w: 36, back: true },
  { x: 462, h: 150, w: 34, back: true },
  { x: 508, h: 128, w: 30, back: true },
  { x: 172, h: 104, w: 30, back: false },
  { x: 226, h: 118, w: 32, back: false },
  { x: 282, h: 110, w: 30, back: false },
  { x: 328, h: 124, w: 32, back: false },
  { x: 438, h: 116, w: 32, back: false },
  { x: 490, h: 100, w: 28, back: false },
];
function tree({ x, h, w }: Tree, k: number) {
  const top = GROUND - h;
  const trunk = `M ${x - 3.2} ${GROUND} C ${x - 2.4} ${GROUND - h * 0.4} ${x - 1.6} ${top + w * 0.6} ${x} ${top + w * 0.4} C ${x + 1.6} ${top + w * 0.6} ${x + 2.4} ${GROUND - h * 0.4} ${x + 3.2} ${GROUND} Z`;
  const crowns = [
    { cx: x, cy: top + w * 0.5, r: w * 0.62 },
    { cx: x - w * 0.42, cy: top + w * 0.9, r: w * 0.48 },
    { cx: x + w * 0.42, cy: top + w * 0.86 + (k % 2) * 3, r: w * 0.5 },
    { cx: x + (k % 2 ? -1 : 1) * w * 0.12, cy: top + w * 1.24, r: w * 0.44 },
  ].map((c) => ({ cx: round(c.cx), cy: round(c.cy), r: round(c.r) }));
  return { trunk, crowns };
}
const FOREST = TREES.map((t, k) => ({ ...tree(t, k), back: t.back, k }));
/** In the clearing: two stumps and two felled trunks, the axe in the nearer. */
const STUMPS = [GAP.x - 16, GAP.x + 18].map((x) => `M ${x - 4} ${GROUND} L ${x - 4} ${GROUND - 10} L ${x - 1} ${GROUND - 13} L ${x + 2} ${GROUND - 9} L ${x + 4} ${GROUND - 11} L ${x + 4} ${GROUND}`);
const FELLED = [
  `M ${GAP.x - 64} ${GROUND + 8} L ${GAP.x - 6} ${GROUND - 4}`,
  `M ${GAP.x + 2} ${GROUND + 12} L ${GAP.x + 74} ${GROUND + 2}`,
];
const AXE_AT = { x: GAP.x + 30, y: GROUND - 30 };
const CHIPS = Array.from({ length: 9 }, (_, k) => {
  const p = polar(GAP.x + 18, GROUND - 16, 10 + (k % 3) * 9, 60 + k * 18);
  return { ...p, turn: k * 37, k };
});

/* ── The mind held on her ──────────────────────────────────────────────── */

const LAMP = { x: GAP.x, y: GROUND + 40 };
const THREAD = `M ${LAMP.x} ${LAMP.y - 22} L ${HER.x} ${HER.y + 14}`;

/* ── The full pot, and the tray of good fortune ────────────────────────── */

const KUMBHA = { x: 158, y: GROUND + 34 };
const POT_BODY = "M -9 -20 C -26 -18 -28 6 -14 14 C -6 18 6 18 14 14 C 28 6 26 -18 9 -20 Z";
const POT_NECK = "M -9 -20 L -7 -27 L 7 -27 L 9 -20 Z M -11 -29 L 11 -29 L 11 -26 L -11 -26 Z";
const MANGO = [-60, -32, 0, 32, 60];
const TRAY = { x: 488, y: GROUND + 40 };
const MOTES = Array.from({ length: 10 }, (_, k) => ({
  x: round(TRAY.x - 26 + ((k * 23) % 52)),
  y: round(TRAY.y - 30 - ((k * 17) % 56)),
  k,
}));

export function ForestOfBecoming({ idPrefix = "sa41", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("her-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("moon-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("crescent-tint")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("forest-shade")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("clearing")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("thread")} x1={0} y1={LAMP.y} x2={0} y2={HER.y} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0.3 }} />
        </linearGradient>
        <radialGradient id={id("gift-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Her light, auspicious in its very shape */}
      <g {...part("form")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={96} fill={url("her-glow")} />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={28} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={5.8} fill="var(--art-core)" />
        <circle cx={HER.x} cy={HER.y} r={9.4} stroke="var(--gold)" strokeWidth={0.9} />
      </g>

      {/* Bhava's crescent beside her: she is his wife */}
      <g {...part("bhava")}>
        <circle className="m-shimmer m-late" cx={BHAVA.x} cy={BHAVA.y} r={56} fill={url("moon-glow")} />
        <circle cx={BHAVA.x} cy={BHAVA.y + 4} r={26} fill={url("crescent-tint")} />
        <g transform={`translate(${BHAVA.x} ${BHAVA.y + 3}) rotate(180)`}>
          <path d={CRESCENT} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1} />
        </g>
      </g>

      {/* The forest of becoming, and the small axe that has cut a clearing through it */}
      <g {...part("axe")}>
        <ellipse cx={330} cy={GROUND - 60} rx={230} ry={110} fill={url("forest-shade")} />
        <ellipse className="m-breathe" cx={GAP.x} cy={GROUND - 40} rx={GAP.half + 14} ry={90} fill={url("clearing")} />
        {FOREST.map((t) => (
          <g key={t.k} className={t.k % 3 === 0 ? "m-sway" : t.k % 3 === 1 ? "m-sway m-late" : undefined} opacity={t.back ? 0.55 : 1}>
            <path d={t.trunk} fill="var(--art-musk)" />
            {t.crowns.map((c, i) => (
              <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={i === 3 ? "var(--art-musk)" : "var(--leaf)"} fillOpacity={i === 3 ? 0.45 : 0.9} stroke="var(--art-musk)" strokeWidth={0.5} strokeOpacity={0.5} />
            ))}
          </g>
        ))}
        <path d={`M 120 ${GROUND} L 540 ${GROUND}`} stroke="var(--art-musk)" strokeWidth={1} strokeOpacity={0.4} />
        <g fill="var(--art-turmeric)" stroke="var(--art-musk)" strokeWidth={0.6}>
          {STUMPS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {FELLED.map((d, i) => (
          <g key={i}>
            <path d={d} stroke="var(--art-musk)" strokeWidth={6.4} strokeLinecap="round" />
            <path d={d} stroke="var(--art-turmeric)" strokeWidth={0.8} strokeOpacity={0.7} strokeLinecap="round" />
          </g>
        ))}
        <g transform={`translate(${AXE_AT.x} ${AXE_AT.y}) rotate(-145) scale(1.3)`}>
          <Axe />
        </g>
      </g>

      {/* The chips still flying */}
      <g {...part("chips")} fill="var(--art-turmeric)" stroke="var(--art-musk)" strokeWidth={0.4}>
        {CHIPS.map((c) => (
          <rect key={c.k} className={TWINKLE[c.k % 3]} x={c.x - 2} y={c.y - 1} width={4} height={2} transform={`rotate(${c.turn} ${c.x} ${c.y})`} />
        ))}
      </g>

      {/* The mind held on her: a lamp that does not flicker, and its one straight line of light */}
      <g {...part("contemplation")}>
        <path d={THREAD} stroke={url("thread")} strokeWidth={0.9} strokeDasharray="2 3" strokeLinecap="round" />
        <g transform={`translate(${LAMP.x} ${LAMP.y}) scale(2.2)`}>
          <path d="M -4.4 0 Q 0 4 4.4 0 Z" fill="var(--gold)" stroke="var(--art-musk)" strokeWidth={0.4} strokeOpacity={0.5} />
          <path d="M 0 -0.6 C -1.6 -3 -1.4 -7 0 -11.6 C 1.4 -7 1.6 -3 0 -0.6 Z" fill="var(--art-saffron)" />
          <path d="M 0 -1.4 C -0.8 -3 -0.6 -5 0 -7.4 C 0.6 -5 0.8 -3 0 -1.4 Z" fill="var(--art-core)" />
        </g>
      </g>

      {/* The full pot, the auspicious thing she is fond of */}
      <g {...part("auspicious")} transform={`translate(${KUMBHA.x} ${KUMBHA.y})`}>
        {MANGO.map((deg) => (
          <path key={deg} d="M 0 -27 C -4 -34 -4 -46 0 -54 C 4 -46 4 -34 0 -27 Z" transform={`rotate(${deg} 0 -27)`} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.4} />
        ))}
        <ellipse cy={-38} rx={9} ry={11} fill="var(--art-turmeric)" stroke="var(--art-musk)" strokeWidth={0.6} />
        <path d="M -6 -44 C -2 -47 2 -47 6 -44" stroke="var(--art-musk)" strokeWidth={0.6} strokeOpacity={0.7} />
        <path d={POT_NECK} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
        <path d={POT_BODY} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
        <path d="M -22 -4 C -10 2 10 2 22 -4" stroke="var(--art-vermilion)" strokeWidth={1.4} />
        <circle cy={-6} r={2.4} fill="var(--art-vermilion)" />
      </g>

      {/* The tray of the married woman's good fortune, which she hands out */}
      <g {...part("fortune")}>
        <circle className="m-shimmer" cx={TRAY.x} cy={TRAY.y - 24} r={46} fill={url("gift-glow")} />
        {MOTES.map((m) => (
          <circle key={m.k} className={TWINKLE[m.k % 3]} cx={m.x} cy={m.y} r={1.4} fill="var(--gold)" />
        ))}
        <ellipse cx={TRAY.x} cy={TRAY.y} rx={30} ry={8} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
        <ellipse cx={TRAY.x} cy={TRAY.y - 1} rx={24} ry={5.4} stroke="var(--gold-soft)" strokeWidth={0.8} />
        <path d={`M ${TRAY.x - 18} ${TRAY.y - 1} C ${TRAY.x - 16} ${TRAY.y - 12} ${TRAY.x - 6} ${TRAY.y - 12} ${TRAY.x - 4} ${TRAY.y - 1} Z`} fill="var(--art-vermilion)" />
        <path d={`M ${TRAY.x - 2} ${TRAY.y - 1} C ${TRAY.x} ${TRAY.y - 11} ${TRAY.x + 9} ${TRAY.y - 11} ${TRAY.x + 11} ${TRAY.y - 1} Z`} fill="var(--art-turmeric)" />
        <ellipse cx={TRAY.x + 18} cy={TRAY.y - 4} rx={6} ry={6} stroke="var(--leaf)" strokeWidth={1.4} />
        <ellipse cx={TRAY.x + 20} cy={TRAY.y - 3} rx={6} ry={6} stroke="var(--art-vermilion)" strokeWidth={1.2} />
      </g>
    </svg>
  );
}
