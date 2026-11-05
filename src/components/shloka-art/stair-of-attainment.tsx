/**
 * Shloka 55 — "Six goods of practice, and the sovereign of those who obtain them".
 *
 * A temple stair of eight steps, the lesser attainments, and at its head her
 * light, the arrival they lead to. Over it, in the crown, two royal fly-whisks
 * cross, bound by a clasp of eight pearls for the eight powers of a lord. A
 * lion and an elephant sit on the plinths at the stair's foot, for valour and
 * for strength (the Yoga Sūtra's "strength of an elephant", 3.24). On the
 * landing a clear crystal takes her light, as the refined mind takes the form
 * of what it rests on (1.41), and a banana leaf is spread with what has been
 * offered her to enjoy. At the foot of the stair three pairs of sandals have
 * been left by the masters of the three lineages, who go up to her barefoot
 * like anyone else. Which name each part answers to is written up for readers
 * in the registry, next to this artwork's entry.
 */

import { Elephant, ELEPHANT_TRUNK, ElephantDefs, Lion, StillLamp, artIds, hash, partProps, polar, radiance, round } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];
const CX = 320;

/* ── Her light, at the head of the stair ──────────────────────────────── */

const HER = { x: CX, y: 464 };
const RADIANCE = radiance({ cx: HER.x, cy: HER.y, from: 18, long: 56, short: 40 });

/* ── The stair: a landing and eight steps ─────────────────────────────── */

const LANDING = { back: 470, front: 488 };
/** The edges between steps, from the landing's front down to the ground. */
const EDGES = [488, 497, 507, 518, 530, 543, 557, 572, 588];
const GROUND = EDGES[EDGES.length - 1];
const half = (y: number) => round(82 + (y - LANDING.front) * 0.6);
const quad = (y0: number, h0: number, y1: number, h1: number) => `M ${CX - h0} ${y0} L ${CX + h0} ${y0} L ${CX + h1} ${y1} L ${CX - h1} ${y1} Z`;
const STEPS = EDGES.slice(0, -1).map((a, k) => {
  const b = EDGES[k + 1];
  const f = round(a + 0.36 * (b - a));
  return { tread: quad(a, half(a), f, half(f)), riser: quad(f, half(f), b, half(b)), edge: `M ${CX - half(f)} ${f} L ${CX + half(f)} ${f}`, k };
});
const LANDING_D = quad(LANDING.back, 76, LANDING.front, 82);
/** The parapets down both sides, their coping a gold line. */
const PARAPET = [-1, 1].map((s) => {
  const top = { x: CX + s * 78, y: 456 };
  const foot = { x: CX + s * 150, y: 566 };
  return {
    wall: `M ${top.x} ${top.y} L ${foot.x} ${foot.y} L ${foot.x} ${GROUND} L ${CX + s * half(GROUND)} ${GROUND} L ${CX + s * 82} ${LANDING.front} L ${CX + s * 76} ${LANDING.back} Z`,
    coping: `M ${top.x} ${top.y} L ${foot.x} ${foot.y}`,
  };
});
/** A steady lamp on the coping beside each step, both sides. */
const LAMPS = [-1, 1].flatMap((s) =>
  Array.from({ length: 8 }, (_, k) => {
    const t = (k + 0.5) / 8;
    return { x: round(CX + s * (78 + 72 * t)), y: round(456 + 110 * t - 1), k: round(1.05 + 0.4 * t) };
  }),
);
/** The sanctum door the stair goes up to, behind her light and under the card. */
const DOOR = { left: 266, right: 374, top: 262, post: 13, lintel: 16 };
const DOOR_JAMBS = [DOOR.left, DOOR.right - DOOR.post].map((x) => `M ${x} ${LANDING.back} L ${x} ${DOOR.top} L ${x + DOOR.post} ${DOOR.top} L ${x + DOOR.post} ${LANDING.back} Z`).join(" ");
const DOOR_LINTEL = `M ${DOOR.left - 14} ${DOOR.top} L ${DOOR.right + 14} ${DOOR.top} L ${DOOR.right + 14} ${DOOR.top - DOOR.lintel} L ${DOOR.left - 14} ${DOOR.top - DOOR.lintel} Z`;
const PLINTHS = [
  { x: 104, w: 88 },
  { x: 446, w: 90 },
].map(({ x, w }) => ({ x, w, top: 566, face: 574, foot: 602 }));

