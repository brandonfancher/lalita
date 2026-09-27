/**
 * Shloka 7 — "A campaka bud, and a jewel that shames the stars".
 *
 * The verse spends both its lines on her nose, and the artwork draws what the
 * names compare it to. Her nose is a campaka newly opened, a slender stem of
 * pale gold that grows straight up. On its flank is the nose stud of the
 * southern temple images, seven diamonds in gold, so bright that no star
 * shows anywhere near it: the stars come out only at the edges of the sky,
 * and those nearest are put out. Which name each part answers to is written
 * up for readers in the registry, next to this artwork's entry.
 */

import { artIds, campakaPetal, Flash, glint, partProps, polar, round, Star } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const CX = 320;

/* ── The campaka ────────────────────────────────────────────────────────── */

const CALYX_Y = 596;

/**
 * Petals of the just-opened flower, seen from the side: base x, lean
 * (degrees), length, width, and tip offset. Most still stand nearly closed;
 * only the outer ones have begun to part.
 */
type Petal = { x: number; a: number; l: number; w: number; t: number };
const BACK_PETALS: Petal[] = [
  { x: 315, a: -13, l: 164, w: 11, t: -12 },
  { x: 325, a: 12, l: 176, w: 11, t: 11 },
  { x: 317, a: -6, l: 198, w: 11, t: -5 },
  { x: 323, a: 6, l: 192, w: 11, t: 6 },
];
const FRONT_PETALS: Petal[] = [
  { x: 313, a: -17, l: 140, w: 12, t: -20 },
  { x: 327, a: 16, l: 150, w: 12, t: 19 },
  { x: 315, a: -9, l: 180, w: 11, t: -9 },
  { x: 325, a: 9, l: 172, w: 11, t: 10 },
  { x: 318, a: -3, l: 206, w: 11, t: -3 },
  { x: 322, a: 3, l: 212, w: 11, t: 4 },
  { x: 320, a: 0, l: 218, w: 11, t: 1 },
];
const petalAt = (p: Petal) => `translate(${p.x} ${CALYX_Y}) rotate(${p.a})`;
const petalVein = (p: Petal) => `M 0 -8 Q ${round(p.t * 0.3)} ${round(-p.l * 0.5)} ${round(p.t * 0.85)} ${round(-p.l * 0.9)}`;

const SEPALS = [-34, 0, 34].map((a) => ({ a, d: campakaPetal(a ? 26 : 30, 7, a / 6) }));

const STEM = `M 317 ${CALYX_Y + 6} C 316.5 680 316 740 315.5 812 L 324.5 812 C 324 740 323.5 680 323 ${CALYX_Y + 6} Z`;

/** A campaka leaf, lance-shaped, base at the origin, pointing along +x and curling up by `curl`. */
function leaf(l: number, w: number, curl: number) {
  const blade = `M 0 0 C ${round(l * 0.28)} ${-w} ${round(l * 0.72)} ${round(-w * 0.75 - curl)} ${l} ${-curl} C ${round(l * 0.72)} ${round(w * 0.75 - curl)} ${round(l * 0.28)} ${w} 0 0 Z`;
  const rib = `M 0 0 Q ${round(l * 0.55)} ${round(-curl * 0.35)} ${round(l * 0.97)} ${round(-curl * 0.97)}`;
  const veins = [0.2, 0.34, 0.48, 0.62, 0.76]
    .map((u) => {
      const x = round(u * l);
      const y = round(-curl * u * u);
      const h = round(w * 0.62 * (1 - u * 0.7));
      return `M ${x} ${y} L ${round(x + 12)} ${round(y - h)} M ${x} ${y} L ${round(x + 12)} ${round(y + h)}`;
    })
    .join(" ");
  return { blade, rib, veins };
}
const LEAVES = [
  { at: `translate(${CX + 2} 688) rotate(-30)`, ...leaf(124, 20, 10) },
  { at: `translate(${CX - 2} 724) scale(-1 1) rotate(-26)`, ...leaf(112, 18, 9) },
];

/* ── The nose stud ──────────────────────────────────────────────────────── */

const JEWEL = { x: 358, y: 500 };
const SETTING_R = 19;

/** The seven stones: one in the middle, six round it, one straight up and one straight down. */
const STONES = [
  { x: JEWEL.x, y: JEWEL.y, r: 6.4 },
  ...Array.from({ length: 6 }, (_, k) => ({ ...polar(JEWEL.x, JEWEL.y, 11.6, 90 + k * 60), r: 4.6 })),
];
const SETTING_BEADS = Array.from({ length: 12 }, (_, k) => polar(JEWEL.x, JEWEL.y, 17.4, 60 + k * 30));

