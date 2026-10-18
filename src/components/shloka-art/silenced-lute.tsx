/**
 * Shloka 11 — "The lute silenced, and a mind gone under".
 *
 * The verse stops describing her and records two casualties, and the artwork
 * draws both, one above the other with her light between. Above the card,
 * Sarasvatī's kacchapī, the lute with a tortoise-shell bowl, lies put away
 * under its cloth cover, as Saundaryalaharī 66 tells it. Below, the light of
 * her faint smile has become a flood, seen from the side, and the crescent
 * Kāmeśa wears, his mind, sinks through it and does not come up. Which name
 * each part answers to is written up for readers in the registry, next to
 * this artwork's entry.
 */

import type { CSSProperties } from "react";

import { artIds, Embers, type Ember, litPart, partProps, round } from "./primitives";
import type { ArtProps } from "./types";

const CX = 320;

/** Her light, a little above the flood it fills. Small: the smile is manda, faint. */
const BINDU = { x: CX, y: 446 };

/* ── The flood ──────────────────────────────────────────────────────────── */

/** The level surface of the flood. */
const SURF = 486;
const FLOOD = `M -20 ${SURF} H 660 V 830 H -20 Z`;
const ABOVE = `M -20 0 H 660 V ${SURF} H -20 Z`;

/** A gently wavering current `depth` below the surface. */
function current(depth: number, phase: number) {
  const amp = 1.4 + depth / 90;
  return Array.from({ length: 69 }, (_, i) => {
    const x = -20 + i * 10;
    const y = SURF + depth + amp * Math.sin((2 * Math.PI * x) / 130 + phase);
    return `${i ? "L" : "M"} ${x} ${round(y)}`;
  }).join(" ");
}

const CURRENTS = [
  { d: 22, o: 0.5 },
  { d: 52, o: 0.44 },
  { d: 90, o: 0.36 },
  { d: 136, o: 0.28 },
  { d: 192, o: 0.2 },
  { d: 258, o: 0.12 },
].map((c, i) => ({ ...c, path: current(c.d, i * 1.7) }));

/** Shafts of her light going down into the flood, fanning out from under her. */
const SHAFT_LEN = 300;
const SHAFTS = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map((k) => {
  const x = CX + k * 19;
  const deg = (k * 6.5 * Math.PI) / 180;
  const w0 = 7 - Math.abs(k) * 0.5;
  const w1 = 30 - Math.abs(k) * 2;
  const bx = x + SHAFT_LEN * Math.sin(deg);
  const by = SURF + SHAFT_LEN * Math.cos(deg);
  const nx = Math.cos(deg);
  const ny = -Math.sin(deg);
  return {
    d: `M ${round(x - w0 * nx)} ${round(SURF - w0 * ny)} L ${round(bx - w1 * nx)} ${round(by - w1 * ny)} L ${round(bx + w1 * nx)} ${round(by + w1 * ny)} L ${round(x + w0 * nx)} ${round(SURF + w0 * ny)} Z`,
    o: round(0.5 - Math.abs(k) * 0.07),
  };
});

/** Kāmeśa's mind: the crescent he wears, going under on its side. */
const MIND = { x: 246, y: 628, r: 32, tilt: 244 };
const SINK: CSSProperties = { "--dur": "32s", "--delay": "-9s" } as CSSProperties;
const CRESCENT = litPart(4, MIND.r);

/** Pearls of light rising from it, to break at the surface. */
const BUBBLES: Ember[] = [
  { x: 252, y: 598, r: 2.6, dx: -6, dur: 9, delay: -1 },
  { x: 266, y: 604, r: 1.7, dx: 4, dur: 11, delay: -4.5 },
  { x: 244, y: 606, r: 1.3, dx: -2, dur: 8, delay: -6 },
  { x: 272, y: 612, r: 2.1, dx: 7, dur: 10, delay: -8 },
  { x: 236, y: 600, r: 1.5, dx: -8, dur: 12, delay: -2.5 },
  { x: 258, y: 594, r: 3, dx: 2, dur: 13, delay: -10 },
];

/* ── Lake Mānasa: Kailāsa on the far shore, and the haṃsas coming down ──── */

