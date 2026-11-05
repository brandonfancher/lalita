/**
 * Shloka 53 — "From all the diagrams and all the scriptures to the beloved
 * of the gracious one".
 *
 * A sanctum floor, and the verse's descent from everything to kindness. A
 * yantra is drawn in rice flour on the floor, and her light stands at its
 * bindu, the self of the diagram. A palm-leaf tantra lies open on its stand,
 * its cord the thread the word is spun from. Nandī lies before her, facing
 * in, as Śiva's bull faces every shrine. A bilva bough reaches into the
 * crown, the tree the Śrī Sūkta says was born of Lakṣmī's tapas, its fruit
 * called śrīphala, its leaves Śiva's. Rudra's bow lies unstrung under a
 * garland: he is Mṛḍa, the gracious one, when he puts it down. Over all of
 * it the ladder of sound rises from a bindu and thins into nothing, mind
 * past mind. Which name each part answers to is written up for readers in
 * the registry, next to this artwork's entry.
 */

import { artIds, gateSquare, hash, partProps, polar, radiance, round, taper, through, yantraPetals } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── Her light, at the yantra's bindu ─────────────────────────────────── */

const HER = { x: 320, y: 488 };
const RADIANCE = radiance({ cx: HER.x, cy: HER.y, from: 20, long: 150, short: 96 });

/* ── The yantra on the floor ──────────────────────────────────────────── */

/** Drawn face-on in yantra units and laid flat on the floor by squashing it. */
const YANTRA = { x: 320, y: 560, squash: 0.34 };
const BHUPURA = [gateSquare(100, 22, 14), gateSquare(93, 18, 14)];
const YANTRA_CIRCLES = [84, 79, 54];
const YANTRA_PETALS = yantraPetals(8, 54, 79, 22.5);
const HEXAGRAM = [90, 270]
  .map((turn) => {
    const pts = [0, 120, 240].map((d) => polar(0, 0, 48, turn + d));
    return `M ${pts.map((p) => `${p.x} ${p.y}`).join(" L ")} Z`;
  })
  .join(" ");

/* ── The ladder of sound, thinning into nothing ───────────────────────── */

/** ॐ just above the card, and over it the subtle stages of its sound, rising and fading. */
const NADA = { x: 430, om: 180, top: 30, from: 128 };
/** The resonance: one fine straight thread, narrowing as it climbs, its stages marked as it fades. */
const NADA_LINE = [
  { x: NADA.x, y: NADA.from },
  { x: NADA.x, y: NADA.top },
];
const NADA_STAGES = [
  { y: 114, r: 3.4, o: 0.95 },
  { y: 96, r: 2.8, o: 0.8 },
  { y: 80, r: 2.3, o: 0.62 },
  { y: 66, r: 1.9, o: 0.46 },
  { y: 54, r: 1.5, o: 0.3 },
  { y: 44, r: 1.1, o: 0.16 },
];

/* ── The bilva bough (śrīphala) ───────────────────────────────────────── */

const BOUGH = through(
  [
    { x: 566, y: 0 },
    { x: 544, y: 32 },
    { x: 520, y: 68 },
    { x: 504, y: 108 },
    { x: 498, y: 150 },
  ],
  10,
);
/** Trifoliate leaves: a long middle leaflet and two shorter ones, at points along the bough. */
const BILVA_LEAVES = [
  { x: 552, y: 20, turn: -110 },
  { x: 540, y: 38, turn: 60 },
  { x: 526, y: 58, turn: -100 },
  { x: 516, y: 76, turn: 70 },
  { x: 506, y: 100, turn: -80 },
  { x: 502, y: 124, turn: 80 },
  { x: 498, y: 150, turn: -10 },
];
const LEAFLET = (l: number, w: number) => `M 0 0 C ${round(w)} ${round(-l * 0.3)} ${round(w * 0.8)} ${round(-l * 0.8)} 0 ${-l} C ${round(-w * 0.8)} ${round(-l * 0.8)} ${-w} ${round(-l * 0.3)} 0 0 Z`;
const FRUITS = [
  { x: 486, y: 92, r: 11.5, stalk: { x: 510, y: 84 } },
  { x: 514, y: 36, r: 9.5, stalk: { x: 538, y: 30 } },
];

/* ── The tantra on its stand ──────────────────────────────────────────── */

const BOOK = { x: 474, y: 534, k: 1.16 };

/* ── Rudra's bow, unstrung ────────────────────────────────────────────── */

