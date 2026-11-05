/**
 * Shloka 67 — "Mother from Brahmā down to the worm".
 *
 * Four names that say nothing of her form and everything of her relation to
 * the world, drawn as a mother's house at lamp-lighting. Below the card a
 * standing brass lamp with one wick lit, her light. Its smoke rises in four
 * streams, the Vedas breathed out like smoke from damp fuel, and carries
 * them up to the four faces of Brahmā on his lotus in the crown. At the
 * other end of the span, on the ground, an inchworm, in a ring of her light
 * the same as his. Before the lamp a kolam of four dots by four, woven along
 * both axes, and either side of it a plantain leaf served with sweet mangoes
 * or bitter gourds. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { BrahmaLotus, BrahmaLotusDefs, Kolam, artIds, glint, hash, partProps, polyline, round, taper, through, tongue } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

/* ── The lamp (kuthuvilakku) ───────────────────────────────────────────── */

const LX = 330;
const FOOT = { y: 546, rx: 40, ry: 7.5 };
const LAMP_K = 1.15;
const LAMP_ZOOM = `translate(${LX} ${FOOT.y}) scale(${LAMP_K}) translate(${-LX} ${-FOOT.y})`;
const lampToPage = (p: Pt): Pt => ({ x: round(LX + (p.x - LX) * LAMP_K), y: round(FOOT.y + (p.y - FOOT.y) * LAMP_K) });
const DOME_TOP = 527;
const RIM = { y: 458, rx: 34, ry: 7 };
const DOME = `M ${LX - 39} ${FOOT.y} C ${LX - 36} 536 ${LX - 14} 530 ${LX - 8} ${DOME_TOP} L ${LX + 8} ${DOME_TOP} C ${LX + 14} 530 ${LX + 36} 536 ${LX + 39} ${FOOT.y} A 39 7 0 0 1 ${LX - 39} ${FOOT.y} Z`;
const STEM = `M ${LX - 3.4} ${DOME_TOP} L ${LX - 2.4} ${RIM.y + 14} L ${LX + 2.4} ${RIM.y + 14} L ${LX + 3.4} ${DOME_TOP} Z`;
const KNOPS = [
  { y: 520, rx: 9, ry: 3.2 },
  { y: 500, rx: 6, ry: 5 },
  { y: 481, rx: 8, ry: 2.8 },
];
const BOWL = `M ${LX - RIM.rx} ${RIM.y} C ${LX - RIM.rx + 2} ${RIM.y + 12} ${LX - 16} ${RIM.y + 17} ${LX} ${RIM.y + 17} C ${LX + 16} ${RIM.y + 17} ${LX + RIM.rx - 2} ${RIM.y + 12} ${LX + RIM.rx} ${RIM.y} Z`;
const onRim = (deg: number, f: number): Pt => {
  const a = (deg * Math.PI) / 180;
  return { x: round(LX + RIM.rx * f * Math.cos(a)), y: round(RIM.y + RIM.ry * f * Math.sin(a)) };
};
/** Five beaked spouts round the rim, front first; the wick in the front-right one is lit. */
const SPOUTS = [90, 18, -54, -126, 162].map((deg) => {
  const a = onRim(deg - 14, 0.96);
  const b = onRim(deg + 14, 0.96);
  const tip = onRim(deg, 1.34);
  return { deg, back: Math.sin((deg * Math.PI) / 180) < 0, d: `M ${a.x} ${a.y} Q ${onRim(deg - 4, 1.2).x} ${onRim(deg - 4, 1.2).y - 1} ${tip.x} ${tip.y - 1.2} Q ${onRim(deg + 4, 1.2).x} ${onRim(deg + 4, 1.2).y} ${b.x} ${b.y} Z`, wick: onRim(deg, 1.14) };
});
const FLAME_AT = onRim(18, 1.16);
const FLAME = { h: 38, w: 10, lean: 1.4 };
const FLAME_TIP = lampToPage({ x: FLAME_AT.x + FLAME.lean, y: FLAME_AT.y - 2 - FLAME.h });
const FLAME_GLOW = lampToPage({ x: FLAME_AT.x, y: FLAME_AT.y - 18 });
/** A string of jasmine hung on the lamp under its bowl, its two ends falling free. */
const JASMINE_SWAG = Array.from({ length: 13 }, (_, k) => {
  const t = k / 12;
  return { x: round(LX - 22 + 44 * t), y: round(474 + 16 * Math.sin(Math.PI * t)) };
});
const JASMINE = [
  ...JASMINE_SWAG,
  ...[1, 2, 3].flatMap((k) => [
    { x: round(LX - 23 - k * 0.4), y: 474 + k * 3.6 },
    { x: round(LX + 23 + k * 0.4), y: 474 + k * 3.6 },
  ]),
];
const FINIAL = `M ${LX} 419 C ${LX + 6} 425 ${LX + 7.5} 433 ${LX} 441 C ${LX - 7.5} 433 ${LX - 6} 425 ${LX} 419 Z`;

