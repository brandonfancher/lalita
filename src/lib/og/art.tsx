import { Fragment, isValidElement, type ReactElement, type ReactNode } from "react";

import { ARTWORK } from "@/components/shloka-art/registry";

/**
 * A shloka's artwork as a standalone SVG, for share images.
 *
 * The drawings take their colours from CSS custom properties, which an image
 * renderer can't resolve, so the lamplight palette (the dark theme, where the
 * artwork glows) is written into the markup here. Motion classes are dropped:
 * a share image is the still first frame.
 */

const LAMPLIGHT: Record<string, string> = {
  "surface-0": "#15100c",
  "surface-1": "#1d1611",
  "surface-2": "#271e17",
  sindura: "#e2674c",
  "sindura-soft": "#ee8b70",
  gold: "#d0a24a",
  "gold-soft": "#e2bf78",
  lotus: "#d6809e",
  leaf: "#95ae7c",
  border: "#3a2d23",
  "border-strong": "#56432f",
  "art-glow": "#e2674c",
  "art-vermilion": "#e2674c",
  "art-saffron": "#e8913a",
  "art-core": "#ffe4ae",
  "art-ember": "#f3b36b",
  "art-stone": "#271e17",
  "art-carve": "#15100c",
  "art-ivory": "#f1e8d6",
  "art-hair": "#5d6788",
  "art-moon": "#e9edf3",
  "art-musk": "#34221a",
  "art-crimson": "#9c3024",
  "art-turmeric": "#f0bf3f",
  "font-tiro": "serif",
};

/** The part of the canvas every composition keeps within, as in the chant miniature. */
export const ART_CROP = { x: 70, y: 30, w: 500, h: 750 };

export const hasShareArt = (id: string) => id in ARTWORK;

/** SVG attributes that are camelCase in SVG itself; every other camelCase prop is hyphenated. */
const CAMEL_ATTRS = new Set([
  "viewBox",
  "preserveAspectRatio",
  "gradientUnits",
  "gradientTransform",
  "patternUnits",
  "patternContentUnits",
  "patternTransform",
  "maskUnits",
  "maskContentUnits",
  "clipPathUnits",
  "filterUnits",
  "primitiveUnits",
  "stdDeviation",
  "spreadMethod",
  "startOffset",
  "textLength",
  "lengthAdjust",
  "pathLength",
  "markerWidth",
  "markerHeight",
  "markerUnits",
  "refX",
  "refY",
]);

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const resolve = (s: string) => s.replace(/var\(--([a-z0-9-]+)\)/g, (match, name: string) => LAMPLIGHT[name] ?? match);

function attrs(props: Record<string, unknown>): string {
  let out = "";
  for (const [key, value] of Object.entries(props)) {
    if (key === "children" || key === "className" || key === "key" || value == null || value === false) continue;
    if (typeof value === "function") continue;
    let name = key;
    let text: string;
    if (key === "style" && typeof value === "object") {
      text = Object.entries(value as Record<string, unknown>)
        .filter(([, v]) => v != null)
        .map(([k, v]) => `${kebab(k)}:${v}`)
        .join(";");
    } else {
      if (key === "xlinkHref") name = "xlink:href";
      else if (!key.startsWith("data-") && !CAMEL_ATTRS.has(key)) name = kebab(key);
      text = String(value);
    }
    out += ` ${name}="${escape(resolve(text))}"`;
  }
  return out;
}

/** Serialise a tree of plain SVG elements and hook-free components. */
function toSvg(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return escape(String(node));
  if (Array.isArray(node)) return node.map(toSvg).join("");
  if (!isValidElement(node)) return "";

  const el = node as ReactElement<Record<string, unknown>>;
  const { type, props } = el;
  if (type === Fragment) return toSvg(props.children as ReactNode);
  if (typeof type === "function") return toSvg((type as (p: unknown) => ReactNode)(props));
  // The image renderer has no fonts to draw SVG text with; these are only small inscriptions.
  if (typeof type !== "string" || type === "text") return "";
  return `<${type}${attrs(props)}>${toSvg(props.children as ReactNode)}</${type}>`;
}

/** The artwork as a data URI, cropped to its composition, or null if the shloka has none yet. */
export function artDataUri(id: string): string | null {
  const artwork = ARTWORK[id];
  if (!artwork) return null;
  const { Art } = artwork;

  const markup = toSvg(<Art idPrefix={`og-${id}`} />)
    .replace(/viewBox="0 0 640 830"/, `viewBox="${ART_CROP.x} ${ART_CROP.y} ${ART_CROP.w} ${ART_CROP.h}"`)
    .replace(/^<svg /, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ');

  return `data:image/svg+xml;base64,${Buffer.from(markup).toString("base64")}`;
}
