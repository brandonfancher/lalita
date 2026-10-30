import Link from "next/link";

import { Divider } from "@/components/ornament";
import { SCRIPT_PAGES } from "@/lib/script-pages";

const SHORT_NAMES: Record<string, string> = {
  sanskrit: "Sanskrit",
  english: "English",
};

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 sm:px-6">
      <Divider className="mb-6" />
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="deva text-lg text-sindura">॥ श्रीमात्रे नमः ॥</p>
        <nav aria-label="Guides and full text" className="mt-2 max-w-2xl font-sans text-[13px] text-ink-muted">
          <Link href="/how-to-learn" className="hover:text-sindura">
            How to learn and chant it
          </Link>
          <span aria-hidden className="mx-2 text-ink-faint">·</span>
          <span className="text-ink-faint">Full text in </span>
          {SCRIPT_PAGES.map((s, i) => (
            <span key={s.slug}>
              {i > 0 && ", "}
              <Link href={`/text/${s.slug}`} className="hover:text-sindura">
                {SHORT_NAMES[s.slug] ?? s.name}
              </Link>
            </span>
          ))}
          <span aria-hidden className="mx-2 text-ink-faint">·</span>
          <Link href="/contact" className="hover:text-sindura">
            Contact
          </Link>
        </nav>
        <p className="mt-1 text-sm italic text-ink-faint">
          Chant recording by Ranjani &amp; Gayatri. Letter sounds from learnsanskrit.org.
        </p>
      </div>
    </footer>
  );
}
