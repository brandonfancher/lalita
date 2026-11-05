/**
 * Shloka 25 — "Elephants that attend her, cavalry that encircles her".
 *
 * Two names built as matched panels that differ in their last word: the
 * elephants attend her, the horses enclose her. The artwork keeps the
 * difference. The elephant corps is drawn as Śrī's elephants are, a lead
 * elephant on either side of her light with its herd behind it, trunks raised
 * to pour water over her, the service that brings prosperity. The cavalry is a
 * ring: two circuits of galloping horses closing round everything on every
 * side, too many to count. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { ELEPHANT_TRUNK, Elephant, ElephantDefs, Horse, artIds, partProps, radiance, round } from "./primitives";
import type { ArtProps } from "./types";

const CX = 320;

const BINDU = { x: CX, y: 522 };
const RADIANCE = radiance({ cx: BINDU.x, cy: BINDU.y, from: 14, long: 240, short: 150 });

/* ── The elephants ─────────────────────────────────────────────────────── */

/** The pot held up in the trunk's curl, tipped toward her. */
const POT = { x: 60, y: -126 };

type Placed = { x: number; y: number; s: number; lead: boolean; flip: boolean };

const LEAD_S = 1.1;
const HERD = [
  { dx: -56, dy: -30, s: 0.78 },
  { dx: -30, dy: -16, s: 0.9 },
];
const ELEPHANTS: Placed[] = [false, true].flatMap((flip) => {
  const lead = { x: flip ? 2 * CX - 204 : 204, y: 604 };
  return [
    ...HERD.map((h) => ({ x: flip ? lead.x - h.dx : lead.x + h.dx, y: lead.y + h.dy, s: h.s, lead: false, flip })),
    { ...lead, s: LEAD_S, lead: true, flip },
  ];
});

const at = (e: Placed) => `translate(${e.x} ${e.y}) scale(${e.flip ? -e.s : e.s} ${e.s})`;

/** Where each lead elephant's pot pours, in plate units, and the water's fall from it onto her light. */
const POURS = [false, true].map((flip) => {
  const s = flip ? -LEAD_S : LEAD_S;
  const lead = flip ? 2 * CX - 204 : 204;
  const mouth = { x: round(lead + (POT.x + 3) * s), y: round(604 + (POT.y - 3) * LEAD_S) };
  const end = { x: round(CX + (flip ? 9 : -9)), y: BINDU.y - 20 };
  const ctrl = { x: round(CX + (flip ? 22 : -22)), y: mouth.y - 18 };
  return [0, 4, 8].map((o) => `M ${mouth.x} ${mouth.y + o * 0.3} Q ${ctrl.x + (flip ? -o : o) * 0.4} ${ctrl.y + o} ${end.x + (flip ? -o : o) * 0.5} ${end.y + o * 0.5}`);
});
const DROPS = [
  { x: -7, y: -8, r: 1.4 },
  { x: 8, y: -9, r: 1.3 },
  { x: -12, y: 2, r: 1.1 },
  { x: 13, y: 1, r: 1.2 },
  { x: -3, y: -15, r: 1 },
  { x: 4, y: -14, r: 1.1 },
].map((d) => ({ x: BINDU.x + d.x, y: BINDU.y + d.y, r: d.r }));

/* ── The cavalry ───────────────────────────────────────────────────────── */

/** Two circuits round her, all galloping the same way, clockwise; the far side of each runs left to right. */
const RINGS = [
  { rx: 258, ry: 300, n: 34, s: 0.8, fill: "var(--art-turmeric)" },
  { rx: 298, ry: 344, n: 40, s: 0.96, fill: "var(--gold)" },
];
const RING_C = { x: CX, y: 452 };

const CAVALRY = RINGS.map((ring, ri) => ({
  ...ring,
  horses: Array.from({ length: ring.n }, (_, k) => {
    const phi = ((k + (ri ? 0.5 : 0)) / ring.n) * 2 * Math.PI;
    const x = round(RING_C.x + ring.rx * Math.cos(phi));
    const y = round(RING_C.y + ring.ry * Math.sin(phi));
    const left = Math.sin(phi) > 0;
    return { x, y, transform: `translate(${x} ${y}) scale(${left ? -ring.s : ring.s} ${ring.s})`, k: k % 3 };
  }),
}));

const SWAY = ["m-sway", "m-sway m-late", "m-sway m-later"];

export function ElephantsAndHorses({ idPrefix = "sa25", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={BINDU.x} cy={BINDU.y} r={260} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.65 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={BINDU.x} cy={BINDU.y} r={240} gradientUnits="userSpaceOnUse">
          <stop offset="0.05" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.2" style={{ stopColor: "var(--gold)", stopOpacity: 0.75 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <ElephantDefs id={id} />
      </defs>

      {/* The cavalry, two circuits of horses closing round her on every side */}
      <g {...part("cavalry")}>
        {CAVALRY.map((ring) =>
          ring.horses.map((h, k) => (
            <g key={`${ring.rx}-${k}`} transform={h.transform}>
              <g className={SWAY[h.k]}>
                <Horse fill={ring.fill} />
              </g>
            </g>
          )),
        )}
      </g>

      {/* Her light, which the elephants wait on */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={BINDU.x} cy={BINDU.y} r={260} fill={url("glow")} />
        <path className="m-shimmer" d={RADIANCE} stroke={url("radiance")} strokeWidth={0.7} />
        <circle className="m-breathe" cx={BINDU.x} cy={BINDU.y} r={40} fill={url("bindu-glow")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={6} fill="var(--art-core)" />
        <circle cx={BINDU.x} cy={BINDU.y} r={10} stroke="var(--gold)" strokeWidth={0.9} />
      </g>

      {/* The elephant corps, a lead elephant either side with its herd behind, pouring water over her */}
      <g {...part("elephants")}>
        {ELEPHANTS.map((e, i) => (
          <g key={i} transform={at(e)} opacity={e.lead ? 1 : 0.72}>
            <Elephant trunk={e.lead ? ELEPHANT_TRUNK.raised : ELEPHANT_TRUNK.down} url={url}>
              {e.lead && (
                <g transform={`translate(${POT.x} ${POT.y}) rotate(28)`}>
                  <path d="M -8 0 C -10 8 -6 13 0 13 C 6 13 10 8 8 0 Z" fill="var(--gold)" stroke="var(--art-musk)" strokeWidth={0.5} strokeOpacity={0.6} />
                  <path d="M -6 0 L 6 0 L 4.4 -4 L -4.4 -4 Z" fill="var(--gold)" stroke="var(--art-musk)" strokeWidth={0.5} strokeOpacity={0.6} />
                  <path d="M -7 6 Q 0 8 7 6" stroke="var(--art-vermilion)" strokeWidth={1.2} />
                </g>
              )}
            </Elephant>
          </g>
        ))}
        <g stroke="var(--art-moon)" strokeLinecap="round" strokeDasharray="7 3.4">
          {POURS.flat().map((d, i) => (
            <path key={i} className={i % 2 ? "m-shimmer m-late" : "m-shimmer"} d={d} strokeWidth={i % 3 === 1 ? 1.6 : 1} strokeOpacity={0.9} />
          ))}
        </g>
        <g fill="var(--art-moon)" stroke="var(--gold-soft)" strokeWidth={0.4}>
          {DROPS.map((d, i) => (
            <circle key={i} className={i % 2 ? "m-twinkle m-late" : "m-twinkle"} cx={d.x} cy={d.y} r={d.r} />
          ))}
        </g>
      </g>
    </svg>
  );
}
