/**
 * Draws the site's icons from the yantra mark in the header (`YantraMark` in
 * `src/components/ornament.tsx`), with heavier strokes so it holds up at
 * favicon sizes.
 *
 *   pnpm icons:build
 *
 * Writes `src/app/icon.svg` (which follows the browser's light or dark
 * theme), `src/app/favicon.ico` (16, 32 and 48 px, for browsers and crawlers
 * that ask for it), and `src/app/apple-icon.png` (180 px, on the page colour).
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import sharp from "sharp";

const SINDURA = "#a8321f";
const SINDURA_BY_LAMPLIGHT = "#e2674c";
const PAGE = "#f5eddf";

/** The mark on a 32-unit grid. Below 32 px the inner ring only muddies it, so the smallest size leaves it out. */
function mark({ innerRing = true, themed = false } = {}): string {
  const style = themed
    ? `<style>.m{stroke:${SINDURA}}.b{fill:${SINDURA}}@media (prefers-color-scheme:dark){.m{stroke:${SINDURA_BY_LAMPLIGHT}}.b{fill:${SINDURA_BY_LAMPLIGHT}}}</style>`
    : `<style>.m{stroke:${SINDURA}}.b{fill:${SINDURA}}</style>`;
  const stroke = innerRing ? 2 : 2.25;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke-linejoin="round">`,
    style,
    `<circle class="m" cx="16" cy="16" r="${16 - stroke / 2}" stroke-width="${stroke}"/>`,
    innerRing ? `<circle class="m" cx="16" cy="16" r="11.75" stroke-width="1" opacity="0.6"/>` : "",
    `<path class="m" d="M6.2 10.4h19.6L16 27.2z" stroke-width="${stroke}"/>`,
    `<circle class="b" cx="16" cy="15.6" r="${innerRing ? 2 : 2.2}"/>`,
    `</svg>`,
  ].join("");
}

const png = (svg: string, size: number) =>
  sharp(Buffer.from(svg), { density: 1200 }).resize(size, size).png().toBuffer();

/** An .ico holding PNG images, which every browser since IE9 reads. */
function ico(images: { size: number; data: Buffer }[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size % 256, 0);
    entry.writeUInt8(size % 256, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function main() {
  const app = resolve(import.meta.dirname, "../src/app");

  writeFileSync(resolve(app, "icon.svg"), mark({ themed: true }) + "\n");

  writeFileSync(
    resolve(app, "favicon.ico"),
    ico([
      { size: 16, data: await png(mark({ innerRing: false }), 16) },
      { size: 32, data: await png(mark(), 32) },
      { size: 48, data: await png(mark(), 48) },
    ]),
  );

  const APPLE = 180;
  const inset = Math.round(APPLE * 0.16);
  await sharp({ create: { width: APPLE, height: APPLE, channels: 4, background: PAGE } })
    .composite([{ input: await png(mark(), APPLE - 2 * inset), left: inset, top: inset }])
    .png()
    .toFile(resolve(app, "apple-icon.png"));

  console.log("Wrote icon.svg, favicon.ico and apple-icon.png to src/app.");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
