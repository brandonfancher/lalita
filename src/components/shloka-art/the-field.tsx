/**
 * Shloka 76 — "The field, the knower of the field, and the one who guards both".
 *
 * Under the card a field runs back in perspective, cut by its bunds into
 * plots at every stage at once: sprouting, ripe, reaped, flooded. Her light
 * stands over it and is the one thing on it that neither grows nor shrinks.
 * In the field a watch platform on four poles with the watcher's lamp on it,
 * and round the field and the platform both a fence of woven thorn. At the
 * near left corner a boundary stone carved with her mark; at the near right,
 * outside the fence, the field-guardian: a stone daubed with vermilion, a
 * trident and a lamp before it, and Bhairava's black dog sitting by it,
 * turned inward toward her. Which name each part answers to is written up
 * for readers in the registry, next to this artwork's entry.
 */

import { artIds, hash, partProps, round } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

/* ── The field in perspective ──────────────────────────────────────────── */

const TOP = { y: 456, x0: 222, x1: 418 };
const FOOT = { y: 598, x0: 112, x1: 528 };
const ROWS = [0, 0.26, 0.56, 1];
const COLS = [0, 0.25, 0.5, 0.75, 1];
const at = (u: number, v: number): Pt => {
  const y = TOP.y + (FOOT.y - TOP.y) * v;
  const x0 = TOP.x0 + (FOOT.x0 - TOP.x0) * v;
  const x1 = TOP.x1 + (FOOT.x1 - TOP.x1) * v;
  return { x: round(x0 + (x1 - x0) * u), y: round(y) };
};
type Stage = "sprouting" | "ripe" | "reaped" | "flooded";
const STAGES: Stage[][] = [
  ["ripe", "flooded", "sprouting", "ripe"],
  ["sprouting", "reaped", "ripe", "flooded"],
  ["flooded", "ripe", "reaped", "sprouting"],
];
/** A bund crossing, nudged so the plots are not a chessboard; the field's outer edge stays straight. */
const node = (c: number, r: number): Pt => {
  const inner = (k: number, n: number) => k > 0 && k < n;
  const du = inner(c, COLS.length - 1) ? (hash(c, r) - 0.5) * 0.08 : 0;
  const dv = inner(r, ROWS.length - 1) ? (hash(r + 7, c) - 0.5) * 0.08 : 0;
  return at(COLS[c] + du, ROWS[r] + dv);
};
const PLOTS = STAGES.flatMap((row, r) =>
  row.map((stage, c) => {
    const [a, b, d, e] = [node(c, r), node(c + 1, r), node(c + 1, r + 1), node(c, r + 1)];
    const quad = `M ${a.x} ${a.y} L ${b.x} ${b.y} L ${d.x} ${d.y} L ${e.x} ${e.y} Z`;
    const lines = [0.2, 0.4, 0.6, 0.8].map((u) => {
      const p = at(COLS[c] + (COLS[c + 1] - COLS[c]) * u, ROWS[r] + 0.02);
      const q = at(COLS[c] + (COLS[c + 1] - COLS[c]) * u, ROWS[r + 1] - 0.02);
      return { p, q };
    });
    const mid = at((COLS[c] + COLS[c + 1]) / 2, (ROWS[r] + ROWS[r + 1]) / 2);
    const depth = 0.5 + 0.5 * ((ROWS[r] + ROWS[r + 1]) / 2);
    return { key: `${r}-${c}`, stage, quad, lines, mid, depth };
  }),
);
const BUNDS = [...ROWS.map((_, r) => COLS.map((__, c) => node(c, r))), ...COLS.map((_, c) => ROWS.map((__, r) => node(c, r)))]
  .map((line) => line.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" "))
  .join(" ");

