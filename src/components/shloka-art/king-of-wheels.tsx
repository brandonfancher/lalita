/**
 * Shloka 26 — "The chariot called King of Wheels".
 *
 * The march begins, and the hymn turns from her body to her order of battle.
 * Her chariot, the Cakrarāja, is drawn as the tradition reads it: the
 * Śrīcakra itself raised in tiers, its enclosures stepping up from the square
 * of gates to the nine triangles, set on wheels, so the diagram is a vehicle.
 * Weapons stand ready round every tier, because on this chariot the armament
 * is the goddesses stationed on its steps. Beside it, a little behind, rides
 * Mantriṇī's Geyacakra, the Wheel of Song: seven dark steps, a ruby-set vīṇā,
 * and her sapphire light, with rings of song rising from it. Which name each
 * part answers to is written up for readers in the registry, next to this
 * artwork's entry.
 */

import {
  ChariotWheel,
  RathaDefs,
  RathaSilhouette,
  RathaTiers,
  RathaTriangles,
  RathaWeapons,
  artIds,
  partProps,
  polar,
  radiance,
  round,
  sriCakraRatha,
} from "./primitives";
import type { ArtProps } from "./types";

const CX = 268;
/** Where the yantra's centre would be on the ground. */
const CY = 548;
const RATHA = sriCakraRatha(CX, CY);
const K = RATHA.K;
const BINDU = RATHA.bindu;
const RADIANCE = radiance({ cx: BINDU.x, cy: BINDU.y, from: 12, long: 270, short: 170 });

/** The flagstaff rises from behind her light; the pennant streams out the way the march is going. */
const STAFF_TOP = 66;
const PENNANT = `M ${CX} ${STAFF_TOP} C ${CX + 50} ${STAFF_TOP - 8} ${CX + 92} ${STAFF_TOP + 14} ${CX + 150} ${STAFF_TOP + 6} L ${CX + 128} ${STAFF_TOP + 20} L ${CX + 154} ${STAFF_TOP + 34} C ${CX + 96} ${STAFF_TOP + 42} ${CX + 52} ${STAFF_TOP + 22} ${CX} ${STAFF_TOP + 34} Z`;
const PENNANT_HEM = `M ${CX + 4} ${STAFF_TOP + 4} C ${CX + 52} ${STAFF_TOP - 3} ${CX + 92} ${STAFF_TOP + 18} ${CX + 142} ${STAFF_TOP + 10}`;

/** Wheel tracks in the dust behind the chariot, back toward the lower left where it came from. */
const TRACKS = [-118, 118].flatMap((dx) =>
  [-3, 3].map((o) => {
    const x = CX + dx + o;
    const y = CY + 134;
    return `M ${x} ${y - 2} C ${x - 20} ${y + 22} ${x - 60} ${y + 46} ${x - 120} ${y + 70}`;
  }),
);

/* ── The Geyacakra ─────────────────────────────────────────────────────── */

const GX = 472;
const GY = 516;
const G_STEPS = [60, 52, 45, 38, 31, 25, 19].map((half, i) => ({ half, z0: i * 9, z1: (i + 1) * 9 }));
const G_TOP = { x: GX, y: GY - 63 };
const SAPPHIRE = { x: GX, y: G_TOP.y - 20 };
const SONG = [30, 46, 62, 78, 94].map((r, i) => {
  const a = polar(SAPPHIRE.x, SAPPHIRE.y, r, 82);
  const b = polar(SAPPHIRE.x, SAPPHIRE.y, r, 14);
  return { d: `M ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y}`, o: round(0.75 - i * 0.12) };
});

