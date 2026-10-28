import {
  JamSession,
  type JamNama,
  type JamSection,
  type JamStanza,
  type JamToken,
} from "@/components/jam-session";
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
          startSec: section.startSec,
          stanzas: section.shlokas.map((s, i) => toStanza(s, `${si}.${i}`, namaByIndex)),
        }
      : {
          kind: section.kind,
          label: section.label,
          startSec: section.startSec,
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

      <JamSession video={JAM_VIDEO} sections={sections} />
    </div>
  );
}
