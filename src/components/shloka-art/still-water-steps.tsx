/**
 * Shloka 20 — "The portrait reaches the feet, and beauty is named at its source".
 *
 * Her two feet are two red lotuses standing on still water, a step apart,
 * each ringed by a jewelled anklet whose bells sound in rings across the
 * surface. A female swan keeps pace with them, so slowly that her wake hardly
 * opens. Above, the treasury the third name calls her stands open, and the
 * light of everything lovely in the scene pours down out of it. Which name
 * each part answers to is written up for readers in the registry, next to
 * this artwork's entry.
 */

import { artIds, Bell, glint, OpenLotus, partProps, polyline, round, Star } from "./primitives";
import type { ArtProps } from "./types";

const CX = 320;
const HORIZON = 446;

/* ── The water ─────────────────────────────────────────────────────────── */

/** Long level lines on the still surface, closer together toward the far edge, broken where light lies on them. */
const STILL = Array.from({ length: 15 }, (_, k) => {
  const t = k / 14;
  const y = round(HORIZON + 6 + 300 * t * t + 8 * t);
  const half = round(200 + 140 * t);
  const gap = (k * 37) % 60;
  return [
    `M ${CX - half} ${y} L ${round(CX - 30 - gap)} ${y}`,
    `M ${round(CX + 10 + gap * 0.6)} ${y} L ${CX + half} ${y}`,
  ].join(" ");
});

/* ── Her feet: two lotuses, a step apart, with anklets ─────────────────── */

const FEET = [
  { x: 254, y: 506, s: 0.92, group: 0 },
  { x: 384, y: 530, s: 1, group: 1 },
];
const ANKLET = { rx: 36, ry: 10, dy: -2 };
/** A point on a foot's anklet at angle deg (0 = right, 90 = the far side). */
const onAnklet = (deg: number) => {
  const t = (deg * Math.PI) / 180;
  return { x: round(ANKLET.rx * Math.cos(t)), y: round(ANKLET.dy - ANKLET.ry * Math.sin(t)) };
};
const ankletArc = (from: number, to: number) =>
  polyline(Array.from({ length: 25 }, (_, k) => onAnklet(from + ((to - from) * k) / 24)));
const ANKLET_BACK = ankletArc(0, 180);
const ANKLET_FRONT = ankletArc(180, 360);
/** Bells hang from the near half of each anklet; gems sit between them. */
const ANKLET_BELLS = [206, 240, 270, 300, 334].map((deg, k) => ({ ...onAnklet(deg), gem: k % 2 ? "var(--leaf)" : "var(--art-vermilion)", k }));
const ANKLET_GEMS = [223, 255, 285, 317].map((deg) => onAnklet(deg));
/** Their ringing, spreading over the water as broken rings. */
const RINGING = [56, 84, 116, 152].map((r, k) => ({ rx: r, ry: round(r * 0.26), dash: `${round(10 + k * 4)} ${round(7 + k * 5)}`, opacity: round(0.75 - k * 0.15) }));

/* ── The swan ──────────────────────────────────────────────────────────── */

const SWAN = { x: 474, y: 640, s: 1 };
/** Drawn heading +x on the waterline at the origin, and turned to head left, after her feet. */
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
/** The wake: a few flat rings trailing close behind her, far apart, because she is in no hurry. */
const WAKE_LEN = 190;
const WAKE = [62, 100, 144, 194].map((d, k) => {
  const w = round(16 + k * 8);
  const ry = round(3 + k * 1.2);
  return `M ${-d - w} 0 A ${w} ${ry} 0 0 0 ${-d + w} 0`;
}).join(" ");

/* ── The treasury ──────────────────────────────────────────────────────── */

