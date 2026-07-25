/**
 * Verifies that all 1000 names align to their verses.
 *
 * The source marks where each hundred names begins, so those markers act both
 * as segment boundaries for the alignment and as the check on its output.
 *
 * Run: pnpm tsx scripts/report-alignment.ts
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { parseSource, parseNamavali } from "./lib/parse-source";
import { alignNamas } from "./lib/align-namas";
import { toIast } from "./lib/itrans";

const root = resolve(import.meta.dirname, "..");
const raw = readFileSync(resolve(root, "sources/text/lalitacomplete.itx"), "utf8");
const namavaliRaw = readFileSync(resolve(root, "sources/text/lalitaa1000.itx"), "utf8");

const { verses, kalaMarkers } = parseSource(raw);
const namavali = parseNamavali(namavaliRaw);
console.log(`nāmāvalī entries: ${namavali.length}`);
console.log(`verses: ${verses.length}`);

// The closing half-verse ends with a narrative line ("... so they recited the
// thousand names of Lalitā") that is not part of the names themselves.
const lastIdx = verses.length - 1;
const words: { verseIndex: number; iast: string }[] = [];
verses.forEach((v, vi) => {
  const lines = vi === lastIdx ? v.lines.slice(0, 1) : v.lines;
  for (const line of lines) {
    for (const w of line.split(/\s+/).filter(Boolean)) {
      words.push({ verseIndex: vi, iast: toIast(w) });
    }
  }
});
console.log(`verse words: ${words.length}`);

// Each hundred-marker becomes a soft anchor: by the verse where the marker
// sits, that many names should be complete.
const anchors = kalaMarkers.map((m) => ({
  namesBefore: m.firstNama - 1,
  wordIndex: words.findIndex((w) => w.verseIndex >= m.verseIndex),
}));
console.log(`anchors: ${anchors.length}`);

const { namas, byVerse, warnings } = alignNamas(words, namavali, anchors);

console.log(`\naligned names: ${namas.length}`);
console.log(`  fused with a neighbour: ${namas.filter((n) => n.fused).length}`);
console.log(`  weak matches (>0.4):    ${namas.filter((n) => n.score > 0.4).length}`);

console.log("\n=== INTEGRITY ===");
const indices = namas.map((n) => n.index);
const contiguous = indices.every((v, i) => v === i + 1);
console.log(`  indices 1..1000 contiguous: ${contiguous}`);
console.log(`  empty slices: ${namas.filter((n) => !n.iast.trim()).length}`);
const versesCovered = new Set(namas.map((n) => n.verseIndex)).size;
console.log(`  verses containing names: ${versesCovered} of ${verses.length}`);

console.log("\n=== KALĀ CHECKPOINTS ===");
let bad = 0;
for (const marker of kalaMarkers) {
  const before = namas.filter((n) => n.verseIndex < marker.verseIndex).length;
  const expected = marker.firstNama - 1;
  if (before !== expected) bad += 1;
  console.log(
    `  names ${String(marker.firstNama).padStart(4)}-${String(marker.lastNama).padEnd(4)}: before=${before} expected=${expected}  ${before === expected ? "ok" : "MISMATCH"}`,
  );
}
console.log(`checkpoint mismatches: ${bad}/${kalaMarkers.length}`);

console.log("\n=== NAMES PER VERSE ===");
const dist = new Map<number, number>();
for (const [, list] of byVerse) dist.set(list.length, (dist.get(list.length) ?? 0) + 1);
[...dist.entries()].sort((a, b) => a[0] - b[0]).forEach(([c, f]) => console.log(`  ${c} names: ${f} verses`));

const show = (vi: number, label: string) => {
  console.log(`\n=== ${label} ===`);
  for (const n of byVerse.get(vi) ?? []) {
    console.log(`  ${String(n.index).padStart(4)}. ${n.iast}${n.fused ? "   [fused]" : ""}`);
  }
};
show(0, "VERSE 1");
show(52, "VERSE 53");
show(lastIdx, "FINAL HALF-VERSE");

console.log("\n=== WEAKEST MATCHES ===");
[...namas]
  .sort((a, b) => b.score - a.score)
  .slice(0, 12)
  .forEach((n) => console.log(`  ${n.index}. "${n.iast}" (score ${n.score.toFixed(2)}, verse ${n.verseIndex + 1})`));

if (warnings.length) {
  console.log(`\n=== WARNINGS (${warnings.length}) ===`);
  warnings.slice(0, 20).forEach((w) => console.log(`  ${w}`));
}
