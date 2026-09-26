/**
 * Shloka 3 — "The drawn bow".
 *
 * Her sugarcane bow drawn to full and aimed at the sky, five flower arrows on
 * the string, and the hand that draws it a point of light. Below, her red
 * light pools, and the ring of world-eggs floats half-sunk in it. Which name
 * each part answers to is written up for readers in the registry, next to
 * this artwork's entry.
 */

import type { CSSProperties } from "react";

import {
  artIds,
  BeeString,
  bowTips,
  FlowerArrow,
  glint,
  partProps,
  round,
  SugarcaneBow,
  type Tattva,
} from "./primitives";
import type { ArtProps } from "./types";

/** The nock, where she draws the string: the bindu. */
const N = { x: 304, y: 452 };
/** Degrees clockwise from straight up. */
const AIM = 12;
const BOW = { half: 150, grip: 360, bend: 110 };
const [TIP_L, TIP_R] = bowTips(BOW);

const ARROWS: { angle: number; sign: Tattva }[] = [
  { angle: -10, sign: "space" },
  { angle: -5, sign: "air" },
  { angle: 0, sign: "fire" },
  { angle: 5, sign: "water" },
  { angle: 10, sign: "earth" },
];
const ARROW_LENGTH = 398;

/** The pool of her light, and the ring of world-eggs floating on it, seen at a slant. */
const C = { x: 310, y: 568 };
const RX = 205;
const RY = 56;

/** An egg, broad end down, centred on (x, y). */
function eggPath(x: number, y: number, w: number, h: number) {
  const p = round;
  return [
    `M ${p(x)} ${p(y - h)}`,
    `C ${p(x + 0.62 * w)} ${p(y - h)} ${p(x + w)} ${p(y - 0.25 * h)} ${p(x + w)} ${p(y + 0.2 * h)}`,
    `C ${p(x + w)} ${p(y + 0.72 * h)} ${p(x + 0.55 * w)} ${p(y + h)} ${p(x)} ${p(y + h)}`,
    `C ${p(x - 0.55 * w)} ${p(y + h)} ${p(x - w)} ${p(y + 0.72 * h)} ${p(x - w)} ${p(y + 0.2 * h)}`,
    `C ${p(x - w)} ${p(y - 0.25 * h)} ${p(x - 0.62 * w)} ${p(y - h)} ${p(x)} ${p(y - h)} Z`,
  ].join(" ");
}

/** The few that are going under as we watch, by ring position, with their own pace. */
const SINKING: Record<number, { dur: number; delay: number }> = {
  2: { dur: 27, delay: -4 },
  6: { dur: 33, delay: -19 },
  10: { dur: 30, delay: -11 },
  13: { dur: 36, delay: -26 },
};

type Egg = {
  x: number;
  /** Where the surface of the flood meets it. */
  line: number;
  w: number;
  h: number;
  cy: number;
  group: number;
  sink?: { dur: number; delay: number };
};

const ring: Egg[] = Array.from({ length: 16 }, (_, k) => {
  const phi = ((k + 0.5) * 22.5 * Math.PI) / 180;
  const near = (Math.sin(phi) + 1) / 2;
  const s = 0.7 + 0.42 * near;
  const w = round(9 * s);
  const h = round(13 * s);
  const line = round(C.y + RY * Math.sin(phi));
  return { x: round(C.x + RX * Math.cos(phi)), line, w, h, cy: round(line - 0.2 * h), group: k % 3, sink: SINKING[k] };
}).sort((a, b) => a.line - b.line);

/** Worlds already sunk: faint shapes under the surface. */
const sunk = [
  { x: 262, y: 650, s: 0.82, o: 0.5 },
  { x: 372, y: 662, s: 0.76, o: 0.45 },
  { x: 208, y: 694, s: 0.66, o: 0.36 },
  { x: 320, y: 706, s: 0.62, o: 0.32 },
  { x: 426, y: 716, s: 0.56, o: 0.26 },
  { x: 268, y: 748, s: 0.5, o: 0.2 },
  { x: 380, y: 760, s: 0.46, o: 0.16 },
];

const RIPPLES = [
  { k: 0.3, o: 0.55 },
  { k: 0.52, o: 0.5 },
  { k: 0.76, o: 0.42 },
  { k: 1.22, o: 0.32 },
  { k: 1.48, o: 0.2 },
];

const sinkStyle = (e: Egg) =>
  e.sink ? ({ "--dur": `${e.sink.dur}s`, "--delay": `${e.sink.delay}s` } as CSSProperties) : undefined;

