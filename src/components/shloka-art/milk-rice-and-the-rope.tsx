/**
 * Shloka 99 — "Milk-rice, the skin, and terror to the bound".
 *
 * The second half of the throat wheel's portrait: her food, her tissue, her
 * effect on the bound, her retinue, and last her name. Under the card the
 * throat's wheel again, and on its sixteen petals the sixteen powers, Amṛtā
 * at the top, white as the nectar she is named for; the moon in the crown
 * keeps the sixteen digits she shares with them. At the centre the one the
 * verse names last, her light a pale red. At the left the seven layers of
 * the body, from the skin in, with only the skin lit; in front a bowl of
 * milk-rice, and at the right a tethered goat whose rope has just been cut.
 * Which name each part answers to is written up for readers in the registry,
 * next to this artwork's entry.
 */

import { CakraWheel, Flash, Goat, artIds, partProps, polar, round } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── The throat's wheel and its sixteen powers ─────────────────────────── */

const WHEEL = { x: 320, y: 548, r0: 34, r1: 92 };
const POWERS = Array.from({ length: 16 }, (_, k) => ({
  ...polar(WHEEL.x, WHEEL.y, 68, 90 - k * 22.5),
  k,
}));
const MOON = { x: 488, y: 100, r: 22 };

/* ── The seven layers, from the skin in ────────────────────────────────── */

const STRATA = { x0: 132, x1: 196, y0: 470, h: 16 };
/** What each layer will be lit in when its wheel comes: skin, blood, flesh, fat, bone, marrow, essence. */
const TISSUE = ["var(--art-turmeric)", "var(--art-vermilion)", "var(--lotus)", "var(--art-moon)", "var(--art-ivory)", "var(--gold-soft)", "var(--art-core)"];
/** A boundary between layers, a little uneven, left to right. */
const edge = (y: number, phase: number) =>
  Array.from({ length: 7 }, (_, i) => ({
    x: round(STRATA.x0 + ((STRATA.x1 - STRATA.x0) * i) / 6),
    y: round(y + Math.sin(i * 1.3 + phase) * 1.6),
  }));
const line = (ps: { x: number; y: number }[]) => ps.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");
const LAYERS = Array.from({ length: 7 }, (_, k) => {
  const upper = edge(STRATA.y0 + k * STRATA.h, k);
  const lower = edge(STRATA.y0 + (k + 1) * STRATA.h, k + 1).reverse();
  return { k, upper: line(upper), d: `${line([...upper, ...lower])} Z` };
});

/* ── The bowl of milk-rice ─────────────────────────────────────────────── */

const BOWL = { x: 200, y: 700 };
const GRAINS = Array.from({ length: 30 }, (_, k) => {
  const a = k * 2.399;
  const r = Math.sqrt((k + 0.5) / 30);
  return {
    x: round(BOWL.x + Math.cos(a) * r * 26),
    y: round(BOWL.y - 1 + Math.sin(a) * r * 5),
    turn: round((a * 57.3) % 180),
    k,
  };
});
const THREADS = [
  { x: -12, y: -2, turn: 20 },
  { x: 4, y: 1, turn: -30 },
  { x: 14, y: -2, turn: 50 },
  { x: -2, y: -3, turn: 80 },
];

/* ── The tethered goat, its rope cut ───────────────────────────────────── */

const GOAT = { x: 470, y: 730, s: 1.4 };
const NECK = { x: round(GOAT.x + 17 * GOAT.s), y: round(GOAT.y - 26 * GOAT.s) };
const PEG = { x: 350, y: 732 };
const CUT = { x: 398, y: 712 };
const ROPE_FROM_PEG = `M ${PEG.x + 1} ${PEG.y - 15} C ${PEG.x + 14} ${PEG.y - 10} ${CUT.x - 18} ${CUT.y + 8} ${CUT.x - 6} ${CUT.y + 2}`;
const ROPE_FROM_NECK = `M ${NECK.x} ${NECK.y} C ${NECK.x - 14} ${NECK.y + 4} ${CUT.x + 22} ${CUT.y - 6} ${CUT.x + 6} ${CUT.y - 2}`;

