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

/**
 * A row of pointed lotus petals standing on `base`, `count` of them across
 * `width` from `x`. A negative `height` turns them down.
 */
export function lotusPetals({ x, width, count, base, height }: { x: number; width: number; count: number; base: number; height: number }) {
  const w = width / count;
  const shoulder = round(base - (height * 10) / 13);
  const tip = round(base - height);
  return Array.from({ length: count }, (_, i) => {
    const x0 = x + i * w;
    return `M ${round(x0)} ${base} Q ${round(x0)} ${shoulder} ${round(x0 + w / 2)} ${tip} Q ${round(x0 + w)} ${shoulder} ${round(x0 + w)} ${base} Z`;
  });
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
  { angle: 58, l: 30, curl: 7 },
  { angle: 92, l: 42, curl: 10 },
  { angle: 128, l: 34, curl: 9 },
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

/* ── Her arms ──────────────────────────────────────────────────────────── */

export type Beam = { layers: string[]; x1: number; y1: number; x2: number; y2: number; angle: number };

/**
 * One of her arms: a beam of light from her source `from` to `tip`, drawn as
 * nested tapering layers so its edges stay soft. It leaves the source
 * `start` units out; `w0` and `w1` are the widths of the outermost layer.
 */
export function armBeam(from: Pt, tip: Pt, w0: number, w1: number, start = 70): Beam {
  const dx = tip.x - from.x;
  const dy = tip.y - from.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const b = { x: from.x + ux * start, y: from.y + uy * start };
  const side = (p: Pt, w: number, s: number) => `${round(p.x - uy * (w / 2) * s)} ${round(p.y + ux * (w / 2) * s)}`;
  const layer = (k: number) => {
    const a = w0 * k;
    const c = w1 * k;
    return `M ${side(b, a, 1)} L ${side(tip, c, 1)} Q ${round(tip.x + ux * c)} ${round(tip.y + uy * c)} ${side(tip, c, -1)} L ${side(b, a, -1)} Q ${round(b.x - ux * a)} ${round(b.y - uy * a)} ${side(b, a, 1)} Z`;
  };
  return {
    layers: [layer(1), layer(0.55), layer(0.22)],
    x1: round(b.x),
    y1: round(b.y),
    x2: round(tip.x),
    y2: round(tip.y),
    angle: round((Math.atan2(dy, dx) * 180) / Math.PI),
  };
}

/** Where the bangle sits: on the arm from `from`, just short of the point `at` where a weapon is held. */
export function wrist(from: Pt, at: Pt) {
  const dx = from.x - at.x;
  const dy = from.y - at.y;
  const len = Math.hypot(dx, dy);
  return { x: at.x + (dx / len) * 6, y: at.y + (dy / len) * 6 };
}

/** An arm's three layers of light, filled with `fill` (a gradient along the beam). */
export function ArmLight({ beam, fill }: { beam: Beam; fill: string }) {
  return (
    <g fill={fill}>
      <path d={beam.layers[0]} fillOpacity={0.12} />
      <path d={beam.layers[1]} fillOpacity={0.2} />
      <path d={beam.layers[2]} fillOpacity={0.45} />
    </g>
  );
}

/**
 * A bangle (kaṅkaṇa) across an arm, centred on the origin with the arm
 * running up and down: place it at the beam's tip, rotated by `angle + 90`.
 */
export function Bangle() {
  return (
    <>
      <ellipse rx={12} ry={4.5} stroke="var(--gold)" strokeWidth={2.6} />
      <ellipse rx={12} ry={4.5} stroke="var(--art-carve)" strokeWidth={0.6} />
      <g fill="var(--art-vermilion)">
        <circle cx={-6} cy={3.9} r={1.5} />
        <circle cx={0} cy={4.5} r={1.7} />
        <circle cx={6} cy={3.9} r={1.5} />
      </g>
    </>
  );
}

/* ── The moon ──────────────────────────────────────────────────────────── */

/** How far through its waxing a night's moon is: 0 is new, 90 exactly half, 180 full. */
export const phaseAngle = (night: number) => (night <= 8 ? night * (90 / 8) : 90 + (night - 8) * (90 / 7));

/**
 * The lit part of a waxing moon of radius r at the origin, for nights 1–15 of
 * the bright fortnight, lit from above: the limb over the top, then back
 * along the terminator. Turn it over for a crescent with its horns up.
 */
export function litPart(night: number, r: number) {
  const theta = (phaseAngle(night) * Math.PI) / 180;
  const rx = round(r * Math.abs(Math.cos(theta)));
  return `M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0 A ${r} ${rx} 0 0 ${theta < Math.PI / 2 ? 0 : 1} ${-r} 0 Z`;
}

/* ── Her ruby crown ────────────────────────────────────────────────────── */

/** A ruby in its setting, lit from the upper left. */
export function Ruby({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={round(r + 1.3)} ry={round(r * 1.15 + 1.3)} fill="var(--art-carve)" />
      <ellipse cx={x} cy={y} rx={r} ry={round(r * 1.15)} fill="var(--art-vermilion)" />
      <path
        d={`M ${round(x - r * 0.55)} ${round(y - r * 0.2)} Q ${round(x - r * 0.4)} ${round(y - r * 0.85)} ${round(x + r * 0.15)} ${round(y - r * 0.9)}`}
        stroke="var(--art-core)"
        strokeWidth={0.7}
        strokeLinecap="round"
      />
    </g>
  );
}

/** A passing flash on a jewel, in one of three offset groups. */
export function Flash({ x, y, s, group }: { x: number; y: number; s: number; group: number }) {
  return (
    <g transform={`translate(${round(x)} ${round(y)})`}>
      <path className={["m-lick", "m-lick m-late", "m-lick m-later"][group]} d={glint(round(s))} fill="var(--art-core)" />
    </g>
  );
}

/** How far each band dips at the front, as a band round a crown seen from a little above. */
const SAG = 4;
const sagAt = (dx: number, hw: number) => SAG * (1 - (dx / hw) ** 2);

/** The crown's half-width at height y: a swelling dome from the finial (y 82) to the diadem (y 166). */
const crownHalf = (y: number) => round(28 + 64 * Math.max(0, (y - 82) / 84) ** 0.5);

const DIADEM = { top: 164, bottom: 188, hwT: 94, hwB: 98 };
const TIER_EDGES = [164, 142, 121, 101, 82];
const TIER_RUBIES = [9, 9, 7, 5];
/** The diadem's crest of petals, which hides the foot of the lowest tier. */
const PETAL_H = 12;
/** The rubies that flash, keyed by row ("d" for the diadem) and place, with one of three offset groups. */
const FLASHING: Record<string, number> = { "d-2": 0, "d-8": 1, "0-2": 2, "0-7": 0, "1-5": 1, "2-1": 2, "3-3": 0 };

const crownPetal = (a: number, h: number) =>
  `M ${-a} 0 C ${-a} ${round(-h * 0.55)} ${round(-a * 0.4)} ${round(-h * 0.8)} 0 ${-h} C ${round(a * 0.4)} ${round(-h * 0.8)} ${a} ${round(-h * 0.55)} ${a} 0 Z`;

/** One of the short rays the crown throws off: `deg` round from the right, `left` its outer end's x. */
export type CrownRay = { d: string; red: boolean; deg: number; left: number };

function crownGeometry(cx: number) {
  const bandPath = (bottom: number, top: number, hwB: number, hwT: number) =>
    [
      `M ${cx - hwB} ${bottom}`,
      `Q ${cx} ${bottom + 2 * SAG} ${cx + hwB} ${bottom}`,
      `L ${cx + hwT} ${top}`,
      `Q ${cx} ${top + 2 * SAG} ${cx - hwT} ${top}`,
      "Z",
    ].join(" ");

  const petalRow = (top: number, hw: number, width: number, h: number) => {
    const n = Math.floor((2 * hw) / width);
    const w = (2 * hw) / n;
    return {
      half: round(w * 0.5),
      h,
      at: Array.from({ length: n }, (_, k) => {
        const dx = -hw + (k + 0.5) * w;
        return { x: round(cx + dx), y: round(top + sagAt(dx, hw) + 1) };
      }),
    };
  };

  const rubyRow = (mid: number, hw: number, count: number, inset: number) => {
    const step = count > 1 ? (2 * (hw - inset)) / (count - 1) : 0;
    return Array.from({ length: count }, (_, k) => {
      const dx = (k - (count - 1) / 2) * step;
      return { x: round(cx + dx), y: round(mid + sagAt(dx, hw)) };
    });
  };

  const tiers = TIER_RUBIES.map((count, i) => {
    const bottom = TIER_EDGES[i];
    const top = TIER_EDGES[i + 1];
    const hwB = crownHalf(bottom);
    const hwT = crownHalf(top);
    const hw = (hwB + hwT) / 2;
    const r = round(4.3 - 0.3 * i);
    const mid = i === 0 ? (top + bottom - PETAL_H) / 2 + 1 : (top + bottom) / 2 + 1;
    const n = Math.round((2 * hwT) / 4.6);
    return {
      d: bandPath(bottom, top, hwB, hwT),
      r,
      rubies: rubyRow(mid, hw, count, 9 + i),
      beads: Array.from({ length: n }, (_, k) => {
        const dx = -hwT + ((k + 0.5) * 2 * hwT) / n;
        return { x: round(cx + dx), y: round(top + 1.4 + sagAt(dx, hwT)) };
      }),
    };
  });

  const rays: CrownRay[] = Array.from({ length: 56 }, (_, k) => ({ k, deg: k * (360 / 56) }))
    .filter(({ deg }) => deg < 192 || deg > 348)
    .map(({ k, deg }) => {
      const t = (deg * Math.PI) / 180;
      const len = k % 2 ? 8 : 16;
      const at = (d: number) => ({ x: round(cx + (116 + d) * Math.cos(t)), y: round(116 - (104 + d) * Math.sin(t)) });
      const a = at(0);
      const b = at(len);
      return { d: `M ${a.x} ${a.y} L ${b.x} ${b.y}`, red: k % 4 === 1 || k % 4 === 2, deg, left: b.x };
    });

  return {
    tiers,
    rays,
    topCrest: petalRow(TIER_EDGES[TIER_EDGES.length - 1] + 1, crownHalf(TIER_EDGES[TIER_EDGES.length - 1]), 8, 7),
    diadem: {
      d: bandPath(DIADEM.bottom, DIADEM.top, DIADEM.hwB, DIADEM.hwT),
      rubies: rubyRow(176, 96, 11, 10),
      petals: petalRow(DIADEM.top, DIADEM.hwT, 14, PETAL_H),
    },
    rimBeads: Array.from({ length: 35 }, (_, k) => {
      const dx = -93.5 + k * 5.5;
      return { x: round(cx + dx), y: round(DIADEM.bottom - 1.5 + sagAt(dx, DIADEM.hwB)) };
    }),
  };
}

const crowns = new Map<number, ReturnType<typeof crownGeometry>>();

type PetalRow = ReturnType<typeof crownGeometry>["topCrest"];

function CrownPetals({ row, dots = true }: { row: PetalRow; dots?: boolean }) {
  return (
    <>
      <g fill="var(--gold-soft)" stroke="var(--art-carve)" strokeWidth={0.6}>
        {row.at.map((p, k) => (
          <path key={k} d={crownPetal(row.half, row.h)} transform={`translate(${p.x} ${p.y})`} />
        ))}
      </g>
      {dots && (
        <g fill="var(--art-vermilion)">
          {row.at.map((p, k) => (
            <circle key={k} cx={p.x} cy={round(p.y - row.h * 0.42)} r={1.4} />
          ))}
        </g>
      )}
    </>
  );
}

/**
 * Her ruby crown (koṭīra): a gold dome swelling from a budded finial (y 24)
 * to a broad diadem (y 190), tier upon tier of rubies edged with gold beads,
 * a large front ruby in a ring of petals, and short rays of gold and red.
 * Centred on x = cx at its size in Shloka 4; `rays` picks which rays to draw.
 */
export function RubyCrown({ cx, rays: keep }: { cx: number; rays?: (ray: CrownRay) => boolean }) {
  let g = crowns.get(cx);
  if (!g) {
    g = crownGeometry(cx);
    crowns.set(cx, g);
  }
  const { tiers, topCrest, diadem, rimBeads } = g;
  const rays = keep ? g.rays.filter(keep) : g.rays;
  const front = (diadem.rubies.length - 1) / 2;

  return (
    <>
      <g strokeWidth={0.9} strokeLinecap="round" strokeOpacity={0.7}>
        {rays.map((r, i) => (
          <path key={i} d={r.d} stroke={r.red ? "var(--art-vermilion)" : "var(--gold-soft)"} />
        ))}
      </g>
      <g fill="var(--gold)">
        <path d={`M ${cx - 30} 82 C ${cx - 30} 67 ${cx - 11} 64 ${cx - 7} 58 L ${cx + 7} 58 C ${cx + 11} 64 ${cx + 30} 67 ${cx + 30} 82 Z`} />
        <path d={`M ${cx} 28 C ${cx + 10} 37 ${cx + 12} 49 ${cx + 7} 59 L ${cx - 7} 59 C ${cx - 12} 49 ${cx - 10} 37 ${cx} 28 Z`} />
        <circle cx={cx} cy={24} r={2.8} />
      </g>
      <path d={`M ${cx - 25} 74 Q ${cx} 67 ${cx + 25} 74`} stroke="var(--art-carve)" strokeWidth={0.8} />
      <Ruby x={cx} y={45} r={3.8} />
      {tiers
        .map((t, i) => ({ t, i }))
        .reverse()
        .map(({ t, i }) => (
          <g key={i}>
            <path d={t.d} fill="var(--gold)" />
            <g fill="var(--gold-soft)">
              {t.beads.map((b, k) => (
                <circle key={k} cx={b.x} cy={b.y} r={1.35} />
              ))}
            </g>
            {t.rubies.map((r, k) => (
              <Ruby key={k} x={r.x} y={r.y} r={t.r} />
            ))}
          </g>
        ))}
      <CrownPetals row={topCrest} dots={false} />
      <path d={diadem.d} fill="var(--gold)" />
      <path
        d={`M ${cx - 95} ${DIADEM.bottom - 5} Q ${cx} ${DIADEM.bottom - 5 + 2 * SAG} ${cx + 95} ${DIADEM.bottom - 5}`}
        stroke="var(--art-carve)"
        strokeWidth={0.7}
      />
      {diadem.rubies.map((r, k) =>
        k === front ? (
          <g key={k}>
            <g fill="var(--gold-soft)" stroke="var(--art-carve)" strokeWidth={0.5}>
              {Array.from({ length: 10 }, (_, j) => (
                <path key={j} d="M -2.4 0 Q -2.4 -3.4 0 -5.6 Q 2.4 -3.4 2.4 0 Z" transform={`translate(${r.x} ${r.y - 2}) rotate(${j * 36}) translate(0 -8.4)`} />
              ))}
            </g>
            <Ruby x={r.x} y={r.y - 2} r={7} />
          </g>
        ) : (
          <Ruby key={k} x={r.x} y={r.y} r={4.3} />
        ),
      )}
      <CrownPetals row={diadem.petals} />
      <g fill="var(--gold-soft)">
        {rimBeads.map((b, k) => (
          <circle key={k} cx={b.x} cy={b.y} r={1.7} />
        ))}
      </g>
      {Object.entries(FLASHING).map(([key, group]) => {
        const [row, place] = key.split("-");
        const r = row === "d" ? diadem.rubies[+place] : tiers[+row].rubies[+place];
        const size = row === "d" ? 4.3 : tiers[+row].r;
        return <Flash key={key} x={r.x - size * 0.4} y={r.y - size * 0.6} s={size * 1.6} group={group} />;
      })}
      <Flash x={cx - 2.8} y={DIADEM.top + 7} s={9} group={1} />
    </>
  );
}
