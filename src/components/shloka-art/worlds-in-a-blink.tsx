/**
 * Shloka 66 — "Rows of worlds, made and unmade in a blink".
 *
 * The second line quotes the Puruṣa Sūkta, so the picture is the hymn's
 * cosmic person with no figure: each thing it counts in thousands is drawn the
 * way this series always draws her. Her face is the hand mirror, held up to a
 * second mirror so that it holds faces inside faces past counting, with her
 * light at the end of them. Round it flows the stream of its beauty, full of
 * fish, which have been her eyes since the sixth verse. Round its foot her
 * footprints stand on every side of the earth, and the mirror's foot stands
 * clear of the earth by ten fingers. Across the crown hang rows of
 * world-eggs that open and shut like eyes. Which name each part answers to is
 * written up for readers in the registry, next to this artwork's entry.
 */

import {
  FishDefs,
  Fish,
  FISH_BODY,
  Footprint,
  HandMirror,
  MarriageThread,
  MirrorFaceClip,
  MirrorShading,
  ThreadMask,
  WavePattern,
  artIds,
  eggPath,
  glint,
  handMirror,
  hash,
  marriageThread,
  partProps,
  round,
} from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

/* ── Her face, the mirror ──────────────────────────────────────────────── */

const C = { x: 320, y: 470 };
const K = 0.76;
/** A long stem, so its bud hangs clear below the tāli. */
const MIRROR = handMirror(C, C.y + 196);
const THREAD = marriageThread(MIRROR);
const ZOOM = `translate(${C.x} ${C.y}) scale(${K}) translate(${-C.x} ${-C.y})`;
const onPage = (p: Pt) => ({ x: round(C.x + (p.x - C.x) * K), y: round(C.y + (p.y - C.y) * K) });

/** Where the reflections recede to, in the mirror's own units. */
const DRIFT = { x: -24, y: -30 };
const Q = 0.7;
/**
 * The mirror turned to a second mirror: the whole mirror again inside its own
 * face, frame, cup and stem, again and again, each smaller and fainter,
 * drifting toward one point.
 */
const REFLECTIONS = Array.from({ length: 7 }, (_, i) => {
  const q = Q ** (i + 1);
  const x = round(C.x + DRIFT.x * (1 - q));
  const y = round(C.y + DRIFT.y * (1 - q));
  const frame = round(86 * q);
  const face = round(76 * q);
  const beads =
    i < 4 ? Array.from({ length: 36 }, (_, k) => ({ x: round(x + (frame - 5 * q) * Math.cos((k * 2 * Math.PI) / 36)), y: round(y + (frame - 5 * q) * Math.sin((k * 2 * Math.PI) / 36)) })) : [];
  const cupTop = round(y + frame + 2 * q);
  return {
    x,
    y,
    frame,
    face,
    beads,
    bead: round(1.7 * q),
    cup: `M ${round(x - 24 * q)} ${cupTop} Q ${x} ${round(cupTop + 26 * q)} ${round(x + 24 * q)} ${cupTop} Z`,
    stem: `M ${round(x - 7 * q)} ${round(cupTop + 10 * q)} L ${round(x - 5 * q)} ${round(cupTop + 120 * q)} L ${round(x + 5 * q)} ${round(cupTop + 120 * q)} L ${round(x + 7 * q)} ${round(cupTop + 10 * q)} Z`,
    o: round(0.95 * 0.88 ** i),
  };
});
const VANISH = { x: C.x + DRIFT.x * (1 - Q ** 7), y: C.y + DRIFT.y * (1 - Q ** 7) };
const LIGHT = onPage(VANISH);

/* ── The stream of its beauty, and the fish ────────────────────────────── */

const STREAM = { r: 112, half: 13 };
/** A shoal swimming round the face, against the clock. */
const FISH = Array.from({ length: 16 }, (_, i) => {
  const deg = i * 22.5 + 8 + (hash(i, 661) - 0.5) * 10;
  const r = STREAM.r + (hash(i, 662) - 0.5) * 9;
  const a = (deg * Math.PI) / 180;
  return {
    x: round(C.x + r * Math.cos(a)),
    y: round(C.y - r * Math.sin(a)),
    rot: round(-deg - 90 + (hash(i, 663) - 0.5) * 14),
    s: round(0.44 + hash(i, 664) * 0.1),
    group: i % 3,
  };
});

/* ── The earth, and her feet on every side of it ───────────────────────── */

