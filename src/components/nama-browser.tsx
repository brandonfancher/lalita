"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { FitText } from "@/components/fit-text";
import { HyphenatedText } from "@/components/hyphenated-text";
import { WordBreakToggle } from "@/components/word-break-toggle";
import type { NamaIndexEntry } from "@/lib/content";

/**
 * Fold text for diacritic-insensitive search, so "sri" finds "śrī", and
 * "padma-raga" finds the name however word breaks are set.
 */
const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-/g, "")
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
      <div className="sticky top-0 z-30 -mx-4 mb-4 border-b border-line bg-surface-0/85 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
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
            className="w-full rounded-sm border border-line-strong bg-surface-1/70 py-2.5 pl-10 pr-4 font-sans text-[15px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-sindura/60"
          />
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="eyebrow text-ink-faint">
            {results.length === namas.length
              ? `${namas.length} names`
              : `${results.length} of ${namas.length}`}
          </p>
          <WordBreakToggle />
        </div>
      </div>

      <ul className="grid grid-cols-1 border-t border-line-strong sm:grid-cols-2 sm:gap-x-12">
        {results.map((n) => (
          <li key={n.index} className="min-w-0 border-b border-line">
            <Link
              href={`/shloka/${n.moduleId}`}
              className="group flex gap-4 px-1 py-3.5 transition-colors hover:bg-surface-1/60 sm:px-2"
            >
              <span className="numerals w-10 shrink-0 pt-1 text-right text-lg text-sindura">
                {n.index}
              </span>
              <span className="min-w-0 flex-1">
                <FitText fitKey={n.deva} className="deva block text-[1.3rem] leading-snug text-ink">
                  <HyphenatedText text={n.deva} hyphenated={n.hyphenated?.deva} />
                </FitText>
                <FitText fitKey={n.iast} className="iast block text-[1rem] text-gold-soft">
                  <HyphenatedText text={n.iast} hyphenated={n.hyphenated?.iast} />
                </FitText>
                {n.gloss && (
                  <span className="mt-0.5 block text-[1rem] text-ink-muted group-hover:text-ink">{n.gloss}</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {results.length === 0 && (
        <p className="py-12 text-center text-lg italic text-ink-faint">
          Nothing matched “{query}”.
        </p>
      )}
    </>
  );
}
