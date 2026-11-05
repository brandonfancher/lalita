/**
 * Shloka 37 — "Kula, and what lies outside it".
 *
 * Both of the tradition's ways, and a name between them that belongs to
 * neither. At the left, the kula: a household doorway hung with mango
 * leaves, a kolam on its threshold, and inside it her light at the centre of
 * the assembly of powers, each joined to her and to the next; before the
 * door, the outward rite's cup and lamp. At the right, the samaya: the
 * inward worship, a slender column through six small lotuses, the centres
 * of the body, and her light in the lotus of the heart. Above, between the
 * two and joined to neither, a pale still light with nothing round it.
 * Which name each part answers to is written up for readers in the
 * registry, next to this artwork's entry.
 */

import { Kolam, Lamp, NectarCup, OpenLotus, archPath, artIds, partProps, polar, round } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── The kula: a household doorway ─────────────────────────────────────── */

const DOOR = { cx: 206, cy: 468, bottom: 556 };
const DOOR_R = 58;
const KULA = { x: DOOR.cx, y: 496 };
/** The assembly of powers round her, each joined to her and to the next. */
const POWERS = Array.from({ length: 8 }, (_, k) => ({ ...polar(KULA.x, KULA.y, 34, 90 - k * 45), k }));
const JOINS = POWERS.map((p, i) => {
  const q = POWERS[(i + 1) % POWERS.length];
  return `M ${p.x} ${p.y} Q ${round((p.x + q.x) / 2 + (KULA.x - (p.x + q.x) / 2) * 0.35)} ${round((p.y + q.y) / 2 + (KULA.y - (p.y + q.y) / 2) * 0.35)} ${q.x} ${q.y}`;
}).join(" ");
/** Mango leaves (toraṇa) hung along the arch. */
const TORANA = Array.from({ length: 9 }, (_, k) => {
  const deg = 160 - k * 17.5;
  const p = polar(DOOR.cx, DOOR.cy, DOOR_R - 2, deg);
  return { ...p, turn: round(90 - deg), k };
});
const MANGO_LEAF = "M 0 0 C -3.6 4 -3.4 11 0 16 C 3.4 11 3.6 4 0 0 Z";
const THRESHOLD = { x: DOOR.cx - DOOR_R - 10, y: DOOR.bottom, w: DOOR_R * 2 + 20, h: 7 };
/** The kolam on the threshold: a row of rice-flour dots, a loop drawn round each pair. */
const KOLAM_Y = DOOR.bottom + 18;
const KOLAM_DOTS = Array.from({ length: 7 }, (_, k) => ({ x: DOOR.cx - 42 + k * 14, y: KOLAM_Y }));
const KOLAM_LOOP = (() => {
  const xs = KOLAM_DOTS.map((d) => d.x);
  const up = xs.map((x, i) => `${i ? "" : `M ${x - 7} ${KOLAM_Y}`} C ${x - 7} ${KOLAM_Y - 9} ${x + 7} ${KOLAM_Y - 9} ${x + 7} ${KOLAM_Y}`).join(" ");
  const down = [...xs].reverse().map((x) => `C ${x + 7} ${KOLAM_Y + 9} ${x - 7} ${KOLAM_Y + 9} ${x - 7} ${KOLAM_Y}`).join(" ");
  return `${up} ${down} Z`;
})();
const RITE = { lamp: { x: DOOR.cx - 40, y: DOOR.bottom + 48 }, cup: { x: DOOR.cx + 38, y: DOOR.bottom + 46 } };

/* ── The samaya: the inward worship ────────────────────────────────────── */

const AXIS = { x: 436, top: 410, bottom: 610 };
const CENTRES = Array.from({ length: 6 }, (_, k) => ({ y: round(AXIS.bottom - 12 - k * 34), k }));
const HEART = CENTRES[3];

/* ── Beyond both ───────────────────────────────────────────────────────── */

const AKULA = { x: 322, y: 96 };

