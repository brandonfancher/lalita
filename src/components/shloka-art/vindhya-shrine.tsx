/**
 * Shloka 75 — "Greater than everything, and living in a particular range of hills".
 *
 * Under the card the Vindhyas run across the plate: not peaks but a long
 * flat-topped wall of sandstone in level beds, forest on its lower slopes,
 * fireflies over the forest. On the highest table her shrine, her light in
 * its door, a red flag on its spire; four palm-leaf bundles, the Vedas, go
 * out from her light, and a stair climbs to her from the river at the foot,
 * the one road to her, which she built. In the right column a balance hangs
 * with the world in one pan and one point of her light in the other, and her
 * pan is the lower. On the near bank at the left the nine planets on their
 * platform, set where she sets them; at the right the stone in Kaṃsa's
 * prison, its fetter open, and the light of the girl who slipped from his
 * hands going away to the hills. Which name each part answers to is written
 * up for readers in the registry, next to this artwork's entry.
 */

import { artIds, glint, partProps, polar, round, taper, through } from "./primitives";
import type { ArtProps } from "./types";

/* ── The Vindhyas ──────────────────────────────────────────────────────── */

const SKYLINE = through(
  [
    { x: 80, y: 532 },
    { x: 112, y: 520 },
    { x: 124, y: 502 },
    { x: 132, y: 497 },
    { x: 192, y: 496 },
    { x: 200, y: 500 },
    { x: 210, y: 512 },
    { x: 226, y: 514 },
    { x: 238, y: 500 },
    { x: 248, y: 487 },
    { x: 258, y: 484 },
    { x: 384, y: 484 },
    { x: 394, y: 488 },
    { x: 404, y: 502 },
    { x: 420, y: 512 },
    { x: 436, y: 508 },
    { x: 446, y: 494 },
    { x: 456, y: 490 },
    { x: 540, y: 490 },
    { x: 550, y: 494 },
    { x: 562, y: 508 },
    { x: 590, y: 520 },
    { x: 620, y: 530 },
  ],
  10,
);
const SKY_PATH = SKYLINE.map((p, i) => `${i ? "L" : "M"} ${round(p.x)} ${round(p.y)}`).join(" ");
const RANGE = `${SKY_PATH} L 620 600 L 80 600 Z`;
const BEDS = [496, 506, 518, 530].map((y, k) => ({ y, o: round(0.6 - k * 0.1) }));
const TREES = [
  ...[128, 146, 168, 190, 214, 236, 258, 280, 362, 384, 408, 430, 452, 474, 498, 522, 546, 568].map((x, i) => ({
    x,
    y: 540 - ((i * 5) % 7),
    r: 6 + ((i * 3) % 4),
  })),
  ...[140, 178, 226, 268, 372, 420, 462, 512, 556].map((x, i) => ({ x, y: 532 - ((i * 3) % 5), r: 5 + (i % 3) })),
];
const FIREFLIES = [
  { x: 150, y: 520 },
  { x: 196, y: 512 },
  { x: 236, y: 526 },
  { x: 276, y: 516 },
  { x: 368, y: 518 },
  { x: 404, y: 526 },
  { x: 440, y: 514 },
  { x: 482, y: 522 },
  { x: 528, y: 512 },
  { x: 560, y: 528 },
  { x: 170, y: 536 },
  { x: 508, y: 538 },
];

/* ── The shrine, her light and the Vedas ───────────────────────────────── */

const SHRINE = { x: 320, y: 486 };
const SPIRE = "M -14 0 L -14 -10 C -14 -22 -8 -30 -2 -36 L 0 -38 L 2 -36 C 8 -30 14 -22 14 -10 L 14 0 Z";
const VEDAS = [
  { x: 266, y: 462, rot: 8 },
  { x: 248, y: 476, rot: 4 },
  { x: 374, y: 462, rot: -8 },
  { x: 392, y: 476, rot: -4 },
];

/* ── The stair up from the river ───────────────────────────────────────── */

