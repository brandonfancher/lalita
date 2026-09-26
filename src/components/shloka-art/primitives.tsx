/**
 * The shared drawing vocabulary of the shloka artworks.
 *
 * Every artwork is an original composition, but motifs that recur across the
 * series (a lion, a tongue of flame, rising embers) are drawn once here so
 * they look the same wherever they return. Promote a motif into this file the
 * second time an artwork needs it, and record it in docs/artwork-ledger.md.
 *
 * Everything here is deterministic: artworks render on the server for the
 * backdrop and again on the client inside the plate, and must match.
 */

import type { CSSProperties } from "react";

import type { ArtPart } from "./types";

export const round = (n: number) => Math.round(n * 100) / 100;

/** A point at `deg` degrees (0 = east, counter-clockwise, SVG y pointing down). */
export function polar(cx: number, cy: number, r: number, deg: number) {
  const t = (deg * Math.PI) / 180;
  return { x: round(cx + r * Math.cos(t)), y: round(cy - r * Math.sin(t)) };
}

/** Unique ids for an artwork's <defs>, so two copies can share a page. */
export function artIds(prefix: string) {
  const id = (name: string) => `${prefix}-${name}`;
  return { id, url: (name: string) => `url(#${id(name)})` };
}

/**
 * Attributes for each top-level part of an artwork. When a note points at
 * one part, every other part recedes. Put animations on elements *inside* a
 * part, never on the part's own group, or they will override the dimming.
 */
export function partProps(active: ArtPart | null | undefined) {
  return (name: ArtPart) => ({
    "data-part": name,
    "data-dim": active != null && active !== name ? true : undefined,
  });
}

/** A single tongue of flame, base at the origin, pointing up, tip leaning by `lean`. */
export function tongue(h: number, w: number, lean: number) {
  const p = round;
  return [
    `M ${p(-w / 2)} 0`,
    `C ${p(-w / 2 - 1)} ${p(-h * 0.35)} ${p(-w * 0.15)} ${p(-h * 0.5)} ${p(lean * 0.3)} ${p(-h * 0.68)}`,
    `C ${p(lean * 0.65)} ${p(-h * 0.8)} ${p(lean * 1.1)} ${p(-h * 0.88)} ${p(lean)} ${p(-h)}`,
    `C ${p(lean + w * 0.45)} ${p(-h * 0.8)} ${p(w * 0.6)} ${p(-h * 0.55)} ${p(w * 0.35)} ${p(-h * 0.35)}`,
    `C ${p(w * 0.22)} ${p(-h * 0.2)} ${p(w / 2 + 1)} ${p(-h * 0.1)} ${p(w / 2)} 0`,
    "Z",
  ].join(" ");
}

type Pt = { x: number; y: number };

/** A point `t` of the way along a cubic Bézier. */
export function cubicAt(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return { x: a * p0.x + b * p1.x + c * p2.x + d * p3.x, y: a * p0.y + b * p1.y + c * p2.y + d * p3.y };
}

/** A four-pointed glint of light centred on the origin. */
export function glint(s: number) {
  const q = round(s * 0.12);
  return `M 0 ${-s} Q ${q} ${-q} ${s} 0 Q ${q} ${q} 0 ${s} Q ${-q} ${q} ${-s} 0 Q ${-q} ${-q} 0 ${-s} Z`;
}

/** A round-topped arch: a semicircle of radius r centred on (cx, cy), on posts down to `bottom`. */
export type Arch = { cx: number; cy: number; bottom: number };

export function archPath({ cx, cy, bottom }: Arch, r: number) {
  return `M ${cx - r} ${bottom} V ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} V ${bottom}`;
}

export type Placement = { x: number; y: number; angle: number };

/**
 * Points spaced evenly along an arch of radius r, up one post, over the top
 * and down the other, each with its outward angle (0 = straight up).
 */
