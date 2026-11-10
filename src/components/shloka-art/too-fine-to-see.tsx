/**
 * Shloka 96 — "A face assembled name by name, and then declared too fine to see".
 *
 * The verse builds a face and then withdraws it, and the picture never draws
 * one: each feature is the thing the poets set in its place, and each is kept
 * apart. Under the card her face is the hand mirror of Shloka 12, her light in
 * it shining beyond its frame. In the crown Kāma's bow of flowers, the arc
 * her brows are measured against, and above it a point of light so fine it
 * can hardly be seen. The gods' lamps come up behind her from the right; at
 * the left her ornaments. In front a pond crowded with lotuses, a pot whose
 * throat is stained dark, and the churned sea. Which name each part answers to
 * is written up for readers in the registry, next to this artwork's entry.
 */

import { artIds, FlowerBow, HandMirror, handMirror, Lamp, MirrorFaceClip, MirrorShading, OpenLotus, partProps, Pearl, round, Ruby, through, taper } from "./primitives";
import type { ArtProps } from "./types";

/* ── Her face, the mirror, and her light in it ─────────────────────────── */

const MIRROR_AT = { x: 320, y: 514, s: 0.55 };
const MIRROR = handMirror({ x: 0, y: 0 }, 150);
const HALO = [66, 80, 96];

/* ── The brow's bow, and the subtle point ──────────────────────────────── */

const BOW = { x: 430, y: 112, s: 1.5, turn: -8 };
const POINT = { x: 352, y: 30 };

/* ── The gods' lamps, following her ────────────────────────────────────── */

const PROCESSION = through([
  { x: 516, y: 652 },
  { x: 488, y: 606 },
  { x: 446, y: 574 },
  { x: 398, y: 556 },
]);
const LAMPS = [0.06, 0.2, 0.34, 0.48, 0.62, 0.76, 0.9].map((t, k) => {
  const p = PROCESSION[Math.round(t * (PROCESSION.length - 1))];
  return { ...p, s: round(2.2 - t * 1.2), k };
});

/* ── Her ornaments ─────────────────────────────────────────────────────── */

const TRAY = { x: 178, y: 604 };
const STRAND = Array.from({ length: 22 }, (_, k) => {
  const a = (k / 22) * 2 * Math.PI + 0.3;
  return { x: round(TRAY.x + Math.cos(a) * 26), y: round(TRAY.y - 4 + Math.sin(a) * 8), k };
});

/* ── The lotus pond ────────────────────────────────────────────────────── */

const POND = { x: 186, y: 712, rx: 74, ry: 16 };
const LOTUSES = [
  { foot: { x: 164, y: 724 }, head: { x: 150, y: 676 }, s: 0.42 },
  { foot: { x: 196, y: 726 }, head: { x: 206, y: 662 }, s: 0.5 },
  { foot: { x: 222, y: 722 }, head: { x: 238, y: 694 }, s: 0.34 },
];
const PADS = [
  { x: 136, y: 714, rx: 14, ry: 4 },
  { x: 232, y: 716, rx: 12, ry: 3.4 },
  { x: 180, y: 720, rx: 10, ry: 3 },
];

/* ── The pot with the dark throat ──────────────────────────────────────── */

const POT = { x: 318, y: 700 };

/* ── The churned sea ───────────────────────────────────────────────────── */

const WHIRL = { x: 440, y: 728 };
/** Rings of the churn, each open where the next begins, so they read as one spiral of waves. */
const WHIRL_RINGS = Array.from({ length: 5 }, (_, k) => {
  const rx = 22 + k * 18;
  const ry = round(rx * 0.26);
  const at = (deg: number) => ({ x: round(WHIRL.x + rx * Math.cos((deg * Math.PI) / 180)), y: round(WHIRL.y - ry * Math.sin((deg * Math.PI) / 180)) });
  const a = at(40 + k * 10);
  const b = at(90 + k * 10);
  return { d: `M ${a.x} ${a.y} A ${rx} ${ry} 0 1 1 ${b.x} ${b.y}`, k };
});

