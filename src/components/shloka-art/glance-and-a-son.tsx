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
  ChariotWheel,
  SugarcaneBow,
  artIds,
  bowTips,
  glint,
  litPart,
  partProps,
  polar,
  round,
  tongue,
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
const EMBLEMS = [
  "mace",
  "trident",
  "conch",
  "lotus",
  "tusk",
  "citron",
  "bow",
  "discus",
  "rice",
  "pot",
] as const;
type Emblem = (typeof EMBLEMS)[number];
/** Ten places round him, leaving the top open toward the look he came from. */
const PLACES = EMBLEMS.map((name, k) => ({ name, ...polar(GANESA.x, GANESA.y, RING_R, 90 - 18 - 36 * k) }));
const BOW = { half: 76, grip: 0, bend: 36 };
const [BOW_L, BOW_R] = bowTips(BOW);
const DISCUS_FLAMES = Array.from({ length: 8 }, (_, k) => `rotate(${k * 45}) translate(0 -9)`);
const RICE = Array.from({ length: 7 }, (_, k) => {
  const t = k / 6;
  return { x: round(1 + 7 * t * t), y: round(-12 + 14 * t), side: k % 2 ? 1 : -1 };
});

function EmblemGlyph({ name }: { name: Emblem }) {
  switch (name) {
    case "mace":
      return (
        <>
          <path d="M 0 12 V -4" stroke="var(--gold)" strokeWidth={1.8} strokeLinecap="round" />
          <circle cy={-8} r={5.6} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <path d="M -5.4 -8 H 5.4 M 0 -13.4 V -2.6" stroke="var(--art-carve)" strokeWidth={0.5} />
          <circle cy={-14.6} r={1.4} fill="var(--gold)" />
        </>
      );
    case "trident":
      return (
        <>
          <path d="M 0 12 V -12" stroke="var(--gold)" strokeWidth={1.4} strokeLinecap="round" />
          <path d="M -6 -12 C -6 -5 -3 -3 0 -3 C 3 -3 6 -5 6 -12" stroke="var(--gold)" strokeWidth={1.4} strokeLinecap="round" />
          <path d="M 0 -15 L -1.6 -11 L 1.6 -11 Z M -6 -14.6 L -7.4 -11 L -4.6 -11 Z M 6 -14.6 L 4.6 -11 L 7.4 -11 Z" fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.4} />
        </>
      );
    case "conch":
      return (
        <>
          <path
            d="M 0 -12 C 6 -10 8.4 -3 6.6 3 C 5 8 2 10.6 0 12 C -1.4 10 -3.6 8.4 -6 5 C -8.6 0 -6.4 -9 0 -12 Z"
            fill="var(--art-ivory)"
            stroke="var(--gold)"
            strokeWidth={0.8}
          />
          <path d="M -2.6 -6 C 2 -8 4.4 -3 1.6 -0.6 C -0.4 1 -2 -0.8 -0.4 -2.2" stroke="var(--gold)" strokeWidth={0.6} strokeLinecap="round" />
          <path d="M 4.6 2 C 2 5 0 7 -3.6 6.4" stroke="var(--gold-soft)" strokeWidth={0.6} strokeLinecap="round" />
        </>
      );
    case "lotus":
      return (
        <>
          <path d="M 0 12 V 4" stroke="var(--leaf)" strokeWidth={1.3} strokeLinecap="round" />
          {[-34, 34].map((a) => (
            <path key={a} d="M 0 4 C -4 0 -3.6 -6 0 -9 C 3.6 -6 4 0 0 4 Z" transform={`rotate(${a} 0 4)`} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.5} />
          ))}
          <path d="M 0 4 C -4.4 -1 -4 -8 0 -12 C 4 -8 4.4 -1 0 4 Z" fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.6} />
        </>
      );
    case "tusk":
      return <path d="M -4 11 C -5 1 -1.6 -7 6 -12 C 2 -5 1.4 2 2.6 11 Z" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />;
    case "citron":
      return (
        <>
          <path d="M 1 -8 C 4 -12 8 -12 10 -10 C 7 -8 4 -7 1 -8 Z" fill="var(--leaf)" />
          <path
            d="M 0 -8 C 6 -8 9 -3 8.4 2 C 7.8 8 3.6 11 0 11 C -3.6 11 -7.8 8 -8.4 2 C -9 -3 -6 -8 0 -8 Z"
            fill="var(--art-turmeric)"
            stroke="var(--gold)"
            strokeWidth={0.8}
          />
          <path d="M -4.6 -2 C -4 -4.6 -2 -5.6 0 -5.8" stroke="var(--art-core)" strokeWidth={1} strokeLinecap="round" />
        </>
      );
    case "bow":
      return (
        <g transform="rotate(-90) scale(0.2)">
          <path d={`M ${BOW_L.x} ${BOW_L.y} L ${BOW_R.x} ${BOW_R.y}`} stroke="var(--gold-soft)" strokeWidth={4} />
          <SugarcaneBow shape={BOW} />
        </g>
      );
    case "discus":
      return (
        <>
          <g className="m-flicker">
            {DISCUS_FLAMES.map((t, i) => (
              <path key={i} d={tongue(6, 4, 1)} transform={t} fill="var(--art-saffron)" />
            ))}
          </g>
          <ChariotWheel r={8} />
        </>
      );
    case "rice":
      return (
        <>
          <path d="M -2 12 C -1 2 0 -6 1 -12 C 4 -6 7 -2 8 2" stroke="var(--leaf)" strokeWidth={1} strokeLinecap="round" />
          {RICE.map((g, i) => (
            <ellipse
              key={i}
              cx={g.x + g.side * 1.8}
              cy={g.y}
              rx={1.4}
              ry={2.6}
              transform={`rotate(${g.side * 30} ${g.x + g.side * 1.8} ${g.y})`}
              fill="var(--art-turmeric)"
              stroke="var(--gold)"
              strokeWidth={0.3}
            />
          ))}
        </>
      );
    case "pot":
      return (
        <>
          <path d="M -8 -2 C -11 6 -6 12 0 12 C 6 12 11 6 8 -2 Z" fill="var(--gold)" stroke="var(--art-musk)" strokeWidth={0.5} strokeOpacity={0.6} />
          <path d="M -6 -2 L 6 -2 L 4.4 -6 L -4.4 -6 Z" fill="var(--gold)" stroke="var(--art-musk)" strokeWidth={0.5} strokeOpacity={0.6} />
          <path d="M -8.4 4 Q 0 6.4 8.4 4" stroke="var(--art-vermilion)" strokeWidth={1.2} />
          <circle cx={0} cy={5.4} r={1.6} fill="var(--art-vermilion)" />
          {[-3.4, 0, 3.4].map((x, i) => (
            <circle key={x} cx={x} cy={-8 - (i === 1 ? 1.6 : 0)} r={2} fill={i === 1 ? "var(--art-vermilion)" : "var(--leaf)"} stroke="var(--gold)" strokeWidth={0.4} />
          ))}
        </>
      );
  }
}

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
        <radialGradient id={id("dawn")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.85 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
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
        <circle className="m-breathe" cx={GANESA.x} cy={GANESA.y} r={64} fill={url("dawn")} />
        <circle cx={GANESA.x} cy={GANESA.y} r={RING_R} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.6} strokeDasharray="1 3.4" strokeLinecap="round" />
        {PLACES.filter((p) => p.name !== "bow").map((p, i) => (
          <g key={p.name} transform={`translate(${p.x} ${p.y}) scale(${EMBLEM_S})`} className={i % 4 === 1 ? TWINKLE[i % 3] : undefined}>
            <EmblemGlyph name={p.name} />
          </g>
        ))}
        <circle cx={GANESA.x} cy={GANESA.y} r={14} stroke="var(--gold)" strokeWidth={1} />
        <circle cx={GANESA.x} cy={GANESA.y} r={8.6} fill="var(--art-vermilion)" />
        <circle cx={GANESA.x - 2} cy={GANESA.y - 2} r={2.4} fill="var(--art-saffron)" />
      </g>

      {/* Among them, his mother's own weapon: the sugarcane bow */}
      <g {...part("bow")}>
        {PLACES.filter((p) => p.name === "bow").map((p) => (
          <g key={p.name} transform={`translate(${p.x} ${p.y}) scale(${EMBLEM_S})`}>
            <EmblemGlyph name={p.name} />
          </g>
        ))}
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
