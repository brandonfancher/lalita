/**
 * Shloka 28 — "Watching her own powers fight".
 *
 * Two names about her face while she watches, and neither strikes a blow. So
 * she is not in the fight: her light stands on her chariot at the left and
 * leans toward it, its glow and its gaze thrown forward. Before her the army of
 * her powers, the spears of Shloka 24, presses rank on rank into the ash of
 * Bhaṇḍa's host at the right. Over them the fifteen Nityās, the goddesses of
 * the bright fortnight's nights, come down out of the sky one after another as
 * waxing moons, swelling as they come (the verse's word for their onslaught,
 * āṭopa, is a swelling), and the fullest strikes the ash. She is the sixteenth,
 * the full moon, watching. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import {
  Ash,
  AshDefs,
  RathaDefs,
  RathaTiers,
  RathaTriangles,
  RathaWeapons,
  Spear,
  SpearDefs,
  SPEAR_LEAN,
  along,
  artIds,
  glint,
  litPart,
  partProps,
  polar,
  round,
  sriCakraRatha,
  taper,
  through,
  tongue,
} from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── Her light, watching ───────────────────────────────────────────────── */

const RATHA = sriCakraRatha(196, 540, 0.5);
const BINDU = RATHA.bindu;
/** Her gaze: rays thrown forward over the fight, from up toward the moons to down toward the spears. */
const GAZE = Array.from({ length: 31 }, (_, k) => {
  const deg = 58 - k * 2.8;
  const a = polar(BINDU.x, BINDU.y, 16, deg);
  const b = polar(BINDU.x, BINDU.y, k % 2 ? 210 : 320, deg);
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}).join(" ");

/* ── The Nityās, the fifteen nights ────────────────────────────────────── */

const PATH = through(
  [
    { x: 96, y: 156 },
    { x: 226, y: 80 },
    { x: 380, y: 60 },
    { x: 512, y: 102 },
    { x: 580, y: 206 },
    { x: 586, y: 326 },
    { x: 556, y: 436 },
    { x: 516, y: 508 },
  ],
  24,
);
const MARKS = along(PATH, 1);
const NIGHT_R = (i: number) => 6 + i * 0.75;
const NIGHTS = (() => {
  const gaps = Array.from({ length: 14 }, (_, i) => NIGHT_R(i) + NIGHT_R(i + 1));
  const total = MARKS.length - 1 - NIGHT_R(0) - NIGHT_R(14);
  const f = total / gaps.reduce((a, b) => a + b, 0);
  let s = NIGHT_R(0);
  return Array.from({ length: 15 }, (_, i) => {
    if (i) s += gaps[i - 1] * f;
    const at = Math.round(s);
    const m = MARKS[Math.min(at, MARKS.length - 1)];
    const r = NIGHT_R(i);
    const tail = MARKS.slice(Math.max(0, at - Math.round(r * 4.5)), Math.max(1, at - Math.round(r * 0.4)));
    return {
      night: i + 1,
      x: m.x,
      y: m.y,
      r: round(r),
      lit: litPart(i + 1, round(r)),
      trail: tail.length > 1 ? taper(tail.filter((_, k) => k % 3 === 0 || k === tail.length - 1), (t) => r * 0.7 * t * t) : null,
    };
  });
})();
const STRIKE = NIGHTS[14];
const JVALA = NIGHTS[13];
const JVALA_FLAMES = Array.from({ length: 12 }, (_, k) => {
  const deg = k * 30;
  const p = polar(JVALA.x, JVALA.y, JVALA.r + 2.5, deg);
  return { d: tongue(7, 4.4, 1), transform: `translate(${p.x} ${p.y}) rotate(${90 - deg})` };
});

/* ── The army of her powers, and Bhaṇḍa's host ─────────────────────────── */

type Rank = { x: number; y: number; s: number; k: number };

/** Rank after rank from her chariot toward the ash, nearer, larger and further right as they go. */
const ARMY: Rank[] = Array.from({ length: 6 }, (_, r) => {
  const cx = 362 + r * 22;
  const y = 560 + r * 24;
  const count = 3 + r;
  const gap = 24 + r * 3;
  const s = round(0.6 + r * 0.09);
  return Array.from({ length: count }, (_, i) => ({
    x: round(cx + (i - (count - 1) / 2) * gap + ((r * 5 + i * 3) % 4) - 2),
    y: round(y + ((r + i * 2) % 3) * 2),
    s,
    k: (r + i) % 3,
  }));
}).flat();

