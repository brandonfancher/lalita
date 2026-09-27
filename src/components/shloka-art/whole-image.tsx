/**
 * The Dhyāna — "The whole image".
 *
 * Dhyāna is the building of an image in the mind, and the four meditation
 * verses build four. This gathers them into one, set out crest to foot as a
 * temple image is: the moon on the ruby crown, the four weapons on four arms
 * of light, the eight powers ringing her, the lotus seat, and the jewelled
 * vessel under her red feet. Where she herself would be there is only light,
 * bright as the hibiscus. Which phrase each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import {
  ArmLight,
  armBeam,
  artIds,
  Bangle,
  BeeString,
  bowTips,
  FlowerArrow,
  glint,
  Goad,
  litPart,
  lotusPetals,
  Noose,
  partProps,
  polar,
  round,
  Ruby,
  RubyCrown,
  SugarcaneBow,
  wrist,
  type Tattva,
} from "./primitives";
import type { ArtProps } from "./types";

const CX = 320;
/** The bindu, where she is, at the heart of the hibiscus. */
const B = { x: CX, y: 462 };

/* ── The crown and its moon ────────────────────────────────────────────── */

/** The crown is drawn at Shloka 4's size and brought down to this scale, its diadem resting on the card. */
const CROWN_SCALE = 0.84;
const CROWN_Y = round(194 - 190 * CROWN_SCALE);
/** The crescent, horns up, cradled on the crown's finial. */
const MOON = { x: CX, y: 34, r: 22, night: 4 };

/* ── The four weapons, on four arms of light ───────────────────────────── */

const NOOSE_AT = { x: 178, y: 166 };
const GOAD_AT = { x: 462, y: 170 };
/** Where the lower hands hold the bow at its grip and the arrows at their shafts. */
const BOW_AT = { x: 150, y: 524 };
const ARROWS_AT = { x: 478, y: 532 };

const arms = [
  armBeam(B, wrist(B, NOOSE_AT), 36, 13),
  armBeam(B, wrist(B, GOAD_AT), 36, 13),
  armBeam(B, wrist(B, BOW_AT), 32, 12),
  armBeam(B, wrist(B, ARROWS_AT), 32, 12),
];

/** Braced, held upright in the left hand, the stave curving away from her. */
const BOW = { half: 76, grip: 0, bend: 36 };
const [TIP_L, TIP_R] = bowTips(BOW);

/** The five arrows, fanned from their nocks, in the order of the elements left to right. */
const NOCKS = { x: ARROWS_AT.x, y: 596 };
const ARROWS: { angle: number; sign: Tattva }[] = [
  { angle: -12, sign: "space" },
  { angle: -6, sign: "air" },
  { angle: 0, sign: "fire" },
  { angle: 6, sign: "water" },
  { angle: 12, sign: "earth" },
];

/* ── The eight powers ──────────────────────────────────────────────────── */

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/** Eight short rays round her, each tipped with a point of light, set between her arms. */
const siddhis = Array.from({ length: 8 }, (_, k) => {
  const deg = k * 45;
  const a = polar(B.x, B.y, 76, deg - 5);
  const tip = polar(B.x, B.y, 92, deg);
  const c = polar(B.x, B.y, 76, deg + 5);
  return { ray: `M ${a.x} ${a.y} L ${tip.x} ${tip.y} L ${c.x} ${c.y} Z`, at: polar(B.x, B.y, 99, deg), k };
});

/* ── The hibiscus ──────────────────────────────────────────────────────── */

const HIBISCUS_R = 64;

/** One broad petal of the hibiscus, base at the origin, pointing up, its rim a little ruffled. */
const HIBISCUS_PETAL = [
  "M 0 0",
  "C -10 -10 -34 -26 -38 -44",
  "C -41 -58 -26 -67 -12 -64",
  "C -6 -66 -2 -62 1 -65",
  "C 5 -68 10 -66 15 -65",
  "C 30 -64 41 -54 37 -40",
  "C 34 -26 10 -8 0 0",
  "Z",
].join(" ");
const HIBISCUS_VEINS = [-24, -12, 0, 12, 24]
  .map((x) => `M ${round(x * 0.15)} -14 Q ${round(x * 0.7)} -34 ${x} ${-52 + Math.abs(x) * 0.25}`)
  .join(" ");
/** The sheen down the middle of each petal, where it catches the light. */
const HIBISCUS_SHEEN = "M 1 -20 C 2 -32 3 -44 1 -56";
const hibiscusPetals = Array.from({ length: 5 }, (_, k) => `translate(${B.x} ${B.y}) rotate(${8 + k * 72})`);

