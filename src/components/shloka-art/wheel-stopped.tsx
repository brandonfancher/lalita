/**
 * Shloka 48 — "Anger, greed, doubt, and becoming".
 *
 * The most symmetrical verse in the hymn, four pairs each naming a thing she
 * is free of and then the same thing she destroys, and the plate is
 * symmetrical about her light. Below the card stands the wheel of becoming,
 * its rim bound in three bands, with her light at the hub, the one point of
 * a wheel that never goes round. From just below her hangs the sword of
 * knowledge, point down; it has cut the knot of the heart, whose two halves
 * are falling away, and split the rim of the wheel where it passed, so the
 * round is broken and two spokes have dropped out (Muṇḍaka 2.2.8: the knot
 * split, doubts cut, works exhausted). At the left the goad of Shloka 2, the
 * one shaped like anger, stands point down in a basin of water, the last red
 * leaving its tip in steam. At the right a full pot brims over, and the water
 * running from it has burst a strongbox and carries its coins away. Which
 * name each part answers to is written up for readers in the registry, next
 * to this artwork's entry.
 */

import { Goad, artIds, glint, partProps, polar, radiance, round } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];
const SWAY = ["m-sway", "m-sway m-late", "m-sway m-later"];

/* ── Her light, at the hub of the wheel ───────────────────────────────── */

const HER = { x: 320, y: 462 };
const RADIANCE = radiance({ cx: HER.x, cy: HER.y, from: 30, long: 250, short: 150 });
const FLOOR = 606;

/* ── The wheel of becoming, split at the foot ─────────────────────────── */

const RIM = { outer: 126, band: 6 };
const RIM_INNER = RIM.outer - 3 * RIM.band;
const HUB = 24;
/** Half the angle of the gap the sword cut through the rim, about the foot of the wheel. */
const GAP = 10;
const FOOT = 270;
const arc = (r: number) => {
  const a = polar(HER.x, HER.y, r, FOOT + GAP);
  const b = polar(HER.x, HER.y, r, FOOT - GAP);
  return `M ${round(a.x)} ${round(a.y)} A ${r} ${r} 0 1 0 ${round(b.x)} ${round(b.y)}`;
};
/** The three bands of the rim, outermost first: ivory, red and dark. */
const BANDS = [
  { r: RIM.outer - RIM.band / 2, color: "var(--art-ivory)" },
  { r: RIM.outer - RIM.band * 1.5, color: "var(--art-vermilion)" },
  { r: RIM.outer - RIM.band * 2.5, color: "var(--art-hair)" },
];
const SPOKE_ANGLES = Array.from({ length: 16 }, (_, k) => k * 22.5 + 11.25).filter((deg) => Math.abs(deg - FOOT) > 15);
const spoke = (deg: number) => {
  const a = polar(HER.x, HER.y, HUB, deg);
  const b = polar(HER.x, HER.y, RIM_INNER, deg);
  const n = polar(0, 0, 1, deg + 90);
  const w0 = 2.6;
  const w1 = 1.6;
  return `M ${round(a.x + n.x * w0)} ${round(a.y + n.y * w0)} L ${round(b.x + n.x * w1)} ${round(b.y + n.y * w1)} L ${round(b.x - n.x * w1)} ${round(b.y - n.y * w1)} L ${round(a.x - n.x * w0)} ${round(a.y - n.y * w0)} Z`;
};
/** The splintered ends of the rim either side of the cut. */
const SPLINTERS = [FOOT + GAP, FOOT - GAP].map((deg, i) => {
  const side = i === 0 ? 1 : -1;
  const pts = [0, 1, 2, 3].map((j) => polar(HER.x, HER.y, RIM_INNER + j * RIM.band, deg));
  return pts
    .slice(0, 3)
    .map((p, j) => {
      const q = pts[j + 1];
      const mid = polar(HER.x, HER.y, RIM_INNER + (j + 0.5) * RIM.band, deg - side * (2.4 + (j % 2) * 1.6));
      return `M ${round(p.x)} ${round(p.y)} L ${round(mid.x)} ${round(mid.y)} L ${round(q.x)} ${round(q.y)}`;
    })
    .join(" ");
});
/** The two spokes that dropped out, lying on the floor. */
const FALLEN = [
  { x: 286, y: FLOOR - 3, turn: -4 },
  { x: 356, y: FLOOR - 5, turn: 168 },
];
const SPOKE_LEN = RIM_INNER - HUB;

