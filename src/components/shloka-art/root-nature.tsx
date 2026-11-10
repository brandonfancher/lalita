/**
 * Shloka 86 — "From radiance to root-nature: the hymn turns philosophical".
 *
 * Under the card her light with nothing beneath it, only brightness, and its
 * radiance going out from it. Over it, at the right of the crown, a parasol
 * of many tiers, the emblem of the one who rules over rulers, and round the
 * ground the ring of the eight quarters, her name sounding at every one. On
 * the ground three pictures of root-nature from the Upaniṣads: the unborn
 * she-goat of three colours with her young (Śvetāśvatara 4.5); a banyan fig
 * broken open and a seed broken open, with nothing to be seen inside
 * (Chāndogya 6.12); and a lotus standing in clear water, its flower above and
 * its root below, one plant. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { artIds, glint, Goat, GOAT_FORE, GOAT_HIND, OpenLotus, Parasol, partProps, radiance, round, taper, through } from "./primitives";
import type { ArtProps } from "./types";

/* ── Her light and its radiance ────────────────────────────────────────── */

const HER = { x: 320, y: 478 };
const RADIANCE = radiance({ cx: HER.x, cy: HER.y, from: 22, long: 168, short: 118 });

/* ── The parasol of many tiers ─────────────────────────────────────────── */

const TIERS = { x: 452, foot: 214, rims: [180, 136, 100, 72], s: [0.7, 0.56, 0.44, 0.34] };

/* ── The eight quarters ────────────────────────────────────────────────── */

const RING = { x: 320, y: 570, rx: 208, ry: 42 };
const QUARTERS = Array.from({ length: 8 }, (_, k) => {
  const t = (k / 8) * Math.PI * 2 + Math.PI / 8;
  return { x: round(RING.x + RING.rx * Math.cos(t)), y: round(RING.y + RING.ry * Math.sin(t)), k };
});
const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── The she-goat of three colours and her young ───────────────────────── */

const GOATS = [
  { x: 190, y: 566, s: 1.5 },
  { x: 150, y: 600, s: 0.8 },
  { x: 236, y: 604, s: 0.74 },
];

/* ── A fig broken open, and a seed broken open ─────────────────────────── */

const FIG = { x: 312, y: 604 };
/** One half of a fig cut lengthwise, about 34 wide and 41 tall, its stalk end up. */
const FIG_HALF = "M 0 -21 C 4 -21 6 -18 7 -14 C 9 -9 17 -4 17 6 C 17 15 9 20 0 20 C -9 20 -17 15 -17 6 C -17 -4 -9 -9 -7 -14 C -6 -18 -4 -21 0 -21 Z";
const FIG_SEEDS = Array.from({ length: 30 }, (_, k) => {
  const a = k * 2.39996;
  const rr = Math.sqrt((k + 0.5) / 30) * 9.5;
  return { x: round(Math.cos(a) * rr), y: round(5 + Math.sin(a) * rr) };
});
const SEED = { x: 380, y: 604, r: 13 };
const SEED_HALF = `M 0 ${-SEED.r} A ${SEED.r * 0.75} ${SEED.r} 0 0 0 0 ${SEED.r} Z`;

/* ── The lotus, its flower above the water and its root below ──────────── */

const POOL = { x: 468, top: 520, foot: 640, hw: 78 };
const STALK = through([
  { x: 470, y: 514 },
  { x: 466, y: 552 },
  { x: 476, y: 590 },
  { x: 481, y: 616 },
]);
/** The rhizome, segment by segment, each joined to the next at a node. */
const ROOT = [
  { x: 438, rx: 15 },
  { x: 467, rx: 14 },
  { x: 495, rx: 13 },
  { x: 518, rx: 9 },
];
const ROOT_Y = 622;
const NODES = [452.5, 481, 508];
const LEAF_STALK = through([
  { x: 481, y: 616 },
  { x: 492, y: 576 },
  { x: 504, y: 540 },
  { x: 508, y: 522 },
]);

