/**
 * Shloka 69 — "Fullness, and the plainest of her names".
 *
 * Her footprints stand in vermilion at the middle of the floor, her light just
 * above them, and up to them walk a child's small steps in rice flour, the way
 * a child walks to its mother. Round them runs a kolam drawn in one line that
 * goes round twice and closes on itself, so it has no first stroke and no last.
 * On the ring sit the four aims of a life: a fire in its square pit, a heap of
 * coins, a pair of flower arrows, and a cage standing open with its bird gone.
 * At the right a full pot, tipped on its ring, pours into another, and both are
 * still brimming. At the left a cobra rises over a bowl of milk with its tongue
 * out, tasting. Over all of it her parasol stands in the crown, and at the
 * card's door wait the emblems of three gods, Brahmā's lotus on one side,
 * Viṣṇu's discus and conch and Indra's thunderbolt on the other. Which name
 * each part answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import {
  BrahmaLotus,
  BrahmaLotusDefs,
  BrimmingPot,
  FlowerArrow,
  Footprint,
  GanesaEmblem,
  Goose,
  Kolam,
  Parasol,
  Vajra,
  artIds,
  glint,
  partProps,
  polar,
  round,
  swingFrom,
  tongue,
} from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── Her light, and her footprints ─────────────────────────────────────── */

const HER = { x: 300, y: 452 };
const FEET = { x: 300, y: 520, k: 1.55, flat: 0.62, gap: 17 };
/** A child's steps in rice flour walking up from the front: left, right, left. */
const STEPS = [
  { x: 286, y: 600, left: true },
  { x: 312, y: 578, left: false },
  { x: 290, y: 556, left: true },
];

/* ── The endless kolam ─────────────────────────────────────────────────── */

const KOLAM = { cx: 300, cy: 524, r: 118, d: 14, tilt: 0.36, loops: 10.5 };
const kolamAt = (t: number, r: number) => ({
  x: round(KOLAM.cx + r * Math.cos(t)),
  y: round(KOLAM.cy + r * Math.sin(t) * KOLAM.tilt),
});
/**
 * One line, its radius waving at a half-integer rate, goes round twice before it meets itself: the
 * second lap is the first one's mirror, and the two cross between every pair of dots.
 */
const KOLAM_LINE = (() => {
  const n = 420;
  const pts = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * 4 * Math.PI;
    return kolamAt(t, KOLAM.r + KOLAM.d * Math.sin(KOLAM.loops * t));
  });
  return `M ${pts.map((p) => `${p.x} ${p.y}`).join(" L ")} Z`;
})();
const KOLAM_DOTS = Array.from({ length: 21 }, (_, i) => kolamAt(((i + 0.5) / 21) * 2 * Math.PI, KOLAM.r));

/* ── The four aims, set on the ring ────────────────────────────────────── */

const DHARMA = { x: 194, y: 490 };
const ARTHA = { x: 404, y: 488 };
const KAMA = { x: 204, y: 584 };
const MOKSA = { x: 400, y: 586 };
const PIT = "M -20 0 L 0 -8 L 20 0 L 0 8 Z";
const PIT_INNER = "M -13 0 L 0 -5.2 L 13 0 L 0 5.2 Z";
const FIRE = [
  { x: -6, h: 22, w: 7, lean: -0.3 },
  { x: 0, h: 30, w: 9, lean: 0.1 },
  { x: 6, h: 20, w: 6.5, lean: 0.4 },
];
const COINS = [
  { x: -12, y: 4 },
  { x: 0, y: 6 },
  { x: 12, y: 4 },
  { x: -6, y: 0 },
  { x: 6, y: 0 },
  { x: 0, y: -4 },
  { x: -16, y: 9 },
  { x: 17, y: 9 },
];
const CAGE_BARS = [-12, -6, 0, 6, 12];

/* ── The full pot pouring into the full pot ────────────────────────────── */

