/**
 * Shloka 23 — "Lotus forest, kadamba grove, sea of nectar — and then her eyes".
 *
 * The first three names are frames, each wider than the last, and the artwork
 * draws them as rings round one centre: lotuses grown as tall as trees, where
 * her light is seated, a grove of kadamba round them, and the island they
 * stand on, out in a sea of nectar. Then the verse turns to her eyes, and the
 * artwork does too: in the near water two fish, the eyes she is named for,
 * circle each other, and the path of her glance runs from them over the water
 * to the viewer, carrying a lotus. Which name each part answers to is written
 * up for readers in the registry, next to this artwork's entry.
 */

import {
  artIds,
  Fish,
  FISH_BODY,
  FishDefs,
  glint,
  kadambaHead,
  KadambaHead,
  kadambaLeaf,
  KadambaLeaf,
  OpenLotus,
  partProps,
  polar,
  radiance,
  round,
  WavePattern,
} from "./primitives";
import type { ArtProps } from "./types";

const CX = 320;

/* ── The sea and the island ────────────────────────────────────────────── */

const SEA_TOP = 420;
const ISLAND = { cy: 544, rx: 196, ry: 42 };
const POOL = { cy: 552, rx: 90, ry: 16 };

/* ── The kadamba grove ─────────────────────────────────────────────────── */

type Tree = { x: number; base: number; h: number; r: number };

/** Round the lotuses, open at the front; the far trees are the smallest. */
const TREES: Tree[] = [
  { x: 238, base: 508, h: 22, r: 17 },
  { x: 402, base: 508, h: 22, r: 17 },
  { x: 184, base: 522, h: 30, r: 22 },
  { x: 456, base: 522, h: 30, r: 22 },
  { x: 146, base: 550, h: 40, r: 27 },
  { x: 494, base: 550, h: 40, r: 27 },
].sort((a, b) => a.base - b.base);

const HEAD_SPOTS = [
  { x: -0.42, y: -0.18 },
  { x: 0.34, y: -0.36 },
  { x: 0.06, y: 0.12 },
  { x: -0.12, y: -0.58 },
  { x: 0.5, y: 0.18 },
  { x: -0.5, y: 0.34 },
];

const GROVE = TREES.map((t, ti) => {
  const c = { x: t.x, y: round(t.base - t.h - t.r * 0.5) };
  const mass = [
    { x: 0, y: 0, r: t.r * 0.82 },
    { x: -t.r * 0.52, y: t.r * 0.2, r: t.r * 0.6 },
    { x: t.r * 0.52, y: t.r * 0.2, r: t.r * 0.6 },
    { x: -t.r * 0.2, y: -t.r * 0.42, r: t.r * 0.6 },
    { x: t.r * 0.3, y: -t.r * 0.36, r: t.r * 0.55 },
  ].map((m) => ({ x: round(c.x + m.x), y: round(c.y + m.y), r: round(m.r) }));
  const leaves = Array.from({ length: 9 }, (_, k) => {
    const deg = k * 40 + ti * 13;
    const at = polar(c.x, c.y, t.r * 0.62, deg);
    return { ...kadambaLeaf(round(t.r * 0.56), round(t.r * 0.17)), at: `translate(${at.x} ${at.y}) rotate(${-deg})` };
  });
  const heads = HEAD_SPOTS.slice(0, t.r > 24 ? 6 : 4).map((s, k) =>
    kadambaHead({ x: round(c.x + s.x * t.r), y: round(c.y + s.y * t.r), r: round(Math.max(3.2, t.r * 0.16)) }, ti * 6 + k),
  );
  const fork = { x: c.x, y: round(c.y + t.r * 0.4) };
  const trunk = `M ${t.x - 2} ${t.base} Q ${t.x - 1} ${round((t.base + fork.y) / 2)} ${fork.x} ${fork.y} M ${t.x + 2} ${t.base} Q ${t.x + 1} ${round((t.base + fork.y) / 2)} ${fork.x} ${fork.y}`;
  const boughs = `M ${fork.x} ${fork.y} Q ${round(c.x - t.r * 0.2)} ${round(c.y + t.r * 0.1)} ${round(c.x - t.r * 0.45)} ${round(c.y - t.r * 0.1)} M ${fork.x} ${fork.y} Q ${round(c.x + t.r * 0.2)} ${round(c.y + t.r * 0.05)} ${round(c.x + t.r * 0.4)} ${round(c.y - t.r * 0.2)}`;
  return { t, c, mass, leaves, heads, trunk, boughs };
});

