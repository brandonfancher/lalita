/**
 * Shloka 84 — "Witness of everything, witnessed by nothing".
 *
 * The great bell-metal lamp of a Kathakali night, in the hour after the play,
 * after the Pañcadaśī's lamp of the theatre (10.11): it lit the patron, the
 * hall and the actor alike, and burns on when they have gone. Its flame is her
 * light. On the stage it still shows the actor's crown set down on a stool and
 * the cymbals left on the boards; everything throws a shadow away from it, and
 * it throws none. Round the flame six small lights, each with the sign of a
 * limb of her mantra. At the lower left a bowl of muddy water, a clearing-nut
 * just dropped in and the water gone clear round it at once. Across the crown
 * six moons, all full. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import { artIds, partProps, round, taper } from "./primitives";
import type { ArtProps } from "./types";

/* ── The lamp and its flame ────────────────────────────────────────────── */

const LAMP = { x: 320, rim: 474, foot: 600 };
const FLAME = { x: LAMP.x, y: 446 };
/** The lamp is drawn at the sizes above and set on the stage larger, about its foot. */
const LAMP_SET = `translate(${LAMP.x} 624) scale(1.2) translate(${-LAMP.x} ${-LAMP.foot})`;
const STEM = taper(
  [
    { x: LAMP.x, y: 492 },
    { x: LAMP.x, y: 530 },
    { x: LAMP.x, y: 576 },
  ],
  (t) => 3.4 + t * 3.6,
);
const KNOBS = [
  { y: 494, rx: 9, ry: 3.4 },
  { y: 514, rx: 7, ry: 3 },
  { y: 540, rx: 8, ry: 3.2 },
];

/* ── The six limbs ─────────────────────────────────────────────────────── */

const LIMB_RING = { x: LAMP.x, y: 512, rx: 132, ry: 66 };
const LIMBS = (["heart", "head", "crest", "armour", "eyes", "weapon"] as const).map((sign, k) => {
  const t = ((k * 60 + 60) * Math.PI) / 180;
  return { sign, x: round(LIMB_RING.x + LIMB_RING.rx * Math.cos(t)), y: round(LIMB_RING.y - LIMB_RING.ry * Math.sin(t)), k };
});

/* ── What the lamp still shows ─────────────────────────────────────────── */

const CROWN = { x: 566, y: 490, r: 44, s: 1.18 };
const STOOL = { x: 566, top: 534, foot: 612, w: 74 };
const CYMBALS = { x: 452, y: 604, s: 1.4 };
const BOWL = { x: 170, y: 588, rx: 42, ry: 13, s: 1.25 };

/* ── Six full moons ────────────────────────────────────────────────────── */

const MOONS = Array.from({ length: 6 }, (_, k) => ({ x: 120 + k * 62, y: round(48 - Math.sin((k / 5) * Math.PI) * 12), r: 11 }));