const BUD_TIP = onPage({ x: C.x, y: MIRROR.stemFoot + 32 });
/** The earth lies ten fingers' breadth below the mirror's foot. */
const FINGER = 2.4;
const EARTH = { x: C.x, y: round(BUD_TIP.y + 10 * FINGER), rx: 150, ry: 32 };
/** The earth as the purāṇas map it: a round island at the centre, then sea and island by turns. */
const RINGS = [
  { f: 1, fill: "var(--art-hair)", o: 0.22 },
  { f: 0.86, fill: "var(--leaf)", o: 0.34 },
  { f: 0.72, fill: "var(--art-hair)", o: 0.24 },
  { f: 0.58, fill: "var(--leaf)", o: 0.36 },
  { f: 0.44, fill: "var(--art-hair)", o: 0.26 },
  { f: 0.3, fill: "var(--art-saffron)", o: 0.6 },
];
const RING = { rx: 194, ry: 44 };
/** Pairs of footprints round the earth, every one facing outward. */
const FEET = Array.from({ length: 12 }, (_, i) => {
  const deg = 15 + i * 30;
  const a = (deg * Math.PI) / 180;
  const depth = Math.sin(a);
  return {
    x: round(EARTH.x + RING.rx * Math.cos(a)),
    y: round(EARTH.y + RING.ry * depth),
    rot: deg + 90,
    s: round(0.84 + 0.14 * depth),
  };
});
const TICKS = Array.from({ length: 11 }, (_, k) => round(BUD_TIP.y + k * FINGER));

/* ── The rows of worlds ────────────────────────────────────────────────── */

const SEAM = 0.15;
type Row = { from: Pt; to: Pt; sag: number; count: number; w: number; h: number; phase: number; far?: boolean };
const ROWS: Row[] = [
  { from: { x: 14, y: 14 }, to: { x: 626, y: 18 }, sag: 34, count: 15, w: 10, h: 14, phase: 0.6 },
  { from: { x: 428, y: 86 }, to: { x: 650, y: 74 }, sag: 40, count: 6, w: 11, h: 15, phase: 3.4 },
  { from: { x: 104, y: 206 }, to: { x: 612, y: 200 }, sag: 20, count: 16, w: 7.5, h: 10.5, phase: 2.1, far: true },
  { from: { x: 112, y: 284 }, to: { x: 596, y: 290 }, sag: 18, count: 15, w: 8.5, h: 12, phase: 4.7, far: true },
];
const sagAt = (row: Row, t: number) => ({
  x: round(row.from.x + (row.to.x - row.from.x) * t),
  y: round(row.from.y + (row.to.y - row.from.y) * t + row.sag * Math.sin(Math.PI * t)),
});
/** How far each world is open: the row opens and shuts along its length like an eye, more than once. */
const EGGS = ROWS.flatMap((row, r) =>
  Array.from({ length: row.count }, (_, i) => {
    const t = (i + 0.5) / row.count;
    const p = sagAt(row, t);
    const open = round((1 - Math.cos((2 * Math.PI * (i + row.phase)) / 6.5)) / 2);
    return { ...p, w: row.w, h: row.h, open, gap: round((row.h / 2) * open), group: (i + r) % 3, far: !!row.far, key: `${r}-${i}` };
  }),
);
const THREADS = ROWS.map((row) => {
  const pts = Array.from({ length: 41 }, (_, k) => sagAt(row, k / 40));
  return { d: `M ${pts.map((p) => `${p.x} ${p.y}`).join(" L ")}`, far: !!row.far };
});
const LICK = ["m-lick", "m-lick m-late", "m-lick m-later"];
/** The light seen between the parted shells, pointed at both ends like an opening eye. */
const almond = (w: number, gap: number) => {
  const mid = round(-gap / 2);
  const bow = round(gap * 0.75 + 1);
  return `M ${-w} ${mid} Q 0 ${mid - bow} ${w} ${mid} Q 0 ${mid + bow} ${-w} ${mid} Z`;
};

