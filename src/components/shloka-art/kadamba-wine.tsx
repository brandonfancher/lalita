/**
 * Shloka 74 — "Wine made from the flower of the previous verse".
 *
 * The kadamba bough of the verse before leans into the crown again, and
 * from its heads the sweet liquor drips into a gold cup set beside the card.
 * Under the card her light, and under it a lotus turned down like a hand
 * that gives, letting fall pearls. At the right a jar of vāruṇī lies tipped
 * over, its red wine spilled in a pool that will not lie still. At the left
 * two wagtails, the poets' bird for restless lovely eyes, and a hand mirror
 * with her light in it. Along the foot a rudra vīṇā, and the soft unmetred
 * opening of a raga drifting up from its strings. Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { KADAMBA_BOUGH_HEADS, KadambaBough, Pearl, Wagtail, artIds, partProps, round } from "./primitives";
import type { ArtProps } from "./types";

/* ── The bough, and the liquor dripping into a cup ─────────────────────── */

const BOUGH_SCALE = 1.2;
const DRIP_HEAD = KADAMBA_BOUGH_HEADS[0];
const DRIP_X = round(640 - (640 - DRIP_HEAD.x) * BOUGH_SCALE);
const DRIP_TOP = round((DRIP_HEAD.y + DRIP_HEAD.r) * BOUGH_SCALE);
const CUP = { x: DRIP_X, y: 372 };
const DRIPS = [0, 1, 2, 3].map((k) => ({ y: round(DRIP_TOP + 18 + k * ((CUP.y - 30 - DRIP_TOP) / 3)), delay: `${-k * 1.6}s` }));

/** Everything under the card is drawn a little larger than first laid out. */
const LOWER = "translate(320 470) scale(1.15) translate(-320 -470)";

/* ── Her light, and the lotus that gives ───────────────────────────────── */

const HER = { x: 320, y: 444 };
const GIVING = { x: 320, y: 478 };
const GIVING_PETALS = [-48, -24, 0, 24, 48].map((deg) => ({ deg, l: deg === 0 ? 22 : 18 - Math.abs(deg) / 12 }));
const FALLING_PEARLS = [
  { y: 498, dur: 5, delay: -1 },
  { y: 512, dur: 6, delay: -3.4 },
];
const PEARL_HEAP = [
  { x: -8, y: 0 },
  { x: 0, y: 0.6 },
  { x: 8, y: 0 },
  { x: -4, y: -5.4 },
  { x: 4, y: -5.4 },
  { x: 0, y: -10.6 },
];
const HEAP_AT = { x: 320, y: 532 };

/* ── The tipped jar of vāruṇī, and the spill ───────────────────────────── */

const JAR = { x: 466, y: 506, deg: -76 };
const JAR_BODY = "M -8 -30 L 8 -30 L 7 -24 C 22 -18 26 2 18 16 C 12 24 -12 24 -18 16 C -26 2 -22 -18 -7 -24 Z";
const POOL = { x: 392, y: 522, rx: 58, ry: 9 };
const POOL_RINGS = [0.36, 0.62, 0.86].map((k) => ({ rx: round(POOL.rx * k), ry: round(POOL.ry * k) }));

/* ── Two wagtails at the left ──────────────────────────────────────────── */

const WAGTAILS = [
  { x: 196, y: 520, flip: false, cls: "m-dart" },
  { x: 252, y: 516, flip: true, cls: "m-dart m-late" },
];

/* ── The mirror ────────────────────────────────────────────────────────── */

const MIRROR = { x: 166, y: 540, r: 18, deg: -18 };

/* ── The rudra vīṇā, and its ālāpa ─────────────────────────────────────── */

const VINA = { x0: 200, x1: 456, y: 576 };
const FRETS = Array.from({ length: 14 }, (_, k) => round(VINA.x0 + 60 + k * 11.4 - k * k * 0.18));
const GOURDS = [
  { x: 236, r: 22 },
  { x: 418, r: 20 },
];
/** The vīṇā lies a little tilted, so it does not read as a bench. */
const VINA_TILT = `rotate(-5 ${(VINA.x0 + VINA.x1) / 2} ${VINA.y})`;
const ALAPA = [0, 1, 2, 3, 4].map((k) => {
  const x = 318 - k * 18;
  const y = 562 - k * 11;
  return { d: `M ${x} ${y} q -6 -5 -12 -2 q -6 3 -12 -1`, o: round(0.8 - k * 0.12), k };
});

