/**
 * Screenshots a shloka's artwork in every view that matters, for review.
 *
 *   pnpm art:preview 12            # or 012, or 0 for the Dhyāna
 *   pnpm art:preview 12 --base http://localhost:3001
 *
 * Needs the dev server running and Chromium installed once with
 * `pnpm exec playwright install chromium`. Writes PNGs to
 * output/art-preview/<id>/ and exits non-zero if anything is wrong: errors in
 * the console, horizontal overflow, a note entry pointing at a part the
 * artwork doesn't draw, a drawn part no entry points at, or arrow keys in the
 * plate turning the page.
 */

import { mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { chromium, type Browser, type Page } from "playwright";

const args = process.argv.slice(2);
const rawId = args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--base");
const baseIndex = args.indexOf("--base");
const base = baseIndex >= 0 ? args[baseIndex + 1] : "http://localhost:3000";

if (!rawId || !/^\d{1,3}$/.test(rawId)) {
  console.error("Usage: pnpm art:preview <shloka number, 0 for the Dhyāna> [--base <url>]");
  process.exit(2);
}

const id = rawId.padStart(3, "0");
const url = `${base}/shloka/${id}`;
const out = resolve("output/art-preview", id);
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

type Theme = "light" | "dark";
type View = { name: string; width: number; height: number; touch?: boolean };

const DESKTOP: View = { name: "desktop", width: 1440, height: 1000 };
const VIEWS: View[] = [
  DESKTOP,
  // The narrowest width that shows the plate caption beside the commentary.
  { name: "caption", width: 1280, height: 1000 },
  { name: "tablet", width: 820, height: 1180, touch: true },
  { name: "phone", width: 390, height: 844, touch: true },
];
/** Long enough for the backdrop to finish kindling. */
const SETTLE_MS = 2800;
/** Browser chatter from the dev tooling, not from the page. */
const IGNORED_CONSOLE = [/Permissions policy violation/i];

const problems: string[] = [];
const shots: string[] = [];

async function open(
  browser: Browser,
  theme: Theme,
  view: View,
  { scale = 1, reducedMotion = false } = {},
) {
  const context = await browser.newContext({
    viewport: { width: view.width, height: view.height },
    hasTouch: view.touch ?? false,
    deviceScaleFactor: scale,
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
  });
  await context.addInitScript((t) => localStorage.setItem("theme", t), theme);
  const page = await context.newPage();
  const where = `${theme} ${view.name}`;
  page.on("console", (m) => {
    if (m.type() !== "error" || IGNORED_CONSOLE.some((re) => re.test(m.text()))) return;
    problems.push(`${where}: console error: ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`${where}: page error: ${e.message}`));
  const response = await page.goto(url, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`${url} answered ${response?.status()}. Is the dev server running?`);
  await page.waitForTimeout(SETTLE_MS);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 0) problems.push(`${where}: page scrolls sideways by ${overflow}px`);
  return page;
}

async function shot(page: Page, name: string, clip?: { x: number; y: number; width: number; height: number }) {
  const path = resolve(out, `${name}.png`);
  await page.screenshot({ path, clip });
  shots.push(path);
}

async function openPlate(page: Page) {
  await page.locator("[data-art-trigger]:visible").first().click();
  await page.locator("[role=dialog]").waitFor();
  await page.waitForTimeout(700);
}

async function reviewPlate(page: Page, theme: Theme) {
  await openPlate(page);
  await shot(page, `${theme}-plate`);

  const dialog = page.locator("[role=dialog]");
  const aims = [...new Set(await dialog.locator("[data-aim]").evaluateAll((els) => els.map((el) => el.getAttribute("data-aim")!)))];
  const parts = await dialog.locator("[data-part]").evaluateAll((els) => els.map((el) => el.getAttribute("data-part")!));

  if (theme === "light") {
    for (const aim of aims) {
      if (!parts.includes(aim)) problems.push(`the note points at "${aim}", but the artwork has no part by that name`);
    }
    for (const part of parts) {
      if (!aims.includes(part)) problems.push(`the artwork draws "${part}", but nothing in the note points at it`);
    }
    if (new Set(parts).size !== parts.length) problems.push("the artwork uses the same part name on more than one group");
  }

  for (const aim of aims) {
    const target = dialog.locator(`[data-aim="${aim}"]`).first();
    await target.click();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(650);
    await shot(page, `${theme}-spot-${aim}`);
    await target.click();
  }

  const before = page.url();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(400);
  if (page.url() !== before) problems.push(`${theme}: an arrow key inside the plate turned the page`);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  if (await dialog.count()) problems.push(`${theme}: Escape did not close the plate`);
}

async function main() {
  const browser = await chromium.launch();
  try {
    for (const theme of ["light", "dark"] as const) {
      for (const view of VIEWS) {
        const page = await open(browser, theme, view);
        if (!(await page.locator(".shloka-art").count())) {
          throw new Error(`No artwork is registered for ${id} (see src/components/shloka-art/registry.tsx).`);
        }
        await shot(page, `${theme}-${view.name}`);

        if (view.name === "caption") {
          const caption = page.locator("[data-art-trigger]:visible").first();
          await caption.scrollIntoViewIfNeeded();
          await caption.hover();
          await page.waitForTimeout(700);
          await shot(page, `${theme}-caption-hover`);
        }
        if (view.name === "phone") {
          await openPlate(page);
          await shot(page, `${theme}-phone-plate`);
        }
        if (view === DESKTOP) await reviewPlate(page, theme);
        await page.context().close();
      }

      const zoomed = await open(browser, theme, DESKTOP, { scale: 2 });
      const box = await zoomed.locator(".shloka-art").boundingBox();
      if (box) {
        const x = Math.max(0, box.x);
        await shot(zoomed, `${theme}-art-zoom`, {
          x,
          y: Math.max(0, box.y),
          width: Math.min(box.x + box.width, DESKTOP.width) - x,
          height: Math.min(box.height, DESKTOP.height - Math.max(0, box.y)),
        });
      }
      await zoomed.context().close();
    }

    const still = await open(browser, "light", DESKTOP, { reducedMotion: true });
    await shot(still, "light-reduced-motion");
    await still.context().close();
  } finally {
    await browser.close();
  }

  console.log(`${shots.length} screenshots in ${out}`);
  for (const s of shots) console.log(`  ${s.slice(out.length + 1)}`);
  if (problems.length) {
    console.error(`\n${problems.length} problem(s):`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  console.log("\nNo problems found.");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