const RIDGES = [
  "M 404 486 L 424 478 L 436 481 L 452 472 L 466 476 L 480 470 L 494 486 Z",
  "M 548 486 L 562 472 L 576 476 L 592 468 L 606 476 L 618 474 L 640 486 Z",
];
/** Kailāsa: a broad dome with steep faces, its south face split by one gully and crossed by bands of rock. */
const KAILASA = "M 474 486 C 486 474 492 462 496 452 C 500 440 508 436 518 436 C 528 436 536 440 540 452 C 544 462 550 474 562 486 Z";
const SNOW = "M 497 450 C 501 440 508 436 518 436 C 528 436 535 440 539 450 C 536 454 534 452 531 456 C 528 452 525 455 520.5 452 L 518 470 L 515.5 452 C 511 455 508 452 505 456 C 502 452 500 454 497 450 Z";
const KAILASA_LINES = ["M 518 438 L 518 470", "M 503 462 Q 510 459 515 462", "M 521 462 Q 526 459 533 462", "M 496 472 Q 506 468 515 472", "M 521 472 Q 530 468 540 472"];

/** In flight, heading left and coming down to the water, wings by turns raised and lowered. */
const GEESE = [
  { x: 452, y: 432, up: true },
  { x: 474, y: 422, up: false },
  { x: 497, y: 413, up: true },
  { x: 521, y: 406, up: false },
];
const GOOSE_BODY = "M -5.5 0 C -4 -2.6 3 -2.8 5.5 -0.8 L 9 -2 L 8 1.2 C 4 2.6 -3 2.6 -5.5 0 Z";
const GOOSE_NECK = "M -4.5 -0.6 Q -8.5 -1.8 -11 -1.6";
const GOOSE_BEAK = "M -13.2 -2.1 L -16 -1.4 L -13.2 -0.9 Z";
const WING_UP = "M -1.5 -1.6 C 0 -7 3 -11 7.5 -12.5 C 6.2 -8.4 4.6 -4.4 3 -1.4 Z";
const WING_UP_FAR = "M 0.5 -1.8 C 1.5 -5.5 3.4 -8.4 6 -10 C 5.6 -6.8 4.6 -4 3.6 -1.8 Z";
const WING_DOWN = "M -1.5 0.8 C 0 5.4 3 8.6 7 9.6 C 5.8 6.4 4.4 3.4 3 0.8 Z";
const WING_DOWN_FAR = "M -2 -1.4 C -0.6 -4.2 1.2 -6 3.4 -7 C 3.4 -4.8 3 -3 2.4 -1.6 Z";

/* ── The kacchapī ───────────────────────────────────────────────────────── */

/**
 * Drawn in its own frame: the centre of the bowl's soundboard at the origin,
 * the neck running off to −x. The bowl hangs below the soundboard, as a lute
 * lying on its back is seen from the side.
 */
const LUTE = "translate(440 145) rotate(-2)";
const BOWL = { rx: 70, ry: 37 };
const SHELL = `M ${-BOWL.rx} 0 A ${BOWL.rx} ${BOWL.ry} 0 0 0 ${BOWL.rx} 0 Z`;
const NUT = -232;
const BRIDGE = 36;
const JOINT = -BOWL.rx - 2;

const NECK = `M ${JOINT} -6 L ${NUT - 4} -4.5 L ${NUT - 4} 8 L ${JOINT} 11 Z`;
const PEGBOX = `M ${NUT - 4} -6 L ${NUT - 32} -5 Q ${NUT - 37} 2 ${NUT - 32} 9 L ${NUT - 4} 8 Z`;
const SCROLL = `M ${NUT - 33} 3 C ${NUT - 45} 1 ${NUT - 53} 9 ${NUT - 51} 18 C ${NUT - 49} 26 ${NUT - 39} 27 ${NUT - 37} 21 C ${NUT - 35} 16 ${NUT - 41} 14 ${NUT - 43} 18`;
const PEGS = [
  { x: NUT - 9, up: true },
  { x: NUT - 15, up: false },
  { x: NUT - 22, up: true },
  { x: NUT - 28, up: false },
];
const GOURD = { x: NUT + 28, y: 23, r: 13 };

/** Frets from the nut toward the bowl, closing up as a lute's do, stopping short of the bowl. */
const FRETS = Array.from({ length: 18 }, (_, i) => round(NUT + (BRIDGE - NUT) * (1 - 2 ** (-(i + 1) / 12)))).filter((x) => x < JOINT - 6);

