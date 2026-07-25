"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import type { NamaIndexEntry } from "@/lib/content";

/** Fold text for diacritic-insensitive search, so "sri" finds "śrī". */
const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function NamaBrowser({ namas }: { namas: NamaIndexEntry[] }) {
  const [query, setQuery] = useState("");

  const folded = useMemo(
    () =>
      namas.map((n) => ({
        nama: n,
        haystack: fold(`${n.iast} ${n.gloss ?? ""} ${n.translation ?? ""} ${n.index}`) + " " + n.deva,
      })),
    [namas],
  );

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return namas;
    const fq = fold(q);
    return folded.filter((f) => f.haystack.includes(fq)).map((f) => f.nama);
  }, [folded, namas, query]);

  return (
    <>
      <div className="sticky top-14 z-30 -mx-4 mb-4 bg-surface-0/90 px-4 py-3 backdrop-blur-xl sm:top-16 sm:-mx-6 sm:px-6">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search names, meanings, or a number"
            className="w-full rounded-full border border-line bg-surface-1 py-2.5 pl-10 pr-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-line-strong"
          />
        </div>
        <p className="mt-2 text-[11px] text-ink-faint">
          {results.length === namas.length
            ? `${namas.length} names`
            : `${results.length} of ${namas.length}`}
        </p>
      </div>

      <ul className="grid gap-2 sm:grid-cols-2">
        {results.map((n) => (
          <li key={n.index}>
            <Link
              href={`/shloka/${n.moduleId}`}
              className="flex gap-3 rounded-xl border border-line bg-surface-1/50 px-4 py-3 transition-colors hover:border-line-strong hover:bg-surface-2/60"
            >
              <span className="w-9 shrink-0 pt-0.5 font-mono text-[11px] text-ink-faint">
                {n.index}
              </span>
              <span className="min-w-0 flex-1">
                <span className="deva block text-lg leading-snug text-ink">{n.deva}</span>
                <span className="iast block text-[13px] text-gold-soft">{n.iast}</span>
                {n.gloss && (
                  <span className="mt-0.5 block text-[13px] text-ink-muted">{n.gloss}</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {results.length === 0 && (
        <p className="py-12 text-center text-sm text-ink-faint">
          Nothing matched “{query}”.
        </p>
      )}
    </>
  );
}