export function DrawnBow({ idPrefix = "sa3", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);
  const aim = `translate(${N.x} ${N.y}) rotate(${AIM})`;

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={N.x} cy={N.y + 30} r={420} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.5 }} />
          <stop offset="0.42" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("pool")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.36 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("pour")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.34 }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu")} cx={N.x} cy={N.y} r={40} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <clipPath id={id("under")}>
          {ring.map((e, i) => (
            <rect key={i} x={round(e.x - e.w - 1)} y={e.line} width={round(2 * e.w + 2)} height={40} />
          ))}
        </clipPath>
      </defs>

      {/* The flood of her own red light, and the worlds going under in it */}
      <g {...part("flood")}>
        <circle className="m-shimmer" cx={N.x} cy={N.y + 30} r={420} fill={url("glow")} />
        <ellipse cx={C.x} cy={C.y + 30} rx={290} ry={170} fill={url("pool")} />
        <ellipse cx={round((N.x + C.x) / 2)} cy={round((N.y + C.y) / 2 + 6)} rx={72} ry={82} fill={url("pour")} />
        <g className="m-shimmer m-late" stroke="var(--gold)" strokeWidth={0.8} strokeDasharray="28 7 14 9">
          {RIPPLES.map((r) => (
            <ellipse key={r.k} cx={C.x} cy={C.y} rx={round(RX * r.k)} ry={round(RY * r.k)} strokeOpacity={r.o} />
          ))}
        </g>
        <g stroke="var(--gold)" strokeWidth={0.8}>
          {sunk.map((e, i) => (
            <path
              key={i}
              d={eggPath(e.x, e.y, round(9 * e.s), round(13 * e.s))}
              fill="var(--art-vermilion)"
              fillOpacity={0.3 * e.o}
              strokeOpacity={e.o}
            />
          ))}
        </g>
        {ring.map((e, i) => {
          const rx = round(1.75 * e.w);
          const ry = round(0.5 * e.w);
          return (
            <path
              key={i}
              d={`M ${round(e.x - rx)} ${e.line} A ${rx} ${ry} 0 0 1 ${round(e.x + rx)} ${e.line}`}
              stroke="var(--gold)"
              strokeWidth={0.7}
              strokeOpacity={0.75}
            />
          );
        })}
        {ring.map((e, i) => (
          <g key={i} className={e.sink ? "m-sink" : undefined} style={sinkStyle(e)}>
            <path d={eggPath(e.x, e.cy, e.w, e.h)} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.1} />
            <g transform={`translate(${e.x} ${round(e.cy - 0.3 * e.h)})`}>
              <path
                className={["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"][e.group]}
                d={glint(round(0.5 * e.w))}
                fill="var(--art-saffron)"
              />
            </g>
          </g>
        ))}
        <g clipPath={url("under")}>
          {ring.map((e, i) => (
            <path
              key={i}
              className={e.sink ? "m-sink" : undefined}
              style={sinkStyle(e)}
              d={eggPath(e.x, e.cy, e.w + 0.6, e.h + 0.6)}
              fill="var(--art-vermilion)"
              fillOpacity={0.55}
            />
          ))}
        </g>
        {ring.map((e, i) => {
          const rx = round(1.75 * e.w);
          const ry = round(0.5 * e.w);
          return (
            <path
              key={i}
              d={`M ${round(e.x - rx)} ${e.line} A ${rx} ${ry} 0 0 0 ${round(e.x + rx)} ${e.line}`}
              stroke="var(--gold)"
              strokeWidth={0.8}
            />
          );
        })}
      </g>

      {/* Five arrows, the five subtle elements, nocked together */}
      <g {...part("arrows")}>
        <g transform={aim}>
          {ARROWS.map((a, i) => (
            <g key={a.sign} transform={`rotate(${a.angle})`}>
              <FlowerArrow
                length={ARROW_LENGTH}
                sign={a.sign}
                headClassName={["m-breathe", "m-breathe m-late", "m-breathe m-later"][i % 3]}
              />
            </g>
          ))}
        </g>
      </g>

      {/* The bowstring, a line of bees */}
      <g {...part("bees")}>
        <g transform={aim}>
          <BeeString from={TIP_L} to={{ x: 0, y: 0 }} />
          <BeeString from={TIP_R} to={{ x: 0, y: 0 }} />
        </g>
      </g>

      {/* The bow of sugarcane that is the mind, drawn to full */}
      <g {...part("bow")}>
        <g transform={aim}>
          <SugarcaneBow shape={BOW} />
        </g>
      </g>

      {/* Her hand on the string: the bindu */}
      <g {...part("bindu")}>
        <circle cx={N.x} cy={N.y} r={40} fill={url("bindu")} />
        <circle cx={N.x} cy={N.y} r={4.5} fill="var(--art-core)" />
        <circle cx={N.x} cy={N.y} r={9} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.85} />
      </g>
    </svg>
  );
}
