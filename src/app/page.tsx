import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Divider, YantraMark } from "@/components/ornament";
import { getModuleSummaries } from "@/lib/content";

export default function HomePage() {
  const all = getModuleSummaries();
  const shlokas = all.filter((s) => s.kind === "shloka");
  const first = all[0];
  const opening = shlokas[0];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20">
      <section className="text-center">
        <YantraMark size={56} className="mx-auto mb-6 text-sindura" />
        <p className="deva text-[1.6rem] text-ink sm:text-[2.1rem]">
          श्रीललितासहस्रनामस्तोत्रम्
        </p>
        <p className="eyebrow mt-4 text-sindura">The thousand names of the Divine Mother</p>
        <h1 className="display mx-auto mt-3 max-w-3xl text-[3.25rem] leading-[1] text-ink sm:text-[5.5rem]">
          Lalitā Sahasranāma
        </h1>
        <p className="display mt-3 text-2xl italic text-ink-muted sm:text-[1.9rem]">
          studied one shloka at a time
        </p>
        <p className="mx-auto mt-6 max-w-xl text-[1.1rem] leading-relaxed text-ink-muted">
          Chant each verse with the recording, read it in both scripts, take apart every
          name, and learn Sanskrit through the text itself.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 font-sans">
          {first && (
            <Link
              href={`/shloka/${first.id}`}
              className="group inline-flex items-center gap-2 rounded-sm bg-sindura px-5 py-3 text-sm font-medium tracking-wide text-on-sindura shadow-[0_10px_24px_-12px_color-mix(in_oklab,var(--sindura)_80%,transparent)] transition-transform hover:-translate-y-px"
            >
              Begin with the dhyāna
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
          <Link
            href="/shlokas"
            className="inline-flex items-center gap-2 rounded-sm border border-line-strong px-5 py-3 text-sm font-medium tracking-wide text-ink transition-colors hover:bg-surface-1"
          >
            Browse all {shlokas.length} shlokas
          </Link>
        </div>
      </section>

      <Divider className="mx-auto my-16 max-w-md" />

      <section className="grid gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line">
        <Feature
          numeral="i"
          title="Chant it"
          body="Every shloka plays from the recording, looping and slowing down as you commit it to memory."
        />
        <Feature
          numeral="ii"
          title="Read it"
          body="Devanagari and romanization side by side, linked word for word, so you can drop the transliteration when ready."
        />
        <Feature
          numeral="iii"
          title="Take it apart"
          body="Tap any word for its meaning and grammar, any syllable for the letters inside it, any name for how its compound is built."
        />
      </section>

      {opening && (
        <Link
          href={`/shloka/${opening.id}`}
          className="folio group mx-auto mt-20 block max-w-3xl rounded-sm px-6 py-10 text-center transition-transform hover:-translate-y-0.5 sm:px-12"
        >
          <p className="eyebrow text-ink-faint">The first shloka</p>
          <p className="deva mt-4 text-[1.6rem] leading-snug text-ink sm:text-[2rem]">
            {opening.previewDeva} <span className="text-sindura">।</span>
          </p>
          <p className="iast mt-1 text-lg text-ink-muted">{opening.previewIast}</p>
          {opening.subtitle && (
            <p className="display mt-6 inline-flex items-center gap-2 text-lg italic text-sindura">
              {opening.subtitle}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </p>
          )}
        </Link>
      )}
    </div>
  );
}

function Feature({ numeral, title, body }: { numeral: string; title: string; body: string }) {
  return (
    <div className="text-center sm:px-8">
      <p className="display text-lg italic text-sindura">{numeral}.</p>
      <h2 className="display mt-1 text-[1.6rem] text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-xs text-[1.02rem] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
