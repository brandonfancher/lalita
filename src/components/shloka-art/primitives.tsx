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

import type { CSSProperties, ReactNode } from "react";

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

const CAMPAKA_PETALS = Array.from({ length: 9 }, (_, i) => ({ angle: i * 40 + (i % 2) * 6, l: i % 2 ? 11 : 13.5 }));

/** A campaka seen face-on, centred on the origin and about 26 across: nine slender, twisted core petals edged in saffron round a saffron centre. */
export function Campaka() {
  return (
    <g>
      <g fill="var(--art-core)" stroke="var(--art-saffron)" strokeWidth={0.55}>
        {CAMPAKA_PETALS.map((p, i) => (
          <path key={i} d={campakaPetal(p.l)} transform={`rotate(${p.angle})`} />
        ))}
      </g>
      <circle r={2.4} fill="var(--art-saffron)" />
    </g>
  );
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
export function tattvaSign(t: Tattva, s: number) {
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

/* ── The sea ───────────────────────────────────────────────────────────── */

/** Deterministic noise in [0, 1). */
export function hash(a: number, b: number) {
  let h = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b + 0x632be5ab, 0xc2b2ae35);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return (h >>> 0) / 4294967296;
}

/**
 * The sea below a horizon at y = `horizon`: rows of shallow ripple arcs,
 * closer together near the horizon, spanning `half` either side of `cx`, and
 * the light on it as a column of lozenges under `cx`, `column` wide (half
 * width) at the horizon and widening toward the viewer. The ripples stop short
 * of the column. The lozenges come in three groups, to twinkle out of step.
 * Stroke the ripples in `--gold` under a mask that fades them at the sides,
 * and fill the lozenges `--art-saffron` (the last group `--art-core`).
 */
export function seaSurface({ cx, horizon, column, half = 290 }: { cx: number; horizon: number; column: number; half?: number }) {
  const rows = Array.from({ length: 16 }, (_, k) => horizon + 8 + 6 * k + 0.7 * k * k).filter((y) => y < 800);
  const ripples: string[] = [];
  const reflection = ["", "", ""];
  rows.forEach((y, k) => {
    const depth = y - horizon;
    const width = column + 0.35 * depth;
    const lift = 1.2 + 0.03 * depth;
    let x = cx - half + hash(k, 0) * 20;
    let j = 0;
    while (x < cx + half) {
      const len = 12 + (20 + depth * 0.12) * hash(k, j * 3 + 1);
      const end = Math.min(x + len, cx + half);
      const inColumn = end > cx - width && x < cx + width;
      if (!inColumn && hash(k, j * 3 + 3) > 0.3) {
        ripples.push(`M ${round(x)} ${round(y)} Q ${round((x + end) / 2)} ${round(y - lift)} ${round(end)} ${round(y)}`);
      }
      x = end + 8 + 18 * hash(k, j * 3 + 2);
      j++;
    }
    let g = cx - width + hash(k, 99) * 8;
    let n = 0;
    while (g < cx + width) {
      const l = 5 + 13 * hash(k, 200 + n) * (1 - Math.abs(g - cx) / (width * 1.4));
      const h = 1.6 + 0.08 * k;
      const mid = g + l;
      reflection[(k + n) % 3] +=
        `M ${round(g)} ${round(y)} Q ${round(mid)} ${round(y - h)} ${round(g + 2 * l)} ${round(y)} Q ${round(mid)} ${round(y + h)} ${round(g)} ${round(y)} Z `;
      g += 2 * l + 4 + 9 * hash(k, 300 + n);
      n++;
    }
  });
  return { ripples, reflection };
}

/* ── Rain ──────────────────────────────────────────────────────────────── */

/**
 * Rain over the box from (x, y), w wide and h high: `count` hairlines, 20 to
 * 44 long and slanting a little to the left as they fall, spread evenly
 * enough not to clump into hatching. Returned in three groups, so one can
 * shimmer. Stroke them 0.7 wide in a `--gold-soft` gradient faded at top and
 * bottom.
 */
export function rainGroups({ x, y, w, h, count }: { x: number; y: number; w: number; h: number; count: number }) {
  const lines = Array.from({ length: count }, (_, k) => {
    const px = round(x + ((k * 0.6180339 + 0.13) % 1) * w);
    const py = round(y + ((k * 0.7548777 + 0.5) % 1) * h);
    const l = 20 + (k % 5) * 6;
    return `M ${px} ${py} L ${round(px - l * 0.2)} ${py + l}`;
  });
  return [0, 1, 2].map((g) => lines.filter((_, k) => k % 3 === g).join(" "));
}

/* ── Haṃsas in flight ───────────────────────────────────────────────────── */

const GOOSE_BODY = "M -5.5 0 C -4 -2.6 3 -2.8 5.5 -0.8 L 9 -2 L 8 1.2 C 4 2.6 -3 2.6 -5.5 0 Z";
const GOOSE_NECK = "M -4.5 -0.6 Q -8.5 -1.8 -11 -1.6";
const GOOSE_BEAK = "M -13.2 -2.1 L -16 -1.4 L -13.2 -0.9 Z";
const WING_UP = "M -1.5 -1.6 C 0 -7 3 -11 7.5 -12.5 C 6.2 -8.4 4.6 -4.4 3 -1.4 Z";
const WING_UP_FAR = "M 0.5 -1.8 C 1.5 -5.5 3.4 -8.4 6 -10 C 5.6 -6.8 4.6 -4 3.6 -1.8 Z";
const WING_DOWN = "M -1.5 0.8 C 0 5.4 3 8.6 7 9.6 C 5.8 6.4 4.4 3.4 3 0.8 Z";
const WING_DOWN_FAR = "M -2 -1.4 C -0.6 -4.2 1.2 -6 3.4 -7 C 3.4 -4.8 3 -3 2.4 -1.6 Z";

/** A wild goose in flight, about 25 long, heading left with its beak at (−16, −1.4); `up` raises the wings. */
export function Goose({ up }: { up: boolean }) {
  return (
    <>
      <path d={up ? WING_UP_FAR : WING_DOWN_FAR} fill="var(--gold-soft)" />
      <path d={GOOSE_BODY} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
      <path d={GOOSE_NECK} stroke="var(--art-moon)" strokeWidth={1.5} strokeLinecap="round" />
      <path d={GOOSE_NECK} stroke="var(--gold)" strokeWidth={0.35} strokeOpacity={0.8} />
      <circle cx={-12} cy={-1.6} r={1.6} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.4} />
      <path d={GOOSE_BEAK} fill="var(--art-saffron)" />
      <path d={up ? WING_UP : WING_DOWN} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
    </>
  );
}

/* ── Rain cloud (megha) ────────────────────────────────────────────────── */

export type Lobe = { x: number; y: number; r: number };

/**
 * A rain cloud's body: its lobes as circles, `--art-moon` over a 2.4 `--gold`
 * stroke, so only the outline of their union shows. Cut its foot flat with a
 * clip, darken it with `--art-hair` there, and lay a gold line along the cut.
 */
export function CloudLobes({ lobes }: { lobes: Lobe[] }) {
  return (
    <>
      {lobes.map((l, i) => (
        <circle key={i} cx={l.x} cy={l.y} r={l.r} stroke="var(--gold)" strokeWidth={2.4} />
      ))}
      {lobes.map((l, i) => (
        <circle key={i} cx={l.x} cy={l.y} r={l.r} fill="var(--art-moon)" />
      ))}
    </>
  );
}

/** A hair-fine arc over the top of an inner lobe, so the cloud reads as heaped. Stroke it `--gold-soft`, 0.7 wide. */
export function cloudArc(l: Lobe) {
  return `M ${round(l.x - l.r * 0.6)} ${round(l.y - l.r * 0.35)} A ${round(l.r * 0.8)} ${round(l.r * 0.8)} 0 0 1 ${round(l.x + l.r * 0.5)} ${round(l.y - l.r * 0.55)}`;
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

/* ── Her footprints ────────────────────────────────────────────────────── */

/** A right footprint's sole, toes at the top, big toe to the left: about 15 wide and 38 tall with its toes, centred on the origin. */
const FOOTPRINT_SOLE = [
  "M 0.5 15",
  "C -4.5 15 -5.5 11 -5 7",
  "C -4.6 3.5 -2.6 1 -2.8 -3",
  "C -3 -7 -7 -9 -7 -12.5",
  "C -7 -15.5 -3.5 -16.2 0.5 -16",
  "C 4.5 -15.8 7 -14 6.6 -10",
  "C 6.2 -5 5.2 -1 5 3.5",
  "C 4.8 9 5.2 15 0.5 15",
  "Z",
].join(" ");
/** Its five toes, big toe first. */
export const FOOTPRINT_TOES = [
  { x: -4, y: -20.6, r: 2.5 },
  { x: 0.6, y: -22.4, r: 1.7 },
  { x: 3.6, y: -21.8, r: 1.5 },
  { x: 6, y: -20.2, r: 1.25 },
  { x: 7.8, y: -17.8, r: 1.05 },
];

/**
 * A right footprint (śrīpāda), filled by the enclosing group, which places it and scales it: a negative
 * x scale makes the left foot, and about 0.7 in y lays it on a surface. With `edge`, a hair-fine gold rim
 * round the sole that keeps its width under the scaling.
 */
export function Footprint({ edge = false }: { edge?: boolean }) {
  return (
    <>
      {edge ? (
        <path d={FOOTPRINT_SOLE} stroke="var(--gold)" strokeWidth={1} strokeOpacity={0.7} vectorEffect="non-scaling-stroke" />
      ) : (
        <path d={FOOTPRINT_SOLE} />
      )}
      {FOOTPRINT_TOES.map((t, i) => (
        <circle key={i} cx={t.x} cy={t.y} r={t.r} />
      ))}
    </>
  );
}

/* ── Bells ─────────────────────────────────────────────────────────────── */

/** One jewelled bell (kiṅkiṇī) hanging from a cord at the origin: a gold ball with a slit and a gem, about 19 across. */
export function Bell({ gem, s = 1 }: { gem: string; s?: number }) {
  return (
    <g transform={s === 1 ? undefined : `scale(${s})`}>
      <path d="M 0 0 L 0 6" stroke="var(--gold)" strokeWidth={1.1} />
      <circle cy={5} r={2.3} stroke="var(--gold)" strokeWidth={1} />
      <circle cy={16} r={9.2} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.7} />
      <path d="M -8.2 19 Q 0 22.8 8.2 19" stroke="var(--art-carve)" strokeWidth={1.6} strokeLinecap="round" />
      <circle cy={22} r={1.9} fill="var(--art-carve)" />
      <circle cy={12.6} r={3} fill={gem} stroke="var(--art-carve)" strokeWidth={0.5} />
      <path d="M -5.8 12 Q -5.6 8.2 -2.4 7.4" stroke="var(--art-core)" strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}

/* ── The open lotus ────────────────────────────────────────────────────── */

const LOTUS_BACK = [-60, -30, 0, 30, 60];
const LOTUS_FRONT = [-75, -40, -12, 12, 40, 75];
const lotusPetal = (l: number) =>
  `M 0 0 C ${round(-l * 0.36)} ${round(-l * 0.3)} ${round(-l * 0.28)} ${round(-l * 0.8)} 0 ${-l} C ${round(l * 0.28)} ${round(-l * 0.8)} ${round(l * 0.36)} ${round(-l * 0.3)} 0 0 Z`;

/**
 * An open lotus (padma) seen at a slant, centred on the origin where it sits on its pad: five back
 * petals 40 long and six front petals 30 long, edged in gold, round a turmeric seed head. About 90 across.
 * `shade` draws a vein down each front petal; `pad={false}` leaves out the leaf it floats on.
 */
export function OpenLotus({ fill = "var(--lotus)", shade, pad = true }: { fill?: string; shade?: string; pad?: boolean }) {
  return (
    <>
      {pad && <ellipse cy={4} rx={44} ry={8} fill="var(--leaf)" fillOpacity={0.55} />}
      {LOTUS_BACK.map((deg) => (
        <path key={deg} d={lotusPetal(40)} transform={`rotate(${deg})`} fill={fill} fillOpacity={0.6} stroke="var(--gold)" strokeWidth={0.6} />
      ))}
      {LOTUS_FRONT.map((deg) => (
        <path key={deg} d={lotusPetal(30)} transform={`rotate(${deg})`} fill={fill} stroke="var(--gold)" strokeWidth={0.6} />
      ))}
      {shade && LOTUS_FRONT.map((deg) => <path key={deg} d={`M 0 -2 L 0 -26`} transform={`rotate(${deg})`} stroke={shade} strokeWidth={0.7} strokeOpacity={0.6} />)}
      <ellipse cy={-6} rx={9} ry={5} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.6} />
    </>
  );
}

/* ── Fish ──────────────────────────────────────────────────────────────── */

/**
 * A fish seen from above, as fish are seen in shallow water, nose at +x,
 * about 70 units long. Its body is bent a little, as a fish is when it turns.
 */
const FISH_BEND = 0.004;
const bend = (d: string) =>
  d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x: string, y: string) => `${x} ${round(Number(y) + FISH_BEND * Number(x) ** 2)}`);
const bent = (x: number, y: number): Pt => ({ x, y: round(y + FISH_BEND * x * x) });

export const FISH_BODY = bend(
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

/** The fish's gradient and its clip, for the `<defs>` of an artwork that draws `Fish`. */
export function FishDefs({ id }: { id: (name: string) => string }) {
  return (
    <>
      <linearGradient id={id("fish")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={{ stopColor: "var(--art-saffron)" }} />
        <stop offset="0.5" style={{ stopColor: "var(--art-vermilion)" }} />
        <stop offset="1" style={{ stopColor: "var(--art-saffron)" }} />
      </linearGradient>
      <clipPath id={id("fish-clip")}>
        <path d={FISH_BODY} />
      </clipPath>
    </>
  );
}

/** One fish (mīna) at the origin, heading +x; its shadow is `FISH_BODY` filled faintly beneath it. */
export function Fish({ url }: { url: (name: string) => string }) {
  return (
    <>
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
    </>
  );
}

/** Water in the miniature painters' pattern: rows of small arcs, each row set half an arc along. */
export function WavePattern({ id }: { id: string }) {
  return (
    <pattern id={id} width={14} height={9} patternUnits="userSpaceOnUse">
      <path
        d="M 0 9 A 9 9 0 0 1 14 9 M -7 4.5 A 9 9 0 0 1 7 4.5 M 7 4.5 A 9 9 0 0 1 21 4.5"
        stroke="var(--gold-soft)"
        strokeWidth={0.6}
        strokeOpacity={0.55}
      />
    </pattern>
  );
}

/* ── Kadamba ───────────────────────────────────────────────────────────── */

/** A kadamba leaf: broad, pointed, glossy, base at the origin, pointing along +x. */
export function kadambaLeaf(l: number, w: number) {
  const blade = `M 0 0 C ${round(l * 0.2)} ${-w} ${round(l * 0.72)} ${round(-w * 0.9)} ${l} 0 C ${round(l * 0.72)} ${round(w * 0.9)} ${round(l * 0.2)} ${w} 0 0 Z`;
  const rib = `M 2 0 L ${round(l * 0.95)} 0`;
  const veins = [0.22, 0.38, 0.54, 0.7]
    .map((u) => {
      const x = round(u * l);
      const h = round(w * 0.62 * (1 - u * 0.55));
      const x2 = round(x + l * 0.14);
      return `M ${x} 0 Q ${round(x + l * 0.04)} ${round(-h * 0.7)} ${x2} ${-h} M ${x} 0 Q ${round(x + l * 0.04)} ${round(h * 0.7)} ${x2} ${h}`;
    })
    .join(" ");
  return { blade, rib, veins };
}

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

const dot = (x: number, y: number, r: number) =>
  `M ${round(x - r)} ${round(y)} a ${r} ${r} 0 1 0 ${round(2 * r)} 0 a ${r} ${r} 0 1 0 ${round(-2 * r)} 0 `;

/**
 * One kadamba head: an orange ball of tiny florets whose pale styles stand
 * out all over it, so it looks like a pincushion with a fuzzy corona.
 */
export function kadambaHead({ x, y, r }: { x: number; y: number; r: number }, seed: number) {
  const n = Math.round(r * 2.6);
  const styles: string[] = [];
  const tips = ["", "", ""];
  for (let k = 0; k < n; k++) {
    const deg = (k * 360) / n + ((seed * 37 + k * 53) % 11) - 5;
    const reach = r * (1.24 + ((seed + k * 7) % 5) * 0.03);
    const a = polar(x, y, r * 0.78, deg);
    const b = polar(x, y, reach, deg);
    styles.push(`M ${a.x} ${a.y} L ${b.x} ${b.y}`);
    tips[(k + seed) % 3] += dot(b.x, b.y, 1.05);
  }
  const florets = Array.from({ length: Math.round(r * r * 0.11) }, (_, i) => {
    const rr = r * 0.84 * Math.sqrt((i + 0.5) / Math.round(r * r * 0.11));
    const t = i * GOLDEN + seed;
    return { x: round(x + rr * Math.cos(t)), y: round(y + rr * Math.sin(t)) };
  });
  return { x, y, r, styles: styles.join(" "), tips, florets };
}

/** A kadamba leaf from `kadambaLeaf`, drawn at the origin; place and turn it in the enclosing group. */
export function KadambaLeaf({ blade, rib, veins }: ReturnType<typeof kadambaLeaf>) {
  return (
    <>
      <path d={blade} fill="var(--leaf)" fillOpacity={0.78} stroke="var(--leaf)" strokeWidth={0.8} />
      <path d={veins} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.55} />
      <path d={rib} stroke="var(--gold-soft)" strokeWidth={0.9} strokeOpacity={0.85} />
    </>
  );
}

/** A kadamba head from `kadambaHead`, filled with the caller's radial gradient (core, saffron, vermilion). */
export function KadambaHead({ head, fill }: { head: ReturnType<typeof kadambaHead>; fill: string }) {
  return (
    <>
      <path d={head.styles} stroke="var(--art-saffron)" strokeWidth={0.6} strokeLinecap="round" />
      <circle cx={head.x} cy={head.y} r={head.r} fill={fill} />
      <g fill="var(--art-ivory)" fillOpacity={0.85}>
        {head.florets.map((f, k) => (
          <circle key={k} cx={f.x} cy={f.y} r={0.7} />
        ))}
      </g>
      <g fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.35}>
        {head.tips.map((d, k) => (
          <path key={k} className={TWINKLE[k]} d={d} />
        ))}
      </g>
    </>
  );
}

const KADAMBA_BOUGH = "M 660 34 C 620 44 590 62 566 90 C 552 106 544 122 540 140";
const KADAMBA_BOUGH_TWIG = "M 590 64 C 600 84 604 104 600 124";
const KADAMBA_BOUGH_LEAVES = [
  { x: 620, y: 46, deg: 150, l: 40, w: 10 },
  { x: 596, y: 60, deg: 200, l: 36, w: 9 },
  { x: 572, y: 84, deg: 120, l: 38, w: 10 },
  { x: 560, y: 100, deg: 210, l: 34, w: 9 },
  { x: 546, y: 126, deg: 160, l: 30, w: 8 },
  { x: 600, y: 112, deg: 60, l: 30, w: 8 },
].map((l) => ({ ...kadambaLeaf(l.l, l.w), at: `translate(${l.x} ${l.y}) rotate(${l.deg})` }));
/** Where the bough's three heads hang, in its own coordinates (before any scale about the right edge). */
export const KADAMBA_BOUGH_HEADS = [
  { x: 540, y: 152, r: 11 },
  { x: 600, y: 136, r: 10 },
  { x: 566, y: 118, r: 8 },
];
const KADAMBA_BOUGH_HEAD_SHAPES = KADAMBA_BOUGH_HEADS.map((h, i) => kadambaHead(h, i + 1));

