import type { ChantVerse } from "@/components/chant-session";
import { hasArtwork } from "@/components/shloka-art";
import type { StudyModule } from "@/lib/types";

/** What the chant page shows of one shloka: its text, the glosses to show on it, and where it is in the recording. */
export function chantVerse(mod: StudyModule): ChantVerse {
  const namasByIndex = new Map(mod.namas.map((n) => [n.index, n.gloss]));

  return {
    id: mod.id,
    number: Number(mod.id),
    hasArt: hasArtwork(mod.id),
    ...(mod.chant ? { timing: { startSec: mod.chant.startSec, endSec: mod.chant.endSec } } : {}),
    lines: mod.lines.map((line) => ({
      tokens: line.tokens.map((token) => {
        const glosses: string[] = [];
        if (token.namaIndices?.length) {
          for (const i of token.namaIndices) {
            const gloss = namasByIndex.get(i);
            if (gloss) glosses.push(gloss);
          }
        } else if (token.word?.gloss) {
          glosses.push(token.word.gloss);
        }
        return {
          id: token.id,
          deva: token.deva,
          iast: token.iast,
          ...(token.hyphenated ? { hyphenated: token.hyphenated } : {}),
          ...(glosses.length > 0 ? { glosses } : {}),
        };
      }),
    })),
  };
}
