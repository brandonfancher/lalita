/**
 * Shloka 58 — "Sixty-four services, sixty-four arts".
 *
 * One number said three times, drawn as the place where the third of them
 * was worshipped: a round temple of the sixty-four yoginīs, roofless, seen
 * from in front and a little above, below the card. Its wall is lined inside
 * with niches, each holding one yoginī as a small flame facing the centre, and
 * more of them come in out of the open sky in flocks of eight. In the middle
 * her light stands on a round seat under a royal parasol, with a mirror and a
 * fan crossed behind it, the last of the sixty-four services; round her on the
 * floor lie eight of the sixty-four arts. Which name each part answers to is
 * written up for readers in the registry, next to this artwork's entry.
 */

import { Bell, Parasol, Ruby, Vina, artIds, hash, litPart, partProps, round, tongue } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const BREATHE = ["m-breathe", "m-breathe m-late", "m-breathe m-later"];
const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];
const CX = 320;

/* ── The temple, round and open to the sky ─────────────────────────────── */

/** The courtyard floor's edge (inside the wall), the wall's outer foot, and the wall's height. */
const FLOOR = { y: 556, rx: 206, ry: 92 };
const OUTER = { rx: 222, ry: 98 };
const H = 46;

const on = (rx: number, ry: number, deg: number, lift = 0): Pt => {
  const t = (deg * Math.PI) / 180;
  return { x: round(CX + rx * Math.cos(t)), y: round(FLOOR.y + ry * Math.sin(t) - lift) };
};
const inner = (deg: number, lift = 0) => on(FLOOR.rx, FLOOR.ry, deg, lift);
const outer = (deg: number, lift = 0) => on(OUTER.rx, OUTER.ry, deg, lift);
const xy = (p: Pt) => `${p.x} ${p.y}`;

/** The inside face of the far half of the wall, between its top and the floor. */
const FAR_FACE = [
  `M ${xy(inner(180, H))}`,
  `A ${FLOOR.rx} ${FLOOR.ry} 0 0 1 ${xy(inner(360, H))}`,
  `L ${xy(inner(360))}`,
  `A ${FLOOR.rx} ${FLOOR.ry} 0 0 0 ${xy(inner(180))} Z`,
].join(" ");
/** The top of the wall all the way round: a ring between the inner and outer edges. */
const RIM = [
  `M ${xy(outer(0, H))} A ${OUTER.rx} ${OUTER.ry} 0 1 1 ${xy(outer(180, H))} A ${OUTER.rx} ${OUTER.ry} 0 1 1 ${xy(outer(0, H))} Z`,
  `M ${xy(inner(0, H))} A ${FLOOR.rx} ${FLOOR.ry} 0 1 0 ${xy(inner(180, H))} A ${FLOOR.rx} ${FLOOR.ry} 0 1 0 ${xy(inner(0, H))} Z`,
].join(" ");
/** The outside face of the near half. */
const NEAR_FACE = [
  `M ${xy(outer(0, H))}`,
  `A ${OUTER.rx} ${OUTER.ry} 0 0 1 ${xy(outer(180, H))}`,
  `L ${xy(outer(180))}`,
  `A ${OUTER.rx} ${OUTER.ry} 0 0 0 ${xy(outer(0))} Z`,
].join(" ");
const FLOOR_PATH = `M ${xy(inner(0))} A ${FLOOR.rx} ${FLOOR.ry} 0 1 1 ${xy(inner(180))} A ${FLOOR.rx} ${FLOOR.ry} 0 1 1 ${xy(inner(0))} Z`;