const POT_B = { x: 478, y: 622, k: 0.95 };
/** The tipped pot sits by its belly in the ring of a tall stand, which is centred on the pivot. */
const POT_A = { x: 514, y: 506, k: 0.78, tip: -70 };
const STAND_FEET = [
  { x: 498, y: 628 },
  { x: 530, y: 628 },
  { x: 516, y: 634 },
];
/** The stream from the tipped pot's lip falling into the brim of the one below. */
const POUR = "M 486 497 C 478 502 476 530 480 560";
/** Where the lower pot's overflow runs away down the floor and off the plate. */
const RUNNEL = "M 462 626 C 456 656 474 686 460 724 C 450 752 466 780 458 830";

/* ── The cobra and its bowl of milk ────────────────────────────────────── */

const COBRA = { x: 150, y: 596 };
const COIL = [
  { rx: 30, ry: 9, y: 0 },
  { rx: 24, ry: 7.4, y: -8 },
  { rx: 17, ry: 5.6, y: -15 },
];
/** The body rising from the top coil to the back of the hood. */
const NECK = "M 4 -18 C 12 -30 14 -44 6 -58 C 2 -64 -2 -70 -4 -76";
const HOOD = "M -4 -102 C 12 -102 20 -92 18 -80 C 16 -70 6 -64 -4 -62 C -14 -64 -24 -70 -26 -80 C -28 -92 -20 -102 -4 -102 Z";
const HEAD = "M -10 -100 C -10 -108 2 -108 2 -100 C 4 -96 -2 -92 -4 -91 C -6 -92 -12 -96 -10 -100 Z";
const TONGUE = "M -4 -91 L -4 -86 M -4 -86 L -6.4 -82.6 M -4 -86 L -1.6 -82.6";
const BOWL = { x: 172, y: 634 };

/* ── Her parasol, and the gods at the door ─────────────────────────────── */

const PARASOL = { cx: 310, rim: 166, s: 0.9 };
const BRAHMA = { x: 122, y: 298, k: 0.4 };
const HARI = { x: 520, y: 264 };
const INDRA = { x: 520, y: 336 };