/**
 * A kadamba bough leaning in from the crown's right edge, its limb ending at
 * about (540, 140) with three heads hanging from it. Scale it about (640, 0)
 * to fill the crown; `fill` is the kadamba head gradient.
 */
export function KadambaBough({ fill }: { fill: string }) {
  return (
    <>
      <path d={KADAMBA_BOUGH} stroke="var(--art-hair)" strokeOpacity={0.55} strokeWidth={4.6} strokeLinecap="round" />
      <path d={KADAMBA_BOUGH} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.7} />
      <path d={KADAMBA_BOUGH_TWIG} stroke="var(--art-hair)" strokeOpacity={0.55} strokeWidth={2.4} strokeLinecap="round" />
      {KADAMBA_BOUGH_LEAVES.map((l, i) => (
        <g key={i} transform={l.at}>
          <KadambaLeaf {...l} />
        </g>
      ))}
      {KADAMBA_BOUGH_HEAD_SHAPES.map((h, i) => (
        <KadambaHead key={i} head={h} fill={fill} />
      ))}
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

/* ── Her chariot, the Śrīcakra in tiers ────────────────────────────────── */

/** Plate units per yantra unit at full size; the yantra's vertical diameter is 48 units, as in the traditional construction. */
const RATHA_S = 3.2;
/** How much the tiers' top faces are foreshortened, seen from in front and above. */
const RATHA_K = 0.5;
/** The plinth (bhūpura) and four drums, each a step of the meru: radius in yantra units, and its top height at full size. */
const RATHA_PLINTH = { half: 48, gate: 8, jut: 5, z: 22 };
const RATHA_DRUMS = [
  { r: 42.2, z: 30 },
  { r: 38.4, z: 48 },
  { r: 31.2, z: 64 },
  { r: 24, z: 78 },
];
/** Upright carved lines across the front of each drum, every `n`th of the way round, so the tiers read as built, not moulded. */
const RATHA_PILASTERS = [28, 26, 22, 18];

/** The square of gates, as a closed outline in yantra units, half-side h, its four gates jutting out. */
export function gateSquare(h: number, g: number, j: number) {
  const side = (x: number, y: number) => [x, y];
  const pts: number[][] = [];
  // Clockwise from the far left corner, with a gate in the middle of each side.
  pts.push(side(-h, -h), side(-g, -h), side(-g, -h - j), side(g, -h - j), side(g, -h));
  pts.push(side(h, -h), side(h, -g), side(h + j, -g), side(h + j, g), side(h, g));
  pts.push(side(h, h), side(g, h), side(g, h + j), side(-g, h + j), side(-g, h));
  pts.push(side(-h, h), side(-h, g), side(-h - j, g), side(-h - j, -g), side(-h, -g));
  return `M ${pts.map(([x, y]) => `${round(x)} ${round(y)}`).join(" L ")} Z`;
}

/** A ring of petals between radii r0 and r1, in yantra units. */
export function yantraPetals(n: number, r0: number, r1: number, turn = 0) {
  const half = 180 / n;
  return Array.from({ length: n }, (_, k) => {
    const deg = 90 + turn + (k * 360) / n;
    const a = polar(0, 0, r0, deg - half);
    const b = polar(0, 0, r0, deg + half);
    const tip = polar(0, 0, r1, deg);
    const ca = polar(0, 0, r0 + (r1 - r0) * 0.62, deg - half * 0.92);
    const cb = polar(0, 0, r0 + (r1 - r0) * 0.62, deg + half * 0.92);
    return `M ${a.x} ${a.y} Q ${ca.x} ${ca.y} ${tip.x} ${tip.y} Q ${cb.x} ${cb.y} ${b.x} ${b.y}`;
  }).join(" ");
}

/**
 * The Śrīcakra's nine interlocking triangles, from the traditional
 * construction: nine horizontal base lines 6, 12, 17, 20, 23, 27, 30, 36 and
 * 42 units down a 48-unit diameter, each shortened at its ends, joined to an
 * apex on the axis. Centred on the origin; five point down (+y), four up.
 */
const SRI_BASES = [
  { d: 6, hw: 12.87, apex: 27 },
  { d: 12, hw: 15.78, apex: 42 },
  { d: 17, hw: 22.96, apex: 48 },
  { d: 20, hw: 7.66, apex: 36 },
  { d: 23, hw: 5.98, apex: 30 },
  { d: 27, hw: 7.81, apex: 12 },
  { d: 30, hw: 23.24, apex: 0 },
  { d: 36, hw: 16.78, apex: 6 },
  { d: 42, hw: 12.87, apex: 17 },
];
export const SRI_TRIANGLES = SRI_BASES.map(({ d, hw, apex }) => ({
  d: `M ${-hw} ${d - 24} L ${hw} ${d - 24} L 0 ${apex - 24} Z`,
  down: apex > d,
}));
/** Where the bindu sits, inside the innermost triangle, in yantra units below the centre. */
export const SRI_BINDU_V = 1.2;

type RathaWeapon = { x: number; y: number; kind: number; back: boolean; s: number };

function rathaGeometry(cx: number, cy: number, s: number) {
  const S = RATHA_S * s;
  const K = RATHA_K;
  const P = RATHA_PLINTH;
  const zP = P.z * s;
  const drums = RATHA_DRUMS.map((d) => ({ r: d.r, z: d.z * s }));
  const face = (z: number) => `translate(${cx} ${cy - z}) scale(${S} ${round(S * K)})`;
  const riser = (r: number, z0: number, z1: number) => {
    const rx = round(r * S);
    const ry = round(r * S * K);
    const yt = cy - z1;
    const yb = cy - z0;
    return `M ${cx - rx} ${yt} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yt} L ${cx + rx} ${yb} A ${rx} ${ry} 0 0 1 ${cx - rx} ${yb} Z`;
  };
  const frieze = (r: number, z: number) => {
    const rx = round(r * S - 2 * s);
    const ry = round((r * S - 2 * s) * K);
    return `M ${cx - rx} ${cy - z} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy - z}`;
  };
  const pilasters = (r: number, z0: number, z1: number, n: number) =>
    Array.from({ length: n / 2 - 1 }, (_, k) => {
      const t = ((k + 1) / (n / 2)) * Math.PI;
      const x = round(cx + r * S * Math.cos(t));
      const y = round(cy + r * S * K * Math.sin(t));
      return `M ${x} ${y - z0 - 1 * s} V ${y - z1 + 4 * s}`;
    }).join(" ");
  const plinthFront = (() => {
    const { half: h, gate: g, jut: j } = P;
    const y = (v: number, zz: number) => round(cy + v * S * K - zz);
    const x = (u: number) => round(cx + u * S);
    return [
      `M ${x(-h)} ${y(h, zP)} L ${x(-g)} ${y(h, zP)} L ${x(-g)} ${y(h + j, zP)} L ${x(g)} ${y(h + j, zP)} L ${x(g)} ${y(h, zP)} L ${x(h)} ${y(h, zP)}`,
      `L ${x(h)} ${y(h, 0)} L ${x(g)} ${y(h, 0)} L ${x(g)} ${y(h + j, 0)} L ${x(-g)} ${y(h + j, 0)} L ${x(-g)} ${y(h, 0)} L ${x(-h)} ${y(h, 0)} Z`,
    ].join(" ");
  })();
  const rim = (r: number, z: number, n: number, ws: number, offset: number): RathaWeapon[] =>
    Array.from({ length: n }, (_, k) => {
      const t = ((k + 0.5) / n) * 2 * Math.PI;
      return {
        x: round(cx + r * S * Math.cos(t)),
        y: round(cy - z + r * S * K * Math.sin(t)),
        kind: (k + offset) % 4,
        back: Math.sin(t) < 0,
        s: ws * s,
      };
    });
  return {
    cx,
    cy,
    S,
    K,
    face,
    plinth: {
      ...P,
      z: zP,
      front: plinthFront,
      mid: `M ${cx - P.half * S + 4 * s} ${round(cy + P.half * S * K - zP / 2)} H ${cx + P.half * S - 4 * s}`,
    },
    drums: drums.map((d, i) => {
      const z0 = i ? drums[i - 1].z : zP;
      return { ...d, z0, riser: riser(d.r, z0, d.z), pilasters: pilasters(d.r, z0, d.z, RATHA_PILASTERS[i]), frieze: frieze(d.r, d.z - 3 * s) };
    }),
    /** Her bindu, raised over the innermost triangle. */
    bindu: { x: cx, y: round(cy + SRI_BINDU_V * S * K - drums[3].z - 8 * s) },
    wheels: [-118, 118].map((dx) => ({ x: cx + dx * s, y: cy + 88 * s, r: 46 * s })),
    /** On the lower tiers only the front and sides of each rim show; the top tier's stand all round. */
    weapons: [
      ...[-44, -36, -28, -20, -12, 12, 20, 28, 36, 44].map((u, k) => ({
        x: cx + u * S,
        y: round(cy + P.half * S * K - zP),
        kind: k % 4,
        back: false,
        s: 0.85 * s,
      })),
      ...[
        ...rim(41, drums[0].z, 26, 0.85, 0),
        ...rim(37.4, drums[1].z, 20, 0.95, 1),
        ...rim(30.4, drums[2].z, 16, 1.05, 2),
      ].filter((w) => !w.back),
    ],
    topWeapons: rim(23.2, drums[3].z, 12, 1.15, 3),
  };
}

const rathas = new Map<string, ReturnType<typeof rathaGeometry>>();

export type RathaShape = ReturnType<typeof rathaGeometry>;

/**
 * Her chariot, the Cakrarāja, as the Śrīcakra raised in tiers: the geometry
 * for a chariot whose yantra centre would stand on the ground at (cx, cy),
 * at scale s (1 is its size in Shloka 26).
 */
export function sriCakraRatha(cx: number, cy: number, s = 1) {
  const key = `${cx} ${cy} ${s}`;
  let g = rathas.get(key);
  if (!g) {
    g = rathaGeometry(cx, cy, s);
    rathas.set(key, g);
  }
  return g;
}

/** The yantra's field of light and the tiers' gold, as `id("field")` and `id("riser")`. */
export function RathaDefs({ id }: { id: (name: string) => string }) {
  return (
    <>
      <radialGradient id={id("field")} cx={0} cy={SRI_BINDU_V} r={24} gradientUnits="userSpaceOnUse">
        <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
        <stop offset="0.55" style={{ stopColor: "var(--art-saffron)" }} />
        <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
      </radialGradient>
      <linearGradient id={id("riser")} x1={0} y1={0} x2={1} y2={0}>
        <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0.75 }} />
        <stop offset="0.45" style={{ stopColor: "var(--art-turmeric)" }} />
        <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0.75 }} />
      </linearGradient>
    </>
  );
}

/** A chariot wheel face-on at the origin, radius r: a double rim, sixteen spokes, a hub with a ruby. */
export function ChariotWheel({ r }: { r: number }) {
  const spokes = Array.from({ length: 16 }, (_, k) => {
    const deg = k * 22.5 + 11.25;
    const a = polar(0, 0, r * 0.2, deg);
    const b = polar(0, 0, r * 0.86, deg);
    return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  }).join(" ");
  return (
    <>
      <circle r={r} stroke="var(--gold)" strokeWidth={round(r * 0.13)} />
      <circle r={round(r * 0.86)} stroke="var(--art-carve)" strokeWidth={0.7} />
      <circle r={round(r * 1.065)} stroke="var(--art-carve)" strokeWidth={0.7} />
      <path d={spokes} stroke="var(--gold)" strokeWidth={round(r * 0.05)} />
      <circle r={round(r * 0.22)} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.7} />
      <circle r={round(r * 0.09)} fill="var(--art-vermilion)" />
    </>
  );
}

const nonScaling = { vectorEffect: "non-scaling-stroke" as const };

/** The chariot's wheels, plinth of gates and four drums with their petals. Needs `RathaDefs`. */
export function RathaTiers({ g, url }: { g: RathaShape; url: (name: string) => string }) {
  const { plinth: P } = g;
  return (
    <>
      {g.wheels.map((w) => (
        <g key={w.x} transform={`translate(${w.x} ${w.y})`}>
          <ChariotWheel r={w.r} />
        </g>
      ))}
      <path d={P.front} fill={url("riser")} stroke="var(--gold)" strokeWidth={0.8} />
      <path d={P.mid} stroke="var(--art-carve)" strokeWidth={0.9} strokeDasharray="6 2.4" />
      <g transform={g.face(P.z)}>
        <path d={gateSquare(P.half, P.gate, P.jut)} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.4} {...nonScaling} />
        <path d={gateSquare(P.half - 2.4, P.gate - 1.6, P.jut)} stroke="var(--art-vermilion)" strokeWidth={1} {...nonScaling} />
        <path d={gateSquare(P.half - 4.8, P.gate - 3.2, P.jut)} stroke="var(--gold)" strokeWidth={0.8} {...nonScaling} />
      </g>
      {g.drums.map((drum, i) => (
        <g key={i}>
          <path d={drum.riser} fill={url("riser")} stroke="var(--gold)" strokeWidth={0.8} />
          <path d={drum.pilasters} stroke="var(--art-carve)" strokeWidth={0.8} />
          <path d={drum.frieze} stroke="var(--art-carve)" strokeWidth={0.8} />
          <g transform={g.face(drum.z)}>
            <circle r={drum.r} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.2} {...nonScaling} />
            {i === 0 && (
              <g stroke="var(--gold)" {...nonScaling}>
                <circle r={40.8} strokeWidth={0.8} {...nonScaling} />
                <circle r={39.4} strokeWidth={0.8} {...nonScaling} />
              </g>
            )}
            {i === 1 && <path d={yantraPetals(16, 31.2, 38, 0)} fill="var(--art-core)" fillOpacity={0.85} stroke="var(--gold)" strokeWidth={0.9} {...nonScaling} />}
            {i === 2 && <path d={yantraPetals(8, 24, 30.8, 0)} fill="var(--art-saffron)" fillOpacity={0.9} stroke="var(--gold)" strokeWidth={0.9} {...nonScaling} />}
          </g>
        </g>
      ))}
    </>
  );
}

/** The nine triangles on the chariot's top tier, over a field of her light. Needs `RathaDefs`. */
export function RathaTriangles({ g, url }: { g: RathaShape; url: (name: string) => string }) {
  return (
    <g transform={g.face(g.drums[3].z)}>
      <circle r={23.4} fill={url("field")} fillOpacity={0.9} />
      {SRI_TRIANGLES.map((t, i) => (
        <path key={i} d={t.d} fill={t.down ? "var(--art-vermilion)" : "var(--art-core)"} fillOpacity={0.16} />
      ))}
      {SRI_TRIANGLES.map((t, i) => (
        <path key={i} d={t.d} stroke="var(--gold)" strokeWidth={1.1} strokeLinejoin="round" {...nonScaling} />
      ))}
    </g>
  );
}

/**
 * The Śrīcakra face-on, in yantra units round the origin: the square of gates
 * (three lines), three circles, the sixteen and the eight petals, and the nine
 * triangles over the field of her light. Place and scale it with a transform
 * on a parent group; it needs `RathaDefs` for the field.
 */
export function SriCakraFace({ url }: { url: (name: string) => string }) {
  return (
    <>
      <path d={gateSquare(48, 8, 5)} fill="var(--art-stone)" fillOpacity={0.7} stroke="var(--gold)" strokeWidth={1.6} {...nonScaling} />
      <path d={gateSquare(45.6, 6.4, 5)} stroke="var(--art-vermilion)" strokeWidth={1.1} {...nonScaling} />
      <path d={gateSquare(43.2, 4.8, 5)} stroke="var(--gold)" strokeWidth={0.9} {...nonScaling} />
      <circle r={41.6} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.9} {...nonScaling} />
      <circle r={40.2} stroke="var(--gold)" strokeWidth={0.8} {...nonScaling} />
      <circle r={38.8} stroke="var(--gold)" strokeWidth={0.8} {...nonScaling} />
      <path d={yantraPetals(16, 31.2, 38)} fill="var(--art-core)" fillOpacity={0.85} stroke="var(--gold)" strokeWidth={0.9} {...nonScaling} />
      <circle r={31.2} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.8} {...nonScaling} />
      <path d={yantraPetals(8, 24, 30.8)} fill="var(--art-saffron)" fillOpacity={0.9} stroke="var(--gold)" strokeWidth={0.9} {...nonScaling} />
      <circle r={24} fill={url("field")} fillOpacity={0.9} stroke="var(--gold)" strokeWidth={0.9} {...nonScaling} />
      {SRI_TRIANGLES.map((t, i) => (
        <path key={i} d={t.d} fill={t.down ? "var(--art-vermilion)" : "var(--art-core)"} fillOpacity={0.16} />
      ))}
      {SRI_TRIANGLES.map((t, i) => (
        <path key={i} d={t.d} stroke="var(--gold)" strokeWidth={1.1} strokeLinejoin="round" {...nonScaling} />
      ))}
    </>
  );
}

/** A spear, a trident, an arrow and a goad, each standing up from the origin, about 22 tall. */
function WeaponGlyph({ kind }: { kind: number }) {
  const shaft = <path d="M 0 0 V -14" stroke="var(--gold)" strokeWidth={1.1} />;
  switch (kind) {
    case 0:
      return (
        <>
          {shaft}
          <path d="M 0 -24 C 2.6 -20 2.6 -16 0 -13.4 C -2.6 -16 -2.6 -20 0 -24 Z" fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.6} />
        </>
      );
    case 1:
      return (
        <>
          {shaft}
          <path d="M -4 -21 Q -4.4 -15 0 -14 Q 4.4 -15 4 -21 M 0 -14 V -23" stroke="var(--gold)" strokeWidth={1.1} strokeLinecap="round" />
        </>
      );
    case 2:
      return (
        <>
          <path d="M 0 0 V -18" stroke="var(--gold)" strokeWidth={1} />
          <path d="M -2.2 -18 L 0 -23.5 L 2.2 -18 Z" fill="var(--gold)" />
          <path d="M -2.4 -1 L 0 -5 L 2.4 -1" stroke="var(--art-saffron)" strokeWidth={1} />
        </>
      );
    default:
      return (
        <>
          <path d="M 0 0 V -20" stroke="var(--gold)" strokeWidth={1.1} />
          <path d="M 0 -20 L 0 -24 M 0 -17 C 4 -19 6.4 -16 5 -13" stroke="var(--gold)" strokeWidth={1.1} strokeLinecap="round" />
        </>
      );
  }
}

function RathaWeaponList({ list }: { list: RathaWeapon[] }) {
  return (
    <>
      {list.map((w, i) => (
        <g key={i} transform={`translate(${w.x} ${w.y}) scale(${w.s})`} opacity={w.back ? 0.75 : 1}>
          <WeaponGlyph kind={w.kind} />
          {i % 5 === 2 && <circle className={TWINKLE[i % 3]} cy={-22} r={1.6} fill="var(--art-core)" />}
        </g>
      ))}
    </>
  );
}

/** Spears, tridents, arrows and goads standing ready round every tier. */
export function RathaWeapons({ g }: { g: RathaShape }) {
  return (
    <>
      <RathaWeaponList list={g.weapons} />
      <RathaWeaponList list={g.topWeapons} />
    </>
  );
}

/** The chariot's outline in black, for a mask that keeps a light off it. */
export function RathaSilhouette({ g }: { g: RathaShape }) {
  const { plinth: P } = g;
  return (
    <>
      <path d={P.front} />
      <path d={gateSquare(P.half, P.gate, P.jut)} transform={g.face(P.z)} />
      {g.drums.map((drum, i) => (
        <g key={i}>
          <path d={drum.riser} />
          <circle r={drum.r} transform={g.face(drum.z)} />
        </g>
      ))}
    </>
  );
}

/* ── The army of her powers, and Bhaṇḍa's ash ──────────────────────────── */