const SLOTS = 64;
const SLOT = 360 / SLOTS;
/** The niches of the far half, each a round-headed recess narrowed as the wall turns away. */
const NICHES = Array.from({ length: SLOTS }, (_, k) => (k + 0.5) * SLOT)
  .filter((deg) => deg > 180)
  .map((deg, i) => {
    const f = Math.abs(Math.sin((deg * Math.PI) / 180));
    const foot = inner(deg, 3);
    const half = round(6.6 * Math.max(f, 0.25));
    const top = round(foot.y - 30);
    return {
      x: foot.x,
      foot: foot.y,
      top,
      d: `M ${round(foot.x - half)} ${foot.y} L ${round(foot.x - half)} ${round(top + half)} A ${half} ${half} 0 0 1 ${round(foot.x + half)} ${round(top + half)} L ${round(foot.x + half)} ${foot.y} Z`,
      shown: f > 0.3,
      s: round(Math.max(f, 0.45)),
      k: i % 3,
    };
  })
  .filter((n) => n.shown);
/** The outside of the near half: a plinth, a coping, and a blind niche in every other bay. */
const PLINTH = 9;
const COPING = 5;
const band = (lift0: number, lift1: number) =>
  [
    `M ${xy(outer(0, lift1))}`,
    `A ${OUTER.rx} ${OUTER.ry} 0 0 1 ${xy(outer(180, lift1))}`,
    `L ${xy(outer(180, lift0))}`,
    `A ${OUTER.rx} ${OUTER.ry} 0 0 0 ${xy(outer(0, lift0))} Z`,
  ].join(" ");
const PLINTH_BAND = band(0, PLINTH);
const COPING_BAND = band(H - COPING, H);
const BLIND = Array.from({ length: SLOTS / 2 }, (_, k) => (k + 0.5) * SLOT)
  .filter((deg, k) => k % 2 === 0 && Math.abs(deg - 90) > 12 && Math.sin((deg * Math.PI) / 180) > 0.3)
  .map((deg) => {
    const f = Math.sin((deg * Math.PI) / 180);
    const foot = outer(deg, PLINTH + 3);
    const half = round(5.4 * f);
    const top = round(foot.y - 22);
    return `M ${round(foot.x - half)} ${foot.y} L ${round(foot.x - half)} ${round(top + half)} A ${half} ${half} 0 0 1 ${round(foot.x + half)} ${round(top + half)} L ${round(foot.x + half)} ${foot.y} Z`;
  })
  .join(" ");

/** The one way in, at the front: a porch with a door. */
const GATE = { x: CX, top: outer(90, H).y - 10, foot: outer(90).y + 2, half: 19 };
const STEPS = [0, 1, 2].map((i) => ({ y: GATE.foot + i * 5, half: 22 + i * 5 }));

/** Young paddy round the temple, in rows that open out toward the viewer, kept off the path. */
const PADDY = [676, 698, 724, 754, 788].flatMap((y, r) => {
  const s = 0.7 + r * 0.16;
  const gap = round(22 + r * 6);
  const count = Math.floor(520 / gap);
  return Array.from({ length: count }, (_, i) => ({ x: round(60 + i * gap + (r % 2) * gap * 0.5 + (hash(r, i) - 0.5) * 6), y: round(y + (hash(i, r) - 0.5) * 4), s }));
}).filter((t) => Math.abs(t.x - CX) > 34 + (t.y - 660) * 0.3 && Math.hypot((t.x - CX) / 250, (t.y - 640) / 40) > 1);
const tuft = (t: (typeof PADDY)[number]) => {
  const k = (n: number) => round(n * t.s);
  return `M ${t.x} ${t.y} Q ${round(t.x - k(2))} ${round(t.y - k(6))} ${round(t.x - k(5))} ${round(t.y - k(9))} M ${t.x} ${t.y} L ${t.x} ${round(t.y - k(11))} M ${t.x} ${t.y} Q ${round(t.x + k(2))} ${round(t.y - k(6))} ${round(t.x + k(5))} ${round(t.y - k(9))}`;
};

/* ── Her light, her seat, and the services ─────────────────────────────── */

