/**
 * Shloka 42 — "Devotion has power over her".
 *
 * A ladder of three, then the husband's names. Below the card a devotee's
 * offering lies on a leaf, the leaf, flower, fruit and water of the Gītā,
 * and from the flower a garland climbs all the way up to her light in the
 * crown and is looped round it: devotion reaches her, and holds her. Beside
 * it two other roads, from a book and from a fire altar, stop short. A
 * dome of her light is over all of it, shelter, and outside it the shadows
 * of fear are going under. In the crown, on either side of her light,
 * Śambhu's crescent and Śarva's bow; at the right, Śāradā, the goddess of
 * speech, a white light with her vīṇā, worships her too. Which name each
 * part answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { Vina, artIds, litPart, partProps, polar, round } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

const HER = { x: 330, y: 112 };
const SAMBHU = { x: 244, y: 104 };
const SARVA = { x: 420, y: 104 };
const CRESCENT = litPart(4, 16);

/* ── The offering, and the garland that climbs from it ─────────────────── */

const OFFERING = { x: 300, y: 586 };
const LEAF_PLATE = "M -40 2 C -30 -10 30 -10 44 0 C 30 10 -30 12 -40 2 Z";
const BLOSSOM = Array.from({ length: 5 }, (_, k) => {
  const p = polar(0, 0, 3.4, 90 + k * 72);
  return `M 0 0 Q ${round(p.x * 0.4 - p.y * 0.5)} ${round(p.y * 0.4 + p.x * 0.5)} ${p.x} ${p.y} Q ${round(p.x * 0.4 + p.y * 0.5)} ${round(p.y * 0.4 - p.x * 0.5)} 0 0 Z`;
}).join(" ");
const GARLAND_FROM = { x: OFFERING.x - 4, y: OFFERING.y - 12 };
const LOOP_R = 24;
const GARLAND = (() => {
  const top = { x: HER.x - LOOP_R, y: HER.y + 6 };
  const n = 34;
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const x = GARLAND_FROM.x + (top.x - GARLAND_FROM.x) * t + Math.sin(t * Math.PI * 5) * 10 * (1 - t);
    const y = GARLAND_FROM.y + (top.y - GARLAND_FROM.y) * t;
    return { x: round(x), y: round(y) };
  });
  return pts;
})();
const GARLAND_D = GARLAND.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");
/** Round her light, the garland closes in a ring of flowers. */
const LOOP = Array.from({ length: 16 }, (_, k) => ({ ...polar(HER.x, HER.y, LOOP_R, 186 + k * 22.5), k }));

/* ── The two roads that stop short ─────────────────────────────────────── */

const BOOK = { x: 206, y: 588 };
const ALTAR = { x: 392, y: 588 };
const SHORT = [
  `M ${BOOK.x} ${BOOK.y - 10} C ${BOOK.x} ${BOOK.y - 50} ${BOOK.x + 30} ${BOOK.y - 80} ${BOOK.x + 46} ${BOOK.y - 118}`,
  `M ${ALTAR.x} ${ALTAR.y - 26} C ${ALTAR.x} ${ALTAR.y - 60} ${ALTAR.x - 26} ${ALTAR.y - 86} ${ALTAR.x - 40} ${ALTAR.y - 118}`,
];

/* ── The shelter over it all ───────────────────────────────────────────── */

const DOME = { cx: 320, base: 604, rx: 186, ry: 178 };
const DOME_D = `M ${DOME.cx - DOME.rx} ${DOME.base} A ${DOME.rx} ${DOME.ry} 0 0 1 ${DOME.cx + DOME.rx} ${DOME.base}`;

/* ── The shadows of fear at the edges ──────────────────────────────────── */

const FEARS = [
  { x: 136, y: 440, r: 30 },
  { x: 112, y: 520, r: 24 },
  { x: 506, y: 446, r: 28 },
  { x: 530, y: 526, r: 22 },
];

/* ── Śāradā ────────────────────────────────────────────────────────────── */

const SARADA = { x: 456, y: 552 };

