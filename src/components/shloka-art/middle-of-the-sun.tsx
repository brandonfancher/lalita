/**
 * Shloka 65 — "In the middle of the sun's disc".
 *
 * Six verses after she stood in the middle of the moon, she stands in the
 * middle of the sun. Below the card the sun's full disc stands over still
 * water, and at its centre her light sits on a red lotus. Round the disc's
 * lower half hangs a garland of six blossoms, the six excellences, each its
 * own colour. Out of the disc sharp rays climb past the card and burst into
 * flame in the crown:
 * the same sun, its terrible face. Gold falls on either
 * side into the water, a share to each place it lands. In the water before
 * it a red lotus and a blue one rise from a single root. Which name each
 * part answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import type { CSSProperties } from "react";
import { Horse, OpenLotus, artIds, glint, hash, partProps, polar, round, sunRays, tongue } from "./primitives";
import type { ArtProps } from "./types";

const SUN = { x: 320, y: 484, r: 80 };
const WATER_Y = 606;

/* ── The disc ──────────────────────────────────────────────────────────── */

const RAYS = sunRays({ cx: SUN.x, cy: SUN.y, r: SUN.r, long: 101, short: 92, count: 32, span: 360 });
/** The sun's reflection, broken into bars by the water and narrowing with depth. */
const REFLECTION = Array.from({ length: 11 }, (_, k) => {
  const y = WATER_Y + 6 + k * 8.4;
  const half = round(70 - k * 5 + (hash(k, 65) - 0.5) * 12);
  return { y: round(y), x0: round(SUN.x - half + (hash(k, 7) - 0.5) * 10), x1: round(SUN.x + half + (hash(k, 8) - 0.5) * 10), o: round(0.75 - k * 0.055) };
});
const LEVELS = Array.from({ length: 9 }, (_, k) => {
  const t = k / 8;
  return { y: round(WATER_Y + 4 + 150 * t ** 1.4), o: round(0.5 - 0.3 * t) };
});

/* ── The blaze ─────────────────────────────────────────────────────────── */

const FLAME_H = 40;
/** Sharp rays out of the disc, alternately long and short, the long ones ending in flames in the crown above the card. */
const BLAZE = Array.from({ length: 13 }, (_, i) => {
  const deg = 30 + i * 10;
  const long = i % 2 === 0;
  const sin = Math.sin((deg * Math.PI) / 180);
  const cos = Math.cos((deg * Math.PI) / 180);
  let len = long ? Math.min((SUN.y - (56 + Math.abs(deg - 90) * 1.4)) / sin, 440) : 170;
  if (cos < 0) len = Math.min(len, (SUN.x - 118) / -cos);
  if (cos > 0) len = Math.min(len, (600 - SUN.x) / cos);
  const at = (r: number, d: number) => polar(SUN.x, SUN.y, r, deg + d);
  const half = long ? 4.2 : 3.4;
  const base = [at(SUN.r + 8, -half), at(SUN.r + 8, half)];
  const end = long ? len - FLAME_H + 4 : len;
  const tip = at(end, 0);
  const inner = [at(SUN.r + 10, -half * 0.35), at(end * 0.92, 0), at(SUN.r + 10, half * 0.35)];
  const flameAt = at(end - 4, 0);
  const from = at(250, 0);
  return {
    thread: long ? `M ${from.x} ${from.y} L ${flameAt.x} ${flameAt.y}` : null,
    body: `M ${base[0].x} ${base[0].y} L ${tip.x} ${tip.y} L ${base[1].x} ${base[1].y} Z`,
    core: `M ${inner[0].x} ${inner[0].y} L ${inner[1].x} ${inner[1].y} L ${inner[2].x} ${inner[2].y} Z`,
    flame: long ? { x: flameAt.x, y: flameAt.y, rot: round(90 - deg) } : null,
    long,
    group: i % 3,
  };
});

/* ── The garland of six ────────────────────────────────────────────────── */

