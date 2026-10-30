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

/** A star: a four-pointed glint of `--gold-soft` (or `fill`), centred on (x, y). */
export function Star({ x, y, s, className, fill = "var(--gold-soft)" }: { x: number; y: number; s: number; className?: string; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path className={className} d={glint(s)} fill={fill} />
    </g>
  );
}

/**
 * A campaka petal: slender, pointed, a little twisted, `l` long from its base
 * at the origin, pointing up, its tip `t` to the side. Fill it `--art-core`
 * and edge it `--art-saffron`. Shloka 4's tiny face-on flower uses the defaults.
 */
export function campakaPetal(l: number, w = 2.6, t = 2.2) {
  return `M 0 0 C ${-w} ${round(-l * 0.35)} ${round(-w * 0.5 + t * 0.4)} ${round(-l * 0.8)} ${t} ${-l} C ${round(w * 0.3 + t)} ${round(-l * 0.7)} ${round(w * 1.1)} ${round(-l * 0.3)} 0 0 Z`;
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

/* ── The sun ───────────────────────────────────────────────────────────── */

/**
 * The sun's rays: `count` wedges spread evenly over `span` degrees from due
 * east, counter-clockwise, round a disc of radius r at (cx, cy). Each leaves
 * the disc 5 units out, 8° wide at its base, and they alternate long and
 * short, starting long. Fill the long ones `--art-vermilion`, the short ones
 * `--art-saffron`.
 */
export function sunRays({ cx, cy, r, long, short, count = 16, span = 180 }: { cx: number; cy: number; r: number; long: number; short: number; count?: number; span?: number }) {
  return Array.from({ length: count }, (_, i) => {
    const deg = (span * (i + 0.5)) / count;
    const isLong = i % 2 === 0;
    const t = (deg * Math.PI) / 180;
    const at = (rr: number, d: number) => {
      const u = t + (d * Math.PI) / 180;
      return `${round(cx + rr * Math.cos(u))} ${round(cy - rr * Math.sin(u))}`;
    };
    return { d: `M ${at(r + 5, -4)} L ${at(isLong ? long : short, 0)} L ${at(r + 5, 4)} Z`, long: isLong, deg };
  });
}

/**
 * Radiance: 108 gold hairlines round (cx, cy), starting `from` units out and
 * alternating `long` and `short`, starting long. Stroke it 0.7 wide with a
 * radial gradient that fades in from `from` and out toward `long`.
 */
export function radiance({ cx, cy, from, long, short }: { cx: number; cy: number; from: number; long: number; short: number }) {
  return Array.from({ length: 108 }, (_, k) => {
    const deg = k * (360 / 108) + 1.7;
    const a = polar(cx, cy, from, deg);
    const b = polar(cx, cy, k % 2 ? short : long, deg);
    return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  }).join(" ");
}

/* ── The moon ──────────────────────────────────────────────────────────── */

/** An arc of the circle round (cx, cy), from `from` to `to` degrees (0 = east, counter-clockwise). */
function circleArc(cx: number, cy: number, r: number, from: number, to: number) {
  const a = polar(cx, cy, r, from);
  const b = polar(cx, cy, r, to);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 0 ${b.x} ${b.y}`;
}

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/**
 * A moon's halo (pariveṣa) round a moon of radius r at (cx, cy): rings, never
 * rays, so it can't be taken for the sun. Like a real lunar halo it is red on
 * its inner edge, then saffron, then gold, with a ring of gold pearls beyond
 * and one faint outer ring. `from` and `to` (degrees) draw only part of it.
 */
export function MoonHalo({ cx, cy, r, from = -90, to = 270 }: { cx: number; cy: number; r: number; from?: number; to?: number }) {
  const ring = (rr: number) => (to - from >= 360 ? null : circleArc(cx, cy, rr, from, to));
  const bands = [
    { d: r + 10, color: "var(--sindura)", width: 2, opacity: 1 },
    { d: r + 14, color: "var(--art-saffron)", width: 1.3, opacity: 0.85 },
    { d: r + 18, color: "var(--gold)", width: 1, opacity: 0.8 },
    { d: r + 40, color: "var(--gold-soft)", width: 0.7, opacity: 0.4 },
  ];
  const count = Math.round(((to - from) / 360) * 64);
  const full = to - from >= 360;
  const pearls = Array.from({ length: count + (full ? 0 : 1) }, (_, k) => polar(cx, cy, r + 28, from + (k * (to - from)) / count));
  return (
    <>
      <g className="m-shimmer" strokeLinecap="round">
        {bands.map((b) =>
          full ? (
            <circle key={b.d} cx={cx} cy={cy} r={b.d} stroke={b.color} strokeWidth={b.width} strokeOpacity={b.opacity} />
          ) : (
            <path key={b.d} d={ring(b.d)!} stroke={b.color} strokeWidth={b.width} strokeOpacity={b.opacity} />
          ),
        )}
      </g>
      <g fill="var(--gold-soft)">
        {pearls.map((p, k) => (
          <circle key={k} className={TWINKLE[k % 3]} cx={p.x} cy={p.y} r={k % 2 ? 1.2 : 1.9} />
        ))}
      </g>
    </>
  );
}

/** A leaping blackbuck facing right, about 44 units nose to hind hoof, centred on the origin. */
const DEER_BODY = [
  "M -12 -3",
  "C -8 -7.5 4 -7.5 9.5 -5.5",
  "C 11.5 -8.5 13 -11.5 14.5 -14.5",
  "C 16.5 -16.5 19.5 -16.5 22 -14.2",
  "C 22.4 -13.4 21.8 -12.6 20.8 -12.6",
  "C 19 -12.6 17.6 -12 16.8 -10.8",
  "C 15.8 -8 14.5 -4.5 11 -1.5",
  "C 5 1 -5 1 -9.5 -0.5",
  "C -12.5 -1 -13.5 -2 -12 -3",
  "Z",
].join(" ");
const DEER_EAR = "M 15.2 -14.5 L 13.2 -18.4 L 16.6 -15.3 Z";
const DEER_LINES = [
  "M -12 -3.5 Q -15 -5.5 -15.5 -8.5",
  "M 16.2 -15.8 Q 15.2 -20 17.4 -23.4",
  "M 17.6 -16 Q 17.4 -19.8 19.8 -22.4",
];
const DEER_LEGS = [
  "M 11.5 -2.5 L 16 1 L 22.5 2.2",
  "M 9.5 -2 L 13 3 L 19 5.6",
  "M -9 -1 L -13 3.5 L -20 4.6",
  "M -7 0 L -10 5 L -16.5 7.6",
];

/**
 * The deer in the moon (mṛgāṅka): a small leaping blackbuck in musk, with a
 * soft musk smudge behind it filled with `smudge` (a radial gradient of
 * `--art-musk`). Place and scale it with a transform on a parent group.
 */
export function MoonDeer({ smudge }: { smudge: string }) {
  return (
    <>
      <ellipse cx={1} cy={-5} rx={30} ry={22} fill={smudge} />
      <path d={DEER_BODY + " " + DEER_EAR} fill="var(--art-musk)" />
      <g stroke="var(--art-musk)" strokeLinecap="round" strokeLinejoin="round">
        <path d={DEER_LEGS.join(" ")} strokeWidth={1.7} />
        <path d={DEER_LINES.join(" ")} strokeWidth={1.1} />
      </g>
      <circle cx={19} cy={-14.3} r={0.6} fill="var(--art-moon)" />
    </>
  );
}

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

/* ── Pearls ────────────────────────────────────────────────────────────── */

/** A pearl (muktā), lit from the upper left. With `cap`, the small gold cap it hangs from. */
export function Pearl({ x, y, r, cap = false }: { x: number; y: number; r: number; cap?: boolean }) {
  return (
    <>
      {cap && <path d={`M ${x - 2.6} ${y - r + 0.6} Q ${x} ${y - r - 2.4} ${x + 2.6} ${y - r + 0.6} Z`} fill="var(--gold)" />}
      <circle cx={x} cy={y} r={r} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.7} />
      <path
        d={`M ${round(x + r * 0.75)} ${round(y - r * 0.2)} A ${r * 0.8} ${r * 0.8} 0 0 1 ${round(x - r * 0.2)} ${round(y + r * 0.75)}`}
        stroke="var(--gold-soft)"
        strokeWidth={0.9}
        strokeOpacity={0.7}
      />
      <circle cx={round(x - r * 0.32)} cy={round(y - r * 0.32)} r={1.3} fill="var(--art-core)" />
    </>
  );
}

/** A diamond (vajra) seen face-on, centred on (x, y): an eight-sided girdle, the table, and the facets between them. */
export function diamond({ x, y, r }: Pt & { r: number }) {
  const ring = (rr: number) => Array.from({ length: 8 }, (_, k) => polar(x, y, rr, 22.5 + k * 45));
  const girdle = ring(r);
  const table = ring(r * 0.48);
  const poly = (ps: Pt[]) => `M ${ps.map((p) => `${p.x} ${p.y}`).join(" L ")} Z`;
  return {
    girdle: poly(girdle),
    table: poly(table),
    facets: girdle.map((g, k) => `M ${table[k].x} ${table[k].y} L ${g.x} ${g.y}`).join(" "),
  };
}

/* ── Growing things ────────────────────────────────────────────────────── */

export const polyline = (ps: Pt[]) => ps.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");

/** A filled shape of varying width along a centre line, so a stroke can taper. */
export function taper(pts: Pt[], width: (t: number) => number) {
  const n = pts.length - 1;
  const left: Pt[] = [];
  const right: Pt[] = [];
  pts.forEach((p, i) => {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(n, i + 1)];
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const nx = -(b.y - a.y) / len;
    const ny = (b.x - a.x) / len;
    const w = width(i / n) / 2;
    left.push({ x: round(p.x + nx * w), y: round(p.y + ny * w) });
    right.push({ x: round(p.x - nx * w), y: round(p.y - ny * w) });
  });
  return polyline(left) + " " + polyline([...right].reverse()).replace(/^M/, "L") + " Z";
}

/** A smooth curve through `pts` (Catmull-Rom), sampled `per` times between each pair. */
export function through(pts: Pt[], per = 16): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < per; k++) {
      const t = k / per;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
      out.push({ x: round(f(p0.x, p1.x, p2.x, p3.x)), y: round(f(p0.y, p1.y, p2.y, p3.y)) });
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

/** A point on a curve, with the direction of travel there (degrees, SVG) and how far along it lies. */
export type Mark = Pt & { angle: number; s: number };

/** Points every `step` units along a sampled curve, starting `from` units in. */
export function along(pts: Pt[], step: number, from = 0): Mark[] {
  const out: Mark[] = [];
  let s = 0;
  let next = from;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    while (next <= s + d) {
      const t = d ? (next - s) / d : 0;
      out.push({
        x: round(a.x + (b.x - a.x) * t),
        y: round(a.y + (b.y - a.y) * t),
        angle: round((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI),
        s: next,
      });
      next += step;
    }
    s += d;
  }
  return out;
}

/* ── The creeper of down (romāli-latā) ─────────────────────────────────── */

const CREEPER_LEAF = "M 4 0 C 4 -6 9 -10 15 -8.5 C 20 -7 23 -3 27 0 C 23 3 20 7 15 8.5 C 9 10 4 6 4 0 Z";
const CREEPER_LEAF_RIB = "M 0 0 L 4 0 Q 14 -0.6 25 0";
const CREEPER_LEAF_VEINS = "M 10 -0.3 L 14 -5 M 16 -0.3 L 20 -4 M 10 0.3 L 14 5 M 16 0.3 L 20 4";

/** One of the creeper's heart-based pointed leaves, on a short stalk from (x, y), pointing `turn` degrees. */
export function CreeperLeaf({ x, y, turn, scale }: Pt & { turn: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn}) scale(${scale})`}>
      <path d={CREEPER_LEAF} fill="var(--leaf)" />
      <path d={CREEPER_LEAF_RIB} stroke="var(--gold-soft)" strokeWidth={0.6} />
      <path d={CREEPER_LEAF_VEINS} stroke="var(--gold-soft)" strokeWidth={0.4} strokeOpacity={0.8} />
    </g>
  );
}