/* ── The four streams of smoke, and Brahmā at their end ────────────────── */

const BRAHMA = { x: 452, y: 106, k: 0.8 };
const RING_R = 58;
const BRAHMA_RING = { x: BRAHMA.x, y: round(BRAHMA.y - 14) };
/**
 * Each stream leaves the flame with the others, then opens out behind the
 * card and comes in to the lotus from the quarter its face is turned to:
 * from the left, from below, from the right, and over the top to the back.
 */
const STREAM_PATHS: Pt[][] = [
  [FLAME_TIP, { x: 372, y: 346 }, { x: 356, y: 286 }, { x: 360, y: 226 }, { x: 384, y: 184 }, { x: 406, y: 150 }, { x: 418, y: 124 }],
  [FLAME_TIP, { x: 392, y: 336 }, { x: 418, y: 266 }, { x: 440, y: 200 }, { x: 450, y: 156 }, { x: 452, y: 122 }],
  [FLAME_TIP, { x: 410, y: 344 }, { x: 460, y: 280 }, { x: 494, y: 214 }, { x: 510, y: 158 }, { x: 506, y: 120 }, { x: 494, y: 104 }],
  [FLAME_TIP, { x: 366, y: 346 }, { x: 344, y: 286 }, { x: 332, y: 226 }, { x: 352, y: 178 }, { x: 386, y: 150 }, { x: 398, y: 110 }, { x: 410, y: 70 }, { x: 432, y: 44 }, { x: 452, y: 42 }, { x: 456, y: 58 }],
];
const SPARK_AT = [0.62, 0.72, 0.82];
const STREAMS = STREAM_PATHS.map((ps, s) => {
  const wobbled = ps.map((p, i) => (i < 2 || i === ps.length - 1 ? p : { x: round(p.x + (i % 2 ? 1 : -1) * 6 + (hash(s, i + 670) - 0.5) * 8), y: p.y }));
  const pts = through(wobbled, 14);
  const width = (t: number) => Math.sin(Math.PI * Math.min(1, 0.06 + t)) ** 0.5;
  return {
    haze: taper(pts, (t) => 1 + 9 * width(t)),
    body: taper(pts, (t) => 0.4 + 2 * width(t)),
    sparks: SPARK_AT.map((f) => pts[Math.round(f * (pts.length - 1))]),
  };
});
const LICK = ["m-lick", "m-lick m-late", "m-lick m-later"];

/* ── The worm, at the other end ────────────────────────────────────────── */

const WORM_RING = { x: 166, y: 552 };
const WORM_AT = { x: WORM_RING.x, y: WORM_RING.y + 14 };
/** An inchworm looping along: its tail and front feet down, its middle drawn up in an arch. */
const WORM_LINE = through(
  [
    { x: -19, y: 0 },
    { x: -15, y: -9 },
    { x: -8, y: -17 },
    { x: 0, y: -19 },
    { x: 7, y: -15 },
    { x: 11, y: -6 },
    { x: 15, y: 0 },
    { x: 21, y: -2 },
  ],
  10,
);
const WORM_BODY = taper(WORM_LINE, (t) => 5.4 - t * 1.2);
const WORM_SEGMENTS = WORM_LINE.filter((_, i) => i > 2 && i < WORM_LINE.length - 4 && i % 5 === 0);
/** A tuft of grass just ahead of it, the low end of the other way of saying the same span (ābrahmastamba). */
const GRASS = Array.from({ length: 7 }, (_, k) => {
  const x = round(27 + k * 1.6);
  const h = round(12 + hash(k, 674) * 11);
  const lean = round((k - 3) * 2.2 + (hash(k, 675) - 0.5) * 3);
  return `M ${round(x - 1)} 0 Q ${round(x + lean * 0.3)} ${round(-h * 0.6)} ${round(x + lean)} ${-h} Q ${round(x + lean * 0.3 + 0.6)} ${round(-h * 0.5)} ${round(x + 1)} 0 Z`;
}).join(" ");

