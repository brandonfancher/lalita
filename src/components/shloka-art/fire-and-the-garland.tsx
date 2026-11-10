/**
 * Shloka 95 — "Fire, a third eye, the garland of letters, the swan, and one plain word".
 *
 * The verse opens hot and ends fragrant, and the picture runs the same way,
 * from the crown down. In the crown her three eyes, the moon, the fire and the
 * sun, set out on a slant across the sky. Under the card her light edged all
 * round with points of flame. At the left a wagtail that will not keep still;
 * across the middle a garland of letters strung out of their usual order. In
 * front, quieter: a swan on still water, the plain word माता, and at the right
 * the green hills of Malaya with their sandal trees. Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { artIds, BLOSSOM, partProps, polar, round, Swan, ThreeEyes, ThreeEyesDefs, tongue, Wagtail } from "./primitives";
import type { ArtProps } from "./types";

/* ── Her three eyes: moon, fire and sun ────────────────────────────────── */

const MOON = { x: 246, y: 54 };
const FIRE = { x: 366, y: 124 };
const SUN = { x: 486, y: 150 };

/* ── Her light, edged with flame ───────────────────────────────────────── */

const HER = { x: 320, y: 490 };
const TONGUES = Array.from({ length: 13 }, (_, k) => {
  const deg = 200 - k * (220 / 12);
  const at = polar(HER.x, HER.y, 20, deg);
  const up = Math.sin((deg * Math.PI) / 180);
  return { ...at, turn: round((90 - deg) * 0.25), h: round(14 + 22 * Math.max(0, up) + (k % 2) * 4), k };
});

/* ── The wagtail ───────────────────────────────────────────────────────── */

const WAGTAIL = { x: 162, y: 594 };

/* ── The garland of letters, in the Mālinī order ───────────────────────── */