/** A tendril leaving the creeper at `p` and coiling to one side. Stroke it 1 wide in `--art-hair`. */
export function creeperTendril(p: Mark, side: 1 | -1, r0: number, turns: number) {
  const out = ((p.angle + side * 55) * Math.PI) / 180;
  const c = { x: p.x + Math.cos(out) * r0 * 1.6, y: p.y + Math.sin(out) * r0 * 1.6 };
  const start = Math.atan2(p.y - c.y, p.x - c.x);
  const n = 48;
  return polyline(
    Array.from({ length: n + 1 }, (_, i) => {
      const t = i / n;
      const r = r0 * 1.6 * (1 - 0.82 * t ** 0.7);
      const a = start + side * t * turns * 2 * Math.PI;
      return { x: round(c.x + Math.cos(a) * r), y: round(c.y + Math.sin(a) * r) };
    }),
  );
}

/** The radius of each of the creeper's pair of fruit (phala-kuca-dvayī). */
export const FRUIT_R = 15;

/** The fruit's colour and its blush, as `id("fruit")` and `id("blush")`. */
export function FruitGradients({ id }: { id: (name: string) => string }) {
  return (
    <>
      <radialGradient id={id("fruit")} cx="0.36" cy="0.3" r="0.78">
        <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
        <stop offset="0.55" style={{ stopColor: "var(--art-turmeric)" }} />
        <stop offset="0.9" style={{ stopColor: "var(--art-saffron)" }} />
        <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
      </radialGradient>
      <radialGradient id={id("blush")} cx="0.78" cy="0.7" r="0.55">
        <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.7 }} />
        <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
      </radialGradient>
    </>
  );
}

