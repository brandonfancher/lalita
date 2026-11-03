/**
 * Shloka 21 — "The body totalled up, and the consort finally named".
 *
 * The long portrait is summed up: she is one red throughout, drawn as a
 * flame-shaped aureole of a single flat colour, and its outline is one
 * unbroken line with nothing to correct in it. The nine gems are set round
 * her as a navaratna is set, except that the ruby's place at the centre is
 * hers. Kāmeśa is named at last, and appears as his crescent laid as a lap,
 * with her seated on his left. Where they touch is one bindu, red and white,
 * and they are tied by a single lotus fibre, the weakest bond there is. Which
 * name each part answers to is written up for readers in the registry, next
 * to this artwork's entry.
 */

import { artIds, diamond, glint, litPart, partProps, Pearl, polar, round } from "./primitives";
import type { ArtProps } from "./types";

/* ── Her: one red, one line ────────────────────────────────────────────── */

const AX = 372;
const BASE_Y = 546;
const TIP_Y = 190;
const HW = 80;
/** A flame-shaped aureole, symmetrical and closed in one stroke. */
const AUREOLE = [
  `M ${AX} ${TIP_Y}`,
  `C ${AX + 5} ${TIP_Y + 76} ${AX + HW + 8} ${TIP_Y + 136} ${AX + HW} ${TIP_Y + 252}`,
  `C ${AX + HW - 3} ${BASE_Y - 30} ${AX + 44} ${BASE_Y} ${AX} ${BASE_Y}`,
  `C ${AX - 44} ${BASE_Y} ${AX - HW + 3} ${BASE_Y - 30} ${AX - HW} ${TIP_Y + 252}`,
  `C ${AX - HW - 8} ${TIP_Y + 136} ${AX - 5} ${TIP_Y + 76} ${AX} ${TIP_Y}`,
  "Z",
].join(" ");

/* ── Him: the crescent as a lap ────────────────────────────────────────── */

const LAP = { x: 300, y: 474, r: 124 };

/* ── The bindu where they meet ─────────────────────────────────────────── */

const BINDU = { x: AX - 4, y: BASE_Y - 6, r: 8 };

/* ── The lotus fibre that ties them ────────────────────────────────────── */

const HORN_L = { x: LAP.x - LAP.r + 4, y: LAP.y - 2 };
/** Her side, where the fibre is tied: a point on the aureole's left edge. */
const TIE = { x: AX - HW + 7, y: TIP_Y + 294 };
const FIBRE = `M ${HORN_L.x + 2} ${HORN_L.y + 4} C ${HORN_L.x + 24} ${HORN_L.y + 46} ${TIE.x - 50} ${TIE.y + 40} ${TIE.x} ${TIE.y}`;
const TIE_LOOP = `M ${TIE.x - 3} ${TIE.y - 7} C ${TIE.x - 12} ${TIE.y - 3} ${TIE.x - 9} ${TIE.y + 8} ${TIE.x + 1} ${TIE.y + 6}`;
const FIBRE_LOOP = `M ${HORN_L.x - 7} ${HORN_L.y - 2} C ${HORN_L.x - 8} ${HORN_L.y + 9} ${HORN_L.x + 7} ${HORN_L.y + 10} ${HORN_L.x + 6} ${HORN_L.y - 1}`;

/* ── The other eight gems, round her ───────────────────────────────────── */

const RING = { x: 334, y: 384, rx: 202, ry: 216 };
const GEMS = [
  { deg: 102, kind: "pearl" },
  { deg: 78, kind: "coral" },
  { deg: 126, kind: "emerald" },
  { deg: 54, kind: "topaz" },
  { deg: 180, kind: "diamond" },
  { deg: 0, kind: "sapphire" },
  { deg: -142, kind: "hessonite" },
  { deg: -38, kind: "cats-eye" },
].map((g) => {
  const t = (g.deg * Math.PI) / 180;
  return { ...g, x: round(RING.x + RING.rx * Math.cos(t)), y: round(RING.y - RING.ry * Math.sin(t)) };
});
const GEM_FILL: Record<string, string> = {
  coral: "var(--sindura)",
  emerald: "var(--leaf)",
  topaz: "var(--art-turmeric)",
  sapphire: "var(--art-hair)",
  hessonite: "var(--art-ember)",
  "cats-eye": "var(--gold-soft)",
};
/** The chain the gems are strung on, round the whole ring. */
const CHAIN = Array.from({ length: 73 }, (_, k) => polar(RING.x, RING.y, 1, k * 5)).map((p) => ({
  x: round(RING.x + (p.x - RING.x) * RING.rx),
  y: round(RING.y + (p.y - RING.y) * RING.ry),
}));

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

