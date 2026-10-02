/**
 * Shloka 1 — "Risen from the fire of awareness".
 *
 * A prabhāvalī, the flaming aureole that frames a temple image, drawn from
 * the five names of the verse. Which name each part answers to is written up
 * for readers in the registry, next to this artwork's entry.
 */

import { alongArch, archPath, artIds, Embers, Lion, lotusPetals, partProps, round, tongue, type Arch } from "./primitives";
import type { ArtProps } from "./types";

const CX = 320;
const CY = 390;
const R = 230;
/** The bindu, where she appears, sits in the neck of the flame below the arch's centre. */
const BY = 470;
const ARCH: Arch = { cx: CX, cy: CY, bottom: 790 };

const SRI_ANGLES = [150, 90, 30];
const sriPoints = SRI_ANGLES.map((deg) => {
  const t = (deg * Math.PI) / 180;
  const r = R - 24;
  return { x: CX + r * Math.cos(t), y: CY - r * Math.sin(t), rotate: 90 - deg };
});

const garland = alongArch(ARCH, R, 25, (p) => Math.abs(p.angle) < 11).map((p, i) => {
  const big = i % 2 === 0;
  // Flames on the sides lift toward the sky instead of pointing straight out.
  const angle = p.angle * 0.8;
  const lean = (p.angle > 0 ? -1 : p.angle < 0 ? 1 : 0) * (big ? 7 : 4);
  return {
    d: tongue(big ? 34 : 20, big ? 15 : 10, lean),
    transform: `translate(${round(p.x)} ${round(p.y)}) rotate(${round(angle)})`,
    big,
  };
});

const pearls = alongArch(ARCH, R - 24, 13, (p) =>
  sriPoints.some((s) => Math.hypot(s.x - p.x, s.y - p.y) < 17),
);

const rays = Array.from({ length: 108 }, (_, i) => {
  const t = (i / 108) * Math.PI * 2;
  const long = i % 2 === 0;
  const r0 = 34;
  const r1 = long ? 176 : 140;
  return {
    x1: round(CX + r0 * Math.cos(t)),
    y1: round(BY + r0 * Math.sin(t)),
    x2: round(CX + r1 * Math.cos(t)),
    y2: round(BY + r1 * Math.sin(t)),
    long,
  };
});

const petals = lotusPetals({ x: 110, width: 420, count: 17, base: 774, height: 26 });

const EMBERS = [
  { x: 300, y: 520, r: 2.2, dx: -18, dur: 11, delay: 0 },
  { x: 338, y: 570, r: 1.6, dx: 22, dur: 13, delay: 2.5 },
  { x: 318, y: 490, r: 1.4, dx: -8, dur: 9, delay: 5 },
  { x: 272, y: 580, r: 1.8, dx: -30, dur: 14, delay: 1.2 },
  { x: 366, y: 540, r: 1.3, dx: 26, dur: 10, delay: 6.5 },
  { x: 326, y: 610, r: 2, dx: 10, dur: 15, delay: 3.8 },
  { x: 296, y: 470, r: 1.2, dx: -14, dur: 8.5, delay: 8 },
  { x: 344, y: 480, r: 1.5, dx: 16, dur: 12, delay: 9.5 },
  { x: 310, y: 640, r: 1.7, dx: -22, dur: 16, delay: 4.6 },
  { x: 334, y: 450, r: 1.1, dx: 6, dur: 9.5, delay: 11 },
];

