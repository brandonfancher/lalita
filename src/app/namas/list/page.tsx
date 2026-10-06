import { NamaBrowser } from "@/components/nama-browser";
import { getNamaIndex } from "@/lib/content";

export const metadata = { title: "All thousand names" };

export default function NamaListPage() {
  return <NamaBrowser namas={getNamaIndex()} />;
}