/* ── The great lotus forest ────────────────────────────────────────────── */

const BLOOMS = [
  { x: 296, y: 482, s: 0.5 },
  { x: 346, y: 480, s: 0.5 },
  { x: 228, y: 524, s: 0.48 },
  { x: 412, y: 522, s: 0.48 },
  { x: 266, y: 496, s: 0.62 },
  { x: 374, y: 494, s: 0.62 },
  { x: CX, y: 476, s: 0.82 },
];

const stalk = (x: number, y: number, lean: number) => {
  const x0 = round(CX + (x - CX) * 0.45 + lean);
  const y0 = POOL.cy + 4;
  return `M ${x0} ${y0} Q ${round(x0 + (x - x0) * 0.2)} ${round((y0 + y) / 2)} ${x} ${y}`;
};

/** Lotus leaves held up on their own stalks above the water, as the real plant holds them. */
const PADS = [
  { x: 262, y: 512, rx: 19, tilt: -14 },
  { x: 382, y: 510, rx: 19, tilt: 12 },
  { x: 290, y: 524, rx: 27, tilt: -8 },
  { x: 352, y: 530, rx: 26, tilt: 9 },
  { x: 246, y: 548, rx: 22, tilt: -4 },
  { x: 398, y: 550, rx: 22, tilt: 6 },
];
const padVeins = (rx: number) =>
  Array.from({ length: 9 }, (_, k) => {
    const deg = k * 40 + 20;
    const e = { x: round(rx * 0.92 * Math.cos((deg * Math.PI) / 180)), y: round(rx * 0.3 * Math.sin((deg * Math.PI) / 180)) };
    return `M 0 0 L ${e.x} ${e.y}`;
  }).join(" ");

const BUDS = [
  { x: 292, y: 466, a: -10 },
  { x: 350, y: 462, a: 12 },
  { x: 206, y: 506, a: -8 },
  { x: 434, y: 504, a: 8 },
  { x: 244, y: 478, a: -14 },
  { x: 398, y: 474, a: 14 },
];
const BUD = "M 0 0 C -6 -4 -6 -13 0 -20 C 6 -13 6 -4 0 0 Z";

/** Her light, seated in the seed head of the tallest lotus. */
const BINDU = { x: CX, y: round(476 - 6 * 0.82) };
const RADIANCE = radiance({ cx: BINDU.x, cy: BINDU.y, from: 14, long: 410, short: 240 });

/* ── Her eyes, and her glance ──────────────────────────────────────────── */

const EYES = { x: CX, y: 624 };
const FISH_S = 0.84;
/** Each fish on a circle laid flat on the water, heading round it clockwise, so the two chase each other. */
const FISHES = [70, 250].map((deg) => {
  const p = polar(0, 0, 22, deg);
  return `translate(${EYES.x} ${EYES.y}) scale(1 0.66) translate(${p.x} ${p.y}) rotate(${90 - deg}) scale(${FISH_S})`;
});
const RIPPLES = [50, 74, 102, 134].map((rx, k) => ({ rx, ry: round(rx * 0.3), opacity: round(0.7 - k * 0.15) }));

const GLANCE = `M ${EYES.x - 16} ${EYES.y + 24} L ${EYES.x + 16} ${EYES.y + 24} L ${EYES.x + 74} 800 L ${EYES.x - 74} 800 Z`;
const GLANCE_GLINTS = Array.from({ length: 9 }, (_, k) => {
  const y = EYES.y + 34 + k * 15;
  const half = 12 + k * 5.6;
  return [-1, 0, 1].map((side, j) => ({
    x: round(EYES.x + side * half * (0.55 + ((k * 7 + j * 3) % 5) * 0.1)),
    y: round(y + ((k + j) % 3) * 3),
    s: round(1.8 + ((k * 5 + j) % 4) * 0.7),
  }));
}).flat();
const GIFT = { x: CX, y: 684 };

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

