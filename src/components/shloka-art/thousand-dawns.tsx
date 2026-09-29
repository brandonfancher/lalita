/**
 * Shloka 2 — "A thousand dawns".
 *
 * Sunrise over the eastern sea: she is the light itself, and her four arms
 * are beams of it, the upper two lifting the noose and the goad. Which name
 * each part answers to is written up for readers in the registry, next to
 * this artwork's entry.
 */

import { ArmLight, armBeam, artIds, Bangle, glint, Goad, Noose, partProps, round, sunRays, wrist } from "./primitives";
import type { ArtProps } from "./types";

const SX = 320;
/** The horizon, and the height of the sun's centre: it is always half risen. */
const HY = 548;
const SR = 66;
/** The bindu, where she appears, at the heart of the sun. */
const BY = 516;

/** Deterministic noise in [0, 1). */
function hash(a: number, b: number) {
  let h = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b + 0x632be5ab, 0xc2b2ae35);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return (h >>> 0) / 4294967296;
}

const dot = (x: number, y: number, r: number) =>
  `M ${round(x - r)} ${round(y)} a ${r} ${r} 0 1 0 ${round(2 * r)} 0 a ${r} ${r} 0 1 0 ${round(-2 * r)} 0`;

/** Exactly a thousand points of light, set in a sunflower spiral around the rising sun. */
const thousand = (() => {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const groups = ["", "", ""];
  let count = 0;
  for (let i = 1; count < 1000; i++) {
    const r = 8.5 * Math.sqrt(i);
    if (r < 104) continue;
    const a = i * golden;
    const x = SX + r * Math.cos(a);
    const y = HY - r * Math.sin(a);
    if (y > HY - 8 || y < 20 || x < 24 || x > 616) continue;
    groups[count % 3] += dot(x, y, round(Math.max(0.8, 2.3 - (1.4 * (r - 104)) / 350)));
    count++;
  }
  return groups;
})();

const rays = sunRays({ cx: SX, cy: HY, r: SR, long: 96, short: 84 });

const NOOSE_AT = { x: 218, y: 172 };
const GOAD_AT = { x: 446, y: 174 };

const SUN = { x: SX, y: HY };

const upperBeams = [armBeam(SUN, wrist(SUN, NOOSE_AT), 40, 14), armBeam(SUN, wrist(SUN, GOAD_AT), 40, 14)];
const lowerBeams = [armBeam(SUN, { x: 112, y: 522 }, 34, 4), armBeam(SUN, { x: 528, y: 522 }, 34, 4)];

/** Rows of ripples on the sea, closer together near the horizon. */
const seaRows = Array.from({ length: 16 }, (_, k) => HY + 8 + 6 * k + 0.7 * k * k).filter((y) => y < 800);

const ripples: string[] = [];
const reflection = ["", "", ""];
seaRows.forEach((y, k) => {
  const depth = y - HY;
  const half = 290;
  const column = SR * 0.9 + 0.35 * depth;
  const lift = 1.2 + 0.03 * depth;
  let x = SX - half + hash(k, 0) * 20;
  let j = 0;
  while (x < SX + half) {
    const len = 12 + (20 + depth * 0.12) * hash(k, j * 3 + 1);
    const end = Math.min(x + len, SX + half);
    const inColumn = end > SX - column && x < SX + column;
    if (!inColumn && hash(k, j * 3 + 3) > 0.3) {
      ripples.push(`M ${round(x)} ${round(y)} Q ${round((x + end) / 2)} ${round(y - lift)} ${round(end)} ${round(y)}`);
    }
    x = end + 8 + 18 * hash(k, j * 3 + 2);
    j++;
  }
  let g = SX - column + hash(k, 99) * 8;
  let n = 0;
  while (g < SX + column) {
    const l = 5 + 13 * hash(k, 200 + n) * (1 - Math.abs(g - SX) / (column * 1.4));
    const h = 1.6 + 0.08 * k;
    const cx = g + l;
    reflection[(k + n) % 3] +=
      `M ${round(g)} ${round(y)} Q ${round(cx)} ${round(y - h)} ${round(g + 2 * l)} ${round(y)} Q ${round(cx)} ${round(y + h)} ${round(g)} ${round(y)} Z `;
    g += 2 * l + 4 + 9 * hash(k, 300 + n);
    n++;
  }
});

