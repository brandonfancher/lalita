/**
 * Shloka 36 — "Made of the root mantra, sworn to the kula".
 *
 * The argument of the last two verses stated flatly, and then a new word.
 * In the crown her light is ringed by the whole root mantra, fifteen
 * syllables round her, the three ह्रीं that close its clusters set in the
 * ring: the mantra is what she is made of. Below the card the three clusters
 * stand together on one ground line as a single range of three peaks, her
 * frame. From the ring a thin fall of nectar comes down at the right into a
 * brimming cup, the nectar of the kula; whether it falls from the crown of
 * the head or is poured in the rite, the picture does not say. Under the
 * range lies the kula's compact, a palm-leaf book bound shut with a cord and
 * a vermilion seal. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { MantraClusterDefs, NectarCup, RootMantraRing, Summit, artIds, partProps, round, summit } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── The root mantra round her ─────────────────────────────────────────── */

const HER = { x: 468, y: 118 };
const RING_R = 52;

/* ── The three clusters as one range ───────────────────────────────────── */

const RANGE_FOOT = 552;
const PEAKS = [
  { s: summit({ x: 196, y: RANGE_FOOT }, 5, 50, 82), glow: "speech" },
  { s: summit({ x: 302, y: RANGE_FOOT }, 6, 56, 112), glow: "desire" },
  { s: summit({ x: 396, y: RANGE_FOOT }, 4, 38, 72), glow: "power" },
];
const GROUND = `M 132 ${RANGE_FOOT} L 448 ${RANGE_FOOT}`;

/* ── The nectar of the kula ────────────────────────────────────────────── */

const CUP = { x: 486, y: 530 };
const FALL_FROM = { x: HER.x + 16, y: HER.y + RING_R + 2 };
const FALL = `M ${FALL_FROM.x} ${FALL_FROM.y} C ${FALL_FROM.x + 16} ${FALL_FROM.y + 120} ${CUP.x + 4} ${CUP.y - 220} ${CUP.x} ${CUP.y - 18}`;
const DROPS = [0, 1, 2].map((k) => ({ y: round(CUP.y - 34 - k * 26), k }));
const DROP = "M 0 -4.4 C 1.6 -1.6 2.6 0 2.6 1.4 A 2.6 2.6 0 0 1 -2.6 1.4 C -2.6 0 -1.6 -1.6 0 -4.4 Z";

/* ── The compact, bound and sealed ─────────────────────────────────────── */

const BOOK = { x: 290, y: 616, half: 74 };
const CORD = `M ${BOOK.x - 40} ${BOOK.y - 9} L ${BOOK.x - 40} ${BOOK.y + 9} M ${BOOK.x + 40} ${BOOK.y - 9} L ${BOOK.x + 40} ${BOOK.y + 9} M ${BOOK.x - 40} ${BOOK.y} C ${BOOK.x - 24} ${BOOK.y + 3} ${BOOK.x - 10} ${BOOK.y + 1} ${BOOK.x} ${BOOK.y} M ${BOOK.x + 40} ${BOOK.y} C ${BOOK.x + 24} ${BOOK.y + 3} ${BOOK.x + 10} ${BOOK.y + 1} ${BOOK.x} ${BOOK.y}`;
const LEAF_EDGES = [-4, -1.5, 1, 3.5].map((dy) => `M ${BOOK.x - BOOK.half + 4} ${BOOK.y + dy} L ${BOOK.x + BOOK.half - 4} ${BOOK.y + dy}`).join(" ");
const SEAL_SIGN = "M -3.4 -2 L 3.4 -2 L 0 3.6 Z";

export function RootMantra({ idPrefix = "sa36", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("her-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <MantraClusterDefs id={id} />
        <radialGradient id={id("range-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.3 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("nectar-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("fall")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-ivory)", stopOpacity: 0.9 }} />
        </linearGradient>
      </defs>

      {/* Her light, and round it the fifteen syllables of the root mantra */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={110} fill={url("her-glow")} />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={30} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={5.6} fill="var(--art-core)" />
        <circle cx={HER.x} cy={HER.y} r={9} stroke="var(--gold)" strokeWidth={0.9} />
      </g>

      <g {...part("mantra")}>
        <RootMantraRing c={HER} r={RING_R} url={url} />
      </g>

      {/* The three clusters standing together as one range, her frame */}
      <g {...part("range")}>
        <ellipse className="m-shimmer" cx={292} cy={RANGE_FOOT - 44} rx={220} ry={130} fill={url("range-glow")} />
        <path d={GROUND} stroke="var(--gold)" strokeWidth={1.2} strokeOpacity={0.8} strokeLinecap="round" />
        {PEAKS.map((p, i) => (
          <Summit key={i} s={p.s} glow={url(p.glow)} />
        ))}
      </g>

      {/* The nectar of the kula, falling into a brimming cup */}
      <g {...part("nectar")}>
        <path d={FALL} stroke={url("fall")} strokeWidth={1.4} strokeLinecap="round" />
        {DROPS.map((d) => (
          <path key={d.k} className={TWINKLE[d.k]} d={DROP} transform={`translate(${CUP.x} ${d.y})`} fill="var(--art-ivory)" stroke="var(--art-moon)" strokeWidth={0.5} />
        ))}
        <g transform={`translate(${CUP.x} ${CUP.y}) scale(1.1)`}>
          <NectarCup glow={url("nectar-glow")} />
        </g>
      </g>

      {/* The kula's compact: a palm-leaf book bound shut with a cord and sealed */}
      <g {...part("compact")}>
        <rect x={BOOK.x - BOOK.half} y={BOOK.y - 7} width={BOOK.half * 2} height={14} rx={7} fill="var(--art-turmeric)" fillOpacity={0.85} />
        <path d={LEAF_EDGES} stroke="var(--art-carve)" strokeWidth={0.4} strokeOpacity={0.5} />
        <rect x={BOOK.x - BOOK.half - 2} y={BOOK.y - 10} width={BOOK.half * 2 + 4} height={4} rx={2} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.4} />
        <rect x={BOOK.x - BOOK.half - 2} y={BOOK.y + 6} width={BOOK.half * 2 + 4} height={4} rx={2} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.4} />
        <path d={CORD} stroke="var(--art-vermilion)" strokeWidth={1.2} strokeLinecap="round" />
      </g>

      {/* Its seal */}
      <g {...part("seal")}>
        <circle cx={BOOK.x} cy={BOOK.y} r={7.6} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.8} />
        <path d={SEAL_SIGN} transform={`translate(${BOOK.x} ${BOOK.y})`} stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
      </g>
    </svg>
  );
}
