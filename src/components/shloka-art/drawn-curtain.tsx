/**
 * Shloka 17 — "What only her husband knows, and two crowns of ruby".
 *
 * The first name describes by declining to describe: what it names is known
 * to Kāmeśa alone. So the upper part of the artwork is a curtain, drawn
 * closed and hung from his crescent, with only her light showing through it.
 * Below its hem the reticence stops at once, and the two ruby crowns of the
 * second name sit in full colour. Which name each part answers to is written
 * up for readers in the registry, next to this artwork's entry.
 */

import { artIds, Flash, litPart, partProps, polyline, round, RubyCrown, swingFrom } from "./primitives";
import type { ArtProps } from "./types";

const CX = 320;
const ROD_Y = 112;
const ROD = { x0: 142, x1: 498 };
/** The hem dips a little toward the middle, where the two panels meet. */
const hemY = (x: number) => round(452 + 10 * Math.cos(((x - CX) / 180) * (Math.PI / 2)));
const PANELS = [
  { x0: 152, x1: CX + 4 },
  { x0: CX - 4, x1: 488 },
];

const hemPath = (x0: number, x1: number, dy = 0) =>
  polyline(Array.from({ length: 41 }, (_, k) => ({ x: round(x0 + ((x1 - x0) * k) / 40), y: round(hemY(x0 + ((x1 - x0) * k) / 40) + dy) })));

/** A panel hanging from the rod: gathered in scallops at the top, straight to the hem. */
function panel(x0: number, x1: number) {
  const n = 7;
  const w = (x1 - x0) / n;
  const top = Array.from({ length: n }, (_, k) => `Q ${round(x0 + (k + 0.5) * w)} ${ROD_Y + 14} ${round(x0 + (k + 1) * w)} ${ROD_Y + 4}`).join(" ");
  return `M ${x0} ${ROD_Y + 4} ${top} L ${x1} ${hemY(x1)} ` + hemPath(x1, x0).replace(/^M [^L]+/, "") + " Z";
}

/** Folds: a line from each ring down to the hem, a soft shade beside it. */
const FOLDS = PANELS.flatMap(({ x0, x1 }) =>
  Array.from({ length: 8 }, (_, k) => {
    const x = round(x0 + ((x1 - x0) * k) / 7);
    const xb = round(x + (x - CX) * 0.02);
    return { x, xb, d: `M ${x} ${ROD_Y + 6} Q ${round(x + 3)} ${round((ROD_Y + hemY(x)) / 2)} ${xb} ${round(hemY(xb) - 2)}` };
  }),
);
const RINGS = Array.from({ length: 15 }, (_, k) => round(ROD.x0 + 16 + k * ((ROD.x1 - ROD.x0 - 32) / 14))).filter((x) => Math.abs(x - CX) > 12);

/** His crescent, the curtain's centre ornament: the fourth night, turned horns up. */
const CRESCENT = { x: CX, y: ROD_Y - 26, r: 22 };

/** A tie-cord down the seam from the crescent, ending in a tassel at the hem. */
const TIE_END = { x: CX, y: hemY(CX) + 18 };
const TASSEL = [-4, -2, 0, 2, 4].map((dx) => `M 0 0 Q ${round(dx * 0.4)} 8 ${dx} 16`).join(" ");

/* ── The border of the hem: the similes Śaṅkara disposes of ────────────── */

const BAND = { top: -26, bottom: -6 };
const MOTIFS = Array.from({ length: 16 }, (_, k) => {
  const x = round(166 + k * 20.6);
  return { x, y: round(hemY(x) - 16), trunk: k % 2 === 0, flip: k % 4 === 0 };
});
/** A curled elephant's trunk. */
const TRUNK = "M -3 -6 C 3 -6 4 0 1.5 3 C -0.5 5.4 -4 4 -3.4 1.2 C -3 -0.6 -0.6 -0.8 -0.2 0.6";
/** A plantain stem with its long leaf. */
const PLANTAIN = "M 0 6 L 0 -6 M 0 -6 C 4 -5 6 -1 5 3 C 3 1 1 -2 0 -6 Z";

/* ── The crowns ────────────────────────────────────────────────────────── */

const CROWN_SCALE = 0.8;
/** Where each crown's diadem rests, and its centre line. */
const CROWNS = [CX - 82, CX + 82].map((x) => ({ x, base: 604 }));
const crownTransform = (x: number, base: number) => `translate(${round(x - CX * CROWN_SCALE)} ${round(base - 190 * CROWN_SCALE)}) scale(${CROWN_SCALE})`;

