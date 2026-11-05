/**
 * Shloka 32 — "Ten descents out of her fingernails".
 *
 * The exchange of missiles at its height, and then the field cleared. Her two
 * arms rise from her light as beams, empty, and the hands are only their nails:
 * five small moons at the end of each beam, as her toenails were in Shloka 19.
 * Light comes off them, and round the card the forms of the purāṇa's table
 * issue from it, each with a little light of its own: the fish, the tortoise,
 * the boar, the man-lion, the dwarf's umbrella and pot, Paraśurāma's axe,
 * Rāma's bow, the four lights of the fourfold Vāsudeva, and Kalki's white horse
 * under a raised sword. Below, the great Pāśupata, a trident-headed shaft of
 * fire, flies low across the plate, and behind it the demon host is fire and
 * rising embers, with the last of its ash ahead. Which name each part answers
 * to is written up for readers in the registry, next to this artwork's entry.
 */

import {
  ArmLight,
  Ash,
  AshDefs,
  Boar,
  Embers,
  Fish,
  FishDefs,
  Horse,
  Lion,
  Tortoise,
  armBeam,
  artIds,
  glint,
  partProps,
  polar,
  round,
  tongue,
} from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];
const BREATHE = ["m-breathe", "m-breathe m-late", "m-breathe m-later"];

const HER = { x: 306, y: 534 };

/* ── Her arms and her nails ────────────────────────────────────────────── */

const TIPS = [
  { x: 190, y: 470 },
  { x: 446, y: 418 },
];
const ARMS = TIPS.map((t) => armBeam(HER, t, 30, 12, 26));
/** Five nails fanned round the end of each beam, pointing on along it. */
const NAILS = TIPS.flatMap((t, h) => {
  const dir = (Math.atan2(-(t.y - HER.y), t.x - HER.x) * 180) / Math.PI;
  return [-48, -24, 0, 24, 44].map((spread, f) => {
    const p = polar(t.x, t.y, 22 + (f === 2 ? 4 : f === 0 || f === 4 ? -4 : 1), dir + spread * 1.2 * (h ? -1 : 1));
    const ray = polar(t.x, t.y, 96 + (f % 2) * 30, dir + spread * 1.5 * (h ? -1 : 1));
    return { ...p, r: f === 0 || f === 4 ? 3.4 : 4, ray, k: (h * 5 + f) % 3 };
  });
});

/* ── The forms ─────────────────────────────────────────────────────────── */

const FORMS = {
  fish: { x: 118, y: 300 },
  tortoise: { x: 156, y: 166 },
  boar: { x: 254, y: 166 },
  lion: { x: 334, y: 76 },
  dwarf: { x: 414, y: 56 },
  axe: { x: 490, y: 76 },
  bow: { x: 556, y: 124 },
  vyuha: { x: 598, y: 214 },
  kalki: { x: 572, y: 314 },
};
const GLOWS = Object.values(FORMS);
const VYUHA = [90, 0, 270, 180].map((deg, k) => ({
  ...polar(FORMS.vyuha.x, FORMS.vyuha.y, 13, deg),
  fill: ["var(--art-hair)", "var(--art-moon)", "var(--art-vermilion)", "var(--art-saffron)"][k],
}));
/** Rāma's bow, upright, with an arrow on the string. */
const RAMA_BOW = "M 0 -26 C 9 -20 12 -8 12 0 C 12 8 9 20 0 26";
const RAMA_TIPS = "M 0 -26 C -2 -28 -4 -28 -5 -27 M 0 26 C -2 28 -4 28 -5 27";
/** Paraśurāma's axe: a broad crescent blade on one side of the haft. */
const AXE_BLADE = "M 2 -22 C 12 -26 20 -20 22 -12 C 18 -12 13 -11 9 -8 C 8 -12 5 -15 2 -14 Z";
/** Vāmana's umbrella and water pot. */
const UMBRELLA = "M -18 -8 C -16 -20 -6 -26 0 -26 C 6 -26 16 -20 18 -8 C 12 -10 6 -10 0 -8 C -6 -10 -12 -10 -18 -8 Z";
const POT = "M 10 18 C 6 18 4 14 5 10 C 6 7 9 6 12 6 C 15 6 18 7 19 10 C 20 14 18 18 14 18 Z";

/* ── The Pāśupata ──────────────────────────────────────────────────────── */