/* ── The sword of knowledge, and the knot it cut ──────────────────────── */

const SWORD = { x: HER.x, pommel: HER.y + 32, guard: HER.y + 58, tip: 656, w: 7.5 };
const BLADE = `M ${SWORD.x - SWORD.w} ${SWORD.guard + 4} L ${SWORD.x - SWORD.w + 1} ${SWORD.tip - 34} L ${SWORD.x} ${SWORD.tip} L ${SWORD.x + SWORD.w - 1} ${SWORD.tip - 34} L ${SWORD.x + SWORD.w} ${SWORD.guard + 4} Z`;
const KNOT = { y: 552 };
/** The two halves of the knot, falling away to either side, each from its cut end outward. */
const KNOT_HALVES = [-1, 1].map((s) => {
  const x = (dx: number) => round(SWORD.x + s * dx);
  const y = KNOT.y;
  return {
    s,
    cord: `M ${x(11)} ${y - 3} C ${x(16)} ${y - 15} ${x(33)} ${y - 15} ${x(33)} ${y - 2} C ${x(33)} ${y + 10} ${x(17)} ${y + 12} ${x(16)} ${y + 2} C ${x(15)} ${y - 5} ${x(24)} ${y - 8} ${x(30)} ${y - 4} C ${x(40)} ${y + 4} ${x(42)} ${y + 22} ${x(50)} ${y + 40}`,
    fray: `M ${x(11)} ${y - 3} l ${s * -4} -2.5 M ${x(11)} ${y - 3} l ${s * -4.4} 0.6 M ${x(11)} ${y - 3} l ${s * -3.4} 3.4 M ${x(50)} ${y + 40} l ${s * 1} 4 M ${x(50)} ${y + 40} l ${s * 3} 3`,
  };
});

/* ── The goad of anger, cooling ───────────────────────────────────────── */

const BASIN = { x: 180, y: 600, rx: 40, ry: 9 };
/** The goad leans point down into the basin, its butt up to the left, its point just under the water. */
const GOAD = (() => {
  const k = 0.86;
  const turn = 165;
  const t = (turn * Math.PI) / 180;
  const reach = 144 * k;
  return { k, turn, x: round(BASIN.x - Math.sin(t) * reach), y: round(BASIN.y + 4 + Math.cos(t) * reach) };
})();
const STEAM = [
  { x: BASIN.x - 14, d: "M 0 0 C -6 -12 6 -22 -2 -34 C -8 -44 2 -52 -3 -62" },
  { x: BASIN.x + 12, d: "M 0 0 C 6 -10 -4 -20 3 -32 C 8 -42 -2 -50 2 -58" },
  { x: BASIN.x + 26, d: "M 0 0 C -4 -8 5 -16 0 -26 C -4 -34 2 -40 0 -46" },
];

/* ── The full pot brimming over, and the strongbox it burst ───────────── */

const POT = { x: 482, y: FLOOR, k: 1.1 };
const POT_BODY = "M -12 -52 C -40 -48 -46 -12 -26 -2 C -16 3 16 3 26 -2 C 46 -12 40 -48 12 -52 Z";
const POT_NECK = "M -12 -52 L -10 -60 L 10 -60 L 12 -52 Z";
const POT_LIP = "M -17 -64 C -17 -61 17 -61 17 -64 L 15 -60 L -15 -60 Z";
/** Water running over the lip and down the belly to the floor. */
/** A sheet of water spilling over the front of the lip and down the belly, and one thin stream. */
const SHEET = "M -15 -63 C -16 -58 -24 -54 -30 -44 C -36 -34 -36 -18 -30 -6 C -28 -2 -26 1 -24 3 L -12 3 C -14 -6 -18 -20 -16 -34 C -14 -46 -8 -56 -4 -62 Z";
const STREAM = "M 9 -62 C 12 -57 20 -50 22 -40 C 24 -30 22 -18 20 -8";
const DROPS = [
  { x: -18, y: 4 },
  { x: -4, y: 6 },
  { x: 15, y: 2 },
];
const BOX = { x: 396, y: FLOOR + 16 };
const COINS = [
  { x: 374, y: FLOOR + 22 },
  { x: 362, y: FLOOR + 27 },
  { x: 350, y: FLOOR + 31 },
  { x: 380, y: FLOOR + 29 },
  { x: 338, y: FLOOR + 37 },
  { x: 358, y: FLOOR + 37 },
  { x: 322, y: FLOOR + 44 },
  { x: 306, y: FLOOR + 50 },
];
/** The water running off along the floor, past the strongbox and away. */
const RUN = `M ${POT.x - 30} ${FLOOR + 2} C ${POT.x - 56} ${FLOOR + 4} ${BOX.x + 40} ${FLOOR + 6} ${BOX.x + 26} ${FLOOR + 14} C ${BOX.x + 10} ${FLOOR + 24} ${BOX.x - 40} ${FLOOR + 30} ${BOX.x - 84} ${FLOOR + 46} C ${BOX.x - 92} ${FLOOR + 50} ${BOX.x - 98} ${FLOOR + 52} ${BOX.x - 104} ${FLOOR + 52} C ${BOX.x - 90} ${FLOOR + 40} ${BOX.x - 40} ${FLOOR + 20} ${BOX.x + 10} ${FLOOR + 10} C ${BOX.x + 30} ${FLOOR + 6} ${POT.x - 60} ${FLOOR} ${POT.x - 30} ${FLOOR + 2} Z`;

