import { NamaBrowser, type NamaBrowserEntry } from "@/components/nama-browser";
import { getNamaIndex } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  absoluteTitle: "Lalita Sahasranama: All 1000 Names with Meaning",
  description:
    "The thousand names of Lalitā in order, in Devanagari and transliteration, each with its meaning. Search by name, meaning, or number, and open any name for its grammar, chant, and place in the stotra.",
  path: "/namas/list",
});

/**
 * Everything passed to the browser is serialized into this page twice, in its
 * HTML and its RSC payload, so it gets only what it shows or searches.
 */
const toEntry = ({ index, deva, iast, gloss, translation, hyphenated }: NamaBrowserEntry): NamaBrowserEntry => ({
  index,
  deva,
  iast,
  gloss,
  translation,
  hyphenated,
});

export default function NamaListPage() {
  return <NamaBrowser namas={getNamaIndex().map(toEntry)} />;
}