const PASU = { x: 520, y: 618 };
/** The fire it leaves behind it, the host burnt out. */
const FIRE = Array.from({ length: 22 }, (_, k) => {
  const t = k / 21;
  return {
    x: round(130 + t * (PASU.x - 170) + ((k * 7) % 5) * 2),
    y: round(PASU.y + 40 - t * 30 + ((k * 13) % 7) * 3),
    h: round(16 + 30 * (1 - t) ** 0.6 + ((k * 5) % 4) * 4),
    w: round(12 + (k % 3) * 3),
    lean: ((k * 3) % 5) - 2 + 3,
    k,
  };
});
const EMBERS = Array.from({ length: 26 }, (_, k) => ({
  x: round(140 + ((k * 53) % 330)),
  y: round(PASU.y + 10 - ((k * 37) % 60)),
  r: round(0.9 + (k % 3) * 0.5),
  dx: ((k * 7) % 11) - 3,
  dur: round(2.6 + (k % 4) * 0.5),
  delay: round(-((k * 0.37) % 3)),
}));
const ASH = [
  { x: 590, y: 646, r: 40 },
  { x: 626, y: 616, r: 34 },
  { x: 610, y: 684, r: 36 },
];
const ASH_FLECKS = Array.from({ length: 10 }, (_, k) => ({ x: round(560 + ((k * 31) % 80)), y: round(600 + ((k * 23) % 100)), r: round(0.8 + (k % 3) * 0.5) }));
const TRIDENT = "M 0 0 L 24 0 M 24 0 L 40 0 M 24 -9 C 32 -9 34 -4 34 0 C 34 4 32 9 24 9 M 34 0 L 44 0";