export function NectarIsland({ idPrefix = "sa23", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <linearGradient id={id("sea")} x1={0} y1={SEA_TOP} x2={0} y2={800} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
          <stop offset="0.12" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.5 }} />
          <stop offset="0.6" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.32 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.12 }} />
        </linearGradient>
        <linearGradient id={id("sea-fade")} x1={0} y1={SEA_TOP} x2={0} y2={SEA_TOP + 60} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={0} />
          <stop offset="1" stopColor="#fff" stopOpacity={1} />
        </linearGradient>
        <mask id={id("sea-mask")} maskUnits="userSpaceOnUse" x="-40" y="0" width="720" height="830">
          <rect x={-40} width={720} height={830} fill={url("sea-fade")} />
        </mask>
        <WavePattern id={id("waves")} />
        <radialGradient id={id("island")} cx={CX} cy={ISLAND.cy - 10} r={ISLAND.rx} gradientTransform={`translate(0 ${ISLAND.cy}) scale(1 0.24) translate(0 ${-ISLAND.cy})`} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="0.7" style={{ stopColor: "var(--gold)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)" }} />
        </radialGradient>
        <radialGradient id={id("glow")} cx={BINDU.x} cy={BINDU.y} r={280} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={BINDU.x} cy={BINDU.y} r={410} gradientUnits="userSpaceOnUse">
          <stop offset="0.04" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.14" style={{ stopColor: "var(--gold)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("kadamba")} cx="0.38" cy="0.34" r="0.72">
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
        <linearGradient id={id("glance")} x1={0} y1={EYES.y + 24} x2={0} y2={800} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </linearGradient>
        <FishDefs id={id} />
      </defs>

      {/* The sea of nectar, out to the edges of the plate */}
      <g {...part("sea")}>
        <rect x={-40} y={SEA_TOP} width={720} height={830 - SEA_TOP} fill={url("sea")} />
        <rect x={-40} y={SEA_TOP} width={720} height={830 - SEA_TOP} fill={url("waves")} mask={url("sea-mask")} opacity={0.7} />
        <ellipse cx={CX} cy={ISLAND.cy + 4} rx={ISLAND.rx + 14} ry={ISLAND.ry + 8} stroke="var(--art-moon)" strokeWidth={2.4} strokeOpacity={0.7} />
        <ellipse className="m-shimmer" cx={CX} cy={ISLAND.cy + 6} rx={ISLAND.rx + 30} ry={ISLAND.ry + 15} stroke="var(--gold-soft)" strokeWidth={0.8} strokeOpacity={0.6} strokeDasharray="22 9" />
        <ellipse cx={CX} cy={ISLAND.cy + 6} rx={ISLAND.rx} ry={ISLAND.ry} fill="var(--art-musk)" fillOpacity={0.22} />
        <ellipse cx={CX} cy={ISLAND.cy} rx={ISLAND.rx} ry={ISLAND.ry} fill={url("island")} stroke="var(--gold)" strokeWidth={1.2} />
        <ellipse cx={CX} cy={POOL.cy} rx={POOL.rx} ry={POOL.ry} fill="var(--art-moon)" fillOpacity={0.5} stroke="var(--gold)" strokeWidth={0.9} />
        <ellipse cx={CX} cy={POOL.cy} rx={POOL.rx} ry={POOL.ry} fill={url("waves")} />
      </g>

      {/* Her light, from her seat at the heart of the lotuses */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={BINDU.x} cy={BINDU.y} r={280} fill={url("glow")} />
        <path className="m-shimmer" d={RADIANCE} stroke={url("radiance")} strokeWidth={0.7} />
      </g>

      {/* The kadamba grove round the lotuses */}
      <g {...part("grove")}>
        {GROVE.map((g, gi) => (
          <g key={gi}>
            <ellipse cx={g.t.x} cy={g.t.base + 1} rx={g.t.r * 0.6} ry={3} fill="var(--art-musk)" fillOpacity={0.25} />
            <path d={g.trunk} stroke="var(--art-musk)" strokeWidth={2.2} strokeLinecap="round" />
            <path d={g.boughs} stroke="var(--art-musk)" strokeWidth={1.4} strokeLinecap="round" />
            <g opacity={0.62} fill="var(--leaf)">
              {g.mass.map((m, k) => (
                <circle key={k} cx={m.x} cy={m.y} r={m.r} />
              ))}
            </g>
            {g.leaves.map((l, k) => (
              <g key={k} transform={l.at}>
                <KadambaLeaf {...l} />
              </g>
            ))}
            {g.heads.map((h, k) => (
              <KadambaHead key={k} head={h} fill={url("kadamba")} />
            ))}
          </g>
        ))}
      </g>

      {/* The great lotus forest, flowers as tall as the trees */}
      <g {...part("lotuses")}>
        <g stroke="var(--leaf)" strokeLinecap="round">
          {PADS.map((p, k) => (
            <path key={k} d={stalk(p.x, p.y, k % 2 ? 6 : -6)} strokeWidth={1.6} />
          ))}
          {BUDS.map((b, k) => (
            <path key={k} d={stalk(b.x, b.y, k % 2 ? -4 : 4)} strokeWidth={1.4} />
          ))}
          {BLOOMS.map((b) => (
            <path key={b.x} d={stalk(b.x, b.y + 4, 0)} strokeWidth={round(1.6 + b.s * 2)} />
          ))}
        </g>
        {PADS.map((p, k) => (
          <g key={k} transform={`translate(${p.x} ${p.y}) rotate(${p.tilt})`}>
            <ellipse rx={p.rx} ry={round(p.rx * 0.32)} fill="var(--leaf)" fillOpacity={0.85} stroke="var(--gold-soft)" strokeWidth={0.7} />
            <path d={padVeins(p.rx)} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.6} />
          </g>
        ))}
        {BUDS.map((b, k) => (
          <path key={k} d={BUD} transform={`translate(${b.x} ${b.y}) rotate(${b.a})`} fill="var(--lotus)" stroke="var(--gold)" strokeWidth={0.6} />
        ))}
        {BLOOMS.map((b) => (
          <g key={b.x} transform={`translate(${b.x} ${b.y}) scale(${b.s})`}>
            <OpenLotus pad={false} shade="var(--art-crimson)" />
          </g>
        ))}
        <circle className="m-breathe" cx={BINDU.x} cy={BINDU.y} r={22} fill={url("bindu-glow")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={3.4} fill="var(--art-core)" />
        <circle cx={BINDU.x} cy={BINDU.y} r={6} stroke="var(--gold)" strokeWidth={0.7} />
      </g>

      {/* Her eyes: two fish circling in the near water */}
      <g {...part("eyes")}>
        <g stroke="var(--gold-soft)" strokeWidth={0.8}>
          {RIPPLES.map((r, k) => (
            <ellipse key={r.rx} className={k % 2 ? "m-shimmer m-late" : "m-shimmer"} cx={EYES.x} cy={EYES.y} rx={r.rx} ry={r.ry} strokeOpacity={r.opacity} />
          ))}
        </g>
        {FISHES.map((transform, i) => (
          <g key={i}>
            <g transform={`translate(3 6) ${transform}`}>
              <path d={FISH_BODY} fill="var(--art-crimson)" fillOpacity={0.14} />
            </g>
            <g transform={transform}>
              <g className={i ? "m-dart m-late" : "m-dart"}>
                <Fish url={url} />
              </g>
            </g>
          </g>
        ))}
      </g>

      {/* The path of her glance, bringing what is wished for */}
      <g {...part("gift")}>
        <path className="m-shimmer" d={GLANCE} fill={url("glance")} />
        <g fill="var(--art-core)">
          {GLANCE_GLINTS.map((g, k) => (
            <path key={k} className={TWINKLE[k % 3]} d={glint(g.s)} transform={`translate(${g.x} ${g.y})`} />
          ))}
        </g>
        <g transform={`translate(${GIFT.x} ${GIFT.y}) scale(0.56)`}>
          <g className="m-sway">
            <OpenLotus />
          </g>
        </g>
      </g>
    </svg>
  );
}
