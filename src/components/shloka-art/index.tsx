import type { Nama } from "@/lib/types";
import { cn } from "@/lib/utils";

import { ArtNote, type NoteNama } from "./art-note";
import { ARTWORK } from "./registry";

export const hasArtwork = (id: string) => id in ARTWORK;

/**
 * The part of the canvas every composition keeps its elements within, in
 * artwork units. A miniature shows only this, so the drawing fills its frame.
 */
const CROP = { x: 70, y: 30, w: 500, h: 750 };

/**
 * A shloka's artwork at thumbnail size, as a reminder of what the verse
 * depicts. Size it by width; the height follows from the crop.
 */
export function ShlokaMiniature({ id, className }: { id: string; className?: string }) {
  const artwork = ARTWORK[id];
  if (!artwork) return null;
  const { Art } = artwork;

  return (
    <div
      aria-hidden
      className={cn("adornment art-miniature relative select-none overflow-hidden", className)}
      style={{ aspectRatio: `${CROP.w} / ${CROP.h}` }}
    >
      <div
        className="absolute"
        style={{
          left: `${(-CROP.x / CROP.w) * 100}%`,
          top: `${(-CROP.y / CROP.h) * 100}%`,
          width: `${(640 / CROP.w) * 100}%`,
          height: `${(830 / CROP.h) * 100}%`,
        }}
      >
        <Art idPrefix={`mini-${id}`} />
      </div>
    </div>
  );
}

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
    .filter((n) => artwork.entries.some((x) => "nama" in x && x.nama === n.index))
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
