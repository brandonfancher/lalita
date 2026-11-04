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

import { artIds, partProps, polar, radiance, round } from "./primitives";
import type { ArtProps } from "./types";

/* ── The Śrīcakra in tiers (meru-prastāra) ─────────────────────────────── */

/** Plate units per yantra unit; the yantra's vertical diameter is 48 units, as in the traditional construction. */
const S = 3.2;
/** How much the tiers' top faces are foreshortened, seen from in front and above. */
const K = 0.5;
const CX = 268;
/** Where the yantra's centre would be on the ground. */
const CY = 548;

/** A face lying at height z, in yantra units (v toward the viewer). */
const face = (z: number, cx = CX, cy = CY) => `translate(${cx} ${cy - z}) scale(${S} ${round(S * K)})`;

/** The plinth (bhūpura) and four drums, each a step of the meru: radius in yantra units, and its top height. */
const PLINTH = { half: 48, gate: 8, jut: 5, z: 22 };
const DRUMS = [
  { r: 42.2, z: 30 },
  { r: 38.4, z: 48 },
  { r: 31.2, z: 64 },
  { r: 24, z: 78 },
];

/** The front of a drum of radius r (yantra units) from height z0 up to z1, in plate units. */
function drumRiser(r: number, z0: number, z1: number) {
  const rx = round(r * S);
  const ry = round(r * S * K);
  const yt = CY - z1;
  const yb = CY - z0;
  return `M ${CX - rx} ${yt} A ${rx} ${ry} 0 0 0 ${CX + rx} ${yt} L ${CX + rx} ${yb} A ${rx} ${ry} 0 0 1 ${CX - rx} ${yb} Z`;
}

/** The square of gates, as a closed outline in yantra units, half-side h, its four gates jutting out. */
function gateSquare(h: number, g: number, j: number) {
  const side = (x: number, y: number) => [x, y];
  const pts: number[][] = [];
  // Clockwise from the far left corner, with a gate in the middle of each side.
  pts.push(side(-h, -h), side(-g, -h), side(-g, -h - j), side(g, -h - j), side(g, -h));
  pts.push(side(h, -h), side(h, -g), side(h + j, -g), side(h + j, g), side(h, g));
  pts.push(side(h, h), side(g, h), side(g, h + j), side(-g, h + j), side(-g, h));
  pts.push(side(-h, h), side(-h, g), side(-h - j, g), side(-h - j, -g), side(-h, -g));
  return `M ${pts.map(([x, y]) => `${round(x)} ${round(y)}`).join(" L ")} Z`;
}

const PLINTH_FRONT = (() => {
  const { half: h, gate: g, jut: j, z } = PLINTH;
  const y = (v: number, zz: number) => round(CY + v * S * K - zz);
  const x = (u: number) => round(CX + u * S);
  return [
    `M ${x(-h)} ${y(h, z)} L ${x(-g)} ${y(h, z)} L ${x(-g)} ${y(h + j, z)} L ${x(g)} ${y(h + j, z)} L ${x(g)} ${y(h, z)} L ${x(h)} ${y(h, z)}`,
    `L ${x(h)} ${y(h, 0)} L ${x(g)} ${y(h, 0)} L ${x(g)} ${y(h + j, 0)} L ${x(-g)} ${y(h + j, 0)} L ${x(-g)} ${y(h, 0)} L ${x(-h)} ${y(h, 0)} Z`,
  ].join(" ");
})();

/** A carved line round the front of a drum of radius r at height z. */
function frieze(r: number, z: number) {
  const rx = round(r * S - 2);
  const ry = round((r * S - 2) * K);
  return `M ${CX - rx} ${CY - z} A ${rx} ${ry} 0 0 0 ${CX + rx} ${CY - z}`;
}
/** Upright carved lines across the front of a drum, every `n`th of the way round, so the tiers read as built, not moulded. */
const PILASTERS = [28, 26, 22, 18];
function pilasters(r: number, z0: number, z1: number, n: number) {
  return Array.from({ length: n / 2 - 1 }, (_, k) => {
    const t = ((k + 1) / (n / 2)) * Math.PI;
    const x = round(CX + r * S * Math.cos(t));
    const y = round(CY + r * S * K * Math.sin(t));
    return `M ${x} ${y - z0 - 1} V ${y - z1 + 4}`;
  }).join(" ");
}
const PLINTH_MID = round(CY + PLINTH.half * S * K - PLINTH.z / 2);