/* ── The kolam, four dots by four ──────────────────────────────────────── */

const KOLAM = { x: LX, y: 592, s: 22, tilt: 0.4 };
/** The kolam's own plane turned an eighth of a turn and laid on the ground. */
const lay = (u: number, v: number): Pt => ({
  x: round(KOLAM.x + (u - v) / Math.SQRT2),
  y: round(KOLAM.y + ((u + v) / Math.SQRT2) * KOLAM.tilt),
});
const STEPS = [-1.5, -0.5, 0.5, 1.5].map((k) => k * KOLAM.s);
const KOLAM_DOTS = STEPS.flatMap((v) => STEPS.map((u) => lay(u, v)));
/** One long loop round a line of four dots, its ends round: along u for a row, along v for a column. */
const kolamLoop = (fixed: number, alongU: boolean) => {
  const r = 7.5;
  const c = r * 0.5523;
  const end = 1.5 * KOLAM.s;
  const at = (a: number, b: number) => {
    const p = alongU ? lay(a, fixed + b) : lay(fixed + b, a);
    return `${p.x} ${p.y}`;
  };
  return [
    `M ${at(-end, -r)} L ${at(end, -r)}`,
    `C ${at(end + c, -r)} ${at(end + r, -c)} ${at(end + r, 0)}`,
    `C ${at(end + r, c)} ${at(end + c, r)} ${at(end, r)}`,
    `L ${at(-end, r)}`,
    `C ${at(-end - c, r)} ${at(-end - r, c)} ${at(-end - r, 0)}`,
    `C ${at(-end - r, -c)} ${at(-end - c, -r)} ${at(-end, -r)} Z`,
  ].join(" ");
};
const KOLAM_LINE = [...STEPS.map((v) => kolamLoop(v, true)), ...STEPS.map((u) => kolamLoop(u, false))].join(" ");
const KOLAM_REACH = round(((1.5 * KOLAM.s + 7.5) * 2) / Math.SQRT2);

/* ── Sweet and bitter, served on plantain leaves ───────────────────────── */

const LEAVES = [
  { x: LX - 92, y: 530, flip: true, fruit: "sweet" },
  { x: LX + 92, y: 530, flip: false, fruit: "bitter" },
] as const;
const LEAF_K = 1.25;
const PLANTAIN = "M -34 3 C -26 -8 14 -11 34 -4 C 26 7 -14 11 -34 3 Z";
const PLANTAIN_VEINS = Array.from({ length: 7 }, (_, k) => {
  const x = -22 + k * 8;
  return `M ${x} ${round(-0.6 - x * 0.06)} L ${x + 4} ${round(-6.4 - x * 0.06)} M ${x} ${round(-0.6 - x * 0.06)} L ${x + 3} ${round(5 - x * 0.06)}`;
}).join(" ");
const MANGO = "M -9 0 C -10 -6 -3 -9 3 -7.4 C 8.6 -6 11 -1 9 3.4 C 6.6 7.6 -5 7.4 -9 0 Z";
const MANGOES = [
  { x: -8, y: -3, rot: -12 },
  { x: 9, y: -1, rot: 18 },
];
/** A bitter gourd: a long spindle drawn to a point at both ends, knobbled all along its edge. */
const GOURD_LEN = 17;
const gourdHalf = (t: number) => 4.4 * Math.sin(Math.PI * t) ** 1.1;
const GOURD = (() => {
  const n = 48;
  const top: Pt[] = [];
  const bottom: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = -GOURD_LEN + 2 * GOURD_LEN * t;
    const knob = 0.75 * Math.abs(Math.sin(13 * Math.PI * t)) * Math.sin(Math.PI * t);
    top.push({ x: round(x), y: round(-gourdHalf(t) - knob) });
    bottom.push({ x: round(x), y: round(gourdHalf(t) + knob * 0.6) });
  }
  return `${polyline(top)} ${polyline(bottom.reverse()).replace(/^M/, "L")} Z`;
})();
const GOURD_GROOVES = [-0.45, 0.2].map((f) => polyline(Array.from({ length: 13 }, (_, k) => ({ x: round(-GOURD_LEN * 0.8 + k * GOURD_LEN * 0.133), y: round(f * gourdHalf(0.1 + k * 0.067)) })))).join(" ");
const GOURD_WARTS = Array.from({ length: 7 }, (_, k) => ({ x: round(-GOURD_LEN * 0.6 + k * GOURD_LEN * 0.2), y: round(-gourdHalf(0.2 + k * 0.1) * 0.62) }));
const GOURDS = [
  { x: -4, y: -4, rot: -7, s: 1.12 },
  { x: 7, y: 1.6, rot: 9, s: 1.04 },
];