const STAIR = { x: 320, top: 486, foot: 556, wTop: 6, wFoot: 18 };
const STAIR_PATH = `M ${STAIR.x - STAIR.wTop} ${STAIR.top} L ${STAIR.x + STAIR.wTop} ${STAIR.top} L ${STAIR.x + STAIR.wFoot} ${STAIR.foot} L ${STAIR.x - STAIR.wFoot} ${STAIR.foot} Z`;
const TREADS = Array.from({ length: 13 }, (_, k) => {
  const t = (k + 1) / 14;
  const y = round(STAIR.top + (STAIR.foot - STAIR.top) * t);
  const w = round(STAIR.wTop + (STAIR.wFoot - STAIR.wTop) * t);
  return `M ${STAIR.x - w} ${y} H ${STAIR.x + w}`;
}).join(" ");

/* ── The river ─────────────────────────────────────────────────────────── */

const RIVER = "M 92 556 C 200 552 300 558 400 554 C 480 551 540 556 600 554 L 600 570 C 540 572 480 567 400 570 C 300 574 200 568 92 572 Z";
const RIVER_LINES = [
  { x: 150, y: 563, w: 40 },
  { x: 250, y: 565, w: 30 },
  { x: 372, y: 562, w: 46 },
  { x: 480, y: 563, w: 34 },
];

/* ── The balance ───────────────────────────────────────────────────────── */

const PIVOT = { x: 566, y: 262 };
const BEAM_DEG = 12;
const BEAM_HALF = 48;
const LEFT_END = polar(PIVOT.x, PIVOT.y, BEAM_HALF, 180 + BEAM_DEG);
const RIGHT_END = polar(PIVOT.x, PIVOT.y, BEAM_HALF, BEAM_DEG);
const LEFT_PAN = { x: LEFT_END.x, y: round(LEFT_END.y + 58) };
const RIGHT_PAN = { x: RIGHT_END.x, y: round(RIGHT_END.y + 58) };

/* ── The nine planets ──────────────────────────────────────────────────── */

const PLATFORM = { x: 176, y: 586 };
const GRAHAS = [
  "var(--art-stone)",
  "var(--art-turmeric)",
  "var(--art-musk)",
  "var(--leaf)",
  "var(--art-vermilion)",
  "var(--art-ivory)",
  "var(--art-carve)",
  "var(--art-moon)",
  "var(--art-crimson)",
].map((fill, i) => {
  const row = Math.floor(i / 3);
  const col = i % 3;
  const k = 0.8 + row * 0.1;
  return { fill, x: round(PLATFORM.x + (col - 1) * 15 * k + (row - 1) * -3), y: round(PLATFORM.y - 8 + row * 5), r: round(3 * k) };
});

/* ── Kaṃsa's stone, and the light that got away ────────────────────────── */

const STONE = { x: 458, y: 586 };
const ESCAPE = through(
  [
    { x: 462, y: 574 },
    { x: 486, y: 556 },
    { x: 504, y: 530 },
    { x: 520, y: 496 },
    { x: 548, y: 466 },
  ],
  10,
);
const ESCAPE_PATH = taper(ESCAPE, (t) => 1 + 7 * t * (1 - t * 0.5));
const ESCAPE_GLINTS = [0.35, 0.6, 0.82].map((t, k) => ({ ...ESCAPE[Math.round(t * (ESCAPE.length - 1))], s: 2 + k * 1.2, k }));
const ESCAPE_TOP = ESCAPE[ESCAPE.length - 1];

