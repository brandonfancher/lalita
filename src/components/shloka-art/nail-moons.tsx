/**
 * Shloka 19 — "Light off the toenails, and the lotus sent away".
 *
 * The verse looks no higher than her feet, which is where the eyes of someone
 * bowing are, so she is shown only by her two footprints, as in the Dhyāna.
 * On their ten toes the nails are ten small moons, as Śaṅkara has them, and
 * their light falls over the dark before her feet and covers it without
 * putting it out. The light of her two feet spreads as a net, each foot's rays
 * crossing the other's, and the lotus, the usual measure of a beautiful foot,
 * is left outside it at the edge. Which name each part answers to is written
 * up for readers in the registry, next to this artwork's entry.
 */

import { artIds, Footprint, FOOTPRINT_TOES, glint, partProps, round } from "./primitives";
import type { ArtProps } from "./types";

const CX = 320;
const FOOT_S = 3.7;
const FOOT_SY = round(FOOT_S * 0.7);
const FOOT_Y = 484;

const FEET = [
  { x: CX - 46, mirror: true },
  { x: CX + 46, mirror: false },
].map((f) => ({ ...f, sx: f.mirror ? -FOOT_S : FOOT_S, c: { x: f.x, y: FOOT_Y } }));

/** The ten nails, one on each toe, each a small full moon. */
const NAILS = FEET.flatMap((f) =>
  FOOTPRINT_TOES.map((t, k) => ({
    x: round(f.x + t.x * f.sx),
    y: round(FOOT_Y + t.y * FOOT_SY - t.r * 0.7),
    r: round(t.r * FOOT_S * 0.78),
    group: (k + (f.mirror ? 0 : 1)) % 3,
  })),
);

/* ── The net: each foot's rays, crossing the other's ───────────────────── */

const RAY_LEN = 270;
/** A point on the floor round a foot: the floor is foreshortened like the footprints on it. */
const floor = (c: { x: number; y: number }, r: number, deg: number) => {
  const t = (deg * Math.PI) / 180;
  return { x: round(c.x + r * Math.cos(t)), y: round(c.y - r * 0.7 * Math.sin(t)) };
};
const RAY_DEGS = Array.from({ length: 23 }, (_, k) => 160 + k * 10);
const RAYS = FEET.map((f) => RAY_DEGS.map((deg) => ({ a: floor(f.c, 58, deg), b: floor(f.c, RAY_LEN, deg) })));
/** Knots where a ray of one foot crosses a ray of the other. */
const KNOTS = (() => {
  const out: { x: number; y: number }[] = [];
  for (const p of RAYS[0])
    for (const q of RAYS[1]) {
      const d1 = { x: p.b.x - p.a.x, y: p.b.y - p.a.y };
      const d2 = { x: q.b.x - q.a.x, y: q.b.y - q.a.y };
      const den = d1.x * d2.y - d1.y * d2.x;
      if (Math.abs(den) < 1e-6) continue;
      const t = ((q.a.x - p.a.x) * d2.y - (q.a.y - p.a.y) * d2.x) / den;
      const u = ((q.a.x - p.a.x) * d1.y - (q.a.y - p.a.y) * d1.x) / den;
      if (t > 0.02 && t < 0.95 && u > 0.02 && u < 0.95) out.push({ x: round(p.a.x + t * d1.x), y: round(p.a.y + t * d1.y) });
    }
  return out;
})();
const RAY_PATH = RAYS.flat()
  .map(({ a, b }) => `M ${a.x} ${a.y} L ${b.x} ${b.y}`)
  .join(" ");

/* ── The dark before her feet, and the light that covers it ────────────── */

const DARK = { cx: CX, cy: 646, rx: 280, ry: 96 };
const COVER = { cx: CX, cy: 638, rx: 256, ry: 82 };
const FALL = { cx: CX, cy: 560, rx: 190, ry: 130 };

/* ── The bowing: hands folded like closed buds, in two ranks ───────────── */

const HANDS = [
  ...Array.from({ length: 7 }, (_, k) => ({ u: (k - 3) / 3.4, y: 598, s: 0.72 })),
  ...Array.from({ length: 6 }, (_, k) => ({ u: (k - 2.5) / 2.9, y: 646, s: 0.92 })),
].map((h) => ({
  x: round(CX + h.u * (h.s > 0.8 ? 186 : 150)),
  y: round(h.y + 10 * h.u * h.u),
  s: round(h.s * (1 - Math.abs(h.u) * 0.1)),
  lean: round(-h.u * 6),
}));
const BUD = "M 0 0 C -10 -6 -11 -24 0 -44 C 11 -24 10 -6 0 0 Z";
const BUD_LEFT = "M 0 0 C -10 -6 -11 -24 0 -44 C -3 -26 -3 -10 0 0 Z";
const SEPALS = "M 0 0 C -6 -2 -11 -6 -12 -12 C -7 -8 -3 -6 0 -4 C 3 -6 7 -8 12 -12 C 11 -6 6 -2 0 0 Z";

/* ── The lotus, left outside ───────────────────────────────────────────── */

const LOTUS = { x: 562, y: 694, turn: 12 };
const LOTUS_BACK = [-60, -30, 0, 30, 60].map((deg) => ({ deg, l: 40 }));
const LOTUS_FRONT = [-75, -40, -12, 12, 40, 75].map((deg) => ({ deg, l: 30 }));
const PETAL = (l: number) =>
  `M 0 0 C ${round(-l * 0.36)} ${round(-l * 0.3)} ${round(-l * 0.28)} ${round(-l * 0.8)} 0 ${-l} C ${round(l * 0.28)} ${round(-l * 0.8)} ${round(l * 0.36)} ${round(-l * 0.3)} 0 0 Z`;

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

