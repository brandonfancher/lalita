/**
 * Shloka 33 — "The empty city burned to nothing".
 *
 * The war ends and the praise begins. At the right, Śūnyaka, the Empty Place,
 * has been burnt with Bhaṇḍa inside it by the weapon named for her consort:
 * the shaft of pale light she sent has come to rest at its heart with his
 * crescent for a head, and of the city only its outline is left, walls, domes
 * and spire drawn in ash round nothing, a last few flames going out at its
 * foot and smoke rising. Above the card the gods praise her: Brahmā's lotus,
 * Viṣṇu's conch and discus, Indra's thunderbolt, and below them their lamps
 * held up in companies, as the court held them in Shloka 24. Her light, at the
 * left, is all radiance now. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { GanesaEmblem, Lamp, OpenLotus, Vajra, artIds, litPart, partProps, polar, radiance, round, tongue } from "./primitives";
import type { ArtProps } from "./types";

type Pt = { x: number; y: number };

const HER = { x: 236, y: 478 };
const RADIANCE = radiance({ cx: HER.x, cy: HER.y, from: 14, long: 240, short: 156 });

/* ── Śūnyaka, burnt to its outline ─────────────────────────────────────── */

const GROUND = 566;
/** The skyline, left to right: a crenellated wall between three towers, the middle one spired. */
const SKYLINE = (() => {
  const merlons = (x0: number, x1: number, y: number) => {
    const out: string[] = [];
    for (let x = x0; x + 12 <= x1; x += 12) out.push(`L ${x} ${y} L ${x} ${y - 6} L ${x + 6} ${y - 6} L ${x + 6} ${y}`);
    out.push(`L ${x1} ${y}`);
    return out.join(" ");
  };
  const dome = (cx: number, top: number, half: number, base: number) =>
    `L ${cx - half} ${base} L ${cx - half} ${top + half} C ${cx - half} ${top + 4} ${cx - 4} ${top} ${cx} ${top - 8} C ${cx + 4} ${top} ${cx + half} ${top + 4} ${cx + half} ${top + half} L ${cx + half} ${base}`;
  return [
    `M 384 ${GROUND} L 384 ${GROUND - 34}`,
    merlons(384, 404, GROUND - 34),
    dome(420, GROUND - 82, 16, GROUND - 34),
    merlons(436, 478, GROUND - 34),
    `L 478 ${GROUND - 70} L 486 ${GROUND - 70} L 486 ${GROUND - 92} C 486 ${GROUND - 104} 492 ${GROUND - 112} 500 ${GROUND - 134} C 508 ${GROUND - 112} 514 ${GROUND - 104} 514 ${GROUND - 92} L 514 ${GROUND - 70} L 522 ${GROUND - 70} L 522 ${GROUND - 34}`,
    merlons(522, 556, GROUND - 34),
    dome(570, GROUND - 72, 14, GROUND - 34),
    merlons(584, 604, GROUND - 34),
    `L 604 ${GROUND}`,
  ].join(" ");
})();
const GATE = `M 486 ${GROUND} L 486 ${GROUND - 20} C 486 ${GROUND - 28} 514 ${GROUND - 28} 514 ${GROUND - 20} L 514 ${GROUND}`;
const HEART = { x: 500, y: GROUND - 40 };
const EMBERS_OUT = [398, 432, 462, 540, 586].map((x, k) => ({ x, h: 12 + ((k * 5) % 3) * 4, k }));
const SMOKE = Array.from({ length: 22 }, (_, k) => ({
  x: round(400 + ((k * 43) % 200)),
  y: round(GROUND - 30 - ((k * 37) % 120)),
  r: round(1 + (k % 3) * 0.6),
  k,
}));

/** Kāmeśvara's weapon: a long tapering shaft of pale light from her to the city's heart. */
const SHAFT = (() => {
  const from = { x: HER.x + 16, y: HER.y - 4 };
  const c = { x: (from.x + HEART.x) / 2, y: HER.y - 70 };
  const pts: Pt[] = Array.from({ length: 25 }, (_, k) => {
    const t = k / 24;
    const u = 1 - t;
    return { x: u * u * from.x + 2 * u * t * c.x + t * t * HEART.x, y: u * u * from.y + 2 * u * t * c.y + t * t * HEART.y };
  });
  const side = (sgn: number) =>
    pts.map((p, k) => {
      const a = pts[Math.max(0, k - 1)];
      const b = pts[Math.min(pts.length - 1, k + 1)];
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      const w = 0.4 + 2.6 * (k / 24);
      return { x: round(p.x - ((b.y - a.y) / len) * w * sgn), y: round(p.y + ((b.x - a.x) / len) * w * sgn) };
    });
  const l = side(1);
  const r = side(-1).reverse();
  const end = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  return {
    d: [...l, ...r].map((p, k) => `${k ? "L" : "M"} ${p.x} ${p.y}`).join(" ") + " Z",
    from,
    angle: round((Math.atan2(end.y - prev.y, end.x - prev.x) * 180) / Math.PI),
  };
})();
const CRESCENT = litPart(4, 11);
const BURST = Array.from({ length: 12 }, (_, k) => {
  const deg = k * 30 + 15;
  const a = polar(HEART.x, HEART.y, 12, deg);
  const b = polar(HEART.x, HEART.y, k % 2 ? 20 : 28, deg);
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}).join(" ");

/* ── The gods' praise ──────────────────────────────────────────────────── */