const CASKET = { x: CX, top: 150, bottom: 204, half: 56 };
const LID = `M ${CX - 52} ${CASKET.top} L ${CX - 46} 104 L ${CX + 46} 104 L ${CX + 52} ${CASKET.top} Z`;
const BOX = `M ${CX - CASKET.half} ${CASKET.top} L ${CX + CASKET.half} ${CASKET.top} L ${CX + CASKET.half - 4} ${CASKET.bottom} L ${CX - CASKET.half + 4} ${CASKET.bottom} Z`;
/** The hoard heaped above the rim. */
const HOARD = Array.from({ length: 26 }, (_, k) => {
  const u = ((k * 0.618) % 1) * 2 - 1;
  const lift = 1 - u * u;
  return {
    x: round(CX + u * 46),
    y: round(CASKET.top - 2 - lift * 20 * (((k * 0.37) % 1) * 0.6 + 0.4)),
    r: round(3.2 + (k % 3) * 0.9),
    fill: ["var(--art-vermilion)", "var(--art-moon)", "var(--leaf)", "var(--gold)", "var(--art-vermilion)"][k % 5],
  };
}).sort((a, b) => a.y - b.y);
/** Pearl strings spilling over the front edge. */
const SPILL = [
  { x0: CX - 22, sag: 30, dx: -8 },
  { x0: CX + 14, sag: 40, dx: 6 },
].map(({ x0, sag, dx }) =>
  Array.from({ length: 9 }, (_, k) => {
    const t = k / 8;
    return { x: round(x0 + dx * t + 4 * Math.sin(t * 3)), y: round(CASKET.top + 2 + sag * t) };
  }),
);
/** Salt: a little heap of white crystals at the front corner of the rim. */
const SALT = [
  { x: CX - 50, y: CASKET.top - 4, r: 4.6, turn: 12 },
  { x: CX - 41, y: CASKET.top - 5, r: 4, turn: 40 },
  { x: CX - 46, y: CASKET.top - 11, r: 3.8, turn: 25 },
  { x: CX - 56, y: CASKET.top - 1, r: 3.4, turn: 55 },
  { x: CX - 34, y: CASKET.top - 2, r: 3.2, turn: 5 },
  { x: CX - 52, y: CASKET.top - 12, r: 3, turn: 70 },
  { x: CX - 40, y: CASKET.top - 14, r: 2.8, turn: 30 },
].filter((c) => c.x > CX - CASKET.half - 2);
const crystal = (r: number) => `M 0 ${-r} L ${r} 0 L 0 ${r} L ${-r} 0 Z M ${round(-r * 0.5)} ${round(-r * 0.5)} L ${round(r * 0.5)} ${round(r * 0.5)}`;
/** What falls from it: points of light on the way down to the water. */
const FALLING = Array.from({ length: 9 }, (_, k) => ({
  x: round(CX + Math.sin(k * 2.1) * (24 + k * 4)),
  y: round(236 + k * 24),
  s: round(4 + (k % 3) * 1.4),
  group: k % 3,
}));

const SWAY = ["m-sway", "m-sway m-late"];
const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

