/**
 * Shloka 9 — "Ruby mirrors and coral put to shame".
 *
 * Both names are contests that the thing she is compared to loses (the figure
 * poets call vyatireka), and Śaṅkara stages the second as a weighing. So a
 * gold balance hangs here, tipped. Her light lies in the pan that has sunk;
 * the standards of red ride high in the other, outweighed: a mirror cut from
 * ruby and a sprig of fresh coral. The bimba creeper lies on the ground
 * beneath, and will not climb on. Which name each part answers to is written
 * up for readers in the registry, next to this artwork's entry.
 */

import type { CSSProperties } from "react";

import { artIds, cubicAt, partProps, polar, round } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };
type Cubic = [Pt, Pt, Pt, Pt];

const CX = 320;
const PIVOT = { x: CX, y: 150 };
const HALF = 150;
/** How far the beam has tipped toward her side, in degrees. */
const TILT = 10;
const T = (TILT * Math.PI) / 180;

const beamEnd = (side: -1 | 1): Pt => ({
  x: round(CX + side * HALF * Math.cos(T)),
  y: round(PIVOT.y - side * HALF * Math.sin(T)),
});
const LEFT_END = beamEnd(-1);
const RIGHT_END = beamEnd(1);

/** Each pan hangs from a ring under its end of the beam, and swings from the hook above it. */
const RING_DROP = 11;
const CORD = 352;
const PAN = { rx: 60, ry: 12, depth: 24 };
const LEFT_PAN = { x: LEFT_END.x, y: round(LEFT_END.y + RING_DROP + CORD) };
const RIGHT_PAN = { x: RIGHT_END.x, y: round(RIGHT_END.y + RING_DROP + CORD) };

const swingFrom = (end: Pt): CSSProperties => ({ transformBox: "view-box", transformOrigin: `${end.x}px ${end.y + 4}px` });

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── The balance ────────────────────────────────────────────────────────── */