/** One of the pair of fruit, centred on (x, y), its stalk going in at `stalkTop`. Needs `FruitGradients` in the defs. */
export function Fruit({ x, y, stalkTop, url }: Pt & { stalkTop: Pt; url: (name: string) => string }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 0.5} rx={FRUIT_R + 0.8} ry={FRUIT_R - 0.5} fill={url("fruit")} stroke="var(--gold)" strokeWidth={1} />
      <ellipse cx={x} cy={y + 0.5} rx={FRUIT_R + 0.8} ry={FRUIT_R - 0.5} fill={url("blush")} />
      <path
        d={`M ${round(x - 9)} ${round(y - 3)} A 11 11 0 0 1 ${round(x - 2)} ${round(y - 10.5)}`}
        stroke="var(--art-ivory)"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeOpacity={0.75}
      />
      <ellipse cx={stalkTop.x} cy={stalkTop.y + 0.6} rx={2.2} ry={1} fill="var(--art-saffron)" />
    </g>
  );
}

/* ── Her face as a mirror ──────────────────────────────────────────────── */

/** For `m-sway` on a group that must swing from one fixed point (x, y), in artwork units. */
export const swingFrom = (p: Pt): CSSProperties => ({ transformBox: "view-box", transformOrigin: `${p.x}px ${p.y}px` });

