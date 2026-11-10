/**
 * Shloka 92 — "Rolling eyes, flushed cheeks, sandal paste and campaka".
 *
 * The verse looks at her face and body, and the picture keeps to the things
 * the poets set beside them. Under the card her light. At the left two red
 * lotuses on tall stalks, rocking as if drunk, for her eyes reddened with
 * rapture; from the crown's right a bough of pāṭala hangs its pale rose
 * trumpets, the flush of her cheeks. In front, a sandalwood log on its wet
 * grinding stone with the paste she is anointed with, and campaka flowers
 * heaped on a leaf, the flower she loves: the sandal and the flowers, the
 * third and fourth services of worship, left to right as they are offered. Which name each part answers to is
 * written up for readers in the registry, next to this artwork's entry.
 */

import { artIds, Campaka, OpenLotus, partProps, round, swingFrom, taper, through } from "./primitives";
import type { ArtProps } from "./types";

/* ── Her light ─────────────────────────────────────────────────────────── */

const HER = { x: 320, y: 492 };

/* ── Two red lotuses rocking on their stalks ───────────────────────────── */

const WATER = { x: 196, y: 604, rx: 76, ry: 13 };
const LOTUSES = [
  { foot: { x: 184, y: 604 }, head: { x: 166, y: 470 }, s: 0.8, lean: -12, motion: "m-sway" },
  { foot: { x: 216, y: 606 }, head: { x: 242, y: 512 }, s: 0.68, lean: 14, motion: "m-sway m-late" },
];
const stalk = (l: (typeof LOTUSES)[number]) =>
  through([l.foot, { x: (l.foot.x + l.head.x) / 2 + (l.head.x < l.foot.x ? 8 : -8), y: (l.foot.y + l.head.y) / 2 }, l.head]);

/* ── The pāṭala bough ──────────────────────────────────────────────────── */

const BOUGH = through([
  { x: 590, y: 14 },
  { x: 520, y: 40 },
  { x: 452, y: 84 },
  { x: 400, y: 140 },
]);
const TRUMPETS = [
  { at: 0.28, dx: -4, dy: 24, deg: 10, s: 1.5 },
  { at: 0.36, dx: 10, dy: -20, deg: -150, s: 1.3 },
  { at: 0.46, dx: -6, dy: 22, deg: 14, s: 1.6 },
  { at: 0.6, dx: 14, dy: 18, deg: -24, s: 1.45 },
  { at: 0.72, dx: -16, dy: 12, deg: 50, s: 1.35 },
  { at: 0.86, dx: 8, dy: 18, deg: -10, s: 1.4 },
  { at: 1, dx: -10, dy: 12, deg: 36, s: 1.3 },
];
const TRUMPET = "M 0 0 C 2 6 3 12 3.4 18 C 7 19 11 22 12 26 C 8 26.6 5 25.4 2.6 24 C 1.6 28 -1.6 28 -2.6 24 C -5 25.4 -8 26.6 -12 26 C -11 22 -7 19 -3.4 18 C -3 12 -2 6 0 0 Z";
const LEAVES = [
  { at: 0.06, deg: -30 },
  { at: 0.12, deg: 150 },
  { at: 0.28, deg: -40 },
  { at: 0.48, deg: 170 },
  { at: 0.52, deg: -70 },
  { at: 0.76, deg: 130 },
  { at: 0.94, deg: -120 },
];
const LEAF = "M 0 0 C 8 -6 22 -6 32 0 C 22 6 8 6 0 0 Z";

/* ── The sandal log on its grinding stone ──────────────────────────────── */

const STONE = { x: 262, y: 664, rx: 62, ry: 17 };
const LOG = { x: 254, y: 651, l: 70, deg: -14 };
const BOWL = { x: 350, y: 680 };

/* ── Campaka heaped on a leaf ──────────────────────────────────────────── */

const PLATE = { x: 448, y: 640, s: 1.3 };
const CAMPAKAS = [
  { x: 430, y: 632, s: 1, deg: 0 },
  { x: 458, y: 626, s: 1.05, deg: 14 },
  { x: 484, y: 636, s: 0.9, deg: -8 },
  { x: 444, y: 648, s: 0.95, deg: 22 },
  { x: 472, y: 650, s: 0.85, deg: 30 },
  { x: 412, y: 648, s: 0.8, deg: -18 },
  { x: 446, y: 614, s: 0.85, deg: 8 },
];

