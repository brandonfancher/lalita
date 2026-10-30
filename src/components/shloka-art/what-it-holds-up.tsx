/**
 * Shloka 15 — "A waist arrived at by argument".
 *
 * The first name is an inference: her waist cannot be seen, but the creeper
 * of down can, and a creeper has to be growing on something. So the artwork
 * never draws the thing itself. The creeper of Shloka 14 coils up round an
 * upright that isn't there, and the second name's three bands are tied round
 * the same emptiness; wherever either passes behind it, it disappears, and
 * the eye works out what must be standing there. Above, the creeper bows over
 * under the weight of its pair of fruit. Which name each part answers to is
 * written up for readers in the registry, next to this artwork's entry.
 */

import {
  along,
  artIds,
  CreeperLeaf,
  creeperTendril,
  Flash,
  Fruit,
  FRUIT_R,
  FruitGradients,
  partProps,
  polyline,
  radiance,
  round,
  swingFrom,
  taper,
  through,
  type Mark,
} from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

/* ── The upright, never drawn ──────────────────────────────────────────── */

const ROOT_Y = 606;
const MID_Y = 478;
/** How far the turns are seen from above: a ring of radius r shows as an ellipse r by TILT·r. */
const TILT = 0.32;

/** The upright's centre line, leaning a little to the right as it rises, under the weight. */
const axisX = (y: number) => round(320 + 12 * ((ROOT_Y - y) / 430) ** 2);
/** Its half-width: slender, and slenderest at the middle. */
const halfW = (y: number) => 33 - 8 * Math.exp(-(((y - MID_Y) / 80) ** 2));
const coilR = (y: number) => halfW(y) + 4.5;
/** Height climbed in one turn: the turns crowd together between the ties. */
const pitch = (y: number) => 60 - 16 * Math.exp(-(((y - MID_Y) / 90) ** 2));

/** The upright's outline, for hiding whatever passes behind it. */
const SILHOUETTE = (() => {
  const ys = Array.from({ length: 101 }, (_, k) => 140 + k * 5);
  const left = ys.map((y) => ({ x: round(axisX(y) - halfW(y)), y }));
  const right = ys.map((y) => ({ x: round(axisX(y) + halfW(y)), y })).reverse();
  return polyline([...left, ...right]) + " Z";
})();

/* ── The creeper, coiling up round it ──────────────────────────────────── */

type Turn = Pt & { phi: number; front: boolean };

const at = (y: number, phi: number): Turn => {
  const r = coilR(y);
  return { x: round(axisX(y) + r * Math.sin(phi)), y: round(y + TILT * r * Math.cos(phi)), phi, front: Math.cos(phi) >= 0 };
};

/** From the front of the upright at the root, turn by turn, until it reaches the right side near the top. */
const SPIRAL: Turn[] = (() => {
  const out: Turn[] = [];
  const side = (phi: number) => Math.floor((phi - Math.PI / 2) / (2 * Math.PI));
  let phi = 0;
  for (let y = ROOT_Y; ; y -= 1) {
    out.push(at(y, phi));
    const next = phi + (2 * Math.PI) / pitch(y);
    if (y < 206 && side(next) > side(phi)) {
      const top = at(y - 1, Math.PI / 2 + 2 * Math.PI * side(next));
      out.push({ ...top, front: true });
      return out;
    }
    phi = next;
  }
})();
const TOP = SPIRAL[SPIRAL.length - 1];

/** Over the top: the creeper leaves the upright and bows over to the right, to the fork the fruit hang from. */
const CROOK = through([TOP, { x: TOP.x + 10, y: TOP.y - 40 }, { x: TOP.x + 22, y: 118 }, { x: TOP.x + 46, y: 92 }, { x: TOP.x + 78, y: 88 }, { x: TOP.x + 98, y: 100 }]);
const FORK = CROOK[CROOK.length - 1];

const dist = (a: Pt, b: Pt) => Math.hypot(b.x - a.x, b.y - a.y);
const SPIRAL_LEN = SPIRAL.reduce((s, p, i) => (i ? s + dist(SPIRAL[i - 1], p) : 0), 0);
const CROOK_LEN = CROOK.reduce((s, p, i) => (i ? s + dist(CROOK[i - 1], p) : 0), 0);
const VINE_LEN = SPIRAL_LEN + CROOK_LEN;
/** The canon taper, root to tip. */
const vineWidth = (u: number) => 6.2 - 3.6 * u;