export type MirrorShape = ReturnType<typeof handMirror>;

/**
 * Her face as a hand mirror of polished metal (Saundaryalaharī 67), centred
 * on `c`, resting in a small lotus cup on a gold stem, her chin, that ends at
 * `stemFoot`.
 */
export function handMirror(c: Pt, stemFoot: number) {
  const cx = c.x;
  const faceR = 76;
  const frameR = 86;
  const cupBase = round(c.y + frameR + 6);
  const stemTop = cupBase + 12;
  const stemW = { top: 8, foot: 6 };
  return {
    c,
    faceR,
    frameR,
    frameBeads: Array.from({ length: 44 }, (_, k) => polar(c.x, c.y, frameR - 5, k * (360 / 44) + 4)),
    cupBase,
    cupBack: lotusPetals({ x: cx - 34, width: 68, count: 4, base: cupBase, height: 28 }),
    cupFront: lotusPetals({ x: cx - 28, width: 56, count: 5, base: cupBase, height: 18 }),
    cupBeads: Array.from({ length: 8 }, (_, k) => ({ x: cx - 21 + k * 6, y: cupBase + 3 })),
    cupDown: lotusPetals({ x: cx - 22, width: 44, count: 5, base: cupBase + 6, height: -9 }),
    stemTop,
    stemFoot,
    stemPath: `M ${cx - stemW.top} ${stemTop} L ${cx - stemW.foot} ${stemFoot} L ${cx + stemW.foot} ${stemFoot} L ${cx + stemW.top} ${stemTop} Z`,
    stemBands: [stemFoot - 52, stemFoot - 22],
    /** The stem's half-width at height y. */
    stemHalf: (y: number) => round(stemW.top - ((stemW.top - stemW.foot) * (y - stemTop)) / (stemFoot - stemTop)),
  };
}

