/**
 * Shloka 77 — "Tender to whoever bows, and seated in the ring of fire".
 *
 * Under the card her light sits low, in the fire maṇḍala: an upward red
 * triangle fringed with flame. From her the letters go out in an arc, the
 * vowels the alphabet begins with: whoever speaks, she is the one speaking.
 * The grass on either side bends toward her. At the right a cow lowers her
 * head to lick her calf; at the left a lotus leaf on its pool holds a drop of
 * water it cannot be wetted by, and a victory banner streams from its staff
 * behind it. Down the right column from the crown falls a plait of her hair,
 * dark, with jasmine and red flowers worked into it. Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { Cow, PlaitLobes, PlaitTip, artIds, downAlong, partProps, plait, polar, round, tongue } from "./primitives";
import type { ArtProps } from "./types";

/* ── The fire maṇḍala, and her light in it ─────────────────────────────── */

const FIRE = { x: 320, apex: 470, base: 552, half: 50 };
const HER = { x: 320, y: 526 };
const TRIANGLE = `M ${FIRE.x} ${FIRE.apex} L ${FIRE.x + FIRE.half} ${FIRE.base} L ${FIRE.x - FIRE.half} ${FIRE.base} Z`;
const FLAMES = (() => {
  const corners = [
    { x: FIRE.x, y: FIRE.apex },
    { x: FIRE.x + FIRE.half, y: FIRE.base },
    { x: FIRE.x - FIRE.half, y: FIRE.base },
  ];
  const out: { x: number; y: number; deg: number; h: number; k: number }[] = [];
  corners.forEach((a, side) => {
    const b = corners[(side + 1) % 3];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const outward = round((Math.atan2(dx, -dy) * 180) / Math.PI);
    const n = side === 2 ? 6 : 5;
    for (let k = 0; k < n; k++) {
      const t = (k + 0.5) / n;
      out.push({ x: round(a.x + dx * t), y: round(a.y + dy * t), deg: outward, h: 9 + ((k * 5 + side * 3) % 4) * 2, k: out.length });
    }
  });
  return out;
})();

/* ── The letters going out from her ────────────────────────────────────── */

const LETTERS = ["अ", "आ", "इ", "ई", "उ"].map((ch, i) => {
  const p = polar(HER.x, HER.y, 76, 152 - i * 31);
  return { ch, ...p, i };
});

/* ── Grass bending toward her ──────────────────────────────────────────── */

const TUFTS = [128, 164, 236, 262, 378, 404, 548, 584].map((x, i) => ({ x, y: 570 + ((i * 3) % 4), lean: x < HER.x ? 1 : -1 }));
const BLADES = [-4, -2, 0, 2, 4].map((dx, k) => ({ dx, h: 12 + ((k * 7) % 5) * 2 }));

/* ── The cow and her calf ──────────────────────────────────────────────── */

const COW = { x: 476, y: 578 };
const CALF = { x: 410, y: 578, s: 0.5 };

/* ── The lotus leaf and its drop, the banner ───────────────────────────── */

const LEAF = { x: 196, y: 554, rx: 34, ry: 15 };
const LEAF_VEINS = [120, 160, 200, 240, 280, 320, 0, 40, 60].map((deg) => {
  const a = (deg * Math.PI) / 180;
  return `M ${LEAF.x} ${LEAF.y} L ${round(LEAF.x + LEAF.rx * 0.92 * Math.cos(a))} ${round(LEAF.y + LEAF.ry * 0.92 * Math.sin(a))}`;
}).join(" ");
const DROP = { x: 186, y: 550 };
const STAFF = { x: 132, foot: 574, top: 448 };
const BANNER = `M ${STAFF.x} ${STAFF.top + 6} C ${STAFF.x + 20} ${STAFF.top + 2} ${STAFF.x + 36} ${STAFF.top + 12} ${STAFF.x + 62} ${STAFF.top + 8} L ${STAFF.x + 50} ${STAFF.top + 18} L ${STAFF.x + 60} ${STAFF.top + 28} C ${STAFF.x + 36} ${STAFF.top + 30} ${STAFF.x + 20} ${STAFF.top + 24} ${STAFF.x} ${STAFF.top + 30} Z`;

/* ── Her hair, down the right column ───────────────────────────────────── */

const HAIR = plait(
  [
    { x: 584, y: -10 },
    { x: 570, y: 120 },
    { x: 596, y: 250 },
    { x: 580, y: 392 },
  ],
  (s, length) => 28 - 11 * (s / length),
  13,
  5,
);

