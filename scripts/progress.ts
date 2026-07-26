/**
 * Reports how much of the hand-written nāma content exists, batch by batch.
 *
 * Run: pnpm tsx scripts/progress.ts
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const LIB_DIR = join(process.cwd(), "scripts/lib");
const BATCH_SIZE = 100;

function bar(done: number, total: number, width = 24): string {
  const filled = Math.round((done / total) * width);
  return `${"█".repeat(filled)}${"·".repeat(width - filled)}`;
}

const files = readdirSync(LIB_DIR)
  .filter((f) => /^namas-content-\d+\.ts$/.test(f))
  .sort();

let total = 0;
console.log("nāma content by batch\n");

for (let start = 1; start <= 1000; start += BATCH_SIZE) {
  const name = `namas-content-${String(start).padStart(3, "0")}.ts`;
  const path = join(LIB_DIR, name);
  const range = `${start}–${start + BATCH_SIZE - 1}`.padEnd(9);

  if (!existsSync(path)) {
    console.log(`  ${range} ${bar(0, BATCH_SIZE)}    0/100  not started`);
    continue;
  }

  // Count top-level numeric keys, which is one per nāma entry.
  const src = readFileSync(path, "utf8");
  const count = (src.match(/^\s{2}\d+:\s*\{/gm) ?? []).length;
  const age = Math.round((Date.now() - statSync(path).mtimeMs) / 1000);
  const when = age < 90 ? `updated ${age}s ago` : `updated ${Math.round(age / 60)}m ago`;
  total += count;
  console.log(
    `  ${range} ${bar(count, BATCH_SIZE)} ${String(count).padStart(4)}/100  ${count === BATCH_SIZE ? "complete" : when}`,
  );
}

console.log(`\n  total ${total}/1000 (${Math.round((total / 1000) * 100)}%)`);

const built = join(process.cwd(), "data/namas.json");
if (existsSync(built)) {
  const entries: Array<{ gloss?: string }> = JSON.parse(readFileSync(built, "utf8"));
  const withGloss = entries.filter((e) => e.gloss?.trim()).length;
  console.log(`  built into data/namas.json: ${withGloss}/${entries.length} with meanings`);
}
