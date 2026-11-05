/**
 * Shloka 59 — "Manu's vidyā, and the moon's".
 *
 * Two lines built to one measure, the first about a mantra handed down and
 * the second about a face, hinged on the moon. Below the card the moon's
 * full disc stands upright and is filled from two jugs, Manu's gold one and
 * Candra's silver one, pouring the one water from either side. Round it the
 * moon waxes and wanes in fifteen small moons, each lit from her side, and
 * at its centre stands the sixteenth that never changes: her light, a slender
 * form crowned with the crescent she wears. From her a net of moonlight, her
 * smile, spreads over the ground, where two cakoras drink at its ends; and in
 * the crown a third has flown off to the moon in the sky. Which name each
 * part answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import type { CSSProperties } from "react";
import { MoonDeer, artIds, hash, litPart, partProps, polar, round, taper } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];
const CX = 320;

/* ── The moon's orb, and the fifteen digits round it ───────────────────── */

const ORB = { x: CX, y: 506, r: 84 };
/** Fifteen moons from full at the foot to thinnest at the top, on both sides, each turned to face her. */
const RING_R = 116;
const PHASES = Array.from({ length: 15 }, (_, k) => {
  const j = Math.ceil(k / 2);
  const side = k % 2 ? 1 : -1;
  const deg = 270 + side * j * 24;
  const p = polar(ORB.x, ORB.y, RING_R, deg);
  return { x: p.x, y: p.y, night: 15 - 2 * j, turn: round(-deg - 90), r: round(10.6 - j * 0.42), k: j % 3 };
});

/** The orb's own moonlight, in fine rings spreading out over the plate. */
const MOONLIGHT = Array.from({ length: 8 }, (_, i) => RING_R + 40 + i * 25);

/* ── Her form, and the crescent she wears ──────────────────────────────── */

const HER = { x: CX, y: ORB.y };
/** A slender form of light, pointed above and full below, centred on her. */
const FORM = "M 0 -42 C 3 -32 14 -18 15 0 C 16 18 8 30 0 30 C -8 30 -16 18 -15 0 C -14 -18 -3 -32 0 -42 Z";
const BINDU = { x: CX, y: ORB.y + 12 };
const FORM_S = 1.18;
const CRESCENT = { x: CX, y: ORB.y - 52, r: 12.5 };

/* ── The two jugs, pouring the one water ───────────────────────────────── */

type Jug = { x: number; y: number; tilt: number; into: Pt };
const JUG_S = 1.3;
const JUG_L: Jug = { x: 150, y: 440, tilt: 64, into: { x: 254, y: 460 } };
const JUG_R: Jug = { x: 2 * CX - JUG_L.x, y: JUG_L.y, tilt: -JUG_L.tilt, into: { x: 2 * CX - JUG_L.into.x, y: JUG_L.into.y } };
const mouthOf = (j: Jug): Pt => {
  const t = (j.tilt * Math.PI) / 180;
  return { x: round(j.x + 26 * JUG_S * Math.sin(t)), y: round(j.y - 26 * JUG_S * Math.cos(t)) };
};
/** A round-bellied jug (kalaśa) upright at the origin, mouth up: belly, neck, a flared lip. */
const JUG_BODY =
  "M -7 -24 C -7 -20 -9 -18 -14 -14 C -22 -8 -24 2 -20 10 C -16 18 -8 21 0 21 C 8 21 16 18 20 10 C 24 2 22 -8 14 -14 C 9 -18 7 -20 7 -24 Z";
const JUG_LIP = "M -11 -27 C -6 -25 6 -25 11 -27 L 9 -23 C 4 -22 -4 -22 -9 -23 Z";
const JUG_BAND = "M -21 -2 C -10 2 10 2 21 -2 M -20.6 3 C -10 7 10 7 20.6 3";

