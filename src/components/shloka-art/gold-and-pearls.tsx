/**
 * Shloka 13 — "Gold on the arms, pearls at the throat".
 *
 * Nothing is outdone in this verse; it is a list of what she wears, so the
 * plate is drawn as a count. The mirror of Shloka 12, her face, returns with
 * the marriage thread still tied on its stem, and the verse dresses it further.
 * Her four arms leave her light in the mirror's face as beams set like the
 * four points of a flash on polished metal, each wearing a crested keyūra and
 * a beaded aṅgada. One layer outside the thread, a jewelled collar hangs on
 * the stem with its pendant, and loose strings of pearls swing beneath. Which
 * name each part answers to is written up for readers in the registry, next
 * to this artwork's entry.
 */

import {
  ArmLight,
  armBeam,
  artIds,
  cubicAt,
  Flash,
  handMirror,
  HandMirror,
  MarriageThread,
  marriageThread,
  MirrorFaceClip,
  MirrorShading,
  partProps,
  Pearl,
  polar,
  radiance,
  round,
  Ruby,
  swingFrom,
  ThreadMask,
} from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const CX = 320;
/** The mirror, centred on her light about 35 units under the card, and the thread still tied on its stem. */
const MIRROR = handMirror({ x: CX, y: 431 }, 701);
const THREAD = marriageThread(MIRROR);
const { c: C, faceR: FACE_R, frameR: FRAME_R, stemFoot: STEM_FOOT } = MIRROR;

/** Her radiance, kept faint so the four arms read as its strongest rays. */
const RADIANCE_FROM = FRAME_R + 6;
const RADIANCE_LONG = 500;
const RADIANCE = radiance({ cx: C.x, cy: C.y, from: RADIANCE_FROM, long: RADIANCE_LONG, short: 300 });

/* ── Her four arms, and their gold ─────────────────────────────────────── */

/** Each arm: where its light ends, its widths, and how far out (from her light) its two bands sit. */
const ARMS = [
  { tip: { x: 150, y: 96 }, w0: 42, w1: 14, keyura: 288, angada: 320 },
  { tip: { x: 490, y: 96 }, w0: 42, w1: 14, keyura: 288, angada: 320 },
  { tip: { x: 92, y: 596 }, w0: 38, w1: 13, keyura: 160, angada: 200 },
  { tip: { x: 548, y: 596 }, w0: 38, w1: 13, keyura: 160, angada: 200 },
].map((a) => {
  const beam = armBeam(C, a.tip, a.w0, a.w1, FRAME_R + 2);
  const len = Math.hypot(a.tip.x - C.x, a.tip.y - C.y);
  const along = (d: number) => ({ x: round(C.x + ((a.tip.x - C.x) * d) / len), y: round(C.y + ((a.tip.y - C.y) * d) / len) });
  return { beam, keyura: along(a.keyura), angada: along(a.angada), turn: round(beam.angle + 90) };
});

/** The keyūra's crest: a pointed gold plaque standing up from the band toward her light. */
const CREST = "M -7.5 3.5 C -8 10 -4.5 17 0 24 C 4.5 17 8 10 7.5 3.5 Q 0 6.5 -7.5 3.5 Z";
/** Beads between the aṅgada's two rings, along its front. */
const ANGADA_BEADS = [-9, -6, -3, 0, 3, 6, 9].map((x) => ({ x, y: round(4.2 * Math.sqrt(1 - (x / 13) ** 2)) }));

/* ── The collar, its pendant, and the pearls ───────────────────────────── */

/** The collar's centre line, left half, from under the cup down to its lowest point in front of the stem. */
const COLLAR_L: [Pt, Pt, Pt, Pt] = [
  { x: CX - 30, y: 531 },
  { x: CX - 86, y: 538 },
  { x: CX - 72, y: 609 },
  { x: CX, y: 611 },
];
const mirrorX = (p: Pt): Pt => ({ x: 2 * CX - p.x, y: p.y });
const COLLAR_R = [...COLLAR_L].reverse().map(mirrorX) as [Pt, Pt, Pt, Pt];
const COLLAR_PATH = `M ${COLLAR_L[0].x} ${COLLAR_L[0].y} C ${COLLAR_L[1].x} ${COLLAR_L[1].y} ${COLLAR_L[2].x} ${COLLAR_L[2].y} ${COLLAR_L[3].x} ${COLLAR_L[3].y} C ${COLLAR_R[1].x} ${COLLAR_R[1].y} ${COLLAR_R[2].x} ${COLLAR_R[2].y} ${COLLAR_R[3].x} ${COLLAR_R[3].y}`;
const COLLAR_W = 14;

