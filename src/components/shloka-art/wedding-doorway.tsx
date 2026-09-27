/**
 * Shloka 6 — "Love's archway and the darting fish".
 *
 * Both names make her face a place that belongs to Kāma. It is his wedding
 * house, seen only as the light that fills its doorway, and her brows are the
 * festive toraṇa over the door. The house is so full that its beauty brims
 * over the threshold and runs off in a channel, as a full tank spills into its
 * outlet, and her eyes are the two fish darting in it. Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { artIds, cubicAt, glint, partProps, round } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };
type Cubic = [Pt, Pt, Pt, Pt];

const CX = 320;
const mirror = (p: Pt): Pt => ({ x: 2 * CX - p.x, y: p.y });
const pt = (p: Pt) => `${round(p.x)} ${round(p.y)}`;

function quadAt(p0: Pt, p1: Pt, p2: Pt, t: number): Pt {
  const u = 1 - t;
  return { x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x, y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y };
}

/** A curve made of cubic segments end to end, as one function of t from 0 to 1. */
function chain(segments: Cubic[]) {
  return (t: number) => {
    const s = Math.min(segments.length - 1, Math.floor(t * segments.length));
    const [a, b, c, d] = segments[s];
    return cubicAt(a, b, c, d, t * segments.length - s);
  };
}

/** The unit tangent and normal of a curve `at` at t. */
function frame(at: (t: number) => Pt, t: number) {
  const a = at(Math.max(0, t - 0.004));
  const b = at(Math.min(1, t + 0.004));
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const tx = (b.x - a.x) / len;
  const ty = (b.y - a.y) / len;
  return { tx, ty, nx: -ty, ny: tx };
}

/** A point `off` units to the side of the curve `at` at t. */
function beside(at: (t: number) => Pt, t: number, off: number): Pt {
  const p = at(t);
  const { nx, ny } = frame(at, t);
  return { x: p.x + nx * off, y: p.y + ny * off };
}

/** Points along the curve `at` from t0 to t1, as a polyline. */
function trace(at: (t: number) => Pt, t0: number, t1: number, n = 32) {
  return "M " + Array.from({ length: n + 1 }, (_, i) => pt(at(t0 + ((t1 - t0) * i) / n))).join(" L ");
}

/** A band along the curve `at`, `width(t)` across: its outline and its two edges. */
function band(at: (t: number) => Pt, width: (t: number) => number, n = 48) {
  const side = (s: number) => (t: number) => beside(at, t, (s * width(t)) / 2);
  const left = Array.from({ length: n + 1 }, (_, i) => pt(side(1)(i / n)));
  const right = Array.from({ length: n + 1 }, (_, i) => pt(side(-1)(i / n)));
  return {
    fill: `M ${left.join(" L ")} L ${[...right].reverse().join(" L ")} Z`,
    left: `M ${left.join(" L ")}`,
    right: `M ${right.join(" L ")}`,
  };
}

/* ── The toraṇa ─────────────────────────────────────────────────────────── */

const BEAM = { x: 116, y: 150, w: 408, h: 9 };
const BEAM_BOTTOM = BEAM.y + BEAM.h;

/**
 * Each arch of the toraṇa is a brow: blunt at its head by the centre,
 * thickest just after it, tapering toward its tail, which stands on the beam.
 * The gap between the two heads is where the point of light sits.
 */
const BROW_L: Cubic = [
  { x: 304, y: 128 },
  { x: 290, y: 90 },
  { x: 222, y: 80 },
  { x: 180, y: BEAM.y - 2 },
];
const BROW_R = BROW_L.map(mirror) as Cubic;
const browWidth = (t: number) => 3 + 12 * Math.min(1, Math.sqrt(t / 0.06)) * (1 - t) ** 1.2;
const brows = [BROW_L, BROW_R].map((b, i) => {
  const at = chain([b]);
  const up = i === 0 ? 1 : -1;
  return {
    body: band(at, browWidth, 64).fill,
    paint: trace(at, 0.05, 0.8),
    sheen: trace((t) => beside(at, t, up * browWidth(t) * 0.3), 0.07, 0.7),
    beads: Array.from({ length: 9 }, (_, k) => beside(at, 0.12 + k * 0.095, -up * (browWidth(0.12 + k * 0.095) / 2 + 3))),
    foot: b[3],
  };
});