export function FullFromFull({ idPrefix = "sa69", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("fire")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.8 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.32 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("water")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.35 }} />
        </linearGradient>
        <linearGradient id={id("staff")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </linearGradient>
        <BrahmaLotusDefs id={id} />
      </defs>

      {/* Her parasol over the whole floor, its staff fading down behind the card */}
      <g {...part("parasol")}>
        <rect x={PARASOL.cx - 1.4} y={PARASOL.rim} width={2.8} height={250} fill={url("staff")} />
        <g stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round">
          <Parasol cx={PARASOL.cx} rim={PARASOL.rim} s={PARASOL.s} />
        </g>
      </g>

      {/* Brahmā's lotus waiting at the left of the door */}
      <g {...part("gods")}>
        <g transform={`translate(${BRAHMA.x} ${BRAHMA.y}) rotate(6) scale(${BRAHMA.k})`}>
          <BrahmaLotus url={url} />
        </g>
        {[HARI, INDRA].map((g, i) => (
          <circle key={i} className="m-shimmer" cx={g.x} cy={g.y} r={26} fill={url("glow")} />
        ))}
        <g transform={`translate(${HARI.x - 9} ${HARI.y}) rotate(-6)`}>
          <GanesaEmblem name="discus" />
        </g>
        <g transform={`translate(${HARI.x + 10} ${HARI.y + 2}) rotate(-6) scale(0.9)`}>
          <GanesaEmblem name="conch" />
        </g>
        <g transform={`translate(${INDRA.x} ${INDRA.y}) rotate(-12)`} stroke="var(--gold)" strokeLinecap="round">
          <Vajra />
        </g>
      </g>

      {/* The kolam drawn in one line, round twice and closed on itself */}
      <g {...part("kolam")}>
        <Kolam d={KOLAM_LINE} dots={KOLAM_DOTS} line={1.2} dot={1.7} />
      </g>

      {/* The four aims on the ring */}
      <g {...part("aims")}>
        {/* the fire of right living in its square pit */}
        <g transform={`translate(${DHARMA.x} ${DHARMA.y})`}>
          <circle className="m-flicker" cy={-10} r={30} fill={url("fire")} />
          <path d={PIT} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path d={PIT_INNER} fill="var(--art-ember)" fillOpacity={0.8} />
          <g className="m-lick">
            {FIRE.map((f, i) => (
              <g key={i} transform={`translate(${f.x} 1)`}>
                <path d={tongue(f.h, f.w, f.lean)} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
                <path d={tongue(f.h * 0.5, f.w * 0.45, f.lean * 0.5)} fill="var(--art-core)" fillOpacity={0.9} />
              </g>
            ))}
          </g>
        </g>
        {/* wealth, a heap of coins */}
        <g transform={`translate(${ARTHA.x} ${ARTHA.y})`}>
          <ellipse cy={10} rx={24} ry={4} fill="var(--art-musk)" fillOpacity={0.14} />
          {COINS.map((c, i) => (
            <g key={i}>
              <ellipse cx={c.x} cy={c.y + 1.4} rx={6} ry={2.4} fill="var(--art-carve)" fillOpacity={0.6} />
              <ellipse cx={c.x} cy={c.y} rx={6} ry={2.4} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
            </g>
          ))}
          <path d={glint(2.4)} transform="translate(2 -6)" fill="var(--art-core)" className="m-twinkle" />
        </g>
        {/* love, a pair of flower arrows laid crosswise */}
        <g transform={`translate(${KAMA.x} ${KAMA.y})`}>
          <ellipse cy={2} rx={22} ry={3.4} fill="var(--art-musk)" fillOpacity={0.12} />
          <g transform="rotate(-62) scale(0.62)">
            <FlowerArrow length={50} />
          </g>
          <g transform="translate(-6 -2) rotate(58) scale(0.62)">
            <FlowerArrow length={50} />
          </g>
        </g>
        {/* freedom, a cage standing open, its bird already up and away */}
        <g transform={`translate(${MOKSA.x} ${MOKSA.y})`}>
          <ellipse cy={2} rx={20} ry={3.4} fill="var(--art-musk)" fillOpacity={0.14} />
          <g stroke="var(--gold)" strokeWidth={0.9} strokeLinecap="round">
            {CAGE_BARS.map((b) => (
              <path key={b} d={`M ${b} 0 L ${b} -18 Q ${round(b * 0.5)} -30 0 -32`} strokeOpacity={b === 6 ? 0 : 1} />
            ))}
            <ellipse cy={0} rx={13} ry={2.6} fill="var(--art-stone)" />
            <ellipse cy={-18} rx={13} ry={2.6} strokeWidth={0.7} />
            <circle cy={-34} r={2} fill="var(--gold)" />
            <path d="M 6 -18 L 6 -2 L 15 -6 L 15 -21 Z" fill="var(--art-ivory)" fillOpacity={0.15} strokeWidth={0.7} />
          </g>
          <g transform="translate(-40 -118) scale(0.85)">
            <g className="m-sway">
              <Goose up />
            </g>
          </g>
        </g>
      </g>

      {/* Her footprints, and a child's steps walking up to them */}
      <g {...part("footprints")}>
        {[-1, 1].map((side) => (
          <g
            key={side}
            transform={`translate(${FEET.x + side * FEET.gap} ${FEET.y}) scale(${round(side * FEET.k)} ${round(FEET.k * FEET.flat)})`}
            fill="var(--art-vermilion)"
          >
            <Footprint edge />
          </g>
        ))}
      </g>
      <g {...part("steps")}>
        {STEPS.map((s, i) => (
          <g key={i} transform={`translate(${s.x} ${s.y}) scale(${s.left ? -0.74 : 0.74} ${round(0.74 * FEET.flat)})`} fill="var(--art-ivory)" fillOpacity={0.92}>
            <Footprint edge />
          </g>
        ))}
      </g>

      {/* Her light, just above her feet */}
      <g {...part("her-light")}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={46} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={9} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={4.2} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.8} />
      </g>

      {/* The full pot, tipped, pouring into the full pot, and both still full */}
      <g {...part("pots")}>
        <path d={RUNNEL} stroke="var(--art-hair)" strokeWidth={3.4} strokeOpacity={0.2} strokeLinecap="round" />
        <path className="m-shimmer" d={RUNNEL} stroke="var(--art-moon)" strokeWidth={1.6} strokeOpacity={0.75} strokeLinecap="round" />
        <g stroke="var(--gold)" strokeWidth={2.2} strokeLinecap="round">
          {STAND_FEET.map((f, i) => (
            <path key={i} d={`M ${round(POT_A.x + (f.x - POT_A.x) * 0.5)} ${POT_A.y + 10} L ${f.x} ${f.y}`} />
          ))}
        </g>
        <g transform={`translate(${POT_B.x} ${POT_B.y}) scale(${POT_B.k})`}>
          <BrimmingPot water={url("water")} />
        </g>
        <path d={`M ${POT_A.x - 21} ${POT_A.y + 10} A 21 5.6 0 0 1 ${POT_A.x + 21} ${POT_A.y + 10}`} stroke="var(--gold)" strokeWidth={3} />
        <g transform={`translate(${POT_A.x} ${POT_A.y}) rotate(${POT_A.tip}) scale(${POT_A.k}) translate(0 26)`}>
          <BrimmingPot water={url("water")} spill={false} />
        </g>
        <path d={`M ${POT_A.x - 21} ${POT_A.y + 10} A 21 5.6 0 0 0 ${POT_A.x + 21} ${POT_A.y + 10}`} stroke="var(--gold)" strokeWidth={3} />
        <path d={`M ${POT_A.x - 21} ${POT_A.y + 10} A 21 5.6 0 0 0 ${POT_A.x + 21} ${POT_A.y + 10}`} stroke="var(--art-carve)" strokeWidth={0.5} />
        <path d={POUR} stroke="var(--art-hair)" strokeWidth={4} strokeOpacity={0.22} strokeLinecap="round" />
        <path className="m-shimmer" d={POUR} stroke="var(--art-moon)" strokeWidth={2.2} strokeLinecap="round" />
      </g>

      {/* The cobra risen over its bowl of milk, tongue out, tasting */}
      <g {...part("cobra")}>
        <g transform={`translate(${BOWL.x} ${BOWL.y})`}>
          <ellipse cy={2} rx={20} ry={3.6} fill="var(--art-musk)" fillOpacity={0.14} />
          <path d="M -15 -6 C -14 2 14 2 15 -6 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <ellipse cy={-6} rx={15} ry={3.4} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.6} />
        </g>
        <g transform={`translate(${COBRA.x} ${COBRA.y})`}>
          <ellipse cy={4} rx={36} ry={6} fill="var(--art-musk)" fillOpacity={0.16} />
          {COIL.map((c, i) => (
            <ellipse key={i} cy={c.y} rx={c.rx} ry={c.ry} stroke="var(--art-hair)" strokeWidth={9 - i} />
          ))}
          {COIL.map((c, i) => (
            <ellipse key={i} cy={c.y - 1} rx={c.rx} ry={c.ry} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.7} strokeDasharray="3 4" />
          ))}
          <path d={NECK} stroke="var(--art-hair)" strokeWidth={8} strokeLinecap="round" />
          <path d={NECK} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.6} transform="translate(2 0)" />
        </g>
        <g className="m-sway" style={swingFrom({ x: COBRA.x - 4, y: COBRA.y - 64 })}>
          <g transform={`translate(${COBRA.x} ${COBRA.y})`}>
            <path d={HOOD} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.8} />
            <path d="M -10 -84 C -8 -80 0 -80 2 -84 M -9 -76 C -6 -73 -2 -73 1 -76" stroke="var(--gold-soft)" strokeWidth={0.8} strokeLinecap="round" />
            <path d={HEAD} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.7} />
            <circle cx={-7} cy={-101} r={0.9} fill="var(--art-core)" />
            <circle cx={-1} cy={-101} r={0.9} fill="var(--art-core)" />
            <path className="m-flicker" d={TONGUE} stroke="var(--art-vermilion)" strokeWidth={0.9} strokeLinecap="round" />
          </g>
        </g>
        {[0, 1, 2].map((i) => {
          const p = polar(BOWL.x, BOWL.y - 12, 8 + i * 5, 70 + i * 30);
          return <circle key={i} className={TWINKLE[i]} cx={p.x} cy={p.y} r={0.9} fill="var(--art-ivory)" />;
        })}
      </g>
    </svg>
  );
}
