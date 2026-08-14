/**
 * Build-time content loading.
 *
 * Modules are plain JSON committed to the repo, so every page is statically
 * generated and nothing is fetched at runtime.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import type { ModuleSummary, Nama, StudyModule } from "./types";

const dataDir = resolve(process.cwd(), "data");

let summaryCache: ModuleSummary[] | null = null;
const moduleCache = new Map<string, StudyModule>();

export function getModuleSummaries(): ModuleSummary[] {
  if (!summaryCache) {
    summaryCache = JSON.parse(
      readFileSync(resolve(dataDir, "index.json"), "utf8"),
    ) as ModuleSummary[];
  }
  return summaryCache;
}

export function getModule(id: string): StudyModule {
  const cached = moduleCache.get(id);
  if (cached) return cached;

  const mod = JSON.parse(
    readFileSync(resolve(dataDir, "modules", `${id}.json`), "utf8"),
  ) as StudyModule;
  moduleCache.set(id, mod);
  return mod;
}

export function getAllModuleIds(): string[] {
  return getModuleSummaries().map((s) => s.id);
}

/** Previous and next modules, for the reading-order navigation. */
export function getNeighbours(id: string): {
  prev: ModuleSummary | null;
  next: ModuleSummary | null;
} {
  const all = getModuleSummaries();
  const i = all.findIndex((s) => s.id === id);
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i >= 0 && i < all.length - 1 ? all[i + 1] : null,
  };
}

/** Inclusive practice range: 0 = dhyāna (`000`), 1–182 = stotra shlokas. */
export function getModulesInRange(from: number, to: number): StudyModule[] {
  const start = Math.min(from, to);
  const end = Math.max(from, to);
  const modules: StudyModule[] = [];
  for (let n = start; n <= end; n++) {
    modules.push(getModule(String(n).padStart(3, "0")));
  }
  return modules;
}

export type NamaIndexEntry = Omit<Nama, "aksaras"> & { moduleId: string };

let namaIndexCache: NamaIndexEntry[] | null = null;

export function getNamaIndex(): NamaIndexEntry[] {
  if (!namaIndexCache) {
    namaIndexCache = JSON.parse(
      readFileSync(resolve(dataDir, "namas-index.json"), "utf8"),
    ) as NamaIndexEntry[];
  }
  return namaIndexCache;
}