export function FireOfAwareness({ idPrefix = "sa1", active = null }: ArtProps) {
  const { id, url } = artIds(idPrefix);
  const part = partProps(active);

  return (
    <svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id("glow")} cx={CX} cy={470} r={330} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.55 }} />
          <stop offset="0.45" style={{ stopColor: "var(--art-glow)", stopOpacity: 0.18 }} />
          <stop offset="1" style={{ stopColor: "var(--art-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("flame")} x1="0" y1="708" x2="0" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-vermilion)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold)", stopOpacity: 0.15 }} />
        </linearGradient>
        <linearGradient id={id("flame-mid")} x1="0" y1="704" x2="0" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-saffron)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0.3 }} />
        </linearGradient>
        <radialGradient id={id("bindu")} cx={CX} cy={BY} r={46} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--art-core)", stopOpacity: 1 }} />
          <stop offset="0.3" style={{ stopColor: "var(--art-core)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--art-core)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={id("rays-fade")} cx={CX} cy={BY} r={180} gradientUnits="userSpaceOnUse">
          <stop offset="0.2" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0.15} />
        </radialGradient>
        <mask id={id("rays-mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="830">
          <rect width="640" height="830" fill={url("rays-fade")} />
        </mask>
      </defs>

      {/* śrī: light radiating from the point where she appears */}
      <g {...part("rays")}>
        <circle cx={CX} cy={470} r={330} fill={url("glow")} />
        <g className="m-shimmer" mask={url("rays-mask")} stroke="var(--gold)" strokeLinecap="round">
          {rays.map(({ long, ...r }, i) => (
            <line key={i} {...r} strokeWidth={long ? 0.9 : 0.6} strokeOpacity={long ? 0.7 : 0.45} />
          ))}
        </g>
      </g>

      {/* The prabhāvalī: a ring of fire around a band of pearls */}
      <g {...part("frame")}>
        <g>
          {garland.map((f, i) => (
            <path
              key={i}
              d={f.d}
              transform={f.transform}
              fill={f.big ? "var(--art-vermilion)" : "var(--art-saffron)"}
              fillOpacity={f.big ? 0.62 : 0.6}
            />
          ))}
        </g>
        <g stroke="var(--gold)" fill="none">
          <path d={archPath(ARCH, R)} strokeWidth={1.4} />
          <path d={archPath(ARCH, R - 8)} strokeWidth={0.7} strokeOpacity={0.8} />
          <path d={archPath(ARCH, R - 40)} strokeWidth={0.7} strokeOpacity={0.8} />
          <path d={archPath(ARCH, R - 46)} strokeWidth={1.2} />
        </g>
        <g fill="var(--gold)">
          {pearls.map((p, i) => (
            <circle key={i} cx={round(p.x)} cy={round(p.y)} r={2.4} fillOpacity={0.75} />
          ))}
        </g>
      </g>
      <g {...part("sri")} fill="var(--sindura)" style={{ fontFamily: "var(--font-tiro), serif" }}>
        {sriPoints.map((s, i) => (
          <text
            key={i}
            x={round(s.x)}
            y={round(s.y)}
            fontSize={17}
            textAnchor="middle"
            dominantBaseline="central"
            transform={`rotate(${s.rotate} ${round(s.x)} ${round(s.y)})`}
          >
            श्री
          </text>
        ))}
      </g>

      {/* The royal parasol: she is the great empress */}
      <g {...part("parasol")} stroke="var(--gold)" strokeWidth={1} strokeLinejoin="round">
        <line x1={CX} y1={104} x2={CX} y2={CY - R} strokeOpacity={0.8} />
        <path
          d={`M 258 104 C 266 70 296 56 ${CX} 54 C 344 56 374 70 382 104 Z`}
          fill="var(--art-vermilion)"
          fillOpacity={0.6}
        />
        {[270, 295, 345, 370].map((x) => (
          <line key={x} x1={CX} y1={56} x2={x} y2={104} strokeOpacity={0.7} strokeWidth={0.7} />
        ))}
        <path
          d={Array.from({ length: 10 }, (_, i) => `M ${258 + i * 12.4} 104 a 6.2 6.2 0 0 0 12.4 0`).join(" ")}
          fill="var(--gold)"
          fillOpacity={0.45}
        />
        {Array.from({ length: 11 }, (_, i) => 258 + i * 12.4).map((x, i) => (
          <g key={i} strokeOpacity={0.7} strokeWidth={0.7}>
            <line x1={round(x)} y1={104} x2={round(x)} y2={i % 2 ? 118 : 124} />
            <circle cx={round(x)} cy={i % 2 ? 120 : 126} r={1.8} fill="var(--gold)" stroke="none" />
          </g>
        ))}
        <circle cx={CX} cy={47} r={6} fill="var(--gold)" fillOpacity={0.7} />
        <path d={`M ${CX} 41 C ${CX - 4} 36 ${CX - 2} 30 ${CX} 26 C ${CX + 2} 30 ${CX + 4} 36 ${CX} 41 Z`} fill="var(--gold)" />
      </g>

      {/* The fire of awareness, rising from its kuṇḍa */}
      <g {...part("flame")}>
        <g className="m-breathe">
          <path
            className="m-lick"
            d={tongue(30, 11, -5)}
            transform="translate(238 440) rotate(-8)"
            fill={url("flame")}
          />
          <path
            className="m-lick m-late"
            d={tongue(26, 10, 5)}
            transform="translate(414 404) rotate(10)"
            fill={url("flame")}
          />
          <path
            d="M 300 706 C 250 702 220 666 224 614 C 228 570 252 548 248 506 C 246 484 238 468 224 452 C 252 464 274 490 278 526 C 282 562 268 592 282 632 C 290 662 300 682 300 706 Z"
            fill={url("flame")}
            fillOpacity={0.75}
          />
          <path
            d="M 340 706 C 394 702 420 662 416 604 C 412 558 388 534 394 484 C 397 456 406 436 424 418 C 400 428 376 458 370 494 C 364 534 378 572 366 616 C 358 650 342 676 340 706 Z"
            fill={url("flame")}
            fillOpacity={0.75}
          />
          <path
            d="M 320 708 C 266 708 248 664 256 614 C 264 564 300 540 302 486 C 304 440 284 410 292 360 C 298 318 318 290 312 238 C 311 224 313 212 318 198 C 332 234 348 268 350 312 C 352 352 336 384 344 430 C 352 478 388 520 388 588 C 388 660 366 708 320 708 Z"
            fill={url("flame")}
            fillOpacity={0.9}
          />
          <path
            d="M 320 705 C 282 705 270 670 276 636 C 282 598 306 578 308 540 C 310 506 302 480 312 436 C 330 474 338 510 336 546 C 334 586 364 606 366 642 C 368 678 352 705 320 705 Z"
            fill={url("flame-mid")}
            fillOpacity={0.8}
          />
          <path
            className="m-flicker"
            d="M 320 702 C 296 702 288 676 293 652 C 298 626 316 608 318 574 C 322 606 342 626 346 652 C 350 678 342 702 320 702 Z"
            fill="var(--art-core)"
            fillOpacity={0.85}
          />
        </g>
        <g>
          <circle cx={CX} cy={BY} r={46} fill={url("bindu")} />
          <circle cx={CX} cy={BY} r={4.5} fill="var(--art-core)" />
          <circle cx={CX} cy={BY} r={9} stroke="var(--art-core)" strokeWidth={0.8} strokeOpacity={0.8} />
        </g>

        <g stroke="var(--gold)" strokeWidth={1}>
          <rect x={200} y={700} width={240} height={16} fill="var(--art-stone)" />
          <rect x={214} y={716} width={212} height={16} fill="var(--art-stone)" />
          <rect x={228} y={732} width={184} height={16} fill="var(--art-stone)" />
        </g>
        <g fill="var(--sindura)" fillOpacity={0.55}>
          {Array.from({ length: 13 }, (_, i) => 212 + i * 18).map((x) => (
            <path key={x} d={`M ${x} 704 h 8 l -4 8 z`} />
          ))}
        </g>
        <g fill="var(--gold)" fillOpacity={0.7}>
          {Array.from({ length: 12 }, (_, i) => 226 + i * 17.1).map((x) => (
            <circle key={x} cx={round(x)} cy={724} r={1.6} />
          ))}
        </g>
      </g>

      {/* Rising for the gods' cause */}
      <g {...part("embers")} fill="var(--art-ember)">
        <Embers embers={EMBERS} />
      </g>

      {/* The lion throne */}
      <g {...part("throne")}>
        <g fill="var(--gold)" fillOpacity={0.5} stroke="var(--gold)" strokeWidth={0.8}>
          {petals.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g stroke="var(--gold)" strokeWidth={1}>
          <rect x={96} y={774} width={448} height={16} fill="var(--art-stone)" />
          <rect x={76} y={790} width={488} height={14} fill="var(--art-stone)" />
          <rect x={60} y={804} width={520} height={12} fill="var(--art-stone)" />
        </g>
        <g>
          {Array.from({ length: 11 }, (_, i) => 118 + i * 40.4).map((x, i) =>
            i % 2 ? (
              <circle key={x} cx={round(x)} cy={782} r={2.6} fill="var(--sindura)" fillOpacity={0.7} />
            ) : (
              <path key={x} d={`M ${round(x)} 777 l 5 5 l -5 5 l -5 -5 z`} fill="var(--gold)" />
            ),
          )}
        </g>
        <g className="text-gold" fill="currentColor" fillOpacity={0.6} stroke="currentColor" strokeWidth={0.8}>
          <g transform="translate(104 656)">
            <Lion />
          </g>
          <g transform="translate(536 656) scale(-1 1)">
            <Lion />
          </g>
        </g>
      </g>
    </svg>
  );
}