export function alongArch(
  { cx, cy, bottom }: Arch,
  r: number,
  spacing: number,
  skip?: (p: Placement) => boolean,
): Placement[] {
  const out: Placement[] = [];
  const postCount = Math.floor((bottom - 24 - cy) / spacing);
  for (let i = postCount; i >= 1; i--) {
    out.push({ x: cx - r, y: cy + i * spacing, angle: -90 });
  }
  const arcSteps = Math.round((Math.PI * r) / spacing);
  for (let i = 0; i <= arcSteps; i++) {
    const theta = Math.PI - (i / arcSteps) * Math.PI;
    out.push({
      x: cx + r * Math.cos(theta),
      y: cy - r * Math.sin(theta),
      angle: 90 - (theta * 180) / Math.PI,
    });
  }
  for (let i = 1; i <= postCount; i++) {
    out.push({ x: cx + r, y: cy + i * spacing, angle: 90 });
  }
  return skip ? out.filter((p) => !skip(p)) : out;
}

export type Ember = { x: number; y: number; r: number; dx: number; dur: number; delay: number };

/** Sparks that rise and fade on a loop (`m-ember`). Colour them with `fill` on the parent. */
export function Embers({ embers }: { embers: Ember[] }) {
  return (
    <>
      {embers.map((e, i) => (
        <circle
          key={i}
          className="m-ember"
          cx={e.x}
          cy={e.y}
          r={e.r}
          style={{ "--dx": `${e.dx}px`, "--dur": `${e.dur}s`, "--delay": `${e.delay}s` } as CSSProperties}
        />
      ))}
    </>
  );
}

/**
 * A seated lion facing right, base on y = 92, about 96 units wide. Paint it
 * with `fill`/`stroke` (currentColor works) on a parent group; mirror it with
 * `scale(-1 1)` to face left.
 */
export function Lion() {
  const mane = Array.from({ length: 11 }, (_, i) => {
    const deg = -200 + i * 26;
    const t = (deg * Math.PI) / 180;
    return {
      d: tongue(11, 8, 3),
      transform: `translate(${round(72 + 15 * Math.cos(t))} ${round(34 + 15 * Math.sin(t))}) rotate(${round(deg + 90)})`,
    };
  });
  return (
    <g>
      <path
        d="M 12 90 C -4 84 -6 62 4 52 C 10 46 14 40 10 32"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <path d={tongue(12, 9, -3)} transform="translate(10 33) rotate(-20)" />
      <path d="M 12 92 C 2 84 4 62 22 55 C 34 50 44 54 54 46 L 78 48 C 84 58 83 70 78 78 L 79 86 C 88 86 93 88 93 92 Z" />
      {mane.map((m, i) => (
        <path key={i} d={m.d} transform={m.transform} />
      ))}
      <circle cx={72} cy={34} r={16} />
      <path d="M 78 25 C 88 24 96 30 96 37 C 96 43 90 47 82 46 Z" />
      <g fill="none" stroke="var(--art-carve)" strokeWidth={1.3} strokeLinecap="round">
        <path d="M 20 72 C 30 62 48 64 54 76 C 57 83 62 88 70 88" />
        <path d="M 68 64 L 68 91" />
        <path d="M 88 41 C 91 42 93 41 95 40" />
      </g>
      <circle cx={84} cy={32} r={1.8} fill="var(--art-carve)" />
    </g>
  );
}

const NOOSE_LOOP = { x: 0, y: -52, r: 34 };
const NOOSE_TAIL: [Pt, Pt, Pt, Pt] = [
  { x: 0, y: -10 },
  { x: -5, y: 6 },
  { x: 9, y: 16 },
  { x: 4, y: 32 },
];

/** Short strokes across a cord, slanted like the lay of a two-ply rope. */
function twists(points: { p: Pt; tangent: Pt }[], half: number) {
  const k = Math.cos((40 * Math.PI) / 180);
  const s = Math.sin((40 * Math.PI) / 180);
  return points
    .map(({ p, tangent }) => {
      const dx = -tangent.y * k + tangent.x * s;
      const dy = tangent.x * k + tangent.y * s;
      return `M ${round(p.x - dx * half)} ${round(p.y - dy * half)} L ${round(p.x + dx * half)} ${round(p.y + dy * half)}`;
    })
    .join(" ");
}

const nooseLoopTwists = twists(
  Array.from({ length: 34 }, (_, i) => (i / 34) * Math.PI * 2)
    .filter((t) => Math.abs(t - Math.PI / 2) > 0.34)
    .map((t) => ({
      p: { x: NOOSE_LOOP.x + NOOSE_LOOP.r * Math.cos(t), y: NOOSE_LOOP.y + NOOSE_LOOP.r * Math.sin(t) },
      tangent: { x: -Math.sin(t), y: Math.cos(t) },
    })),
  2.6,
);

