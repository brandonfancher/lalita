/**
 * Shloka 78 — "The wish-yielding creeper, the loosened tether, and the rule of good conduct".
 *
 * Up the right column a slender post rises from the ground to a lamp, and the
 * wish-yielding creeper climbs it, hung with rubies and pearls: a creeper
 * cannot stand on its own, and grows where there is something to climb.
 * Under the card her light. At the left a stake with its rope untied and
 * lying slack, and the goat that was tethered to it walking free toward her.
 * Three dark wisps come in from the edges and are drawn into her light, and
 * thin out to nothing there: the false teachings gathered back, not
 * smashed. Along the road at the foot a wheel set rolling, its track behind
 * it. Which name each part answers to is written up for readers in the
 * registry, next to this artwork's entry.
 */

import { ChariotWheel, CreeperLeaf, Pearl, Ruby, along, artIds, creeperTendril, partProps, round, taper, through } from "./primitives";
import type { ArtProps } from "./types";

/* ── The post and the creeper climbing it ──────────────────────────────── */

const POST = { x: 560, foot: 594, top: 238 };
const CREEPER = through(
  Array.from({ length: 15 }, (_, k) => ({ x: round(POST.x + 9 * Math.sin(k * 1.35)), y: round(POST.foot - 6 - k * 24) })),
  12,
);
const CREEPER_PATH = taper(CREEPER, (t) => 3.2 - 1.8 * t);
const CREEPER_MARKS = along(CREEPER, 21, 14);
const LEAVES = CREEPER_MARKS.filter((_, i) => i % 3 !== 2).map((m, i) => {
  const side = i % 2 ? 1 : -1;
  return { x: m.x, y: m.y, turn: round(m.angle + side * 62), scale: round(0.85 - (m.s / 400) * 0.3) };
});
const JEWELS = CREEPER_MARKS.filter((_, i) => i % 3 === 2).map((m, i) => ({ x: round(m.x + (i % 2 ? 9 : -9)), y: m.y, ruby: i % 2 === 0, k: i }));
const TENDRILS = [CREEPER_MARKS[4], CREEPER_MARKS[9], CREEPER_MARKS[13]].map((m, i) => creeperTendril(m, i % 2 ? 1 : -1, 4, 1.6));

/* ── Her light, and the wisps drawn into it ────────────────────────────── */

const HER = { x: 320, y: 476 };
/** Smoke from the edges, wavering less as it nears her and thinning to nothing in her light. */
const WISP_ENDS = [
  { from: { x: 108, y: 446 }, to: { x: 302, y: 472 }, amp: 9, phase: 0 },
  { from: { x: 120, y: 616 }, to: { x: 308, y: 490 }, amp: 8, phase: 1.6 },
  { from: { x: 524, y: 444 }, to: { x: 338, y: 472 }, amp: 9, phase: 3.1 },
];
const WISPS = WISP_ENDS.flatMap((w, i) =>
  [0, 1].map((strand) => {
    const dx = w.to.x - w.from.x;
    const dy = w.to.y - w.from.y;
    const len = Math.hypot(dx, dy);
    const n = { x: -dy / len, y: dx / len };
    const pts = Array.from({ length: 13 }, (_, k) => {
      const t = k / 12;
      const off = (w.amp * (1 - t) + 1) * Math.sin(t * 9 + w.phase + strand * 1.3) + strand * 5 * (1 - t);
      return { x: round(w.from.x + dx * t + n.x * off), y: round(w.from.y + dy * t + n.y * off) };
    });
    const line = through(pts, 8);
    return { d: taper(line, (t) => (strand ? 2.2 : 4.4) * (1 - t) + 0.3), from: w.from, to: w.to, i, k: i * 2 + strand };
  }),
);

/** The stake, the goat and the wheel are drawn larger than laid out, about the road's middle. */
const NEAR = "translate(320 588) scale(1.25) translate(-320 -588)";

/* ── The stake, its rope untied, and the goat walking free ─────────────── */

const STAKE = { x: 166, foot: 586, top: 528 };
const ROPE = "M 170 538 C 176 556 182 578 194 586 C 210 594 224 586 216 580 C 208 574 198 588 222 591 C 236 592 244 589 250 587";
const GOAT = { x: 268, y: 584 };
const GOAT_BODY =
  "M -22 -26 C -12 -30 10 -30 18 -26 C 24 -23 25 -16 22 -12 C 18 -9 10 -9 4 -10 L -16 -10 C -22 -11 -26 -16 -26 -20 C -26 -23 -24 -25 -22 -26 Z";
const GOAT_HEAD = "M 13 -27 C 18 -32 22 -38 26 -40 C 30 -41 34 -38 36 -34 C 37 -31 35 -29 32 -30 C 28 -30 24 -26 20 -21 Z";
const GOAT_LEGS = [
  { x: -18, dx: -3 },
  { x: -12, dx: 2 },
  { x: 12, dx: -2 },
  { x: 18, dx: 4 },
];