/** The spears lean forward as they march, toward the lower right. */
export const SPEAR_LEAN = 16;
const SPEAR_BLADE = "M 0 0 C 2.4 -2.4 3.6 -8 3.4 -12 L 0 -27 L -3.4 -12 C -3.6 -8 -2.4 -2.4 0 0 Z";
const SPEAR_LUGS = "M -5 -0.6 L 5 -0.6";
const SPEAR_PENNANT = "M 0 3 L -17 4.4 L -12.6 8 L -17 11.6 L 0 13 Z";
const SPEAR_PENNANTS = ["var(--art-vermilion)", "var(--art-saffron)", "var(--lotus)"];
const SPEAR_FLICKER = ["m-flicker", "m-flicker m-late", "m-flicker m-later"];

/** The fading shaft gradient a `Spear` takes as `shaft`. */
export function SpearDefs({ id }: { id: (name: string) => string }) {
  return (
    <linearGradient id={id("shaft")} x1={0} y1={0} x2={0} y2={1}>
      <stop offset="0" style={{ stopColor: "var(--gold)" }} />
      <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
    </linearGradient>
  );
}

/**
 * A śakti, a power that is also a spear: blade up from the origin, the shaft
 * fading out 74 below it, a pennant in one of three colours (k).
 */
export function Spear({ k, shaft }: { k: number; shaft: string }) {
  return (
    <>
      <rect x={-0.8} y={0} width={1.6} height={74} fill={shaft} />
      <g className={SPEAR_FLICKER[k]}>
        <path d={SPEAR_PENNANT} fill={SPEAR_PENNANTS[k]} stroke="var(--gold)" strokeWidth={0.5} />
      </g>
      <path d={SPEAR_LUGS} stroke="var(--gold)" strokeWidth={1.6} strokeLinecap="round" />
      <path d={SPEAR_BLADE} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
      <path d="M 0 -1.5 L 0 -24" stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.85} />
      {k === 0 && <path className="m-lick" d={glint(4)} transform="translate(0 -27)" fill="var(--art-core)" />}
    </>
  );
}

export function AshDefs({ id }: { id: (name: string) => string }) {
  return (
    <>
      <radialGradient id={id("ash")}>
        <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.34 }} />
        <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
      </radialGradient>
      <radialGradient id={id("ash-pale")}>
        <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.16 }} />
        <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
      </radialGradient>
    </>
  );
}

type Disc = { x: number; y: number; r: number };

/** Bhaṇḍa's substance: soft clouds of ash, grey by day and by lamplight, with drifting flecks. */
export function Ash({ clouds, flecks, url }: { clouds: Disc[]; flecks: Disc[]; url: (name: string) => string }) {
  return (
    <>
      {clouds.map((a, i) => (
        <g key={i}>
          <circle cx={a.x} cy={a.y} r={a.r} fill={url("ash")} />
          <circle cx={a.x} cy={a.y} r={a.r} fill={url("ash-pale")} />
        </g>
      ))}
      {flecks.map((f, i) => (
        <circle
          key={i}
          className={i % 2 ? "m-ember m-late" : "m-ember"}
          cx={f.x}
          cy={f.y}
          r={f.r}
          fill={i % 3 ? "var(--art-musk)" : "var(--art-moon)"}
          fillOpacity={i % 3 ? 0.4 : 0.3}
        />
      ))}
    </>
  );
}

/* ── Mantriṇī ──────────────────────────────────────────────────────────── */

export function SapphireDefs({ id }: { id: (name: string) => string }) {
  return (
    <radialGradient id={id("sapphire")}>
      <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.55 }} />
      <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
    </radialGradient>
  );
}

/** Her ruby-set vīṇā at the origin: two gourds hanging under a straight neck, a curled end at the right. */
export function Vina() {
  return (
    <>
      {[-26, 26].map((x) => (
        <g key={x}>
          <path d={`M ${x} 0 V 4`} stroke="var(--gold)" strokeWidth={1.2} />
          <circle cx={x} cy={11} r={8.5} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <path d={`M ${x - 5} ${8} Q ${x - 4.5} ${5} ${x - 1.5} ${4.4}`} stroke="var(--art-core)" strokeWidth={1.1} strokeLinecap="round" />
        </g>
      ))}
      <rect x={-38} y={-3} width={76} height={5} rx={2.5} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
      <path d="M 38 -1 C 44 -2 46 -8 43 -12" stroke="var(--gold)" strokeWidth={2.4} strokeLinecap="round" />
      <path d="M -36 -3.6 L 36 -3.6" stroke="var(--gold-soft)" strokeWidth={0.4} />
      {[-18, -6, 6, 18].map((x) => (
        <circle key={x} cx={x} cy={-0.5} r={1.5} fill="var(--art-vermilion)" />
      ))}
    </>
  );
}

/** Mantriṇī's sapphire light (its soft glow, from `SapphireDefs`, is drawn separately, behind). */
export function Sapphire({ x, y }: Pt) {
  return (
    <>
      <circle cx={x} cy={y} r={9} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={1} />
      <circle cx={x - 2.6} cy={y - 2.6} r={2.4} fill="var(--art-moon)" fillOpacity={0.85} />
    </>
  );
}

/* ── Mahāgaṇapati ──────────────────────────────────────────────────────── */

export const GANESA_EMBLEMS = [
  "mace",
  "trident",
  "conch",
  "lotus",
  "tusk",
  "citron",
  "bow",
  "discus",
  "rice",
  "pot",
] as const;
export type GanesaEmblemName = (typeof GANESA_EMBLEMS)[number];
/** Ten places round him on a ring of radius r, leaving the top open. */
export const ganesaPlaces = (cx: number, cy: number, r: number) =>
  GANESA_EMBLEMS.map((name, k) => ({ name, ...polar(cx, cy, r, 90 - 18 - 36 * k) }));
const GANESA_BOW = { half: 76, grip: 0, bend: 36 };
const [GANESA_BOW_L, GANESA_BOW_R] = bowTips(GANESA_BOW);
const GANESA_DISCUS_FLAMES = Array.from({ length: 8 }, (_, k) => `rotate(${k * 45}) translate(0 -9)`);
const GANESA_RICE = Array.from({ length: 7 }, (_, k) => {
  const t = k / 6;
  return { x: round(1 + 7 * t * t), y: round(-12 + 14 * t), side: k % 2 ? 1 : -1 };
});

/** One of the ten things in Mahāgaṇapati's hands, upright at the origin, about 24 tall. */
export function GanesaEmblem({ name }: { name: GanesaEmblemName }) {
  switch (name) {
    case "mace":
      return (
        <>
          <path d="M 0 12 V -4" stroke="var(--gold)" strokeWidth={1.8} strokeLinecap="round" />
          <circle cy={-8} r={5.6} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <path d="M -5.4 -8 H 5.4 M 0 -13.4 V -2.6" stroke="var(--art-carve)" strokeWidth={0.5} />
          <circle cy={-14.6} r={1.4} fill="var(--gold)" />
        </>
      );
    case "trident":
      return (
        <>
          <path d="M 0 12 V -12" stroke="var(--gold)" strokeWidth={1.4} strokeLinecap="round" />
          <path d="M -6 -12 C -6 -5 -3 -3 0 -3 C 3 -3 6 -5 6 -12" stroke="var(--gold)" strokeWidth={1.4} strokeLinecap="round" />
          <path d="M 0 -15 L -1.6 -11 L 1.6 -11 Z M -6 -14.6 L -7.4 -11 L -4.6 -11 Z M 6 -14.6 L 4.6 -11 L 7.4 -11 Z" fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.4} />
        </>
      );
    case "conch":
      return (
        <>
          <path
            d="M 0 -12 C 6 -10 8.4 -3 6.6 3 C 5 8 2 10.6 0 12 C -1.4 10 -3.6 8.4 -6 5 C -8.6 0 -6.4 -9 0 -12 Z"
            fill="var(--art-ivory)"
            stroke="var(--gold)"
            strokeWidth={0.8}
          />
          <path d="M -2.6 -6 C 2 -8 4.4 -3 1.6 -0.6 C -0.4 1 -2 -0.8 -0.4 -2.2" stroke="var(--gold)" strokeWidth={0.6} strokeLinecap="round" />
          <path d="M 4.6 2 C 2 5 0 7 -3.6 6.4" stroke="var(--gold-soft)" strokeWidth={0.6} strokeLinecap="round" />
        </>
      );
    case "lotus":
      return (
        <>
          <path d="M 0 12 V 4" stroke="var(--leaf)" strokeWidth={1.3} strokeLinecap="round" />
          {[-34, 34].map((a) => (
            <path key={a} d="M 0 4 C -4 0 -3.6 -6 0 -9 C 3.6 -6 4 0 0 4 Z" transform={`rotate(${a} 0 4)`} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.5} />
          ))}
          <path d="M 0 4 C -4.4 -1 -4 -8 0 -12 C 4 -8 4.4 -1 0 4 Z" fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.6} />
        </>
      );
    case "tusk":
      return <path d="M -4 11 C -5 1 -1.6 -7 6 -12 C 2 -5 1.4 2 2.6 11 Z" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />;
    case "citron":
      return (
        <>
          <path d="M 1 -8 C 4 -12 8 -12 10 -10 C 7 -8 4 -7 1 -8 Z" fill="var(--leaf)" />
          <path
            d="M 0 -8 C 6 -8 9 -3 8.4 2 C 7.8 8 3.6 11 0 11 C -3.6 11 -7.8 8 -8.4 2 C -9 -3 -6 -8 0 -8 Z"
            fill="var(--art-turmeric)"
            stroke="var(--gold)"
            strokeWidth={0.8}
          />
          <path d="M -4.6 -2 C -4 -4.6 -2 -5.6 0 -5.8" stroke="var(--art-core)" strokeWidth={1} strokeLinecap="round" />
        </>
      );
    case "bow":
      return (
        <g transform="rotate(-90) scale(0.2)">
          <path d={`M ${GANESA_BOW_L.x} ${GANESA_BOW_L.y} L ${GANESA_BOW_R.x} ${GANESA_BOW_R.y}`} stroke="var(--gold-soft)" strokeWidth={4} />
          <SugarcaneBow shape={GANESA_BOW} />
        </g>
      );
    case "discus":
      return (
        <>
          <g className="m-flicker">
            {GANESA_DISCUS_FLAMES.map((t, i) => (
              <path key={i} d={tongue(6, 4, 1)} transform={t} fill="var(--art-saffron)" />
            ))}
          </g>
          <ChariotWheel r={8} />
        </>
      );
    case "rice":
      return (
        <>
          <path d="M -2 12 C -1 2 0 -6 1 -12 C 4 -6 7 -2 8 2" stroke="var(--leaf)" strokeWidth={1} strokeLinecap="round" />
          {GANESA_RICE.map((g, i) => (
            <ellipse
              key={i}
              cx={g.x + g.side * 1.8}
              cy={g.y}
              rx={1.4}
              ry={2.6}
              transform={`rotate(${g.side * 30} ${g.x + g.side * 1.8} ${g.y})`}
              fill="var(--art-turmeric)"
              stroke="var(--gold)"
              strokeWidth={0.3}
            />
          ))}
        </>
      );
    case "pot":
      return (
        <>
          <path d="M -8 -2 C -11 6 -6 12 0 12 C 6 12 11 6 8 -2 Z" fill="var(--gold)" stroke="var(--art-musk)" strokeWidth={0.5} strokeOpacity={0.6} />
          <path d="M -6 -2 L 6 -2 L 4.4 -6 L -4.4 -6 Z" fill="var(--gold)" stroke="var(--art-musk)" strokeWidth={0.5} strokeOpacity={0.6} />
          <path d="M -8.4 4 Q 0 6.4 8.4 4" stroke="var(--art-vermilion)" strokeWidth={1.2} />
          <circle cx={0} cy={5.4} r={1.6} fill="var(--art-vermilion)" />
          {[-3.4, 0, 3.4].map((x, i) => (
            <circle key={x} cx={x} cy={-8 - (i === 1 ? 1.6 : 0)} r={2} fill={i === 1 ? "var(--art-vermilion)" : "var(--leaf)"} stroke="var(--gold)" strokeWidth={0.4} />
          ))}
        </>
      );
  }
}

export function DawnDefs({ id }: { id: (name: string) => string }) {
  return (
    <radialGradient id={id("dawn")}>
      <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.85 }} />
      <stop offset="0.45" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.3 }} />
      <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
    </radialGradient>
  );
}

/**
 * Mahāgaṇapati: a light ruddy as the dawn ringed by nine of his ten things
 * (all but `skip`, drawn separately when it is a part of its own), at scale k.
 */
export function Mahaganapati({ x, y, k = 1, url, skip }: Pt & { k?: number; url: (name: string) => string; skip?: GanesaEmblemName }) {
  const ring = round(82 * k);
  return (
    <>
      <circle className="m-breathe" cx={x} cy={y} r={round(64 * k)} fill={url("dawn")} />
      <circle cx={x} cy={y} r={ring} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.6} strokeDasharray="1 3.4" strokeLinecap="round" />
      {ganesaPlaces(x, y, ring)
        .filter((p) => p.name !== skip)
        .map((p, i) => (
          <g key={p.name} transform={`translate(${p.x} ${p.y}) scale(${round(1.4 * k)})`} className={i % 4 === 1 ? TWINKLE[i % 3] : undefined}>
            <GanesaEmblem name={p.name} />
          </g>
        ))}
      <circle cx={x} cy={y} r={round(14 * k)} stroke="var(--gold)" strokeWidth={1} />
      <circle cx={x} cy={y} r={round(8.6 * k)} fill="var(--art-vermilion)" />
      <circle cx={round(x - 2 * k)} cy={round(y - 2 * k)} r={round(2.4 * k)} fill="var(--art-saffron)" />
    </>
  );
}

/* ── Tortoise (kūrma) ──────────────────────────────────────────────────── */

const TORTOISE_SHELL = "M -34 0 C -33 -20 -18 -31 0 -31 C 18 -31 33 -20 34 0 Z";
const TORTOISE_PLATES =
  "M -10 -30 L -12 -16 L 0 -10 L 12 -16 L 10 -30 M -12 -16 L -26 -14 M 12 -16 L 26 -14 M 0 -10 L 0 0 M -12 -16 L -18 0 M 12 -16 L 18 0 M -26 -14 L -32 -6 M 26 -14 L 32 -6";
const TORTOISE_RIM = "M -36 0 Q 0 6 36 0";
const TORTOISE_BODY =
  "M 32 -3 C 40 -6 46 -10 52 -9 C 57 -8 58 -3 54 -1 C 50 1 44 1 36 2 Z M -32 0 L -40 4 L -33 4 Z M -24 1 L -27 9 L -19 9 L -18 2 Z M 18 1 L 20 9 L 27 9 L 25 2 Z M -6 2 L -8 8 L -2 8 L -1 2 Z";

/** A tortoise in profile facing right, its shell's rim on the origin's line, about 100 long. */
export function Tortoise() {
  return (
    <>
      <path d={TORTOISE_BODY} fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
      <circle cx={50} cy={-6} r={1.2} fill="var(--art-carve)" />
      <path d={TORTOISE_SHELL} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.2} />
      <path d={TORTOISE_SHELL} fill="var(--art-saffron)" fillOpacity={0.18} />
      <path d={TORTOISE_PLATES} stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
      <path d={TORTOISE_RIM} stroke="var(--gold)" strokeWidth={1.6} />
    </>
  );
}

/* ── Horse (aśva) ──────────────────────────────────────────────────────── */

/** A horse in the flying gallop, facing right, centred on its body: about 66 long. */
const HORSE_BODY =
  "M -15 -2 C -15 -8 -8 -9 0 -8.4 C 6 -8 10 -9 13 -10 L 19 -20 C 21 -24 25 -26 28 -24 L 33 -17 C 34 -15 32 -13.6 30.4 -14.6 L 25 -17 C 23 -12 19 -6 15 -2 C 12 3 6 5 -2 5 C -9 5 -15 3 -15 -2 Z";
const HORSE_LEGS = "M 12 1 L 22 4 L 30 1.6 M 8 3 L 17 8.6 L 25 9 M -11 2 L -20 6.6 L -29 5 M -8 4 L -15 10.6 L -24 12";
const HORSE_TAIL = "M -14 -3 C -20 -7 -27 -4 -33 -9";
const HORSE_MANE = "M 13 -11.6 C 15 -15.4 17 -19 20.4 -22.6";
const HORSE_SADDLE = "M -6 -8.2 C -2 -8.8 3 -8.6 6.4 -8.4 L 5.4 1.6 L -5 1.8 Z";

export function Horse({ fill }: { fill: string }) {
  return (
    <>
      <path d={HORSE_TAIL} stroke={fill} strokeWidth={2.4} strokeLinecap="round" />
      <path d={HORSE_LEGS} stroke={fill} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d={HORSE_BODY} fill={fill} stroke="var(--art-musk)" strokeWidth={0.4} strokeOpacity={0.5} />
      <path d={HORSE_MANE} stroke="var(--art-vermilion)" strokeWidth={2} strokeLinecap="round" />
      <path d={HORSE_SADDLE} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.5} />
      <circle cx={27} cy={-21} r={0.9} fill="var(--art-musk)" />
    </>
  );
}

/* ── Boar (kiri, varāha) ───────────────────────────────────────────────── */

/** A boar (kiri, varāha) facing right, feet on the origin's line, about 76 long. */
const BOAR_BODY =
  "M -31 -9 C -37 -15 -37 -27 -29 -31 C -19 -37 -3 -41 9 -41 C 18 -41 24 -35 28 -29 L 37 -22 C 39 -20 39 -17 37.5 -15.5 C 33 -14.5 29 -14.5 26 -15 C 22 -14 18 -12 16 -9 C 10 -7 -4 -7 -14 -8 C -20 -8 -26 -8 -31 -9 Z";
const BOAR_LEGS = "M 11 -10 L 11 0 M 16.5 -10 L 17 0 M -24 -10 L -25 0 M -17 -9 L -17 0";
const BOAR_BRISTLES = Array.from({ length: 9 }, (_, k) => {
  const x = -14 + k * 4;
  const y = round(-37.5 - 3.5 * Math.sin(((k + 1) / 10) * Math.PI));
  return `M ${x} ${y + 3} L ${x + 1.5} ${y - 2}`;
}).join(" ");

export function Boar() {
  return (
    <>
      <path d={BOAR_BODY} fill="var(--gold)" />
      <path d={BOAR_LEGS} stroke="var(--gold)" strokeWidth={4} strokeLinecap="round" />
      <path d={BOAR_BRISTLES} stroke="var(--gold)" strokeWidth={1.4} strokeLinecap="round" />
      <path d="M 28 -17.5 C 31 -21 32 -23.5 30 -27" stroke="var(--art-ivory)" strokeWidth={2.2} strokeLinecap="round" />
      <path d="M 21 -35 L 19.5 -44 L 25.5 -37.5 Z" fill="var(--gold)" />
      <circle cx={26} cy={-28} r={1.4} fill="var(--art-carve)" />
      <path d="M -31 -26 C -36 -26 -38 -22 -36 -18" stroke="var(--gold)" strokeWidth={1.6} strokeLinecap="round" />
    </>
  );
}

/* ── Lamp (dīpa) ───────────────────────────────────────────────────────── */

const LAMP_BOWL = "M -4.4 0 Q 0 4 4.4 0 Z";
const LAMP_FLAME = "M 0 -0.6 C -2.8 -2.6 -2.2 -7.4 0 -11.6 C 2.2 -7.4 2.8 -2.6 0 -0.6 Z";
const LAMP_FLAME_CORE = "M 0 -1.4 C -1.3 -2.6 -1 -5 0 -7 C 1 -5 1.3 -2.6 0 -1.4 Z";
const LAMP_FLICKER = ["m-flicker", "m-flicker m-late", "m-flicker m-later"];

