/**
 * Shloka 16 — "Safflower on the slope, and a belt that speaks first".
 *
 * The verse calls the place where her cloth lies a taṭī, the word for a
 * mountainside, and Śaṅkara takes it at its word: the lord of mountains gave
 * her his own slope as a wedding gift. So the safflower cloth is worn by a
 * mountain whose peak has just caught the dawn, and the girdle is tied round
 * its middle slopes, which Sanskrit already calls a mountain's girdle
 * (mekhalā). Its jewelled bells sound before anything else is seen. Which name
 * each part answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import { artIds, glint, partProps, polyline, round, swingFrom, through } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

/** The y of a curve that runs left to right, at x. */
function yAt(curve: Pt[], x: number) {
  if (x <= curve[0].x) return curve[0].y;
  for (let i = 1; i < curve.length; i++) {
    const a = curve[i - 1];
    const b = curve[i];
    if (x <= b.x) return round(a.y + ((b.y - a.y) * (x - a.x)) / (b.x - a.x || 1));
  }
  return curve[curve.length - 1].y;
}

/** A left-to-right curve resampled at even x, shifted down by dy. */
const resample = (curve: Pt[], x0: number, x1: number, dy = 0, step = 5) =>
  Array.from({ length: Math.floor((x1 - x0) / step) + 1 }, (_, k) => {
    const x = x0 + k * step;
    return { x, y: round(yAt(curve, x) + dy) };
  });

/* ── The mountain ──────────────────────────────────────────────────────── */

const PEAK = { x: 548, y: 128 };
/** Its skyline, from the foot of the long slope on the left, over the peak, and down off the right edge. */
const SKYLINE = through([
  { x: -20, y: 724 },
  { x: 80, y: 646 },
  { x: 170, y: 566 },
  { x: 256, y: 482 },
  { x: 334, y: 398 },
  { x: 404, y: 312 },
  { x: 462, y: 232 },
  { x: 508, y: 170 },
  PEAK,
  { x: 584, y: 160 },
  { x: 620, y: 196 },
  { x: 664, y: 226 },
]);
const MOUNTAIN = polyline(SKYLINE) + " L 664 840 L -20 840 Z";

/** Bands of rock across its upper face, and the snow on the peak, blushing with the dawn. */
const ROCK = [
  "M 488 214 Q 530 222 566 206 M 452 268 Q 510 284 590 252 M 414 326 Q 486 344 560 318 Q 600 304 640 296 M 376 380 Q 440 398 520 384",
  "M 548 140 Q 546 170 530 200 M 556 150 Q 572 190 600 214 M 520 230 Q 512 262 494 290 M 572 262 Q 580 290 604 312",
];
const SNOW =
  "M 512 166 Q 530 142 548 128 Q 566 144 584 160 L 590 176 L 578 172 L 572 190 L 562 176 L 552 200 L 544 178 L 532 192 L 528 176 L 516 184 Z";

/* ── The girdle, round the mountain's middle ───────────────────────────── */

/** The girdle crosses the mountain's face seen a little from above, so its front sags. */
const GIRDLE_FROM = { x: 262, y: round(yAt(SKYLINE, 262)) };
const GIRDLE = through([GIRDLE_FROM, { x: 340, y: 470 }, { x: 440, y: 492 }, { x: 540, y: 490 }, { x: 664, y: 466 }], 24);
const KNOT = { x: 446, y: round(yAt(GIRDLE, 446)) };

const SWAY = ["m-sway", "m-sway m-late", "m-sway m-later"];
const LICK = ["m-lick", "m-lick m-late", "m-lick m-later"];

const BELLS = Array.from({ length: 13 }, (_, k) => {
  const x = 286 + k * 28;
  return { x, y: yAt(GIRDLE, x), gem: k % 2 ? "var(--leaf)" : "var(--art-vermilion)", group: k % 3 };
}).filter((b) => Math.abs(b.x - KNOT.x) > 16 && b.x < 640);

/** One jewelled bell (kiṅkiṇī) hanging from the cord at the origin. */
function Bell({ gem, s = 1 }: { gem: string; s?: number }) {
  return (
    <g transform={s === 1 ? undefined : `scale(${s})`}>
      <path d="M 0 0 L 0 6" stroke="var(--gold)" strokeWidth={1.1} />
      <circle cy={5} r={2.3} stroke="var(--gold)" strokeWidth={1} />
      <circle cy={16} r={9.2} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.7} />
      <path d="M -8.2 19 Q 0 22.8 8.2 19" stroke="var(--art-carve)" strokeWidth={1.6} strokeLinecap="round" />
      <circle cy={22} r={1.9} fill="var(--art-carve)" />
      <circle cy={12.6} r={3} fill={gem} stroke="var(--art-carve)" strokeWidth={0.5} />
      <path d="M -5.8 12 Q -5.6 8.2 -2.4 7.4" stroke="var(--art-core)" strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}

