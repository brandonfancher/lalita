/**
 * Shloka 80 — "Consciousness, and what the word 'that' was pointing at".
 *
 * Under the card her light, bare: a point and the faint rings it sends out,
 * with nothing in it to be lit. In the crown the seven sages of the Great
 * Bear, and beside the star Vasiṣṭha the faint star Arundhatī, shown the way
 * teachers show it, by way of the bright one first. Across the crown a thin
 * paring of moon. Below, three different flowers at the left, and bees
 * carrying from each along their own paths to one comb hanging at the right,
 * where the honey is all one gold. Which name each part answers to is written
 * up for readers in the registry, next to this artwork's entry.
 */

import { artIds, partProps, polar, round } from "./primitives";
import type { ArtProps } from "./types";

/* ── Her light ─────────────────────────────────────────────────────────── */

const HER = { x: 320, y: 470 };
const RINGS = [16, 30, 46, 64];

/* ── The Great Bear, Vasiṣṭha and Arundhatī ────────────────────────────── */

const BEAR = { x: 120, y: 54, s: 1.5 };
const SAGES = [
  { x: 0, y: 6, r: 3 },
  { x: 6, y: 40, r: 2.4 },
  { x: 54, y: 50, r: 2.2 },
  { x: 62, y: 16, r: 1.8 },
  { x: 98, y: 22, r: 2.6 },
  { x: 132, y: 30, r: 2.5 },
  { x: 168, y: 60, r: 2.5 },
].map((p) => ({ x: round(BEAR.x + p.x * BEAR.s), y: round(BEAR.y + p.y * BEAR.s), r: round(p.r * 1.25) }));
const VASISTHA = SAGES[5];
const ARUNDHATI = { x: VASISTHA.x + 9, y: VASISTHA.y - 11, r: 1 };
const BEAR_LINE = [0, 1, 2, 3, 0, 3, 4, 5, 6].map((i) => SAGES[i]);

/* ── The paring of moon ────────────────────────────────────────────────── */

const MOON = { x: 492, y: 100, r: 30 };
const PARING = `M ${MOON.x} ${MOON.y - MOON.r} A ${MOON.r} ${MOON.r} 0 0 0 ${MOON.x} ${MOON.y + MOON.r} A ${round(MOON.r * 1.04)} ${round(MOON.r * 1.04)} 0 0 1 ${MOON.x} ${MOON.y - MOON.r} Z`;

/* ── The flowers, the bees and the comb ────────────────────────────────── */

const COMB = { x: 544, y: 486 };
const FLOWERS = [
  { kind: "hibiscus", x: 150, y: 548, stem: 34, color: "var(--art-vermilion)" },
  { kind: "jasmine", x: 196, y: 566, stem: 22, color: "var(--art-ivory)" },
  { kind: "kadamba", x: 240, y: 552, stem: 30, color: "var(--art-turmeric)" },
] as const;
const PATHS = FLOWERS.map((f, i) => {
  const end = { x: COMB.x - 26, y: COMB.y + 26 + i * 8 };
  const lift = 40 - i * 18;
  return {
    d: `M ${f.x} ${f.y - 6} C ${f.x + 60} ${f.y - 40 - lift} ${end.x - 120} ${end.y + 50 - lift} ${end.x} ${end.y}`,
    from: f,
    end,
    bee: { t: [0.3, 0.55, 0.78][i] },
  };
});
/** A point on a cubic path string written as above. */
function onPath(d: string, t: number) {
  const n = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
  const [x0, y0, x1, y1, x2, y2, x3, y3] = n;
  const u = 1 - t;
  const b = (a: number, c: number, e: number, g: number) => u * u * u * a + 3 * u * u * t * c + 3 * u * t * t * e + t * t * t * g;
  const db = (a: number, c: number, e: number, g: number) => 3 * u * u * (c - a) + 6 * u * t * (e - c) + 3 * t * t * (g - e);
  return { x: round(b(x0, x1, x2, x3)), y: round(b(y0, y1, y2, y3)), deg: round((Math.atan2(db(y0, y1, y2, y3), db(x0, x1, x2, x3)) * 180) / Math.PI) };
}
const COMB_PATH = "M -30 0 C -32 22 -22 52 0 66 C 22 52 32 22 30 0 Z";
const CELLS = (() => {
  const cells: { x: number; y: number }[] = [];
  for (let r = 0; r < 7; r++) {
    for (let c = -4; c <= 4; c++) {
      const x = c * 7 + (r % 2 ? 3.5 : 0);
      const y = 6 + r * 6;
      const half = 30 - Math.max(0, y - 22) * 0.62;
      if (Math.abs(x) < half - 4) cells.push({ x: round(x), y });
    }
  }
  return cells;
})();
const HEX = Array.from({ length: 6 }, (_, k) => polar(0, 0, 3.4, 90 + k * 60))
  .map((p, k) => `${k ? "L" : "M"} ${round(p.x)} ${round(p.y)}`)
  .join(" ");

