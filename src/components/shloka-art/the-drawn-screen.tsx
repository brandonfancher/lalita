/**
 * Shloka 64 — "The five acts, and the last of them is grace".
 *
 * The five acts as a temple keeps them, at the door of a sanctum when the
 * screen is drawn. Inside, her light rests on the couch of the five Brahmās,
 * the same five who lay inert under her in Shloka 61, every one of them lit
 * and at work. A vermilion screen hangs before the door, one half still drawn
 * across, the other pulled aside and tied, on a rod whose cord runs up out of
 * sight. Through the opening her light spills over the threshold and down the
 * steps. The couch's plank, which is Sadāśiva, is white as crystal. Beside
 * the door Rudra's trident rises from the ground into the crown with fire on
 * its points, and the worlds are drawn in a spiral into that fire, as a breath
 * is taken in. Which name each part answers to is written up for readers in
 * the registry, next to this artwork's entry.
 */

import { BrahmaCouch, Damaru, Trident, artIds, eggPath, glint, partProps, round, tongue, trident } from "./primitives";
import type { ArtProps } from "./types";

const CX = 320;
const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── The sanctum door ──────────────────────────────────────────────────── */

const FLOOR = 592;
const DOOR = { x0: 214, x1: 426, top: 428 };
const JAMB = 20;
const LINTEL = { x0: 176, x1: 464, y0: 404, y1: DOOR.top };
const CORNICE_Y = 398;
const CORNICE = { x0: 168, x1: 472, y0: CORNICE_Y };
const STEPS = [
  { x0: 186, x1: 454, y: FLOOR, h: 9 },
  { x0: 174, x1: 466, y: FLOOR + 9, h: 13 },
  { x0: 160, x1: 480, y: FLOOR + 22, h: 13 },
  { x0: 146, x1: 494, y: FLOOR + 35, h: 13 },
];
const ROSETTES = Array.from({ length: 17 }, (_, i) => round(LINTEL.x0 + 16 + i * 16));
const SCALLOPS = Array.from({ length: 35 }, (_, i) => `M ${LINTEL.x0 + 4 + i * 8} 421 q 4 4 8 0`).join(" ");
/** A creeper up each jamb: a stem with paired leaves. */
const CREEPER = [DOOR.x0 - JAMB / 2, DOOR.x1 + JAMB / 2]
  .map((x) =>
    [
      `M ${x} ${DOOR.top + 8} V ${FLOOR - 8}`,
      ...Array.from({ length: 12 }, (_, k) => {
        const y = DOOR.top + 16 + k * 12.6;
        return `M ${x} ${round(y)} q -4.4 -2 -5.6 -6.4 M ${x} ${round(y + 6)} q 4.4 -2 5.6 -6.4`;
      }),
    ].join(" "),
  )
  .join(" ");

/* ── The couch, and her light on it ────────────────────────────────────── */

const COUCH_K = 1.4;
const PLANK = -34;
const LIGHT = { x: CX, y: 532 };
const PLANK_Y = round(FLOOR + PLANK * COUCH_K);
/** Facets in the crystal of the plank. */
const PLANK_FACETS = Array.from({ length: 9 }, (_, k) => {
  const x = round(CX - 66 + k * 16.5);
  return `M ${x} ${PLANK_Y + 1} l ${k % 2 ? 6 : -6} ${round(7 * COUCH_K - 2)}`;
}).join(" ");
const MEDALS = [-48, -16, 16, 48].map((dx) => ({ x: round(CX + dx * COUCH_K), y: round(FLOOR + (PLANK + 16) * COUCH_K) }));

/* ── The screen ────────────────────────────────────────────────────────── */

