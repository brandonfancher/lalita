/**
 * Lays the screenshots from `pnpm art:preview <n>` out on a few contact
 * sheets, so a review takes three or four images instead of thirty.
 *
 *   pnpm exec tsx scripts/art-sheet.ts 46
 *
 * Writes into output/art-preview/<id>/:
 *   sheet-main.png   desktop, zoom and plate in both themes, plus tablet,
 *                    phone and the reduced-motion still
 *   sheet-spots.png  every spotlight, light theme above dark
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

const raw = process.argv[2];
if (!raw || !/^\d{1,3}$/.test(raw)) {
  console.error("Usage: pnpm exec tsx scripts/art-sheet.ts <shloka number>");
  process.exit(2);
}
const id = raw.padStart(3, "0");
const dir = resolve("output/art-preview", id);

const img = (name: string) => {
  const p = resolve(dir, `${name}.png`);
  return existsSync(p) ? `data:image/png;base64,${readFileSync(p).toString("base64")}` : null;
};

/** The plate's artwork panel within a 1440 × 1000 desktop screenshot. */
const PANEL = { x: 246, y: 155, w: 454, h: 689 };

function tile(src: string, crop: boolean) {
  if (!crop) return `<img style="width:100%;display:block" src="${src}"/>`;
  return `<div style="position:relative;overflow:hidden;aspect-ratio:${PANEL.w}/${PANEL.h}"><img style="position:absolute;display:block;width:${(1440 / PANEL.w) * 100}%;left:${(-PANEL.x / PANEL.w) * 100}%;top:${(-PANEL.y / PANEL.h) * 100}%" src="${src}"/></div>`;
}

function grid(names: string[], cols: number, crop = false) {
  return `<html><body style="margin:0;background:#888;font:13px sans-serif">
    <div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:5px;padding:5px">
    ${names
      .map((n) => [n, img(n)] as const)
      .filter(([, src]) => src)
      .map(
        ([n, src]) =>
          `<figure style="margin:0;background:#fff"><figcaption style="padding:1px 5px">${n}</figcaption>${tile(src!, crop)}</figure>`,
      )
      .join("")}
    </div></body></html>`;
}

async function main() {
  const files = readdirSync(dir).filter((f) => f.endsWith(".png"));
  const spots = (theme: string) =>
    files.filter((f) => f.startsWith(`${theme}-spot-`)).map((f) => f.replace(/\.png$/, "")).sort();

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 2000, height: 1000 } });
    const sheets: [string, string[], number, boolean?][] = [
      [
        "sheet-main",
        [
          "light-desktop",
          "dark-desktop",
          "light-art-zoom",
          "dark-art-zoom",
          "light-plate",
          "dark-plate",
          "light-tablet",
          "dark-phone",
          "light-reduced-motion",
        ],
        3,
      ],
      ["sheet-spots", [...spots("light"), ...spots("dark")], 6, true],
    ];
    for (const [name, names, cols, crop] of sheets) {
      await page.setContent(grid(names, cols, crop), { waitUntil: "load" });
      await page.screenshot({ path: resolve(dir, `${name}.png`), fullPage: true });
      console.log(`wrote ${resolve(dir, `${name}.png`)}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
