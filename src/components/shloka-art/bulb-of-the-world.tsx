/**
 * Shloka 73 — "Desire drawn as a diagram, and a bulb under the soil".
 *
 * Her light under the card holds four points and nothing else: a point
 * above, two below it, and a half-digit under those, the kāmakalā given as
 * points only. From two dear things at either side, a heap of coins and a
 * child's anklet, fine threads run to her: whatever is dear is dear for her.
 * Below, the ground is cut away to show what is under it, a bulb with its
 * roots, and from it the shoot that comes up into the world. On the ground
 * at the left the pots of sprouting grain sown at a beginning; before her a
 * spray of kadamba laid as an offering, and the bough it came from leaning
 * into the crown. At the right the ground gives way to a sea, and a drop
 * from her light falls into it. Which name each part answers to is written
 * up for readers in the registry, next to this artwork's entry.
 */

import { KadambaBough, KadambaHead, KadambaLeaf, artIds, hash, kadambaHead, kadambaLeaf, partProps, round } from "./primitives";
import type { ArtProps } from "./types";

/* ── Her light, and the four points ────────────────────────────────────── */

/** This title wraps, so the card sits at y ≈ 225–438 and everything under it is drawn this much lower. */
const LOWER = "translate(0 30)";

const HER = { x: 320, y: 454 };
const POINTS = {
  sun: { x: 320, y: 418 },
  fire: { x: 296, y: 452 },
  moon: { x: 344, y: 452 },
  half: { x: 320, y: 488 },
};

/* ── The dear things, and their threads ────────────────────────────────── */

const COINS = { x: 178, y: 486 };
const COIN_STACK = [0, 1, 2, 3, 4].map((k) => ({ x: COINS.x + ((k * 3) % 5) - 2, y: COINS.y - k * 3.4 }));
const LOOSE_COINS = [
  { x: COINS.x - 16, y: COINS.y + 2, deg: -12 },
  { x: COINS.x + 15, y: COINS.y + 3, deg: 10 },
];
const ANKLET = { x: 464, y: 482 };
const ANKLET_BELLS = [200, 240, 280, 320, 340].map((deg) => {
  const a = (deg * Math.PI) / 180;
  return { x: round(ANKLET.x + 15 * Math.cos(a)), y: round(ANKLET.y + 6 * Math.sin(a) + 7) };
});
const THREADS = [
  { d: `M ${COINS.x + 6} ${COINS.y - 20} C ${COINS.x + 40} ${COINS.y - 70} ${HER.x - 80} ${HER.y - 40} ${HER.x - 18} ${HER.y - 6}`, delay: "" },
  { d: `M ${ANKLET.x - 4} ${ANKLET.y - 10} C ${ANKLET.x - 36} ${ANKLET.y - 60} ${HER.x + 80} ${HER.y - 40} ${HER.x + 18} ${HER.y - 6}`, delay: "m-late" },
];

/* ── The ground cut away, the bulb and the shoot ───────────────────────── */

const GROUND = 540;
const SHORE = "M 104 540 L 404 540 C 418 540 424 546 436 552";
const SOIL = "M 104 540 L 404 540 C 418 540 424 546 436 552 C 448 560 450 620 446 700 L 104 700 Z";
const STRATA = [558, 578, 604, 632].map((y, k) => ({ y, w: round(440 - k * 6), o: round(0.5 - k * 0.08) }));
const PEBBLES = [
  { x: 152, y: 566, r: 3.4 },
  { x: 214, y: 592, r: 2.6 },
  { x: 392, y: 584, r: 3 },
  { x: 418, y: 618, r: 2.4 },
  { x: 240, y: 628, r: 3.2 },
  { x: 168, y: 614, r: 2.2 },
];
const BULB = { x: 320, y: 598 };
const BULB_BODY = "M 0 -26 C 4 -18 14 -14 20 -6 C 26 2 24 12 14 16 C 6 19 -6 19 -14 16 C -24 12 -26 2 -20 -6 C -14 -14 -4 -18 0 -26 Z";
const BULB_SKINS = ["M 0 -24 C -8 -14 -14 -4 -12 15", "M 0 -24 C -2 -12 -4 2 -3 18", "M 0 -24 C 6 -12 10 0 8 17", "M 0 -24 C 10 -14 16 -2 14 15"];
const ROOTS = [
  "M -8 17 C -14 26 -24 30 -32 40",
  "M -3 18 C -6 28 -4 38 -10 50",
  "M 2 18 C 4 30 10 36 8 48",
  "M 7 17 C 14 26 22 30 30 38",
  "M 11 16 C 22 22 30 22 38 28",
  "M -12 15 C -22 20 -30 20 -38 24",
];
const SHOOT = `M ${BULB.x} ${BULB.y - 26} C ${BULB.x + 2} ${BULB.y - 44} ${BULB.x - 3} ${GROUND - 10} ${BULB.x} ${GROUND - 34}`;
const SHOOT_LEAVES = [
  `M ${BULB.x} ${GROUND - 20} C ${BULB.x - 8} ${GROUND - 30} ${BULB.x - 20} ${GROUND - 32} ${BULB.x - 26} ${GROUND - 28} C ${BULB.x - 18} ${GROUND - 22} ${BULB.x - 8} ${GROUND - 20} ${BULB.x} ${GROUND - 20} Z`,
  `M ${BULB.x} ${GROUND - 28} C ${BULB.x + 8} ${GROUND - 40} ${BULB.x + 20} ${GROUND - 42} ${BULB.x + 26} ${GROUND - 38} C ${BULB.x + 18} ${GROUND - 31} ${BULB.x + 8} ${GROUND - 28} ${BULB.x} ${GROUND - 28} Z`,
];