/** The tortoise's plates on the bare part of the shell: a hexagonal tiling, clipped to the bowl. */
const PLATE = 11;
const PLATES = (() => {
  const hex = (cx: number, cy: number) =>
    Array.from({ length: 6 }, (_, k) => {
      const t = ((60 * k + 30) * Math.PI) / 180;
      return `${k ? "L" : "M"} ${round(cx + PLATE * Math.cos(t))} ${round(cy + PLATE * 0.78 * Math.sin(t))}`;
    }).join(" ") + " Z";
  const w = PLATE * Math.sqrt(3);
  const h = PLATE * 0.78 * 1.5;
  const out: string[] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = -5; col <= 2; col++) {
      out.push(hex(round(col * w + (row % 2 ? w / 2 : 0)), round(9 + row * h)));
    }
  }
  return out.join(" ");
})();

/**
 * Her cover (cola), thrown over the bowl from the bridge end: it falls past
 * the bowl in pleats, and its bordered hem slants back across the shell.
 */
const SCALLOPS = [80, 70, 60, 50, 40, 31];
const HEM_Y = 45;
const CLOTH_BOTTOM = SCALLOPS.slice(1)
  .map((x, i) => `Q ${round((SCALLOPS[i] + x) / 2)} ${HEM_Y + 6 + (i % 2)} ${x} ${round(HEM_Y - i * 0.6)}`)
  .join(" ");
const CLOTH_EDGE = `M 80 ${HEM_Y} ${CLOTH_BOTTOM} C 16 28 2 12 -10 -7`;
const CLOTH = `M -10 -7 C 8 -13 30 -16 50 -14 C 64 -12 74 -7 78 0 C 80 14 80 32 80 ${HEM_Y} ${CLOTH_BOTTOM} C 16 28 2 12 -10 -7 Z`;
const PLEATS = [12, 25, 37, 48, 58, 67, 75].map((x, i) => `M ${x} -20 C ${x + 2} 4 ${x - 2} 26 ${x + (i % 2 ? 1 : -1)} 60`);
const CLOTH_DOTS = [
  [6, -9], [24, -12], [44, -13], [64, -9],
  [14, 6], [30, 2], [46, 4], [62, 6], [74, 12],
  [32, 18], [46, 20], [62, 22], [74, 28],
  [44, 34], [58, 36], [70, 38],
].map(([x, y]) => ({ x, y }));
const FRINGE = SCALLOPS.map((x, i) => ({ x, y: round(HEM_Y - i * 0.6) }));