function Bee() {
  return (
    <g>
      <ellipse
        cx={-1}
        cy={-3.4}
        rx={3.4}
        ry={2}
        transform="rotate(-24 -1 -3.4)"
        fill="var(--art-ivory)"
        fillOpacity={0.85}
        stroke="var(--gold-soft)"
        strokeWidth={0.3}
      />
      <ellipse
        cx={2}
        cy={-3}
        rx={2.8}
        ry={1.7}
        transform="rotate(20 2 -3)"
        fill="var(--art-ivory)"
        fillOpacity={0.7}
        stroke="var(--gold-soft)"
        strokeWidth={0.3}
      />
      <ellipse rx={4.4} ry={2.4} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.4} />
      <path d="M -1.2 -2.2 L -1.2 2.2 M 1.2 -2.3 L 1.2 2.3" stroke="var(--art-hair)" strokeWidth={0.9} />
      <circle cx={4.6} r={1.6} fill="var(--art-hair)" />
    </g>
  );
}

export function OneSavour({ idPrefix = "sa80", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("star")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("moon-glow")}>
          <stop offset="0.3" style={{ stopColor: "var(--art-core)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        {PATHS.map((p, i) => (
          <linearGradient key={i} id={id(`path-${i}`)} x1={p.from.x} y1={0} x2={p.end.x} y2={0} gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: p.from.color }} />
            <stop offset="0.8" style={{ stopColor: "var(--gold)" }} />
          </linearGradient>
        ))}
        <linearGradient id={id("honey")} x1={0} y1={0} x2={0} y2={66} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-turmeric)" }} />
        </linearGradient>
      </defs>

      {/* The seven sages, and the faint star beside Vasiṣṭha */}
      <g {...part("arundhati")}>
        <path
          d={BEAR_LINE.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ")}
          stroke="var(--gold-soft)"
          strokeWidth={0.6}
          strokeOpacity={0.55}
          strokeDasharray="1 4"
          strokeLinecap="round"
        />
        {SAGES.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r={s.r * 3.4} fill={url("star")} fillOpacity={0.5} />
            <circle
              className={i % 2 ? "m-twinkle m-late" : "m-twinkle"}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="var(--art-core)"
              stroke="var(--gold)"
              strokeWidth={0.5}
            />
          </g>
        ))}
        <path
          d={`M ${SAGES[4].x + 4} ${SAGES[4].y - 6} Q ${VASISTHA.x - 10} ${VASISTHA.y - 22} ${ARUNDHATI.x - 3} ${ARUNDHATI.y - 4}`}
          stroke="var(--art-saffron)"
          strokeWidth={0.8}
          strokeDasharray="2 3"
          strokeLinecap="round"
        />
        <circle cx={ARUNDHATI.x} cy={ARUNDHATI.y} r={6} stroke="var(--art-saffron)" strokeWidth={0.9} />
        <circle className="m-twinkle m-later" cx={ARUNDHATI.x} cy={ARUNDHATI.y} r={ARUNDHATI.r} fill="var(--art-core)" />
      </g>

      {/* A paring of moon */}
      <g {...part("paring")}>
        <circle cx={MOON.x - MOON.r * 0.7} cy={MOON.y} r={MOON.r * 1.2} fill={url("moon-glow")} />
        <path d={PARING} transform={`rotate(-30 ${MOON.x} ${MOON.y})`} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.7} strokeLinejoin="round" />
      </g>

      {/* Her light, bare */}
      <g {...part("her-light")}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={58} fill={url("her")} />
        {RINGS.map((r, i) => (
          <circle key={r} cx={HER.x} cy={HER.y} r={r} stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.75 - i * 0.16} />
        ))}
        <circle cx={HER.x} cy={HER.y} r={4} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.6} />
      </g>

      {/* Three different flowers */}
      <g {...part("flowers")}>
        {FLOWERS.map((f) => (
          <g key={f.kind} transform={`translate(${f.x} ${f.y}) scale(1.5) translate(${-f.x} ${-f.y})`}>
            <path
              d={`M ${f.x} ${f.y} C ${f.x - 3} ${f.y + f.stem * 0.5} ${f.x + 2} ${f.y + f.stem * 0.8} ${f.x} ${f.y + f.stem}`}
              stroke="var(--leaf)"
              strokeWidth={1.4}
            />
            <path
              d={`M ${f.x} ${f.y + f.stem * 0.6} C ${f.x - 8} ${f.y + f.stem * 0.5} ${f.x - 14} ${f.y + f.stem * 0.56} ${f.x - 16} ${f.y + f.stem * 0.66} C ${f.x - 10} ${f.y + f.stem * 0.72} ${f.x - 4} ${f.y + f.stem * 0.7} ${f.x} ${f.y + f.stem * 0.6} Z`}
              fill="var(--leaf)"
            />
            {f.kind === "hibiscus" && (
              <g transform={`translate(${f.x} ${f.y})`}>
                {[0, 72, 144, 216, 288].map((a) => (
                  <path
                    key={a}
                    transform={`rotate(${a})`}
                    d="M 0 0 C -6 -3 -9 -10 -5 -14 C -2 -16 2 -16 5 -14 C 9 -10 6 -3 0 0 Z"
                    fill={f.color}
                    stroke="var(--art-crimson)"
                    strokeWidth={0.5}
                  />
                ))}
                <path d="M 0 0 L 6 -16" stroke="var(--art-crimson)" strokeWidth={1} />
                <circle cx={6} cy={-16} r={1.6} fill="var(--art-saffron)" />
              </g>
            )}
            {f.kind === "jasmine" && (
              <g transform={`translate(${f.x} ${f.y})`}>
                {[0, 60, 120, 180, 240, 300].map((a) => (
                  <path
                    key={a}
                    transform={`rotate(${a})`}
                    d="M 0 0 C -3 -3 -3 -7 0 -9 C 3 -7 3 -3 0 0 Z"
                    fill={f.color}
                    stroke="var(--gold)"
                    strokeWidth={0.4}
                  />
                ))}
                <circle r={1.4} fill="var(--art-turmeric)" />
              </g>
            )}
            {f.kind === "kadamba" && (
              <g transform={`translate(${f.x} ${f.y})`}>
                <circle r={9} fill={f.color} stroke="var(--gold)" strokeWidth={0.6} />
                {Array.from({ length: 14 }, (_, k) => {
                  const p = polar(0, 0, 9, k * (360 / 14));
                  const q = polar(0, 0, 12, k * (360 / 14));
                  return (
                    <path
                      key={k}
                      d={`M ${round(p.x)} ${round(p.y)} L ${round(q.x)} ${round(q.y)}`}
                      stroke="var(--art-ivory)"
                      strokeWidth={1}
                      strokeLinecap="round"
                    />
                  );
                })}
                <circle cx={-3} cy={-3} r={2.4} fill="var(--art-core)" fillOpacity={0.5} />
              </g>
            )}
          </g>
        ))}
      </g>

      {/* Bees carrying from each flower along their own paths */}
      <g {...part("bees")}>
        {PATHS.map((p, i) => (
          <path key={i} d={p.d} stroke={url(`path-${i}`)} strokeWidth={0.9} strokeOpacity={0.8} strokeDasharray="1.4 4" strokeLinecap="round" />
        ))}
        {PATHS.map((p, i) => {
          const at = onPath(p.d, p.bee.t);
          return (
            <g key={i} transform={`translate(${at.x} ${at.y}) rotate(${at.deg}) scale(2.2)`}>
              <g className={["m-dart", "m-dart m-late", "m-dart m-later"][i]}>
                <Bee />
                <circle cx={-6} r={1.3} fill={p.from.color} stroke="var(--gold)" strokeWidth={0.3} />
              </g>
            </g>
          );
        })}
      </g>

      {/* The comb, hanging from a bough at the right, its honey one gold */}
      <g {...part("honey")}>
        <path
          d={`M 640 ${COMB.y - 22} C 610 ${COMB.y - 14} 580 ${COMB.y - 6} ${COMB.x - 40} ${COMB.y - 4}`}
          stroke="var(--art-ember)"
          strokeWidth={6}
          strokeLinecap="round"
        />
        <path
          d={`M 640 ${COMB.y - 22} C 610 ${COMB.y - 14} 580 ${COMB.y - 6} ${COMB.x - 40} ${COMB.y - 4}`}
          stroke="var(--gold)"
          strokeWidth={0.6}
          strokeOpacity={0.6}
        />
        <g transform={`translate(${COMB.x} ${COMB.y})`}>
          <path d={COMB_PATH} fill={url("honey")} stroke="var(--gold)" strokeWidth={1} />
          {CELLS.map((c, k) => (
            <path key={k} transform={`translate(${c.x} ${c.y})`} d={`${HEX} Z`} stroke="var(--art-carve)" strokeWidth={0.5} strokeOpacity={0.5} />
          ))}
          <path d="M -18 8 C -18 26 -12 42 -4 52" stroke="var(--art-core)" strokeWidth={1.2} strokeOpacity={0.5} strokeLinecap="round" />
          <g className="m-sink" style={{ ["--dur" as string]: "5s" }}>
            <path d="M 0 64 C -3 70 -3 74 0 75 C 3 74 3 70 0 64 Z" fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.5} />
          </g>
        </g>
      </g>
    </svg>
  );
}