const MALINI = ["न", "ऋ", "ॠ", "ऌ", "ॡ", "थ", "च", "ध", "ई", "ण", "उ", "ऊ", "ब"];
const GARLAND = { x0: 196, x1: 470, y: 556, sag: 52 };
const along = (t: number) => ({ x: round(GARLAND.x0 + (GARLAND.x1 - GARLAND.x0) * t), y: round(GARLAND.y + GARLAND.sag * 4 * t * (1 - t)) });
const THREAD = Array.from({ length: 41 }, (_, i) => along(i / 40))
  .map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`)
  .join(" ");
const BEADS = MALINI.map((ch, k) => ({ ch, ...along((k + 0.5) / MALINI.length), k }));
const BLOSSOMS = MALINI.slice(1).map((_, k) => ({ ...along((k + 1) / MALINI.length), k }));

/* ── The swan on still water ───────────────────────────────────────────── */

const SWAN = { x: 196, y: 738, s: 0.82 };

/* ── The plain word ────────────────────────────────────────────────────── */

const MATA = { x: 322, y: 700 };

/* ── The hills of Malaya ───────────────────────────────────────────────── */

const HILLS = [
  { d: "M 372 700 C 410 650 436 628 462 630 C 490 632 512 650 540 640 C 566 630 590 650 620 690 L 620 740 L 372 740 Z", o: 0.22 },
  { d: "M 360 770 C 392 716 420 690 452 694 C 484 698 500 716 528 706 C 556 696 590 716 620 760 L 620 800 L 360 800 Z", o: 0.34 },
];
const SANDAL_TREES = [
  { x: 446, y: 640, s: 0.8 },
  { x: 474, y: 636, s: 0.7 },
  { x: 506, y: 646, s: 0.74 },
  { x: 420, y: 706, s: 1 },
  { x: 458, y: 698, s: 1.1 },
  { x: 496, y: 712, s: 0.96 },
];

export function FireAndTheGarland({ idPrefix = "sa95", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.32" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("flame")} x1={0} y1={0} x2={0} y2={-36} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)" }} />
        </linearGradient>
        <ThreeEyesDefs id={id} />
        <radialGradient id={id("water")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        {HILLS.map((h, k) => (
          <linearGradient key={k} id={id(`hill-${k}`)} x1={0} y1={630 + k * 64} x2={0} y2={760 + k * 40} gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--leaf)", stopOpacity: h.o * 2 }} />
            <stop offset="1" style={{ stopColor: "var(--leaf)", stopOpacity: 0 }} />
          </linearGradient>
        ))}
      </defs>

      {/* Her three eyes across the sky: the moon, the fire and the sun */}
      <g {...part("three-eyes")}>
        <ThreeEyes moon={MOON} fire={FIRE} sun={SUN} url={url} />
      </g>

      {/* Her light, edged all round with points of flame */}
      <g {...part("tejas")}>
        {TONGUES.map((t) => (
          <g key={t.k} transform={`translate(${t.x} ${t.y}) rotate(${t.turn})`}>
            <path className={["m-flicker", "m-flicker m-late", "m-flicker m-later"][t.k % 3]} d={tongue(t.h, 8, t.k % 2 ? 1.6 : -1.6)} fill={url("flame")} />
          </g>
        ))}
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={40} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={5} fill="var(--art-core)" />
        <circle cx={HER.x} cy={HER.y} r={8.4} stroke="var(--gold)" strokeWidth={0.8} />
      </g>

      {/* A wagtail on its stone, never still: the restless-eyed one */}
      <g {...part("lolaksi")}>
        <ellipse cx={WAGTAIL.x} cy={WAGTAIL.y + 13} rx={22} ry={5} fill="var(--art-stone)" stroke="var(--gold-soft)" strokeWidth={0.8} />
        <g transform={`translate(${WAGTAIL.x} ${WAGTAIL.y}) scale(1.1)`}>
          <g className="m-dart">
            <Wagtail />
          </g>
        </g>
      </g>

      {/* The garland of letters, strung out of their usual order */}
      <g {...part("malini")}>
        <path d={THREAD} stroke="var(--leaf)" strokeWidth={0.9} />
        {BLOSSOMS.map((b) => (
          <g key={b.k} transform={`translate(${b.x} ${b.y}) scale(1.2)`}>
            <path d={BLOSSOM} fill={b.k % 2 ? "var(--art-saffron)" : "var(--lotus)"} stroke="var(--gold)" strokeWidth={0.4} />
          </g>
        ))}
        <g fill="var(--sindura)" fontSize={17} textAnchor="middle" style={{ fontFamily: "var(--font-tiro), serif" }}>
          {BEADS.map((b) => (
            <g key={b.k}>
              <circle cx={b.x} cy={b.y + 6} r={10} fill="var(--art-core)" fillOpacity={0.2} stroke="var(--gold)" strokeWidth={0.5} />
              <text x={b.x} y={b.y + 12}>
                {b.ch}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* A swan on still water */}
      <g {...part("hamsini")}>
        <ellipse cx={SWAN.x} cy={SWAN.y + 2} rx={80} ry={12} fill={url("water")} />
        <path d={`M ${SWAN.x - 64} ${SWAN.y + 2} H ${SWAN.x + 64}`} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.7} />
        <g transform={`translate(${SWAN.x} ${SWAN.y}) scale(${SWAN.s})`}>
          <Swan />
        </g>
      </g>

      {/* The plain word: mother */}
      <g {...part("mata")}>
        <text x={MATA.x} y={MATA.y} fontSize={40} textAnchor="middle" fill="var(--sindura)" style={{ fontFamily: "var(--font-tiro), serif" }}>
          माता
        </text>
      </g>

      {/* The green hills of Malaya and their sandal trees */}
      <g {...part("malaya")}>
        {HILLS.map((h, k) => (
          <g key={k}>
            <path d={h.d} fill={url(`hill-${k}`)} />
            <path d={h.d.split(" L ")[0]} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.5} />
          </g>
        ))}
        {SANDAL_TREES.map((t, k) => (
          <g key={k} transform={`translate(${t.x} ${t.y}) scale(${t.s})`}>
            <path d="M 0 0 V -16" stroke="var(--art-musk)" strokeWidth={2} strokeLinecap="round" />
            <g className={k % 2 ? "m-sway m-late" : "m-sway"} style={{ transformBox: "view-box", transformOrigin: "0px 0px" }}>
              <ellipse cx={0} cy={-24} rx={10} ry={9} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.4} />
              <ellipse cx={-6} cy={-18} rx={6} ry={5} fill="var(--leaf)" />
              <ellipse cx={6} cy={-19} rx={6} ry={5} fill="var(--leaf)" />
              <circle cx={-3} cy={-27} r={1.1} fill="var(--art-crimson)" />
              <circle cx={4} cy={-22} r={1.1} fill="var(--art-crimson)" />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
