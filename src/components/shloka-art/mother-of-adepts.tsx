/**
 * Shloka 97 — "Mistress of the thunderbolt, mother of the adepts".
 *
 * Seven names: two borrowed, one denied, three on one word, and fame. Under
 * the card her light stands in the whole root mantra, the vidyā already
 * accomplished, and at her feet the adepts' pale lamps, each kindled from her
 * by a thread of light. Down out of the crown the sky-going siddhas come to
 * her. At the right Indra's thunderbolt with a diamond at its heart, both
 * senses of vajra; at the left, the lovely and the left-hand side, the five
 * faces with Vāmadeva brought forward. In front, along a ground line, the six
 * changes every living thing goes through, seed to dust, with her light
 * nowhere among them; and a conch sounding, since fame is white. Which name
 * each part answers to is written up for readers in the registry, next to
 * this artwork's entry.
 */

import { Conch, diamond, FiveFaces, FiveFacesDefs, glint, Lamp, MantraClusterDefs, RootMantraRing, Vajra, artIds, partProps, polar, round, taper, through } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── Her light in the root mantra ──────────────────────────────────────── */

const HER = { x: 320, y: 524 };
const RING_R = 52;

/* ── The adepts' lamps, kindled from her ───────────────────────────────── */

const LAMPS = [
  { x: 252, y: 640, s: 1.9 },
  { x: 286, y: 656, s: 2.1 },
  { x: 320, y: 662, s: 2.2 },
  { x: 354, y: 656, s: 2.1 },
  { x: 388, y: 640, s: 1.9 },
].map((l, k) => {
  const flame = { x: l.x, y: round(l.y - 12 * l.s) };
  const from = polar(HER.x, HER.y, 80, (Math.atan2(HER.y - flame.y, flame.x - HER.x) * 180) / Math.PI);
  return {
    ...l,
    k,
    thread: `M ${from.x} ${from.y} Q ${round((from.x + flame.x) / 2)} ${round(flame.y - 6)} ${flame.x} ${round(flame.y - 4)}`,
  };
});

/* ── The sky-going siddhas, coming to her ──────────────────────────────── */

const SIDDHAS = [
  { from: { x: 196, y: 18 }, to: { x: 262, y: 40 }, r: 4 },
  { from: { x: 214, y: 52 }, to: { x: 296, y: 58 }, r: 4.6 },
  { from: { x: 404, y: 6 }, to: { x: 342, y: 26 }, r: 3.6 },
  { from: { x: 500, y: 48 }, to: { x: 382, y: 50 }, r: 5.2 },
  { from: { x: 520, y: 10 }, to: { x: 420, y: 22 }, r: 4.4 },
].map((s, k) => {
  const bend = {
    x: round((s.from.x + s.to.x) / 2),
    y: round((s.from.y + s.to.y) / 2 - Math.abs(s.to.x - s.from.x) * 0.08),
  };
  return {
    ...s,
    k,
    trail: taper(through([s.from, bend, s.to], 10), (t) => 0.2 + t * s.r * 0.7),
  };
});

/* ── Indra's thunderbolt, a diamond at its heart ───────────────────────── */

const BOLT = { x: 468, y: 538, s: 2.7, turn: 18 };
const GEM = diamond({ x: 0, y: 0, r: 6.4 });
const SPARKS = [
  { x: 0, y: -26, s: 4 },
  { x: 0, y: 26, s: 3.2 },
  { x: -8, y: -4, s: 2.4 },
];

/* ── The five faces, Vāmadeva forward ──────────────────────────────────── */

const FACES = { x: 176, y: 540, r: 36 };

/* ── The six changes, seed to dust ─────────────────────────────────────── */

const ROW = { x: 128, y: 728, s: 1.35 };
const GROUND_Y = 0;
const STAGES = [0, 30, 60, 92, 124, 154];
const LEAF = "M 0 0 C 3 -3.4 8 -3.4 11 0 C 8 3.4 3 3.4 0 0 Z";
const BLOOM = Array.from({ length: 5 }, (_, k) => k * 72);
const PETAL = "M 0 0 C -3 -3 -3 -7 0 -9 C 3 -7 3 -3 0 0 Z";

/* ── The conch, sounding ───────────────────────────────────────────────── */

