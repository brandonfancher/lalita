/**
 * Shloka 14 — "A stake laid down, and a creeper in the garden".
 *
 * The verse looks twice at one thing, first as a market and then as a
 * garden, and the artwork lets the two looks meet in a single pair. Below the
 * card, her light lies in the water of a gardener's basin, and from it rises
 * a slender dark creeper, the line of down. It climbs past the card and up
 * onto a gaming board, where its two fruit lie as her counter-stake, level
 * with the jewel of Kāmeśvara's love, which rests in his crescent on the other
 * side. What grew is what she lays down. Which name each part answers to is
 * written up for readers in the registry, next to this artwork's entry.
 */

import { artIds, diamond, Flash, glint, litPart, partProps, round, swingFrom, taper } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };
type Mark = Pt & { angle: number; s: number };

const CX = 320;

/** A smooth curve through `pts` (Catmull-Rom), sampled `per` times between each pair. */
function through(pts: Pt[], per = 16): Pt[] {
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

const line = (ps: Pt[]) => ps.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");

/** Points every `step` units along a sampled curve, with the direction of travel there (degrees, SVG). */
function along(pts: Pt[], step: number, from = 0): Mark[] {
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

/* ── The garden: the basin, its water, and her light ───────────────────── */

/** The basin (ālavāla) seen at a slant: the top of its bank, and the water inside. */
const BASIN = { x: CX, y: 548, rx: 124, ry: 33, innerRx: 100, innerRy: 25 };
const LIGHT = { x: CX, y: 546 };

const onEllipse = (rx: number, ry: number, deg: number, dy = 0): Pt => {
  const t = (deg * Math.PI) / 180;
  return { x: round(BASIN.x + rx * Math.cos(t)), y: round(BASIN.y + dy - ry * Math.sin(t)) };
};
/** Crumbs of earth along the top of the bank, where the gardener's hoe left them. */
const CRUMBS = Array.from({ length: 30 }, (_, k) => {
  const deg = k * 12 + ((k * 7) % 5);
  const off = (k % 3) - 1;
  return { ...onEllipse((BASIN.rx + BASIN.innerRx) / 2 + off * 4, (BASIN.ry + BASIN.innerRy) / 2 + off, deg), r: round(0.9 + (k % 4) * 0.3) };
});
/** Ripples spreading from where the creeper leaves the water. */
const RIPPLES = [0.22, 0.42, 0.62, 0.82].map((f, k) => ({ rx: round(BASIN.innerRx * f), ry: round(BASIN.innerRy * f), opacity: round(0.75 - k * 0.15) }));

/** The raked bed the basin is dug in: furrows running across, closer together toward the far side, fading out at the sides. */
const FURROW_Y = [500, 509, 519, 530, 572, 588, 606, 627, 651, 678];
const FURROWS = FURROW_Y.map((y, k) => {
  const sag = 3 + (y - 500) * 0.04;
  const pts = Array.from({ length: 41 }, (_, i) => {
    const x = 60 + i * 13;
    const u = (x - BASIN.x) / 260;
    return { x, y: round(y + sag * (1 - u * u) + Math.sin(i * 1.7 + k) * 0.6) };
  });
  return { d: line(pts), opacity: round(0.75 - Math.abs(y - 560) / 260) };
});
/** Clods along the near furrows. */
const CLODS = FURROW_Y.slice(4, 8).flatMap((y, k) =>
  Array.from({ length: 9 }, (_, i) => {
    const x = 132 + i * 44 + ((k * 17) % 30);
    const u = (x - BASIN.x) / 260;
    return { x, y: round(y + (3 + (y - 500) * 0.04) * (1 - u * u) - 1.6), r: round(1 + ((i + k) % 3) * 0.35) };
  }),
).filter((c) => Math.abs(c.x - BASIN.x) > BASIN.rx + 8 || c.y > BASIN.y + BASIN.ry + 12);

/* ── The creeper, the line of down ─────────────────────────────────────── */

/** From her light at the root, sweeping left under the card, up its left side, and over onto the board. */
const VINE = through([
  LIGHT,
  { x: 314, y: 508 },
  { x: 290, y: 470 },
  { x: 236, y: 442 },
  { x: 176, y: 424 },
  { x: 136, y: 382 },
  { x: 120, y: 312 },
  { x: 122, y: 242 },
  { x: 142, y: 200 },
  { x: 190, y: 178 },
  { x: 238, y: 170 },
  { x: 276, y: 164 },
]);
const VINE_SHAPE = taper(VINE, (t) => 6.2 - 3.6 * t);
const VINE_END = VINE[VINE.length - 1];
const MARKS = along(VINE, 1);
const at = (s: number) => MARKS[Math.min(MARKS.length - 1, Math.round(s))];
const VINE_LEN = MARKS.length - 1;

/** A heart-based pointed leaf on a short stalk, from the origin along +x. */
const LEAF = "M 4 0 C 4 -6 9 -10 15 -8.5 C 20 -7 23 -3 27 0 C 23 3 20 7 15 8.5 C 9 10 4 6 4 0 Z";
const LEAF_RIB = "M 0 0 L 4 0 Q 14 -0.6 25 0";
const LEAF_VEINS = "M 10 -0.3 L 14 -5 M 16 -0.3 L 20 -4 M 10 0.3 L 14 5 M 16 0.3 L 20 4";
const LEAVES = along(VINE, 23, 26)
  .filter((p) => p.s < VINE_LEN - 30 && (p.s < 180 || p.s > 232))
  .map((p, k) => ({ ...p, turn: round(p.angle + (k % 2 ? 62 : -62)), scale: round(1.25 - (p.s / VINE_LEN) * 0.4) }));

/** A tendril leaving the vine at `p` and coiling to one side. */
function tendril(p: Mark, side: 1 | -1, r0: number, turns: number) {
  const out = ((p.angle + side * 55) * Math.PI) / 180;
  const c = { x: p.x + Math.cos(out) * r0 * 1.6, y: p.y + Math.sin(out) * r0 * 1.6 };
  const start = Math.atan2(p.y - c.y, p.x - c.x);
  const n = 48;
  return line(
    Array.from({ length: n + 1 }, (_, i) => {
      const t = i / n;
      const r = r0 * 1.6 * (1 - 0.82 * t ** 0.7);
      const a = start + side * t * turns * 2 * Math.PI;
      return { x: round(c.x + Math.cos(a) * r), y: round(c.y + Math.sin(a) * r) };
    }),
  );
}
const TENDRILS = [
  tendril(at(64), 1, 6, 1.7),
  tendril(at(150), -1, 5.5, 1.6),
  tendril(at(300), 1, 5, 1.8),
  tendril(at(420), -1, 5, 1.6),
  tendril(at(520), -1, 4.5, 1.5),
];

/** Śaṅkara's bud (mukula), hanging on a short stalk where the vine climbs the card's side. */
const BUD_NODE = at(206);
const BUD = { x: round(BUD_NODE.x - 9), y: round(BUD_NODE.y + 26) };

/* ── The board, and the two stakes ─────────────────────────────────────── */

/** An eight-by-eight board (aṣṭāpada) seen at a slant: its far and near edges, and the depth of its front. */
const BOARD = { far: { y: 145, x0: 252, x1: 490 }, near: { y: 190, x0: 222, x1: 516 }, face: 7 };
const N = 8;
function onBoard(u: number, v: number): Pt {
  const y = BOARD.far.y + (BOARD.near.y - BOARD.far.y) * v;
  const x0 = BOARD.far.x0 + (BOARD.near.x0 - BOARD.far.x0) * v;
  const x1 = BOARD.far.x1 + (BOARD.near.x1 - BOARD.far.x1) * v;
  return { x: round(x0 + (x1 - x0) * u), y: round(y) };
}
const quad = (u0: number, v0: number, u1: number, v1: number) =>
  line([onBoard(u0, v0), onBoard(u1, v0), onBoard(u1, v1), onBoard(u0, v1)]) + " Z";
const BOARD_TOP = quad(0, 0, 1, 1);
const BOARD_FACE =
  line([
    onBoard(0, 1),
    onBoard(1, 1),
    { x: BOARD.near.x1, y: BOARD.near.y + BOARD.face },
    { x: BOARD.near.x0, y: BOARD.near.y + BOARD.face },
  ]) + " Z";
/** The playing field, inside a vermilion border. */
const M0 = 0.035;
const MV = 0.09;
const fieldAt = (u: number, v: number) => onBoard(M0 + (1 - 2 * M0) * u, MV + (1 - 2 * MV) * v);
const FIELD = line([fieldAt(0, 0), fieldAt(1, 0), fieldAt(1, 1), fieldAt(0, 1)]) + " Z";
const GRID = Array.from({ length: N - 1 }, (_, k) => {
  const f = (k + 1) / N;
  const [a, b, c, d] = [fieldAt(f, 0), fieldAt(f, 1), fieldAt(0, f), fieldAt(1, f)];
  return `M ${a.x} ${a.y} L ${b.x} ${b.y} M ${c.x} ${c.y} L ${d.x} ${d.y}`;
}).join(" ");
/** The marked squares of the old board, crossed: the four corners and the four at the centre. */
const MARKED = [
  [0, 0],
  [7, 0],
  [0, 7],
  [7, 7],
  [3, 3],
  [4, 3],
  [3, 4],
  [4, 4],
]
  .map(([i, j]) => {
    const [a, b, c, d] = [
      fieldAt((i + 0.22) / N, (j + 0.22) / N),
      fieldAt((i + 0.78) / N, (j + 0.78) / N),
      fieldAt((i + 0.78) / N, (j + 0.22) / N),
      fieldAt((i + 0.22) / N, (j + 0.78) / N),
    ];
    return `M ${a.x} ${a.y} L ${b.x} ${b.y} M ${c.x} ${c.y} L ${d.x} ${d.y}`;
  })
  .join(" ");
/** Little feet under the board's front. */
const FEET = [0.04, 0.96].map((u) => onBoard(u, 1).x);

/** Two oblong dice (pāśaka) thrown between the stakes. */
const DICE = [
  { ...onBoard(0.6, 0.55), turn: -10, pips: 3 },
  { ...onBoard(0.67, 0.75), turn: 16, pips: 4 },
];

/** Her side: the two fruit, where the creeper lays them down. */
const FRUIT_R = 15;
const FRUITS = [
  { x: 306, y: 161 },
  { x: 340, y: 166 },
];
const FORK = { x: VINE_END.x + 6, y: VINE_END.y - 5 };
const STALK_TOPS = FRUITS.map((f, i) => ({ x: round(f.x - 4 + i * 2), y: round(f.y - FRUIT_R + 1.5) }));
/** A leaf on each fruit's stalk, and one at the fork. */
const FRUIT_LEAVES = [
  { x: FORK.x, y: FORK.y, turn: 150, scale: 1.05 },
  { x: STALK_TOPS[0].x - 1, y: STALK_TOPS[0].y - 3, turn: -112, scale: 0.8 },
  { x: STALK_TOPS[1].x + 1, y: STALK_TOPS[1].y - 3, turn: -38, scale: 0.85 },
];

/** His side: the jewel of his love, held upright in his crescent, horns up, resting on the board. */
const JEWEL = { x: 452, y: 149, r: 17 };
const GEM = diamond(JEWEL);
const MOON_R = 25;
const CRESCENT = litPart(4, MOON_R);
const MOON_C = { x: JEWEL.x, y: JEWEL.y + 1 };
const MOON_FOOT = MOON_C.y + MOON_R;

/** The same soft light under each stake, so neither outshines the other. */
const STAKE_GLOW_R = 40;
const PAIR = { x: (FRUITS[0].x + FRUITS[1].x) / 2, y: (FRUITS[0].y + FRUITS[1].y) / 2 };

export function GrownStake({ idPrefix = "sa14", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={LIGHT.x} cy={LIGHT.y - 20} r={300} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.46 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient
          id={id("water")}
          cx={LIGHT.x}
          cy={LIGHT.y}
          r={BASIN.innerRx}
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(0 ${LIGHT.y}) scale(1 ${round(BASIN.innerRy / BASIN.innerRx)}) translate(0 ${-LIGHT.y})`}
        >
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.8 }} />
          <stop offset="0.85" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.75 }} />
        </radialGradient>
        <radialGradient
          id={id("bank-shade")}
          cx={BASIN.x}
          cy={BASIN.y + 6}
          r={BASIN.rx + 10}
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(0 ${BASIN.y + 6}) scale(1 ${round((BASIN.ry + 10) / (BASIN.rx + 10))}) translate(0 ${-(BASIN.y + 6)})`}
        >
          <stop offset="0.8" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("stake-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
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
        <linearGradient id={id("furrow-fade")} x1={BASIN.x - 280} y1={0} x2={BASIN.x + 280} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "var(--gold-soft)", stopOpacity: 1 }} />
          <stop offset="0.7" style={{ stopColor: "var(--gold-soft)", stopOpacity: 1 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>

      {/* The board, with the jewel of his love on his side */}
      <g {...part("stake")}>
        <circle className="m-shimmer" cx={JEWEL.x} cy={JEWEL.y + 12} r={STAKE_GLOW_R} fill={url("stake-glow")} />
        {FEET.map((x, i) => (
          <rect key={i} x={x - 5} y={BOARD.near.y + BOARD.face - 1} width={10} height={4} rx={1} fill="var(--gold)" />
        ))}
        <path d={BOARD_FACE} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} strokeLinejoin="round" />
        <path d={`M ${BOARD.near.x0 + 2} ${BOARD.near.y + 3.5} L ${BOARD.near.x1 - 2} ${BOARD.near.y + 3.5}`} stroke="var(--art-carve)" strokeWidth={0.6} strokeDasharray="1.5 2.5" />
        <path d={BOARD_TOP} fill="var(--gold)" />
        <path d={FIELD} fill="var(--art-stone)" />
        <path d={FIELD} fill="var(--art-saffron)" fillOpacity={0.16} />
        <path d={line([fieldAt(-0.012, -0.05), fieldAt(1.012, -0.05), fieldAt(1.012, 1.05), fieldAt(-0.012, 1.05)]) + " Z"} stroke="var(--art-vermilion)" strokeWidth={0.9} strokeLinejoin="round" />
        <path d={GRID} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.8} />
        <path d={MARKED} stroke="var(--art-vermilion)" strokeWidth={0.8} />
        <path d={FIELD} stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
        <path d={BOARD_TOP} stroke="var(--gold)" strokeWidth={1.8} strokeLinejoin="round" />

        {DICE.map((d, i) => (
          <g key={i} transform={`translate(${d.x} ${d.y}) rotate(${d.turn}) scale(1 0.72)`}>
            <rect x={-11} y={-3.8} width={22} height={7.6} rx={2} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.7} />
            {Array.from({ length: d.pips }, (_, k) => (
              <circle key={k} cx={round(-6.5 + (k * 13) / (d.pips - 1))} cy={0} r={1.2} fill="var(--art-crimson)" />
            ))}
          </g>
        ))}

        <ellipse cx={JEWEL.x} cy={MOON_FOOT} rx={16} ry={3.2} fill="var(--art-crimson)" fillOpacity={0.28} />
        <g transform={`translate(${MOON_C.x} ${MOON_C.y}) rotate(180)`}>
          <path d={CRESCENT} stroke="var(--art-moon)" strokeWidth={9} strokeOpacity={0.3} strokeLinejoin="round" />
          <path d={CRESCENT} stroke="var(--art-moon)" strokeWidth={4.5} strokeOpacity={0.45} strokeLinejoin="round" />
          <path d={CRESCENT} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.4} strokeLinejoin="round" />
        </g>
        <path d={GEM.girdle} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.2} strokeLinejoin="round" />
        <path d={GEM.table + " " + GEM.facets} stroke="var(--gold-soft)" strokeWidth={0.7} />
        <g transform={`translate(${JEWEL.x - 6} ${JEWEL.y - 6})`}>
          <path d={glint(5.5)} fill="var(--art-core)" />
        </g>
        <Flash x={JEWEL.x + 4} y={JEWEL.y - 3} s={15} group={0} />
      </g>

      {/* The garden: her light in the basin's water, and the creeper rising from it */}
      <g {...part("creeper")}>
        <circle className="m-shimmer" cx={LIGHT.x} cy={LIGHT.y - 20} r={300} fill={url("glow")} />

        {FURROWS.map((f, i) => (
          <path key={i} d={f.d} stroke={url("furrow-fade")} strokeWidth={0.9} strokeOpacity={f.opacity} strokeLinecap="round" />
        ))}
        <g fill="var(--gold-soft)" fillOpacity={0.55}>
          {CLODS.map((c, i) => (
            <ellipse key={i} cx={c.x} cy={c.y} rx={round(c.r * 1.6)} ry={c.r} />
          ))}
        </g>

        <ellipse cx={BASIN.x} cy={BASIN.y + 6} rx={BASIN.rx + 10} ry={BASIN.ry + 10} fill={url("bank-shade")} />
        <ellipse cx={BASIN.x} cy={BASIN.y} rx={BASIN.rx} ry={BASIN.ry} fill="var(--art-stone)" />
        <ellipse cx={BASIN.x} cy={BASIN.y} rx={BASIN.rx} ry={BASIN.ry} fill="var(--art-saffron)" fillOpacity={0.2} />
        <ellipse cx={BASIN.x} cy={BASIN.y} rx={BASIN.rx} ry={BASIN.ry} fill="var(--art-musk)" fillOpacity={0.1} />
        <ellipse cx={BASIN.x} cy={BASIN.y} rx={BASIN.rx} ry={BASIN.ry} stroke="var(--gold)" strokeWidth={1.2} strokeOpacity={0.85} />
        <g fill="var(--art-musk)" fillOpacity={0.28}>
          {CRUMBS.map((c, i) => (
            <ellipse key={i} cx={c.x} cy={c.y} rx={round(c.r * 1.5)} ry={c.r} />
          ))}
        </g>
        <ellipse cx={BASIN.x} cy={BASIN.y} rx={BASIN.innerRx} ry={BASIN.innerRy} fill={url("water")} />
        <path
          d={`M ${BASIN.x - BASIN.innerRx + 6} ${BASIN.y - 4} Q ${BASIN.x} ${BASIN.y - BASIN.innerRy - 4} ${BASIN.x + BASIN.innerRx - 6} ${BASIN.y - 4}`}
          stroke="var(--art-crimson)"
          strokeWidth={2.2}
          strokeOpacity={0.18}
        />
        <g stroke="var(--art-ivory)" strokeWidth={0.8}>
          {RIPPLES.map((r, i) => (
            <ellipse key={i} className="m-shimmer" cx={LIGHT.x} cy={LIGHT.y} rx={r.rx} ry={r.ry} strokeOpacity={r.opacity} />
          ))}
        </g>
        <ellipse cx={BASIN.x} cy={BASIN.y} rx={BASIN.innerRx} ry={BASIN.innerRy} stroke="var(--gold)" strokeWidth={1.1} />

        <circle className="m-shimmer" cx={LIGHT.x} cy={LIGHT.y} r={30} fill={url("bindu-glow")} />

        <g stroke="var(--art-hair)" strokeWidth={1} strokeLinecap="round">
          {TENDRILS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {LEAVES.map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.turn}) scale(${l.scale})`}>
            <path d={LEAF} fill="var(--leaf)" />
            <path d={LEAF_RIB} stroke="var(--gold-soft)" strokeWidth={0.6} />
            <path d={LEAF_VEINS} stroke="var(--gold-soft)" strokeWidth={0.4} strokeOpacity={0.8} />
          </g>
        ))}
        <path d={VINE_SHAPE} fill="var(--art-hair)" />
        <path d={line(VINE.slice(2, -4))} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.6} transform="translate(-1 -0.8)" />

        <circle cx={LIGHT.x} cy={LIGHT.y} r={10} fill="var(--art-saffron)" fillOpacity={0.75} />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={6.5} stroke="var(--art-core)" strokeWidth={0.8} />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={3.6} fill="var(--art-core)" />
      </g>

      {/* The bud, for the attentive */}
      <g {...part("bud")}>
        <g className="m-sway" style={swingFrom(BUD_NODE)}>
          <path d={`M ${BUD_NODE.x} ${BUD_NODE.y} Q ${BUD_NODE.x - 10} ${BUD_NODE.y + 8} ${BUD.x} ${BUD.y - 8}`} stroke="var(--art-hair)" strokeWidth={1.2} strokeLinecap="round" />
          <path
            d={`M ${BUD.x} ${BUD.y - 8} C ${BUD.x - 6} ${BUD.y - 3} ${BUD.x - 5} ${BUD.y + 6} ${BUD.x} ${BUD.y + 11} C ${BUD.x + 5} ${BUD.y + 6} ${BUD.x + 6} ${BUD.y - 3} ${BUD.x} ${BUD.y - 8} Z`}
            fill="var(--art-turmeric)"
            stroke="var(--gold)"
            strokeWidth={0.7}
          />
          <path d={`M ${BUD.x} ${BUD.y + 11} C ${BUD.x + 2.4} ${BUD.y + 5} ${BUD.x + 2.4} ${BUD.y} ${BUD.x} ${BUD.y - 5}`} stroke="var(--art-saffron)" strokeWidth={0.8} />
          <path d={`M ${BUD.x - 5.4} ${BUD.y - 3} Q ${BUD.x} ${BUD.y - 10} ${BUD.x + 5.4} ${BUD.y - 3} L ${BUD.x} ${BUD.y - 7} Z`} fill="var(--leaf)" />
        </g>
      </g>

      {/* Her counter-stake: the creeper's two fruit, laid on her side of the board */}
      <g {...part("fruit")}>
        <circle className="m-shimmer" cx={PAIR.x} cy={PAIR.y + 8} r={STAKE_GLOW_R} fill={url("stake-glow")} />
        {FRUITS.map((f, i) => (
          <ellipse key={i} cx={f.x + 2} cy={f.y + FRUIT_R - 1.5} rx={FRUIT_R} ry={3.4} fill="var(--art-crimson)" fillOpacity={0.28} />
        ))}
        <path d={`M ${VINE_END.x} ${VINE_END.y} Q ${FORK.x - 3} ${FORK.y + 1} ${FORK.x} ${FORK.y}`} stroke="var(--art-hair)" strokeWidth={2.6} strokeLinecap="round" />
        {STALK_TOPS.map((t, i) => (
          <path
            key={i}
            d={`M ${FORK.x} ${FORK.y} Q ${round((FORK.x + t.x) / 2)} ${round(Math.min(FORK.y, t.y) - 3 - i * 3)} ${t.x} ${t.y}`}
            stroke="var(--art-hair)"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        ))}
        {FRUITS.map((f, i) => (
          <g key={i}>
            <ellipse cx={f.x} cy={f.y + 0.5} rx={FRUIT_R + 0.8} ry={FRUIT_R - 0.5} fill={url("fruit")} stroke="var(--gold)" strokeWidth={1} />
            <ellipse cx={f.x} cy={f.y + 0.5} rx={FRUIT_R + 0.8} ry={FRUIT_R - 0.5} fill={url("blush")} />
            <path
              d={`M ${round(f.x - 9)} ${round(f.y - 3)} A 11 11 0 0 1 ${round(f.x - 2)} ${round(f.y - 10.5)}`}
              stroke="var(--art-ivory)"
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeOpacity={0.75}
            />
            <ellipse cx={STALK_TOPS[i].x} cy={STALK_TOPS[i].y + 0.6} rx={2.2} ry={1} fill="var(--art-saffron)" />
          </g>
        ))}
        {FRUIT_LEAVES.map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.turn}) scale(${l.scale})`}>
            <path d={LEAF} fill="var(--leaf)" />
            <path d={LEAF_RIB} stroke="var(--gold-soft)" strokeWidth={0.6} />
            <path d={LEAF_VEINS} stroke="var(--gold-soft)" strokeWidth={0.4} strokeOpacity={0.8} />
          </g>
        ))}
        <Flash x={FRUITS[1].x - 5} y={FRUITS[1].y - 6} s={12} group={1} />
      </g>
    </svg>
  );
}
