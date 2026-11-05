/**
 * Shloka 18 — "Quivers strewn with rain-insects, and the arch of the foot".
 *
 * Kāma's two quivers, which the first name makes of her shanks, are crossed
 * as weapons are displayed, flecked with the scarlet velvet mites that come
 * up out of the ground with the first rain. Their feet are lost in the new
 * grass, as the second name hides her ankles. Two tortoises have come out in
 * the rain, and over each domed shell runs a smoother curve of light, the
 * instep that outdoes it. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { Tortoise, artIds, glint, partProps, polyline, round } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

/* ── The two quivers ───────────────────────────────────────────────────── */

const QUIVERS = [
  { mouth: { x: 206, y: 150 }, foot: { x: 404, y: 566 } },
  { mouth: { x: 434, y: 150 }, foot: { x: 236, y: 566 } },
];
const MOUTH_HW = 19;
const FOOT_HW = 7;

function quiver({ mouth, foot }: { mouth: Pt; foot: Pt }) {
  const dx = foot.x - mouth.x;
  const dy = foot.y - mouth.y;
  const len = Math.hypot(dx, dy);
  const u = { x: dx / len, y: dy / len };
  const n = { x: -u.y, y: u.x };
  /** Its half-width t of the way down: it swells a little below the mouth, then tapers. */
  const hw = (t: number) => FOOT_HW + (MOUTH_HW - FOOT_HW) * (1 - t) ** 1.2 + 4 * Math.sin(Math.PI * Math.min(1, t * 2.2)) * (1 - t);
  const at = (t: number, side: number, extra = 0) => ({
    x: round(mouth.x + u.x * len * t + n.x * (hw(t) + extra) * side),
    y: round(mouth.y + u.y * len * t + n.y * (hw(t) + extra) * side),
  });
  const ts = Array.from({ length: 41 }, (_, k) => k / 40);
  const body = polyline(ts.map((t) => at(t, 1))) + " " + polyline([...ts].reverse().map((t) => at(t, -1))).replace(/^M/, "L") + " Z";
  const band = (t: number) => {
    const a = at(t, 1, 1.5);
    const b = at(t, -1, 1.5);
    const c = { x: round(mouth.x + u.x * len * t + u.x * 4), y: round(mouth.y + u.y * len * t + u.y * 4) };
    return `M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}`;
  };
  const angle = round((Math.atan2(dy, dx) * 180) / Math.PI - 90);
  /** Points on its face, for the mites: t along, s across (−1 to 1). */
  const on = (t: number, s: number) => ({
    x: round(mouth.x + u.x * len * t + n.x * hw(t) * s * 0.82),
    y: round(mouth.y + u.y * len * t + n.y * hw(t) * s * 0.82),
  });
  const a = at(0.08, -1, 2);
  const b = at(0.6, -1, 2);
  const mid = at(0.34, -1, 30);
  const strap = `M ${a.x} ${a.y} Q ${mid.x} ${mid.y} ${b.x} ${b.y}`;
  return { body, band, angle, on, at, len, u, n, strap, sheen: polyline(ts.filter((t) => t > 0.06 && t < 0.92).map((t) => at(t, -0.5))) };
}
const Q = QUIVERS.map(quiver);

/** The velvet mites (indragopa) strewn over each quiver. */
const MITES = Q.flatMap((q, qi) =>
  Array.from({ length: 34 }, (_, k) => {
    const t = 0.1 + ((k * 0.618 + qi * 0.3) % 1) * 0.78;
    const s = Math.sin(k * 2.39 + qi) * 0.9;
    const p = q.on(t, s);
    return { ...p, r: round(1.9 + (k % 3) * 0.45), turn: round((k * 47) % 180) };
  }),
).filter((m) => Math.hypot(m.x - 320, m.y - 389) > 26);

/** The fletched ends of five arrows standing out of each mouth. */
const ARROW_ENDS = Q.flatMap((q, qi) =>
  [-2, -1, 0, 1, 2].map((k) => {
    const base = q.on(0.02, k * 0.42);
    const deg = q.angle + 180 - k * 8;
    const t = (deg * Math.PI) / 180;
    const l = 58 + (2 - Math.abs(k)) * 9 + ((k + qi) % 2) * 6;
    return { x: base.x, y: base.y, deg: round(deg), l, tip: { x: round(base.x - Math.sin(t) * l), y: round(base.y + Math.cos(t) * l) } };
  }),
);

/* ── The first rain ────────────────────────────────────────────────────── */

const RAIN = Array.from({ length: 150 }, (_, k) => {
  const x = round(30 + ((k * 0.6180339 + 0.13) % 1) * 610);
  const y = round(10 + ((k * 0.7548777 + 0.5) % 1) * 580);
  const l = 20 + (k % 5) * 6;
  return `M ${x} ${y} L ${round(x - l * 0.2)} ${y + l}`;
});
const RAIN_GROUPS = [0, 1, 2].map((g) => RAIN.filter((_, k) => k % 3 === g).join(" "));