const AJNA = { x: CX, y: 124 };

/** A mango leaf hanging tip down from the origin, `l` long. */
const mangoLeaf = (l: number, w: number) =>
  `M 0 0 C ${w} ${round(l * 0.2)} ${round(w * 0.8)} ${round(l * 0.66)} 0 ${l} C ${round(-w * 0.8)} ${round(l * 0.66)} ${-w} ${round(l * 0.2)} 0 0 Z`;
const FESTOON = Array.from({ length: 21 }, (_, i) => ({ x: round(152 + i * 16.8), l: i % 2 ? 18 : 23 }));
const festoonBuds = FESTOON.slice(1).map((f) => round(f.x - 8.4));

/** A string of jasmine buds hanging from each end of the beam, a bell at its foot. */
const STRING_X = [121, 519];
const STRING_BUDS = Array.from({ length: 10 }, (_, k) => BEAM_BOTTOM + 6 + k * 8);
const BELL_Y = BEAM_BOTTOM + 84;
const BELL = "M 0 0 C -3.5 1 -4.5 6 -5.5 10 L 5.5 10 C 4.5 6 3.5 1 0 0 Z";

const SILL_Y = 440;
const POSTS = [136, 504];
const TIES = [206, 404];

/** A plantain stem tied up as a doorpost, from the threshold to the beam. */
function plantainStem(x: number) {
  return `M ${x - 7} ${SILL_Y} C ${x - 6.5} 360 ${x - 5.5} 260 ${x - 5} ${BEAM_BOTTOM} L ${x + 5} ${BEAM_BOTTOM} C ${x + 5.5} 260 ${x + 6.5} 360 ${x + 7} ${SILL_Y} Z`;
}
const sheaths = (x: number) =>
  [430, 370, 310, 250, 196].map((y) => `M ${x - 6} ${y} Q ${x - 1} ${y - 22} ${x + 5} ${y - 50}`).join(" ");

/** A plantain leaf: a long blade with a midrib and slanting veins. */
function plantainLeaf(base: Pt, ctrl: Pt, tip: Pt) {
  const at = (t: number) => quadAt(base, ctrl, tip, t);
  const width = (t: number) => 17 * Math.sin(Math.PI * t) ** 0.8;
  const veins = Array.from({ length: 9 }, (_, i) => {
    const t = 0.16 + i * 0.085;
    const p = pt(at(t));
    const h = width(t + 0.05) / 2 - 0.8;
    return `M ${p} L ${pt(beside(at, t + 0.05, h))} M ${p} L ${pt(beside(at, t + 0.05, -h))}`;
  }).join(" ");
  return { blade: band(at, width, 40).fill, rib: trace(at, 0.02, 0.94, 20), veins };
}
const PLANTAIN_LEAVES = [
  { base: { x: 134, y: 153 }, ctrl: { x: 104, y: 142 }, tip: { x: 64, y: 178 } },
  { base: { x: 137, y: 157 }, ctrl: { x: 110, y: 178 }, tip: { x: 88, y: 238 } },
].flatMap((l) => [plantainLeaf(l.base, l.ctrl, l.tip), plantainLeaf(mirror(l.base), mirror(l.ctrl), mirror(l.tip))]);

const SWAY = ["m-sway", "m-sway m-late", "m-sway m-later"];

/* ── The threshold and the overflow ─────────────────────────────────────── */

const SILL = { x: 112, w: 416, h: 14 };
const SILL_BOTTOM = SILL_Y + SILL.h;
const SPILL = { left: 228, right: 412, foot: 480 };
const sillMarks = Array.from({ length: 30 }, (_, i) => ({ x: 120 + i * 14, i })).filter(
  (m) => m.x < SPILL.left - 6 || m.x > SPILL.right + 6,
);

