/**
 * Shloka 30 — "A glance between them, and a son".
 *
 * The verse breaks in two, and so does the plate. Across the crown the last of
 * the names of watching: Vārāhī, a crimson light behind her crossed plough and
 * pestle, draws the breath out of Viśukra, a bank of Bhaṇḍa's ash, in a pale
 * stream that runs back to her. Below the card, with no transition, the war
 * stops for a look. Her light at the left and Kāmeśvara's crescent at the
 * right look at each other, and where the look meets, Mahāgaṇapati arises: a
 * light ruddy as the dawn, ringed by the ten
 * things his ten hands hold — mace, trident, conch, lotus, tusk, citron, the
 * sugarcane bow, the discus, the ear of rice, and the jewelled pot. Nobody is
 * drawn. Which name each part answers to is written up for readers in the
 * registry, next to this artwork's entry.
 */

import {
  AshDefs,
  DawnDefs,
  GanesaEmblem,
  Mahaganapati,
  artIds,
  ganesaPlaces,
  glint,
  litPart,
  partProps,
} from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── The look between them ─────────────────────────────────────────────── */

const HER = { x: 166, y: 420 };
const HIS = { x: 474, y: 420 };
const MEET = { x: 320, y: 420 };
/** Each look as three hairlines from one to the other, a little spread. */
const LOOKS = [-1, 0, 1].flatMap((k) => [
  `M ${HER.x + 12} ${HER.y + k * 1.6} L ${HIS.x - 20} ${HIS.y + 4 + k * 5}`,
  `M ${HIS.x - 20} ${HIS.y + 4 + k * 1.6} L ${HER.x + 12} ${HER.y + k * 5}`,
]);
const CRESCENT = litPart(4, 30);

/* ── Mahāgaṇapati ──────────────────────────────────────────────────────── */

const GANESA = { x: 320, y: 540 };
const RING_R = 82;
const EMBLEM_S = 1.4;
const BOW_PLACE = ganesaPlaces(GANESA.x, GANESA.y, RING_R).find((p) => p.name === "bow")!;

/* ── Vārāhī and Viśukra ────────────────────────────────────────────────── */

const VARAHI = { x: 296, y: 84 };
const VISUKRA = { x: 548, y: 120 };
const VISUKRA_CLOUDS = [
  { x: VISUKRA.x, y: VISUKRA.y, r: 50 },
  { x: VISUKRA.x + 38, y: VISUKRA.y - 20, r: 38 },
  { x: VISUKRA.x + 26, y: VISUKRA.y + 30, r: 40 },
  { x: VISUKRA.x - 28, y: VISUKRA.y + 22, r: 30 },
  { x: VISUKRA.x + 8, y: VISUKRA.y - 6, r: 34 },
];
/** His breath, drawn out of him and carried off to her. */
const BREATH = [0, 1, 2].map((k) => {
  const from = { x: VISUKRA.x - 30, y: VISUKRA.y - 8 + k * 8 };
  const to = { x: VARAHI.x + 16, y: VARAHI.y + 2 + (k - 1) * 3 };
  return `M ${from.x} ${from.y} C ${from.x - 60} ${from.y - 40 - k * 10} ${to.x + 90} ${to.y - 46 + k * 12} ${to.x} ${to.y}`;
});
/** The plough (hala): a curved beam ending in a pointed share. */
const PLOUGH = "M -2 -30 C 2 -16 4 0 2 18 C 1 24 -2 28 -8 30";
const SHARE = "M -6 27 L -15 34 L -5 33 Z";

export function GlanceAndASon({ idPrefix = "sa30", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("her-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("moon-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <DawnDefs id={id} />
        <radialGradient id={id("crimson-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-crimson)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("crescent-tint")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <AshDefs id={id} />
      </defs>

      {/* Her light and Kāmeśvara's crescent, and the look that passes between them */}
      <g {...part("glance")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={110} fill={url("her-glow")} />
        <circle className="m-shimmer m-late" cx={HIS.x} cy={HIS.y} r={80} fill={url("moon-glow")} />
        <circle cx={HIS.x} cy={HIS.y + 8} r={44} fill={url("crescent-tint")} />
        <g stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.75} strokeLinecap="round">
          {LOOKS.map((d, i) => (
            <path key={i} className={i % 2 ? "m-shimmer m-late" : "m-shimmer"} d={d} />
          ))}
        </g>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={32} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={5.4} fill="var(--art-core)" />
        <circle cx={HER.x} cy={HER.y} r={8.8} stroke="var(--gold)" strokeWidth={0.9} />
        <g transform={`translate(${HIS.x} ${HIS.y + 4}) rotate(180)`}>
          <path d={CRESCENT} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.3} />
        </g>
      </g>

      {/* Mahāgaṇapati, risen where the look met, ringed by the ten things he holds */}
      <g {...part("ganesa")}>
        <path className="m-lick" d={glint(8)} transform={`translate(${MEET.x} ${MEET.y})`} fill="var(--art-core)" />
        <Mahaganapati x={GANESA.x} y={GANESA.y} url={url} skip="bow" />
      </g>

      {/* Among them, his mother's own weapon: the sugarcane bow */}
      <g {...part("bow")}>
        <g transform={`translate(${BOW_PLACE.x} ${BOW_PLACE.y}) scale(${EMBLEM_S})`}>
          <GanesaEmblem name="bow" />
        </g>
      </g>

      {/* Vārāhī drawing the breath out of Viśukra */}
      <g {...part("varahi")}>
        {VISUKRA_CLOUDS.map((a, i) => (
          <g key={i}>
            <circle cx={a.x} cy={a.y} r={a.r} fill={url("ash")} />
            <circle cx={a.x} cy={a.y} r={a.r} fill={url("ash-pale")} />
          </g>
        ))}
        <g stroke="var(--art-moon)" strokeLinecap="round" strokeDasharray="5 4">
          {BREATH.map((d, i) => (
            <path key={i} className={TWINKLE[i]} d={d} strokeWidth={i === 1 ? 1.4 : 0.9} strokeOpacity={0.85} />
          ))}
        </g>
        <circle className="m-shimmer" cx={VARAHI.x} cy={VARAHI.y} r={46} fill={url("crimson-glow")} />
        <g transform={`translate(${VARAHI.x} ${VARAHI.y}) rotate(-28)`}>
          <path d={PLOUGH} stroke="var(--gold)" strokeWidth={3} strokeLinecap="round" />
          <path d={SHARE} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path d="M -2 -30 L -9 -33" stroke="var(--gold)" strokeWidth={2} strokeLinecap="round" />
        </g>
        <g transform={`translate(${VARAHI.x} ${VARAHI.y}) rotate(30)`}>
          <rect x={-2.2} y={-30} width={4.4} height={60} rx={2.2} fill="var(--gold)" />
          <rect x={-3.6} y={-32} width={7.2} height={9} rx={3} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <rect x={-3.6} y={23} width={7.2} height={9} rx={3} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d="M -3 -20 H 3 M -3 20 H 3" stroke="var(--art-carve)" strokeWidth={0.6} />
        </g>
        <circle cx={VARAHI.x} cy={VARAHI.y} r={10.4} stroke="var(--gold)" strokeWidth={0.9} />
        <circle cx={VARAHI.x} cy={VARAHI.y} r={6.6} fill="var(--art-crimson)" />
        <circle cx={VARAHI.x - 1.8} cy={VARAHI.y - 1.8} r={2} fill="var(--art-vermilion)" />
      </g>
    </svg>
  );
}
