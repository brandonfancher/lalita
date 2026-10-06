/**
 * Shloka 10 — "Teeth like sprouts of pure knowledge".
 *
 * The verse closes the first ten with her mouth, in two names far apart in
 * register. Her teeth are the sprouts of Śuddhavidyā, the mantra sown like a
 * seed and coming up in rows; and the scent of the camphor betel in her mouth
 * does not spread but pulls, drawing the quarters of the sky in toward her.
 * So a bed of sprouts lies beneath her light, and wisps of fragrance curve in
 * to it from the eight quarters, gathering the horizon as they come. Which
 * name each part answers to is written up for readers in the registry, next
 * to this artwork's entry.
 */

import type { CSSProperties } from "react";

import { artIds, glint, partProps, polar, round } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const CX = 320;
/** Her light, where every wisp of fragrance ends: the mouth. */
const C = { x: CX, y: 444 };

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

const line = (ps: Pt[]) => ps.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");

/** A filled shape of varying width along a centre line, so a stroke can taper. */
function taper(pts: Pt[], width: (t: number) => number) {
  const n = pts.length - 1;
  const left: Pt[] = [];
  const right: Pt[] = [];
  pts.forEach((p, i) => {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(n, i + 1)];
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const nx = -(b.y - a.y) / len;
    const ny = (b.x - a.x) / len;
    const w = width(i / n) / 2;
    left.push({ x: round(p.x + nx * w), y: round(p.y + ny * w) });
    right.push({ x: round(p.x - nx * w), y: round(p.y - ny * w) });
  });
  return line(left) + " " + line([...right].reverse()).replace(/^M/, "L") + " Z";
}

/* ── The quarters, and the fragrance that draws them in ─────────────────── */

/** The horizon, and how far it has been drawn in between the quarters. */
const R0 = 300;
const SAG = 0.1;
const QUARTERS = Array.from({ length: 8 }, (_, k) => 90 + k * 45);

const horizonAt = (deg: number) => R0 * (1 - SAG * Math.abs(Math.sin(((deg - 90) * Math.PI) / 45)) ** 1.5);

const HORIZON = line(Array.from({ length: 360 }, (_, k) => polar(C.x, C.y, horizonAt(k), k))) + " Z";

/** How far round each wisp turns as it comes in: clockwise, as one walks round a shrine. */
const TURN = 96;
const R1 = 30;
const STEPS = 90;

/** Where a wisp's spiral is, `t` of the way in from quarter `q`. */
function spiral(q: number, t: number) {
  const r = R1 + (R0 - 22 - R1) * (1 - t) ** 1.15;
  return { r, deg: q - TURN * t ** 1.5 };
}

function wisp(q: number, phase: number, lag: number, amp: number) {
  const pts = Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS;
    const { r, deg } = spiral(q, t);
    const wave = amp * (1 - t) ** 0.8 * Math.sin(2 * Math.PI * 2.4 * t + phase);
    return polar(C.x, C.y, r + wave, deg + lag * (1 - t));
  });
  return pts;
}

const STREAMS = QUARTERS.map((q) => {
  const core = Array.from({ length: STEPS + 1 }, (_, i) => {
    const { r, deg } = spiral(q, i / STEPS);
    return polar(C.x, C.y, r, deg);
  });
  const wisps = [
    { pts: wisp(q, 0, 0, 7), w: 4.2, main: true },
    { pts: wisp(q, 2.1, 4, 9), w: 2.6, main: false },
    { pts: wisp(q, 4.2, -4, 8), w: 2, main: false },
  ];

  /* A curl at the outer end of the main wisp, turning outward, as smoke and fragrance curl */
  const [s0, s1] = [wisps[0].pts[0], wisps[0].pts[4]];
  const dir = Math.atan2(s1.y - s0.y, s1.x - s0.x);
  const cc = { x: s0.x + Math.sin(dir) * 8, y: s0.y - Math.cos(dir) * 8 };
  const curl = Array.from({ length: 40 }, (_, k) => {
    const u = k / 39;
    const a = dir + Math.PI / 2 + u * Math.PI * 1.7;
    const rr = 8 * (1 - 0.62 * u);
    return { x: round(cc.x + Math.cos(a) * rr), y: round(cc.y + Math.sin(a) * rr) };
  });

  return {
    haze: line(core.slice(0, STEPS - 6)),
    wisps: wisps.map((w) => ({ d: taper(w.pts, (t) => w.w * (1 - t) ** 0.9 + 0.35), main: w.main })),
    spine: line(wisps[0].pts.slice(3, STEPS - 8)),
    curl: taper(curl, (u) => 2.4 * (1 - u) + 0.4),
    marker: polar(C.x, C.y, horizonAt(q), q),
  };
});
const MOTE_GAP = 22;

