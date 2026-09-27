/**
 * Shloka 4 — "Flowering hair, a crown of rubies".
 *
 * The stotra's head-to-foot description begins here, and this artwork reads
 * from the top down: a tall crown set tier upon tier with rubies, throwing off
 * their light; beneath it her hair, never drawn as a mass, gathered at a point
 * of light into a plait woven from the four named flowers. Which name each
 * part answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { artIds, cubicAt, glint, partProps, round } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const CX = 320;

/** How far each band of the crown dips at the front, as a band round a cylinder seen from a little above. */
const SAG = 4;
const sagAt = (dx: number, hw: number) => SAG * (1 - (dx / hw) ** 2);

/** The crown's tiers, bottom to top. */
const TIERS = [
  { bottom: 184, top: 160, hwB: 72, hwT: 66, rubies: 9, r: 4.3 },
  { bottom: 160, top: 138, hwB: 62, hwT: 56, rubies: 7, r: 3.9 },
  { bottom: 138, top: 117, hwB: 52, hwT: 46, rubies: 7, r: 3.5 },
  { bottom: 117, top: 97, hwB: 42, hwT: 36, rubies: 5, r: 3.2 },
  { bottom: 97, top: 78, hwB: 32, hwT: 26, rubies: 3, r: 2.9 },
];
/** Each tier's crest of petal points covers this much of the tier above it. */
const PETAL_H = 8;

function tierPath(t: (typeof TIERS)[number]) {
  return [
    `M ${CX - t.hwB} ${t.bottom}`,
    `Q ${CX} ${t.bottom + 2 * SAG} ${CX + t.hwB} ${t.bottom}`,
    `L ${CX + t.hwT} ${t.top}`,
    `Q ${CX} ${t.top + 2 * SAG} ${CX - t.hwT} ${t.top}`,
    "Z",
  ].join(" ");
}

const tiers = TIERS.map((t, i) => {
  const hw = (t.hwB + t.hwT) / 2;
  const mid = i === 0 ? (t.top + t.bottom - 4) / 2 : (t.top + t.bottom - PETAL_H) / 2;
  const step = i === 0 ? 15 : round((2 * (hw - 9)) / (t.rubies - 1));
  const rubies = Array.from({ length: t.rubies }, (_, k) => {
    const dx = (k - (t.rubies - 1) / 2) * step;
    return { x: round(CX + dx), y: round(mid + sagAt(dx, hw)), front: i === 0 && dx === 0 };
  });
  const n = Math.floor((2 * t.hwT) / 9.5);
  const w = (2 * t.hwT) / n;
  const petals = Array.from({ length: n }, (_, k) => {
    const dx = -t.hwT + (k + 0.5) * w;
    return { x: round(CX + dx), y: round(t.top + sagAt(dx, t.hwT) + 1) };
  });
  return { ...t, d: tierPath(t), rubies, petals, petalHalf: round(w * 0.48) };
});

const crownPetal = (a: number) => `M ${-a} 0 Q ${-a} ${round(-PETAL_H * 0.6)} 0 ${-PETAL_H} Q ${a} ${round(-PETAL_H * 0.6)} ${a} 0 Z`;

/** Gold beads along the crown's lower rim. */
const rimBeads = Array.from({ length: 25 }, (_, k) => {
  const dx = -66 + k * 5.5;
  return { x: round(CX + dx), y: round(181 + sagAt(dx, 72)) };
});

/** The rubies that flash, and in which of three offset groups. */
const FLASHING: Record<string, number> = { "0-2": 0, "0-6": 1, "1-1": 2, "1-4": 0, "2-5": 1, "3-1": 2, "3-3": 0, "4-1": 1 };

/** The glitter thrown off the crown: short rays, alternately gold and ruby-red. */
const rays = Array.from({ length: 48 }, (_, k) => {
  const deg = k * 7.5;
  const t = (deg * Math.PI) / 180;
  const start = { x: CX + 96 * Math.cos(t), y: 112 - 104 * Math.sin(t) };
  const len = k % 2 ? 7 : 14;
  const end = { x: CX + (96 + len) * Math.cos(t), y: 112 - (104 + len) * Math.sin(t) };
  return { d: `M ${round(start.x)} ${round(start.y)} L ${round(end.x)} ${round(end.y)}`, red: k % 4 === 1 || k % 4 === 2 };
}).filter((_, k) => {
  const deg = k * 7.5;
  return deg < 200 || deg > 340;
});