export function WheelStopped({ idPrefix = "sa48", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={260} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={HER.x} cy={HER.y} r={260} gradientUnits="userSpaceOnUse">
          <stop offset="0.1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.5" style={{ stopColor: "var(--gold)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("blade")} x1={SWORD.x - SWORD.w} y1={0} x2={SWORD.x + SWORD.w} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-ivory)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--gold-soft)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)" }} />
        </linearGradient>
        <linearGradient id={id("heat")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.95 }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("ember-glow")} cx={BASIN.x} cy={BASIN.y} r={40} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-ember)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--art-ember)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("water")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.35 }} />
        </linearGradient>
        <linearGradient id={id("floor")} x1={110} y1={0} x2={530} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.2" style={{ stopColor: "var(--gold)", stopOpacity: 0.6 }} />
          <stop offset="0.8" style={{ stopColor: "var(--gold)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>

      {/* Her light, at the hub, which never goes round */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={260} fill={url("glow")} />
        <path className="m-shimmer" d={RADIANCE} stroke={url("radiance")} strokeWidth={0.6} />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={52} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={10} fill="var(--art-core)" />
      </g>

      {/* The three bands of the rim */}
      <g {...part("strands")}>
        {BANDS.map((b) => (
          <path key={b.r} d={arc(b.r)} stroke={b.color} strokeWidth={RIM.band} />
        ))}
      </g>

      {/* The wheel of becoming, broken at the foot */}
      <g {...part("wheel")}>
        <g stroke="var(--gold)" strokeWidth={1.1}>
          <path d={arc(RIM.outer)} />
          <path d={arc(RIM_INNER)} />
        </g>
        <g stroke="var(--gold)" strokeWidth={0.5} strokeOpacity={0.8}>
          <path d={arc(RIM.outer - RIM.band)} />
          <path d={arc(RIM.outer - RIM.band * 2)} />
        </g>
        <g stroke="var(--art-carve)" strokeWidth={0.7} strokeLinejoin="round">
          {SPLINTERS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5}>
          {SPOKE_ANGLES.map((deg) => (
            <path key={deg} d={spoke(deg)} />
          ))}
        </g>
        <circle cx={HER.x} cy={HER.y} r={HUB} stroke="var(--gold)" strokeWidth={4} />
        <circle cx={HER.x} cy={HER.y} r={HUB + 2.4} stroke="var(--art-carve)" strokeWidth={0.6} />
        <circle cx={HER.x} cy={HER.y} r={HUB - 2.4} stroke="var(--art-carve)" strokeWidth={0.6} />
        <path d={`M ${120} ${FLOOR} L ${520} ${FLOOR}`} stroke={url("floor")} strokeWidth={1} />
        {FALLEN.map((f, i) => (
          <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${f.turn})`}>
            <path d={`M 0 -2.4 L ${SPOKE_LEN * 0.6} -1.6 L ${SPOKE_LEN * 0.6} 1.6 L 0 2.4 Z`} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          </g>
        ))}
      </g>

      {/* The sword of knowledge, which does not waver */}
      <g {...part("sword")}>
        <path d={BLADE} fill={url("blade")} stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
        <path d={`M ${SWORD.x} ${SWORD.guard + 8} L ${SWORD.x} ${SWORD.tip - 20}`} stroke="var(--gold-soft)" strokeWidth={0.6} />
        <path
          d={`M ${SWORD.x - 22} ${SWORD.guard - 2} C ${SWORD.x - 26} ${SWORD.guard - 8} ${SWORD.x - 18} ${SWORD.guard - 10} ${SWORD.x - 16} ${SWORD.guard - 4} L ${SWORD.x + 16} ${SWORD.guard - 4} C ${SWORD.x + 18} ${SWORD.guard - 10} ${SWORD.x + 26} ${SWORD.guard - 8} ${SWORD.x + 22} ${SWORD.guard - 2} L ${SWORD.x + 8} ${SWORD.guard + 4} L ${SWORD.x - 8} ${SWORD.guard + 4} Z`}
          fill="var(--gold)"
          stroke="var(--art-carve)"
          strokeWidth={0.6}
          strokeLinejoin="round"
        />
        <rect x={SWORD.x - 3.6} y={SWORD.pommel + 5} width={7.2} height={SWORD.guard - SWORD.pommel - 9} rx={2} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.6} />
        <g stroke="var(--gold)" strokeWidth={0.8}>
          {[0.3, 0.55, 0.8].map((t) => (
            <path key={t} d={`M ${SWORD.x - 3.6} ${round(SWORD.pommel + 5 + t * (SWORD.guard - SWORD.pommel - 9))} l 7.2 -2`} />
          ))}
        </g>
        <path className="m-lick" d={glint(7)} transform={`translate(${SWORD.x + SWORD.w - 1} ${KNOT.y - 6})`} fill="var(--art-core)" />
        <circle cx={SWORD.x} cy={SWORD.pommel} r={5.4} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
        <circle cx={SWORD.x} cy={SWORD.pommel} r={2} fill="var(--art-vermilion)" />
      </g>

      {/* The knot of the heart, cut, its halves falling away */}
      <g {...part("knot")} strokeLinecap="round">
        {KNOT_HALVES.map((h, i) => (
          <g key={h.s} className={SWAY[i + 1]}>
            <path d={h.cord} stroke="var(--gold)" strokeWidth={6.2} />
            <path d={h.cord} stroke="var(--art-ivory)" strokeWidth={3.6} />
            <path d={h.cord} stroke="var(--gold)" strokeWidth={0.9} strokeDasharray="1.2 2.6" />
            <path d={h.fray} stroke="var(--gold)" strokeWidth={0.9} />
          </g>
        ))}
      </g>

      {/* The goad shaped like anger, cool */}
      <g {...part("goad")}>
        <g transform={`translate(${GOAD.x} ${GOAD.y}) rotate(${GOAD.turn}) scale(${GOAD.k})`}>
          <Goad />
        </g>
      </g>

      {/* The basin, and the last of the heat going off as steam */}
      <g {...part("steam")}>
        <circle className="m-breathe" cx={BASIN.x} cy={BASIN.y} r={40} fill={url("ember-glow")} />
        <g transform={`translate(${GOAD.x} ${GOAD.y}) rotate(${GOAD.turn}) scale(${GOAD.k})`}>
          <path d="M -4.5 -97 C -7 -110 -3 -128 0 -144 C 3 -128 7 -110 4.5 -97 Z" fill={url("heat")} />
        </g>
        <path d={`M ${BASIN.x - BASIN.rx} ${BASIN.y} C ${BASIN.x - BASIN.rx + 4} ${BASIN.y + 20} ${BASIN.x + BASIN.rx - 4} ${BASIN.y + 20} ${BASIN.x + BASIN.rx} ${BASIN.y} Z`} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
        <path d={`M ${BASIN.x - 16} ${BASIN.y + 17} L ${BASIN.x - 20} ${BASIN.y + 22} L ${BASIN.x + 20} ${BASIN.y + 22} L ${BASIN.x + 16} ${BASIN.y + 17}`} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
        <ellipse cx={BASIN.x} cy={BASIN.y} rx={BASIN.rx} ry={BASIN.ry} fill={url("water")} fillOpacity={0.75} stroke="var(--gold)" strokeWidth={1} />
        <ellipse cx={BASIN.x} cy={BASIN.y + 1} rx={9} ry={2} stroke="var(--art-ivory)" strokeWidth={0.6} />
        <g stroke="var(--art-moon)" strokeWidth={2.2} strokeOpacity={0.55} strokeLinecap="round">
          {STEAM.map((s, i) => (
            <g key={i} transform={`translate(${s.x} ${BASIN.y - 4})`}>
              <path className={SWAY[i]} d={s.d} />
            </g>
          ))}
        </g>
        <g stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.7} strokeLinecap="round">
          {STEAM.map((s, i) => (
            <g key={i} transform={`translate(${s.x} ${BASIN.y - 4})`}>
              <path className={SWAY[i]} d={s.d} />
            </g>
          ))}
        </g>
      </g>

      {/* The full pot, wanting nothing more, brimming over */}
      <g {...part("pot")}>
        <g transform={`translate(${POT.x} ${POT.y}) scale(${POT.k})`}>
          <ellipse cy={1} rx={34} ry={4} fill="var(--art-musk)" fillOpacity={0.14} />
          <path d={POT_NECK} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d={POT_BODY} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <path d="M -36 -26 C -14 -18 14 -18 36 -26" stroke="var(--art-vermilion)" strokeWidth={1.6} />
          <path d="M -34 -20 C -12 -12 12 -12 34 -20" stroke="var(--art-vermilion)" strokeWidth={0.6} />
          <path d={POT_LIP} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d="M -15.5 -63.5 C -15.5 -67 15.5 -67 15.5 -63.5 C 15.5 -61 -15.5 -61 -15.5 -63.5 Z" fill="var(--art-moon)" stroke="var(--gold-soft)" strokeWidth={0.5} />
          <path className="m-shimmer" d={SHEET} fill={url("water")} fillOpacity={0.8} stroke="var(--gold-soft)" strokeWidth={0.5} />
          <path d="M -20 -48 C -26 -38 -26 -24 -22 -12" stroke="var(--art-ivory)" strokeWidth={0.8} strokeOpacity={0.8} strokeLinecap="round" />
          <path d={STREAM} stroke="var(--art-hair)" strokeWidth={2.6} strokeOpacity={0.25} strokeLinecap="round" />
          <path className="m-shimmer" d={STREAM} stroke="var(--art-moon)" strokeWidth={1.4} strokeLinecap="round" />
          <ellipse cy={3} rx={30} ry={3.4} fill={url("water")} fillOpacity={0.6} stroke="var(--gold-soft)" strokeWidth={0.5} />
          {DROPS.map((d, i) => (
            <circle key={i} className={TWINKLE[i % 3]} cx={d.x} cy={d.y} r={1.3} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.4} />
          ))}
        </g>
      </g>

      {/* The strongbox the water burst, its coins carried off */}
      <g {...part("box")}>
        <path className="m-shimmer" d={RUN} fill={url("water")} fillOpacity={0.75} stroke="var(--gold-soft)" strokeWidth={0.5} />
        <g transform={`translate(${BOX.x} ${BOX.y}) scale(1.3)`}>
          <path d="M -24 0 L -24 -22 L 24 -22 L 24 0 Z" fill="var(--art-hair)" fillOpacity={0.7} stroke="var(--gold)" strokeWidth={0.9} />
          <path d="M -12 0 L -12 -22 M 12 0 L 12 -22" stroke="var(--gold)" strokeWidth={1.6} />
          <path d="M -24 -22 L -32 -44 L 16 -47 L 24 -22 Z" fill="var(--art-hair)" fillOpacity={0.45} stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
          <path d="M -14 -22 L -20 -45 M 6 -22 L 3 -46" stroke="var(--gold)" strokeWidth={1.4} />
          <g fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.4}>
            <ellipse cx={-8} cy={-23} rx={4} ry={1.6} />
            <ellipse cx={2} cy={-24} rx={4} ry={1.6} />
            <ellipse cx={-17} cy={-23} rx={4} ry={1.6} />
            <ellipse cx={10} cy={-23} rx={4} ry={1.6} />
          </g>
          <path d="M -3 -16 a 3 3 0 0 1 6 0" stroke="var(--gold)" strokeWidth={1.1} transform="rotate(-30 0 -16)" />
          <rect x={-4} y={-12} width={8} height={7} rx={1.2} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} transform="rotate(28 0 -8)" />
        </g>
        <g fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.4}>
          {COINS.map((c, i) => (
            <ellipse key={i} className={TWINKLE[i % 3]} cx={c.x} cy={c.y} rx={3.6} ry={1.6} />
          ))}
        </g>
      </g>
    </svg>
  );
}