const BRIM = `M ${SPILL.left - 4} ${SILL_Y + 2} Q ${CX} ${SILL_Y - 12} ${SPILL.right + 4} ${SILL_Y + 2}`;
const FALL = `${BRIM} L ${SPILL.right} ${SILL_BOTTOM} C ${SPILL.right} 464 ${SPILL.right + 4} 472 ${SPILL.right + 10} ${SPILL.foot} L ${SPILL.left - 10} ${SPILL.foot} C ${SPILL.left - 4} 472 ${SPILL.left} 464 ${SPILL.left} ${SILL_BOTTOM} Z`;
const fallStreaks = Array.from({ length: 16 }, (_, i) => {
  const x = SPILL.left + 8 + i * 11.2;
  return `M ${round(x)} ${SILL_BOTTOM + 2} L ${round(x + (x - CX) * 0.05)} ${SPILL.foot - 2}`;
}).join(" ");

/**
 * The outlet channel, a built one. Its head lies under the threshold where
 * the overflow falls in; it runs to the right, narrows, turns down, and opens
 * into the broad water that runs across the foot.
 */
const TOP = SPILL.foot - 2;
const TOP_BANK = `M 214 ${TOP} L 420 ${TOP} C 480 ${TOP} 520 490 540 520 C 560 552 548 600 556 640 C 564 680 600 700 640 704`;
const BOTTOM_BANK = `M 214 ${TOP} C 198 ${TOP} 192 490 192 520 C 192 550 200 562 222 562 L 380 562 C 440 562 486 572 496 600 C 506 628 490 660 470 682 C 450 700 380 712 300 716 C 200 720 80 722 0 724`;
const CHANNEL = `${TOP_BANK} L 640 830 L 0 830 L 0 724 C 80 722 200 720 300 716 C 380 712 450 700 470 682 C 490 660 506 628 496 600 C 486 572 440 562 380 562 L 222 562 C 200 562 192 550 192 520 C 192 490 198 ${TOP} 214 ${TOP} Z`;
const CHANNEL_BANKS = [TOP_BANK, BOTTOM_BANK];

const POOL_RIPPLES = [
  { rx: 100, ry: 14 },
  { rx: 124, ry: 30 },
  { rx: 150, ry: 50 },
].map((r, i) => ({ d: `M ${CX - r.rx} ${SPILL.foot} A ${r.rx} ${r.ry} 0 0 0 ${CX + r.rx} ${SPILL.foot}`, opacity: round(0.7 - i * 0.16) }));

const WATER_GLINTS = [
  { x: 236, y: 544, s: 4 },
  { x: 430, y: 530, s: 3 },
  { x: 516, y: 620, s: 3.5 },
  { x: 560, y: 748, s: 3 },
  { x: 360, y: 760, s: 2.6 },
  { x: 180, y: 786, s: 2.4 },
];

/* ── The fish ───────────────────────────────────────────────────────────── */

/**
 * A fish seen from above, as fish are seen in shallow water, nose at +x,
 * about 70 units long. Its body is bent a little, as a fish is when it turns.
 */
const FISH_BEND = 0.004;
const bend = (d: string) =>
  d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x: string, y: string) => `${x} ${round(Number(y) + FISH_BEND * Number(x) ** 2)}`);
const bent = (x: number, y: number): Pt => ({ x, y: round(y + FISH_BEND * x * x) });