/** The staminal column, springing from her and leaning up and out, dusted with pollen. */
const COLUMN_TIP = polar(B.x, B.y, 76, 24);
const COLUMN = `M ${B.x} ${B.y} C ${B.x + 18} ${B.y - 2} ${B.x + 44} ${B.y - 14} ${COLUMN_TIP.x} ${COLUMN_TIP.y}`;
/** Pollen on short stalks along the column's outer third. */
const POLLEN = [0.62, 0.68, 0.74, 0.8, 0.86].flatMap((t, i) => {
  const x = B.x + (COLUMN_TIP.x - B.x) * t;
  const y = B.y + (COLUMN_TIP.y - B.y) * t;
  return [
    { x: round(x - 2), y: round(y - 4 - (i % 2)) },
    { x: round(x + 2), y: round(y + 3 + (i % 2)) },
  ];
});
const STIGMA = Array.from({ length: 5 }, (_, k) => polar(COLUMN_TIP.x + 2, COLUMN_TIP.y - 1, 4, 18 + k * 72));

/** The innermost enclosure of the Śrīcakra: a downward triangle round the bindu. */
const TRIANGLE = [270, 30, 150].map((deg) => polar(B.x, B.y, 22, deg));

/* ── The lotus seat ────────────────────────────────────────────────────── */

const SEAT = { band: 618, bandH: 8 };
const seatBack = lotusPetals({ x: 206, width: 228, count: 9, base: 614, height: 40 });
const seatFront = lotusPetals({ x: 188, width: 264, count: 10, base: SEAT.band, height: 32 });
const seatUnder = lotusPetals({ x: 200, width: 240, count: 10, base: SEAT.band + SEAT.bandH, height: -18 });
const seatBeads = Array.from({ length: 21 }, (_, k) => ({ x: round(196 + k * 12.4), y: SEAT.band + SEAT.bandH / 2 }));

/* ── The jewelled vessel, and her red feet on it ───────────────────────── */

const LID = { y: 670, rx: 56, ry: 21 };
const VESSEL_BODY = [
  `M ${CX - 44} 683`,
  `C ${CX - 64} 692 ${CX - 76} 706 ${CX - 74} 728`,
  `C ${CX - 72} 752 ${CX - 48} 768 ${CX - 30} 774`,
  `L ${CX + 30} 774`,
  `C ${CX + 48} 768 ${CX + 72} 752 ${CX + 74} 728`,
  `C ${CX + 76} 706 ${CX + 64} 692 ${CX + 44} 683`,
  "Z",
].join(" ");
/** The band of gems round the vessel's belly, dipping at the front: rubies and emeralds by turns. */
const vesselGems = Array.from({ length: 9 }, (_, k) => {
  const dx = (k - 4) * 15;
  return { x: CX + dx, y: round(726 + 5 * (1 - (dx / 74) ** 2)), ruby: k % 2 === 0, r: round(4.4 - Math.abs(k - 4) * 0.35) };
});
const vesselPearls = (y: number, hw: number, n: number) =>
  Array.from({ length: n }, (_, k) => {
    const dx = -hw + (k * 2 * hw) / (n - 1);
    return { x: round(CX + dx), y: round(y + 4 * (1 - (dx / hw) ** 2)) };
  });
const pearlsAbove = vesselPearls(708, 64, 17);
/** Petals chased upturned round the vessel's foot. */
const footPetals = lotusPetals({ x: CX - 46, width: 92, count: 8, base: 772, height: 14 });
const pearlsBelow = vesselPearls(744, 62, 17);

/** A right footprint, toes at the top, big toe to the left: about 15 wide and 38 tall, centred on the origin. */
const SOLE = [
  "M 0.5 15",
  "C -4.5 15 -5.5 11 -5 7",
  "C -4.6 3.5 -2.6 1 -2.8 -3",
  "C -3 -7 -7 -9 -7 -12.5",
  "C -7 -15.5 -3.5 -16.2 0.5 -16",
  "C 4.5 -15.8 7 -14 6.6 -10",
  "C 6.2 -5 5.2 -1 5 3.5",
  "C 4.8 9 5.2 15 0.5 15",
  "Z",
].join(" ");
const TOES = [
  { x: -4, y: -20.6, r: 2.5 },
  { x: 0.6, y: -22.4, r: 1.7 },
  { x: 3.6, y: -21.8, r: 1.5 },
  { x: 6, y: -20.2, r: 1.25 },
  { x: 7.8, y: -17.8, r: 1.05 },
];
const FEET = [
  { x: CX - 15, mirror: true },
  { x: CX + 15, mirror: false },
];