const BOW = { x: 352, y: 628, turn: -3 };
/** Lying on the floor, its belly up: a long curved stave with horn tips and a bound grip. */
const BOW_STAVE = through(
  [
    { x: -76, y: 2 },
    { x: -40, y: -9 },
    { x: 0, y: -13 },
    { x: 40, y: -9 },
    { x: 76, y: 2 },
  ],
  8,
);
/** The string, slipped from its upper tip, lying slack and coiled. */
const BOW_STRING = "M -76 2 C -54 12 -16 14 18 10 C 40 8 54 14 50 20 C 46 24 38 22 40 16";
/** The garland laid over it, hanging down either side of the grip. */
const GARLAND = Array.from({ length: 19 }, (_, k) => {
  const t = k / 18;
  return { x: round(-26 + 52 * t), y: round(-13 + 18 * Math.sin(t * Math.PI)) };
});

/* ── Nandī, lying before her ──────────────────────────────────────────── */

const NANDI = { x: 182, y: 626, k: 1.16 };
/** Couchant, in profile facing her: the rump at the left, a steep hump over the shoulders, the dewlap under the throat. */
const NANDI_BODY =
  "M -60 0 C -66 -12 -64 -26 -54 -32 C -40 -38 -16 -36 2 -40 C 10 -44 14 -56 22 -59 C 30 -61 34 -54 36 -48 C 40 -46 46 -48 52 -47 C 58 -44 62 -34 65 -25 C 66 -21 63 -18 59 -18 C 55 -19 51 -21 48 -22 C 46 -16 44 -10 38 -4 C 35 -1 33 0 30 0 Z";
const NANDI_LEGS = "M 30 0 C 38 -3 48 -3 56 0 M -40 -4 C -36 -16 -24 -22 -12 -18";
const NANDI_HOOVES = "M 54 -2.4 L 59 0 L 54 1.4 Z";
const NANDI_HORNS = "M 50 -46 C 48 -52 50 -58 55 -60 M 55 -46 C 54 -52 57 -57 61 -58";
const NANDI_EAR = "M 48 -42 C 42 -45 36 -44 33 -41 C 38 -38 44 -38 49 -40 Z";
const NANDI_CLOTH = "M -40 -36 C -24 -38 -8 -37 4 -40 C 7 -32 7 -24 3 -16 C -12 -14 -28 -14 -40 -18 C -42 -24 -42 -30 -40 -36 Z";
const NANDI_TAIL = "M -60 -14 C -68 -8 -66 0 -56 2 C -46 3 -40 0 -36 -2";

/** The prayer whispered into Nandī's ear: three small arcs going in. */
const WHISPER = [6, 11, 16].map((r) => {
  const c = { x: round(NANDI.x + 34 * NANDI.k), y: round(NANDI.y - 41 * NANDI.k) };
  const a = polar(c.x, c.y, r, 100);
  const b = polar(c.x, c.y, r, 160);
  return `M ${round(a.x)} ${round(a.y)} A ${r} ${r} 0 0 0 ${round(b.x)} ${round(b.y)}`;
});

/* ── The floor ────────────────────────────────────────────────────────── */

const FLOOR_FLAGS = Array.from({ length: 6 }, (_, k) => {
  const y = 520 + k * k * 4 + k * 8;
  const half = 170 + k * 14;
  return `M ${320 - half} ${y} L ${320 + half} ${y}`;
});
const STARS = Array.from({ length: 24 }, (_, k) => ({
  x: round(380 + 120 * hash(k, 31)),
  y: round(28 + 140 * hash(k, 32)),
  r: round(0.8 + 0.8 * hash(k, 33)),
  g: k % 3,
})).filter((s) => s.x > 392 && Math.abs(s.x - NADA.x) > 16 && s.x < 486);

