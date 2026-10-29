import Link from "next/link";
import { notFound } from "next/navigation";

import { breadcrumbs, JsonLd, STOTRA } from "@/components/json-ld";
import { ShareBar } from "@/components/share-bar";
import { getModulesInRange } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { scriptPage, SCRIPT_PAGES } from "@/lib/script-pages";
import { pageShare } from "@/lib/share";
import { absoluteUrl, shlokaPath } from "@/lib/site";
import { spellVerse, SPELLINGS } from "@/lib/transliterate";
import type { StudyModule } from "@/lib/types";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return SCRIPT_PAGES.map((s) => ({ script: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ script: string }> }) {
  const page = scriptPage((await params).script);
  if (!page) return { title: "Not found" };
  return pageMetadata({
    absoluteTitle: `${page.searchTitle} · ${page.stotraTitle}`,
    shareTitle: `${page.stotraTitle}: the Lalitā Sahasranāma in ${page.name}`,
    description: `The complete Lalitha Sahasranama Stotram in ${page.name}: the dhyānam and all 182 shlokas in chanting order, each linked to its meaning, word-by-word grammar, and chant audio.`,
    path: `/text/${page.slug}`,
  });
}

export default async function ScriptTextPage({ params }: { params: Promise<{ script: string }> }) {
  const page = scriptPage((await params).script);
  if (!page) notFound();

  const spelling = SPELLINGS[page.spelling];
  const modules = getModulesInRange(0, 182);
  const latin = spelling.lang === "sa-Latn";

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            ...STOTRA,
            "@type": "CreativeWork",
            url: absoluteUrl(`/text/${page.slug}`),
            inLanguage: spelling.lang,
            headline: page.stotraTitle,
          },
          {
            "@context": "https://schema.org",
            ...breadcrumbs([
              ["Lalitā Sahasranāma", "/"],
              [`In ${page.name}`, `/text/${page.slug}`],
            ]),
          },
        ]}
      />

      <header className="mb-8">
        <p className="eyebrow text-sindura">Pāṭha &middot; the full text</p>
        <h1 className="mt-3">
          <span lang={spelling.lang} className={cn("block text-[2.2rem] leading-tight text-ink sm:text-[2.8rem]", page.spelling === "deva" && "deva", latin && "display")}>
            {page.stotraTitle}
          </span>
          <span className="display mt-2 block text-[1.5rem] italic leading-snug text-ink-muted sm:text-[1.8rem]">
            The Lalitā Sahasranāma in {page.name}
          </span>
        </h1>
        <p className="mt-4 text-[1.1rem] leading-relaxed text-ink-muted">
          The whole stotra as it is chanted: the <i>dhyāna</i> verses first, then all 182 shlokas in order. Tap
          any verse number to hear it chanted, read it word by word, and see what each of its names means.
        </p>
        {spelling.note && <p className="mt-3 text-[15px] italic leading-relaxed text-ink-faint">{spelling.note}</p>}
        <ShareBar
          className="mt-6"
          share={pageShare(
            "text",
            `/text/${page.slug}`,
            `${page.stotraTitle} — the Lalitā Sahasranāma in ${page.name}`,
            `The full text in ${page.name}, every verse linked to its meaning and the chant:`,
          )}
        />
      </header>

      <ScriptSwitcher current={page.slug} />

      <div className="mt-10 space-y-7">
        {modules.map((mod) => (
          <Verse key={mod.id} mod={mod} spellingId={page.spelling} lang={spelling.lang} />
        ))}
      </div>

      <ScriptSwitcher current={page.slug} className="mt-14" />
    </div>
  );
}

function Verse({ mod, spellingId, lang }: { mod: StudyModule; spellingId: (typeof SCRIPT_PAGES)[number]["spelling"]; lang: string }) {
  const lines = spellVerse(spellingId, mod.lines, mod.number);
  const latin = lang === "sa-Latn";
  const plain = spellingId === "iast" ? spellVerse("plain", mod.lines, mod.number) : null;

  return (
    <section aria-label={mod.number === null ? "Dhyāna" : `Shloka ${mod.number}`} className="flex gap-4">
      <Link
        href={shlokaPath(mod.id)}
        className="numerals w-10 shrink-0 pt-1 text-right text-lg text-sindura hover:underline hover:decoration-sindura/50 hover:underline-offset-4"
        aria-label={mod.number === null ? "Study the dhyāna verses" : `Study shloka ${mod.number}`}
      >
        {mod.number ?? "ॐ"}
      </Link>
      <div className="min-w-0 flex-1">
        {mod.number === null && <p className="eyebrow mb-2 text-ink-faint">Dhyānam</p>}
        <p lang={lang} className={cn("whitespace-pre-line text-ink", latin ? "iast text-[1.15rem] leading-relaxed" : "text-[1.3rem] leading-[1.75]", spellingId === "deva" && "deva")}>
          {lines.join("\n")}
        </p>
        {plain && (
          <p lang={lang} className="mt-1 whitespace-pre-line font-sans text-[13px] leading-relaxed text-ink-faint">
            {plain.join("\n")}
          </p>
        )}
      </div>
    </section>
  );
}

function ScriptSwitcher({ current, className }: { current: string; className?: string }) {
  return (
    <nav aria-label="The text in other scripts" className={cn("flex flex-wrap gap-1.5 font-sans", className)}>
      {SCRIPT_PAGES.map((s) => (
        <Link
          key={s.slug}
          href={`/text/${s.slug}`}
          aria-current={s.slug === current ? "page" : undefined}
          className={cn(
            "inline-flex items-baseline gap-1.5 rounded-full border px-3 py-1 text-[13px] transition-colors",
            s.slug === current
              ? "border-sindura bg-sindura text-on-sindura"
              : "border-line-strong text-ink-muted hover:bg-surface-1 hover:text-ink",
          )}
        >
          {s.native && s.spelling !== "deva" && <span lang={SPELLINGS[s.spelling].lang}>{s.native}</span>}
          {s.slug === "english" ? "English" : s.slug === "sanskrit" ? "Sanskrit / Hindi" : s.name}
        </Link>
      ))}
    </nav>
  );
}