/** A ring of petals between radii r0 and r1, in yantra units. */
function petals(n: number, r0: number, r1: number, turn = 0) {
  const half = 180 / n;
  return Array.from({ length: n }, (_, k) => {
    const deg = 90 + turn + (k * 360) / n;
    const a = polar(0, 0, r0, deg - half);
    const b = polar(0, 0, r0, deg + half);
    const tip = polar(0, 0, r1, deg);
    const ca = polar(0, 0, r0 + (r1 - r0) * 0.62, deg - half * 0.92);
    const cb = polar(0, 0, r0 + (r1 - r0) * 0.62, deg + half * 0.92);
    return `M ${a.x} ${a.y} Q ${ca.x} ${ca.y} ${tip.x} ${tip.y} Q ${cb.x} ${cb.y} ${b.x} ${b.y}`;
  }).join(" ");
}

/**
 * The nine interlocking triangles, from the traditional construction: nine
 * horizontal base lines 6, 12, 17, 20, 23, 27, 30, 36 and 42 units down a
 * 48-unit diameter, each shortened at its ends, joined to an apex on the axis.
 * Five point down (toward the viewer), four point up.
 */
const BASES = [
  { d: 6, hw: 12.87, apex: 27 },
  { d: 12, hw: 15.78, apex: 42 },
  { d: 17, hw: 22.96, apex: 48 },
  { d: 20, hw: 7.66, apex: 36 },
  { d: 23, hw: 5.98, apex: 30 },
  { d: 27, hw: 7.81, apex: 12 },
  { d: 30, hw: 23.24, apex: 0 },
  { d: 36, hw: 16.78, apex: 6 },
  { d: 42, hw: 12.87, apex: 17 },
];
const TRIANGLES = BASES.map(({ d, hw, apex }) => ({
  d: `M ${-hw} ${d - 24} L ${hw} ${d - 24} L 0 ${apex - 24} Z`,
  down: apex > d,
}));
/** The bindu, inside the innermost triangle. */
const BINDU_V = 1.2;
const BINDU = { x: CX, y: round(CY + BINDU_V * S * K - DRUMS[3].z - 8) };
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

/* ── The weapons on the tiers ──────────────────────────────────────────── */

type Weapon = { x: number; y: number; kind: number; back: boolean; s: number };

/** Weapons standing round the rim of a tier of radius r at height z, `n` of them. */
function rimWeapons(r: number, z: number, n: number, s: number, offset: number): Weapon[] {
  return Array.from({ length: n }, (_, k) => {
    const t = ((k + 0.5) / n) * 2 * Math.PI;
    return {
      x: round(CX + r * S * Math.cos(t)),
      y: round(CY - z + r * S * K * Math.sin(t)),
      kind: (k + offset) % 4,
      back: Math.sin(t) < 0,
      s,
    };
  });
}

/** On the lower tiers only the front and sides of each rim show; the top tier's stand all round. */
const WEAPONS = [
  ...rimWeapons(41, DRUMS[0].z, 26, 0.85, 0),
  ...rimWeapons(37.4, DRUMS[1].z, 20, 0.95, 1),
  ...rimWeapons(30.4, DRUMS[2].z, 16, 1.05, 2),
].filter((w) => !w.back);
const TOP_WEAPONS = rimWeapons(23.2, DRUMS[3].z, 12, 1.15, 3);
/** Along the plinth's front edge, either side of the gate. */
const PLINTH_WEAPONS: Weapon[] = [-44, -36, -28, -20, -12, 12, 20, 28, 36, 44].map((u, k) => ({
  x: CX + u * S,
  y: round(CY + PLINTH.half * S * K - PLINTH.z),
  kind: k % 4,
  back: false,
  s: 0.85,
}));