export function GraciousOne({ idPrefix = "sa53", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);
  const yantra = `translate(${YANTRA.x} ${YANTRA.y}) scale(1 ${YANTRA.squash})`;

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={220} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("rays")} cx={HER.x} cy={HER.y} r={150} gradientUnits="userSpaceOnUse">
          <stop offset="0.13" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "var(--gold)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("floor")} cx={320} cy={560} r={220} gradientUnits="userSpaceOnUse" gradientTransform="translate(320 560) scale(1 0.3) translate(-320 -560)">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.3 }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("nada-fade")} x1={0} y1={NADA.top} x2={0} y2={NADA.from} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={0} />
          <stop offset="1" stopColor="#fff" stopOpacity={1} />
        </linearGradient>
        <mask id={id("nada-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("nada-fade")} />
        </mask>
        <radialGradient id={id("crown-glow")} cx={NADA.x} cy={110} r={100} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("fruit")} cx={-3} cy={-4} r={12} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="1" style={{ stopColor: "var(--leaf)" }} />
        </radialGradient>
        <linearGradient id={id("nandi")} x1={0} y1={-66} x2={0} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-ivory)" }} />
        </linearGradient>
      </defs>

      {/* Her light, standing at the bindu: the shining one */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={220} fill={url("glow")} />
        <ellipse cx={320} cy={560} rx={220} ry={66} fill={url("floor")} />
        <g stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.4}>
          {FLOOR_FLAGS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <path className="m-shimmer" d={RADIANCE} stroke={url("rays")} strokeWidth={0.7} />
        <path d={`M ${HER.x} ${HER.y + 8} L ${YANTRA.x} ${YANTRA.y}`} stroke="var(--art-core)" strokeWidth={1.4} strokeOpacity={0.6} strokeLinecap="round" />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={48} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={15} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={11} fill="var(--art-saffron)" fillOpacity={0.5} />
        <circle cx={HER.x} cy={HER.y} r={6.5} fill="var(--art-core)" />
      </g>

      {/* The yantra, drawn in rice flour on the floor */}
      <g {...part("yantra")}>
        <g transform={yantra}>
          <g stroke="var(--art-musk)" strokeOpacity={0.35} strokeWidth={3} vectorEffect="non-scaling-stroke" strokeLinejoin="round">
            {BHUPURA.map((d) => (
              <path key={d} d={d} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          <g stroke="var(--art-ivory)" strokeWidth={1.4} strokeLinejoin="round">
            {BHUPURA.map((d) => (
              <path key={d} d={d} vectorEffect="non-scaling-stroke" />
            ))}
            {YANTRA_CIRCLES.map((r) => (
              <circle key={r} r={r} vectorEffect="non-scaling-stroke" />
            ))}
            <path d={YANTRA_PETALS} vectorEffect="non-scaling-stroke" />
            <path d={HEXAGRAM} stroke="var(--sindura)" vectorEffect="non-scaling-stroke" />
          </g>
          <g fill="var(--art-ivory)">
            {[0, 90, 180, 270].map((d) => {
              const p = polar(0, 0, 108, d);
              return <circle key={d} cx={p.x} cy={p.y} r={3} />;
            })}
          </g>
        </g>
        <ellipse cx={YANTRA.x} cy={YANTRA.y} rx={4} ry={1.6} fill="var(--art-core)" />
      </g>

      {/* The ladder of sound, from the bindu up into nothing */}
      <g {...part("nada")}>
        <circle cx={NADA.x} cy={110} r={100} fill={url("crown-glow")} />
        <text
          x={NADA.x}
          y={NADA.om}
          textAnchor="middle"
          fontSize={46}
          fill="var(--gold)"
          stroke="var(--art-carve)"
          strokeWidth={0.6}
          paintOrder="stroke"
          style={{ fontFamily: "var(--font-tiro), serif" }}
        >
          ॐ
        </text>
        <g mask={url("nada-mask")}>
          <path className="m-shimmer" d={taper(NADA_LINE, (t) => 2 - 1.7 * t)} fill="var(--gold)" />
          {NADA_STAGES.map((s) => (
            <g key={s.y}>
              <circle cx={NADA.x} cy={s.y} r={s.r * 2.4} fill={url("bindu-glow")} fillOpacity={s.o} />
              <circle cx={NADA.x} cy={s.y} r={s.r} fill="var(--art-core)" fillOpacity={s.o} stroke="var(--gold)" strokeWidth={0.4} strokeOpacity={s.o} />
            </g>
          ))}
        </g>
        <g fill="var(--gold-soft)">
          {STARS.map((s, i) => (
            <circle key={i} className={TWINKLE[s.g]} cx={s.x} cy={s.y} r={s.r} />
          ))}
        </g>
      </g>

      {/* The bilva bough: Śrī's fruit, Śiva's leaves */}
      <g {...part("bilva")}>
        <path d={taper(BOUGH, (t) => 6 - 3.6 * t)} fill="var(--art-musk)" fillOpacity={0.7} stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
        {BILVA_LEAVES.map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.turn})`}>
            <path d="M 0 0 L 0 -8" stroke="var(--leaf)" strokeWidth={1.2} strokeLinecap="round" />
            <g fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round">
              <path d={LEAFLET(18, 5.6)} transform="translate(0 -8)" />
              <path d={LEAFLET(13, 4.6)} transform="translate(0 -8) rotate(-62)" />
              <path d={LEAFLET(13, 4.6)} transform="translate(0 -8) rotate(62)" />
            </g>
            <path d="M 0 -9 L 0 -24 M 0 -8 L -10 -14 M 0 -8 L 10 -14" stroke="var(--gold-soft)" strokeWidth={0.4} transform="translate(0 0)" />
          </g>
        ))}
        {FRUITS.map((f, i) => (
          <g key={i}>
            <path d={`M ${f.stalk.x} ${f.stalk.y} Q ${f.x - 4} ${round((f.stalk.y + f.y) / 2)} ${f.x} ${f.y - f.r}`} stroke="var(--art-musk)" strokeWidth={1.4} />
            <g transform={`translate(${f.x} ${f.y})`}>
              <circle r={f.r} fill={url("fruit")} stroke="var(--gold)" strokeWidth={0.8} />
              <path d={`M ${round(-f.r * 0.5)} ${round(-f.r * 0.55)} C ${round(-f.r * 0.2)} ${round(-f.r * 0.8)} ${round(f.r * 0.2)} ${round(-f.r * 0.8)} ${round(f.r * 0.4)} ${round(-f.r * 0.6)}`} stroke="var(--art-core)" strokeWidth={1} strokeOpacity={0.8} strokeLinecap="round" />
            </g>
          </g>
        ))}
      </g>

      {/* The tantra, open on its stand */}
      <g {...part("tantra")}>
        <g transform={`translate(${BOOK.x} ${BOOK.y}) scale(${BOOK.k})`} strokeLinejoin="round">
          <ellipse cx={0} cy={36} rx={38} ry={4} fill="var(--art-musk)" fillOpacity={0.16} />
          <path d="M -26 34 L 22 -2 M 26 34 L -22 -2" stroke="var(--art-musk)" strokeWidth={4.4} strokeLinecap="round" />
          <path d="M -26 34 L 22 -2 M 26 34 L -22 -2" stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} strokeLinecap="round" />
          <path d="M -40 -6 L 40 -6 L 38 0 L -38 0 Z" fill="var(--art-crimson)" stroke="var(--gold)" strokeWidth={0.8} />
          <path d="M -36 -9 L 36 -9 L 36 -6 L -36 -6 Z" fill="var(--art-musk)" stroke="var(--gold)" strokeWidth={0.5} />
          <path d="M -35 -21 L 35 -21 L 35 -9 L -35 -9 Z" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.6} />
          <path d="M -35 -12 L 35 -12 M -35 -15 L 35 -15 M -35 -18 L 35 -18" stroke="var(--art-turmeric)" strokeWidth={0.6} strokeOpacity={0.8} />
          <path d="M -36 -24 L 36 -24 L 36 -21 L -36 -21 Z" fill="var(--art-musk)" stroke="var(--gold)" strokeWidth={0.5} />
          <path d="M -21 -25 L -21 -8 M -17 -25 L -17 -8 M 17 -25 L 17 -8 M 21 -25 L 21 -8" stroke="var(--art-vermilion)" strokeWidth={1.2} />
          <g transform="translate(-2 -27) rotate(-4)">
            <path d="M -38 0 L 38 0 L 38 -6 L -38 -6 Z" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.6} />
            <path d="M -33 -3 L -24 -3 M -12 -3 L 10 -3 M 24 -3 L 33 -3" stroke="var(--art-carve)" strokeWidth={0.9} strokeDasharray="2.4 1.2" />
            <circle cx={-19} cy={-3} r={1.2} fill="var(--art-musk)" />
            <circle cx={19} cy={-3} r={1.2} fill="var(--art-musk)" />
          </g>
          <path d="M 21 -16 C 30 -10 34 -2 30 6 C 28 12 34 16 42 12" stroke="var(--art-vermilion)" strokeWidth={1.1} strokeLinecap="round" />
          <circle cx={42} cy={12} r={2} fill="var(--gold)" />
        </g>
      </g>

      {/* Rudra's bow, unstrung, under a garland */}
      <g {...part("bow")}>
        <g transform={`translate(${BOW.x} ${BOW.y}) rotate(${BOW.turn})`}>
          <ellipse cx={0} cy={12} rx={78} ry={5} fill="var(--art-musk)" fillOpacity={0.14} />
          <path d={BOW_STRING} stroke="var(--art-ivory)" strokeWidth={0.9} strokeLinecap="round" />
          <path d={taper(BOW_STAVE, (t) => 3 + 4.6 * Math.sin(Math.PI * t))} fill="var(--art-musk)" stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round" />
          <path d={taper(BOW_STAVE, (t) => 1 + 1.6 * Math.sin(Math.PI * t))} fill="var(--gold-soft)" fillOpacity={0.6} transform="translate(0 -1.4)" />
          <path d="M -5 -15 L -5 -8 M -1.6 -15.6 L -1.6 -8.4 M 1.6 -15.6 L 1.6 -8.4 M 5 -15 L 5 -8" stroke="var(--art-vermilion)" strokeWidth={1.4} />
          <path d="M -76 2 C -82 0 -84 -6 -80 -10 M 76 2 C 82 0 84 -6 80 -10" stroke="var(--gold)" strokeWidth={2.4} strokeLinecap="round" />
          <path d={GARLAND.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ")} stroke="var(--leaf)" strokeWidth={0.8} />
          <g fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.4}>
            {GARLAND.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={i % 4 === 0 ? 3.2 : 2.4} />
            ))}
          </g>
          <circle cx={0} cy={5} r={2.8} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.4} />
        </g>
      </g>

      {/* Nandī, lying before her and looking in */}
      <g {...part("nandi")}>
        <g transform={`translate(${NANDI.x} ${NANDI.y}) scale(${NANDI.k})`} strokeLinejoin="round">
          <ellipse cx={0} cy={1} rx={66} ry={5} fill="var(--art-musk)" fillOpacity={0.18} />
          <path d={NANDI_BODY} fill={url("nandi")} stroke="var(--gold)" strokeWidth={1.1} />
          <path d={NANDI_LEGS} stroke="var(--gold)" strokeWidth={1} strokeLinecap="round" />
          <path d={NANDI_HOOVES} fill="var(--art-musk)" />
          <path d={NANDI_TAIL} stroke="var(--gold)" strokeWidth={4.2} strokeLinecap="round" />
          <path d={NANDI_TAIL} stroke="var(--art-ivory)" strokeWidth={2.6} strokeLinecap="round" />
          <path d={NANDI_CLOTH} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.9} />
          <path d="M -36 -20 C -26 -16 -12 -16 4 -18" stroke="var(--gold)" strokeWidth={1.6} strokeDasharray="0.1 3.4" strokeLinecap="round" />
          <path d="M 40 -46 C 44 -36 45 -28 44 -20" stroke="var(--art-crimson)" strokeWidth={1.6} />
          <path d="M 41 -20 L 47 -20 L 46.4 -13 L 41.6 -13 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.4} />
          <g fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.3}>
            {[-34, -26, -18, -10, -2].map((x) => (
              <circle key={x} cx={x} cy={-15} r={1.4} />
            ))}
          </g>
          <path d={NANDI_HORNS} stroke="var(--gold)" strokeWidth={4} strokeLinecap="round" />
          <path d={NANDI_HORNS} stroke="var(--art-turmeric)" strokeWidth={2.4} strokeLinecap="round" />
          <path d={NANDI_EAR} fill={url("nandi")} stroke="var(--gold)" strokeWidth={0.8} />
          <circle cx={57} cy={-37} r={1.5} fill="var(--art-carve)" />
          <path d="M 62 -22 C 63 -20 63 -19 62 -18" stroke="var(--art-musk)" strokeWidth={0.8} />
          <path d="M 14 -54 C 18 -46 20 -40 26 -36 M 48 -24 C 46 -18 43 -12 39 -7" stroke="var(--art-musk)" strokeWidth={0.8} strokeOpacity={0.35} />
        </g>
      </g>

      {/* A prayer whispered into Nandī's ear */}
      <g {...part("ear")}>
        <g stroke="var(--gold-soft)" strokeWidth={1} strokeLinecap="round">
          {WHISPER.map((d, i) => (
            <path key={i} className={TWINKLE[2 - i]} d={d} />
          ))}
        </g>
        <g transform={`translate(${round(NANDI.x + 47 * NANDI.k)} ${round(NANDI.y - 44 * NANDI.k)})`}>
          {[0, 72, 144, 216, 288].map((d) => (
            <ellipse key={d} cx={0} cy={-2.4} rx={1.4} ry={2.6} transform={`rotate(${d})`} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.3} />
          ))}
          <circle r={1} fill="var(--art-saffron)" />
        </g>
      </g>
    </svg>
  );
}