export function DevotionGoverns({ idPrefix = "sa42", active = null }: ArtProps) {
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
        <radialGradient id={id("moon-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("crescent-tint")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("fear")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("offering-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("shelter")} cx={0.5} cy={1} r={1}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.26 }} />
          <stop offset="0.9" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.08 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Her light in the crown */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={96} fill={url("her-glow")} />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={26} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={5.6} fill="var(--art-core)" />
        <circle cx={HER.x} cy={HER.y} r={9} stroke="var(--gold)" strokeWidth={0.9} />
      </g>

      {/* Śambhu's crescent */}
      <g {...part("sambhu")}>
        <circle className="m-shimmer m-late" cx={SAMBHU.x} cy={SAMBHU.y} r={46} fill={url("moon-glow")} />
        <circle cx={SAMBHU.x} cy={SAMBHU.y + 4} r={24} fill={url("crescent-tint")} />
        <g transform={`translate(${SAMBHU.x} ${SAMBHU.y + 3}) rotate(180)`}>
          <path d={CRESCENT} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1} />
        </g>
      </g>

      {/* Śarva's bow, the archer's */}
      <g {...part("sarva")} transform={`translate(${SARVA.x} ${SARVA.y}) rotate(-20)`}>
        <path d="M 0 -28 C 14 -18 14 18 0 28" stroke="var(--gold)" strokeWidth={2.6} strokeLinecap="round" />
        <path d="M 0 -28 C 3 -31 6 -31 8 -29 M 0 28 C 3 31 6 31 8 29" stroke="var(--gold)" strokeWidth={1.6} strokeLinecap="round" />
        <path d="M 0 -28 L 0 28" stroke="var(--gold-soft)" strokeWidth={0.6} />
        <path d="M -16 0 L 18 0" stroke="var(--gold)" strokeWidth={1} />
        <path d="M 18 0 L 13 -3 L 13 3 Z" fill="var(--art-vermilion)" />
      </g>

      {/* A dome of her light over all of it: shelter */}
      <g {...part("shelter")}>
        <path className="m-shimmer" d={`${DOME_D} Z`} fill={url("shelter")} />
        <path d={DOME_D} stroke="var(--gold)" strokeWidth={1} strokeOpacity={0.7} />
        <path d={DOME_D} stroke="var(--gold-soft)" strokeWidth={3.4} strokeOpacity={0.25} transform={`translate(0 6)`} />
        <path d={`M ${DOME.cx - DOME.rx - 10} ${DOME.base} L ${DOME.cx + DOME.rx + 10} ${DOME.base}`} stroke="var(--gold)" strokeWidth={1} strokeOpacity={0.6} />
      </g>

      {/* The shadows of fear at the edges, going under */}
      <g {...part("fear")}>
        {FEARS.map((f, i) => (
          <circle key={i} className="m-sink" cx={f.x} cy={f.y} r={f.r} fill={url("fear")} />
        ))}
      </g>

      {/* The two roads that stop short: from a book, and from a fire altar */}
      <g {...part("short")}>
        {SHORT.map((d, i) => (
          <path key={i} d={d} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.55} strokeDasharray="2 4" strokeLinecap="round" />
        ))}
        <g transform={`translate(${BOOK.x} ${BOOK.y})`}>
          <rect x={-26} y={-6} width={52} height={12} rx={6} fill="var(--art-turmeric)" fillOpacity={0.85} />
          <rect x={-28} y={-9} width={56} height={4} rx={2} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.4} />
          <rect x={-28} y={5} width={56} height={4} rx={2} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.4} />
          <path d="M -12 -9 V 9 M 12 -9 V 9" stroke="var(--art-vermilion)" strokeWidth={1} />
        </g>
        <g transform={`translate(${ALTAR.x} ${ALTAR.y})`}>
          <path d="M -18 0 L 18 0 L 14 -10 L -14 -10 Z M -22 0 L 22 0 L 22 5 L -22 5 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <path className="m-flicker" d="M -5 -10 C -8 -16 -4 -22 0 -30 C 4 -22 8 -16 5 -10 Z" fill="var(--art-saffron)" />
          <path className="m-flicker m-late" d="M -2.4 -10 C -3.6 -14 -1.6 -18 0 -22 C 1.6 -18 3.6 -14 2.4 -10 Z" fill="var(--art-core)" />
        </g>
      </g>

      {/* The offering on its leaf: a leaf, a flower, a fruit, water */}
      <g {...part("offering")}>
        <circle className="m-shimmer" cx={OFFERING.x} cy={OFFERING.y - 4} r={54} fill={url("offering-glow")} />
        <g transform={`translate(${OFFERING.x} ${OFFERING.y})`}>
          <path d={LEAF_PLATE} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.5} />
          <path d="M -36 2 C -10 -1 20 -1 40 0" stroke="var(--gold-soft)" strokeWidth={0.5} />
          <path d="M -26 -2 C -30 -10 -24 -16 -16 -16 C -16 -8 -20 -4 -26 -2 Z" fill="var(--leaf)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <g transform="translate(-4 -10) scale(2.2)">
            <path d={BLOSSOM} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.25} />
            <circle r={0.8} fill="var(--art-saffron)" />
          </g>
          <circle cx={14} cy={-6} r={6} fill="var(--art-turmeric)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d="M 14 -12 C 15 -14 17 -15 18 -15" stroke="var(--leaf)" strokeWidth={0.9} strokeLinecap="round" />
          <path d="M 24 -4 C 24 -10 34 -10 34 -4 C 34 0 24 0 24 -4 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <ellipse cx={29} cy={-6.6} rx={4.6} ry={1.2} fill="var(--art-moon)" />
        </g>
      </g>

      {/* The garland climbing from the flower all the way up to her */}
      <g {...part("road")}>
        <path d={GARLAND_D} stroke="var(--leaf)" strokeWidth={0.8} strokeOpacity={0.8} />
        {GARLAND.filter((_, i) => i % 2 === 1).map((p, i) => (
          <g key={i} className={TWINKLE[i % 3]} transform={`translate(${p.x} ${p.y}) scale(1.3)`}>
            <path d={BLOSSOM} fill={i % 2 ? "var(--art-ivory)" : "var(--art-saffron)"} stroke="var(--gold)" strokeWidth={0.3} />
          </g>
        ))}
      </g>

      {/* Looped round her light: devotion has her */}
      <g {...part("bound")}>
        <circle cx={HER.x} cy={HER.y} r={LOOP_R} stroke="var(--leaf)" strokeWidth={0.8} strokeOpacity={0.8} />
        {LOOP.map((p) => (
          <g key={p.k} className={TWINKLE[p.k % 3]} transform={`translate(${round(p.x)} ${round(p.y)}) scale(1.5)`}>
            <path d={BLOSSOM} fill={p.k % 2 ? "var(--art-ivory)" : "var(--art-saffron)"} stroke="var(--gold)" strokeWidth={0.3} />
          </g>
        ))}
      </g>

      {/* Śāradā, the goddess of speech, a white light with her vīṇā, worshipping her */}
      <g {...part("sarada")}>
        <circle className="m-shimmer m-late" cx={SARADA.x} cy={SARADA.y} r={46} fill={url("moon-glow")} />
        <circle cx={SARADA.x} cy={SARADA.y - 14} r={6} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.9} />
        <g transform={`translate(${SARADA.x} ${SARADA.y + 10}) rotate(-24) scale(0.6)`}>
          <Vina />
        </g>
      </g>
    </svg>
  );
}