export function TenDescents({ idPrefix = "sa32", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={220} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("nail")} cx="0.38" cy="0.34" r="0.7">
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)" }} />
        </radialGradient>
        <radialGradient id={id("moon-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("form-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("fire-glow")} cx={330} cy={PASU.y + 30} r={220} gradientUnits="userSpaceOnUse" gradientTransform={`translate(0 ${PASU.y + 30}) scale(1 0.4) translate(0 ${-(PASU.y + 30)})`}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("flame")} x1={0} y1={1} x2={0} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)" }} />
        </linearGradient>
        <linearGradient id={id("trail")} x1={170} y1={0} x2={PASU.x} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
        </linearGradient>
        {ARMS.map((b, i) => (
          <linearGradient key={i} id={id(`arm-${i}`)} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
            <stop offset="0.2" style={{ stopColor: "var(--art-saffron)", stopOpacity: 1 }} />
            <stop offset="0.82" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
            <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
          </linearGradient>
        ))}
        <FishDefs id={id} />
        <AshDefs id={id} />
      </defs>

      {/* The great Pāśupata, and the demon host burnt out behind it */}
      <g {...part("pasupata")}>
        <ellipse cx={330} cy={PASU.y + 30} rx={220} ry={88} fill={url("fire-glow")} />
        <Ash clouds={ASH} flecks={ASH_FLECKS} url={url} />
        {FIRE.map((f) => (
          <g key={f.k} transform={`translate(${f.x} ${f.y})`}>
            <g className={BREATHE[f.k % 3]}>
              <path d={tongue(f.h, f.w, f.lean * 2)} fill={url("flame")} />
              <path d={tongue(f.h * 0.6, f.w * 0.5, f.lean)} fill="var(--art-core)" fillOpacity={0.55} />
            </g>
          </g>
        ))}
        <g fill="var(--art-ember)">
          <Embers embers={EMBERS} />
        </g>
        <path d={`M 170 ${PASU.y + 26} L ${PASU.x - 6} ${PASU.y - 1.6} L ${PASU.x - 6} ${PASU.y + 1.6} L 170 ${PASU.y + 30} Z`} fill={url("trail")} />
        <g transform={`translate(${PASU.x - 20} ${PASU.y})`}>
          <path d={TRIDENT} stroke="var(--gold)" strokeWidth={2.2} strokeLinecap="round" />
          <path className="m-flicker" d={tongue(16, 9, 0)} transform="translate(46 0) rotate(90)" fill="var(--art-saffron)" />
          <path className="m-lick" d={glint(8)} transform="translate(44 0)" fill="var(--art-core)" />
        </g>
      </g>

      {/* Her light, and her two arms, empty, the hands only their nails */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={220} fill={url("glow")} />
        {ARMS.map((b, i) => (
          <ArmLight key={i} beam={b} fill={url(`arm-${i}`)} />
        ))}
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={36} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={5.8} fill="var(--art-core)" />
        <circle cx={HER.x} cy={HER.y} r={9.4} stroke="var(--gold)" strokeWidth={0.9} />
      </g>

      {/* The ten nails, and the light coming off them */}
      <g {...part("nails")}>
        <g stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.6} strokeLinecap="round">
          {NAILS.map((n, i) => (
            <path key={i} className={TWINKLE[n.k]} d={`M ${n.x} ${n.y} L ${n.ray.x} ${n.ray.y}`} />
          ))}
        </g>
        {NAILS.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r * 3.2} fill={url("moon-glow")} />
            <circle className={TWINKLE[n.k]} cx={n.x} cy={n.y} r={n.r} fill={url("nail")} stroke="var(--gold)" strokeWidth={0.8} />
          </g>
        ))}
      </g>

      {/* The forms that come out of them */}
      <g {...part("forms")}>
        {GLOWS.map((g, i) => (
          <circle key={i} className={i % 2 ? "m-shimmer m-late" : "m-shimmer"} cx={g.x} cy={g.y} r={40} fill={url("form-glow")} />
        ))}
        <g transform={`translate(${FORMS.fish.x} ${FORMS.fish.y}) rotate(-60) scale(0.62)`}>
          <Fish url={url} />
        </g>
        <g transform={`translate(${FORMS.tortoise.x} ${FORMS.tortoise.y + 10}) scale(0.5)`}>
          <Tortoise />
        </g>
        <g transform={`translate(${FORMS.boar.x} ${FORMS.boar.y + 14}) scale(0.72)`}>
          <Boar />
        </g>
        <g transform={`translate(${FORMS.dwarf.x} ${FORMS.dwarf.y})`}>
          <path d="M 0 -26 V 18" stroke="var(--gold)" strokeWidth={1.6} strokeLinecap="round" />
          <path d={UMBRELLA} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path d="M 0 -26 L -10 -9 M 0 -26 L 10 -9" stroke="var(--gold)" strokeWidth={0.5} />
          <path d={POT} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d="M 19 10 L 24 6" stroke="var(--gold)" strokeWidth={1.4} strokeLinecap="round" />
          <path d="M 9 6 C 9 2 15 2 15 6" stroke="var(--gold)" strokeWidth={0.9} />
        </g>
        <g transform={`translate(${FORMS.axe.x} ${FORMS.axe.y}) rotate(14)`}>
          <path d="M 0 -24 V 24" stroke="var(--art-turmeric)" strokeWidth={2.6} strokeLinecap="round" />
          <path d="M 0 -24 V 24" stroke="var(--gold)" strokeWidth={0.6} />
          <path d={AXE_BLADE} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
          <path d="M -1.6 -20 H 3 M -1.6 -12 H 3" stroke="var(--gold)" strokeWidth={1.2} />
        </g>
        <g transform={`translate(${FORMS.bow.x} ${FORMS.bow.y}) rotate(-12)`}>
          <path d="M 0 -26 L 0 26" stroke="var(--gold-soft)" strokeWidth={0.6} />
          <path d={RAMA_BOW} stroke="var(--art-turmeric)" strokeWidth={2.8} strokeLinecap="round" />
          <path d={RAMA_BOW} stroke="var(--gold)" strokeWidth={0.6} />
          <path d={RAMA_TIPS} stroke="var(--gold)" strokeWidth={1.2} strokeLinecap="round" />
          <path d="M 0 0 L 24 0" stroke="var(--gold)" strokeWidth={1} />
          <path d="M 24 0 L 18 -3.4 L 19.6 0 L 18 3.4 Z" fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.5} />
          <path d="M 0 0 L -4 -3 M 0 0 L -4 3" stroke="var(--art-vermilion)" strokeWidth={0.9} strokeLinecap="round" />
        </g>
        <circle cx={FORMS.vyuha.x} cy={FORMS.vyuha.y} r={13} stroke="var(--gold)" strokeWidth={0.7} />
        {VYUHA.map((v, i) => (
          <g key={i}>
            <circle cx={v.x} cy={v.y} r={4.6} fill={v.fill} stroke="var(--gold)" strokeWidth={0.8} />
          </g>
        ))}
        <g transform={`translate(${FORMS.kalki.x} ${FORMS.kalki.y + 6})`}>
          <g transform="scale(0.9)">
            <Horse fill="var(--art-moon)" />
          </g>
          <path d="M 6 -14 L 22 -40" stroke="var(--art-moon)" strokeWidth={2.2} strokeLinecap="round" />
          <path d="M 6 -14 L 22 -40" stroke="var(--gold)" strokeWidth={0.5} />
          <path d="M 2 -12 L 10 -17" stroke="var(--gold)" strokeWidth={1.8} strokeLinecap="round" />
          <path className="m-lick" d={glint(5)} transform="translate(22 -40)" fill="var(--art-core)" />
        </g>
      </g>

      {/* The man-lion, whose own weapon was his claws */}
      <g {...part("narasimha")}>
        <circle className="m-shimmer" cx={FORMS.lion.x} cy={FORMS.lion.y} r={40} fill={url("form-glow")} />
        <g transform={`translate(${FORMS.lion.x - 20} ${FORMS.lion.y - 20}) scale(0.44)`} style={{ color: "var(--gold)" }} fill="currentColor">
          <Lion />
          <path d="M 88 92 l 4 3 M 92 91 l 4 3 M 84 92 l 4 3" stroke="var(--art-ivory)" strokeWidth={2.6} strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
