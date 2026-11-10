/**
 * Shloka 98 — "Ḍākinī at the throat, three-eyed and armed".
 *
 * The hymn goes inside the body, and this verse is the template the next six
 * repeat: seat, colour, eyes, weapons, faces. Under the card the throat's
 * wheel of purification, sixteen petals bearing the sixteen vowels round the
 * sign of space, and in it her light, a light red. In the crown her three
 * eyes, moon, fire and sun, on a slant. At the right the skull-staff of the
 * cremation-ground ascetics, planted, and leaning behind it, fainter, the
 * rest of what she carries, which the manuals never fix. At the left the
 * faces count down the body: one lit, and below it the two, three, four,
 * five and six still to come. Which name each part answers to is written up
 * for readers in the registry, next to this artwork's entry.
 */

import { Axe, Bell, CakraWheel, FaceCount, ThreeEyes, ThreeEyesDefs, Trident, artIds, partProps, trident } from "./primitives";
import type { ArtProps } from "./types";

/* ── The wheel of purification ─────────────────────────────────────────── */

const WHEEL = { x: 320, y: 548, r0: 34, r1: 96 };
const VOWELS = ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ॠ", "ऌ", "ॡ", "ए", "ऐ", "ओ", "औ", "अं", "अः"];

/* ── Her three eyes ────────────────────────────────────────────────────── */

const MOON = { x: 232, y: 36 };
const FIRE = { x: 368, y: 68 };
const SUN = { x: 488, y: 150 };

/* ── The skull-staff, and the rest ─────────────────────────────────────── */

const STAFF = { x: 470, foot: 722, top: 500 };
/** The turned leg of a bed: swellings and collars up the staff. */
const TURNINGS = [
  { y: 700, rx: 7, ry: 12 },
  { y: 660, rx: 5.4, ry: 9 },
  { y: 616, rx: 6.2, ry: 14 },
  { y: 570, rx: 5, ry: 9 },
  { y: 532, rx: 5.6, ry: 10 },
];
const SKULL = { x: STAFF.x, y: STAFF.top - 12 };
const SUTURE = `M ${SKULL.x} ${SKULL.y - 14} l -1.6 3 l 2.6 2.6 l -2.4 3 l 2.2 2.8 l -1.4 2.6 M ${SKULL.x - 12} ${SKULL.y + 4} l 3 -1.8 l 2.2 2 l 3 -2 l 3 1.6 l 1.2 -1.8 l 2.2 1.6 l 3 -1.8 l 2.6 2`;
const RIBBON = `M ${STAFF.x - 4} ${STAFF.top + 4} C ${STAFF.x - 22} ${STAFF.top + 14} ${STAFF.x - 30} ${STAFF.top + 34} ${STAFF.x - 44} ${STAFF.top + 46} L ${STAFF.x - 36} ${STAFF.top + 50} C ${STAFF.x - 26} ${STAFF.top + 40} ${STAFF.x - 18} ${STAFF.top + 22} ${STAFF.x - 4} ${STAFF.top + 12} Z`;
const TRIDENT = trident(506, 520, 712, 1.1);
const AXE = { x: 428, y: 644, s: 1.5, turn: -14 };

/* ── The faces, counted down the body ──────────────────────────────────── */

const COUNT = { x: 162, y0: 478 };

export function ThroatWheel({ idPrefix = "sa98", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <ThreeEyesDefs id={id} />
        <radialGradient id={id("ruddy")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.3" style={{ stopColor: "var(--sindura)", stopOpacity: 0.75 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("wheel")}>
          <stop offset="0" style={{ stopColor: "var(--lotus)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--lotus)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("face")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("ground")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Her three eyes across the sky: the moon, the fire and the sun */}
      <g {...part("three-eyes")}>
        <ThreeEyes moon={MOON} fire={FIRE} sun={SUN} url={url} />
      </g>

      {/* The throat's wheel: sixteen petals, the sixteen vowels, the sign of space */}
      <g {...part("visuddhi")}>
        <CakraWheel c={WHEEL} n={16} r0={WHEEL.r0} r1={WHEEL.r1} fill="var(--lotus)" sign="space" glow={url("wheel")} letters={VOWELS} letterR={72} />
      </g>

      {/* Her light in the wheel, a light red */}
      <g {...part("ruddy")}>
        <circle className="m-breathe" cx={WHEEL.x} cy={WHEEL.y} r={50} fill={url("ruddy")} />
        <circle cx={WHEEL.x} cy={WHEEL.y} r={5.4} fill="var(--art-core)" />
      </g>

      {/* The skull-staff, planted; behind it, fainter, the rest of what she carries */}
      <g {...part("khatvanga")}>
        <g opacity={0.5}>
          <g strokeLinecap="round" strokeLinejoin="round">
            <Trident t={TRIDENT} />
          </g>
          <g transform={`translate(${AXE.x} ${AXE.y}) rotate(${AXE.turn}) scale(${AXE.s})`}>
            <Axe />
          </g>
        </g>
        <ellipse cx={STAFF.x} cy={STAFF.foot + 2} rx={30} ry={6} fill={url("ground")} />
        <path d={`M ${STAFF.x} ${STAFF.foot} L ${STAFF.x} ${STAFF.top}`} stroke="var(--art-ember)" strokeWidth={5} strokeLinecap="round" />
        <path d={`M ${STAFF.x - 1.2} ${STAFF.foot} L ${STAFF.x - 1.2} ${STAFF.top}`} stroke="var(--art-turmeric)" strokeWidth={1} strokeOpacity={0.7} />
        {TURNINGS.map((t, k) => (
          <g key={k}>
            <ellipse cx={STAFF.x} cy={t.y} rx={t.rx} ry={t.ry} fill="var(--art-ember)" stroke="var(--gold)" strokeWidth={0.6} />
            <path d={`M ${STAFF.x - t.rx} ${t.y - t.ry - 2} h ${t.rx * 2} M ${STAFF.x - t.rx} ${t.y + t.ry + 2} h ${t.rx * 2}`} stroke="var(--gold)" strokeWidth={1.6} strokeLinecap="round" />
          </g>
        ))}
        <g className="m-sway" style={{ transformBox: "view-box", transformOrigin: `${STAFF.x}px ${STAFF.top + 6}px` }}>
          <path d={RIBBON} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
        </g>
        <g transform={`translate(${STAFF.x + 7} ${STAFF.top + 4})`}>
          <Bell gem="var(--art-vermilion)" s={0.7} />
        </g>
        <path d={`M ${STAFF.x - 8} ${STAFF.top + 1} h 16`} stroke="var(--gold)" strokeWidth={2.4} strokeLinecap="round" />
        <ellipse cx={SKULL.x} cy={SKULL.y} rx={16} ry={14.6} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.9} />
        <path d={`M ${SKULL.x - 13} ${SKULL.y + 6} C ${SKULL.x - 8} ${SKULL.y + 13} ${SKULL.x + 8} ${SKULL.y + 13} ${SKULL.x + 13} ${SKULL.y + 6}`} stroke="var(--gold-soft)" strokeWidth={0.7} />
        <path d={SUTURE} stroke="var(--art-carve)" strokeWidth={0.7} strokeLinejoin="round" />
      </g>

      {/* The faces counted down the body: one lit, the rest to come */}
      <g {...part("one-face")}>
        <FaceCount x={COUNT.x} y0={COUNT.y0} lit={1} glow={url("face")} />
      </g>
    </svg>
  );
}