const SEAT = { x: CX, y: 552 };
const HER = { x: CX, y: 518 };
const PARASOL = { rim: 470, s: 0.8 };
/** The mirror and the fan, crossed behind the parasol's staff. */
const MIRROR = { head: { x: 396, y: 438 }, foot: { x: 338, y: 508 } };
const FAN = { head: { x: 244, y: 438 }, foot: { x: 302, y: 508 } };
/** A palm-leaf fan's head: pleats fanned from the handle round a disc, bound in vermilion. */
const FAN_R = 17;
const fanAt = (deg: number) => {
  const t = (deg * Math.PI) / 180;
  return `${round(FAN_R * Math.sin(t))} ${round(-15 - FAN_R * Math.cos(t))}`;
};
const FAN_PLEATS = Array.from({ length: 11 }, (_, i) => {
  const a0 = -110 + i * 20;
  return { d: `M 0 2 L ${fanAt(a0)} A ${FAN_R} ${FAN_R} 0 0 1 ${fanAt(a0 + 20)} Z`, light: i % 2 === 0 };
});
const FAN_EDGE = `M ${fanAt(-110)} A ${FAN_R} ${FAN_R} 0 1 1 ${fanAt(110)}`;

/* ── The arts, round her on the floor ──────────────────────────────────── */

type Art = "vina" | "drum" | "bells" | "brush" | "garland" | "gem" | "book" | "parrot";
const ARTS: Art[] = ["gem", "book", "parrot", "garland", "vina", "drum", "bells", "brush"];
const ART_AT = ARTS.map((kind, k) => {
  const deg = 22.5 + k * 45;
  const t = (deg * Math.PI) / 180;
  return { kind, x: round(CX + 152 * Math.cos(t)), y: round(SEAT.y + 40 * Math.sin(t)) };
});
const GARLAND = Array.from({ length: 14 }, (_, i) => {
  const t = (i / 14) * Math.PI * 2;
  return { x: round(13 * Math.cos(t)), y: round(-7 + 5.5 * Math.sin(t)), white: i % 2 === 0 };
});
const ANKLET = Array.from({ length: 7 }, (_, i) => {
  const t = Math.PI * (0.12 + (i / 6) * 0.76);
  return { x: round(13 * Math.cos(t)), y: round(-6 + 5 * Math.sin(t)) };
});

/* ── The yoginīs, coming in by flocks ──────────────────────────────────── */

/** Where the flocks wheel before they come down: a ring in the sky, right of the title. */
const WHEEL = { x: 404, y: 96, rx: 166, ry: 52 };

/** A flock of eight: a wide V of lights, its point at (x, y) heading along d. */
function flock(x: number, y: number, d: Pt, s: number, seed: number) {
  const arm = (side: 1 | -1) => {
    const a = side * 1.02;
    const back = { x: -(d.x * Math.cos(a) - d.y * Math.sin(a)), y: -(d.x * Math.sin(a) + d.y * Math.cos(a)) };
    return Array.from({ length: 4 }, (_, j) => {
      const sweep = (j + 0.5) * 9 * s;
      const p = {
        x: x + back.x * sweep - d.x * j * j * 0.5 * s + (hash(seed, j + side * 7) - 0.5) * 1.6,
        y: y + back.y * sweep - d.y * j * j * 0.5 * s + (hash(j, seed + side * 5) - 0.5) * 1.6,
      };
      return { x: round(p.x), y: round(p.y) };
    });
  };
  return [...arm(1), ...arm(-1)];
}

