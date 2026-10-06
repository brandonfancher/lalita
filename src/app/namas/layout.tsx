import { NamaTabs } from "@/components/nama-tabs";

export default function NamasLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-6 max-w-2xl">
        <p className="eyebrow text-sindura">Nāmāvalī</p>
        <h1 className="display mt-2 text-[2.6rem] leading-tight text-ink sm:text-[3.25rem]">
          The thousand names
        </h1>
        <p className="mt-3 text-[1.1rem] leading-relaxed text-ink-muted">
          Every name in order. Look one up in the list, in either script or by meaning, or recite
          them as offerings, each one opened with oṃ and closed with namaḥ.
        </p>
      </header>
      <NamaTabs />
      {children}
    </div>
  );
}