/* ── The pots of sprouting grain ───────────────────────────────────────── */

const POTS = [
  { x: 168, s: 0.9 },
  { x: 200, s: 1.05 },
  { x: 232, s: 0.9 },
];
const POT_BODY = "M -9 -18 L 9 -18 L 8 -15 C 14 -12 15 -4 11 0 L -11 0 C -15 -4 -14 -12 -8 -15 Z";
const SPROUTS = [-7, -5, -3, -1, 1, 3, 5, 7].map((x, k) => {
  const h = 16 + ((k * 7) % 5) * 2.4;
  const lean = x * 0.9;
  return `M ${x * 0.7} -18 Q ${x * 0.8} ${-18 - h * 0.6} ${round(x * 0.7 + lean)} ${round(-18 - h)}`;
});

/* ── Kadamba: the bough in the crown, and the spray laid before her ────── */

const OFFERING = { x: 274, y: 536 };
const OFFERING_LEAVES = [
  { deg: 186, l: 28, w: 8 },
  { deg: -10, l: 24, w: 7 },
].map((l) => ({ ...kadambaLeaf(l.l, l.w), at: `translate(${OFFERING.x} ${OFFERING.y}) rotate(${l.deg})` }));
const OFFERING_HEADS = [kadambaHead({ x: OFFERING.x - 6, y: OFFERING.y - 6, r: 6.4 }, 4), kadambaHead({ x: OFFERING.x + 8, y: OFFERING.y - 5, r: 5.6 }, 5)];

/* ── The sea, and the drop that falls into it ──────────────────────────── */

const SEA = "M 430 548 C 470 544 560 544 680 546 L 680 720 L 446 720 C 450 620 446 572 430 548 Z";
const RIPPLES = [556, 564, 574, 586, 600, 616].flatMap((y, k) => {
  const out: string[] = [];
  let x = 446 + k * 1.5 + hash(k, 1) * 10;
  for (let j = 0; x < 636; j++) {
    const len = 8 + k * 1.4 + hash(k, j + 2) * 8;
    out.push(`M ${round(x)} ${y} q ${round(len / 2)} ${round(-1.4 - k * 0.3)} ${round(len)} 0`);
    x += len + 6 + hash(j, k + 5) * 10;
  }
  return out;
});
const DROP = { x: 480, y: 530 };
const LANDING = { x: 480, y: 552 };