export function RootNature({ idPrefix = "sa86", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("rays")} gradientUnits="userSpaceOnUse" cx={HER.x} cy={HER.y} r={168}>
          <stop offset="0.12" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "var(--gold)", stopOpacity: 0.8 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("water")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--leaf)", stopOpacity: 0.2 }} />
          <stop offset="0.75" style={{ stopColor: "var(--leaf)", stopOpacity: 0.08 }} />
          <stop offset="1" style={{ stopColor: "var(--leaf)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("fig")} x1={0} y1={0} x2={1} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--art-ember)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)" }} />
        </linearGradient>
        <radialGradient id={id("empty")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("pool-fade")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "white", stopOpacity: 0 }} />
          <stop offset="0.2" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="0.8" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="1" style={{ stopColor: "white", stopOpacity: 0 }} />
        </linearGradient>
        <mask id={id("pool-mask")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect x={POOL.x - POOL.hw} y={POOL.top - 4} width={POOL.hw * 2} height={POOL.foot - POOL.top + 8} fill={url("pool-fade")} />
        </mask>
      </defs>

      {/* The eight quarters, her name sounding at every one */}
      <g {...part("quarters")}>
        <ellipse cx={RING.x} cy={RING.y} rx={RING.rx} ry={RING.ry} stroke="var(--gold)" strokeWidth={1.1} strokeOpacity={0.7} />
        {QUARTERS.map((q) => (
          <g key={q.k} transform={`translate(${q.x} ${q.y})`}>
            <path className={TWINKLE[q.k % 3]} d={glint(6)} fill="var(--gold)" />
            {[0, 1].map((j) => (
              <path
                key={j}
                className="m-shimmer"
                d={`M -${7 + j * 5} ${-8 - j * 5} A ${8 + j * 6} ${8 + j * 6} 0 0 1 ${7 + j * 5} ${-8 - j * 5}`}
                stroke="var(--gold)"
                strokeWidth={0.8}
                strokeOpacity={0.6 - j * 0.2}
                strokeDasharray="3 2.4"
              />
            ))}
          </g>
        ))}
      </g>

      {/* Her radiance */}
      <g {...part("radiance")}>
        <path className="m-shimmer" d={RADIANCE} stroke={url("rays")} strokeWidth={0.7} />
      </g>

      {/* Her light, with nothing under it */}
      <g {...part("her-light")}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={78} fill={url("her")} />
      </g>

      {/* A parasol of many tiers */}
      <g {...part("parasols")}>
        <path d={`M ${TIERS.x} ${TIERS.rims[TIERS.rims.length - 1] - 40} V ${TIERS.foot}`} stroke="var(--gold)" strokeWidth={2.2} strokeLinecap="round" />
        <path d={`M ${TIERS.x} ${TIERS.foot - 20} V ${TIERS.foot}`} stroke="var(--art-vermilion)" strokeWidth={3} strokeLinecap="round" />
        {TIERS.rims.map((rim, k) => (
          <g key={rim} stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round">
            <Parasol cx={TIERS.x} rim={rim} s={TIERS.s[k]} />
          </g>
        ))}
      </g>

      {/* The unborn she-goat of three colours, and her young */}
      <g {...part("goat")}>
        {GOATS.map((g, k) => (
          <g key={k} transform={`translate(${g.x} ${g.y}) scale(${g.s})`}>
            <ellipse cy={1} rx={26} ry={2.8} fill="var(--art-musk)" fillOpacity={0.22} />
            <Goat saddle={false}>
              <path d={GOAT_FORE} fill="var(--art-vermilion)" fillOpacity={0.88} />
              <path d={GOAT_HIND} fill="var(--art-hair)" fillOpacity={0.82} />
            </Goat>
          </g>
        ))}
      </g>

      {/* A banyan fig broken open, and one of its seeds broken open */}
      <g {...part("seed")}>
        <ellipse cx={(FIG.x + SEED.x) / 2 - 6} cy={FIG.y + 20} rx={64} ry={5} fill="var(--art-musk)" fillOpacity={0.16} />
        {[-1, 1].map((side) => (
          <g key={side} transform={`translate(${FIG.x + side * 19} ${FIG.y}) rotate(${side * 16})`}>
            <path d={FIG_HALF} fill={url("fig")} stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
            <path d={FIG_HALF} transform="translate(0 1.6) scale(0.82)" fill="var(--art-ivory)" stroke="var(--lotus)" strokeWidth={0.7} />
            <circle cy={5} r={10.5} fill="var(--lotus)" fillOpacity={0.3} />
            {FIG_SEEDS.map((p, k) => (
              <circle key={k} cx={p.x} cy={p.y} r={0.95} fill="var(--art-turmeric)" />
            ))}
            <path d="M 0 -21 L 0 -25" stroke="var(--leaf)" strokeWidth={1.6} strokeLinecap="round" />
          </g>
        ))}
        <circle className="m-breathe" cx={SEED.x} cy={SEED.y} r={20} fill={url("empty")} />
        {[-1, 1].map((side) => (
          <g key={side} transform={`translate(${SEED.x + side * 6} ${SEED.y}) scale(${-side} 1) rotate(${-24} 0 ${SEED.r})`}>
            <path d={SEED_HALF} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
            <path d={`M 0 ${-SEED.r + 2} A ${SEED.r * 0.75 - 2.2} ${SEED.r - 2} 0 0 0 0 ${SEED.r - 2} Z`} fill="var(--art-ivory)" />
            <path d={`M 0 ${-SEED.r + 2} A ${SEED.r * 0.75 - 2.2} ${SEED.r - 2} 0 0 0 0 ${SEED.r - 2} A 3 ${SEED.r - 2} 0 0 1 0 ${-SEED.r + 2} Z`} fill="var(--art-musk)" fillOpacity={0.18} />
          </g>
        ))}
      </g>

      {/* A lotus in clear water: the flower above, the root below */}
      <g {...part("lotus")}>
        <g mask={`url(#${id("pool-mask")})`}>
          <rect x={POOL.x - POOL.hw} y={POOL.top} width={POOL.hw * 2} height={POOL.foot - POOL.top} fill={url("water")} />
          {[0, 1, 2, 3].map((k) => (
            <path
              key={k}
              d={`M ${POOL.x - POOL.hw} ${POOL.top + 14 + k * 18} H ${POOL.x + POOL.hw}`}
              stroke="var(--gold-soft)"
              strokeWidth={0.5}
              strokeOpacity={0.5 - k * 0.1}
              strokeDasharray={`${34 - k * 4} ${8 + k * 3}`}
            />
          ))}
          <path d={`M ${POOL.x - POOL.hw} ${POOL.top} H ${POOL.x + POOL.hw}`} stroke="var(--gold)" strokeWidth={1.3} />
          <path
            d={`M ${POOL.x - POOL.hw} ${ROOT_Y + 8} C ${POOL.x - 30} ${ROOT_Y + 2} ${POOL.x + 30} ${ROOT_Y + 12} ${POOL.x + POOL.hw} ${ROOT_Y + 4} V ${POOL.foot} H ${POOL.x - POOL.hw} Z`}
            fill="var(--art-musk)"
            fillOpacity={0.2}
          />
          <g opacity={0.6}>
            <path d={taper(STALK, () => 3)} fill="var(--leaf)" />
            <path d={taper(LEAF_STALK, () => 2.4)} fill="var(--leaf)" />
            {NODES.map((x, k) => (
              <path key={k} d={`M ${x - 2} ${ROOT_Y + 5} l -4 10 M ${x} ${ROOT_Y + 6} l 0 11 M ${x + 2} ${ROOT_Y + 5} l 4 9`} stroke="var(--art-turmeric)" strokeWidth={0.6} />
            ))}
            {ROOT.map((r) => (
              <ellipse key={r.x} cx={r.x} cy={ROOT_Y} rx={r.rx} ry={5.8} fill="var(--art-ivory)" stroke="var(--art-turmeric)" strokeWidth={0.9} />
            ))}
            {NODES.map((x) => (
              <ellipse key={x} cx={x} cy={ROOT_Y} rx={1.8} ry={6.6} fill="var(--art-turmeric)" fillOpacity={0.8} />
            ))}
          </g>
        </g>
        <ellipse cx={510} cy={POOL.top + 1} rx={26} ry={5} fill="var(--leaf)" fillOpacity={0.75} stroke="var(--gold)" strokeWidth={0.6} />
        <path d={`M 510 ${POOL.top + 1} L 500 ${POOL.top - 3}`} stroke="var(--surface-0)" strokeWidth={1.2} />
        <g transform={`translate(${470} ${POOL.top - 4}) scale(0.92)`}>
          <OpenLotus fill="var(--lotus)" shade="var(--art-crimson)" pad={false} />
        </g>
      </g>
    </svg>
  );
}
