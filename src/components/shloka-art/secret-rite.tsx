/**
 * Shloka 83 — "From a seat on the map to the point at the centre, and what is
 * done there in private".
 *
 * Under the card a green valley far in the hills, a river coming down it, and
 * on a terrace by the river her light resting on a moulded stone pedestal, the
 * pīṭha. Beside it a spouted bell-metal vessel tips and pours a thin stream
 * onto the seat. In the crown the nine triangles of the Śrīcakra's centre,
 * faint, and the bindu bright inside them. Down the right column a shrine's
 * doors stand shut at the top of a short stair, lamplight showing at the seam
 * and under the sill. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { artIds, partProps, round, SRI_BINDU_V, SRI_TRIANGLES } from "./primitives";
import type { ArtProps } from "./types";

/* ── The bindu in its triangles ────────────────────────────────────────── */

const YANTRA = { x: 560, y: 104, s: 2.4 };
const BINDU = { x: YANTRA.x, y: round(YANTRA.y + SRI_BINDU_V * YANTRA.s) };

/* ── The shut doors ────────────────────────────────────────────────────── */

const DOOR = { x: 568, top: 246, bottom: 352, half: 30 };
const STEPS = [0, 1, 2].map((k) => ({ y: DOOR.bottom + 6 + k * 9, half: DOOR.half + 10 + k * 8 }));
const STUDS = [0, 1, 2, 3].flatMap((r) =>
  [-1, 1].flatMap((side) => [0.3, 0.7].map((t) => ({ x: round(DOOR.x + side * DOOR.half * t), y: round(DOOR.top + 18 + r * 22) }))),
);

/* ── The valley, the river, and her seat ───────────────────────────────── */

const HER = { x: 296, y: 470 };
const PEDESTAL = { x: HER.x, top: HER.y + 12 };
/** Ridges coming down to the river from both sides, far to near, each lower and nearer the water. */
const RIDGES = [0, 1, 2, 3].flatMap((k) =>
  [-1, 1].map((side) => {
    const edge = 320 + side * 236;
    const top = 448 + k * 30 + (side > 0 ? 4 : 0);
    const foot = { x: 320 + side * (12 + k * 5), y: 482 + k * 40 };
    const crest = { x: round(edge - side * (70 + k * 10)), y: top - 10 + k * 2 };
    return {
      d: `M ${edge} ${top + 4} C ${crest.x} ${crest.y} ${round(foot.x + side * 70)} ${foot.y - 30 - k * 4} ${foot.x} ${foot.y} L ${foot.x} 660 L ${edge} 660 Z`,
      line: `M ${edge} ${top + 4} C ${crest.x} ${crest.y} ${round(foot.x + side * 70)} ${foot.y - 30 - k * 4} ${foot.x} ${foot.y}`,
      o: round(0.1 + k * 0.06),
      k,
    };
  }),
);
const RIVER =
  "M 318 470 C 326 488 312 504 322 522 C 332 542 308 562 318 586 C 326 606 300 620 304 640 L 344 640 C 342 620 350 604 340 586 C 330 562 350 544 338 522 C 330 504 340 488 326 470 Z";
const KINDI = { x: 364, y: 466, tilt: -38 };
/** From the spout's lip, turned with the vessel, down onto the seat. */
const STREAM = `M ${KINDI.x - 30} ${KINDI.y + 1} C ${KINDI.x - 38} ${KINDI.y + 2} ${PEDESTAL.x + 20} ${PEDESTAL.top - 4} ${PEDESTAL.x + 14} ${PEDESTAL.top + 3}`;

