import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ChantBar } from "@/components/chant-bar";
import { breadcrumbs, JsonLd, STOTRA } from "@/components/json-ld";
import { NamaList } from "@/components/nama-list";
import { Divider, SectionHeading } from "@/components/ornament";
import { ReferenceList } from "@/components/reference-list";
import { ShlokaArt } from "@/components/shloka-art";
import { ShareBar } from "@/components/share-bar";
import { ShlokaNav, type NavEntry } from "@/components/shloka-nav";
import { VerseReader } from "@/components/verse-reader";
import { VerseText } from "@/components/verse-text";
import { getAllModuleIds, getModule, getModuleSummaries, getNeighbours } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { shlokaName, shlokaShare } from "@/lib/share";
import { absoluteUrl, namaRangeLabel, shlokaPath } from "@/lib/site";
import { plainSpelling, titleCase, verseSpellings } from "@/lib/transliterate";
import type { ModuleSummary, StudyModule } from "@/lib/types";
import { cn, toDevanagariDigits } from "@/lib/utils";

export function generateStaticParams() {
  return getAllModuleIds().map((id) => ({ id }));
}

/** Commentary prose is stored with blank lines between paragraphs. */
function Prose({ text }: { text: string }) {
  return (
    <div className="space-y-4 text-[1.075rem] leading-[1.75] text-ink-muted">
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

const toEntry = (s: ModuleSummary): NavEntry => ({
  id: s.id,
  title: s.title,
  number: s.number,
  namaRange: s.namaRange,
});

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let mod: StudyModule;
  try {
    mod = getModule(id);
  } catch {
    return { title: "Not found" };
  }

  const firstLine = titleCase(mod.lines[0].iast);
  const range = namaRangeLabel(mod.namaRange);

  if (mod.number === null) {
    return pageMetadata({
      absoluteTitle: `Lalita Sahasranama Dhyanam: ${firstLine} — Meaning & Chant`,
      shareTitle: `The dhyāna verses of the Lalitā Sahasranāma`,
      description: `${mod.lines[0].deva} — the meditation verses (dhyāna ślokas) chanted before the Lalitha Sahasranamam, with audio, word-by-word meaning, and grammar.`,
      path: shlokaPath(id),
      type: "article",
      ownCard: true,
    });
  }

  return pageMetadata({
    absoluteTitle: `Lalita Sahasranama Shloka ${mod.number}: ${firstLine} — Meaning & Chant`,
    shareTitle: `Shloka ${mod.number} of the Lalitā Sahasranāma${mod.subtitle ? `: ${mod.subtitle}` : ""}`,
    description: `${mod.lines[0].deva} (${plainSpelling(mod.lines[0].iast)}) — ${range ?? "the names"} of the Lalitha Sahasranamam, with chant audio, word-by-word meaning, grammar, and commentary.`,
    path: shlokaPath(id),
    type: "article",
    ownCard: true,
  });
}

/** What search engines read about the verse: its text in both scripts, its names, and where it sits. */
function shlokaJsonLd(mod: StudyModule) {
  const name = mod.number === null ? "Lalitā Sahasranāma: the dhyāna verses" : `Lalitā Sahasranāma, Shloka ${mod.number}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      "@id": `${absoluteUrl(shlokaPath(mod.id))}#verse`,
      name,
      alternateName: mod.subtitle,
      headline: mod.subtitle ?? name,
      description: mod.commentary.meaning,
      url: absoluteUrl(shlokaPath(mod.id)),
      inLanguage: ["sa", "en"],
      learningResourceType: ["verse", "translation", "commentary"],
      educationalUse: ["chanting", "memorization", "study"],
      text: `${mod.lines.map((l) => l.deva).join("\n")}\n\n${mod.lines.map((l) => l.iast).join("\n")}`,
      position: mod.number ?? 0,
      isPartOf: STOTRA,
      teaches: mod.namas.map((n) => `${n.iast} (${n.deva}): ${n.gloss}`),
    },
    {
      "@context": "https://schema.org",
      ...breadcrumbs([
        ["Lalitā Sahasranāma", "/"],
        ["Shlokas", "/shlokas"],
        [mod.number === null ? "Dhyāna" : `Shloka ${mod.number}`, shlokaPath(mod.id)],
      ]),
    },
  ];
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
  const entries = getModuleSummaries().map(toEntry);
  const share = shlokaShare(mod);
  const spellings = verseSpellings(mod.lines, mod.number);

  return (
    <>
      <JsonLd data={shlokaJsonLd(mod)} />
      <ShlokaNav currentId={mod.id} entries={entries} />

      <div className="relative">
        <ShlokaArt id={mod.id} namas={mod.namas} />

        <article className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <header className="flex items-center gap-5 pb-8 pt-8 sm:gap-7 sm:pb-10 sm:pt-12">
            <span
              aria-hidden
              className="deva flex h-[4.5rem] shrink-0 items-center text-[4rem] leading-none text-sindura sm:h-24 sm:text-[5.5rem]"
            >
              {mod.number === null ? "ॐ" : toDevanagariDigits(mod.number)}
            </span>
            <span aria-hidden className="h-16 w-px shrink-0 bg-line-strong sm:h-20" />
            <h1 className="min-w-0">
              <span className="eyebrow block text-ink-faint">
                <span className="whitespace-nowrap">{mod.title}</span>
                {mod.namaRange && (
                  <>
                    <span aria-hidden className="mx-2 text-gold">◆</span>
                    <span className="sr-only">, </span>
                    <span className="whitespace-nowrap">
                      Names {mod.namaRange[0]}&ndash;{mod.namaRange[1]}
                    </span>
                  </>
                )}
                <span className="sr-only">: </span>
              </span>
              <span className="display mt-2 block text-balance text-[2.1rem] italic leading-[1.08] text-ink sm:text-[3.25rem]">
                {mod.subtitle ?? mod.title}
              </span>
            </h1>
          </header>

          <VerseReader module={mod} chant={<ChantBar timing={mod.chant} label={mod.title} />} />

          <div className="mt-14 max-w-3xl space-y-14">
            {mod.commentary.meaning && (
              <section>
                <SectionHeading eyebrow="Artha">Meaning</SectionHeading>
                <p className="text-[1.2rem] leading-[1.7] text-ink first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-[3.6rem] first-letter:leading-[0.8] first-letter:text-sindura">
                  {mod.commentary.meaning}
                </p>
                <ShareBar share={share} label={`Share ${mod.number === null ? "the dhyāna" : "this shloka"}`} className="mt-7" />
              </section>
            )}

            <section aria-labelledby="verse-text">
              <SectionHeading eyebrow="Pāṭha" id="verse-text">
                The verse as text
              </SectionHeading>
              <p className="mb-5 text-[1.05rem] leading-relaxed text-ink-muted">
                To copy into your notes, print, or read in the script you grew up with. Every copy carries
                a link back here.
              </p>
              <VerseText
                spellings={spellings}
                source={`${shlokaName(mod)} of the Lalitā Sahasranāma · ${absoluteUrl(shlokaPath(mod.id))}`}
              />
            </section>

            {mod.namas.length > 0 && (
              <section>
                <SectionHeading eyebrow="Nāmāni" count={mod.namas.length}>
                  The names in this shloka
                </SectionHeading>
                <NamaList namas={mod.namas} />
              </section>
            )}

            {mod.commentary.history && (
              <section>
                <SectionHeading eyebrow="Itihāsa">History and background</SectionHeading>
                <Prose text={mod.commentary.history} />
              </section>
            )}

            {mod.commentary.crossReferences?.length ? (
              <section>
                <SectionHeading eyebrow="Sambandha">Related passages</SectionHeading>
                <div className="space-y-10">
                  {mod.commentary.crossReferences.map((x, i) => (
                    <figure key={i} className="border-l-2 border-sindura/50 pl-5 sm:pl-6">
                      <figcaption className="eyebrow mb-3 text-sindura">{x.source}</figcaption>
                      {x.deva && <p className="deva mb-0.5 text-xl text-ink">{x.deva}</p>}
                      {x.iast && <p className="iast mb-3 text-[1.02rem] text-ink-faint">{x.iast}</p>}
                      <blockquote className="display text-[1.2rem] leading-relaxed text-ink">
                        {x.translation}
                      </blockquote>
                      <p className="mt-3 text-[1rem] italic leading-relaxed text-ink-muted">
                        {x.relevance}
                      </p>
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}

            {mod.commentary.practice && (
              <section>
                <SectionHeading eyebrow="Sādhanā">For practice</SectionHeading>
                <Prose text={mod.commentary.practice} />
              </section>
            )}

            {mod.commentary.reflections && (
              <section>
                <SectionHeading eyebrow="Manana">Further reflections</SectionHeading>
                <p className="mb-5 text-[1rem] italic leading-relaxed text-ink-faint">
                  Readings that go beyond the classical commentary, offered for contemplation rather
                  than as tradition.
                </p>
                <Prose text={mod.commentary.reflections} />
              </section>
            )}

            {mod.references.length > 0 && (
              <section>
                <SectionHeading eyebrow="Ādhāra">Sources and further study</SectionHeading>
                <ReferenceList references={mod.references} />
              </section>
            )}
          </div>

          <Divider className="mb-8 mt-16" />

          <nav aria-label="Continue reading" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {prev ? <NeighbourLink summary={prev} direction="prev" /> : <span className="hidden sm:block" />}
            {next && <NeighbourLink summary={next} direction="next" />}
          </nav>
        </article>
      </div>
    </>
  );
}

function NeighbourLink({
  summary,
  direction,
}: {
  summary: ModuleSummary;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/shloka/${summary.id}`}
      className={cn(
        "group flex min-w-0 items-center gap-4 rounded-sm border border-line bg-surface-1/40 px-5 py-4 transition-colors hover:border-line-strong hover:bg-surface-1",
        !isPrev && "flex-row-reverse text-right",
      )}
    >
      {isPrev ? (
        <ArrowLeft size={18} className="shrink-0 text-sindura transition-transform group-hover:-translate-x-1" />
      ) : (
        <ArrowRight size={18} className="shrink-0 text-sindura transition-transform group-hover:translate-x-1" />
      )}
      <span className="min-w-0 flex-1">
        <span className="eyebrow block text-ink-faint">
          {isPrev ? "Previous" : "Next"} &middot; {summary.title}
        </span>
        {summary.subtitle && (
          <span className="display mt-1 block truncate text-lg italic text-ink">
            {summary.subtitle}
          </span>
        )}
      </span>
    </Link>
  );
}