export function VindhyaShrine({ idPrefix = "sa75", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.36" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.42 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("face")} x1={0} y1={480} x2={0} y2={600} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.34 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-ember)", stopOpacity: 0.26 }} />
          <stop offset="1" style={{ stopColor: "var(--art-ember)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("sides")} x1={80} y1={0} x2={620} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity={0} />
          <stop offset="0.1" stopColor="white" stopOpacity={1} />
          <stop offset="0.9" stopColor="white" stopOpacity={1} />
          <stop offset="1" stopColor="white" stopOpacity={0} />
        </linearGradient>
        <mask id={id("sides-mask")} maskUnits="userSpaceOnUse" x={70} y={420} width={560} height={200}>
          <rect x={70} y={420} width={560} height={200} fill={url("sides")} />
        </mask>
        <clipPath id={id("rock-clip")}>
          <path d={RANGE} />
        </clipPath>
        <linearGradient id={id("river")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
          <stop offset="0.12" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.5 }} />
          <stop offset="0.88" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("world")} cx="0.4" cy="0.38" r="0.7">
          <stop offset="0" style={{ stopColor: "var(--art-moon)" }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.8 }} />
        </radialGradient>
        <linearGradient id={id("escape")} x1={462} y1={574} x2={548} y2={466} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.8 }} />
        </linearGradient>
      </defs>

      {/* The Vindhyas: a long flat-topped wall of sandstone in level beds, forest on its slopes */}
      <g {...part("vindhyas")}>
        <g mask={`url(#${id("sides-mask")})`}>
          <path d={RANGE} fill="var(--art-stone)" fillOpacity={0.5} />
          <path d={RANGE} fill={url("face")} />
          <g clipPath={`url(#${id("rock-clip")})`}>
            {BEDS.map((b, i) => (
              <path key={i} d={`M 80 ${b.y} C 200 ${b.y - 2} 440 ${b.y + 2} 620 ${b.y}`} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={b.o} />
            ))}
          </g>
          <path d={SKY_PATH} stroke="var(--gold)" strokeWidth={1.4} />
          {TREES.map((t, i) => (
            <g key={i}>
              <circle cx={t.x} cy={t.y} r={t.r} fill="var(--leaf)" fillOpacity={0.8} stroke="var(--gold-soft)" strokeWidth={0.4} strokeOpacity={0.6} />
              <path
                d={`M ${t.x - t.r * 0.5} ${t.y - t.r * 0.3} A ${t.r * 0.6} ${t.r * 0.6} 0 0 1 ${t.x + t.r * 0.2} ${t.y - t.r * 0.6}`}
                stroke="var(--art-core)"
                strokeWidth={0.6}
                strokeOpacity={0.4}
              />
            </g>
          ))}
        </g>
      </g>

      {/* Fireflies over the forest, playing */}
      <g {...part("fireflies")}>
        {FIREFLIES.map((f, i) => (
          <g key={i} transform={`translate(${f.x} ${f.y})`}>
            <circle className={["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"][i % 3]} r={3.4} fill="var(--art-core)" fillOpacity={0.35} />
            <path
              className={["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"][i % 3]}
              d={glint(2.6)}
              fill="var(--art-turmeric)"
              stroke="var(--gold)"
              strokeWidth={0.3}
            />
          </g>
        ))}
      </g>

      {/* The river at the foot */}
      <g {...part("river")}>
        <path d={RIVER} fill={url("river")} />
        <path d="M 92 556 C 200 552 300 558 400 554 C 480 551 540 556 600 554" stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.6} />
        {RIVER_LINES.map((l, i) => (
          <path
            key={i}
            className={i % 2 ? "m-shimmer m-late" : "m-shimmer"}
            d={`M ${l.x - l.w / 2} ${l.y} q ${l.w / 2} -1.4 ${l.w} 0`}
            stroke="var(--art-ivory)"
            strokeWidth={0.8}
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* The stair from the river up to her */}
      <g {...part("stair")}>
        <path d={STAIR_PATH} fill="var(--art-ivory)" fillOpacity={0.85} stroke="var(--gold)" strokeWidth={0.7} strokeLinejoin="round" />
        <path d={TREADS} stroke="var(--gold)" strokeWidth={0.7} />
        <path
          d={`M ${STAIR.x - 30} ${STAIR.foot} H ${STAIR.x + 30} M ${STAIR.x - 34} ${STAIR.foot + 4} H ${STAIR.x + 34}`}
          stroke="var(--art-ivory)"
          strokeWidth={1.8}
          strokeOpacity={0.85}
        />
        <path d={`M ${STAIR.x - 34} ${STAIR.foot + 5.4} H ${STAIR.x + 34}`} stroke="var(--gold)" strokeWidth={0.5} />
      </g>

      {/* Her light in the door of her shrine on the highest table */}
      <g {...part("her-light")}>
        <circle className="m-breathe" cx={SHRINE.x} cy={SHRINE.y - 12} r={44} fill={url("her")} />
      </g>
      <g {...part("shrine")}>
        <g transform={`translate(${SHRINE.x} ${SHRINE.y})`}>
          <path d="M -18 0 H 18 V -3 H -18 Z" fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.6} />
          <path d={SPIRE} transform="translate(0 -3)" fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
          <path
            d="M -12 -14 C -6 -15 6 -15 12 -14 M -11 -22 C -5 -23 5 -23 11 -22 M -8 -30 C -4 -31 4 -31 8 -30"
            stroke="var(--gold-soft)"
            strokeWidth={0.6}
            transform="translate(0 -3)"
          />
          <path d="M -5 -3 V -10 A 5 5 0 0 1 5 -10 V -3 Z" fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.8} />
          <circle cy={-42} r={2.2} fill="var(--gold)" />
          <path d="M 0 -44 V -54" stroke="var(--gold)" strokeWidth={0.8} />
          <path className="m-shimmer" d="M 0 -54 L 14 -51 L 0 -47 Z" fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.4} />
        </g>
      </g>

      {/* The four Vedas going out from her light */}
      <g {...part("vedas")}>
        {VEDAS.map((v, i) => (
          <g key={i} transform={`translate(${v.x} ${v.y}) rotate(${v.rot})`}>
            <rect x={-15} y={-2.6} width={30} height={5.2} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
            <path d="M -15 -0.9 H 15 M -15 0.9 H 15" stroke="var(--art-turmeric)" strokeWidth={0.4} />
            <rect x={-16} y={-4.6} width={32} height={2.2} rx={0.6} fill="var(--art-musk)" stroke="var(--gold)" strokeWidth={0.4} />
            <rect x={-16} y={2.4} width={32} height={2.2} rx={0.6} fill="var(--art-musk)" stroke="var(--gold)" strokeWidth={0.4} />
            <path d="M -6 -5 V 5 M 6 -5 V 5" stroke="var(--art-vermilion)" strokeWidth={1} />
          </g>
        ))}
      </g>

      {/* The balance in the right column: the world in one pan, one point of her light in the other */}
      <g {...part("balance")}>
        <path d={`M ${PIVOT.x} 186 V ${PIVOT.y - 6}`} stroke="var(--gold)" strokeWidth={0.8} />
        <path d={`M ${PIVOT.x - 4} ${PIVOT.y - 8} L ${PIVOT.x} ${PIVOT.y - 16} L ${PIVOT.x + 4} ${PIVOT.y - 8} Z`} fill="var(--gold)" />
        <path d={`M ${LEFT_END.x} ${LEFT_END.y} L ${RIGHT_END.x} ${RIGHT_END.y}`} stroke="var(--gold)" strokeWidth={2.6} strokeLinecap="round" />
        <circle cx={PIVOT.x} cy={PIVOT.y} r={3} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.6} />
        <path d={`M ${PIVOT.x} ${PIVOT.y} V ${PIVOT.y + 16}`} stroke="var(--gold)" strokeWidth={1.4} />
        {[LEFT_END, RIGHT_END].map((e, i) => {
          const pan = i ? RIGHT_PAN : LEFT_PAN;
          return (
            <g key={i}>
              <path
                d={`M ${e.x} ${e.y} L ${pan.x - 16} ${pan.y} M ${e.x} ${e.y} L ${pan.x + 16} ${pan.y} M ${e.x} ${e.y} L ${pan.x} ${pan.y + 2}`}
                stroke="var(--gold-soft)"
                strokeWidth={0.6}
              />
              <path
                d={`M ${pan.x - 18} ${pan.y} C ${pan.x - 14} ${pan.y + 9} ${pan.x + 14} ${pan.y + 9} ${pan.x + 18} ${pan.y} Z`}
                fill="var(--art-turmeric)"
                stroke="var(--gold)"
                strokeWidth={0.8}
              />
            </g>
          );
        })}
        <circle cx={RIGHT_PAN.x} cy={RIGHT_PAN.y - 13} r={13} fill={url("world")} stroke="var(--gold)" strokeWidth={0.8} />
        <ellipse cx={RIGHT_PAN.x} cy={RIGHT_PAN.y - 13} rx={13} ry={4} stroke="var(--gold-soft)" strokeWidth={0.6} />
        <ellipse cx={RIGHT_PAN.x} cy={RIGHT_PAN.y - 13} rx={13} ry={9} stroke="var(--gold-soft)" strokeWidth={0.4} strokeOpacity={0.6} />
        {[
          { x: -5, y: -6 },
          { x: 4, y: -3 },
          { x: -2, y: 5 },
          { x: 6, y: 6 },
        ].map((s, i) => (
          <circle key={i} cx={RIGHT_PAN.x + s.x} cy={RIGHT_PAN.y - 13 + s.y} r={0.9} fill="var(--art-core)" />
        ))}
        <circle className="m-breathe" cx={LEFT_PAN.x} cy={LEFT_PAN.y - 5} r={12} fill={url("her")} />
        <circle cx={LEFT_PAN.x} cy={LEFT_PAN.y - 4} r={2.6} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.7} />
      </g>

      {/* The nine planets on their platform, set where she sets them */}
      <g {...part("grahas")}>
        <path
          d={`M ${PLATFORM.x - 30} ${PLATFORM.y + 4} L ${PLATFORM.x + 26} ${PLATFORM.y + 4} L ${PLATFORM.x + 22} ${PLATFORM.y - 13} L ${PLATFORM.x - 22} ${PLATFORM.y - 13} Z`}
          fill="var(--art-ivory)"
          fillOpacity={0.7}
          stroke="var(--gold)"
          strokeWidth={0.8}
        />
        <path
          d={`M ${PLATFORM.x - 30} ${PLATFORM.y + 4} V ${PLATFORM.y + 9} H ${PLATFORM.x + 26} V ${PLATFORM.y + 4}`}
          fill="var(--art-musk)"
          fillOpacity={0.4}
          stroke="var(--gold)"
          strokeWidth={0.6}
        />
        {GRAHAS.map((g, i) => (
          <g key={i}>
            <ellipse cx={g.x} cy={g.y + g.r * 0.6} rx={g.r + 0.6} ry={1} fill="var(--art-musk)" fillOpacity={0.3} />
            <circle cx={g.x} cy={g.y} r={g.r} fill={g.fill} stroke="var(--gold)" strokeWidth={0.5} />
          </g>
        ))}
      </g>

      {/* Kaṃsa's stone with its fetter open, and the light of the girl who slipped from his hands */}
      <g {...part("escape")}>
        <path d={ESCAPE_PATH} fill={url("escape")} fillOpacity={0.5} />
        {ESCAPE_GLINTS.map((g) => (
          <path
            key={g.k}
            className={["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"][g.k]}
            transform={`translate(${round(g.x)} ${round(g.y)})`}
            d={glint(g.s)}
            fill="var(--art-core)"
          />
        ))}
        <g transform={`translate(${ESCAPE_TOP.x} ${ESCAPE_TOP.y})`}>
          <circle className="m-breathe" r={9} fill={url("her")} />
          <path className="m-twinkle" d={glint(6)} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.4} />
        </g>
        <ellipse cx={STONE.x} cy={STONE.y + 8} rx={28} ry={3.4} fill="var(--art-musk)" fillOpacity={0.2} />
        <path
          d={`M ${STONE.x - 24} ${STONE.y + 8} L ${STONE.x - 20} ${STONE.y - 6} L ${STONE.x + 16} ${STONE.y - 10} L ${STONE.x + 24} ${STONE.y + 6} Z`}
          fill="var(--art-stone)"
          stroke="var(--gold)"
          strokeWidth={0.6}
          strokeLinejoin="round"
        />
        <path d={`M ${STONE.x - 20} ${STONE.y - 6} L ${STONE.x + 16} ${STONE.y - 10}`} stroke="var(--art-moon)" strokeWidth={0.8} strokeOpacity={0.4} />
        <path
          d={`M ${STONE.x + 2} ${STONE.y + 2} C ${STONE.x + 8} ${STONE.y + 12} ${STONE.x + 22} ${STONE.y + 12} ${STONE.x + 34} ${STONE.y + 10}`}
          stroke="var(--art-hair)"
          strokeWidth={1.4}
          strokeDasharray="3 1.4"
        />
        <path
          d={`M ${STONE.x + 36} ${STONE.y + 6} A 6 5 0 1 1 ${STONE.x + 40} ${STONE.y + 15}`}
          stroke="var(--art-hair)"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
        <path d={`M ${STONE.x + 36} ${STONE.y + 6} A 6 5 0 1 1 ${STONE.x + 40} ${STONE.y + 15}`} stroke="var(--gold)" strokeWidth={0.4} />
      </g>
    </svg>
  );
}
