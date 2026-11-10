/**
 * Shloka 72 — "Fortune, the full moon, and a goddess greedy for her lover".
 *
 * The full moon of Rākā's night stands in the crown, the half moon of Shloka 5
 * come round to the full. Under the card a river runs across the night, and
 * on its two banks a pair of cakravākas, parted till morning: she calls across
 * the water and wants nothing else. Below it her light, with moths that cannot
 * leave it, and from it golden gooseberries rain into a poor alms bowl, as
 * they did when fortune came to the house that had given away its last dried
 * one. Round the floor a protective thread of red and turmeric is tied in a
 * ring. Inside it, on the one side, a green cane springs from a heap of ash,
 * love burnt and given back; on the other two parrots touch beaks. Outside it,
 * at the knot, a demon's iron club lies broken, her arrow standing in the
 * ground beside it. Which name each part answers to is written up for readers
 * in the registry, next to this artwork's entry.
 */

import { Ash, AshDefs, Cakravaka, MoonDeer, artIds, partProps, polar, round } from "./primitives";
import type { ArtProps } from "./types";

const SWAY = ["m-sway", "m-sway m-late", "m-sway m-later"];

/* ── The full moon of Rākā's night ─────────────────────────────────────── */

const MOON = { x: 470, y: 98, r: 40 };
const MOONLIGHT = [1, 2, 3, 4].map((k) => ({ r: MOON.r + k * 24, opacity: round(0.42 - k * 0.08) }));

/* ── The river, and the pair parted across it ──────────────────────────── */

const RIVER_TOP = "M 92 448 C 180 442 260 452 340 448 C 420 444 490 450 552 446";
const RIVER_BOTTOM = "M 552 466 C 490 470 420 464 340 468 C 260 472 180 462 92 468";
const RIVER = `${RIVER_TOP} L 552 466 ${RIVER_BOTTOM.slice(RIVER_BOTTOM.indexOf("C"))} Z`;
const GLITTER = [
  { x: 456, y: 453, w: 14 },
  { x: 474, y: 459, w: 20 },
  { x: 462, y: 463, w: 10 },
  { x: 488, y: 452, w: 8 },
];
const CURRENTS = [
  { x: 130, y: 456, w: 40 },
  { x: 236, y: 462, w: 54 },
  { x: 300, y: 454, w: 30 },
  { x: 380, y: 461, w: 46 },
  { x: 540, y: 456, w: 18 },
];
const HER_BIRD = { x: 172, y: 460, k: 1.05 };
const HIS_BIRD = { x: 498, y: 458, k: 1.05 };
/** Her call going out across the water toward him, in broken arcs. */
const CALL = [0, 1, 2].map((k) => {
  const r = 10 + k * 7;
  const c = { x: HER_BIRD.x + 28, y: HER_BIRD.y - 20 };
  const a = polar(c.x, c.y, r, 40);
  const b = polar(c.x, c.y, r, -30);
  return { d: `M ${a.x} ${a.y} A ${r} ${r} 0 0 0 ${b.x} ${b.y}`, k };
});

/* ── Her light, and the moths ──────────────────────────────────────────── */

const HER = { x: 320, y: 506 };
const MOTHS = [
  { deg: 30, r: 30, s: 1 },
  { deg: 150, r: 26, s: 0.9 },
  { deg: 205, r: 34, s: 0.8 },
  { deg: 330, r: 36, s: 0.85 },
].map((m) => {
  const p = polar(HER.x, HER.y, m.r, m.deg);
  return { ...p, rot: round(-m.deg), s: m.s };
});
const MOTH_WINGS = "M 0 0 C -4 -8 -12 -9 -13 -3 C -12 1 -6 1 0 0 Z M 0 0 C 4 -8 12 -9 13 -3 C 12 1 6 1 0 0 Z";
const MOTH_HIND = "M 0 1 C -3 4 -8 6 -9 3 C -8 1 -4 0 0 1 Z M 0 1 C 3 4 8 6 9 3 C 8 1 4 0 0 1 Z";

/* ── The rain of gold into the alms bowl ───────────────────────────────── */

