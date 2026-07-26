import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ChantBar } from "@/components/chant-bar";
import { NamaList } from "@/components/nama-list";
import { VerseReader } from "@/components/verse-reader";
import { ReferenceList } from "@/components/reference-list";
import { getAllModuleIds, getModule, getNeighbours } from "@/lib/content";

export function generateStaticParams() {
  return getAllModuleIds().map((id) => ({ id }));
}

/** Commentary prose is stored with blank lines between paragraphs. */
function Prose({ text }: { text: string }) {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-ink-muted">
      {text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p key={i}>{p}</p>
        ))}
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const mod = getModule(id);
    return {
      title: mod.subtitle ? `${mod.title} — ${mod.subtitle}` : mod.title,
      description: mod.commentary.meaning?.slice(0, 160) || undefined,
    };
  } catch {
    return { title: "Not found" };
  }
}

export default async function ShlokaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let mod;
  try {
    mod = getModule(id);
  } catch {
    notFound();
  }

  const { prev, next } = getNeighbours(id);

  return (
    <article className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 sm:pt-10">
      <header className="mb-6">
        <div className="flex items-baseline gap-3">
          <h1 className="display text-3xl font-medium text-ink sm:text-4xl">{mod.title}</h1>
          {mod.namaRange && (
            <span className="text-sm text-ink-faint">
              names {mod.namaRange[0]}&ndash;{mod.namaRange[1]}
            </span>
          )}
        </div>
        {mod.subtitle && (
          <p className="display mt-1 text-lg text-gold-soft sm:text-xl">{mod.subtitle}</p>
        )}
      </header>

      <div className="mb-8">
        <ChantBar timing={mod.chant} label={mod.title} />
      </div>

      <section className="mb-10">
        <VerseReader module={mod} />
      </section>

      {mod.commentary.meaning && (
        <section className="mb-10 max-w-3xl">
          <h2 className="display mb-3 text-2xl text-ink">Meaning</h2>
          <p className="text-[15px] leading-relaxed text-ink-muted">{mod.commentary.meaning}</p>
        </section>
      )}

      {mod.namas.length > 0 && (
        <section className="mb-10">
          <h2 className="display mb-4 text-2xl text-ink">
            The names in this shloka
            <span className="ml-2 text-base text-ink-faint">({mod.namas.length})</span>
          </h2>
          <NamaList namas={mod.namas} />
        </section>
      )}

      {mod.commentary.history && (
        <section className="mb-10 max-w-3xl">
          <h2 className="display mb-3 text-2xl text-ink">History and background</h2>
          <Prose text={mod.commentary.history} />
        </section>
      )}

      {mod.commentary.crossReferences?.length ? (
        <section className="mb-10 max-w-3xl">
          <h2 className="display mb-4 text-2xl text-ink">Related passages</h2>
          <div className="space-y-4">
            {mod.commentary.crossReferences.map((x, i) => (
              <figure key={i} className="rounded-2xl border border-line bg-surface-1/60 p-4">
                <figcaption className="mb-2 text-xs uppercase tracking-wider text-gold">
                  {x.source}
                </figcaption>
                {x.deva && <p className="deva mb-1 text-lg text-ink">{x.deva}</p>}
                {x.iast && <p className="iast mb-2 text-sm text-ink-faint">{x.iast}</p>}
                <blockquote className="border-l-2 border-lotus/50 pl-3 text-[15px] leading-relaxed text-ink">
                  {x.translation}
                </blockquote>
                <p className="mt-2 text-[13px] text-ink-muted">{x.relevance}</p>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {mod.commentary.practice && (
        <section className="mb-10 max-w-3xl">
          <h2 className="display mb-3 text-2xl text-ink">For practice</h2>
          <Prose text={mod.commentary.practice} />
        </section>
      )}

      {mod.references.length > 0 && (
        <section className="mb-10 max-w-3xl">
          <h2 className="display mb-4 text-2xl text-ink">Sources and further study</h2>
          <ReferenceList references={mod.references} />
        </section>
      )}

      <nav className="mt-12 flex items-stretch justify-between gap-3 border-t border-line pt-6">
        {prev ? (
          <Link
            href={`/shloka/${prev.id}`}
            className="group flex max-w-[48%] flex-col rounded-xl border border-line bg-surface-1/50 px-4 py-3 transition-colors hover:border-line-strong hover:bg-surface-2/60"
          >
            <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-ink-faint">
              <ChevronLeft size={12} /> Previous
            </span>
            <span className="mt-0.5 truncate text-sm text-ink">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/shloka/${next.id}`}
            className="group flex max-w-[48%] flex-col items-end rounded-xl border border-line bg-surface-1/50 px-4 py-3 text-right transition-colors hover:border-line-strong hover:bg-surface-2/60"
          >
            <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-ink-faint">
              Next <ChevronRight size={12} />
            </span>
            <span className="mt-0.5 truncate text-sm text-ink">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
