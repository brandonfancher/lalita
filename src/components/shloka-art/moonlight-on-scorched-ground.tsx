/**
 * Shloka 79 — "Moonlight on scorched ground, and the dark driven off".
 *
 * Under the card her light, and from it a cone of moonlight falling on a
 * stretch of ground cracked by heat. Outside the light the cracks still glow
 * like embers; where it falls they have gone cool and pale. In the middle of
 * the moonlit ground a small pool where two white night lilies have opened,
 * as they open only to the moon. At the left an ascetic's empty seat on its
 * kuśa mat, his water pot, staff and rosary laid on it, facing her. At the
 * right a narrow-waisted altar marked out on the ground. Toward the lower
 * corners three bats fly off out of her light, taking the dark with them. Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { artIds, hash, partProps, round } from "./primitives";
import type { ArtProps } from "./types";

/* ── Her light, and the moonlight it throws ────────────────────────────── */

const HER = { x: 320, y: 452 };
const GROUND = { cx: 320, cy: 556, rx: 238, ry: 52 };
const CONE = { topHalf: 10, footHalf: 134, foot: GROUND.cy + 6 };
const CONE_PATH = `M ${HER.x - CONE.topHalf} ${HER.y + 6} L ${HER.x + CONE.topHalf} ${HER.y + 6} L ${HER.x + CONE.footHalf} ${CONE.foot} A ${CONE.footHalf} ${round(GROUND.ry * 0.62)} 0 0 1 ${HER.x - CONE.footHalf} ${CONE.foot} Z`;
const POOL_OF_LIGHT = { cx: HER.x, cy: GROUND.cy + 2, rx: CONE.footHalf, ry: round(GROUND.ry * 0.7) };
const MOTES = Array.from({ length: 9 }, (_, i) => {
  const t = 0.25 + 0.75 * hash(i, 79);
  return {
    x: round(HER.x + (hash(79, i) - 0.5) * 2 * CONE.footHalf * t * 0.8),
    y: round(HER.y + (CONE.foot - HER.y) * t * 0.9),
    r: round(0.8 + hash(i, i + 7) * 0.8),
  };
});

/* ── The cracked ground ────────────────────────────────────────────────── */

/** Mud cracks: a jittered net of points on the ground, joined along each row and here and there between rows. */
const CRACKS = (() => {
  const ROWS = 7;
  const COLS = 16;
  const at = (r: number, c: number) => {
    const u = -1.08 + (2.16 * (c + (r % 2 ? 0.5 : 0))) / COLS + (hash(r, c + 40) - 0.5) * 0.08;
    const v = -1 + (2 * r) / (ROWS - 1) + (hash(c, r + 40) - 0.5) * 0.18;
    return { x: GROUND.cx + u * GROUND.rx, y: GROUND.cy + v * GROUND.ry };
  };
  const edge = (p: { x: number; y: number }, q: { x: number; y: number }, k: number) => {
    const bend = (hash(k, 7) - 0.5) * 6;
    return `M ${round(p.x)} ${round(p.y)} Q ${round((p.x + q.x) / 2 + bend * 0.3)} ${round((p.y + q.y) / 2 + bend * 0.4)} ${round(q.x)} ${round(q.y)}`;
  };
  const runs: string[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS; c++) {
      if (c < COLS) runs.push(edge(at(r, c), at(r, c + 1), r * 40 + c));
      if (r < ROWS - 1 && (c + r) % 2 === 0) runs.push(edge(at(r, c), at(r + 1, c), r * 40 + c + 20));
    }
  }
  return runs.join(" ");
})();

/* ── The night lilies ──────────────────────────────────────────────────── */

