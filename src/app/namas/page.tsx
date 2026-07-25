import { NamaBrowser } from "@/components/nama-browser";
import { getNamaIndex } from "@/lib/content";

export const metadata = { title: "All thousand names" };

export default function NamasPage() {
  const namas = getNamaIndex();

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
      <header className="mb-6">
        <h1 className="display text-3xl font-medium text-ink sm:text-4xl">The thousand names</h1>
        <p className="mt-2 max-w-2xl text-[15px] text-ink-muted">
          Every name in order, each linked to the shloka it belongs to. Search in either script or
          by meaning.
        </p>
      </header>
      <NamaBrowser namas={namas} />
    </div>
  );
}
