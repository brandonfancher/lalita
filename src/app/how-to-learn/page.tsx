import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { breadcrumbs, JsonLd, STOTRA } from "@/components/json-ld";
import { Divider, SectionHeading } from "@/components/ornament";
import { ScriptLinks } from "@/components/script-links";
import { ShareBar } from "@/components/share-bar";
import { pageMetadata } from "@/lib/metadata";
import { pageShare } from "@/lib/share";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/how-to-learn";
const TITLE = "How to Learn and Chant the Lalita Sahasranama, Step by Step";
const DESCRIPTION =
  "A practical way to learn the Lalitha Sahasranamam: start with the dhyānam, learn the sounds, then one shloka at a time with the audio on loop, the meaning of every name, and the text in your own script.";

export const metadata = pageMetadata({
  absoluteTitle: TITLE,
  shareTitle: "How to learn and chant the Lalitā Sahasranāma",
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const STEPS: { title: string; body: React.ReactNode; link?: { href: string; label: string } }[] = [
  {
    title: "Listen before you read",
    body: (
      <>
        Play the <i>dhyāna</i> verses and the first three shlokas several times without looking at the text. Let
        the melody and the rhythm of the names settle first; reading is far easier once the ear knows where it
        is going.
      </>
    ),
    link: { href: "/chant?from=0&to=3", label: "Play the dhyāna and shlokas 1–3" },
  },
  {
    title: "Learn the sounds",
    body: (
      <>
        Sanskrit has long and short vowels, aspirated and unaspirated consonants, and a row of retroflex sounds
        that English lacks, and each one changes a word. An hour with the letters and their sounds will save you
        from learning a name wrongly and having to unlearn it.
      </>
    ),
    link: { href: "/learn", label: "The letters and their sounds" },
  },
  {
    title: "Take one shloka at a time",
    body: (
      <>
        Open a shloka, turn on the loop, and chant along with the recording until you can keep pace. Slow the
        recording down if the names run together. Read it in Devanagari, in transliteration, or in your own
        script, and drop the transliteration as the script becomes familiar.
      </>
    ),
    link: { href: "/shloka/001", label: "Begin with Shloka 1" },
  },
  {
    title: "Understand what you are saying",
    body: (
      <>
        Tap each word to see which names it carries, what they mean, and how each compound is built. A name you
        understand is a name you remember, and the meaning is what turns recitation into prayer.
      </>
    ),
    link: { href: "/namas/list", label: "Look up any of the thousand names" },
  },
  {
    title: "Add a shloka a day, and keep chanting from the start",
    body: (
      <>
        When one shloka comes easily, add the next, and chant the whole range you know each day rather than only
        the new verse. At one shloka a day you will have all 182 in about six months; there is no hurry, and
        many people take a year.
      </>
    ),
    link: { href: "/chant", label: "Chant a range on loop" },
  },
  {
    title: "Offer the names one by one",
    body: (
      <>
        For <i>arcana</i>, worship with a flower or kumkum at each name, the names are recited separately as the{" "}
        <i>nāmāvalī</i>: oṃ, the name in the dative, and namaḥ, as in <i>oṃ śrīmātre namaḥ</i>.
      </>
    ),
    link: { href: "/namas/recite", label: "Recite the nāmāvalī" },
  },
];

const QUESTIONS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Do I need to know Sanskrit?",
    a: (
      <>
        No. Every verse is given in transliteration and with the meaning of every word, and the recording carries
        the pronunciation. Learning to read Devanagari helps, and the site is built to teach it as you go, but it
        is not where you have to begin.
      </>
    ),
  },
  {
    q: "How long does a full recitation take?",
    a: (
      <>
        The recording used here runs a little over half an hour, from the dhyāna to the last shloka. Chanting at
        your own pace usually takes thirty to forty-five minutes.
      </>
    ),
  },
  {
    q: "What is the difference between the stotram and the nāmāvalī?",
    a: (
      <>
        The <i>stotram</i> is the hymn as composed: 182 shlokas in which the names follow one another and often
        fuse at their edges by sandhi. The <i>nāmāvalī</i> is the same thousand names said one at a time, each
        turned to the dative and framed by oṃ and namaḥ, for worship with an offering at every name.
      </>
    ),
  },
  {
    q: "Which script should I read it in?",
    a: (
      <>
        Whichever you read most easily. The whole text is here in Devanagari, in transliteration, and in Telugu,
        Kannada, Tamil, Malayalam, Gujarati and Bengali, and every shloka page lets you switch between them.
      </>
    ),
  },
];