export function RingOfFire({ idPrefix = "sa77", active = null }: ArtProps) {
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
        <linearGradient id={id("fire")} x1={0} y1={FIRE.apex} x2={0} y2={FIRE.base} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.55 }} />
        </linearGradient>
        <linearGradient id={id("flame")} x1={0} y1={1} x2={0} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)" }} />
        </linearGradient>
        <radialGradient id={id("drop")} cx="0.35" cy="0.3" r="0.7">
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-moon)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)" }} />
        </radialGradient>
      </defs>

      {/* A plait of her hair down the right column, with jasmine and red flowers in it */}
      <g {...part("hair")}>
        <PlaitLobes p={HAIR} />
        {HAIR.lobes.map((l, i) =>
          i % 3 === 1 ? (
            <g key={i} transform={`translate(${l.c.x} ${l.c.y})`}>
              {[0, 72, 144, 216, 288].map((deg) => (
                <ellipse key={deg} cx={0} cy={-2.6} rx={1.4} ry={2.6} transform={`rotate(${deg})`} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.3} />
              ))}
              <circle r={1.2} fill="var(--art-turmeric)" />
            </g>
          ) : (
            <ellipse
              key={i}
              cx={l.c.x}
              cy={l.c.y}
              rx={1.5}
              ry={2.4}
              transform={`rotate(${round(downAlong(l.t) + l.side * 20)} ${l.c.x} ${l.c.y})`}
              fill="var(--art-ivory)"
              stroke="var(--gold)"
              strokeWidth={0.3}
            />
          ),
        )}
        <PlaitTip p={HAIR} />
      </g>

      {/* A victory banner streaming from its staff */}
      <g {...part("banner")}>
        <path d={`M ${STAFF.x} ${STAFF.foot} V ${STAFF.top}`} stroke="var(--art-turmeric)" strokeWidth={2.4} strokeLinecap="round" />
        <path d={`M ${STAFF.x} ${STAFF.foot} V ${STAFF.top}`} stroke="var(--gold)" strokeWidth={0.6} />
        <path d={`M ${STAFF.x - 3} ${STAFF.top} C ${STAFF.x - 3} ${STAFF.top - 6} ${STAFF.x + 3} ${STAFF.top - 6} ${STAFF.x + 3} ${STAFF.top} Z`} fill="var(--gold)" />
        <circle cx={STAFF.x} cy={STAFF.top - 8} r={2} fill="var(--gold)" />
        <g className="m-shimmer">
          <path d={BANNER} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path d={BANNER} transform={`translate(${STAFF.x * 0.12} ${(STAFF.top + 18) * 0.12}) scale(0.88)`} stroke="var(--art-turmeric)" strokeWidth={0.6} strokeDasharray="2 2" />
        </g>
        <ellipse cx={STAFF.x} cy={STAFF.foot + 1} rx={8} ry={2} fill="var(--art-musk)" fillOpacity={0.25} />
      </g>

      {/* A lotus leaf on its pool, holding a drop it cannot be wetted by */}
      <g {...part("leaf")}>
        <ellipse cx={LEAF.x + 4} cy={LEAF.y + 6} rx={LEAF.rx + 18} ry={LEAF.ry + 4} fill="var(--art-moon)" fillOpacity={0.3} />
        <ellipse className="m-shimmer" cx={LEAF.x + 30} cy={LEAF.y + 12} rx={12} ry={1.4} stroke="var(--art-ivory)" strokeWidth={0.6} />
        <path
          d={`M ${LEAF.x} ${LEAF.y} L ${LEAF.x + 5} ${LEAF.y + LEAF.ry} A ${LEAF.rx} ${LEAF.ry} 0 1 0 ${LEAF.x - 5} ${LEAF.y + LEAF.ry} Z`}
          fill="var(--leaf)"
          stroke="var(--gold)"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <path d={LEAF_VEINS} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.7} />
        <ellipse cx={DROP.x} cy={DROP.y + 2.4} rx={4.4} ry={1.2} fill="var(--art-hair)" fillOpacity={0.25} />
        <circle cx={DROP.x} cy={DROP.y} r={4} fill={url("drop")} stroke="var(--gold)" strokeWidth={0.5} />
        <circle className="m-twinkle" cx={DROP.x - 1.4} cy={DROP.y - 1.4} r={1} fill="var(--art-core)" />
      </g>

      {/* Grass on either side, bending toward her */}
      <g {...part("grass")}>
        {TUFTS.map((t, i) => (
          <g key={i} transform={`translate(${t.x} ${t.y})`}>
            {BLADES.map((b, k) => (
              <path
                key={k}
                d={`M ${b.dx} 0 Q ${b.dx + t.lean * 2} ${-b.h * 0.6} ${b.dx + t.lean * (5 + b.h * 0.3)} ${-b.h}`}
                stroke="var(--leaf)"
                strokeWidth={1.2}
                strokeLinecap="round"
              />
            ))}
          </g>
        ))}
      </g>

      {/* The cow licking her calf */}
      <g {...part("cow")}>
        <ellipse cx={COW.x - 20} cy={COW.y} rx={74} ry={4} fill="var(--art-musk)" fillOpacity={0.22} />
        <g transform={`translate(${CALF.x} ${CALF.y}) scale(${-CALF.s} ${CALF.s})`}>
          <Cow />
        </g>
        <g transform={`translate(${COW.x} ${COW.y})`}>
          <Cow />
        </g>
      </g>

      {/* The fire maṇḍala, and her light seated in it */}
      <g {...part("fire")}>
        {FLAMES.map((f) => (
          <g key={f.k} transform={`translate(${f.x} ${f.y}) rotate(${f.deg})`}>
            <path className={["m-flicker", "m-flicker m-late", "m-flicker m-later"][f.k % 3]} d={tongue(f.h, 6, f.k % 2 ? 1.4 : -1.4)} fill={url("flame")} />
          </g>
        ))}
        <path d={TRIANGLE} fill={url("fire")} stroke="var(--gold)" strokeWidth={1.4} strokeLinejoin="round" />
        <path d={TRIANGLE} transform={`translate(${FIRE.x * 0.24} ${HER.y * 0.24}) scale(0.76)`} stroke="var(--art-core)" strokeWidth={0.7} strokeOpacity={0.7} strokeLinejoin="round" />
      </g>
      <g {...part("her-light")}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={40} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={8} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={3.8} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.8} />
      </g>

      {/* The letters going out from her */}
      <g {...part("letters")}>
        {LETTERS.map((l) => (
          <text
            key={l.i}
            className={["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"][l.i % 3]}
            x={l.x}
            y={l.y + 5}
            textAnchor="middle"
            fontSize={19}
            fill="var(--gold)"
            stroke="var(--gold)"
            strokeWidth={0.3}
            style={{ fontFamily: "var(--font-tiro), serif" }}
          >
            {l.ch}
          </text>
        ))}
      </g>
    </svg>
  );
}
