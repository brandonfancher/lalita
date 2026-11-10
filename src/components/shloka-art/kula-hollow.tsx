/**
 * Shloka 93 — "Six names on one syllable, and the hymn names its own tradition".
 *
 * The verse goes from what she is like to the school that claims her, and the
 * picture goes from the far edge of her island in to the hollow at its root.
 * In the crown the moat of nectar round her city, with Kurukullā over it as a
 * red light with her bow and arrows of flowers. Under the card, the kula
 * hollow: a round pit in which the coiled power sleeps, her light rising out
 * of it, and round it on the ground the kula, the assembly of powers. Up to
 * it from the front comes the Kaula path, its lamps the people set on it. At
 * the left a bundle of kuśa grass, neatly cut and tied, with a kuśa ring: the
 * competence of the rite. At the right a sprig of śirīṣa, the softest of
 * flowers: her tender form. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { artIds, Coil, coilPath, FlowerArrow, FlowerBow, KulaAssembly, Lamp, partProps, polar, round, swingFrom, WavePattern } from "./primitives";
import type { ArtProps } from "./types";

/* ── The moat of nectar and Kurukullā over it ──────────────────────────── */

const MOAT = {
  top: "M 196 168 Q 390 138 584 168",
  band: "M 196 168 Q 390 138 584 168 L 584 184 Q 390 156 196 184 Z",
};
const KURUKULLA = { x: 360, y: 104 };
const BOW = { x: 410, y: 104, s: 0.78 };
const NOCK = { x: round(BOW.x - 16 * BOW.s), y: BOW.y };

/* ── The kula hollow ───────────────────────────────────────────────────── */

const PIT = { x: 320, y: 612, rx: 62, ry: 17 };
const COIL = coilPath({ x: PIT.x, y: PIT.y + 2 }, { r0: 44, r1: 22, turns: 3.5, tilt: 0.3, rise: 6 }) + ` Q ${PIT.x + 6} ${PIT.y - 6} ${PIT.x} ${PIT.y - 4}`;
const BINDU = { x: PIT.x, y: PIT.y - 4 };
const RING = { x: PIT.x, y: PIT.y - 6, rx: 154, ry: 44 };

/* ── The Kaula path ────────────────────────────────────────────────────── */

const PATH_L = "M 330 664 C 352 700 372 740 380 800";
const PATH_R = "M 354 662 C 392 700 438 744 470 800";
const PATH_FILL = `${PATH_L} L 470 800 C 438 744 392 700 354 662 Z`;
const LAMPS = [
  { x: 346, y: 676, s: 1.2 },
  { x: 366, y: 702, s: 1.5 },
  { x: 388, y: 732, s: 1.85 },
  { x: 410, y: 766, s: 2.25 },
];

/* ── Kuśa, cut and tied, and the kuśa ring ─────────────────────────────── */

const BUNDLE = { x: 188, y: 700, deg: -16, s: 1.3 };
const BLADES = Array.from({ length: 9 }, (_, k) => {
  const spread = (k - 4) * 1.6;
  return `M -34 ${round(spread * 0.5)} C -6 ${round(spread * 0.7)} 20 ${round(spread * 1.4)} ${round(46 + (k % 3) * 5)} ${round(spread * 3.2)}`;
});
const PAVITRA = { x: 256, y: 728 };

/* ── Śirīṣa, the softest flower ────────────────────────────────────────── */

const SIRISA_STEM = "M 494 598 C 490 570 498 540 488 500 M 490 540 C 500 528 510 520 512 508 M 489 520 C 478 512 470 504 468 494";
const PUFFS = [
  { x: 488, y: 498, s: 1 },
  { x: 512, y: 506, s: 0.82 },
  { x: 468, y: 492, s: 0.72 },
];
const FILAMENTS = Array.from({ length: 23 }, (_, k) => {
  const deg = 200 - k * (220 / 22);
  const l = 15 + ((k * 7) % 5);
  return { tip: polar(0, 0, l, deg), k };
});
const LEAFLETS = Array.from({ length: 7 }, (_, k) => k);

