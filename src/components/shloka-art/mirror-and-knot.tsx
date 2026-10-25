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

import {
  artIds,
  handMirror,
  HandMirror,
  MarriageThread,
  marriageThread,
  MirrorFaceClip,
  MirrorShading,
  partProps,
  radiance,
  round,
  ThreadMask,
} from "./primitives";
import type { ArtProps } from "./types";

const CX = 320;
/** The mirror, centred on her light, and the thread tied on its stem. */
const MIRROR = handMirror({ x: CX, y: 472 }, 742);
const THREAD = marriageThread(MIRROR);
const { c: C, faceR: FACE_R, frameR: FRAME_R, stemFoot: STEM_FOOT } = MIRROR;

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
        <MirrorShading m={MIRROR} id={id} />
        <linearGradient id={id("lines")} x1={130} y1={0} x2={510} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.6 }} />
          <stop offset="0.7" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <MirrorFaceClip m={MIRROR} id={id} />
        {/* Her light outside the mirror: everywhere but the disc and its stem */}
        <mask id={id("outside")} maskUnits="userSpaceOnUse" x={-200} y={-200} width={1040} height={1230}>
          <rect x={-200} y={-200} width={1040} height={1230} fill="#fff" />
          <circle cx={C.x} cy={C.y} r={FRAME_R + 1} fill="#000" />
          <rect x={CX - 11} y={C.y} width={22} height={STEM_FOOT + 34 - C.y} fill="#000" />
        </mask>
        <ThreadMask t={THREAD} id={id} />
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
        <HandMirror m={MIRROR} url={url} />
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
        <MarriageThread t={THREAD} url={url} />
      </g>
    </svg>
  );
}