const ROD_Y = 436;
/** The half still drawn across, its leading edge bowed a little where it was tugged. */
const PANEL = `M 216 ${ROD_Y} H 288 C 285 480 289 540 292 586 L 216 586 Z`;
const PANEL_FOLDS = [230, 246, 262, 276].map((x) => `M ${x} ${ROD_Y + 3} C ${x + 3} 486 ${x - 3} 536 ${x + 1} 584`).join(" ");
const PANEL_EDGE = "M 282 440 C 279 482 283 540 286 580 L 220 580";
const PANEL_FRINGE = Array.from({ length: 13 }, (_, k) => `M ${round(219 + k * 5.8)} 587 v 4.4`).join(" ");
const PANEL_WEAVE = Array.from({ length: 9 }, (_, k) => {
  const x = round(226 + k * 7.6);
  return `M ${x} 568 l 3 -3.6 l 3 3.6 l -3 3.6 Z`;
}).join(" ");
/** The half pulled aside: swagged from the rod down to the tie, then hanging by the jamb. */
const TIE = { x: 410, y: 506 };
const SWAG = `M 356 ${ROD_Y} H 424 V 586 H 402 C 402 556 404 528 ${TIE.x - 2} ${TIE.y} C 396 482 372 458 356 ${ROD_Y} Z`;
const SWAG_FOLDS = [
  ...[368, 384, 400, 414].map((x) => `M ${TIE.x} ${TIE.y} Q ${round((x + TIE.x) / 2 + 4)} ${round((ROD_Y + TIE.y) / 2)} ${x} ${ROD_Y + 3}`),
  `M ${TIE.x + 2} ${TIE.y + 4} C 410 540 408 560 409 584`,
  `M ${TIE.x + 8} ${TIE.y + 2} C 418 540 416 560 417 584`,
].join(" ");
const SWAG_EDGE = `M 362 440 C 376 460 398 482 ${TIE.x - 6} ${TIE.y - 4}`;
const RINGS = [220, 232, 244, 256, 268, 280, 362, 374, 386, 398, 410, 420];

/* ── The rod and its cord ──────────────────────────────────────────────── */

const FINIALS = [DOOR.x0 - 10, DOOR.x1 + 10];
/** From the tie, up inside the jamb, over the finial, and up out of sight behind the card. */
const CORD = `M ${TIE.x + 4} ${TIE.y - 2} C 420 490 421 470 421 450 C 421 440 428 432 ${FINIALS[1]} 430 C 446 424 450 414 452 380`;
const TASSEL_CORD = `M ${TIE.x + 2} ${TIE.y + 3} C 404 518 398 528 396 536`;
const TASSEL = { x: 396, y: 536 };

/* ── Rudra's trident, from the ground into the crown ──────────────────── */

const TRI_X = 504;
const TRI_TOP = 78;
const TRI_S = 1.2;
const TRI = trident(0, TRI_TOP, 628, TRI_S);
const TRI_FLAMES = [
  { x: 0, y: round(TRI_TOP - 4 * TRI_S), s: 1.3 },
  { x: round(-15 * TRI_S), y: round(TRI_TOP + 8 * TRI_S), s: 0.95 },
  { x: round(15 * TRI_S), y: round(TRI_TOP + 8 * TRI_S), s: 0.95 },
];
/** Where the worlds are drawn in: into the fire on the trident's middle point. */
const FIRE = { x: TRI_X, y: round(TRI_TOP - 16) };

/* ── The worlds drawn in ───────────────────────────────────────────────── */

/** Fourteen worlds on a spiral of a turn and a quarter, shrinking as they near the fire. */
const WORLDS = Array.from({ length: 14 }, (_, i) => {
  const t = i / 13;
  const r = 136 - 112 * t ** 0.85;
  const a = ((196 + 450 * t) * Math.PI) / 180;
  const x = round(FIRE.x + Math.cos(a) * r * 1.02);
  const y = round(FIRE.y - Math.sin(a) * r * 0.56 + 34 * (1 - t));
  const h = round(12.5 - 8.5 * t);
  return { x, y, h, w: round(h * 0.78), tilt: round(Math.cos(a) * 18), i };
});
/* ── The sanctum, brought up a tenth from the lintel down ──────────────── */

const ZOOM = `translate(${CX} ${CORNICE_Y}) scale(1.1) translate(${-CX} ${-CORNICE_Y})`;

/* ── The spider under the lintel ───────────────────────────────────────── */

