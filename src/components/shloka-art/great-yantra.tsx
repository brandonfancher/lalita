/**
 * Shloka 56 — "The great tantra, the great mantra, the great diagram".
 *
 * The apparatus of her worship, every piece of it hers. Overhead a canopy is
 * stretched, a cloth whose warp runs through it in plain sight and hangs from
 * its edge as a fringe, and from that edge hang three festoons of lights, the
 * mantra's three clusters. Below the card the Śrīcakra stands face-on, cut in
 * a gold plate on a low throne, and her light sits in its bindu. Red flowers
 * have been laid one in each enclosure in turn, a thread of light winding in
 * from the gate. At the left Bhairava's trident is planted with his drum
 * hanging from it; at the right his skull-bowl is heaped with flowers. Which
 * name each part answers to is written up for readers in the registry, next
 * to this artwork's entry.
 */

import {
  Damaru,
  Lion,
  RathaDefs,
  StillLamp,
  SRI_BINDU_V,
  SRI_TRIANGLES,
  Trident,
  artIds,
  cubicAt,
  gateSquare,
  lotusPetals,
  partProps,
  polar,
  round,
  through,
  trident,
  yantraPetals,
} from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];
const CX = 320;
const nonScaling = { vectorEffect: "non-scaling-stroke" as const };

/* ── The canopy: a stretched cloth, its warp in plain sight ────────────── */

/** Seen from below: the far edge higher and narrower, the near edge on its rod. The title stays left of x ≈ 117. */
const FRONT = { y: 170, x0: 140, x1: 500 };
const BACK = { y: 80, x0: 184, x1: 456 };
const SAG = 8;
const WARP_N = 64;

/** A point on the cloth, u across (0–1) and v from the far edge (0) to the near (1), sagging between its posts. */
function cloth(u: number, v: number): Pt {
  const y = BACK.y + (FRONT.y - BACK.y) * Math.pow(v, 1.15);
  const t = (y - BACK.y) / (FRONT.y - BACK.y);
  const x0 = BACK.x0 + (FRONT.x0 - BACK.x0) * t;
  const x1 = BACK.x1 + (FRONT.x1 - BACK.x1) * t;
  const sag = SAG * Math.sin(Math.PI * v) * (0.55 + 0.45 * Math.sin(Math.PI * u));
  return { x: round(x0 + (x1 - x0) * u), y: round(y + sag) };
}

const run = (n: number, f: (t: number) => Pt) => Array.from({ length: n + 1 }, (_, i) => f(i / n));
const line = (ps: Pt[], close = false) => ps.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ") + (close ? " Z" : "");
const quad = (v0: number, v1: number) =>
  line(
    [
      ...run(16, (t) => cloth(t, v0)),
      ...run(6, (t) => cloth(1, v0 + (v1 - v0) * t)),
      ...run(16, (t) => cloth(1 - t, v1)),
      ...run(6, (t) => cloth(0, v1 - (v1 - v0) * t)),
    ],
    true,
  );
const across = (v: number) => line(run(16, (t) => cloth(t, v)));

const CLOTH = quad(0, 1);
const WARP = Array.from({ length: WARP_N }, (_, i) => line(run(8, (t) => cloth((i + 0.5) / WARP_N, t)))).join(" ");
const BORDERS = [quad(0, 0.1), quad(0.8, 0.95)];
const STRIPES = [0.28, 0.32, 0.56, 0.6].map(across).join(" ");
/** The temple border woven along the near edge, its points toward the field. */
const TEMPLE = Array.from({ length: 24 }, (_, i) => {
  const [a, b] = [cloth(i / 24, 0.94), cloth((i + 1) / 24, 0.94)];
  const tip = cloth((i + 0.5) / 24, 0.82);
  return `M ${a.x} ${a.y} L ${tip.x} ${tip.y} L ${b.x} ${b.y} Z`;
}).join(" ");
const BUTA = [0.44, 0.7].flatMap((v, row) =>
  Array.from({ length: 9 - row }, (_, i) => ({ ...cloth((i + 0.5 + row * 0.5) / 9, v), r: round(1.3 + v * 1.1) })),
);

