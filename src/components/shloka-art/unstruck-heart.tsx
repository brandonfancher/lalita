/**
 * Shloka 100 — "Rākiṇī at the heart: unstruck sound, fangs, a rosary".
 *
 * The throat's template run again at the heart, the values changed. Under
 * the card the heart's wheel, twelve red petals bearing the consonants ka to
 * ṭha round the sign of air, and in it her light, whose sheen is dark. Round
 * the wheel the unstruck sound, rings that nothing set going; round that the
 * rosary of the fifty letters, sound in its struck and countable form. At the
 * left the count of faces with the second row lit; at the right the seven
 * layers with the blood lit, and below them, fainter, the rest of what she
 * holds. In the crown her fangs, two boar's tusks crossed, catching the
 * light. Which name each part answers to is written up for readers in the
 * registry, next to this artwork's entry.
 */

import { BodyLayers, CakraWheel, Damaru, FaceCount, Trident, VARNAMALA, artIds, glint, partProps, polar, round, trident } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── The heart's wheel ─────────────────────────────────────────────────── */

const WHEEL = { x: 320, y: 572, r0: 30, r1: 72 };
const CONSONANTS = ["क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ"];
const UNSTRUCK = [84, 94, 104];

/* ── The rosary of the fifty letters ───────────────────────────────────── */

const ROSARY_R = 116;
const MERU = polar(WHEEL.x, WHEEL.y, ROSARY_R, -90);
/** Clockwise from the meru at the foot, as the rosary is told. */
const BEADS = VARNAMALA.map((ch, k) => ({ ch, ...polar(WHEEL.x, WHEEL.y, ROSARY_R, -90 - ((k + 1) * 360) / 51), k }));

/* ── Her fangs ─────────────────────────────────────────────────────────── */

const FANGS = { x: 462, y: 44 };
/** A boar's tusk, root at the origin, curving up and out to its point. */
const TUSK = "M -3.4 0 C -4 -12 -2 -24 6 -34 C 4 -24 4 -12 3.4 0 Z";
const TUSK_S = 1.5;
/** Each tusk rooted on one side and leaning across to the other, so the two cross above their roots. */
const TUSKS = [-1, 1].map((side) => {
  const root = { x: FANGS.x - side * 14, y: FANGS.y + 22 };
  const turn = side * 34;
  const t = (turn * Math.PI) / 180;
  const [px, py] = [side * 6 * TUSK_S, -34 * TUSK_S];
  return { side, root, turn, tip: { x: round(root.x + px * Math.cos(t) - py * Math.sin(t)), y: round(root.y + px * Math.sin(t) + py * Math.cos(t)) } };
});

/* ── The seven layers, and the rest of what she holds ──────────────────── */

const LAYERS = { x0: 452, x1: 512, y0: 470 };
const TRIDENT = trident(486, 616, 736, 1);

/* ── The faces ─────────────────────────────────────────────────────────── */

const COUNT = { x: 158, y0: 478 };

