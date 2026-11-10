/**
 * Shloka 34 — "The herb that brought desire back".
 *
 * The war's last act and the start of the mantra, side by side. Below the
 * card lies the ash of Kāma, burnt by the fire of Hara's eye, and out of it
 * grows the herb that brings the dead back, alight as the herbs on Hanumān's
 * mountain were: she is the herb. Beside it Kāma is back, a rosy light with
 * his bow and arrows of flowers, and he and Rati look at each other. Above
 * the card, her face is a lotus, and over it rises the first summit of her
 * mantra, the cluster of speech: five lights on a peak, the last of them the
 * syllable that closes every cluster. Her sidelong look falls from the lotus
 * onto the ash. Which name each part answers to is written up for readers in
 * the registry, next to this artwork's entry.
 */

import { Ash, AshDefs, BLOSSOM, FlowerArrow, FlowerBow, OpenLotus, Summit, artIds, glint, partProps, round, summit } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── Her face, the lotus, and the speech cluster over it ───────────────── */

const FACE = { x: 372, y: 150 };
const SUMMIT = { foot: 64, rise: 74 };
const SPEECH = summit({ x: FACE.x, y: FACE.y - 46 }, 5, SUMMIT.foot, SUMMIT.rise);

/* ── The ash, and the herb that grows out of it ────────────────────────── */

const GROUND = 572;
const HERB = { x: 286, y: GROUND - 14 };
const HERB_TOP = { x: 282, y: 438 };
const ASH_CLOUDS = [
  { x: 286, y: GROUND - 6, r: 64 },
  { x: 232, y: GROUND + 4, r: 44 },
  { x: 344, y: GROUND + 2, r: 50 },
  { x: 300, y: GROUND - 26, r: 36 },
];
const ASH_FLECKS = Array.from({ length: 16 }, (_, k) => ({
  x: round(214 + ((k * 47) % 150)),
  y: round(GROUND - 12 - ((k * 29) % 70)),
  r: round(0.9 + (k % 3) * 0.5),
}));
const STEM = `M ${HERB.x} ${HERB.y} C ${HERB.x - 6} ${HERB.y - 40} ${HERB_TOP.x + 8} ${HERB_TOP.y + 60} ${HERB_TOP.x} ${HERB_TOP.y}`;
/** Paired leaves up the stem, shrinking toward the top. */
const LEAVES = [0, 1, 2, 3, 4].flatMap((k) => {
  const t = 0.18 + k * 0.17;
  const y = round(HERB.y + (HERB_TOP.y - HERB.y) * t);
  const x = round(HERB.x + (HERB_TOP.x - HERB.x) * t + Math.sin(t * Math.PI) * 2);
  const l = round(30 - k * 4.4);
  return [-1, 1].map((side) => ({ x, y, l, side, k }));
});
const LEAF = (l: number) => `M 0 0 C ${round(l * 0.3)} ${round(-l * 0.32)} ${round(l * 0.8)} ${round(-l * 0.3)} ${l} ${round(-l * 0.12)} C ${round(l * 0.7)} ${round(l * 0.14)} ${round(l * 0.3)} ${round(l * 0.12)} 0 0 Z`;
const BLOSSOMS = [
  { x: HERB_TOP.x, y: HERB_TOP.y - 4, s: 1 },
  { x: HERB_TOP.x - 11, y: HERB_TOP.y + 9, s: 0.75 },
  { x: HERB_TOP.x + 11, y: HERB_TOP.y + 7, s: 0.8 },
];

/* ── Her sidelong look, falling on the ash ─────────────────────────────── */

const LOOK_FROM = { x: FACE.x - 30, y: FACE.y + 18 };
const LOOK = [-1, 0, 1].map((k) => `M ${LOOK_FROM.x + k * 1.4} ${LOOK_FROM.y} L ${HERB_TOP.x + 10 + k * 7} ${HERB_TOP.y - 18 + k * 2}`);

/* ── Kāma, back, and Rati ──────────────────────────────────────────────── */

const KAMA = { x: 394, y: 474 };
const RATI = { x: 496, y: 490 };
const ARROW_FAN = [-14, -7, 0, 7, 14];
const RATI_LOOK = [-1, 0, 1].flatMap((k) => [
  `M ${KAMA.x + 14} ${KAMA.y + 2 + k * 1.4} L ${RATI.x - 12} ${RATI.y - 2 + k * 4}`,
  `M ${RATI.x - 12} ${RATI.y - 2 + k * 1.4} L ${KAMA.x + 14} ${KAMA.y + 2 + k * 4}`,
]);
const MEET = { x: round((KAMA.x + RATI.x) / 2 + 1), y: round((KAMA.y + RATI.y) / 2) };