/** A diamond seen face-on: an eight-sided girdle, the table, and the facets between them. */
function diamond({ x, y, r }: Pt & { r: number }) {
  const ring = (rr: number) => Array.from({ length: 8 }, (_, k) => polar(x, y, rr, 22.5 + k * 45));
  const girdle = ring(r);
  const table = ring(r * 0.48);
  const poly = (ps: Pt[]) => `M ${ps.map((p) => `${p.x} ${p.y}`).join(" L ")} Z`;
  return {
    girdle: poly(girdle),
    table: poly(table),
    facets: girdle.map((g, k) => `M ${table[k].x} ${table[k].y} L ${g.x} ${g.y}`).join(" "),
  };
}
const DIAMONDS = STONES.map((s) => ({ ...s, ...diamond(s) }));
const FLASHING = [
  { stone: 0, group: 0 },
  { stone: 2, group: 1 },
  { stone: 5, group: 2 },
];

/** The stud's fire: sixteen hair-fine rays, the one climbing toward the sky the longest. */
const RAYS = Array.from({ length: 16 }, (_, k) => {
  const deg = 90 + k * 22.5;
  const len = k % 2 ? 56 : ({ 0: 290, 4: 124, 8: 104, 12: 124 } as Record<number, number>)[k] ?? 150;
  const a = polar(JEWEL.x, JEWEL.y, 24, deg);
  const b = polar(JEWEL.x, JEWEL.y, len, deg);
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}).join(" ");

const PEARL = { x: JEWEL.x, y: JEWEL.y + SETTING_R + 13, r: 7 };

/* ── The stars ──────────────────────────────────────────────────────────── */

/** A small deterministic generator, so the sky is the same on the server and in the browser. */
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** The brightest stars, high in the sky where the stud's light doesn't reach. */
const BRIGHT_STARS = [
  { x: 262, y: 40, s: 7 },
  { x: 408, y: 26, s: 7.5 },
  { x: 504, y: 108, s: 6.5 },
  { x: 566, y: 38, s: 6 },
  { x: 188, y: 28, s: 6 },
];

type Sky = { x: number; y: number; s: number; kind: "star" | "dim" | "veiled" };

/**
 * Stars across the sky, each one dimmer the nearer it is to the stud: far off
 * they twinkle, nearer they fade to points and then to faint rings, and close
 * to it there are none. None behind the card, where they would only frost.
 */
const SKY: Sky[] = (() => {
  const rand = lcg(7);
  const out: Sky[] = [];
  for (let gy = 6; gy < 800; gy += 36) {
    for (let gx = 56; gx < 600; gx += 38) {
      const keep = rand() < 0.62;
      const x = round(gx + rand() * 38);
      const y = round(gy + rand() * 36);
      const size = rand();
      if (!keep) continue;
      if (x > 136 && x < 504 && y > 180 && y < 400) continue;
      if (x < 110 && y > 360) continue;
      if (x > 190 && x < 450 && y > 590) continue;
      if (BRIGHT_STARS.some((b) => Math.hypot(b.x - x, b.y - y) < 26)) continue;
      const d = Math.hypot(x - JEWEL.x, y - JEWEL.y);
      if (d < 200) continue;
      const kind = d < 262 ? "veiled" : d < 336 ? "dim" : "star";
      out.push({ x, y, s: round(2 + size * 2.6), kind });
    }
  }
  return out;
})();

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

