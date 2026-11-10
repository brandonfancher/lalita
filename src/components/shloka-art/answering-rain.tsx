/**
 * Shloka 31 — "The engine of obstruction, and the answering rain".
 *
 * The first name ends the Gaṇeśa episode; the second is where she starts to
 * fight. Below the card Mahāgaṇapati, the ring of ten from the last verse, has
 * found Viśukra's slab inside the wall: a stone cut with an eight-angled
 * figure and eight tridents, now split by his tusk into pieces flying apart,
 * its dust blowing off on the wind. Over the card, her light at the left sends
 * up a rain of answering missiles, gold shafts with flame heads, and each meets
 * one of Bhaṇḍa's dark weapons coming in from the upper right, and the two go
 * out together in a burst. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { BrokenSlab, DawnDefs, Mahaganapati, GanesaEmblem, artIds, glint, partProps, polar, round, tongue } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

const HER = { x: 150, y: 474 };

/* ── The answering rain ────────────────────────────────────────────────── */

/** Where Bhaṇḍa comes from, off the upper right. */
const BHANDA = { x: 720, y: -80 };
const MEETINGS: Pt[] = [
  { x: 190, y: 168 },
  { x: 262, y: 138 },
  { x: 336, y: 170 },
  { x: 408, y: 140 },
  { x: 472, y: 168 },
  { x: 522, y: 64 },
  { x: 560, y: 132 },
  { x: 602, y: 212 },
  { x: 574, y: 300 },
  { x: 592, y: 396 },
];
const unit = (a: Pt, b: Pt) => {
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  return { x: (b.x - a.x) / d, y: (b.y - a.y) / d };
};
const at = (m: Pt, d: Pt, k: number) => ({ x: round(m.x - d.x * k), y: round(m.y - d.y * k) });
const angle = (d: Pt) => round((Math.atan2(d.y, d.x) * 180) / Math.PI);
const EXCHANGES = MEETINGS.map((m, i) => {
  const hers = unit(HER, m);
  const his = unit(BHANDA, m);
  const burst = Array.from({ length: 8 }, (_, k) => {
    const deg = k * 45 + 22.5;
    const a = polar(m.x, m.y, 6, deg);
    const b = polar(m.x, m.y, k % 2 ? 12 : 17, deg);
    return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  }).join(" ");
  return {
    m,
    i,
    her: { head: at(m, hers, 9), angle: angle(hers), from: at(m, hers, 150), to: at(m, hers, 38) },
    his: { head: at(m, his, 9), angle: angle(his), from: at(m, his, 120), to: at(m, his, 36) },
    burst,
  };
});
/** Her missile, head at the origin pointing along +x: a gold shaft with a flame for a head. */
const HER_SHAFT = "M -30 0 L -4 0";
const HER_FLAME = tongue(12, 7, 1);
/** His: a dark barbed head on a dark shaft. */
const HIS_SHAFT = "M -28 0 L -6 0";
const HIS_HEAD = "M 0 0 L -9 -4.6 L -6.4 0 L -9 4.6 Z";

/* ── Viśukra's slab, broken ────────────────────────────────────────────── */

const SLAB = { x: 454, y: 540, hu: 64, hv: 26, depth: 7 };
/** The powder he made of it, thrown away on the wind. */
const DUST = Array.from({ length: 34 }, (_, k) => ({
  x: round(SLAB.x + 30 + ((k * 41) % 150)),
  y: round(SLAB.y - 10 - ((k * 29) % 90) + ((k * 41) % 150) * 0.12),
  r: round(0.8 + (k % 4) * 0.45),
  k,
}));

const GANESA = { x: 298, y: 540 };
const GANESA_K = 0.62;

