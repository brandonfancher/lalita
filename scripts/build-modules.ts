/**
 * Compiles the study modules.
 *
 * Reads the ITRANS sources, aligns the thousand names to their verses, and
 * merges in whatever enrichment data is available (name meanings, chant
 * timings, commentary). Emits one JSON file per module plus an index.
 *
 * Enrichment inputs are optional so the site can be built and developed before
 * every dataset is finished; missing pieces simply leave fields empty.
 *
 * Run: pnpm tsx scripts/build-modules.ts
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { parseSource, parseNamavali } from "./lib/parse-source";
import { alignNamas, type Anchor } from "./lib/align-namas";
import { toDevanagari, toIast, iastToDeva } from "./lib/itrans";
import { analyzeAksaras } from "../src/lib/aksara";
import type {
  Commentary,
  Morphology,
  Nama,
  Reference,
  StudyModule,
  ModuleSummary,
  Token,
  VerseLine,
  ChantTiming,
  CompoundNode,
} from "../src/lib/types";

const root = resolve(import.meta.dirname, "..");
const dataDir = resolve(root, "data");
const modulesDir = resolve(dataDir, "modules");

/** Optional enrichment produced by the name-meanings pipeline. */
interface NamaEnrichment {
  index: number;
  iast?: string;
  deva?: string;
  namavaliIast?: string;
  namavaliDeva?: string;
  gloss?: string;
  translation?: string;
  morphology?: Morphology;
  compound?: CompoundNode;
  commentary?: string;
}

interface ChantTimings {
  verses?: { number: number; startSec: number; endSec: number; confidence?: string }[];
  sections?: { dhyana?: { startSec: number; endSec: number } };
  dhyanaVerses?: { index: number; startSec: number; endSec: number }[];
}

function readJsonIfPresent<T>(path: string): T | null {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8")) as T;
  } catch (err) {
    console.warn(`  ! could not parse ${path}: ${(err as Error).message}`);
    return null;
  }
}

/** Build the clickable token list for a line of verse. */
function buildTokens(
  lineItrans: string,
  lineIndex: number,
  namaLookup: Map<string, number>,
): Token[] {
  return lineItrans
    .split(/\s+/)
    .filter(Boolean)
    .map((word, i) => {
      const deva = toDevanagari(word);
      const iast = toIast(word);
      return {
        id: `l${lineIndex}-t${i}`,
        deva,
        iast,
        namaIndex: namaLookup.get(iast),
        aksaras: analyzeAksaras(deva),
      };
    });
}

