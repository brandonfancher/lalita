import Link from "next/link";

import { SCRIPT_PAGES } from "@/lib/script-pages";
import { SPELLINGS } from "@/lib/transliterate";
import { cn } from "@/lib/utils";

const SHORT_NAMES: Record<string, string> = {
  sanskrit: "Sanskrit / Hindi",
  english: "Transliteration",
};

/** A chip for each full-text page, labelled in the script itself. */
export function ScriptLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-2 sm:grid-cols-4", className)}>
      {SCRIPT_PAGES.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/text/${s.slug}`}
            className="block rounded-sm border border-line-strong px-3 py-2.5 text-center transition-colors hover:border-sindura/60 hover:bg-surface-1"
          >
            <span
              lang={s.native ? SPELLINGS[s.spelling].lang : undefined}
              className={cn("block text-lg text-ink", s.spelling === "deva" && "deva")}
            >
              {s.native ?? "English"}
            </span>
            <span className="block font-sans text-[13px] text-ink-muted">
              {SHORT_NAMES[s.slug] ?? s.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