/** The collar's centre line sampled finely, left end to right end, with the distance along it. */
const SAMPLES = (() => {
  const n = 200;
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) pts.push(cubicAt(...COLLAR_L, i / n));
  for (let i = 1; i <= n; i++) pts.push(cubicAt(...COLLAR_R, i / n));
  let s = 0;
  return pts.map((p, i) => {
    if (i > 0) s += Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y);
    return { ...p, s };
  });
})();
const COLLAR_LEN = SAMPLES[SAMPLES.length - 1].s;

/** The point `s` along the collar, pushed `off` units outward (away from the stem). */
function onCollar(s: number, off = 0): Pt {
  const i = Math.max(1, SAMPLES.findIndex((p) => p.s >= s));
  const a = SAMPLES[i - 1];
  const b = SAMPLES[i];
  const t = b.s === a.s ? 0 : (s - a.s) / (b.s - a.s);
  const x = a.x + (b.x - a.x) * t;
  const y = a.y + (b.y - a.y) * t;
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  let nx = (b.y - a.y) / len;
  let ny = -(b.x - a.x) / len;
  if (nx * (x - CX) + ny * (y - 560) < 0) {
    nx = -nx;
    ny = -ny;
  }
  return { x: round(x + nx * off), y: round(y + ny * off) };
}

/** Sixteen stones, rubies and emeralds by turns, one for each syllable of the name. */
const STONES = Array.from({ length: 16 }, (_, k) => ({ ...onCollar((COLLAR_LEN * (k + 0.5)) / 16), ruby: k % 2 === 0 }));
/** The plaques' joints, between the stones. */
const JOINTS = Array.from({ length: 15 }, (_, k) => {
  const s = (COLLAR_LEN * (k + 1)) / 16;
  const a = onCollar(s, -COLLAR_W / 2);
  const b = onCollar(s, COLLAR_W / 2);
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}).join(" ");
const edgePearls = (off: number, n: number) => Array.from({ length: n }, (_, k) => onCollar((COLLAR_LEN * (k + 0.5)) / n, off));
const OUTER_PEARLS = edgePearls(COLLAR_W / 2 + 2.4, 40);
const INNER_PEARLS = edgePearls(-(COLLAR_W / 2 + 1.9), 30);

/** The pendant (cintāka), hung from the collar's lowest point. */
const PENDANT = { x: CX, y: 633, r: 14 };
const PENDANT_PEARLS = Array.from({ length: 12 }, (_, k) => polar(PENDANT.x, PENDANT.y, 10.8, k * 30 + 15));
const DROP = { x: CX, y: PENDANT.y + PENDANT.r + 11, r: 4.6 };

/** Loose strings of pearls (lola-muktāphala), hung from the collar's outer edge. */
const PEARL_R = 2.5;
const PEARL_GAP = 5.7;
const STRINGS = [
  { s: 0.25, n: 7, sway: "m-sway m-later" },
  { s: 0.33, n: 13, sway: "m-sway" },
  { s: 0.42, n: 18, sway: "m-sway m-late" },
  { s: 0.71, n: 15, sway: "m-sway m-later" },
  { s: 0.79, n: 8, sway: "m-sway" },
].map(({ s, n, sway }) => {
  const top = onCollar(COLLAR_LEN * s, COLLAR_W / 2 + 1);
  const pearls = Array.from({ length: n }, (_, k) => ({ x: top.x, y: round(top.y + 4.5 + k * PEARL_GAP) }));
  return { top, pearls, sway, end: { x: top.x, y: round(top.y + 4.5 + n * PEARL_GAP + 1.5) } };
});