const BRAHMA = { x: 318, y: 80 };
const VISNU = { x: 420, y: 58 };
const INDRA = { x: 522, y: 84 };
const LAMP_ROWS = [
  { r: 330, s: 0.9 },
  { r: 364, s: 1 },
];
const LAMPS = LAMP_ROWS.flatMap((row, ri) => {
  const out: { x: number; y: number; s: number; k: number }[] = [];
  for (let i = 0; i < 30; i++) {
    if ((i + ri * 3) % 7 >= 5) continue;
    const deg = 24 + i * (2.4 * (330 / row.r));
    if (deg > 92) break;
    const p = polar(HER.x, HER.y, row.r, deg);
    out.push({ ...p, s: row.s, k: (i + ri) % 3 });
  }
  return out;
});

export function EmptyCity({ idPrefix = "sa33", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={HER.x} cy={HER.y} r={260} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("radiance")} cx={HER.x} cy={HER.y} r={240} gradientUnits="userSpaceOnUse">
          <stop offset="0.05" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
          <stop offset="0.2" style={{ stopColor: "var(--gold)", stopOpacity: 0.75 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("void")} cx={495} cy={GROUND - 50} r={130} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("strike")}>
          <stop offset="0" style={{ stopColor: "var(--art-ivory)", stopOpacity: 0.9 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("god-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("shaft")} x1={SHAFT.from.x} y1={SHAFT.from.y} x2={HEART.x} y2={HEART.y} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--art-ivory)" }} />
        </linearGradient>
        <linearGradient id={id("dying")} x1={0} y1={1} x2={0} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.8 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.3 }} />
        </linearGradient>
      </defs>

      {/* Her light, all radiance now */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={HER.x} cy={HER.y} r={260} fill={url("glow")} />
        <path className="m-shimmer" d={RADIANCE} stroke={url("radiance")} strokeWidth={0.7} />
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={36} fill={url("bindu-glow")} />
        <circle cx={HER.x} cy={HER.y} r={6} fill="var(--art-core)" />
        <circle cx={HER.x} cy={HER.y} r={9.6} stroke="var(--gold)" strokeWidth={0.9} />
      </g>

      {/* Śūnyaka and Bhaṇḍa in it, burnt by Kāmeśvara's weapon to an outline round nothing */}
      <g {...part("city")}>
        <circle cx={495} cy={GROUND - 50} r={130} fill={url("void")} />
        <path d={SKYLINE} stroke="var(--art-musk)" strokeWidth={1.6} strokeOpacity={0.55} strokeLinejoin="round" strokeDasharray="5 3" />
        <path d={SKYLINE} stroke="var(--art-moon)" strokeWidth={0.6} strokeOpacity={0.7} strokeLinejoin="round" strokeDasharray="5 3" />
        <path d={GATE} stroke="var(--art-musk)" strokeWidth={1.2} strokeOpacity={0.5} strokeDasharray="4 3" />
        <path d={`M 372 ${GROUND} L 616 ${GROUND}`} stroke="var(--art-musk)" strokeWidth={1} strokeOpacity={0.4} />
        {EMBERS_OUT.map((e) => (
          <path key={e.k} className={["m-flicker", "m-flicker m-late", "m-flicker m-later"][e.k % 3]} d={tongue(e.h, 7, 1)} transform={`translate(${e.x} ${GROUND})`} fill={url("dying")} />
        ))}
        {SMOKE.map((m) => (
          <circle key={m.k} className={m.k % 2 ? "m-ember m-late" : "m-ember"} cx={m.x} cy={m.y} r={m.r} fill={m.k % 3 ? "var(--art-musk)" : "var(--art-moon)"} fillOpacity={0.4} />
        ))}
        <path d={SHAFT.d} fill={url("shaft")} />
        <circle className="m-breathe" cx={HEART.x} cy={HEART.y} r={34} fill={url("strike")} />
        <path className="m-lick" d={BURST} stroke="var(--art-ivory)" strokeWidth={1.2} strokeLinecap="round" />
        <g transform={`translate(${HEART.x} ${HEART.y}) rotate(${SHAFT.angle + 90})`}>
          <path d={CRESCENT} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.8} />
        </g>
      </g>

      {/* In the ash at its heart, one green shoot */}
      <g {...part("shoot")}>
        <g transform={`translate(${HEART.x + 26} ${GROUND})`}>
          <path d="M 0 0 C 0 -6 1 -10 0 -15" stroke="var(--leaf)" strokeWidth={1.3} strokeLinecap="round" />
          <path d="M 0 -11 C -6 -14 -9 -12 -10 -9 C -6 -8 -3 -9 0 -11 Z" fill="var(--leaf)" />
          <path d="M 0 -14 C 5 -19 9 -18 10 -15 C 6 -13 3 -13 0 -14 Z" fill="var(--leaf)" />
        </g>
      </g>

      {/* The gods praising her: Brahmā's lotus, Viṣṇu's conch and discus, Indra's thunderbolt, and their lamps */}
      <g {...part("praise")}>
        {[BRAHMA, VISNU, INDRA].map((g, i) => (
          <circle key={i} className={i % 2 ? "m-shimmer m-late" : "m-shimmer"} cx={g.x} cy={g.y} r={44} fill={url("god-glow")} />
        ))}
        <g transform={`translate(${BRAHMA.x} ${BRAHMA.y + 12}) scale(0.5)`}>
          <OpenLotus fill="var(--art-vermilion)" />
        </g>
        <g transform={`translate(${VISNU.x - 16} ${VISNU.y}) scale(1.5)`}>
          <GanesaEmblem name="discus" />
        </g>
        <g transform={`translate(${VISNU.x + 17} ${VISNU.y}) scale(1.4)`}>
          <GanesaEmblem name="conch" />
        </g>
        <g transform={`translate(${INDRA.x} ${INDRA.y}) rotate(-20)`} stroke="var(--gold)" strokeLinecap="round">
          <Vajra />
        </g>
        {LAMPS.map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) scale(${l.s})`}>
            <Lamp k={l.k} />
          </g>
        ))}
      </g>
    </svg>
  );
}