const WEB_AT = { x: DOOR.x1 + JAMB, y: LINTEL.y1 };
const WEB_SPOKES = [270, 292, 315, 338, 360].map((deg) => {
  const a = (deg * Math.PI) / 180;
  return { x: round(WEB_AT.x + Math.cos(a) * 26), y: round(WEB_AT.y - Math.sin(a) * 26) };
});
const WEB = [
  ...WEB_SPOKES.map((p) => `M ${WEB_AT.x} ${WEB_AT.y} L ${p.x} ${p.y}`),
  ...[8, 14, 20, 25].map((r) =>
    [270, 292, 315, 338, 360]
      .map((deg, k) => {
        const a = (deg * Math.PI) / 180;
        const x = round(WEB_AT.x + Math.cos(a) * r);
        const y = round(WEB_AT.y - Math.sin(a) * r);
        return `${k ? "L" : "M"} ${x} ${y}`;
      })
      .join(" "),
  ),
].join(" ");
const SPIDER = { x: 458, y: 468 };
const SPIDER_LEGS = [-1, 1]
  .flatMap((side) =>
    [
      [-3.6, -4.6],
      [-1.2, -6],
      [1.4, -5.4],
      [3.4, -3.6],
    ].map(([dy, dx]) => `M 0 ${dy * 0.4} q ${side * dx * -0.6} ${dy - 1.4} ${side * dx * -1} ${dy + 1.6}`),
  )
  .join(" ");