/* ── Her betel, at the meeting of the streams ───────────────────────────── */

const BETEL = { x: CX, y: 496 };

/** A betel leaf: heart-shaped, with veins arching from the base to its drawn-out tip. Base at the origin, tip up. */
function betelLeaf(L: number) {
  const p = (x: number, y: number) => `${round(x * L)} ${round(y * L)}`;
  const blade = [
    `M ${p(0, 0)}`,
    `C ${p(-0.16, 0.12)} ${p(-0.5, 0.06)} ${p(-0.52, -0.26)}`,
    `C ${p(-0.54, -0.56)} ${p(-0.2, -0.76)} ${p(0, -1)}`,
    `C ${p(0.2, -0.76)} ${p(0.54, -0.56)} ${p(0.52, -0.26)}`,
    `C ${p(0.5, 0.06)} ${p(0.16, 0.12)} ${p(0, 0)} Z`,
  ].join(" ");
  const veins = [
    `M ${p(0, -0.02)} L ${p(0, -0.9)}`,
    `M ${p(0, -0.04)} C ${p(-0.24, -0.14)} ${p(-0.28, -0.5)} ${p(-0.05, -0.84)}`,
    `M ${p(0, -0.04)} C ${p(0.24, -0.14)} ${p(0.28, -0.5)} ${p(0.05, -0.84)}`,
    `M ${p(-0.02, -0.03)} C ${p(-0.38, -0.06)} ${p(-0.46, -0.34)} ${p(-0.3, -0.58)}`,
    `M ${p(0.02, -0.03)} C ${p(0.38, -0.06)} ${p(0.46, -0.34)} ${p(0.3, -0.58)}`,
  ].join(" ");
  return { blade, veins, stalk: `M 0 0 Q ${round(L * 0.02)} ${round(L * 0.1)} ${round(L * 0.17)} ${round(L * 0.15)}` };
}

const LEAF = betelLeaf(70);

/** The folded roll: a triangle of leaf, apex down, its top flap folded over and pinned with a clove. */
const ROLL = {
  body: "M -25 -12 C -17 -16 17 -16 25 -12 C 21 2 9 21 0 31 C -9 21 -21 2 -25 -12 Z",
  flap: "M -25 -12 C -14 -20 14 -20 25 -12 C 15 -3 7 2 0 9 C -7 2 -15 -3 -25 -12 Z",
  folds: "M -18 -6 C -11 6 -5 16 0 28 M 18 -6 C 11 6 5 16 0 28",
  flapVeins: "M 0 6 L 0 -15 M 0 -2 C -6 -7 -13 -11 -20 -12 M 0 -2 C 6 -7 13 -11 20 -12",
};

/** Flakes of camphor, pale as the moon, tucked in the fold and fallen beside it. */
const CAMPHOR = [
  { x: -8, y: -18, s: 5.2, rot: 18 },
  { x: 4, y: -20, s: 4.4, rot: -24 },
  { x: 14, y: -16, s: 3.5, rot: 40 },
  { x: -33, y: 20, s: 3.6, rot: -8 },
  { x: 33, y: 14, s: 3.1, rot: 30 },
];
const flake = (s: number) =>
  line([
    { x: round(-s), y: round(-s * 0.2) },
    { x: round(-s * 0.3), y: round(-s * 0.85) },
    { x: round(s * 0.8), y: round(-s * 0.45) },
    { x: round(s), y: round(s * 0.35) },
    { x: round(s * 0.1), y: round(s * 0.8) },
    { x: round(-s * 0.75), y: round(s * 0.55) },
  ]) + " Z";