/* ── The wheel set rolling ─────────────────────────────────────────────── */

const WHEEL = { x: 432, y: 566, r: 22 };
const GROUND = WHEEL.y + WHEEL.r;
const DUST = [
  { x: 404, y: GROUND - 3, r: 3.4 },
  { x: 394, y: GROUND - 6, r: 2.4 },
  { x: 386, y: GROUND - 2, r: 2 },
];

export function LoosenedTether({ idPrefix = "sa78", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.38" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("lamp")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.8 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        {WISP_ENDS.map((w, i) => (
          <linearGradient key={i} id={id(`wisp-${i}`)} x1={w.from.x} y1={w.from.y} x2={w.to.x} y2={w.to.y} gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.55 }} />
            <stop offset="0.7" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.2 }} />
            <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
          </linearGradient>
        ))}
        <linearGradient id={id("road")} x1={290} y1={0} x2={600} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-carve)", stopOpacity: 0 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-carve)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-carve)", stopOpacity: 0.1 }} />
        </linearGradient>
      </defs>

      {/* The wish-yielding creeper climbing its post up the right column */}
      <g {...part("creeper")}>
        <ellipse cx={POST.x} cy={POST.foot + 2} rx={16} ry={3} fill="var(--art-musk)" fillOpacity={0.25} />
        <path
          d={`M ${POST.x - 9} ${POST.foot} H ${POST.x + 9} V ${POST.foot - 8} H ${POST.x - 9} Z`}
          fill="var(--art-turmeric)"
          stroke="var(--gold)"
          strokeWidth={0.6}
        />
        <path d={`M ${POST.x} ${POST.foot - 8} V ${POST.top}`} stroke="var(--art-turmeric)" strokeWidth={5} />
        <path d={`M ${POST.x - 2.5} ${POST.foot - 8} V ${POST.top} M ${POST.x + 2.5} ${POST.foot - 8} V ${POST.top}`} stroke="var(--gold)" strokeWidth={0.5} />
        <path
          d={`M ${POST.x - 8} ${POST.top} H ${POST.x + 8} L ${POST.x + 5} ${POST.top - 5} H ${POST.x - 5} Z`}
          fill="var(--art-turmeric)"
          stroke="var(--gold)"
          strokeWidth={0.6}
        />
        <circle className="m-breathe" cx={POST.x} cy={POST.top - 12} r={14} fill={url("lamp")} />
        <path
          d={`M ${POST.x - 5} ${POST.top - 5} C ${POST.x - 5} ${POST.top - 1} ${POST.x + 5} ${POST.top - 1} ${POST.x + 5} ${POST.top - 5} Z`}
          fill="var(--art-ember)"
          stroke="var(--gold)"
          strokeWidth={0.4}
        />
        <path
          className="m-flicker"
          d={`M ${POST.x} ${POST.top - 5.4} C ${POST.x - 2.2} ${POST.top - 9} ${POST.x - 0.8} ${POST.top - 13} ${POST.x} ${POST.top - 15} C ${POST.x + 0.8} ${POST.top - 13} ${POST.x + 2.2} ${POST.top - 9} ${POST.x} ${POST.top - 5.4} Z`}
          fill="var(--art-saffron)"
        />
        <path d={CREEPER_PATH} fill="var(--art-hair)" />
        <path d={TENDRILS.join(" ")} stroke="var(--art-hair)" strokeWidth={1} />
        {LEAVES.map((l, i) => (
          <CreeperLeaf key={i} {...l} />
        ))}
        {JEWELS.map((j) => (
          <g key={j.k}>
            <path d={`M ${j.x + (j.x > POST.x ? -6 : 6)} ${j.y - 4} Q ${j.x} ${j.y - 6} ${j.x} ${j.y}`} stroke="var(--gold)" strokeWidth={0.6} />
            {j.ruby ? <Ruby x={j.x} y={j.y + 4} r={3.6} /> : <Pearl x={j.x} y={j.y + 4} r={3.8} />}
          </g>
        ))}
      </g>

      {/* Dark wisps from the edges, drawn into her light and thinning out there */}
      <g {...part("wisps")}>
        {WISPS.map((w) => (
          <path key={w.k} className={["m-shimmer", "m-shimmer m-late", "m-shimmer m-later"][w.i]} d={w.d} fill={url(`wisp-${w.i}`)} />
        ))}
      </g>

      {/* Her light */}
      <g {...part("her-light")}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={46} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={8.4} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={4} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.8} />
      </g>

      {/* The stake, its rope untied and slack */}
      <g {...part("tether")} transform={NEAR}>
        <ellipse cx={STAKE.x} cy={STAKE.foot + 1} rx={10} ry={2.4} fill="var(--art-musk)" fillOpacity={0.25} />
        <path
          d={`M ${STAKE.x - 4} ${STAKE.foot} L ${STAKE.x - 3} ${STAKE.top} L ${STAKE.x + 3} ${STAKE.top} L ${STAKE.x + 4} ${STAKE.foot} Z`}
          fill="var(--art-ember)"
          stroke="var(--gold)"
          strokeWidth={0.6}
        />
        <path
          d={`M ${STAKE.x - 6} ${STAKE.top} H ${STAKE.x + 6} L ${STAKE.x + 4} ${STAKE.top - 5} H ${STAKE.x - 4} Z`}
          fill="var(--art-turmeric)"
          stroke="var(--gold)"
          strokeWidth={0.5}
        />
        <ellipse cx={STAKE.x + 3} cy={STAKE.top + 10} rx={4} ry={2.4} stroke="var(--gold)" strokeWidth={1.2} />
        <path d={ROPE} stroke="var(--art-turmeric)" strokeWidth={2.4} strokeLinecap="round" />
        <path d={ROPE} stroke="var(--art-carve)" strokeWidth={0.6} strokeDasharray="1.4 1.8" />
        <path d="M 250 587 L 256 584 M 250 587 L 257 588 M 250 587 L 255 591" stroke="var(--art-turmeric)" strokeWidth={0.8} strokeLinecap="round" />
      </g>

      {/* The goat walking free toward her */}
      <g {...part("goat")} transform={NEAR}>
        <ellipse cx={GOAT.x} cy={GOAT.y + 1} rx={26} ry={2.6} fill="var(--art-musk)" fillOpacity={0.25} />
        <g transform={`translate(${GOAT.x} ${GOAT.y})`}>
          {GOAT_LEGS.map((l, i) => (
            <path key={i} d={`M ${l.x} -12 L ${l.x + l.dx} 0`} stroke="var(--art-ivory)" strokeWidth={2.4} strokeLinecap="round" />
          ))}
          {GOAT_LEGS.map((l, i) => (
            <path key={i} d={`M ${l.x + l.dx - 1.2} -0.6 H ${l.x + l.dx + 1.2}`} stroke="var(--art-hair)" strokeWidth={1.4} strokeLinecap="round" />
          ))}
          <path d="M -24 -23 L -31 -31 L -25 -21 Z" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
          <path d={GOAT_BODY} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path d="M -14 -28 C -8 -30 0 -29 4 -26 C 2 -21 -8 -20 -14 -22 Z" fill="var(--art-hair)" fillOpacity={0.7} />
          <path d={GOAT_HEAD} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path d="M 26 -40 C 22 -47 15 -47 12 -42" stroke="var(--art-hair)" strokeWidth={1.8} strokeLinecap="round" />
          <path d="M 25 -36 C 21 -34 18 -31 17 -28" stroke="var(--art-hair)" strokeOpacity={0.8} strokeWidth={2.4} strokeLinecap="round" />
          <path d="M 33 -30 L 32 -24 L 30 -29 Z" fill="var(--art-hair)" />
          <circle cx={30} cy={-36} r={1} fill="var(--art-hair)" />
        </g>
      </g>

      {/* A wheel set rolling along the road, its track behind it */}
      <g {...part("wheel")} transform={NEAR}>
        <path d={`M 290 ${GROUND} H 600`} stroke={url("road")} strokeWidth={1} />
        <path d={`M 330 ${GROUND - 0.5} H ${WHEEL.x}`} stroke="var(--art-carve)" strokeWidth={1.4} strokeOpacity={0.5} strokeDasharray="5 3" />
        {DUST.map((d, i) => (
          <circle
            key={i}
            className={["m-breathe", "m-breathe m-late", "m-breathe m-later"][i]}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="var(--art-musk)"
            fillOpacity={0.3}
          />
        ))}
        {[0, 1, 2].map((k) => {
          const r = WHEEL.r + 5 + k * 4;
          return (
            <path
              key={k}
              className={["m-shimmer", "m-shimmer m-late", "m-shimmer m-later"][k]}
              d={`M ${round(WHEEL.x - r * 0.5)} ${round(WHEEL.y - r * 0.87)} A ${r} ${r} 0 0 0 ${round(WHEEL.x - r * 0.97)} ${round(WHEEL.y + r * 0.26)}`}
              stroke="var(--gold-soft)"
              strokeWidth={0.8}
              strokeOpacity={round(0.8 - k * 0.2)}
              strokeLinecap="round"
            />
          );
        })}
        <g transform={`translate(${WHEEL.x} ${WHEEL.y}) rotate(8)`}>
          <ChariotWheel r={WHEEL.r} />
        </g>
      </g>
    </svg>
  );
}
