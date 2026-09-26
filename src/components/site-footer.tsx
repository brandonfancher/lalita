import { Divider } from "@/components/ornament";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 sm:px-6">
      <Divider className="mb-6" />
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="deva text-lg text-sindura">॥ श्रीमात्रे नमः ॥</p>
        <p className="text-sm italic text-ink-faint">
          Chant recording by Ranjani &amp; Gayatri. Letter sounds from learnsanskrit.org.
        </p>
      </div>
    </footer>
  );
}
