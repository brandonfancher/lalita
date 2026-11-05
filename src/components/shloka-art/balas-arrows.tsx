/**
 * Shloka 29 — "The nine-year-old and the thirty princes".
 *
 * Two more names of a mother's pleasure, and in neither does the sovereign
 * lift a hand. Her chariot stands at the left as in the last verse, her light
 * on it. Out in front, joined to her by a thread of breath (the purāṇa calls
 * Bālā her vital breath walking about outside her), is Bālā: a small light the
 * colour of the rising sun, ringed in the gold of the armour her mother took
 * off and put on her. From her thirty crescent-headed arrows fly out in a fan,
 * one to each of Bhaṇḍa's thirty sons, thirty puffs of his ash at the right,
 * each one struck. Across the crown, Mantriṇī's sapphire light, over her vīṇā,
 * throws a shaft of its light into the ash of Viṣaṅga, Bhaṇḍa's brother, and
 * it breaks and falls. Which name each part answers to is written up for
 * readers in the registry, next to this artwork's entry.
 */

import {
  AshDefs,
  RathaDefs,
  RathaTiers,
  RathaTriangles,
  RathaWeapons,
  Sapphire,
  SapphireDefs,
  Vina,
  artIds,
  partProps,
  polar,
  round,
  sriCakraRatha,
} from "./primitives";
import type { ArtProps } from "./types";

const TWINKLE = ["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"];

const RATHA = sriCakraRatha(196, 540, 0.5);
const BINDU = RATHA.bindu;

/* ── Bālā ──────────────────────────────────────────────────────────────── */

const BALA = { x: 318, y: 478 };
/** Her mother's breath, walking about outside her. */
const BREATH = `M ${BINDU.x + 9} ${BINDU.y - 2} C ${BINDU.x + 50} ${BINDU.y - 40} ${BALA.x - 60} ${BALA.y - 44} ${BALA.x - 14} ${BALA.y - 6}`;
/** The armour her mother put on her: a ring of gold scales. */
const SCALES = Array.from({ length: 14 }, (_, k) => {
  const deg = k * (360 / 14);
  const a = polar(BALA.x, BALA.y, 11, deg - 12.8);
  const b = polar(BALA.x, BALA.y, 11, deg + 12.8);
  return `M ${a.x} ${a.y} A 3.4 3.4 0 0 0 ${b.x} ${b.y}`;
}).join(" ");

/* ── The thirty sons, and thirty crescent-headed arrows ────────────────── */

const SONS = Array.from({ length: 30 }, (_, k) => {
  const row = k % 2;
  const i = Math.floor(k / 2);
  const deg = 18 - i * (78 / 14) + row * 2.6;
  const r = 200 + row * 70 + ((i * 7) % 3) * 6;
  const at = polar(BALA.x, BALA.y, r, deg);
  const head = polar(BALA.x, BALA.y, r - 18 - row * 4, deg);
  const from = polar(BALA.x, BALA.y, 26, deg);
  return {
    ...at,
    puff: round(15 + row * 4 + (i % 3) * 2),
    head,
    angle: round(-deg),
    trail: `M ${from.x} ${from.y} L ${head.x} ${head.y}`,
    crown: `translate(${round(at.x + 7)} ${round(at.y - 10 - row * 3)}) rotate(${((k * 47) % 90) - 30})`,
    k,
  };
});
/** A crescent arrowhead (ardhacandra) at the origin, horns forward along +x, on a short shaft. */
const CRESCENT = "M 1 -6 C 7 -6 9 -2 9.5 0 C 9 2 7 6 1 6 C 5 3.2 5.4 -3.2 1 -6 Z";
const SHAFT = "M -22 0 L 3 0";
/** Each son's coronet, knocked off and tumbling. */
const CORONET = "M -5 0 L -5.6 -6 L -2.6 -3.2 L 0 -7.6 L 2.6 -3.2 L 5.6 -6 L 5 0 Z";
const FLETCH = "M -22 0 L -27 -3.4 M -22 0 L -27 3.4 M -18 0 L -23 -3.4 M -18 0 L -23 3.4";

