/**
 * Shloka 68 — "Vermilion in the parting of the Vedas".
 *
 * Two names, each a single picture. In the crown her feet stand as two red
 * lotuses, and under them the four Vedas bow so low that the red dust of the
 * lotuses settles in the parting of their hair as a married woman's
 * vermilion; of each Veda only the hair is drawn, a plait with a red streak
 * at its head. Below the card the whole of scripture is a pearl oyster, its
 * growth lines written over like the lines of a manuscript, shut on the one
 * pearl that is her light, which shows only along the seam. High up, the
 * star under which the poets said rain becomes pearl. Which name each part
 * answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import type { CSSProperties } from "react";

import { OpenLotus, Pearl, PlaitLobes, PlaitTip, Star, artIds, downAlong, hash, partProps, plait, polyline, round, taper, through } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

/* ── Her lotus feet, and their dust ────────────────────────────────────── */

/** A step apart, the nearer a little larger. */
const FEET = [
  { x: 382, y: 74, k: 0.74 },
  { x: 456, y: 70, k: 0.8 },
];
const FEET_MID = { x: 419, y: 72 };

/* ── The four Vedas, bowed: only their hair ────────────────────────────── */

const HEADS = [350, 396, 442, 488].map((x, i) => ({ x, y: i === 1 || i === 2 ? 120 : 116, lean: round(-(x - FEET_MID.x) * 0.11) }));
const CROWN = { rx: 20, ry: 18 };
/** The plaits fall a little inward, toward the shell. */
const VEDAS = HEADS.map((h) => {
  const d = -(h.x - FEET_MID.x) * 0.12;
  const hair = plait(
    [
      { x: h.x, y: h.y + 12 },
      { x: h.x, y: h.y + 60 },
      { x: round(h.x + d * 0.6), y: h.y + 120 },
      { x: round(h.x + d), y: h.y + 176 },
    ],
    (s, length) => 24 - 9 * (s / length),
    11,
    5,
  );
  const streak = taper(
    through(
      [
        { x: 0, y: -CROWN.ry - 1 },
        { x: 0, y: -4 },
        { x: 0, y: 10 },
      ],
      6,
    ),
    (t) => 3.8 - t * 2.8,
  );
  return { ...h, hair, streak };
});
/** The bowed head as hair only: a crown with a small peak where it meets the brow. */
const HEAD = `M ${-CROWN.rx} 6 C ${-CROWN.rx} ${round(-CROWN.ry * 0.75)} ${round(-CROWN.rx * 0.55)} ${-CROWN.ry} 0 ${-CROWN.ry} C ${round(CROWN.rx * 0.55)} ${-CROWN.ry} ${CROWN.rx} ${round(-CROWN.ry * 0.75)} ${CROWN.rx} 6 C ${round(CROWN.rx * 0.75)} 13 ${round(CROWN.rx * 0.3)} 10 0 14 C ${round(-CROWN.rx * 0.3)} 10 ${round(-CROWN.rx * 0.75)} 13 ${-CROWN.rx} 6 Z`;
/** The hair combed out and down from the parting on one side, as fine lines. */
const COMBED = [0.08, 0.24, 0.4, 0.56, 0.72, 0.88]
  .map((f) => {
    const y0 = round(-CROWN.ry + 2 + f * (CROWN.ry + 9));
    const a = -1.15 + f * 1.45;
    return `M 1.6 ${y0} Q ${round(CROWN.rx * 0.5)} ${round(y0 - 3 + f * 2)} ${round(CROWN.rx * 0.94 * Math.cos(a))} ${round(CROWN.ry * 0.94 * Math.sin(a) + 2)}`;
  })
  .join(" ");
/** A spray of jasmine tucked in where the plait begins. */
const JASMINE = [
  { x: 7, y: 12, rot: 60 },
  { x: 11, y: 9, rot: 40 },
  { x: 12, y: 14, rot: 80 },
  { x: 15, y: 11, rot: 55 },
  { x: 9, y: 16, rot: 100 },
];
/** Red dust falling from the lotuses into the partings. */
const DUST = Array.from({ length: 22 }, (_, i) => {
  const head = HEADS[i % 4];
  return {
    x: round(head.x + (hash(i, 681) - 0.5) * 16),
    y: round(82 + hash(i, 682) * 12),
    r: round(0.7 + hash(i, 683) * 0.8),
    style: { "--dur": `${round(5 + hash(i, 684) * 5)}s`, "--delay": `${round(-hash(i, 685) * 10)}s` } as CSSProperties,
  };
});

/* ── The shell of all scripture, and the pearl in it ───────────────────── */