/** The stream from a jug's mouth into the orb, widening a little as it falls. */
function stream(j: Jug) {
  const m = mouthOf(j);
  const q = { x: m.x + (j.into.x - m.x) * 0.8, y: m.y + 2 };
  const pts: Pt[] = Array.from({ length: 13 }, (_, i) => {
    const t = i / 12;
    const a = (1 - t) * (1 - t);
    const b = 2 * t * (1 - t);
    return { x: round(a * m.x + b * q.x + t * t * j.into.x), y: round(a * m.y + b * q.y + t * t * j.into.y) };
  });
  return { body: taper(pts, (t) => 3 + t * 3.4), line: pts.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ") };
}
const STREAMS = [JUG_L, JUG_R].map(stream);
/** Drops thrown off where each stream meets the orb. */
const DROPS = [JUG_L, JUG_R].flatMap((j, s) =>
  Array.from({ length: 4 }, (_, i) => ({
    x: round(j.into.x + (s ? 1 : -1) * (4 + i * 4)),
    y: round(j.into.y + 4 + i * 5),
    r: round(1.7 - i * 0.2),
    style: { "--dur": `${3 + i * 0.6}s`, "--delay": `${-(i * 0.9 + s * 0.5)}s` } as CSSProperties,
  })),
);

/* ── Her smile: a net of moonlight over the ground ─────────────────────── */

/**
 * A cast net fanned out below the orb: two families of threads spiralling out
 * from her, one each way, crossing in diamonds that grow as they spread.
 */
const NET = { from: RING_R + 14, to: 272, sweep: 30, step: 10, lo: 190, hi: 350 };
const netAt = (phi: number, t: number, s: 1 | -1) => polar(HER.x, HER.y, NET.from + (NET.to - NET.from) * t, phi + s * NET.sweep * t);
const NET_THREADS = ([1, -1] as const)
  .flatMap((s) =>
    Array.from({ length: Math.round((NET.hi - NET.lo + 2 * NET.sweep) / NET.step) + 1 }, (_, i) => NET.lo - NET.sweep + i * NET.step).map((phi) => {
      const pts = Array.from({ length: 11 }, (_, k) => netAt(phi, k / 10, s)).filter((p) => {
        const deg = (Math.atan2(HER.y - p.y, p.x - HER.x) * 180) / Math.PI + 360;
        return deg % 360 >= NET.lo && deg % 360 <= NET.hi;
      });
      return pts.length > 1 ? pts.map((p, k) => `${k ? "L" : "M"} ${p.x} ${p.y}`).join(" ") : "";
    }),
  )
  .join(" ");
/** Knots where the threads cross: m steps apart, they meet m/6 of the way out, halfway between. */
const NET_KNOTS = Array.from({ length: 6 }, (_, m) => m + 1).flatMap((m) =>
  Array.from({ length: Math.round((NET.hi - NET.lo) / NET.step) + 1 }, (_, i) => NET.lo + i * NET.step + (m % 2 ? NET.step / 2 : 0))
    .filter((deg) => deg <= NET.hi)
    .map((deg, i) => ({ ...polar(HER.x, HER.y, NET.from + ((NET.to - NET.from) * m * NET.step) / (2 * NET.sweep), deg), k: (i + m) % 3, m })),
);

/* ── The cakoras, on the ground and in the sky ─────────────────────────── */

const ROCKS = [
  { x: 166, y: 652, rx: 40, ry: 12 },
  { x: 474, y: 652, rx: 40, ry: 12 },
];
/** Each perched cakora, facing her, its beak raised to the net. */
const PERCHED = [
  { x: 170, y: 645, flip: false },
  { x: 470, y: 645, flip: true },
];
const SKY_MOON = { x: 470, y: 92, r: 34 };
const FLYER = { x: 427, y: 127, turn: -34, s: 1.2 };

const CAKORA_BODY =
  "M 12 -24 C 18 -19 19 -9 13 -4.5 C 7 -0.5 -6 -0.5 -13 -4.5 C -16 -6.5 -18 -9 -19 -12 L -24 -14 L -18.4 -17 C -15 -23 -6 -27.5 3 -27 C 7 -26.8 10 -25.6 12 -24 Z";

/** A chukar partridge in profile facing right, feet at the origin, about 34 long: round, short-tailed, head up. */
function Cakora() {
  return (
    <>
      <path d={CAKORA_BODY} fill="var(--art-moon)" />
      <path d={CAKORA_BODY} fill="var(--art-hair)" fillOpacity={0.16} stroke="var(--gold)" strokeWidth={0.7} strokeLinejoin="round" />
      <path d="M -18 -15 C -12 -24 0 -25 6 -18 C -1 -13.4 -10 -12.6 -18 -15 Z" fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth={0.5} />
      <path d="M -9 -11 C -8 -8 -7 -6 -5.6 -3.6 M -4.4 -11.6 C -3.4 -8.6 -2.4 -6 -1 -2.4 M 0.4 -12.4 C 1.4 -9 2.4 -6.4 3.8 -3 M 5 -13 C 6 -10 7 -8 8.4 -5" stroke="var(--art-musk)" strokeWidth={1.1} strokeLinecap="round" strokeOpacity={0.7} />
      <path d="M 8 -22 C 11 -26 13 -30 14 -33" stroke="var(--art-moon)" strokeWidth={9} strokeLinecap="round" />
      <path d="M 8 -22 C 11 -26 13 -30 14 -33" stroke="var(--art-hair)" strokeWidth={9} strokeOpacity={0.16} strokeLinecap="round" />
      <circle cx={14.6} cy={-34} r={6.4} fill="var(--art-moon)" />
      <circle cx={14.6} cy={-34} r={6.4} fill="var(--art-hair)" fillOpacity={0.16} stroke="var(--gold)" strokeWidth={0.6} />
      <ellipse cx={16} cy={-30.4} rx={4.4} ry={3.6} fill="var(--art-ivory)" />
      <path d="M 21 -35.6 C 17 -36.2 13.6 -35.4 11.4 -32.6 C 10.4 -29.4 11.8 -26.4 15.4 -26 C 18 -25.8 20 -27.4 20.6 -29.6" stroke="var(--art-musk)" strokeWidth={1.4} strokeLinecap="round" />
      <path d="M 20.4 -37 L 25.6 -35.4 L 20.6 -33.6 Z" fill="var(--art-vermilion)" stroke="var(--art-vermilion)" strokeWidth={0.6} strokeLinejoin="round" />
      <circle cx={16.4} cy={-35.4} r={1.1} fill="var(--art-musk)" />
      <circle cx={16.4} cy={-35.4} r={1.9} stroke="var(--art-vermilion)" strokeWidth={0.6} />
      <path d="M -2 -2 L -3 0 M 4 -2.4 L 5 0 M -6 0 L -1 0 M 2 0 L 7 0" stroke="var(--art-vermilion)" strokeWidth={1.3} strokeLinecap="round" />
    </>
  );
}

/** The same bird in flight, heading +x, wings up. */
function CakoraFlying() {
  return (
    <>
      <path d="M -4 -4 C -10 -18 -20 -24 -30 -24 C -24 -16 -18 -8 -10 -2 Z" fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
      <path d="M -16 -1 L -25 -3 L -23 3 Z" fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
      <ellipse cx={-2} cy={0} rx={14} ry={7} fill="var(--art-moon)" />
      <ellipse cx={-2} cy={0} rx={14} ry={7} fill="var(--art-hair)" fillOpacity={0.16} stroke="var(--gold)" strokeWidth={0.6} />
      <path d="M -6 2 L -4 5.6 M -1 2 L 1 5.6 M 4 1.6 L 5.6 5" stroke="var(--art-musk)" strokeWidth={1.1} strokeLinecap="round" strokeOpacity={0.75} />
      <path d="M 0 -6 C -4 -16 -8 -22 -14 -27 C -4 -26 4 -16 6 -5 Z" fill="var(--art-moon)" />
      <path d="M 0 -6 C -4 -16 -8 -22 -14 -27 C -4 -26 4 -16 6 -5 Z" fill="var(--art-hair)" fillOpacity={0.16} stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
      <circle cx={14} cy={-2} r={5} fill="var(--art-moon)" />
      <circle cx={14} cy={-2} r={5} fill="var(--art-hair)" fillOpacity={0.16} stroke="var(--gold)" strokeWidth={0.5} />
      <ellipse cx={15} cy={1} rx={3.4} ry={2.6} fill="var(--art-ivory)" />
      <path d="M 18.6 -3 C 15 -4 12 -2 11 1 C 10 3 9 4 7 4" stroke="var(--art-musk)" strokeWidth={1.2} strokeLinecap="round" />
      <path d="M 18.4 -3.8 L 23.4 -2.6 L 18.4 -0.6 Z" fill="var(--art-vermilion)" />
      <circle cx={15} cy={-3} r={0.9} fill="var(--art-musk)" />
    </>
  );
}

function JugShape({ j, silver, fill }: { j: Jug; silver: boolean; fill: string }) {
  return (
    <g transform={`translate(${j.x} ${j.y}) rotate(${j.tilt}) scale(${JUG_S})`}>
      <path d={JUG_BODY} fill={fill} stroke={silver ? "var(--gold)" : "var(--art-carve)"} strokeWidth={0.9} strokeOpacity={silver ? 1 : 0.5} strokeLinejoin="round" />
      <path d="M -15 -6 C -18 0 -17 8 -12 13" stroke={silver ? "var(--art-ivory)" : "var(--art-core)"} strokeWidth={2} strokeLinecap="round" strokeOpacity={0.8} />
      <path d={JUG_BAND} stroke={silver ? "var(--gold)" : "var(--art-vermilion)"} strokeWidth={1.2} />
      <path d={JUG_LIP} fill={fill} stroke={silver ? "var(--gold)" : "var(--art-carve)"} strokeWidth={0.7} strokeOpacity={silver ? 1 : 0.5} strokeLinejoin="round" />
    </g>
  );
}

export function MiddleOfTheMoon({ idPrefix = "sa59", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("orb")} cx={ORB.x} cy={ORB.y} r={ORB.r} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-moon)", stopOpacity: 1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 1 }} />
        </radialGradient>
        <radialGradient id={id("limb")} cx={ORB.x} cy={ORB.y} r={ORB.r} gradientUnits="userSpaceOnUse">
          <stop offset="0.55" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.55 }} />
        </radialGradient>
        <radialGradient id={id("orb-glow")} cx={ORB.x} cy={ORB.y} r={ORB.r + 70} gradientUnits="userSpaceOnUse">
          <stop offset="0.5" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("her")} cx={HER.x} cy={HER.y} r={70} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("form")} cx={0} cy={10} r={44} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-core)", stopOpacity: 0.75 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.55 }} />
        </radialGradient>
        <radialGradient id={id("bindu")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("sky-glow")} cx={SKY_MOON.x} cy={SKY_MOON.y} r={SKY_MOON.r + 40} gradientUnits="userSpaceOnUse">
          <stop offset="0.6" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("sky-limb")} cx={SKY_MOON.x} cy={SKY_MOON.y} r={SKY_MOON.r} gradientUnits="userSpaceOnUse">
          <stop offset="0.55" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.2 }} />
        </radialGradient>
        <radialGradient id={id("smudge")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("net-fall")} cx={HER.x} cy={HER.y} r={NET.to} gradientUnits="userSpaceOnUse">
          <stop offset="0.45" style={{ stopColor: "white", stopOpacity: 1 }} />
          <stop offset="1" style={{ stopColor: "white", stopOpacity: 0 }} />
        </radialGradient>
        <mask id={id("net-fade")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={830} fill={url("net-fall")} />
        </mask>
        <linearGradient id={id("gold-jug")} x1={0} y1={-24} x2={0} y2={21} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-turmeric)" }} />
        </linearGradient>
        <radialGradient id={id("ground")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The moon's orb, and the fifteen digits that wax and wane round it */}
      <g {...part("orb")}>
        <ellipse cx={CX} cy={640} rx={280} ry={70} fill={url("ground")} />
        {MOONLIGHT.map((r, i) => (
          <circle key={r} cx={ORB.x} cy={ORB.y} r={r} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={round(0.42 - i * 0.045)} />
        ))}
        <circle className="m-shimmer" cx={ORB.x} cy={ORB.y} r={ORB.r + 70} fill={url("orb-glow")} />
        <circle cx={ORB.x} cy={ORB.y} r={ORB.r} fill={url("orb")} />
        <circle cx={ORB.x} cy={ORB.y} r={ORB.r} fill={url("limb")} />
        <circle cx={ORB.x} cy={ORB.y} r={ORB.r} stroke="var(--gold)" strokeWidth={1.6} />
        {PHASES.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.turn})`}>
            <circle r={p.r} fill="var(--art-hair)" fillOpacity={0.16} stroke="var(--gold)" strokeWidth={0.5} strokeOpacity={0.5} />
            <path className={TWINKLE[p.k]} d={p.night >= 15 ? `M ${-p.r} 0 A ${p.r} ${p.r} 0 1 1 ${p.r} 0 A ${p.r} ${p.r} 0 1 1 ${-p.r} 0 Z` : litPart(p.night, p.r)} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.7} strokeLinejoin="round" />
          </g>
        ))}
      </g>

      {/* Manu's jug, gold, pouring from the left */}
      <g {...part("manu")}>
        <path d={STREAMS[0].line} stroke="var(--art-moon)" strokeWidth={12} strokeOpacity={0.22} strokeLinecap="round" />
        <path className="m-shimmer" d={STREAMS[0].body} fill="var(--art-moon)" />
        <path d={STREAMS[0].line} stroke="var(--art-ivory)" strokeWidth={0.7} strokeDasharray="5 3 2 4" strokeLinecap="round" />
        {DROPS.slice(0, 4).map((d, i) => (
          <circle key={i} className="m-sink" style={d.style} cx={d.x} cy={d.y} r={d.r} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.4} />
        ))}
        <JugShape j={JUG_L} silver={false} fill={url("gold-jug")} />
      </g>

      {/* Candra's jug, silver, pouring from the right */}
      <g {...part("candra")}>
        <path d={STREAMS[1].line} stroke="var(--art-moon)" strokeWidth={12} strokeOpacity={0.22} strokeLinecap="round" />
        <path className="m-shimmer" d={STREAMS[1].body} fill="var(--art-moon)" />
        <path d={STREAMS[1].line} stroke="var(--art-ivory)" strokeWidth={0.7} strokeDasharray="5 3 2 4" strokeLinecap="round" />
        {DROPS.slice(4).map((d, i) => (
          <circle key={i} className="m-sink" style={d.style} cx={d.x} cy={d.y} r={d.r} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.4} />
        ))}
        <JugShape j={JUG_R} silver fill="var(--art-moon)" />
        <g transform={`translate(${JUG_R.x} ${JUG_R.y}) rotate(${JUG_R.tilt}) scale(${JUG_S}) translate(0 -9) rotate(180)`}>
          <path d={litPart(4, 6)} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.6} />
        </g>
      </g>

      {/* Her smile, a net of moonlight, and the cakoras drinking it */}
      <g {...part("smile")}>
        <g mask={url("net-fade")}>
          <path className="m-shimmer" d={NET_THREADS} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.7} strokeLinecap="round" strokeLinejoin="round" />
          {NET_KNOTS.map((k, i) => (
            <circle key={i} className={TWINKLE[k.k]} cx={k.x} cy={k.y} r={round(1.1 + k.m * 0.12)} fill="var(--art-core)" />
          ))}
        </g>
        {ROCKS.map((r, i) => (
          <g key={i}>
            <path
              d={`M ${r.x - r.rx} ${r.y + 4} C ${r.x - r.rx + 2} ${r.y - r.ry} ${r.x - 10} ${r.y - r.ry - 6} ${r.x + 4} ${r.y - r.ry - 4} C ${r.x + r.rx - 6} ${r.y - r.ry - 2} ${r.x + r.rx} ${r.y - 4} ${r.x + r.rx} ${r.y + 4} Z`}
              fill="var(--art-stone)"
              stroke="var(--gold)"
              strokeWidth={0.8}
            />
            <path d={`M ${r.x - r.rx + 6} ${r.y + 2} C ${r.x - 8} ${r.y - 2} ${r.x + 10} ${r.y} ${r.x + r.rx - 4} ${r.y + 2}`} stroke="var(--art-hair)" strokeWidth={4} strokeOpacity={0.12} />
            {Array.from({ length: 4 }, (_, t) => {
              const gx = round(r.x - r.rx - 6 + t * 24 + hash(i, t) * 6);
              return <path key={t} d={`M ${gx} ${r.y + 5} q -2 -6 -5 -9 M ${gx} ${r.y + 5} l 0 -11 M ${gx} ${r.y + 5} q 2 -6 5 -9`} stroke="var(--leaf)" strokeWidth={0.8} strokeOpacity={0.6} strokeLinecap="round" />;
            })}
          </g>
        ))}
        {PERCHED.map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${b.y}) scale(${b.flip ? -1.5 : 1.5} 1.5)`}>
            <Cakora />
          </g>
        ))}
      </g>

      {/* Her light: a slender form at the centre of the orb */}
      <g {...part("form")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={70} fill={url("her")} />
        <g transform={`translate(${HER.x} ${HER.y}) scale(${FORM_S})`}>
          <path d={FORM} fill="var(--art-saffron)" fillOpacity={0.4} />
          <path d={FORM} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.5} />
          <path d={FORM} transform="translate(0 6) scale(0.72)" fill={url("form")} />
          <g transform="translate(0 11) scale(0.4)">
            <path className="m-shimmer" d={FORM} fill="var(--art-core)" />
          </g>
        </g>
        <circle cx={BINDU.x} cy={BINDU.y} r={14} fill={url("bindu")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={5} fill="var(--art-core)" />
      </g>

      {/* The crescent she wears */}
      <g {...part("crescent")}>
        <g transform={`translate(${CRESCENT.x} ${CRESCENT.y}) rotate(180)`}>
          <path d={litPart(4, CRESCENT.r + 2)} stroke="var(--art-moon)" strokeWidth={3} strokeOpacity={0.5} />
          <path d={litPart(4, CRESCENT.r)} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={1.1} strokeLinejoin="round" />
        </g>
      </g>

      {/* The moon in the sky, and the cakora that has flown to it */}
      <g {...part("sour-gruel")}>
        <circle cx={SKY_MOON.x} cy={SKY_MOON.y} r={SKY_MOON.r + 40} fill={url("sky-glow")} />
        {[52, 74, 98].map((r, i) => (
          <circle key={r} cx={SKY_MOON.x} cy={SKY_MOON.y} r={r} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.4 - i * 0.1} />
        ))}
        <circle cx={SKY_MOON.x} cy={SKY_MOON.y} r={SKY_MOON.r} fill="var(--art-moon)" />
        <circle cx={SKY_MOON.x} cy={SKY_MOON.y} r={SKY_MOON.r} fill={url("sky-limb")} />
        <circle cx={SKY_MOON.x} cy={SKY_MOON.y} r={SKY_MOON.r} stroke="var(--gold)" strokeWidth={1.6} />
        <g transform={`translate(${SKY_MOON.x - 2} ${SKY_MOON.y + 6}) scale(0.56)`}>
          <MoonDeer smudge={url("smudge")} />
        </g>
        <g transform={`translate(${FLYER.x} ${FLYER.y}) rotate(${FLYER.turn}) scale(${FLYER.s})`}>
          <CakoraFlying />
        </g>
      </g>
    </svg>
  );
}
