/**
 * Prints every word of the dhyāna with the line and token numbers that
 * `data/dhyana-words.json` is keyed by.
 *
 * Run: pnpm tsx scripts/list-dhyana.ts
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const mod = JSON.parse(
  readFileSync(join(process.cwd(), "data/modules/000.json"), "utf8"),
) as { lines: { iast: string; deva: string; tokens: { iast: string; deva: string }[] }[] };

let total = 0;
mod.lines.forEach((line, i) => {
  console.log(`\nline ${i + 1}: ${line.iast}`);
  line.tokens.forEach((t, j) => {
    total += 1;
    console.log(`  { "line": ${i + 1}, "token": ${j} }  ${t.iast.padEnd(24)} ${t.deva}`);
  });
});

console.log(`\n${total} words across ${mod.lines.length} lines`);