/** Stars that are turning into rubies to be set in the crown, and a few that are still only stars. */
const STARS: { x: number; y: number; s: number; kind: "star" | "turning" | "ruby" }[] = [
  { x: 540, y: 26, s: 2.6, kind: "star" },
  { x: 512, y: 66, s: 3.4, kind: "star" },
  { x: 470, y: 34, s: 4, kind: "star" },
  { x: 424, y: 18, s: 3.4, kind: "turning" },
  { x: 384, y: 16, s: 3, kind: "turning" },
  { x: 352, y: 26, s: 2.3, kind: "ruby" },
  { x: 560, y: 112, s: 2.6, kind: "star" },
  { x: 198, y: 28, s: 3.4, kind: "star" },
  { x: 240, y: 12, s: 3, kind: "star" },
  { x: 272, y: 16, s: 3, kind: "turning" },
  { x: 294, y: 30, s: 2.1, kind: "ruby" },
];

/** Her hair behind the card, gathered from under the crown's rim down to the knot. */
const KNOT = { x: CX, y: 438 };
const strands = Array.from({ length: 13 }, (_, k) => {
  const x0 = -54 + 9 * k;
  const top = round(184 + sagAt(x0, 72) + 1);
  return `M ${CX + x0} ${top} C ${round(CX + x0 * 1.05)} 270 ${round(CX + x0 * 0.6)} 385 ${round(CX + x0 * 0.32)} ${KNOT.y - 2}`;
});
const GLOSS_STRANDS = [3, 6, 9];

/** The plait's centreline, from the knot down to its tip. */
const PLAIT: [Pt, Pt, Pt, Pt] = [
  { x: CX, y: KNOT.y + 4 },
  { x: 500, y: 500 },
  { x: 140, y: 575 },
  { x: 292, y: 648 },
];

const samples = (() => {
  const out: { p: Pt; s: number }[] = [];
  let s = 0;
  let prev = PLAIT[0];
  for (let i = 0; i <= 300; i++) {
    const p = cubicAt(...PLAIT, i / 300);
    s += Math.hypot(p.x - prev.x, p.y - prev.y);
    out.push({ p, s });
    prev = p;
  }
  return out;
})();
const PLAIT_LENGTH = samples[samples.length - 1].s;

/** The point `s` units down the plait, its unit tangent (pointing down the plait), and its unit normal. */
function alongPlait(s: number) {
  const i = Math.max(1, Math.min(samples.length - 1, samples.findIndex((e) => e.s >= s)));
  const a = samples[i - 1].p;
  const b = samples[i].p;
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const t = { x: (b.x - a.x) / len, y: (b.y - a.y) / len };
  return { p: b, t, n: { x: -t.y, y: t.x } };
}

const plaitWidth = (s: number) => 36 - 12 * (s / PLAIT_LENGTH);
/** Rotation (degrees) that turns a local "down" (+y) along the tangent t. */
const downAlong = (t: Pt) => round((Math.atan2(-t.x, t.y) * 180) / Math.PI);

const plaitBand = (() => {
  const left: string[] = [];
  const right: string[] = [];
  for (let k = 0; k <= 60; k++) {
    const s = (k / 60) * PLAIT_LENGTH;
    const { p, n } = alongPlait(s);
    const h = plaitWidth(s) / 2;
    left.push(`${round(p.x + n.x * h)} ${round(p.y + n.y * h)}`);
    right.push(`${round(p.x - n.x * h)} ${round(p.y - n.y * h)}`);
  }
  return `M ${left.join(" L ")} L ${right.reverse().join(" L ")} Z`;
})();

type Species = "campaka" | "asoka" | "punnaga" | "saugandhika";
const SPECIES: Species[] = ["campaka", "asoka", "punnaga", "saugandhika"];
const FLOWER_STEP = 23;

/** The flowers woven into the plait, one to each bend, in the order the name gives them. */
const flowers = Array.from({ length: Math.floor((PLAIT_LENGTH - 30) / FLOWER_STEP) + 1 }, (_, i) => {
  const s = 14 + i * FLOWER_STEP;
  const { p, n, t } = alongPlait(s);
  const side = i % 2 ? 1 : -1;
  const off = side * plaitWidth(s) * 0.2;
  return {
    species: SPECIES[i % 4],
    transform: `translate(${round(p.x + n.x * off)} ${round(p.y + n.y * off)}) rotate(${round(downAlong(t) + side * 18)}) scale(${round(1 - 0.26 * (s / PLAIT_LENGTH))})`,
  };
});