/** Rings of sound, broken like a chime, spreading out from the knot. */
const SOUND = [52, 92, 138, 190, 248].map((r, k) => {
  const at = (deg: number) => ({ x: round(KNOT.x + r * Math.cos((deg * Math.PI) / 180)), y: round(KNOT.y - 26 - r * Math.sin((deg * Math.PI) / 180)) });
  const a = at(18 + k * 4);
  const b = at(162 - k * 4);
  return { d: `M ${a.x} ${a.y} A ${r} ${r} 0 0 0 ${b.x} ${b.y}`, opacity: round(0.75 - k * 0.11), dash: `${round(4 + k * 1.6)} ${round(5 + k * 2.4)}` };
});

/* ── The cloth below it ────────────────────────────────────────────────── */

/** The hem: a row of soft lobes, one for each fold, crossing the slope. */
const FOLD_W = 26;
const HEM_BASE = (x: number) => 648 + (x - 120) * 0.035;
const HEM_LEFT = { x: 96, y: round(yAt(SKYLINE, 96)) };
const HEM: Pt[] = (() => {
  const out: Pt[] = [];
  for (let x = HEM_LEFT.x; x <= 664; x += 2) {
    const phase = ((x - HEM_LEFT.x) % FOLD_W) / FOLD_W;
    out.push({ x, y: round(HEM_BASE(x) + 7 * Math.sin(phase * Math.PI)) });
  }
  return out;
})();
const CLOTH =
  polyline(resample(GIRDLE, GIRDLE_FROM.x, 664)) +
  " " +
  polyline([...HEM].reverse()).replace(/^M/, "L") +
  " " +
  polyline(SKYLINE.filter((p) => p.x > HEM_LEFT.x && p.x < GIRDLE_FROM.x)).replace(/^M/, "L") +
  " Z";

/** Folds hanging from the girdle, each ending at the hem between two lobes. */
const FOLDS = Array.from({ length: 23 }, (_, k) => {
  const xb = HEM_LEFT.x + (k + 1) * FOLD_W;
  const xt = round(xb + (KNOT.x - xb) * 0.1);
  const top = Math.max(yAt(GIRDLE, xt), yAt(SKYLINE, xt)) + 8;
  const bottom = HEM_BASE(xb) + 1;
  const bow = ((k % 3) - 1) * 3;
  return {
    d: `M ${xt} ${round(top)} Q ${round((xt + xb) / 2 + bow)} ${round((top + bottom) / 2)} ${xb} ${round(bottom)}`,
    shade: `M ${round(xb - 3)} ${round(bottom - 2)} Q ${round((xt + xb) / 2 + bow - 3)} ${round((top + bottom) / 2 + 40)} ${round(xt - 2)} ${round(top + 60)}`,
    sheen: `M ${round(xt + 8)} ${round(top + 6)} Q ${round((xt + xb) / 2 + bow + 9)} ${round(top + (bottom - top) * 0.3)} ${round(xt + (xb - xt) * 0.5 + 9)} ${round(top + (bottom - top) * 0.55)}`,
  };
}).filter((f, k) => HEM_LEFT.x + (k + 1) * FOLD_W < 660);

/** The front pleats, falling from the knot in a fan. */
const PLEATS = Array.from({ length: 7 }, (_, k) => {
  const u = k - 3;
  return { top: { x: KNOT.x + u * 4, y: KNOT.y + 8 }, bottom: { x: KNOT.x + u * 13, y: 690 } };
});
const PLEAT_FAN =
  `M ${PLEATS[0].top.x - 2} ${PLEATS[0].top.y} L ${PLEATS[0].bottom.x - 4} ${PLEATS[0].bottom.y} ` +
  PLEATS.map((p, k) => `L ${round(p.bottom.x + 4.5)} ${round(p.bottom.y + (k % 2 ? -5 : 4))}`).join(" ") +
  ` L ${PLEATS[6].top.x + 2} ${PLEATS[6].top.y} Z`;

/* ── Dawn ──────────────────────────────────────────────────────────────── */

const DAWN = { x: 210, y: 520 };

/* ── Safflower, the dye's source ───────────────────────────────────────── */