export function BulbOfTheWorld({ idPrefix = "sa73", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.4 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("kadamba")} cx="0.38" cy="0.34" r="0.72">
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
        <radialGradient id={id("bulb")} cx="0.4" cy="0.38" r="0.7">
          <stop offset="0" style={{ stopColor: "var(--art-ivory)" }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-ember)" }} />
        </radialGradient>
        <linearGradient id={id("soil")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--art-ember)", stopOpacity: 0.24 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("soil-fade")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" stopColor="white" stopOpacity={0} />
          <stop offset="0.1" stopColor="white" stopOpacity={1} />
        </linearGradient>
        <mask id={id("soil-mask")} maskUnits="userSpaceOnUse" x={100} y={530} width={360} height={180}>
          <rect x={100} y={530} width={360} height={180} fill={url("soil-fade")} />
        </mask>
        <linearGradient id={id("sea")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.6 }} />
          <stop offset="0.5" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("sea-fade")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0.7" stopColor="white" stopOpacity={1} />
          <stop offset="1" stopColor="white" stopOpacity={0} />
        </linearGradient>
        <mask id={id("sea-mask")} maskUnits="userSpaceOnUse" x={420} y={540} width={220} height={190}>
          <rect x={420} y={540} width={220} height={190} fill={url("sea-fade")} />
        </mask>
      </defs>

      {/* The kadamba bough leaning into the crown */}
      <g {...part("kadamba")}>
        <g transform="translate(640 0) scale(1.35) translate(-640 0)">
          <KadambaBough fill={url("kadamba")} />
        </g>
        <g transform={LOWER}>
          {OFFERING_LEAVES.map((l, i) => (
            <g key={i} transform={l.at}>
              <KadambaLeaf {...l} />
            </g>
          ))}
          {OFFERING_HEADS.map((h, i) => (
            <KadambaHead key={i} head={h} fill={url("kadamba")} />
          ))}
        </g>
      </g>

      {/* The sea, and the drop from her light falling into it */}
      <g {...part("sea")} transform={LOWER}>
        <g mask={`url(#${id("sea-mask")})`}>
          <path d={SEA} fill={url("sea")} />
          <path d="M 430 548 C 470 544 560 544 680 546" stroke="var(--gold-soft)" strokeWidth={0.8} />
          <path d={RIPPLES.join(" ")} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.7} strokeLinecap="round" />
        </g>
        <g className="m-sink" style={{ ["--dur" as string]: "6s" }}>
          <path
            d={`M ${DROP.x} ${DROP.y - 7} C ${DROP.x + 3} ${DROP.y - 2} ${DROP.x + 4} ${DROP.y + 1} ${DROP.x + 4} ${DROP.y + 3} C ${DROP.x + 4} ${DROP.y + 6} ${DROP.x - 4} ${DROP.y + 6} ${DROP.x - 4} ${DROP.y + 3} C ${DROP.x - 4} ${DROP.y + 1} ${DROP.x - 3} ${DROP.y - 2} ${DROP.x} ${DROP.y - 7} Z`}
            fill="var(--art-moon)"
            stroke="var(--gold)"
            strokeWidth={0.6}
          />
        </g>
        {[8, 15, 22].map((r, i) => (
          <ellipse
            key={r}
            className={i ? "m-shimmer m-late" : "m-shimmer"}
            cx={LANDING.x}
            cy={LANDING.y}
            rx={r}
            ry={round(r * 0.22)}
            stroke="var(--gold)"
            strokeWidth={0.7}
            strokeOpacity={round(0.8 - i * 0.2)}
          />
        ))}
      </g>

      {/* The ground cut away, the bulb under it and its roots */}
      <g {...part("bulb")} transform={LOWER}>
        <g mask={`url(#${id("soil-mask")})`}>
          <path d={SOIL} fill={url("soil")} />
          {STRATA.map((s, i) => (
            <path
              key={i}
              d={`M 104 ${s.y} C 200 ${s.y - 3} 320 ${s.y + 3} ${s.w} ${s.y - 1}`}
              stroke="var(--art-carve)"
              strokeWidth={0.6}
              strokeOpacity={s.o}
              strokeDasharray="10 5"
            />
          ))}
          {PEBBLES.map((p, i) => (
            <ellipse
              key={i}
              cx={p.x}
              cy={p.y}
              rx={p.r}
              ry={round(p.r * 0.7)}
              fill="var(--art-musk)"
              fillOpacity={0.4}
              stroke="var(--gold-soft)"
              strokeWidth={0.4}
            />
          ))}
          <path d={SHORE} stroke="var(--gold)" strokeWidth={1} />
        </g>
        <g transform={`translate(${BULB.x} ${BULB.y})`}>
          <path d={ROOTS.join(" ")} stroke="var(--art-ivory)" strokeWidth={0.9} strokeLinecap="round" />
          <path d={ROOTS.join(" ")} stroke="var(--art-hair)" strokeWidth={0.4} strokeOpacity={0.5} strokeLinecap="round" />
          <path d={BULB_BODY} fill={url("bulb")} stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
          <path d={BULB_SKINS.join(" ")} stroke="var(--art-carve)" strokeWidth={0.5} strokeOpacity={0.55} />
          <path d="M -14 -2 C -12 -8 -8 -12 -4 -14" stroke="var(--art-core)" strokeWidth={1.2} strokeOpacity={0.8} strokeLinecap="round" />
        </g>
      </g>

      {/* The shoot it puts up into the world */}
      <g {...part("shoot")} transform={LOWER}>
        <path d={SHOOT} stroke="var(--leaf)" strokeWidth={2.6} strokeLinecap="round" />
        <path d={SHOOT} stroke="var(--art-core)" strokeWidth={0.5} strokeOpacity={0.5} />
        {SHOOT_LEAVES.map((d, i) => (
          <path key={i} d={d} fill="var(--leaf)" stroke="var(--gold-soft)" strokeWidth={0.5} />
        ))}
      </g>

      {/* Pots of sprouting grain, sown at a beginning */}
      <g {...part("sprouts")} transform={LOWER}>
        {POTS.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${GROUND}) scale(${p.s})`}>
            <path d={SPROUTS.join(" ")} stroke="var(--leaf)" strokeWidth={1.1} strokeLinecap="round" />
            <path d={SPROUTS.filter((_, k) => k % 2).join(" ")} stroke="var(--art-turmeric)" strokeWidth={0.6} strokeOpacity={0.8} strokeLinecap="round" />
            <path d={POT_BODY} fill="var(--art-ember)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
            <path d="M -12.6 -9 C -6 -7 6 -7 12.6 -9" stroke="var(--art-turmeric)" strokeWidth={2} />
            <circle cy={-9} r={1.6} fill="var(--art-vermilion)" />
            <circle cx={-6} cy={-8.4} r={1} fill="var(--art-vermilion)" />
            <circle cx={6} cy={-8.4} r={1} fill="var(--art-vermilion)" />
            <ellipse cy={-18} rx={9} ry={1.6} fill="var(--art-musk)" fillOpacity={0.5} stroke="var(--gold)" strokeWidth={0.5} />
          </g>
        ))}
      </g>

      {/* Two dear things, and the threads from them to her */}
      <g {...part("dear")} transform={LOWER}>
        {THREADS.map((t, i) => (
          <path key={i} className={`m-shimmer ${t.delay}`} d={t.d} stroke="var(--gold)" strokeWidth={0.8} strokeDasharray="2 3" strokeLinecap="round" />
        ))}
        <ellipse cx={COINS.x} cy={COINS.y + 4} rx={26} ry={3.4} fill="var(--art-musk)" fillOpacity={0.18} />
        {LOOSE_COINS.map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.deg})`}>
            <ellipse rx={6} ry={2.4} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.6} />
            <ellipse rx={3} ry={1.1} stroke="var(--gold)" strokeWidth={0.4} />
          </g>
        ))}
        {COIN_STACK.map((c, i) => (
          <g key={i}>
            <path d={`M ${c.x - 7} ${c.y} V ${c.y + 2} A 7 2.6 0 0 0 ${c.x + 7} ${c.y + 2} V ${c.y}`} fill="var(--gold)" />
            <ellipse cx={c.x} cy={c.y} rx={7} ry={2.6} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.6} />
          </g>
        ))}
        <ellipse cx={COIN_STACK[4].x} cy={COIN_STACK[4].y} rx={3.4} ry={1.2} stroke="var(--gold)" strokeWidth={0.5} />
        <ellipse cx={ANKLET.x} cy={ANKLET.y + 6} rx={22} ry={3.4} fill="var(--art-musk)" fillOpacity={0.18} />
        <ellipse cx={ANKLET.x} cy={ANKLET.y} rx={15} ry={6} stroke="var(--art-hair)" strokeOpacity={0.4} strokeWidth={3} />
        <ellipse cx={ANKLET.x} cy={ANKLET.y} rx={15} ry={6} stroke="var(--art-moon)" strokeWidth={2.2} />
        <ellipse cx={ANKLET.x} cy={ANKLET.y} rx={15} ry={6} stroke="var(--gold)" strokeWidth={0.5} strokeDasharray="1.4 2" />
        {ANKLET_BELLS.map((b, i) => (
          <g key={i}>
            <circle cx={b.x} cy={b.y} r={2.2} fill="var(--art-moon)" stroke="var(--art-hair)" strokeWidth={0.5} />
            <path d={`M ${b.x - 1} ${b.y + 0.8} H ${b.x + 1}`} stroke="var(--art-hair)" strokeWidth={0.5} />
          </g>
        ))}
      </g>

      {/* Her light, nothing in it but the four points */}
      <g {...part("her-light")} transform={LOWER}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={56} fill={url("her")} />
      </g>
      <g {...part("points")} transform={LOWER}>
        <circle cx={POINTS.sun.x} cy={POINTS.sun.y} r={3.8} fill="var(--art-core)" stroke="var(--art-saffron)" strokeWidth={1.2} />
        <circle cx={POINTS.fire.x} cy={POINTS.fire.y} r={3.6} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.6} />
        <circle cx={POINTS.moon.x} cy={POINTS.moon.y} r={3.6} fill="var(--art-moon)" stroke="var(--art-hair)" strokeWidth={0.6} strokeOpacity={0.6} />
        <path
          d={`M ${POINTS.half.x - 4.4} ${POINTS.half.y - 3} L ${POINTS.half.x + 4.4} ${POINTS.half.y - 3} L ${POINTS.half.x} ${POINTS.half.y + 4.4} Z`}
          fill="var(--art-vermilion)"
          stroke="var(--gold)"
          strokeWidth={0.6}
          strokeLinejoin="round"
        />
        {Object.values(POINTS).map((p, i) => (
          <circle
            key={i}
            className={["m-twinkle", "m-twinkle m-late", "m-twinkle m-later", "m-twinkle"][i]}
            cx={p.x}
            cy={p.y}
            r={7}
            stroke="var(--gold)"
            strokeWidth={0.4}
            strokeOpacity={0.6}
          />
        ))}
      </g>
    </svg>
  );
}
