/**
 * Shloka 52 — "All powers, all mantras".
 *
 * Six names, every one beginning with sarva, "all". A rosary of the fifty
 * letters, अ to क्ष, is strung round the whole picture, over the crown and
 * down both sides to its meru at the foot: every mantra is made of these
 * letters, and the letters are her. Inside it her light throws out sparks of
 * its own form (Muṇḍaka 2.1.1), a conch sounds for every auspicious thing, a
 * single haṃsa flies home to her (Śvetāśvatara 1.6), the crowns of Brahmā,
 * Viṣṇu and Indra are bowed down before her footstool (Saundaryalaharī 29),
 * and a nugget of gold lies among the ornaments made of it (Chāndogya
 * 6.1.5). Which name each part answers to is written up for readers in the
 * registry, next to this artwork's entry.
 */

import { VARNAMALA, Conch, Goose, Bangle, artIds, along, glint, hash, partProps, polar, round, through } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── Her light ────────────────────────────────────────────────────────── */

const HER = { x: 320, y: 468 };

/* ── The rosary of letters (akṣamālā) ─────────────────────────────────── */

const MERU = { x: 320, y: 626, r: 12.5 };
const BEAD_R = 10.5;
/** The loop's left half, from the meru up and over to the top of the crown. */
const HALF = through(
  [
    { x: 320, y: 626 },
    { x: 268, y: 620 },
    { x: 214, y: 598 },
    { x: 172, y: 560 },
    { x: 146, y: 510 },
    { x: 134, y: 456 },
    { x: 130, y: 400 },
    { x: 129, y: 330 },
    { x: 129, y: 262 },
    { x: 130, y: 214 },
    { x: 140, y: 172 },
    { x: 166, y: 138 },
    { x: 206, y: 114 },
    { x: 258, y: 100 },
    { x: 320, y: 95 },
  ],
  24,
);
const HALF_LENGTH = along(HALF, 0.5).at(-1)!.s;
const GAP = 25;
const STEP = (HALF_LENGTH - GAP) / 24.5;
const LEFT_BEADS = along(HALF, STEP, GAP).slice(0, 25);
const BEADS = [...LEFT_BEADS, ...[...LEFT_BEADS].reverse().map((b) => ({ ...b, x: round(640 - b.x) }))].map((b, k) => ({ x: b.x, y: b.y, letter: VARNAMALA[k] }));
const LOOP = (() => {
  const left = HALF.map((p) => `${p.x} ${p.y}`);
  const right = [...HALF].reverse().map((p) => `${round(640 - p.x)} ${p.y}`);
  return `M ${left.join(" L ")} L ${right.slice(1).join(" L ")}`;
})();
/** The tassel under the meru: a gathered cord and a fan of threads. */
const TASSEL = Array.from({ length: 9 }, (_, k) => {
  const t = (k - 4) / 4;
  return `M ${round(320 + t * 3)} 652 C ${round(320 + t * 5)} 664 ${round(320 + t * 9)} 676 ${round(320 + t * 12)} 690`;
}).join(" ");

/* ── Sparks of her own form ───────────────────────────────────────────── */

/** Thrown up and out along seven arcs, smaller the further they fly. */
const SPARKS = [152, 128, 108, 90, 72, 52, 28]
  .flatMap((deg, j) =>
    [24, 38, 52, 66, 80].map((dist, k) => {
      const p = polar(HER.x, HER.y, dist + 4 * hash(j, k), deg + Math.sign(deg - 90) * k * 5 + 6 * (hash(k, j) - 0.5));
      return { x: round(p.x), y: round(p.y + k * k * 1.2), s: round(1.4 - k * 0.17), g: (j + k) % 3 };
    }),
  )
  .filter((s) => s.y > 404);

/* ── The conch sounding ───────────────────────────────────────────────── */

/** A śaṅkha lying on its side: its spire to the left, its mouth open below, the canal pointing at her. */
const CONCH = { x: 202, y: 452, turn: 8 };
const SOUND = [14, 24, 34].map((r) => {
  const c = { x: 240, y: 460 };
  const a = polar(c.x, c.y, r, -42);
  const b = polar(c.x, c.y, r, 42);
  return `M ${round(a.x)} ${round(a.y)} A ${r} ${r} 0 0 1 ${round(b.x)} ${round(b.y)}`;
});

/* ── The haṃsa flying home ────────────────────────────────────────────── */

const HAMSA = { x: 446, y: 478, k: 3.4, turn: 6 };
const HAMSA_FEATHERS = "M 0.4 -2.6 C 1.6 -6 3.4 -9 6.4 -11.2 M 1.8 -2.2 C 3 -5 4.6 -7.6 7 -9.4 M 3 -1.8 C 4.2 -4 5.4 -5.8 7.2 -7 M -3 1 C 0 1.6 3 1.4 6 0.4";
/** Its course, a dotted line back the way it came. */
const COURSE = "M 478 474 C 490 470 500 460 506 446";