function panShapes(end: Pt, { x, y }: Pt) {
  const { rx, ry, depth } = PAN;
  const ringY = end.y + RING_DROP;
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

const PANS = [
  /* Her pan is filled with light, so its inside is not drawn */
  { end: LEFT_END, at: LEFT_PAN, shapes: panShapes(LEFT_END, LEFT_PAN), sway: "m-sway", inside: false },
  { end: RIGHT_END, at: RIGHT_PAN, shapes: panShapes(RIGHT_END, RIGHT_PAN), sway: "m-sway m-late", inside: true },
];

/** The beam, drawn level about the pivot and then turned: thickest at the middle, tapering to bud finials. */
const BEAM = "M -144 -3.4 L -16 -6.2 Q 0 -8.4 16 -6.2 L 144 -3.4 L 144 3.4 L 16 6.2 Q 0 8.4 -16 6.2 L -144 3.4 Z";
const BEAM_BANDS = [-100, -54, 54, 100];
const BUD = "M 0 -5.6 C 6 -5.6 12 -3.6 18 0 C 12 3.6 6 5.6 0 5.6 Z";

/** The tongue of the balance stands at right angles to the beam, so it leans with it toward the heavier pan. */
const TONGUE_LEN = 84;

/** The fork the tongue swings in, hung from the chain; level, the tongue would sit under the red mark at its top. */
const FORK = { top: 56, half: 18, bar: 5 };
const CHAIN_LINKS = Array.from({ length: 4 }, (_, k) => ({ y: 3 + k * 9.6, flat: k % 2 === 1 }));

/* ── Her light, in the sunk pan ─────────────────────────────────────────── */

const LX = LEFT_PAN.x;
const LY = LEFT_PAN.y;
/** The bindu hangs in the glow just above the pool of light that fills the pan. */
const BINDU = { x: LX, y: LY - 22 };

/** Her radiance: 108 gold hairlines from the bindu, alternating long and short, fading in from it so no dark ring is left round it. */
const RADIANCE = Array.from({ length: 108 }, (_, k) => {
  const deg = k * (360 / 108) + 1.7;
  const a = polar(BINDU.x, BINDU.y, 9, deg);
  const b = polar(BINDU.x, BINDU.y, k % 2 ? 300 : 440, deg);
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}).join(" ");

/** The earrings of the verse before, reflected in the pool: the sun on her right, the moon on her left. */
const REFLECTED_SUN = { x: round(LX - 21), y: LY + 1.5 };
const REFLECTED_MOON = { x: round(LX + 21), y: LY + 1.5 };
const REFLECTED_R = 5;
const TINY_RAYS = Array.from({ length: 12 }, (_, k) => {
  const t = (k * 30 * Math.PI) / 180;
  const at = (r: number) => `${round(REFLECTED_SUN.x + r * Math.cos(t))} ${round(REFLECTED_SUN.y - r * 0.45 * Math.sin(t))}`;
  return `M ${at(REFLECTED_R + 1.6)} L ${at(k % 2 ? REFLECTED_R + 4 : REFLECTED_R + 6)}`;
}).join(" ");

/* ── The ruby mirror and the coral, in the lifted pan ───────────────────── */

const RX = RIGHT_PAN.x;
const RY = RIGHT_PAN.y;

/** The mirror, drawn upright with the foot of its handle at the origin, then leaned toward her pan. */
const MIRROR_AT = `translate(${round(RX - 6)} ${RY - 2}) rotate(-5)`;
const MIRROR = { cy: -48, r: 25, frame: 30 };
const MIRROR_BEADS = Array.from({ length: 28 }, (_, k) => polar(0, MIRROR.cy, MIRROR.frame - 2.6, k * (360 / 28)));

/** A sprig of coral standing in a small gold mount, the origin at its foot. */
const CORAL_AT = `translate(${round(RX + 33)} ${RY + 1}) scale(0.92)`;
const CORAL: { c: Cubic; w: number }[] = [
  { c: [{ x: 0, y: -2 }, { x: 1, y: -14 }, { x: -2, y: -26 }, { x: 0, y: -38 }], w: 4.4 },
  { c: [{ x: 0, y: -38 }, { x: 1.5, y: -45 }, { x: 4, y: -50 }, { x: 3, y: -60 }], w: 3.2 },
  { c: [{ x: 0, y: -16 }, { x: -6, y: -21 }, { x: -10, y: -28 }, { x: -11, y: -40 }], w: 3.4 },
  { c: [{ x: -9, y: -29 }, { x: -13, y: -31 }, { x: -15, y: -35 }, { x: -17, y: -42 }], w: 2.5 },
  { c: [{ x: 0, y: -25 }, { x: 6, y: -29 }, { x: 10, y: -35 }, { x: 11, y: -47 }], w: 3.2 },
  { c: [{ x: 9, y: -35 }, { x: 13, y: -37 }, { x: 15, y: -40 }, { x: 15, y: -46 }], w: 2.4 },
  { c: [{ x: 1, y: -42 }, { x: -2, y: -46 }, { x: -4, y: -50 }, { x: -5, y: -56 }], w: 2.5 },
  { c: [{ x: -11, y: -38 }, { x: -9, y: -42 }, { x: -9, y: -45 }, { x: -7, y: -50 }], w: 2.2 },
];
const cubicPath = ([a, b, c, d]: Cubic) => `M ${a.x} ${a.y} C ${b.x} ${b.y} ${c.x} ${c.y} ${d.x} ${d.y}`;
const CORAL_TIPS = CORAL.map(({ c, w }) => ({ ...c[3], r: round(w * 0.62) }));
const CORAL_POLYPS = CORAL.flatMap(({ c }, i) =>
  [0.35, 0.7].map((t, j) => {
    const p = cubicAt(...c, t);
    return { x: round(p.x + (j ? 1 : -1) * 0.9), y: round(p.y), group: (i + j) % 3 };
  }),
);

/* ── The bimba creeper, on the ground beneath ───────────────────────────── */

const VINE: Cubic[] = [
  [{ x: 652, y: 596 }, { x: 612, y: 586 }, { x: 580, y: 612 }, { x: 540, y: 606 }],
  [{ x: 540, y: 606 }, { x: 500, y: 600 }, { x: 474, y: 624 }, { x: 432, y: 616 }],
  [{ x: 432, y: 616 }, { x: 396, y: 609 }, { x: 366, y: 630 }, { x: 326, y: 622 }],
  [{ x: 326, y: 622 }, { x: 302, y: 617 }, { x: 284, y: 632 }, { x: 252, y: 638 }],
  [{ x: 252, y: 638 }, { x: 220, y: 644 }, { x: 196, y: 630 }, { x: 160, y: 636 }],
  [{ x: 160, y: 636 }, { x: 136, y: 640 }, { x: 120, y: 652 }, { x: 96, y: 656 }],
];
const VINE_PATH = VINE.map((c, i) => (i ? "" : `M ${c[0].x} ${c[0].y} `) + `C ${c[1].x} ${c[1].y} ${c[2].x} ${c[2].y} ${c[3].x} ${c[3].y}`).join(" ");
const onVine = (seg: number, t: number) => {
  const p = cubicAt(...VINE[seg], t);
  return { x: round(p.x), y: round(p.y) };
};

/** An ivy-gourd leaf: five shallow, pointed lobes over a heart-shaped base, base at the origin, pointing up. */
function ivyLeaf(L: number) {
  const at = (deg: number, r: number) => {
    const t = (deg * Math.PI) / 180;
    return `${round(r * Math.sin(t))} ${round(-r * Math.cos(t))}`;
  };
  const lobes = [-74, -37, 0, 37, 74];
  const reach = [0.6, 0.86, 1, 0.86, 0.6].map((k) => k * L);
  let d = `M 0 -2 Q ${round(-L * 0.38)} ${round(L * 0.16)} ${at(lobes[0], reach[0])}`;
  for (let i = 0; i < 4; i++) {
    const mid = (lobes[i] + lobes[i + 1]) / 2;
    const r = ((reach[i] + reach[i + 1]) / 2) * 0.62;
    d += ` Q ${at(mid - 6, r * 1.12)} ${at(mid, r)} Q ${at(mid + 6, r * 1.12)} ${at(lobes[i + 1], reach[i + 1])}`;
  }
  d += ` Q ${round(L * 0.38)} ${round(L * 0.16)} 0 -2 Z`;
  const veins = lobes.map((deg, i) => `M 0 -2 L ${at(deg, reach[i] * 0.86)}`).join(" ");
  return { blade: d, veins };
}

const LEAVES = [
  { seg: 0, t: 0.3, rot: -18, L: 32 },
  { seg: 0, t: 0.78, rot: 162, L: 26 },
  { seg: 1, t: 0.18, rot: 14, L: 34 },
  { seg: 1, t: 0.62, rot: 196, L: 24 },
  { seg: 2, t: 0.12, rot: -10, L: 30 },
  { seg: 2, t: 0.62, rot: 24, L: 25 },
  { seg: 3, t: 0.4, rot: 168, L: 22 },
  { seg: 3, t: 0.8, rot: -14, L: 28 },
  { seg: 4, t: 0.3, rot: 190, L: 22 },
  { seg: 4, t: 0.66, rot: 12, L: 27 },
  { seg: 5, t: 0.5, rot: -22, L: 20 },
].map((l) => ({ ...ivyLeaf(l.L), at: onVine(l.seg, l.t), rot: l.rot }));

/**
 * Small gourds hanging under the vine, scarlet only on the side that faces
 * her light: Śaṅkara's bimba is red merely by reflecting her.
 */
const FRUIT = { rx: 6.2, ry: 10 };
const FRUITS = [
  { seg: 0, t: 0.55, dx: 2, rot: -8 },
  { seg: 1, t: 0.32, dx: -1, rot: 6 },
  { seg: 1, t: 0.47, dx: 3, rot: -12 },
  { seg: 1, t: 0.86, dx: 0, rot: 4 },
  { seg: 2, t: 0.38, dx: -2, rot: 10 },
  { seg: 3, t: 0.6, dx: 1, rot: -6 },
  { seg: 4, t: 0.42, dx: -2, rot: 8 },
  { seg: 4, t: 0.9, dx: 1, rot: -4 },
  { seg: 5, t: 0.4, dx: 2, rot: -10 },
].map((f) => {
  const a = onVine(f.seg, f.t);
  const c = { x: round(a.x + f.dx), y: round(a.y + 18) };
  /* Toward her light, in the fruit's own turned frame */
  const dx = BINDU.x - c.x;
  const dy = BINDU.y - c.y;
  const len = Math.hypot(dx, dy);
  const r = (-f.rot * Math.PI) / 180;
  const u = { x: (dx * Math.cos(r) - dy * Math.sin(r)) / len, y: (dx * Math.sin(r) + dy * Math.cos(r)) / len };
  const side = Math.sign(u.x) || 1;
  return {
    stalk: `M ${a.x} ${a.y} Q ${round(a.x + f.dx * 0.3)} ${round(a.y + 4)} ${c.x} ${round(c.y - FRUIT.ry + 1)}`,
    c,
    rot: f.rot,
    lit: { x1: round(0.5 + 0.5 * u.x), y1: round(0.5 + 0.5 * u.y), x2: round(0.5 - 0.5 * u.x), y2: round(0.5 - 0.5 * u.y) },
    stripes: `M ${round(-side * 1.8)} -8.8 Q ${round(-side * 3.4)} 0 ${round(-side * 1.8)} 8.8 M ${round(-side * 3.9)} -7.6 Q ${round(-side * 5.3)} 0 ${round(-side * 3.9)} 7.6`,
    sheen: `M ${round(side * 3.6)} -5 Q ${round(side * 4.4)} -1 ${round(side * 3.6)} 2`,
  };
});

/** A coiling tendril: a stalk from the vine to the start of a shrinking spiral round `c`. */
function tendril(from: Pt, c1: Pt, c2: Pt, c: Pt, r0: number, startDeg: number, turns: number, dir: 1 | -1) {
  const start = polar(c.x, c.y, r0, startDeg);
  const steps = Math.round(turns * 24);
  const coil = Array.from({ length: steps }, (_, k) => {
    const u = (k + 1) / steps;
    return polar(c.x, c.y, r0 * (1 - 0.72 * u), startDeg + dir * u * turns * 360);
  });
  return `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${start.x} ${start.y} ` + coil.map((p) => `L ${p.x} ${p.y}`).join(" ");
}

const REFUSING_FROM = onVine(1, 0.74);
const TENDRILS = [
  tendril(onVine(0, 0.12), { x: 628, y: 576 }, { x: 622, y: 566 }, { x: 618, y: 560 }, 6, 0, 1.6, 1),
  /* The one that reaches for the lifted pan, and curls back short of it */
  tendril(
    REFUSING_FROM,
    { x: REFUSING_FROM.x + 2, y: REFUSING_FROM.y - 30 },
    { x: RX - 4, y: 570 },
    { x: RX + 4, y: 552 },
    6.5,
    180,
    1.7,
    1,
  ),
  tendril(onVine(2, 0.82), { x: 340, y: 640 }, { x: 330, y: 650 }, { x: 322, y: 652 }, 5, 90, 1.5, -1),
  tendril(onVine(4, 0.12), { x: 238, y: 654 }, { x: 236, y: 662 }, { x: 242, y: 666 }, 4.5, 180, 1.4, 1),
  tendril(onVine(5, 0.92), { x: 92, y: 664 }, { x: 90, y: 668 }, { x: 94, y: 672 }, 4, 180, 1.4, 1),
];

export function TippedScales({ idPrefix = "sa9", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("light-glow")} cx={BINDU.x} cy={BINDU.y} r={210} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.28 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("rise")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-core)", stopOpacity: 0.3 }} />
          <stop offset="0.65" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.08 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={BINDU.x} cy={BINDU.y} r={440} gradientUnits="userSpaceOnUse">
          <stop offset="0.02" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.16" style={{ stopColor: "var(--gold)", stopOpacity: 0.7 }} />
          <stop offset="0.45" style={{ stopColor: "var(--gold)", stopOpacity: 0.28 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("pool")} cx={LX} cy={LY} r={PAN.rx} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("dull")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <clipPath id={id("mirror-face")}>
          <circle cy={MIRROR.cy} r={MIRROR.r} />
        </clipPath>
        {FRUITS.map((f, i) => (
          <linearGradient key={i} id={id(`bimba-${i}`)} x1={f.lit.x1} y1={f.lit.y1} x2={f.lit.x2} y2={f.lit.y2}>
            <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
            <stop offset="0.45" style={{ stopColor: "var(--art-vermilion)" }} />
            <stop offset="0.92" style={{ stopColor: "var(--leaf)" }} />
          </linearGradient>
        ))}
      </defs>

      {/* Her light, red by its own nature, gathered in the pan that has sunk */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={BINDU.x} cy={BINDU.y} r={210} fill={url("light-glow")} />
        <path className="m-shimmer" d={RADIANCE} stroke={url("radiance")} strokeWidth={0.7} strokeLinecap="round" />
        <g className="m-sway" style={swingFrom(LEFT_END)}>
          <ellipse cx={LX} cy={LY} rx={PAN.rx - 1} ry={PAN.ry - 1} fill={url("pool")} />
          <ellipse className="m-shimmer" cx={LX} cy={LY - 30} rx={50} ry={76} fill={url("rise")} />
          <circle className="m-shimmer" cx={BINDU.x} cy={BINDU.y} r={16} fill={url("bindu-glow")} />
          <circle cx={BINDU.x} cy={BINDU.y} r={7.5} stroke="var(--art-core)" strokeWidth={0.8} />
          <circle cx={BINDU.x} cy={BINDU.y} r={3.8} fill="var(--art-core)" />
        </g>
      </g>

      {/* The balance itself: chain, fork and tongue, the tipped beam, and the two pans */}
      <g {...part("scales")}>
        <g stroke="var(--gold)" strokeWidth={2}>
          {CHAIN_LINKS.map((l, k) =>
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

        <g transform={`rotate(${-TILT} ${PIVOT.x} ${PIVOT.y})`}>
          <path
            d={`M ${CX - 2.8} ${PIVOT.y} L ${CX - 0.9} ${PIVOT.y - TONGUE_LEN + 6} L ${CX} ${PIVOT.y - TONGUE_LEN} L ${CX + 0.9} ${PIVOT.y - TONGUE_LEN + 6} L ${CX + 2.8} ${PIVOT.y} Z`}
            fill="var(--gold)"
            stroke="var(--art-carve)"
            strokeWidth={0.4}
          />
          <g transform={`translate(${PIVOT.x} ${PIVOT.y})`}>
            <path d={BEAM} fill="var(--gold)" />
            <path d="M -138 0 L 138 0" stroke="var(--art-carve)" strokeWidth={0.7} strokeOpacity={0.8} />
            <g fill="var(--gold-soft)" stroke="var(--art-carve)" strokeWidth={0.4}>
              {BEAM_BANDS.map((x) => (
                <rect key={x} x={x - 3} y={-7} width={6} height={14} rx={2} />
              ))}
            </g>
            <path d={BUD} transform="translate(142 0)" fill="var(--gold)" />
            <path d={BUD} transform="translate(-142 0) scale(-1 1)" fill="var(--gold)" />
            <circle r={12.5} fill="var(--gold)" />
            <circle r={9} stroke="var(--art-carve)" strokeWidth={0.8} />
          </g>
        </g>
        <g fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5}>
          <rect x={CX - FORK.half - FORK.bar} y={FORK.top + 6} width={FORK.bar} height={PIVOT.y - FORK.top} rx={2} />
          <rect x={CX + FORK.half} y={FORK.top + 6} width={FORK.bar} height={PIVOT.y - FORK.top} rx={2} />
        </g>
        <circle cx={PIVOT.x} cy={PIVOT.y} r={4} fill="var(--gold-soft)" stroke="var(--art-carve)" strokeWidth={0.8} />

        {PANS.map(({ end, at, shapes: s, sway, inside }, i) => (
          <g key={i}>
            <path d={s.hook} stroke="var(--gold)" strokeWidth={2} strokeLinecap="round" />
            <g className={sway} style={swingFrom(end)}>
              <circle cx={s.ring.x} cy={s.ring.y} r={4} stroke="var(--gold)" strokeWidth={1.6} />
              <path d={s.backCord} stroke="var(--gold-soft)" strokeWidth={0.9} strokeOpacity={0.7} />
              <path d={s.cords} stroke="var(--gold)" strokeWidth={1.3} />
              {inside && <ellipse cx={at.x} cy={at.y} rx={PAN.rx} ry={PAN.ry} fill="var(--gold-soft)" fillOpacity={0.55} />}
              <ellipse cx={at.x} cy={at.y} rx={PAN.rx} ry={PAN.ry} stroke="var(--gold)" strokeWidth={1.6} />
              <path d={s.bowl} fill="var(--gold)" />
              <path d={s.band} stroke="var(--art-carve)" strokeWidth={0.7} />
              <path d={s.sheen} stroke="var(--art-core)" strokeWidth={1.4} strokeOpacity={0.6} strokeLinecap="round" />
              <g fill="var(--gold-soft)">
                {s.beads.map((b, k) => (
                  <circle key={k} cx={b.x} cy={b.y} r={1.5} />
                ))}
              </g>
              <circle cx={s.finial.x} cy={s.finial.y} r={3.6} fill="var(--gold)" />
              <path d={`M ${s.finial.x - 2.4} ${s.finial.y + 2.8} L ${s.finial.x} ${s.finial.y + 10} L ${s.finial.x + 2.4} ${s.finial.y + 2.8} Z`} fill="var(--gold)" />
            </g>
          </g>
        ))}
      </g>

      {/* The coral on the lifted pan, and the bimba on the ground, too ashamed to climb on */}
      <g {...part("coral-bimba")}>
        <g className="m-sway m-late" style={swingFrom(RIGHT_END)}>
          <g transform={CORAL_AT}>
            <g strokeLinecap="round">
              {CORAL.map(({ c, w }, i) => (
                <path key={i} d={cubicPath(c)} stroke="var(--art-crimson)" strokeWidth={w + 1.4} />
              ))}
              {CORAL.map(({ c, w }, i) => (
                <path key={i} d={cubicPath(c)} stroke="var(--art-vermilion)" strokeWidth={w} />
              ))}
            </g>
            <g fill="var(--art-vermilion)" stroke="var(--art-crimson)" strokeWidth={0.7}>
              {CORAL_TIPS.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={p.r + 0.7} />
              ))}
            </g>
            <g fill="var(--art-ivory)">
              {CORAL_POLYPS.map((p, i) => (
                <circle key={i} className={TWINKLE[p.group]} cx={p.x} cy={p.y} r={0.75} />
              ))}
            </g>
            <path d="M -9 -1 Q 0 -7 9 -1 L 7 3.5 L -7 3.5 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          </g>
        </g>

        <path d={VINE_PATH} stroke="var(--leaf)" strokeWidth={2.4} strokeLinecap="round" />
        <g stroke="var(--leaf)" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round">
          {TENDRILS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {LEAVES.map((l, i) => (
          <g key={i} transform={`translate(${l.at.x} ${l.at.y}) rotate(${l.rot})`}>
            <path d={l.blade} fill="var(--leaf)" fillOpacity={0.85} stroke="var(--leaf)" strokeWidth={0.8} strokeLinejoin="round" />
            <path d={l.veins} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.7} />
          </g>
        ))}
        {FRUITS.map((f, i) => (
          <g key={i}>
            <path d={f.stalk} stroke="var(--leaf)" strokeWidth={1.1} />
            <g transform={`translate(${f.c.x} ${f.c.y}) rotate(${f.rot})`}>
              <ellipse rx={FRUIT.rx} ry={FRUIT.ry} fill={url(`bimba-${i}`)} />
              <path d={f.stripes} stroke="var(--art-ivory)" strokeWidth={0.55} strokeOpacity={0.7} />
              <path d={f.sheen} stroke="var(--art-core)" strokeWidth={0.9} strokeOpacity={0.8} strokeLinecap="round" />
              <path d="M -2.6 -9.4 L 0 -11 L 2.6 -9.4" stroke="var(--leaf)" strokeWidth={1.1} strokeLinecap="round" />
            </g>
          </g>
        ))}
      </g>

      {/* A mirror cut from a single ruby, propped in the lifted pan */}
      <g {...part("mirror")}>
        <g className="m-sway m-late" style={swingFrom(RIGHT_END)}>
          <g transform={MIRROR_AT}>
            <g fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5}>
              <path d={`M -3 -4 L -2 ${MIRROR.cy + MIRROR.frame - 1} L 2 ${MIRROR.cy + MIRROR.frame - 1} L 3 -4 Z`} />
              <rect x={-5} y={-12} width={10} height={3.6} rx={1.6} />
              <path d="M -5.5 -4 Q -6 2 0 4 Q 6 2 5.5 -4 Z" />
            </g>
            <circle cy={MIRROR.cy} r={MIRROR.frame} fill="var(--gold)" />
            <circle cy={MIRROR.cy} r={MIRROR.frame - 0.6} stroke="var(--art-carve)" strokeWidth={0.6} />
            <g fill="var(--gold-soft)">
              {MIRROR_BEADS.map((b, k) => (
                <circle key={k} cx={b.x} cy={b.y} r={1.2} />
              ))}
            </g>
            <circle cy={MIRROR.cy} r={MIRROR.r + 1.3} fill="var(--art-carve)" />
            <g clipPath={url("mirror-face")}>
              <circle cy={MIRROR.cy} r={MIRROR.r} fill="var(--art-vermilion)" />
              <circle cy={MIRROR.cy} r={MIRROR.r} stroke="var(--art-crimson)" strokeWidth={4} strokeOpacity={0.55} />
              <ellipse className="m-shimmer" cx={-9} cy={MIRROR.cy + 7} rx={11} ry={9} fill={url("dull")} />
              <g stroke="var(--art-core)" strokeLinecap="round">
                <path d={`M -22 ${MIRROR.cy + 4} L 2 ${MIRROR.cy - 24}`} strokeWidth={3} strokeOpacity={0.4} />
                <path d={`M -16 ${MIRROR.cy + 12} L 10 ${MIRROR.cy - 18}`} strokeWidth={1.2} strokeOpacity={0.35} />
              </g>
            </g>
          </g>
        </g>
      </g>

      {/* The sun and moon of her earrings, reflected in the pool of her light (Saundaryalaharī 59) */}
      <g {...part("reflections")}>
        <g className="m-sway" style={swingFrom(LEFT_END)}>
          <path className="m-twinkle" d={TINY_RAYS} stroke="var(--art-vermilion)" strokeWidth={0.9} strokeLinecap="round" />
          <ellipse
            cx={REFLECTED_SUN.x}
            cy={REFLECTED_SUN.y}
            rx={REFLECTED_R}
            ry={round(REFLECTED_R * 0.45)}
            fill="var(--art-vermilion)"
            stroke="var(--gold)"
            strokeWidth={0.6}
          />
          <ellipse
            className="m-twinkle m-late"
            cx={REFLECTED_MOON.x}
            cy={REFLECTED_MOON.y}
            rx={REFLECTED_R}
            ry={round(REFLECTED_R * 0.45)}
            fill="var(--art-moon)"
            stroke="var(--gold)"
            strokeWidth={0.8}
          />
        </g>
      </g>
    </svg>
  );
}
