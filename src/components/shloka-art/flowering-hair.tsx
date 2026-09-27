/**
 * Shloka 4 — "Flowering hair, a crown of rubies".
 *
 * The stotra's head-to-foot description begins here, and this artwork reads
 * from the top down: a tall crown set tier upon tier with rubies, throwing off
 * their light; beneath it her hair, never drawn as a mass, gathered at a point
 * of light into a rosette and a plait woven from the four named flowers.
 * Which name each part answers to is written up for readers in the registry,
 * next to this artwork's entry.
 */

import { artIds, campakaPetal, cubicAt, partProps, round, Ruby, RubyCrown, Star } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const CX = 320;

/** Stars that are turning into rubies to be set in the crown, and a few that are still only stars. */
const STARS: { x: number; y: number; s: number; kind: "star" | "turning" | "ruby" }[] = [
  { x: 548, y: 30, s: 3, kind: "star" },
  { x: 514, y: 70, s: 3.6, kind: "star" },
  { x: 474, y: 34, s: 4.4, kind: "star" },
  { x: 428, y: 16, s: 3.8, kind: "turning" },
  { x: 388, y: 14, s: 3.2, kind: "turning" },
  { x: 354, y: 22, s: 2.3, kind: "ruby" },
  { x: 566, y: 118, s: 2.8, kind: "star" },
  { x: 196, y: 26, s: 3.8, kind: "star" },
  { x: 240, y: 10, s: 3.2, kind: "star" },
  { x: 274, y: 14, s: 3.2, kind: "turning" },
  { x: 290, y: 26, s: 2.1, kind: "ruby" },
];

/* ── Her hair and the four flowers ─────────────────────────────────────── */

/** The rosette at the head of the plait, and the bindu at its heart. */
const KNOT = { x: CX, y: 458 };
const ROSETTE_R = 37;

/** The plait's centreline, from under the rosette down to its tip. */
const PLAIT: [Pt, Pt, Pt, Pt] = [
  { x: CX, y: KNOT.y + 18 },
  { x: 430, y: 560 },
  { x: 190, y: 612 },
  { x: 300, y: 712 },
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
  const found = samples.findIndex((e) => e.s >= s);
  const i = Math.max(1, found < 0 ? samples.length - 1 : found);
  const a = samples[i - 1].p;
  const b = samples[i].p;
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const t = { x: (b.x - a.x) / len, y: (b.y - a.y) / len };
  return { p: b, t, n: { x: -t.y, y: t.x } };
}

const plaitWidth = (s: number) => 48 - 18 * (s / PLAIT_LENGTH);
/** Rotation (degrees) that turns a local "down" (+y) along the tangent t. */
const downAlong = (t: Pt) => round((Math.atan2(-t.x, t.y) * 180) / Math.PI);

type Species = "campaka" | "asoka" | "punnaga" | "saugandhika";
const SPECIES: Species[] = ["campaka", "asoka", "punnaga", "saugandhika"];
const LOBE_STEP = 15;

/**
 * The plait: lobes of hair laid alternately from each side, each with a
 * flower worked into it, the four kinds in the order the name gives them.
 */
const lobes = Array.from({ length: Math.floor((PLAIT_LENGTH - 12) / LOBE_STEP) + 1 }, (_, i) => {
  const s = 6 + i * LOBE_STEP;
  const { p, n, t } = alongPlait(s);
  const side = i % 2 ? 1 : -1;
  const w = plaitWidth(s);
  const c = { x: round(p.x + n.x * side * w * 0.2), y: round(p.y + n.y * side * w * 0.2) };
  const len = round(w * 0.5);
  return {
    lobe: `M 0 ${-len} A ${round(len * 0.44)} ${len} 0 1 1 0 ${len} A ${round(len * 0.44)} ${len} 0 1 1 0 ${-len} Z`,
    sheen: `M ${round(len * 0.12)} ${round(-len * 0.72)} Q ${round(len * 0.46)} 0 ${round(len * 0.12)} ${round(len * 0.72)}`,
    at: `translate(${c.x} ${c.y}) rotate(${round(downAlong(t) - side * 36)})`,
    flower: `translate(${c.x} ${c.y}) rotate(${round(downAlong(t) + side * 20)}) scale(${round(1.06 - 0.3 * (s / PLAIT_LENGTH))})`,
    species: SPECIES[i % 4],
  };
});

const tip = alongPlait(PLAIT_LENGTH);
const TIP_STRANDS = [-6, -4, -2, 0, 2, 4, 6];

const rosette = Array.from({ length: 12 }, (_, k) => {
  const deg = -90 + k * 30;
  const t = (deg * Math.PI) / 180;
  return {
    species: SPECIES[k % 4],
    transform: `translate(${round(KNOT.x + ROSETTE_R * Math.cos(t))} ${round(KNOT.y + ROSETTE_R * Math.sin(t))}) rotate(${deg + 90})`,
  };
});

/* The four flowers, each centred on the origin and about 26 units across. */

const CAMPAKA_PETALS = Array.from({ length: 9 }, (_, i) => ({ angle: i * 40 + (i % 2) * 6, l: i % 2 ? 11 : 13.5 }));

/** Campaka: slender, pointed, slightly twisted petals of deep gold. */
function Campaka() {
  return (
    <g>
      <g fill="var(--art-core)" stroke="var(--art-saffron)" strokeWidth={0.55}>
        {CAMPAKA_PETALS.map((p, i) => (
          <path key={i} d={campakaPetal(p.l)} transform={`rotate(${p.angle})`} />
        ))}
      </g>
      <circle r={2.4} fill="var(--art-saffron)" />
    </g>
  );
}