/** How far along the whole vine each point of the spiral lies, from 0 at the root to 1 at the tip. */
const SPIRAL_U = SPIRAL.reduce<number[]>((us, p, i) => [...us, i ? us[i - 1] + dist(SPIRAL[i - 1], p) / VINE_LEN : 0], []);

/** The spiral split into runs in front of the upright and behind it, each overlapping the next by one point. */
const RUNS = (() => {
  const runs: { front: boolean; from: number; to: number }[] = [];
  let from = 0;
  for (let i = 1; i <= SPIRAL.length; i++) {
    if (i === SPIRAL.length || SPIRAL[i].front !== SPIRAL[from].front) {
      runs.push({ front: SPIRAL[from].front, from, to: Math.min(i, SPIRAL.length - 1) });
      from = i;
    }
  }
  return runs.map((r) => {
    const pts = SPIRAL.slice(r.from, r.to + 1);
    const u0 = SPIRAL_U[r.from];
    const u1 = SPIRAL_U[r.to];
    return { front: r.front, d: taper(pts, (t) => vineWidth(u0 + t * (u1 - u0))) };
  });
})();
const CROOK_SHAPE = taper(CROOK, (t) => vineWidth((SPIRAL_LEN + t * CROOK_LEN) / VINE_LEN));

/** The direction of travel at a point of the spiral, as a mark for a tendril. */
const markAt = (i: number): Mark => {
  const a = SPIRAL[Math.max(0, i - 1)];
  const b = SPIRAL[Math.min(SPIRAL.length - 1, i + 1)];
  return { x: SPIRAL[i].x, y: SPIRAL[i].y, angle: round((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI), s: 0 };
};

const BAND_Y = [MID_Y - 46, MID_Y, MID_Y + 46];

/** Where the creeper is furthest out to either side, once a half-turn: a leaf there, or now and then a tendril. */
const SIDES = SPIRAL.flatMap((p, i) => {
  if (!i) return [];
  const k = (phi: number) => Math.floor((phi - Math.PI / 2) / Math.PI);
  return k(p.phi) > k(SPIRAL[i - 1].phi) ? [{ i, side: Math.sin(p.phi) > 0 ? 1 : -1 }] : [];
}).filter(({ i }) => SPIRAL[i].y > 214 && BAND_Y.every((b) => Math.abs(SPIRAL[i].y - b) > 15));

const LEAVES = SIDES.filter((_, j) => j % 4 !== 2).map(({ i, side }, j) => {
  const lift = 26 + ((j * 7) % 4) * 6;
  return { x: SPIRAL[i].x, y: SPIRAL[i].y, turn: side > 0 ? -lift : 180 + lift, scale: round(1.5 - 0.6 * SPIRAL_U[i]) };
});

const TENDRILS = SIDES.filter((_, j) => j % 4 === 2).map(({ i, side }, j) => {
  const m = markAt(i);
  const out: 1 | -1 = Math.cos(((m.angle + 55) * Math.PI) / 180) * side > 0 ? 1 : -1;
  return creeperTendril(m, out, 5 - j * 0.3, 1.6);
});

/** Tendrils that have caught hold of the upright: rings round nothing, their backs hidden. */
const GRIPS = [588, 372, 254].map((y) => {
  const cx = axisX(y);
  const rx = round(halfW(y) + 0.6);
  return `M ${round(cx - rx)} ${y} A ${rx} ${round(TILT * rx)} 0 0 0 ${round(cx + rx)} ${y}`;
});

/** The crook's leaves, and the leaves at the fork. */
const CROOK_LEAVES = along(CROOK, 30, 22)
  .filter((p) => p.s < CROOK_LEN - 18)
  .map((p, k) => ({ x: p.x, y: p.y, turn: round(p.angle + (k % 2 ? 64 : -64)), scale: 0.95 }));
const FORK_LEAVES = [
  { x: FORK.x, y: FORK.y, turn: -38, scale: 1.15 },
  { x: FORK.x - 2, y: FORK.y + 1, turn: -150, scale: 0.85 },
];

/* ── The pair of fruit, hanging heavy ──────────────────────────────────── */

const FRUITS = [
  { x: round(FORK.x - 12), y: round(FORK.y + 44) },
  { x: round(FORK.x + 20), y: round(FORK.y + 36) },
];
/** Drawn larger than in Shloka 14, to answer the larger climb. */
const FRUIT_SCALE = 1.3;
const STALK_TOPS = FRUITS.map((f, i) => ({ x: round(f.x - 4 + i * 2), y: round(f.y - FRUIT_R + 1.5) }));

/* ── The three bands ───────────────────────────────────────────────────── */

const BAND_H = 12;
/** Where each band is knotted, in degrees round the front from straight ahead. */
const KNOT_AT = [-26, 34, 6];

const BANDS = BAND_Y.map((y, i) => {
  const cx = axisX(y);
  const rx = round(coilR(y) + 5);
  const ry = round(TILT * rx);
  const yt = y - BAND_H / 2;
  const yb = y + BAND_H / 2;
  const on = (deg: number, yy: number): Pt => {
    const t = (deg * Math.PI) / 180;
    return { x: round(cx + rx * Math.sin(t)), y: round(yy + ry * Math.cos(t)) };
  };
  const arc = (yy: number, sweep: 0 | 1, inset = 0) =>
    `M ${round(cx - rx + inset)} ${yy} A ${round(rx - inset)} ${round(ry - inset * TILT)} 0 0 ${sweep} ${round(cx + rx - inset)} ${yy}`;
  return {
    front: `M ${cx - rx} ${yt} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yt} L ${cx + rx} ${yb} A ${rx} ${ry} 0 0 1 ${cx - rx} ${yb} Z`,
    back: `M ${cx - rx} ${yt} A ${rx} ${ry} 0 0 1 ${cx + rx} ${yt} L ${cx + rx} ${yb} A ${rx} ${ry} 0 0 0 ${cx - rx} ${yb} Z`,
    edges: arc(yt, 0) + " " + arc(yb, 0),
    weave: arc(yt + 2.6, 0, 1) + " " + arc(yb - 2.6, 0, 1),
    pleats: [-64, -44, -22, 16, 40, 62]
      .filter((deg) => Math.abs(deg - KNOT_AT[i]) > 14)
      .map((deg) => {
        const a = on(deg, yt + 1);
        const b = on(deg + 9, yb - 1);
        return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
      })
      .join(" "),
    knot: on(KNOT_AT[i], y),
  };
});

/** The middle band's two loose ends, hanging from its knot. */
const KNOT = BANDS[1].knot;
const ENDS = [
  through([KNOT, { x: KNOT.x + 12, y: KNOT.y + 10 }, { x: KNOT.x + 26, y: KNOT.y + 34 }, { x: KNOT.x + 30, y: KNOT.y + 64 }, { x: KNOT.x + 38, y: KNOT.y + 86 }]),
  through([KNOT, { x: KNOT.x + 6, y: KNOT.y + 14 }, { x: KNOT.x + 12, y: KNOT.y + 36 }, { x: KNOT.x + 11, y: KNOT.y + 56 }, { x: KNOT.x + 16, y: KNOT.y + 70 }]),
].map((pts) => {
  const n = pts.length - 1;
  const end = pts[n];
  const a = pts[n - 3];
  const len = dist(a, end);
  const dir = { x: (end.x - a.x) / len, y: (end.y - a.y) / len };
  const across = (back: number, half: number) => {
    const c = { x: end.x - dir.x * back, y: end.y - dir.y * back };
    return `M ${round(c.x + dir.y * half)} ${round(c.y - dir.x * half)} L ${round(c.x - dir.y * half)} ${round(c.y + dir.x * half)}`;
  };
  const fringe = [-2.6, -1.3, 0, 1.3, 2.6]
    .map((o) => {
      const s = { x: end.x + dir.y * o, y: end.y - dir.x * o };
      return `M ${round(s.x)} ${round(s.y)} L ${round(s.x + dir.x * 7 + dir.y * o * 0.4)} ${round(s.y + dir.y * 7 - dir.x * o * 0.4)}`;
    })
    .join(" ");
  return { d: taper(pts, (t) => 7.4 - 1.4 * t), stripes: across(7, 3.4) + " " + across(10.5, 3.3), fringe };
});

/** The short tucked ends of the outer two knots. */
const FLAPS = [BANDS[0].knot, BANDS[2].knot].map(
  (k, i) => `M ${k.x - 2} ${k.y + 2} L ${round(k.x - 6 + i * 3)} ${k.y + 11} L ${round(k.x - 1 + i * 3)} ${k.y + 10} Z M ${k.x + 2} ${k.y + 2} L ${round(k.x + 4 + i * 3)} ${k.y + 11} L ${round(k.x + 8 + i * 3)} ${k.y + 9} Z`,
);

/* ── Her light, and the thread of sky ──────────────────────────────────── */

const HEART = { x: axisX(MID_Y), y: MID_Y };
const RAYS = { from: 96, long: 350, short: 270 };
const ROOT = { x: SPIRAL[0].x, y: SPIRAL[0].y + 1 };

/** Śaṅkara's thread of sky, "in the shape of the very thinnest ripple on the Yamunā", down the middle of the hollow. */
const SKY = { top: 402, bottom: 560 };
const SKY_THREAD = polyline(
  Array.from({ length: 80 }, (_, k) => {
    const y = SKY.top + (k * (SKY.bottom - SKY.top)) / 79;
    return { x: round(axisX(y) + 1.4 * Math.sin((y - SKY.top) / 3.6)), y: round(y) };
  }),
);

/** A few furrows of the ground it roots in, fading out at the sides. */
const FURROWS = [622, 640, 664, 694].map((y, k) =>
  polyline(
    Array.from({ length: 29 }, (_, i) => {
      const x = 130 + i * 13;
      const u = (x - 320) / 190;
      return { x, y: round(y + (2 + k) * (1 - u * u) + Math.sin(i * 1.9 + k) * 0.5) };
    }),
  ),
);

export function WhatItHoldsUp({ idPrefix = "sa15", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={HEART.x} cy={HEART.y - 40} r={320} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.44 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.15 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient
          id={id("hollow")}
          cx={HEART.x}
          cy={HEART.y}
          r={92}
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(0 ${HEART.y}) scale(1 2.3) translate(0 ${-HEART.y})`}
        >
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.55 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-core)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("rays")} cx={HEART.x} cy={HEART.y} r={RAYS.long} gradientUnits="userSpaceOnUse">
          <stop offset={round(RAYS.from / RAYS.long)} style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset={round(RAYS.from / RAYS.long + 0.12)} style={{ stopColor: "var(--gold)", stopOpacity: 0.62 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient
          id={id("pool")}
          cx={ROOT.x}
          cy={ROOT.y}
          r={62}
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(0 ${ROOT.y}) scale(1 0.24) translate(0 ${-ROOT.y})`}
        >
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("fruit-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.55 }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <FruitGradients id={id} />
        <linearGradient id={id("sky")} x1={0} y1={SKY.top} x2={0} y2={SKY.bottom} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
          <stop offset="0.25" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.85 }} />
          <stop offset="0.75" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.85 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("furrow-fade")} x1={130} y1={0} x2={510} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="0.35" style={{ stopColor: "var(--gold-soft)", stopOpacity: 1 }} />
          <stop offset="0.65" style={{ stopColor: "var(--gold-soft)", stopOpacity: 1 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <mask id={id("behind")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={830} fill="#fff" />
          <path d={SILHOUETTE} fill="#000" />
        </mask>
      </defs>

      {/* Her light, in the hollow where the upright must be, and pooled at the root */}
      <g {...part("support")}>
        <circle className="m-shimmer" cx={HEART.x} cy={HEART.y - 40} r={320} fill={url("glow")} />
        <path className="m-shimmer" d={radiance({ cx: HEART.x, cy: HEART.y, ...RAYS })} stroke={url("rays")} strokeWidth={0.7} />
        <ellipse className="m-shimmer" cx={HEART.x} cy={HEART.y} rx={92} ry={210} fill={url("hollow")} />
        <ellipse cx={ROOT.x} cy={ROOT.y} rx={62} ry={14} fill={url("pool")} />
      </g>

      {/* Śaṅkara's thread of sky, for the attentive */}
      <g {...part("sky-thread")}>
        <path d={SKY_THREAD} stroke={url("sky")} strokeWidth={0.9} strokeLinecap="round" />
      </g>

      {/* The creeper of down, coiling up round what can't be seen */}
      <g {...part("creeper")}>
        {FURROWS.map((d, i) => (
          <path key={i} d={d} stroke={url("furrow-fade")} strokeWidth={0.9} strokeOpacity={round(0.6 - i * 0.1)} strokeLinecap="round" />
        ))}
        <g mask={url("behind")}>
          {RUNS.filter((r) => !r.front).map((r, i) => (
            <path key={i} d={r.d} fill="var(--art-hair)" />
          ))}
          <g stroke="var(--art-hair)" strokeWidth={0.9} strokeLinecap="round">
            {GRIPS.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
        </g>
        <g stroke="var(--art-hair)" strokeWidth={1} strokeLinecap="round">
          {TENDRILS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {LEAVES.map((l, i) => (
          <CreeperLeaf key={i} {...l} />
        ))}
        {RUNS.filter((r) => r.front).map((r, i) => (
          <path key={i} d={r.d} fill="var(--art-hair)" />
        ))}
        <ellipse cx={ROOT.x} cy={ROOT.y} rx={9} ry={2.4} fill="var(--art-core)" fillOpacity={0.8} />
      </g>

      {/* The three bands, tied round the same emptiness */}
      <g {...part("splint")}>
        <g mask={url("behind")}>
          {BANDS.map((b, i) => (
            <g key={i}>
              <path d={b.back} fill="var(--art-vermilion)" />
              <path d={b.back} fill="var(--art-crimson)" fillOpacity={0.45} />
            </g>
          ))}
        </g>
        {BANDS.map((b, i) => (
          <g key={i}>
            <path d={b.front} fill="var(--art-vermilion)" />
            <path d={b.pleats} stroke="var(--art-crimson)" strokeWidth={0.8} strokeOpacity={0.6} strokeLinecap="round" />
            <path d={b.weave} stroke="var(--gold-soft)" strokeWidth={0.7} strokeDasharray="1.2 1.8" />
            <path d={b.edges} stroke="var(--gold)" strokeWidth={1.2} />
          </g>
        ))}
        <g fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.7} strokeLinejoin="round">
          {FLAPS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g className="m-sway" style={swingFrom(KNOT)}>
          {ENDS.map((e, i) => (
            <g key={i}>
              <path d={e.d} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
              <path d={e.stripes} stroke="var(--gold)" strokeWidth={1.3} />
              <path d={e.fringe} stroke="var(--gold)" strokeWidth={0.8} strokeLinecap="round" />
            </g>
          ))}
        </g>
        {BANDS.map((b, i) => (
          <g key={i} transform={`translate(${b.knot.x} ${b.knot.y})`}>
            <ellipse rx={5.6} ry={6} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.9} />
            <path d="M -3.4 -2.4 Q 0 1.6 3.4 -2.4" stroke="var(--art-crimson)" strokeWidth={0.9} strokeLinecap="round" />
          </g>
        ))}
      </g>

      {/* The weight above: the creeper bowed over by its pair of fruit */}
      <g {...part("weight")}>
        <circle className="m-shimmer" cx={round((FRUITS[0].x + FRUITS[1].x) / 2)} cy={round((FRUITS[0].y + FRUITS[1].y) / 2)} r={46} fill={url("fruit-glow")} />
        {CROOK_LEAVES.map((l, i) => (
          <CreeperLeaf key={i} {...l} />
        ))}
        <path d={CROOK_SHAPE} fill="var(--art-hair)" />
        <g className="m-sway" style={swingFrom(FORK)}>
          <g transform={`translate(${FORK.x} ${FORK.y}) scale(${FRUIT_SCALE}) translate(${-FORK.x} ${-FORK.y})`}>
            {STALK_TOPS.map((t, i) => (
              <path
                key={i}
                d={`M ${FORK.x} ${FORK.y} Q ${round(FORK.x + (t.x - FORK.x) * 0.15)} ${round((FORK.y + t.y) / 2)} ${t.x} ${t.y}`}
                stroke="var(--art-hair)"
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            ))}
            {FRUITS.map((f, i) => (
              <Fruit key={i} {...f} stalkTop={STALK_TOPS[i]} url={url} />
            ))}
            <Flash x={FRUITS[1].x - 5} y={FRUITS[1].y - 6} s={12} group={1} />
          </g>
        </g>
        {FORK_LEAVES.map((l, i) => (
          <CreeperLeaf key={i} {...l} />
        ))}
      </g>
    </svg>
  );
}