const dashes = (p: Pt, q: Pt, n: number, len: number) =>
  Array.from({ length: n }, (_, k) => {
    const t = (k + 0.5) / n;
    const x = round(p.x + (q.x - p.x) * t);
    const y = round(p.y + (q.y - p.y) * t);
    const l = round(len * (0.6 + 0.4 * t));
    return `M ${x} ${y} L ${x} ${round(y - l)}`;
  }).join(" ");

/* ── Her light ─────────────────────────────────────────────────────────── */

const HER = { x: 320, y: 474 };

/* ── The watch platform, and the fence round it all ────────────────────── */

const MACHAN = at(0.8, 0.66);
const POLES = [
  { x: -12, y: 4 },
  { x: 12, y: 4 },
  { x: -9, y: -2 },
  { x: 9, y: -2 },
];
const DECK_Y = -40;
const FENCE_LINE = [at(-0.04, -0.03), at(1.04, -0.03), at(1.04, 1.02), at(-0.04, 1.02)];
const fencePosts = () => {
  const out: Pt[] = [];
  for (let side = 0; side < 4; side++) {
    const a = FENCE_LINE[side];
    const b = FENCE_LINE[(side + 1) % 4];
    const n = side % 2 ? 7 : 11;
    for (let k = 0; k < n; k++) out.push({ x: round(a.x + ((b.x - a.x) * k) / n), y: round(a.y + ((b.y - a.y) * k) / n) });
  }
  return out;
};
const POSTS = fencePosts().map((p) => ({ ...p, h: round(6 + ((p.y - TOP.y) / (FOOT.y - TOP.y)) * 10) }));
const FENCE_PATH = `M ${FENCE_LINE.map((p) => `${p.x} ${p.y}`).join(" L ")} Z`;

/* ── The boundary stone, and the field-guardian ────────────────────────── */

const BOUNDARY = { x: 132, y: 584 };
const GUARDIAN = { x: 532, y: 572 };
const DOG = { x: 506, y: 584 };

