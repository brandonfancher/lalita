import { ChantSession } from "@/components/chant-session";
import { ShlokaMiniature } from "@/components/shloka-art";
import { CHANT_PENDING_SCRIPT, DEFAULT_CHANT_RANGE } from "@/lib/chant-range";
import { chantVerse } from "@/lib/chant-verses";
import { getModulesInRange } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Chant Along with Audio, Shloka by Shloka",
  description:
    "Chant the Lalita Sahasranama with the recording: choose any range of shlokas, from the dhyānam onward, and follow the text as it plays, on loop, until you know it by heart.",
  path: "/chant",
});

/**
 * Prerendered with the default range. Any other range, from `?from=&to=` or
 * the one remembered from last time, is loaded in the browser.
 */
export default function ChantPage() {
  const { from, to } = DEFAULT_CHANT_RANGE;
  const verses = getModulesInRange(from, to).map(chantVerse);
  const art = Object.fromEntries(
    verses.filter((v) => v.hasArt).map((v) => [v.id, <ShlokaMiniature key={v.id} id={v.id} className="w-full" />]),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <script dangerouslySetInnerHTML={{ __html: CHANT_PENDING_SCRIPT }} />
      <header className="mb-8">
        <p className="eyebrow text-sindura">Pārāyaṇa</p>
        <h1 className="display mt-2 text-[2.6rem] leading-tight text-ink sm:text-[3.25rem]">
          Chant
        </h1>
        <p className="mt-3 max-w-2xl text-[1.1rem] leading-relaxed text-ink-muted">
          Choose an inclusive range, play the chant on loop, and keep the text in view. Open any
          shloka in a new tab when you want the full study page.
        </p>
      </header>

      <ChantSession initial={{ from, to, verses }} art={art} />
    </div>
  );
}
