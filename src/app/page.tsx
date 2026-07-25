import Link from "next/link";
import { ArrowRight, BookOpen, Headphones, Sparkles } from "lucide-react";

import { getModuleSummaries } from "@/lib/content";

export default function HomePage() {
  const all = getModuleSummaries();
  const shlokas = all.filter((s) => s.kind === "shloka");
  const first = all[0];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6 sm:pt-20">
      <section className="mb-16 text-center">
        <p className="deva mb-4 text-2xl text-sindura-soft sm:text-3xl">
          श्रीमाता श्रीमहाराज्ञी
        </p>
        <h1 className="display mx-auto max-w-3xl text-4xl font-light leading-tight text-ink sm:text-6xl">
          The Lalitā Sahasranāma,
          <span className="block text-gold-soft">one shloka at a time</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
          A study of the thousand names of Lalitā Tripurasundarī: chant each verse in the original
          recording, read it in both scripts, take apart every name, and learn Sanskrit through the
          text itself.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {first && (
            <Link
              href={`/shloka/${first.id}`}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-sindura to-lotus px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              Begin with the dhyāna
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
          <Link
            href="/shlokas"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-ink transition-colors hover:bg-surface-2"
          >
            Browse all {shlokas.length} shlokas
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Feature
          icon={Headphones}
          title="Chant it"
          body="Every shloka plays from the original recording, looping and slowing down as you commit it to memory."
        />
        <Feature
          icon={BookOpen}
          title="Read it"
          body="Devanagari and romanization side by side, linked word for word, so you can drop the transliteration when ready."
        />
        <Feature
          icon={Sparkles}
          title="Take it apart"
          body="Tap any word for its meaning and grammar, any syllable for the letters inside it, any name for how its compound is built."
        />
      </section>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof BookOpen;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface-1/50 p-5">
      <Icon size={18} className="mb-3 text-gold" />
      <h2 className="display mb-1.5 text-xl text-ink">{title}</h2>
      <p className="text-[13px] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