export function SilencedLute({ idPrefix = "sa11", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={BINDU.x} cy={BINDU.y} r={300} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.5 }} />
          <stop offset="0.25" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.24 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("meet")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.85 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("flood")} x1={0} y1={SURF} x2={0} y2={830} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.66 }} />
          <stop offset="0.1" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.48 }} />
          <stop offset="0.38" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.3 }} />
          <stop offset="0.72" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.08 }} />
        </linearGradient>
        <linearGradient id={id("shaft")} x1={0} y1={SURF} x2={0} y2={SURF + SHAFT_LEN} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-core)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("shaft-pale")} x1={0} y1={SURF} x2={0} y2={SURF + SHAFT_LEN} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-ivory)", stopOpacity: 0.55 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-ivory)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-ivory)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("sides")} x1={0} y1={0} x2={640} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.2" stopColor="#fff" />
          <stop offset="0.8" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id={id("sides-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("sides")} />
        </mask>
        <clipPath id={id("above")}>
          <path d={ABOVE} />
        </clipPath>
        <clipPath id={id("below")}>
          <path d={FLOOD} />
        </clipPath>
        <clipPath id={id("shell")}>
          <path d={SHELL} />
        </clipPath>
        <clipPath id={id("cloth")}>
          <path d={CLOTH} />
        </clipPath>
      </defs>

      {/* Her light, faint, a little above the flood it fills */}
      <g {...part("light")}>
        <circle className="m-shimmer" cx={BINDU.x} cy={BINDU.y} r={300} fill={url("glow")} />
        <ellipse className="m-shimmer m-late" cx={CX} cy={SURF} rx={130} ry={16} fill={url("meet")} />
        <circle className="m-shimmer" cx={BINDU.x} cy={BINDU.y} r={14} fill={url("bindu-glow")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={6} stroke="var(--art-core)" strokeWidth={0.7} />
        <circle cx={BINDU.x} cy={BINDU.y} r={3.2} fill="var(--art-core)" />
      </g>

      {/* Lake Mānasa: Kailāsa beyond the flood, and the haṃsas coming down to it */}
      <g {...part("manasa")}>
        <g clipPath={url("above")} strokeLinejoin="round">
          <path d={RIDGES.join(" ")} fill="var(--gold-soft)" fillOpacity={0.18} stroke="var(--gold-soft)" strokeWidth={0.7} />
          <path d={KAILASA} fill="var(--gold-soft)" fillOpacity={0.3} stroke="var(--gold)" strokeWidth={0.8} />
          <path d={SNOW} fill="var(--art-moon)" />
          <path d={KAILASA} stroke="var(--gold)" strokeWidth={0.8} />
          <path d={KAILASA_LINES.join(" ")} stroke="var(--gold)" strokeWidth={0.6} strokeOpacity={0.6} strokeLinecap="round" />
        </g>
        {GEESE.map((g, i) => (
          <g key={i} transform={`translate(${g.x} ${g.y}) rotate(-14) scale(1.25)`}>
            <path d={g.up ? WING_UP_FAR : WING_DOWN_FAR} fill="var(--gold-soft)" />
            <path d={GOOSE_BODY} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
            <path d={GOOSE_NECK} stroke="var(--art-moon)" strokeWidth={1.5} strokeLinecap="round" />
            <path d={GOOSE_NECK} stroke="var(--gold)" strokeWidth={0.35} strokeOpacity={0.8} />
            <circle cx={-12} cy={-1.6} r={1.6} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.4} />
            <path d={GOOSE_BEAK} fill="var(--art-saffron)" />
            <path d={g.up ? WING_UP : WING_DOWN} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.5} strokeLinejoin="round" />
          </g>
        ))}
      </g>

      {/* The flood of light from her smile, seen from the side, and Kāmeśa's mind going under in it */}
      <g {...part("flood")}>
        <g mask={url("sides-mask")}>
          <path d={FLOOD} fill={url("flood")} />
          <g className="m-shimmer m-later">
            {SHAFTS.map((s, i) => (
              <g key={i} fillOpacity={s.o}>
                <path d={s.d} fill={url("shaft")} />
                <path d={s.d} fill={url("shaft-pale")} />
              </g>
            ))}
          </g>
          <g className="m-shimmer m-late" stroke="var(--gold)" strokeWidth={0.8} strokeDasharray="28 7 14 9">
            {CURRENTS.map((c) => (
              <path key={c.d} d={c.path} strokeOpacity={c.o} />
            ))}
          </g>
          <path d={`M -20 ${SURF + 2.5} H 660`} stroke="var(--art-core)" strokeWidth={3} strokeOpacity={0.55} />
          <path d={`M -20 ${SURF} H 660`} stroke="var(--gold)" strokeWidth={1.3} />
        </g>
        <g clipPath={url("below")} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.4}>
          <Embers embers={BUBBLES} />
        </g>
        <g className="m-sink" style={SINK}>
          <g transform={`translate(${MIND.x} ${MIND.y}) rotate(${MIND.tilt})`}>
            <path d={CRESCENT} stroke="var(--art-moon)" strokeWidth={10} strokeOpacity={0.16} strokeLinejoin="round" />
            <path d={CRESCENT} stroke="var(--art-moon)" strokeWidth={4.5} strokeOpacity={0.26} strokeLinejoin="round" />
            <path d={CRESCENT} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.4} strokeLinejoin="round" />
            <path d={CRESCENT} fill="var(--art-saffron)" fillOpacity={0.14} />
          </g>
        </g>
      </g>

      {/* Sarasvatī's kacchapī, put away under its cloth cover, its strings still */}
      <g {...part("lute")}>
        <g transform={LUTE}>
          <path d={NECK} fill="var(--gold)" />
          <path d={`M ${JOINT} 8 L ${NUT - 4} 5.5`} stroke="var(--art-carve)" strokeWidth={0.8} strokeOpacity={0.7} />
          <path d={`M ${JOINT} -3.4 L ${NUT - 4} -2.6`} stroke="var(--gold-soft)" strokeWidth={1.2} />
          <rect x={JOINT - 6} y={-7} width={7} height={19} rx={1.5} fill="var(--gold-soft)" stroke="var(--art-carve)" strokeWidth={0.5} />

          <path d={`M ${GOURD.x - 3.5} 8 V ${GOURD.y - GOURD.r + 2} H ${GOURD.x + 3.5} V 8 Z`} fill="var(--gold-soft)" />
          <circle cx={GOURD.x} cy={GOURD.y} r={GOURD.r} fill="var(--gold)" />
          <path d={`M ${GOURD.x - GOURD.r + 1} ${GOURD.y} Q ${GOURD.x} ${GOURD.y + 4} ${GOURD.x + GOURD.r - 1} ${GOURD.y}`} stroke="var(--art-carve)" strokeWidth={0.7} />
          <path d={`M ${GOURD.x - 8} ${GOURD.y - 4} Q ${GOURD.x - 6} ${GOURD.y - 9} ${GOURD.x - 1} ${GOURD.y - 10}`} stroke="var(--art-core)" strokeWidth={1.2} strokeOpacity={0.7} strokeLinecap="round" />

          <path d={PEGBOX} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          <path d={SCROLL} stroke="var(--gold)" strokeWidth={3.4} strokeLinecap="round" />
          <path d={SCROLL} stroke="var(--art-carve)" strokeWidth={0.6} strokeOpacity={0.6} />
          {PEGS.map((p) => (
            <g key={p.x}>
              <path d={`M ${p.x} ${p.up ? -5 : 8} V ${p.up ? -13 : 16}`} stroke="var(--gold)" strokeWidth={2.2} />
              <circle cx={p.x} cy={p.up ? -15 : 18} r={3} fill="var(--gold-soft)" stroke="var(--art-carve)" strokeWidth={0.5} />
            </g>
          ))}

          <rect x={NUT - 4} y={-8} width={4} height={4} fill="var(--gold-soft)" />
          <path d={`M ${NUT} -6.5 L ${JOINT - 6} -7.5`} stroke="var(--art-carve)" strokeWidth={2.4} strokeOpacity={0.55} />
          <g stroke="var(--gold)" strokeWidth={1.4} strokeLinecap="round">
            {FRETS.map((x) => (
              <path key={x} d={`M ${x} -7 V -11.5`} />
            ))}
          </g>

          <path d={SHELL} fill="var(--gold)" />
          <g clipPath={url("shell")}>
            <path d={PLATES} stroke="var(--art-carve)" strokeWidth={0.9} strokeOpacity={0.8} strokeLinejoin="round" />
            <path d={`M ${-BOWL.rx + 5} 0 A ${BOWL.rx - 5} ${BOWL.ry - 5} 0 0 0 ${BOWL.rx - 5} 0`} stroke="var(--art-carve)" strokeWidth={0.9} strokeOpacity={0.8} />
          </g>
          <path d={`M ${-BOWL.rx + 10} 11 Q ${-BOWL.rx + 17} 28 ${-BOWL.rx + 35} 35`} stroke="var(--art-core)" strokeWidth={1.6} strokeOpacity={0.6} strokeLinecap="round" />
          <ellipse rx={BOWL.rx} ry={7} fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth={1} />

          <g stroke="var(--gold-soft)" strokeWidth={0.55}>
            <path d={`M ${NUT} -12 L ${BRIDGE} -15`} />
            <path d={`M ${NUT} -13.4 L ${BRIDGE} -17`} />
          </g>

          <path d={CLOTH} fill="var(--art-vermilion)" />
          <g clipPath={url("cloth")}>
            <g stroke="var(--art-crimson)" strokeWidth={1.2} strokeOpacity={0.45} strokeLinecap="round">
              {PLEATS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <g fill="var(--gold-soft)">
              {CLOTH_DOTS.map((p) => (
                <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r={1.1} />
              ))}
            </g>
            <path d={CLOTH_EDGE} stroke="var(--gold-soft)" strokeWidth={15} strokeLinejoin="round" />
            <path d={CLOTH_EDGE} stroke="var(--art-vermilion)" strokeWidth={9} strokeLinejoin="round" />
            <path d={CLOTH_EDGE} stroke="var(--gold)" strokeWidth={6} strokeLinejoin="round" strokeDasharray="1.6 2.4" />
          </g>
          <path d={CLOTH_EDGE} stroke="var(--gold)" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
          <g stroke="var(--gold)" strokeWidth={1} strokeLinecap="round">
            {FRINGE.map((f) => (
              <path key={f.x} d={`M ${f.x} ${f.y + 2} L ${f.x} ${f.y + 8}`} />
            ))}
          </g>
          <circle cx={80} cy={HEM_Y + 2} r={2.6} fill="var(--gold)" />
          <path d={`M 80 ${HEM_Y + 4} l -2 11 M 80 ${HEM_Y + 4} l 1 12 M 80 ${HEM_Y + 4} l 3.5 10`} stroke="var(--gold)" strokeWidth={1} strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