/* ── Mantriṇī and Viṣaṅga ──────────────────────────────────────────────── */

const MANTRINI = { x: 396, y: 66 };
const VISANGA = { x: 568, y: 214, r: 52 };
const VISANGA_CLOUDS = [
  { x: VISANGA.x, y: VISANGA.y, r: VISANGA.r },
  { x: VISANGA.x + 40, y: VISANGA.y - 18, r: 40 },
  { x: VISANGA.x + 22, y: VISANGA.y + 40, r: 42 },
  { x: VISANGA.x - 30, y: VISANGA.y + 30, r: 34 },
  { x: VISANGA.x + 6, y: VISANGA.y - 10, r: 36 },
  { x: VISANGA.x + 16, y: VISANGA.y + 14, r: 30 },
];
/** It breaks where the shaft goes in, and falls. */
const FALLING = Array.from({ length: 18 }, (_, k) => ({
  x: round(VISANGA.x - 40 + ((k * 37) % 90)),
  y: round(VISANGA.y + 40 + ((k * 23) % 90)),
  r: round(0.9 + (k % 3) * 0.6),
}));
const SHAFT_FROM = { x: MANTRINI.x + 12, y: MANTRINI.y + 4 };
const SHAFT_TO = { x: VISANGA.x - 22, y: VISANGA.y - 22 };
const LANCE = `M ${SHAFT_FROM.x} ${SHAFT_FROM.y - 0.6} Q ${SHAFT_TO.x - 10} ${SHAFT_FROM.y - 6} ${SHAFT_TO.x - 1.8} ${SHAFT_TO.y - 1.8} L ${SHAFT_TO.x + 1.4} ${SHAFT_TO.y + 1.4} L ${SHAFT_TO.x - 1.8} ${SHAFT_TO.y + 1.8} Q ${SHAFT_TO.x - 16} ${SHAFT_FROM.y} ${SHAFT_FROM.x} ${SHAFT_FROM.y + 0.6} Z`;
const BREAK = Array.from({ length: 8 }, (_, k) => {
  const deg = -45 + (k - 3.5) * 22;
  const a = polar(SHAFT_TO.x, SHAFT_TO.y, 6, deg);
  const b = polar(SHAFT_TO.x, SHAFT_TO.y, k % 2 ? 16 : 24, deg);
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}).join(" ");