/** Where the plait's strands cross, glimpsed between the flowers. */
const crossings = flowers.map((_, i) => {
  const s = 14 + i * FLOWER_STEP + FLOWER_STEP / 2;
  const a = alongPlait(s - 7);
  const b = alongPlait(s + 3);
  const h = (plaitWidth(s) / 2) * 0.85;
  const L = { x: a.p.x + a.n.x * h, y: a.p.y + a.n.y * h };
  const R = { x: a.p.x - a.n.x * h, y: a.p.y - a.n.y * h };
  return `M ${round(L.x)} ${round(L.y)} Q ${round(b.p.x)} ${round(b.p.y)} ${round(R.x)} ${round(R.y)}`;
});

const tip = alongPlait(PLAIT_LENGTH);
const TIP_STRANDS = [-7, -4.5, -2, 0.5, 3, 5.5, 8];

/* The four flowers, each centred on the origin and about 26 units across. */

const CAMPAKA_PETALS = Array.from({ length: 9 }, (_, i) => ({ angle: i * 40 + (i % 2) * 6, l: i % 2 ? 11 : 13.5 }));
function campakaPetal(l: number) {
  const w = 2.6;
  const t = 2.2;
  return `M 0 0 C ${-w} ${round(-l * 0.35)} ${round(-w * 0.5 + t * 0.4)} ${round(-l * 0.8)} ${t} ${-l} C ${round(w * 0.3 + t)} ${round(-l * 0.7)} ${round(w * 1.1)} ${round(-l * 0.3)} 0 0 Z`;
}

/** Campaka: slender, pointed, slightly twisted petals of deep gold. */
function Campaka() {
  return (
    <g>
      <g fill="var(--art-core)" stroke="var(--art-saffron)" strokeWidth={0.5}>
        {CAMPAKA_PETALS.map((p, i) => (
          <path key={i} d={campakaPetal(p.l)} transform={`rotate(${p.angle})`} />
        ))}
      </g>
      <circle r={2.4} fill="var(--art-saffron)" />
    </g>
  );
}

const ASOKA_FLORETS = [
  { x: 0, y: 0, c: "var(--art-vermilion)" },
  { x: -6, y: -4, c: "var(--art-vermilion)" },
  { x: 6, y: -4, c: "var(--art-saffron)" },
  { x: -7, y: 4, c: "var(--art-saffron)" },
  { x: 7, y: 4, c: "var(--art-vermilion)" },
  { x: 0, y: -8, c: "var(--art-vermilion)" },
  { x: 0, y: 7.5, c: "var(--art-vermilion)" },
  { x: -11, y: -1, c: "var(--art-vermilion)" },
  { x: 11, y: -1, c: "var(--art-vermilion)" },
];
const asokaStamens = ASOKA_FLORETS.map((f) => {
  const len = Math.hypot(f.x, f.y) || 1;
  const d = f.x === 0 && f.y === 0 ? { x: 0.3, y: -1 } : { x: f.x / len, y: f.y / len };
  return { from: f, to: { x: round(f.x + d.x * 7), y: round(f.y + d.y * 7) } };
});

/** Aśoka: a dense round cluster of small four-lobed flowers, orange to red, with long stamens. */
function Asoka() {
  return (
    <g>
      <g stroke="var(--art-vermilion)" strokeWidth={0.55} strokeLinecap="round">
        {asokaStamens.map((st, i) => (
          <path key={i} d={`M ${st.from.x} ${st.from.y} L ${st.to.x} ${st.to.y}`} />
        ))}
      </g>
      {ASOKA_FLORETS.map((f, i) => (
        <g key={i} fill={f.c} transform={`translate(${f.x} ${f.y})`}>
          <circle cx={-2} r={2.2} />
          <circle cx={2} r={2.2} />
          <circle cy={-2} r={2.2} />
          <circle cy={2} r={2.2} />
        </g>
      ))}
      <g fill="var(--art-core)">
        {asokaStamens.map((st, i) => (
          <circle key={i} cx={st.to.x} cy={st.to.y} r={0.85} />
        ))}
      </g>
    </g>
  );
}

const PUNNAGA_PETAL = "M 0 -1 C -8 -3 -8.5 -12.5 0 -12.5 C 8.5 -12.5 8 -3 0 -1 Z";
const punnagaStamens = Array.from({ length: 12 }, (_, k) => {
  const t = (k * 30 * Math.PI) / 180;
  return { x: round(4.4 * Math.cos(t)), y: round(4.4 * Math.sin(t)) };
});

/** Punnāga: four rounded white petals round a dense gold boss of stamens. */
function Punnaga() {
  return (
    <g>
      <g fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.6}>
        {[45, 135, 225, 315].map((a) => (
          <path key={a} d={PUNNAGA_PETAL} transform={`rotate(${a})`} />
        ))}
      </g>
      <circle r={3.4} fill="var(--art-core)" />
      <g fill="var(--gold-soft)">
        {punnagaStamens.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={0.95} />
        ))}
      </g>
      <circle r={1.2} fill="var(--art-vermilion)" />
    </g>
  );
}

