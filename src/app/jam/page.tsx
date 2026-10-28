import { ExternalLink } from "lucide-react";

import {
  JamLyrics,
  type JamNama,
  type JamSection,
  type JamStanza,
  type JamToken,
} from "@/components/jam-lyrics";
import { getModule, getNamaIndex, type NamaIndexEntry } from "@/lib/content";
import { JAM_SONG, JAM_VIDEO, type SungShloka, type SungWord } from "@/lib/jam-song";
import type { Token } from "@/lib/types";

export const metadata = {
  title: "Jam",
  description:
    "Learn a kīrtan to Lalitā built from the Sahasranāma: sing along with the video, with every name glossed and linked to its shloka.",
};

function toJamNama(entry: NamaIndexEntry): JamNama {
  return { index: entry.index, deva: entry.deva, iast: entry.iast, gloss: entry.gloss, moduleId: entry.moduleId };
}

function toStanza(
  sung: SungShloka,
  key: string,
  namaByIndex: Map<number, NamaIndexEntry>,
): JamStanza {
  const mod = getModule(String(sung.shloka).padStart(3, "0"));
  const lines = sung.lines ? sung.lines.map((i) => mod.lines[i]) : mod.lines;

  const toToken = (token: Token): JamToken => ({
    id: `${key}:${token.id}`,
    deva: token.deva,
    iast: token.iast,
    ...(token.hyphenated ? { hyphenated: token.hyphenated } : {}),
    namas: (token.namaIndices ?? []).map((i) => toJamNama(namaByIndex.get(i)!)),
  });

  const indices = lines.flatMap((line) => line.tokens.flatMap((t) => t.namaIndices ?? []));

  return {
    key,
    moduleId: mod.id,
    number: sung.shloka,
    subtitle: mod.subtitle,
    namaRange: [Math.min(...indices), Math.max(...indices)],
    lines: lines.map((line) => ({ tokens: line.tokens.map(toToken) })),
  };
}

function toWord(word: SungWord, key: string, namaByIndex: Map<number, NamaIndexEntry>): JamToken {
  if ("nama" in word) {
    const entry = namaByIndex.get(word.nama)!;
    return {
      id: key,
      deva: entry.deva,
      iast: entry.iast,
      ...(entry.hyphenated ? { hyphenated: entry.hyphenated } : {}),
      namas: [toJamNama(entry)],
    };
  }
  return { id: key, deva: word.deva, iast: word.iast, namas: [], gloss: word.gloss };
}

export default function JamPage() {
  const namaByIndex = new Map(getNamaIndex().map((n) => [n.index, n]));

  const sections: JamSection[] = JAM_SONG.map((section, si) =>
    section.kind === "verse"
      ? {
          kind: "verse",
          label: section.label,
          stanzas: section.shlokas.map((s, i) => toStanza(s, `${si}.${i}`, namaByIndex)),
        }
      : {
          kind: section.kind,
          label: section.label,
          words: section.words.map((w, i) => toWord(w, `${si}.${i}`, namaByIndex)),
        },
  );

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-8">
        <p className="eyebrow text-sindura">Kīrtana</p>
        <h1 className="display mt-2 text-[2.6rem] leading-tight text-ink sm:text-[3.25rem]">Jam</h1>
        <p className="mt-3 max-w-2xl text-[1.1rem] leading-relaxed text-ink-muted">
          A kīrtan to Lalitā sung from the Sahasranāma itself. Its verses are whole shlokas, taken
          in the order of the text; its chorus gathers single names from across the thousand. Sing
          along with the video, and learn the names as you go.
        </p>
      </header>

      <figure className="mb-10">
        <div className="folio rounded-sm p-2 sm:p-2.5">
          <div className="relative aspect-video overflow-hidden rounded-[1px] bg-surface-3">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${JAM_VIDEO.youtubeId}?rel=0`}
              title={JAM_VIDEO.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
        <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2 text-[15px] italic text-ink-faint">
          <span>
            Sung by{" "}
            <a
              href={JAM_VIDEO.artistUrl}
              target="_blank"
              rel="noreferrer"
              className="text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-sindura"
            >
              {JAM_VIDEO.artist}
            </a>{" "}
            on Mahāgaurī night, Navarātri 2026.
          </span>
          <a
            href={`https://youtu.be/${JAM_VIDEO.youtubeId}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 not-italic text-sindura transition-colors hover:text-sindura-soft"
          >
            <span className="eyebrow text-inherit">Watch on YouTube</span>
            <ExternalLink size={12} aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </figcaption>
      </figure>

      <JamLyrics sections={sections} />
    </div>
  );
}
