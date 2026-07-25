/**
 * Builds `data/namas.json`, the core linguistic dataset for the thousand names.
 *
 * The mechanical parts — parsing the nāmāvalī, transliteration, and recovering
 * the nominative from the dative the source gives — come from
 * `scripts/lib/namas-derive.ts`. The semantic parts — gloss, translation and
 * compound analysis — are hand-written in the `scripts/lib/namas-content-*.ts`
 * batch files and merged in here.
 *
 * Usage:
 *   pnpm tsx scripts/build-namas.ts            # requires all 1000 names
 *   pnpm tsx scripts/build-namas.ts --partial  # writes what exists so far
 */

import { readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import { devaToIast, iastToDeva } from "./lib/itrans";
import { deriveAll } from "./lib/namas-derive";
import { isNested, type Batch, type ChildSpec, type NamaContent } from "./lib/namas-types";

const OUT_PATH = join(process.cwd(), "data/namas.json");
const LIB_DIR = join(process.cwd(), "scripts/lib");

interface OutChild {
  text: string;
  iast: string;
  gloss: string;
  type?: string;
  vigraha?: string;
  children?: OutChild[];
}

interface OutNama {
  index: number;
  namavaliIast: string;
  namavaliDeva: string;
  iast: string;
  deva: string;
  gloss: string;
  translation: string;
  morphology: {
    pos: string;
    stem: string;
    stemIast: string;
    gender: string;
    case: string;
    caseNumber: number;
    number: string;
    declension: string;
    note?: string;
  };
  compound?: {
    text: string;
    iast: string;
    type: string;
    gloss: string;
    vigraha: string;
    children: OutChild[];
  };
}

/** Stem class and stem, read off the nominative where the ending allows it. */
function inferStem(iast: string): { declension: string; stem: string } | null {
  const table: Array<[RegExp, string, (s: string) => string]> = [
    [/ā$/, "ā-stem", (s) => s],
    [/īḥ$/, "ī-stem", (s) => s.slice(0, -1)],
    [/ī$/, "ī-stem", (s) => s],
    [/iḥ$/, "i-stem", (s) => s.slice(0, -1)],
    [/ūḥ$/, "ū-stem", (s) => s.slice(0, -1)],
    [/uḥ$/, "u-stem", (s) => s.slice(0, -1)],
  ];
  for (const [re, declension, toStem] of table) {
    if (re.test(iast)) return { declension, stem: toStem(iast) };
  }
  return null;
}

function buildChild(child: ChildSpec): OutChild {
  if (!isNested(child)) {
    const [iast, gloss] = child;
    return { text: iastToDeva(iast), iast, gloss };
  }
  return {
    text: iastToDeva(child.iast),
    iast: child.iast,
    gloss: child.gloss,
    type: child.type,
    vigraha: child.vigraha,
    children: child.children.map(buildChild),
  };
}

async function loadContent(): Promise<Map<number, NamaContent>> {
  const files = readdirSync(LIB_DIR)
    .filter((f) => /^namas-content-\d+\.ts$/.test(f))
    .sort();
  const merged = new Map<number, NamaContent>();
  for (const file of files) {
    const mod: { batch: Batch } = await import(join(LIB_DIR, file));
    for (const [key, value] of Object.entries(mod.batch)) {
      const index = Number(key);
      if (merged.has(index)) throw new Error(`duplicate content for nāma ${index} in ${file}`);
      merged.set(index, value);
    }
  }
  return merged;
}

function assemble(index: number, derivedIast: string, derivedDeva: string, namavaliIast: string, namavaliDeva: string, content: NamaContent): OutNama {
  const inferred = inferStem(derivedIast);
  const declension = content.declension ?? inferred?.declension;
  const stemIast = content.stem ?? inferred?.stem;
  if (!declension || !stemIast) {
    throw new Error(`nāma ${index} (${derivedIast}): stem class cannot be inferred, supply declension and stem`);
  }

  const out: OutNama = {
    index,
    namavaliIast,
    namavaliDeva,
    iast: derivedIast,
    deva: derivedDeva,
    gloss: content.gloss,
    translation: content.translation,
    morphology: {
      pos: content.pos ?? (content.compound?.type === "bahuvrīhi" ? "adjective" : "noun"),
      stem: iastToDeva(stemIast),
      stemIast,
      gender: content.gender ?? "feminine",
      case: content.grammaticalCase ?? "nominative",
      caseNumber: content.caseNumber ?? 1,
      number: content.number ?? "singular",
      declension,
    },
  };
  if (content.note) out.morphology.note = content.note;

  if (content.compound) {
    const iast = content.compound.iast ?? derivedIast;
    out.compound = {
      text: iastToDeva(iast),
      iast,
      type: content.compound.type,
      gloss: content.compound.gloss,
      vigraha: content.compound.vigraha,
      children: content.compound.children.map(buildChild),
    };
  }
  return out;
}

const SPOT_CHECKS: Record<number, string> = {
  1: "śrīmātā",
  2: "śrīmahārājñī",
  3: "śrīmatsiṃhāsaneśvarī",
  4: "cidagnikuṇḍasambhūtā",
  5: "devakāryasamudyatā",
  998: "śrīśivā",
  999: "śivaśaktyaikyarūpiṇī",
  1000: "lalitāmbikā",
};

function validate(entries: OutNama[], partial: boolean): string[] {
  const problems: string[] = [];

  if (!partial && entries.length !== 1000) {
    problems.push(`expected 1000 entries, got ${entries.length}`);
  }
  entries.forEach((e, i) => {
    if (!partial && e.index !== i + 1) problems.push(`index gap at position ${i}: got ${e.index}`);
    for (const field of ["iast", "deva", "gloss", "translation"] as const) {
      if (!e[field]?.trim()) problems.push(`nāma ${e.index}: empty ${field}`);
    }
    if (!e.morphology?.pos || !e.morphology?.stemIast) problems.push(`nāma ${e.index}: incomplete morphology`);
    // Devanagari must round-trip back to the IAST it was made from.
    const back = devaToIast(e.deva);
    if (back !== e.iast) problems.push(`nāma ${e.index}: round-trip ${e.iast} → ${e.deva} → ${back}`);
  });

  const byIndex = new Map(entries.map((e) => [e.index, e]));
  for (const [index, expected] of Object.entries(SPOT_CHECKS)) {
    const got = byIndex.get(Number(index));
    if (got && got.iast !== expected) problems.push(`spot check ${index}: expected ${expected}, got ${got.iast}`);
  }
  return problems;
}

async function main(): Promise<void> {
  const partial = process.argv.includes("--partial");
  const derived = deriveAll();
  const content = await loadContent();

  const missing = derived.filter((d) => !content.has(d.index)).map((d) => d.index);
  if (missing.length && !partial) {
    const preview = missing.slice(0, 20).join(", ");
    throw new Error(`missing content for ${missing.length} nāmas: ${preview}${missing.length > 20 ? " …" : ""}`);
  }

  const entries: OutNama[] = [];
  for (const d of derived) {
    const c = content.get(d.index);
    if (!c) continue;
    entries.push(assemble(d.index, d.iast, d.deva, d.namavaliIast, d.namavaliDeva, c));
  }

  const problems = validate(entries, partial);
  if (problems.length) {
    console.error(`${problems.length} validation problem(s):`);
    for (const p of problems.slice(0, 50)) console.error(`  ${p}`);
    if (!partial) process.exit(1);
  }

  mkdirSync(join(process.cwd(), "data"), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(entries, null, 2)}\n`, "utf8");

  const compounds = entries.filter((e) => e.compound);
  const types = new Map<string, number>();
  for (const e of compounds) types.set(e.compound!.type, (types.get(e.compound!.type) ?? 0) + 1);

  console.log(`wrote ${entries.length} entries to data/namas.json`);
  console.log(`  compounds: ${compounds.length} (${entries.length - compounds.length} simple)`);
  for (const [t, n] of [...types].sort((a, b) => b[1] - a[1])) console.log(`    ${t}: ${n}`);
  if (missing.length) console.log(`  still missing: ${missing.length}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
