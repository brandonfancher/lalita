/**
 * Shloka 81 — "The four levels of speech, and the swan on the mind".
 *
 * The verse descends, and so does the picture. In the crown a still point,
 * and round it short strokes all turned inward to it. From it a thread runs
 * out and down the right column through the stages of speech: a peacock's egg,
 * in which every colour of the bird is already present and none yet shows;
 * a flute with its notes in order and no breath in it; and a bell, ringing.
 * Under the card her light, and below it a still lake where a swan floats.
 * Which name each part answers to is written up for readers in the registry,
 * next to this artwork's entry.
 */

import { artIds, Bell, eggPath, partProps, polar, round, Swan } from "./primitives";
import type { ArtProps } from "./types";

/* ── The still point and the inward strokes ────────────────────────────── */

const COL = 568;
const PARA = { x: COL, y: 78 };
/** Chevrons on two rings, every one pointing in at the point. */
const INWARD = [
  { r: 30, n: 8, size: 5, from: 0 },
  { r: 50, n: 12, size: 6.4, from: 15 },
]
  .flatMap(({ r, n, size, from }) =>
    Array.from({ length: n }, (_, k) => {
      const deg = from + (k * 360) / n;
      const tip = polar(PARA.x, PARA.y, r - size * 0.6, deg);
      const a = polar(PARA.x, PARA.y, r + size * 0.5, deg + (size * 52) / r);
      const b = polar(PARA.x, PARA.y, r + size * 0.5, deg - (size * 52) / r);
      return `M ${round(a.x)} ${round(a.y)} L ${round(tip.x)} ${round(tip.y)} L ${round(b.x)} ${round(b.y)}`;
    }),
  )
  .join(" ");

/* ── The thread down the right column ──────────────────────────────────── */

const EGG = { x: COL, y: 176, w: 20, h: 27 };
const FLUTE = { y: 248, left: 512, right: 624, r: 4.4, tilt: -6 };
const BELL = { x: COL, y: 268, s: 2.4 };
const THREAD = `M ${COL} ${PARA.y + 8} L ${COL} ${EGG.y - EGG.h - 4} M ${COL} ${EGG.y + EGG.h + 4} L ${COL} ${BELL.y}`;
const HOLES = [0.36, 0.46, 0.56, 0.66, 0.76, 0.86].map((t) => round(FLUTE.left + t * (FLUTE.right - FLUTE.left)));
const NODES = [0.26, 0.97].map((t) => round(FLUTE.left + t * (FLUTE.right - FLUTE.left)));
const BELL_RINGS = [
  { r: 30, o: 0.8 },
  { r: 44, o: 0.55 },
  { r: 58, o: 0.32 },
];
const BELL_CENTRE = { x: BELL.x, y: BELL.y + 16 * BELL.s };

/* ── Her light, the lake and the swan ──────────────────────────────────── */

const HER = { x: 320, y: 444 };
const LAKE = { cx: 320, cy: 578, rx: 238, ry: 40 };
const SWAN = { x: 262, y: 580, s: 1.22 };
const RIPPLES = [54, 92, 136].map((rx, k) => ({ rx, ry: round(rx * 0.16), o: round(0.6 - k * 0.15) }));