/** A spear, a trident, an arrow and a goad, each standing up from the origin, about 22 tall. */
function WeaponGlyph({ kind }: { kind: number }) {
  const shaft = <path d="M 0 0 V -14" stroke="var(--gold)" strokeWidth={1.1} />;
  switch (kind) {
    case 0:
      return (
        <>
          {shaft}
          <path d="M 0 -24 C 2.6 -20 2.6 -16 0 -13.4 C -2.6 -16 -2.6 -20 0 -24 Z" fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.6} />
        </>
      );
    case 1:
      return (
        <>
          {shaft}
          <path d="M -4 -21 Q -4.4 -15 0 -14 Q 4.4 -15 4 -21 M 0 -14 V -23" stroke="var(--gold)" strokeWidth={1.1} strokeLinecap="round" />
        </>
      );
    case 2:
      return (
        <>
          <path d="M 0 0 V -18" stroke="var(--gold)" strokeWidth={1} />
          <path d="M -2.2 -18 L 0 -23.5 L 2.2 -18 Z" fill="var(--gold)" />
          <path d="M -2.4 -1 L 0 -5 L 2.4 -1" stroke="var(--art-saffron)" strokeWidth={1} />
        </>
      );
    default:
      return (
        <>
          <path d="M 0 0 V -20" stroke="var(--gold)" strokeWidth={1.1} />
          <path d="M 0 -20 L 0 -24 M 0 -17 C 4 -19 6.4 -16 5 -13" stroke="var(--gold)" strokeWidth={1.1} strokeLinecap="round" />
        </>
      );
  }
}

function Weapons({ list }: { list: Weapon[] }) {
  return (
    <>
      {list.map((w, i) => (
        <g key={i} transform={`translate(${w.x} ${w.y}) scale(${w.s})`} opacity={w.back ? 0.75 : 1}>
          <WeaponGlyph kind={w.kind} />
          {i % 5 === 2 && <circle className={["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"][i % 3]} cy={-22} r={1.6} fill="var(--art-core)" />}
        </g>
      ))}
    </>
  );
}

/* ── Wheels ────────────────────────────────────────────────────────────── */