/** Six flocks wheeling anticlockwise, the near ones larger, and two peeling off for the roof. */
const FLOCKS = [
  ...Array.from({ length: 6 }, (_, i) => {
    const t = ((i * 360) / 6 + 10) * (Math.PI / 180);
    const x = WHEEL.x + WHEEL.rx * Math.cos(t);
    const y = WHEEL.y + WHEEL.ry * Math.sin(t);
    const tan = { x: WHEEL.rx * Math.sin(t), y: -WHEEL.ry * Math.cos(t) };
    const l = Math.hypot(tan.x, tan.y);
    const s = round(0.98 + 0.24 * Math.sin(t));
    return { lights: flock(x, y, { x: tan.x / l, y: tan.y / l }, s, i), s, k: i % 3 };
  }),
  { lights: flock(530, 262, { x: -0.5, y: 0.866 }, 1.2, 7), s: 1.2, k: 1 },
  { lights: flock(132, 318, { x: 0.34, y: 0.94 }, 1.15, 6), s: 1.15, k: 2 },
];
const WHEEL_PATH = `M ${WHEEL.x - WHEEL.rx} ${WHEEL.y} A ${WHEEL.rx} ${WHEEL.ry} 0 1 1 ${WHEEL.x + WHEEL.rx} ${WHEEL.y} A ${WHEEL.rx} ${WHEEL.ry} 0 1 1 ${WHEEL.x - WHEEL.rx} ${WHEEL.y} Z`;
/** The two flocks' ways down, from the wheel to the open roof. */
const DESCENT = [
  `M ${WHEEL.x + WHEEL.rx - 6} ${WHEEL.y + 18} C 590 190 560 240 528 268 C 500 300 470 360 452 410`,
  `M 268 142 C 200 170 150 220 136 300 C 130 340 150 380 176 420`,
].join(" ");

/** One digit of the moon, inside the wheel. */
const MOON = { x: 432, y: 90, r: 10 };