const SAFFLOWERS = [
  { x: 536, y: 722, s: 1.1, lean: -6 },
  { x: 572, y: 742, s: 0.9, lean: 9 },
  { x: 502, y: 748, s: 0.82, lean: -15 },
];
const FLORETS = Array.from({ length: 13 }, (_, k) => {
  const deg = -64 + k * (128 / 12);
  const t = (deg * Math.PI) / 180;
  const l = 13 + ((k * 5) % 4) * 1.6;
  return { x2: round(Math.sin(t) * l), y2: round(-6 - Math.cos(t) * l), red: k % 3 !== 1 };
});
const BRACTS = [-50, -25, 0, 25, 50]
  .map((deg) => {
    const t = (deg * Math.PI) / 180;
    return `M ${round(Math.sin(t) * 6)} ${round(-Math.cos(t) * 5)} L ${round(Math.sin(t) * 10.5)} ${round(-3 - Math.cos(t) * 8)}`;
  })
  .join(" ");
const SAFFLOWER_LEAF = "M 0 0 C 3 -4 9 -6 15 -5 L 13 -3 L 17 -2 L 14 0 L 17 2 L 12 2.4 C 8 3 3 2 0 0 Z";

export function SafflowerSlope({ idPrefix = "sa16", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);
  const girdlePath = polyline(resample(GIRDLE, GIRDLE_FROM.x, 664, 0, 4));

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("dawn")} cx={DAWN.x} cy={DAWN.y} r={400} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.5 }} />
          <stop offset="0.2" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.4 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("rock")} x1={0} y1={PEAK.y} x2={0} y2={520} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.55 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.04 }} />
        </linearGradient>
        <linearGradient id={id("alpenglow")} x1={0} y1={128} x2={0} y2={190} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.05 }} />
        </linearGradient>
        <linearGradient id={id("cloth")} x1={100} y1={0} x2={660} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </linearGradient>
        <linearGradient id={id("pleat")} x1={0} y1={KNOT.y} x2={0} y2={704} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)" }} />
        </linearGradient>
        <clipPath id={id("cloth-clip")}>
          <path d={CLOTH} />
        </clipPath>
      </defs>

      {/* The mountain, its peak catching the dawn */}
      <g {...part("slope")}>
        <circle className="m-shimmer" cx={DAWN.x} cy={DAWN.y} r={400} fill={url("dawn")} />
        <path d={MOUNTAIN} fill="var(--art-stone)" />
        <path d={MOUNTAIN} fill={url("rock")} />
        <path d={ROCK[0]} stroke="var(--gold)" strokeWidth={1.1} strokeOpacity={0.55} strokeLinecap="round" />
        <path d={ROCK[1]} stroke="var(--gold-soft)" strokeWidth={0.8} strokeOpacity={0.6} strokeLinecap="round" />
        <path d={SNOW} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.6} />
        <path className="m-shimmer" d={SNOW} fill={url("alpenglow")} />
        <path d={polyline(SKYLINE)} stroke="var(--gold)" strokeWidth={1.4} strokeLinejoin="round" />
        <path d={polyline(SKYLINE.filter((p) => p.x > 250 && p.x < 560))} stroke="var(--art-core)" strokeWidth={2.4} strokeOpacity={0.6} strokeLinecap="round" />
      </g>

      {/* The safflower cloth, red as the dawn, shining where the light finds it */}
      <g {...part("cloth")}>
        <path d={CLOTH} fill={url("cloth")} />
        <g clipPath={url("cloth-clip")}>
          {FOLDS.map((f, i) => (
            <g key={i}>
              <path d={f.shade} stroke="var(--art-crimson)" strokeWidth={5} strokeOpacity={0.2} strokeLinecap="round" />
              <path d={f.d} stroke="var(--art-crimson)" strokeWidth={1} strokeOpacity={0.6} strokeLinecap="round" />
              {i % 2 === 0 && <path className="m-shimmer" d={f.sheen} stroke="var(--art-core)" strokeWidth={2.6} strokeOpacity={0.5} strokeLinecap="round" />}
            </g>
          ))}
          <path d={polyline(HEM.map((p) => ({ x: p.x, y: p.y - 12 })))} stroke="var(--gold)" strokeWidth={1} />
          <path d={polyline(HEM.map((p) => ({ x: p.x, y: p.y - 20 })))} stroke="var(--gold)" strokeWidth={0.8} />
          <path d={polyline(HEM.map((p) => ({ x: p.x, y: p.y - 16 })))} stroke="var(--art-saffron)" strokeWidth={3} strokeDasharray="3 4" />
        </g>
        <path d={polyline(HEM)} stroke="var(--gold)" strokeWidth={1.5} />
        <path
          d={HEM.filter((_, k) => k % 3 === 0)
            .map((p) => `M ${p.x} ${p.y} L ${round(p.x - 0.6)} ${round(p.y + 6)}`)
            .join(" ")}
          stroke="var(--gold)"
          strokeWidth={0.9}
          strokeLinecap="round"
        />
        <path d={PLEAT_FAN} fill={url("pleat")} stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
        {PLEATS.map((p, k) => (
          <path key={k} d={`M ${round(p.top.x)} ${round(p.top.y)} L ${round(p.bottom.x)} ${round(p.bottom.y)}`} stroke={k % 2 ? "var(--art-core)" : "var(--art-crimson)"} strokeWidth={k % 2 ? 1.6 : 1} strokeOpacity={k % 2 ? 0.5 : 0.7} />
        ))}
        <path
          d={`M ${PLEATS[0].bottom.x - 4} ${PLEATS[0].bottom.y - 9} ` + PLEATS.map((p, k) => `L ${round(p.bottom.x + 4.5)} ${round(p.bottom.y - 9 + (k % 2 ? -5 : 4))}`).join(" ")}
          stroke="var(--gold)"
          strokeWidth={2.4}
          strokeLinejoin="round"
        />
      </g>

      {/* The girdle round its middle, its jewelled bells heard before they are seen */}
      <g {...part("girdle")}>
        {SOUND.map((s, i) => (
          <path key={i} className="m-shimmer" d={s.d} stroke="var(--gold)" strokeWidth={1.1} strokeOpacity={s.opacity} strokeDasharray={s.dash} strokeLinecap="round" />
        ))}
        <path d={girdlePath} stroke="var(--gold)" strokeWidth={6} strokeLinecap="round" />
        <path d={girdlePath} stroke="var(--art-carve)" strokeWidth={0.9} strokeDasharray="2.4 2.6" />
        <path d={polyline(resample(GIRDLE, GIRDLE_FROM.x + 4, 660, -1.8, 4))} stroke="var(--art-core)" strokeWidth={0.9} strokeOpacity={0.7} />
        {BELLS.map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${b.y + 2})`}>
            <g className={SWAY[b.group]}>
              <Bell gem={b.gem} />
            </g>
          </g>
        ))}
        {BELLS.filter((_, i) => i % 3 === 1).map((b, i) => (
          <g key={i} transform={`translate(${b.x - 4} ${b.y + 12})`}>
            <path className={LICK[i % 3]} d={glint(7)} fill="var(--art-core)" />
          </g>
        ))}
        <g transform={`translate(${KNOT.x} ${KNOT.y})`}>
          <ellipse rx={13} ry={9.5} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.7} />
          <circle r={5.4} fill="var(--art-vermilion)" stroke="var(--art-carve)" strokeWidth={0.7} />
          <path d="M -3 -1.4 Q -2.2 -3.8 0.6 -4" stroke="var(--art-core)" strokeWidth={0.9} strokeLinecap="round" />
        </g>
        <g className="m-sway m-late" style={swingFrom(KNOT)}>
          {[-1, 1].map((side) => (
            <g key={side}>
              <path d={`M ${KNOT.x + side * 6} ${KNOT.y + 6} Q ${KNOT.x + side * 22} ${KNOT.y + 30} ${KNOT.x + side * 24} ${KNOT.y + 58}`} stroke="var(--gold)" strokeWidth={2.4} strokeLinecap="round" />
              <g transform={`translate(${KNOT.x + side * 24} ${KNOT.y + 58})`}>
                <Bell gem="var(--art-vermilion)" s={1.15} />
              </g>
            </g>
          ))}
        </g>
      </g>

      {/* Safflower, the flower the dye is made from */}
      <g {...part("safflower")}>
        {SAFFLOWERS.map((f, i) => (
          <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${f.lean}) scale(${f.s})`}>
            <path d="M 0 2 Q 2 40 -1 78" stroke="var(--leaf)" strokeWidth={2} strokeLinecap="round" />
            <path d={SAFFLOWER_LEAF} fill="var(--leaf)" transform="translate(0 34) rotate(-30)" />
            <path d={SAFFLOWER_LEAF} fill="var(--leaf)" transform="translate(0 52) scale(-1 1) rotate(-24)" />
            {FLORETS.map((l, k) => (
              <path key={k} d={`M 0 -5 L ${l.x2} ${l.y2}`} stroke={l.red ? "var(--art-vermilion)" : "var(--art-saffron)"} strokeWidth={1.6} strokeLinecap="round" />
            ))}
            <g fill="var(--art-turmeric)">
              {FLORETS.filter((_, k) => k % 2 === 0).map((l, k) => (
                <circle key={k} cx={l.x2} cy={l.y2} r={1.1} />
              ))}
            </g>
            <ellipse cy={2} rx={7.4} ry={8.4} fill="var(--leaf)" />
            <path d={BRACTS} stroke="var(--leaf)" strokeWidth={1.6} strokeLinecap="round" />
            <path d="M -4 -1 Q 0 4 4 -1 M -5 4 Q 0 9 5 4" stroke="var(--gold-soft)" strokeWidth={0.6} />
          </g>
        ))}
      </g>
    </svg>
  );
}