export function GoldAndPearls({ idPrefix = "sa13", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={C.x} cy={C.y} r={290} gradientUnits="userSpaceOnUse">
          <stop offset="0.32" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.4 }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={C.x} cy={C.y} r={RADIANCE_LONG} gradientUnits="userSpaceOnUse">
          <stop offset={round(RADIANCE_FROM / RADIANCE_LONG)} style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "var(--gold)", stopOpacity: 0.5 }} />
          <stop offset="0.6" style={{ stopColor: "var(--gold)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("reflected")} cx={C.x} cy={C.y} r={FACE_R} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.85 }} />
          <stop offset="0.22" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="0.42" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.26 }} />
          <stop offset="0.8" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.07 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        {ARMS.map(({ beam: b }, i) => (
          <linearGradient key={i} id={id(`arm-${i}`)} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
            <stop offset="0.2" style={{ stopColor: "var(--art-saffron)", stopOpacity: 1 }} />
            <stop offset="0.82" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
            <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
          </linearGradient>
        ))}
        <MirrorShading m={MIRROR} id={id} />
        <MirrorFaceClip m={MIRROR} id={id} />
        {/* Her light outside the mirror: everywhere but the disc and its stem */}
        <mask id={id("outside")} maskUnits="userSpaceOnUse" x={-200} y={-200} width={1040} height={1230}>
          <rect x={-200} y={-200} width={1040} height={1230} fill="#fff" />
          <circle cx={C.x} cy={C.y} r={FRAME_R + 1} fill="#000" />
          <rect x={CX - 11} y={C.y} width={22} height={STEM_FOOT + 34 - C.y} fill="#000" />
        </mask>
        <ThreadMask t={THREAD} id={id} />
      </defs>

      {/* Her face as the mirror of the last verse, holding nothing but her light */}
      <g {...part("mirror")}>
        <g mask={url("outside")}>
          <circle className="m-shimmer" cx={C.x} cy={C.y} r={290} fill={url("glow")} />
          <path className="m-shimmer" d={RADIANCE} stroke={url("radiance")} strokeWidth={0.6} strokeLinecap="round" />
        </g>
        <HandMirror m={MIRROR} url={url} />
        <g clipPath={url("face-clip")}>
          <circle className="m-shimmer" cx={C.x} cy={C.y} r={FACE_R} fill={url("reflected")} />
        </g>
        <circle cx={C.x} cy={C.y} r={12} fill="var(--art-saffron)" fillOpacity={0.75} />
        <circle className="m-shimmer" cx={C.x} cy={C.y} r={20} fill={url("bindu-glow")} />
        <circle cx={C.x} cy={C.y} r={7.5} stroke="var(--art-core)" strokeWidth={0.8} />
        <circle cx={C.x} cy={C.y} r={3.8} fill="var(--art-core)" />
      </g>

      {/* Her four arms, beams of light set like a flash on polished metal, each with two bands of gold */}
      <g {...part("arms")}>
        <g className="m-shimmer">
          {ARMS.map(({ beam }, i) => (
            <ArmLight key={i} beam={beam} fill={url(`arm-${i}`)} />
          ))}
        </g>
        {ARMS.map(({ keyura, angada, turn }, i) => (
          <g key={i}>
            <g transform={`translate(${angada.x} ${angada.y}) rotate(${turn}) scale(1.2)`}>
              <ellipse cy={-2.4} rx={13} ry={4.2} stroke="var(--gold)" strokeWidth={1.8} />
              <ellipse cy={2.4} rx={13} ry={4.2} stroke="var(--gold)" strokeWidth={1.8} />
              <g fill="var(--gold-soft)" stroke="var(--art-carve)" strokeWidth={0.3}>
                {ANGADA_BEADS.map((b) => (
                  <circle key={b.x} cx={b.x} cy={b.y} r={1.15} />
                ))}
              </g>
            </g>
            <g transform={`translate(${keyura.x} ${keyura.y}) rotate(${turn}) scale(1.25)`}>
              <ellipse rx={15} ry={5} stroke="var(--art-carve)" strokeWidth={7.2} />
              <ellipse rx={15} ry={5} stroke="var(--gold)" strokeWidth={6} />
              <path d="M -13 2.6 Q 0 6.4 13 2.6" stroke="var(--art-core)" strokeWidth={1} strokeOpacity={0.7} strokeLinecap="round" />
              <path d={CREST} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
              <path d="M -4.6 7 C -4.6 11 -2.6 15 0 19" stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.7} strokeLinecap="round" />
              <g>
                <ellipse cx={-3.4} cy={7.2} rx={1.9} ry={1.6} fill="var(--art-carve)" />
                <ellipse cx={-3.4} cy={7.2} rx={1.2} ry={1} fill="var(--leaf)" />
                <ellipse cx={3.4} cy={7.2} rx={1.9} ry={1.6} fill="var(--art-carve)" />
                <ellipse cx={3.4} cy={7.2} rx={1.2} ry={1} fill="var(--leaf)" />
              </g>
              <Ruby x={0} y={13} r={2.6} />
              <circle cy={24.5} r={1.4} fill="var(--gold)" />
            </g>
            <Flash x={keyura.x} y={keyura.y} s={6} group={i % 3} />
          </g>
        ))}
      </g>

      {/* The marriage thread, still tied, one layer in */}
      <g {...part("thread")}>
        <MarriageThread t={THREAD} url={url} />
      </g>

      {/* The jewelled collar hung on the stem, its pendant, and the loose strings of pearls */}
      <g {...part("necklace")}>
        {STRINGS.map((str, i) => (
          <g key={i} className={str.sway} style={swingFrom(str.top)}>
            <path d={`M ${str.top.x} ${str.top.y} L ${str.end.x} ${str.end.y}`} stroke="var(--gold)" strokeWidth={0.5} />
            {str.pearls.map((p, k) => (
              <g key={k}>
                <circle cx={p.x} cy={p.y} r={PEARL_R} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.5} />
                {k < 3 && (
                  <path d={`M ${p.x - 2} ${p.y - 1} A ${PEARL_R} ${PEARL_R} 0 0 1 ${p.x + 2} ${p.y - 1}`} stroke="var(--sindura)" strokeWidth={0.9} strokeOpacity={0.55 - k * 0.15} strokeLinecap="round" />
                )}
                <circle cx={round(p.x - 0.8)} cy={round(p.y - 0.8)} r={0.6} fill="var(--art-core)" />
              </g>
            ))}
            <circle cx={str.end.x} cy={str.end.y} r={1.6} fill="var(--gold)" />
          </g>
        ))}

        <path d={COLLAR_PATH} stroke="var(--art-carve)" strokeWidth={COLLAR_W + 1.4} strokeLinecap="round" />
        <path d={COLLAR_PATH} stroke="var(--gold)" strokeWidth={COLLAR_W} strokeLinecap="round" />
        <path d={JOINTS} stroke="var(--art-carve)" strokeWidth={0.5} strokeOpacity={0.8} />
        {STONES.map((g, i) =>
          g.ruby ? (
            <Ruby key={i} x={g.x} y={g.y} r={3.1} />
          ) : (
            <g key={i}>
              <ellipse cx={g.x} cy={g.y} rx={3.9} ry={3.4} fill="var(--art-carve)" />
              <ellipse cx={g.x} cy={g.y} rx={2.8} ry={2.4} fill="var(--leaf)" />
            </g>
          ),
        )}
        <g fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.4}>
          {OUTER_PEARLS.map((p, k) => (
            <circle key={k} cx={p.x} cy={p.y} r={1.7} />
          ))}
          {INNER_PEARLS.map((p, k) => (
            <circle key={k} cx={p.x} cy={p.y} r={1.4} />
          ))}
        </g>
        <g stroke="var(--sindura)" strokeWidth={0.7} strokeOpacity={0.45} strokeLinecap="round">
          {INNER_PEARLS.map((p, k) => (
            <path key={k} d={`M ${p.x - 1.1} ${p.y - 0.7} A 1.4 1.4 0 0 1 ${p.x + 1.1} ${p.y - 0.7}`} />
          ))}
        </g>

        <circle cx={PENDANT.x} cy={PENDANT.y - PENDANT.r - 3.6} r={2.6} stroke="var(--gold)" strokeWidth={1.4} />
        <circle cx={PENDANT.x} cy={PENDANT.y} r={PENDANT.r + 0.7} fill="var(--art-carve)" />
        <circle cx={PENDANT.x} cy={PENDANT.y} r={PENDANT.r} fill="var(--gold)" />
        <path d={`M ${PENDANT.x - 9} ${PENDANT.y - 6} A ${PENDANT.r - 1.5} ${PENDANT.r - 1.5} 0 0 1 ${PENDANT.x + 4} ${PENDANT.y - 10.4}`} stroke="var(--art-core)" strokeWidth={1.1} strokeOpacity={0.7} strokeLinecap="round" />
        <g fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.4}>
          {PENDANT_PEARLS.map((p, k) => (
            <circle key={k} cx={p.x} cy={p.y} r={1.6} />
          ))}
        </g>
        <Ruby x={PENDANT.x} y={PENDANT.y} r={5.4} />
        <Flash x={PENDANT.x - 2} y={PENDANT.y - 3} s={7} group={1} />
        <circle cx={DROP.x} cy={PENDANT.y + PENDANT.r + 2.6} r={2} stroke="var(--gold)" strokeWidth={1} />
        <Pearl x={DROP.x} y={DROP.y} r={DROP.r} cap />
      </g>
    </svg>
  );
}