export function ThousandDawns({ idPrefix = "sa2", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={SX} cy={HY - 30} r={380} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("dawn")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.34 }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("sun")} cx={SX} cy={HY - 12} r={SR} gradientUnits="userSpaceOnUse">
          <stop offset="0.25" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
        <radialGradient id={id("bindu")} cx={SX} cy={BY} r={40} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("points-fade")} cx={SX} cy={HY} r={460} gradientUnits="userSpaceOnUse">
          <stop offset="0.2" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0.12} />
        </radialGradient>
        <mask id={id("points-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("points-fade")} />
        </mask>
        <linearGradient id={id("horizon")} x1="40" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "var(--gold)", stopOpacity: 0.9 }} />
          <stop offset="0.7" style={{ stopColor: "var(--gold)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </linearGradient>
        {upperBeams.map((b, i) => (
          <linearGradient key={i} id={id(`arm-${i}`)} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
            <stop offset="0.2" style={{ stopColor: "var(--art-saffron)", stopOpacity: 1 }} />
            <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          </linearGradient>
        ))}
        {lowerBeams.map((b, i) => (
          <linearGradient key={i} id={id(`arm-${i + 2}`)} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
            <stop offset="0.3" style={{ stopColor: "var(--art-saffron)", stopOpacity: 1 }} />
            <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
          </linearGradient>
        ))}
        <linearGradient id={id("sea-fade")} x1="30" y1="0" x2="610" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={0} />
          <stop offset="0.22" stopColor="#fff" stopOpacity={1} />
          <stop offset="0.78" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <mask id={id("sea-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("sea-fade")} />
        </mask>
        <radialGradient id={id("blaze")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The eastern sea, with the sun's light broken across it */}
      <g {...part("sea")}>
        <path d={`M 40 ${HY} H 600`} stroke={url("horizon")} strokeWidth={1.3} />
        <path
          d={ripples.join(" ")}
          mask={url("sea-mask")}
          stroke="var(--gold)"
          strokeWidth={0.9}
          strokeOpacity={0.6}
          strokeLinecap="round"
        />
        <g fill="var(--art-saffron)" fillOpacity={0.95}>
          <path className="m-twinkle" d={reflection[0]} />
          <path className="m-twinkle m-late" d={reflection[1]} />
          <path className="m-twinkle m-later" d={reflection[2]} fill="var(--art-core)" />
        </g>
      </g>

      {/* A thousand rising suns: the sun half risen, and a thousand points of light */}
      <g {...part("sunrise")}>
        <circle cx={SX} cy={HY - 30} r={380} fill={url("glow")} />
        <ellipse cx={SX} cy={HY} rx={330} ry={120} fill={url("dawn")} />
        <g mask={url("points-mask")} fill="var(--art-saffron)">
          <path className="m-twinkle" d={thousand[0]} />
          <path className="m-twinkle m-late" d={thousand[1]} />
          <path className="m-twinkle m-later" d={thousand[2]} />
        </g>
        <g className="m-breathe">
          {rays.map((r, i) => (
            <path
              key={i}
              d={r.d}
              fill={r.long ? "var(--art-vermilion)" : "var(--art-saffron)"}
              fillOpacity={0.75}
            />
          ))}
          <path
            d={`M ${SX - SR} ${HY} A ${SR} ${SR} 0 0 1 ${SX + SR} ${HY} Z`}
            fill={url("sun")}
            fillOpacity={0.9}
            stroke="var(--gold)"
            strokeWidth={1.2}
          />
          <path
            d={`M ${SX - SR + 9} ${HY} A ${SR - 9} ${SR - 9} 0 0 1 ${SX + SR - 9} ${HY}`}
            stroke="var(--gold)"
            strokeWidth={0.7}
            strokeOpacity={0.7}
          />
        </g>
        <circle cx={SX} cy={BY} r={40} fill={url("bindu")} />
        <circle cx={SX} cy={BY} r={4.5} fill="var(--art-core)" />
        <circle cx={SX} cy={BY} r={9} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.85} />
      </g>

      {/* The cord of the noose runs back to her */}
      <g {...part("thread")}>
        <path
          d={`M 238 234 C 224 320 306 390 ${SX} ${BY - 10}`}
          stroke="var(--art-vermilion)"
          strokeWidth={0.9}
          strokeOpacity={0.7}
          strokeLinecap="round"
        />
      </g>

      {/* The noose whose very form is longing */}
      <g {...part("noose")}>
        <g transform={`translate(${NOOSE_AT.x} ${NOOSE_AT.y}) rotate(-14) scale(1.12)`}>
          <Noose />
        </g>
      </g>

      {/* The goad in the shape of wrath, blazing */}
      <g {...part("goad")}>
        <g transform={`translate(${GOAD_AT.x} ${GOAD_AT.y}) rotate(12) scale(1.05)`}>
          <circle cx={12} cy={-100} r={56} fill={url("blaze")} />
          <Goad />
          <g fill="var(--art-core)">
            <path className="m-lick" d={glint(10)} transform="translate(0 -148)" />
            <path className="m-lick m-late" d={glint(7)} transform="translate(19 -56)" />
            <path className="m-lick m-later" d={glint(6)} transform="translate(41 -84)" />
          </g>
        </g>
      </g>

      {/* Four arms of light, the upper two with their bangles */}
      <g {...part("arms")}>
        {[...upperBeams, ...lowerBeams].map((b, i) => (
          <ArmLight key={i} beam={b} fill={url(`arm-${i}`)} />
        ))}
        {upperBeams.map((b, i) => (
          <g key={i} transform={`translate(${b.x2} ${b.y2}) rotate(${round(b.angle + 90)})`}>
            <Bangle />
          </g>
        ))}
      </g>
    </svg>
  );
}