export function MilkRiceAndTheRope({ idPrefix = "sa99", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("ruddy")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.3" style={{ stopColor: "var(--sindura)", stopOpacity: 0.75 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("wheel")}>
          <stop offset="0" style={{ stopColor: "var(--lotus)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--lotus)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("power")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.8 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("moon")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.65 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("skin")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("cut")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.85 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("shadow")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.28 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The throat's wheel, and the sixteen powers on its petals, Amṛtā first; the moon of sixteen digits */}
      <g {...part("amrta")}>
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r * 2.6} fill={url("moon")} />
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.4} />
        <circle cx={MOON.x - 6} cy={MOON.y - 5} r={MOON.r * 0.38} fill="var(--art-ivory)" fillOpacity={0.55} />
        <CakraWheel c={WHEEL} n={16} r0={WHEEL.r0} r1={WHEEL.r1} fill="var(--lotus)" sign="space" glow={url("wheel")} />
        {POWERS.map((p) =>
          p.k === 0 ? (
            <g key={p.k}>
              <circle className="m-breathe" cx={p.x} cy={p.y} r={18} fill={url("moon")} />
              <circle cx={p.x} cy={p.y} r={6} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.9} />
              <circle cx={p.x - 1.6} cy={p.y - 1.6} r={2} fill="var(--art-ivory)" />
            </g>
          ) : (
            <g key={p.k} className={TWINKLE[p.k % 3]}>
              <circle cx={p.x} cy={p.y} r={10} fill={url("power")} />
              <circle cx={p.x} cy={p.y} r={3.4} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.7} />
            </g>
          ),
        )}
      </g>

      {/* At the centre the one the verse names last: Ḍākinī, her light a pale red */}
      <g {...part("dakini")}>
        <circle className="m-breathe" cx={WHEEL.x} cy={WHEEL.y} r={50} fill={url("ruddy")} />
        <circle cx={WHEEL.x} cy={WHEEL.y} r={5.4} fill="var(--art-core)" />
      </g>

      {/* The seven layers of the body from the skin in, the skin alone lit */}
      <g {...part("skin")}>
        <ellipse cx={(STRATA.x0 + STRATA.x1) / 2} cy={STRATA.y0} rx={52} ry={16} fill={url("skin")} />
        {LAYERS.map((l) => (
          <path
            key={l.k}
            d={l.d}
            fill={TISSUE[l.k]}
            fillOpacity={l.k === 0 ? 0.85 : 0.16}
            stroke="var(--gold)"
            strokeWidth={l.k === 0 ? 0.9 : 0.5}
            strokeOpacity={l.k === 0 ? 1 : 0.45}
            strokeLinejoin="round"
          />
        ))}
        <path d={LAYERS[0].upper} stroke="var(--art-core)" strokeWidth={1.6} strokeLinecap="round" />
      </g>

      {/* A bowl of milk-rice, the offering she likes */}
      <g {...part("payasa")}>
        <g transform={`translate(${BOWL.x} ${BOWL.y}) scale(1.35) translate(${-BOWL.x} ${-BOWL.y})`}>
          <ellipse cx={BOWL.x} cy={BOWL.y + 22} rx={36} ry={5} fill={url("shadow")} />
          <path
            d={`M ${BOWL.x - 36} ${BOWL.y} C ${BOWL.x - 34} ${BOWL.y + 16} ${BOWL.x - 18} ${BOWL.y + 22} ${BOWL.x} ${BOWL.y + 22} C ${BOWL.x + 18} ${BOWL.y + 22} ${BOWL.x + 34} ${BOWL.y + 16} ${BOWL.x + 36} ${BOWL.y} Z`}
            fill="var(--gold)"
            stroke="var(--art-carve)"
            strokeWidth={0.7}
            strokeLinejoin="round"
          />
          <path d={`M ${BOWL.x - 30} ${BOWL.y + 10} C ${BOWL.x - 12} ${BOWL.y + 15} ${BOWL.x + 12} ${BOWL.y + 15} ${BOWL.x + 30} ${BOWL.y + 10}`} stroke="var(--art-vermilion)" strokeWidth={1.4} />
          <ellipse cx={BOWL.x} cy={BOWL.y} rx={36} ry={8} fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth={0.9} />
          <ellipse cx={BOWL.x} cy={BOWL.y} rx={31} ry={6.4} fill="var(--art-ivory)" stroke="var(--art-moon)" strokeWidth={0.5} />
          {GRAINS.map((g) => (
            <ellipse key={g.k} cx={g.x} cy={g.y} rx={1.6} ry={0.7} transform={`rotate(${g.turn} ${g.x} ${g.y})`} fill="var(--art-moon)" stroke="var(--gold-soft)" strokeWidth={0.2} />
          ))}
          {THREADS.map((t, k) => (
            <path key={k} d="M -2.4 0 L 2.4 0" transform={`translate(${BOWL.x + t.x} ${BOWL.y + t.y}) rotate(${t.turn})`} stroke="var(--art-saffron)" strokeWidth={0.8} strokeLinecap="round" />
          ))}
          <path d={`M ${BOWL.x + 8} ${BOWL.y - 2.6} a 2.6 2.2 0 1 0 4 2.4`} stroke="var(--art-turmeric)" strokeWidth={1.4} strokeLinecap="round" />
          <path d={`M ${BOWL.x - 18} ${BOWL.y + 0.6} a 2.6 2.2 0 1 1 4 -2`} stroke="var(--art-turmeric)" strokeWidth={1.4} strokeLinecap="round" />
          <circle cx={BOWL.x + 20} cy={BOWL.y + 1} r={1.3} fill="var(--art-ember)" />
          <circle cx={BOWL.x - 6} cy={BOWL.y + 3} r={1.3} fill="var(--art-ember)" />
        </g>
      </g>

      {/* A tethered goat, and the rope cut at her coming */}
      <g {...part("pasu")}>
        <ellipse cx={GOAT.x + 4} cy={GOAT.y + 2} rx={44} ry={5} fill={url("shadow")} />
        <ellipse cx={PEG.x} cy={PEG.y + 1} rx={10} ry={2.6} fill={url("shadow")} />
        <path d={`M ${PEG.x} ${PEG.y} L ${PEG.x + 1} ${PEG.y - 20}`} stroke="var(--art-ember)" strokeWidth={4} strokeLinecap="round" />
        <path d={`M ${PEG.x - 2.6} ${PEG.y - 15} h 7`} stroke="var(--gold)" strokeWidth={1} strokeLinecap="round" />
        <path d={ROPE_FROM_PEG} stroke="var(--art-turmeric)" strokeWidth={2} strokeLinecap="round" />
        <path d={ROPE_FROM_PEG} stroke="var(--art-ember)" strokeWidth={2} strokeDasharray="1 2.4" />
        <g transform={`translate(${GOAT.x} ${GOAT.y}) scale(${GOAT.s})`}>
          <Goat />
        </g>
        <path d={ROPE_FROM_NECK} stroke="var(--art-turmeric)" strokeWidth={2} strokeLinecap="round" />
        <path d={ROPE_FROM_NECK} stroke="var(--art-ember)" strokeWidth={2} strokeDasharray="1 2.4" />
        <path
          d={`M ${NECK.x - 3} ${NECK.y - 3} C ${NECK.x - 1} ${NECK.y + 2} ${NECK.x + 3} ${NECK.y + 3} ${NECK.x + 5} ${NECK.y - 1}`}
          stroke="var(--art-turmeric)"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
        <circle className="m-breathe" cx={CUT.x} cy={CUT.y} r={20} fill={url("cut")} />
        <Flash x={CUT.x} y={CUT.y} s={11} group={0} />
      </g>
    </svg>
  );
}
