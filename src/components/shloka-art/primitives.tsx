/**
 * The shared drawing vocabulary of the shloka artworks.
 *
 * Every artwork is an original composition, but motifs that recur across the
 * series (a lion, a tongue of flame, rising embers) are drawn once here so
 * they look the same wherever they return. Promote a motif into this file the
 * second time an artwork needs it, and record it in docs/artwork-ledger.md.
 *
 * Everything here is deterministic: artworks render on the server for the
 * backdrop and again on the client inside the plate, and must match.
 */

import type { CSSProperties } from "react";

import type { ArtPart } from "./types";

export const round = (n: number) => Math.round(n * 100) / 100;

/** A point at `deg` degrees (0 = east, counter-clockwise, SVG y pointing down). */
export function polar(cx: number, cy: number, r: number, deg: number) {
  const t = (deg * Math.PI) / 180;
  return { x: round(cx + r * Math.cos(t)), y: round(cy - r * Math.sin(t)) };
}

/** Unique ids for an artwork's <defs>, so two copies can share a page. */
export function artIds(prefix: string) {
  const id = (name: string) => `${prefix}-${name}`;
  return { id, url: (name: string) => `url(#${id(name)})` };
}

/**
 * Attributes for each top-level part of an artwork. When a note points at
 * one part, every other part recedes. Put animations on elements *inside* a
 * part, never on the part's own group, or they will override the dimming.
 */
export function partProps(active: ArtPart | null | undefined) {
  return (name: ArtPart) => ({
    "data-part": name,
    "data-dim": active != null && active !== name ? true : undefined,
  });
}

/** A single tongue of flame, base at the origin, pointing up, tip leaning by `lean`. */
export function tongue(h: number, w: number, lean: number) {
  const p = round;
  return [
    `M ${p(-w / 2)} 0`,
    `C ${p(-w / 2 - 1)} ${p(-h * 0.35)} ${p(-w * 0.15)} ${p(-h * 0.5)} ${p(lean * 0.3)} ${p(-h * 0.68)}`,
    `C ${p(lean * 0.65)} ${p(-h * 0.8)} ${p(lean * 1.1)} ${p(-h * 0.88)} ${p(lean)} ${p(-h)}`,
    `C ${p(lean + w * 0.45)} ${p(-h * 0.8)} ${p(w * 0.6)} ${p(-h * 0.55)} ${p(w * 0.35)} ${p(-h * 0.35)}`,
    `C ${p(w * 0.22)} ${p(-h * 0.2)} ${p(w / 2 + 1)} ${p(-h * 0.1)} ${p(w / 2)} 0`,
    "Z",
  ].join(" ");
}

/** A round-topped arch: a semicircle of radius r centred on (cx, cy), on posts down to `bottom`. */
export type Arch = { cx: number; cy: number; bottom: number };

export function archPath({ cx, cy, bottom }: Arch, r: number) {
  return `M ${cx - r} ${bottom} V ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} V ${bottom}`;
}

export type Placement = { x: number; y: number; angle: number };

/**
 * Points spaced evenly along an arch of radius r, up one post, over the top
 * and down the other, each with its outward angle (0 = straight up).
 */
export function alongArch(
  { cx, cy, bottom }: Arch,
  r: number,
  spacing: number,
  skip?: (p: Placement) => boolean,
): Placement[] {
  const out: Placement[] = [];
  const postCount = Math.floor((bottom - 24 - cy) / spacing);
  for (let i = postCount; i >= 1; i--) {
    out.push({ x: cx - r, y: cy + i * spacing, angle: -90 });
  }
  const arcSteps = Math.round((Math.PI * r) / spacing);
  for (let i = 0; i <= arcSteps; i++) {
    const theta = Math.PI - (i / arcSteps) * Math.PI;
    out.push({
      x: cx + r * Math.cos(theta),
      y: cy - r * Math.sin(theta),
      angle: 90 - (theta * 180) / Math.PI,
    });
  }
  for (let i = 1; i <= postCount; i++) {
    out.push({ x: cx + r, y: cy + i * spacing, angle: 90 });
  }
  return skip ? out.filter((p) => !skip(p)) : out;
}

export type Ember = { x: number; y: number; r: number; dx: number; dur: number; delay: number };

/** Sparks that rise and fade on a loop (`m-ember`). Colour them with `fill` on the parent. */
export function Embers({ embers }: { embers: Ember[] }) {
  return (
    <>
      {embers.map((e, i) => (
        <circle
          key={i}
          className="m-ember"
          cx={e.x}
          cy={e.y}
          r={e.r}
          style={{ "--dx": `${e.dx}px`, "--dur": `${e.dur}s`, "--delay": `${e.delay}s` } as CSSProperties}
        />
      ))}
    </>
  );
}

/**
 * A seated lion facing right, base on y = 92, about 96 units wide. Paint it
 * with `fill`/`stroke` (currentColor works) on a parent group; mirror it with
 * `scale(-1 1)` to face left.
 */
export function Lion() {
  const mane = Array.from({ length: 11 }, (_, i) => {
    const deg = -200 + i * 26;
    const t = (deg * Math.PI) / 180;
    return {
      d: tongue(11, 8, 3),
      transform: `translate(${round(72 + 15 * Math.cos(t))} ${round(34 + 15 * Math.sin(t))}) rotate(${round(deg + 90)})`,
    };
  });
  return (
    <g>
      <path
        d="M 12 90 C -4 84 -6 62 4 52 C 10 46 14 40 10 32"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <path d={tongue(12, 9, -3)} transform="translate(10 33) rotate(-20)" />
      <path d="M 12 92 C 2 84 4 62 22 55 C 34 50 44 54 54 46 L 78 48 C 84 58 83 70 78 78 L 79 86 C 88 86 93 88 93 92 Z" />
      {mane.map((m, i) => (
        <path key={i} d={m.d} transform={m.transform} />
      ))}
      <circle cx={72} cy={34} r={16} />
      <path d="M 78 25 C 88 24 96 30 96 37 C 96 43 90 47 82 46 Z" />
      <g fill="none" stroke="var(--art-carve)" strokeWidth={1.3} strokeLinecap="round">
        <path d="M 20 72 C 30 62 48 64 54 76 C 57 83 62 88 70 88" />
        <path d="M 68 64 L 68 91" />
        <path d="M 88 41 C 91 42 93 41 95 40" />
      </g>
      <circle cx={84} cy={32} r={1.8} fill="var(--art-carve)" />
    </g>
  );
}
