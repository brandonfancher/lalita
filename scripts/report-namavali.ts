/**
 * Locates discrepancies in the nāmāvalī parse using the decade checkpoints
 * (`... namaH | 10`, `| 20`, ...) that the source records every ten names.
 *
 * Run: pnpm tsx scripts/report-namavali.ts
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const raw = readFileSync(resolve(root, "sources/text/lalitaa1000.itx"), "utf8");

const lines = raw.split("\n");
const start = lines.findIndex((l) => /sahasranAmAvalI/.test(l));

let count = 0;
let firstBad: number | null = null;

for (let i = start + 1; i < lines.length; i += 1) {
  const line = lines[i].trim();
  if (!/namaH/.test(line)) continue;
  count += 1;

  const checkpoint = line.match(/\|\s*(\d+)\s*$/);
  if (checkpoint) {
    const expected = Number(checkpoint[1]);
    if (expected !== count) {
      if (firstBad === null) firstBad = i;
      console.log(
        `line ${i + 1}: checkpoint says ${expected}, parsed count is ${count} (delta ${count - expected})`,
      );
    }
  }
}

console.log(`\ntotal entries parsed: ${count}`);

if (firstBad !== null) {
  console.log(`\n=== context around first divergence (line ${firstBad + 1}) ===`);
  for (let i = Math.max(0, firstBad - 14); i <= firstBad + 2; i += 1) {
    console.log(`${String(i + 1).padStart(5)}: ${lines[i]}`);
  }
}
