/**
 * Shloka 82 — "The vein that carries her consort's life, and a seat in the Punjab".
 *
 * Under the card her light, and from it a vein running to Kāmeśvara's crescent
 * beside her, beads of breath travelling along it: his life goes through her.
 * Below, from left to right: a stone seat daubed with vermilion at the end of a
 * road, a small red flag beside it; a single jasmine flower laid on a leaf, and
 * a fine ray from her light landing on it; a red lotus filled to the brim, a
 * bee asleep in it; and Kāma's own rosy light, his bow of flowers and his five
 * arrows laid down before her. In the right column a drum of heaven sounds
 * and flowers fall. Which name each part answers to is written up for readers
 * in the registry, next to this artwork's entry.
 */

import { artIds, BLOSSOM, FlowerArrow, FlowerBow, glint, hash, litPart, OpenLotus, partProps, round } from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

/* ── Her light, the vein, and Kāmeśvara's crescent ─────────────────────── */

const HER = { x: 300, y: 452 };
const HIS = { x: 474, y: 464, r: 32 };
const VEIN = [HER.x + 10, HER.y + 6, HER.x + 60, HER.y + 64, HIS.x - 70, HIS.y + 60, HIS.x - 4, HIS.y + 6] as const;
const VEIN_PATH = `M ${VEIN[0]} ${VEIN[1]} C ${VEIN[2]} ${VEIN[3]} ${VEIN[4]} ${VEIN[5]} ${VEIN[6]} ${VEIN[7]}`;
function onVein(t: number) {
  const u = 1 - t;
  const b = (a: number, c: number, e: number, g: number) => u * u * u * a + 3 * u * u * t * c + 3 * u * t * t * e + t * t * t * g;
  return { x: round(b(VEIN[0], VEIN[2], VEIN[4], VEIN[6])), y: round(b(VEIN[1], VEIN[3], VEIN[5], VEIN[7])) };
}
const BREATH = [0.18, 0.38, 0.58, 0.78].map((t) => onVein(t));

/* ── The seat at Jālandhara ────────────────────────────────────────────── */

const SEAT = { x: 166, y: 566 };
const ROCK = `M ${SEAT.x - 26} ${SEAT.y + 8} C ${SEAT.x - 30} ${SEAT.y - 2} ${SEAT.x - 22} ${SEAT.y - 12} ${SEAT.x - 14} ${SEAT.y - 14} C ${SEAT.x - 10} ${SEAT.y - 24} ${SEAT.x + 2} ${SEAT.y - 28} ${SEAT.x + 10} ${SEAT.y - 22} C ${SEAT.x + 20} ${SEAT.y - 20} ${SEAT.x + 28} ${SEAT.y - 8} ${SEAT.x + 24} ${SEAT.y + 8} Z`;
const ROAD = `M 104 ${SEAT.y + 30} C 124 ${SEAT.y + 18} 140 ${SEAT.y + 12} ${SEAT.x - 20} ${SEAT.y + 7} L ${SEAT.x - 4} ${SEAT.y + 9} C 150 ${SEAT.y + 20} 130 ${SEAT.y + 34} 104 ${SEAT.y + 52} Z`;

/* ── The small offering, noticed ───────────────────────────────────────── */

const GIFT = { x: 244, y: 590 };

/* ── The brimming lotus ────────────────────────────────────────────────── */

const LOTUS = { x: 380, y: 572, s: 0.9 };

/* ── Kāma, his bow and arrows laid down ────────────────────────────────── */

const KAMA = { x: 560, y: 540 };
const ARROWS = [0, 1, 2, 3, 4].map((k) => ({ x: KAMA.x + 4, y: KAMA.y + 34 + k * 5, deg: -96 + k * 3 }));

/* ── The drums of heaven, and flowers falling ──────────────────────────── */