export function UnstruckHeart({ idPrefix = "sa100", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("dark")}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.95 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("wheel")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.32 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bead")} cx="0.38" cy="0.35" r="0.7">
          <stop offset="0" style={{ stopColor: "var(--art-ivory)" }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-moon)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)" }} />
        </radialGradient>
        <radialGradient id={id("face")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("blood")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("blaze")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.7 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.25 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Her fangs in the crown, two boar's tusks crossed, blazing */}
      <g {...part("fangs")}>
        <circle className="m-breathe" cx={FANGS.x} cy={FANGS.y} r={44} fill={url("blaze")} />
        {TUSKS.map((k) => (
          <g key={k.side} transform={`translate(${k.root.x} ${k.root.y}) rotate(${k.turn}) scale(${k.side * TUSK_S} ${TUSK_S})`}>
            <path d={TUSK} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
            <path d="M 2 -4 C 2 -14 3 -24 6 -33" stroke="var(--art-core)" strokeWidth={0.7} strokeLinecap="round" />
          </g>
        ))}
        <path d={`M ${FANGS.x - 8} ${FANGS.y + 1} h 16`} stroke="var(--gold)" strokeWidth={4} strokeLinecap="round" />
        <path d={`M ${FANGS.x - 8} ${FANGS.y + 1} h 16`} stroke="var(--art-vermilion)" strokeWidth={1.2} strokeLinecap="round" />
        {TUSKS.map((k, i) => (
          <g key={k.side} transform={`translate(${k.tip.x} ${k.tip.y})`}>
            <path className={TWINKLE[i]} d={glint(7)} fill="var(--art-core)" />
          </g>
        ))}
      </g>

      {/* The heart's wheel, unstruck: twelve petals bearing ka to ṭha, round the sign of air */}
      <g {...part("anahata")}>
        <CakraWheel c={WHEEL} n={12} r0={WHEEL.r0} r1={WHEEL.r1} fill="var(--art-vermilion)" sign="air" glow={url("wheel")} letters={CONSONANTS} letterR={52} />
        {UNSTRUCK.map((r, k) => (
          <circle
            key={r}
            className={["m-shimmer", "m-shimmer m-late", "m-shimmer m-later"][k]}
            cx={WHEEL.x}
            cy={WHEEL.y}
            r={r}
            stroke="var(--gold-soft)"
            strokeWidth={0.8}
            strokeOpacity={0.7 - k * 0.15}
            strokeDasharray="0.6 3.4"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* Her light at the heart, its sheen dark */}
      <g {...part("dark")}>
        <circle className="m-breathe" cx={WHEEL.x} cy={WHEEL.y} r={30} fill={url("dark")} />
        <g transform={`translate(${WHEEL.x} ${WHEEL.y})`}>
          <path className="m-shimmer" d={glint(9)} fill="var(--art-moon)" />
        </g>
      </g>

      {/* The rosary of the fifty letters, round the wheel; behind the layers, fainter, the rest she holds */}
      <g {...part("rosary")}>
        <circle cx={WHEEL.x} cy={WHEEL.y} r={ROSARY_R} stroke="var(--gold)" strokeWidth={0.9} />
        {BEADS.map((b) => (
          <g key={b.k}>
            <circle cx={b.x} cy={b.y} r={6.6} fill={url("bead")} stroke="var(--gold)" strokeWidth={0.6} />
            <text x={b.x} y={b.y + 0.4} fontSize={b.ch.length > 1 ? 6.4 : 7.6} textAnchor="middle" dominantBaseline="central" fill="var(--sindura)" style={{ fontFamily: "var(--font-tiro), serif" }}>
              {b.ch}
            </text>
          </g>
        ))}
        <path
          d={`M ${MERU.x} ${MERU.y + 6} C ${MERU.x - 2} ${MERU.y + 14} ${MERU.x + 2} ${MERU.y + 20} ${MERU.x} ${MERU.y + 26}`}
          stroke="var(--art-vermilion)"
          strokeWidth={1.2}
          strokeLinecap="round"
        />
        <path d={`M ${MERU.x - 3} ${MERU.y + 24} L ${MERU.x} ${MERU.y + 36} L ${MERU.x + 3} ${MERU.y + 24} Z`} fill="var(--art-vermilion)" />
        <circle cx={MERU.x} cy={MERU.y} r={8.4} fill="var(--gold)" stroke="var(--gold-soft)" strokeWidth={1} />
        <g opacity={0.5} strokeLinecap="round" strokeLinejoin="round">
          <Trident t={TRIDENT} />
          <Damaru t={TRIDENT} />
        </g>
      </g>

      {/* The count of faces: two, the second row lit */}
      <g {...part("two-faces")}>
        <FaceCount x={COUNT.x} y0={COUNT.y0} lit={2} glow={url("face")} />
      </g>

      {/* The seven layers, the blood lit */}
      <g {...part("blood")}>
        <BodyLayers x0={LAYERS.x0} x1={LAYERS.x1} y0={LAYERS.y0} lit={1} glow={url("blood")} />
      </g>
    </svg>
  );
}