const lilyPetal = (l: number) =>
  `M 0 0 C -4.2 ${round(-l * 0.28)} -3.8 ${round(-l * 0.72)} 0 ${-l} C 3.8 ${round(-l * 0.72)} 4.2 ${round(-l * 0.28)} 0 0 Z`;

/** Saugandhika, the fragrant water-lily: a white star of pointed petals in two rings. */
function Saugandhika() {
  return (
    <g>
      <g fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.55}>
        {Array.from({ length: 8 }, (_, k) => (
          <path key={`o${k}`} d={lilyPetal(14)} transform={`rotate(${k * 45})`} />
        ))}
        {Array.from({ length: 8 }, (_, k) => (
          <path key={`i${k}`} d={lilyPetal(9.5)} transform={`rotate(${22.5 + k * 45})`} />
        ))}
      </g>
      <circle r={2.8} fill="var(--art-core)" stroke="var(--gold-soft)" strokeWidth={0.5} />
    </g>
  );
}

const FLOWER = { campaka: Campaka, asoka: Asoka, punnaga: Punnaga, saugandhika: Saugandhika };

function Ruby({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={round(r + 1.3)} ry={round(r * 1.15 + 1.3)} fill="var(--art-carve)" />
      <ellipse cx={x} cy={y} rx={r} ry={round(r * 1.15)} fill="var(--art-vermilion)" />
      <path
        d={`M ${round(x - r * 0.55)} ${round(y - r * 0.2)} Q ${round(x - r * 0.4)} ${round(y - r * 0.85)} ${round(x + r * 0.15)} ${round(y - r * 0.9)}`}
        stroke="var(--art-core)"
        strokeWidth={0.7}
        strokeLinecap="round"
      />
    </g>
  );
}

