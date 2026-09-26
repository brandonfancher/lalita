import Link from "next/link";

import { AlphabetSounds } from "@/components/alphabet-sounds";

export const metadata = { title: "Learn Sanskrit" };

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-12">
        <p className="eyebrow text-sindura">Vyākaraṇa</p>
        <h1 className="display mt-2 text-[2.6rem] leading-tight text-ink sm:text-[3.25rem]">
          Learning the language
        </h1>
        <p className="mt-3 max-w-2xl text-[1.1rem] leading-relaxed text-ink-muted">
          Reference pages for the grammar you meet in the text. Every grammatical label on a shloka
          page links back here.
        </p>
      </header>

      <AlphabetSounds />

      <section className="mb-14">
        <h2 className="display mb-2 text-[2rem] text-ink">The eight cases</h2>
        <p className="mb-5 max-w-2xl text-[1.075rem] leading-relaxed text-ink-muted">
          Sanskrit marks a noun&rsquo;s role with an ending rather than word order. Almost every name
          in this text is in the first case, the nominative, because each one simply names her.
        </p>
        <dl className="divide-y divide-line border-y border-line-strong">
          {CASES.map((c, i) => (
            <div key={c.name} className="flex gap-4 px-1 py-3">
              <span className="numerals w-6 shrink-0 pt-0.5 text-right text-lg text-sindura">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <dt className="text-[1.1rem] text-ink">
                  {c.name} <span className="iast text-[1rem] text-gold-soft">{c.sanskrit}</span>
                </dt>
                <dd className="text-[1rem] text-ink-muted">{c.sense}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="display mb-2 text-[2rem] text-ink">Compounds</h2>
        <p className="mb-5 max-w-2xl text-[1.075rem] leading-relaxed text-ink-muted">
          Most of the thousand names are compounds &mdash; several words fused into one. Sanskrit
          classifies them by how the pieces relate, and knowing the type tells you how to unpack the
          meaning.
        </p>
        <dl className="grid gap-x-10 border-t border-line-strong sm:grid-cols-2">
          {COMPOUNDS.map((c) => (
            <div key={c.name} className="border-b border-line px-1 py-4">
              <dt className="iast text-[1.25rem] text-sindura">{c.name}</dt>
              <dd className="mt-1 text-[1rem] leading-relaxed text-ink-muted">{c.sense}</dd>
              {c.example && (
                <dd className="mt-1.5 text-[1rem] text-ink-faint">
                  e.g. <span className="iast text-ink-muted">{c.example}</span>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-14 text-lg italic text-ink-muted">
        Ready to apply it?{" "}
        <Link href="/shlokas" className="text-sindura underline decoration-sindura/40 underline-offset-4 hover:decoration-sindura">
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