const BOWL = { x: 320, y: 604 };
const FALLING = [
  { x: 314, y: 528, dur: 5, delay: -1 },
  { x: 326, y: 542, dur: 6, delay: -3.2 },
  { x: 318, y: 556, dur: 5.5, delay: -2 },
  { x: 330, y: 532, dur: 7, delay: -5 },
  { x: 309, y: 566, dur: 6.5, delay: -4.4 },
];
const HEAP = [
  { x: -12, y: -14 },
  { x: -4, y: -15 },
  { x: 4, y: -15 },
  { x: 12, y: -14 },
  { x: -8, y: -20 },
  { x: 0, y: -21 },
  { x: 8, y: -20 },
  { x: -3, y: -26 },
  { x: 5, y: -26 },
];
const SPILLED = [
  { x: 296, y: 610 },
  { x: 346, y: 612 },
  { x: 352, y: 606 },
];

/* ── The thread tied in a ring ─────────────────────────────────────────── */

const RING = { cx: 320, cy: 594, rx: 156, ry: 34 };
const KNOT = { x: RING.cx, y: RING.cy + RING.ry };
const TASSELS = [
  { d: `M ${KNOT.x} ${KNOT.y} C ${KNOT.x - 4} ${KNOT.y + 8} ${KNOT.x - 10} ${KNOT.y + 14} ${KNOT.x - 12} ${KNOT.y + 22}`, c: "var(--art-vermilion)" },
  { d: `M ${KNOT.x} ${KNOT.y} C ${KNOT.x + 3} ${KNOT.y + 9} ${KNOT.x + 8} ${KNOT.y + 16} ${KNOT.x + 8} ${KNOT.y + 24}`, c: "var(--art-turmeric)" },
];

/* ── Love burnt and given back: a cane springing from ash ──────────────── */

const ASH_CLOUDS = [
  { x: 222, y: 580, r: 26 },
  { x: 242, y: 584, r: 20 },
  { x: 206, y: 586, r: 16 },
];
const ASH_FLECKS = [
  { x: 214, y: 568, r: 1.1 },
  { x: 236, y: 562, r: 0.9 },
  { x: 248, y: 574, r: 1 },
  { x: 204, y: 576, r: 0.8 },
];
const CANE = { x: 226, y: 584 };
const CANE_NODES = [0, 1, 2, 3, 4].map((k) => ({ y: CANE.y - 12 - k * 13, x: round(CANE.x + k * 0.8) }));
const CANE_LEAVES = [
  "M 227 546 C 214 536 200 534 186 540 C 200 536 214 540 227 550 Z",
  "M 229 534 C 242 520 258 516 270 520 C 256 520 242 526 229 538 Z",
  "M 230 520 C 226 504 218 494 208 490 C 218 498 224 508 228 522 Z",
  "M 230 516 C 236 500 244 492 254 490 C 246 496 238 506 232 518 Z",
];
const BEE = { x: 256, y: 500 };

/* ── Two parrots touching beaks ────────────────────────────────────────── */

const PARROTS = [
  { x: 384, y: 612, flip: false },
  { x: 418, y: 612, flip: true },
];
const PARROT_BODY = "M -4 -12 C 0 -18 8 -18 10 -12 C 12 -7 10 -1 6 3 L -16 16 L -18 13 L -2 2 C -6 -1 -7 -7 -4 -12 Z";
const PARROT_WING = "M -2 -8 C 2 -10 6 -6 4 0 L -12 11 C -10 4 -6 -4 -2 -8 Z";

/* ── The demon's broken club, and her arrow ────────────────────────────── */

const CLUB = { x: 470, y: 644 };
const CLUB_HEAD = "M 0 -7 C 10 -9 24 -8 30 -4 C 33 -2 33 2 30 4 C 24 8 10 9 0 7 L 2 3 L -1 0 L 2 -3 Z";
const CLUB_SPIKES = [6, 13, 20, 26].flatMap((x) => [`M ${x} -7.6 L ${x + 1.5} -12.5 L ${x + 3} -7.8`, `M ${x} 7.6 L ${x + 1.5} 12.5 L ${x + 3} 7.8`]).join(" ");
const ARROW = { x: 474, y: 646, deg: -64 };