export function FloweringHair({ idPrefix = "sa4", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={CX} cy={200} r={260} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.42 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("fall")} x1={0} y1={186} x2={0} y2={KNOT.y} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.85 }} />
        </linearGradient>
        <radialGradient id={id("bindu")} cx={KNOT.x} cy={KNOT.y} r={40} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The crown, tier upon tier of rubies, and the light its stones throw off */}
      <g {...part("crown")}>
        <circle className="m-shimmer" cx={CX} cy={200} r={260} fill={url("glow")} />
        <g strokeWidth={0.9} strokeLinecap="round" strokeOpacity={0.7}>
          {rays.map((r, i) => (
            <path key={i} d={r.d} stroke={r.red ? "var(--art-vermilion)" : "var(--gold-soft)"} />
          ))}
        </g>
        <g fill="var(--gold)">
          <path d="M 298 80 C 298 67 311 63 314 57 L 326 57 C 329 63 342 67 342 80 Z" />
          <path d="M 320 30 C 329 38 331 48 326 58 L 314 58 C 309 48 311 38 320 30 Z" />
          <circle cx={CX} cy={26} r={2.6} />
        </g>
        <path d="M 302 72 Q 320 66 338 72" stroke="var(--art-carve)" strokeWidth={0.8} />
        <Ruby x={CX} y={46} r={3.6} />
        {tiers.map((t, i) => ({ t, i })).reverse().map(({ t, i }) => {
          return (
            <g key={t.bottom}>
              <path d={t.d} fill="var(--gold)" />
              <path
                d={`M ${CX - t.hwT + 1} ${t.top + 2.5} Q ${CX} ${t.top + 2.5 + 2 * SAG} ${CX + t.hwT - 1} ${t.top + 2.5}`}
                stroke="var(--art-carve)"
                strokeWidth={0.7}
              />
              {t.rubies.map((r, k) =>
                r.front ? (
                  <g key={k}>
                    <g fill="var(--gold-soft)">
                      {Array.from({ length: 8 }, (_, j) => (
                        <path key={j} d="M -2 0 Q -2 -3 0 -5 Q 2 -3 2 0 Z" transform={`translate(${r.x} ${r.y}) rotate(${j * 45}) translate(0 -7.6)`} />
                      ))}
                    </g>
                    <Ruby x={r.x} y={r.y} r={6.2} />
                  </g>
                ) : (
                  <Ruby key={k} x={r.x} y={r.y} r={t.r} />
                ),
              )}
              <g fill="var(--gold-soft)">
                {t.petals.map((p, k) => (
                  <path key={k} d={crownPetal(t.petalHalf)} transform={`translate(${p.x} ${p.y})`} />
                ))}
              </g>
              <g stroke="var(--art-carve)" strokeWidth={0.6} strokeLinecap="round">
                {t.petals.map((p, k) => (
                  <path key={k} d={`M ${p.x} ${round(p.y - 1.8)} V ${round(p.y - PETAL_H + 2.6)}`} />
                ))}
              </g>
              {t.rubies.map((r, k) => {
                const group = FLASHING[`${i}-${k}`];
                if (group === undefined && !r.front) return null;
                const s = r.front ? 7 : t.r * 1.5;
                return (
                  <g key={`g${k}`} transform={`translate(${round(r.x - (r.front ? 2.5 : t.r * 0.4))} ${round(r.y - (r.front ? 3.5 : t.r * 0.6))})`}>
                    <path
                      className={["m-lick", "m-lick m-late", "m-lick m-later"][group ?? 0]}
                      d={glint(round(s))}
                      fill="var(--art-core)"
                    />
                  </g>
                );
              })}
            </g>
          );
        })}
        <g fill="var(--gold-soft)">
          {rimBeads.map((b, k) => (
            <circle key={k} cx={b.x} cy={b.y} r={1.7} />
          ))}
        </g>
      </g>

      {/* Her hair, gathered from under the crown into a plait of the four flowers */}
      <g {...part("flower-plait")}>
        <g stroke={url("fall")} strokeWidth={1.1} strokeLinecap="round">
          {strands.map((d, k) => (
            <path key={k} d={d} />
          ))}
        </g>
        <g stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.4} strokeLinecap="round">
          {GLOSS_STRANDS.map((k) => (
            <path key={k} d={strands[k]} />
          ))}
        </g>
        <path d={`M ${CX - 17} ${KNOT.y - 4} H ${CX + 17} V ${KNOT.y + 5} H ${CX - 17} Z`} fill="var(--gold)" />
        <path d={`M ${CX - 17} ${KNOT.y - 1.5} H ${CX + 17} M ${CX - 17} ${KNOT.y + 2.5} H ${CX + 17}`} stroke="var(--art-carve)" strokeWidth={0.6} />
        <g className="m-sway">
          <path d={plaitBand} fill="var(--art-hair)" fillOpacity={0.9} />
          <g stroke="var(--gold-soft)" strokeWidth={0.8} strokeOpacity={0.55} strokeLinecap="round">
            {crossings.map((d, k) => (
              <path key={k} d={d} />
            ))}
          </g>
          {flowers.map((f, i) => {
            const Flower = FLOWER[f.species];
            return (
              <g key={i} transform={f.transform}>
                <Flower />
              </g>
            );
          })}
          <g transform={`translate(${round(tip.p.x)} ${round(tip.p.y)}) rotate(${downAlong(tip.t)})`}>
            <g stroke="var(--art-hair)" strokeWidth={1.1} strokeLinecap="round">
              {TIP_STRANDS.map((x) => (
                <path key={x} d={`M ${x} 2 Q ${round(x * 1.3)} 18 ${round(x * 1.7 + 3)} ${round(34 - Math.abs(x) * 0.8)}`} />
              ))}
            </g>
            <path d={`M 1 4 Q 2 18 5 32`} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.5} />
            <rect x={-11} y={-3} width={22} height={7} rx={1.5} fill="var(--gold)" />
            <path d="M -11 0.5 H 11" stroke="var(--art-carve)" strokeWidth={0.6} />
          </g>
        </g>
      </g>

      {/* Her presence, where a jewel is worn at the head of a plait: the bindu */}
      <g {...part("light")}>
        <circle cx={KNOT.x} cy={KNOT.y} r={12} fill="var(--art-saffron)" />
        <circle cx={KNOT.x} cy={KNOT.y} r={40} fill={url("bindu")} />
        <circle cx={KNOT.x} cy={KNOT.y} r={4.5} fill="var(--art-core)" />
        <circle cx={KNOT.x} cy={KNOT.y} r={9} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.85} />
      </g>

      {/* Stars becoming rubies, to be set in her crown */}
      <g {...part("stars")}>
        {STARS.map((s, i) => {
          const cls = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"][i % 3];
          if (s.kind === "ruby") {
            return (
              <g key={i} className={cls}>
                <Ruby x={s.x} y={s.y} r={s.s} />
              </g>
            );
          }
          return (
            <g key={i} transform={`translate(${s.x} ${s.y})`}>
              <path
                className={cls}
                d={glint(s.s)}
                fill={s.kind === "turning" ? "var(--art-vermilion)" : "var(--gold-soft)"}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
