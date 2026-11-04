/**
 * Shloka 27 — "The boar-wheel chariot and the wall of fire".
 *
 * The verse pulls back from the chariots to the shape of the field: the
 * commander goes in front, and a rampart of fire rings the whole army. So the
 * camp is seen from outside, low, as a besieger would see it. Jvālāmālinī's
 * wall of flame runs round it, its far side a horizon of fire above the card,
 * its near side across the foot, with the one gap the purāṇa leaves open at the
 * south, facing Śūnyaka. Through the gap Daṇḍanāthā's Kiricakra goes out first,
 * five crimson steps under her rod and a boar banner, the road ahead of it
 * clear, with the lion Caṇḍocchaṇḍa before it. Behind, inside the ring, her
 * own chariot of the last verse is moving, its tracks behind it. Which name
 * each part answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import {
  Lion,
  RathaDefs,
  RathaTiers,
  RathaTriangles,
  RathaWeapons,
  artIds,
  ChariotWheel,
  partProps,
  round,
  sriCakraRatha,
  tongue,
} from "./primitives";
import type { ArtProps } from "./types";

/* ── The rampart of fire ───────────────────────────────────────────────── */

const RING = { cx: 320, cy: 440, rx: 330, ry: 240 };
/** The one gap, at the south, toward the front and a little right. */
const GAP = { deg: 80, half: 11 };

type Flame = { x: number; y: number; h: number; w: number; lean: number; depth: number; k: number };

const FLAMES: Flame[] = Array.from({ length: 68 }, (_, k) => {
  const deg = (k * 360) / 68 + 2;
  return { deg, k };
})
  .filter(({ deg }) => Math.abs(((deg - GAP.deg + 540) % 360) - 180) > GAP.half)
  .map(({ deg, k }) => {
    const t = (deg * Math.PI) / 180;
    const depth = (Math.sin(t) + 1) / 2;
    return {
      x: round(RING.cx + RING.rx * Math.cos(t)),
      y: round(RING.cy + RING.ry * Math.sin(t)),
      h: round(54 + 46 * depth + ((k * 7) % 5) * 4),
      w: round(20 + 20 * depth),
      lean: ((k * 5) % 7) - 3,
      depth,
      k,
    };
  })
  .sort((a, b) => a.y - b.y);

const BREATHE = ["m-breathe", "m-breathe m-late", "m-breathe m-later"];

/* ── Her chariot, inside ───────────────────────────────────────────────── */

const RATHA = sriCakraRatha(262, 500, 0.52);
const TRACKS = RATHA.wheels.flatMap((w) =>
  [-2, 2].map((o) => `M ${w.x + o} ${w.y + w.r - 1} C ${w.x + o - 20} ${w.y + 40} ${w.x + o - 70} ${w.y + 50} ${w.x + o - 130} ${w.y + 58}`),
);

/* ── The Kiricakra ─────────────────────────────────────────────────────── */

const KX = 376;
const KY = 664;
const K = 0.5;
const K_STEPS = [52, 44, 37, 30, 23].map((half, i) => ({ half, z0: i * 11, z1: (i + 1) * 11 }));
const K_TOP = KY - 55;
const ROD_TOP = K_TOP - 112;
const BANNER = `M ${KX} ${ROD_TOP + 6} C ${KX + 34} ${ROD_TOP} ${KX + 66} ${ROD_TOP + 12} ${KX + 104} ${ROD_TOP + 6} L ${KX + 90} ${ROD_TOP + 22} L ${KX + 106} ${ROD_TOP + 40} C ${KX + 68} ${ROD_TOP + 46} ${KX + 34} ${ROD_TOP + 32} ${KX} ${ROD_TOP + 42} Z`;
/** Ahead of it, the road it clears, out through the gap toward Śūnyaka. */
const ROAD = [-1, 1].map((side) => `M ${KX + side * 46} ${KY + 30} C ${KX + side * 52} ${KY + 70} ${KX + side * 70 + 40} ${KY + 120} ${KX + side * 96 + 70} ${KY + 168}`);

/** A boar (kiri, varāha) facing right, feet on the origin's line, about 76 long. */
const BOAR =
  "M -31 -9 C -37 -15 -37 -27 -29 -31 C -19 -37 -3 -41 9 -41 C 18 -41 24 -35 28 -29 L 37 -22 C 39 -20 39 -17 37.5 -15.5 C 33 -14.5 29 -14.5 26 -15 C 22 -14 18 -12 16 -9 C 10 -7 -4 -7 -14 -8 C -20 -8 -26 -8 -31 -9 Z";
const BOAR_LEGS = "M 11 -10 L 11 0 M 16.5 -10 L 17 0 M -24 -10 L -25 0 M -17 -9 L -17 0";
const BOAR_BRISTLES = Array.from({ length: 9 }, (_, k) => {
  const x = -14 + k * 4;
  const y = round(-37.5 - 3.5 * Math.sin(((k + 1) / 10) * Math.PI));
  return `M ${x} ${y + 3} L ${x + 1.5} ${y - 2}`;
}).join(" ");