export default function HowToLearnPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: TITLE,
            description: DESCRIPTION,
            url: absoluteUrl(PATH),
            about: STOTRA,
            inLanguage: "en",
            publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
          },
          {
            "@context": "https://schema.org",
            ...breadcrumbs([
              ["Lalitā Sahasranāma", "/"],
              ["How to learn it", PATH],
            ]),
          },
        ]}
      />

      <header className="mb-12">
        <p className="eyebrow text-sindura">Ārambha &middot; Beginning</p>
        <h1 className="display mt-2 text-[2.4rem] leading-[1.1] text-ink sm:text-[3.1rem]">
          How to learn and chant the Lalitā Sahasranāma
        </h1>
        <p className="mt-4 text-[1.15rem] leading-relaxed text-ink-muted">
          The Lalitā Sahasranāma, often written Lalitha Sahasranamam, is the hymn of the thousand names of the
          Goddess Lalitā. It is preserved in the Brahmāṇḍa Purāṇa as a teaching given by Hayagrīva to the sage
          Agastya, and its thousand names are set in 182 shlokas, opened by the <i>dhyāna</i> verses in which
          you picture her before you name her. It is long, but it is learned the way it has always been learned:
          by ear, a verse at a time, chanted every day.
        </p>
        <ShareBar
          className="mt-6"
          share={pageShare(
            "guide",
            PATH,
            "How to learn and chant the Lalitā Sahasranāma",
            "A step-by-step way to learn it, with the audio, the meaning of every name, and the text in your own script:",
          )}
        />
      </header>

      <section>
        <SectionHeading eyebrow="Krama">A way to learn it, step by step</SectionHeading>
        <ol className="space-y-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span className="display w-8 shrink-0 text-right text-[1.8rem] leading-none text-sindura">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <h3 className="display text-[1.45rem] leading-snug text-ink">{step.title}</h3>
                <p className="mt-1.5 text-[1.075rem] leading-[1.75] text-ink-muted">{step.body}</p>
                {step.link && (
                  <Link
                    href={step.link.href}
                    className="group mt-2 inline-flex items-center gap-1.5 font-sans text-[14px] font-medium text-sindura hover:text-sindura-soft"
                  >
                    {step.link.label}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Divider className="my-14" />

      <section>
        <SectionHeading eyebrow="Lipi">Read the whole text in your script</SectionHeading>
        <p className="mb-5 text-[1.075rem] leading-relaxed text-ink-muted">
          The complete stotram on one page, every verse linked to its study page.
        </p>
        <ScriptLinks />
      </section>

      <Divider className="my-14" />

      <section>
        <SectionHeading eyebrow="Praśna">Questions people ask</SectionHeading>
        <div className="space-y-8">
          {QUESTIONS.map(({ q, a }) => (
            <div key={q}>
              <h3 className="display text-[1.4rem] leading-snug text-ink">{q}</h3>
              <p className="mt-1.5 text-[1.075rem] leading-[1.75] text-ink-muted">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <Link
        href="/shloka/000"
        className="group mt-16 flex items-center justify-center gap-2 rounded-sm bg-sindura px-5 py-3.5 font-sans text-sm font-medium tracking-wide text-on-sindura transition-transform hover:-translate-y-px"
      >
        Begin with the dhyāna
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
