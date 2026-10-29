import { NamaBrowser } from "@/components/nama-browser";
import { getNamaIndex } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  absoluteTitle: "Lalita Sahasranama: All 1000 Names with Meaning",
  description:
    "The thousand names of Lalitā in order, in Devanagari and transliteration, each with its meaning. Search by name, meaning, or number, and open any name for its grammar, chant, and place in the stotra.",
  path: "/namas/list",
});

export default function NamaListPage() {
  return <NamaBrowser namas={getNamaIndex()} />;
}