/* ── The lion and the elephant on their plinths ───────────────────────── */

const LION = { x: 110, k: 0.76 };
const ELEPHANT = { x: 490, k: 0.74 };

/* ── On the landing: the crystal, and the feast ───────────────────────── */

const CRYSTAL = { x: 268, y: 484, k: 1.15 };
/** A clear quartz point, base at the origin: a six-sided prism seen across two faces, ending in a point. */
const CRYSTAL_BODY = "M -6.5 0 L -6.5 -22 L 0 -33 L 6.5 -22 L 6.5 0 Z";
const CRYSTAL_FACETS = "M -2 0 L -2 -24.5 L 0 -33 M 2 0 L 2 -24.5 L 0 -33 M -6.5 -22 L -2 -24.5 M 6.5 -22 L 2 -24.5";
/** The colours it breaks her light into, thrown on the landing at its side. */
const SPECTRUM = ["var(--art-vermilion)", "var(--art-saffron)", "var(--art-turmeric)", "var(--leaf)", "var(--art-hair)", "var(--lotus)"].map((c, k) => {
  const a = polar(CRYSTAL.x - 8, CRYSTAL.y - 6, 4, 190 + k * 7);
  const b = polar(CRYSTAL.x - 8, CRYSTAL.y - 6, 26, 190 + k * 7);
  return { c, d: `M ${a.x} ${a.y} L ${b.x} ${round(CRYSTAL.y - 6 + (b.y - CRYSTAL.y + 6) * 0.4)}` };
});

const LEAF = { x: 364, y: 481 };
/** A banana leaf laid flat, seen at a slant, about 74 long. */
const LEAF_D = "M -37 1 C -30 -7 20 -9 37 -3 C 30 6 -20 8 -37 1 Z";
const LADDUS = [
  { x: 8, y: -1.5 },
  { x: 13.6, y: -0.6 },
  { x: 10.8, y: 2.6 },
];

/* ── The sandals left at its foot ─────────────────────────────────────── */

/** One wooden sandal (pādukā) seen from above at a slant, toe up, about 12 across. */
const SOLE = "M 0 -7.2 C 4 -7.2 5.6 -4 5.2 0 C 4.8 3 4.2 5 3.2 6.4 C 2 7.4 -2 7.4 -3.2 6.4 C -4.2 5 -4.8 3 -5.2 0 C -5.6 -4 -4 -7.2 0 -7.2 Z";
const SANDALS = [
  { x: 262, wood: "var(--gold)", edge: "var(--art-carve)", knob: "var(--art-vermilion)" },
  { x: 320, wood: "var(--art-moon)", edge: "var(--gold)", knob: "var(--gold)" },
  { x: 378, wood: "var(--art-musk)", edge: "var(--gold)", knob: "var(--art-turmeric)" },
].map((p, k) => ({ ...p, y: 610 + (k === 1 ? 2 : 0), k }));

/* ── The mouse, making off with a sweet ───────────────────────────────── */

const MOUSE = { x: 398, y: 522.3, k: 1.15 };
const MOUSE_BODY = "M -9 0 C -11 -4 -9 -9 -2 -10 C 4 -10.6 8 -8 10 -4.6 L 13.4 -2.4 C 12.6 -0.4 9 0 6 0 Z";
const MODAKA = "M 0 -4.6 C 1.2 -3 3.4 -1.4 3.4 0.8 C 3.4 2.8 1.8 3.6 0 3.6 C -1.8 3.6 -3.4 2.8 -3.4 0.8 C -3.4 -1.4 -1.2 -3 0 -4.6 Z";