/* ── The grass that hides their feet ───────────────────────────────────── */

const TUFTS = [
  { x: 236, y: 574, w: 64 },
  { x: 404, y: 574, w: 64 },
  { x: 320, y: 590, w: 120 },
  { x: 168, y: 594, w: 60 },
  { x: 476, y: 598, w: 60 },
];
const BLADES = TUFTS.flatMap((t, ti) =>
  Array.from({ length: Math.round(t.w / 4) }, (_, k) => {
    const x = round(t.x - t.w / 2 + ((k + 0.5) * t.w) / Math.round(t.w / 4));
    const off = (x - t.x) / (t.w / 2);
    const h = 22 + (1 - off * off) * 22 + ((k * 7 + ti) % 5) * 3;
    const lean = off * 9 + (((k * 3) % 5) - 2) * 2.4;
    return `M ${round(x - 1.6)} ${t.y} Q ${round(x + lean * 0.3)} ${round(t.y - h * 0.6)} ${round(x + lean)} ${round(t.y - h)} Q ${round(x + lean * 0.3 + 1)} ${round(t.y - h * 0.55)} ${round(x + 1.6)} ${t.y} Z`;
  }),
);
const BLADE_GROUPS = [0, 1].map((g) => BLADES.filter((_, k) => k % 2 === g).join(" "));

/** The ten arrowheads at the quivers' feet, peeking out of the grass. */
const POINTS = Q.flatMap((q) =>
  [-2, -1, 0, 1, 2].map((k) => {
    const foot = q.on(1, 0);
    const t = ((q.angle + k * 13) * Math.PI) / 180;
    const l = 14 + (2 - Math.abs(k)) * 3;
    return { x: round(foot.x - Math.sin(t) * l), y: round(foot.y + Math.cos(t) * l), deg: round(q.angle + k * 13), big: k === 0 };
  }),
);

/* ── Two tortoises out in the rain ─────────────────────────────────────── */

const TORTOISES = [
  { x: 172, y: 632, flip: false, s: 1 },
  { x: 478, y: 636, flip: true, s: 0.92 },
];
/** The curve of the instep, smoother and higher than the shell it outdoes. */
const ARC = (() => {
  const pts = Array.from({ length: 49 }, (_, k) => {
    const t = (k / 48) * Math.PI;
    return { x: round(-46 * Math.cos(t)), y: round(-48 * Math.sin(t) ** 0.85) };
  });
  return polyline(pts);
})();

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];
const LICK = ["m-lick", "m-lick m-late", "m-lick m-later"];
const CROSS = { x: 320, y: 389 };