/** The faint diagonal shading on the mirror's face, as `id("face")`. */
export function MirrorShading({ m, id }: { m: MirrorShape; id: (name: string) => string }) {
  const { c, faceR } = m;
  return (
    <linearGradient id={id("face")} x1={c.x - faceR} y1={c.y - faceR} x2={c.x + faceR} y2={c.y + faceR} gradientUnits="userSpaceOnUse">
      <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.04 }} />
      <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.26 }} />
    </linearGradient>
  );
}

/** The mirror's face, as `id("face-clip")`. */
export function MirrorFaceClip({ m, id }: { m: MirrorShape; id: (name: string) => string }) {
  return (
    <clipPath id={id("face-clip")}>
      <circle cx={m.c.x} cy={m.c.y} r={m.faceR} />
    </clipPath>
  );
}

/**
 * The mirror: its beaded frame, its ivory face with two sheen streaks, the
 * stem with its bands and bud foot, the lotus cup, and two passing flashes.
 * Needs `MirrorShading` and `MirrorFaceClip` in the artwork's defs.
 */
export function HandMirror({ m, url }: { m: MirrorShape; url: (name: string) => string }) {
  const { c, faceR, frameR, cupBase, stemTop, stemFoot, stemHalf } = m;
  const cx = c.x;
  return (
    <>
      <circle cx={c.x} cy={c.y} r={frameR} fill="var(--gold)" />
      <circle cx={c.x} cy={c.y} r={frameR - 0.8} stroke="var(--art-carve)" strokeWidth={0.6} />
      <g fill="var(--gold-soft)">
        {m.frameBeads.map((b, k) => (
          <circle key={k} cx={b.x} cy={b.y} r={1.6} />
        ))}
      </g>
      <circle cx={c.x} cy={c.y} r={faceR + 1.4} fill="var(--art-carve)" />
      <circle cx={c.x} cy={c.y} r={faceR} fill="var(--art-ivory)" />
      <circle cx={c.x} cy={c.y} r={faceR} fill={url("face")} />
      <g clipPath={url("face-clip")}>
        <circle cx={c.x} cy={c.y} r={faceR - 2} stroke="var(--gold-soft)" strokeWidth={5} strokeOpacity={0.3} />
        <g stroke="var(--art-moon)" strokeLinecap="round">
          <path d={`M ${c.x - 60} ${c.y + 48} L ${c.x + 14} ${c.y - 64}`} strokeWidth={10} strokeOpacity={0.85} />
          <path d={`M ${c.x - 36} ${c.y + 62} L ${c.x + 32} ${c.y - 44}`} strokeWidth={3.5} strokeOpacity={0.8} />
        </g>
      </g>

      <path d={m.stemPath} fill="var(--gold)" />
      <path d={`M ${cx - 3.4} ${stemTop + 4} L ${cx - 2.6} ${stemFoot - 4}`} stroke="var(--art-core)" strokeWidth={1.3} strokeOpacity={0.55} strokeLinecap="round" />
      <g fill="var(--gold-soft)" stroke="var(--art-carve)" strokeWidth={0.5}>
        {m.stemBands.map((y) => (
          <rect key={y} x={cx - stemHalf(y) - 1.5} y={y - 3} width={2 * stemHalf(y) + 3} height={6} rx={2} />
        ))}
      </g>
      <g fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5}>
        <rect x={cx - 10} y={stemFoot - 2} width={20} height={6} rx={2.5} />
        <circle cx={cx} cy={stemFoot + 10} r={6.5} />
        <path d={`M ${cx - 4} ${stemFoot + 15} Q ${cx - 3} ${stemFoot + 25} ${cx} ${stemFoot + 32} Q ${cx + 3} ${stemFoot + 25} ${cx + 4} ${stemFoot + 15} Z`} />
      </g>

      <g fill="var(--art-saffron)">
        {m.cupBack.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.6}>
        {m.cupFront.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <rect x={cx - 25} y={cupBase} width={50} height={6} rx={2} fill="var(--gold)" />
      <g fill="var(--gold-soft)">
        {m.cupBeads.map((b) => (
          <circle key={b.x} cx={b.x} cy={b.y} r={1.3} />
        ))}
      </g>
      <g fill="var(--gold)">
        {m.cupDown.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      <g fill="var(--art-core)">
        <path className="m-lick" d={glint(8)} transform={`translate(${c.x - 34} ${c.y + 32})`} />
        <path className="m-lick m-late" d={glint(4.5)} transform={`translate(${c.x + 34} ${c.y + 50})`} />
      </g>
    </>
  );
}

/* ── The marriage thread ───────────────────────────────────────────────── */

const CORD = 5;
const TASSEL = [-5, -2.5, 0, 2.5, 5].map((dx) => `M 0 2 Q ${round(dx * 0.4)} 9 ${dx} 18`).join(" ");
const TALI_SCALE = 1.45;
/** The tāli: a gold pīpal leaf, its broad base up and its long drip tip down. */
const TALI =
  "M 0 1.5 C -3 0 -9 -0.5 -12.5 3 C -16.5 7.5 -16 16 -11.5 23 C -7.5 29 -3 33 -1.3 41 C -0.7 45 -0.4 50 0 56 C 0.4 50 0.7 45 1.3 41 C 3 33 7.5 29 11.5 23 C 16 16 16.5 7.5 12.5 3 C 9 -0.5 3 0 0 1.5 Z";
const TALI_VEINS = [8, 16, 24, 32]
  .map((y, i) => {
    const w = [10, 12.5, 10, 6][i];
    const rise = [3, 5, 5, 4][i];
    return `M 0 ${y} Q ${round(-w * 0.5)} ${y - 1} ${-w} ${y - rise} M 0 ${y} Q ${round(w * 0.5)} ${y - 1} ${w} ${y - rise}`;
  })
  .join(" ");

export type ThreadShape = ReturnType<typeof marriageThread>;

/**
 * The marriage thread (māṅgalyasūtra) tied on the mirror's stem just under
 * its lotus cup: a loop of turmeric cord seen a little from above, three
 * knots across the front, the tāli hung from the middle one, and both loose
 * ends hanging to the right.
 */
export function marriageThread(m: MirrorShape) {
  const loop = { cx: m.c.x, cy: m.stemTop + 14, rx: 23, ry: 6.5 };
  const onLoop = (deg: number): Pt => {
    const t = (deg * Math.PI) / 180;
    return { x: round(loop.cx + loop.rx * Math.cos(t)), y: round(loop.cy + loop.ry * Math.sin(t)) };
  };
  const knots = [120, 90, 60].map(onLoop);
  const knotAt = knots[1];
  const f = knots[2];
  return {
    loop,
    back: `M ${loop.cx - loop.rx} ${loop.cy} A ${loop.rx} ${loop.ry} 0 0 1 ${loop.cx + loop.rx} ${loop.cy}`,
    front: `M ${loop.cx - loop.rx} ${loop.cy} A ${loop.rx} ${loop.ry} 0 0 0 ${loop.cx + loop.rx} ${loop.cy}`,
    knots,
    knotAt,
    tailFrom: f,
    tails: [
      { d: `C ${f.x + 20} ${f.y + 8} ${f.x + 38} ${f.y + 20} ${f.x + 40} ${f.y + 46} C ${f.x + 42} ${f.y + 70} ${f.x + 32} ${f.y + 84} ${f.x + 38} ${f.y + 106}`, end: { x: f.x + 38, y: f.y + 106 } },
      { d: `C ${f.x + 14} ${f.y + 10} ${f.x + 26} ${f.y + 26} ${f.x + 26} ${f.y + 52} C ${f.x + 26} ${f.y + 72} ${f.x + 20} ${f.y + 80} ${f.x + 23} ${f.y + 92}`, end: { x: f.x + 23, y: f.y + 92 } },
    ],
    taliAt: { x: knotAt.x, y: round(knotAt.y + 8) },
    /** How far below `taliAt` the tāli's drip tip reaches. */
    taliLength: round(56 * TALI_SCALE),
    stemHalfAtLoop: m.stemHalf(loop.cy),
  };
}

/** Hides the back of the cord's loop where it passes behind the stem, as `id("behind-stem")`. */
export function ThreadMask({ t, id }: { t: ThreadShape; id: (name: string) => string }) {
  const { loop, stemHalfAtLoop: h } = t;
  return (
    <mask id={id("behind-stem")} maskUnits="userSpaceOnUse" x={0} y={loop.cy - 20} width={640} height={40}>
      <rect x={0} y={loop.cy - 20} width={640} height={40} fill="#fff" />
      <rect x={loop.cx - h - 0.5} y={loop.cy - 20} width={2 * h + 1} height={40} fill="#000" />
    </mask>
  );
}

/** The thread itself. The tāli and the loose ends swing from the middle knot. Needs `ThreadMask` in the defs. */
export function MarriageThread({ t, url }: { t: ThreadShape; url: (name: string) => string }) {
  const { tailFrom: f, knotAt, taliAt } = t;
  return (
    <>
      <g mask={url("behind-stem")}>
        <path d={t.back} stroke="var(--gold)" strokeWidth={CORD + 1.4} />
        <path d={t.back} stroke="var(--art-turmeric)" strokeWidth={CORD} />
      </g>
      <g className="m-sway m-late" style={swingFrom(knotAt)}>
        {t.tails.map((tail, i) => (
          <g key={i}>
            <path d={`M ${f.x} ${f.y} ${tail.d}`} stroke="var(--gold)" strokeWidth={CORD + 1.4} strokeLinecap="round" />
            <path d={`M ${f.x} ${f.y} ${tail.d}`} stroke="var(--art-turmeric)" strokeWidth={CORD} strokeLinecap="round" />
            <path d={`M ${f.x} ${f.y} ${tail.d}`} stroke="var(--art-saffron)" strokeWidth={0.9} strokeDasharray="1.6 3" />
            <g transform={`translate(${tail.end.x} ${tail.end.y})`}>
              <path d={TASSEL} stroke="var(--art-turmeric)" strokeWidth={1.5} strokeLinecap="round" />
              <circle r={3.6} fill="var(--gold)" />
            </g>
          </g>
        ))}
      </g>
      <path d={t.front} stroke="var(--gold)" strokeWidth={CORD + 1.4} />
      <path d={t.front} stroke="var(--art-turmeric)" strokeWidth={CORD} />
      <path d={t.front} stroke="var(--art-saffron)" strokeWidth={0.9} strokeDasharray="1.6 3" />

      <g className="m-sway" style={swingFrom(knotAt)}>
        <g transform={`translate(${taliAt.x} ${taliAt.y}) scale(${TALI_SCALE})`}>
          <rect x={-3.5} y={-5} width={7} height={7} rx={2} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d={TALI} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <path d="M 0 3 L 0 50" stroke="var(--art-carve)" strokeWidth={0.7} strokeOpacity={0.85} />
          <path d={TALI_VEINS} stroke="var(--art-carve)" strokeWidth={0.5} strokeOpacity={0.75} strokeLinecap="round" />
          <path d="M -13 13 Q -13.5 6 -8 3.5" stroke="var(--art-core)" strokeWidth={1.4} strokeOpacity={0.75} strokeLinecap="round" />
          <circle cy={14} r={3.4} fill="var(--sindura)" stroke="var(--art-carve)" strokeWidth={0.4} />
        </g>
      </g>

      {t.knots.map((k) => (
        <g key={k.x} transform={`translate(${k.x} ${k.y})`}>
          <ellipse rx={6.2} ry={5.2} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.9} />
          <path d="M -3.8 -2 Q 0 2.4 3.8 -2" stroke="var(--art-saffron)" strokeWidth={0.8} strokeLinecap="round" />
        </g>
      ))}
    </>
  );
}