/** The warp's ends below the rod, knotted four by four. */
const FRINGE = Array.from({ length: WARP_N / 4 }, (_, j) => {
  const xs = [0, 1, 2, 3].map((k) => cloth((j * 4 + k + 0.5) / WARP_N, 1).x);
  const kx = round((xs[0] + xs[3]) / 2);
  const ky = FRONT.y + 11;
  const up = xs.map((x) => `M ${x} ${FRONT.y + 3} L ${kx} ${ky}`).join(" ");
  const down = [-2.4, -0.8, 0.8, 2.4].map((dx) => `M ${kx} ${ky} L ${round(kx + dx)} ${ky + 11 + Math.abs(dx)}`).join(" ");
  return { up, down, knot: { x: kx, y: ky } };
});

const ROD = { y: FRONT.y + 1, x0: FRONT.x0 - 8, x1: FRONT.x1 + 8 };
/** Four posts: the near pair on the dais, the far pair standing behind the plate. */
const DAIS_TOP = 676;
const POSTS = [
  { x: FRONT.x0, top: FRONT.y - 16, foot: 694, near: true },
  { x: FRONT.x1, top: FRONT.y - 16, foot: 694, near: true },
  { x: BACK.x0, top: BACK.y - 12, foot: DAIS_TOP - 4, near: false },
  { x: BACK.x1, top: BACK.y - 12, foot: DAIS_TOP - 4, near: false },
];
const postBands = (p: (typeof POSTS)[number]) =>
  [0.06, 0.1, 0.5, 0.54, 0.92].map((t) => {
    const y = round(p.top + 14 + (p.foot - p.top - 14) * t);
    return `M ${p.x - 3.4} ${y} L ${p.x + 3.4} ${y}`;
  }).join(" ");

/* ── The mantra: three festoons, five, six and four ────────────────────── */