const S = { x: 320, y: 494 };
const W = 104;
const RIBS = 11;
const lipAt = (x: number) => {
  const f = 1 - (x / W) ** 2;
  return -8 + 15 * f + 1.6 * Math.abs(Math.sin((RIBS * Math.PI * (x + W)) / (2 * W))) * Math.sqrt(Math.max(0, f));
};
const gapAt = (x: number) => 7 * (1 - (x / W) ** 2) ** 2;
const XS = Array.from({ length: 105 }, (_, k) => -W + (2 * W * k) / 104);
const pt = (x: number, y: number): Pt => ({ x: round(S.x + x), y: round(S.y + y) });
const UMBO = { x: 0, y: -92 };
const HINGE = { y: -98, ear: 30 };
/** The straight hinge, its two ears sloping down into the shell. */
const EARS = `L ${S.x - HINGE.ear - 2} ${S.y + HINGE.y + 2} Q ${S.x - HINGE.ear} ${S.y + HINGE.y} ${S.x - HINGE.ear + 3} ${S.y + HINGE.y} H ${S.x + HINGE.ear - 3} Q ${S.x + HINGE.ear} ${S.y + HINGE.y} ${S.x + HINGE.ear + 2} ${S.y + HINGE.y + 2} L ${S.x + HINGE.ear - 4} ${S.y - 84}`;
/** Fine ribs on each ear, fanning from the umbo. */
const EAR_RIBS = [0.3, 0.55, 0.8]
  .map((f) => `M ${S.x - 8} ${S.y + UMBO.y} L ${round(S.x - 8 - (HINGE.ear - 6) * f - 4)} ${round(S.y + HINGE.y + 3 + f * 6)} M ${S.x + 8} ${S.y + UMBO.y} L ${round(S.x + 8 + (HINGE.ear - 6) * f + 4)} ${round(S.y + HINGE.y + 3 + f * 6)}`)
  .join(" ");
const UPPER = `M ${S.x - W} ${S.y - 8} C ${S.x - W} ${S.y - 54} ${S.x - 66} ${S.y - 84} ${S.x - HINGE.ear + 4} ${S.y - 84} ${EARS} C ${S.x + 66} ${S.y - 84} ${S.x + W} ${S.y - 54} ${S.x + W} ${S.y - 8} ${polyline(
  [...XS].reverse().map((x) => pt(x, lipAt(x))),
).replace(/^M/, "L")} Z`;
const SEAM = `${polyline(XS.map((x) => pt(x, lipAt(x))))} ${polyline([...XS].reverse().map((x) => pt(x, lipAt(x) + gapAt(x)))).replace(/^M/, "L")} Z`;
const LOWER = `${polyline(XS.map((x) => pt(x, lipAt(x) + gapAt(x))))} ${polyline(
  [...XS].reverse().map((x) => pt(x, lipAt(x) + gapAt(x) + 3 + 10 * Math.sqrt(Math.max(0, 1 - (x / W) ** 2)))),
).replace(/^M/, "L")} Z`;
/** The shell's growth lines, each the lip it once had, written over like a line of a manuscript. */
const GROWTH = [0.3, 0.42, 0.54, 0.66, 0.78, 0.9].map((f, r) => {
  const scaled = (x: number, y: number) => pt(UMBO.x + (x - UMBO.x) * f, UMBO.y + (y - UMBO.y) * f);
  const line = XS.filter((_, k) => k % 2 === 0).map((x) => scaled(x, lipAt(x)));
  const ticks = line
    .filter((_, k) => k > 1 && k < line.length - 2 && hash(r * 100 + k, 686) > 0.22)
    .map((p) => `M ${p.x} ${p.y} V ${round(p.y + 1.6 + f * 1.8)}`)
    .join(" ");
  return { headline: polyline(line), ticks, f };
});
const RIB_LINES = Array.from({ length: RIBS - 1 }, (_, k) => {
  const x = -W + ((k + 1) * 2 * W) / RIBS;
  const end = pt(x, lipAt(x) - 1);
  return `M ${S.x + round(x * 0.22)} ${S.y + UMBO.y + 6} Q ${S.x + round(x * 0.7)} ${S.y - 40} ${end.x} ${end.y}`;
}).join(" ");
const PEARL_AT = pt(0, lipAt(0) + gapAt(0) / 2 + 1);

/** Still water under it, closer together toward the far edge. */
const WATER = Array.from({ length: 9 }, (_, k) => ({ y: round(S.y + 22 + 9 * k + 1.1 * k * k), o: round(0.62 - k * 0.05) }));

/* ── Svāti ─────────────────────────────────────────────────────────────── */

const SVATI = { x: 312, y: 26 };
const DROP = "M 0 -4.6 C 1.6 -1.6 3 0.6 3 2.2 C 3 4 1.6 5 0 5 C -1.6 5 -3 4 -3 2.2 C -3 0.6 -1.6 -1.6 0 -4.6 Z";