export function Sanjivani({ idPrefix = "sa34", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("face-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("syllable")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("herb-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.7 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("kama-glow")}>
          <stop offset="0" style={{ stopColor: "var(--lotus)", stopOpacity: 0.6 }} />
          <stop offset="0.45" style={{ stopColor: "var(--lotus)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--lotus)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("rati-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <AshDefs id={id} />
      </defs>

      {/* Her face, a lotus, and the cluster of speech rising over it */}
      <g {...part("face")}>
        <circle className="m-shimmer" cx={FACE.x} cy={FACE.y - 24} r={120} fill={url("face-glow")} />
        <g transform={`translate(${FACE.x} ${FACE.y}) scale(1.45)`}>
          <OpenLotus />
        </g>
        <Summit s={SPEECH} glow={url("syllable")} />
      </g>

      {/* Her sidelong look, falling from the lotus onto the ash */}
      <g {...part("glance")}>
        <g stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.7} strokeLinecap="round">
          {LOOK.map((d, i) => (
            <path key={i} className={i % 2 ? "m-shimmer m-late" : "m-shimmer"} d={d} />
          ))}
        </g>
      </g>

      {/* Kāma's ash, and the herb that brings the dead back growing out of it, alight */}
      <g {...part("herb")}>
        <Ash clouds={ASH_CLOUDS} flecks={ASH_FLECKS} url={url} />
        <circle className="m-breathe" cx={HERB_TOP.x + 2} cy={HERB_TOP.y + 50} r={92} fill={url("herb-glow")} />
        <path d={STEM} stroke="var(--leaf)" strokeWidth={2.2} strokeLinecap="round" />
        <path d={STEM} stroke="var(--art-core)" strokeWidth={0.6} strokeOpacity={0.7} strokeLinecap="round" />
        {LEAVES.map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) scale(${l.side} 1) rotate(${-18 - l.k * 4})`}>
            <path d={LEAF(l.l)} fill="var(--leaf)" stroke="var(--art-core)" strokeWidth={0.6} strokeOpacity={0.8} />
            <path d={`M 1 0 Q ${round(l.l * 0.5)} ${round(-l.l * 0.08)} ${round(l.l - 2)} ${round(-l.l * 0.12)}`} stroke="var(--art-core)" strokeWidth={0.5} strokeOpacity={0.8} />
          </g>
        ))}
        {BLOSSOMS.map((b, i) => (
          <g key={i} className={TWINKLE[i]} transform={`translate(${b.x} ${b.y}) scale(${b.s})`}>
            <circle r={9} fill={url("syllable")} />
            <path d={BLOSSOM} fill="var(--art-ivory)" stroke="var(--art-saffron)" strokeWidth={0.4} />
            <circle r={1.1} fill="var(--art-saffron)" />
          </g>
        ))}
        <path className="m-lick" d={glint(6)} transform={`translate(${HERB_TOP.x} ${HERB_TOP.y - 12})`} fill="var(--art-core)" />
      </g>

      {/* Kāma, back with his bow and arrows of flowers, and Rati, looking at each other */}
      <g {...part("kama")}>
        <circle className="m-shimmer" cx={KAMA.x} cy={KAMA.y} r={70} fill={url("kama-glow")} />
        <circle className="m-shimmer m-late" cx={RATI.x} cy={RATI.y} r={54} fill={url("rati-glow")} />
        <g stroke="var(--gold)" strokeWidth={0.5} strokeOpacity={0.75} strokeLinecap="round">
          {RATI_LOOK.map((d, i) => (
            <path key={i} className={i % 2 ? "m-shimmer m-late" : "m-shimmer"} d={d} />
          ))}
        </g>
        <path className="m-lick" d={glint(4)} transform={`translate(${MEET.x} ${MEET.y})`} fill="var(--art-core)" />
        <g transform={`translate(${KAMA.x + 6} ${KAMA.y + 30})`}>
          {ARROW_FAN.map((deg, i) => (
            <g key={deg} transform={`rotate(${deg}) scale(0.5)`}>
              <FlowerArrow length={58} headClassName={TWINKLE[i % 3]} />
            </g>
          ))}
        </g>
        <g transform={`translate(${KAMA.x - 30} ${KAMA.y}) rotate(-90)`}>
          <FlowerBow />
        </g>
        <circle cx={KAMA.x + 6} cy={KAMA.y + 4} r={6.4} fill="var(--lotus)" stroke="var(--gold)" strokeWidth={1} />
        <circle cx={RATI.x} cy={RATI.y} r={5} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.9} />
        <circle cx={RATI.x} cy={RATI.y} r={1.6} fill="var(--art-ivory)" />
      </g>
    </svg>
  );
}