export function AnsweringRain({ idPrefix = "sa31", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={170} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("burst")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.85 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("shadow")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        {EXCHANGES.map((e) => (
          <linearGradient key={`h${e.i}`} id={id(`hers-${e.i}`)} x1={e.her.from.x} y1={e.her.from.y} x2={e.her.to.x} y2={e.her.to.y} gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
            <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0.8 }} />
          </linearGradient>
        ))}
        {EXCHANGES.map((e) => (
          <linearGradient key={`b${e.i}`} id={id(`his-${e.i}`)} x1={e.his.from.x} y1={e.his.from.y} x2={e.his.to.x} y2={e.his.to.y} gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
            <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.7 }} />
          </linearGradient>
        ))}
        {EXCHANGES.map((e) => (
          <linearGradient key={`e${e.i}`} id={id(`his-edge-${e.i}`)} x1={e.his.from.x} y1={e.his.from.y} x2={e.his.to.x} y2={e.his.to.y} gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
            <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.55 }} />
          </linearGradient>
        ))}
        <DawnDefs id={id} />
      </defs>

      {/* Her light, fighting now */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={170} fill={url("glow")} />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={34} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={5.6} fill="var(--art-core)" />
        <circle cx={HER.x} cy={HER.y} r={9.2} stroke="var(--gold)" strokeWidth={0.9} />
      </g>

      {/* Her answering missiles, each meeting one of Bhaṇḍa's and going out with it */}
      <g {...part("rain")}>
        {EXCHANGES.map((e) => (
          <g key={e.i}>
            <path d={`M ${e.his.from.x} ${e.his.from.y} L ${e.his.to.x} ${e.his.to.y}`} stroke={url(`his-${e.i}`)} strokeWidth={2.4} strokeLinecap="round" />
            <path d={`M ${e.his.from.x} ${e.his.from.y} L ${e.his.to.x} ${e.his.to.y}`} stroke={url(`his-edge-${e.i}`)} strokeWidth={0.6} strokeLinecap="round" />
            <path d={`M ${e.her.from.x} ${e.her.from.y} L ${e.her.to.x} ${e.her.to.y}`} stroke={url(`hers-${e.i}`)} strokeWidth={1.6} strokeLinecap="round" />
            <circle className={TWINKLE[e.i % 3]} cx={e.m.x} cy={e.m.y} r={20} fill={url("burst")} />
            <g transform={`translate(${e.his.head.x} ${e.his.head.y}) rotate(${e.his.angle})`}>
              <path d={HIS_SHAFT} stroke="var(--art-musk)" strokeWidth={1.8} strokeLinecap="round" />
              <path d={HIS_SHAFT} stroke="var(--art-moon)" strokeWidth={0.5} strokeOpacity={0.6} strokeLinecap="round" />
              <path d={HIS_HEAD} fill="var(--art-hair)" stroke="var(--art-moon)" strokeWidth={0.7} strokeOpacity={0.8} strokeLinejoin="round" />
            </g>
            <g transform={`translate(${e.her.head.x} ${e.her.head.y}) rotate(${e.her.angle})`}>
              <path d={HER_SHAFT} stroke="var(--gold)" strokeWidth={1.6} strokeLinecap="round" />
              <g transform="rotate(90)">
                <path d={HER_FLAME} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.5} />
              </g>
            </g>
            <path className="m-lick" d={e.burst} stroke="var(--art-core)" strokeWidth={1.3} strokeLinecap="round" />
            <path className="m-lick" d={glint(5)} transform={`translate(${e.m.x} ${e.m.y})`} fill="var(--art-core)" />
          </g>
        ))}
      </g>

      {/* Mahāgaṇapati, and Viśukra's slab split by his tusk, its dust thrown to the wind */}
      <g {...part("yantra")}>
        <Mahaganapati x={GANESA.x} y={GANESA.y} k={GANESA_K} url={url} skip="tusk" />
        <ellipse cx={SLAB.x + 6} cy={SLAB.y + SLAB.hv + 16} rx={SLAB.hu + 22} ry={9} fill={url("shadow")} />
        <BrokenSlab slab={SLAB} id={id} url={url} layer="stone" />
        <g transform={`translate(${SLAB.x - SLAB.hu - 34} ${SLAB.y - 4}) rotate(64) scale(1.5)`}>
          <GanesaEmblem name="tusk" />
        </g>
        <path className="m-lick" d={glint(9)} transform={`translate(${SLAB.x - SLAB.hu - 6} ${SLAB.y + 2})`} fill="var(--art-core)" />
        {DUST.map((d) => (
          <circle
            key={d.k}
            className={d.k % 2 ? "m-ember m-late" : "m-ember"}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={d.k % 3 ? "var(--art-musk)" : "var(--art-moon)"}
            fillOpacity={round(0.55 - (d.x - SLAB.x) / 400)}
          />
        ))}
      </g>

      {/* Cut into the slab: the eight-angled figure and its eight tridents, broken with it */}
      <g {...part("figure")}>
        <BrokenSlab slab={SLAB} id={id} url={url} layer="figure" />
      </g>
    </svg>
  );
}
