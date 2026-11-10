/**
 * Shloka 85 — "The ever-moist Nityā, and half of Śiva's body".
 *
 * Under the card the innermost triangle of the yantra, where the Nityās are
 * worshipped: fifteen moons along its three sides, one for each night of the
 * waxing fortnight, and at its heart the sixteenth, which is the whole. That
 * light is one flame split down the middle: the viewer's left is his, white
 * as ash, with his crescent; the right is hers, vermilion, with a line of
 * pearls. At the lower left an unglazed water pot of the kind set out at a
 * roadside shed for anyone who asks, always beaded with water; at the lower
 * right a clay lamp just blown out, its one thread of smoke going up. The
 * poets' moon and lotus keep to the far corner of the crown. Which name each
 * part answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { artIds, litPart, MoonDeer, OpenLotus, partProps, round, taper, through } from "./primitives";
import type { ArtProps } from "./types";

/* ── The triangle of the Nityās ────────────────────────────────────────── */

const TRI = { x: 320, y: 490, r: 128 };
/** Top-left, top-right, foot: the three corners of a downward triangle. */
const [TL, TR, FOOT] = [
  { x: round(TRI.x - TRI.r * Math.cos(Math.PI / 6)), y: round(TRI.y - TRI.r / 2) },
  { x: round(TRI.x + TRI.r * Math.cos(Math.PI / 6)), y: round(TRI.y - TRI.r / 2) },
  { x: TRI.x, y: TRI.y + TRI.r },
];
const SIDES: [typeof TL, typeof TL][] = [
  [TL, TR],
  [TR, FOOT],
  [FOOT, TL],
];
const NITYAS = SIDES.flatMap(([a, b], s) =>
  [0.1, 0.3, 0.5, 0.7, 0.9].map((t, k) => {
    const night = s * 5 + k + 1;
    const x = round(a.x + (b.x - a.x) * t);
    const y = round(a.y + (b.y - a.y) * t);
    const dx = TRI.x - x;
    const dy = TRI.y - y;
    const len = Math.hypot(dx, dy);
    return { night, x, y, r: round(7 + night * 0.3), turn: round((Math.atan2(dx / len, -dy / len) * 180) / Math.PI) };
  }),
);
const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── The one flame, his half and hers ──────────────────────────────────── */

const F = { x: TRI.x, top: 446, foot: 566, w: 32 };
const half = (side: 1 | -1) =>
  `M ${F.x} ${F.top} C ${F.x + side * 3} ${F.top + 30} ${F.x + side * F.w} ${F.top + 48} ${F.x + side * F.w} ${F.top + 84} C ${F.x + side * F.w} ${F.foot - 14} ${F.x + side * 18} ${F.foot} ${F.x} ${F.foot} Z`;
const LEFT_HALF = half(-1);
const RIGHT_HALF = half(1);
/** Beads just outside an edge: rudrākṣa on his, pearls on hers. */
const edgeBeads = (side: 1 | -1) =>
  Array.from({ length: 13 }, (_, k) => {
    const t = 0.16 + (k / 12) * 0.8;
    const y = F.top + t * (F.foot - F.top);
    const u = (y - F.top) / (F.foot - F.top);
    const w = u < 0.68 ? F.w * Math.sin((u / 0.68) * (Math.PI / 2)) ** 1.4 : F.w * Math.cos(((u - 0.68) / 0.32) * (Math.PI / 2)) ** 0.55;
    return { x: round(F.x + side * (w + 4.4)), y: round(y) };
  });
const RUDRAKSA = edgeBeads(-1);
const PEARLS = edgeBeads(1);

/* ── The water pot that is never dry ───────────────────────────────────── */

