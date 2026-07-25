import Link from "next/link";

import { getModuleSummaries } from "@/lib/content";

export const metadata = { title: "All shlokas" };

export default function ShlokasPage() {
  const all = getModuleSummaries();
  const dhyana = all.filter((s) => s.kind === "dhyana");
  const shlokas = all.filter((s) => s.kind === "shloka");

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
      <header className="mb-8">
        <h1 className="display text-3xl font-medium text-ink sm:text-4xl">The modules</h1>
        <p className="mt-2 max-w-2xl text-[15px] text-ink-muted">
          One module for the meditation verses, then one for each of the 182 shlokas of the stotra,
          in the order they are chanted.
        </p>
      </header>

      {dhyana.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-[11px] uppercase tracking-wider text-ink-faint">Opening</h2>
          <div className="grid gap-3">
            {dhyana.map((s) => (
              <Card key={s.id} summary={s} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-[11px] uppercase tracking-wider text-ink-faint">
          The thousand names
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {shlokas.map((s) => (
            <Card key={s.id} summary={s} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Card({ summary }: { summary: ReturnType<typeof getModuleSummaries>[number] }) {
  return (
    <Link
      href={`/shloka/${summary.id}`}
      className="group rounded-2xl border border-line bg-surface-1/50 p-4 transition-colors hover:border-line-strong hover:bg-surface-2/60"
    >
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-sm text-gold-soft">{summary.title}</span>
        {summary.namaRange && (
          <span className="shrink-0 font-mono text-[11px] text-ink-faint">
            {summary.namaRange[0]}&ndash;{summary.namaRange[1]}
          </span>
        )}
      </div>
      <p className="deva line-clamp-2 text-lg leading-relaxed text-ink">{summary.previewDeva}</p>
      <p className="iast mt-1 line-clamp-1 text-[13px] text-ink-faint">{summary.previewIast}</p>
      {summary.subtitle && (
        <p className="mt-2 text-[13px] text-ink-muted">{summary.subtitle}</p>
      )}
    </Link>
  );
}