export function DrawnCurtain({ idPrefix = "sa17", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={CX} cy={340} r={300} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.5 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient
          id={id("through")}
          cx={CX}
          cy={350}
          r={150}
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(0 350) scale(1 1.5) translate(0 -350)`}
        >
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.75 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.28 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("crown-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("fold")} x1={0} y1={ROD_Y} x2={0} y2={470} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.18 }} />
        </linearGradient>
        <clipPath id={id("panels")}>
          {PANELS.map((p, i) => (
            <path key={i} d={panel(p.x0, p.x1)} />
          ))}
        </clipPath>
      </defs>

      {/* Her light, which is all that shows through */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={CX} cy={340} r={300} fill={url("glow")} />
        <ellipse className="m-shimmer" cx={CX} cy={350} rx={150} ry={225} fill={url("through")} />
      </g>

      {/* The curtain, drawn closed, and hung from his crescent */}
      <g {...part("curtain")}>
        {PANELS.map((p, i) => (
          <path key={i} d={panel(p.x0, p.x1)} fill="var(--art-ivory)" fillOpacity={0.5} stroke="var(--gold)" strokeWidth={0.9} />
        ))}
        <g clipPath={url("panels")}>
          {FOLDS.map((f, i) => (
            <g key={i}>
              <path d={f.d} stroke={url("fold")} strokeWidth={7} strokeOpacity={0.6} />
              <path d={f.d} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.55} />
            </g>
          ))}
          <ellipse className="m-shimmer" cx={CX} cy={350} rx={110} ry={160} fill={url("through")} fillOpacity={0.6} />
        </g>
        <path d={hemPath(PANELS[0].x0, PANELS[1].x1)} stroke="var(--gold)" strokeWidth={1.6} />
        <path
          d={Array.from({ length: 56 }, (_, k) => {
            const x = round(PANELS[0].x0 + 3 + k * 6);
            return `M ${x} ${hemY(x)} L ${x} ${round(hemY(x) + 7 + (k % 2) * 2)}`;
          }).join(" ")}
          stroke="var(--gold)"
          strokeWidth={0.9}
          strokeLinecap="round"
        />
        <path d={`M ${ROD.x0} ${ROD_Y} L ${ROD.x1} ${ROD_Y}`} stroke="var(--gold)" strokeWidth={5} strokeLinecap="round" />
        <path d={`M ${ROD.x0 + 4} ${ROD_Y - 1.4} L ${ROD.x1 - 4} ${ROD_Y - 1.4}`} stroke="var(--art-core)" strokeWidth={1} strokeOpacity={0.7} />
        {RINGS.map((x) => (
          <ellipse key={x} cx={x} cy={ROD_Y + 1} rx={3.4} ry={5} stroke="var(--gold)" strokeWidth={1.3} />
        ))}
        {[ROD.x0, ROD.x1].map((x, i) => (
          <g key={x} transform={`translate(${x} ${ROD_Y}) scale(${i ? -1 : 1} 1)`} fill="var(--gold)">
            <circle cx={-4} r={5} />
            <path d="M -8 0 C -14 -4 -20 -2 -24 0 C -20 2 -14 4 -8 0 Z" />
          </g>
        ))}
        <g className="m-sway" style={swingFrom({ x: CX, y: ROD_Y })}>
          <path d={`M ${CX} ${ROD_Y + 4} L ${TIE_END.x} ${TIE_END.y}`} stroke="var(--gold)" strokeWidth={1.6} />
          <g transform={`translate(${TIE_END.x} ${TIE_END.y})`}>
            <circle r={3.8} fill="var(--gold)" />
            <path d={TASSEL} stroke="var(--gold)" strokeWidth={1.3} strokeLinecap="round" />
          </g>
        </g>
        <g transform={`translate(${CRESCENT.x} ${CRESCENT.y}) rotate(180)`}>
          <path d={litPart(4, CRESCENT.r)} stroke="var(--art-moon)" strokeWidth={6} strokeOpacity={0.35} strokeLinejoin="round" />
          <path d={litPart(4, CRESCENT.r)} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.3} />
        </g>
        <circle cx={CX} cy={ROD_Y - 3} r={4} fill="var(--gold)" />
      </g>

      {/* The hem's border: an elephant's trunk and a plantain stem, by turns */}
      <g {...part("border")}>
        <path d={hemPath(PANELS[0].x0, PANELS[1].x1, BAND.top)} stroke="var(--gold)" strokeWidth={0.9} />
        <path d={hemPath(PANELS[0].x0, PANELS[1].x1, BAND.bottom)} stroke="var(--gold)" strokeWidth={0.9} />
        {MOTIFS.map((m, i) =>
          m.trunk ? (
            <path key={i} d={TRUNK} transform={`translate(${m.x} ${m.y}) scale(${m.flip ? -1.1 : 1.1} 1.1)`} stroke="var(--art-vermilion)" strokeWidth={1.3} strokeLinecap="round" />
          ) : (
            <path key={i} d={PLANTAIN} transform={`translate(${m.x} ${m.y})`} fill="var(--leaf)" stroke="var(--leaf)" strokeWidth={0.9} strokeLinejoin="round" />
          ),
        )}
      </g>

      {/* Two crowns of ruby, set out in full colour below the hem */}
      <g {...part("crowns")}>
        {CROWNS.map((c, i) => (
          <circle key={i} className="m-shimmer" cx={c.x} cy={c.base - 66} r={120} fill={url("crown-glow")} />
        ))}
        {CROWNS.map((c, i) => (
          <g key={i} transform={crownTransform(c.x, c.base)}>
            <RubyCrown cx={CX} rays={(r) => (i === 0 ? r.deg > 70 : r.deg < 110 || r.deg > 348)} />
          </g>
        ))}
        {CROWNS.map((c, i) => (
          <Flash key={i} x={c.x + (i ? 14 : -16)} y={c.base - 64} s={9} group={i + 1} />
        ))}
      </g>
    </svg>
  );
}