function main() {
  console.log("Building modules...\n");

  const raw = readFileSync(resolve(root, "sources/text/lalitacomplete.itx"), "utf8");
  const namavaliRaw = readFileSync(resolve(root, "sources/text/lalitaa1000.itx"), "utf8");

  const { verses, dhyanaVerses, kalaMarkers } = parseSource(raw);
  const namavali = parseNamavali(namavaliRaw);
  console.log(`  parsed ${verses.length} verses, ${dhyanaVerses.length} dhyāna verses, ${namavali.length} names`);

  // Align names to verses, excluding the closing narrative line.
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

  const anchors: Anchor[] = kalaMarkers.map((m) => ({
    namesBefore: m.firstNama - 1,
    wordIndex: words.findIndex((w) => w.verseIndex >= m.verseIndex),
  }));

  const { byVerse, namas: aligned, warnings } = alignNamas(words, namavali, anchors);
  console.log(`  aligned ${aligned.length} names (${warnings.length} warnings)`);

  // Optional enrichment.
  const enrichment = readJsonIfPresent<NamaEnrichment[]>(resolve(dataDir, "namas.json"));
  const enrichmentBy = new Map<number, NamaEnrichment>();
  for (const e of enrichment ?? []) enrichmentBy.set(e.index, e);
  console.log(`  name meanings: ${enrichment ? `${enrichment.length} entries` : "not yet available"}`);

  const timings = readJsonIfPresent<ChantTimings>(resolve(dataDir, "chant/timings.json"));
  console.log(`  chant timings: ${timings?.verses ? `${timings.verses.length} verses` : "not yet available"}`);

  const commentaryAll =
    readJsonIfPresent<Record<string, { commentary?: Commentary; references?: Reference[]; subtitle?: string }>>(
      resolve(dataDir, "commentary.json"),
    ) ?? {};

  mkdirSync(modulesDir, { recursive: true });

  const summaries: ModuleSummary[] = [];
  const modules: StudyModule[] = [];

  // --- Module 000: the dhyāna verses -------------------------------------
  {
    const lines: VerseLine[] = [];
    dhyanaVerses.forEach((verse, vi) => {
      verse.forEach((line, li) => {
        lines.push({
          deva: toDevanagari(line),
          iast: toIast(line),
          tokens: buildTokens(line, vi * 10 + li, new Map()),
        });
      });
    });

    const extra = commentaryAll["000"] ?? {};
    const chant: ChantTiming | undefined = timings?.sections?.dhyana
      ? { ...timings.sections.dhyana, confidence: "detected" }
      : undefined;

    const mod: StudyModule = {
      id: "000",
      kind: "dhyana",
      number: null,
      title: "Dhyāna",
      subtitle: extra.subtitle ?? "The meditation verses",
      lines,
      namas: [],
      chant,
      commentary: extra.commentary ?? { meaning: "" },
      references: extra.references ?? [],
    };
    modules.push(mod);
    summaries.push({
      id: mod.id,
      kind: mod.kind,
      number: null,
      title: mod.title,
      subtitle: mod.subtitle,
      previewDeva: lines[0]?.deva ?? "",
      previewIast: lines[0]?.iast ?? "",
      namaCount: 0,
    });
  }

  // --- Modules 001..182: the stotra ---------------------------------------
  verses.forEach((verse, vi) => {
    const number = verse.number ?? 182;
    const id = String(number).padStart(3, "0");
    const verseNamas = byVerse.get(vi) ?? [];

    // The final half-verse belongs with verse 182.
    const isTrailingHalf = verse.number === null;

    const namaLookup = new Map<string, number>();
    for (const n of verseNamas) namaLookup.set(n.iast, n.index);

    const lines: VerseLine[] = verse.lines.map((line, li) => ({
      deva: toDevanagari(line),
      iast: toIast(line),
      tokens: buildTokens(line, li, namaLookup),
    }));

    const namas: Nama[] = verseNamas.map((a) => {
      const e = enrichmentBy.get(a.index);
      const iast = e?.iast ?? a.iast;
      const deva = e?.deva ?? iastToDeva(iast);
      const morphology: Morphology =
        e?.morphology ?? {
          pos: "noun",
          stem: deva,
          stemIast: iast,
          gender: "feminine",
          case: "nominative",
          caseNumber: 1,
          number: "singular",
        };
      return {
        index: a.index,
        deva,
        iast,
        namavaliDeva: e?.namavaliDeva,
        namavaliIast: e?.namavaliIast,
        gloss: e?.gloss ?? "",
        translation: e?.translation ?? "",
        aksaras: analyzeAksaras(deva),
        morphology,
        compound: e?.compound,
        commentary: e?.commentary,
      };
    });

    const existing = modules.find((m) => m.id === id);
    if (isTrailingHalf && existing) {
      existing.lines.push(...lines);
      existing.namas.push(...namas);
      if (existing.namas.length) {
        existing.namaRange = [
          existing.namas[0].index,
          existing.namas[existing.namas.length - 1].index,
        ];
      }
      return;
    }

    const extra = commentaryAll[id] ?? {};
    const timing = timings?.verses?.find((v) => v.number === number);
    const chant: ChantTiming | undefined = timing
      ? {
          startSec: timing.startSec,
          endSec: timing.endSec,
          confidence: (timing.confidence as ChantTiming["confidence"]) ?? "detected",
        }
      : undefined;

    const mod: StudyModule = {
      id,
      kind: "shloka",
      number,
      title: `Shloka ${number}`,
      subtitle: extra.subtitle,
      lines,
      namas,
      namaRange: namas.length ? [namas[0].index, namas[namas.length - 1].index] : undefined,
      chant,
      commentary: extra.commentary ?? { meaning: "" },
      references: extra.references ?? [],
    };
    modules.push(mod);
  });

  // Summaries for every stotra module, in order.
  for (const mod of modules) {
    if (mod.kind === "dhyana") continue;
    summaries.push({
      id: mod.id,
      kind: mod.kind,
      number: mod.number,
      title: mod.title,
      subtitle: mod.subtitle,
      namaRange: mod.namaRange,
      previewDeva: mod.lines[0]?.deva ?? "",
      previewIast: mod.lines[0]?.iast ?? "",
      namaCount: mod.namas.length,
    });
  }

  for (const mod of modules) {
    writeFileSync(resolve(modulesDir, `${mod.id}.json`), JSON.stringify(mod), "utf8");
  }
  writeFileSync(resolve(dataDir, "index.json"), JSON.stringify(summaries, null, 2), "utf8");

  // A flat name list powers search and the nāma index.
  const flat = modules
    .flatMap((m) => m.namas.map((n) => ({ ...n, moduleId: m.id, aksaras: undefined })))
    .sort((a, b) => a.index - b.index);
  writeFileSync(resolve(dataDir, "namas-index.json"), JSON.stringify(flat), "utf8");

  const totalNamas = modules.reduce((a, m) => a + m.namas.length, 0);
  console.log(`\n  wrote ${modules.length} modules to data/modules/`);
  console.log(`  total names across modules: ${totalNamas}`);
  console.log(`  modules with chant timing: ${modules.filter((m) => m.chant).length}`);
  console.log(`  modules with commentary:   ${modules.filter((m) => m.commentary.meaning).length}`);
  console.log(`  names with meanings:       ${modules.flatMap((m) => m.namas).filter((n) => n.gloss).length}`);

  if (totalNamas !== 1000) {
    console.warn(`\n  WARNING: expected 1000 names across modules, got ${totalNamas}`);
  }
}

main();