export function FortuneAndTheFullMoon({ idPrefix = "sa72", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  const amla = (x: number, y: number, r: number, key?: number) => (
    <g key={key}>
      <circle cx={x} cy={y} r={r} fill={url("amla")} stroke="var(--gold)" strokeWidth={0.5} />
      <path
        d={`M ${x} ${y - r} C ${x - r * 0.5} ${y - r * 0.3} ${x - r * 0.5} ${y + r * 0.3} ${x} ${y + r} M ${x} ${y - r} C ${x + r * 0.5} ${y - r * 0.3} ${x + r * 0.5} ${y + r * 0.3} ${x} ${y + r}`}
        stroke="var(--gold-soft)"
        strokeWidth={0.4}
      />
    </g>
  );

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("moon")} cx={0.42} cy={0.4} r={0.65}>
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-moon)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)" }} />
        </radialGradient>
        <radialGradient id={id("moon-glow")}>
          <stop offset="0.4" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("musk")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("amla")} cx={0.38} cy={0.35} r={0.7}>
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold)" }} />
        </radialGradient>
        <linearGradient id={id("river")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
          <stop offset="0.12" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.32 }} />
          <stop offset="0.88" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.32 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("river-shade")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
          <stop offset="0.12" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.1 }} />
          <stop offset="0.88" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </linearGradient>
        <AshDefs id={id} />
      </defs>

      {/* The full moon of Rākā's night */}
      <g {...part("moon")}>
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r * 1.9} fill={url("moon-glow")} />
        {MOONLIGHT.map((m, i) => (
          <circle key={i} cx={MOON.x} cy={MOON.y} r={m.r} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={m.opacity} />
        ))}
        <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill={url("moon")} stroke="var(--gold)" strokeWidth={1} />
        <g transform={`translate(${MOON.x + 4} ${MOON.y + 6}) scale(0.62)`}>
          <MoonDeer smudge={url("musk")} />
        </g>
      </g>

      {/* The river across the night, and the pair parted on its banks */}
      <g {...part("river")}>
        <path d={RIVER} fill={url("river")} />
        <path d={RIVER} fill={url("river-shade")} />
        <path d={RIVER_TOP} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.6} />
        {CURRENTS.map((c, i) => (
          <path
            key={i}
            d={`M ${c.x - c.w / 2} ${c.y} q ${c.w / 2} -1.6 ${c.w} 0`}
            stroke="var(--art-ivory)"
            strokeWidth={0.7}
            strokeOpacity={0.55}
            strokeLinecap="round"
          />
        ))}
        {GLITTER.map((g, i) => (
          <path
            key={i}
            className={i % 2 ? "m-shimmer m-late" : "m-shimmer"}
            d={`M ${g.x - g.w / 2} ${g.y} H ${g.x + g.w / 2}`}
            stroke="var(--art-ivory)"
            strokeWidth={1.1}
            strokeLinecap="round"
          />
        ))}
      </g>
      <g {...part("cakravakas")}>
        <g transform={`translate(${HER_BIRD.x} ${HER_BIRD.y}) scale(${HER_BIRD.k})`} strokeLinejoin="round">
          <Cakravaka />
          <path d="M 23 -19 L 29 -21 L 23 -17.6 Z" fill="var(--art-hair)" />
        </g>
        {CALL.map((c) => (
          <path
            key={c.k}
            className={c.k ? "m-shimmer m-late" : "m-shimmer"}
            d={c.d}
            stroke="var(--gold)"
            strokeWidth={1}
            strokeOpacity={round(0.85 - c.k * 0.2)}
            strokeDasharray="3 3"
            strokeLinecap="round"
          />
        ))}
        <g transform={`translate(${HIS_BIRD.x} ${HIS_BIRD.y}) scale(${-HIS_BIRD.k} ${HIS_BIRD.k})`} strokeLinejoin="round">
          <Cakravaka />
        </g>
      </g>

      {/* Her light, and the moths that cannot leave it */}
      <g {...part("her-light")}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={44} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={8.4} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={4} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.8} />
      </g>
      <g {...part("moths")}>
        {MOTHS.map((m, i) => (
          <g key={i} transform={`translate(${m.x} ${m.y}) rotate(${m.rot}) scale(${m.s})`}>
            <g className={SWAY[i % 3]}>
              <path d={MOTH_HIND} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.4} />
              <path d={MOTH_WINGS} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
              <circle cx={-7} cy={-4} r={1.1} fill="var(--art-ember)" />
              <circle cx={7} cy={-4} r={1.1} fill="var(--art-ember)" />
              <ellipse cy={1} rx={1.3} ry={4} fill="var(--art-hair)" />
              <path d="M -0.6 -3 C -2 -6 -3 -7 -4 -7 M 0.6 -3 C 2 -6 3 -7 4 -7" stroke="var(--art-hair)" strokeWidth={0.4} />
            </g>
          </g>
        ))}
      </g>

      {/* A protective thread of red and turmeric, tied in a ring round the floor */}
      <g {...part("thread")}>
        <ellipse cx={RING.cx} cy={RING.cy} rx={RING.rx} ry={RING.ry} stroke="var(--art-turmeric)" strokeWidth={3.4} />
        <ellipse cx={RING.cx} cy={RING.cy} rx={RING.rx} ry={RING.ry} stroke="var(--art-vermilion)" strokeWidth={3.4} strokeDasharray="4 4" />
        {TASSELS.map((t, i) => (
          <path key={i} d={t.d} stroke={t.c} strokeWidth={2.2} strokeLinecap="round" />
        ))}
        <circle cx={KNOT.x - 12} cy={KNOT.y + 23} r={2} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.4} />
        <circle cx={KNOT.x + 8} cy={KNOT.y + 25} r={2} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.4} />
        <ellipse cx={KNOT.x} cy={KNOT.y} rx={5} ry={3.6} fill="var(--art-vermilion)" stroke="var(--art-turmeric)" strokeWidth={1.4} />
      </g>

      {/* Golden gooseberries raining from her light into a poor alms bowl */}
      <g {...part("gold")}>
        {FALLING.map((f, i) => (
          <g key={i} className="m-sink" style={{ ["--dur" as string]: `${f.dur}s`, ["--delay" as string]: `${f.delay}s` }}>
            {amla(f.x, f.y, 3.6)}
          </g>
        ))}
        <ellipse cx={BOWL.x} cy={BOWL.y + 2} rx={30} ry={4} fill="var(--art-musk)" fillOpacity={0.16} />
        <g transform={`translate(${BOWL.x} ${BOWL.y})`}>{HEAP.map((h, i) => amla(h.x, h.y, 4.4, i))}</g>
        <path
          d={`M ${BOWL.x - 24} ${BOWL.y - 12} C ${BOWL.x - 22} ${BOWL.y + 4} ${BOWL.x + 22} ${BOWL.y + 4} ${BOWL.x + 24} ${BOWL.y - 12} Z`}
          fill="var(--art-ember)"
          stroke="var(--gold)"
          strokeWidth={0.8}
        />
        <ellipse cx={BOWL.x} cy={BOWL.y - 12} rx={24} ry={3.4} stroke="var(--gold)" strokeWidth={1} />
        <path
          d={`M ${BOWL.x - 18} ${BOWL.y - 6} C ${BOWL.x - 8} ${BOWL.y - 3} ${BOWL.x + 8} ${BOWL.y - 3} ${BOWL.x + 18} ${BOWL.y - 6}`}
          stroke="var(--art-ivory)"
          strokeWidth={0.6}
          strokeOpacity={0.5}
        />
        {SPILLED.map((s, i) => amla(s.x, s.y, 3.8, i))}
      </g>

      {/* Inside the ring: a green cane springing from a heap of ash */}
      <g {...part("cane")}>
        <g transform="translate(12 24)">
          <Ash clouds={ASH_CLOUDS} flecks={ASH_FLECKS} url={url} />
          <path
            d={`M ${CANE.x - 26} ${CANE.y} C ${CANE.x - 14} ${CANE.y - 12} ${CANE.x + 14} ${CANE.y - 12} ${CANE.x + 28} ${CANE.y}`}
            fill="var(--art-musk)"
            fillOpacity={0.3}
          />
          <path d={`M ${CANE.x} ${CANE.y - 4} L ${CANE.x + 4} ${CANE.y - 76}`} stroke="var(--leaf)" strokeWidth={4.4} strokeLinecap="round" />
          <path d={`M ${CANE.x - 1} ${CANE.y - 6} L ${CANE.x + 3} ${CANE.y - 74}`} stroke="var(--art-core)" strokeWidth={0.7} strokeOpacity={0.5} />
          {CANE_NODES.map((n, i) => (
            <path key={i} d={`M ${n.x - 2.6} ${n.y} H ${n.x + 2.6}`} stroke="var(--gold)" strokeWidth={1} strokeLinecap="round" />
          ))}
          {CANE_LEAVES.map((d, i) => (
            <path key={i} d={d} fill="var(--leaf)" stroke="var(--gold-soft)" strokeWidth={0.4} />
          ))}
          <g transform={`translate(${BEE.x} ${BEE.y})`}>
            <g className="m-sway">
              <ellipse cx={-1} cy={-3} rx={3} ry={2} fill="var(--art-ivory)" fillOpacity={0.8} stroke="var(--gold-soft)" strokeWidth={0.3} />
              <ellipse cx={1} cy={-3.4} rx={2.6} ry={1.8} fill="var(--art-ivory)" fillOpacity={0.8} stroke="var(--gold-soft)" strokeWidth={0.3} />
              <ellipse rx={3.6} ry={2.2} fill="var(--art-turmeric)" stroke="var(--art-hair)" strokeWidth={0.4} />
              <path d="M -1 -2 V 2 M 1.2 -2 V 2" stroke="var(--art-hair)" strokeWidth={0.8} />
              <circle cx={-4} r={1.3} fill="var(--art-hair)" />
            </g>
          </g>
        </g>
      </g>

      {/* Inside the ring: two parrots touching beaks */}
      <g {...part("parrots")}>
        {PARROTS.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -1 : 1} 1)`}>
            <path d={PARROT_BODY} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
            <path d={PARROT_WING} fill="var(--leaf)" stroke="var(--gold-soft)" strokeWidth={0.5} />
            <path d="M -8 4 L -14 9 M -6 0 L -12 5" stroke="var(--gold-soft)" strokeWidth={0.4} />
            <circle cx={6} cy={-13} r={5.4} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.5} />
            <path
              d="M 10.4 -15 C 15 -15.4 16.4 -11 14 -8.6 C 13.4 -10 12 -10.6 10.6 -10.4 Z"
              fill="var(--art-vermilion)"
              stroke="var(--art-carve)"
              strokeWidth={0.3}
            />
            <circle cx={7.4} cy={-14.4} r={1} fill="var(--art-hair)" />
            <path d="M 1.2 -10 C 3 -7 8 -7 10.4 -9.4" stroke="var(--art-hair)" strokeWidth={0.8} />
            <path d="M 1 -11 C 3 -8.4 8 -8.4 10.2 -10.6" stroke="var(--lotus)" strokeWidth={0.6} />
            <path d="M 2 3 L 1 7 M 5 2 L 5 7" stroke="var(--gold)" strokeWidth={0.8} strokeLinecap="round" />
          </g>
        ))}
        <path
          className="m-breathe"
          transform="translate(-14 24)"
          d="M 412 566 C 413.4 563.4 416 563.4 416 566 C 416 563.4 418.6 563.4 420 566 C 420 568.6 416 570.6 416 571.4 C 416 570.6 412 568.6 412 566 Z"
          fill="var(--art-vermilion)"
          fillOpacity={0.85}
        />
      </g>

      {/* Outside the ring, at its knot: a demon's iron club broken, her arrow standing in the ground */}
      <g {...part("club")}>
        <ellipse cx={CLUB.x} cy={CLUB.y + 6} rx={46} ry={4} fill="var(--art-musk)" fillOpacity={0.16} />
        <g transform={`translate(${CLUB.x - 44} ${CLUB.y + 2}) rotate(-6)`}>
          <path d="M 0 -2.6 L 34 -3 L 36 -1 L 34 1 L 36 3 L 0 2.6 Z" fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.5} />
          <circle cx={-2} r={3.6} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.5} />
          <path d="M 8 -2.8 V 2.8 M 12 -2.8 V 2.8" stroke="var(--gold)" strokeWidth={0.8} />
        </g>
        <g transform={`translate(${CLUB.x + 8} ${CLUB.y}) rotate(14)`}>
          <path d={CLUB_SPIKES} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.4} strokeLinejoin="round" />
          <path d={CLUB_HEAD} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
          {[8, 16, 24].map((x) => (
            <circle key={x} cx={x} r={1.2} fill="var(--gold)" />
          ))}
        </g>
        <g transform={`translate(${ARROW.x} ${ARROW.y}) rotate(${ARROW.deg})`}>
          <path d="M -6 0 L 52 0" stroke="var(--gold)" strokeWidth={1.4} />
          <path d="M 40 0 L 50 -5 L 54 -5 L 46 0 L 54 5 L 50 5 Z" fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.4} />
          <path d="M 2 -2 L -4 0 L 2 2" stroke="var(--gold)" strokeWidth={0.8} />
        </g>
        <ellipse cx={ARROW.x - 2} cy={ARROW.y + 1} rx={4} ry={1.2} fill="var(--art-carve)" fillOpacity={0.4} />
      </g>
    </svg>
  );
}