/** A small lamp held up in praise, bowl on the origin; `seer` gives the seers' pale flame instead of the gods'. */
export function Lamp({ k, seer = false }: { k: number; seer?: boolean }) {
  return (
    <>
      <path d={LAMP_BOWL} fill="var(--gold)" stroke="var(--art-musk)" strokeWidth={0.4} strokeOpacity={0.5} />
      <g className={LAMP_FLICKER[k]}>
        <path d={LAMP_FLAME} fill={seer ? "var(--art-moon)" : "var(--art-saffron)"} />
        <path d={LAMP_FLAME_CORE} fill={seer ? "var(--art-ivory)" : "var(--art-core)"} />
      </g>
    </>
  );
}

/* ── A cluster of the mantra (kūṭa) ────────────────────────────────────── */

/** A summit (kūṭa) of the mantra: `n` syllables up the flanks of a peak, the last at its top. */
export function summit(at: Pt, n: number, foot: number, rise: number) {
  const top = { x: at.x, y: at.y - rise };
  const others = n - 1;
  const left = Math.ceil(others / 2);
  const flank = (side: number, count: number) =>
    Array.from({ length: count }, (_, i) => {
      const s = count === 1 ? 0.45 : 0.14 + (0.56 * i) / (count - 1);
      return { x: round(at.x + side * foot * (1 - s)), y: round(at.y - rise * s) };
    });
  return {
    path: `M ${at.x - foot} ${at.y} L ${top.x} ${top.y} L ${at.x + foot} ${at.y}`,
    lights: [...flank(-1, left), ...flank(1, others - left).reverse()],
    top,
  };
}
export type SummitShape = ReturnType<typeof summit>;

const SUMMIT_TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/** A cluster as its peak: the syllables as lights on the flanks, and ह्रीं, which closes every cluster, on a gold disc at the top. */
export function Summit({ s, glow }: { s: SummitShape; glow: string }) {
  return (
    <>
      <path d={s.path} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.6} strokeDasharray="1.5 3" strokeLinecap="round" strokeLinejoin="round" />
      {s.lights.map((l, i) => (
        <g key={i} className={SUMMIT_TWINKLE[i % 3]}>
          <circle cx={l.x} cy={l.y} r={14} fill={glow} />
          <circle cx={l.x} cy={l.y} r={4.2} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.8} />
        </g>
      ))}
      <circle className="m-breathe" cx={s.top.x} cy={s.top.y} r={30} fill={glow} />
      <circle cx={s.top.x} cy={s.top.y} r={13} fill="var(--gold)" stroke="var(--gold-soft)" strokeWidth={1.2} />
      <text
        x={s.top.x}
        y={s.top.y + 1}
        fontSize={13}
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--art-carve)"
        style={{ fontFamily: "var(--font-tiro), serif" }}
      >
        ह्रीं
      </text>
    </>
  );
}

/* ── A cup of nectar ───────────────────────────────────────────────────── */

const CUP_BOWL = `M -20 -12 C -20 4 -10 10 0 10 C 10 10 20 4 20 -12 Z`;
const CUP_FOOT = "M -4 10 L -6 18 L 6 18 L 4 10 Z M -12 18 L 12 18 L 12 21 L -12 21 Z";

/** A small footed gold cup brimming with nectar, the brim 12 above the origin, in its moon glow. */
export function NectarCup({ glow }: { glow: string }) {
  return (
    <>
      <circle className="m-shimmer" cy={-12} r={34} fill={glow} />
      <path d={CUP_FOOT} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
      <path d={CUP_BOWL} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
      <path d="M -15 -2 C -8 3 8 3 15 -2" stroke="var(--gold-soft)" strokeWidth={1} />
      <ellipse cy={-12} rx={20} ry={4.4} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} />
      <ellipse cy={-12} rx={11} ry={2.2} fill="var(--art-moon)" fillOpacity={0.6} />
    </>
  );
}

/* ── The subtle body: its centres and knots ────────────────────────────── */

/** A centre (cakra) on the channel: its height, petal count, element and the radii of its petals. */
export type Cakra = { y: number; petals: number; sign: Tattva; r0: number; r1: number };

/** A knot as a cord wound round the channel, seen a little from above, cut through at the front; one half of it. */
const KNOT_HALF = "M 0 -7 A 26 7 0 0 0 -26 0 A 26 7 0 0 0 -7 6.7 M -7 6.7 L -4 11 M -7 6.7 L -2.6 8.4 M -7 6.7 L -5.6 11.6";

/** A knot (granthi) across the channel, split: its two halves pushed apart, musk with a moon hairline. */
export function SplitKnot({ x, y }: { x: number; y: number }) {
  return (
    <>
      {[-1, 1].map((side) => (
        <g key={side} transform={`translate(${x + side * 6} ${y}) scale(${-side} 1)`}>
          <path d={KNOT_HALF} stroke="var(--art-musk)" strokeWidth={2.4} strokeLinecap="round" />
          <path d={KNOT_HALF} stroke="var(--art-moon)" strokeWidth={0.5} strokeOpacity={0.7} strokeLinecap="round" />
        </g>
      ))}
    </>
  );
}

/** A centre as a small lotus seen face on, its petals in its colour round a gold circle; dimmed when unlit. */
export function CakraLotus({ x, c, lit, petal, glow }: { x: number; c: Cakra; lit: boolean; petal: string; glow?: string }) {
  return (
    <g transform={`translate(${x} ${c.y})`}>
      {glow && <circle r={c.r1 + 16} fill={glow} />}
      <path d={yantraPetals(c.petals, c.r0, c.r1)} fill={petal} fillOpacity={lit ? 0.75 : 0.18} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={lit ? 0.9 : 0.35} />
      <circle r={c.r0} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={lit ? 0.9 : 0.35} />
    </g>
  );
}

/* ── The axe (paraśu, kuṭhāra) ─────────────────────────────────────────── */

const AXE_BLADE = "M 2 -22 C 12 -26 20 -20 22 -12 C 18 -12 13 -11 9 -8 C 8 -12 5 -15 2 -14 Z";

/** A small axe, upright, centred on the origin: a turmeric haft 48 long and a broad moon crescent blade on one side near its top. */
export function Axe() {
  return (
    <>
      <path d="M 0 -24 V 24" stroke="var(--art-turmeric)" strokeWidth={2.6} strokeLinecap="round" />
      <path d="M 0 -24 V 24" stroke="var(--gold)" strokeWidth={0.6} />
      <path d={AXE_BLADE} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
      <path d="M -1.6 -20 H 3 M -1.6 -12 H 3" stroke="var(--gold)" strokeWidth={1.2} />
    </>
  );
}

/* ── A lamp in a windless place ────────────────────────────────────────── */

/** The `Lamp`'s bowl on the origin with a narrower flame that does not flicker: the mind held still (Gītā 6.19). */
export function StillLamp() {
  return (
    <>
      <path d={LAMP_BOWL} fill="var(--gold)" stroke="var(--art-musk)" strokeWidth={0.4} strokeOpacity={0.5} />
      <path d="M 0 -0.6 C -1.6 -3 -1.4 -7 0 -11.6 C 1.4 -7 1.6 -3 0 -0.6 Z" fill="var(--art-saffron)" />
      <path d="M 0 -1.4 C -0.8 -3 -0.6 -5 0 -7.4 C 0.6 -5 0.8 -3 0 -1.4 Z" fill="var(--art-core)" />
    </>
  );
}

/* ── A lotus leaf that water does not wet ──────────────────────────────── */

const PAD = { rx: 34, ry: 10 };
const PAD_D = `M 0 0 L ${-PAD.rx * 0.2} ${-PAD.ry} A ${PAD.rx} ${PAD.ry} 0 1 0 ${PAD.rx * 0.2} ${-PAD.ry} Z`;
const PAD_VEINS = Array.from({ length: 9 }, (_, k) => {
  const a = (Math.PI * 2 * (k + 0.5)) / 9 + Math.PI / 2 + 0.35;
  return `M 0 0 L ${round(Math.cos(a) * PAD.rx * 0.82)} ${round(Math.sin(a) * PAD.ry * 0.82)}`;
}).join(" ");
const PAD_BEADS = [
  { x: -14, y: -1, r: 3.4 },
  { x: 2, y: 3, r: 2.6 },
  { x: 16, y: -2, r: 2.2 },
  { x: 33, y: 2, r: 1.8 },
];

const PAD_TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/**
 * A lotus leaf floating flat, seen at a slant, centred on the origin (about 68
 * by 20), with water standing on it in beads and one at the very edge: what is
 * in the world and not smeared by it (padmapatram ivāmbhasā, Gītā 5.10).
 */
export function LotusLeaf() {
  return (
    <>
      <path d={PAD_D} fill="var(--leaf)" fillOpacity={0.85} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.6} strokeLinejoin="round" />
      <path d={PAD_VEINS} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.55} />
      {PAD_BEADS.map((b, i) => (
        <g key={i} className={PAD_TWINKLE[i % 3]}>
          <circle cx={b.x} cy={b.y - b.r * 0.6} r={b.r} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
          <circle cx={round(b.x - b.r * 0.35)} cy={round(b.y - b.r)} r={round(b.r * 0.3)} fill="var(--art-moon)" />
        </g>
      ))}
    </>
  );
}

/* ── Hibiscus (japā) ───────────────────────────────────────────────────── */

export const HIBISCUS_R = 64;

/** One broad petal of the hibiscus, base at the origin, pointing up, its rim a little ruffled. */
const HIBISCUS_PETAL = [
  "M 0 0",
  "C -10 -10 -34 -26 -38 -44",
  "C -41 -58 -26 -67 -12 -64",
  "C -6 -66 -2 -62 1 -65",
  "C 5 -68 10 -66 15 -65",
  "C 30 -64 41 -54 37 -40",
  "C 34 -26 10 -8 0 0",
  "Z",
].join(" ");
const HIBISCUS_VEINS = [-24, -12, 0, 12, 24]
  .map((x) => `M ${round(x * 0.15)} -14 Q ${round(x * 0.7)} -34 ${x} ${-52 + Math.abs(x) * 0.25}`)
  .join(" ");
/** The sheen down the middle of each petal, where it catches the light. */
const HIBISCUS_SHEEN = "M 1 -20 C 2 -32 3 -44 1 -56";

/**
 * A hibiscus seen face on, centred on `c` (petals of radius 64): five petals
 * turned in a pinwheel, and the staminal column leaning up and out to the
 * right, dusted with pollen and tipped with five stigma pads.
 */
export function hibiscus(c: Pt) {
  const petals = Array.from({ length: 5 }, (_, k) => `translate(${c.x} ${c.y}) rotate(${8 + k * 72})`);
  const tip = polar(c.x, c.y, 76, 24);
  const column = `M ${c.x} ${c.y} C ${c.x + 18} ${c.y - 2} ${c.x + 44} ${c.y - 14} ${tip.x} ${tip.y}`;
  const pollen = [0.62, 0.68, 0.74, 0.8, 0.86].flatMap((t, i) => {
    const x = c.x + (tip.x - c.x) * t;
    const y = c.y + (tip.y - c.y) * t;
    return [
      { x: round(x - 2), y: round(y - 4 - (i % 2)) },
      { x: round(x + 2), y: round(y + 3 + (i % 2)) },
    ];
  });
  const stigma = Array.from({ length: 5 }, (_, k) => polar(tip.x + 2, tip.y - 1, 4, 18 + k * 72));
  return { c, petals, column, pollen, stigma };
}

export type HibiscusShape = ReturnType<typeof hibiscus>;

/** The petals' fill, `--art-crimson` at the eye to `--art-vermilion`; its id is `hibiscus`. */
export function HibiscusGradient({ h, id }: { h: HibiscusShape; id: (name: string) => string }) {
  return (
    <radialGradient id={id("hibiscus")} cx={h.c.x} cy={h.c.y} r={HIBISCUS_R} gradientUnits="userSpaceOnUse">
      <stop offset="0" style={{ stopColor: "var(--art-crimson)" }} />
      <stop offset="0.28" style={{ stopColor: "var(--art-crimson)" }} />
      <stop offset="0.46" style={{ stopColor: "var(--art-vermilion)" }} />
      <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
    </radialGradient>
  );
}

export function Hibiscus({ h, url }: { h: HibiscusShape; url: (name: string) => string }) {
  return (
    <>
      <g fill={url("hibiscus")} stroke="var(--art-crimson)" strokeWidth={0.8} strokeOpacity={0.7} strokeLinejoin="round">
        {h.petals.map((t, i) => (
          <path key={i} d={HIBISCUS_PETAL} transform={t} />
        ))}
      </g>
      <g stroke="var(--art-crimson)" strokeWidth={0.6} strokeOpacity={0.5} strokeLinecap="round">
        {h.petals.map((t, i) => (
          <path key={i} d={HIBISCUS_VEINS} transform={t} />
        ))}
      </g>
      <g stroke="var(--art-saffron)" strokeWidth={2.4} strokeOpacity={0.55} strokeLinecap="round">
        {h.petals.map((t, i) => (
          <path key={i} d={HIBISCUS_SHEEN} transform={t} />
        ))}
      </g>
      <path d={h.column} stroke="var(--gold-soft)" strokeWidth={2.6} strokeLinecap="round" />
      <g fill="var(--art-core)">
        {h.pollen.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={1.7} />
        ))}
      </g>
      <g fill="var(--art-crimson)">
        {h.stigma.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={2.4} />
        ))}
      </g>
    </>
  );
}

/* ── Crystal (sphaṭika) ────────────────────────────────────────────────── */

const CRYSTAL_BODY = "M 0 -26 L 7 -16 L 7 14 L 0 22 L -7 14 L -7 -16 Z";
const CRYSTAL_FACETS = "M 0 -26 L 0 22 M -7 -16 L 7 -16 M -7 14 L 7 14 M -7 -16 L 0 -10 L 7 -16 M -7 14 L 0 8 L 7 14";

/** The crystal's fill (`crystal`) and its soft glow (`clear`). */
export function CrystalDefs({ id }: { id: (name: string) => string }) {
  return (
    <>
      <linearGradient id={id("crystal")} x1={0} y1={0} x2={1} y2={1}>
        <stop offset="0" style={{ stopColor: "var(--art-ivory)", stopOpacity: 0.95 }} />
        <stop offset="0.5" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.6 }} />
        <stop offset="1" style={{ stopColor: "var(--art-ivory)", stopOpacity: 0.9 }} />
      </linearGradient>
      <radialGradient id={id("clear")}>
        <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.45 }} />
        <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
      </radialGradient>
    </>
  );
}

/** A clear crystal, an upright hexagonal prism with pointed ends, 14 wide and 48 tall, centred on (x, y), in a soft moon glow. */
export function Crystal({ x, y, url }: Pt & { url: (name: string) => string }) {
  return (
    <>
      <ellipse className="m-shimmer" cx={x} cy={y} rx={22} ry={32} fill={url("clear")} />
      <g transform={`translate(${x} ${y})`} strokeLinejoin="round">
        <path d={CRYSTAL_BODY} fill={url("crystal")} stroke="var(--gold)" strokeWidth={0.9} />
        <path d={CRYSTAL_FACETS} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.8} />
        <path className="m-twinkle" d={glint(5)} transform="translate(-3 -14)" fill="var(--art-ivory)" />
      </g>
    </>
  );
}

/* ── The couch of the five Brahmās (pañcabrahmāsana) ───────────────────── */

const BRAHMAS = [
  { dx: -48, god: "brahma", fill: "var(--art-vermilion)" },
  { dx: -16, god: "visnu", fill: "var(--art-hair)" },
  { dx: 16, god: "rudra", fill: "var(--art-moon)" },
  { dx: 48, god: "isvara", fill: "var(--gold)" },
];

/** The four gods' emblems, each drawn round the origin within a radius of about 5. */
function BrahmaEmblem({ god }: { god: string }) {
  if (god === "brahma")
    return (
      <g fill="var(--art-core)">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse key={deg} cy={-2.6} rx={1.3} ry={2.6} transform={`rotate(${deg})`} />
        ))}
      </g>
    );
  if (god === "visnu")
    return (
      <g stroke="var(--art-core)" strokeWidth={0.8}>
        <circle r={4.2} />
        <path d="M -4.2 0 H 4.2 M 0 -4.2 V 4.2 M -3 -3 L 3 3 M 3 -3 L -3 3" strokeWidth={0.5} />
      </g>
    );
  if (god === "rudra")
    return <path d="M 0 5 V -4 M -3.4 -4.6 C -3.4 -1 -1.5 0 0 0 C 1.5 0 3.4 -1 3.4 -4.6 M 0 -4 L -1 -2.4 M 0 -4 L 1 -2.4" stroke="var(--art-hair)" strokeWidth={0.9} strokeLinecap="round" />;
  return <path d="M -4.4 -3.4 Q 0 -5 4.4 -3.4 L 3.6 4 Q 1.6 2.4 0 4 Q -1.6 2.4 -3.6 4 Z" fill="var(--art-core)" fillOpacity={0.85} />;
}

/**
 * The couch of the five Brahmās, centred on `cx`: a white plank (Sadāśiva),
 * 112 wide, its top at `plank`, on four gold legs standing on `floor`, each
 * with a medallion of its god, from the left Brahmā, Viṣṇu, Rudra and Īśvara.
 */
export function BrahmaCouch({ cx, plank, floor }: { cx: number; plank: number; floor: number }) {
  const legTop = plank + 7;
  const medal = legTop + 9;
  return (
    <>
      {BRAHMAS.map(({ dx, god, fill }) => {
        const x = cx + dx;
        return (
          <g key={god}>
            <path d={`M ${x - 3} ${legTop} L ${x + 3} ${legTop} L ${x + 2} ${floor} L ${x - 2} ${floor} Z`} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
            <circle cx={x} cy={medal} r={6.4} fill={fill} stroke="var(--gold)" strokeWidth={1} />
            <g transform={`translate(${x} ${medal}) scale(0.95)`}>
              <BrahmaEmblem god={god} />
            </g>
          </g>
        );
      })}
      <rect x={cx - 56} y={plank} width={112} height={7} rx={2} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1} />
      <path d={`M ${cx - 52} ${plank + 2.2} H ${cx + 52}`} stroke="var(--gold-soft)" strokeWidth={0.7} />
    </>
  );
}

/* ── A plait (veṇī) ────────────────────────────────────────────────────── */

/** Rotation (degrees) that turns a local "down" (+y) along the tangent t. */
export const downAlong = (t: Pt) => round((Math.atan2(-t.x, t.y) * 180) / Math.PI);

/**
 * A plait along a cubic centreline: lobes of hair laid alternately from each side, `step` apart
 * from `start` units down, `width(s, length)` wide `s` units down it. Each lobe gives its shape, its
 * gold sheen and its placement (`at`), and where a flower goes on it (`c`, `t`, `side`, `s`); `tip`
 * is the end of the centreline and its direction, for `PlaitTip`.
 */
export function plait(curve: [Pt, Pt, Pt, Pt], width: (s: number, length: number) => number, step = 15, start = 6) {
  const samples: { p: Pt; s: number }[] = [];
  let s = 0;
  let prev = curve[0];
  for (let i = 0; i <= 300; i++) {
    const p = cubicAt(...curve, i / 300);
    s += Math.hypot(p.x - prev.x, p.y - prev.y);
    samples.push({ p, s });
    prev = p;
  }
  const length = samples[samples.length - 1].s;
  const along = (at: number) => {
    const found = samples.findIndex((e) => e.s >= at);
    const i = Math.max(1, found < 0 ? samples.length - 1 : found);
    const a = samples[i - 1].p;
    const b = samples[i].p;
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    const t = { x: (b.x - a.x) / len, y: (b.y - a.y) / len };
    return { p: b, t, n: { x: -t.y, y: t.x } };
  };
  const lobes = Array.from({ length: Math.floor((length - 2 * start) / step) + 1 }, (_, i) => {
    const at = start + i * step;
    const { p, n, t } = along(at);
    const side = i % 2 ? 1 : -1;
    const w = width(at, length);
    const c = { x: round(p.x + n.x * side * w * 0.2), y: round(p.y + n.y * side * w * 0.2) };
    const len = round(w * 0.5);
    return {
      s: at,
      side,
      c,
      t,
      lobe: `M 0 ${-len} A ${round(len * 0.44)} ${len} 0 1 1 0 ${len} A ${round(len * 0.44)} ${len} 0 1 1 0 ${-len} Z`,
      sheen: `M ${round(len * 0.12)} ${round(-len * 0.72)} Q ${round(len * 0.46)} 0 ${round(len * 0.12)} ${round(len * 0.72)}`,
      at: `translate(${c.x} ${c.y}) rotate(${round(downAlong(t) - side * 36)})`,
    };
  });
  return { length, lobes, tip: along(length) };
}