/* ── The ants, carrying the kolam away ─────────────────────────────────── */

const ANT_FROM = { x: KOLAM.x + KOLAM_REACH + 6, y: KOLAM.y + 2 };
const ANTS = Array.from({ length: 5 }, (_, i) => ({
  x: round(ANT_FROM.x + 6 + i * 16 + (hash(i, 671) - 0.5) * 4),
  y: round(ANT_FROM.y + i * 3.4 + (hash(i, 672) - 0.5) * 3),
  rot: round(12 + (hash(i, 673) - 0.5) * 22),
  grain: i !== 3,
}));
const ANT_LEGS = "M 0 0 L -1.6 -2.8 M 0 0 L 0 -3 M 0 0 L 1.6 -2.8 M 0 0 L -1.6 2.8 M 0 0 L 0 3 M 0 0 L 1.6 2.8 M 3.4 -0.6 L 5.2 -2.2 M 3.4 0.6 L 5.2 2.2";
const CRUMBS = [
  { x: ANT_FROM.x - 4, y: ANT_FROM.y - 1 },
  { x: ANT_FROM.x, y: ANT_FROM.y - 3 },
  { x: ANT_FROM.x - 1, y: ANT_FROM.y + 2.4 },
];

export function TheHouseholdLamp({ idPrefix = "sa67", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <BrahmaLotusDefs id={id} />
        <radialGradient id={id("glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-core)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("room")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("ring")}>
          <stop offset="0.55" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
          <stop offset="0.92" style={{ stopColor: "var(--art-core)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("floor")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.28 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("swept")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.42 }} />
          <stop offset="0.75" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("mango")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </linearGradient>
        <mask id={id("window")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={830} fill="#fff" />
          <rect x={150} y={190} width={340} height={200} rx={12} fill="#000" fillOpacity={0.62} />
        </mask>
      </defs>

      {/* The lamp, and its one lit wick: her light, and the floor it lights */}
      <g {...part("light")}>
        <ellipse cx={LX} cy={FOOT.y + 16} rx={230} ry={58} fill={url("floor")} />
        <circle className="m-shimmer" cx={FLAME_GLOW.x} cy={FLAME_GLOW.y + 40} r={180} fill={url("room")} />
        <ellipse cx={LX} cy={FOOT.y + 4} rx={74} ry={11} fill="var(--art-musk)" fillOpacity={0.22} />
        <g transform={LAMP_ZOOM}>
          <ellipse cx={LX} cy={FOOT.y + 2} rx={FOOT.rx} ry={FOOT.ry} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <path d={DOME} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} strokeLinejoin="round" />
          <path d={`M ${LX + 8} 530 C ${LX + 18} 534 ${LX + 30} 538 ${LX + 34} 544`} stroke="var(--gold-soft)" strokeWidth={1.6} strokeLinecap="round" />
          <circle cx={LX} cy={538} r={2.4} fill="var(--art-vermilion)" stroke="var(--gold-soft)" strokeWidth={0.4} />
          <path d={STEM} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          {KNOPS.map((k) => (
            <ellipse key={k.y} cx={LX} cy={k.y} rx={k.rx} ry={k.ry} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          ))}
          <circle cx={LX} cy={500} r={1.6} fill="var(--art-vermilion)" />
          <path d={`M ${LX - 1.2} 441 V ${RIM.y}`} stroke="var(--gold)" strokeWidth={2.6} />
          <ellipse cx={LX} cy={446} rx={4.4} ry={1.8} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.4} />
          <path d={FINIAL} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d={`M ${LX + 1.6} 423 C ${LX + 4} 427 ${LX + 4.4} 432 ${LX + 2.4} 437`} stroke="var(--gold-soft)" strokeWidth={0.9} strokeLinecap="round" />
          {SPOUTS.filter((s) => s.back).map((s) => (
            <path key={s.deg} d={s.d} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} strokeLinejoin="round" />
          ))}
          <path d={BOWL} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} strokeLinejoin="round" />
          <path d={`M ${LX + 6} ${RIM.y + 14} C ${LX + 18} ${RIM.y + 13} ${LX + 28} ${RIM.y + 8} ${LX + 31} ${RIM.y + 3}`} stroke="var(--gold-soft)" strokeWidth={1.4} strokeLinecap="round" />
          <ellipse cx={LX} cy={RIM.y} rx={RIM.rx} ry={RIM.ry} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <ellipse cx={LX} cy={RIM.y + 0.6} rx={RIM.rx - 4} ry={RIM.ry - 2} fill="var(--art-turmeric)" fillOpacity={0.85} />
          {SPOUTS.filter((s) => !s.back).map((s) => (
            <g key={s.deg}>
              <path d={s.d} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} strokeLinejoin="round" />
              {s.deg !== 18 && <circle cx={s.wick.x} cy={s.wick.y - 0.6} r={1.1} fill="var(--art-ivory)" stroke="var(--art-musk)" strokeWidth={0.3} />}
            </g>
          ))}
          <path d={polyline(JASMINE_SWAG)} stroke="var(--leaf)" strokeWidth={0.6} />
          {JASMINE.map((j, k) => (
            <ellipse key={k} cx={j.x} cy={j.y} rx={1.5} ry={1.9} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.3} />
          ))}
        </g>
        <circle className="m-shimmer" cx={FLAME_GLOW.x} cy={FLAME_GLOW.y} r={84} fill={url("glow")} />
        <g transform={LAMP_ZOOM}>
          <g transform={`translate(${FLAME_AT.x} ${FLAME_AT.y - 1})`}>
            <path d={tongue(FLAME.h, FLAME.w, FLAME.lean)} fill="var(--art-saffron)" stroke="var(--art-vermilion)" strokeWidth={0.8} strokeLinejoin="round" />
            <path className="m-flicker" d={tongue(FLAME.h * 0.6, FLAME.w * 0.5, FLAME.lean * 0.5)} fill="var(--art-core)" />
            <ellipse cy={-1.4} rx={1.4} ry={2.6} fill="var(--art-hair)" fillOpacity={0.6} />
          </g>
        </g>
      </g>

      {/* The Vedas, breathed out as the lamp's smoke in four streams */}
      <g {...part("vedas")}>
        <g mask={url("window")}>
          {STREAMS.map((s, i) => (
            <g key={i}>
              <path d={s.haze} fill="var(--art-moon)" fillOpacity={0.1} />
              <path d={s.haze} fill="var(--gold-soft)" fillOpacity={0.14} />
              <path className={LICK[i % 3]} d={s.body} fill="var(--gold-soft)" fillOpacity={0.85} />
              {s.sparks.map((p, k) => (
                <path key={k} className={LICK[(i + k + 1) % 3]} d={glint(k % 2 ? 2.6 : 3.4)} transform={`translate(${p.x} ${p.y})`} fill="var(--art-saffron)" />
              ))}
            </g>
          ))}
        </g>
      </g>

      {/* The span: Brahmā on his lotus, and the worm, in the same ring of her light */}
      <g {...part("span")}>
        {[BRAHMA_RING, WORM_RING].map((r, i) => (
          <g key={i}>
            <circle className="m-shimmer" cx={r.x} cy={r.y} r={RING_R + 10} fill={url("ring")} />
            <circle cx={r.x} cy={r.y} r={RING_R} stroke="var(--art-saffron)" strokeWidth={1.1} strokeOpacity={0.8} />
            <circle cx={r.x} cy={r.y} r={RING_R + 4} stroke="var(--gold-soft)" strokeWidth={0.7} strokeDasharray="1.4 3.2" strokeLinecap="round" />
          </g>
        ))}
        <g transform={`translate(${BRAHMA.x} ${BRAHMA.y}) scale(${BRAHMA.k})`}>
          <BrahmaLotus url={url} />
        </g>
        <g transform={`translate(${WORM_AT.x} ${WORM_AT.y}) scale(1.15)`}>
          <ellipse cx={6} cy={1.2} rx={30} ry={2.8} fill="var(--art-musk)" fillOpacity={0.25} />
          <path d={GRASS} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.3} strokeLinejoin="round" />
          <path d={WORM_BODY} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
          {WORM_SEGMENTS.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={0.9} fill="var(--gold-soft)" />
          ))}
          <circle cx={21.4} cy={-2.6} r={2.6} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.5} />
          <path d="M -19 0 L -20 2.4 M -16 0 L -16.6 2.4 M 13 0 L 12.6 2.2 M 16 0 L 16.4 2.2" stroke="var(--gold)" strokeWidth={0.7} strokeLinecap="round" />
        </g>
      </g>

      {/* The kolam before the lamp: four dots by four, every dot on a row and a column */}
      <g {...part("order")}>
        <ellipse cx={KOLAM.x} cy={KOLAM.y} rx={KOLAM_REACH + 12} ry={round((KOLAM_REACH + 12) * KOLAM.tilt)} fill={url("swept")} />
        <Kolam d={KOLAM_LINE} dots={KOLAM_DOTS} line={1.2} dot={2.1} />
      </g>

      {/* Sweet and bitter, each served on its plantain leaf */}
      <g {...part("fruits")}>
        {LEAVES.map((l) => (
          <g key={l.fruit} transform={`translate(${l.x} ${l.y}) scale(${LEAF_K})`}>
            <g transform={l.flip ? "scale(-1 1)" : undefined}>
              <path d={PLANTAIN} fill="var(--leaf)" fillOpacity={0.5} stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
              <path d="M -32 3 C -14 -1 14 -3 32 -4" stroke="var(--gold-soft)" strokeWidth={0.8} />
              <path d={PLANTAIN_VEINS} stroke="var(--gold-soft)" strokeWidth={0.4} strokeOpacity={0.6} />
            </g>
            {l.fruit === "sweet"
              ? MANGOES.map((m, i) => (
                  <g key={i} transform={`translate(${m.x} ${m.y}) rotate(${m.rot})`}>
                    <path d={MANGO} fill={url("mango")} stroke="var(--gold)" strokeWidth={0.6} />
                    <ellipse cx={3.6} cy={1.6} rx={4} ry={3} fill="var(--art-vermilion)" fillOpacity={0.35} />
                    <path d="M -6.6 -4 C -4 -5.6 -1 -5.8 2 -5" stroke="var(--art-ivory)" strokeWidth={1} strokeOpacity={0.7} strokeLinecap="round" />
                    <path d="M 3 -7.2 L 4.4 -10" stroke="var(--art-hair)" strokeWidth={0.9} strokeLinecap="round" />
                  </g>
                ))
              : GOURDS.map((g, i) => (
                  <g key={i} transform={`translate(${g.x} ${g.y}) rotate(${g.rot}) scale(${g.s})`}>
                    <path d={GOURD} transform="translate(1.2 1.8)" fill="var(--art-hair)" fillOpacity={0.3} />
                    <path d={GOURD} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
                    <path d={GOURD} fill="var(--art-hair)" fillOpacity={0.12} />
                    <path d={GOURD_GROOVES} stroke="var(--art-hair)" strokeWidth={0.6} strokeOpacity={0.55} strokeLinecap="round" />
                    <path d={`M ${round(-GOURD_LEN * 0.6)} -2.6 C -4 -3.9 4 -3.9 ${round(GOURD_LEN * 0.6)} -2.4`} stroke="var(--art-ivory)" strokeWidth={0.9} strokeOpacity={0.6} strokeLinecap="round" />
                    {GOURD_WARTS.map((w, k) => (
                      <circle key={k} cx={w.x} cy={w.y} r={0.6} fill="var(--gold-soft)" />
                    ))}
                    <path d={`M ${-GOURD_LEN} 0 C ${-GOURD_LEN - 2} -1 ${-GOURD_LEN - 3} -3 ${-GOURD_LEN - 2.6} -4.6`} stroke="var(--gold)" strokeWidth={1} strokeLinecap="round" />
                  </g>
                ))}
          </g>
        ))}
      </g>

      {/* Ants carrying the rice-flour kolam away, grain by grain */}
      <g {...part("ants")}>
        {CRUMBS.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={0.9} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.2} />
        ))}
        {ANTS.map((a, i) => (
          <g key={i} transform={`translate(${a.x} ${a.y}) rotate(${a.rot}) scale(1.25)`}>
            <path d={ANT_LEGS} stroke="var(--art-hair)" strokeWidth={0.45} strokeLinecap="round" />
            <ellipse cx={-3.6} cy={0} rx={2.6} ry={1.8} fill="var(--art-hair)" />
            <ellipse cx={0} cy={0} rx={1.5} ry={1} fill="var(--art-hair)" />
            <circle cx={2.6} cy={0} r={1.3} fill="var(--art-hair)" />
            {a.grain && <circle cx={5} cy={0} r={1.3} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.3} />}
          </g>
        ))}
      </g>
    </svg>
  );
}