/* ── The bed of sprouts ─────────────────────────────────────────────────── */

/** The bed curves like a smile: lowest under her light, rising toward its ends. */
const bedY = (x: number) => round(612 - 36 * ((x - CX) / 200) ** 2);
const ROW = 16;

type Sprout = { x: number; y: number; h: number; lean: number; row: 0 | 1; k: number; hooked: boolean; open: number };

const SPROUTS: Sprout[] = [0, 1].flatMap((row) =>
  Array.from({ length: ROW }, (_, k) => {
    const span = row ? 356 : 326;
    const x = round(CX - span / 2 + (k * span) / (ROW - 1) + (((k * 7) % 5) - 2) * 0.8);
    const y = round(bedY(x) + (row ? 8 : -8));
    const h = (row ? 42 : 34) + ((k * 7 + row * 3) % 5) * 1.8;
    /* Seedlings bend toward the light */
    const lean = round((C.x - x) * 0.07 + (((k * 5) % 3) - 1) * 1.4);
    const hooked = row ? k === 3 || k === 11 : k === 7 || k === 14;
    return { x, y, h, lean, row: row as 0 | 1, k, hooked, open: 48 + ((k * 3 + row) % 4) * 6 };
  }),
);

function sproutShape({ h, lean, hooked, open }: Sprout) {
  const top = { x: lean, y: -h };
  const stem: Pt[] = Array.from({ length: 13 }, (_, i) => {
    const u = i / 12;
    return { x: round(lean * u ** 1.6), y: round(-h * u) };
  });
  if (hooked) {
    /* Not yet opened: the stem arches over and the closed seed-leaves hang from the crook */
    const s = Math.sign(lean) || 1;
    const hook = Array.from({ length: 9 }, (_, i) => {
      const a = Math.PI - (i / 8) * Math.PI * 1.05;
      return { x: round(top.x + s * (4.5 + 4.5 * Math.cos(a))), y: round(top.y - 4.5 * Math.sin(a)) };
    });
    const end = hook[hook.length - 1];
    return {
      stem: taper([...stem, ...hook.slice(1)], (t) => 2.8 - 0.8 * t),
      leaves: `M ${end.x} ${end.y} C ${round(end.x + s * 3.5)} ${round(end.y + 3)} ${round(end.x + s * 2.5)} ${round(end.y + 9)} ${round(end.x - s * 0.5)} ${round(end.y + 10)} C ${round(end.x - s * 2.5)} ${round(end.y + 7)} ${round(end.x - s * 2)} ${round(end.y + 2)} ${end.x} ${end.y} Z`,
      tip: { x: round(top.x + s * 4.5), y: round(top.y - 4.5) },
    };
  }
  const seedLeaf = (deg: number) => {
    const t = (deg * Math.PI) / 180;
    const ux = Math.sin(t);
    const uy = -Math.cos(t);
    const at = (a: number, b: number) => `${round(top.x + ux * a - uy * b)} ${round(top.y + uy * a + ux * b)}`;
    return `M ${at(0, 0)} C ${at(3, 3.4)} ${at(8, 3.8)} ${at(11, 0)} C ${at(8, -3.2)} ${at(3, -3)} ${at(0, 0)} Z`;
  };
  const tilt = lean * 1.2;
  return {
    stem: taper(stem, (t) => 2.8 - 0.9 * t),
    leaves: seedLeaf(tilt - open) + " " + seedLeaf(tilt + open),
    tip: { x: round(top.x), y: round(top.y - 4) },
  };
}

const SPROUT_SHAPES = SPROUTS.map((s) => ({ ...s, ...sproutShape(s) }));

