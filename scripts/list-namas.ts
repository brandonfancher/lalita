/**
 * Prints the mechanically derived form of a range of nāmas, for use when
 * writing the hand-authored content batches.
 *
 * Run: pnpm tsx scripts/list-namas.ts 1 100
 */

import { deriveAll } from "./lib/namas-derive";

const from = Number(process.argv[2] ?? 1);
const to = Number(process.argv[3] ?? from + 99);

const all = deriveAll();
for (const d of all) {
  if (d.index < from || d.index > to) continue;
  console.log(`${String(d.index).padStart(4)}  ${d.iast.padEnd(42)} ${d.deva}`);
}
console.log(`\n${to - from + 1} nāmas (${from}–${to})`);