/** One world on its row: sealed and dim, or parted at the seam with light inside, or only a dashed outline. */
function World({ e, url }: { e: (typeof EGGS)[number]; url: (name: string) => string }) {
  const seam = round(e.h * SEAM);
  const shell = eggPath(0, -seam, e.w, e.h);
  if (e.open < 0.08) {
    return <path d={shell} transform={`translate(${e.x} ${e.y + seam})`} stroke="var(--gold-soft)" strokeWidth={0.8} strokeDasharray="2 2.4" strokeOpacity={0.8} />;
  }
  return (
    <g transform={`translate(${e.x} ${e.y + seam})`} opacity={round(0.55 + 0.45 * e.open)}>
      {e.open > 0.35 && <circle cy={-e.gap / 2} r={e.h * 1.5} fill={url("glow")} className={LICK[e.group]} />}
      <path d={shell} clipPath={url("cup")} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.9} />
      <path d={shell} clipPath={url("cup")} fill="var(--art-vermilion)" fillOpacity={0.35} />
      {e.open > 0.2 && <path d={almond(e.w, e.gap)} fill="var(--art-core)" className={LICK[e.group]} />}
      <g transform={`translate(0 ${-e.gap})`}>
        <path d={shell} clipPath={url("cap")} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.9} />
        <path d={shell} clipPath={url("cap")} fill="var(--art-hair)" fillOpacity={round(0.3 * (1 - e.open))} />
      </g>
      <path d={`M ${-e.w} 0 H ${e.w}`} transform={`translate(0 ${-e.gap})`} stroke="var(--gold)" strokeWidth={0.9} strokeLinecap="round" />
      {e.open > 0.6 && <path d={glint(e.w * 0.34)} transform={`translate(0 ${round(-e.gap / 2)})`} fill="var(--art-saffron)" />}
    </g>
  );
}