const G = { rx: 95, ry: 103 };
const onGarland = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: round(SUN.x + Math.cos(a) * G.rx), y: round(SUN.y - Math.sin(a) * G.ry) };
};
const STRAND = Array.from({ length: 57 }, (_, k) => onGarland(158 + k * 4));
const STRAND_D = `M ${STRAND.map((p) => `${p.x} ${p.y}`).join(" L ")}`;
const STRAND_LEAVES = STRAND.filter((_, k) => k % 2 === 1).map((p, k) => ({ ...p, deg: 158 + (2 * k + 1) * 4, side: k % 2 ? 1 : -1 }));
/** Sovereignty, power, fame, beauty, knowledge and detachment, from the left. */
const BLOSSOMS = [
  { deg: 172, fill: "var(--gold)" },
  { deg: 212, fill: "var(--art-vermilion)" },
  { deg: 250, fill: "var(--art-ivory)" },
  { deg: 290, fill: "var(--lotus)" },
  { deg: 328, fill: "var(--art-saffron)" },
  { deg: 368, fill: "var(--art-hair)" },
].map((b) => ({ ...b, ...onGarland(b.deg) }));
const PETAL = "M 0 0 C -4 -3 -4.4 -8 0 -11 C 4.4 -8 4 -3 0 0 Z";
const ENDS = [onGarland(158), onGarland(382)];

/* ── Her lotus seat ────────────────────────────────────────────────────── */

const SEAT_Y = SUN.y + 30;
const SEAT = { x: SUN.x, y: SEAT_Y, s: 0.95 };
const LIGHT = { x: SUN.x, y: SEAT_Y - 16 };

/* ── The shares ────────────────────────────────────────────────────────── */

/** Gold falling either side of the sun, each piece to its own place on the water. */
const SHARES = Array.from({ length: 26 }, (_, i) => {
  const side = i % 2 ? 1 : -1;
  const x = round(SUN.x + side * (128 + hash(i, 651) * 74));
  const y = round(404 + hash(i, 652) * 186);
  return { x, y, r: round(1.6 + hash(i, 653) * 1.4), dur: round(5 + hash(i, 654) * 5), delay: round(-hash(i, 655) * 10) };
});
const LANDINGS = Array.from({ length: 8 }, (_, i) => {
  const side = i % 2 ? 1 : -1;
  return { x: round(SUN.x + side * (134 + hash(i, 656) * 66)), y: round(WATER_Y + 4 + hash(i, 657) * 10), rx: round(6 + hash(i, 658) * 6) };
});
const shareStyle = (s: (typeof SHARES)[number]): CSSProperties => ({ "--dur": `${s.dur}s`, "--delay": `${s.delay}s` }) as CSSProperties;

/* ── The twins from one root ───────────────────────────────────────────── */

const ROOT = { x: 182, y: 632 };
const TWINS = [
  { x: 160, y: 590, s: 0.52, fill: "var(--lotus)", shade: "var(--art-crimson)", stem: `M ${ROOT.x} ${ROOT.y} C 178 620 164 610 160 594` },
  { x: 208, y: 596, s: 0.48, fill: "var(--art-hair)", shade: "var(--gold-soft)", stem: `M ${ROOT.x} ${ROOT.y} C 188 622 204 612 208 600` },
];
const TWIN_PAD = "M 150 612 C 160 604 196 604 214 610 C 210 618 168 620 150 612 Z";

/* ── The golden horse ──────────────────────────────────────────────────── */

const HORSE_AT = { x: 486, y: WATER_Y - 2 };

