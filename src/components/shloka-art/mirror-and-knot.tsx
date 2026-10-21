/**
 * Shloka 12 — "The chin no one has matched, and a knotted thread".
 *
 * The first name gives up on comparison, so nothing is brought to compare.
 * Śaṅkara, who also gives up (Saundaryalaharī 67), calls her chin the stem of
 * the mirror that is her face, the mirror Śambhu takes in his hand. So her face
 * is a polished metal mirror here, holding no likeness, only her light, and its
 * stem is her chin. Just below, where the neck would be, the marriage thread
 * is wound round the stem and knotted, the gold tāli hanging from it. Which
 * name each part answers to is written up for readers in the registry, next to
 * this artwork's entry.
 */

import type { CSSProperties } from "react";

import { artIds, glint, lotusPetals, partProps, polar, radiance, round } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const CX = 320;
/** The mirror's centre, and her light in it. */
const C = { x: CX, y: 472 };
const FACE_R = 76;
const FRAME_R = 86;
const FRAME_BEADS = Array.from({ length: 44 }, (_, k) => polar(C.x, C.y, FRAME_R - 5, k * (360 / 44) + 4));

/* ── The stem ───────────────────────────────────────────────────────────── */

/** The lotus cup the disc rests in, where the stem begins. */
const CUP_BASE = round(C.y + FRAME_R + 6);
const CUP_BACK = lotusPetals({ x: CX - 34, width: 68, count: 4, base: CUP_BASE, height: 28 });
const CUP_FRONT = lotusPetals({ x: CX - 28, width: 56, count: 5, base: CUP_BASE, height: 18 });
const CUP_BAND = { y: CUP_BASE, h: 6 };
const CUP_BEADS = Array.from({ length: 8 }, (_, k) => ({ x: CX - 21 + k * 6, y: CUP_BASE + 3 }));
const CUP_DOWN = lotusPetals({ x: CX - 22, width: 44, count: 5, base: CUP_BASE + 6, height: -9 });

const STEM_TOP = CUP_BASE + 12;
const STEM_FOOT = 742;
const STEM_W = { top: 8, foot: 6 };
const STEM_PATH = `M ${CX - STEM_W.top} ${STEM_TOP} L ${CX - STEM_W.foot} ${STEM_FOOT} L ${CX + STEM_W.foot} ${STEM_FOOT} L ${CX + STEM_W.top} ${STEM_TOP} Z`;
const STEM_BANDS = [690, 720];
const stemHalf = (y: number) => round(STEM_W.top - ((STEM_W.top - STEM_W.foot) * (y - STEM_TOP)) / (STEM_FOOT - STEM_TOP));

/* ── The thread ─────────────────────────────────────────────────────────── */

/** The loop of cord round the stem, seen a little from above: its back arc passes behind the stem. */
const LOOP = { cx: CX, cy: STEM_TOP + 14, rx: 23, ry: 6.5 };
const onLoop = (deg: number): Pt => {
  const t = (deg * Math.PI) / 180;
  return { x: round(LOOP.cx + LOOP.rx * Math.cos(t)), y: round(LOOP.cy + LOOP.ry * Math.sin(t)) };
};
const LOOP_BACK = `M ${LOOP.cx - LOOP.rx} ${LOOP.cy} A ${LOOP.rx} ${LOOP.ry} 0 0 1 ${LOOP.cx + LOOP.rx} ${LOOP.cy}`;
const LOOP_FRONT = `M ${LOOP.cx - LOOP.rx} ${LOOP.cy} A ${LOOP.rx} ${LOOP.ry} 0 0 0 ${LOOP.cx + LOOP.rx} ${LOOP.cy}`;
/** Three knots along the front of the loop; the tāli hangs from the middle one. */
const KNOTS = [120, 90, 60].map(onLoop);
const KNOT_AT = KNOTS[1];
const CORD = 5;