export function KingOfWheels({ idPrefix = "sa26", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={BINDU.x} cy={BINDU.y} r={280} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={BINDU.x} cy={BINDU.y} r={270} gradientUnits="userSpaceOnUse">
          <stop offset="0.05" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.2" style={{ stopColor: "var(--gold)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <RathaDefs id={id} />
        <radialGradient id={id("sapphire")}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("shadow")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <mask id={id("open-air")} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={830}>
          <rect width={640} height={830} fill="#fff" />
          <g fill="#000">
            <RathaSilhouette g={RATHA} />
            <rect x={GX - 60} y={GY - 63 - 10} width={120} height={63 + 40} />
            <circle cx={BINDU.x} cy={BINDU.y} r={10} fill="#fff" />
          </g>
        </mask>
      </defs>

      {/* The Geyacakra, Mantriṇī's chariot of seven steps, a little behind */}
      <g {...part("geyacakra")}>
        <ellipse cx={GX} cy={GY + 56} rx={92} ry={14} fill={url("shadow")} />
        {[-42, 42].map((dx) => (
          <g key={dx} transform={`translate(${GX + dx} ${GY + 36})`}>
            <ChariotWheel r={24} />
          </g>
        ))}
        {G_STEPS.map(({ half, z0, z1 }, i) => {
          const d = round(half * K);
          return (
            <g key={i}>
              <rect x={GX - half} y={GY - z1 + d} width={2 * half} height={z1 - z0} fill="var(--art-hair)" fillOpacity={0.88} />
              <path d={`M ${GX - half} ${GY - z1 + d} H ${GX + half}`} stroke="var(--gold)" strokeWidth={1} />
              <rect x={GX - half} y={GY - z1 - d} width={2 * half} height={2 * d} fill="var(--art-hair)" fillOpacity={0.62} stroke="var(--gold)" strokeWidth={0.8} />
            </g>
          );
        })}
        <circle className="m-shimmer" cx={SAPPHIRE.x} cy={SAPPHIRE.y} r={40} fill={url("sapphire")} />
        <g stroke="var(--gold)" strokeLinecap="round" strokeDasharray="7 4">
          {SONG.map((s, i) => (
            <path key={i} className={i % 2 ? "m-shimmer m-late" : "m-shimmer"} d={s.d} strokeWidth={1.1} strokeOpacity={s.o} />
          ))}
        </g>
        {/* The vīṇā, its two gourds hanging under a straight neck, studded with rubies */}
        <g transform={`translate(${G_TOP.x} ${G_TOP.y - 4}) rotate(-8)`}>
          {[-26, 26].map((x) => (
            <g key={x}>
              <path d={`M ${x} 0 V 4`} stroke="var(--gold)" strokeWidth={1.2} />
              <circle cx={x} cy={11} r={8.5} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
              <path d={`M ${x - 5} ${8} Q ${x - 4.5} ${5} ${x - 1.5} ${4.4}`} stroke="var(--art-core)" strokeWidth={1.1} strokeLinecap="round" />
            </g>
          ))}
          <rect x={-38} y={-3} width={76} height={5} rx={2.5} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d="M 38 -1 C 44 -2 46 -8 43 -12" stroke="var(--gold)" strokeWidth={2.4} strokeLinecap="round" />
          <path d="M -36 -3.6 L 36 -3.6" stroke="var(--gold-soft)" strokeWidth={0.4} />
          {[-18, -6, 6, 18].map((x) => (
            <circle key={x} cx={x} cy={-0.5} r={1.5} fill="var(--art-vermilion)" />
          ))}
        </g>
        <circle cx={SAPPHIRE.x} cy={SAPPHIRE.y} r={9} fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={1} />
        <circle cx={SAPPHIRE.x - 2.6} cy={SAPPHIRE.y - 2.6} r={2.4} fill="var(--art-moon)" fillOpacity={0.85} />
      </g>

      {/* The Cakrarāja: the Śrīcakra in nine tiers, on wheels */}
      <g {...part("chariot")}>
        <ellipse cx={CX} cy={CY + 134} rx={200} ry={22} fill={url("shadow")} />
        <path d={`M ${CX} ${BINDU.y - 8} V ${STAFF_TOP}`} stroke="var(--gold)" strokeWidth={2.6} strokeLinecap="round" />
        <circle cx={CX} cy={STAFF_TOP - 4} r={4} fill="var(--gold)" />
        <path d={PENNANT} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={1.1} strokeLinejoin="round" />
        <path d={PENNANT_HEM} stroke="var(--gold-soft)" strokeWidth={0.8} strokeDasharray="2 2.6" />
        <g transform={`translate(${CX + 58} ${STAFF_TOP + 15})`}>
          <ChariotWheel r={9} />
        </g>
        <g stroke="var(--gold-soft)" strokeLinecap="round">
          {TRACKS.map((d, i) => (
            <path key={i} d={d} strokeWidth={0.8} strokeOpacity={0.4} />
          ))}
        </g>
        <RathaTiers g={RATHA} url={url} />
      </g>

      {/* The nine triangles on the top tier */}
      <g {...part("triangles")}>
        <RathaTriangles g={RATHA} url={url} />
      </g>

      {/* The weapons, standing ready round every tier */}
      <g {...part("weapons")}>
        <RathaWeapons g={RATHA} />
      </g>

      {/* Her light at the summit, its glow and radiance kept off the chariots */}
      <g {...part("light")}>
        <g mask={url("open-air")}>
          <circle className="m-shimmer" cx={BINDU.x} cy={BINDU.y} r={280} fill={url("glow")} />
          <path className="m-shimmer" d={RADIANCE} stroke={url("radiance")} strokeWidth={0.7} />
        </g>
        <circle className="m-breathe" cx={BINDU.x} cy={BINDU.y} r={34} fill={url("bindu-glow")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={5.5} fill="var(--art-core)" />
        <circle cx={BINDU.x} cy={BINDU.y} r={9} stroke="var(--gold)" strokeWidth={0.9} />
      </g>
    </svg>
  );
}