const nooseTailTwists = twists(
  Array.from({ length: 6 }, (_, i) => (i + 1) / 7).map((t) => {
    const a = cubicAt(...NOOSE_TAIL, t);
    const b = cubicAt(...NOOSE_TAIL, t + 0.01);
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    return { p: a, tangent: { x: (b.x - a.x) / len, y: (b.y - a.y) / len } };
  }),
  2.4,
);

const nooseBeads = [-150, -110, -70, -30].map((deg) => {
  const t = (deg * Math.PI) / 180;
  return { x: round(NOOSE_LOOP.x + NOOSE_LOOP.r * Math.cos(t)), y: round(NOOSE_LOOP.y + NOOSE_LOOP.r * Math.sin(t)) };
});

/**
 * Her noose (pāśa), the cord of longing: a loop of twisted red cord, bound
 * with gold where it closes, strung with beads, the tail ending in a tassel.
 * Held at the origin, loop upward; about 70 units wide and 140 tall.
 */
export function Noose() {
  const [p0, p1, p2, p3] = NOOSE_TAIL;
  const { x, y, r } = NOOSE_LOOP;
  return (
    <g>
      <g stroke="var(--art-vermilion)" strokeWidth={5} strokeLinecap="round">
        <circle cx={x} cy={y} r={r} />
        <path d={`M ${p0.x} ${p0.y} C ${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`} />
      </g>
      <path d={nooseLoopTwists + " " + nooseTailTwists} stroke="var(--art-carve)" strokeWidth={1.1} strokeLinecap="round" />
      <g fill="var(--gold)">
        {nooseBeads.map((b, i) => (
          <g key={i}>
            <circle cx={b.x} cy={b.y} r={3.4} />
            <circle cx={b.x} cy={b.y} r={1.4} fill="var(--art-carve)" />
          </g>
        ))}
        <rect x={-7} y={-26} width={14} height={14} rx={2.5} />
        <path d={`M ${p3.x - 4} ${p3.y + 1} Q ${p3.x} ${p3.y - 4} ${p3.x + 4} ${p3.y + 1} L ${p3.x + 5.5} ${p3.y + 8} L ${p3.x - 5.5} ${p3.y + 8} Z`} />
      </g>
      <path d="M -7 -21.5 H 7 M -7 -16.5 H 7" stroke="var(--art-carve)" strokeWidth={1} />
      <g stroke="var(--gold)" strokeWidth={1.1} strokeLinecap="round">
        {[-4, -2, 0, 2, 4].map((dx) => (
          <path key={dx} d={`M ${p3.x + dx} ${p3.y + 8} L ${round(p3.x + dx * 1.6)} ${p3.y + 24}`} />
        ))}
      </g>
    </g>
  );
}

/**
 * Her goad (aṅkuśa), the elephant-driver's hook: a banded gold shaft with a
 * spear point, and a hook curving out to the right below it. Held at the
 * origin, pointing up; mirror with `scale(-1 1)` to hook left.
 */
export function Goad() {
  return (
    <g>
      <g fill="var(--gold)">
        <path d="M -3 34 L -2.2 -86 L 2.2 -86 L 3 34 Z" />
        <circle cx={0} cy={39} r={5} />
        <path d="M -2.5 42 L 0 50 L 2.5 42 Z" />
        {[-16, 14, -68].map((y) => (
          <rect key={y} x={-5} y={y - 2} width={10} height={4} rx={1.5} />
        ))}
        <path d="M -7 -84 Q -8 -93 -3 -97 L 3 -97 Q 8 -93 7 -84 Z" />
        <path d="M -4.5 -97 C -7 -110 -3 -128 0 -144 C 3 -128 7 -110 4.5 -97 Z" />
        <path d="M 3 -95 C 20 -106 40 -98 40 -78 C 40 -65 31 -56 19 -57 C 26 -62 31 -70 30 -79 C 29 -91 17 -94 3 -88 Z" />
      </g>
      <g stroke="var(--art-carve)" strokeWidth={1} strokeLinecap="round">
        <path d="M 0 -101 L 0 -134" />
        <path d="M 8 -95 C 22 -100 35 -93 35 -79 C 35 -71 31 -65 25 -61" />
        <path d="M -5 -88 H 5" />
      </g>
    </g>
  );
}