const BED = (() => {
  const xs = Array.from({ length: 49 }, (_, i) => 116 + i * 8.5);
  const top = xs.map((x, i) => ({ x, y: round(bedY(x) - 15 - Math.sin(i * 1.9) * 1.6 - Math.cos(i * 0.7) * 1.2) }));
  const bottom = [...xs].reverse().map((x) => ({ x, y: round(bedY(x) + 30) }));
  const furrow = (dy: number, from: number, to: number) =>
    line(Array.from({ length: 31 }, (_, i) => {
      const x = from + ((to - from) * i) / 30;
      return { x: round(x), y: round(bedY(x) + dy) };
    }));
  const clods = Array.from({ length: 70 }, (_, i) => {
    const x = round(124 + ((i * 97) % 392));
    return { x, y: round(bedY(x) - 6 + ((i * 37) % 26)), r: round(0.6 + ((i * 13) % 5) * 0.18) };
  });
  return {
    earth: line(top) + " " + line(bottom).replace(/^M/, "L") + " Z",
    crest: line(top),
    furrows: [furrow(-8, 150, 490), furrow(8, 136, 504)],
    clods,
  };
})();

/** The seed-syllable ह्रीं, which closes each of the mantra's three parts, sown under three sprouts. */
const BIJA = [4, 8, 12].map((k) => {
  const s = SPROUTS.find((p) => p.row === 1 && p.k === k)!;
  return { x: round(s.x - 10), y: round(s.y + 13) };
});