/* ── The crowns bowed before her footstool ────────────────────────────── */

const STOOL = { x: 320, y: 514, w: 96, h: 11 };
/** Viṣṇu's tall kirīṭa, base at the origin. */
const KIRITA = "M -15 0 L -11.5 -38 L 11.5 -38 L 15 0 Z";
const KIRITA_CAP = "M -11.5 -38 C -9 -46 -4 -52 0 -58 C 4 -52 9 -46 11.5 -38 Z";
const KIRITA_BANDS = "M -14.2 -8 L 14.2 -8 M -13 -22 L 13 -22 M -11.5 -38 L 11.5 -38";
/** Indra's makuṭa: a band under five pointed leaves. */
const MAKUTA_BAND = "M -18 0 L -18 -10 L 18 -10 L 18 0 Z";
const MAKUTA_LEAVES = [-14, -7, 0, 7, 14]
  .map((x, i) => {
    const h = [20, 27, 32, 27, 20][i];
    return `M ${x - 4.6} -10 C ${x - 4.6} ${-10 - h * 0.5} ${x - 1.6} ${-10 - h * 0.8} ${x} ${-10 - h} C ${x + 1.6} ${-10 - h * 0.8} ${x + 4.6} ${-10 - h * 0.5} ${x + 4.6} -10 Z`;
  })
  .join(" ");
/** Brahmā's karaṇḍa-mukuṭa: three tiers, each narrower, under a bud. */
const KARANDA = [
  { w: 32, y: 0, h: 13 },
  { w: 24, y: -13, h: 11 },
  { w: 16, y: -24, h: 9 },
];
const CROWNS = [
  { kind: "karanda", x: 250, y: 590, turn: 14 },
  { kind: "kirita", x: 320, y: 604, turn: 0 },
  { kind: "makuta", x: 390, y: 590, turn: -14 },
] as const;

/* ── Gold, and all that is made of gold ───────────────────────────────── */

const GOLD = { x: 218, y: 536 };

const NUGGET = "M -12 2 C -15 -3 -12 -9 -6 -10 C -2 -13 5 -12 8 -8 C 13 -6 14 0 11 4 C 8 8 1 8 -4 7 C -8 7 -11 5 -12 2 Z";
const NUGGET_FACETS = "M -6 -10 L -2 -3 L 8 -8 M -2 -3 L -4 7 M -2 -3 L 11 4 M -12 2 L -2 -3";
/** A necklace laid in a loop, and its pendant. */
const NECKLACE = Array.from({ length: 15 }, (_, k) => {
  const t = (k / 14) * Math.PI;
  return { x: round(-20 * Math.cos(t)), y: round(10 * Math.sin(t)) };
});

