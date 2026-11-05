/**
 * Screenshots the chant-page miniature of one shloka beside its neighbours,
 * in both themes, at desktop and phone widths, in all three script modes, and
 * lays them out on one contact sheet.
 *
 *   pnpm exec tsx scripts/art-chant.ts 46
 *
 * Writes output/art-preview/<id>/chant-sheet.png (run after art:preview,
 * which clears that folder).
 */

import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

const n = Number(process.argv[2]);
if (!Number.isInteger(n)) {
  console.error("Usage: pnpm exec tsx scripts/art-chant.ts <shloka number>");
  process.exit(2);
}
const id = String(n).padStart(3, "0");
const out = resolve("output/art-preview", id);
mkdirSync(out, { recursive: true });
const base = "http://localhost:3000";
const url = `${base}/chant?from=${Math.max(1, n - 1)}&to=${Math.min(182, n + 1)}`;

const VIEWS = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "phone", width: 390, height: 844 },
];

async function main() {
  const browser = await chromium.launch();
  const tiles: { label: string; png: Buffer }[] = [];
  try {
    for (const theme of ["light", "dark"]) {
      for (const view of VIEWS) {
        for (const script of ["both", "deva", "iast"]) {
          const context = await browser.newContext({
            viewport: { width: view.width, height: view.height },
            deviceScaleFactor: view.name === "desktop" ? 2 : 1,
          });
          await context.addInitScript(
            ([t, s]) => {
              localStorage.setItem("theme", t);
              localStorage.setItem("script", s);
            },
            [theme, script],
          );
          const page = await context.newPage();
          await page.goto(url, { waitUntil: "networkidle" });
          await page.waitForTimeout(1500);
          const minis = page.locator(".art-miniature");
          const count = await minis.count();
          // The target shloka's card is the middle one, or the first if n is 1.
          const target = minis.nth(Math.min(count - 1, n === 1 ? 0 : 1));
          let png: Buffer;
          if (count) {
            await target.evaluate((el) => el.scrollIntoView({ block: "center" }));
            await page.waitForTimeout(600);
            // The verse card around the miniature, with a little of its neighbours.
            const box = await target.evaluate((el) => {
              let card: Element = el;
              while (card.parentElement && card.getBoundingClientRect().width < 320) card = card.parentElement;
              const r = card.getBoundingClientRect();
              return { x: r.x, y: r.y, width: r.width, height: r.height };
            });
            const x = Math.max(0, box.x - 10);
            const y = Math.max(0, box.y - 40);
            png = await page.screenshot({
              clip: {
                x,
                y,
                width: Math.min(view.width - x, box.width + 20),
                height: Math.min(view.height - y, box.height + 80),
              },
            });
          } else {
            png = await page.screenshot();
          }
          tiles.push({ label: `${theme} ${view.name} ${script}`, png });
          await context.close();
        }
      }
    }

    const html = `<html><body style="margin:0;background:#888;font:14px sans-serif">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:6px">
      ${tiles
        .map(
          (t) =>
            `<figure style="margin:0;background:#fff"><figcaption style="padding:2px 6px">${t.label}</figcaption><img style="width:100%;display:block" src="data:image/png;base64,${t.png.toString("base64")}"/></figure>`,
        )
        .join("")}
      </div></body></html>`;
    const sheet = await browser.newPage({ viewport: { width: 1800, height: 1000 } });
    await sheet.setContent(html, { waitUntil: "load" });
    await sheet.screenshot({ path: resolve(out, "chant-sheet.png"), fullPage: true });
    console.log(`wrote ${resolve(out, "chant-sheet.png")}`);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