/** The cord's two loose ends, hanging together from the right-hand knot to their tassels. */
const TAIL_FROM = KNOTS[2];
const TAILS = [
  { d: `C ${TAIL_FROM.x + 20} ${TAIL_FROM.y + 8} ${TAIL_FROM.x + 38} ${TAIL_FROM.y + 20} ${TAIL_FROM.x + 40} ${TAIL_FROM.y + 46} C ${TAIL_FROM.x + 42} ${TAIL_FROM.y + 70} ${TAIL_FROM.x + 32} ${TAIL_FROM.y + 84} ${TAIL_FROM.x + 38} ${TAIL_FROM.y + 106}`, end: { x: TAIL_FROM.x + 38, y: TAIL_FROM.y + 106 } },
  { d: `C ${TAIL_FROM.x + 14} ${TAIL_FROM.y + 10} ${TAIL_FROM.x + 26} ${TAIL_FROM.y + 26} ${TAIL_FROM.x + 26} ${TAIL_FROM.y + 52} C ${TAIL_FROM.x + 26} ${TAIL_FROM.y + 72} ${TAIL_FROM.x + 20} ${TAIL_FROM.y + 80} ${TAIL_FROM.x + 23} ${TAIL_FROM.y + 92}`, end: { x: TAIL_FROM.x + 23, y: TAIL_FROM.y + 92 } },
];
const TASSEL = [-5, -2.5, 0, 2.5, 5].map((dx) => `M 0 2 Q ${round(dx * 0.4)} 9 ${dx} 18`).join(" ");

/** The tāli: a gold pīpal leaf, its broad base up and its long drip tip down, hung from the middle knot. */
const TALI_AT = { x: KNOT_AT.x, y: round(KNOT_AT.y + 8) };
const TALI_SCALE = 1.45;
const TALI =
  "M 0 1.5 C -3 0 -9 -0.5 -12.5 3 C -16.5 7.5 -16 16 -11.5 23 C -7.5 29 -3 33 -1.3 41 C -0.7 45 -0.4 50 0 56 C 0.4 50 0.7 45 1.3 41 C 3 33 7.5 29 11.5 23 C 16 16 16.5 7.5 12.5 3 C 9 -0.5 3 0 0 1.5 Z";
const TALI_VEINS = [8, 16, 24, 32]
  .map((y, i) => {
    const w = [10, 12.5, 10, 6][i];
    const rise = [3, 5, 5, 4][i];
    return `M 0 ${y} Q ${round(-w * 0.5)} ${y - 1} ${-w} ${y - rise} M 0 ${y} Q ${round(w * 0.5)} ${y - 1} ${w} ${y - rise}`;
  })
  .join(" ");

const swingFrom = (p: Pt): CSSProperties => ({ transformBox: "view-box", transformOrigin: `${p.x}px ${p.y}px` });

/* ── The three lines (Saundaryalaharī 69) ───────────────────────────────── */

const LINES = [618, 631, 644].map((y) => `M 130 ${y - 16} Q ${CX} ${y + 14} 510 ${y - 16}`);

/* ── Her light ──────────────────────────────────────────────────────────── */

const RADIANCE_FROM = FRAME_R + 6;
const RADIANCE_LONG = 540;
const RADIANCE = radiance({ cx: C.x, cy: C.y, from: RADIANCE_FROM, long: RADIANCE_LONG, short: 330 });