export function CampakaJewel({ idPrefix = "sa7", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient
          id={id("aura")}
          cx={CX}
          cy={490}
          r={170}
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${CX} 490) scale(0.62 1) translate(${-CX} -490)`}
        >
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.3 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("petal")} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-ivory)" }} />
        </linearGradient>
        <radialGradient id={id("jewel-glow")} cx={JEWEL.x} cy={JEWEL.y} r={120} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.16" style={{ stopColor: "var(--art-core)", stopOpacity: 0.55 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("white-heat")} cx={JEWEL.x} cy={JEWEL.y} r={36} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.95 }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("rays")} cx={JEWEL.x} cy={JEWEL.y} r={290} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The stars, put out wherever the stud's light reaches */}
      <g {...part("stars")}>
        {SKY.map((s, i) =>
          s.kind === "star" ? (
            <Star key={i} x={s.x} y={s.y} s={s.s} className={TWINKLE[i % 3]} />
          ) : s.kind === "dim" ? (
            <circle key={i} cx={s.x} cy={s.y} r={1.1} fill="var(--gold-soft)" fillOpacity={0.55} />
          ) : (
            <circle key={i} cx={s.x} cy={s.y} r={1.7} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.45} />
          ),
        )}
        {BRIGHT_STARS.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r={s.s * 0.9} fill="var(--gold-soft)" fillOpacity={0.18} />
            <Star x={s.x} y={s.y} s={s.s} className={TWINKLE[(i + 1) % 3]} />
          </g>
        ))}
      </g>

      {/* Her nose: a campaka newly opened, on a stem that grows straight up */}
      <g {...part("campaka")}>
        <rect x={CX - 110} y={320} width={220} height={340} fill={url("aura")} />
        <path d={STEM} fill="var(--leaf)" fillOpacity={0.75} stroke="var(--leaf)" strokeWidth={0.8} />
        <path d={`M 321.2 ${CALYX_Y + 10} L 320.6 806`} stroke="var(--gold-soft)" strokeWidth={0.8} strokeOpacity={0.7} />
        {LEAVES.map((l, i) => (
          <g key={i} transform={l.at}>
            <path d={l.blade} fill="var(--leaf)" fillOpacity={0.62} stroke="var(--leaf)" strokeWidth={0.8} />
            <path d={l.veins} stroke="var(--leaf)" strokeWidth={0.5} strokeOpacity={0.8} />
            <path d={l.rib} stroke="var(--gold-soft)" strokeWidth={0.9} strokeOpacity={0.85} />
          </g>
        ))}
        {BACK_PETALS.map((p, i) => (
          <g key={i} transform={petalAt(p)}>
            <path d={campakaPetal(p.l, p.w, p.t)} fill={url("petal")} stroke="var(--art-saffron)" strokeWidth={0.9} />
            <path d={campakaPetal(p.l, p.w, p.t)} fill="var(--art-saffron)" fillOpacity={0.28} />
          </g>
        ))}
        {FRONT_PETALS.map((p, i) => (
          <g key={i} transform={petalAt(p)}>
            <path d={campakaPetal(p.l, p.w, p.t)} fill={url("petal")} stroke="var(--art-saffron)" strokeWidth={0.9} />
            <path d={petalVein(p)} stroke="var(--art-saffron)" strokeWidth={0.6} strokeOpacity={0.55} />
          </g>
        ))}
        <g fill="var(--leaf)" stroke="var(--leaf)" strokeWidth={0.7}>
          {SEPALS.map((s) => (
            <path key={s.a} d={s.d} transform={`translate(${CX} ${CALYX_Y + 8}) rotate(${s.a})`} fillOpacity={0.9} />
          ))}
        </g>
        <ellipse cx={CX} cy={CALYX_Y + 7} rx={7} ry={4.5} fill="var(--leaf)" />
      </g>

      {/* The nose stud, seven diamonds in gold, and its fire */}
      <g {...part("nose-jewel")}>
        <circle className="m-shimmer" cx={JEWEL.x} cy={JEWEL.y} r={120} fill={url("jewel-glow")} />
        <path className="m-shimmer m-late" d={RAYS} stroke={url("rays")} strokeWidth={0.9} strokeLinecap="round" />
        <g transform={`translate(${JEWEL.x} ${JEWEL.y})`} fill="var(--art-core)">
          <path d={glint(48)} fillOpacity={0.85} />
          <path d={glint(24)} transform="rotate(45)" fillOpacity={0.7} />
        </g>
        <circle cx={JEWEL.x} cy={JEWEL.y} r={36} fill={url("white-heat")} />
        <circle cx={JEWEL.x} cy={JEWEL.y} r={SETTING_R + 0.8} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.8} />
        <circle cx={JEWEL.x} cy={JEWEL.y} r={SETTING_R - 1} stroke="var(--art-carve)" strokeWidth={0.5} strokeOpacity={0.6} />
        <g fill="var(--gold-soft)">
          {SETTING_BEADS.map((b, k) => (
            <circle key={k} cx={b.x} cy={b.y} r={1.1} />
          ))}
        </g>
        {DIAMONDS.map((d, k) => (
          <g key={k}>
            <circle cx={d.x} cy={d.y} r={round(d.r + 1.3)} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.4} />
            <path d={d.girdle} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
            <path d={d.table + " " + d.facets} stroke="var(--gold-soft)" strokeWidth={0.45} />
            <path d={glint(round(d.r * 0.55))} transform={`translate(${round(d.x - d.r * 0.3)} ${round(d.y - d.r * 0.3)})`} fill="var(--art-core)" />
          </g>
        ))}
        {FLASHING.map(({ stone, group }) => (
          <Flash key={stone} x={STONES[stone].x} y={STONES[stone].y} s={STONES[stone].r * 2.4} group={group} />
        ))}
      </g>

      {/* A pearl hanging from the stud, breathed out as Śaṅkara says */}
      <g {...part("pearl")}>
        <circle cx={PEARL.x} cy={JEWEL.y + SETTING_R + 2.4} r={2.4} stroke="var(--gold)" strokeWidth={1} />
        <path d={`M ${PEARL.x - 2.6} ${PEARL.y - PEARL.r + 0.6} Q ${PEARL.x} ${PEARL.y - PEARL.r - 2.4} ${PEARL.x + 2.6} ${PEARL.y - PEARL.r + 0.6} Z`} fill="var(--gold)" />
        <circle cx={PEARL.x} cy={PEARL.y} r={PEARL.r} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.7} />
        <path
          d={`M ${round(PEARL.x + PEARL.r * 0.75)} ${round(PEARL.y - PEARL.r * 0.2)} A ${PEARL.r * 0.8} ${PEARL.r * 0.8} 0 0 1 ${round(PEARL.x - PEARL.r * 0.2)} ${round(PEARL.y + PEARL.r * 0.75)}`}
          stroke="var(--gold-soft)"
          strokeWidth={0.9}
          strokeOpacity={0.7}
        />
        <circle cx={round(PEARL.x - PEARL.r * 0.32)} cy={round(PEARL.y - PEARL.r * 0.32)} r={1.3} fill="var(--art-core)" />
      </g>
    </svg>
  );
}