export function YoginiTemple({ idPrefix = "sa58", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={170} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.85 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.36 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu")} cx={HER.x} cy={HER.y} r={34} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("rise")} cy={0.7}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.32 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("yogini")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-core)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("flame")} x1={0} y1={1} x2={0} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)" }} />
        </linearGradient>
        <linearGradient id={id("face")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-carve)", stopOpacity: 0.3 }} />
        </linearGradient>
        <radialGradient id={id("court")} cx={CX} cy={FLOOR.y} r={FLOOR.rx} gradientUnits="userSpaceOnUse" gradientTransform={`translate(0 ${FLOOR.y}) scale(1 ${round(FLOOR.ry / FLOOR.rx)}) translate(0 ${-FLOOR.y})`}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.28 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.1 }} />
        </radialGradient>
        <radialGradient id={id("ground")}>
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("door")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.85 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The round temple of the yoginīs, roofless, its one door at the front */}
      <g {...part("temple")}>
        <ellipse cx={CX} cy={FLOOR.y + 70} rx={310} ry={86} fill={url("ground")} />
        <path d={PADDY.map(tuft).join(" ")} stroke="var(--leaf)" strokeWidth={0.9} strokeOpacity={0.6} strokeLinecap="round" />
        {STEPS.map((s, i) => (
          <rect key={i} x={GATE.x - s.half} y={s.y} width={s.half * 2} height={5} rx={1} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.8} />
        ))}
        <path d={FLOOR_PATH} fill="var(--art-stone)" />
        <path d={FLOOR_PATH} fill={url("court")} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.6} />
        <path d={FAR_FACE} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1} />
        <path d={FAR_FACE} fill={url("face")} />
        {NICHES.map((n, i) => (
          <path key={i} d={n.d} fill="var(--art-carve)" fillOpacity={0.55} stroke="var(--gold)" strokeWidth={0.6} />
        ))}
        <path d={NEAR_FACE} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.1} />
        <path d={NEAR_FACE} fill={url("face")} />
        <path d={PLINTH_BAND} fill="var(--gold-soft)" fillOpacity={0.4} stroke="var(--gold)" strokeWidth={0.8} />
        <path d={COPING_BAND} fill="var(--gold-soft)" fillOpacity={0.3} stroke="var(--gold)" strokeWidth={0.7} />
        <path d={BLIND} fill="var(--art-carve)" fillOpacity={0.35} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.8} />
        <path d={RIM} fillRule="evenodd" fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.1} />
        <path d={RIM} fillRule="evenodd" fill="var(--gold-soft)" fillOpacity={0.35} />
        <g>
          <path
            d={`M ${GATE.x - GATE.half} ${GATE.foot} L ${GATE.x - GATE.half} ${GATE.top + 6} L ${GATE.x} ${GATE.top - 10} L ${GATE.x + GATE.half} ${GATE.top + 6} L ${GATE.x + GATE.half} ${GATE.foot} Z`}
            fill="var(--art-stone)"
            stroke="var(--gold)"
            strokeWidth={1.1}
            strokeLinejoin="round"
          />
          <path d={`M ${GATE.x - 8} ${GATE.foot} L ${GATE.x - 8} ${GATE.top + 14} A 8 8 0 0 1 ${GATE.x + 8} ${GATE.top + 14} L ${GATE.x + 8} ${GATE.foot} Z`} fill="var(--art-carve)" fillOpacity={0.6} stroke="var(--gold)" strokeWidth={0.7} />
          <circle cx={GATE.x} cy={GATE.foot - 9} r={12} fill={url("door")} />
          <circle cx={GATE.x} cy={GATE.top - 13} r={2.4} fill="var(--gold)" />
        </g>
      </g>

      {/* The yoginīs: one in every niche, and more coming in by flocks out of the open sky */}
      <g {...part("yoginis")}>
        {NICHES.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.foot - 7} r={round(8 * n.s)} fill={url("yogini")} />
            <g transform={`translate(${n.x} ${n.foot - 1}) scale(${n.s})`}>
              <path className={BREATHE[n.k]} d={tongue(13, 5.6, 0.6)} fill={url("flame")} />
            </g>
          </g>
        ))}
        <path d={WHEEL_PATH} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.35} strokeDasharray="2 5" strokeLinecap="round" />
        <path d={DESCENT} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.35} strokeDasharray="2 5" strokeLinecap="round" />
        {FLOCKS.map((f, i) => (
          <g key={i}>
            {f.lights.map((p, j) => (
              <g key={j}>
                <circle cx={p.x} cy={p.y} r={round(5.4 * f.s)} fill={url("yogini")} />
                <circle className={TWINKLE[(f.k + j) % 3]} cx={p.x} cy={p.y} r={round(2 * f.s)} fill="var(--art-core)" />
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* The services: the parasol over her, the mirror and the fan */}
      <g {...part("services")}>
        <g strokeLinecap="round">
          <path d={`M ${FAN.foot.x} ${FAN.foot.y} L ${FAN.head.x} ${FAN.head.y}`} stroke="var(--art-turmeric)" strokeWidth={3} />
          <path d={`M ${FAN.foot.x} ${FAN.foot.y} L ${FAN.head.x} ${FAN.head.y}`} stroke="var(--gold)" strokeWidth={0.6} />
          <g transform={`translate(${FAN.head.x + 4} ${FAN.head.y + 5}) rotate(-40)`}>
            {FAN_PLEATS.map((p, i) => (
              <path key={i} d={p.d} fill={p.light ? "var(--art-turmeric)" : "var(--gold-soft)"} stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
            ))}
            <path d={FAN_EDGE} stroke="var(--art-vermilion)" strokeWidth={2.4} />
            <path d={FAN_EDGE} stroke="var(--gold)" strokeWidth={0.6} />
          </g>
          <path d={`M ${MIRROR.foot.x} ${MIRROR.foot.y} L ${MIRROR.head.x} ${MIRROR.head.y}`} stroke="var(--gold)" strokeWidth={3} />
          <path d={`M ${MIRROR.foot.x} ${MIRROR.foot.y} L ${MIRROR.head.x} ${MIRROR.head.y}`} stroke="var(--art-carve)" strokeWidth={0.6} strokeOpacity={0.6} />
          <circle cx={MIRROR.head.x + 6} cy={MIRROR.head.y - 7} r={15} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <circle cx={MIRROR.head.x + 6} cy={MIRROR.head.y - 7} r={11.5} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.6} />
          <path d={`M ${MIRROR.head.x - 1} ${MIRROR.head.y - 11} Q ${MIRROR.head.x + 1} ${MIRROR.head.y - 16} ${MIRROR.head.x + 6} ${MIRROR.head.y - 17}`} stroke="var(--art-core)" strokeWidth={1.4} />
        </g>
        <path d={`M ${CX} ${PARASOL.rim} L ${CX} ${SEAT.y - 16}`} stroke="var(--gold)" strokeWidth={1.6} />
        <g stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round">
          <Parasol cx={CX} rim={PARASOL.rim} s={PARASOL.s} />
        </g>
      </g>

      {/* Eight of the sixty-four arts, laid round her */}
      <g {...part("arts")}>
        {ART_AT.map((a) => (
          <g key={a.kind} transform={`translate(${a.x} ${a.y}) scale(1.15)`}>
            <ellipse rx={17} ry={4} fill="var(--art-carve)" fillOpacity={0.22} />
            {a.kind === "vina" && (
              <g transform="translate(0 -9) scale(0.4)">
                <Vina />
              </g>
            )}
            {a.kind === "drum" && (
              <g stroke="var(--gold)" strokeWidth={0.8}>
                <path d="M -15 -15 Q 0 -21 15 -15 L 15 -1 Q 0 4 -15 -1 Z" fill="var(--art-turmeric)" />
                <path d="M -15 -15 L -8 -1 L -1 -16 L 6 -1 L 13 -15" stroke="var(--art-vermilion)" strokeWidth={0.9} />
                <ellipse cx={-15} cy={-8} rx={3.2} ry={7.2} fill="var(--art-ivory)" />
                <ellipse cx={15} cy={-8} rx={3.2} ry={7.2} fill="var(--art-ivory)" />
                <circle cx={15} cy={-8} r={1.6} fill="var(--art-hair)" strokeWidth={0} />
              </g>
            )}
            {a.kind === "bells" && (
              <g>
                <ellipse cy={-7} rx={13} ry={5} stroke="var(--gold)" strokeWidth={2} />
                {ANKLET.map((b, i) => (
                  <g key={i} transform={`translate(${b.x} ${b.y - 1})`}>
                    <Bell gem={i % 2 ? "var(--art-vermilion)" : "var(--leaf)"} s={0.3} />
                  </g>
                ))}
              </g>
            )}
            {a.kind === "brush" && (
              <g>
                <ellipse cy={-4} rx={14} ry={5} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} />
                <circle cx={-6} cy={-4.5} r={2.4} fill="var(--art-vermilion)" />
                <circle cx={0} cy={-3} r={2.4} fill="var(--leaf)" />
                <circle cx={6} cy={-4.5} r={2.4} fill="var(--art-hair)" />
                <path d="M -12 -16 L 10 -5" stroke="var(--gold)" strokeWidth={2} strokeLinecap="round" />
                <path d="M 10 -5 L 15 -2.5" stroke="var(--art-vermilion)" strokeWidth={2.6} strokeLinecap="round" />
              </g>
            )}
            {a.kind === "garland" && (
              <g>
                <path d="M -6 -2 C -8 4 -9 8 -7 12 M 6 -2 C 8 4 9 8 7 12" stroke="var(--leaf)" strokeWidth={0.8} />
                {GARLAND.map((f, i) => (
                  <circle key={i} cx={f.x} cy={f.y} r={2.5} fill={f.white ? "var(--art-ivory)" : "var(--art-vermilion)"} stroke="var(--gold)" strokeWidth={0.4} />
                ))}
              </g>
            )}
            {a.kind === "gem" && (
              <g>
                <rect x={-13} y={-6} width={26} height={6} rx={1.5} fill="var(--art-hair)" fillOpacity={0.85} stroke="var(--gold)" strokeWidth={0.6} />
                <path d="M -8 -3 L 3 -3.6" stroke="var(--gold)" strokeWidth={1.2} strokeLinecap="round" />
                <Ruby x={6} y={-12} r={5} />
              </g>
            )}
            {a.kind === "book" && (
              <g stroke="var(--gold)" strokeWidth={0.7}>
                <rect x={-17} y={-11} width={34} height={8} rx={2} fill="var(--art-ivory)" />
                <path d="M -15 -9 L 15 -9 M -15 -7 L 15 -7 M -15 -5 L 15 -5" strokeWidth={0.4} strokeOpacity={0.8} />
                <rect x={-18} y={-13} width={36} height={3} rx={1.5} fill="var(--art-turmeric)" />
                <rect x={-18} y={-4} width={36} height={3} rx={1.5} fill="var(--art-turmeric)" />
                <path d="M -8 -13 C -9 -18 -4 -20 -2 -16" stroke="var(--art-vermilion)" strokeWidth={0.9} />
              </g>
            )}
            {a.kind === "parrot" && (
              <g>
                <path d="M -10 -1 L 12 -1" stroke="var(--gold)" strokeWidth={1.4} strokeLinecap="round" />
                <path d="M 2 -2 C -6 -2 -9 -10 -6 -17 C -4 -22 3 -24 6 -20 C 8 -16 8 -8 2 -2 Z" fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.6} />
                <path d="M -5 -6 C -10 -2 -14 2 -18 8" stroke="var(--leaf)" strokeWidth={2.2} strokeLinecap="round" />
                <path d="M 6 -20 C 9 -20 10 -17 8 -15 C 8 -16 7 -17 5.6 -17.4" fill="var(--art-vermilion)" stroke="var(--art-vermilion)" strokeWidth={0.6} />
                <circle cx={3.4} cy={-19.4} r={0.9} fill="var(--art-carve)" />
                <path d="M -2 -18 C 0 -15 1 -14 4 -14" stroke="var(--art-vermilion)" strokeWidth={0.6} />
              </g>
            )}
          </g>
        ))}
      </g>

      {/* Her light on its round seat in the middle */}
      <g {...part("light")}>
        <ellipse cx={CX} cy={360} rx={230} ry={240} fill={url("rise")} />
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={170} fill={url("glow")} />
        <ellipse cx={SEAT.x} cy={SEAT.y + 4} rx={42} ry={13} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1} />
        <path d={`M ${SEAT.x - 42} ${SEAT.y + 4} L ${SEAT.x - 42} ${SEAT.y - 3} M ${SEAT.x + 42} ${SEAT.y + 4} L ${SEAT.x + 42} ${SEAT.y - 3}`} stroke="var(--gold)" strokeWidth={1} />
        <ellipse cx={SEAT.x} cy={SEAT.y - 3} rx={42} ry={13} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1} />
        <ellipse cx={SEAT.x} cy={SEAT.y - 3} rx={42} ry={13} fill="var(--art-saffron)" fillOpacity={0.2} />
        <ellipse cx={SEAT.x} cy={SEAT.y - 8} rx={28} ry={8.5} fill="var(--art-vermilion)" fillOpacity={0.85} stroke="var(--gold)" strokeWidth={0.8} />
        <circle cx={HER.x} cy={HER.y} r={34} fill={url("bindu")} />
        <circle cx={HER.x} cy={HER.y} r={6} fill="var(--art-core)" />
        <circle cx={HER.x} cy={HER.y} r={10} stroke="var(--gold)" strokeWidth={1} />
      </g>

      {/* One digit of the moon */}
      <g {...part("moon")}>
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill="var(--art-hair)" fillOpacity={0.1} stroke="var(--gold)" strokeWidth={0.5} strokeOpacity={0.5} />
        <g transform={`translate(${MOON.x} ${MOON.y}) rotate(-120)`}>
          <path d={litPart(3, MOON.r)} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1} />
        </g>
      </g>
    </svg>
  );
}