export type PlaitShape = ReturnType<typeof plait>;

/** The plait's lobes in `--art-hair`, each with its `--gold-soft` sheen. */
export function PlaitLobes({ p }: { p: PlaitShape }) {
  return (
    <>
      <g fill="var(--art-hair)">
        {p.lobes.map((l, i) => (
          <path key={i} d={l.lobe} transform={l.at} />
        ))}
      </g>
      <g stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.6} strokeLinecap="round">
        {p.lobes.map((l, i) => (
          <path key={i} d={l.sheen} transform={l.at} />
        ))}
      </g>
    </>
  );
}

const PLAIT_TIP_STRANDS = [-6, -4, -2, 0, 2, 4, 6];

/** The plait's end: a gold binding and a small tuft of loose hair below it. */
export function PlaitTip({ p }: { p: PlaitShape }) {
  return (
    <g transform={`translate(${round(p.tip.p.x)} ${round(p.tip.p.y)}) rotate(${downAlong(p.tip.t)})`}>
      <g stroke="var(--art-hair)" strokeWidth={1.1} strokeLinecap="round">
        {PLAIT_TIP_STRANDS.map((x) => (
          <path key={x} d={`M ${x} 2 Q ${round(x * 1.3)} 16 ${round(x * 1.7 + 3)} ${round(30 - Math.abs(x) * 0.8)}`} />
        ))}
      </g>
      <rect x={-10} y={-3} width={20} height={7} rx={1.5} fill="var(--gold)" />
      <path d="M -10 0.5 H 10" stroke="var(--art-carve)" strokeWidth={0.6} />
    </g>
  );
}

/* ── Brahmā on his lotus ───────────────────────────────────────────────── */

/** His four faces as four flames toward the quarters: left, back, right, and front. */
const BRAHMA_FACES = [
  { x: -14, y: -11, lean: -3, s: 0.8, rot: -16 },
  { x: 0, y: -16, lean: 0, s: 0.66, rot: 0 },
  { x: 14, y: -11, lean: 3, s: 0.8, rot: 16 },
  { x: 0, y: -7, lean: 0, s: 1, rot: 0 },
];

/** The saffron glow round Brahmā (`brahma`), for the `<defs>` of an artwork that draws `BrahmaLotus`. */
export function BrahmaLotusDefs({ id }: { id: (name: string) => string }) {
  return (
    <radialGradient id={id("brahma")}>
      <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.75 }} />
      <stop offset="0.5" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.22 }} />
      <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
    </radialGradient>
  );
}

/**
 * Brahmā on his lotus, never as a figure: a crimson-veined open lotus 126 across, centred on the
 * origin, with his four faces as four small vermilion flames on its seed head, in a shimmering
 * saffron glow of radius 58 centred 10 above the origin.
 */