export function BalasArrows({ idPrefix = "sa29", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={BINDU.x} cy={BINDU.y} r={200} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.5 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.15 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("bindu-glow")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.4" style={{ stopColor: "var(--art-core)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("dawn")}>
          <stop offset="0" style={{ stopColor: "var(--art-saffron)", stopOpacity: 0.9 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--art-vermilion)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("shadow")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("lance")} x1={SHAFT_FROM.x} y1={SHAFT_FROM.y} x2={SHAFT_TO.x} y2={SHAFT_TO.y} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)" }} />
        </linearGradient>
        <RathaDefs id={id} />
        <AshDefs id={id} />
        <SapphireDefs id={id} />
      </defs>

      {/* Her chariot, and her light on it, delighted */}
      <g {...part("chariot")}>
        <circle className="m-shimmer" cx={BINDU.x} cy={BINDU.y} r={200} fill={url("glow")} />
        <ellipse cx={RATHA.cx} cy={RATHA.cy + 66} rx={104} ry={11} fill={url("shadow")} />
        <RathaTiers g={RATHA} url={url} />
        <RathaTriangles g={RATHA} url={url} />
        <RathaWeapons g={RATHA} />
        <circle className="m-breathe" cx={BINDU.x} cy={BINDU.y} r={30} fill={url("bindu-glow")} />
        <circle cx={BINDU.x} cy={BINDU.y} r={5} fill="var(--art-core)" />
        <circle cx={BINDU.x} cy={BINDU.y} r={8.2} stroke="var(--gold)" strokeWidth={0.8} />
      </g>

      {/* Bālā in her mother's armour, and her thirty arrows into Bhaṇḍa's thirty sons */}
      <g {...part("bala")}>
        {SONS.map((s) => (
          <g key={s.k}>
            <circle cx={s.x} cy={s.y} r={s.puff} fill={url("ash")} />
            <circle cx={s.x} cy={s.y} r={s.puff} fill={url("ash-pale")} />
          </g>
        ))}
        {SONS.map((s) => (
          <path key={s.k} d={CORONET} transform={s.crown} fill="var(--gold-soft)" stroke="var(--art-musk)" strokeWidth={0.5} strokeOpacity={0.6} />
        ))}
        <g stroke="var(--gold-soft)" strokeWidth={0.5} strokeOpacity={0.45} strokeDasharray="1 4" strokeLinecap="round">
          {SONS.map((s) => (
            <path key={s.k} d={s.trail} />
          ))}
        </g>
        {SONS.map((s) => (
          <g key={s.k} transform={`translate(${s.head.x} ${s.head.y}) rotate(${s.angle})`}>
            <path d={SHAFT} stroke="var(--gold)" strokeWidth={1} strokeLinecap="round" />
            <path d={FLETCH} stroke="var(--art-vermilion)" strokeWidth={0.9} strokeLinecap="round" />
            <path d={CRESCENT} fill="var(--art-moon)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
          </g>
        ))}
        <g fill="var(--art-moon)">
          {SONS.filter((s) => s.k % 3 === 0).map((s, i) => (
            <circle key={s.k} className={TWINKLE[i % 3]} cx={s.x + 4} cy={s.y - 3} r={1.1} fillOpacity={0.6} />
          ))}
        </g>
        <path d={BREATH} stroke="var(--art-core)" strokeWidth={1.1} strokeDasharray="0.1 4" strokeLinecap="round" />
        <circle className="m-breathe" cx={BALA.x} cy={BALA.y} r={30} fill={url("dawn")} />
        <path d={SCALES} stroke="var(--gold)" strokeWidth={1.3} />
        <circle cx={BALA.x} cy={BALA.y} r={8.8} stroke="var(--gold)" strokeWidth={0.7} />
        <circle cx={BALA.x} cy={BALA.y} r={4.6} fill="var(--art-vermilion)" />
        <circle cx={BALA.x - 1.2} cy={BALA.y - 1.2} r={1.6} fill="var(--art-saffron)" />
      </g>

      {/* Her three syllables under her: aiṃ klīṃ sauḥ */}
      <g {...part("syllables")}>
        <text
          x={BALA.x}
          y={BALA.y + 40}
          textAnchor="middle"
          fill="var(--sindura)"
          fontSize={14}
          style={{ fontFamily: "var(--font-tiro), serif" }}
        >
          ऐं क्लीं सौः
        </text>
      </g>

      {/* Mantriṇī, over her vīṇā, bringing down Viṣaṅga */}
      <g {...part("mantrini")}>
        {VISANGA_CLOUDS.map((a, i) => (
          <g key={i}>
            <circle cx={a.x} cy={a.y} r={a.r} fill={url("ash")} />
            <circle cx={a.x} cy={a.y} r={a.r} fill={url("ash-pale")} />
          </g>
        ))}
        {FALLING.map((f, i) => (
          <circle
            key={i}
            className={i % 2 ? "m-sink m-late" : "m-sink"}
            cx={f.x}
            cy={f.y}
            r={f.r}
            fill={i % 3 ? "var(--art-musk)" : "var(--art-moon)"}
            fillOpacity={i % 3 ? 0.4 : 0.3}
          />
        ))}
        <path d={LANCE} fill={url("lance")} />
        <path className="m-lick" d={BREAK} stroke="var(--art-moon)" strokeWidth={1.2} strokeLinecap="round" />
        <circle className="m-shimmer" cx={MANTRINI.x} cy={MANTRINI.y} r={40} fill={url("sapphire")} />
        <g transform={`translate(${MANTRINI.x} ${MANTRINI.y + 22}) rotate(-8) scale(0.8)`}>
          <Vina />
        </g>
        <Sapphire x={MANTRINI.x} y={MANTRINI.y} />
      </g>
    </svg>
  );
}