/** Points every `spacing` units along a cubic, starting `from` units in, each with its unit tangent. */
function alongCubic(c: [Pt, Pt, Pt, Pt], spacing: number, from: number) {
  const out: { p: Pt; tangent: Pt }[] = [];
  let prev = c[0];
  let len = 0;
  let next = from;
  for (let i = 1; i <= 240; i++) {
    const p = cubicAt(...c, i / 240);
    const d = Math.hypot(p.x - prev.x, p.y - prev.y);
    len += d;
    if (len >= next) {
      out.push({ p, tangent: { x: (p.x - prev.x) / d, y: (p.y - prev.y) / d } });
      next += spacing;
    }
    prev = p;
  }
  return out;
}

/**
 * The shape of her sugarcane bow, in a frame where the bow is aimed up: the
 * grip at (0, -grip) and the tips at (±half, bend - grip). Drawn, the string
 * runs from each tip to the origin; braced, straight from tip to tip.
 */
export type BowShape = { half: number; grip: number; bend: number };

function bowLimb({ half, grip, bend }: BowShape): [Pt, Pt, Pt, Pt] {
  return [
    { x: 0, y: -grip },
    { x: half * 0.5, y: -grip },
    { x: half * 0.88, y: round(-grip + bend * 0.4) },
    { x: half, y: -grip + bend },
  ];
}

/** Where the string is tied: the left tip, then the right. */
export function bowTips(shape: BowShape): [Pt, Pt] {
  const tip = bowLimb(shape)[3];
  return [{ x: -tip.x, y: tip.y }, tip];
}

/** A long sugarcane leaf, base at the origin, pointing up and arching toward +x by `curl`. */
function caneLeaf(l: number, w: number, curl: number) {
  const p = round;
  return `M ${p(-w / 2)} 0 C ${p(-w)} ${p(-l * 0.35)} ${p(curl * 0.4 - w * 0.4)} ${p(-l * 0.75)} ${p(curl)} ${p(-l)} C ${p(curl * 0.4 + w * 0.9)} ${p(-l * 0.7)} ${p(w)} ${p(-l * 0.3)} ${p(w / 2)} 0 Z`;
}

const CANE_LEAVES = [
  { angle: 38, l: 30, curl: 7 },
  { angle: 78, l: 42, curl: 10 },
  { angle: 118, l: 34, curl: 9 },
];

/**
 * Her bow of sugarcane (ikṣu-kodaṇḍa), the mind: a gold cane stave jointed
 * at every node, bound at the grip, with a tuft of leaves at each tip. Draw
 * its string separately with `BeeString`.
 */
