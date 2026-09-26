import Link from "next/link";

import { getModuleSummaries } from "@/lib/content";
import type { ModuleSummary } from "@/lib/types";
import { toDevanagariDigits } from "@/lib/utils";

export const metadata = { title: "All shlokas" };

export default function ShlokasPage() {
  const all = getModuleSummaries();
  const dhyana = all.filter((s) => s.kind === "dhyana");
  const shlokas = all.filter((s) => s.kind === "shloka");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-10 max-w-2xl">
        <p className="eyebrow text-sindura">Sūcī &middot; Contents</p>
        <h1 className="display mt-2 text-[2.6rem] leading-tight text-ink sm:text-[3.25rem]">
          The shlokas
        </h1>
        <p className="mt-3 text-[1.1rem] leading-relaxed text-ink-muted">
          The meditation verses first, then each of the 182 shlokas of the stotra, in the order they
          are chanted.
        </p>
      </header>

      {dhyana.length > 0 && (
        <section className="mb-12">
          <h2 className="eyebrow mb-3 text-ink-faint">Opening</h2>
          <div className="border-t border-line-strong">
            {dhyana.map((s) => (
              <Entry key={s.id} summary={s} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="eyebrow mb-3 text-ink-faint">The thousand names</h2>
        <div className="grid grid-cols-1 border-t border-line-strong lg:grid-cols-2 lg:gap-x-12">
          {shlokas.map((s) => (
            <Entry key={s.id} summary={s} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Entry({ summary }: { summary: ModuleSummary }) {
  return (
    <Link
      href={`/shloka/${summary.id}`}
      className="group grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-baseline gap-x-4 border-b border-line py-4 transition-colors hover:bg-surface-1/60 sm:px-2"
    >
      <span
        aria-hidden
        className="deva text-right text-[1.5rem] leading-none text-sindura"
      >
        {summary.number === null ? "ॐ" : toDevanagariDigits(summary.number)}
      </span>
      <span className="min-w-0">
        <span className="sr-only">{summary.title}: </span>
        <span className="deva block truncate text-[1.3rem] leading-snug text-ink">
          {summary.previewDeva}
        </span>
        {summary.subtitle && (
          <span className="display mt-0.5 block truncate text-[1.02rem] italic text-ink-muted group-hover:text-sindura">
            {summary.subtitle}
          </span>
        )}
      </span>
      <span className="numerals text-right text-[15px] text-ink-faint">
        {summary.namaRange ? (
          <>
            {summary.namaRange[0]}&ndash;{summary.namaRange[1]}
          </>
        ) : (
          summary.title
        )}
      </span>
    </Link>
  );
}