const KUTAS = (() => {
  const counts = [5, 6, 4];
  const span = FRONT.x1 - FRONT.x0;
  let x = FRONT.x0;
  return counts.map((n, k) => {
    const x0 = x;
    const x1 = x0 + (span * n) / 15;
    x = x1;
    const y = FRONT.y + 4;
    const dip = round((x1 - x0) * 0.26);
    const c = { x: (x0 + x1) / 2, y: y + 2 * dip };
    const at = (t: number) => ({
      x: round((1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * c.x + t * t * x1),
      y: round((1 - t) * (1 - t) * y + 2 * t * (1 - t) * c.y + t * t * y),
    });
    return {
      k,
      swag: `M ${round(x0)} ${y} Q ${round(c.x)} ${c.y} ${round(x1)} ${y}`,
      lights: Array.from({ length: n - 1 }, (_, i) => at((i + 1) / n)),
      hrim: { x: round(x1), y: FRONT.y + 13 },
    };
  });
})();

/* ── The Śrīcakra, face-on in a gold plate ─────────────────────────────── */

/** The innermost triangles clear the card's lower edge (y ≈ 438). */
const YANTRA = { x: CX, y: 500, s: 2.2 };
const BINDU = { x: CX, y: round(YANTRA.y + SRI_BINDU_V * YANTRA.s) };
const PLATE = { half: 122, edge: 5 };
const plateTop = YANTRA.y - PLATE.half;
const plateFoot = YANTRA.y + PLATE.half;

/* ── The order of the rite: a flower in each enclosure, gate to centre ─── */

const STATION_R = [50.5, 34.8, 27.6, 20.5, 16, 12, 8, 3.4];
const STATIONS = STATION_R.map((r, k) => {
  const p = polar(0, SRI_BINDU_V, r, -90 - (k * 360) / 7);
  return { x: round(YANTRA.x + p.x * YANTRA.s), y: round(YANTRA.y + p.y * YANTRA.s), r: round(5.2 - k * 0.42), k };
});
const KRAMA_PATH = (() => {
  const pts = through([...STATIONS, BINDU], 10);
  return pts.map((p, i) => `${i ? "L" : "M"} ${round(p.x)} ${round(p.y)}`).join(" ");
})();
const flower = (r: number) =>
  Array.from({ length: 5 }, (_, k) => {
    const deg = 90 + k * 72;
    const tip = polar(0, 0, r, deg);
    const a = polar(0, 0, r * 0.9, deg - 34);
    const b = polar(0, 0, r * 0.9, deg + 34);
    return `M 0 0 Q ${round(a.x)} ${round(a.y)} ${round(tip.x)} ${round(tip.y)} Q ${round(b.x)} ${round(b.y)} 0 0 Z`;
  }).join(" ");

/* ── The great seat: a low throne under the plate ──────────────────────── */

const SEAT = { top: plateFoot, slab: 9, x0: 186, x1: 454, face: 30, inset: 10 };
const seatFace = SEAT.top + SEAT.slab;
const seatFoot = seatFace + SEAT.face;
const SEAT_PETALS = lotusPetals({ x: SEAT.x0 + 6, width: SEAT.x1 - SEAT.x0 - 12, count: 22, base: seatFace, height: -7 }).join(" ");
const LIONS = { k: 0.25, gap: 30 };
/** The throne's back: an arch rising behind the plate to a pot finial, its right half the left's mirror. */
const BACKREST = { x0: 204, spring: plateTop + 40, shoulder: 330, peak: 252, band: 9 };
type Seg = [Pt, Pt, Pt, Pt];
function archSegs(inset: number): Seg[] {
  const { spring, shoulder } = BACKREST;
  const l = BACKREST.x0 + inset;
  const p = BACKREST.peak + inset * 1.3;
  const P = (x: number, y: number) => ({ x: round(x), y: round(y) });
  const left: Seg[] = [
    [P(l, spring), P(l, spring - 20), P(l, shoulder + 20), P(l, shoulder)],
    [P(l, shoulder), P(l, shoulder - 40), P(CX - 70, p + 26), P(CX - 30, p + 18)],
    [P(CX - 30, p + 18), P(CX - 14, p + 14), P(CX - 4, p + 9), P(CX, p)],
  ];
  const mirror = (q: Pt) => P(2 * CX - q.x, q.y);
  const right = left.map((sg) => [...sg].reverse().map(mirror) as Seg).reverse();
  return [...left, ...right];
}
const segPath = (segs: Seg[]) =>
  `M ${segs[0][0].x} ${segs[0][0].y} ` + segs.map(([, b, c, d]) => `C ${b.x} ${b.y} ${c.x} ${c.y} ${d.x} ${d.y}`).join(" ");
const ARCH_MID = segPath(archSegs(BACKREST.band / 2));
const ARCH_OUT = segPath(archSegs(0));
const ARCH_IN = segPath(archSegs(BACKREST.band));
const ARCH_PANEL = `${ARCH_IN} Z`;
/** Pearls set along the band, fewer on the short segments either side of the point. */
const ARCH_PEARLS = archSegs(BACKREST.band / 2).flatMap((sg, i) => {
  const n = i === 2 || i === 3 ? 3 : 6;
  return Array.from({ length: n }, (_, k) => {
    const q = cubicAt(sg[0], sg[1], sg[2], sg[3], (k + 0.5) / n);
    return { x: round(q.x), y: round(q.y) };
  });
});
const FINIAL = { x: CX, y: BACKREST.peak - 2 };

/** The dais the throne and the near posts stand on, its front edge toward us. */
const DAIS = { top: DAIS_TOP, front: 698, face: 12, x0: 106, x1: 534 };
const DAIS_SLABS = [0.2, 0.4, 0.6, 0.8].map((t) => {
  const x = round(DAIS.x0 + (DAIS.x1 - DAIS.x0) * t);
  return `M ${x} ${DAIS.front + 2} L ${x} ${DAIS.front + DAIS.face - 2}`;
}).join(" ");

/* ── Bhairava's trident and drum, his skull-bowl of flowers ────────────── */

const TRIDENT = trident(167, 448, 690, 1.2);
const BOWL = { x: 472, rim: 548, rx: 22, ry: 5, deep: 24 };
const BOWL_BODY = `M ${BOWL.x - BOWL.rx} ${BOWL.rim} C ${BOWL.x - BOWL.rx} ${BOWL.rim + 16} ${BOWL.x - 11} ${BOWL.rim + BOWL.deep} ${BOWL.x} ${BOWL.rim + BOWL.deep} C ${BOWL.x + 11} ${BOWL.rim + BOWL.deep} ${BOWL.x + BOWL.rx} ${BOWL.rim + 16} ${BOWL.x + BOWL.rx} ${BOWL.rim} Z`;
const SUTURE = `M ${BOWL.x - 17} ${BOWL.rim + 10} l 4 -3 l 3 4 l 4 -4 l 3 4 l 4 -3 l 3 4 l 4 -4 l 4 3 l 4 -3`;
const STAND = `M ${BOWL.x - 14} ${BOWL.rim + 18} L ${BOWL.x - 20} ${BOWL.rim + 58} M ${BOWL.x} ${BOWL.rim + BOWL.deep} L ${BOWL.x} ${BOWL.rim + 62} M ${BOWL.x + 14} ${BOWL.rim + 18} L ${BOWL.x + 20} ${BOWL.rim + 58}`;
const HEAP = [
  { x: -12, y: -5, r: 7.5, red: true },
  { x: 9, y: -6, r: 7, red: true },
  { x: -1, y: -15, r: 8, red: true },
  { x: 16, y: -16, r: 5, red: false },
  { x: -17, y: -16, r: 5, red: false },
];
const JASMINE = [
  { x: -21, y: -3 },
  { x: 21, y: -4 },
  { x: -8, y: -24 },
  { x: 8, y: -25 },
  { x: 2, y: -2 },
];
const HEAP_LEAVES = [
  { x: -20, y: -9, a: -40 },
  { x: 20, y: -10, a: 40 },
  { x: 0, y: -28, a: 0 },
];
const FALLEN = [
  { x: BOWL.x - 30, y: BOWL.rim + 62, r: 4.6 },
  { x: BOWL.x + 26, y: BOWL.rim + 64, r: 4 },
];

/* ── The five offerings on the ground, in the order they are made ────── */

const GROUND = 748;
const OFFER_X = [212, 266, 320, 374, 428];
const SMOKE = [0, 1].map((k) => {
  const x = k ? 3 : -3;
  return `M ${x} -30 C ${x + 6} -38 ${x - 6} -46 ${x + 2} -54 C ${x + 8} -60 ${x - 2} -66 ${x + 4} -72`;
}).join(" ");

/* ── His dog, asleep at the trident's foot ─────────────────────────────── */

const DOG = { x: 150, y: 690, k: 0.94 };
const DOG_BODY =
  "M 26 -2 C 18 -2 14 -4 12 -10 C 8 -18 2 -21 -8 -22 C -20 -23 -32 -25 -40 -19 C -47 -13 -46 -4 -40 0 L 24 0 Z";
const DOG_HEAD = "M 24 -14 C 27 -18 34 -19 38 -15 C 42 -12 48 -10 53 -8 C 56 -7 56 -3 52 -2 C 44 -1 32 -1 26 -2 C 22 -4 21 -11 24 -14 Z";
const DOG_EAR = "M 27 -16 C 25 -20 25 -23 26.5 -25 C 29.5 -22 32 -19 33 -16.5 Z";
const DOG_TAIL = "M -40 -6 C -49 -4 -50 2 -44 4 C -36 6 -26 4 -18 4";

export function GreatYantra({ idPrefix = "sa56", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);
  const yantra = `translate(${YANTRA.x} ${YANTRA.y}) scale(${YANTRA.s})`;

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <RathaDefs id={id} />
        <linearGradient id={id("cloth")} x1={0} y1={BACK.y} x2={0} y2={FRONT.y} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.78 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.95 }} />
        </linearGradient>
        <radialGradient id={id("underlight")} cx={CX} cy={FRONT.y + 30} r={220} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("spark")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.8 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("plate")} x1={0} y1={plateTop} x2={0} y2={plateFoot} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.3 }} />
        </linearGradient>
        <radialGradient id={id("glow")} cx={BINDU.x} cy={BINDU.y} r={290} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.7 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.38 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu")} cx={BINDU.x} cy={BINDU.y} r={34} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("panel")} x1={0} y1={BACKREST.peak} x2={0} y2={plateTop} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0.3 }} />
        </linearGradient>
        <radialGradient id={id("shadow")}>
          <stop offset="0" style={{ stopColor: "var(--art-carve)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--art-carve)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The great seat: a low throne on its dais */}
      <g {...part("seat")}>
        <path d={ARCH_PANEL} fill="var(--art-stone)" fillOpacity={0.55} />
        <path d={ARCH_PANEL} fill={url("panel")} />
        <path d={ARCH_MID} stroke={url("riser")} strokeWidth={BACKREST.band} />
        <path d={ARCH_OUT} stroke="var(--gold)" strokeWidth={1} />
        <path d={ARCH_IN} stroke="var(--gold)" strokeWidth={0.8} />
        <g fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.5}>
          {ARCH_PEARLS.map((q, i) => (
            <circle key={i} cx={q.x} cy={q.y} r={2} />
          ))}
        </g>
        <g transform={`translate(${FINIAL.x} ${FINIAL.y})`}>
          <path d="M -7 0 C -10 -6 -6 -12 0 -12 C 6 -12 10 -6 7 0 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d="M -4 -12 L 4 -12 L 3 -15 L -3 -15 Z" fill="var(--gold)" />
          <path d="M 0 -15 C -4 -18 -3 -23 0 -27 C 3 -23 4 -18 0 -15 Z" fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.5} />
          <path d="M -6 -15 C -11 -16 -13 -19 -12 -21 M 6 -15 C 11 -16 13 -19 12 -21" stroke="var(--leaf)" strokeWidth={1.4} strokeLinecap="round" />
        </g>
        <path
          d={`M ${DAIS.x0 + 30} ${DAIS.top} L ${DAIS.x1 - 30} ${DAIS.top} L ${DAIS.x1} ${DAIS.front} L ${DAIS.x0} ${DAIS.front} Z`}
          fill="var(--art-stone)"
          stroke="var(--gold)"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <rect x={DAIS.x0} y={DAIS.front} width={DAIS.x1 - DAIS.x0} height={DAIS.face} fill={url("riser")} fillOpacity={0.8} stroke="var(--gold)" strokeWidth={0.8} />
        <path d={DAIS_SLABS} stroke="var(--art-carve)" strokeWidth={0.7} strokeOpacity={0.6} />
        <ellipse cx={CX} cy={seatFoot + 6} rx={170} ry={10} fill={url("shadow")} />
        <rect x={SEAT.x0 + SEAT.inset} y={seatFace} width={SEAT.x1 - SEAT.x0 - 2 * SEAT.inset} height={SEAT.face} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1} />
        <rect x={SEAT.x0 + SEAT.inset + 5} y={seatFace + 9} width={SEAT.x1 - SEAT.x0 - 2 * SEAT.inset - 10} height={SEAT.face - 13} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.7} />
        <path d={SEAT_PETALS} fill="var(--art-saffron)" fillOpacity={0.55} stroke="var(--gold)" strokeWidth={0.6} />
        <rect x={SEAT.x0} y={SEAT.top} width={SEAT.x1 - SEAT.x0} height={SEAT.slab} rx={1.5} fill={url("riser")} stroke="var(--gold)" strokeWidth={0.8} />
        <rect x={SEAT.x0 + 4} y={seatFoot} width={SEAT.x1 - SEAT.x0 - 8} height={7} rx={1.5} fill={url("riser")} stroke="var(--gold)" strokeWidth={0.8} />
        <g style={{ color: "var(--gold)" }} fill="currentColor">
          <g transform={`translate(${CX - LIONS.gap - 96 * LIONS.k} ${round(seatFoot - 2 - 92 * LIONS.k)}) scale(${LIONS.k})`}>
            <Lion />
          </g>
          <g transform={`translate(${CX + LIONS.gap + 96 * LIONS.k} ${round(seatFoot - 2 - 92 * LIONS.k)}) scale(${-LIONS.k} ${LIONS.k})`}>
            <Lion />
          </g>
        </g>
        <g transform={`translate(${CX} ${seatFace + 17})`}>
          <path d={flower(6.4)} fill="var(--art-vermilion)" fillOpacity={0.8} stroke="var(--gold)" strokeWidth={0.5} />
          <circle r={1.8} fill="var(--gold)" />
        </g>
      </g>

      {/* The canopy, its warp in plain sight */}
      <g {...part("tantra")}>
        {POSTS.filter((p) => !p.near).map((p) => (
          <g key={p.x} opacity={0.5}>
            <path d={`M ${p.x} ${p.top} L ${p.x} ${p.foot}`} stroke="var(--art-turmeric)" strokeWidth={4} />
            <path d={postBands(p)} stroke="var(--gold)" strokeWidth={1.2} />
            <circle cx={p.x} cy={p.top} r={3.6} fill="var(--gold)" />
          </g>
        ))}
        <path d={CLOTH} fill="var(--art-stone)" />
        <path d={CLOTH} fill={url("cloth")} />
        <path className="m-shimmer" d={CLOTH} fill={url("underlight")} />
        {BORDERS.map((d, i) => (
          <path key={i} d={d} fill="var(--art-saffron)" fillOpacity={0.85} />
        ))}
        <path d={TEMPLE} fill="var(--art-vermilion)" fillOpacity={0.85} />
        <path d={WARP} stroke="var(--gold-soft)" strokeWidth={0.45} strokeOpacity={0.6} />
        <path d={STRIPES} stroke="var(--gold-soft)" strokeWidth={1} strokeOpacity={0.75} />
        <g fill="var(--gold-soft)" fillOpacity={0.85}>
          {BUTA.map((b, i) => (
            <circle key={i} cx={b.x} cy={b.y} r={b.r} />
          ))}
        </g>
        <path d={CLOTH} stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round" />
        <g stroke="var(--art-turmeric)" strokeWidth={0.6} strokeLinecap="round">
          {FRINGE.map((f, j) => (
            <g key={j}>
              <path d={f.up} />
              <path d={f.down} strokeOpacity={0.85} />
            </g>
          ))}
        </g>
        <g fill="var(--gold)">
          {FRINGE.map((f, j) => (
            <circle key={j} cx={f.knot.x} cy={f.knot.y} r={1.5} />
          ))}
        </g>
        <path d={`M ${ROD.x0} ${ROD.y} L ${ROD.x1} ${ROD.y}`} stroke="var(--art-turmeric)" strokeWidth={4.4} strokeLinecap="round" />
        <path d={`M ${ROD.x0} ${ROD.y - 1} L ${ROD.x1} ${ROD.y - 1}`} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
        {POSTS.filter((p) => p.near).map((p) => (
          <g key={p.x}>
            <path d={`M ${p.x} ${p.top + 6} L ${p.x} ${p.foot}`} stroke="var(--art-turmeric)" strokeWidth={5} />
            <path d={`M ${p.x - 1.2} ${p.top + 6} L ${p.x - 1.2} ${p.foot}`} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.8} />
            <path d={postBands(p)} stroke="var(--gold)" strokeWidth={1.6} />
            <rect x={p.x - 6} y={p.foot - 9} width={12} height={9} rx={1} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
            <path d={`M ${p.x} ${p.top - 4} C ${p.x + 5} ${p.top + 1} ${p.x + 4} ${p.top + 6} ${p.x} ${p.top + 8} C ${p.x - 4} ${p.top + 6} ${p.x - 5} ${p.top + 1} ${p.x} ${p.top - 4} Z`} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
            <circle cx={p.x} cy={ROD.y} r={4} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          </g>
        ))}
      </g>

      {/* The mantra in its three clusters, hung from the canopy's edge */}
      <g {...part("mantra")}>
        {KUTAS.map((c) => (
          <g key={c.k}>
            <path d={c.swag} stroke="var(--gold)" strokeWidth={0.8} />
            {c.lights.map((p, i) => (
              <g key={i}>
                <circle className="m-shimmer" cx={p.x} cy={p.y} r={10} fill={url("spark")} />
                <circle className={TWINKLE[(i + c.k) % 3]} cx={p.x} cy={p.y} r={2.8} fill="var(--art-core)" />
                <circle cx={p.x} cy={p.y} r={3.9} stroke="var(--gold)" strokeWidth={0.7} />
              </g>
            ))}
            <path d={`M ${c.hrim.x} ${ROD.y + 2} L ${c.hrim.x} ${c.hrim.y - 8}`} stroke="var(--gold)" strokeWidth={0.9} />
            <circle cx={c.hrim.x} cy={c.hrim.y} r={8.4} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
            <text
              x={c.hrim.x}
              y={c.hrim.y + 3.2}
              textAnchor="middle"
              fontSize={8.6}
              fill="var(--art-carve)"
              style={{ fontFamily: "var(--font-tiro), serif" }}
            >
              ह्रीं
            </text>
          </g>
        ))}
      </g>

      {/* The great diagram, cut in a gold plate */}
      <g {...part("yantra")}>
        <rect x={CX - PLATE.half + 4} y={plateTop + 4} width={PLATE.half * 2} height={PLATE.half * 2} rx={3} fill="var(--art-carve)" fillOpacity={0.25} />
        <rect x={CX - PLATE.half} y={plateTop} width={PLATE.half * 2} height={PLATE.half * 2} rx={3} fill="var(--art-stone)" />
        <rect x={CX - PLATE.half} y={plateTop} width={PLATE.half * 2} height={PLATE.half * 2} rx={3} fill={url("plate")} stroke="var(--gold)" strokeWidth={2.2} />
        <rect
          x={CX - PLATE.half + PLATE.edge}
          y={plateTop + PLATE.edge}
          width={PLATE.half * 2 - 2 * PLATE.edge}
          height={PLATE.half * 2 - 2 * PLATE.edge}
          rx={2}
          stroke="var(--gold)"
          strokeWidth={0.7}
          strokeOpacity={0.8}
        />
        <g transform={yantra}>
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
        </g>
      </g>

      {/* Her light, seated in the bindu */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={BINDU.x} cy={BINDU.y} r={290} fill={url("glow")} />
        <circle className="m-breathe" cx={BINDU.x} cy={BINDU.y} r={34} fill={url("bindu")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={3.4} fill="var(--art-core)" />
        <circle cx={BINDU.x} cy={BINDU.y} r={3.4} stroke="var(--art-vermilion)" strokeWidth={0.9} />
      </g>

      {/* The order of the rite: a flower in each enclosure, gate to centre */}
      <g {...part("krama")}>
        <path d={KRAMA_PATH} stroke="var(--art-core)" strokeWidth={2.6} strokeOpacity={0.3} strokeLinecap="round" />
        <path d={KRAMA_PATH} stroke="var(--gold)" strokeWidth={0.9} strokeDasharray="1 2.6" strokeLinecap="round" />
        {STATIONS.map((s) => (
          <g key={s.k} transform={`translate(${s.x} ${s.y})`}>
            <circle r={s.r + 1.4} fill="var(--art-stone)" fillOpacity={0.6} />
            <path d={flower(s.r)} fill="var(--art-crimson)" stroke="var(--gold)" strokeWidth={0.5} />
            <circle r={round(s.r * 0.3)} fill="var(--art-core)" />
          </g>
        ))}
        <ellipse cx={CX} cy={GROUND + 1} rx={132} ry={5} fill={url("shadow")} />
        {/* Sandal paste */}
        <g transform={`translate(${OFFER_X[0]} ${GROUND})`}>
          <path d="M -4 0 L -6 -3 L 6 -3 L 4 0 Z" fill="var(--gold)" />
          <path d="M -12 -11 C -12 -4 -6 -3 0 -3 C 6 -3 12 -4 12 -11 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d="M -10 -11 C -7 -17 7 -17 10 -11 Z" fill="var(--art-turmeric)" />
          <path d="M -4 -14 C -1 -15.6 2 -15.6 4 -14" stroke="var(--art-ivory)" strokeWidth={1} strokeLinecap="round" />
          <path d="M 6 -12 L 16 -26" stroke="var(--art-musk)" strokeWidth={2.2} strokeLinecap="round" />
        </g>
        {/* Flowers */}
        <g transform={`translate(${OFFER_X[1]} ${GROUND})`}>
          <path d="M -4 0 L -6 -3 L 6 -3 L 4 0 Z" fill="var(--gold)" />
          <ellipse cy={-5} rx={14} ry={3.2} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          {[
            { x: -7, y: -9, r: 4.6 },
            { x: 6, y: -9, r: 4.4 },
            { x: 0, y: -15, r: 5 },
          ].map((f, i) => (
            <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${i * 30})`}>
              <path d={flower(f.r)} fill="var(--art-crimson)" stroke="var(--gold)" strokeWidth={0.4} />
              <circle r={1.2} fill="var(--art-core)" />
            </g>
          ))}
          <circle cx={-11} cy={-7} r={1.8} fill="var(--art-ivory)" />
          <circle cx={11} cy={-8} r={1.8} fill="var(--art-ivory)" />
        </g>
        {/* Incense */}
        <g transform={`translate(${OFFER_X[2]} ${GROUND})`}>
          <path d={SMOKE} stroke="var(--gold-soft)" strokeWidth={0.9} strokeOpacity={0.6} strokeLinecap="round" />
          <path d="M -3 -6 L -5 -30 M 3 -6 L 5 -30" stroke="var(--art-musk)" strokeWidth={1.1} strokeLinecap="round" />
          <circle className="m-breathe" cx={-5} cy={-30} r={1.3} fill="var(--art-ember)" />
          <circle className="m-breathe m-late" cx={5} cy={-30} r={1.3} fill="var(--art-ember)" />
          <path d="M -8 -8 C -8 -2 -4 0 0 0 C 4 0 8 -2 8 -8 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <ellipse cy={-8} rx={8} ry={1.8} fill="var(--art-musk)" fillOpacity={0.5} />
        </g>
        {/* The lamp */}
        <g transform={`translate(${OFFER_X[3]} ${GROUND})`}>
          <circle className="m-shimmer" cy={-14} r={18} fill={url("spark")} />
          <path d="M -5 0 L -3 -6 L 3 -6 L 5 0 Z" fill="var(--gold)" />
          <g transform="translate(0 -6) scale(2)">
            <StillLamp />
          </g>
        </g>
        {/* Food */}
        <g transform={`translate(${OFFER_X[4]} ${GROUND})`}>
          <path d="M -18 0 C -10 -4 10 -4 18 0 C 10 3 -10 3 -18 0 Z" fill="var(--leaf)" fillOpacity={0.85} />
          <path d="M -10 -9 C -10 -3 -5 -1 0 -1 C 5 -1 10 -3 10 -9 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d="M -9 -9 C -7 -18 7 -18 9 -9 Z" fill="var(--art-ivory)" stroke="var(--gold-soft)" strokeWidth={0.5} />
          <circle cy={-15.6} r={1.8} fill="var(--art-turmeric)" />
        </g>
      </g>

      {/* Bhairava's trident and drum, and his skull-bowl heaped with flowers */}
      <g {...part("bhairava")}>
        <ellipse cx={TRIDENT.drum.x - 24} cy={684} rx={22} ry={4} fill={url("shadow")} />
        <g strokeLinecap="round">
          <Trident t={TRIDENT} />
        </g>
        <g strokeLinejoin="round">
          <Damaru t={TRIDENT} />
        </g>
        <ellipse cx={BOWL.x} cy={BOWL.rim + 62} rx={30} ry={4} fill={url("shadow")} />
        <path d={STAND} stroke="var(--gold)" strokeWidth={1.8} strokeLinecap="round" />
        <path d={`M ${BOWL.x - 17} ${BOWL.rim + 40} L ${BOWL.x + 17} ${BOWL.rim + 40}`} stroke="var(--gold)" strokeWidth={1} />
        <path d={BOWL_BODY} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round" />
        <path d={SUTURE} stroke="var(--art-carve)" strokeWidth={1} strokeLinejoin="round" />
        <g transform={`translate(${BOWL.x} ${BOWL.rim})`}>
          {HEAP_LEAVES.map((l, i) => (
            <path
              key={i}
              d="M 0 0 C -3 -4 -3 -9 0 -13 C 3 -9 3 -4 0 0 Z"
              transform={`translate(${l.x} ${l.y}) rotate(${l.a})`}
              fill="var(--leaf)"
              fillOpacity={0.85}
            />
          ))}
          {HEAP.map((h, i) => (
            <g key={i} transform={`translate(${h.x} ${h.y}) rotate(${i * 23})`}>
              <path d={flower(h.r)} fill={h.red ? "var(--art-crimson)" : "var(--art-vermilion)"} stroke="var(--gold)" strokeWidth={0.5} />
              <circle r={round(h.r * 0.28)} fill="var(--art-core)" />
            </g>
          ))}
          {JASMINE.map((j, i) => (
            <circle key={i} cx={j.x} cy={j.y} r={2.2} fill="var(--art-ivory)" stroke="var(--gold-soft)" strokeWidth={0.4} />
          ))}
        </g>
        <ellipse cx={BOWL.x} cy={BOWL.rim} rx={BOWL.rx} ry={BOWL.ry} stroke="var(--gold)" strokeWidth={1} />
        {FALLEN.map((f, i) => (
          <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${i * 40 + 10})`}>
            <path d={flower(f.r)} fill="var(--art-crimson)" stroke="var(--gold)" strokeWidth={0.5} />
            <circle r={1.2} fill="var(--art-core)" />
          </g>
        ))}
      </g>

      {/* His dog, asleep at the trident's foot */}
      <g {...part("dog")}>
        <g transform={`translate(${DOG.x} ${DOG.y}) scale(${DOG.k})`} opacity={0.8} strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx={4} cy={1} rx={56} ry={4} fill={url("shadow")} />
          <path d={DOG_TAIL} stroke="var(--art-hair)" strokeWidth={3.2} />
          <path d={DOG_BODY} fill="var(--art-hair)" stroke="var(--gold-soft)" strokeWidth={0.6} />
          <path d="M 28 -1.5 L 52 -1.5" stroke="var(--art-hair)" strokeWidth={4} />
          <path d={DOG_HEAD} fill="var(--art-hair)" stroke="var(--gold-soft)" strokeWidth={0.6} />
          <path d={DOG_EAR} fill="var(--art-hair)" stroke="var(--gold-soft)" strokeWidth={0.6} />
          <path d="M -34 -15 C -24 -19 -16 -11 -20 -3" stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.7} />
          <path d="M 34 -12.6 Q 36.5 -11 39 -12.4" stroke="var(--gold-soft)" strokeWidth={0.7} />
          <circle cx={54.6} cy={-5.4} r={1.2} fill="var(--gold-soft)" />
        </g>
      </g>
    </svg>
  );
}