export function OnHisLap({ idPrefix = "sa21", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);
  const R = 10.5;

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("red-glow")} cx={AX} cy={420} r={260} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("moon-glow")} cx={LAP.x} cy={LAP.y + 70} r={190} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <clipPath id={id("left-half")}>
          <rect x={BINDU.x - 20} y={BINDU.y - 20} width={20} height={40} />
        </clipPath>
      </defs>

      {/* Seated on his lap: Kāmeśa as his crescent */}
      <g {...part("lap")}>
        <ellipse className="m-shimmer" cx={LAP.x} cy={LAP.y + 76} rx={136} ry={46} fill={url("moon-glow")} />
        <path d={litPart(4, LAP.r)} transform={`translate(${LAP.x} ${LAP.y}) rotate(180)`} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.6} strokeLinejoin="round" />
        <path d={litPart(4, LAP.r - 9)} transform={`translate(${LAP.x} ${LAP.y + 3}) rotate(180)`} stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.6} />
      </g>

      {/* Wholly red: her light, one flat colour throughout */}
      <g {...part("red")}>
        <circle className="m-shimmer" cx={AX} cy={420} r={260} fill={url("red-glow")} />
        <path d={AUREOLE} fill="var(--art-vermilion)" fillOpacity={0.92} />
      </g>

      {/* Flawless: its outline, one unbroken line */}
      <g {...part("outline")}>
        <path d={AUREOLE} stroke="var(--art-core)" strokeWidth={5} strokeOpacity={0.35} strokeLinejoin="round" />
        <path d={AUREOLE} stroke="var(--gold)" strokeWidth={1.6} strokeLinejoin="round" />
      </g>

      {/* Every ornament: the nine gems, with her in the ruby's place */}
      <g {...part("gems")}>
        <path d={CHAIN.map((p, k) => `${k ? "L" : "M"} ${p.x} ${p.y}`).join(" ")} stroke="var(--gold)" strokeWidth={0.9} strokeOpacity={0.8} />
        <g fill="var(--gold)">
          {CHAIN.filter((_, k) => k % 2 === 1).map((p, k) => (
            <circle key={k} cx={p.x} cy={p.y} r={1.6} />
          ))}
        </g>
        {GEMS.map((g, i) => {
          const d = diamond({ x: g.x, y: g.y, r: R - 1 });
          return (
            <g key={g.kind}>
              <circle cx={g.x} cy={g.y} r={R + 3.4} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.7} />
              {g.kind === "pearl" ? (
                <Pearl x={g.x} y={g.y} r={R} />
              ) : g.kind === "diamond" ? (
                <>
                  <path d={d.girdle} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
                  <path d={d.table + " " + d.facets} stroke="var(--gold-soft)" strokeWidth={0.5} />
                </>
              ) : (
                <>
                  <circle cx={g.x} cy={g.y} r={R} fill={GEM_FILL[g.kind]} stroke="var(--art-carve)" strokeWidth={0.6} />
                  {g.kind === "cats-eye" && <path d={`M ${g.x} ${g.y - R + 2} Q ${g.x + 2} ${g.y} ${g.x} ${g.y + R - 2}`} stroke="var(--art-core)" strokeWidth={1.4} strokeLinecap="round" />}
                  <path d={`M ${round(g.x - R * 0.55)} ${round(g.y - R * 0.1)} Q ${round(g.x - R * 0.5)} ${round(g.y - R * 0.55)} ${round(g.x - R * 0.1)} ${round(g.y - R * 0.6)}`} stroke="var(--art-core)" strokeWidth={1.1} strokeOpacity={0.8} strokeLinecap="round" />
                </>
              )}
              {i % 2 === 0 && <path className={TWINKLE[i % 3]} d={glint(7)} transform={`translate(${round(g.x - 3)} ${round(g.y - 3)})`} fill="var(--art-core)" />}
            </g>
          );
        })}
      </g>

      {/* Śivā: one point, his white and her red */}
      <g {...part("bindu")}>
        <circle className="m-breathe" cx={BINDU.x} cy={BINDU.y} r={BINDU.r * 4} fill={url("bindu-glow")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={BINDU.r} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={1} />
        <circle cx={BINDU.x} cy={BINDU.y} r={BINDU.r} fill="var(--art-moon)" clipPath={url("left-half")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={BINDU.r} stroke="var(--gold)" strokeWidth={1} />
      </g>

      {/* Her beloved is her own: tied by one lotus fibre */}
      <g {...part("thread")}>
        {[FIBRE, FIBRE_LOOP, TIE_LOOP].map((d, i) => (
          <g key={i}>
            <path d={d} stroke="var(--gold)" strokeWidth={2.6} strokeOpacity={0.6} strokeLinecap="round" />
            <path d={d} stroke="var(--art-ivory)" strokeWidth={1.4} strokeLinecap="round" />
          </g>
        ))}
      </g>
    </svg>
  );
}