export function StillWaterSteps({ idPrefix = "sa20", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={CX} cy={500} r={300} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.45 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("still")} x1={0} y1={0} x2={640} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.8 }} />
          <stop offset="0.7" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.8 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("hoard-glow")} cx={CX} cy={CASKET.top - 6} r={90} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("lid")} x1={0} y1={104} x2={0} y2={CASKET.top} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)" }} />
        </linearGradient>
        <radialGradient id={id("pool")} cx={CX} cy={560} r={240} gradientUnits="userSpaceOnUse" gradientTransform="translate(0 560) scale(1 0.3) translate(0 -560)">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("wake")} x1={-50} y1={0} x2={-60 - WAKE_LEN} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("column")} cx={CX} cy={380} r={200} gradientUnits="userSpaceOnUse" gradientTransform="translate(320 380) scale(0.5 1) translate(-320 -380)">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-core)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Still water */}
      <g {...part("water")}>
        <circle className="m-shimmer" cx={CX} cy={500} r={300} fill={url("glow")} />
        <path d={`M ${CX - 230} ${HORIZON} L ${CX + 230} ${HORIZON}`} stroke={url("still")} strokeWidth={1.1} />
        {STILL.map((d, i) => (
          <path key={i} d={d} stroke={url("still")} strokeWidth={0.8} strokeOpacity={round(0.9 - i * 0.03)} />
        ))}
      </g>

      {/* The treasury of loveliness, open, its light pouring down */}
      <g {...part("treasury")}>
        <ellipse className="m-shimmer" cx={CX} cy={380} rx={100} ry={200} fill={url("column")} />
        <ellipse className="m-shimmer" cx={CX} cy={560} rx={240} ry={72} fill={url("pool")} />
        {FALLING.map((f, i) => (
          <Star key={i} x={f.x} y={f.y} s={f.s} className={TWINKLE[f.group]} fill="var(--art-core)" />
        ))}
        <circle className="m-breathe" cx={CX} cy={CASKET.top - 6} r={90} fill={url("hoard-glow")} />
        <path d={LID} fill={url("lid")} stroke="var(--gold)" strokeWidth={1.4} strokeLinejoin="round" />
        <path d={`M ${CX - 40} 112 L ${CX + 40} 112 L ${CX + 44} ${CASKET.top - 4} L ${CX - 44} ${CASKET.top - 4} Z`} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.7} />
        {HOARD.map((h, i) => (
          <circle key={i} cx={h.x} cy={h.y} r={h.r} fill={h.fill} stroke="var(--art-carve)" strokeWidth={0.5} />
        ))}
        <g fill="var(--art-core)">
          {HOARD.filter((_, i) => i % 4 === 0).map((h, i) => (
            <path key={i} className={["m-lick", "m-lick m-late", "m-lick m-later"][i % 3]} d={glint(6)} transform={`translate(${h.x} ${h.y})`} />
          ))}
        </g>
        <path d={BOX} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.9} strokeLinejoin="round" />
        <path d={`M ${CX - CASKET.half + 1} ${CASKET.top + 14} L ${CX + CASKET.half - 1} ${CASKET.top + 14} L ${CX + CASKET.half - 3} ${CASKET.top + 34} L ${CX - CASKET.half + 3} ${CASKET.top + 34} Z`} fill="var(--art-vermilion)" stroke="var(--art-carve)" strokeWidth={0.6} />
        {[-36, -18, 0, 18, 36].map((dx, i) => (
          <circle key={dx} cx={CX + dx} cy={CASKET.top + 24} r={i === 2 ? 5 : 3.4} fill={i % 2 ? "var(--leaf)" : "var(--art-moon)"} stroke="var(--gold)" strokeWidth={0.8} />
        ))}
        <path d={`M ${CX - CASKET.half} ${CASKET.top} L ${CX + CASKET.half} ${CASKET.top}`} stroke="var(--art-core)" strokeWidth={1.6} />
        <path d={`M ${CX - CASKET.half + 5} ${CASKET.bottom - 6} L ${CX + CASKET.half - 5} ${CASKET.bottom - 6}`} stroke="var(--art-carve)" strokeWidth={0.7} />
        {[-1, 1].map((side) => (
          <path key={side} d={`M ${CX + side * 44} ${CASKET.bottom} l ${side * 4} 9 l ${-side * 12} 0 Z`} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
        ))}
        {SPILL.map((str, i) => (
          <g key={i}>
            <path d={polyline(str)} stroke="var(--gold)" strokeWidth={0.6} />
            {str.map((p, k) => (
              <circle key={k} cx={p.x} cy={p.y} r={2.3} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.5} />
            ))}
          </g>
        ))}
      </g>

      {/* Salt, which the word for loveliness is made from */}
      <g {...part("salt")}>
        {SALT.map((c, i) => (
          <path key={i} d={crystal(c.r)} transform={`translate(${c.x} ${c.y}) rotate(${c.turn})`} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.6} />
        ))}
      </g>

      {/* Her feet, two lotuses on the water, in jewelled anklets that ring */}
      <g {...part("anklets")}>
        {FEET.map((f, i) => (
          <g key={i} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
            {RINGING.map((r, k) => (
              <ellipse key={k} className="m-shimmer" cy={ANKLET.dy + 2} rx={r.rx} ry={r.ry} stroke="var(--gold)" strokeWidth={1} strokeOpacity={r.opacity} strokeDasharray={r.dash} strokeLinecap="round" />
            ))}
            <path d={ANKLET_BACK} stroke="var(--gold)" strokeWidth={4.2} strokeLinecap="round" />
            <path d={ANKLET_BACK} stroke="var(--art-carve)" strokeWidth={0.7} strokeDasharray="2 2.4" />
            <OpenLotus fill="var(--art-vermilion)" shade="var(--art-crimson)" pad={false} />
            <path d={ANKLET_FRONT} stroke="var(--gold)" strokeWidth={5} strokeLinecap="round" />
            <path d={ANKLET_FRONT} stroke="var(--art-core)" strokeWidth={1} strokeOpacity={0.7} />
            {ANKLET_BELLS.map((b) => (
              <g key={b.k} transform={`translate(${b.x} ${b.y + 1})`}>
                <g className={SWAY[(b.k + f.group) % 2]}>
                  <Bell gem={b.gem} s={0.62} />
                </g>
              </g>
            ))}
            {ANKLET_GEMS.map((g, k) => (
              <circle key={k} cx={g.x} cy={g.y} r={2.4} fill={k % 2 ? "var(--art-moon)" : "var(--art-vermilion)"} stroke="var(--art-carve)" strokeWidth={0.5} />
            ))}
          </g>
        ))}
      </g>

      {/* The swan, keeping their slow pace */}
      <g {...part("swan")}>
        <g transform={`translate(${SWAN.x} ${SWAN.y}) scale(${-SWAN.s} ${SWAN.s})`}>
          <path d={WAKE} stroke={url("wake")} strokeWidth={1.1} strokeLinecap="round" />
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
        </g>
      </g>
    </svg>
  );
}