export function NailMoons({ idPrefix = "sa19", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);
  const scaleY = (e: { cy: number; rx: number; ry: number }) =>
    `translate(0 ${e.cy}) scale(1 ${round(e.ry / e.rx)}) translate(0 ${-e.cy})`;

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={CX} cy={FOOT_Y - 60} r={250} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("moon-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.8 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("fall")} cx={FALL.cx} cy={FALL.cy} r={FALL.rx} gradientUnits="userSpaceOnUse" gradientTransform={scaleY(FALL)}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("alta")} x1={0} y1={-24} x2={0} y2={15} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="1" style={{ stopColor: "var(--sindura)", stopOpacity: 0.8 }} />
        </linearGradient>
        <radialGradient id={id("nail")} cx="0.38" cy="0.34" r="0.7">
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)" }} />
        </radialGradient>
        <radialGradient id={id("dark")} cx={DARK.cx} cy={DARK.cy} r={DARK.rx} gradientUnits="userSpaceOnUse" gradientTransform={scaleY(DARK)}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.5 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.32 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("cover")} cx={COVER.cx} cy={COVER.cy} r={COVER.rx} gradientUnits="userSpaceOnUse" gradientTransform={scaleY(COVER)}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.85 }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("net-fade")} cx={CX} cy={FOOT_Y} r={RAY_LEN + 40} gradientUnits="userSpaceOnUse">
          <stop offset="0.12" style={{ stopColor: "var(--gold)", stopOpacity: 0.85 }} />
          <stop offset="0.55" style={{ stopColor: "var(--gold)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("bud")} x1={0} y1={-44} x2={0} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </linearGradient>
      </defs>

      {/* The net of light from her two feet, and the lotus left outside it */}
      <g {...part("net")}>
        <path className="m-shimmer" d={RAY_PATH} stroke={url("net-fade")} strokeWidth={1} />
        <g fill={url("net-fade")}>
          {KNOTS.map((k, i) => (
            <circle key={i} cx={k.x} cy={k.y} r={1.8} />
          ))}
        </g>
        <g transform={`translate(${LOTUS.x} ${LOTUS.y}) rotate(${LOTUS.turn})`}>
          <ellipse cy={4} rx={44} ry={8} fill="var(--leaf)" fillOpacity={0.55} />
          {LOTUS_BACK.map((p) => (
            <path key={p.deg} d={PETAL(p.l)} transform={`rotate(${p.deg})`} fill="var(--lotus)" fillOpacity={0.6} stroke="var(--gold)" strokeWidth={0.6} />
          ))}
          {LOTUS_FRONT.map((p) => (
            <path key={p.deg} d={PETAL(p.l)} transform={`rotate(${p.deg})`} fill="var(--lotus)" stroke="var(--gold)" strokeWidth={0.6} />
          ))}
          <ellipse cy={-6} rx={9} ry={5} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.6} />
        </g>
      </g>

      {/* Her footprints with the nails as ten small moons, and their light covering the dark below */}
      <g {...part("nail-light")}>
        <circle className="m-shimmer" cx={CX} cy={FOOT_Y - 60} r={250} fill={url("glow")} />
        <ellipse cx={DARK.cx} cy={DARK.cy} rx={DARK.rx} ry={DARK.ry} fill={url("dark")} />
        <ellipse className="m-shimmer" cx={FALL.cx} cy={FALL.cy} rx={FALL.rx} ry={FALL.ry} fill={url("fall")} />
        <ellipse className="m-breathe" cx={COVER.cx} cy={COVER.cy} rx={COVER.rx} ry={COVER.ry} fill={url("cover")} />
        {FEET.map((f) => (
          <g key={f.x} transform={`translate(${f.x} ${FOOT_Y}) scale(${f.sx} ${FOOT_SY})`} fill={url("alta")}>
            <Footprint edge />
          </g>
        ))}
        {NAILS.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r * 3.2} fill={url("moon-glow")} />
            <circle className={TWINKLE[n.group]} cx={n.x} cy={n.y} r={n.r} fill={url("nail")} stroke="var(--gold)" strokeWidth={0.9} />
          </g>
        ))}
        <g fill="var(--art-core)">
          {NAILS.filter((n) => n.r > 7).map((n, i) => (
            <path key={i} className="m-lick" d={glint(8)} transform={`translate(${round(n.x - 2)} ${round(n.y - 2)})`} />
          ))}
        </g>
      </g>

      {/* Hands folded in bowing, closed like buds */}
      <g {...part("hands")}>
        {HANDS.map((h, i) => (
          <g key={i} transform={`translate(${h.x} ${h.y}) rotate(${h.lean}) scale(${h.s})`}>
            <path d="M 0 0 L 0 22" stroke="var(--leaf)" strokeWidth={2.2} strokeLinecap="round" />
            <path d={BUD} fill={url("bud")} stroke="var(--gold)" strokeWidth={0.8} />
            <path d={BUD_LEFT} fill="var(--art-crimson)" fillOpacity={0.22} />
            <path d="M 0 -2 C -1.4 -14 -1.4 -28 0 -42" stroke="var(--art-crimson)" strokeWidth={0.7} strokeOpacity={0.6} />
            <path d={SEPALS} fill="var(--leaf)" />
          </g>
        ))}
      </g>
    </svg>
  );
}