const CONCH = { x: 432, y: 702, s: 1.25, turn: -6 };
const SOUND = [12, 21, 30].map((r) => {
  const c = { x: 478, y: 704 };
  const a = polar(c.x, c.y, r, -44);
  const b = polar(c.x, c.y, r, 44);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 0 0 ${b.x} ${b.y}`;
});

export function MotherOfAdepts({ idPrefix = "sa97", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <MantraClusterDefs id={id} />
        <FiveFacesDefs id={id} />
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("siddha")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.85 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bolt")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("fame")}>
          <stop offset="0" style={{ stopColor: "var(--art-ivory)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-ivory)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The sky-going siddhas, coming down to her out of the sky */}
      <g {...part("siddhesvari")}>
        {SIDDHAS.map((s) => (
          <g key={s.k}>
            <path d={s.trail} fill="var(--gold-soft)" fillOpacity={0.5} />
            <g className={TWINKLE[s.k % 3]}>
              <circle cx={s.to.x} cy={s.to.y} r={s.r * 4} fill={url("siddha")} />
              <circle cx={s.to.x} cy={s.to.y} r={s.r} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.8} />
            </g>
          </g>
        ))}
      </g>

      {/* Her light, and round it the fifteen-syllabled vidyā, accomplished from the start */}
      <g {...part("siddhavidya")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={120} fill={url("her")} opacity={0.45} />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={30} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={6} fill="var(--art-core)" />
        <circle cx={HER.x} cy={HER.y} r={10} stroke="var(--gold)" strokeWidth={0.9} />

        <RootMantraRing c={HER} r={RING_R} url={url} />
      </g>

      {/* The adepts' pale lamps at her feet, each lit from her */}
      <g {...part("siddhamata")}>
        {LAMPS.map((l) => (
          <path key={l.k} d={l.thread} stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.7} strokeDasharray="1 3" strokeLinecap="round" />
        ))}
        {LAMPS.map((l) => (
          <g key={l.k} transform={`translate(${l.x} ${l.y}) scale(${l.s})`}>
            <Lamp k={l.k % 3} seer />
          </g>
        ))}
      </g>

      {/* Indra's thunderbolt, hers, with a diamond at its heart */}
      <g {...part("vajra")}>
        <circle className="m-breathe" cx={BOLT.x} cy={BOLT.y} r={58} fill={url("bolt")} />
        <g transform={`translate(${BOLT.x} ${BOLT.y}) rotate(${BOLT.turn}) scale(${BOLT.s})`}>
          <g stroke="var(--gold)" strokeLinecap="round" strokeLinejoin="round">
            <Vajra />
          </g>
          <path d={GEM.girdle} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
          <path d={GEM.table} fill="var(--art-ivory)" stroke="var(--gold-soft)" strokeWidth={0.3} />
          <path d={GEM.facets} stroke="var(--gold-soft)" strokeWidth={0.3} />
          {SPARKS.map((p, k) => (
            <g key={k} transform={`translate(${p.x} ${p.y})`}>
              <path className={TWINKLE[k]} d={glint(p.s)} fill="var(--art-core)" />
            </g>
          ))}
        </g>
      </g>

      {/* The five faces at the left, the lovely one, Vāmadeva, brought forward */}
      <g {...part("vamadevi")}>
        <FiveFaces c={FACES} r={FACES.r} url={url} stress="vamadeva" />
      </g>

      {/* The six changes along a ground line, seed to dust; she is not among them */}
      <g {...part("ageless")}>
        <g transform={`translate(${ROW.x} ${ROW.y}) scale(${ROW.s})`}>
          <path d={`M ${STAGES[0] - 16} ${GROUND_Y} L ${STAGES[5] + 22} ${GROUND_Y}`} stroke="var(--gold-soft)" strokeWidth={0.8} strokeOpacity={0.7} strokeLinecap="round" />
          {/* comes into being: a seed splitting */}
          <g transform={`translate(${STAGES[0]} ${GROUND_Y})`}>
            <ellipse cy={-3.4} rx={5.4} ry={3.6} fill="var(--art-ember)" stroke="var(--gold)" strokeWidth={0.5} />
            <path d="M -1 -6.6 C 0 -9 1.6 -10 3 -10.6" stroke="var(--leaf)" strokeWidth={1.2} strokeLinecap="round" />
          </g>
          {/* exists: a sprout */}
          <g transform={`translate(${STAGES[1]} ${GROUND_Y})`}>
            <path d="M 0 0 C 0 -6 -1 -10 0 -14" stroke="var(--leaf)" strokeWidth={1.4} strokeLinecap="round" />
            <path d={LEAF} transform="translate(0 -14) rotate(-150) scale(0.8)" fill="var(--leaf)" />
            <path d={LEAF} transform="translate(0 -14) rotate(-30) scale(0.8)" fill="var(--leaf)" />
          </g>
          {/* grows: a sapling */}
          <g transform={`translate(${STAGES[2]} ${GROUND_Y})`}>
            <path d="M 0 0 C 1 -12 -1 -22 0 -34" stroke="var(--leaf)" strokeWidth={1.6} strokeLinecap="round" />
            {[
              [-12, -160],
              [-18, -20],
              [-25, -155],
              [-31, -30],
            ].map(([y, deg], k) => (
              <path key={k} d={LEAF} transform={`translate(0 ${y}) rotate(${deg})`} fill="var(--leaf)" />
            ))}
          </g>
          {/* alters: in flower */}
          <g transform={`translate(${STAGES[3]} ${GROUND_Y})`}>
            <path d="M 0 0 C 1 -16 -1 -30 0 -46" stroke="var(--leaf)" strokeWidth={1.8} strokeLinecap="round" />
            {[
              [-12, -160],
              [-18, -20],
              [-26, -155],
              [-33, -25],
            ].map(([y, deg], k) => (
              <path key={k} d={LEAF} transform={`translate(0 ${y}) rotate(${deg})`} fill="var(--leaf)" />
            ))}
            <g transform="translate(0 -48)">
              {BLOOM.map((deg) => (
                <path key={deg} d={PETAL} transform={`rotate(${deg})`} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.4} />
              ))}
              <circle r={2.4} fill="var(--art-turmeric)" />
            </g>
          </g>
          {/* wastes: bending, its leaves gone dry and a petal falling */}
          <g transform={`translate(${STAGES[4]} ${GROUND_Y})`}>
            <path d="M 0 0 C 1 -16 4 -30 14 -36 C 18 -38 20 -34 19 -28" stroke="var(--art-turmeric)" strokeWidth={1.6} strokeLinecap="round" />
            <path d={LEAF} transform="translate(1 -14) rotate(150)" fill="var(--art-turmeric)" fillOpacity={0.8} />
            <path d={LEAF} transform="translate(3 -24) rotate(40)" fill="var(--art-ember)" fillOpacity={0.8} />
            <g transform="translate(19 -27) rotate(180)">
              {BLOOM.slice(0, 3).map((deg) => (
                <path key={deg} d={PETAL} transform={`rotate(${deg - 72})`} fill="var(--art-ember)" stroke="var(--gold)" strokeWidth={0.3} />
              ))}
            </g>
            <path d={PETAL} transform="translate(26 -10) rotate(70)" fill="var(--art-ember)" fillOpacity={0.8} />
          </g>
          {/* perishes: the stalk lying where it fell */}
          <g transform={`translate(${STAGES[5]} ${GROUND_Y})`}>
            <path d="M -4 -1.2 C 6 -3 16 -2.6 24 -1.4" stroke="var(--art-musk)" strokeWidth={1.4} strokeOpacity={0.7} strokeLinecap="round" />
            <path d={LEAF} transform="translate(6 -2) rotate(-10) scale(0.8)" fill="var(--art-musk)" fillOpacity={0.5} />
            <path d={PETAL} transform="translate(-8 -1) rotate(80)" fill="var(--art-musk)" fillOpacity={0.4} />
          </g>
        </g>
      </g>

      {/* A conch, white as fame, sounding */}
      <g {...part("yasasvini")}>
        <circle cx={CONCH.x} cy={CONCH.y} r={44} fill={url("fame")} />
        <g transform={`translate(${CONCH.x} ${CONCH.y}) rotate(${CONCH.turn}) scale(${CONCH.s})`}>
          <Conch />
        </g>
        <g stroke="var(--gold-soft)" strokeWidth={1.1} strokeLinecap="round">
          {SOUND.map((d, i) => (
            <path key={i} className={TWINKLE[i]} d={d} />
          ))}
        </g>
      </g>
    </svg>
  );
}