export function LetterRosary({ idPrefix = "sa52", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={210} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient
          id={id("floor")}
          cx={320}
          cy={590}
          r={190}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(320 590) scale(1 0.22) translate(-320 -590)"
        >
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.34 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bead")} cx={-3} cy={-4} r={13} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)" }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-moon)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)" }} />
        </radialGradient>
        <linearGradient id={id("crown")} x1={0} y1={-58} x2={0} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold)" }} />
        </linearGradient>
        <radialGradient id={id("gold-glow")} cx={GOLD.x} cy={GOLD.y} r={54} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Her light, on her footstool */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={210} fill={url("glow")} />
        <ellipse cx={320} cy={590} rx={190} ry={42} fill={url("floor")} />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={46} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={15} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={11} fill="var(--art-saffron)" fillOpacity={0.5} />
        <circle cx={HER.x} cy={HER.y} r={6.5} fill="var(--art-core)" />
      </g>

      {/* Sparks thrown out of her fire, each of her own form */}
      <g {...part("sparks")}>
        {SPARKS.map((s, i) => (
          <g key={i} className={TWINKLE[s.g]}>
            <circle cx={s.x} cy={s.y} r={6 * s.s} fill={url("bindu-glow")} />
            <circle cx={s.x} cy={s.y} r={3.6 * s.s} stroke="var(--art-core)" strokeWidth={0.5} strokeOpacity={0.9} />
            <circle cx={s.x} cy={s.y} r={2.2 * s.s} fill="var(--art-saffron)" fillOpacity={0.6} />
            <circle cx={s.x} cy={s.y} r={1.3 * s.s} fill="var(--art-core)" />
          </g>
        ))}
      </g>

      {/* The conch, sounding */}
      <g {...part("conch")}>
        <g transform={`translate(${CONCH.x} ${CONCH.y}) rotate(${CONCH.turn})`}>
          <Conch />
        </g>
        <g stroke="var(--gold-soft)" strokeWidth={1} strokeLinecap="round">
          {SOUND.map((d, i) => (
            <path key={i} className={TWINKLE[i]} d={d} />
          ))}
        </g>
      </g>

      {/* The haṃsa, flying home to her */}
      <g {...part("hamsa")}>
        <path d={COURSE} stroke="var(--gold-soft)" strokeWidth={1} strokeDasharray="1 5" strokeLinecap="round" />
        <g transform={`translate(${HAMSA.x} ${HAMSA.y}) rotate(${HAMSA.turn}) scale(${HAMSA.k})`}>
          <Goose up />
          <path d={HAMSA_FEATHERS} stroke="var(--gold)" strokeWidth={0.32} strokeOpacity={0.8} strokeLinecap="round" />
          <path d="M 8 -2 L 12 -3.4 L 11 0.6 Z" fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.3} strokeLinejoin="round" />
        </g>
      </g>

      {/* Her footstool, and the crowns of the gods bowed before it */}
      <g {...part("crowns")}>
        <path
          d={`M ${STOOL.x - STOOL.w / 2} ${STOOL.y} L ${STOOL.x + STOOL.w / 2} ${STOOL.y} L ${STOOL.x + STOOL.w / 2 - 6} ${STOOL.y + STOOL.h} L ${STOOL.x - STOOL.w / 2 + 6} ${STOOL.y + STOOL.h} Z`}
          fill="var(--art-crimson)"
          fillOpacity={0.8}
          stroke="var(--gold)"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        <path
          d={`M ${STOOL.x - STOOL.w / 2 + 10} ${STOOL.y + STOOL.h} L ${STOOL.x - STOOL.w / 2 + 6} ${STOOL.y + STOOL.h + 10} M ${STOOL.x + STOOL.w / 2 - 10} ${STOOL.y + STOOL.h} L ${STOOL.x + STOOL.w / 2 - 6} ${STOOL.y + STOOL.h + 10}`}
          stroke="var(--gold)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <path
          d={`M ${STOOL.x - STOOL.w / 2 - 4} ${STOOL.y} L ${STOOL.x + STOOL.w / 2 + 4} ${STOOL.y}`}
          stroke="var(--gold)"
          strokeWidth={2.4}
          strokeLinecap="round"
        />
        <g fill="var(--gold-soft)">
          {[-40, -20, 0, 20, 40].map((dx) => (
            <circle key={dx} cx={STOOL.x + dx} cy={STOOL.y + 6.4} r={1.6} />
          ))}
        </g>
        {CROWNS.map((c) => (
          <g key={c.kind} transform={`translate(${c.x} ${c.y}) rotate(${c.turn}) scale(1.18)`}>
            <ellipse cx={0} cy={1} rx={20} ry={3.4} fill="var(--art-musk)" fillOpacity={0.16} />
            {c.kind === "kirita" && (
              <>
                <path d={KIRITA_CAP} fill={url("crown")} stroke="var(--art-carve)" strokeWidth={0.6} strokeLinejoin="round" />
                <path d={KIRITA} fill={url("crown")} stroke="var(--art-carve)" strokeWidth={0.6} strokeLinejoin="round" />
                <path d={KIRITA_BANDS} stroke="var(--art-carve)" strokeWidth={0.7} />
                <circle cx={0} cy={-61} r={2.8} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.6} />
                <circle cx={0} cy={-15} r={4.6} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
                <circle cx={0} cy={-15} r={2.8} fill="var(--art-vermilion)" />
                <g fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.3}>
                  {[-9, -4.5, 4.5, 9].map((x) => (
                    <circle key={x} cx={x} cy={-30} r={1.6} />
                  ))}
                </g>
                <g fill="var(--art-ivory)">
                  {[-11, -5.5, 0, 5.5, 11].map((x) => (
                    <circle key={x} cx={x} cy={-3.6} r={1.4} />
                  ))}
                </g>
              </>
            )}
            {c.kind === "makuta" && (
              <>
                <path d={MAKUTA_LEAVES} fill={url("crown")} stroke="var(--art-carve)" strokeWidth={0.6} strokeLinejoin="round" />
                <path d={MAKUTA_BAND} fill={url("crown")} stroke="var(--art-carve)" strokeWidth={0.6} strokeLinejoin="round" />
                <g fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.4}>
                  {[-14, -7, 0, 7, 14].map((x, i) => (
                    <circle key={x} cx={x} cy={-10 - [20, 27, 32, 27, 20][i] * 0.45} r={i === 2 ? 2.8 : 2} />
                  ))}
                </g>
                <g fill="var(--art-vermilion)">
                  {[-12, -6, 0, 6, 12].map((x) => (
                    <circle key={x} cx={x} cy={-5} r={1.5} />
                  ))}
                </g>
              </>
            )}
            {c.kind === "karanda" && (
              <>
                {KARANDA.map((t) => (
                  <path
                    key={t.y}
                    d={`M ${-t.w / 2} ${t.y} L ${-t.w / 2 + 2} ${t.y - t.h} L ${t.w / 2 - 2} ${t.y - t.h} L ${t.w / 2} ${t.y} Z`}
                    fill={url("crown")}
                    stroke="var(--art-carve)"
                    strokeWidth={0.6}
                    strokeLinejoin="round"
                  />
                ))}
                <path d="M -6 -33 C -6 -39 -2 -43 0 -46 C 2 -43 6 -39 6 -33 Z" fill={url("crown")} stroke="var(--art-carve)" strokeWidth={0.6} />
                <g fill="var(--art-vermilion)">
                  <path d="M 0 -3 C -3 -5 -4 -8 -3 -10 C -1.6 -9 0 -7.4 0 -6 C 0 -7.4 1.6 -9 3 -10 C 4 -8 3 -5 0 -3 Z" />
                  {[-11, 11].map((x) => (
                    <circle key={x} cx={x} cy={-6.4} r={1.5} />
                  ))}
                  {[-6, 6].map((x) => (
                    <circle key={x} cx={x} cy={-18.4} r={1.4} />
                  ))}
                  <circle cx={0} cy={-28.6} r={1.6} />
                </g>
              </>
            )}
          </g>
        ))}
      </g>

      {/* A nugget of gold among the things made of it */}
      <g {...part("gold")}>
        <circle cx={GOLD.x} cy={GOLD.y} r={54} fill={url("gold-glow")} />
        <g transform={`translate(${GOLD.x - 458} ${GOLD.y - 548})`}>
          <g transform="translate(470 572)">
            <path d={NECKLACE.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ")} stroke="var(--gold)" strokeWidth={1} />
            <g fill="var(--gold)">
              {NECKLACE.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={1.6} />
              ))}
            </g>
            <path d="M 0 10 L -3.4 15 L 0 21 L 3.4 15 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.4} />
            <circle cx={0} cy={15.6} r={1.6} fill="var(--art-vermilion)" />
          </g>
          <g transform="translate(486 540) rotate(-20) scale(1.1)">
            <Bangle />
          </g>
          <g transform="translate(432 566)">
            <circle r={5.4} stroke="var(--gold)" strokeWidth={2} />
            <circle cy={-6.4} r={2.4} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.6} />
          </g>
          <g transform="translate(452 528)">
            <circle r={6} stroke="var(--gold)" strokeWidth={1.4} />
            <circle cy={6} r={2} fill="var(--gold)" />
            <path d="M 0 8 L -2 12 L 0 15 L 2 12 Z" fill="var(--gold)" />
          </g>
          <g transform="translate(458 552)">
            <path d={NUGGET} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.7} strokeLinejoin="round" />
            <path d={NUGGET_FACETS} stroke="var(--art-carve)" strokeWidth={0.5} strokeOpacity={0.6} />
            <path className="m-twinkle" d={glint(5)} transform="translate(-4 -6)" fill="var(--art-core)" />
          </g>
        </g>
      </g>

      {/* The rosary of the fifty letters */}
      <g {...part("mantra")}>
        <path d={LOOP} stroke="var(--gold)" strokeWidth={1.2} />
        {BEADS.map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${b.y})`}>
            <circle r={BEAD_R} fill={url("bead")} stroke="var(--gold)" strokeWidth={0.9} />
            <text
              y={4.4}
              textAnchor="middle"
              fontSize={b.letter.length > 1 && b.letter !== "क्ष" ? 10.5 : 12.5}
              fill="var(--sindura)"
              style={{ fontFamily: "var(--font-tiro), serif" }}
            >
              {b.letter}
            </text>
          </g>
        ))}
      </g>

      {/* The meru, where the first letter and the last meet */}
      <g {...part("meru")}>
        <path d={TASSEL} stroke="var(--art-vermilion)" strokeWidth={1.1} strokeLinecap="round" />
        <path d="M 320 636 L 320 652" stroke="var(--gold)" strokeWidth={1.6} />
        <rect x={315} y={650} width={10} height={5} rx={1.6} fill="var(--gold)" />
        <circle cx={MERU.x} cy={MERU.y} r={MERU.r} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
        <circle cx={MERU.x} cy={MERU.y} r={MERU.r - 4} stroke="var(--art-carve)" strokeWidth={0.5} strokeOpacity={0.5} />
        <path className="m-twinkle" d={glint(6)} transform={`translate(${MERU.x - 4} ${MERU.y - 5})`} fill="var(--art-core)" />
      </g>
    </svg>
  );
}