export function WallOfFire({ idPrefix = "sa27", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <linearGradient id={id("flame")} x1={0} y1={1} x2={0} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)" }} />
        </linearGradient>
        <radialGradient id={id("firelight")} cx={RING.cx} cy={RING.cy + 40} r={330} gradientUnits="userSpaceOnUse" gradientTransform={`translate(0 ${RING.cy + 40}) scale(1 0.75) translate(0 ${-(RING.cy + 40)})`}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.02 }} />
          <stop offset="0.75" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.26 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("shadow")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <RathaDefs id={id} />
      </defs>

      {/* Jvālāmālinī's rampart of fire round the camp, open only at the south */}
      <g {...part("rampart")}>
        <ellipse cx={RING.cx} cy={RING.cy} rx={RING.rx} ry={RING.ry} fill={url("firelight")} />
        <ellipse cx={RING.cx} cy={RING.cy} rx={RING.rx} ry={RING.ry} stroke="var(--art-saffron)" strokeWidth={12} strokeOpacity={0.35} />
        {FLAMES.map((f, i) => (
          <g key={i} transform={`translate(${f.x} ${f.y})`} opacity={round(0.62 + 0.38 * f.depth)}>
            <g className={BREATHE[f.k % 3]}>
              <path d={tongue(f.h, f.w, f.lean * 2)} fill={url("flame")} />
              <path d={tongue(f.h * 0.62, f.w * 0.55, f.lean)} fill="var(--art-core)" fillOpacity={0.55} />
            </g>
          </g>
        ))}
      </g>

      {/* Her own chariot, moving in the middle of the camp */}
      <g {...part("chariot")}>
        <ellipse cx={RATHA.cx} cy={RATHA.cy + 70} rx={110} ry={12} fill={url("shadow")} />
        <g stroke="var(--gold-soft)" strokeLinecap="round">
          {TRACKS.map((d, i) => (
            <path key={i} d={d} strokeWidth={0.8} strokeOpacity={0.5} />
          ))}
        </g>
        <RathaTiers g={RATHA} url={url} />
        <RathaTriangles g={RATHA} url={url} />
        <RathaWeapons g={RATHA} />
        <circle className="m-breathe" cx={RATHA.bindu.x} cy={RATHA.bindu.y} r={28} fill={url("bindu-glow")} />
        <circle cx={RATHA.bindu.x} cy={RATHA.bindu.y} r={4.5} fill="var(--art-core)" />
        <circle cx={RATHA.bindu.x} cy={RATHA.bindu.y} r={7.5} stroke="var(--gold)" strokeWidth={0.8} />
      </g>

      {/* Daṇḍanāthā's Kiricakra, going out first through the gap */}
      <g {...part("kiricakra")}>
        <g stroke="var(--gold)" strokeLinecap="round">
          {ROAD.map((d, i) => (
            <path key={i} d={d} strokeWidth={1} strokeOpacity={0.55} />
          ))}
        </g>
        <ellipse cx={KX} cy={KY + 34} rx={84} ry={10} fill={url("shadow")} />
        {[-38, 38].map((dx) => (
          <g key={dx} transform={`translate(${KX + dx} ${KY + 30})`}>
            <ChariotWheel r={24} />
          </g>
        ))}
        {K_STEPS.map(({ half, z0, z1 }, i) => {
          const d = round(half * K);
          return (
            <g key={i}>
              <rect x={KX - half} y={KY - z1 + d} width={2 * half} height={z1 - z0} fill="var(--art-crimson)" />
              <path d={`M ${KX - half} ${KY - z1 + d} H ${KX + half}`} stroke="var(--gold)" strokeWidth={1.1} />
              <path d={`M ${KX - half + 4} ${KY - z0 + d - 4} H ${KX + half - 4}`} stroke="var(--gold-soft)" strokeWidth={0.7} strokeDasharray="0.1 3.4" strokeLinecap="round" />
              <rect x={KX - half} y={KY - z1 - d} width={2 * half} height={2 * d} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.9} />
            </g>
          );
        })}
        {/* Her rod (daṇḍa), the staff of command, carrying the boar banner */}
        <path d={`M ${KX} ${K_TOP} V ${ROD_TOP}`} stroke="var(--gold)" strokeWidth={4} strokeLinecap="round" />
        {[K_TOP - 30, K_TOP - 60, K_TOP - 90].map((y) => (
          <rect key={y} x={KX - 4} y={y - 2} width={8} height={4} rx={1.5} fill="var(--gold-soft)" />
        ))}
        <circle cx={KX} cy={ROD_TOP - 5} r={5.5} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
        <path d={BANNER} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={1.1} strokeLinejoin="round" />
        <g transform={`translate(${KX + 46} ${ROD_TOP + 34}) scale(0.62)`}>
          <path d={BOAR} fill="var(--gold)" />
          <path d={BOAR_LEGS} stroke="var(--gold)" strokeWidth={4} strokeLinecap="round" />
          <path d={BOAR_BRISTLES} stroke="var(--gold)" strokeWidth={1.4} strokeLinecap="round" />
          <path d="M 28 -17.5 C 31 -21 32 -23.5 30 -27" stroke="var(--art-ivory)" strokeWidth={2.2} strokeLinecap="round" />
          <path d="M 21 -35 L 19.5 -44 L 25.5 -37.5 Z" fill="var(--gold)" />
          <circle cx={26} cy={-28} r={1.4} fill="var(--art-carve)" />
          <path d="M -31 -26 C -36 -26 -38 -22 -36 -18" stroke="var(--gold)" strokeWidth={1.6} strokeLinecap="round" />
        </g>
      </g>

      {/* The lion Caṇḍocchaṇḍa, standing before the chariot */}
      <g {...part("lion")}>
        <g transform={`translate(${KX + 70} ${KY + 2}) scale(0.4)`} style={{ color: "var(--gold)" }} fill="currentColor">
          <Lion />
        </g>
      </g>
    </svg>
  );
}