const POT = { x: 166, y: 556, r: 36 };
const POT_SET = `translate(${POT.x} 604) scale(1.32) translate(${-POT.x} ${-604})`;
const POT_BODY = `M ${POT.x - 11} ${POT.y - POT.r - 6} C ${POT.x - 13} ${POT.y - POT.r + 2} ${POT.x - POT.r - 4} ${POT.y - POT.r + 8} ${POT.x - POT.r} ${POT.y} C ${POT.x - POT.r + 2} ${POT.y + POT.r - 4} ${POT.x - 14} ${POT.y + POT.r + 2} ${POT.x} ${POT.y + POT.r + 2} C ${POT.x + 14} ${POT.y + POT.r + 2} ${POT.x + POT.r - 2} ${POT.y + POT.r - 4} ${POT.x + POT.r} ${POT.y} C ${POT.x + POT.r + 4} ${POT.y - POT.r + 8} ${POT.x + 13} ${POT.y - POT.r + 2} ${POT.x + 11} ${POT.y - POT.r - 6} Z`;
const BEADS = Array.from({ length: 26 }, (_, k) => {
  const a = ((k * 137.5) % 360) * (Math.PI / 180);
  const rr = Math.sqrt((k + 0.5) / 26);
  return {
    x: round(POT.x - 4 + Math.cos(a) * rr * (POT.r - 8)),
    y: round(POT.y + 4 + Math.sin(a) * rr * (POT.r - 10)),
    r: round(1 + ((k * 7) % 5) * 0.22),
    k,
  };
});
const DRIPS = [
  { x: POT.x - 18, y: POT.y + 4, l: 22 },
  { x: POT.x + 9, y: POT.y + 10, l: 20 },
  { x: POT.x + 24, y: POT.y - 4, l: 18 },
];
const CUP = { x: 214, y: 598 };

/* ── The lamp just blown out ───────────────────────────────────────────── */

const LAMP = { x: 470, y: 586 };
const LAMP_SET = `translate(${LAMP.x} ${LAMP.y + 6}) scale(1.6) translate(${-LAMP.x} ${-LAMP.y - 6})`;
/** The smoke, in plate units, from the wick (which the lamp's scaling moves to about here). */
const WICK = { x: LAMP.x + 22.4, y: LAMP.y - 22.8 };
const SMOKE = taper(
  through([
    WICK,
    { x: WICK.x - 2, y: WICK.y - 40 },
    { x: WICK.x + 8, y: WICK.y - 84 },
    { x: WICK.x - 6, y: WICK.y - 126 },
    { x: WICK.x - 24, y: WICK.y - 160 },
    { x: WICK.x - 22, y: WICK.y - 196 },
  ]),
  (t) => 1.2 + t * 6,
);

/* ── What the poets would compare her to, kept far off ─────────────────── */

const MOON = { x: 488, y: 62, r: 28 };
const LOTUS = { x: 566, y: 166 };