const POOL = { x: 320, y: 568, rx: 60, ry: 14 };
const LILIES = [
  { x: 302, y: 564, s: 1.7 },
  { x: 346, y: 570, s: 1.35 },
];
const LILY_PETALS = [-70, -50, -30, -12, 6, 24, 42, 62, 80].map((deg, i) => ({ deg, l: i % 2 ? 9 : 11 }));
const PADS = [
  { x: 276, y: 572, r: 12 },
  { x: 362, y: 562, r: 9 },
  { x: 326, y: 576, r: 8 },
];

/* ── The ascetic's seat ────────────────────────────────────────────────── */

const SEAT = { x: 168, y: 548, s: 1.6 };

/* ── The narrow-waisted altar ──────────────────────────────────────────── */

const VEDI = { x: 474, y: 560, s: 1.55 };
const VEDI_PATH = "M -30 -9 L 30 -9 C 18 -5 14 -2 14 0 C 14 2 18 6 34 10 L -34 10 C -18 6 -14 2 -14 0 C -14 -2 -18 -5 -30 -9 Z";

/* ── The bats leaving with the dark ───────────────────────────────── */

const BATS = [
  { x: 138, y: 616, s: 2.2, tilt: -16 },
  { x: 506, y: 622, s: 2, tilt: 14 },
  { x: 548, y: 586, s: 1.5, tilt: 22 },
];
const BAT =
  "M 0 0 C -3 -3 -6 -6 -12 -6 C -10 -4 -10 -2 -11 0 C -8 -1 -6 0 -5 2 C -4 0 -2 0 0 1 C 2 0 4 0 5 2 C 6 0 8 -1 11 0 C 10 -2 10 -4 12 -6 C 6 -6 3 -3 0 0 Z";