export function WorldsInABlink({ idPrefix = "sa66", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <WavePattern id={id("waves")} />
        <FishDefs id={id} />
        <MirrorShading m={MIRROR} id={id} />
        <MirrorFaceClip m={MIRROR} id={id} />
        <ThreadMask t={THREAD} id={id} />
        <radialGradient id={id("glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("aura")} cx={C.x} cy={C.y} r={190} gradientUnits="userSpaceOnUse">
          <stop offset="0.3" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.32 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("earth")} cx={EARTH.x} cy={EARTH.y} r={EARTH.rx} gradientUnits="userSpaceOnUse" gradientTransform={`translate(0 ${EARTH.y}) scale(1 ${EARTH.ry / EARTH.rx}) translate(0 ${-EARTH.y})`}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-stone)", stopOpacity: 0.5 }} />
        </radialGradient>
        <clipPath id={id("cap")}>
          <rect x={-20} y={-30} width={40} height={30} />
        </clipPath>
        <clipPath id={id("cup")}>
          <rect x={-20} y={0} width={40} height={30} />
        </clipPath>
        <mask id={id("window")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={830} fill="#fff" />
          <rect x={150} y={190} width={340} height={200} rx={12} fill="#000" fillOpacity={0.6} />
        </mask>
      </defs>

      {/* The rows of worlds, opening and shutting along their length */}
      <g {...part("worlds")}>
        <g mask={url("window")} opacity={0.62}>
          {THREADS.filter((t) => t.far).map((t, i) => (
            <path key={i} d={t.d} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.6} />
          ))}
          {EGGS.filter((e) => e.far).map((e) => (
            <World key={e.key} e={e} url={url} />
          ))}
        </g>
        {THREADS.filter((t) => !t.far).map((t, i) => (
          <path key={i} d={t.d} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.7} />
        ))}
        {EGGS.filter((e) => !e.far).map((e) => (
          <World key={e.key} e={e} url={url} />
        ))}
      </g>

      {/* The earth, and her feet standing on every side of it */}
      <g {...part("feet")}>
        <ellipse cx={EARTH.x} cy={EARTH.y} rx={EARTH.rx} ry={EARTH.ry} fill={url("earth")} />
        {RINGS.map((r) => (
          <ellipse key={r.f} cx={EARTH.x} cy={EARTH.y} rx={round(EARTH.rx * r.f)} ry={round(EARTH.ry * r.f)} fill={r.fill} fillOpacity={r.o} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.8} />
        ))}
        <ellipse cx={EARTH.x} cy={EARTH.y} rx={EARTH.rx} ry={EARTH.ry} stroke="var(--gold)" strokeWidth={1.2} />
        {FEET.map((f, i) => (
          <g key={i} transform={`translate(${f.x} ${f.y}) scale(1 0.55) rotate(${f.rot}) scale(${f.s})`} fill="var(--art-vermilion)">
            <g transform="translate(-8 0) scale(-1 1)">
              <Footprint edge />
            </g>
            <g transform="translate(8 0)">
              <Footprint edge />
            </g>
          </g>
        ))}
      </g>

      {/* The stream of her face's beauty, and the shoal of fish in it */}
      <g {...part("eyes")}>
        <circle cx={C.x} cy={C.y} r={190} fill={url("aura")} />
        <circle cx={C.x} cy={C.y} r={STREAM.r} stroke="var(--art-moon)" strokeWidth={STREAM.half * 2} strokeOpacity={0.4} />
        <circle cx={C.x} cy={C.y} r={STREAM.r} stroke="var(--art-saffron)" strokeWidth={STREAM.half * 2} strokeOpacity={0.12} />
        <circle cx={C.x} cy={C.y} r={STREAM.r} stroke={url("waves")} strokeWidth={STREAM.half * 2} />
        <circle cx={C.x} cy={C.y} r={STREAM.r - STREAM.half} stroke="var(--gold)" strokeWidth={1.1} />
        <circle cx={C.x} cy={C.y} r={STREAM.r + STREAM.half} stroke="var(--gold)" strokeWidth={1.1} />
        <circle cx={C.x} cy={C.y} r={STREAM.r + STREAM.half + 4} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.7} />
        {FISH.map((f, i) => (
          <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${f.rot}) scale(${f.s})`}>
            <path d={FISH_BODY} transform="translate(3 6)" fill="var(--art-crimson)" fillOpacity={0.16} />
            <g className={["m-dart", "m-dart m-late", "m-dart m-later"][f.group]}>
              <Fish url={url} />
            </g>
          </g>
        ))}
      </g>

      {/* Her face, the mirror, turned to another and holding faces past counting */}
      <g {...part("faces")}>
        <g transform={ZOOM}>
          <HandMirror m={MIRROR} url={url} />
          <g clipPath={url("face-clip")}>
            {REFLECTIONS.map((r, i) => (
              <g key={i} opacity={r.o}>
                <path d={r.stem} fill="var(--gold)" />
                <path d={r.cup} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.6} />
                <circle cx={r.x} cy={r.y} r={r.frame + 1.2} fill="var(--art-carve)" fillOpacity={0.5} />
                <circle cx={r.x} cy={r.y} r={r.frame} fill="var(--gold)" />
                {r.beads.length > 0 && (
                  <g fill="var(--gold-soft)">
                    {r.beads.map((b, k) => (
                      <circle key={k} cx={b.x} cy={b.y} r={r.bead} />
                    ))}
                  </g>
                )}
                <circle cx={r.x} cy={r.y} r={r.face + 1} fill="var(--art-carve)" />
                <circle cx={r.x} cy={r.y} r={r.face} fill="var(--art-ivory)" />
                <circle cx={r.x} cy={r.y} r={r.face} fill={url("face")} />
              </g>
            ))}
            <g stroke="var(--art-moon)" strokeLinecap="round" strokeOpacity={0.55}>
              <path d={`M ${C.x - 60} ${C.y + 48} L ${C.x + 14} ${C.y - 64}`} strokeWidth={10} />
              <path d={`M ${C.x - 36} ${C.y + 62} L ${C.x + 32} ${C.y - 44}`} strokeWidth={3.5} />
            </g>
          </g>
          <MarriageThread t={THREAD} url={url} />
        </g>
      </g>

      {/* Her light, at the far end of the reflections */}
      <g {...part("light")}>
        <circle className="m-twinkle" cx={LIGHT.x} cy={LIGHT.y} r={44} fill={url("glow")} />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={9} stroke="var(--art-core)" strokeWidth={0.9} />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={5.6} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.5} />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={3.2} fill="var(--art-core)" />
      </g>

      {/* Ten fingers' breadth between the mirror's foot and the earth */}
      <g {...part("fingers")}>
        <ellipse cx={EARTH.x} cy={EARTH.y} rx={9} ry={2.4} fill="var(--art-crimson)" fillOpacity={0.3} />
        <path d={`M ${EARTH.x} ${TICKS[0]} V ${TICKS[10]}`} stroke="var(--gold)" strokeWidth={0.5} />
        <g stroke="var(--gold)" strokeWidth={0.6}>
          {TICKS.map((y, k) => (
            <path key={k} d={`M ${EARTH.x - (k % 5 === 0 ? 3 : 1.8)} ${y} H ${EARTH.x + (k % 5 === 0 ? 3 : 1.8)}`} />
          ))}
        </g>
      </g>
    </svg>
  );
}