export function TheDrawnScreen({ idPrefix = "sa64", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  const worlds = WORLDS.map((e) => (
    <g key={e.i} transform={`rotate(${e.tilt} ${e.x} ${e.y})`}>
      <path d={eggPath(e.x, e.y, e.w, e.h)} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.9} />
      <path d={eggPath(e.x, e.y, e.w, e.h)} fill="var(--art-saffron)" fillOpacity={0.2} />
      <path className={TWINKLE[e.i % 3]} d={glint(round(e.h * 0.42))} transform={`translate(${e.x} ${round(e.y + e.h * 0.1)})`} fill="var(--art-saffron)" />
    </g>
  ));

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("within")} cx={LIGHT.x} cy={LIGHT.y} r={150} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.55 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-crimson)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-crimson)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("halo")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
          <stop offset="0.55" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
          <stop offset="0.75" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("spill")} x1={0} y1={FLOOR} x2={0} y2={740} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.7 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={id("fire")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.7 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("crystal")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.8 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The door of the sanctum, its dark inside, its threshold and steps */}
      <g {...part("sanctum")}>
        <g transform={ZOOM}>
        <rect x={DOOR.x0} y={DOOR.top} width={DOOR.x1 - DOOR.x0} height={FLOOR - DOOR.top} fill="var(--art-musk)" fillOpacity={0.82} />
        <rect x={DOOR.x0} y={DOOR.top} width={DOOR.x1 - DOOR.x0} height={FLOOR - DOOR.top} fill={url("within")} />
        {[...STEPS].reverse().map((s) => (
          <g key={s.y}>
            <rect x={s.x0} y={s.y} width={s.x1 - s.x0} height={s.h} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.8} />
            <path d={`M ${s.x0} ${s.y + 0.5} H ${s.x1}`} stroke="var(--gold)" strokeWidth={1.4} />
            <path d={`M ${s.x0 + 2} ${s.y + s.h - 2} H ${s.x1 - 2}`} stroke="var(--art-carve)" strokeWidth={1.4} strokeOpacity={0.5} />
          </g>
        ))}
        {[DOOR.x0 - JAMB, DOOR.x1].map((x) => (
          <g key={x}>
            <rect x={x} y={DOOR.top} width={JAMB} height={FLOOR - DOOR.top} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1} />
            <rect x={x + 3.5} y={DOOR.top + 4} width={JAMB - 7} height={FLOOR - DOOR.top - 8} stroke="var(--gold-soft)" strokeWidth={0.7} />
          </g>
        ))}
        <path d={CREEPER} stroke="var(--gold)" strokeWidth={0.8} strokeLinecap="round" />
        <rect x={LINTEL.x0} y={LINTEL.y0} width={LINTEL.x1 - LINTEL.x0} height={LINTEL.y1 - LINTEL.y0} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={1.1} />
        <rect x={CORNICE.x0} y={CORNICE.y0} width={CORNICE.x1 - CORNICE.x0} height={LINTEL.y0 - CORNICE.y0} rx={1.5} fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth={1} />
        <path d={SCALLOPS} stroke="var(--gold-soft)" strokeWidth={0.8} />
        <g fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.5}>
          {ROSETTES.map((x) => (
            <circle key={x} cx={x} cy={412} r={2.2} />
          ))}
        </g>
        <circle cx={CX} cy={414} r={7.6} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
        <circle cx={CX} cy={414} r={3.6} fill="var(--art-vermilion)" />
        </g>
      </g>

      {/* The couch of the five Brahmās, every one of them lit and at work */}
      <g {...part("couch")}>
        <g transform={ZOOM}>
        {MEDALS.map((m, i) => (
          <circle key={i} className="m-shimmer" cx={m.x} cy={m.y} r={20} fill={url("halo")} />
        ))}
        <g transform={`translate(${CX} ${FLOOR}) scale(${COUCH_K})`}>
          <BrahmaCouch cx={0} plank={PLANK} floor={0} />
        </g>
        </g>
      </g>

      {/* Sadāśiva, the couch's plank, white as crystal, lit */}
      <g {...part("sadasiva")}>
        <g transform={ZOOM}>
          <ellipse className="m-shimmer" cx={CX} cy={PLANK_Y + 6} rx={98} ry={16} fill={url("crystal")} />
          <rect x={round(CX - 56 * COUCH_K)} y={PLANK_Y} width={round(112 * COUCH_K)} height={round(7 * COUCH_K)} rx={2.6} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.4} />
          <path d={PLANK_FACETS} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.8} />
          <path d={`M ${round(CX - 52 * COUCH_K)} ${PLANK_Y + 2.4} H ${round(CX + 52 * COUCH_K)}`} stroke="var(--art-ivory)" strokeWidth={1.6} />
        </g>
      </g>

      {/* The screen: one half still drawn across, the other pulled aside and tied */}
      <g {...part("screen")}>
        <g transform={ZOOM}>
        <path d={PANEL} fill="var(--art-vermilion)" fillOpacity={0.9} stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round" />
        <path d={PANEL_FOLDS} stroke="var(--art-crimson)" strokeWidth={2.2} strokeOpacity={0.5} strokeLinecap="round" />
        <path d={PANEL_EDGE} stroke="var(--gold-soft)" strokeWidth={1.4} />
        <path d="M 220 562 H 288 M 220 574 H 289" stroke="var(--gold)" strokeWidth={0.8} />
        <path d={PANEL_WEAVE} fill="var(--gold-soft)" />
        <path d={PANEL_FRINGE} stroke="var(--gold)" strokeWidth={0.9} strokeLinecap="round" />
        <path d={SWAG} fill="var(--art-vermilion)" fillOpacity={0.9} stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round" />
        <path d={SWAG_FOLDS} stroke="var(--art-crimson)" strokeWidth={2} strokeOpacity={0.5} strokeLinecap="round" />
        <path d={SWAG_EDGE} stroke="var(--gold-soft)" strokeWidth={1.4} />
        <path d="M 403 562 H 423 M 403 574 H 423" stroke="var(--gold)" strokeWidth={0.8} />
        <path d={Array.from({ length: 4 }, (_, k) => `M ${round(405 + k * 5)} 587 v 4.4`).join(" ")} stroke="var(--gold)" strokeWidth={0.9} strokeLinecap="round" />
        <ellipse cx={TIE.x + 3} cy={TIE.y} rx={9} ry={3.4} transform={`rotate(-14 ${TIE.x + 3} ${TIE.y})`} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
        <path d={TASSEL_CORD} stroke="var(--gold)" strokeWidth={1} />
        <path d={`M ${TASSEL.x} ${TASSEL.y - 2} C ${TASSEL.x + 4} ${TASSEL.y + 2} ${TASSEL.x + 4} ${TASSEL.y + 10} ${TASSEL.x} ${TASSEL.y + 12} C ${TASSEL.x - 4} ${TASSEL.y + 10} ${TASSEL.x - 4} ${TASSEL.y + 2} ${TASSEL.x} ${TASSEL.y - 2} Z`} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.7} />
        </g>
      </g>

      {/* Her grace: her light on the couch, and the light let out over the threshold */}
      <g {...part("grace")}>
        <g transform={ZOOM}>
        <path d={`M 292 ${FLOOR} L 402 ${FLOOR} L 500 740 L 196 740 Z`} fill={url("spill")} />
        <circle className="m-shimmer" cx={LIGHT.x} cy={LIGHT.y} r={74} fill={url("glow")} />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={13} stroke="var(--art-core)" strokeWidth={1} strokeOpacity={0.85} />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={8} fill="var(--art-saffron)" />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={5} fill="var(--art-core)" />
        <path d={STEPS.map((s) => `M ${round(CX - 50 - (s.y - FLOOR) * 0.8)} ${s.y + 0.5} H ${round(CX + 74 + (s.y - FLOOR) * 0.8)}`).join(" ")} stroke="var(--art-core)" strokeWidth={1.6} strokeOpacity={0.8} />
        </g>
      </g>

      {/* The rod with its crowned finials, and the cord that draws the screen, running up out of sight */}
      <g {...part("cord")}>
        <g transform={ZOOM}>
        <path d={`M ${FINIALS[0]} ${ROD_Y - 2} H ${FINIALS[1]}`} stroke="var(--gold)" strokeWidth={3} strokeLinecap="round" />
        <g stroke="var(--gold)" strokeWidth={1}>
          {RINGS.map((x) => (
            <circle key={x} cx={x} cy={ROD_Y - 1} r={2.6} />
          ))}
        </g>
        {FINIALS.map((x) => (
          <g key={x} transform={`translate(${x} ${ROD_Y - 2})`}>
            <circle r={4.6} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
            <path d="M -4.4 -3 L -4.4 -10 L -2 -7 L 0 -11.6 L 2 -7 L 4.4 -10 L 4.4 -3 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} strokeLinejoin="round" />
            <circle r={1.8} fill="var(--art-vermilion)" />
          </g>
        ))}
        <path d={CORD} stroke="var(--gold)" strokeWidth={1.6} strokeLinecap="round" />
        <path d={CORD} stroke="var(--art-vermilion)" strokeWidth={0.6} strokeDasharray="1.6 2.4" strokeLinecap="round" />
        </g>
      </g>

      {/* Rudra's trident, standing from the ground into the crown, fire on its three points */}
      <g {...part("rudra")}>
        <circle className="m-shimmer" cx={TRI_X} cy={TRI_TOP + 4} r={64} fill={url("fire")} />
        <g transform={`translate(${TRI_X} 0) scale(-1 1)`}>
          <g strokeLinecap="round" strokeLinejoin="round">
            <Trident t={TRI} />
            <Damaru t={TRI} />
          </g>
          {TRI_FLAMES.map((f, i) => (
            <g key={i} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
              <path className="m-flicker" d={tongue(15, 6.4, 0)} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
              <path className="m-flicker m-late" d={tongue(8, 3, 0)} fill="var(--art-core)" fillOpacity={0.9} />
            </g>
          ))}
        </g>
        <path d={`M ${TRI_X - 13} 630 h 26 l -4 -7 h -18 Z`} fill="var(--art-stone)" stroke="var(--gold)" strokeWidth={0.9} strokeLinejoin="round" />
      </g>

      {/* The worlds, drawn in a spiral into the fire as a breath is taken in */}
      <g {...part("gather")}>
        <path d={WORLDS.map((e, i) => `${i ? "L" : "M"} ${e.x} ${e.y}`).join(" ")} stroke="var(--gold-soft)" strokeWidth={0.6} strokeDasharray="1.4 3.2" strokeOpacity={0.8} />
        {worlds}
      </g>

      {/* A spider under the lintel, letting its thread out and drawing it in */}
      <g {...part("spider")}>
        <g transform={ZOOM}>
        <path d={WEB} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.9} />
        <path d={`M ${SPIDER.x} ${LINTEL.y1} V ${SPIDER.y - 3}`} stroke="var(--gold-soft)" strokeWidth={0.6} />
        <g transform={`translate(${SPIDER.x} ${SPIDER.y})`}>
          <path d={SPIDER_LEGS} stroke="var(--art-hair)" strokeWidth={0.7} strokeLinecap="round" />
          <ellipse cy={2.6} rx={2.6} ry={3.2} fill="var(--art-hair)" />
          <circle cy={-1.4} r={1.7} fill="var(--art-hair)" />
          <circle cy={2.4} r={0.8} fill="var(--art-vermilion)" />
        </g>
        </g>
      </g>
    </svg>
  );
}
