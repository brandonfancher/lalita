import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { AksaraStrip } from "@/components/aksara-strip";
import { ChantBar } from "@/components/chant-bar";
import { CompoundTree } from "@/components/compound-tree";
import { HyphenatedText } from "@/components/hyphenated-text";
import { breadcrumbs, JsonLd, STOTRA } from "@/components/json-ld";
import { Divider, SectionHeading } from "@/components/ornament";
import { ShareBar } from "@/components/share-bar";
import { ShlokaMiniature } from "@/components/shloka-art";
import { getNama, getNamaIndex, type NamaIndexEntry } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { namaShare } from "@/lib/share";
import { absoluteUrl, namaPath, shlokaPath } from "@/lib/site";
import { capitalize, NATIVE_LABELS, OTHER_SPELLINGS, plainSpelling, spell, SPELLINGS, titleCase } from "@/lib/transliterate";
import type { Nama, StudyModule, Token } from "@/lib/types";
import { caseInfo, cn, COMPOUND_LABELS, toDevanagariDigits } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getNamaIndex().map((n) => ({ n: String(n.index) }));
}

function load(raw: string) {
  const index = Number(raw);
  return Number.isInteger(index) ? getNama(index) : null;
}

/** The form chanted in worship, with its frame: ॐ श्रीमात्रे नमः. */
function mantra(nama: Nama) {
  if (!nama.namavaliDeva || !nama.namavaliIast) return null;
  return { deva: `ॐ ${nama.namavaliDeva} नमः`, iast: `oṃ ${nama.namavaliIast} namaḥ` };
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const found = load((await params).n);
  if (!found) return { title: "Not found" };
  const { nama } = found;
  const m = mantra(nama);
  const name = titleCase(nama.iast);

  return pageMetadata({
    absoluteTitle: `${name} (${nama.deva}) Meaning — Lalita Sahasranama Name ${nama.index}`,
    shareTitle: `${name} · ${nama.deva} — “${nama.gloss}”`,
    description: `${nama.deva} · ${name} (${plainSpelling(nama.iast)}): “${nama.gloss}”. ${nama.translation} Name ${nama.index} of the Lalitha Sahasranamam${m ? `, chanted as ${m.deva}` : ""}.`,
    path: namaPath(nama.index),
    type: "article",
  });
}

function namaJsonLd(nama: Nama, mod: StudyModule) {
  const url = absoluteUrl(namaPath(nama.index));
  return [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "@id": `${url}#name`,
      name: nama.iast,
      alternateName: [nama.deva, plainSpelling(nama.iast), ...(nama.namavaliIast ? [`oṃ ${nama.namavaliIast} namaḥ`] : [])],
      description: `${nama.gloss}. ${nama.translation}`,
      termCode: String(nama.index),
      url,
      inDefinedTermSet: { ...STOTRA, "@type": ["CreativeWork", "DefinedTermSet"], name: "The thousand names of Lalitā" },
      subjectOf: { "@type": "CreativeWork", name: `Lalitā Sahasranāma, Shloka ${mod.number}`, url: absoluteUrl(shlokaPath(mod.id)) },
    },
    {
      "@context": "https://schema.org",
      ...breadcrumbs([
        ["Lalitā Sahasranāma", "/"],
        ["The thousand names", "/namas/list"],
        [`Name ${nama.index}: ${nama.iast}`, namaPath(nama.index)],
      ]),
    },
  ];
}