export function MoonlightOnScorchedGround({ idPrefix = "sa79", active = null }: ArtProps) {
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
        <linearGradient id={id("cone")} x1={0} y1={HER.y} x2={0} y2={CONE.foot} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.38 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.08 }} />
        </linearGradient>
        <linearGradient id={id("cone-shade")} x1={0} y1={HER.y} x2={0} y2={CONE.foot} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.06 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.02 }} />
        </linearGradient>
        <linearGradient id={id("cone-edge")} x1={0} y1={HER.y} x2={0} y2={CONE.foot} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("earth")}>
          <stop offset="0" style={{ stopColor: "var(--art-ember)", stopOpacity: 0.32 }} />
          <stop offset="0.75" style={{ stopColor: "var(--art-ember)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-ember)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("lit")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.65 }} />
          <stop offset="0.8" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <clipPath id={id("in-light")}>
          <ellipse cx={POOL_OF_LIGHT.cx} cy={POOL_OF_LIGHT.cy} rx={POOL_OF_LIGHT.rx} ry={POOL_OF_LIGHT.ry} />
        </clipPath>
        <mask id={id("out-of-light")} maskUnits="userSpaceOnUse" x={70} y={490} width={500} height={130}>
          <rect x={70} y={490} width={500} height={130} fill="white" />
          <ellipse cx={POOL_OF_LIGHT.cx} cy={POOL_OF_LIGHT.cy} rx={POOL_OF_LIGHT.rx} ry={POOL_OF_LIGHT.ry} fill="black" />
        </mask>
        <clipPath id={id("ground")}>
          <ellipse cx={GROUND.cx} cy={GROUND.cy} rx={GROUND.rx} ry={GROUND.ry} />
        </clipPath>
      </defs>

      {/* The ground cracked by heat, still glowing where the light has not reached */}
      <g {...part("ground")}>
        <ellipse cx={GROUND.cx} cy={GROUND.cy} rx={GROUND.rx} ry={GROUND.ry} fill={url("earth")} />
        <g clipPath={`url(#${id("ground")})`}>
          <g mask={`url(#${id("out-of-light")})`}>
            <path d={CRACKS} stroke="var(--art-vermilion)" strokeWidth={2.6} strokeOpacity={0.3} strokeLinecap="round" />
            <path className="m-ember" d={CRACKS} stroke="var(--art-saffron)" strokeWidth={0.8} strokeLinecap="round" />
          </g>
        </g>
      </g>

      {/* Her light, and the moonlight falling from it */}
      <g {...part("moonlight")}>
        <path d={CONE_PATH} fill={url("cone")} />
        <path d={CONE_PATH} fill={url("cone-shade")} />
        {[-1, 1].map((side) => (
          <path
            key={side}
            d={`M ${HER.x + side * CONE.topHalf} ${HER.y + 6} L ${HER.x + side * CONE.footHalf} ${CONE.foot}`}
            stroke={url("cone-edge")}
            strokeWidth={0.8}
          />
        ))}
        {MOTES.map((m, i) => (
          <circle key={i} className={i % 2 ? "m-twinkle m-late" : "m-twinkle"} cx={m.x} cy={m.y} r={m.r} fill="var(--art-core)" fillOpacity={0.8} />
        ))}
        <ellipse cx={POOL_OF_LIGHT.cx} cy={POOL_OF_LIGHT.cy} rx={POOL_OF_LIGHT.rx} ry={POOL_OF_LIGHT.ry} fill={url("lit")} />
        <g clipPath={`url(#${id("in-light")})`}>
          <path d={CRACKS} stroke="var(--gold-soft)" strokeWidth={0.9} strokeOpacity={0.85} strokeLinecap="round" />
        </g>
      </g>
      <g {...part("her-light")}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={42} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={8} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={3.8} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.8} />
      </g>

      {/* A small pool in the moonlit ground, two night lilies open on it */}
      <g {...part("lilies")}>
        <ellipse cx={POOL.x} cy={POOL.y} rx={POOL.rx} ry={POOL.ry} fill="var(--art-moon)" fillOpacity={0.55} stroke="var(--gold-soft)" strokeWidth={0.6} />
        <ellipse cx={POOL.x} cy={POOL.y} rx={POOL.rx} ry={POOL.ry} fill="var(--art-hair)" fillOpacity={0.08} />
        {PADS.map((p, i) => (
          <path
            key={i}
            d={`M ${p.x} ${p.y} L ${p.x + p.r * 0.9} ${p.y - 1} A ${p.r} ${round(p.r * 0.36)} 0 1 1 ${p.x + p.r * 0.9} ${p.y + 1} Z`}
            fill="var(--leaf)"
            stroke="var(--gold-soft)"
            strokeWidth={0.4}
          />
        ))}
        {LILIES.map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) scale(${l.s})`}>
            <ellipse cy={1} rx={10} ry={2} fill="var(--leaf)" fillOpacity={0.6} />
            {LILY_PETALS.map((p, k) => (
              <path
                key={k}
                transform={`rotate(${p.deg})`}
                d={`M 0 0 C -2.6 ${-p.l * 0.4} -2 ${-p.l * 0.8} 0 ${-p.l} C 2 ${-p.l * 0.8} 2.6 ${-p.l * 0.4} 0 0 Z`}
                fill="var(--art-ivory)"
                stroke="var(--gold)"
                strokeWidth={0.4}
              />
            ))}
            <circle cy={-2} r={2.4} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.4} />
          </g>
        ))}
        <circle className="m-twinkle" cx={POOL.x + 24} cy={POOL.y - 1} r={1} fill="var(--art-core)" />
      </g>

      {/* An ascetic's empty seat facing her: kuśa mat, water pot, staff and rosary */}
      <g {...part("ascetic")}>
        <g transform={`translate(${SEAT.x} ${SEAT.y}) scale(${SEAT.s})`}>
          <ellipse cy={6} rx={30} ry={3} fill="var(--art-musk)" fillOpacity={0.25} />
          <path d="M -28 4 L 24 4 L 30 -4 L -22 -4 Z" fill="var(--leaf)" fillOpacity={0.6} stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
          <path d="M -24 0 L 27 0 M -26 2 L 26 2 M -22 -2 L 28 -2" stroke="var(--art-turmeric)" strokeWidth={0.5} />
          <path d="M -26 -4 L -30 -7 M -20 -4 L -23 -8 M 30 -4 L 34 -6 M 26 4 L 30 7" stroke="var(--leaf)" strokeWidth={0.8} strokeLinecap="round" />
          <path d="M -34 6 L -20 -54" stroke="var(--art-turmeric)" strokeWidth={2} strokeLinecap="round" />
          <path d="M -34 6 L -20 -54" stroke="var(--gold)" strokeWidth={0.4} />
          <path d="M -21.4 -48 L -18.6 -47.4 M -23 -42 L -20.2 -41.4" stroke="var(--gold)" strokeWidth={1} />
          <g transform="translate(12 -4)">
            <path d="M -2.6 -13 C -6 -26 6 -26 2.6 -13" stroke="var(--gold)" strokeWidth={1.2} />
            <path
              d="M -8 0 C -11 -6 -9 -11 -3 -12 L -2.4 -15 L 2.4 -15 L 3 -12 C 9 -11 11 -6 8 0 Z"
              fill="var(--art-turmeric)"
              stroke="var(--gold)"
              strokeWidth={0.7}
              strokeLinejoin="round"
            />
            <path d="M -3.2 -15.4 L 3.2 -15.4" stroke="var(--gold)" strokeWidth={1.2} strokeLinecap="round" />
            <path d="M 8 -6 C 12 -7 14 -9 16 -12" stroke="var(--art-turmeric)" strokeWidth={1.8} strokeLinecap="round" />
            <path d="M 8 -6 C 12 -7 14 -9 16 -12" stroke="var(--gold)" strokeWidth={0.4} />
            <path d="M -9.6 -4 C 0 -2 0 -2 9.6 -4" stroke="var(--gold)" strokeWidth={0.6} />
            <path d="M -6 -6 C -6 -9 -4 -10 -2 -10.6" stroke="var(--art-core)" strokeWidth={0.9} strokeOpacity={0.6} strokeLinecap="round" />
          </g>
          <g>
            {Array.from({ length: 14 }, (_, k) => {
              const a = (k / 14) * Math.PI * 2;
              return (
                <circle
                  key={k}
                  cx={round(-8 + 8 * Math.cos(a))}
                  cy={round(-1 + 2.6 * Math.sin(a))}
                  r={1.1}
                  fill="var(--art-ember)"
                  stroke="var(--art-carve)"
                  strokeWidth={0.3}
                />
              );
            })}
            <circle cx={-8} cy={2} r={1.4} fill="var(--art-vermilion)" />
          </g>
        </g>
      </g>

      {/* A narrow-waisted altar marked out on the ground */}
      <g {...part("altar")}>
        <g transform={`translate(${VEDI.x} ${VEDI.y}) scale(${VEDI.s})`}>
          <path d={VEDI_PATH} fill="var(--art-turmeric)" fillOpacity={0.45} stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round" />
          <path d={VEDI_PATH} transform="scale(0.8)" stroke="var(--art-ivory)" strokeWidth={0.6} strokeOpacity={0.7} />
          <path d="M -20 -5 L 18 4 M -18 5 L 20 -4 M -2 -7 L 6 7" stroke="var(--leaf)" strokeWidth={0.9} strokeLinecap="round" />
          <circle cy={0} r={1.6} fill="var(--art-vermilion)" />
        </g>
      </g>

      {/* Three bats, creatures of the dark, flying off out of her light */}
      <g {...part("bats")}>
        {BATS.map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.tilt}) scale(${b.s})`}>
            <g className={["m-dart", "m-dart m-late", "m-dart m-later"][i]}>
              <path d={BAT} fill="var(--art-hair)" stroke="var(--gold-soft)" strokeWidth={0.4} strokeLinejoin="round" />
              <path d="M -1.4 -1 L -1 -3 L 0 -1.4 L 1 -3 L 1.4 -1" fill="var(--art-hair)" />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