/** A chariot wheel face-on at the origin, radius r: a double rim, sixteen spokes alternately long and short, a hub with a ruby. */
function Wheel({ r }: { r: number }) {
  const spokes = Array.from({ length: 16 }, (_, k) => {
    const deg = k * 22.5 + 11.25;
    const a = polar(0, 0, r * 0.2, deg);
    const b = polar(0, 0, r * 0.86, deg);
    return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  }).join(" ");
  return (
    <>
      <circle r={r} stroke="var(--gold)" strokeWidth={round(r * 0.13)} />
      <circle r={round(r * 0.86)} stroke="var(--art-carve)" strokeWidth={0.7} />
      <circle r={round(r * 1.065)} stroke="var(--art-carve)" strokeWidth={0.7} />
      <path d={spokes} stroke="var(--gold)" strokeWidth={round(r * 0.05)} />
      <circle r={round(r * 0.22)} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.7} />
      <circle r={round(r * 0.09)} fill="var(--art-vermilion)" />
    </>
  );
}

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
  const stroke = { vectorEffect: "non-scaling-stroke" as const };

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
        <radialGradient id={id("field")} cx={0} cy={BINDU_V} r={24} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)" }} />
        </radialGradient>
        <linearGradient id={id("riser")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0.75 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-turmeric)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0.75 }} />
        </linearGradient>
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
            <path d={PLINTH_FRONT} />
            <path d={gateSquare(PLINTH.half, PLINTH.gate, PLINTH.jut)} transform={face(PLINTH.z)} />
            {DRUMS.map((drum, i) => (
              <g key={i}>
                <path d={drumRiser(drum.r, i ? DRUMS[i - 1].z : PLINTH.z, drum.z)} />
                <circle r={drum.r} transform={face(drum.z)} />
              </g>
            ))}
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
            <Wheel r={24} />
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
          <Wheel r={9} />
        </g>
        <g stroke="var(--gold-soft)" strokeLinecap="round">
          {TRACKS.map((d, i) => (
            <path key={i} d={d} strokeWidth={0.8} strokeOpacity={0.4} />
          ))}
        </g>
        {[-118, 118].map((dx) => (
          <g key={dx} transform={`translate(${CX + dx} ${CY + 88})`}>
            <Wheel r={46} />
          </g>
        ))}
        <path d={PLINTH_FRONT} fill={url("riser")} stroke="var(--gold)" strokeWidth={0.8} />
        <path d={`M ${CX - PLINTH.half * S + 4} ${PLINTH_MID} H ${CX + PLINTH.half * S - 4}`} stroke="var(--art-carve)" strokeWidth={0.9} strokeDasharray="6 2.4" />
        <g transform={face(PLINTH.z)}>
          <path d={gateSquare(PLINTH.half, PLINTH.gate, PLINTH.jut)} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.4} {...stroke} />
          <path d={gateSquare(PLINTH.half - 2.4, PLINTH.gate - 1.6, PLINTH.jut)} stroke="var(--art-vermilion)" strokeWidth={1} {...stroke} />
          <path d={gateSquare(PLINTH.half - 4.8, PLINTH.gate - 3.2, PLINTH.jut)} stroke="var(--gold)" strokeWidth={0.8} {...stroke} />
        </g>
        {DRUMS.map((drum, i) => {
          const z0 = i ? DRUMS[i - 1].z : PLINTH.z;
          return (
            <g key={i}>
              <path d={drumRiser(drum.r, z0, drum.z)} fill={url("riser")} stroke="var(--gold)" strokeWidth={0.8} />
              <path d={pilasters(drum.r, z0, drum.z, PILASTERS[i])} stroke="var(--art-carve)" strokeWidth={0.8} />
              <path d={frieze(drum.r, drum.z - 3)} stroke="var(--art-carve)" strokeWidth={0.8} />
              <g transform={face(drum.z)}>
                <circle r={drum.r} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.2} {...stroke} />
                {i === 0 && (
                  <g stroke="var(--gold)" {...stroke}>
                    <circle r={40.8} strokeWidth={0.8} {...stroke} />
                    <circle r={39.4} strokeWidth={0.8} {...stroke} />
                  </g>
                )}
                {i === 1 && (
                  <path d={petals(16, 31.2, 38, 0)} fill="var(--art-core)" fillOpacity={0.85} stroke="var(--gold)" strokeWidth={0.9} {...stroke} />
                )}
                {i === 2 && (
                  <path d={petals(8, 24, 30.8, 0)} fill="var(--art-saffron)" fillOpacity={0.9} stroke="var(--gold)" strokeWidth={0.9} {...stroke} />
                )}
              </g>
            </g>
          );
        })}
      </g>

      {/* The nine triangles on the top tier */}
      <g {...part("triangles")}>
        <g transform={face(DRUMS[3].z)}>
          <circle r={23.4} fill={url("field")} fillOpacity={0.9} />
          {TRIANGLES.map((t, i) => (
            <path key={i} d={t.d} fill={t.down ? "var(--art-vermilion)" : "var(--art-core)"} fillOpacity={0.16} />
          ))}
          {TRIANGLES.map((t, i) => (
            <path key={i} d={t.d} stroke="var(--gold)" strokeWidth={1.1} strokeLinejoin="round" {...stroke} />
          ))}
        </g>
      </g>

      {/* The weapons, standing ready round every tier */}
      <g {...part("weapons")}>
        <Weapons list={[...PLINTH_WEAPONS, ...WEAPONS]} />
        <Weapons list={TOP_WEAPONS} />
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