export function SugarcaneBow({ shape }: { shape: BowShape }) {
  const limb = bowLimb(shape);
  const [p0, p1, p2, p3] = limb;
  const stave = `M ${-p3.x} ${p3.y} C ${-p2.x} ${p2.y} ${-p1.x} ${p1.y} ${p0.x} ${p0.y} C ${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`;
  const nodes = alongCubic(limb, 25, 19).filter(({ p }) => Math.hypot(p.x - p3.x, p.y - p3.y) > 10);
  const across = (half: number) =>
    nodes
      .flatMap(({ p, tangent: t }) =>
        [1, -1].map((side) => {
          const x = p.x * side;
          const nx = -t.y * side;
          const ny = t.x;
          return `M ${round(x - nx * half)} ${round(p.y - ny * half)} L ${round(x + nx * half)} ${round(p.y + ny * half)}`;
        }),
      )
      .join(" ");
  const leaves = CANE_LEAVES.map((f) => ({ d: caneLeaf(f.l, 6, f.curl), transform: `rotate(${f.angle})` }));
  const tuft = (
    <>
      <g fill="var(--leaf)">
        {leaves.map((f, i) => (
          <path key={i} d={f.d} transform={f.transform} />
        ))}
      </g>
      <g stroke="var(--art-carve)" strokeWidth={0.7} strokeLinecap="round">
        {CANE_LEAVES.map((f, i) => (
          <path key={i} d={`M 0 -2 Q ${round(f.curl * 0.3)} ${round(-f.l * 0.55)} ${f.curl} ${-f.l}`} transform={`rotate(${f.angle})`} />
        ))}
      </g>
    </>
  );
  return (
    <g>
      <g transform={`translate(${p3.x} ${p3.y})`}>{tuft}</g>
      <g transform={`translate(${-p3.x} ${p3.y}) scale(-1 1)`}>{tuft}</g>
      <path d={stave} stroke="var(--gold-soft)" strokeWidth={10} strokeLinecap="round" />
      <path d={stave} stroke="var(--gold)" strokeWidth={7.4} strokeLinecap="round" />
      <path d={across(6.4)} stroke="var(--gold-soft)" strokeWidth={2.8} strokeLinecap="round" />
      <path d={across(3.6)} stroke="var(--art-carve)" strokeWidth={1} strokeLinecap="round" />
      <rect x={-10} y={p0.y - 8} width={20} height={16} rx={3} fill="var(--gold-soft)" />
      <path
        d={[-6, -2, 2, 6].map((x) => `M ${x} ${p0.y - 6.5} V ${p0.y + 6.5}`).join(" ")}
        stroke="var(--art-carve)"
        strokeWidth={0.8}
      />
    </g>
  );
}

/** An ellipse as a path, centred on (x, y), its long axis turned `deg` degrees. */
function ellipsePath(x: number, y: number, rx: number, ry: number, deg: number) {
  const t = (deg * Math.PI) / 180;
  const dx = round(rx * Math.cos(t));
  const dy = round(rx * Math.sin(t));
  return `M ${round(x - dx)} ${round(y - dy)} A ${rx} ${ry} ${round(deg)} 1 0 ${round(x + dx)} ${round(y + dy)} A ${rx} ${ry} ${round(deg)} 1 0 ${round(x - dx)} ${round(y - dy)} Z`;
}

/**
 * A bowstring of honeybees, as Kāma's is in the poets: a hairline from
 * `from` to `to` with a line of tiny bees along it, heads toward `to`.
 */