/* ── The royal fly-whisks, crossed in the crown ───────────────────────── */

/** A whisk with its handle's foot at the origin, pointing up: gold handle, jewelled collar, a long plume of yak hair. */
const WHISK = { handle: 100, collar: 122, length: 150 };
/** A point in the plume: t along it (0 at the collar), u across it (−1 to 1). Widest a third of the way, it tapers to a soft point and droops toward +x as hair does. */
const plumeAt = (t: number, u: number) => {
  const w = 3 + 21 * Math.sin(Math.PI * Math.min(1, t) ** 0.75) + (t < 0.08 ? 5 * (1 - t / 0.08) : 0);
  return { x: round(24 * t * t * t + 6 * t + u * w), y: round(-WHISK.collar - WHISK.length * t) };
};
const along = (u: number, to: number, from = 0) => Array.from({ length: 11 }, (_, i) => plumeAt(from + ((to - from) * i) / 10, u));
const line = (pts: { x: number; y: number }[]) => `M ${pts.map((q) => `${q.x} ${q.y}`).join(" L ")}`;
const PLUME = `${line(along(-1, 1))} ${line(along(1, 1).reverse()).replace(/^M/, "L")} Z`;
/** Strands down its length, some running out past the point. */
const STRANDS = Array.from({ length: 17 }, (_, j) => line(along(-0.92 + (1.84 * j) / 16, 0.7 + 0.32 * hash(j, 11))));
const WISPS = Array.from({ length: 9 }, (_, j) => line(along(-0.6 + (1.2 * j) / 8, 1.06 + 0.06 * hash(j, 13), 0.7)));
const WHISKS = [
  { x: 272, y: 246, deg: 34, flip: false },
  { x: 368, y: 246, deg: -34, flip: true },
];
const CLASP = { x: CX, y: 175 };
const PEARLS = Array.from({ length: 8 }, (_, k) => polar(CLASP.x, CLASP.y, 11.5, 90 + k * 45));

