import Link from "next/link";

import { AlphabetSounds } from "@/components/alphabet-sounds";

export const metadata = { title: "Learn Sanskrit" };

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
      <header className="mb-10">
        <h1 className="display text-3xl font-medium text-ink sm:text-4xl">Learning the language</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          Reference pages for the grammar you meet in the text. Every grammatical label on a shloka
          page links back here.
        </p>
      </header>

      <AlphabetSounds />

      <section className="mb-12">
        <h2 className="display mb-2 text-2xl text-ink">The eight cases</h2>
        <p className="mb-5 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          Sanskrit marks a noun&rsquo;s role with an ending rather than word order. Almost every name
          in this text is in the first case, the nominative, because each one simply names her.
        </p>
        <dl className="divide-y divide-line/60 overflow-hidden rounded-2xl border border-line bg-surface-1/50">
          {CASES.map((c, i) => (
            <div key={c.name} className="flex gap-3 px-4 py-3">
              <span className="w-5 shrink-0 font-mono text-[11px] text-ink-faint">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <dt className="text-[15px] text-ink">
                  {c.name} <span className="iast text-[13px] text-gold-soft">{c.sanskrit}</span>
                </dt>
                <dd className="text-[13px] text-ink-muted">{c.sense}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="display mb-2 text-2xl text-ink">Compounds</h2>
        <p className="mb-5 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          Most of the thousand names are compounds &mdash; several words fused into one. Sanskrit
          classifies them by how the pieces relate, and knowing the type tells you how to unpack the
          meaning.
        </p>
        <dl className="space-y-2">
          {COMPOUNDS.map((c) => (
            <div key={c.name} className="rounded-2xl border border-line bg-surface-1/50 px-4 py-3">
              <dt className="iast text-[15px] text-gold-soft">{c.name}</dt>
              <dd className="mt-0.5 text-[13px] leading-relaxed text-ink-muted">{c.sense}</dd>
              {c.example && (
                <dd className="mt-1.5 text-[13px] text-ink-faint">
                  e.g. <span className="iast text-ink-muted">{c.example}</span>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-12 text-sm text-ink-muted">
        Ready to apply it?{" "}
        <Link href="/shlokas" className="text-gold-soft underline-offset-2 hover:underline">
          Go to the shlokas
        </Link>
        .
      </p>
    </div>
  );
}

const CASES = [
  { name: "nominative", sanskrit: "prathamā", sense: "the subject; who or what something is" },
  { name: "accusative", sanskrit: "dvitīyā", sense: "the object; what is acted upon" },
  { name: "instrumental", sanskrit: "tṛtīyā", sense: "by, with, or through something" },
  { name: "dative", sanskrit: "caturthī", sense: "to or for someone — the case of offering" },
  { name: "ablative", sanskrit: "pañcamī", sense: "from, out of, because of" },
  { name: "genitive", sanskrit: "ṣaṣṭhī", sense: "of, belonging to" },
  { name: "locative", sanskrit: "saptamī", sense: "in, on, or among" },
  { name: "vocative", sanskrit: "sambodhana", sense: "direct address — calling to her" },
];

const COMPOUNDS = [
  {
    name: "tatpuruṣa",
    sense: "The first member stands in a case relation to the second: “the lord of the mountain.”",
    example: "rāja-putra, a king’s son",
  },
  {
    name: "karmadhāraya",
    sense: "Both members describe the same thing, one qualifying the other: “the blue lotus.”",
    example: "mahā-devī, the great goddess",
  },
  {
    name: "bahuvrīhi",
    sense:
      "The compound points outside itself to describe a possessor: “she who has X.” Very common in this text, since each name describes her.",
    example: "candra-śekhara, one who wears the moon in his hair",
  },
  {
    name: "dvandva",
    sense: "A pairing of equals, joined as if by “and.”",
    example: "śiva-śakti, Śiva and Śakti",
  },
  {
    name: "dvigu",
    sense: "A numeral compound naming a set.",
    example: "tri-loka, the three worlds",
  },
  {
    name: "avyayībhāva",
    sense: "An adverbial compound; it does not decline.",
    example: "yathā-śakti, according to one’s power",
  },
];