export function BrahmaLotus({ url }: { url: (name: string) => string }) {
  return (
    <>
      <circle className="m-shimmer" cy={-10} r={58} fill={url("brahma")} />
      <g transform="scale(1.4)">
        <OpenLotus pad={false} shade="var(--art-crimson)" />
      </g>
      {BRAHMA_FACES.map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${f.rot}) scale(${f.s * 1.25})`}>
          <path d={tongue(17, 8, f.lean)} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.7} strokeLinejoin="round" />
          <path d={tongue(8, 3.6, f.lean * 0.5)} fill="var(--art-core)" fillOpacity={0.9} />
        </g>
      ))}
    </>
  );
}

/* ── Kolam ─────────────────────────────────────────────────────────────── */

/**
 * A kolam in rice flour: the line `d` in `--art-ivory` over a faint musk line so it shows by day,
 * and its dots (pulli) in ivory touched with gold. Its shape is the artwork's own.
 */
export function Kolam({ d, dots, line = 1.1, dot = 1.6 }: { d: string; dots: Pt[]; line?: number; dot?: number }) {
  return (
    <>
      <path d={d} stroke="var(--art-musk)" strokeWidth={round(line + 0.9)} strokeOpacity={0.3} strokeLinejoin="round" />
      <path d={d} stroke="var(--art-ivory)" strokeWidth={line} strokeOpacity={0.9} strokeLinejoin="round" />
      {dots.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={dot} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.3} />
      ))}
    </>
  );
}

/* ── Elephant (gaja) ───────────────────────────────────────────────────── */

/** An elephant facing right, standing on the origin, about 110 long and 88 to the top of its back. */
const ELEPHANT_BODY =
  "M -52 -58 C -50 -80 -30 -88 -6 -86 C 14 -84 22 -92 36 -90 C 50 -88 58 -78 56 -64 L 52 -50 C 50 -46 47 -44 44 -42 L 46 0 L 30 0 L 30 -34 C 10 -30 -14 -30 -32 -34 L -32 0 L -50 0 L -52 -40 C -54 -46 -54 -52 -52 -58 Z";
const ELEPHANT_FAR_LEGS = "M 38 -36 L 38 -2 L 52 -2 L 50 -40 Z M -42 -36 L -42 -2 L -28 -2 L -26 -36 Z";
/** Trunks: raised in a curl to hold up a pot, or hanging, curled at the tip. */
export const ELEPHANT_TRUNK = {
  raised: "M 50 -70 C 66 -76 76 -96 70 -116 C 68 -124 60 -126 57 -120 C 56 -116 60 -114 62 -116 C 64 -100 58 -80 48 -56 Z",
  down: "M 50 -70 C 60 -66 62 -50 60 -30 C 60 -22 62 -16 66 -14 C 64 -11 58 -13 56 -20 C 54 -34 54 -50 46 -56 Z",
};
const ELEPHANT_TOES = [34, 39, 44, -48, -43, -38].map((x) => `M ${x - 1.6} -0.8 A 1.6 1.6 0 0 1 ${x + 1.6} -0.8`).join(" ");
const ELEPHANT_BROW_CHAIN = "M 30 -88 Q 44 -82 54 -70";
const ELEPHANT_EAR = "M 24 -80 C 8 -80 4 -56 12 -46 C 20 -40 30 -48 32 -58 C 32 -68 30 -76 24 -80 Z";
const ELEPHANT_TUSK = "M 46 -50 C 54 -46 62 -46 66 -54";
const ELEPHANT_CLOTH = "M -38 -80 C -22 -88 2 -88 14 -84 L 12 -50 C -6 -46 -24 -46 -40 -50 Z";
const ELEPHANT_CLOTH_FRINGE = Array.from({ length: 9 }, (_, k) => {
  const x = round(-38 + k * 6.2);
  return `M ${x} -49 L ${x} -45`;
}).join(" ");
const ELEPHANT_TAIL = "M -52 -56 C -58 -46 -58 -36 -55 -26";

/** The elephant's slate hide (`hide`), a little paler toward its back. */
export function ElephantDefs({ id }: { id: (name: string) => string }) {
  return (
    <linearGradient id={id("hide")} x1={0} y1={-90} x2={0} y2={0} gradientUnits="userSpaceOnUse">
      <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.78 }} />
      <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.95 }} />
    </linearGradient>
  );
}

/**
 * An elephant in profile facing right, standing on the origin: slate hide
 * edged in gold, ivory toenails and tusk, a dotted gold chain across the
 * brow, a red caparison. `children` are drawn over it, in its frame.
 */
export function Elephant({ trunk, url, children }: { trunk: string; url: (name: string) => string; children?: ReactNode }) {
  return (
    <>
      <path d={ELEPHANT_FAR_LEGS} fill="var(--art-hair)" fillOpacity={0.6} />
      <path d={ELEPHANT_TAIL} stroke="var(--art-hair)" strokeWidth={2} strokeLinecap="round" />
      <path d={ELEPHANT_BODY} fill={url("hide")} stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
      <path d={trunk} fill={url("hide")} stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
      <path d={ELEPHANT_TOES} stroke="var(--art-ivory)" strokeWidth={1} />
      <path d={ELEPHANT_BROW_CHAIN} stroke="var(--gold)" strokeWidth={1.6} strokeDasharray="0.1 3.4" strokeLinecap="round" />
      <path d={ELEPHANT_EAR} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.7} />
      <path d={ELEPHANT_CLOTH} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={1.1} strokeLinejoin="round" />
      <path d={ELEPHANT_CLOTH_FRINGE} stroke="var(--gold)" strokeWidth={1} strokeLinecap="round" />
      <path d={ELEPHANT_TUSK} stroke="var(--art-ivory)" strokeWidth={3} strokeLinecap="round" />
      <circle cx={42} cy={-74} r={1.6} fill="var(--art-core)" />
      {children}
    </>
  );
}

/* ── Balance (tulā) ────────────────────────────────────────────────────── */

const BALANCE_CX = 320;
const BALANCE_PIVOT = { x: BALANCE_CX, y: 150 };
const BALANCE_HALF = 150;
const BALANCE_RING_DROP = 11;
/** Each pan of a balance: a shallow bowl, `rx` across, `ry` deep at its rim, `depth` to its foot. */
export const BALANCE_PAN = { rx: 60, ry: 12, depth: 24 };

function balancePanShapes(end: Pt, { x, y }: Pt) {
  const { rx, ry, depth } = BALANCE_PAN;
  const ringY = end.y + BALANCE_RING_DROP;
  const top = round(ringY + 4);
  return {
    hook: `M ${end.x} ${end.y + 3} V ${round(ringY - 4)}`,
    ring: { x: end.x, y: ringY },
    cords: `M ${x} ${top} L ${x - rx + 1} ${y} M ${x} ${top} L ${x + rx - 1} ${y}`,
    backCord: `M ${x} ${top} L ${x} ${y - ry}`,
    bowl: `M ${x - rx} ${y} A ${rx} ${ry} 0 0 0 ${x + rx} ${y} C ${x + rx - 2} ${y + 16} ${round(x + 30)} ${y + depth} ${x} ${y + depth} C ${round(x - 30)} ${y + depth} ${x - rx + 2} ${y + 16} ${x - rx} ${y} Z`,
    band: `M ${x - rx + 4} ${y + 6} A ${rx - 4} ${ry} 0 0 0 ${x + rx - 4} ${y + 6}`,
    sheen: `M ${x - rx + 10} ${y + 8} Q ${x - rx + 16} ${y + 18} ${x - 26} ${y + 21}`,
    beads: Array.from({ length: 17 }, (_, k) => {
      const phi = ((10 + k * 10) * Math.PI) / 180;
      return { x: round(x + rx * Math.cos(phi)), y: round(y + ry * Math.sin(phi)) };
    }),
    finial: { x, y: y + depth + 3 },
  };
}

export type BalancePan = { end: Pt; at: Pt; shapes: ReturnType<typeof balancePanShapes> };
export type BalanceGeometry = { tilt: number; pans: [BalancePan, BalancePan] };

/**
 * A balance hung from a chain at x 320, y 0, its pivot at y 150, the beam
 * tipped `tilt` degrees down to the left and each pan hung `cord` below the
 * ring at its end of the beam. Draw it with `Balance`; put things in a pan at
 * `pans[i].at`, swinging with it from `balanceSwing(pans[i].end)`.
 */
export function balance(tilt: number, cord: number): BalanceGeometry {
  const t = (tilt * Math.PI) / 180;
  const pan = (side: -1 | 1): BalancePan => {
    const end = { x: round(BALANCE_CX + side * BALANCE_HALF * Math.cos(t)), y: round(BALANCE_PIVOT.y - side * BALANCE_HALF * Math.sin(t)) };
    const at = { x: end.x, y: round(end.y + BALANCE_RING_DROP + cord) };
    return { end, at, shapes: balancePanShapes(end, at) };
  };
  return { tilt, pans: [pan(-1), pan(1)] };
}

/** Where a pan swings from: the hook under its end of the beam. */
export const balanceSwing = (end: Pt) => swingFrom({ x: end.x, y: end.y + 4 });

/** The beam, drawn level about the pivot and then turned: thickest at the middle, tapering to bud finials. */
const BALANCE_BEAM = "M -144 -3.4 L -16 -6.2 Q 0 -8.4 16 -6.2 L 144 -3.4 L 144 3.4 L 16 6.2 Q 0 8.4 -16 6.2 L -144 3.4 Z";
const BALANCE_BEAM_BANDS = [-100, -54, 54, 100];
const BALANCE_BUD = "M 0 -5.6 C 6 -5.6 12 -3.6 18 0 C 12 3.6 6 5.6 0 5.6 Z";
/** The tongue stands at right angles to the beam, so it leans with it toward the heavier pan. */
const BALANCE_TONGUE = 84;
/** The fork the tongue swings in, hung from the chain; level, the tongue sits under the red mark at its top. */
const BALANCE_FORK = { top: 56, half: 18, bar: 5 };
const BALANCE_CHAIN = Array.from({ length: 4 }, (_, k) => ({ y: 3 + k * 9.6, flat: k % 2 === 1 }));

/**
 * The gold balance of `balance()`: chain, fork, tongue, beam, and both pans.
 * `sway` gives each pan's motion class; `inside` whether its gold-soft inside
 * is drawn (leave it out where the pan is filled).
 */
export function Balance({ b, sway = [undefined, undefined], inside = [true, true] }: { b: BalanceGeometry; sway?: [string | undefined, string | undefined]; inside?: [boolean, boolean] }) {
  const CX = BALANCE_CX;
  const PIVOT = BALANCE_PIVOT;
  const FORK = BALANCE_FORK;
  const PAN = BALANCE_PAN;
  return (
    <>
      <g stroke="var(--gold)" strokeWidth={2}>
        {BALANCE_CHAIN.map((l, k) =>
          l.flat ? (
            <line key={k} x1={CX} y1={l.y - 5} x2={CX} y2={l.y + 5} />
          ) : (
            <ellipse key={k} cx={CX} cy={l.y} rx={3.2} ry={6} />
          ),
        )}
      </g>
      <circle cx={CX} cy={37} r={5.6} stroke="var(--gold)" strokeWidth={2.2} />
      <g fill="var(--gold)">
        <path d={`M ${CX} 42 C ${CX + 8} 45 ${CX + 9} 51 ${CX + 6} ${FORK.top} L ${CX - 6} ${FORK.top} C ${CX - 9} 51 ${CX - 8} 45 ${CX} 42 Z`} />
        <rect x={CX - FORK.half - 8} y={FORK.top} width={2 * FORK.half + 16} height={7} rx={3} />
        <circle cx={CX - FORK.half - 8} cy={FORK.top + 3.5} r={4} />
        <circle cx={CX + FORK.half + 8} cy={FORK.top + 3.5} r={4} />
      </g>
      <path d={`M ${CX - 3.6} ${FORK.top + 7} L ${CX + 3.6} ${FORK.top + 7} L ${CX} ${FORK.top + 15} Z`} fill="var(--art-vermilion)" />

      <g transform={`rotate(${-b.tilt} ${PIVOT.x} ${PIVOT.y})`}>
        <path
          d={`M ${CX - 2.8} ${PIVOT.y} L ${CX - 0.9} ${PIVOT.y - BALANCE_TONGUE + 6} L ${CX} ${PIVOT.y - BALANCE_TONGUE} L ${CX + 0.9} ${PIVOT.y - BALANCE_TONGUE + 6} L ${CX + 2.8} ${PIVOT.y} Z`}
          fill="var(--gold)"
          stroke="var(--art-carve)"
          strokeWidth={0.4}
        />
        <g transform={`translate(${PIVOT.x} ${PIVOT.y})`}>
          <path d={BALANCE_BEAM} fill="var(--gold)" />
          <path d="M -138 0 L 138 0" stroke="var(--art-carve)" strokeWidth={0.7} strokeOpacity={0.8} />
          <g fill="var(--gold-soft)" stroke="var(--art-carve)" strokeWidth={0.4}>
            {BALANCE_BEAM_BANDS.map((x) => (
              <rect key={x} x={x - 3} y={-7} width={6} height={14} rx={2} />
            ))}
          </g>
          <path d={BALANCE_BUD} transform="translate(142 0)" fill="var(--gold)" />
          <path d={BALANCE_BUD} transform="translate(-142 0) scale(-1 1)" fill="var(--gold)" />
          <circle r={12.5} fill="var(--gold)" />
          <circle r={9} stroke="var(--art-carve)" strokeWidth={0.8} />
        </g>
      </g>
      <g fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5}>
        <rect x={CX - FORK.half - FORK.bar} y={FORK.top + 6} width={FORK.bar} height={PIVOT.y - FORK.top} rx={2} />
        <rect x={CX + FORK.half} y={FORK.top + 6} width={FORK.bar} height={PIVOT.y - FORK.top} rx={2} />
      </g>
      <circle cx={PIVOT.x} cy={PIVOT.y} r={4} fill="var(--gold-soft)" stroke="var(--art-carve)" strokeWidth={0.8} />

      {b.pans.map(({ end, at, shapes: s }, i) => (
        <g key={i}>
          <path d={s.hook} stroke="var(--gold)" strokeWidth={2} strokeLinecap="round" />
          <g className={sway[i]} style={balanceSwing(end)}>
            <circle cx={s.ring.x} cy={s.ring.y} r={4} stroke="var(--gold)" strokeWidth={1.6} />
            <path d={s.backCord} stroke="var(--gold-soft)" strokeWidth={0.9} strokeOpacity={0.7} />
            <path d={s.cords} stroke="var(--gold)" strokeWidth={1.3} />
            {inside[i] && <ellipse cx={at.x} cy={at.y} rx={PAN.rx} ry={PAN.ry} fill="var(--gold-soft)" fillOpacity={0.55} />}
            <ellipse cx={at.x} cy={at.y} rx={PAN.rx} ry={PAN.ry} stroke="var(--gold)" strokeWidth={1.6} />
            <path d={s.bowl} fill="var(--gold)" />
            <path d={s.band} stroke="var(--art-carve)" strokeWidth={0.7} />
            <path d={s.sheen} stroke="var(--art-core)" strokeWidth={1.4} strokeOpacity={0.6} strokeLinecap="round" />
            <g fill="var(--gold-soft)">
              {s.beads.map((p, k) => (
                <circle key={k} cx={p.x} cy={p.y} r={1.5} />
              ))}
            </g>
            <circle cx={s.finial.x} cy={s.finial.y} r={3.6} fill="var(--gold)" />
            <path d={`M ${s.finial.x - 2.4} ${s.finial.y + 2.8} L ${s.finial.x} ${s.finial.y + 10} L ${s.finial.x + 2.4} ${s.finial.y + 2.8} Z`} fill="var(--gold)" />
          </g>
        </g>
      ))}
    </>
  );
}

/* ── Śaṅkara's trident, and the drum tied to it ────────────────────────── */

/**
 * Śaṅkara's trident standing on the axis x from its top to its foot, at scale s (1 is its size
 * in Shloka 43), with the drum's place on a cord tied under the prongs.
 */
export function trident(x: number, top: number, foot: number, s = 1) {
  const at = (n: number) => round(n * s);
  const head = [
    `M ${x} ${round(top + at(2))} L ${x} ${round(top + at(44))}`,
    `M ${round(x - at(15))} ${round(top + at(14))} C ${round(x - at(16))} ${round(top + at(34))} ${round(x - at(8))} ${round(top + at(42))} ${x} ${round(top + at(42))}`,
    `M ${round(x + at(15))} ${round(top + at(14))} C ${round(x + at(16))} ${round(top + at(34))} ${round(x + at(8))} ${round(top + at(42))} ${x} ${round(top + at(42))}`,
  ].join(" ");
  const tips = [
    { x, y: round(top - at(4)) },
    { x: round(x - at(15)), y: round(top + at(8)) },
    { x: round(x + at(15)), y: round(top + at(8)) },
  ];
  const tie = { x, y: round(top + at(48)) };
  const drum = { x: round(x + at(20)), y: round(top + at(64)), half: at(12), face: at(8), waist: at(1.8) };
  const d = drum;
  return {
    s,
    shaft: `M ${x} ${round(top + at(40))} L ${x} ${foot}`,
    head,
    guard: `M ${round(x - at(8))} ${round(top + at(44))} L ${round(x + at(8))} ${round(top + at(44))}`,
    tips: tips.map((p) => `M ${p.x} ${p.y} L ${round(p.x + at(3.4))} ${round(p.y + at(9))} L ${round(p.x - at(3.4))} ${round(p.y + at(9))} Z`),
    drum,
    body: `M ${round(d.x - d.face)} ${round(d.y - d.half)} L ${d.x} ${round(d.y - d.waist)} L ${round(d.x + d.face)} ${round(d.y - d.half)} Z M ${round(d.x - d.face)} ${round(d.y + d.half)} L ${d.x} ${round(d.y + d.waist)} L ${round(d.x + d.face)} ${round(d.y + d.half)} Z`,
    cord: `M ${tie.x} ${tie.y} C ${round(tie.x + at(10))} ${round(tie.y + at(2))} ${d.x} ${round(d.y - d.half - at(12))} ${d.x} ${round(d.y - d.half)}`,
    beads: `M ${d.x} ${d.y} C ${round(d.x + at(10))} ${round(d.y + at(2))} ${round(d.x + at(14))} ${round(d.y + at(8))} ${round(d.x + at(15))} ${round(d.y + at(16))}`,
    bead: { x: round(d.x + at(15)), y: round(d.y + at(17)) },
  };
}

export type TridentShape = ReturnType<typeof trident>;

/** The trident: a gold three-pronged head with moon-white tips on a turmeric shaft. Wants round caps. */
export function Trident({ t }: { t: TridentShape }) {
  const w = (n: number) => round(n * t.s);
  return (
    <>
      <path d={t.shaft} stroke="var(--art-turmeric)" strokeWidth={w(3)} />
      <path d={t.shaft} stroke="var(--gold)" strokeWidth={w(0.7)} strokeOpacity={0.8} />
      <path d={t.head} stroke="var(--gold)" strokeWidth={w(2.4)} />
      <path d={t.guard} stroke="var(--gold)" strokeWidth={w(2.4)} />
      {t.tips.map((d, i) => (
        <path key={i} d={d} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={w(0.8)} strokeLinejoin="round" />
      ))}
    </>
  );
}

/**
 * The drum hanging upright from its cord, drawn in at the waist. Wants round joins.
 * `hung={false}` takes it off its cord and leaves out its hanging bead, for a drum in the hand.
 */
export function Damaru({ t, hung = true }: { t: TridentShape; hung?: boolean }) {
  const { drum: d } = t;
  const w = (n: number) => round(n * t.s);
  return (
    <>
      {hung && <path d={t.cord} stroke="var(--art-vermilion)" strokeWidth={w(0.9)} strokeLinecap="round" />}
      <path d={t.body} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={w(1)} />
      <ellipse cx={d.x} cy={round(d.y - d.half)} rx={d.face} ry={w(2.6)} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={w(0.8)} />
      <ellipse cx={d.x} cy={round(d.y + d.half)} rx={d.face} ry={w(2.6)} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={w(0.8)} />
      <path d={`M ${d.x - d.waist - w(1.4)} ${d.y} L ${d.x + d.waist + w(1.4)} ${d.y}`} stroke="var(--art-vermilion)" strokeWidth={w(2.2)} strokeLinecap="round" />
      {hung && (
        <>
          <path d={t.beads} stroke="var(--art-vermilion)" strokeWidth={w(0.8)} strokeLinecap="round" />
          <circle cx={t.bead.x} cy={t.bead.y} r={w(2)} fill="var(--gold)" />
        </>
      )}
    </>
  );
}

/* ── A world-egg ───────────────────────────────────────────────────────── */

/** A world-egg (brahmāṇḍa), broad end down, centred on (x, y), half-width w and half-height h. */
export function eggPath(x: number, y: number, w: number, h: number) {
  const p = round;
  return [
    `M ${p(x)} ${p(y - h)}`,
    `C ${p(x + 0.62 * w)} ${p(y - h)} ${p(x + w)} ${p(y - 0.25 * h)} ${p(x + w)} ${p(y + 0.2 * h)}`,
    `C ${p(x + w)} ${p(y + 0.72 * h)} ${p(x + 0.55 * w)} ${p(y + h)} ${p(x)} ${p(y + h)}`,
    `C ${p(x - 0.55 * w)} ${p(y + h)} ${p(x - w)} ${p(y + 0.72 * h)} ${p(x - w)} ${p(y + 0.2 * h)}`,
    `C ${p(x - w)} ${p(y - 0.25 * h)} ${p(x - 0.62 * w)} ${p(y - h)} ${p(x)} ${p(y - h)} Z`,
  ].join(" ");
}

/* ── Indra's thunderbolt ───────────────────────────────────────────────── */

const VAJRA_END = "M 0 -7 L 0 -25 M -1.6 -8 C -9 -11 -9 -19 0 -24 M 1.6 -8 C 9 -11 9 -19 0 -24 M -3 -7.4 C -14 -9 -15 -18 -8 -21 M 3 -7.4 C 14 -9 15 -18 8 -21";

/** Indra's thunderbolt (vajra), upright: a banded grip and a cage of prongs at each end. Wants a gold stroke and round caps. */
export function Vajra() {
  return (
    <>
      <path d={VAJRA_END} strokeWidth={1.8} />
      <path d={VAJRA_END} transform="scale(1 -1)" strokeWidth={1.8} />
      <rect x={-2.6} y={-7} width={5.2} height={14} rx={2} fill="var(--gold)" strokeWidth={0} />
      <ellipse cx={0} cy={-7} rx={4.6} ry={1.8} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
      <ellipse cx={0} cy={7} rx={4.6} ry={1.8} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
      <circle r={1.6} fill="var(--art-vermilion)" strokeWidth={0} />
    </>
  );
}

/* ── A full pot brimming over ──────────────────────────────────────────── */

const BRIM_POT_BODY = "M -12 -52 C -40 -48 -46 -12 -26 -2 C -16 3 16 3 26 -2 C 46 -12 40 -48 12 -52 Z";
const BRIM_POT_NECK = "M -12 -52 L -10 -60 L 10 -60 L 12 -52 Z";
const BRIM_POT_LIP = "M -17 -64 C -17 -61 17 -61 17 -64 L 15 -60 L -15 -60 Z";
/** A sheet of water spilling over the front of the lip and down the belly, and one thin stream. */
const BRIM_SHEET = "M -15 -63 C -16 -58 -24 -54 -30 -44 C -36 -34 -36 -18 -30 -6 C -28 -2 -26 1 -24 3 L -12 3 C -14 -6 -18 -20 -16 -34 C -14 -46 -8 -56 -4 -62 Z";
const BRIM_STREAM = "M 9 -62 C 12 -57 20 -50 22 -40 C 24 -30 22 -18 20 -8";
const BRIM_DROPS = [
  { x: -18, y: 4 },
  { x: -4, y: 6 },
  { x: 15, y: 2 },
];
const BRIM_TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/**
 * A round-bellied gold water pot standing at the origin, about 64 tall, brimming over: a moon-coloured
 * brim, a sheet of water down the front of the belly and a thin stream at the back, to a puddle with
 * drops. `water` fills the water (a vertical gradient from `--art-moon` to `--art-hair`). With
 * `spill={false}` it is only full to the brim, nothing running over.
 */
export function BrimmingPot({ water, spill = true }: { water: string; spill?: boolean }) {
  return (
    <>
      <ellipse cy={1} rx={34} ry={4} fill="var(--art-musk)" fillOpacity={0.14} />
      <path d={BRIM_POT_NECK} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
      <path d={BRIM_POT_BODY} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
      <path d="M -36 -26 C -14 -18 14 -18 36 -26" stroke="var(--art-vermilion)" strokeWidth={1.6} />
      <path d="M -34 -20 C -12 -12 12 -12 34 -20" stroke="var(--art-vermilion)" strokeWidth={0.6} />
      <path d={BRIM_POT_LIP} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
      <path d="M -15.5 -63.5 C -15.5 -67 15.5 -67 15.5 -63.5 C 15.5 -61 -15.5 -61 -15.5 -63.5 Z" fill="var(--art-moon)" stroke="var(--gold-soft)" strokeWidth={0.5} />
      {spill && (
        <>
          <path className="m-shimmer" d={BRIM_SHEET} fill={water} fillOpacity={0.8} stroke="var(--gold-soft)" strokeWidth={0.5} />
          <path d="M -20 -48 C -26 -38 -26 -24 -22 -12" stroke="var(--art-ivory)" strokeWidth={0.8} strokeOpacity={0.8} strokeLinecap="round" />
          <path d={BRIM_STREAM} stroke="var(--art-hair)" strokeWidth={2.6} strokeOpacity={0.25} strokeLinecap="round" />
          <path className="m-shimmer" d={BRIM_STREAM} stroke="var(--art-moon)" strokeWidth={1.4} strokeLinecap="round" />
          <ellipse cy={3} rx={30} ry={3.4} fill={water} fillOpacity={0.6} stroke="var(--gold-soft)" strokeWidth={0.5} />
          {BRIM_DROPS.map((d, i) => (
            <circle key={i} className={BRIM_TWINKLE[i % 3]} cx={d.x} cy={d.y} r={1.3} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.4} />
          ))}
        </>
      )}
    </>
  );
}

/* ── Cakravāka (ruddy shelduck) ────────────────────────────────────────── */

const CAKRAVAKA_BODY =
  "M -20 -4 C -22 -7 -20 -9 -17 -9 C -10 -13 2 -13 8 -9 C 10 -8 11 -10 10 -14 C 9 -19 11 -25 16 -26 C 21 -27 24 -23 23 -19 L 22 -15.5 C 20 -12 18 -6 14 -2 C 10 0 -12 1 -20 -4 Z";
const CAKRAVAKA_HEAD = "M 10 -14 C 9 -19 11 -25 16 -26 C 21 -27 24 -23 23 -19 L 22 -15.5 C 18 -16 13 -16 10 -14 Z";
const CAKRAVAKA_WING = "M -16 -7 C -8 -12 4 -12 9 -8 C 2 -5 -8 -4 -16 -7 Z";
const CAKRAVAKA_TIP = "M -21 -5 C -19 -10 -13 -11 -10 -8 C -13 -6 -17 -5 -21 -5 Z";

/**
 * A cakravāka, the ruddy shelduck of the poets, whose pairs are parted every night: on the water,
 * facing right, about 48 long, with a faint core reflection under it. Wants round joins.
 */
export function Cakravaka() {
  return (
    <>
      <ellipse cx={0} cy={1.6} rx={22} ry={2} fill="var(--art-core)" fillOpacity={0.22} />
      <path d={CAKRAVAKA_BODY} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.7} />
      <path d={CAKRAVAKA_BODY} fill="var(--art-vermilion)" fillOpacity={0.4} />
      <path d={CAKRAVAKA_HEAD} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
      <path d="M 10.4 -13.4 C 13 -12.2 18 -12.6 21 -14.6" stroke="var(--art-hair)" strokeWidth={1.1} />
      <path d={CAKRAVAKA_WING} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.4} />
      <path d={CAKRAVAKA_TIP} fill="var(--art-hair)" />
      <path d="M 23 -19 L 28 -17 L 22 -15.5 Z" fill="var(--art-hair)" />
      <circle cx={18.6} cy={-21.4} r={1} fill="var(--art-hair)" />
    </>
  );
}

/* ── Kāma's bow of flowers ─────────────────────────────────────────────── */

/** A small five-petalled blossom, about 7 across, its petals curling. */
export const BLOSSOM = Array.from({ length: 5 }, (_, k) => {
  const p = polar(0, 0, 3.4, 90 + k * 72);
  return `M 0 0 Q ${round(p.x * 0.4 - p.y * 0.5)} ${round(p.y * 0.4 + p.x * 0.5)} ${p.x} ${p.y} Q ${round(p.x * 0.4 + p.y * 0.5)} ${round(p.y * 0.4 - p.x * 0.5)} 0 0 Z`;
}).join(" ");
const FLOWER_BOW = { half: 48, bend: 16 };
const BOW_STAVE = `M ${-FLOWER_BOW.half} ${FLOWER_BOW.bend} C ${-FLOWER_BOW.half * 0.7} ${-4} ${-FLOWER_BOW.half * 0.3} ${-6} 0 ${-6} C ${FLOWER_BOW.half * 0.3} ${-6} ${FLOWER_BOW.half * 0.7} ${-4} ${FLOWER_BOW.half} ${FLOWER_BOW.bend}`;
const BOW_BLOSSOMS = Array.from({ length: 11 }, (_, k) => {
  const t = k / 10;
  const x = round(-FLOWER_BOW.half + 2 * FLOWER_BOW.half * t);
  const u = Math.abs(2 * t - 1);
  return { x, y: round(-6 + (FLOWER_BOW.bend + 6) * u * u), k };
});
/**
 * Kāma's bow of flowers: a `--leaf` recurve about 96 long, its back up and its tips at y 16, with
 * blossoms all along it, `--lotus` and `--art-saffron` by turns, and a `BeeString` for its string.
 */
export function FlowerBow() {
  return (
    <>
      <BeeString from={{ x: -FLOWER_BOW.half, y: FLOWER_BOW.bend }} to={{ x: FLOWER_BOW.half, y: FLOWER_BOW.bend }} spacing={7} />
      <path d={BOW_STAVE} stroke="var(--leaf)" strokeWidth={2.4} strokeLinecap="round" />
      {BOW_BLOSSOMS.map((b) => (
        <g key={b.k} transform={`translate(${b.x} ${b.y}) scale(1.1)`}>
          <path d={BLOSSOM} fill={b.k % 2 ? "var(--art-saffron)" : "var(--lotus)"} stroke="var(--gold)" strokeWidth={0.4} />
        </g>
      ))}
    </>
  );
}

/* ── The swan ──────────────────────────────────────────────────────────── */

const SWAN_BODY = "M -54 -20 C -48 -8 -40 0 -28 0 L 24 0 C 36 0 42 -8 40 -15 C 38 -21 32 -23 26 -22 C 4 -20 -30 -16 -54 -20 Z";
/** The wing, arched up off the back as a swan carries it on calm water. */
const SWAN_WING = "M 18 -20 C 10 -40 -20 -48 -40 -37 C -48 -32 -52 -26 -50 -22 C -30 -18 0 -20 18 -20 Z";
const FEATHERS = [
  "M 8 -24 C 0 -34 -16 -38 -30 -33",
  "M 2 -21 C -6 -28 -20 -31 -36 -27",
  "M -6 -19 C -14 -23 -28 -25 -44 -23",
].join(" ");
const SWAN_NECK = "M 30 -18 C 42 -34 24 -52 32 -70 C 35 -77 42 -79 46 -76";
const SWAN_HEAD = { x: 46, y: -76 };

/**
 * A swan (haṃsī) on calm water, heading +x on the waterline at the origin, about 100 long and 80
 * tall: a moon body, the wing arched up off the back, an S-curved neck, a saffron beak, and a
 * faint reflection. The caller draws the wake.
 */
export function Swan() {
  return (
    <>
      <g transform="scale(1 -0.45)" opacity={0.22}>
        <path d={SWAN_BODY} fill="var(--art-moon)" />
        <path d={SWAN_NECK} stroke="var(--art-moon)" strokeWidth={7} strokeLinecap="round" />
      </g>
      <path d="M -40 1 L 30 1" stroke="var(--gold-soft)" strokeWidth={1.2} />
      <path d={SWAN_NECK} stroke="var(--gold)" strokeWidth={9} strokeLinecap="round" />
      <path d={SWAN_NECK} stroke="var(--art-moon)" strokeWidth={7} strokeLinecap="round" />
      <path d={SWAN_BODY} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.1} strokeLinejoin="round" />
      <path d={SWAN_WING} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round" />
      <path d={SWAN_WING} fill="var(--gold-soft)" fillOpacity={0.25} />
      <path d={FEATHERS} stroke="var(--gold)" strokeWidth={0.7} strokeLinecap="round" />
      <circle cx={SWAN_HEAD.x} cy={SWAN_HEAD.y} r={6} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1} />
      <path d={`M ${SWAN_HEAD.x + 4} ${SWAN_HEAD.y - 2.6} L ${SWAN_HEAD.x + 15} ${SWAN_HEAD.y + 1.6} L ${SWAN_HEAD.x + 4} ${SWAN_HEAD.y + 3} Z`} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
      <circle cx={SWAN_HEAD.x + 1.4} cy={SWAN_HEAD.y - 1.6} r={1.2} fill="var(--art-carve)" />
    </>
  );
}

/* ── The royal parasol ─────────────────────────────────────────────────── */

/**
 * A royal parasol (chattra), the middle of its rim at (cx, rim), 124 wide at s = 1: a vermilion
 * dome with gold ribs, a scalloped fringe, beaded tassels and a bud finial. Wants a gold stroke 1
 * wide with round joins. Its staff is drawn by the caller.
 */
export function Parasol({ cx, rim, s = 1 }: { cx: number; rim: number; s?: number }) {
  const x = (d: number) => round(cx + d * s);
  const y = (d: number) => round(rim + d * s);
  const fringe = Array.from({ length: 11 }, (_, i) => x(-62 + i * 12.4));
  return (
    <>
      <path
        d={`M ${x(-62)} ${y(0)} C ${x(-54)} ${y(-34)} ${x(-24)} ${y(-48)} ${x(0)} ${y(-50)} C ${x(24)} ${y(-48)} ${x(54)} ${y(-34)} ${x(62)} ${y(0)} Z`}
        fill="var(--art-vermilion)"
        fillOpacity={0.6}
      />
      {[-50, -25, 25, 50].map((d) => (
        <line key={d} x1={x(0)} y1={y(-48)} x2={x(d)} y2={y(0)} strokeOpacity={0.7} strokeWidth={0.7} />
      ))}
      <path
        d={fringe.slice(0, 10).map((fx) => `M ${fx} ${y(0)} a ${round(6.2 * s)} ${round(6.2 * s)} 0 0 0 ${round(12.4 * s)} 0`).join(" ")}
        fill="var(--gold)"
        fillOpacity={0.45}
      />
      {fringe.map((fx, i) => (
        <g key={i} strokeOpacity={0.7} strokeWidth={0.7}>
          <line x1={fx} y1={y(0)} x2={fx} y2={y(i % 2 ? 14 : 20)} />
          <circle cx={fx} cy={y(i % 2 ? 16 : 22)} r={round(1.8 * s)} fill="var(--gold)" stroke="none" />
        </g>
      ))}
      <circle cx={x(0)} cy={y(-57)} r={round(6 * s)} fill="var(--gold)" fillOpacity={0.7} />
      <path d={`M ${x(0)} ${y(-63)} C ${x(-4)} ${y(-68)} ${x(-2)} ${y(-74)} ${x(0)} ${y(-78)} C ${x(2)} ${y(-74)} ${x(4)} ${y(-68)} ${x(0)} ${y(-63)} Z`} fill="var(--gold)" />
    </>
  );
}

/* ── A goat ────────────────────────────────────────────────────────────── */

const GOAT_BODY =
  "M -22 -26 C -12 -30 10 -30 18 -26 C 24 -23 25 -16 22 -12 C 18 -9 10 -9 4 -10 L -16 -10 C -22 -11 -26 -16 -26 -20 C -26 -23 -24 -25 -22 -26 Z";
const GOAT_HEAD = "M 13 -27 C 18 -32 22 -38 26 -40 C 30 -41 34 -38 36 -34 C 37 -31 35 -29 32 -30 C 28 -30 24 -26 20 -21 Z";
const GOAT_LEGS = [
  { x: -18, dx: -3 },
  { x: -12, dx: 2 },
  { x: 12, dx: -2 },
  { x: 18, dx: 4 },
];
/** The goat's forequarters and hindquarters, for markings drawn over its coat. */
export const GOAT_FORE = "M 4 -28 C 12 -30 18 -28 21 -24 C 23 -19 21 -13 16 -11 C 10 -10 6 -12 4 -16 Z";
export const GOAT_HIND = "M -22 -26 C -16 -28 -10 -28 -8 -24 C -6 -19 -10 -12 -16 -11 C -21 -12 -25 -16 -25 -20 C -25 -23 -24 -25 -22 -26 Z";

/**
 * A goat in stride, about 70 long, facing +x, hooves on the origin's line: an ivory coat edged
 * in gold, backswept dark horns, a drooping ear, a beard, a raised tail. `saddle` gives it the
 * dark saddle patch; `children` are markings drawn over the coat, under the head.
 */
export function Goat({ saddle = true, children }: { saddle?: boolean; children?: ReactNode }) {
  return (
    <>
      {GOAT_LEGS.map((l, i) => (
        <path key={i} d={`M ${l.x} -12 L ${l.x + l.dx} 0`} stroke="var(--art-ivory)" strokeWidth={2.4} strokeLinecap="round" />
      ))}
      {GOAT_LEGS.map((l, i) => (
        <path key={`h${i}`} d={`M ${l.x + l.dx - 1.2} -0.6 H ${l.x + l.dx + 1.2}`} stroke="var(--art-hair)" strokeWidth={1.4} strokeLinecap="round" />
      ))}
      <path d="M -24 -23 L -31 -31 L -25 -21 Z" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
      <path d={GOAT_BODY} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
      {saddle && <path d="M -14 -28 C -8 -30 0 -29 4 -26 C 2 -21 -8 -20 -14 -22 Z" fill="var(--art-hair)" fillOpacity={0.7} />}
      {children}
      <path d={GOAT_HEAD} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
      <path d="M 26 -40 C 22 -47 15 -47 12 -42" stroke="var(--art-hair)" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M 25 -36 C 21 -34 18 -31 17 -28" stroke="var(--art-hair)" strokeOpacity={0.8} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M 33 -30 L 32 -24 L 30 -29 Z" fill="var(--art-hair)" />
      <circle cx={30} cy={-36} r={1} fill="var(--art-hair)" />
    </>
  );
}

/* ── A night lily ──────────────────────────────────────────────────────── */

const LILY_PETALS = [-70, -50, -30, -12, 6, 24, 42, 62, 80].map((deg, i) => ({ deg, l: i % 2 ? 9 : 11 }));

/**
 * A white night lily (kumuda) open on the water, about 24 wide at s = 1, its base on the origin:
 * nine pointed ivory petals fanned upward, gold-edged, round a turmeric heart, on a leaf-green
 * shadow. The flower that opens to the moon.
 */
export function NightLily() {
  return (
    <>
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
    </>
  );
}

/* ── The full pot ──────────────────────────────────────────────────────── */

const FULL_POT_BODY = "M -9 -20 C -26 -18 -28 6 -14 14 C -6 18 6 18 14 14 C 28 6 26 -18 9 -20 Z";
const FULL_POT_NECK = "M -9 -20 L -7 -27 L 7 -27 L 9 -20 Z M -11 -29 L 11 -29 L 11 -26 L -11 -26 Z";
const MANGO = [-60, -32, 0, 32, 60];

/**
 * The full pot (pūrṇa-kumbha), about 52 wide and 72 tall, its foot at y 17: a round gold pot with a
 * narrow neck and rim, a vermilion band and dot, five mango leaves fanned from its mouth and a
 * turmeric coconut on top.
 */
export function FullPot() {
  return (
    <>
      {MANGO.map((deg) => (
        <path key={deg} d="M 0 -27 C -4 -34 -4 -46 0 -54 C 4 -46 4 -34 0 -27 Z" transform={`rotate(${deg} 0 -27)`} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.4} />
      ))}
      <ellipse cy={-38} rx={9} ry={11} fill="var(--art-turmeric)" stroke="var(--art-musk)" strokeWidth={0.6} />
      <path d="M -6 -44 C -2 -47 2 -47 6 -44" stroke="var(--art-musk)" strokeWidth={0.6} strokeOpacity={0.7} />
      <path d={FULL_POT_NECK} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
      <path d={FULL_POT_BODY} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
      <path d="M -22 -4 C -10 2 10 2 22 -4" stroke="var(--art-vermilion)" strokeWidth={1.4} />
      <circle cy={-6} r={2.4} fill="var(--art-vermilion)" />
    </>
  );
}

/**
 * The kula as the assembly of powers: eight small vermilion lights on a ring round `c`
 * (`rx` across, `ry` deep, so it can lie on the ground), each joined to the next by a gold
 * hairline bowed a little inward. `glow` is a vermilion radial gradient from the artwork.
 * Spokes from the centre to each made a wheel.
 */
export function KulaAssembly({ c, rx, ry = rx, glow, r = 3 }: { c: Pt; rx: number; ry?: number; glow: string; r?: number }) {
  const powers = Array.from({ length: 8 }, (_, k) => {
    const t = ((90 - k * 45) * Math.PI) / 180;
    return { x: round(c.x + rx * Math.cos(t)), y: round(c.y - ry * Math.sin(t)), k };
  });
  const joins = powers
    .map((p, i) => {
      const q = powers[(i + 1) % powers.length];
      const m = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
      return `M ${p.x} ${p.y} Q ${round(m.x + (c.x - m.x) * 0.35)} ${round(m.y + (c.y - m.y) * 0.35)} ${q.x} ${q.y}`;
    })
    .join(" ");
  const twinkle = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];
  return (
    <>
      <path className="m-shimmer" d={joins} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.6} strokeLinejoin="round" />
      {powers.map((p) => (
        <g key={p.k} className={twinkle[p.k % 3]}>
          <circle cx={p.x} cy={p.y} r={r * 3} fill={glow} />
          <circle cx={p.x} cy={p.y} r={r} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={r / 5} />
        </g>
      ))}
    </>
  );
}

/**
 * Kuṇḍalinī coiled: `turns` turns round `c`, seen a little from above (`tilt` as deep as wide),
 * the radius narrowing from `r0` to `r1` and the coil rising `rise` as it goes, starting at the
 * front. The path stops at the inner end; a caller can carry it on.
 */
export function coilPath(c: Pt, { r0 = 48, r1 = 36, turns = 3.5, tilt = 0.3, rise = 12 }: { r0?: number; r1?: number; turns?: number; tilt?: number; rise?: number } = {}) {
  const n = Math.round(40 * turns);
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const a = Math.PI / 2 + t * turns * 2 * Math.PI;
    const r = r0 - (r0 - r1) * t;
    return { x: round(c.x + Math.cos(a) * r), y: round(c.y - rise * t + Math.sin(a) * r * tilt) };
  });
  return polyline(pts);
}

/** The coil's body along `d`: an `--art-vermilion` stroke with an `--art-saffron` one and an `--art-core` hairline inside. Taller and thicker, it read as a spring. */
export function Coil({ d, w = 3.2 }: { d: string; w?: number }) {
  const line = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <>
      <path d={d} stroke="var(--art-vermilion)" strokeWidth={w} {...line} />
      <path d={d} stroke="var(--art-saffron)" strokeWidth={w * 0.56} {...line} />
      <path d={d} stroke="var(--art-core)" strokeWidth={w * 0.16} {...line} />
    </>
  );
}

/* ── The obstruction-engine (vighna-yantra), broken ────────────────────── */

/** A square stone slab seen from above at a slant: its centre, half-width `hu`, half-depth `hv`, and thickness. */
export type Slab = { x: number; y: number; hu: number; hv: number; depth: number };

const SLAB_CUTS = [18, 96, 162, 232, 304];
const VIGHNA_TRIDENT = "M 0 0 V -9 M -3.4 -8.6 C -3.4 -5 -1.8 -4 0 -4 C 1.8 -4 3.4 -5 3.4 -8.6";
/** A point on the edge of the unit square (u, v in −1…1) in the direction a. */
const squareEdge = (deg: number) => {
  const t = (deg * Math.PI) / 180;
  const c = Math.cos(t);
  const s = Math.sin(t);
  const k = 1 / Math.max(Math.abs(c), Math.abs(s));
  return { u: c * k, v: s * k };
};

/** The slab split from its centre into five wedges pushed apart, and the eight-angled figure cut into it. */
function brokenSlab(slab: Slab) {
  const onSlab = ({ u, v }: { u: number; v: number }) => ({ x: round(slab.x + u * slab.hu), y: round(slab.y + v * slab.hv) });
  const pieces = SLAB_CUTS.map((a0, i) => {
    const a1 = i === SLAB_CUTS.length - 1 ? SLAB_CUTS[0] + 360 : SLAB_CUTS[i + 1];
    const corners = [45, 135, 225, 315, 405, 495].filter((c) => c > a0 && c < a1);
    const pts = [{ u: 0, v: 0 }, squareEdge(a0), ...corners.map(squareEdge), squareEdge(a1)].map(onSlab);
    const mid = (((a0 + a1) / 2) * Math.PI) / 180;
    const off = { x: round(Math.cos(mid) * (8 + i * 2)), y: round(Math.sin(mid) * 5 - 2 - (i % 2) * 3) };
    const top = pts.map((p, k) => `${k ? "L" : "M"} ${p.x} ${p.y}`).join(" ") + " Z";
    const sides = pts.map((p, k) => {
      const q = pts[(k + 1) % pts.length];
      return `M ${p.x} ${p.y} L ${q.x} ${q.y} L ${q.x} ${q.y + slab.depth} L ${p.x} ${p.y + slab.depth} Z`;
    });
    return { i, top, sides, off, spin: round(((i * 7) % 5) - 2) };
  });
  const octaPoint = (deg: number) => {
    const t = (deg * Math.PI) / 180;
    return onSlab({ u: 0.8 * Math.cos(t), v: 0.8 * Math.sin(t) });
  };
  const octagram = [0, 45]
    .map((start) => [0, 1, 2, 3].map((k) => octaPoint(start + k * 90)))
    .map((sq) => sq.map((p, k) => `${k ? "L" : "M"} ${p.x} ${p.y}`).join(" ") + " Z")
    .join(" ");
  const tridents = Array.from({ length: 8 }, (_, k) => octaPoint(k * 45));
  return { pieces, octagram, tridents };
}

/**
 * The obstruction-engine broken: its stone pieces (`layer="stone"`), or the crimson eight-angled
 * figure and eight tridents cut into it, clipped to each piece (`layer="figure"`), so the two can
 * be parts of their own. Draw the stone first.
 */
export function BrokenSlab({ slab, id, url, layer }: { slab: Slab; id: (name: string) => string; url: (name: string) => string; layer: "stone" | "figure" }) {
  const { pieces, octagram, tridents } = brokenSlab(slab);
  const place = (p: (typeof pieces)[number]) => `translate(${p.off.x} ${p.off.y}) rotate(${p.spin} ${slab.x} ${slab.y})`;
  if (layer === "stone")
    return (
      <>
        {pieces.map((p) => (
          <g key={p.i} transform={place(p)}>
            {p.sides.map((d, k) => (
              <path key={k} d={d} fill="var(--art-stone)" stroke="var(--art-carve)" strokeWidth={0.6} strokeLinejoin="round" />
            ))}
            <path d={p.top} fill="var(--art-stone)" stroke="var(--gold-soft)" strokeWidth={0.8} strokeLinejoin="round" />
          </g>
        ))}
      </>
    );
  return (
    <>
      {pieces.map((p) => (
        <clipPath key={p.i} id={id(`piece-${p.i}`)}>
          <path d={p.top} />
        </clipPath>
      ))}
      {pieces.map((p) => (
        <g key={p.i} transform={place(p)}>
          <g clipPath={url(`piece-${p.i}`)}>
            <path d={octagram} stroke="var(--art-crimson)" strokeWidth={1} strokeLinejoin="round" />
            {tridents.map((t, k) => (
              <path key={k} d={VIGHNA_TRIDENT} transform={`translate(${t.x} ${t.y + 3}) scale(0.8)`} stroke="var(--art-crimson)" strokeWidth={0.9} strokeLinecap="round" />
            ))}
          </g>
        </g>
      ))}
    </>
  );
}

/* ── Cow (go) ──────────────────────────────────────────────────────────── */

const COW_BODY = "M -28 -42 C -14 -48 22 -47 36 -42 C 44 -39 46 -30 43 -22 C 41 -15 35 -12 28 -12 L -22 -12 C -30 -14 -34 -22 -33 -30 C -33 -36 -31 -40 -28 -42 Z";
const COW_HEAD = "M -26 -42 C -38 -43 -46 -37 -52 -29 C -58 -22 -64 -16 -63 -11 C -62 -8 -57 -8 -54 -11 C -48 -16 -40 -22 -32 -26 Z";
const COW_HUMP = "M -30 -41 C -29 -51 -19 -53 -14 -45 Z";
const COW_DEWLAP = "M -34 -27 C -35 -19 -31 -14 -24 -12 L -28 -18 Z";
const COW_LEGS = [-24, -17, 27, 34];

/**
 * A white zebu cow in profile facing left, hooves on the origin's line, about 110 long, her head
 * lowered (to lick a calf, or to graze): ivory, gold-edged, a turmeric belly shade, turmeric horns,
 * a vermilion forehead band, a lotus udder. The calf is the same drawing flipped at 0.5.
 */
export function Cow() {
  return (
    <>
      {COW_LEGS.map((x, i) => (
        <path key={i} d={`M ${x} -14 L ${x + (i % 2 ? 0.6 : -0.6)} -1`} stroke="var(--art-ivory)" strokeWidth={3.6} strokeLinecap="round" />
      ))}
      {COW_LEGS.map((x, i) => (
        <path key={i} d={`M ${x - 2} -2 H ${x + 2}`} stroke="var(--art-hair)" strokeWidth={1.6} strokeLinecap="round" />
      ))}
      <path d="M 42 -36 C 50 -30 50 -20 48 -10" stroke="var(--art-ivory)" strokeWidth={1.4} strokeLinecap="round" />
      <path d="M 48 -12 C 46 -8 50 -5 50 -3 C 47 -4 46 -7 48 -12 Z" fill="var(--art-hair)" />
      <path d={COW_BODY} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
      <path d="M -20 -14 C 0 -10 20 -10 34 -14" stroke="var(--art-turmeric)" strokeWidth={2.4} strokeOpacity={0.35} strokeLinecap="round" />
      <path d="M 10 -12 C 11 -8 17 -8 18 -12" fill="var(--lotus)" stroke="var(--gold)" strokeWidth={0.4} />
      <path d={COW_DEWLAP} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
      <path d={COW_HUMP} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
      <path d={COW_HEAD} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
      <path d="M -47 -31 C -50 -38 -47 -43 -42 -44 M -51 -28 C -56 -33 -57 -39 -53 -43" stroke="var(--art-turmeric)" strokeWidth={2} strokeLinecap="round" />
      <path d="M -47 -31 C -50 -38 -47 -43 -42 -44 M -51 -28 C -56 -33 -57 -39 -53 -43" stroke="var(--gold)" strokeWidth={0.5} strokeLinecap="round" />
      <path d="M -42 -30 C -38 -32 -34 -31 -33 -28 C -36 -27 -39 -28 -42 -30 Z" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
      <circle cx={-50} cy={-22} r={1.2} fill="var(--art-hair)" />
      <path d="M -63 -12 C -61 -9 -58 -9 -56 -11" stroke="var(--art-hair)" strokeWidth={0.8} strokeOpacity={0.6} />
      <path d="M -44 -36 C -40 -38 -34 -38 -30 -36" stroke="var(--art-vermilion)" strokeWidth={1.4} strokeLinecap="round" />
    </>
  );
}

/* ── Gaṇeśa's mouse (mūṣaka) ───────────────────────────────────────────── */

const MOUSE_BODY = "M -9 0 C -11 -4 -9 -9 -2 -10 C 4 -10.6 8 -8 10 -4.6 L 13.4 -2.4 C 12.6 -0.4 9 0 6 0 Z";
/** A modaka, the sweet dumpling, its pleated tip up, about 7 across. */
export const MODAKA = "M 0 -4.6 C 1.2 -3 3.4 -1.4 3.4 0.8 C 3.4 2.8 1.8 3.6 0 3.6 C -1.8 3.6 -3.4 2.8 -3.4 0.8 C -3.4 -1.4 -1.2 -3 0 -4.6 Z";

/** Gaṇeśa's mouse in profile facing right, feet on the origin's line, about 26 long: musk, gold-edged, a round lotus ear, an ivory eye, a curled tail, a modaka in its mouth. */
export function Mouse() {
  return (
    <g strokeLinejoin="round">
      <path d="M -9 -1 C -15 0 -18 -4 -15 -8" stroke="var(--art-musk)" strokeWidth={0.9} strokeLinecap="round" />
      <path d={MOUSE_BODY} fill="var(--art-musk)" stroke="var(--gold)" strokeWidth={0.5} />
      <circle cx={3.6} cy={-8.6} r={2.4} fill="var(--lotus)" stroke="var(--gold)" strokeWidth={0.4} />
      <circle cx={8.4} cy={-5.4} r={0.7} fill="var(--art-ivory)" />
      <path d={MODAKA} transform="translate(15.4 -2.6) scale(0.8)" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
    </g>
  );
}

/* ── A palm-leaf book open on its stand ────────────────────────────────── */

/**
 * A palm-leaf book on a folding X-stand, its feet on y 36, about 84 across: a musk stand edged in
 * gold over a crimson shelf, ivory leaves with turmeric edges between musk boards, two vermilion
 * cords, and the top leaf laid open with carve writing and its two holes, the cord trailing to a
 * gold bead. Filled in turmeric it read as gold bars.
 */
export function BookOnStand() {
  return (
    <g strokeLinejoin="round">
      <ellipse cx={0} cy={36} rx={38} ry={4} fill="var(--art-musk)" fillOpacity={0.16} />
      <path d="M -26 34 L 22 -2 M 26 34 L -22 -2" stroke="var(--art-musk)" strokeWidth={4.4} strokeLinecap="round" />
      <path d="M -26 34 L 22 -2 M 26 34 L -22 -2" stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} strokeLinecap="round" />
      <path d="M -40 -6 L 40 -6 L 38 0 L -38 0 Z" fill="var(--art-crimson)" stroke="var(--gold)" strokeWidth={0.8} />
      <path d="M -36 -9 L 36 -9 L 36 -6 L -36 -6 Z" fill="var(--art-musk)" stroke="var(--gold)" strokeWidth={0.5} />
      <path d="M -35 -21 L 35 -21 L 35 -9 L -35 -9 Z" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.6} />
      <path d="M -35 -12 L 35 -12 M -35 -15 L 35 -15 M -35 -18 L 35 -18" stroke="var(--art-turmeric)" strokeWidth={0.6} strokeOpacity={0.8} />
      <path d="M -36 -24 L 36 -24 L 36 -21 L -36 -21 Z" fill="var(--art-musk)" stroke="var(--gold)" strokeWidth={0.5} />
      <path d="M -21 -25 L -21 -8 M -17 -25 L -17 -8 M 17 -25 L 17 -8 M 21 -25 L 21 -8" stroke="var(--art-vermilion)" strokeWidth={1.2} />
      <g transform="translate(-2 -27) rotate(-4)">
        <path d="M -38 0 L 38 0 L 38 -6 L -38 -6 Z" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.6} />
        <path d="M -33 -3 L -24 -3 M -12 -3 L 10 -3 M 24 -3 L 33 -3" stroke="var(--art-carve)" strokeWidth={0.9} strokeDasharray="2.4 1.2" />
        <circle cx={-19} cy={-3} r={1.2} fill="var(--art-musk)" />
        <circle cx={19} cy={-3} r={1.2} fill="var(--art-musk)" />
      </g>
      <path d="M 21 -16 C 30 -10 34 -2 30 6 C 28 12 34 16 42 12" stroke="var(--art-vermilion)" strokeWidth={1.1} strokeLinecap="round" />
      <circle cx={42} cy={12} r={2} fill="var(--gold)" />
    </g>
  );
}

/* ── Wagtail (khañjana) ────────────────────────────────────────────────── */

const WAGTAIL_BODY = "M 10 -10 C 14 -4 10 2 2 3 C -6 4 -12 2 -16 -1 L -32 -7 L -31 -9 L -14 -6 C -8 -10 2 -13 10 -10 Z";
const WAGTAIL_BACK = "M 11 -9 C 4 -12 -6 -9 -14 -6 L -31 -9 L -32 -7 L -16 -1 C -10 -4 -2 -5 4 -5 C 8 -5 11 -7 11 -9 Z";

/**
 * A pied wagtail, the poets' bird for restless eyes, facing right, feet on y 10, about 55 long: an
 * ivory body, an `--art-hair` back and round head with ivory brow and cheek stripes, a long thin
 * tail, a dark beak, a core eye, carve legs. Put it on `m-dart` in a group of its own.
 */
export function Wagtail() {
  return (
    <>
      <path d="M 0 2 L -1 10 M 4 2 L 5 10" stroke="var(--art-carve)" strokeWidth={0.8} strokeLinecap="round" />
      <path d={WAGTAIL_BODY} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
      <path d={WAGTAIL_BACK} fill="var(--art-hair)" />
      <path d="M 4 -6 C -2 -5 -8 -4 -14 -3" stroke="var(--art-ivory)" strokeWidth={1.2} strokeLinecap="round" />
      <circle cx={13} cy={-13} r={5.4} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.5} />
      <path d="M 9 -12 C 11 -9 15 -9 17.6 -11" stroke="var(--art-ivory)" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M 9.6 -16 C 12 -17.6 15 -17.4 17 -15.4" stroke="var(--art-ivory)" strokeWidth={0.8} strokeLinecap="round" />
      <path d="M 18 -14.4 L 23 -13.2 L 18 -12.2 Z" fill="var(--art-hair)" />
      <circle cx={15} cy={-14} r={1.1} fill="var(--art-core)" />
      <circle cx={15} cy={-14} r={0.55} fill="var(--art-hair)" />
    </>
  );
}

/* ── The five faces of Sadāśiva (pañcabrahma) ──────────────────────────── */

export type FaceName = "isana" | "vamadeva" | "tatpurusa" | "aghora" | "sadyojata";
/** Īśāna upward at the centre, then north, east, south and west, each in the colour its dhyāna gives it. */
const FIVE_FACES: { name: FaceName; deg: number | null; fill: string }[] = [
  { name: "isana", deg: null, fill: "var(--art-ivory)" },
  { name: "vamadeva", deg: 90, fill: "var(--art-vermilion)" },
  { name: "tatpurusa", deg: 0, fill: "var(--art-turmeric)" },
  { name: "aghora", deg: 270, fill: "var(--art-hair)" },
  { name: "sadyojata", deg: 180, fill: "var(--art-moon)" },
];
const FACE_FLAME = tongue(22, 9, 0);
const FACE_FLAME_CORE = tongue(10, 4, 0);
const FACE_TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/** The glows the five faces stand in, one per face. */
export function FiveFacesDefs({ id }: { id: (name: string) => string }) {
  return (
    <>
      {FIVE_FACES.map((f) => (
        <radialGradient key={f.name} id={id(`face-${f.name}`)}>
          <stop offset="0" style={{ stopColor: f.fill, stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: f.fill, stopOpacity: 0 }} />
        </radialGradient>
      ))}
    </>
  );
}

/**
 * The five faces of Sadāśiva as five flames, laid out as the faces turn: Īśāna at `c`, larger,
 * and the other four on a gold-soft ring of radius `r` round it, north at the top. `stress`
 * draws one face larger and the rest fainter. Needs `FiveFacesDefs`. Spokes made a crosshair.
 */
export function FiveFaces({ c, r, url, stress }: { c: Pt; r: number; url: (name: string) => string; stress?: FaceName }) {
  return (
    <>
      <circle cx={c.x} cy={c.y} r={r} stroke="var(--gold-soft)" strokeWidth={0.7} />
      {FIVE_FACES.map((f, i) => {
        const at = f.deg === null ? c : polar(c.x, c.y, r, f.deg);
        const s = (f.deg === null ? 1.45 : 1.2) * (stress === f.name ? 1.4 : 1);
        return (
          <g key={f.name} transform={`translate(${round(at.x)} ${round(at.y)})`} opacity={stress && stress !== f.name ? 0.55 : undefined}>
            <circle className={FACE_TWINKLE[i % 3]} r={24 * s} fill={url(`face-${f.name}`)} />
            <g transform={`translate(0 ${round(9 * s)}) scale(${round(s)})`}>
              <path d={FACE_FLAME} fill={f.fill} stroke="var(--gold)" strokeWidth={0.7} strokeLinejoin="round" />
              <path d={FACE_FLAME_CORE} fill="var(--art-core)" fillOpacity={0.85} />
            </g>
          </g>
        );
      })}
    </>
  );
}

/* ── Conch (śaṅkha) ────────────────────────────────────────────────────── */

const CONCH_BODY = "M -32 -1 L -25 -6 L -18 -10 C -8 -19 10 -19 22 -10 C 28 -5 32 0 34 5 C 26 5 18 9 8 12 C -4 15 -14 12 -20 6 L -26 3 Z";
const CONCH_WHORLS = "M -25 -6 C -24 -3 -24 0 -26 3 M -18 -10 C -16 -4 -16 2 -20 6 M -8 -17 C -5 -8 -6 2 -10 11";
const CONCH_RIDGES = "M 0 -18 C 4 -10 4 0 0 12 M 10 -16 C 14 -8 14 2 10 10 M 18 -12 C 21 -6 21 2 18 8";
const CONCH_MOUTH = "M -6 9 C 6 3 20 1 32 4 C 22 8 8 12 -6 9 Z";

/**
 * A śaṅkha lying on its side, about 66 long, centred on the origin with its shadow on y 15: the
 * stepped spire to the left, the lotus mouth open below, the canal at the right. The caller draws
 * its sound.
 */
export function Conch() {
  return (
    <g strokeLinejoin="round">
      <ellipse cx={2} cy={15} rx={30} ry={3.4} fill="var(--art-musk)" fillOpacity={0.14} />
      <path d={CONCH_BODY} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={1.1} />
      <path d={CONCH_WHORLS} stroke="var(--gold)" strokeWidth={0.8} strokeLinecap="round" />
      <path d={CONCH_RIDGES} stroke="var(--gold-soft)" strokeWidth={0.7} strokeLinecap="round" />
      <path d={CONCH_MOUTH} fill="var(--lotus)" fillOpacity={0.75} stroke="var(--gold)" strokeWidth={0.8} />
      <path d="M -2 9 C 8 5 18 4 28 5" stroke="var(--art-ivory)" strokeWidth={0.8} strokeLinecap="round" />
      <path d="M -6 -12 C 0 -16 8 -16 14 -13" stroke="var(--art-core)" strokeWidth={1.2} strokeOpacity={0.8} strokeLinecap="round" />
    </g>
  );
}

/* ── The root mantra whole (mūlamantra) ────────────────────────────────── */

const MANTRA_CLUSTERS = [
  { name: "speech", fill: "var(--art-core)", o: [0.9, 0.3] },
  { name: "desire", fill: "var(--lotus)", o: [0.85, 0.3] },
  { name: "power", fill: "var(--art-vermilion)", o: [0.75, 0.26] },
];
const MANTRA_TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/** The glows of the mantra's three clusters, `speech`, `desire` and `power`. */
export function MantraClusterDefs({ id }: { id: (name: string) => string }) {
  return (
    <>
      {MANTRA_CLUSTERS.map((c) => (
        <radialGradient key={c.name} id={id(c.name)}>
          <stop offset="0" style={{ stopColor: c.fill, stopOpacity: c.o[0] }} />
          <stop offset="0.4" style={{ stopColor: c.fill, stopOpacity: c.o[1] }} />
          <stop offset="1" style={{ stopColor: c.fill, stopOpacity: 0 }} />
        </radialGradient>
      ))}
    </>
  );
}

/**
 * The fifteen syllables of the root mantra on a dotted gold ring of radius `r` round `c`, clockwise
 * from the top, each in its cluster's glow; the 5th, 11th and 15th are the ह्रीं that close the
 * clusters, on small gold discs. Needs `MantraClusterDefs`.
 */
export function RootMantraRing({ c, r, url }: { c: Pt; r: number; url: (name: string) => string }) {
  const syllables = Array.from({ length: 15 }, (_, k) => {
    const cluster = k < 5 ? "speech" : k < 11 ? "desire" : "power";
    return { ...polar(c.x, c.y, r, 90 - 12 - k * 24), cluster, seed: k === 4 || k === 10 || k === 14, k };
  });
  return (
    <>
      <circle cx={c.x} cy={c.y} r={r} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.55} strokeDasharray="1.5 3" strokeLinecap="round" />
      {syllables.map((l) =>
        l.seed ? (
          <g key={l.k}>
            <circle className="m-breathe" cx={l.x} cy={l.y} r={20} fill={url(l.cluster)} />
            <circle cx={l.x} cy={l.y} r={9.4} fill="var(--gold)" stroke="var(--gold-soft)" strokeWidth={1} />
            <text
              x={l.x}
              y={l.y + 0.8}
              fontSize={9.4}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--art-carve)"
              style={{ fontFamily: "var(--font-tiro), serif" }}
            >
              ह्रीं
            </text>
          </g>
        ) : (
          <g key={l.k} className={MANTRA_TWINKLE[l.k % 3]}>
            <circle cx={l.x} cy={l.y} r={11} fill={url(l.cluster)} />
            <circle cx={l.x} cy={l.y} r={3.6} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.7} />
          </g>
        ),
      )}
    </>
  );
}

/* ── Her three eyes: moon, fire and sun (trinayanā) ────────────────────── */

/** The glows and the flame gradient the three eyes need: `moon-glow`, `fire-glow`, `eye-fire` and `sun-glow`. */
export function ThreeEyesDefs({ id }: { id: (name: string) => string }) {
  return (
    <>
      <linearGradient id={id("eye-fire")} x1={0} y1={0} x2={0} y2={-60} gradientUnits="userSpaceOnUse">
        <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
        <stop offset="0.55" style={{ stopColor: "var(--art-saffron)" }} />
        <stop offset="1" style={{ stopColor: "var(--art-core)" }} />
      </linearGradient>
      <radialGradient id={id("fire-glow")}>
        <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.55 }} />
        <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
      </radialGradient>
      <radialGradient id={id("moon-glow")}>
        <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.6 }} />
        <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
      </radialGradient>
      <radialGradient id={id("sun-glow")}>
        <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.55 }} />
        <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
      </radialGradient>
    </>
  );
}

/**
 * Her three eyes, never as eyes: a full moon (radius 14), an upright tongue of fire 60 tall standing
 * on `fire`, and a rayed sun (radius 22), all times `s`. Set them on a slant, falling left to right,
 * so no two are level with a third between or above them. Needs `ThreeEyesDefs`.
 */
export function ThreeEyes({ moon, fire, sun, url, s = 1 }: { moon: Pt; fire: Pt; sun: Pt; url: (name: string) => string; s?: number }) {
  const mr = round(14 * s);
  const sr = round(22 * s);
  const rays = Array.from({ length: 12 }, (_, k) => ({ a: polar(sun.x, sun.y, sr + 5 * s, k * 30), b: polar(sun.x, sun.y, sr + (k % 2 ? 10 : 16) * s, k * 30), k }));
  return (
    <>
      <circle cx={moon.x} cy={moon.y} r={round(mr * 2.6)} fill={url("moon-glow")} />
      <circle cx={moon.x} cy={moon.y} r={mr} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.7} />
      <circle cx={round(moon.x - 4 * s)} cy={round(moon.y - 3 * s)} r={round(mr * 0.4)} fill="var(--art-ivory)" fillOpacity={0.6} />
      <circle className="m-breathe" cx={fire.x} cy={round(fire.y - 24 * s)} r={round(46 * s)} fill={url("fire-glow")} />
      <g transform={`translate(${fire.x} ${fire.y}) scale(${s})`}>
        <path className="m-flicker" d={tongue(60, 20, 2.4)} fill={url("eye-fire")} stroke="var(--gold)" strokeWidth={0.6} />
        <path className="m-flicker m-late" d={tongue(34, 9, -1.4)} fill="var(--art-core)" />
      </g>
      <circle className="m-breathe" cx={sun.x} cy={sun.y} r={round(sr * 2.6)} fill={url("sun-glow")} />
      {rays.map((r) => (
        <path key={r.k} d={`M ${r.a.x} ${r.a.y} L ${r.b.x} ${r.b.y}`} stroke="var(--art-saffron)" strokeWidth={1.4} strokeLinecap="round" />
      ))}
      <circle cx={sun.x} cy={sun.y} r={sr} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.8} />
      <circle cx={sun.x} cy={sun.y} r={round(sr * 0.6)} fill="var(--art-core)" fillOpacity={0.7} />
    </>
  );
}

/* ── A wheel of the subtle body, drawn large ───────────────────────────── */

/**
 * A wheel of the subtle body drawn large, centred on `c`: `n` petals in `fill` at 0.5 with a gold
 * edge (`yantraPetals(n, r0, r1)`), in `glow` if given, round a gold-ringed pericarp holding its
 * element's sign as a dotted gold line. `letters`, if given, go on the petals clockwise from the
 * top at radius `letterR`, each in `--sindura` on a small ivory disc; without the discs they
 * vanish into the petals.
 */
export function CakraWheel({
  c,
  n,
  r0,
  r1,
  fill,
  sign,
  glow,
  letters,
  letterR = round(r0 + (r1 - r0) * 0.6),
}: {
  c: Pt;
  n: number;
  r0: number;
  r1: number;
  fill: string;
  sign: Tattva;
  glow?: string;
  letters?: string[];
  letterR?: number;
}) {
  const at = (letters ?? []).map((ch, k) => ({ ch, ...polar(c.x, c.y, letterR, 90 - (k * 360) / n), k }));
  return (
    <>
      {glow && <circle cx={c.x} cy={c.y} r={r1 + 24} fill={glow} />}
      <g transform={`translate(${c.x} ${c.y})`}>
        <path d={yantraPetals(n, r0, r1)} fill={fill} fillOpacity={0.5} stroke="var(--gold)" strokeWidth={0.7} strokeLinejoin="round" />
        <circle r={r0} fill="var(--art-ivory)" fillOpacity={0.22} stroke="var(--gold)" strokeWidth={0.9} />
        <path d={tattvaSign(sign, round(r0 * 0.76))} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.6} strokeDasharray="1.5 2.5" />
      </g>
      {at.map((l) => (
        <circle key={l.k} cx={l.x} cy={l.y} r={9.4} fill="var(--art-ivory)" fillOpacity={0.7} stroke="var(--gold-soft)" strokeWidth={0.5} />
      ))}
      {at.map((l) => (
        <text
          key={l.k}
          x={l.x}
          y={l.y}
          fontSize={l.ch.length > 1 ? 12 : 14}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--sindura)"
          style={{ fontFamily: "var(--font-tiro), serif" }}
        >
          {l.ch}
        </text>
      ))}
    </>
  );
}

/* ── The faces counted down the body ───────────────────────────────────── */

const COUNT_FACE = tongue(22, 9, 0);
const COUNT_FACE_CORE = tongue(10, 4, 0);

/**
 * The wheels' faces as a count: six rows, one face more in each, centred on x and `dy` apart from
 * `y0`, each face the five-faces flame. Row `lit` is the wheel's own, vermilion at 1.3 in `glow`;
 * the rest are gold-soft outlines at 0.62, still to come.
 */
export function FaceCount({ x, y0, lit, glow, dy = 46, gap = 10 }: { x: number; y0: number; lit: number; glow: string; dy?: number; gap?: number }) {
  const rows = [1, 2, 3, 4, 5, 6].map((n, i) => {
    const g = n === lit ? gap * 1.4 : gap;
    return { n, y: y0 + i * dy, xs: Array.from({ length: n }, (_, j) => round(x + (j - (n - 1) / 2) * g)) };
  });
  return (
    <>
      <circle className="m-breathe" cx={x} cy={y0 + (lit - 1) * dy - 8} r={22 + lit * 4} fill={glow} />
      {rows.map((row) =>
        row.xs.map((fx, j) =>
          row.n === lit ? (
            <g key={`${row.n}-${j}`} transform={`translate(${fx} ${row.y}) scale(1.3)`}>
              <path d={COUNT_FACE} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.7} strokeLinejoin="round" />
              <path d={COUNT_FACE_CORE} fill="var(--art-core)" fillOpacity={0.85} />
            </g>
          ) : (
            <g key={`${row.n}-${j}`} transform={`translate(${fx} ${row.y}) scale(0.62)`}>
              <path d={COUNT_FACE} stroke="var(--gold-soft)" strokeWidth={1.2} strokeOpacity={0.75} strokeLinejoin="round" />
            </g>
          ),
        ),
      )}
    </>
  );
}

/* ── The seven layers of the body (dhātu) ──────────────────────────────── */

/** What each layer is lit in: skin, blood, flesh, fat, bone, marrow, essence. */
const TISSUE = ["var(--art-turmeric)", "var(--art-vermilion)", "var(--lotus)", "var(--art-moon)", "var(--art-ivory)", "var(--gold-soft)", "var(--art-core)"];

/**
 * The seven layers of the body from the skin in, a column from `x0` to `x1` of bands `h` deep from
 * `y0` under slightly uneven boundaries, each tinted faintly in its own colour. Layer `lit` (0 is
 * the skin) is the wheel's own, at 0.85 with a full gold edge, a core line along its top and
 * `glow` behind it.
 */
export function BodyLayers({ x0, x1, y0, h = 16, lit, glow }: { x0: number; x1: number; y0: number; h?: number; lit: number; glow: string }) {
  const edge = (y: number, phase: number) => Array.from({ length: 7 }, (_, i) => ({ x: round(x0 + ((x1 - x0) * i) / 6), y: round(y + Math.sin(i * 1.3 + phase) * 1.6) }));
  const line = (ps: Pt[]) => ps.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");
  const layers = TISSUE.map((fill, k) => {
    const upper = edge(y0 + k * h, k);
    const lower = edge(y0 + (k + 1) * h, k + 1).reverse();
    return { k, fill, upper: line(upper), d: `${line([...upper, ...lower])} Z` };
  });
  return (
    <>
      <ellipse cx={round((x0 + x1) / 2)} cy={y0 + lit * h} rx={round((x1 - x0) * 0.8)} ry={16} fill={glow} />
      {layers.map((l) => (
        <path
          key={l.k}
          d={l.d}
          fill={l.fill}
          fillOpacity={l.k === lit ? 0.85 : 0.16}
          stroke="var(--gold)"
          strokeWidth={l.k === lit ? 0.9 : 0.5}
          strokeOpacity={l.k === lit ? 1 : 0.45}
          strokeLinejoin="round"
        />
      ))}
      <path d={layers[lit].upper} stroke="var(--art-core)" strokeWidth={1.6} strokeLinecap="round" />
    </>
  );
}
