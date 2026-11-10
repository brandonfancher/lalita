/**
 * Shloka 94 — "Mother of two sons, and then nine words for what people want".
 *
 * The verse names her the mother of Kumāra and of the lord of the hosts, and
 * then stops describing her and lists goods. Under the card her light, radiant,
 * and either side of it her sons as lights: Kumāra ringed by the six Kṛttikā
 * stars who fostered him, his spear beside him, and Gaṇeśa's light ruddy as
 * the dawn, his mouse at its foot. Round them, each good as one plain thing:
 * the mountain in the crown for steadfastness, a ripe sheaf for nourishment, a
 * svastika drawn on the ground for wellbeing, Nandinī the wish-cow with her
 * calf, a still pool for peace, a pot full to the brim for contentment, the
 * book for understanding, and in front the engine of obstacles, broken. Which
 * name each part answers to is written up for readers in the registry, next to
 * this artwork's entry.
 */

import { artIds, BookOnStand, BrokenSlab, Cow, DawnDefs, glint, Mouse, partProps, polar, round, type Slab } from "./primitives";
import type { ArtProps } from "./types";

/* ── Her light, radiant ────────────────────────────────────────────────── */

const HER = { x: 320, y: 488 };
const RAYS = Array.from({ length: 16 }, (_, k) => {
  const deg = k * 22.5 + 11.25;
  return { a: polar(HER.x, HER.y, 26, deg), b: polar(HER.x, HER.y, k % 2 ? 58 : 76, deg), k };
});

/* ── Her two sons ──────────────────────────────────────────────────────── */

const KUMARA = { x: 186, y: 498 };
const KRTTIKAS = Array.from({ length: 6 }, (_, k) => ({ ...polar(KUMARA.x, KUMARA.y, 24, 90 + k * 60), k }));
const SPEAR = { x: 150, foot: 552, top: 444 };
const VEL = `M ${SPEAR.x} ${SPEAR.top} C ${SPEAR.x + 9} ${SPEAR.top + 12} ${SPEAR.x + 10} ${SPEAR.top + 26} ${SPEAR.x} ${SPEAR.top + 36} C ${SPEAR.x - 10} ${SPEAR.top + 26} ${SPEAR.x - 9} ${SPEAR.top + 12} ${SPEAR.x} ${SPEAR.top} Z`;
const GANESA = { x: 452, y: 540 };
const MOUSE = { x: 482, y: 596, k: 1.2 };

/* ── The mountain, steadfast ───────────────────────────────────────────── */

const MOUNTAIN = "M 232 214 L 300 140 L 330 156 L 420 44 L 470 104 L 492 92 L 590 214 Z";
const SNOW = "M 420 44 L 448 78 L 436 74 L 428 86 L 414 76 L 402 84 L 396 74 Z M 492 92 L 506 110 L 496 108 L 488 114 L 480 106 Z";
const RIDGES = "M 420 44 L 410 96 L 418 140 L 404 190 M 330 156 L 340 186 M 470 104 L 462 150 M 492 92 L 520 160";

/* ── The ripe sheaf ────────────────────────────────────────────────────── */

const SHEAF = { x: 144, y: 650 };
const STALKS = Array.from({ length: 9 }, (_, k) => {
  const spread = (k - 4) / 4;
  const top = { x: round(SHEAF.x + spread * 26), y: round(SHEAF.y - 74 + Math.abs(spread) * 10) };
  const tip = { x: round(top.x + (spread >= 0 ? 12 : -12) + spread * 6), y: top.y + 22 };
  return { top, tip, spread, k };
});

/* ── The svastika on the ground ────────────────────────────────────────── */

const SVASTI = { x: 320, y: 616 };
const SVASTIKA = "M 0 -16 V 16 M -16 0 H 16 M 0 -16 H 16 M 16 0 V 16 M 0 16 H -16 M -16 0 V -16";
const SVASTI_DOTS = [
  { x: 8, y: -8 },
  { x: 8, y: 8 },
  { x: -8, y: 8 },
  { x: -8, y: -8 },
];

/* ── Nandinī and her calf ──────────────────────────────────────────────── */

const COW = { x: 470, y: 652, s: 0.86 };
const CALF = { x: 402, y: 652, s: 0.44 };

/* ── The front: a still pool, the full pot, the book, the broken engine ── */

const POOL = { x: 196, y: 726, rx: 56, ry: 13 };
const POT = { x: 278, y: 722 };
const BOOK = { x: 466, y: 718, k: 0.92 };
const SLAB: Slab = { x: 370, y: 762, hu: 50, hv: 18, depth: 6 };