const DRUM = { x: 566, y: 104, half: 36, r: 18 };
const PETALS = Array.from({ length: 16 }, (_, k) => {
  const col = k % 4;
  return {
    x: round(500 + col * 36 + hash(k, 3) * 30 - 10),
    y: round(160 + Math.floor(k / 4) * 66 + hash(3, k) * 50),
    deg: (k * 47) % 360,
    fill: ["var(--art-vermilion)", "var(--art-saffron)", "var(--lotus)", "var(--art-ivory)"][k % 4],
    dur: 4 + (k % 5) * 0.6,
    delay: -((k * 0.7) % 4),
  };
});

export function LifeVein({ idPrefix = "sa82", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("his")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("kama")}>
          <stop offset="0" style={{ stopColor: "var(--lotus)", stopOpacity: 0.55 }} />
          <stop offset="0.45" style={{ stopColor: "var(--lotus)", stopOpacity: 0.16 }} />
          <stop offset="1" style={{ stopColor: "var(--lotus)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("stone")} x1={0} y1={SEAT.y - 26} x2={0} y2={SEAT.y + 8} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-stone)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)" }} />
        </linearGradient>
        <linearGradient id={id("road")} x1={104} y1={0} x2={SEAT.x} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-turmeric)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--art-turmeric)", stopOpacity: 0.3 }} />
        </linearGradient>
        <linearGradient id={id("ray")} x1={0} y1={HER.y} x2={0} y2={GIFT.y} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.2 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0.9 }} />
        </linearGradient>
      </defs>

      {/* Kāmeśvara's crescent, horns up, his life reaching him by the vein */}
      <g {...part("vein")}>
        <circle cx={HIS.x} cy={HIS.y - 6} r={HIS.r * 1.6} fill={url("his")} />
        <g transform={`translate(${HIS.x} ${HIS.y}) rotate(180)`}>
          <path d={litPart(4, HIS.r)} stroke="var(--art-moon)" strokeWidth={5} strokeOpacity={0.35} strokeLinejoin="round" />
          <path d={litPart(4, HIS.r)} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={1.4} />
        </g>
        <path d={VEIN_PATH} stroke="var(--art-vermilion)" strokeWidth={6} strokeOpacity={0.35} strokeLinecap="round" />
        <path d={VEIN_PATH} stroke="var(--art-crimson)" strokeWidth={0.6} strokeOpacity={0.7} strokeLinecap="round" />
        <path d={VEIN_PATH} stroke="var(--art-core)" strokeWidth={1.4} strokeDasharray="2 6" strokeLinecap="round" />
        {BREATH.map((b, i) => (
          <circle key={i} className={TWINKLE[i % 3]} cx={b.x} cy={b.y} r={2.4} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.4} />
        ))}
      </g>

      {/* Her light */}
      <g {...part("her-light")}>
        <circle className="m-breathe" cx={HER.x} cy={HER.y} r={54} fill={url("her")} />
        <circle cx={HER.x} cy={HER.y} r={9} stroke="var(--gold)" strokeWidth={0.8} strokeOpacity={0.8} />
        <circle cx={HER.x} cy={HER.y} r={4} fill="var(--art-core)" stroke="var(--art-vermilion)" strokeWidth={0.8} />
      </g>

      {/* A stone seat daubed with vermilion at the end of a road, and its flag */}
      <g {...part("seat")}>
        <path d={ROAD} fill={url("road")} />
        <ellipse cx={SEAT.x} cy={SEAT.y + 8} rx={30} ry={4} fill="var(--art-musk)" fillOpacity={0.2} />
        <path d={ROCK} fill={url("stone")} stroke="var(--gold)" strokeWidth={0.8} strokeLinejoin="round" />
        <path
          d={ROCK}
          fill="var(--art-vermilion)"
          fillOpacity={0.85}
          transform={`translate(${SEAT.x} ${SEAT.y}) scale(0.8) translate(${-SEAT.x} ${-SEAT.y - 2})`}
        />
        <circle cx={SEAT.x} cy={SEAT.y - 9} r={2.2} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.4} />
        <path
          d={`M ${SEAT.x - 6} ${SEAT.y - 16} C ${SEAT.x - 4} ${SEAT.y - 18} ${SEAT.x} ${SEAT.y - 19} ${SEAT.x + 3} ${SEAT.y - 18}`}
          stroke="var(--art-core)"
          strokeWidth={1}
          strokeOpacity={0.5}
          strokeLinecap="round"
        />
        {[-18, -6, 8, 19].map((dx, k) => (
          <g key={dx} transform={`translate(${SEAT.x + dx} ${SEAT.y + 8}) scale(1.3)`}>
            <path d={BLOSSOM} fill={k % 2 ? "var(--art-saffron)" : "var(--art-ivory)"} stroke="var(--gold)" strokeWidth={0.4} />
          </g>
        ))}
        <path d={`M ${SEAT.x + 30} ${SEAT.y + 8} L ${SEAT.x + 30} ${SEAT.y - 46}`} stroke="var(--art-ember)" strokeWidth={1.4} strokeLinecap="round" />
        <g className="m-sway">
          <path
            d={`M ${SEAT.x + 30.6} ${SEAT.y - 45} L ${SEAT.x + 50} ${SEAT.y - 38} L ${SEAT.x + 30.6} ${SEAT.y - 31} Z`}
            fill="var(--art-vermilion)"
            stroke="var(--gold)"
            strokeWidth={0.5}
            strokeLinejoin="round"
          />
        </g>
      </g>

      {/* A single flower laid on a leaf, and her ray landing on it */}
      <g {...part("gift")}>
        <path d={`M ${HER.x - 6} ${HER.y + 10} L ${GIFT.x + 1} ${GIFT.y - 6}`} stroke={url("ray")} strokeWidth={0.9} strokeLinecap="round" />
        <path
          d={`M ${GIFT.x - 14} ${GIFT.y + 3} C ${GIFT.x - 6} ${GIFT.y - 5} ${GIFT.x + 8} ${GIFT.y - 5} ${GIFT.x + 15} ${GIFT.y + 2} C ${GIFT.x + 6} ${GIFT.y + 7} ${GIFT.x - 6} ${GIFT.y + 7} ${GIFT.x - 14} ${GIFT.y + 3} Z`}
          fill="var(--leaf)"
          stroke="var(--gold-soft)"
          strokeWidth={0.5}
        />
        <g transform={`translate(${GIFT.x} ${GIFT.y - 1}) scale(2)`}>
          <path d={BLOSSOM} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.3} />
          <circle r={0.8} fill="var(--art-turmeric)" />
        </g>
        <path className="m-lick" d={glint(5)} transform={`translate(${GIFT.x + 1} ${GIFT.y - 8})`} fill="var(--art-core)" />
      </g>

      {/* A red lotus filled to the brim, a bee asleep in it */}
      <g {...part("lotus")}>
        <g transform={`translate(${LOTUS.x} ${LOTUS.y}) scale(${LOTUS.s})`}>
          <OpenLotus />
          <ellipse cy={-9} rx={13} ry={4.6} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.6} />
          <ellipse cx={-4} cy={-10} rx={5} ry={1.4} fill="var(--art-core)" fillOpacity={0.7} />
          <g transform="translate(4 -12) rotate(-8)">
            <ellipse cx={-1} cy={-1.6} rx={4.6} ry={1.8} fill="var(--art-ivory)" fillOpacity={0.85} stroke="var(--gold-soft)" strokeWidth={0.3} />
            <ellipse rx={5} ry={2.8} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.4} />
            <path d="M -1.6 -2.6 L -1.6 2.6 M 1.2 -2.7 L 1.2 2.7" stroke="var(--art-hair)" strokeWidth={1} />
            <circle cx={5.2} cy={0.6} r={1.8} fill="var(--art-hair)" />
          </g>
        </g>
      </g>

      {/* Kāma's light, his bow and arrows of flowers laid down before her */}
      <g {...part("kama")}>
        <circle className="m-shimmer" cx={KAMA.x} cy={KAMA.y} r={56} fill={url("kama")} />
        <circle cx={KAMA.x} cy={KAMA.y} r={6.4} fill="var(--lotus)" stroke="var(--gold)" strokeWidth={1} />
        <g transform={`translate(${KAMA.x - 2} ${KAMA.y + 20}) scale(0.8)`}>
          <FlowerBow />
        </g>
        {ARROWS.map((a, i) => (
          <g key={i} transform={`translate(${a.x} ${a.y}) rotate(${a.deg}) scale(0.5)`}>
            <FlowerArrow length={58} headClassName={TWINKLE[i % 3]} />
          </g>
        ))}
      </g>

      {/* The drums of heaven sounding, and flowers falling */}
      <g {...part("drums")}>
        <g transform={`translate(${DRUM.x} ${DRUM.y}) rotate(-8)`}>
          <path
            d={`M ${-DRUM.half} ${-DRUM.r} C ${-DRUM.half * 0.4} ${-DRUM.r * 1.3} ${DRUM.half * 0.4} ${-DRUM.r * 1.3} ${DRUM.half} ${-DRUM.r} L ${DRUM.half} ${DRUM.r} C ${DRUM.half * 0.4} ${DRUM.r * 1.3} ${-DRUM.half * 0.4} ${DRUM.r * 1.3} ${-DRUM.half} ${DRUM.r} Z`}
            fill="var(--art-ember)"
            stroke="var(--gold)"
            strokeWidth={0.9}
          />
          <path
            d={Array.from({ length: 7 }, (_, k) => {
              const x = -DRUM.half + 4 + k * ((2 * DRUM.half - 8) / 6);
              const x2 = x + (2 * DRUM.half - 8) / 12;
              return `M ${round(x)} ${-DRUM.r - 1} L ${round(x2)} ${DRUM.r + 1} L ${round(x + (2 * DRUM.half - 8) / 6)} ${-DRUM.r - 1}`;
            }).join(" ")}
            stroke="var(--art-turmeric)"
            strokeWidth={0.8}
            strokeLinejoin="round"
          />
          <path
            d={`M ${-DRUM.half * 0.9} ${-2} C ${-DRUM.half * 0.3} ${-5} ${DRUM.half * 0.3} ${-5} ${DRUM.half * 0.9} ${-2}`}
            stroke="var(--art-vermilion)"
            strokeWidth={2}
          />
          {[-1, 1].map((side) => (
            <ellipse key={side} cx={side * DRUM.half} rx={5} ry={DRUM.r} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.8} />
          ))}
          <path
            d={`M ${DRUM.half + 26} ${-30} Q ${DRUM.half + 14} ${-20} ${DRUM.half + 6} ${-4}`}
            stroke="var(--art-turmeric)"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          <path
            d={`M ${-DRUM.half - 24} ${-32} Q ${-DRUM.half - 12} ${-20} ${-DRUM.half - 6} ${-6}`}
            stroke="var(--art-turmeric)"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          {[-1, 1].flatMap((side) =>
            [12, 20].map((r, k) => (
              <path
                key={`${side}${r}`}
                className={k ? "m-shimmer m-late" : "m-shimmer"}
                d={`M ${side * (DRUM.half + r * 0.5)} ${-r} A ${r} ${r * 1.4} 0 0 ${side > 0 ? 1 : 0} ${side * (DRUM.half + r * 0.5)} ${r}`}
                stroke="var(--gold-soft)"
                strokeWidth={1}
                strokeLinecap="round"
              />
            )),
          )}
        </g>
        {PETALS.map((p, k) => (
          <g key={k} transform={`translate(${p.x} ${p.y}) rotate(${p.deg})`}>
            <g className="m-sink" style={{ ["--dur" as string]: `${p.dur}s`, ["--delay" as string]: `${p.delay}s` }}>
              <path d="M 0 -5 C 3 -3 3 2 0 5 C -3 2 -3 -3 0 -5 Z" fill={p.fill} stroke="var(--gold)" strokeWidth={0.4} />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