export function KulaHollow({ idPrefix = "sa93", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <WavePattern id={id("waves")} />
        <linearGradient id={id("moat")} x1={0} y1={140} x2={0} y2={182} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.5 }} />
        </linearGradient>
        <linearGradient id={id("moat-fade")} x1={196} y1={0} x2={584} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.2" stopColor="#fff" />
          <stop offset="0.8" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id={id("moat-mask")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect x={0} y={0} width={640} height={830} fill={url("moat-fade")} />
        </mask>
        <radialGradient id={id("red")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.9 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("rise")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.8 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("pit")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.2 }} />
        </radialGradient>
        <radialGradient id={id("coil-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("power-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("path")} x1={0} y1={660} x2={0} y2={800} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.35 }} />
        </linearGradient>
        <linearGradient id={id("filament")} x1={0} y1={0} x2={0} y2={-18} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-ivory)" }} />
          <stop offset="1" style={{ stopColor: "var(--lotus)" }} />
        </linearGradient>
      </defs>

      {/* The moat of nectar round her city, and Kurukullā over it with her bow and arrows of flowers */}
      <g {...part("kurukulla")}>
        <g mask={url("moat-mask")}>
          <path d={MOAT.band} fill={url("moat")} />
          <path d={MOAT.band} fill={url("waves")} opacity={0.7} />
          <path d={MOAT.top} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.7} />
        </g>
        <circle className="m-breathe" cx={KURUKULLA.x} cy={KURUKULLA.y} r={36} fill={url("red")} />
        <circle cx={KURUKULLA.x} cy={KURUKULLA.y} r={5.4} fill="var(--art-vermilion)" />
        <circle cx={KURUKULLA.x} cy={KURUKULLA.y} r={2.2} fill="var(--art-core)" />
        <circle cx={KURUKULLA.x} cy={KURUKULLA.y} r={8.4} stroke="var(--gold)" strokeWidth={0.8} />
        <g transform={`translate(${BOW.x} ${BOW.y}) rotate(90) scale(${BOW.s})`}>
          <FlowerBow />
        </g>
        <g transform={`translate(${NOCK.x} ${NOCK.y}) rotate(90) scale(0.74)`}>
          <FlowerArrow length={66} headClassName="m-twinkle" />
        </g>
      </g>

      {/* The kula hollow, the coiled power asleep in it, and her light rising out of it */}
      <g {...part("hollow")}>
        <ellipse className="m-breathe" cx={PIT.x} cy={PIT.y - 70} rx={52} ry={104} fill={url("rise")} />
        <ellipse cx={PIT.x} cy={PIT.y} rx={PIT.rx + 6} ry={PIT.ry + 3} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1} />
        <ellipse cx={PIT.x} cy={PIT.y + 1} rx={PIT.rx - 4} ry={PIT.ry - 3} fill={url("pit")} stroke="var(--art-musk)" strokeWidth={0.6} strokeOpacity={0.5} />
        <ellipse className="m-breathe" cx={PIT.x} cy={PIT.y} rx={54} ry={20} fill={url("coil-glow")} />
        <Coil d={COIL} w={2.8} />
        <circle className="m-breathe" cx={BINDU.x} cy={BINDU.y} r={16} fill={url("rise")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={3.4} fill="var(--art-core)" />
        <circle cx={BINDU.x} cy={BINDU.y} r={5.6} stroke="var(--gold)" strokeWidth={0.7} />
      </g>

      {/* The kula round her, the assembly of powers */}
      <g {...part("kula")}>
        <KulaAssembly c={RING} rx={RING.rx} ry={RING.ry} glow={url("power-glow")} r={3.6} />
      </g>

      {/* The Kaula path, and the lamps of those set on it */}
      <g {...part("kaula")}>
        <path d={PATH_FILL} fill={url("path")} />
        <path d={`${PATH_L} ${PATH_R}`} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.6} strokeDasharray="3 3" />
        {LAMPS.map((l, k) => (
          <g key={k} transform={`translate(${l.x} ${l.y}) scale(${l.s})`}>
            <Lamp k={k % 3} />
          </g>
        ))}
      </g>

      {/* Kuśa grass cut and tied, and a kuśa ring: the skill of the rite */}
      <g {...part("skilful")}>
        <g transform={`translate(${BUNDLE.x} ${BUNDLE.y}) rotate(${BUNDLE.deg}) scale(${BUNDLE.s})`}>
          <ellipse cy={9} rx={44} ry={4} fill="var(--art-musk)" fillOpacity={0.15} />
          {BLADES.map((d, k) => (
            <path key={k} d={d} stroke={k % 2 ? "var(--leaf)" : "var(--art-turmeric)"} strokeWidth={1.4} strokeLinecap="round" />
          ))}
          <path d={BLADES[4]} stroke="var(--gold)" strokeWidth={0.4} />
          <path d="M -34 -4 V 4" stroke="var(--art-turmeric)" strokeWidth={1.2} />
          <path d="M -10 -6 C -7 -2 -7 2 -10 6 M -5 -6 C -2 -2 -2 2 -5 6" stroke="var(--art-turmeric)" strokeWidth={2.2} strokeLinecap="round" />
          <path d="M -10 -6 C -7 -2 -7 2 -10 6 M -5 -6 C -2 -2 -2 2 -5 6" stroke="var(--gold)" strokeWidth={0.6} />
        </g>
        <g transform={`translate(${PAVITRA.x} ${PAVITRA.y}) scale(1.3)`}>
          <ellipse rx={12} ry={4.4} stroke="var(--leaf)" strokeWidth={2} />
          <ellipse rx={12} ry={4.4} stroke="var(--gold)" strokeWidth={0.5} />
          <path d="M -2 -4.4 C 2 -10 8 -12 12 -14 M 1 -4.2 C 3 -9 4 -12 4 -17" stroke="var(--leaf)" strokeWidth={1.4} strokeLinecap="round" />
        </g>
      </g>

      {/* A sprig of śirīṣa, the softest of flowers: her tender form */}
      <g {...part("tender")}>
        <path d={SIRISA_STEM} stroke="var(--art-musk)" strokeOpacity={0.6} strokeWidth={1.2} strokeLinecap="round" />
        <g transform="translate(496 560) rotate(-30)">
          <path d="M 0 0 H 40" stroke="var(--leaf)" strokeWidth={0.8} />
          {LEAFLETS.map((k) => (
            <g key={k} transform={`translate(${6 + k * 5} 0)`}>
              <ellipse cx={1} cy={-3} rx={1.4} ry={3} fill="var(--leaf)" transform="rotate(20)" />
              <ellipse cx={1} cy={3} rx={1.4} ry={3} fill="var(--leaf)" transform="rotate(-20)" />
            </g>
          ))}
        </g>
        {PUFFS.map((p, k) => (
          <g key={k} transform={`translate(${p.x} ${p.y}) scale(${p.s})`}>
            <g className={k % 2 ? "m-sway m-late" : "m-sway"} style={swingFrom({ x: 0, y: 0 })}>
              {FILAMENTS.map((f) => (
                <g key={f.k}>
                  <path d={`M 0 0 L ${f.tip.x} ${f.tip.y}`} stroke={url("filament")} strokeWidth={0.5} />
                  <circle cx={f.tip.x} cy={f.tip.y} r={0.8} fill="var(--lotus)" />
                </g>
              ))}
              <circle r={2} fill="var(--leaf)" />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