export function SandalAndCampaka({ idPrefix = "sa92", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);
  const along = (t: number) => BOUGH[Math.round(t * (BOUGH.length - 1))];

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.32" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("water")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("trumpet")} x1={0} y1={0} x2={0} y2={26} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--lotus)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-ivory)" }} />
        </linearGradient>
        <linearGradient id={id("log")} x1={0} y1={-7} x2={0} y2={7} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-ember)" }} />
        </linearGradient>
        <radialGradient id={id("paste")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-turmeric)", stopOpacity: 0.75 }} />
        </radialGradient>
      </defs>

      <circle className="m-breathe" cx={HER.x} cy={HER.y} r={70} fill={url("her")} />

      {/* Two red lotuses rocking on their stalks: her eyes reddened, rolling with rapture */}
      <g {...part("eyes")}>
        <ellipse cx={WATER.x} cy={WATER.y} rx={WATER.rx} ry={WATER.ry} fill={url("water")} />
        <path d={`M ${WATER.x - 50} ${WATER.y} H ${WATER.x + 50}`} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.7} />
        {LOTUSES.map((l, k) => (
          <g key={k} className={l.motion} style={swingFrom(l.foot)}>
            <path d={taper(stalk(l), () => 2.4)} fill="var(--leaf)" />
            <g transform={`translate(${l.head.x} ${l.head.y}) rotate(${l.lean}) scale(${l.s})`}>
              <OpenLotus fill="var(--art-vermilion)" shade="var(--art-crimson)" pad={false} />
            </g>
          </g>
        ))}
      </g>

      {/* A bough of pāṭala, its pale rose trumpets: the flush of her cheeks */}
      <g {...part("cheeks")}>
        <path d={taper(BOUGH, (t) => 6 - t * 3.6)} fill="var(--art-musk)" fillOpacity={0.75} />
        {LEAVES.map((l, k) => {
          const a = along(l.at);
          return <path key={k} transform={`translate(${round(a.x)} ${round(a.y)}) rotate(${l.deg})`} d={LEAF} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.4} />;
        })}
        {TRUMPETS.map((t, k) => {
          const a = along(t.at);
          const tip = { x: round(a.x + t.dx), y: round(a.y + t.dy) };
          return (
            <g key={k}>
              <path d={`M ${round(a.x)} ${round(a.y)} Q ${round(a.x + t.dx * 0.2)} ${round(a.y + t.dy * 0.7)} ${tip.x} ${tip.y}`} stroke="var(--art-musk)" strokeOpacity={0.7} strokeWidth={1} />
              <g transform={`translate(${tip.x} ${tip.y}) rotate(${t.deg}) scale(${t.s})`}>
                <g className={k % 2 ? "m-sway m-late" : "m-sway"} style={{ transformBox: "view-box", transformOrigin: "0px 0px" }}>
                  <path d={TRUMPET} fill={url("trumpet")} stroke="var(--art-crimson)" strokeWidth={0.5} strokeOpacity={0.6} strokeLinejoin="round" />
                  <path d="M 0 4 V 20 M -1.2 18 L -5 23 M 1.2 18 L 5 23" stroke="var(--art-crimson)" strokeWidth={0.5} strokeOpacity={0.5} />
                  <circle r={1.6} fill="var(--leaf)" />
                </g>
              </g>
            </g>
          );
        })}
      </g>

      {/* A sandal log on its wet grinding stone, and the paste */}
      <g {...part("sandal")}>
        <ellipse cx={STONE.x} cy={STONE.y + 8} rx={STONE.rx} ry={STONE.ry * 0.6} fill="var(--art-musk)" fillOpacity={0.18} />
        <path d={`M ${STONE.x - STONE.rx} ${STONE.y} V ${STONE.y + 6} A ${STONE.rx} ${STONE.ry} 0 0 0 ${STONE.x + STONE.rx} ${STONE.y + 6} V ${STONE.y}`} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.1} />
        <ellipse cx={STONE.x} cy={STONE.y} rx={STONE.rx} ry={STONE.ry} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.1} />
        <ellipse cx={STONE.x - 4} cy={STONE.y + 1} rx={28} ry={7} fill={url("paste")} fillOpacity={0.85} />
        <ellipse cx={STONE.x + 22} cy={STONE.y + 3} rx={6} ry={2} fill="var(--art-moon)" fillOpacity={0.7} />
        <g transform={`translate(${LOG.x} ${LOG.y}) rotate(${LOG.deg})`}>
          <rect x={-LOG.l / 2} y={-7} width={LOG.l} height={14} rx={3} fill={url("log")} stroke="var(--gold)" strokeWidth={0.7} />
          <path d={`M ${-LOG.l / 2 + 6} -3 C -6 -5 6 -1 ${LOG.l / 2 - 6} -3 M ${-LOG.l / 2 + 4} 2.6 C -4 1 8 4.6 ${LOG.l / 2 - 8} 2.4`} stroke="var(--art-musk)" strokeWidth={0.5} strokeOpacity={0.6} />
          <ellipse cx={-LOG.l / 2} rx={3} ry={7} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.7} />
          <ellipse cx={-LOG.l / 2} rx={1.6} ry={4} stroke="var(--art-turmeric)" strokeWidth={0.5} />
        </g>
        <g transform={`translate(${BOWL.x} ${BOWL.y}) scale(1.35)`}>
          <path d="M -13 -6 C -13 4 -7 8 0 8 C 7 8 13 4 13 -6 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <ellipse cy={-6} rx={13} ry={3.2} fill={url("paste")} stroke="var(--gold)" strokeWidth={0.6} />
        </g>
      </g>

      {/* Campaka flowers heaped on a leaf, the flower she loves */}
      <g {...part("campaka")}>
        <g transform={`translate(${PLATE.x} ${PLATE.y}) scale(${PLATE.s})`}>
          <path d="M -52 6 C -30 -14 30 -14 56 2 C 30 22 -30 22 -52 6 Z" fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.6} />
          <path d="M -50 6 C -10 2 20 4 54 2" stroke="var(--gold-soft)" strokeWidth={0.6} />
        </g>
        {CAMPAKAS.map((c, k) => (
          <g key={k} transform={`translate(${c.x} ${c.y}) rotate(${c.deg}) scale(${c.s} ${c.s * 0.8})`}>
            <Campaka />
          </g>
        ))}
      </g>
    </svg>
  );
}