export function MiddleOfTheSun({ idPrefix = "sa65", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("sky")} cx={SUN.x} cy={SUN.y} r={250} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.5 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("disc")} cx={SUN.x} cy={SUN.y - 6} r={SUN.r} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
        <radialGradient id={id("blaze")} cx={SUN.x} cy={SUN.y} r={440} gradientUnits="userSpaceOnUse">
          <stop offset="0.18" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.95 }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.62 }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)", stopOpacity: 0.3 }} />
        </radialGradient>
        <radialGradient id={id("shaft")} cx={SUN.x} cy={SUN.y} r={300} gradientUnits="userSpaceOnUse">
          <stop offset="0.27" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.95 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("shaft-edge")} cx={SUN.x} cy={SUN.y} r={300} gradientUnits="userSpaceOnUse">
          <stop offset="0.27" style={{ stopColor: "var(--gold)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("blaze-edge")} cx={SUN.x} cy={SUN.y} r={200} gradientUnits="userSpaceOnUse">
          <stop offset="0.4" style={{ stopColor: "var(--gold)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0.3 }} />
        </radialGradient>
        <radialGradient id={id("flame-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("water")} x1={0} y1={WATER_Y} x2={0} y2={800} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("side-fade")} x1={0} y1={0} x2={640} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={0} />
          <stop offset="0.2" stopColor="#fff" stopOpacity={1} />
          <stop offset="0.8" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <mask id={id("window")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={830} fill="#fff" />
          <rect x={150} y={190} width={340} height={200} rx={12} fill="#000" fillOpacity={0.72} />
        </mask>
        <mask id={id("sides")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={830} fill={url("side-fade")} />
        </mask>
      </defs>

      {/* The sun's terrible face: sharp rays climbing past the card, flaming at their ends in the crown */}
      <g {...part("blaze")}>
        <g mask={url("window")}>
          {BLAZE.map((b, i) => (
            <g key={i}>
              <path d={b.body} fill={url(b.long ? "shaft" : "blaze")} stroke={url(b.long ? "shaft-edge" : "blaze-edge")} strokeWidth={0.6} strokeLinejoin="round" />
              {b.thread && <path d={b.thread} stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.7} strokeDasharray="1.5 3" />}
              <path className={["m-lick", "m-lick m-late", "m-lick m-later"][b.group]} d={b.core} fill="var(--art-saffron)" />
              {b.flame && (
                <g transform={`translate(${b.flame.x} ${b.flame.y}) rotate(${b.flame.rot})`}>
                  <circle cy={-16} r={24} fill={url("flame-glow")} />
                  <path d={tongue(FLAME_H, 19, 0)} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
                  <path className={["m-lick", "m-lick m-late", "m-lick m-later"][(b.group + 1) % 3]} d={tongue(22, 8, 0)} fill="var(--art-core)" />
                </g>
              )}
            </g>
          ))}
        </g>
      </g>

      {/* The sun's full disc, its rays, and its light on the water */}
      <g {...part("sun")}>
        <circle className="m-shimmer" cx={SUN.x} cy={SUN.y} r={250} fill={url("sky")} />
        <rect x={0} y={WATER_Y} width={640} height={200} fill={url("water")} mask={url("sides")} />
        <g mask={url("sides")} stroke="var(--gold-soft)" strokeLinecap="round">
          <path d={`M 40 ${WATER_Y} H 600`} strokeWidth={1} strokeOpacity={0.8} />
          {LEVELS.map((l) => (
            <path key={l.y} d={`M 60 ${l.y} H 580`} strokeWidth={0.6} strokeOpacity={l.o} />
          ))}
        </g>
        <g className="m-shimmer" stroke="var(--art-saffron)" strokeLinecap="round">
          {REFLECTION.map((b) => (
            <path key={b.y} d={`M ${b.x0} ${b.y} H ${b.x1}`} strokeWidth={3.2} strokeOpacity={b.o} />
          ))}
        </g>
        {RAYS.map((r, i) => (
          <path key={i} d={r.d} fill={r.long ? "var(--art-vermilion)" : "var(--art-saffron)"} stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
        ))}
        <circle cx={SUN.x} cy={SUN.y} r={SUN.r} fill={url("disc")} stroke="var(--gold)" strokeWidth={1.3} />
        <circle cx={SUN.x} cy={SUN.y} r={SUN.r - 9} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.7} />
      </g>

      {/* Her seat, a red lotus open in the middle of the sun */}
      <g {...part("lotus")}>
        <g transform={`translate(${SEAT.x} ${SEAT.y}) scale(${SEAT.s})`}>
          <OpenLotus pad={false} shade="var(--art-crimson)" />
        </g>
      </g>

      {/* Her light, in the middle of the sun, seated on the lotus */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={LIGHT.x} cy={LIGHT.y} r={46} fill={url("glow")} />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={12} stroke="var(--art-core)" strokeWidth={1} />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={7.6} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.6} />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={4.6} fill="var(--art-core)" />
      </g>

      {/* The garland of six excellences hung on the disc */}
      <g {...part("garland")}>
        <path d={STRAND_D} stroke="var(--gold)" strokeWidth={1.3} />
        <g fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.4}>
          {STRAND_LEAVES.map((l, i) => (
            <ellipse key={i} cx={0} cy={0} rx={5.4} ry={2.2} transform={`translate(${l.x} ${l.y}) rotate(${round(-l.deg + 90 + l.side * 40)}) translate(4 0)`} />
          ))}
        </g>
        {ENDS.map((e, i) => (
          <g key={i}>
            <circle cx={e.x} cy={e.y} r={2.8} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
            <path d={`M ${e.x} ${e.y + 2} v 12`} stroke="var(--gold)" strokeWidth={0.9} />
            <path d={`M ${e.x} ${e.y + 13} l -3 8 h 6 Z`} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
          </g>
        ))}
        {BLOSSOMS.map((b) => (
          <g key={b.deg} transform={`translate(${b.x} ${b.y})`}>
            <circle r={13} fill="var(--art-core)" fillOpacity={0.3} />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <path key={deg} d={PETAL} transform={`rotate(${deg})`} fill={b.fill} stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
            ))}
            <circle r={3.2} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.6} />
          </g>
        ))}
      </g>

      {/* Gold let fall on either side, a share to each place on the water */}
      <g {...part("shares")}>
        <g stroke="var(--gold-soft)" strokeWidth={0.7}>
          {LANDINGS.map((l, i) => (
            <ellipse key={i} cx={l.x} cy={l.y} rx={l.rx} ry={round(l.rx * 0.26)} strokeOpacity={0.8} />
          ))}
        </g>
        {SHARES.map((s, i) => (
          <g key={i} className="m-sink" style={shareStyle(s)}>
            <path d={`M ${s.x} ${s.y - 6} V ${s.y - s.r}`} stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.5} />
            <circle cx={s.x} cy={s.y} r={s.r} fill="var(--gold)" stroke="var(--art-saffron)" strokeWidth={0.5} />
          </g>
        ))}
      </g>

      {/* A red lotus and a blue one, rising from one root */}
      <g {...part("twins")}>
        <path d={TWIN_PAD} fill="var(--leaf)" fillOpacity={0.8} stroke="var(--gold)" strokeWidth={0.6} />
        {TWINS.map((t, i) => (
          <path key={i} d={t.stem} stroke="var(--leaf)" strokeWidth={2.4} strokeLinecap="round" />
        ))}
        <circle cx={ROOT.x} cy={ROOT.y} r={3.4} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.7} />
        <ellipse cx={ROOT.x} cy={ROOT.y + 1} rx={10} ry={2.4} stroke="var(--gold-soft)" strokeWidth={0.6} />
        {TWINS.map((t, i) => (
          <g key={i} transform={`translate(${t.x} ${t.y}) scale(${t.s})`}>
            <OpenLotus pad={false} fill={t.fill} shade={t.shade} />
          </g>
        ))}
      </g>

      {/* Far off, a golden horse wading into the river */}
      <g {...part("horse")}>
        <ellipse cx={HORSE_AT.x} cy={HORSE_AT.y + 4} rx={16} ry={2.6} stroke="var(--gold-soft)" strokeWidth={0.6} />
        <g transform={`translate(${HORSE_AT.x} ${HORSE_AT.y}) scale(-0.42 0.42)`} strokeLinejoin="round">
          <Horse fill="var(--gold)" />
        </g>
        <path d={glint(3)} transform={`translate(${HORSE_AT.x - 8} ${HORSE_AT.y - 12})`} fill="var(--art-saffron)" />
      </g>
    </svg>
  );
}
