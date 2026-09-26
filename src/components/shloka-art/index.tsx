import type { Nama } from "@/lib/types";

import { ArtNote, type NoteNama } from "./art-note";
import { ARTWORK } from "./registry";

/**
 * A backdrop for the top of a shloka page, and the way into its story. The
 * backdrop bleeds off the right edge and dissolves downward so it never
 * competes with the verse.
 */
export function ShlokaArt({ id, namas }: { id: string; namas: Nama[] }) {
  const artwork = ARTWORK[id];
  if (!artwork) return null;
  const { Art } = artwork;

  const noteNamas: NoteNama[] = namas
    .filter((n) => artwork.names.some((x) => x.nama === n.index))
    .map(({ index, deva, iast, gloss }) => ({ index, deva, iast, gloss }));

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60rem] select-none overflow-hidden"
      >
        <div className="relative mx-auto h-full max-w-6xl">
          {/* On wide screens the arch is centred on the verse sidebar, so its idle card sits inside it. */}
          <div className="shloka-art adornment absolute -right-12 top-3 w-[17rem] sm:-right-6 sm:w-[19rem] lg:-right-[7.5rem] lg:top-0 lg:w-[40rem]">
            <div className="shloka-art-kindle">
              <Art />
            </div>
          </div>
        </div>
      </div>
      <ArtNote id={id} namas={noteNamas} />
    </>
  );
}