export function HalfOfHisBody({ idPrefix = "sa85", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.8 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("field")} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.04 }} />
        </radialGradient>
        <linearGradient id={id("his")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-ivory)" }} />
        </linearGradient>
        <linearGradient id={id("hers")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </linearGradient>
        <linearGradient id={id("clay")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-crimson)" }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-ember)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)" }} />
        </linearGradient>
        <linearGradient id={id("smoke")} x1={0} y1={1} x2={0} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("moonglow")}>
          <stop offset="0.5" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("wet")}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.28 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("ember")}>
          <stop offset="0" style={{ stopColor: "var(--art-ember)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--art-ember)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The poets' moon and lotus, kept to the far corner */}
      <g {...part("similes")}>
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r * 1.9} fill={url("moonglow")} />
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.3} />
        <path
          d={`M ${MOON.x + MOON.r * 0.1} ${MOON.y + MOON.r * 0.95} A ${MOON.r} ${MOON.r} 0 0 0 ${MOON.x + MOON.r * 0.95} ${MOON.y + MOON.r * 0.1}`}
          stroke="var(--gold-soft)"
          strokeWidth={2.4}
          strokeOpacity={0.5}
        />
        <g transform={`translate(${MOON.x} ${MOON.y + 3}) scale(0.4)`} opacity={0.5}>
          <MoonDeer smudge="transparent" />
        </g>
        <g transform={`translate(${LOTUS.x} ${LOTUS.y}) scale(0.86)`}>
          <OpenLotus fill="var(--art-vermilion)" shade="var(--art-crimson)" />
        </g>
      </g>

      {/* The triangle, and the fifteen Nityās along its sides */}
      <g {...part("nityas")}>
        <path d={`M ${TL.x} ${TL.y} L ${TR.x} ${TR.y} L ${FOOT.x} ${FOOT.y} Z`} fill={url("field")} stroke="var(--gold)" strokeWidth={1.3} strokeLinejoin="round" />
        <path
          d={`M ${TL.x + 14} ${TL.y + 7} L ${TR.x - 14} ${TR.y + 7} L ${FOOT.x} ${FOOT.y - 15} Z`}
          stroke="var(--gold-soft)"
          strokeWidth={0.6}
          strokeOpacity={0.6}
          strokeLinejoin="round"
        />
        {NITYAS.map((n) => (
          <g key={n.night} transform={`translate(${n.x} ${n.y}) rotate(${n.turn})`}>
            <circle r={n.r * 2} fill={url("moonglow")} />
            <g className={TWINKLE[n.night % 3]}>
              <circle r={n.r} fill="var(--art-hair)" fillOpacity={0.3} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.7} />
              <path d={litPart(n.night, n.r)} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
            </g>
          </g>
        ))}
      </g>

      {/* One flame: his half and hers */}
      <g {...part("one-body")}>
        <ellipse className="m-breathe" cx={F.x} cy={F.top + 70} rx={92} ry={104} fill={url("glow")} />
        <path d={LEFT_HALF} fill={url("his")} />
        <path d={RIGHT_HALF} fill={url("hers")} />
        <path d={`M ${F.x - 6} ${F.top + 40} C ${F.x - 20} ${F.top + 60} ${F.x - 22} ${F.top + 90} ${F.x - 12} ${F.foot - 14}`} stroke="var(--gold-soft)" strokeWidth={1.2} strokeOpacity={0.6} />
        <path d={`M ${F.x + 6} ${F.top + 40} C ${F.x + 20} ${F.top + 60} ${F.x + 22} ${F.top + 90} ${F.x + 12} ${F.foot - 14}`} stroke="var(--art-core)" strokeWidth={1.2} strokeOpacity={0.6} />
        {RUDRAKSA.map((p, k) => (
          <circle key={k} cx={p.x} cy={p.y} r={2.5} fill="var(--art-ember)" stroke="var(--art-musk)" strokeWidth={0.5} />
        ))}
        {PEARLS.map((p, k) => (
          <circle key={k} cx={p.x} cy={p.y} r={2.3} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.5} />
        ))}
        <path d={`${LEFT_HALF} ${RIGHT_HALF}`} stroke="var(--gold)" strokeWidth={1.5} strokeLinejoin="round" />
        <path d={`M ${F.x} ${F.top + 3} L ${F.x} ${F.foot - 1}`} stroke="var(--gold)" strokeWidth={1} />
        <g transform={`translate(${F.x} ${F.top - 6}) rotate(180)`}>
          <path d={litPart(4, 9)} transform="translate(0 0)" fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
        </g>
        <circle className="m-flicker" cx={F.x} cy={F.top + 92} r={3.6} fill="var(--art-core)" stroke="var(--art-saffron)" strokeWidth={0.9} />
      </g>

      {/* The water pot that is never dry, set out for whoever asks */}
      <g {...part("pot")}>
        <g transform={POT_SET}>
        <ellipse cx={POT.x + 8} cy={POT.y + POT.r + 10} rx={64} ry={11} fill={url("wet")} />
        <ellipse cx={POT.x} cy={POT.y + POT.r + 4} rx={24} ry={6} stroke="var(--art-turmeric)" strokeWidth={4.4} />
        <ellipse cx={POT.x} cy={POT.y + POT.r + 4} rx={24} ry={6} stroke="var(--gold)" strokeWidth={0.5} strokeDasharray="2 2" />
        <path d={POT_BODY} fill={url("clay")} stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
        <path
          d={`M ${POT.x - POT.r + 6} ${POT.y - 12} C ${POT.x - 12} ${POT.y - 6} ${POT.x + 12} ${POT.y - 6} ${POT.x + POT.r - 6} ${POT.y - 12}`}
          stroke="var(--art-ivory)"
          strokeWidth={1}
          strokeOpacity={0.7}
          strokeDasharray="3 2"
        />
        <ellipse cx={POT.x} cy={POT.y - POT.r - 6} rx={13} ry={3.6} fill="var(--art-ember)" stroke="var(--gold)" strokeWidth={0.8} />
        <ellipse cx={POT.x} cy={POT.y - POT.r - 6} rx={9} ry={2.2} fill="var(--art-hair)" fillOpacity={0.7} />
        <path
          d={`M ${POT.x - 24} ${POT.y - 18} C ${POT.x - 30} ${POT.y - 4} ${POT.x - 28} ${POT.y + 12} ${POT.x - 20} ${POT.y + 24}`}
          stroke="var(--art-ivory)"
          strokeWidth={2}
          strokeOpacity={0.45}
          strokeLinecap="round"
        />
        {BEADS.map((b) => (
          <g key={b.k} className={b.k % 4 === 0 ? TWINKLE[b.k % 3] : undefined}>
            <circle cx={b.x} cy={b.y} r={b.r} fill="var(--art-moon)" stroke="var(--gold-soft)" strokeWidth={0.35} />
          </g>
        ))}
        {DRIPS.map((d, k) => (
          <g key={k}>
            <path
              d={taper(
                [
                  { x: d.x, y: d.y },
                  { x: d.x + 0.6, y: d.y + d.l / 2 },
                  { x: d.x + 0.4, y: d.y + d.l },
                ],
                (t) => 0.8 + t * 1.4,
              )}
              fill="var(--art-moon)"
              fillOpacity={0.85}
            />
            <circle className={TWINKLE[k]} cx={d.x + 0.4} cy={d.y + d.l + 1.6} r={1.8} fill="var(--art-moon)" stroke="var(--gold-soft)" strokeWidth={0.4} />
          </g>
        ))}
        <g>
          <path d={`M ${CUP.x - 9} ${CUP.y - 16} L ${CUP.x - 7} ${CUP.y} L ${CUP.x + 7} ${CUP.y} L ${CUP.x + 9} ${CUP.y - 16} Z`} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <ellipse cx={CUP.x} cy={CUP.y - 16} rx={9} ry={2.6} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.6} />
          <path d={`M ${CUP.x - 5} ${CUP.y - 12} L ${CUP.x - 4} ${CUP.y - 3}`} stroke="var(--art-core)" strokeWidth={1} strokeOpacity={0.8} strokeLinecap="round" />
        </g>
        </g>
      </g>

      {/* A clay lamp just blown out, and its one thread of smoke */}
      <g {...part("blown-out")}>
        <g transform={LAMP_SET}>
        <ellipse cx={LAMP.x} cy={LAMP.y + 6} rx={36} ry={6} fill="var(--art-hair)" fillOpacity={0.14} />
        <path
          d={`M ${LAMP.x - 28} ${LAMP.y - 8} C ${LAMP.x - 24} ${LAMP.y + 6} ${LAMP.x + 14} ${LAMP.y + 8} ${LAMP.x + 22} ${LAMP.y - 2} L ${LAMP.x + 30} ${LAMP.y - 10} C ${LAMP.x + 20} ${LAMP.y - 12} ${LAMP.x - 10} ${LAMP.y - 14} ${LAMP.x - 28} ${LAMP.y - 8} Z`}
          fill={url("clay")}
          stroke="var(--gold)"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        <path
          d={`M ${LAMP.x - 24} ${LAMP.y - 8} C ${LAMP.x - 10} ${LAMP.y - 11} ${LAMP.x + 12} ${LAMP.y - 10} ${LAMP.x + 22} ${LAMP.y - 8}`}
          stroke="var(--art-musk)"
          strokeWidth={3}
          strokeOpacity={0.5}
          strokeLinecap="round"
        />
        <path d={`M ${LAMP.x + 2} ${LAMP.y - 8} Q ${LAMP.x + 10} ${LAMP.y - 10} ${LAMP.x + 14} ${LAMP.y - 12}`} stroke="var(--art-ivory)" strokeWidth={2.2} strokeLinecap="round" />
        <circle className="m-breathe" cx={LAMP.x + 14} cy={LAMP.y - 12} r={4.4} fill={url("ember")} />
        <circle cx={LAMP.x + 14} cy={LAMP.y - 12} r={1.2} fill="var(--art-ember)" />
        </g>
        <path className="m-shimmer" d={SMOKE} fill={url("smoke")} />
      </g>
    </svg>
  );
}