export function SproutsAndScent({ idPrefix = "sa10", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={C.x} cy={C.y + 40} r={240} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.28 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("wisp")} cx={C.x} cy={C.y} r={R0} gradientUnits="userSpaceOnUse">
          <stop offset="0.1" style={{ stopColor: "var(--gold)", stopOpacity: 0.15 }} />
          <stop offset="0.35" style={{ stopColor: "var(--gold)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0.85 }} />
        </radialGradient>
        <radialGradient id={id("haze")} cx={C.x} cy={C.y} r={R0} gradientUnits="userSpaceOnUse">
          <stop offset="0.12" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.05 }} />
        </radialGradient>
        <linearGradient id={id("earth")} x1="0" y1="560" x2="0" y2="645" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.45 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-crimson)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>

      {/* The fragrance of her camphor betel, drawing in the eight quarters */}
      <g {...part("betel")}>
        <path d={HORIZON} stroke="var(--gold)" strokeWidth={0.9} strokeOpacity={0.5} />
        <g fill="var(--gold)">
          {STREAMS.map((s, i) => (
            <path key={i} d={glint(6)} transform={`translate(${s.marker.x} ${s.marker.y})`} />
          ))}
        </g>
        <g stroke={url("haze")}>
          {STREAMS.map((s, i) => (
            <g key={i}>
              <path d={s.haze} strokeWidth={24} strokeOpacity={0.5} />
              <path d={s.haze} strokeWidth={11} strokeOpacity={0.7} />
            </g>
          ))}
        </g>
        <g fill={url("wisp")}>
          {STREAMS.map((s, i) => (
            <g key={i}>
              {s.wisps.map((w, j) => (
                <path key={j} d={w.d} fillOpacity={w.main ? 0.9 : 0.55} />
              ))}
              <path d={s.curl} fillOpacity={0.9} />
            </g>
          ))}
        </g>
        {STREAMS.map((s, i) => (
          <path
            key={i}
            className={["m-flow", "m-flow m-late"][i % 2]}
            d={s.spine}
            stroke="var(--art-core)"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeDasharray={`0 ${MOTE_GAP}`}
            style={{ "--period": `${MOTE_GAP}px` } as CSSProperties}
          />
        ))}

        <g transform={`translate(${BETEL.x} ${BETEL.y})`}>
          <g transform="translate(-3 -24) rotate(172)">
            <path d={LEAF.stalk} stroke="var(--leaf)" strokeWidth={2} strokeLinecap="round" />
            <path d={LEAF.blade} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.7} />
            <path d={LEAF.veins} stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.75} strokeLinecap="round" />
          </g>
          <g transform="rotate(6)">
            <path d={ROLL.body} fill="var(--leaf)" />
            <path d={ROLL.body} fill="var(--art-ivory)" fillOpacity={0.3} stroke="var(--gold)" strokeWidth={0.9} />
            <path d={ROLL.folds} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.7} />
            <path d={ROLL.flap} fill="var(--leaf)" />
            <path d={ROLL.flap} fill="var(--art-ivory)" fillOpacity={0.5} stroke="var(--gold)" strokeWidth={0.9} />
            <path d={ROLL.flapVeins} stroke="var(--leaf)" strokeWidth={0.6} strokeOpacity={0.8} />
          </g>
          {CAMPHOR.map((f, i) => (
            <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${f.rot})`}>
              <path d={flake(f.s)} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
              <path className={TWINKLE[i % 3]} d={glint(round(f.s * 0.6))} transform={`translate(${round(-f.s * 0.2)} ${round(-f.s * 0.2)})`} fill="var(--art-core)" />
            </g>
          ))}
          <g fill="var(--art-crimson)">
            <path d="M -1 -4 L -0.6 10 L 0.6 10 L 1 -4 Z" />
            <circle cy={-6} r={2.8} />
            {[45, 135, 225, 315].map((deg) => (
              <path key={deg} d="M 0 0 L -1.7 -3.4 L 0 -4.8 L 1.7 -3.4 Z" transform={`translate(0 -6) rotate(${deg})`} />
            ))}
          </g>
        </g>
      </g>

      {/* Her light: the mouth from which the fragrance comes and to which it draws everything */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={C.x} cy={C.y + 40} r={240} fill={url("glow")} />
        <circle className="m-shimmer" cx={C.x} cy={C.y} r={20} fill={url("bindu-glow")} />
        <circle cx={C.x} cy={C.y} r={7.5} stroke="var(--art-core)" strokeWidth={0.8} />
        <circle cx={C.x} cy={C.y} r={3.8} fill="var(--art-core)" />
      </g>

      {/* Her teeth: two rows of sprouts of the pure knowledge, the mantra sown and coming up */}
      <g {...part("sprouts")}>
        <path d={BED.earth} fill={url("earth")} />
        <path d={BED.crest} stroke="var(--art-vermilion)" strokeWidth={0.8} strokeOpacity={0.45} />
        <g fill="var(--art-crimson)" fillOpacity={0.45}>
          {BED.clods.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r={c.r} />
          ))}
        </g>
        <g stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.55}>
          {BED.furrows.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {SPROUT_SHAPES.map((s, i) => (
          <g key={i} transform={`translate(${s.x} ${s.y})`}>
            <path d="M -5 1.5 Q -4 -2.4 -0.6 -1 L -1 2.2 Z M 5 1.5 Q 4 -2.4 0.6 -1 L 1 2.2 Z" fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth={0.4} />
            <path d={s.leaves} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.55} strokeLinejoin="round" />
            <path d={s.leaves} fill="var(--leaf)" fillOpacity={0.2} />
            <path d={s.stem} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
            {s.k % 3 === s.row && !s.hooked && (
              <path className={TWINKLE[(s.k + s.row) % 3]} d={glint(4.2)} transform={`translate(${s.tip.x} ${s.tip.y})`} fill="var(--art-core)" />
            )}
          </g>
        ))}
      </g>

      {/* The seed-syllable in the earth: a mantra's syllables are its seeds */}
      <g {...part("seeds")} fill="var(--art-core)" style={{ fontFamily: "var(--font-tiro), serif" }}>
        {BIJA.map((b, i) => (
          <text key={i} x={b.x} y={b.y} fontSize={11} textAnchor="middle" dominantBaseline="central">
            ह्रीं
          </text>
        ))}
      </g>
    </svg>
  );
}
