/**
 * Shloka 61 — "The couch of five corpses".
 *
 * The verse's second line is the reason for its first, and the picture keeps
 * them together. Below the card her light is seated on the couch of the five
 * Brahmās, the four gods its legs and Sadāśiva its plank, and the gold of the
 * legs has gone dull: whatever life is in them is hers, and it reaches each
 * of them only by a thread of her light, which lights his medallion. In the
 * crown the same five shine as the five faces of Sadāśiva, her own form. Her
 * bliss widens round her ring by ring, and in a brass bowl of water before
 * the dais a lump of rock salt is dissolving, so the water is salt wherever
 * it is touched, as the Upaniṣad says of a mass of knowing. Which name each
 * part answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { BrahmaCouch, artIds, glint, hash, partProps, polar, round, tongue, yantraPetals } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];
const CX = 320;

/* ── Her light, on the couch ───────────────────────────────────────────── */

const HER = { x: CX, y: 424 };
/** The couch is drawn at Shloka 22's size and brought up to this scale. */
const K = 2.5;
const PLANK_Y = round(HER.y + 12 * K);
const COUCH_FLOOR = 40;
const FLOOR_Y = round(PLANK_Y + COUCH_FLOOR * K);
const DAIS = [
  { x0: CX - 176, x1: CX + 176, y: FLOOR_Y, h: 12 },
  { x0: CX - 192, x1: CX + 192, y: FLOOR_Y + 12, h: 10 },
];
/** The four legs, from the left Brahmā, Viṣṇu, Rudra and Īśvara, in plate units. */
const LEGS = [-48, -16, 16, 48].map((dx) => ({ x: round(CX + dx * K), top: round(PLANK_Y + 7 * K), medal: round(PLANK_Y + 16 * K) }));
const MEDAL_R = round(6.4 * K);
/** The dull wash on each leg, above and below its medallion. */
const DEAD = LEGS.map(({ x, top, medal }) => {
  const at = (y: number) => round(3 - (y - top) / (FLOOR_Y - top));
  const side = (y: number) => round(at(y) * K);
  const upper = `M ${round(x - side(top))} ${top} L ${round(x + side(top))} ${top} L ${round(x + side(medal - MEDAL_R))} ${round(medal - MEDAL_R)} L ${round(x - side(medal - MEDAL_R))} ${round(medal - MEDAL_R)} Z`;
  const lower = `M ${round(x - side(medal + MEDAL_R))} ${round(medal + MEDAL_R)} L ${round(x + side(medal + MEDAL_R))} ${round(medal + MEDAL_R)} L ${round(x + side(FLOOR_Y))} ${FLOOR_Y} L ${round(x - side(FLOOR_Y))} ${FLOOR_Y} Z`;
  return `${upper} ${lower}`;
});
/** A vein of her light down each leg, from the plank she sits on into the god's medallion. */
const VEINS = LEGS.map(({ x, medal }) => `M ${x} ${round(PLANK_Y + 7 * K)} L ${x} ${round(medal - MEDAL_R)}`);
/** Where her light runs along the plank to each leg. */
const PLANK_VEIN = `M ${LEGS[0].x} ${round(PLANK_Y + 3.5 * K)} H ${LEGS[3].x}`;
const PLANK = { x: round(CX - 56 * K), y: PLANK_Y, w: round(112 * K), h: round(7 * K) };

/* ── Her bliss, filling the space round her ─────────────────────────────── */

/**
 * Six rings of sixteen petals opening out from her, each the last scaled up by
 * the same ratio: the Taittirīya's ladder of joys, each a hundred times the one below.
 */
const BLISS_RATIO = 1.42;
const BLISS = Array.from({ length: 6 }, (_, k) => {
  const r0 = round(40 * BLISS_RATIO ** k);
  return { d: yantraPetals(16, r0, round(r0 * BLISS_RATIO), k % 2 ? 11.25 : 0), k };
});

/* ── The five faces, in the crown ──────────────────────────────────────── */

const FACES_AT = { x: CX, y: 94, r: 54 };
/** Īśāna upward at the centre, then north, east, south and west, each in the colour its dhyāna gives it. */
const FACES = [
  { name: "isana", x: FACES_AT.x, y: FACES_AT.y, fill: "var(--art-ivory)", s: 1.45 },
  { name: "vamadeva", ...polar(FACES_AT.x, FACES_AT.y, FACES_AT.r, 90), fill: "var(--art-vermilion)", s: 1.2 },
  { name: "tatpurusa", ...polar(FACES_AT.x, FACES_AT.y, FACES_AT.r, 0), fill: "var(--art-turmeric)", s: 1.2 },
  { name: "aghora", ...polar(FACES_AT.x, FACES_AT.y, FACES_AT.r, 270), fill: "var(--art-hair)", s: 1.2 },
  { name: "sadyojata", ...polar(FACES_AT.x, FACES_AT.y, FACES_AT.r, 180), fill: "var(--art-moon)", s: 1.2 },
];
const FLAME = tongue(22, 9, 0);
const FLAME_CORE = tongue(10, 4, 0);

/* ── The salt in the bowl ──────────────────────────────────────────────── */