const ASH = [
  { x: 560, y: 520, r: 50 },
  { x: 604, y: 584, r: 62 },
  { x: 540, y: 618, r: 44 },
  { x: 612, y: 470, r: 40 },
  { x: 574, y: 676, r: 50 },
  { x: 508, y: 562, r: 30 },
];
const FLECKS = Array.from({ length: 26 }, (_, k) => ({
  x: round(480 + ((k * 47) % 150)),
  y: round(440 + ((k * 31) % 260)),
  r: round(0.8 + (k % 3) * 0.5),
}));
/** Where the fullest of the fifteen strikes, the ash thrown back. */
const BURST = Array.from({ length: 10 }, (_, k) => {
  const deg = k * 36 + 18;
  const a = polar(STRIKE.x, STRIKE.y, STRIKE.r + 5, deg);
  const b = polar(STRIKE.x, STRIKE.y, STRIKE.r + (k % 2 ? 11 : 17), deg);
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}).join(" ");

export function NityasOnslaught({ idPrefix = "sa28", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient
          id={id("lean")}
          cx={BINDU.x + 70}
          cy={BINDU.y}
          r={230}
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${BINDU.x + 70} ${BINDU.y}) rotate(-8) scale(1 0.62) translate(${-(BINDU.x + 70)} ${-BINDU.y})`}
        >
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.5 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("gaze")} cx={BINDU.x} cy={BINDU.y} r={320} gradientUnits="userSpaceOnUse">
          <stop offset="0.05" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.15" style={{ stopColor: "var(--gold)", stopOpacity: 0.75 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("moon-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("shadow")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <RathaDefs id={id} />
        <AshDefs id={id} />
        <SpearDefs id={id} />
      </defs>

      {/* Her light leaning toward the fight, her gaze thrown over it */}
      <g {...part("gaze")}>
        <ellipse className="m-shimmer" cx={BINDU.x + 70} cy={BINDU.y} rx={230} ry={143} fill={url("lean")} />
        <path className="m-shimmer" d={GAZE} stroke={url("gaze")} strokeWidth={0.7} />
      </g>

      {/* Her chariot, and her light on it: the sixteenth, the full moon, watching */}
      <g {...part("chariot")}>
        <ellipse cx={RATHA.cx} cy={RATHA.cy + 66} rx={104} ry={11} fill={url("shadow")} />
        <RathaTiers g={RATHA} url={url} />
        <RathaTriangles g={RATHA} url={url} />
        <RathaWeapons g={RATHA} />
        <circle className="m-breathe" cx={BINDU.x} cy={BINDU.y} r={30} fill={url("bindu-glow")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={5} fill="var(--art-core)" />
        <circle cx={BINDU.x} cy={BINDU.y} r={8.2} stroke="var(--gold)" strokeWidth={0.8} />
      </g>

      {/* The army of her powers, pressing rank on rank into Bhaṇḍa's host */}
      <g {...part("army")}>
        <Ash clouds={ASH} flecks={FLECKS} url={url} />
        {ARMY.map((sp, i) => (
          <g key={i} transform={`translate(${sp.x} ${sp.y}) rotate(${SPEAR_LEAN}) scale(${sp.s})`}>
            <Spear k={sp.k} shaft={url("shaft")} />
          </g>
        ))}
      </g>

      {/* The fifteen Nityās, the nights of the bright fortnight, coming down waxing */}
      <g {...part("nityas")}>
        {NIGHTS.map((m) => m.trail && <path key={m.night} d={m.trail} fill="var(--gold-soft)" fillOpacity={0.3} />)}
        <circle cx={STRIKE.x} cy={STRIKE.y} r={STRIKE.r * 3} fill={url("moon-glow")} />
        <path className="m-lick" d={BURST} stroke="var(--art-core)" strokeWidth={1.4} strokeLinecap="round" />
        {NIGHTS.map((m, i) => (
          <g key={m.night} transform={`translate(${m.x} ${m.y})`}>
            <g className={TWINKLE[i % 3]}>
              <circle r={m.r} fill="var(--art-hair)" fillOpacity={0.2} />
              <path d={m.lit} fill="var(--art-moon)" />
            </g>
            <circle r={m.r} stroke="var(--gold)" strokeWidth={0.8} />
          </g>
        ))}
        <path className="m-lick" d={glint(7)} transform={`translate(${STRIKE.x + STRIKE.r * 0.7} ${STRIKE.y + STRIKE.r * 0.7})`} fill="var(--art-core)" />
      </g>

      {/* Jvālāmālinī, the fourteenth night, who raised the wall of fire */}
      <g {...part("jvalamalini")}>
        <g className="m-breathe">
          {JVALA_FLAMES.map((f, i) => (
            <path key={i} d={f.d} transform={f.transform} fill="var(--art-saffron)" />
          ))}
        </g>
        <circle cx={JVALA.x} cy={JVALA.y} r={JVALA.r + 1.6} stroke="var(--art-vermilion)" strokeWidth={1.2} />
      </g>
    </svg>
  );
}
