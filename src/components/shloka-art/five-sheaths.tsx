/**
 * Shloka 91 — "Seated on the principles, hidden in the sheaths, flushed with wine".
 *
 * Under the card her light inside five sheaths, one within another, each cut
 * open at the front so the next shows through; they rest on a seat of
 * thirty-six thin tiers, one for each of the principles, with a fresh garland
 * hung across its front that does not wilt. Round the ground a boundary line,
 * broken wherever her rays cross it. Far off in the crown the word तत्, and
 * near in front त्वम् with the rings of a call going out from it to her. At
 * the right her jewelled goblet, full to the brim. Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { artIds, eggPath, glint, partProps, polar, round, Ruby } from "./primitives";
import type { ArtProps } from "./types";

/* ── Her light within the five sheaths ─────────────────────────────────── */

const HER = { x: 320, y: 520 };
const SHEATHS = [
  { w: 20, h: 24, stroke: "var(--lotus)", fill: "var(--lotus)" },
  { w: 32, h: 38, stroke: "var(--art-saffron)", fill: "var(--art-saffron)" },
  { w: 44, h: 52, stroke: "var(--gold)", fill: "var(--gold-soft)" },
  { w: 56, h: 66, stroke: "var(--gold-soft)", fill: "var(--art-moon)" },
  { w: 68, h: 80, stroke: "var(--leaf)", fill: "var(--leaf)" },
];
/** Each sheath is cut open at the front right, the outer ones widest, so every one shows the one within. */
const CUT = { at: -34, half: [12, 20, 28, 36, 44] };

/* ── The seat of thirty-six tiers ──────────────────────────────────────── */

const SEAT = { y: HER.y + 82, tier: 1.7 };
const TIERS = Array.from({ length: 36 }, (_, k) => {
  const half = round(62 + k * 2.1);
  const y = round(SEAT.y + k * SEAT.tier);
  return { half, y, k };
}).reverse();
const TIER_FILL = (k: number) => (k < 11 ? "var(--art-core)" : k < 18 ? "var(--gold)" : k < 26 ? "var(--art-turmeric)" : "var(--art-stone)");
const SEAT_FOOT = SEAT.y + 36 * SEAT.tier;

/* ── The garland that does not wilt ────────────────────────────────────── */

const GARLAND = Array.from({ length: 19 }, (_, k) => {
  const t = k / 18;
  const x = HER.x - 92 + t * 184;
  const y = SEAT.y + 12 + Math.sin(t * Math.PI) * 26;
  return { x: round(x), y: round(y), k };
});

/* ── The boundary line her rays break ──────────────────────────────────── */

const RING = { x: 320, y: 600, rx: 204, ry: 72 };
const RAY_DEGS = [-24, -50, -76, -104, -130, -156];
const RAYS = RAY_DEGS.map((deg) => {
  const t = (deg * Math.PI) / 180;
  const ux = Math.cos(t);
  const uy = -Math.sin(t);
  let lo = 0;
  let hi = 400;
  for (let i = 0; i < 40; i++) {
    const m = (lo + hi) / 2;
    const px = HER.x + ux * m - RING.x;
    const py = HER.y + uy * m - RING.y;
    if ((px * px) / (RING.rx * RING.rx) + (py * py) / (RING.ry * RING.ry) < 1) lo = m;
    else hi = m;
  }
  const hit = { x: round(HER.x + ux * lo), y: round(HER.y + uy * lo) };
  return {
    from: polar(HER.x, HER.y, 84, deg),
    to: polar(HER.x, HER.y, lo + 70, deg),
    hit,
    deg,
  };
});

/* ── तत् far off, त्वम् near, and the call ─────────────────────────────── */

const TAT = { x: 468, y: 74 };
const TVAM = { x: 170, y: 702 };
const CALL = [26, 42, 58];

/* ── The jewelled goblet ───────────────────────────────────────────────── */