export function VermilionAndPearl({ idPrefix = "sa68", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-core)", stopOpacity: 0.42 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("feet")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.55 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("valve")} x1="0" y1={S.y + UMBO.y} x2="0" y2={S.y + 8} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)" }} />
          <stop offset="0.7" style={{ stopColor: "var(--art-ivory)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.85 }} />
        </linearGradient>
        <linearGradient id={id("water")} x1={S.x - 190} y1="0" x2={S.x + 190} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "var(--gold-soft)" }} />
          <stop offset="0.7" style={{ stopColor: "var(--gold-soft)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <mask id={id("window")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={830} fill="#fff" />
          <rect x={150} y={190} width={340} height={200} rx={12} fill="#000" fillOpacity={0.62} />
        </mask>
      </defs>

      {/* The shell of all scripture, shut, in still water */}
      <g {...part("shell")}>
        {WATER.map((w) => (
          <path key={w.y} d={`M ${S.x - 190} ${w.y} H ${S.x + 190}`} stroke={url("water")} strokeWidth={0.8} strokeOpacity={w.o} />
        ))}
        <ellipse cx={S.x} cy={S.y + 18} rx={W + 14} ry={9} fill="var(--art-musk)" fillOpacity={0.22} />
        <path d={LOWER} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round" />
        <path d={LOWER} fill="var(--art-musk)" fillOpacity={0.22} />
        <path d={UPPER} fill={url("valve")} stroke="var(--gold)" strokeWidth={1.3} strokeLinejoin="round" />
        <path d={RIB_LINES} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.7} />
        {GROWTH.map((g) => (
          <g key={g.f}>
            <path d={g.headline} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.85} />
            <path d={g.ticks} stroke="var(--art-musk)" strokeWidth={0.6} strokeOpacity={0.6} />
          </g>
        ))}
        <path d={EAR_RIBS} stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.7} />
        <path d={`M ${S.x - HINGE.ear + 4} ${S.y - 84} L ${S.x} ${S.y + UMBO.y} L ${S.x + HINGE.ear - 4} ${S.y - 84}`} stroke="var(--gold)" strokeWidth={0.7} strokeLinejoin="round" />
        <circle cx={S.x} cy={S.y + UMBO.y + 2} r={2.6} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.6} />
      </g>

      {/* Her light: the one pearl, seen only along the seam */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={PEARL_AT.x} cy={PEARL_AT.y} r={150} fill={url("glow")} />
        <path d={SEAM} fill="var(--art-core)" />
        <Pearl x={PEARL_AT.x} y={PEARL_AT.y} r={9} />
        <ellipse className="m-shimmer" cx={S.x} cy={WATER[2].y} rx={70} ry={5} fill="var(--art-core)" fillOpacity={0.5} />
      </g>

      {/* The four Vedas, bowed under her feet, the red dust in their partings */}
      <g {...part("partings")}>
        <g mask={url("window")}>
          {VEDAS.map((v) => (
            <g key={v.x}>
              <PlaitLobes p={v.hair} />
              {v.hair.lobes.map((l, i) => (
                <ellipse key={i} cx={l.c.x} cy={l.c.y} rx={1.3} ry={2} transform={`rotate(${round(downAlong(l.t) + l.side * 20)} ${l.c.x} ${l.c.y})`} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.3} />
              ))}
              <PlaitTip p={v.hair} />
            </g>
          ))}
        </g>
        {VEDAS.map((v, i) => (
          <g key={v.x} transform={`translate(${v.x} ${v.y}) rotate(${v.lean} 0 10)`}>
            <path d={HEAD} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.7} strokeLinejoin="round" />
            <g stroke="var(--gold-soft)" strokeWidth={0.7} strokeOpacity={0.6} strokeLinecap="round">
              <path d={COMBED} />
              <path d={COMBED} transform="scale(-1 1)" />
            </g>
            <g transform={i % 2 ? "scale(-1 1)" : undefined}>
              {JASMINE.map((j, k) => (
                <ellipse key={k} cx={j.x} cy={j.y} rx={1.5} ry={2.4} transform={`rotate(${j.rot} ${j.x} ${j.y})`} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.3} />
              ))}
            </g>
            <path d={v.streak} fill="var(--sindura)" />
          </g>
        ))}
        <g fill="var(--sindura)">
          {DUST.map((d, i) => (
            <circle key={i} className="m-sink" style={d.style} cx={d.x} cy={d.y} r={d.r} />
          ))}
        </g>
      </g>

      {/* Her feet as two red lotuses */}
      <g {...part("feet")}>
        {FEET.map((f) => (
          <circle key={f.x} className="m-shimmer" cx={f.x} cy={f.y - 10} r={round(70 * f.k)} fill={url("feet")} />
        ))}
        {FEET.map((f) => (
          <g key={f.x} transform={`translate(${f.x} ${f.y}) scale(${f.k})`}>
            <OpenLotus fill="var(--art-vermilion)" shade="var(--art-crimson)" pad={false} />
          </g>
        ))}
      </g>

      {/* Svāti, and a drop of rain falling under it */}
      <g {...part("svati")}>
        <circle cx={SVATI.x} cy={SVATI.y} r={7} fill="var(--gold-soft)" fillOpacity={0.25} />
        <Star x={SVATI.x} y={SVATI.y} s={7} className="m-twinkle" />
        <g transform={`translate(${SVATI.x} ${SVATI.y + 22})`}>
          <path className="m-sink" style={{ "--dur": "9s" } as CSSProperties} d={DROP} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.5} />
        </g>
      </g>
    </svg>
  );
}