const FISH_BODY = bend(
  "M 32 0 C 30 -6 20 -9 8 -9 C -6 -9 -16 -5 -24 -1.6 Q -30 -4 -38 -10 Q -33 -4 -32 0 Q -33 4 -38 10 Q -30 4 -24 1.6 C -16 5 -6 9 8 9 C 20 9 30 6 32 0 Z",
);
const FISH_FINS = bend(
  "M 16 -7.5 Q 10 -18 1 -16 Q 7 -11 10 -8 Z M 16 7.5 Q 10 18 1 16 Q 7 11 10 8 Z M -6 -7 Q -11 -13 -16 -11 Q -12 -8 -10 -5.5 Z M -6 7 Q -11 13 -16 11 Q -12 8 -10 5.5 Z",
);
const FISH_SPINE = bend("M 22 0 C 10 0 -8 0 -22 0");
const FISH_EYES = [bent(24, -4.6), bent(24, 4.6)];
const FISH_SCALES = [-4.5, 0, 4.5]
  .flatMap((y, row) => Array.from({ length: 6 }, (_, k) => bent(-16 + k * 6 + (row === 1 ? 3 : 0), y)))
  .map((c) => `M ${c.x} ${round(c.y - 2.6)} A 2.6 2.6 0 0 0 ${c.x} ${round(c.y + 2.6)}`)
  .join(" ");

/** The two fish circle one centre in the basin, one above it heading right and one below heading left. */
const FISH_CENTRE = { x: 322, y: 521 };
const FISH_A = `translate(${FISH_CENTRE.x - 8} ${FISH_CENTRE.y - 16}) rotate(-4)`;
const FISHES = [FISH_A, `rotate(180 ${FISH_CENTRE.x} ${FISH_CENTRE.y}) ${FISH_A}`];