export function MirrorAndKnot({ idPrefix = "sa12", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={C.x} cy={C.y} r={290} gradientUnits="userSpaceOnUse">
          <stop offset="0.32" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.4 }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={C.x} cy={C.y} r={RADIANCE_LONG} gradientUnits="userSpaceOnUse">
          <stop offset={round(RADIANCE_FROM / RADIANCE_LONG)} style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "var(--gold)", stopOpacity: 0.8 }} />
          <stop offset="0.6" style={{ stopColor: "var(--gold)", stopOpacity: 0.34 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("reflected")} cx={C.x} cy={C.y} r={FACE_R} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.85 }} />
          <stop offset="0.22" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="0.42" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.26 }} />
          <stop offset="0.8" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.07 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("face")} x1={C.x - FACE_R} y1={C.y - FACE_R} x2={C.x + FACE_R} y2={C.y + FACE_R} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.04 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.26 }} />
        </linearGradient>
        <linearGradient id={id("lines")} x1={130} y1={0} x2={510} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.6 }} />
          <stop offset="0.7" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <clipPath id={id("face-clip")}>
          <circle cx={C.x} cy={C.y} r={FACE_R} />
        </clipPath>
        {/* Her light outside the mirror: everywhere but the disc and its stem */}
        <mask id={id("outside")} maskUnits="userSpaceOnUse" x={-200} y={-200} width={1040} height={1230}>
          <rect x={-200} y={-200} width={1040} height={1230} fill="#fff" />
          <circle cx={C.x} cy={C.y} r={FRAME_R + 1} fill="#000" />
          <rect x={CX - 11} y={C.y} width={22} height={STEM_FOOT + 34 - C.y} fill="#000" />
        </mask>
        <mask id={id("behind-stem")} maskUnits="userSpaceOnUse" x={0} y={LOOP.cy - 20} width={640} height={40}>
          <rect x={0} y={LOOP.cy - 20} width={640} height={40} fill="#fff" />
          <rect x={CX - stemHalf(LOOP.cy) - 0.5} y={LOOP.cy - 20} width={2 * stemHalf(LOOP.cy) + 1} height={40} fill="#000" />
        </mask>
      </defs>

      {/* The three lines on her throat, standing surety for the strands of the wedding cord */}
      <g {...part("three-lines")}>
        <g stroke={url("lines")} strokeWidth={0.75} strokeLinecap="round">
          {LINES.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </g>

      {/* Her face as a mirror of polished metal, and its stem, her chin */}
      <g {...part("mirror")}>
        <circle cx={C.x} cy={C.y} r={FRAME_R} fill="var(--gold)" />
        <circle cx={C.x} cy={C.y} r={FRAME_R - 0.8} stroke="var(--art-carve)" strokeWidth={0.6} />
        <g fill="var(--gold-soft)">
          {FRAME_BEADS.map((b, k) => (
            <circle key={k} cx={b.x} cy={b.y} r={1.6} />
          ))}
        </g>
        <circle cx={C.x} cy={C.y} r={FACE_R + 1.4} fill="var(--art-carve)" />
        <circle cx={C.x} cy={C.y} r={FACE_R} fill="var(--art-ivory)" />
        <circle cx={C.x} cy={C.y} r={FACE_R} fill={url("face")} />
        <g clipPath={url("face-clip")}>
          <circle cx={C.x} cy={C.y} r={FACE_R - 2} stroke="var(--gold-soft)" strokeWidth={5} strokeOpacity={0.3} />
          <g stroke="var(--art-moon)" strokeLinecap="round">
            <path d={`M ${C.x - 60} ${C.y + 48} L ${C.x + 14} ${C.y - 64}`} strokeWidth={10} strokeOpacity={0.85} />
            <path d={`M ${C.x - 36} ${C.y + 62} L ${C.x + 32} ${C.y - 44}`} strokeWidth={3.5} strokeOpacity={0.8} />
          </g>
        </g>

        <path d={STEM_PATH} fill="var(--gold)" />
        <path d={`M ${CX - 3.4} ${STEM_TOP + 4} L ${CX - 2.6} ${STEM_FOOT - 4}`} stroke="var(--art-core)" strokeWidth={1.3} strokeOpacity={0.55} strokeLinecap="round" />
        <g fill="var(--gold-soft)" stroke="var(--art-carve)" strokeWidth={0.5}>
          {STEM_BANDS.map((y) => (
            <rect key={y} x={CX - stemHalf(y) - 1.5} y={y - 3} width={2 * stemHalf(y) + 3} height={6} rx={2} />
          ))}
        </g>
        <g fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5}>
          <rect x={CX - 10} y={STEM_FOOT - 2} width={20} height={6} rx={2.5} />
          <circle cx={CX} cy={STEM_FOOT + 10} r={6.5} />
          <path d={`M ${CX - 4} ${STEM_FOOT + 15} Q ${CX - 3} ${STEM_FOOT + 25} ${CX} ${STEM_FOOT + 32} Q ${CX + 3} ${STEM_FOOT + 25} ${CX + 4} ${STEM_FOOT + 15} Z`} />
        </g>

        <g fill="var(--art-saffron)">
          {CUP_BACK.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.6}>
          {CUP_FRONT.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <rect x={CX - 25} y={CUP_BAND.y} width={50} height={CUP_BAND.h} rx={2} fill="var(--gold)" />
        <g fill="var(--gold-soft)">
          {CUP_BEADS.map((b) => (
            <circle key={b.x} cx={b.x} cy={b.y} r={1.3} />
          ))}
        </g>
        <g fill="var(--gold)">
          {CUP_DOWN.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        <g fill="var(--art-core)">
          <path className="m-lick" d={glint(8)} transform={`translate(${C.x - 34} ${C.y + 32})`} />
          <path className="m-lick m-late" d={glint(4.5)} transform={`translate(${C.x + 34} ${C.y + 50})`} />
        </g>
      </g>

      {/* Her light: in the mirror, nothing but the point of light; round it, her radiance */}
      <g {...part("light")}>
        <g mask={url("outside")}>
          <circle className="m-shimmer" cx={C.x} cy={C.y} r={290} fill={url("glow")} />
          <path className="m-shimmer" d={RADIANCE} stroke={url("radiance")} strokeWidth={0.7} strokeLinecap="round" />
        </g>
        <g clipPath={url("face-clip")}>
          <circle className="m-shimmer" cx={C.x} cy={C.y} r={FACE_R} fill={url("reflected")} />
        </g>
        <circle cx={C.x} cy={C.y} r={12} fill="var(--art-saffron)" fillOpacity={0.75} />
        <circle className="m-shimmer" cx={C.x} cy={C.y} r={20} fill={url("bindu-glow")} />
        <circle cx={C.x} cy={C.y} r={7.5} stroke="var(--art-core)" strokeWidth={0.8} />
        <circle cx={C.x} cy={C.y} r={3.8} fill="var(--art-core)" />
      </g>

      {/* The marriage cord, wound round the stem and knotted three times, the tāli hanging from it */}
      <g {...part("thread")}>
        <g mask={url("behind-stem")}>
          <path d={LOOP_BACK} stroke="var(--gold)" strokeWidth={CORD + 1.4} />
          <path d={LOOP_BACK} stroke="var(--art-turmeric)" strokeWidth={CORD} />
        </g>
        <g className="m-sway m-late" style={swingFrom(KNOT_AT)}>
          {TAILS.map((t, i) => (
            <g key={i}>
              <path d={`M ${TAIL_FROM.x} ${TAIL_FROM.y} ${t.d}`} stroke="var(--gold)" strokeWidth={CORD + 1.4} strokeLinecap="round" />
              <path d={`M ${TAIL_FROM.x} ${TAIL_FROM.y} ${t.d}`} stroke="var(--art-turmeric)" strokeWidth={CORD} strokeLinecap="round" />
              <path d={`M ${TAIL_FROM.x} ${TAIL_FROM.y} ${t.d}`} stroke="var(--art-saffron)" strokeWidth={0.9} strokeDasharray="1.6 3" />
              <g transform={`translate(${t.end.x} ${t.end.y})`}>
                <path d={TASSEL} stroke="var(--art-turmeric)" strokeWidth={1.5} strokeLinecap="round" />
                <circle r={3.6} fill="var(--gold)" />
              </g>
            </g>
          ))}
        </g>
        <path d={LOOP_FRONT} stroke="var(--gold)" strokeWidth={CORD + 1.4} />
        <path d={LOOP_FRONT} stroke="var(--art-turmeric)" strokeWidth={CORD} />
        <path d={LOOP_FRONT} stroke="var(--art-saffron)" strokeWidth={0.9} strokeDasharray="1.6 3" />

        <g className="m-sway" style={swingFrom(KNOT_AT)}>
          <g transform={`translate(${TALI_AT.x} ${TALI_AT.y}) scale(${TALI_SCALE})`}>
            <rect x={-3.5} y={-5} width={7} height={7} rx={2} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
            <path d={TALI} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
            <path d="M 0 3 L 0 50" stroke="var(--art-carve)" strokeWidth={0.7} strokeOpacity={0.85} />
            <path d={TALI_VEINS} stroke="var(--art-carve)" strokeWidth={0.5} strokeOpacity={0.75} strokeLinecap="round" />
            <path d="M -13 13 Q -13.5 6 -8 3.5" stroke="var(--art-core)" strokeWidth={1.4} strokeOpacity={0.75} strokeLinecap="round" />
            <circle cy={14} r={3.4} fill="var(--sindura)" stroke="var(--art-carve)" strokeWidth={0.4} />
          </g>
        </g>

        {KNOTS.map((k) => (
          <g key={k.x} transform={`translate(${k.x} ${k.y})`}>
            <ellipse rx={6.2} ry={5.2} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.9} />
            <path d="M -3.8 -2 Q 0 2.4 3.8 -2" stroke="var(--art-saffron)" strokeWidth={0.8} strokeLinecap="round" />
          </g>
        ))}
      </g>
    </svg>
  );
}
