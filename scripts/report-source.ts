/**
 * Diagnostic pass over the parsed source. Prints structure and checks the
 * name tokenization against the editors' every-hundred `kalā` checkpoints.
 *
 * Run: pnpm tsx scripts/report-source.ts
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { parseSource, tokenizeNamas, parseNamavali } from "./lib/parse-source";
import { toDevanagari, toIast } from "./lib/itrans";

const root = resolve(import.meta.dirname, "..");
const raw = readFileSync(resolve(root, "sources/text/lalitacomplete.itx"), "utf8");
const namavaliRaw = readFileSync(resolve(root, "sources/text/lalitaa1000.itx"), "utf8");

const { dhyanaVerses, verses, kalaMarkers } = parseSource(raw);

console.log("=== DHYĀNA ===");
console.log(`verses: ${dhyanaVerses.length}`);
dhyanaVerses.forEach((v, i) => {
  console.log(`  ${i + 1}: ${v.length} lines, starts "${v[0]?.slice(0, 46)}..."`);
});

console.log("\n=== STOTRA ===");
console.log(`verses parsed: ${verses.length}`);
const numbered = verses.filter((v) => v.number !== null);
console.log(`numbered: ${numbered.length}, unnumbered (half-verse): ${verses.length - numbered.length}`);

const nums = numbered.map((v) => v.number as number);
const gaps: number[] = [];
for (let i = 1; i <= 182; i += 1) if (!nums.includes(i)) gaps.push(i);
console.log(`missing verse numbers: ${gaps.length ? gaps.join(", ") : "none"}`);

const tokenCounts = verses.map(tokenizeNamas).map((t) => t.length);
const total = tokenCounts.reduce((a, b) => a + b, 0);
console.log(`total whitespace tokens across all verses: ${total}`);

console.log("\n=== KALĀ CHECKPOINTS ===");
let running = 0;
let mismatches = 0;
for (const marker of kalaMarkers) {
  const before = verses
    .slice(0, marker.verseIndex)
    .map(tokenizeNamas)
    .reduce((a, t) => a + t.length, 0);
  const expected = marker.firstNama - 1;
  const delta = before - expected;
  if (delta !== 0) mismatches += 1;
  console.log(
    `  ${marker.label}: names before this point = ${before}, expected ${expected}, delta ${delta > 0 ? "+" : ""}${delta}`,
  );
  running = marker.lastNama;
}
console.log(`checkpoint mismatches: ${mismatches}/${kalaMarkers.length} (last marker ends at ${running})`);

console.log("\n=== NĀMĀVALĪ ===");
const namavali = parseNamavali(namavaliRaw);
console.log(`entries parsed: ${namavali.length}`);
console.log(`  first: ${namavali[0]}`);
console.log(`  second: ${namavali[1]}`);
console.log(`  last: ${namavali[namavali.length - 1]}`);

console.log("\n=== SAMPLE RENDER (verse 1) ===");
const v1 = verses.find((v) => v.number === 1);
if (v1) {
  for (const line of v1.lines) {
    console.log(`  ITRANS: ${line}`);
    console.log(`  DEVA:   ${toDevanagari(line)}`);
    console.log(`  IAST:   ${toIast(line)}`);
  }
  console.log(`  names:  ${tokenizeNamas(v1).map(toIast).join(" | ")}`);
}

console.log("\n=== SAMPLE RENDER (final half-verse) ===");
const last = verses[verses.length - 1];
for (const line of last.lines) {
  console.log(`  IAST:   ${toIast(line)}`);
}
console.log(`  names:  ${tokenizeNamas(last).map(toIast).join(" | ")}`);

console.log("\n=== TOKEN COUNT DISTRIBUTION ===");
const dist = new Map<number, number>();
for (const c of tokenCounts) dist.set(c, (dist.get(c) ?? 0) + 1);
[...dist.entries()]
  .sort((a, b) => a[0] - b[0])
  .forEach(([count, freq]) => console.log(`  ${count} names/verse: ${freq} verses`));