export function TheStageLamp({ idPrefix = "sa84", active = null }: ArtProps) {
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
        <radialGradient id={id("pool")}>
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.34 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-turmeric)", stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: "var(--art-turmeric)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("limb")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("flame")} x1={0} y1={1} x2={0} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)" }} />
        </linearGradient>
        <linearGradient id={id("shadow-r")} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("shadow-l")} x1={1} y1={0} x2={0} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </linearGradient>
        <clipPath id={id("water")}>
          <ellipse cx={BOWL.x} cy={BOWL.y} rx={BOWL.rx - 4} ry={BOWL.ry - 2.6} />
        </clipPath>
      </defs>

      {/* The stage, lit round the lamp's foot */}
      <g {...part("stage")}>
        <ellipse cx={LAMP.x} cy={612} rx={310} ry={62} fill={url("pool")} />
        {[-1, 0, 1].map((k) => (
          <path
            key={k}
            d={`M ${110} ${616 + k * 18 - 4} C ${230} ${616 + k * 18} ${410} ${616 + k * 18} ${600} ${616 + k * 18 - 6}`}
            stroke="var(--gold-soft)"
            strokeWidth={0.6}
            strokeOpacity={0.45}
            strokeDasharray="38 5"
          />
        ))}
      </g>

      {/* Everything throws its shadow away from the flame */}
      <g {...part("shadows")}>
        <path
          d={`M ${STOOL.x - STOOL.w / 2} ${STOOL.foot} L 640 ${STOOL.foot - 6} L 640 ${STOOL.foot + 14} L ${STOOL.x - STOOL.w / 2 + 6} ${STOOL.foot + 6} Z`}
          fill={url("shadow-r")}
        />
        <path
          d={`M ${CYMBALS.x - 24} ${CYMBALS.y + 5} L ${CYMBALS.x + 110} ${CYMBALS.y + 3} L ${CYMBALS.x + 110} ${CYMBALS.y + 14} L ${CYMBALS.x - 18} ${CYMBALS.y + 10} Z`}
          fill={url("shadow-r")}
        />
        <path
          d={`M ${BOWL.x + 30} ${BOWL.y + 26} L ${BOWL.x - 150} ${BOWL.y + 20} L ${BOWL.x - 150} ${BOWL.y + 38} L ${BOWL.x + 16} ${BOWL.y + 34} Z`}
          fill={url("shadow-l")}
        />
      </g>

      {/* The bowl of muddy water, clear at once round the nut dropped in it */}
      <g {...part("bowl")}>
        <g transform={`translate(${BOWL.x} ${BOWL.y}) scale(${BOWL.s}) translate(${-BOWL.x} ${-BOWL.y})`}>
          <path
            d={`M ${BOWL.x - BOWL.rx} ${BOWL.y} C ${BOWL.x - BOWL.rx + 2} ${BOWL.y + 32} ${BOWL.x + BOWL.rx - 2} ${BOWL.y + 32} ${BOWL.x + BOWL.rx} ${BOWL.y} Z`}
            fill="var(--gold)"
            stroke="var(--art-carve)"
            strokeWidth={0.6}
          />
          <path
            d={`M ${BOWL.x - BOWL.rx + 3} ${BOWL.y + 12} C ${BOWL.x - 12} ${BOWL.y + 20} ${BOWL.x + 12} ${BOWL.y + 20} ${BOWL.x + BOWL.rx - 3} ${BOWL.y + 12}`}
            stroke="var(--art-vermilion)"
            strokeWidth={1.2}
          />
          <ellipse cx={BOWL.x} cy={BOWL.y} rx={BOWL.rx} ry={BOWL.ry} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.8} />
          <ellipse cx={BOWL.x} cy={BOWL.y} rx={BOWL.rx - 4} ry={BOWL.ry - 2.6} fill="var(--art-musk)" fillOpacity={0.75} />
          <g clipPath={`url(#${id("water")})`}>
            <path
              d={`M ${BOWL.x - 34} ${BOWL.y - 2} C ${BOWL.x - 20} ${BOWL.y - 8} ${BOWL.x - 4} ${BOWL.y + 4} ${BOWL.x + 14} ${BOWL.y - 4} C ${BOWL.x + 24} ${BOWL.y - 8} ${BOWL.x + 32} ${BOWL.y} ${BOWL.x + 38} ${BOWL.y - 2}`}
              stroke="var(--art-ember)"
              strokeWidth={2}
              strokeOpacity={0.5}
            />
            <path
              d={`M ${BOWL.x - 30} ${BOWL.y + 5} C ${BOWL.x - 16} ${BOWL.y + 2} ${BOWL.x} ${BOWL.y + 9} ${BOWL.x + 30} ${BOWL.y + 4}`}
              stroke="var(--art-ember)"
              strokeWidth={1.6}
              strokeOpacity={0.4}
            />
            <ellipse className="m-breathe" cx={BOWL.x + 4} cy={BOWL.y} rx={22} ry={6.6} fill="var(--art-moon)" fillOpacity={0.9} />
            <ellipse cx={BOWL.x + 4} cy={BOWL.y} rx={26} ry={7.8} stroke="var(--gold-soft)" strokeWidth={0.6} />
            <ellipse cx={BOWL.x + 4} cy={BOWL.y} rx={12} ry={3.6} stroke="var(--gold-soft)" strokeWidth={0.5} />
          </g>
          <ellipse cx={BOWL.x + 4} cy={BOWL.y} rx={2.6} ry={1.8} fill="var(--art-ember)" stroke="var(--art-carve)" strokeWidth={0.4} />
          <circle className="m-twinkle" cx={BOWL.x - 6} cy={BOWL.y - 2} r={1} fill="var(--art-core)" />
        </g>
      </g>

      {/* What the lamp still shows: the actor's crown on its stool, and the cymbals */}
      <g {...part("lit")}>
        <path
          d={`M ${STOOL.x - STOOL.w / 2 + 6} ${STOOL.top + 4} L ${STOOL.x - STOOL.w / 2 + 2} ${STOOL.foot} M ${STOOL.x + STOOL.w / 2 - 6} ${STOOL.top + 4} L ${STOOL.x + STOOL.w / 2 - 2} ${STOOL.foot} M ${STOOL.x - STOOL.w / 2 + 4} ${STOOL.foot - 18} L ${STOOL.x + STOOL.w / 2 - 4} ${STOOL.foot - 18}`}
          stroke="var(--art-ember)"
          strokeWidth={3.2}
          strokeLinecap="round"
        />
        <rect x={STOOL.x - STOOL.w / 2} y={STOOL.top} width={STOOL.w} height={7} rx={1.5} fill="var(--art-ember)" stroke="var(--gold)" strokeWidth={0.6} />
        <g transform={`translate(${CROWN.x} ${CROWN.y}) scale(${CROWN.s})`}>
          {Array.from({ length: 28 }, (_, k) => {
            const t = (k / 28) * Math.PI * 2;
            return (
              <circle
                key={k}
                cx={round(CROWN.r * Math.cos(t))}
                cy={round(CROWN.r * Math.sin(t))}
                r={4.2}
                fill="var(--gold-soft)"
                stroke="var(--gold)"
                strokeWidth={0.5}
              />
            );
          })}
          <circle r={CROWN.r} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={1} />
          <circle r={CROWN.r - 8} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.8} />
          <circle r={CROWN.r - 15} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.8} />
          {Array.from({ length: 16 }, (_, k) => {
            const t = (k / 16) * Math.PI * 2;
            return (
              <circle
                key={k}
                className={k % 4 === 0 ? "m-twinkle" : undefined}
                cx={round((CROWN.r - 4) * Math.cos(t))}
                cy={round((CROWN.r - 4) * Math.sin(t))}
                r={1.8}
                fill="var(--art-core)"
              />
            );
          })}
          <path d="M -20 24 C -22 4 -12 -14 0 -18 C 12 -14 22 4 20 24 Z" fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.9} />
          <path d="M -19 12 C -8 9 8 9 19 12 M -15 0 C -6 -3 6 -3 15 0" stroke="var(--art-vermilion)" strokeWidth={2} />
          <path d="M 0 -18 L 0 -26" stroke="var(--gold)" strokeWidth={1.4} strokeLinecap="round" />
          <circle cy={-28} r={3} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.6} />
          <rect x={-25} y={22} width={50} height={8} rx={2} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          {[-18, -9, 0, 9, 18].map((x) => (
            <circle key={x} cx={x} cy={26} r={1.6} fill="var(--art-vermilion)" />
          ))}
          {[-1, 1].map((s) => (
            <g key={s} transform={`translate(${s * 31} 30)`}>
              <circle r={7.5} fill="var(--art-vermilion)" stroke="var(--gold)" strokeWidth={0.8} />
              <circle r={3} fill="var(--art-core)" />
            </g>
          ))}
        </g>
        <g transform={`translate(${CYMBALS.x} ${CYMBALS.y}) scale(${CYMBALS.s}) translate(${-CYMBALS.x} ${-CYMBALS.y})`}>
          <path
            d={`M ${CYMBALS.x - 8} ${CYMBALS.y - 2} C ${CYMBALS.x} ${CYMBALS.y - 12} ${CYMBALS.x + 14} ${CYMBALS.y - 12} ${CYMBALS.x + 24} ${CYMBALS.y - 3}`}
            stroke="var(--art-vermilion)"
            strokeWidth={1}
          />
          {[
            { x: CYMBALS.x - 8, y: CYMBALS.y },
            { x: CYMBALS.x + 24, y: CYMBALS.y - 1 },
          ].map((c, k) => (
            <g key={k}>
              <ellipse cx={c.x} cy={c.y} rx={14} ry={5} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
              <ellipse cx={c.x} cy={c.y - 1} rx={5} ry={2} fill="var(--art-turmeric)" stroke="var(--art-carve)" strokeWidth={0.4} />
              <path
                d={`M ${c.x - 10} ${c.y + 1} C ${c.x - 4} ${c.y + 3} ${c.x + 4} ${c.y + 3} ${c.x + 10} ${c.y + 1}`}
                stroke="var(--art-core)"
                strokeWidth={0.6}
                strokeOpacity={0.8}
              />
            </g>
          ))}
        </g>
      </g>

      {/* The bell-metal lamp */}
      <g {...part("lamp")}>
        <g transform={LAMP_SET}>
          <path
            d={`M ${LAMP.x - 10} ${LAMP.foot - 26} C ${LAMP.x - 12} ${LAMP.foot - 12} ${LAMP.x - 30} ${LAMP.foot - 8} ${LAMP.x - 36} ${LAMP.foot} L ${LAMP.x + 36} ${LAMP.foot} C ${LAMP.x + 30} ${LAMP.foot - 8} ${LAMP.x + 12} ${LAMP.foot - 12} ${LAMP.x + 10} ${LAMP.foot - 26} Z`}
            fill="var(--art-turmeric)"
            stroke="var(--gold)"
            strokeWidth={0.8}
          />
          <ellipse cx={LAMP.x} cy={LAMP.foot} rx={40} ry={6} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <path
            d={`M ${LAMP.x - 30} ${LAMP.foot - 5} C ${LAMP.x - 10} ${LAMP.foot - 1} ${LAMP.x + 10} ${LAMP.foot - 1} ${LAMP.x + 30} ${LAMP.foot - 5}`}
            stroke="var(--art-vermilion)"
            strokeWidth={1}
          />
          <path d={STEM} fill="var(--art-turmeric)" stroke="var(--gold)" strokeWidth={0.6} />
          <ellipse cx={LAMP.x} cy={LAMP.foot - 26} rx={11} ry={3.4} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          {KNOBS.map((k) => (
            <ellipse key={k.y} cx={LAMP.x} cy={k.y} rx={k.rx} ry={k.ry} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.5} />
          ))}
          <path
            d={`M ${LAMP.x - 38} ${LAMP.rim} C ${LAMP.x - 32} ${LAMP.rim + 18} ${LAMP.x + 32} ${LAMP.rim + 18} ${LAMP.x + 38} ${LAMP.rim} Z`}
            fill="var(--art-turmeric)"
            stroke="var(--gold)"
            strokeWidth={0.8}
          />
          <path
            d={`M ${LAMP.x - 30} ${LAMP.rim + 7} C ${LAMP.x - 10} ${LAMP.rim + 11} ${LAMP.x + 10} ${LAMP.rim + 11} ${LAMP.x + 30} ${LAMP.rim + 7}`}
            stroke="var(--art-vermilion)"
            strokeWidth={1}
          />
          <ellipse cx={LAMP.x} cy={LAMP.rim} rx={38} ry={6} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <ellipse cx={LAMP.x} cy={LAMP.rim} rx={32} ry={4} fill="var(--art-saffron)" fillOpacity={0.85} />
          <path
            d={`M ${LAMP.x - 12} ${LAMP.rim + 1} C ${LAMP.x - 6} ${LAMP.rim - 3} ${LAMP.x - 2} ${LAMP.rim} ${LAMP.x} ${LAMP.rim - 4}`}
            stroke="var(--art-ivory)"
            strokeWidth={2.4}
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Her light: the flame, which lights everything and throws no shadow */}
      <g {...part("her-light")}>
        <g transform={LAMP_SET}>
          <circle className="m-breathe" cx={FLAME.x} cy={FLAME.y} r={64} fill={url("her")} />
          <g className="m-flicker">
            <path
              d={`M ${FLAME.x} ${LAMP.rim - 2} C ${FLAME.x - 11} ${LAMP.rim - 6} ${FLAME.x - 10} ${FLAME.y + 4} ${FLAME.x - 4} ${FLAME.y - 8} C ${FLAME.x - 1} ${FLAME.y - 16} ${FLAME.x} ${FLAME.y - 22} ${FLAME.x + 1} ${FLAME.y - 30} C ${FLAME.x + 6} ${FLAME.y - 16} ${FLAME.x + 11} ${FLAME.y - 2} ${FLAME.x + 9} ${FLAME.y + 14} C ${FLAME.x + 8} ${LAMP.rim - 6} ${FLAME.x + 4} ${LAMP.rim - 3} ${FLAME.x} ${LAMP.rim - 2} Z`}
              fill={url("flame")}
            />
            <ellipse cx={FLAME.x} cy={FLAME.y + 12} rx={3.6} ry={9} fill="var(--art-core)" />
          </g>
        </g>
      </g>

      {/* The six lights of her mantra's limbs round it */}
      <g {...part("limbs")}>
        <ellipse
          cx={LIMB_RING.x}
          cy={LIMB_RING.y}
          rx={LIMB_RING.rx}
          ry={LIMB_RING.ry}
          stroke="var(--gold-soft)"
          strokeWidth={0.6}
          strokeOpacity={0.6}
          strokeDasharray="1 4"
          strokeLinecap="round"
        />
        {LIMBS.map((l) => (
          <g key={l.sign} transform={`translate(${l.x} ${l.y}) scale(1.25)`}>
            <circle className={["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"][l.k % 3]} r={14} fill={url("limb")} />
            <circle r={9} fill="var(--art-ivory)" fillOpacity={0.9} stroke="var(--gold)" strokeWidth={0.7} />
            {l.sign === "heart" && (
              <path d="M 0 4.4 C -4 1 -5 -3 -2.4 -4.4 C -1 -5 0 -3.6 0 -2.6 C 0 -3.6 1 -5 2.4 -4.4 C 5 -3 4 1 0 4.4 Z" fill="var(--art-vermilion)" />
            )}
            {l.sign === "head" && <circle r={3.6} fill="var(--art-saffron)" stroke="var(--gold)" strokeWidth={0.5} />}
            {l.sign === "crest" && (
              <path d="M 0 -5 C 3 -2 3 2 0 4 C -3 2 -3 -2 0 -5 Z M 0 4 L 0 5.4" fill="var(--art-saffron)" stroke="var(--art-vermilion)" strokeWidth={0.6} />
            )}
            {l.sign === "armour" && (
              <path
                d="M -4 -4.6 L 4 -4.6 L 4 0 C 4 3 2 4.4 0 5.2 C -2 4.4 -4 3 -4 0 Z M 0 -4.6 L 0 5 M -4 -1 L 4 -1"
                fill="var(--art-turmeric)"
                stroke="var(--gold)"
                strokeWidth={0.6}
                strokeLinejoin="round"
              />
            )}
            {l.sign === "eyes" && (
              <>
                <path d="M -5.4 0 C -3 -3.6 3 -3.6 5.4 0 C 3 3.6 -3 3.6 -5.4 0 Z" fill="var(--art-ivory)" stroke="var(--art-carve)" strokeWidth={0.6} />
                <circle r={1.8} fill="var(--art-hair)" />
              </>
            )}
            {l.sign === "weapon" && (
              <path
                d="M 0 -5.4 L 2.4 -1 L 0.8 -1 L 0.8 5 L -0.8 5 L -0.8 -1 L -2.4 -1 Z"
                fill="var(--art-hair)"
                stroke="var(--gold)"
                strokeWidth={0.4}
                strokeLinejoin="round"
              />
            )}
          </g>
        ))}
      </g>

      {/* Six full moons */}
      <g {...part("moons")}>
        {MOONS.map((m, k) => (
          <g key={k}>
            <circle cx={m.x} cy={m.y} r={m.r * 1.9} fill={url("limb")} fillOpacity={0.4} />
            <circle
              className={["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"][k % 3]}
              cx={m.x}
              cy={m.y}
              r={m.r}
              fill="var(--art-moon)"
              stroke="var(--gold)"
              strokeWidth={0.9}
            />
            <circle cx={m.x - m.r * 0.3} cy={m.y - m.r * 0.3} r={m.r * 0.35} fill="var(--art-ivory)" fillOpacity={0.5} />
          </g>
        ))}
      </g>
    </svg>
  );
}