export default async function NamaPage({ params }: { params: Promise<{ n: string }> }) {
  const found = load((await params).n);
  if (!found) notFound();
  const { nama, module: mod } = found;

  const all = getNamaIndex();
  const at = all.findIndex((n) => n.index === nama.index);
  const prev = all[at - 1];
  const next = all[at + 1];
  const m = mantra(nama);
  const morph = nama.morphology;
  const ci = caseInfo(morph?.case);
  const compoundType = nama.compound?.type ? COMPOUND_LABELS[nama.compound.type] : undefined;
  const siblings = mod.namas.filter((n) => n.index !== nama.index);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6 sm:pt-8">
      <JsonLd data={namaJsonLd(nama, mod)} />

      <nav aria-label="Breadcrumb" className="eyebrow mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-faint">
        <Link href="/namas/list" className="hover:text-sindura">
          The thousand names
        </Link>
        <span aria-hidden className="text-gold">◆</span>
        <Link href={shlokaPath(mod.id)} className="hover:text-sindura">
          Shloka {mod.number}
        </Link>
        <span aria-hidden className="text-gold">◆</span>
        <span aria-current="page">Name {nama.index}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="min-w-0 max-w-3xl">
          <header>
            <h1>
              <span className="eyebrow block text-sindura">
                Lalitā Sahasranāma <span aria-hidden className="mx-1.5 text-gold">◆</span>
                <span className="sr-only">, </span>Name {nama.index} of 1000
                <span className="sr-only">: </span>
              </span>
              <span lang="sa-Deva" className="deva mt-4 block text-[3rem] leading-[1.15] text-ink sm:text-[4.25rem]">
                <HyphenatedText text={nama.deva} hyphenated={nama.hyphenated?.deva} />
              </span>
              <span className="sr-only"> · </span>
              <span lang="sa-Latn" className="iast mt-1 block text-[1.6rem] leading-tight text-gold-soft sm:text-[2rem]">
                <HyphenatedText text={capitalize(nama.iast)} hyphenated={nama.hyphenated && capitalize(nama.hyphenated.iast)} />
              </span>
            </h1>
            <p className="display mt-4 text-[1.9rem] italic leading-tight text-ink sm:text-[2.3rem]">{nama.gloss}</p>
            <ShareBar share={namaShare(nama, mod)} className="mt-6" />
          </header>

          <div className="mt-12 space-y-14">
            <section>
              <SectionHeading eyebrow="Artha">What the name means</SectionHeading>
              <p className="text-[1.2rem] leading-[1.7] text-ink">{nama.translation}</p>
              {nama.commentary && <p className="mt-4 text-[1.075rem] leading-[1.75] text-ink-muted">{nama.commentary}</p>}
              {compoundType && nama.compound && (
                <p className="mt-4 text-[1.075rem] leading-[1.75] text-ink-muted">
                  <span className="iast">{nama.iast}</span> is a <span className="iast">{compoundType.name}</span> compound:{" "}
                  {compoundType.sense}. Read whole, it says <i>{nama.compound.gloss}</i>
                  {nama.compound.vigraha && (
                    <>
                      , which the tradition unpacks as <span className="iast text-ink">{nama.compound.vigraha}</span>
                    </>
                  )}
                  .
                </p>
              )}
            </section>

            {m && (
              <section>
                <SectionHeading eyebrow="Japa">How to chant it</SectionHeading>
                <div className="folio rounded-sm px-5 py-6 text-center sm:px-8">
                  <p lang="sa-Deva" className="deva text-[1.9rem] leading-snug text-ink sm:text-[2.3rem]">
                    {m.deva}
                  </p>
                  <p lang="sa-Latn" className="iast mt-1 text-[1.3rem] text-gold-soft">
                    {m.iast}
                  </p>
                  <p className="mt-2 font-sans text-[13px] text-ink-faint">{plainSpelling(m.iast)}</p>
                </div>
                <p className="mt-5 text-[1.075rem] leading-[1.75] text-ink-muted">
                  In the stotra the name is chanted as it stands, <span className="iast text-ink">{nama.iast}</span>, as
                  part of Shloka {mod.number}. In the <i>nāmāvalī</i>, the form used for <i>arcana</i> (worship
                  with an offering at each name), it is turned to the dative, the case of offering: &ldquo;to
                  her&rdquo;. Then it is framed by <span className="iast">oṃ</span> before and{" "}
                  <span className="iast">namaḥ</span>, &ldquo;salutation&rdquo;, after.
                </p>
                <div className="mt-6">
                  <ChantBar timing={mod.chant} label={`Shloka ${mod.number}, where this name is chanted`} />
                </div>
                <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-sans text-[14px]">
                  <Link href={`/namas/recite#nama-${nama.index}`} className="text-sindura hover:text-sindura-soft">
                    Recite it among the thousand names &rarr;
                  </Link>
                  <Link href={`/chant?from=${mod.number}&to=${mod.number}`} className="text-sindura hover:text-sindura-soft">
                    Loop its shloka until you know it &rarr;
                  </Link>
                </p>
              </section>
            )}

            <section>
              <SectionHeading eyebrow="Uccāraṇa">Saying it, syllable by syllable</SectionHeading>
              <p className="mb-4 text-[1.05rem] leading-relaxed text-ink-muted">
                Tap a syllable to see the letters inside it and hear each sound.
              </p>
              <AksaraStrip aksaras={nama.aksaras} />
            </section>

            <section>
              <SectionHeading eyebrow="Vyākaraṇa">How the name is built</SectionHeading>
              {morph && (
                <div className="mb-5 flex flex-wrap gap-1.5 font-sans text-[12px]">
                  <Chip>{morph.pos}</Chip>
                  {morph.gender && <Chip>{morph.gender}</Chip>}
                  {ci && <Chip>{`${morph.case} (${ci.sanskrit})`}</Chip>}
                  {morph.number && <Chip>{morph.number}</Chip>}
                  {morph.declension && <Chip>{morph.declension}</Chip>}
                  {morph.stemIast && <Chip>{`stem: ${morph.stemIast}`}</Chip>}
                </div>
              )}
              {morph?.note && <p className="mb-5 text-[1rem] italic leading-relaxed text-ink-muted">{morph.note}</p>}
              {nama.compound ? (
                <CompoundTree node={nama.compound} />
              ) : (
                <p className="text-[1.05rem] leading-relaxed text-ink-muted">
                  A single word rather than a compound.
                </p>
              )}
              <p className="mt-5 text-[15px] italic text-ink-faint">
                New to the cases and compounds?{" "}
                <Link href="/learn" className="text-sindura not-italic hover:text-sindura-soft">
                  The grammar you meet in the text
                </Link>
                .
              </p>
            </section>

            <section>
              <SectionHeading eyebrow="Sandarbha">In its shloka</SectionHeading>
              <Link
                href={`${shlokaPath(mod.id)}#nama-${nama.index}`}
                className="folio group block rounded-sm px-5 py-6 transition-transform hover:-translate-y-0.5 sm:px-8"
              >
                <p className="eyebrow text-ink-faint">
                  Shloka {mod.number}
                  {mod.namaRange && (
                    <>
                      <span aria-hidden className="mx-2 text-gold">◆</span>
                      Names {mod.namaRange[0]}&ndash;{mod.namaRange[1]}
                    </>
                  )}
                </p>
                <div className="mt-3 space-y-1">
                  {mod.lines.map((line, li) => (
                    <p key={li} lang="sa-Deva" className="deva text-[1.35rem] leading-relaxed text-ink-muted">
                      <Marked tokens={line.tokens} index={nama.index} kind="deva" />
                      <span className="text-sindura">
                        {li === mod.lines.length - 1 ? ` ॥ ${toDevanagariDigits(mod.number!)} ॥` : " ।"}
                      </span>
                    </p>
                  ))}
                </div>
                <div className="mt-2 space-y-0.5">
                  {mod.lines.map((line, li) => (
                    <p key={li} lang="sa-Latn" className="iast text-[1.05rem] text-ink-faint">
                      <Marked tokens={line.tokens} index={nama.index} kind="iast" />
                    </p>
                  ))}
                </div>
                {mod.subtitle && (
                  <p className="display mt-4 inline-flex items-center gap-2 text-lg italic text-sindura">
                    Study the whole shloka: {mod.subtitle}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </p>
                )}
              </Link>
              {siblings.length > 0 && (
                <div className="mt-6">
                  <h3 className="eyebrow mb-2 text-ink-faint">Chanted with it</h3>
                  <ul className="divide-y divide-line border-y border-line">
                    {siblings.map((s) => (
                      <li key={s.index}>
                        <NamaLink nama={s} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section>
              <SectionHeading eyebrow="Lipi">The name in other scripts</SectionHeading>
              <dl className="grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:gap-x-10">
                {OTHER_SPELLINGS.map((id) => {
                  const s = SPELLINGS[id];
                  return (
                    <div key={id} className="flex items-baseline gap-3 border-b border-line py-2.5">
                      <dt className="w-32 shrink-0 font-sans text-[13px] text-ink-faint">
                        {NATIVE_LABELS[id] && (
                          <span lang={s.lang} className="mr-1.5">
                            {NATIVE_LABELS[id]}
                          </span>
                        )}
                        {s.label}
                      </dt>
                      <dd lang={s.lang} className={cn("min-w-0 text-[1.15rem] text-ink [overflow-wrap:anywhere]", s.lang === "sa-Latn" && "iast")}>
                        {spell(id, nama.deva, nama.iast)}
                        {m && (
                          <span className="block text-[0.9rem] text-ink-faint">{spell(id, m.deva, m.iast)}</span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          </div>

          <Divider className="mb-8 mt-16" />

          <nav aria-label="Neighbouring names" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {prev ? <Neighbour entry={prev} direction="prev" /> : <span className="hidden sm:block" />}
            {next && <Neighbour entry={next} direction="next" />}
          </nav>
        </article>

        <aside className="hidden lg:block">
          <Link href={shlokaPath(mod.id)} className="sticky top-20 block">
            <ShlokaMiniature id={mod.id} className="w-full" />
            <p className="mt-3 text-center text-sm italic text-ink-faint">
              {mod.subtitle ? `Shloka ${mod.number}: ${mod.subtitle}` : `Shloka ${mod.number}`}
            </p>
          </Link>
        </aside>
      </div>
    </div>
  );
}

/** The verse with this name's words picked out. */
function Marked({ tokens, index, kind }: { tokens: Token[]; index: number; kind: "deva" | "iast" }) {
  return tokens.map((t, i) => {
    const hit = t.namaIndices?.includes(index);
    return (
      <span key={t.id}>
        {i > 0 && " "}
        <span className={cn(hit && "text-sindura underline decoration-sindura/40 underline-offset-[6px]")}>{t[kind]}</span>
      </span>
    );
  });
}

function NamaLink({ nama }: { nama: Pick<Nama, "index" | "deva" | "iast" | "gloss"> }) {
  return (
    <Link href={namaPath(nama.index)} className="group flex items-baseline gap-4 px-1 py-2.5 transition-colors hover:bg-surface-1/60">
      <span className="numerals w-10 shrink-0 text-right text-lg text-sindura">{nama.index}</span>
      <span className="min-w-0 flex-1">
        <span lang="sa-Deva" className="deva mr-2 text-[1.2rem] text-ink">
          {nama.deva}
        </span>
        <span lang="sa-Latn" className="iast text-gold-soft">
          {nama.iast}
        </span>
        <span className="block text-[0.98rem] text-ink-muted group-hover:text-ink">{nama.gloss}</span>
      </span>
    </Link>
  );
}

function Neighbour({ entry, direction }: { entry: NamaIndexEntry; direction: "prev" | "next" }) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={namaPath(entry.index)}
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
          {isPrev ? "Previous" : "Next"} &middot; Name {entry.index}
        </span>
        <span className="mt-1 block truncate">
          <span lang="sa-Deva" className="deva mr-2 text-lg text-ink">
            {entry.deva}
          </span>
          <span className="display text-lg italic text-ink-muted">{entry.gloss}</span>
        </span>
      </span>
    </Link>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-sm border border-line bg-surface-0/70 px-2 py-0.5 text-ink-muted">{children}</span>;
}