const BOWL = { x: CX, y: 614, rx: 74, ry: 13 };
const WATER = { rx: 67, ry: 10 };
const BOWL_BODY = `M ${BOWL.x - BOWL.rx} ${BOWL.y} C ${BOWL.x - BOWL.rx + 4} ${BOWL.y + 20} ${BOWL.x - 30} ${BOWL.y + 28} ${BOWL.x} ${BOWL.y + 28} C ${BOWL.x + 30} ${BOWL.y + 28} ${BOWL.x + BOWL.rx - 4} ${BOWL.y + 20} ${BOWL.x + BOWL.rx} ${BOWL.y} Z`;
const LUMP = `M ${CX - 14} ${BOWL.y + 1} L ${CX - 11} ${BOWL.y - 10} L ${CX - 2} ${BOWL.y - 15} L ${CX + 9} ${BOWL.y - 13} L ${CX + 15} ${BOWL.y - 6} L ${CX + 13} ${BOWL.y + 1} Z`;
const LUMP_FACETS = `M ${CX - 2} ${BOWL.y - 15} L ${CX} ${BOWL.y - 6} L ${CX - 11} ${BOWL.y - 10} M ${CX} ${BOWL.y - 6} L ${CX + 13} ${BOWL.y + 1} M ${CX} ${BOWL.y - 6} L ${CX + 9} ${BOWL.y - 13} M ${CX} ${BOWL.y - 6} L ${CX - 4} ${BOWL.y + 1}`;
/** What has already gone into the water: curls spreading out from the lump's foot. */
const CURLS = [
  [-12, 2, -30, 4, -44, 1],
  [-8, 4, -22, 7, -34, 6],
  [12, 2, 28, 4, 44, 1],
  [8, 4, 20, 7, 32, 6],
  [-2, 5, -6, 7, -14, 8],
  [3, 5, 8, 7, 16, 8],
].map(([x0, y0, x1, y1, x2, y2]) => `M ${CX + x0} ${BOWL.y + y0} Q ${CX + x1} ${BOWL.y + y1} ${CX + x2} ${BOWL.y + y2}`);
/** Wherever the water is touched, it is salt. */
const TASTE = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2 + hash(i, 61) * 0.4;
  const f = 0.45 + hash(i, 7) * 0.5;
  return { x: round(BOWL.x + Math.cos(a) * WATER.rx * f), y: round(BOWL.y + Math.sin(a) * WATER.ry * f), s: round(1.6 + hash(i, 13) * 1.2) };
});