export function WholeImage({ idPrefix = "sa0", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("body")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.5 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("heart")} cx={B.x} cy={B.y} r={170} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("hibiscus")} cx={B.x} cy={B.y} r={HIBISCUS_R} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-crimson)" }} />
          <stop offset="0.28" style={{ stopColor: "var(--art-crimson)" }} />
          <stop offset="0.46" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
        <radialGradient id={id("bindu")} cx={B.x} cy={B.y} r={30} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("crown-glow")} cx={CX} cy={120} r={150} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        {arms.map((b, i) => (
          <linearGradient key={i} id={id(`arm-${i}`)} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
            <stop offset="0.2" style={{ stopColor: "var(--art-saffron)", stopOpacity: 1 }} />
            <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          </linearGradient>
        ))}
      </defs>

      {/* Her body, vermilion: only light, from the crown down to the seat */}
      <g {...part("light")}>
        <ellipse className="m-shimmer" cx={CX} cy={400} rx={200} ry={330} fill={url("body")} />
        <circle className="m-shimmer m-late" cx={B.x} cy={B.y} r={170} fill={url("heart")} />
      </g>

      {/* The eight powers, aṇimā and the rest, ringing her like rays */}
      <g {...part("siddhis")}>
        <g fill="var(--art-saffron)" fillOpacity={0.85}>
          {siddhis.map((s) => (
            <path key={s.k} d={s.ray} />
          ))}
        </g>
        {siddhis.map((s) => (
          <g key={s.k} transform={`translate(${s.at.x} ${s.at.y})`}>
            <path className={TWINKLE[s.k % 3]} d={glint(6.5)} fill="var(--art-core)" />
            <circle r={1.3} fill="var(--gold)" />
          </g>
        ))}
      </g>

      {/* Four arms of light, and in their hands the noose, the goad, the bow and the arrows */}
      <g {...part("weapons")}>
        {arms.map((b, i) => (
          <ArmLight key={i} beam={b} fill={url(`arm-${i}`)} />
        ))}
        <g transform={`translate(${NOOSE_AT.x} ${NOOSE_AT.y}) rotate(-12) scale(0.86)`}>
          <Noose />
        </g>
        <g transform={`translate(${GOAD_AT.x} ${GOAD_AT.y}) rotate(12) scale(0.84)`}>
          <Goad />
        </g>
        <g transform={`translate(${BOW_AT.x} ${BOW_AT.y}) rotate(-90)`}>
          <BeeString from={TIP_L} to={TIP_R} />
          <SugarcaneBow shape={BOW} />
        </g>
        {ARROWS.map((a) => (
          <g key={a.sign} transform={`translate(${NOCKS.x} ${NOCKS.y}) rotate(${a.angle})`}>
            <FlowerArrow length={118} sign={a.sign} />
          </g>
        ))}
        {arms.map((b, i) => (
          <g key={i} transform={`translate(${b.x2} ${b.y2}) rotate(${round(b.angle + 90)})`}>
            <Bangle />
          </g>
        ))}
      </g>

      {/* The lotus she is seated on, gold */}
      <g {...part("lotus-seat")}>
        <g fill="var(--art-saffron)" fillOpacity={0.45} stroke="var(--gold)" strokeWidth={0.8}>
          {seatBack.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g fill="var(--art-core)" fillOpacity={0.55} stroke="var(--gold)" strokeWidth={0.9}>
          {seatFront.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <rect x={186} y={SEAT.band} width={268} height={SEAT.bandH} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.9} />
        <g fill="var(--gold)">
          {seatBeads.map((b, i) => (
            <circle key={i} cx={b.x} cy={b.y} r={1.5} />
          ))}
        </g>
        <g fill="var(--art-saffron)" fillOpacity={0.3} stroke="var(--gold)" strokeWidth={0.8}>
          {seatUnder.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </g>

      {/* The jewelled vessel, and her red feet resting on it */}
      <g {...part("vessel")}>
        <path d={VESSEL_BODY} fill="var(--gold)" />
        <path d={`M ${CX - 46} 688 Q ${CX} 697 ${CX + 46} 688`} stroke="var(--gold-soft)" strokeWidth={2.2} />
        <path d={`M ${CX - 46} 688 Q ${CX} 697 ${CX + 46} 688`} stroke="var(--art-carve)" strokeWidth={0.6} />
        <ellipse cx={CX - 30} cy={722} rx={16} ry={26} fill="var(--art-core)" fillOpacity={0.22} transform={`rotate(14 ${CX - 30} 722)`} />
        <g fill="var(--gold-soft)" stroke="var(--art-carve)" strokeWidth={0.6}>
          {footPetals.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g fill="var(--gold-soft)">
          {[...pearlsAbove, ...pearlsBelow].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={1.6} />
          ))}
        </g>
        {vesselGems.map((g, i) =>
          g.ruby ? (
            <Ruby key={i} x={g.x} y={g.y} r={g.r} />
          ) : (
            <g key={i}>
              <ellipse cx={g.x} cy={g.y} rx={round(g.r + 0.3)} ry={round(g.r * 0.8 + 0.3)} fill="var(--art-carve)" />
              <ellipse cx={g.x} cy={g.y} rx={round(g.r - 1)} ry={round(g.r * 0.8 - 1)} fill="var(--leaf)" />
            </g>
          ),
        )}
        <rect x={CX - 32} y={773} width={64} height={9} rx={2} fill="var(--gold)" />
        <path d={`M ${CX - 32} 777.5 H ${CX + 32}`} stroke="var(--art-carve)" strokeWidth={0.7} />
        <rect x={CX - LID.rx} y={LID.y} width={LID.rx * 2} height={9} fill="var(--gold)" />
        <ellipse cx={CX} cy={LID.y} rx={LID.rx} ry={LID.ry} fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth={1} />
        <ellipse cx={CX} cy={LID.y} rx={LID.rx - 6} ry={LID.ry - 4} stroke="var(--art-carve)" strokeWidth={0.7} />
        {FEET.map((f) => (
          <g key={f.x} transform={`translate(${f.x} ${LID.y + 3}) scale(${f.mirror ? -1.3 : 1.3} 0.7)`} fill="var(--art-vermilion)">
            <path d={SOLE} />
            {TOES.map((t, i) => (
              <circle key={i} cx={t.x} cy={t.y} r={t.r} />
            ))}
          </g>
        ))}
      </g>

      {/* Bright as the hibiscus: the flower of her light */}
      <g {...part("hibiscus")}>
        <g fill={url("hibiscus")} stroke="var(--art-crimson)" strokeWidth={0.8} strokeOpacity={0.7} strokeLinejoin="round">
          {hibiscusPetals.map((t, i) => (
            <path key={i} d={HIBISCUS_PETAL} transform={t} />
          ))}
        </g>
        <g stroke="var(--art-crimson)" strokeWidth={0.6} strokeOpacity={0.5} strokeLinecap="round">
          {hibiscusPetals.map((t, i) => (
            <path key={i} d={HIBISCUS_VEINS} transform={t} />
          ))}
        </g>
        <g stroke="var(--art-saffron)" strokeWidth={2.4} strokeOpacity={0.55} strokeLinecap="round">
          {hibiscusPetals.map((t, i) => (
            <path key={i} d={HIBISCUS_SHEEN} transform={t} />
          ))}
        </g>
        <path d={COLUMN} stroke="var(--gold-soft)" strokeWidth={2.6} strokeLinecap="round" />
        <g fill="var(--art-core)">
          {POLLEN.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={1.7} />
          ))}
        </g>
        <g fill="var(--art-crimson)">
          {STIGMA.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={2.4} />
          ))}
        </g>
      </g>

      {/* The bindu: she herself, and, the second verse says, "I" */}
      <g {...part("bindu")}>
        <circle cx={B.x} cy={B.y} r={30} fill={url("bindu")} />
        <circle cx={B.x} cy={B.y} r={4.5} fill="var(--art-core)" />
        <circle cx={B.x} cy={B.y} r={9} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.85} />
      </g>

      {/* Śrīvidyā: the innermost triangle of her yantra, round the bindu */}
      <g {...part("yantra")}>
        <path
          d={`M ${TRIANGLE[0].x} ${TRIANGLE[0].y} L ${TRIANGLE[1].x} ${TRIANGLE[1].y} L ${TRIANGLE[2].x} ${TRIANGLE[2].y} Z`}
          stroke="var(--gold-soft)"
          strokeWidth={0.7}
          strokeOpacity={0.75}
          strokeLinejoin="round"
        />
      </g>

      {/* The ruby crown, flashing */}
      <g {...part("crown")}>
        <circle cx={CX} cy={120} r={150} fill={url("crown-glow")} />
        <g transform={`translate(${CX} ${CROWN_Y}) scale(${CROWN_SCALE}) translate(${-CX} 0)`}>
          <RubyCrown cx={CX} rays={(r) => r.deg < 58 || r.deg > 122} />
        </g>
      </g>

      {/* The lord of the stars, the moon, as the crest on her crown */}
      <g {...part("moon")}>
        <g transform={`translate(${MOON.x} ${MOON.y}) rotate(180)`}>
          <path d={litPart(MOON.night, MOON.r)} stroke="var(--art-moon)" strokeWidth={9} strokeOpacity={0.35} strokeLinejoin="round" />
          <path d={litPart(MOON.night, MOON.r)} stroke="var(--art-moon)" strokeWidth={4.5} strokeOpacity={0.5} strokeLinejoin="round" />
          <path d={litPart(MOON.night, MOON.r)} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.3} strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}