export function WeddingDoorway({ idPrefix = "sa6", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient
          id={id("doorway")}
          cx={CX}
          cy={SILL_Y}
          r={300}
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${CX} ${SILL_Y}) scale(0.8 1) translate(${-CX} ${-SILL_Y})`}
        >
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.02 }} />
        </radialGradient>
        <radialGradient id={id("threshold-glow")} cx={CX} cy={SILL_Y} r={190} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.55 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("fall")} x1="0" y1={SILL_Y - 12} x2="0" y2={SPILL.foot} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.6 }} />
        </linearGradient>
        <radialGradient id={id("channel")} cx={CX} cy={SPILL.foot + 10} r={420} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.55 }} />
          <stop offset="0.25" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.26 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.08 }} />
        </radialGradient>
        {/* Water as the old painters drew it: rows of small arcs, each row set half an arc along */}
        <pattern id={id("waves")} width={14} height={9} patternUnits="userSpaceOnUse">
          <path
            d="M 0 9 A 9 9 0 0 1 14 9 M -7 4.5 A 9 9 0 0 1 7 4.5 M 7 4.5 A 9 9 0 0 1 21 4.5"
            stroke="var(--gold-soft)"
            strokeWidth={0.6}
            strokeOpacity={0.55}
          />
        </pattern>
        <clipPath id={id("doorway-clip")}>
          <rect x={POSTS[0] + 3} y={BEAM_BOTTOM} width={POSTS[1] - POSTS[0] - 6} height={SILL_Y - BEAM_BOTTOM} />
        </clipPath>
        <clipPath id={id("channel-clip")}>
          <path d={CHANNEL} />
        </clipPath>
        <linearGradient id={id("fish")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)" }} />
        </linearGradient>
        <clipPath id={id("fish-clip")}>
          <path d={FISH_BODY} />
        </clipPath>
        <radialGradient id={id("ajna")} cx={AJNA.x} cy={AJNA.y} r={30} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Love's wedding house, seen only as the light in its doorway, and its threshold */}
      <g {...part("doorway")}>
        <g clipPath={url("doorway-clip")}>
          <rect className="m-shimmer" width={640} height={830} fill={url("doorway")} />
        </g>
        <circle className="m-shimmer m-late" cx={CX} cy={SILL_Y} r={190} fill={url("threshold-glow")} />
        <g stroke="var(--gold)" strokeWidth={1}>
          <rect x={SILL.x} y={SILL_Y} width={SILL.w} height={SILL.h} fill="var(--art-stone)" />
          <line x1={SILL.x} y1={SILL_Y + 4} x2={SILL.x + SILL.w} y2={SILL_Y + 4} strokeWidth={0.6} strokeOpacity={0.7} />
        </g>
        {sillMarks.map((m) => (
          <circle key={m.x} cx={m.x} cy={SILL_Y + 9} r={2.1} fill={m.i % 2 ? "var(--art-saffron)" : "var(--art-vermilion)"} />
        ))}
      </g>

      {/* The toraṇa over the door: two brows for its arches */}
      <g {...part("torana")}>
        {PLANTAIN_LEAVES.map((l, i) => (
          <g key={i}>
            <path d={l.blade} fill="var(--leaf)" fillOpacity={0.5} stroke="var(--leaf)" strokeWidth={0.7} />
            <path d={l.veins} stroke="var(--leaf)" strokeWidth={0.5} strokeOpacity={0.7} />
            <path d={l.rib} stroke="var(--gold-soft)" strokeWidth={0.8} strokeOpacity={0.8} />
          </g>
        ))}
        {POSTS.map((x) => (
          <g key={x}>
            <path d={plantainStem(x)} fill="var(--leaf)" fillOpacity={0.35} stroke="var(--leaf)" strokeWidth={0.9} />
            <path d={sheaths(x)} stroke="var(--leaf)" strokeWidth={0.7} strokeOpacity={0.8} />
            {TIES.map((y) => (
              <g key={y}>
                <line x1={x - 7} y1={y} x2={x + 7} y2={y} stroke="var(--art-vermilion)" strokeWidth={1.6} />
                <line x1={x - 7} y1={y + 2.6} x2={x + 7} y2={y + 2.6} stroke="var(--gold)" strokeWidth={0.8} />
              </g>
            ))}
          </g>
        ))}
        {STRING_X.map((x, i) => (
          <g key={x} className={SWAY[i + 1]}>
            <line x1={x} y1={BEAM_BOTTOM} x2={x} y2={BELL_Y} stroke="var(--gold)" strokeWidth={0.6} />
            {STRING_BUDS.map((y) => (
              <ellipse key={y} cx={x} cy={y} rx={2.1} ry={3} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
            ))}
            <g transform={`translate(${x} ${BELL_Y})`}>
              <path d={BELL} fill="var(--gold)" fillOpacity={0.85} stroke="var(--gold)" strokeWidth={0.6} />
              <circle cy={11.6} r={1.4} fill="var(--gold)" />
            </g>
          </g>
        ))}
        <rect x={BEAM.x} y={BEAM.y} width={BEAM.w} height={BEAM.h} fill="var(--gold)" fillOpacity={0.5} stroke="var(--gold)" strokeWidth={1} />
        <g fill="var(--art-vermilion)">
          {Array.from({ length: 34 }, (_, i) => BEAM.x + 6 + i * 12).map((x) => (
            <circle key={x} cx={x} cy={BEAM.y + BEAM.h / 2} r={1.5} />
          ))}
        </g>
        {FESTOON.map((f, i) => (
          <g key={f.x} transform={`translate(${f.x} ${BEAM_BOTTOM})`}>
            <g className={SWAY[i % 3]}>
              <path d={mangoLeaf(f.l, 4.6)} fill="var(--leaf)" fillOpacity={0.85} />
              <line x1={0} y1={1} x2={0} y2={round(f.l * 0.86)} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.7} />
            </g>
          </g>
        ))}
        {festoonBuds.map((x) => (
          <ellipse key={x} cx={x} cy={BEAM_BOTTOM + 2.5} rx={1.8} ry={2.5} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
        ))}
        {brows.map((b, i) => (
          <g key={i}>
            <g fill="var(--gold)">
              {b.beads.map((p, k) => (
                <circle key={k} cx={round(p.x)} cy={round(p.y)} r={1.5} fillOpacity={0.8} />
              ))}
            </g>
            <path d={b.body} fill="var(--gold)" fillOpacity={0.85} stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
            <path d={b.paint} stroke="var(--art-vermilion)" strokeWidth={1.8} strokeLinecap="round" />
            <path d={b.sheen} stroke="var(--art-core)" strokeWidth={0.9} strokeOpacity={0.9} strokeLinecap="round" />
            <circle cx={b.foot.x} cy={b.foot.y - 2} r={3.4} fill="var(--gold)" stroke="var(--gold)" strokeWidth={0.6} />
            <circle cx={b.foot.x} cy={b.foot.y - 2} r={1.3} fill="var(--art-vermilion)" />
          </g>
        ))}
      </g>

      {/* The overflow of her face's beauty, and the two fish darting in it */}
      <g {...part("stream")}>
        <path className="m-shimmer" d={CHANNEL} fill={url("channel")} />
        <path d={CHANNEL} fill={url("waves")} />
        <g className="m-shimmer m-late" clipPath={url("channel-clip")} stroke="var(--gold-soft)" strokeWidth={0.8} strokeLinecap="round">
          {POOL_RIPPLES.map((r) => (
            <path key={r.d} d={r.d} strokeOpacity={r.opacity} />
          ))}
        </g>
        <g stroke="var(--gold)" strokeLinejoin="round">
          {CHANNEL_BANKS.map((d) => (
            <path key={d} d={d} strokeWidth={1.2} />
          ))}
          <path d={CHANNEL_BANKS[1]} transform="translate(-3 4)" strokeWidth={0.6} strokeOpacity={0.55} />
          <path d={CHANNEL_BANKS[0]} transform="translate(4 -3)" strokeWidth={0.6} strokeOpacity={0.55} />
        </g>
        <path d={FALL} fill={url("fall")} />
        <path d={fallStreaks} stroke="var(--art-core)" strokeWidth={0.7} strokeOpacity={0.7} />
        <path d={BRIM} stroke="var(--art-core)" strokeWidth={1.4} strokeLinecap="round" />
        <g fill="var(--art-core)">
          {WATER_GLINTS.map((g) => (
            <path key={g.x} d={glint(g.s)} transform={`translate(${g.x} ${g.y})`} />
          ))}
        </g>
        {FISHES.map((transform, i) => (
          <g key={i}>
            <g transform={`translate(4 9) ${transform}`}>
              <g className={i ? "m-dart m-late" : "m-dart"}>
                <path d={FISH_BODY} fill="var(--art-crimson)" fillOpacity={0.14} />
              </g>
            </g>
            <g transform={transform}>
              <g className={i ? "m-dart m-late" : "m-dart"}>
                <path d={FISH_FINS} fill="var(--art-saffron)" fillOpacity={0.75} stroke="var(--gold)" strokeWidth={0.5} />
                <path d={FISH_BODY} fill={url("fish")} />
                <path d={FISH_SCALES} clipPath={url("fish-clip")} stroke="var(--gold)" strokeWidth={0.5} strokeOpacity={0.7} />
                <path d={FISH_SPINE} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
                <path d={FISH_BODY} stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
                {FISH_EYES.map((e) => (
                  <g key={e.y}>
                    <circle cx={e.x} cy={e.y} r={2.3} fill="var(--art-core)" />
                    <circle cx={e.x} cy={e.y} r={1.3} fill="var(--art-musk)" />
                  </g>
                ))}
              </g>
            </g>
          </g>
        ))}
      </g>

      {/* A point of light in the space between the brows */}
      <g {...part("ajna")}>
        <circle cx={AJNA.x} cy={AJNA.y} r={30} fill={url("ajna")} />
        <circle cx={AJNA.x} cy={AJNA.y} r={7} fill="var(--art-saffron)" fillOpacity={0.45} />
        <circle cx={AJNA.x} cy={AJNA.y} r={3.4} fill="var(--art-core)" />
        <circle cx={AJNA.x} cy={AJNA.y} r={7} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.8} />
      </g>
    </svg>
  );
}