export function KulaAndSamaya({ idPrefix = "sa37", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.6 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("power-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("still")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.5 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("still-tint")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("nectar-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("axis")} x1={0} y1={AXIS.bottom} x2={0} y2={AXIS.top} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)", stopOpacity: 0.2 }} />
          <stop offset="0.5" style={{ stopColor: "var(--gold)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0.2 }} />
        </linearGradient>
      </defs>

      {/* Beyond both, joined to neither: a pale still light with nothing round it */}
      <g {...part("akula")}>
        <circle cx={AKULA.x} cy={AKULA.y} r={96} fill={url("still")} />
        <circle cx={AKULA.x} cy={AKULA.y} r={30} fill={url("still-tint")} />
        <circle cx={AKULA.x} cy={AKULA.y} r={17} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.6} />
        <circle cx={AKULA.x} cy={AKULA.y} r={7.4} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.9} />
        <circle cx={AKULA.x} cy={AKULA.y} r={2.6} fill="var(--art-ivory)" />
      </g>

      {/* The household doorway, hung with mango leaves */}
      <g {...part("household")}>
        <circle className="m-shimmer" cx={KULA.x} cy={KULA.y} r={110} fill={url("glow")} />
        <path d={archPath(DOOR, DOOR_R + 6)} stroke="var(--gold)" strokeWidth={2.4} strokeLinejoin="round" />
        <path d={archPath(DOOR, DOOR_R)} stroke="var(--gold-soft)" strokeWidth={1} />
        <rect x={THRESHOLD.x} y={THRESHOLD.y} width={THRESHOLD.w} height={THRESHOLD.h} rx={1.5} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
        {TORANA.map((t) => (
          <g key={t.k} className={t.k % 2 ? "m-sway m-late" : "m-sway"} transform={`translate(${round(t.x)} ${round(t.y)}) rotate(${t.turn})`}>
            <path d={MANGO_LEAF} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.4} />
          </g>
        ))}
      </g>

      {/* The kolam on its threshold */}
      <g {...part("threshold")}>
        <Kolam d={KOLAM_LOOP} dots={KOLAM_DOTS} />
      </g>

      {/* The assembly of powers, each joined to her and to the next */}
      <g {...part("yogini")}>
        <path className="m-shimmer" d={JOINS} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.6} strokeLinejoin="round" />
        {POWERS.map((p) => (
          <g key={p.k} className={TWINKLE[p.k % 3]}>
            <circle cx={p.x} cy={p.y} r={9} fill={url("power-glow")} />
            <circle cx={p.x} cy={p.y} r={3} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.6} />
          </g>
        ))}
      </g>

      {/* Her light, inside the kula */}
      <g {...part("within")}>
        <circle className="m-breathe" cx={KULA.x} cy={KULA.y} r={22} fill={url("bindu-glow")} />
        <circle cx={KULA.x} cy={KULA.y} r={4.6} fill="var(--art-core)" />
        <circle cx={KULA.x} cy={KULA.y} r={7.4} stroke="var(--gold)" strokeWidth={0.8} />
      </g>

      {/* Before the door, the outward rite: a lamp and a cup */}
      <g {...part("kaula")}>
        <g transform={`translate(${RITE.lamp.x} ${RITE.lamp.y}) scale(2)`}>
          <Lamp k={0} />
        </g>
        <g transform={`translate(${RITE.cup.x} ${RITE.cup.y}) scale(0.8)`}>
          <NectarCup glow={url("nectar-glow")} />
        </g>
      </g>

      {/* The inward worship: a column through the six centres of the body */}
      <g {...part("practice")}>
        <path d={`M ${AXIS.x} ${AXIS.bottom} V ${AXIS.top}`} stroke={url("axis")} strokeWidth={1.6} strokeLinecap="round" />
        {CENTRES.map((c) => (
          <g key={c.k} transform={`translate(${AXIS.x} ${c.y}) scale(${c.k === 3 ? 0.46 : 0.34})`}>
            <OpenLotus pad={false} />
          </g>
        ))}
      </g>

      {/* Her light, within the samaya, in the lotus of the heart */}
      <g {...part("samaya")}>
        <circle className="m-shimmer m-late" cx={AXIS.x} cy={HEART.y} r={90} fill={url("glow")} />
        <circle className="m-breathe" cx={AXIS.x} cy={HEART.y - 6} r={22} fill={url("bindu-glow")} />
        <circle cx={AXIS.x} cy={HEART.y - 6} r={4.6} fill="var(--art-core)" />
        <circle cx={AXIS.x} cy={HEART.y - 6} r={7.4} stroke="var(--gold)" strokeWidth={0.8} />
      </g>
    </svg>
  );
}