export function LevelsOfSpeech({ idPrefix = "sa81", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("para")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("lake")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.22 }} />
          <stop offset="0.8" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("shell")} x1={EGG.x - EGG.w} y1={EGG.y - EGG.h} x2={EGG.x + EGG.w} y2={EGG.y + EGG.h} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-ivory)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)" }} />
        </linearGradient>
        <clipPath id={id("egg")}>
          <path d={eggPath(EGG.x, EGG.y, EGG.w, EGG.h)} />
        </clipPath>
        <linearGradient id={id("bamboo")} x1={0} y1={FLUTE.y - FLUTE.r} x2={0} y2={FLUTE.y + FLUTE.r} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-ember)" }} />
        </linearGradient>
      </defs>

      {/* The thread the word comes down */}
      <g {...part("thread")}>
        <path d={THREAD} stroke="var(--gold-soft)" strokeWidth={0.9} strokeDasharray="1.2 4" strokeLinecap="round" />
      </g>

      {/* Short strokes all turned inward to the point */}
      <g {...part("inward")}>
        <path d={INWARD} stroke="var(--gold)" strokeWidth={1.1} strokeOpacity={0.75} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* The still point */}
      <g {...part("para")}>
        <circle cx={PARA.x} cy={PARA.y} r={20} fill={url("para")} />
        <circle cx={PARA.x} cy={PARA.y} r={3.4} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.6} />
      </g>

      {/* A peacock's egg, every colour of the bird in it and none showing */}
      <g {...part("egg")}>
        <ellipse cx={EGG.x} cy={EGG.y + EGG.h + 1} rx={EGG.w * 0.9} ry={3} fill="var(--art-musk)" fillOpacity={0.18} />
        <path d={eggPath(EGG.x, EGG.y, EGG.w, EGG.h)} fill={url("shell")} />
        <g clipPath={`url(#${id("egg")})`} opacity={0.24}>
          <ellipse cx={EGG.x - 8} cy={EGG.y + 10} rx={12} ry={16} fill="var(--leaf)" />
          <ellipse cx={EGG.x + 9} cy={EGG.y + 2} rx={10} ry={18} fill="var(--art-hair)" />
          <ellipse cx={EGG.x + 2} cy={EGG.y - 10} rx={12} ry={9} fill="var(--art-turmeric)" />
          <ellipse cx={EGG.x - 3} cy={EGG.y + 22} rx={9} ry={6} fill="var(--art-vermilion)" />
        </g>
        <path d={eggPath(EGG.x, EGG.y, EGG.w, EGG.h)} stroke="var(--gold)" strokeWidth={0.9} />
        <path
          d={`M ${EGG.x - 13} ${EGG.y - 12} C ${EGG.x - 12} ${EGG.y - 20} ${EGG.x - 6} ${EGG.y - 25} ${EGG.x} ${EGG.y - 26}`}
          stroke="var(--art-core)"
          strokeWidth={1.6}
          strokeOpacity={0.7}
          strokeLinecap="round"
        />
      </g>

      {/* A flute, its notes in order and no breath in it */}
      <g {...part("flute")}>
        <g transform={`rotate(${FLUTE.tilt} ${COL} ${FLUTE.y})`}>
          <rect
            x={FLUTE.left}
            y={FLUTE.y - FLUTE.r}
            width={FLUTE.right - FLUTE.left}
            height={FLUTE.r * 2}
            rx={FLUTE.r}
            fill={url("bamboo")}
            stroke="var(--gold)"
            strokeWidth={0.7}
          />
          {NODES.map((x) => (
            <path key={x} d={`M ${x} ${FLUTE.y - FLUTE.r} L ${x} ${FLUTE.y + FLUTE.r}`} stroke="var(--art-carve)" strokeWidth={1} strokeOpacity={0.6} />
          ))}
          <path
            d={`M ${FLUTE.left + 8} ${FLUTE.y - FLUTE.r} L ${FLUTE.left + 8} ${FLUTE.y + FLUTE.r} M ${FLUTE.left + 12} ${FLUTE.y - FLUTE.r} L ${FLUTE.left + 12} ${FLUTE.y + FLUTE.r}`}
            stroke="var(--art-vermilion)"
            strokeWidth={1.4}
          />
          <ellipse cx={FLUTE.left + 22} cy={FLUTE.y} rx={2.6} ry={1.8} fill="var(--art-carve)" />
          {HOLES.map((x) => (
            <circle key={x} cx={x} cy={FLUTE.y} r={1.5} fill="var(--art-carve)" />
          ))}
          <path
            d={`M ${FLUTE.left + 4} ${FLUTE.y - 2} L ${FLUTE.right - 4} ${FLUTE.y - 2}`}
            stroke="var(--art-core)"
            strokeWidth={0.8}
            strokeOpacity={0.5}
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* A bell, ringing */}
      <g {...part("bell")}>
        {BELL_RINGS.map((r, i) =>
          [-1, 1].map((side) => {
            const a = polar(BELL_CENTRE.x, BELL_CENTRE.y, r.r, side > 0 ? 30 : 150);
            const b = polar(BELL_CENTRE.x, BELL_CENTRE.y, r.r, side > 0 ? -30 : 210);
            return (
              <path
                key={`${i}${side}`}
                className={i % 2 ? "m-shimmer m-late" : "m-shimmer"}
                d={`M ${round(a.x)} ${round(a.y)} A ${r.r} ${r.r} 0 0 ${side > 0 ? 1 : 0} ${round(b.x)} ${round(b.y)}`}
                stroke="var(--gold-soft)"
                strokeWidth={1.2}
                strokeOpacity={r.o}
                strokeLinecap="round"
              />
            );
          }),
        )}
        <g transform={`translate(${BELL.x} ${BELL.y}) scale(${BELL.s})`}>
          <g className="m-sway">
            <Bell gem="var(--art-vermilion)" />
          </g>
        </g>
      </g>

      {/* Her light */}
      <g {...part("her-light")}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={54} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={9} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={4} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.8} />
      </g>

      {/* The lake of the mind, and the swan on it */}
      <g {...part("swan")}>
        <ellipse cx={LAKE.cx} cy={LAKE.cy} rx={LAKE.rx} ry={LAKE.ry} fill={url("lake")} />
        <ellipse cx={LAKE.cx} cy={LAKE.cy} rx={LAKE.rx * 0.92} ry={LAKE.ry * 0.86} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.5} />
        {RIPPLES.map((r, k) => (
          <ellipse
            key={k}
            cx={SWAN.x}
            cy={SWAN.y + 1}
            rx={r.rx}
            ry={r.ry}
            stroke="var(--gold-soft)"
            strokeWidth={0.8}
            strokeOpacity={r.o}
            strokeDasharray="14 8"
          />
        ))}
        <g transform={`translate(${SWAN.x} ${SWAN.y}) scale(${SWAN.s})`}>
          <Swan />
        </g>
      </g>
    </svg>
  );
}