export function FirstRainQuivers({ idPrefix = "sa18", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={CROSS.x} cy={CROSS.y + 40} r={330} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.46 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.15 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("rain")} x1={0} y1={0} x2={0} y2={600} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.15 }} />
          <stop offset="0.5" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.2 }} />
        </linearGradient>
        {Q.map((q, i) => (
          <linearGradient
            key={i}
            id={id(`quiver-${i}`)}
            x1={round(QUIVERS[i].mouth.x + q.n.x * MOUTH_HW)}
            y1={round(QUIVERS[i].mouth.y + q.n.y * MOUTH_HW)}
            x2={round(QUIVERS[i].mouth.x - q.n.x * MOUTH_HW)}
            y2={round(QUIVERS[i].mouth.y - q.n.y * MOUTH_HW)}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" style={{ stopColor: "var(--gold)" }} />
            <stop offset="0.6" style={{ stopColor: "var(--art-turmeric)" }} />
            <stop offset="1" style={{ stopColor: "var(--gold)" }} />
          </linearGradient>
        ))}
        <radialGradient id={id("wet")} cx={320} cy={600} r={260} gradientUnits="userSpaceOnUse" gradientTransform="translate(0 600) scale(1 0.22) translate(0 -600)">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("arc-glow")} cx="0.5" cy="1" r="0.7">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The first rain of the monsoon */}
      <g {...part("rain")}>
        <circle className="m-shimmer" cx={CROSS.x} cy={CROSS.y + 40} r={330} fill={url("glow")} />
        <ellipse cx={320} cy={600} rx={260} ry={58} fill={url("wet")} />
        {RAIN_GROUPS.map((d, i) => (
          <path key={i} className={i === 1 ? "m-shimmer" : undefined} d={d} stroke={url("rain")} strokeWidth={0.7} strokeLinecap="round" />
        ))}
      </g>

      {/* Love's two quivers, strewn with the scarlet mites of the rains */}
      <g {...part("quivers")}>
        {ARROW_ENDS.map((a, i) => (
          <g key={i}>
            <path d={`M ${a.x} ${a.y} L ${a.tip.x} ${a.tip.y}`} stroke="var(--gold)" strokeWidth={1.8} />
            <g transform={`translate(${a.tip.x} ${a.tip.y}) rotate(${a.deg + 180})`}>
              <path d="M -0.9 4 C -5 8 -6.5 22 -6 30 L -0.9 26 Z M 0.9 4 C 5 8 6.5 22 6 30 L 0.9 26 Z" fill="var(--art-saffron)" />
              <path d="M -1.5 10 L -5 13 M -1.5 16 L -5.4 19 M -1.5 22 L -5.6 25 M 1.5 10 L 5 13 M 1.5 16 L 5.4 19 M 1.5 22 L 5.6 25" stroke="var(--art-carve)" strokeWidth={0.6} strokeLinecap="round" />
              <path d="M -2.4 -0.5 L 0 4 L 2.4 -0.5" stroke="var(--gold)" strokeWidth={1.2} strokeLinejoin="round" />
            </g>
          </g>
        ))}
        {Q.map((q, i) => (
          <g key={i}>
            <path d={q.strap} stroke="var(--art-vermilion)" strokeWidth={2.6} strokeLinecap="round" />
            <path d={q.strap} stroke="var(--gold-soft)" strokeWidth={0.7} strokeDasharray="1.4 2.2" />
            <path d={q.body} fill={url(`quiver-${i}`)} stroke="var(--art-carve)" strokeWidth={0.8} />
            <path d={q.sheen} stroke="var(--art-core)" strokeWidth={2.2} strokeOpacity={0.55} strokeLinecap="round" />
            <g stroke="var(--art-vermilion)" strokeWidth={3}>
              {[0.05, 0.3, 0.62].map((t) => (
                <path key={t} d={q.band(t)} />
              ))}
            </g>
            <g stroke="var(--gold-soft)" strokeWidth={0.9}>
              {[0.05, 0.3, 0.62].map((t) => (
                <path key={t} d={q.band(t + 0.012)} />
              ))}
            </g>
            <path d={q.band(0)} stroke="var(--gold)" strokeWidth={3.4} />
          </g>
        ))}
        <g fill="var(--art-vermilion)" stroke="var(--art-crimson)" strokeWidth={0.5}>
          {MITES.map((m, i) => (
            <ellipse key={i} className={i % 5 === 0 ? TWINKLE[i % 3] : undefined} cx={m.x} cy={m.y} rx={m.r} ry={round(m.r * 0.72)} transform={`rotate(${m.turn} ${m.x} ${m.y})`} />
          ))}
        </g>
        <g fill="var(--art-core)">
          {MITES.filter((_, i) => i % 2 === 0).map((m, i) => (
            <circle key={i} cx={round(m.x - m.r * 0.3)} cy={round(m.y - m.r * 0.3)} r={0.6} />
          ))}
        </g>
      </g>

      {/* The ten arrowheads at their feet */}
      <g {...part("arrowheads")}>
        {POINTS.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.deg})`}>
            <path d={p.big ? "M 0 -9 C 4 -5 4.4 1 0 8 C -4.4 1 -4 -5 0 -9 Z" : "M 0 -7 C 3 -4 3.4 1 0 6 C -3.4 1 -3 -4 0 -7 Z"} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.8} />
            <path className={LICK[i % 3]} d={glint(p.big ? 6 : 4)} fill="var(--art-ivory)" />
          </g>
        ))}
      </g>

      {/* The new grass, in which their feet are lost */}
      <g {...part("grass")}>
        <path d={BLADE_GROUPS[0]} fill="var(--leaf)" />
        <path d={BLADE_GROUPS[1]} fill="var(--leaf)" fillOpacity={0.7} />
        <g fill="var(--art-vermilion)">
          {[
            [282, 580],
            [356, 586],
            [196, 598],
            [454, 596],
            [318, 572],
          ].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx={1.8} ry={1.3} />
          ))}
        </g>
      </g>

      {/* Two tortoises, and over each shell the smoother curve that outdoes it */}
      <g {...part("tortoises")}>
        {TORTOISES.map((t, i) => (
          <g key={i} transform={`translate(${t.x} ${t.y}) scale(${t.flip ? -t.s : t.s} ${t.s})`}>
            <ellipse cx={0} cy={4} rx={44} ry={5} fill="var(--art-musk)" fillOpacity={0.18} />
            <Tortoise />
            <path d={`${ARC} L 46 0 L -46 0 Z`} className="m-shimmer" fill={url("arc-glow")} />
            <path d={ARC} stroke="var(--art-core)" strokeWidth={3.6} strokeOpacity={0.4} strokeLinecap="round" />
            <path d={ARC} stroke="var(--gold)" strokeWidth={1.3} strokeLinecap="round" />
          </g>
        ))}
      </g>
    </svg>
  );
}