const CUP = { x: 494, y: 712, s: 1.5 };
const CUP_BOWL = "M -16 -38 C -16 -22 -9 -14 0 -14 C 9 -14 16 -22 16 -38 Z";
const CUP_STEM = "M -2.4 -14 L -1.8 -2 L -9 2 L 9 2 L 1.8 -2 L 2.4 -14 Z";
const CUP_GEMS = [-10, 0, 10];

export function FiveSheaths({ idPrefix = "sa91", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);
  const cutAt = (r: { w: number; h: number }, deg: number) => {
    const t = (deg * Math.PI) / 180;
    return { x: round(HER.x + r.w * Math.cos(t)), y: round(HER.y - r.h * Math.sin(t)) };
  };

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("ray")} gradientUnits="userSpaceOnUse" x1={0} y1={HER.y} x2={0} y2={HER.y + 220}>
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0.85 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </linearGradient>
        <mask id={id("broken")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={830} fill="white" />
          {RAYS.map((r) => (
            <circle key={r.deg} cx={r.hit.x} cy={r.hit.y} r={9} fill="black" />
          ))}
        </mask>
        {SHEATHS.map((sh, k) => {
          const a = cutAt(sh, CUT.at - CUT.half[k]);
          const b = cutAt(sh, CUT.at + CUT.half[k]);
          return (
            <mask key={k} id={id(`open-${k}`)} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
              <rect width={640} height={830} fill="white" />
              <path d={`M ${HER.x} ${HER.y} L ${a.x + (a.x - HER.x) * 2} ${a.y + (a.y - HER.y) * 2} L ${b.x + (b.x - HER.x) * 2} ${b.y + (b.y - HER.y) * 2} Z`} fill="black" />
            </mask>
          );
        })}
        <linearGradient id={id("wine")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--art-crimson)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </linearGradient>
      </defs>

      {/* A boundary line round the ground, broken wherever her rays cross it */}
      <g {...part("boundless")}>
        <ellipse mask={`url(#${id("broken")})`} cx={RING.x} cy={RING.y} rx={RING.rx} ry={RING.ry} stroke="var(--gold)" strokeWidth={1.4} strokeDasharray="7 3" />
        {RAYS.map((r) => (
          <path key={r.deg} className="m-shimmer" d={`M ${r.from.x} ${r.from.y} L ${r.to.x} ${r.to.y}`} stroke={url("ray")} strokeWidth={1.5} strokeLinecap="round" />
        ))}
        {RAYS.map((r) => (
          <path key={r.deg} transform={`translate(${r.hit.x} ${r.hit.y})`} className="m-twinkle" d={glint(4)} fill="var(--art-core)" />
        ))}
      </g>

      {/* The seat of thirty-six principles */}
      <g {...part("tattvas")}>
        <ellipse cx={HER.x} cy={SEAT_FOOT + 3} rx={150} ry={7} fill="var(--art-musk)" fillOpacity={0.16} />
        {TIERS.map((t) => (
          <rect key={t.k} x={HER.x - t.half} y={t.y} width={t.half * 2} height={SEAT.tier} fill={TIER_FILL(t.k)} fillOpacity={0.85} stroke="var(--gold-soft)" strokeWidth={0.25} />
        ))}
        <path d={`M ${HER.x - 62} ${SEAT.y} H ${HER.x + 62}`} stroke="var(--gold)" strokeWidth={1} />
      </g>

      {/* Her light, within five sheaths each opened at the front */}
      <g {...part("sheaths")}>
        {SHEATHS.map((sh, k) => (
          <g key={k} mask={`url(#${id(`open-${k}`)})`}>
            <path d={eggPath(HER.x, HER.y, sh.w, sh.h)} fill={sh.fill} fillOpacity={0.12} />
            <path d={eggPath(HER.x, HER.y, sh.w, sh.h)} stroke={sh.stroke} strokeWidth={1.6} />
          </g>
        ))}
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={30} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={3.6} fill="var(--art-core)" />
      </g>

      {/* A fresh garland across the seat, not wilting */}
      <g {...part("young")}>
        <path d={`M ${GARLAND.map((p) => `${p.x} ${p.y}`).join(" L ")}`} stroke="var(--leaf)" strokeWidth={1.2} />
        {GARLAND.map((p) => (
          <g key={p.k} transform={`translate(${p.x} ${p.y})`}>
            <circle r={4.2} fill={p.k % 2 ? "var(--art-ivory)" : "var(--art-vermilion)"} stroke="var(--gold)" strokeWidth={0.5} />
            <circle r={1.3} fill="var(--art-turmeric)" />
          </g>
        ))}
        {GARLAND.filter((p) => p.k % 4 === 1).map((p) => (
          <circle key={p.k} className="m-twinkle" cx={p.x + 2} cy={p.y - 2.6} r={0.9} fill="var(--art-core)" />
        ))}
      </g>

      {/* तत्, far off in the crown */}
      <g {...part("tat")}>
        <circle cx={TAT.x} cy={TAT.y} r={24} fill={url("her")} fillOpacity={0.4} />
        <text x={TAT.x} y={TAT.y} textAnchor="middle" dominantBaseline="central" fontSize={15} fill="var(--sindura)" fillOpacity={0.8} style={{ fontFamily: "var(--font-tiro), serif" }}>
          तत्
        </text>
      </g>

      {/* त्वम्, near in front */}
      <g {...part("tvam")}>
        <text x={TVAM.x} y={TVAM.y} textAnchor="middle" dominantBaseline="central" fontSize={34} fill="var(--sindura)" style={{ fontFamily: "var(--font-tiro), serif" }}>
          त्वम्
        </text>
      </g>

      {/* Ayī: the rings of a call going out to her */}
      <g {...part("ayi")}>
        {CALL.map((r, k) => {
          const a = polar(TVAM.x, TVAM.y, r, 30);
          const b = polar(TVAM.x, TVAM.y, r, 70);
          return (
            <path
              key={r}
              className={k === 0 ? "m-shimmer" : k === 1 ? "m-shimmer m-late" : "m-shimmer m-later"}
              d={`M ${a.x} ${a.y} A ${r} ${r} 0 0 0 ${b.x} ${b.y}`}
              stroke="var(--sindura)"
              strokeWidth={1.4}
              strokeOpacity={0.8 - k * 0.2}
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* Her jewelled goblet, full to the brim */}
      <g {...part("mada")}>
        <g transform={`translate(${CUP.x} ${CUP.y}) scale(${CUP.s})`}>
          <ellipse cy={2.6} rx={14} ry={2.4} fill="var(--art-musk)" fillOpacity={0.2} />
          <path d={CUP_STEM} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} strokeLinejoin="round" />
          <path d={CUP_BOWL} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <ellipse cy={-38} rx={16} ry={3.6} fill={url("wine")} stroke="var(--gold)" strokeWidth={0.7} />
          <path d="M -8 -38.6 Q -2 -40.4 4 -39.4" stroke="var(--art-core)" strokeWidth={0.8} strokeLinecap="round" />
          <path className="m-shimmer" d="M 15.4 -37 C 16.6 -33 16.4 -29 15.2 -26" stroke="var(--art-crimson)" strokeWidth={1.4} strokeLinecap="round" />
          <path d="M -15 -30 C -10 -27 10 -27 15 -30" stroke="var(--art-carve)" strokeWidth={0.5} strokeOpacity={0.6} />
          {CUP_GEMS.map((x) => (
            <Ruby key={x} x={x} y={-25} r={2.2} />
          ))}
          <circle cy={-9} r={1.6} fill="var(--art-crimson)" stroke="var(--gold)" strokeWidth={0.4} />
        </g>
      </g>
    </svg>
  );
}