export function SaltAndTheCouch({ idPrefix = "sa61", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("bliss")} cx={HER.x} cy={HER.y} r={320} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.5 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("medal")}>
          <stop offset="0.62" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-core)", stopOpacity: 0.8 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("blush")} cx={HER.x} cy={PLANK_Y} r={90} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.85 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        {FACES.map((f) => (
          <radialGradient key={f.name} id={id(`face-${f.name}`)}>
            <stop offset="0" style={{ stopColor: f.fill, stopOpacity: 0.5 }} />
            <stop offset="1" style={{ stopColor: f.fill, stopOpacity: 0 }} />
          </radialGradient>
        ))}
        <linearGradient id={id("brass")} x1={0} y1={BOWL.y} x2={0} y2={BOWL.y + 30} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-turmeric)" }} />
        </linearGradient>
        <radialGradient
          id={id("floor")}
          cx={CX}
          cy={BOWL.y + 30}
          r={90}
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(0 ${BOWL.y + 30}) scale(1 0.14) translate(0 ${-(BOWL.y + 30)})`}
        >
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.24 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Her bliss, which fills the space round her: who could breathe if it did not? */}
      <g {...part("bliss")}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={340} fill={url("bliss")} />
        <g transform={`translate(${HER.x} ${HER.y})`}>
          {BLISS.map(({ d, k }) => (
            <g key={k} className={TWINKLE[k % 3].replace("twinkle", "shimmer")}>
              <path d={d} stroke="var(--gold)" strokeWidth={1.6} strokeOpacity={round(0.2 - k * 0.02)} />
              <path d={d} stroke="var(--art-core)" strokeWidth={0.9} strokeOpacity={round(0.8 - k * 0.1)} />
            </g>
          ))}
        </g>
      </g>

      {/* The five faces of Sadāśiva, which are her own form */}
      <g {...part("five")}>
        <circle cx={FACES_AT.x} cy={FACES_AT.y} r={FACES_AT.r} stroke="var(--gold-soft)" strokeWidth={0.7} />
        {FACES.map((f, i) => (
          <g key={f.name} transform={`translate(${round(f.x)} ${round(f.y)})`}>
            <circle className={TWINKLE[i % 3]} r={24 * f.s} fill={url(`face-${f.name}`)} />
            <g transform={`translate(0 ${round(9 * f.s)}) scale(${f.s})`}>
              <path d={FLAME} fill={f.fill} stroke="var(--gold)" strokeWidth={0.7} strokeLinejoin="round" />
              <path d={FLAME_CORE} fill="var(--art-core)" fillOpacity={0.85} />
            </g>
          </g>
        ))}
      </g>

      {/* The couch of the five Brahmās, the four gods its legs and Sadāśiva its plank */}
      <g {...part("couch")}>
        {DAIS.map((d, i) => (
          <rect key={i} x={d.x0} y={d.y} width={d.x1 - d.x0} height={d.h} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1} />
        ))}
        <path
          d={Array.from({ length: 16 }, (_, i) => round(DAIS[0].x0 + 10 + i * 19.6))
            .map((x) => `M ${x} ${DAIS[0].y + 3} L ${x} ${DAIS[0].y + DAIS[0].h - 3}`)
            .join(" ")}
          stroke="var(--gold-soft)"
          strokeWidth={0.6}
        />
        <g transform={`translate(${HER.x} ${PLANK_Y}) scale(${K})`}>
          <BrahmaCouch cx={0} plank={0} floor={COUCH_FLOOR} />
        </g>
        {DEAD.map((d, i) => (
          <path key={i} d={d} fill="var(--art-hair)" fillOpacity={0.42} />
        ))}
      </g>

      {/* Her light, made of awareness, and the veins of it that are all the life the four have */}
      <g {...part("light")}>
        {LEGS.map(({ x, medal }, i) => (
          <circle key={x} className={TWINKLE[i % 3]} cx={x} cy={medal} r={MEDAL_R + 9} fill={url("medal")} />
        ))}
        <path d={PLANK_VEIN} stroke="var(--art-core)" strokeWidth={1} strokeOpacity={0.7} />
        {VEINS.map((d, i) => (
          <g key={i}>
            <path d={d} stroke="var(--art-core)" strokeWidth={3.6} strokeOpacity={0.3} strokeLinecap="round" />
            <path className="m-shimmer" d={d} stroke="var(--art-core)" strokeWidth={1.1} strokeLinecap="round" />
          </g>
        ))}
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={70} fill={url("bindu")} />
        <path d={glint(30)} transform={`translate(${HER.x} ${HER.y})`} fill="var(--art-saffron)" fillOpacity={0.55} />
        <path d={glint(24)} transform={`translate(${HER.x} ${HER.y})`} fill="var(--art-core)" fillOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={10.5} fill="var(--art-core)" />
        <circle cx={HER.x} cy={HER.y} r={5.4} fill="var(--art-ivory)" />
      </g>

      {/* Sadāśiva, white as crystal, red where her light falls on him (Saundaryalaharī 92) */}
      <g {...part("blush")}>
        <rect x={PLANK.x} y={PLANK.y} width={PLANK.w} height={PLANK.h} rx={2 * K} fill={url("blush")} />
        <path
          d={`M ${HER.x - 40} ${PLANK_Y + 1} H ${HER.x + 40}`}
          stroke="var(--art-core)"
          strokeWidth={0.9}
          strokeOpacity={0.8}
          strokeLinecap="round"
        />
      </g>

      {/* A lump of rock salt dissolving in water, salt wherever the water is touched */}
      <g {...part("salt")}>
        <ellipse cx={CX} cy={BOWL.y + 30} rx={90} ry={12} fill={url("floor")} />
        <ellipse cx={CX} cy={BOWL.y + 28} rx={20} ry={4} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.8} />
        <path d={BOWL_BODY} fill={url("brass")} stroke="var(--gold)" strokeWidth={1} />
        <path
          d={`M ${BOWL.x - 46} ${BOWL.y + 12} C ${BOWL.x - 30} ${BOWL.y + 20} ${BOWL.x + 30} ${BOWL.y + 20} ${BOWL.x + 46} ${BOWL.y + 12}`}
          stroke="var(--art-vermilion)"
          strokeWidth={1.2}
          strokeOpacity={0.6}
        />
        <ellipse cx={BOWL.x} cy={BOWL.y} rx={BOWL.rx} ry={BOWL.ry} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={1.6} />
        <ellipse cx={BOWL.x} cy={BOWL.y} rx={WATER.rx} ry={WATER.ry} fill="var(--art-stone)" />
        <ellipse cx={BOWL.x} cy={BOWL.y} rx={WATER.rx} ry={WATER.ry} fill="var(--art-hair)" fillOpacity={0.16} />
        <ellipse className="m-shimmer" cx={BOWL.x} cy={BOWL.y} rx={WATER.rx} ry={WATER.ry} fill="var(--art-core)" fillOpacity={0.22} />
        <g transform={`translate(${CX} ${BOWL.y}) scale(1.35) translate(${-CX} ${-BOWL.y})`}>
          <path d={CURLS.join(" ")} stroke="var(--art-core)" strokeWidth={1} strokeLinecap="round" />
          <path d={LUMP} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path d={LUMP} fill="var(--lotus)" fillOpacity={0.3} />
          <path d={LUMP_FACETS} stroke="var(--gold-soft)" strokeWidth={0.6} />
        </g>
        {TASTE.map((t, i) => (
          <path key={i} className={TWINKLE[i % 3]} d={glint(t.s)} transform={`translate(${t.x} ${t.y})`} fill="var(--art-ivory)" />
        ))}
      </g>
    </svg>
  );
}
