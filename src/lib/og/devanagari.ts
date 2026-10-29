import { readFileSync } from "node:fs";
import { join } from "node:path";

import * as hb from "harfbuzzjs";

/**
 * Devanagari for share images, shaped by HarfBuzz and drawn as outlines.
 *
 * The share-image renderer lays text out glyph by glyph without the shaping
 * Devanagari needs, so its conjuncts fall apart (श्री comes out as श् + री) and
 * short-i signs land after their consonant. HarfBuzz shapes the text the way
 * a browser would, and the result goes in as an SVG image.
 */

let font: hb.Font | null = null;
let upem = 1000;

function tiro(): hb.Font {
  if (!font) {
    const data = readFileSync(join(process.cwd(), "src/assets/fonts/TiroDevanagariSanskrit-Regular.ttf"));
    const face = new hb.Face(new hb.Blob(data));
    upem = face.upem;
    font = new hb.Font(face);
  }
  return font;
}

/** Room above and below the baseline, in em, for the headstroke's marks and the vowel signs below. */
const ASCENT = 1.0;
const DESCENT = 0.42;

export type ShapedText = { src: string; width: number; height: number };

/**
 * Shape `text` in Tiro Devanagari Sanskrit at `size` px, coloured by run.
 * When `maxWidth` is given, the size shrinks until the line fits.
 */
export function shapeDevanagari(
  runs: { text: string; color: string }[],
  size: number,
  maxWidth?: number,
): ShapedText {
  const f = tiro();
  let x = 0;
  const groups: string[] = [];

  for (const run of runs) {
    const buf = new hb.Buffer();
    buf.addText(run.text);
    buf.guessSegmentProperties();
    hb.shape(f, buf);
    const infos = buf.getGlyphInfos();
    const positions = buf.getGlyphPositions();
    const paths: string[] = [];
    for (let i = 0; i < infos.length; i++) {
      const d = f.glyphToPath(infos[i].codepoint);
      const p = positions[i];
      if (d) paths.push(`<path transform="translate(${x + p.xOffset} ${p.yOffset})" d="${d}"/>`);
      x += p.xAdvance;
    }
    groups.push(`<g fill="${run.color}">${paths.join("")}</g>`);
  }

  const scale = Math.min(size, maxWidth && x > 0 ? (maxWidth * upem) / x : size) / upem;
  const ascent = ASCENT * upem;
  const height = (ASCENT + DESCENT) * upem;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${x} ${height}">` +
    `<g transform="translate(0 ${ascent}) scale(1 -1)">${groups.join("")}</g></svg>`;

  return {
    src: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
    width: Math.round(x * scale),
    height: Math.round(height * scale),
  };
}