export function SecretRite({ idPrefix = "sa83", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.25 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("river")} x1={0} y1={470} x2={0} y2={640} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.1 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.12 }} />
        </linearGradient>
        <radialGradient
          id={id("fade-g")}
          cx={320}
          cy={500}
          r={250}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(320 500) scale(1 0.62) translate(-320 -500)"
        >
          <stop offset="0.55" stopColor="white" />
          <stop offset="1" stopColor="black" />
        </radialGradient>
        <mask id={id("fade")} maskUnits="userSpaceOnUse" x={60} y={400} width={520} height={280}>
          <rect x={60} y={400} width={520} height={280} fill={url("fade-g")} />
        </mask>
        <linearGradient id={id("door")} x1={DOOR.x - DOOR.half} y1={0} x2={DOOR.x + DOOR.half} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-ember)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-crimson)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-ember)" }} />
        </linearGradient>
        <linearGradient id={id("sill")} x1={DOOR.x - DOOR.half} y1={0} x2={DOOR.x + DOOR.half} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("metal")} x1={-14} y1={0} x2={14} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)" }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-ember)" }} />
        </linearGradient>
      </defs>

      {/* A green valley far in the hills, a river coming down it */}
      <g {...part("valley")}>
        <g mask={`url(#${id("fade")})`}>
          {RIDGES.map((r, i) => (
            <g key={i}>
              <path d={r.d} fill="var(--leaf)" fillOpacity={r.o} />
              <path d={r.line} stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.4 + r.k * 0.12} />
            </g>
          ))}
          <path d={RIVER} fill={url("river")} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.7} />
          <path
            className="m-shimmer"
            d="M 322 500 C 326 508 320 514 324 522 M 324 548 C 316 560 320 570 322 580 M 314 604 C 318 612 312 620 316 630"
            stroke="var(--art-ivory)"
            strokeWidth={0.8}
            strokeOpacity={0.7}
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Her seat, a moulded stone pedestal on a terrace by the river */}
      <g {...part("seat")}>
        <ellipse cx={PEDESTAL.x} cy={PEDESTAL.top + 38} rx={38} ry={5} fill="var(--art-musk)" fillOpacity={0.2} />
        <path
          d={`M ${PEDESTAL.x - 30} ${PEDESTAL.top + 38} L ${PEDESTAL.x + 30} ${PEDESTAL.top + 38} L ${PEDESTAL.x + 26} ${PEDESTAL.top + 30} L ${PEDESTAL.x - 26} ${PEDESTAL.top + 30} Z`}
          fill="var(--art-stone)"
          stroke="var(--gold)"
          strokeWidth={0.7}
          strokeLinejoin="round"
        />
        <path
          d={`M ${PEDESTAL.x - 18} ${PEDESTAL.top + 30} L ${PEDESTAL.x + 18} ${PEDESTAL.top + 30} L ${PEDESTAL.x + 14} ${PEDESTAL.top + 12} L ${PEDESTAL.x - 14} ${PEDESTAL.top + 12} Z`}
          fill="var(--art-stone)"
          stroke="var(--gold)"
          strokeWidth={0.7}
          strokeLinejoin="round"
        />
        <path d={`M ${PEDESTAL.x - 16} ${PEDESTAL.top + 22} L ${PEDESTAL.x + 16} ${PEDESTAL.top + 22}`} stroke="var(--art-vermilion)" strokeWidth={1.4} />
        <path
          d={`M ${PEDESTAL.x - 26} ${PEDESTAL.top + 12} L ${PEDESTAL.x + 26} ${PEDESTAL.top + 12} L ${PEDESTAL.x + 22} ${PEDESTAL.top + 4} L ${PEDESTAL.x - 22} ${PEDESTAL.top + 4} Z`}
          fill="var(--art-stone)"
          stroke="var(--gold)"
          strokeWidth={0.7}
          strokeLinejoin="round"
        />
        <ellipse cx={PEDESTAL.x} cy={PEDESTAL.top + 4} rx={22} ry={3} fill="var(--art-moon)" fillOpacity={0.5} stroke="var(--gold)" strokeWidth={0.6} />
        <path
          d={`M ${PEDESTAL.x - 24} ${PEDESTAL.top + 9} L ${PEDESTAL.x + 24} ${PEDESTAL.top + 9}`}
          stroke="var(--art-core)"
          strokeWidth={0.7}
          strokeOpacity={0.5}
        />
      </g>

      {/* Her light, resting on it */}
      <g {...part("her-light")}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={52} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={9} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={4} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.8} />
      </g>

      {/* A spouted vessel tipping a thin stream onto the seat */}
      <g {...part("libation")}>
        <path d={STREAM} stroke="var(--art-moon)" strokeWidth={1.6} strokeLinecap="round" />
        <path className="m-shimmer" d={STREAM} stroke="var(--art-core)" strokeWidth={0.6} strokeDasharray="2 3" strokeLinecap="round" />
        <circle className="m-twinkle" cx={PEDESTAL.x + 12} cy={PEDESTAL.top + 2} r={1.4} fill="var(--art-core)" />
        <g transform={`translate(${KINDI.x} ${KINDI.y}) rotate(${KINDI.tilt})`}>
          <path d="M -8 14 L 8 14 L 6 10 L -6 10 Z" fill={url("metal")} stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d="M -6 10 C -16 6 -16 -10 -4 -12 L 4 -12 C 16 -10 16 6 6 10 Z" fill={url("metal")} stroke="var(--art-carve)" strokeWidth={0.6} />
          <path d="M -4 -12 L -3 -20 L 3 -20 L 4 -12 Z" fill={url("metal")} stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d="M -5.6 -21 L 5.6 -21" stroke="var(--gold)" strokeWidth={1.6} strokeLinecap="round" />
          <path d="M -11 -2 C -18 -6 -22 -12 -24 -18" stroke="var(--gold)" strokeWidth={2.4} strokeLinecap="round" />
          <path d="M -11 -2 C -18 -6 -22 -12 -24 -18" stroke="var(--art-carve)" strokeWidth={0.4} strokeOpacity={0.6} />
          <path d="M -9 2 C -9 -4 -6 -8 -2 -9" stroke="var(--art-core)" strokeWidth={1} strokeOpacity={0.7} strokeLinecap="round" />
          <path d="M -12 0 C -4 3 4 3 12 0" stroke="var(--art-carve)" strokeWidth={0.5} strokeOpacity={0.6} />
        </g>
      </g>

      {/* The nine triangles of the centre, and the bindu inside them */}
      <g {...part("bindu")}>
        <g transform={`translate(${YANTRA.x} ${YANTRA.y}) scale(${YANTRA.s})`}>
          <circle r={28} stroke="var(--gold-soft)" strokeWidth={0.3} strokeOpacity={0.6} />
          {SRI_TRIANGLES.map((t, i) => (
            <path key={i} d={t.d} stroke={t.down ? "var(--art-vermilion)" : "var(--gold)"} strokeWidth={0.35} strokeOpacity={0.55} strokeLinejoin="round" />
          ))}
        </g>
        <circle className="m-breathe" cx={BINDU.x} cy={BINDU.y} r={18} fill={url("bindu")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={2.6} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.7} />
      </g>

      {/* A shrine's doors shut at the top of a short stair, lamplight at the seam */}
      <g {...part("doors")}>
        {STEPS.map((s, k) => (
          <path
            key={k}
            d={`M ${DOOR.x - s.half} ${s.y} L ${DOOR.x + s.half} ${s.y} L ${DOOR.x + s.half} ${s.y + 9} L ${DOOR.x - s.half} ${s.y + 9} Z`}
            fill="var(--art-stone)"
            stroke="var(--gold)"
            strokeWidth={0.6}
          />
        ))}
        <path
          d={`M ${DOOR.x - DOOR.half - 12} ${DOOR.bottom + 6} L ${DOOR.x - DOOR.half - 12} ${DOOR.top - 10} L ${DOOR.x + DOOR.half + 12} ${DOOR.top - 10} L ${DOOR.x + DOOR.half + 12} ${DOOR.bottom + 6} Z`}
          fill="var(--art-stone)"
          stroke="var(--gold)"
          strokeWidth={0.8}
        />
        <path
          d={`M ${DOOR.x - DOOR.half - 18} ${DOOR.top - 10} L ${DOOR.x + DOOR.half + 18} ${DOOR.top - 10} L ${DOOR.x + DOOR.half + 10} ${DOOR.top - 20} L ${DOOR.x - DOOR.half - 10} ${DOOR.top - 20} Z`}
          fill="var(--art-turmeric)"
          stroke="var(--gold)"
          strokeWidth={0.8}
        />
        <path
          d={`M ${DOOR.x - 10} ${DOOR.top - 20} C ${DOOR.x - 8} ${DOOR.top - 30} ${DOOR.x + 8} ${DOOR.top - 30} ${DOOR.x + 10} ${DOOR.top - 20}`}
          fill="var(--art-turmeric)"
          stroke="var(--gold)"
          strokeWidth={0.8}
        />
        <circle cx={DOOR.x} cy={DOOR.top - 24} r={2} fill="var(--art-vermilion)" />
        <rect
          x={DOOR.x - DOOR.half}
          y={DOOR.top}
          width={DOOR.half * 2}
          height={DOOR.bottom - DOOR.top}
          fill={url("door")}
          stroke="var(--gold)"
          strokeWidth={0.8}
        />
        {[-1, 1].map((side) => (
          <rect
            key={side}
            x={side < 0 ? DOOR.x - DOOR.half + 5 : DOOR.x + 4}
            y={DOOR.top + 6}
            width={DOOR.half - 9}
            height={DOOR.bottom - DOOR.top - 12}
            stroke="var(--gold-soft)"
            strokeWidth={0.6}
            strokeOpacity={0.8}
          />
        ))}
        {STUDS.map((s, k) => (
          <circle key={k} cx={s.x} cy={s.y} r={1.6} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.3} />
        ))}
        <path
          className="m-flicker"
          d={`M ${DOOR.x} ${DOOR.top + 2} L ${DOOR.x} ${DOOR.bottom}`}
          stroke="var(--art-core)"
          strokeWidth={1.4}
          strokeLinecap="round"
        />
        <path
          d={`M ${DOOR.x - 6} ${DOOR.top + 46} L ${DOOR.x + 6} ${DOOR.top + 46} M ${DOOR.x - 6} ${DOOR.top + 52} L ${DOOR.x + 6} ${DOOR.top + 52}`}
          stroke="var(--gold)"
          strokeWidth={1.4}
          strokeLinecap="round"
        />
        <rect className="m-flicker" x={DOOR.x - DOOR.half} y={DOOR.bottom} width={DOOR.half * 2} height={3} fill={url("sill")} />
      </g>
    </svg>
  );
}
