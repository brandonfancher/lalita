import { NamaBrowser } from "@/components/nama-browser";
import { getNamaIndex } from "@/lib/content";

export const metadata = { title: "All thousand names" };

export default function NamasPage() {
  const namas = getNamaIndex();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-6 max-w-2xl">
        <p className="eyebrow text-sindura">Nāmāvalī</p>
        <h1 className="display mt-2 text-[2.6rem] leading-tight text-ink sm:text-[3.25rem]">
          The thousand names
        </h1>
        <p className="mt-3 text-[1.1rem] leading-relaxed text-ink-muted">
          Every name in order, each linked to the shloka it belongs to. Search in either script or
          by meaning.
        </p>
      </header>
      <NamaBrowser namas={namas} />
    </div>
  );
}