export function BeeString({ from, to, spacing = 8 }: { from: Pt; to: Pt; spacing?: number }) {
  const len = Math.hypot(to.x - from.x, to.y - from.y);
  const d = { x: (to.x - from.x) / len, y: (to.y - from.y) / len };
  const n = { x: -d.y, y: d.x };
  const deg = (Math.atan2(d.y, d.x) * 180) / Math.PI;
  const count = Math.floor((len - 8) / spacing);
  let wings = "";
  let bodies = "";
  let heads = "";
  let stripes = "";
  for (let i = 0; i < count; i++) {
    const s = 6 + i * spacing;
    const p = { x: from.x + d.x * s, y: from.y + d.y * s };
    const at = (a: number, b: number) => ({ x: p.x + d.x * a + n.x * b, y: p.y + d.y * a + n.y * b });
    const w1 = at(-0.8, 1.9);
    const w2 = at(-0.8, -1.9);
    wings += ellipsePath(w1.x, w1.y, 1.7, 0.9, deg - 35) + ellipsePath(w2.x, w2.y, 1.7, 0.9, deg + 35);
    bodies += ellipsePath(p.x, p.y, 2.6, 1.45, deg);
    const h = at(3.2, 0);
    heads += ellipsePath(h.x, h.y, 1.05, 1.05, 0);
    for (const a of [-0.9, 0.7]) {
      const s1 = at(a, 1.35);
      const s2 = at(a, -1.35);
      stripes += `M ${round(s1.x)} ${round(s1.y)} L ${round(s2.x)} ${round(s2.y)} `;
    }
  }
  return (
    <g>
      <path d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`} stroke="var(--gold-soft)" strokeWidth={0.6} />
      <path d={wings} fill="var(--art-carve)" fillOpacity={0.85} stroke="var(--gold-soft)" strokeWidth={0.3} />
      <path d={bodies + heads} fill="var(--gold-soft)" />
      <path d={stripes} stroke="var(--art-carve)" strokeWidth={0.55} />
    </g>
  );
}

/** The five elements, each born from one subtle element: sound, touch, form, taste, smell. */
export type Tattva = "space" | "air" | "fire" | "water" | "earth";

/** The traditional sign of each element, centred on the origin, about 2s across. */
function tattvaSign(t: Tattva, s: number) {
  const p = round;
  switch (t) {
    case "space":
      return `M ${-s} 0 a ${s} ${s} 0 1 0 ${2 * s} 0 a ${s} ${s} 0 1 0 ${-2 * s} 0 Z M ${p(-s * 0.5)} 0 a ${p(s * 0.5)} ${p(s * 0.5)} 0 1 1 ${s} 0 a ${p(s * 0.5)} ${p(s * 0.5)} 0 1 1 ${-s} 0 Z`;
    case "air": {
      const tri = (flip: number) =>
        [90, 210, 330].map((deg, i) => `${i ? "L" : "M"} ${p(s * Math.cos((deg * Math.PI) / 180))} ${p(-flip * s * Math.sin((deg * Math.PI) / 180))}`).join(" ") + " Z";
      return `${tri(1)} ${tri(-1)}`;
    }
    case "fire":
      return `M 0 ${p(-s)} L ${p(s * 0.95)} ${p(s * 0.7)} L ${p(-s * 0.95)} ${p(s * 0.7)} Z`;
    case "water":
      return `M ${-s} ${p(-s * 0.4)} A ${s} ${s} 0 0 0 ${s} ${p(-s * 0.4)} A ${s} ${p(s * 0.5)} 0 0 1 ${-s} ${p(-s * 0.4)} Z`;
    case "earth":
      return `M ${p(-s * 0.8)} ${p(-s * 0.8)} H ${p(s * 0.8)} V ${p(s * 0.8)} H ${p(-s * 0.8)} Z`;
  }
}

/**
 * One of her five flower arrows (puṣpa-bāṇa): a gold shaft with saffron
 * fletching, tipped with a budding flower. With `sign`, the flower holds at
 * its heart the sign of the element its subtle quality gives rise to. Nock at
 * the origin, pointing up; `headClassName` animates the flower.
 */
export function FlowerArrow({ length, sign, headClassName }: { length: number; sign?: Tattva; headClassName?: string }) {
  return (
    <g>
      <path d={`M 0 -2 V ${-length}`} stroke="var(--gold)" strokeWidth={1.8} />
      <path d="M -2.4 0.5 L 0 -4 L 2.4 0.5" stroke="var(--gold)" strokeWidth={1.2} strokeLinejoin="round" />
      <path
        d="M -0.9 -9 C -5 -13 -6.5 -30 -6 -40 L -0.9 -35 Z M 0.9 -9 C 5 -13 6.5 -30 6 -40 L 0.9 -35 Z"
        fill="var(--art-saffron)"
      />
      <path
        d="M -1.5 -16 L -5 -20 M -1.5 -22 L -5.4 -26 M -1.5 -28 L -5.6 -32 M 1.5 -16 L 5 -20 M 1.5 -22 L 5.4 -26 M 1.5 -28 L 5.6 -32"
        stroke="var(--art-carve)"
        strokeWidth={0.6}
        strokeLinecap="round"
      />
      <g transform={`translate(0 ${-length})`}>
        <g className={headClassName}>
          <path d="M -2 -7 C -13 -10 -17 -22 -12 -32 C -9 -23 -5 -16 -0.5 -12 Z" fill="var(--art-saffron)" />
          <path d="M 2 -7 C 13 -10 17 -22 12 -32 C 9 -23 5 -16 0.5 -12 Z" fill="var(--art-saffron)" />
          <path d="M -7 -8 C -9.5 -19 -4.5 -30 0 -38 C 4.5 -30 9.5 -19 7 -8 Z" fill="var(--art-vermilion)" />
          <path d="M -5.5 1 Q -7.5 -5 -3.5 -9 L 3.5 -9 Q 7.5 -5 5.5 1 Z" fill="var(--gold)" />
          {sign && <path d={tattvaSign(sign, 3.6)} transform="translate(0 -21)" fill="var(--art-core)" fillRule={sign === "space" ? "evenodd" : "nonzero"} />}
        </g>
      </g>
    </g>
  );
}