export function MotherOfTwoSons({ idPrefix = "sa94", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <DawnDefs id={id} />
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.32" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("saffron")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.75 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        {RAYS.map((r) => (
          <linearGradient key={r.k} id={id(`ray-${r.k}`)} x1={r.a.x} y1={r.a.y} x2={r.b.x} y2={r.b.y} gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0.8 }} />
            <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          </linearGradient>
        ))}
        <linearGradient id={id("mountain")} x1={0} y1={44} x2={0} y2={214} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("mountain-edge")} x1={0} y1={44} x2={0} y2={214} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("pool")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.65 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.15 }} />
        </radialGradient>
        <radialGradient id={id("shadow")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.25 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The mountain, the steadfast one, her father's */}
      <g {...part("steadfast")}>
        <path d={MOUNTAIN} fill={url("mountain")} stroke={url("mountain-edge")} strokeWidth={1} strokeLinejoin="round" />
        <path d={RIDGES} stroke={url("mountain-edge")} strokeWidth={0.6} strokeOpacity={0.6} strokeLinecap="round" />
        <path d={SNOW} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
      </g>

      {/* Her light, radiant */}
      <g {...part("radiance")}>
        {RAYS.map((r) => (
          <path key={r.k} className={r.k % 2 ? "m-shimmer m-late" : "m-shimmer"} d={`M ${r.a.x} ${r.a.y} L ${r.b.x} ${r.b.y}`} stroke={url(`ray-${r.k}`)} strokeWidth={1.2} strokeLinecap="round" />
        ))}
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={46} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={4.8} fill="var(--art-core)" />
        <circle cx={HER.x} cy={HER.y} r={8} stroke="var(--gold)" strokeWidth={0.8} />
      </g>

      {/* Her two sons: Kumāra among the six Kṛttikās with his spear, and Gaṇeśa's dawn-red light with his mouse */}
      <g {...part("sons")}>
        <ellipse cx={SPEAR.x} cy={SPEAR.foot + 1} rx={10} ry={2} fill={url("shadow")} />
        <path d={`M ${SPEAR.x} ${SPEAR.top + 30} V ${SPEAR.foot}`} stroke="var(--gold)" strokeWidth={1.8} strokeLinecap="round" />
        <path d={VEL} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
        <path d={`M ${SPEAR.x} ${SPEAR.top + 6} V ${SPEAR.top + 30}`} stroke="var(--gold)" strokeWidth={0.6} />
        <path d={`M ${SPEAR.x - 4} ${SPEAR.top + 38} H ${SPEAR.x + 4}`} stroke="var(--art-vermilion)" strokeWidth={2.4} strokeLinecap="round" />
        <circle className="m-breathe" cx={KUMARA.x} cy={KUMARA.y} r={30} fill={url("saffron")} />
        {KRTTIKAS.map((s) => (
          <path key={s.k} className={["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"][s.k % 3]} d={glint(4)} transform={`translate(${s.x} ${s.y})`} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.4} />
        ))}
        <circle cx={KUMARA.x} cy={KUMARA.y} r={4.6} fill="var(--art-saffron)" />
        <circle cx={KUMARA.x} cy={KUMARA.y} r={7.4} stroke="var(--gold)" strokeWidth={0.8} />

        <circle className="m-breathe" cx={GANESA.x} cy={GANESA.y} r={40} fill={url("dawn")} />
        <circle cx={GANESA.x} cy={GANESA.y} r={9} stroke="var(--gold)" strokeWidth={0.9} />
        <circle cx={GANESA.x} cy={GANESA.y} r={5.6} fill="var(--art-vermilion)" />
        <circle cx={GANESA.x - 1.4} cy={GANESA.y - 1.4} r={1.6} fill="var(--art-saffron)" />
        <ellipse cx={MOUSE.x} cy={MOUSE.y + 1} rx={20} ry={2.6} fill={url("shadow")} />
        <g transform={`translate(${MOUSE.x} ${MOUSE.y}) scale(${-MOUSE.k} ${MOUSE.k})`}>
          <Mouse />
        </g>
      </g>

      {/* A ripe sheaf, its ears bowed with grain */}
      <g {...part("nourishment")}>
        <ellipse cx={SHEAF.x} cy={SHEAF.y} rx={30} ry={4} fill={url("shadow")} />
        {STALKS.map((s) => (
          <g key={s.k}>
            <path d={`M ${round(SHEAF.x + s.spread * 8)} ${SHEAF.y} Q ${SHEAF.x} ${SHEAF.y - 34} ${s.top.x} ${s.top.y}`} stroke="var(--art-turmeric)" strokeWidth={1.2} strokeLinecap="round" />
            <path d={`M ${s.top.x} ${s.top.y} Q ${round((s.top.x + s.tip.x) / 2)} ${s.top.y - 4} ${s.tip.x} ${s.tip.y}`} stroke="var(--gold)" strokeWidth={0.6} />
            {[0.2, 0.4, 0.6, 0.8, 1].map((t, k) => (
              <ellipse
                key={k}
                cx={round(s.top.x + (s.tip.x - s.top.x) * t)}
                cy={round(s.top.y + (s.tip.y - s.top.y) * t * t - 3 * Math.sin(Math.PI * t))}
                rx={1.3}
                ry={2.4}
                transform={`rotate(${s.spread >= 0 ? -30 : 30} ${round(s.top.x + (s.tip.x - s.top.x) * t)} ${round(s.top.y + (s.tip.y - s.top.y) * t * t - 3 * Math.sin(Math.PI * t))})`}
                fill="var(--art-turmeric)"
                stroke="var(--gold)"
                strokeWidth={0.3}
              />
            ))}
          </g>
        ))}
        <path d={`M ${SHEAF.x - 9} ${SHEAF.y - 26} Q ${SHEAF.x} ${SHEAF.y - 22} ${SHEAF.x + 9} ${SHEAF.y - 26}`} stroke="var(--leaf)" strokeWidth={3} strokeLinecap="round" />
      </g>

      {/* A svastika drawn on the ground before her: it is well */}
      <g {...part("wellbeing")}>
        <g transform={`translate(${SVASTI.x} ${SVASTI.y}) scale(1.3 0.55)`}>
          <path d={SVASTIKA} stroke="var(--art-vermilion)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          {SVASTI_DOTS.map((d, k) => (
            <circle key={k} cx={d.x} cy={d.y} r={2} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.4} />
          ))}
        </g>
      </g>

      {/* Nandinī, the wish-cow, and her calf */}
      <g {...part("nandini")}>
        <ellipse cx={COW.x - 24} cy={COW.y} rx={70} ry={4} fill={url("shadow")} />
        <g transform={`translate(${CALF.x} ${CALF.y}) scale(${-CALF.s} ${CALF.s})`}>
          <Cow />
        </g>
        <g transform={`translate(${COW.x} ${COW.y}) scale(${COW.s})`}>
          <Cow />
        </g>
      </g>

      {/* A still pool, grown quiet, her light lying unbroken in it */}
      <g {...part("peace")}>
        <ellipse cx={POOL.x} cy={POOL.y} rx={POOL.rx + 4} ry={POOL.ry + 2} fill="var(--art-stone)" stroke="var(--gold-soft)" strokeWidth={0.8} />
        <ellipse cx={POOL.x} cy={POOL.y} rx={POOL.rx} ry={POOL.ry} fill={url("pool")} />
        <ellipse cx={POOL.x + 6} cy={POOL.y - 1} rx={3} ry={6} fill="var(--art-core)" fillOpacity={0.8} />
        <ellipse cx={POOL.x + 6} cy={POOL.y - 1} rx={8} ry={10} fill="var(--art-core)" fillOpacity={0.2} />
      </g>

      {/* A pot full to the brim, and no more */}
      <g {...part("contentment")}>
        <g transform={`translate(${POT.x} ${POT.y})`}>
          <ellipse cy={18} rx={22} ry={3.4} fill={url("shadow")} />
          <path d="M -9 -14 C -24 -10 -26 12 -10 17 L 10 17 C 26 12 24 -10 9 -14 Z" fill="var(--art-ember)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path d="M -21 0 C -8 4 8 4 21 0" stroke="var(--art-turmeric)" strokeWidth={1.4} strokeOpacity={0.8} />
          <ellipse cy={-14} rx={11} ry={3} fill="var(--art-ember)" stroke="var(--gold)" strokeWidth={0.8} />
          <ellipse cy={-14.4} rx={8.6} ry={2} fill="var(--art-ivory)" />
          <ellipse cx={-2} cy={-14.8} rx={3.4} ry={0.8} fill="var(--art-core)" />
        </g>
      </g>

      {/* The book, for understanding */}
      <g {...part("understanding")}>
        <g transform={`translate(${BOOK.x} ${BOOK.y}) scale(${BOOK.k})`}>
          <BookOnStand />
        </g>
      </g>

      {/* The engine of obstacles, broken */}
      <g {...part("obstacles")}>
        <ellipse cx={SLAB.x + 4} cy={SLAB.y + SLAB.hv + 10} rx={SLAB.hu + 20} ry={7} fill={url("shadow")} />
        <circle className="m-breathe" cx={SLAB.x} cy={SLAB.y} r={34} fill={url("her")} opacity={0.5} />
        <BrokenSlab slab={SLAB} id={id} url={url} layer="stone" />
        <BrokenSlab slab={SLAB} id={id} url={url} layer="figure" />
        <path className="m-lick" d={glint(11)} transform={`translate(${SLAB.x} ${SLAB.y - 2})`} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.4} />
      </g>
    </svg>
  );
}