const ASOKA_FLORETS = [
  { x: 0, y: -1, c: "var(--art-vermilion)" },
  { x: -6.5, y: -3.5, c: "var(--art-vermilion)" },
  { x: 6.5, y: -3.5, c: "var(--art-saffron)" },
  { x: -5, y: 4.5, c: "var(--art-saffron)" },
  { x: 5, y: 4.5, c: "var(--art-vermilion)" },
  { x: 0, y: -8, c: "var(--art-vermilion)" },
  { x: 0, y: 7, c: "var(--art-vermilion)" },
];
const ASOKA_PETAL = "M 0 -0.6 C -1.5 -1.4 -1.4 -3.6 0 -3.8 C 1.4 -3.6 1.5 -1.4 0 -0.6 Z";
const asokaStamens = Array.from({ length: 11 }, (_, k) => {
  const t = ((-90 + (k - 5) * 30) * Math.PI) / 180;
  const r0 = 5;
  const r1 = k % 2 ? 12.5 : 14.5;
  return {
    d: `M ${round(r0 * Math.cos(t))} ${round(r0 * Math.sin(t))} Q ${round(((r0 + r1) / 2) * Math.cos(t) + 1)} ${round(((r0 + r1) / 2) * Math.sin(t))} ${round(r1 * Math.cos(t))} ${round(r1 * Math.sin(t))}`,
    tip: { x: round(r1 * Math.cos(t)), y: round(r1 * Math.sin(t)) },
  };
});

/** Aśoka: a dense round cluster of small four-petalled flowers, orange to red, with long stamens. */
function Asoka() {
  return (
    <g>
      <g stroke="var(--art-vermilion)" strokeWidth={0.55} strokeLinecap="round">
        {asokaStamens.map((st, i) => (
          <path key={i} d={st.d} />
        ))}
      </g>
      {ASOKA_FLORETS.map((f, i) => (
        <g key={i} fill={f.c} transform={`translate(${f.x} ${f.y}) rotate(${i * 17})`}>
          {[0, 90, 180, 270].map((a) => (
            <path key={a} d={ASOKA_PETAL} transform={`rotate(${a})`} />
          ))}
          <circle r={0.8} fill="var(--art-core)" />
        </g>
      ))}
      <g fill="var(--art-core)">
        {asokaStamens.map((st, i) => (
          <circle key={i} cx={st.tip.x} cy={st.tip.y} r={0.9} />
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

export function FloweringHair({ idPrefix = "sa4", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={CX} cy={210} r={270} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.42 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("lit")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.95 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.55 }} />
        </radialGradient>
        <radialGradient id={id("bindu")} cx={KNOT.x} cy={KNOT.y} r={30} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The crown, tier upon tier of rubies, and the light its stones throw off */}
      <g {...part("crown")}>
        <circle cx={CX} cy={210} r={270} fill={url("glow")} />
        <RubyCrown cx={CX} rays={(r) => r.left > 212} />
      </g>

      {/* Her hair, gathered from under the crown into a rosette and a plait of the four flowers */}
      <g {...part("flower-plait")}>
        <g className="m-sway">
          <g fill="var(--art-hair)">
            {lobes.map((l, i) => (
              <path key={i} d={l.lobe} transform={l.at} />
            ))}
          </g>
          <g stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.6} strokeLinecap="round">
            {lobes.map((l, i) => (
              <path key={i} d={l.sheen} transform={l.at} />
            ))}
          </g>
          {lobes.map((l, i) => {
            const Flower = FLOWER[l.species];
            return (
              <g key={i} transform={l.flower}>
                <Flower />
              </g>
            );
          })}
          <g transform={`translate(${round(tip.p.x)} ${round(tip.p.y)}) rotate(${downAlong(tip.t)})`}>
            <g stroke="var(--art-hair)" strokeWidth={1.1} strokeLinecap="round">
              {TIP_STRANDS.map((x) => (
                <path key={x} d={`M ${x} 2 Q ${round(x * 1.3)} 16 ${round(x * 1.7 + 3)} ${round(30 - Math.abs(x) * 0.8)}`} />
              ))}
            </g>
            <rect x={-10} y={-3} width={20} height={7} rx={1.5} fill="var(--gold)" />
            <path d="M -10 0.5 H 10" stroke="var(--art-carve)" strokeWidth={0.6} />
          </g>
        </g>
        <circle cx={KNOT.x} cy={KNOT.y} r={ROSETTE_R + 4} fill="var(--art-hair)" />
        {rosette.map((f, i) => {
          const Flower = FLOWER[f.species];
          return (
            <g key={i} transform={f.transform}>
              <Flower />
            </g>
          );
        })}
      </g>

      {/* Her presence, where a jewel is worn at the head of a plait: the bindu */}
      <g {...part("light")}>
        <circle cx={KNOT.x} cy={KNOT.y} r={ROSETTE_R - 11} fill={url("lit")} />
        <circle cx={KNOT.x} cy={KNOT.y} r={12} fill="var(--art-saffron)" />
        <circle cx={KNOT.x} cy={KNOT.y} r={30} fill={url("bindu")} />
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
          return <Star key={i} x={s.x} y={s.y} s={s.s} className={cls} fill={s.kind === "turning" ? "var(--art-vermilion)" : undefined} />;
        })}
      </g>
    </svg>
  );
}