export function TheField({ idPrefix = "sa76", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  const fill: Record<Stage, { c: string; o: number }> = {
    sprouting: { c: "var(--leaf)", o: 0.3 },
    ripe: { c: "var(--art-turmeric)", o: 0.4 },
    reaped: { c: "var(--art-ember)", o: 0.2 },
    flooded: { c: "var(--art-moon)", o: 0.3 },
  };

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.36" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.42 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("lamp")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.8 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("reflection")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.8 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("field-fade")} x1={0} y1={TOP.y} x2={0} y2={FOOT.y + 10} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity={0.55} />
          <stop offset="0.2" stopColor="white" stopOpacity={1} />
          <stop offset="0.8" stopColor="white" stopOpacity={1} />
          <stop offset="1" stopColor="white" stopOpacity={0.4} />
        </linearGradient>
        <mask id={id("field-mask")} maskUnits="userSpaceOnUse" x={90} y={440} width={460} height={180}>
          <rect x={90} y={440} width={460} height={180} fill={url("field-fade")} />
        </mask>
        <linearGradient id={id("sindura")} x1={0} y1={0} x2={1} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)" }} />
        </linearGradient>
      </defs>

      {/* The field, its plots at every stage at once */}
      <g {...part("field")} mask={`url(#${id("field-mask")})`}>
        {PLOTS.map((p) => (
          <g key={p.key}>
            <path d={p.quad} fill={fill[p.stage].c} fillOpacity={fill[p.stage].o} />
            {p.stage === "sprouting" && (
              <path d={p.lines.map((l) => dashes(l.p, l.q, 5, 4 * p.depth)).join(" ")} stroke="var(--leaf)" strokeWidth={1} strokeLinecap="round" />
            )}
            {p.stage === "ripe" && (
              <>
                <path d={p.lines.map((l) => dashes(l.p, l.q, 5, 7 * p.depth)).join(" ")} stroke="var(--gold)" strokeWidth={1.1} strokeLinecap="round" />
                <path d={p.lines.map((l) => dashes(l.p, l.q, 5, 7 * p.depth)).join(" ")} stroke="var(--art-turmeric)" strokeWidth={0.5} strokeLinecap="round" />
              </>
            )}
            {p.stage === "reaped" && (
              <path
                d={p.lines.map((l) => dashes(l.p, l.q, 6, 2.4 * p.depth)).join(" ")}
                stroke="var(--art-turmeric)"
                strokeWidth={0.9}
                strokeOpacity={0.8}
                strokeLinecap="round"
              />
            )}
            {p.stage === "flooded" && (
              <>
                <path
                  className="m-shimmer"
                  d={`M ${p.mid.x - 12 * p.depth} ${p.mid.y} H ${p.mid.x + 12 * p.depth} M ${p.mid.x - 6 * p.depth} ${p.mid.y + 4} H ${p.mid.x + 8 * p.depth}`}
                  stroke="var(--art-ivory)"
                  strokeWidth={0.8}
                  strokeLinecap="round"
                />
                <ellipse cx={p.mid.x} cy={p.mid.y - 3} rx={round(9 * p.depth)} ry={round(2.4 * p.depth)} fill={url("reflection")} />
              </>
            )}
          </g>
        ))}
        <path d={BUNDS} stroke="var(--art-musk)" strokeOpacity={0.5} strokeWidth={2.4} strokeLinecap="round" />
        <path d={BUNDS} stroke="var(--gold-soft)" strokeWidth={0.6} strokeLinecap="round" />
      </g>

      {/* Her light over the field, neither waxing nor waning */}
      <g {...part("her-light")}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={60} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={8.4} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={4} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.8} />
      </g>

      {/* A fence of woven thorn round the field and the watch platform in it */}
      <g {...part("fence")}>
        <path d={FENCE_PATH} stroke="var(--art-hair)" strokeOpacity={0.5} strokeWidth={1.6} strokeLinejoin="round" />
        <path d={FENCE_PATH} stroke="var(--gold)" strokeWidth={0.5} strokeDasharray="3 2" strokeLinejoin="round" />
        <path
          d={FENCE_PATH}
          transform="translate(0 -5)"
          stroke="var(--art-hair)"
          strokeOpacity={0.35}
          strokeWidth={1}
          strokeDasharray="5 2 1 2"
          strokeLinejoin="round"
        />
        {POSTS.map((p, i) => (
          <path key={i} d={`M ${p.x} ${p.y} V ${p.y - p.h}`} stroke="var(--gold)" strokeWidth={1.1} strokeLinecap="round" />
        ))}
        <g transform={`translate(${MACHAN.x} ${MACHAN.y}) scale(1.3)`}>
          {POLES.map((p, i) => (
            <path
              key={i}
              d={`M ${p.x} ${p.y} L ${p.x * 0.85} ${DECK_Y}`}
              stroke="var(--art-hair)"
              strokeOpacity={0.6}
              strokeWidth={1.6}
              strokeLinecap="round"
            />
          ))}
          <path
            d={`M -12 ${DECK_Y + 22} L 11 ${DECK_Y + 8} M 12 ${DECK_Y + 22} L -11 ${DECK_Y + 8}`}
            stroke="var(--art-hair)"
            strokeOpacity={0.45}
            strokeWidth={0.8}
          />
          <path
            d={`M -14 ${DECK_Y} L 14 ${DECK_Y} L 12 ${DECK_Y - 4} L -12 ${DECK_Y - 4} Z`}
            fill="var(--art-turmeric)"
            stroke="var(--gold)"
            strokeWidth={0.6}
          />
          <path d={`M -15 ${DECK_Y - 4} L 0 ${DECK_Y - 22} L 15 ${DECK_Y - 4}`} stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path d={`M -15 ${DECK_Y - 4} L 0 ${DECK_Y - 22} L 15 ${DECK_Y - 4} Z`} fill="var(--art-turmeric)" fillOpacity={0.3} />
          <circle className="m-breathe" cy={DECK_Y - 9} r={9} fill={url("lamp")} />
          <path d={`M -3 ${DECK_Y - 4} C -3 ${DECK_Y - 2} 3 ${DECK_Y - 2} 3 ${DECK_Y - 4} Z`} fill="var(--art-ember)" />
          <path
            className="m-flicker"
            d={`M 0 ${DECK_Y - 4.4} C -1.6 ${DECK_Y - 7} -0.6 ${DECK_Y - 10} 0 ${DECK_Y - 12} C 0.6 ${DECK_Y - 10} 1.6 ${DECK_Y - 7} 0 ${DECK_Y - 4.4} Z`}
            fill="var(--art-saffron)"
          />
        </g>
      </g>

      {/* The boundary stone carved with her mark */}
      <g {...part("boundary")}>
        <ellipse cx={BOUNDARY.x} cy={BOUNDARY.y + 2} rx={14} ry={2.6} fill="var(--art-musk)" fillOpacity={0.25} />
        <path
          d={`M ${BOUNDARY.x - 10} ${BOUNDARY.y + 2} L ${BOUNDARY.x - 9} ${BOUNDARY.y - 30} C ${BOUNDARY.x - 8} ${BOUNDARY.y - 38} ${BOUNDARY.x + 8} ${BOUNDARY.y - 38} ${BOUNDARY.x + 9} ${BOUNDARY.y - 30} L ${BOUNDARY.x + 10} ${BOUNDARY.y + 2} Z`}
          fill="var(--art-stone)"
          fillOpacity={0.8}
          stroke="var(--gold)"
          strokeWidth={0.8}
        />
        <path
          d={`M ${BOUNDARY.x - 6} ${BOUNDARY.y - 26} L ${BOUNDARY.x + 6} ${BOUNDARY.y - 26} L ${BOUNDARY.x} ${BOUNDARY.y - 15} Z`}
          stroke="var(--gold)"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        <circle cx={BOUNDARY.x} cy={BOUNDARY.y - 22.4} r={1.3} fill="var(--art-vermilion)" />
        <path
          d={`M ${BOUNDARY.x - 6} ${BOUNDARY.y - 8} H ${BOUNDARY.x + 6} M ${BOUNDARY.x - 5} ${BOUNDARY.y - 4} H ${BOUNDARY.x + 5}`}
          stroke="var(--art-carve)"
          strokeWidth={0.6}
          strokeOpacity={0.7}
        />
        <path
          d={`M ${BOUNDARY.x - 7} ${BOUNDARY.y - 31} C ${BOUNDARY.x - 4} ${BOUNDARY.y - 35} ${BOUNDARY.x + 2} ${BOUNDARY.y - 36} ${BOUNDARY.x + 5} ${BOUNDARY.y - 34}`}
          stroke="var(--art-moon)"
          strokeWidth={0.8}
          strokeOpacity={0.4}
        />
      </g>

      {/* The field-guardian outside the fence, and his dog, turned toward her */}
      <g {...part("guardian")}>
        <ellipse cx={GUARDIAN.x} cy={GUARDIAN.y + 12} rx={26} ry={3.4} fill="var(--art-musk)" fillOpacity={0.25} />
        <path
          d={`M ${GUARDIAN.x - 11} ${GUARDIAN.y + 12} C ${GUARDIAN.x - 14} ${GUARDIAN.y} ${GUARDIAN.x - 10} ${GUARDIAN.y - 16} ${GUARDIAN.x} ${GUARDIAN.y - 18} C ${GUARDIAN.x + 10} ${GUARDIAN.y - 16} ${GUARDIAN.x + 14} ${GUARDIAN.y} ${GUARDIAN.x + 11} ${GUARDIAN.y + 12} Z`}
          fill={url("sindura")}
          stroke="var(--gold)"
          strokeWidth={0.8}
        />
        <circle cx={GUARDIAN.x - 3.6} cy={GUARDIAN.y - 6} r={2} fill="var(--art-ivory)" />
        <circle cx={GUARDIAN.x + 3.6} cy={GUARDIAN.y - 6} r={2} fill="var(--art-ivory)" />
        <circle cx={GUARDIAN.x - 3.4} cy={GUARDIAN.y - 5.8} r={0.9} fill="var(--art-hair)" />
        <circle cx={GUARDIAN.x + 3.8} cy={GUARDIAN.y - 5.8} r={0.9} fill="var(--art-hair)" />
        <path d={`M ${GUARDIAN.x - 4} ${GUARDIAN.y - 12} H ${GUARDIAN.x + 4}`} stroke="var(--art-ivory)" strokeWidth={0.8} />
        <path
          d={`M ${GUARDIAN.x - 7} ${GUARDIAN.y + 2} C ${GUARDIAN.x - 3} ${GUARDIAN.y + 4} ${GUARDIAN.x + 3} ${GUARDIAN.y + 4} ${GUARDIAN.x + 7} ${GUARDIAN.y + 2}`}
          stroke="var(--art-moon)"
          strokeWidth={1.4}
          strokeOpacity={0.7}
        />
        <g transform={`translate(${GUARDIAN.x + 18} ${GUARDIAN.y + 12})`}>
          <path d="M 0 0 V -38" stroke="var(--art-hair)" strokeOpacity={0.7} strokeWidth={1.4} />
          <path
            d="M 0 -38 V -48 M -7 -36 C -8 -42 -6 -46 -5 -48 M 7 -36 C 8 -42 6 -46 5 -48 M -7 -36 H 7"
            stroke="var(--art-hair)"
            strokeOpacity={0.7}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
          <path
            d="M 0 -38 V -48 M -7 -36 C -8 -42 -6 -46 -5 -48 M 7 -36 C 8 -42 6 -46 5 -48 M -7 -36 H 7"
            stroke="var(--gold)"
            strokeWidth={0.4}
            strokeLinecap="round"
          />
          <path d="M -3 -28 C -1 -26 1 -26 3 -28" stroke="var(--art-vermilion)" strokeWidth={1.2} />
        </g>
        <g transform={`translate(${GUARDIAN.x - 2} ${GUARDIAN.y + 14})`}>
          <circle className="m-breathe" cy={-4} r={6} fill={url("lamp")} />
          <path d="M -4 0 C -4 2 4 2 4 0 Z" fill="var(--art-ember)" stroke="var(--gold)" strokeWidth={0.4} />
          <path className="m-flicker" d="M 0 -0.6 C -1.4 -3 -0.6 -5.6 0 -7.4 C 0.6 -5.6 1.4 -3 0 -0.6 Z" fill="var(--art-saffron)" />
        </g>
        <g transform={`translate(${DOG.x} ${DOG.y}) scale(-1 1)`}>
          <path
            d="M -8 0 C -10 -6 -8 -12 -4 -15 L -4 -22 C -4 -25 -1 -27 2 -26 L 6 -25 L 9 -23 L 6 -21 L 3 -21 C 3 -18 4 -14 6 -10 C 8 -6 9 -2 8 0 Z"
            fill="var(--art-hair)"
            stroke="var(--gold)"
            strokeWidth={0.5}
            strokeLinejoin="round"
          />
          <path d="M -2 -26 L -1 -31 L 1 -26 Z" fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.4} />
          <path d="M -8 0 C -14 -1 -16 -4 -15 -8" stroke="var(--art-hair)" strokeWidth={1.6} strokeLinecap="round" />
          <circle cx={3.4} cy={-23.6} r={0.8} fill="var(--art-core)" />
          <path d="M 0 -18 C 2 -17 4 -17 5 -18.4" stroke="var(--art-vermilion)" strokeWidth={0.8} />
        </g>
      </g>
    </svg>
  );
}