export function StairOfAttainment({ idPrefix = "sa55", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <ElephantDefs id={id} />
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={230} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("tread")} x1={0} y1={LANDING.back} x2={0} y2={GROUND} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.7 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.36 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.16 }} />
        </linearGradient>
        <linearGradient id={id("ground")} x1={0} y1={GROUND} x2={0} y2={660} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("handle")} x1={-3} y1={0} x2={3} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)" }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold)" }} />
        </linearGradient>
        <radialGradient id={id("crown-glow")} cx={CLASP.x} cy={110} r={170} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The royal fly-whisks, crossed, and the clasp of eight pearls */}
      <g {...part("camaras")}>
        <circle className="m-shimmer" cx={CLASP.x} cy={110} r={170} fill={url("crown-glow")} />
        {WHISKS.map((w, i) => (
          <g key={i} transform={`translate(${w.x} ${w.y}) rotate(${w.deg})${w.flip ? " scale(-1 1)" : ""}`} strokeLinejoin="round">
            <path d={`M -2.6 0 L -2.6 ${-WHISK.handle} L 2.6 ${-WHISK.handle} L 2.6 0 Z`} fill={url("handle")} stroke="var(--art-ember)" strokeWidth={0.5} />
            {[-22, -48, -74].map((y) => (
              <ellipse key={y} cx={0} cy={y} rx={4} ry={1.6} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.5} />
            ))}
            <circle cx={0} cy={0} r={4.4} fill="var(--gold)" stroke="var(--art-ember)" strokeWidth={0.5} />
            <path d={PLUME} fill="var(--art-ivory)" fillOpacity={0.88} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.7} strokeLinejoin="round" />
            <g stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.75} strokeLinecap="round" strokeLinejoin="round">
              {STRANDS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <g stroke="var(--art-ivory)" strokeWidth={0.7} strokeLinecap="round" strokeLinejoin="round">
              {WISPS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <path d="M -4 -100 C -8 -106 -10 -114 -9.5 -122 L 9.5 -122 C 10 -114 8 -106 4 -100 Z" fill="var(--gold)" stroke="var(--art-ember)" strokeWidth={0.5} />
            <circle className={TWINKLE[i]} cx={0} cy={-112} r={2.8} fill="var(--art-vermilion)" stroke="var(--art-core)" strokeWidth={0.5} />
            <g fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.4}>
              {[-8, -4.8, -1.6, 1.6, 4.8, 8].map((x) => (
                <circle key={x} cx={x} cy={-122.6} r={1.4} />
              ))}
            </g>
          </g>
        ))}
        <circle cx={CLASP.x} cy={CLASP.y} r={7.4} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={2} />
        <circle cx={CLASP.x - 2} cy={CLASP.y - 2.4} r={1.8} fill="var(--art-core)" />
        {PEARLS.map((p, i) => (
          <circle key={i} className={TWINKLE[i % 3]} cx={p.x} cy={p.y} r={2.6} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.6} />
        ))}
      </g>

      {/* The stair of eight steps, the lesser attainments that lead to her */}
      <g {...part("stair")}>
        <path d={`M 104 ${GROUND} L 536 ${GROUND} L 536 660 L 104 660 Z`} fill={url("ground")} />
        <path d={`M 120 ${GROUND} L 520 ${GROUND}`} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.6} />
        {PARAPET.map((p, i) => (
          <g key={i}>
            <path d={p.wall} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
            <path d={p.wall} fill="var(--art-carve)" fillOpacity={0.18} />
            <path d={p.coping} stroke="var(--gold)" strokeWidth={2.2} strokeLinecap="round" />
          </g>
        ))}
        <path d={`M ${DOOR.left + DOOR.post} ${LANDING.back} L ${DOOR.left + DOOR.post} ${DOOR.top} L ${DOOR.right - DOOR.post} ${DOOR.top} L ${DOOR.right - DOOR.post} ${LANDING.back} Z`} fill="var(--art-carve)" fillOpacity={0.3} />
        <path d={DOOR_JAMBS} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
        <path
          d={[DOOR.left + 4, DOOR.right - DOOR.post + 4].map((x) => `M ${x} ${LANDING.back - 4} L ${x} ${DOOR.top + 4} L ${x + DOOR.post - 8} ${DOOR.top + 4} L ${x + DOOR.post - 8} ${LANDING.back - 4} Z`).join(" ")}
          stroke="var(--gold-soft)"
          strokeWidth={0.6}
        />
        <path d={DOOR_LINTEL} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
        <path
          d={Array.from({ length: 17 }, (_, k) => `M ${DOOR.left - 10 + k * 8} ${DOOR.top - 3} a 4 4 0 0 1 8 0`).join(" ")}
          stroke="var(--gold-soft)"
          strokeWidth={0.6}
        />
        <path d={LANDING_D} fill="var(--art-stone)" />
        <path d={LANDING_D} fill={url("tread")} />
        {STEPS.map((s) => (
          <g key={s.k}>
            <path d={s.riser} fill="var(--art-stone)" />
            <path d={s.riser} fill="var(--art-carve)" fillOpacity={0.22} />
            <path d={s.tread} fill="var(--art-stone)" />
            <path d={s.tread} fill={url("tread")} />
            <path d={s.edge} stroke="var(--gold)" strokeWidth={0.9} />
          </g>
        ))}
        <path d={`M ${CX - 82} ${LANDING.front} L ${CX + 82} ${LANDING.front}`} stroke="var(--gold)" strokeWidth={1.1} />
        {LAMPS.map((l, i) => (
          <g key={`l${i}`} transform={`translate(${l.x} ${l.y}) scale(${l.k})`}>
            <circle cx={0} cy={-6} r={7} fill={url("bindu-glow")} opacity={0.5} />
            <StillLamp />
          </g>
        ))}
        {PLINTHS.map((p, i) => (
          <g key={`p${i}`} strokeLinejoin="round">
            <path d={`M ${p.x} ${p.face} L ${p.x + p.w} ${p.face} L ${p.x + p.w} ${p.foot} L ${p.x} ${p.foot} Z`} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.7} />
            <path d={`M ${p.x} ${p.face} L ${p.x + p.w} ${p.face} L ${p.x + p.w} ${p.foot} L ${p.x} ${p.foot} Z`} fill="var(--art-carve)" fillOpacity={0.22} />
            <path d={`M ${p.x + 4} ${p.top} L ${p.x + p.w - 4} ${p.top} L ${p.x + p.w} ${p.face} L ${p.x} ${p.face} Z`} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.7} />
            <path d={`M ${p.x + 4} ${p.top} L ${p.x + p.w - 4} ${p.top} L ${p.x + p.w} ${p.face} L ${p.x} ${p.face} Z`} fill="var(--art-saffron)" fillOpacity={0.2} />
            <path d={`M ${p.x + 6} ${p.face + 6} L ${p.x + p.w - 6} ${p.face + 6}`} stroke="var(--gold-soft)" strokeWidth={0.6} />
            <path
              d={Array.from({ length: Math.floor((p.w - 12) / 8) }, (_, k) => `M ${p.x + 6 + k * 8} ${p.face + 6} a 4 4 0 0 0 8 0`).join(" ")}
              stroke="var(--gold-soft)"
              strokeWidth={0.6}
            />
          </g>
        ))}
      </g>

      {/* Her light at the head of the stair, the arrival */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={230} fill={url("glow")} />
        <path className="m-shimmer" d={RADIANCE} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.55} />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={44} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={15} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={11} fill="var(--art-saffron)" fillOpacity={0.5} />
        <circle cx={HER.x} cy={HER.y} r={6.5} fill="var(--art-core)" />
      </g>

      {/* The crystal that takes her light */}
      <g {...part("crystal")}>
        <g stroke="var(--art-ivory)" strokeWidth={1.1} strokeOpacity={0.7} strokeLinecap="round">
          {SPECTRUM.map((s) => (
            <path key={s.c} d={s.d} stroke={s.c} />
          ))}
        </g>
        <g transform={`translate(${CRYSTAL.x} ${CRYSTAL.y}) scale(${CRYSTAL.k})`} strokeLinejoin="round">
          <ellipse cx={0} cy={0.6} rx={10} ry={2.4} fill="var(--gold)" stroke="var(--art-ember)" strokeWidth={0.4} />
          <path d={CRYSTAL_BODY} fill="var(--art-moon)" fillOpacity={0.45} stroke="var(--art-ivory)" strokeWidth={0.8} />
          <circle className="m-breathe" cx={0} cy={-14} r={9} fill={url("bindu-glow")} />
          <path d={CRYSTAL_FACETS} stroke="var(--art-ivory)" strokeWidth={0.5} strokeOpacity={0.85} />
          <path d="M -4.6 -4 L -4.6 -20" stroke="var(--art-core)" strokeWidth={1} strokeLinecap="round" />
        </g>
      </g>

      {/* What has been offered her to enjoy, on a banana leaf */}
      <g {...part("feast")}>
        <g transform={`translate(${LEAF.x} ${LEAF.y}) rotate(-3)`} strokeLinejoin="round">
          <path d={LEAF_D} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.5} />
          <path d="M -36 1 C -10 -1.4 14 -3 36 -3" stroke="var(--gold-soft)" strokeWidth={0.6} />
          <path d="M -26 -2 L -22 1 M -16 -3 L -12 0.6 M 16 -4.6 L 20 -1.2 M 26 -4.4 L 29 -1.6" stroke="var(--gold-soft)" strokeWidth={0.4} strokeOpacity={0.7} />
          <path d="M -30 1.6 C -27 -1.6 -19 -2.4 -15 -0.4 C -19 0 -26 0.6 -30 1.6 Z" fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.4} />
          <ellipse cx={-6} cy={-1.6} rx={8.4} ry={4.2} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.4} />
          <ellipse cx={-6} cy={-4} rx={2.2} ry={1} fill="var(--art-turmeric)" />
          {LADDUS.map((l, i) => (
            <circle key={i} cx={l.x} cy={l.y} r={2.8} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.4} />
          ))}
          <path d={MODAKA} transform="translate(21 -1)" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.4} />
          <ellipse cx={2} cy={4} rx={3.6} ry={1.6} fill="var(--gold)" />
          <ellipse cx={2} cy={3.6} rx={2.6} ry={1} fill="var(--art-ivory)" />
          <path d="M 28 1 C 29 -1.4 32 -1.4 32 0.6 C 32 2.4 30 3.4 28 4.4 C 27 3 27 2 28 1 Z" fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.4} />
          <circle cx={30.6} cy={2.6} r={1} fill="var(--art-musk)" />
        </g>
      </g>

      {/* The lion of valour */}
      <g {...part("lion")}>
        <g transform={`translate(${LION.x} ${round(PLINTHS[0].top + 2 - 92 * LION.k)}) scale(${LION.k})`} style={{ color: "var(--gold)" }} fill="currentColor">
          <Lion />
        </g>
      </g>

      {/* The elephant of strength */}
      <g {...part("elephant")}>
        <g transform={`translate(${ELEPHANT.x} ${PLINTHS[1].top + 2}) scale(${-ELEPHANT.k} ${ELEPHANT.k})`}>
          <Elephant trunk={ELEPHANT_TRUNK.down} url={url} />
        </g>
      </g>

      {/* The masters' sandals, left at the foot of the stair */}
      <g {...part("sandals")}>
        {SANDALS.map((p) => (
          <g key={p.k} transform={`translate(${p.x} ${p.y}) scale(1.55)`} strokeLinejoin="round">
            <ellipse cx={0} cy={6} rx={16} ry={3} fill="var(--art-musk)" fillOpacity={0.2} />
            {[-1, 1].map((s) => (
              <g key={s} transform={`translate(${s * 6.6} 0) rotate(${s * 6})`}>
                <path d={SOLE} transform="translate(0 2.2)" fill={p.wood} />
                <path d={SOLE} transform="translate(0 2.2)" fill="var(--art-carve)" fillOpacity={0.45} stroke={p.edge} strokeWidth={0.5} />
                <path d={SOLE} fill={p.wood} stroke={p.edge} strokeWidth={0.6} />
                <path d="M -3 1 C -1.6 2 1.6 2 3 1" stroke={p.edge} strokeWidth={0.4} strokeOpacity={0.6} />
                <path d="M 0 -3 L 0 -8" stroke={p.edge} strokeWidth={1.3} strokeLinecap="round" />
                <circle cx={0} cy={-8.6} r={2.1} fill={p.knob} stroke={p.edge} strokeWidth={0.4} />
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* Gaṇeśa's mouse, making off with a sweet */}
      <g {...part("mouse")}>
        <g transform={`translate(${MOUSE.x} ${MOUSE.y}) scale(${MOUSE.k})`} strokeLinejoin="round">
          <path d="M -9 -1 C -15 0 -18 -4 -15 -8" stroke="var(--art-musk)" strokeWidth={0.9} strokeLinecap="round" />
          <path d={MOUSE_BODY} fill="var(--art-musk)" stroke="var(--gold)" strokeWidth={0.5} />
          <circle cx={3.6} cy={-8.6} r={2.4} fill="var(--lotus)" stroke="var(--gold)" strokeWidth={0.4} />
          <circle cx={8.4} cy={-5.4} r={0.7} fill="var(--art-ivory)" />
          <path d={MODAKA} transform="translate(15.4 -2.6) scale(0.8)" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
        </g>
      </g>
    </svg>
  );
}