export function TooFineToSee({ idPrefix = "sa96", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <MirrorShading m={MIRROR} id={id} />
        <MirrorFaceClip m={MIRROR} id={id} />
        <radialGradient id={id("her")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.95 }} />
          <stop offset="0.35" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("point")}>
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 0.6 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("pond")}>
          <stop offset="0" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--leaf)", stopOpacity: 0.25 }} />
        </radialGradient>
        <radialGradient id={id("sea")}>
          <stop offset="0" style={{ stopColor: "var(--gold-soft)", stopOpacity: 0.9 }} />
          <stop offset="0.6" style={{ stopColor: "var(--art-moon)", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "var(--art-moon)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("poison")}>
          <stop offset="0" style={{ stopColor: "var(--art-hair)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--art-hair)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("shadow")}>
          <stop offset="0" style={{ stopColor: "var(--art-musk)", stopOpacity: 0.25 }} />
          <stop offset="1" style={{ stopColor: "var(--art-musk)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Her light, shining in the mirror and beyond it */}
      <g {...part("radiant")}>
        <circle className="m-breathe" cx={MIRROR_AT.x} cy={MIRROR_AT.y} r={110} fill={url("her")} opacity={0.55} />
        {HALO.map((r, k) => (
          <circle key={r} className={k % 2 ? "m-shimmer m-late" : "m-shimmer"} cx={MIRROR_AT.x} cy={MIRROR_AT.y} r={r} stroke="var(--gold)" strokeWidth={0.7} strokeOpacity={0.55 - k * 0.12} strokeDasharray="1 4" strokeLinecap="round" />
        ))}
      </g>

      {/* Her face, the hand mirror, holding nothing but her light */}
      <g {...part("face")}>
        <g transform={`translate(${MIRROR_AT.x} ${MIRROR_AT.y}) scale(${MIRROR_AT.s})`}>
          <HandMirror m={MIRROR} url={url} />
          <g clipPath={url("face-clip")}>
            <circle className="m-breathe" r={60} fill={url("her")} />
          </g>
          <circle r={7} fill="var(--art-core)" />
          <circle r={12} stroke="var(--gold)" strokeWidth={1.2} />
        </g>
      </g>

      {/* Kāma's bow of flowers, the arc her brows are measured against */}
      <g {...part("brows")}>
        <g transform={`translate(${BOW.x} ${BOW.y}) rotate(${BOW.turn}) scale(${BOW.s})`}>
          <FlowerBow />
        </g>
      </g>

      {/* A point of light almost too fine to see: her subtle form */}
      <g {...part("subtle")}>
        <circle className="m-breathe" cx={POINT.x} cy={POINT.y} r={14} fill={url("point")} />
        {[6, 11, 17].map((r, k) => (
          <circle key={r} className={["m-twinkle", "m-twinkle m-late", "m-twinkle m-later"][k]} cx={POINT.x} cy={POINT.y} r={r} stroke="var(--gold)" strokeWidth={0.3} strokeOpacity={0.6 - k * 0.15} />
        ))}
        <circle cx={POINT.x} cy={POINT.y} r={1.1} fill="var(--art-core)" stroke="var(--gold)" strokeWidth={0.2} />
      </g>

      {/* The gods' lamps, coming up behind her: she leads them */}
      <g {...part("gods")}>
        <path d={`M ${PROCESSION.map((p) => `${p.x} ${p.y}`).join(" L ")}`} stroke="var(--gold-soft)" strokeWidth={0.6} strokeOpacity={0.5} strokeDasharray="2 4" />
        {LAMPS.map((l) => (
          <g key={l.k} transform={`translate(${l.x} ${l.y}) scale(${l.s})`}>
            <Lamp k={l.k % 3} />
          </g>
        ))}
      </g>

      {/* Her ornaments on a tray: the splendid one */}
      <g {...part("splendid")}>
        <ellipse cx={TRAY.x} cy={TRAY.y + 2} rx={40} ry={11} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
        <ellipse cx={TRAY.x} cy={TRAY.y} rx={35} ry={8.6} fill="var(--art-turmeric)" fillOpacity={0.5} stroke="var(--gold-soft)" strokeWidth={0.5} />
        {STRAND.map((p) => (
          <Pearl key={p.k} x={p.x} y={p.y} r={2.4} />
        ))}
        <path d={`M ${TRAY.x + 10} ${TRAY.y + 4} L ${TRAY.x + 6} ${TRAY.y + 2} M ${TRAY.x + 10} ${TRAY.y + 4} L ${TRAY.x + 14} ${TRAY.y + 2}`} stroke="var(--gold)" strokeWidth={0.8} />
        <Ruby x={TRAY.x + 10} y={TRAY.y + 7} r={3.4} />
        <Ruby x={TRAY.x - 12} y={TRAY.y - 2} r={2} />
      </g>

      {/* A pond crowded with lotuses, their hollow stalks under the water */}
      <g {...part("lotus")}>
        <ellipse cx={POND.x} cy={POND.y} rx={POND.rx} ry={POND.ry} fill={url("pond")} stroke="var(--gold-soft)" strokeWidth={0.7} />
        {PADS.map((p, k) => (
          <ellipse key={k} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry} fill="var(--leaf)" stroke="var(--gold)" strokeWidth={0.4} />
        ))}
        {LOTUSES.map((l, k) => (
          <g key={k}>
            <path d={`M ${l.foot.x} ${l.foot.y + 8} L ${l.foot.x} ${l.foot.y}`} stroke="var(--leaf)" strokeWidth={1.6} strokeOpacity={0.45} strokeDasharray="2 2" />
            <path d={taper(through([l.foot, { x: (l.foot.x + l.head.x) / 2, y: (l.foot.y + l.head.y) / 2 + 4 }, l.head]), () => 1.8)} fill="var(--leaf)" />
            <g transform={`translate(${l.head.x} ${l.head.y}) scale(${l.s})`}>
              <OpenLotus pad={false} />
            </g>
          </g>
        ))}
      </g>

      {/* A pot whose throat is stained dark: the poison held where it stopped */}
      <g {...part("dark-throat")}>
        <ellipse cx={POT.x} cy={POT.y + 22} rx={26} ry={4} fill={url("shadow")} />
        <circle cx={POT.x} cy={POT.y - 24} r={20} fill={url("poison")} />
        <g transform={`translate(${POT.x} ${POT.y})`}>
          <path d="M -8 -12 C -24 -8 -26 16 -10 22 L 10 22 C 26 16 24 -8 8 -12 Z" fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.7} strokeLinejoin="round" />
          <path d="M -8 -12 L -7 -22 L 7 -22 L 8 -12 Z" fill="var(--art-hair)" stroke="var(--gold)" strokeWidth={0.6} strokeLinejoin="round" />
          <ellipse cy={-22} rx={11} ry={3} fill="var(--gold)" stroke="var(--art-carve)" strokeWidth={0.6} />
          <ellipse cy={-22.4} rx={7.6} ry={1.8} fill="var(--art-hair)" />
          <path d="M -21 4 C -8 8 8 8 21 4" stroke="var(--gold-soft)" strokeWidth={1} />
          <path d="M 0 -34 C 2 -31 2.6 -29 0 -27.6 C -2.6 -29 -2 -31 0 -34 Z" fill="var(--art-hair)" stroke="var(--art-moon)" strokeWidth={0.4} className="m-ember" />
        </g>
      </g>

      {/* The sea, churned and shaken: the agitator */}
      <g {...part("agitator")}>
        <ellipse cx={WHIRL.x} cy={WHIRL.y} rx={120} ry={30} fill={url("sea")} />
        {WHIRL_RINGS.map((r) => (
          <g key={r.k} className={r.k % 2 ? "m-sway m-late" : "m-sway"} style={{ transformBox: "view-box", transformOrigin: `${WHIRL.x}px ${WHIRL.y}px` }}>
            <path d={r.d} stroke="var(--art-ivory)" strokeWidth={3.2 - r.k * 0.4} strokeLinecap="round" />
            <path d={r.d} stroke="var(--gold)" strokeWidth={1.8 - r.k * 0.2} strokeLinecap="round" />
          </g>
        ))}
        <circle cx={WHIRL.x} cy={WHIRL.y} r={3} fill="var(--art-ivory)" stroke="var(--gold)" strokeWidth={0.5} />
      </g>
    </svg>
  );
}