export function KadambaWine({ idPrefix = "sa74", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.38" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.42 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("kadamba")} cx="0.38" cy="0.34" r="0.72">
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
        <radialGradient id={id("wine")} cx="0.45" cy="0.4" r="0.65">
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)" }} />
        </radialGradient>
        <radialGradient id={id("glass")} cx="0.4" cy="0.38" r="0.7">
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.6 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-moon)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)" }} />
        </radialGradient>
        <radialGradient id={id("gourd")} cx="0.38" cy="0.35" r="0.7">
          <stop offset="0" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold)" }} />
        </radialGradient>
      </defs>

      {/* The kadamba bough, and its liquor dripping into a gold cup */}
      <g {...part("kadamba")}>
        <g transform={`translate(640 0) scale(${BOUGH_SCALE}) translate(-640 0)`}>
          <KadambaBough fill={url("kadamba")} />
        </g>
        {DRIPS.map((d, i) => (
          <g key={i} className="m-sink" style={{ ["--dur" as string]: "4.8s", ["--delay" as string]: d.delay }}>
            <path
              d={`M ${CUP.x} ${d.y - 5} C ${CUP.x + 2.4} ${d.y - 1} ${CUP.x + 3} ${d.y + 1} ${CUP.x + 3} ${d.y + 2.4} C ${CUP.x + 3} ${d.y + 4.6} ${CUP.x - 3} ${d.y + 4.6} ${CUP.x - 3} ${d.y + 2.4} C ${CUP.x - 3} ${d.y + 1} ${CUP.x - 2.4} ${d.y - 1} ${CUP.x} ${d.y - 5} Z`}
              fill="var(--art-turmeric)"
              stroke="var(--gold)"
              strokeWidth={0.5}
            />
          </g>
        ))}
        <ellipse cx={CUP.x} cy={CUP.y + 14} rx={20} ry={3} fill="var(--art-musk)" fillOpacity={0.18} />
        <path d={`M ${CUP.x - 7} ${CUP.y + 13} L ${CUP.x + 7} ${CUP.y + 13} L ${CUP.x + 3} ${CUP.y + 4} L ${CUP.x - 3} ${CUP.y + 4} Z`} fill="var(--gold)" />
        <path
          d={`M ${CUP.x - 20} ${CUP.y - 8} C ${CUP.x - 18} ${CUP.y + 4} ${CUP.x + 18} ${CUP.y + 4} ${CUP.x + 20} ${CUP.y - 8} Z`}
          fill="var(--art-turmeric)"
          stroke="var(--gold)"
          strokeWidth={0.9}
        />
        <ellipse cx={CUP.x} cy={CUP.y - 8} rx={20} ry={3.6} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.9} />
        <ellipse className="m-shimmer" cx={CUP.x} cy={CUP.y - 8} rx={7} ry={1.2} stroke="var(--art-ivory)" strokeWidth={0.6} />
        <path
          d={`M ${CUP.x - 14} ${CUP.y - 2} C ${CUP.x - 6} ${CUP.y + 1} ${CUP.x + 6} ${CUP.y + 1} ${CUP.x + 14} ${CUP.y - 2}`}
          stroke="var(--art-core)"
          strokeWidth={0.6}
          strokeOpacity={0.6}
        />
      </g>

      {/* Her light */}
      <g {...part("her-light")} transform={LOWER}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={46} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={8.4} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={4} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.8} />
      </g>

      {/* A lotus turned down like a giving hand, letting fall pearls */}
      <g {...part("giving")} transform={LOWER}>
        <path d={`M ${GIVING.x} ${HER.y + 12} V ${GIVING.y - 6}`} stroke="var(--leaf)" strokeWidth={1.4} />
        {GIVING_PETALS.map((p, i) => (
          <g key={i} transform={`translate(${GIVING.x} ${GIVING.y - 6}) rotate(${p.deg})`}>
            <path
              d={`M 0 0 C -6 ${p.l * 0.3} -5 ${p.l * 0.8} 0 ${p.l} C 5 ${p.l * 0.8} 6 ${p.l * 0.3} 0 0 Z`}
              fill="var(--lotus)"
              stroke="var(--gold)"
              strokeWidth={0.5}
            />
            <path d={`M 0 2 V ${round(p.l * 0.8)}`} stroke="var(--art-ivory)" strokeWidth={0.4} strokeOpacity={0.6} />
          </g>
        ))}
        <ellipse cx={GIVING.x} cy={GIVING.y - 6} rx={6} ry={2.6} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.5} />
        {FALLING_PEARLS.map((p, i) => (
          <g key={i} className="m-sink" style={{ ["--dur" as string]: `${p.dur}s`, ["--delay" as string]: `${p.delay}s` }}>
            <Pearl x={GIVING.x} y={p.y} r={2.6} />
          </g>
        ))}
        <ellipse cx={HEAP_AT.x} cy={HEAP_AT.y + 3} rx={16} ry={2.6} fill="var(--art-musk)" fillOpacity={0.18} />
        {PEARL_HEAP.map((p, i) => (
          <Pearl key={i} x={HEAP_AT.x + p.x} y={HEAP_AT.y + p.y} r={3} />
        ))}
      </g>

      {/* The jar of vāruṇī tipped over, its wine spilled in a pool that will not lie still */}
      <g {...part("wine")} transform={LOWER}>
        <ellipse
          cx={POOL.x}
          cy={POOL.y}
          rx={POOL.rx}
          ry={POOL.ry}
          fill={url("wine")}
          fillOpacity={0.85}
          stroke="var(--art-carve)"
          strokeWidth={0.5}
          strokeOpacity={0.5}
        />
        {POOL_RINGS.map((r, i) => (
          <ellipse
            key={i}
            className={["m-shimmer", "m-shimmer m-late", "m-shimmer m-later"][i]}
            cx={POOL.x + 10}
            cy={POOL.y}
            rx={r.rx}
            ry={r.ry}
            stroke="var(--art-core)"
            strokeWidth={0.6}
            strokeOpacity={0.6}
          />
        ))}
        <path
          d={`M ${JAR.x - 34} ${JAR.y + 6} C ${JAR.x - 40} ${JAR.y + 10} ${JAR.x - 50} ${JAR.y + 14} ${JAR.x - 60} ${JAR.y + 15}`}
          stroke="var(--art-crimson)"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <ellipse cx={JAR.x + 4} cy={JAR.y + 22} rx={30} ry={3.4} fill="var(--art-musk)" fillOpacity={0.18} />
        <g transform={`translate(${JAR.x} ${JAR.y}) rotate(${JAR.deg})`}>
          <path d={JAR_BODY} fill="var(--art-ember)" stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
          <path d="M -21 -6 C -8 -2 8 -2 21 -6 M -22 2 C -8 6 8 6 22 2" stroke="var(--gold)" strokeWidth={1.2} />
          <path d="M -21 -2 C -8 2 8 2 21 -2" stroke="var(--art-turmeric)" strokeWidth={1.6} strokeDasharray="2 2.4" />
          <ellipse cy={-30} rx={8} ry={2.6} fill="var(--art-crimson)" stroke="var(--gold)" strokeWidth={0.9} />
          <path d="M -14 10 C -12 0 -10 -10 -6 -18" stroke="var(--art-ivory)" strokeWidth={1.2} strokeOpacity={0.4} strokeLinecap="round" />
        </g>
      </g>

      {/* Two wagtails, restless as lovely eyes */}
      <g {...part("wagtails")} transform={LOWER}>
        {WAGTAILS.map((w, i) => (
          <g key={i} transform={`translate(${w.x} ${w.y}) scale(${w.flip ? -1 : 1} 1)`}>
            <g className={w.cls}>
              <Wagtail />
            </g>
          </g>
        ))}
      </g>

      {/* A hand mirror with her light in it */}
      <g {...part("mirror")} transform={LOWER}>
        <g transform={`translate(${MIRROR.x} ${MIRROR.y}) rotate(${MIRROR.deg})`}>
          <path
            d={`M -3 ${MIRROR.r} L -4 ${MIRROR.r + 26} C -4 ${MIRROR.r + 30} 4 ${MIRROR.r + 30} 4 ${MIRROR.r + 26} L 3 ${MIRROR.r} Z`}
            fill="var(--gold)"
            stroke="var(--art-carve)"
            strokeWidth={0.4}
          />
          <circle cy={MIRROR.r + 12} r={2} fill="var(--art-vermilion)" />
          <circle r={MIRROR.r + 3.4} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <circle r={MIRROR.r + 3.4} stroke="var(--art-turmeric)" strokeWidth={1} strokeDasharray="1.6 2" />
          <circle r={MIRROR.r} fill={url("glass")} stroke="var(--art-carve)" strokeWidth={0.4} />
          <circle className="m-breathe" cx={-3} cy={-4} r={5} fill="var(--art-core)" fillOpacity={0.9} />
          <path
            d={`M ${-MIRROR.r * 0.6} ${MIRROR.r * 0.3} L ${-MIRROR.r * 0.2} ${MIRROR.r * 0.7}`}
            stroke="var(--art-ivory)"
            strokeWidth={1.2}
            strokeOpacity={0.6}
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* The rudra vīṇā along the foot */}
      <g {...part("vina")} transform={LOWER}>
        <g transform={VINA_TILT}>
          {GOURDS.map((g, i) => (
            <g key={i}>
              <circle cx={g.x} cy={VINA.y + g.r - 3} r={g.r} fill={url("gourd")} stroke="var(--gold)" strokeWidth={0.8} />
              <ellipse cx={g.x} cy={VINA.y + g.r - 3} rx={g.r * 0.6} ry={g.r} stroke="var(--art-carve)" strokeWidth={0.5} strokeOpacity={0.5} />
              <path
                d={`M ${g.x - g.r * 0.6} ${VINA.y + g.r - 3 * 0.6} C ${g.x - g.r * 0.5} ${VINA.y + g.r - 3 * 0.2} ${g.x - g.r * 0.3} ${VINA.y + g.r - 3 * 0.05} ${g.x} ${VINA.y - 3}`}
                stroke="var(--art-core)"
                strokeWidth={1}
                strokeOpacity={0.5}
              />
            </g>
          ))}
          <rect x={VINA.x0} y={VINA.y - 4} width={VINA.x1 - VINA.x0} height={8} rx={4} fill="var(--art-ember)" stroke="var(--gold)" strokeWidth={0.8} />
          <path d={`M ${VINA.x0 + 6} ${VINA.y - 1} H ${VINA.x1 - 6}`} stroke="var(--art-core)" strokeWidth={0.6} strokeOpacity={0.5} />
          {FRETS.map((x) => (
            <path key={x} d={`M ${x} ${VINA.y - 7} V ${VINA.y - 4}`} stroke="var(--gold)" strokeWidth={1.4} strokeLinecap="round" />
          ))}
          <path d={`M ${VINA.x0 + 10} ${VINA.y - 7.4} H ${VINA.x1 - 4}`} stroke="var(--gold-soft)" strokeWidth={0.4} />
          <path d={`M ${VINA.x0 + 10} ${VINA.y - 8.6} H ${VINA.x1 - 4}`} stroke="var(--gold-soft)" strokeWidth={0.4} />
          <path
            d={`M ${VINA.x1} ${VINA.y - 3} C ${VINA.x1 + 10} ${VINA.y - 6} ${VINA.x1 + 14} ${VINA.y - 16} ${VINA.x1 + 8} ${VINA.y - 20} C ${VINA.x1 + 4} ${VINA.y - 22} ${VINA.x1 + 2} ${VINA.y - 16} ${VINA.x1 + 6} ${VINA.y - 14}`}
            stroke="var(--gold)"
            strokeWidth={2}
            strokeLinecap="round"
          />
          {[0, 1, 2].map((k) => (
            <circle key={k} cx={VINA.x1 - 10 - k * 12} cy={VINA.y + 6} r={2} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
          ))}
          <path
            d={`M ${VINA.x0} ${VINA.y - 3} C ${VINA.x0 - 8} ${VINA.y - 3} ${VINA.x0 - 10} ${VINA.y + 3} ${VINA.x0 - 4} ${VINA.y + 4}`}
            stroke="var(--gold)"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* The soft unmetred opening rising from its strings */}
      <g {...part("alapa")} transform={LOWER}>
        {ALAPA.map((a) => (
          <path
            key={a.k}
            className={["m-shimmer", "m-shimmer m-late", "m-shimmer m-later"][a.k % 3]}
            d={a.d}
            stroke="var(--gold)"
            strokeWidth={1.1}
            strokeOpacity={a.o}
            strokeLinecap="round"
            strokeDasharray="1.4 2.6"
          />
        ))}
        {[0, 2, 4].map((k) => (
          <circle key={k} cx={ALAPA[k].k * -18 + 300} cy={556 - k * 11} r={1.4} fill="var(--art-saffron)" fillOpacity={round(0.8 - k * 0.12)} />
        ))}
      </g>
    </svg>
  );
}
