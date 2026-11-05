/**
 * Shloka 35 — "A body divided into three mantras".
 *
 * The same body a second time, spelled now instead of painted. Her light
 * stands as a tall column, and two seams cross it, at the throat and at the
 * waist, as the seams of a garment made of syllables. Above the throat is
 * her face from the last verse, the lotus with the cluster of speech over it.
 * Between the seams rises the middle cluster, the sovereignty of desire, six
 * syllables in a rosy light; below the waist the śakti cluster, four, in a
 * vermilion one, standing on the lotus she stands on. Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { OpenLotus, Summit, artIds, partProps, summit } from "./primitives";
import type { ArtProps } from "./types";

const AXIS = 320;
const FACE = { x: AXIS, y: 156 };
const THROAT = 198;
const WAIST = 498;
const SPEECH = summit({ x: AXIS, y: FACE.y - 36 }, 5, 42, 54);
const MIDDLE = summit({ x: AXIS, y: 478 }, 6, 104, 70);
const SAKTI = summit({ x: AXIS, y: 604 }, 4, 70, 74);
const SEAT = { x: AXIS, y: 630 };

/** A seam across the column: a gold line with small stitches over it and a knot at each end. */
function seam(y: number, half: number) {
  const stitches = Array.from({ length: Math.floor((2 * half) / 9) }, (_, k) => {
    const x = AXIS - half + 6 + k * 9;
    return `M ${x} ${y - 2.6} L ${x + 3} ${y + 2.6}`;
  }).join(" ");
  return { line: `M ${AXIS - half} ${y} L ${AXIS + half} ${y}`, stitches, ends: [AXIS - half, AXIS + half] };
}
const SEAMS = [seam(THROAT, 74), seam(WAIST, 120)];

export function MantraBody({ idPrefix = "sa35", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("column")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.42 }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("speech")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("desire")}>
          <stop offset="0" style={{ stopColor: "var(--lotus)", stopOpacity: 0.85 }} />
          <stop offset="0.4" style={{ stopColor: "var(--lotus)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--lotus)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("power")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.75 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.26 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("region-desire")}>
          <stop offset="0" style={{ stopColor: "var(--lotus)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--lotus)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("region-power")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <clipPath id={id("trunk")}>
          <rect x={0} y={THROAT} width={640} height={WAIST - THROAT} />
        </clipPath>
        <clipPath id={id("below")}>
          <rect x={0} y={WAIST} width={640} height={830 - WAIST} />
        </clipPath>
      </defs>

      {/* Her face, from the last verse: the lotus and the cluster of speech */}
      <g {...part("face")}>
        <ellipse className="m-shimmer" cx={AXIS} cy={400} rx={160} ry={320} fill={url("column")} />
        <g transform={`translate(${FACE.x} ${FACE.y}) scale(0.95)`}>
          <OpenLotus />
        </g>
        <Summit s={SPEECH} glow={url("speech")} />
      </g>

      {/* From below the throat to the waist, the middle cluster */}
      <g {...part("middle")}>
        <ellipse className="m-shimmer m-late" cx={AXIS} cy={WAIST - 80} rx={150} ry={170} fill={url("region-desire")} clipPath={url("trunk")} />
        <Summit s={MIDDLE} glow={url("desire")} />
      </g>

      {/* Below the waist, the śakti cluster, which she carries, on the lotus she stands on */}
      <g {...part("sakti")}>
        <ellipse className="m-shimmer" cx={AXIS} cy={WAIST + 60} rx={130} ry={110} fill={url("region-power")} clipPath={url("below")} />
        <g transform={`translate(${SEAT.x} ${SEAT.y}) scale(1.1)`}>
          <OpenLotus />
        </g>
        <Summit s={SAKTI} glow={url("power")} />
      </g>

      {/* The two seams, at the throat and the waist */}
      <g {...part("seams")}>
        {SEAMS.map((s, i) => (
          <g key={i}>
            <path d={s.line} stroke="var(--gold)" strokeWidth={0.9} strokeOpacity={0.8} />
            <path d={s.stitches} stroke="var(--gold)" strokeWidth={1.1} strokeLinecap="round" />
            {s.ends.map((x) => (
              <circle key={x} cx={x} cy={i ? WAIST : THROAT} r={2.6} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
