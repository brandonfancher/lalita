import { Suspense } from "react";

import { ContactForm, PresetContactForm } from "@/components/contact-form";
import { breadcrumbs, JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/contact";
const DESCRIPTION =
  "Write with a question about a name or a verse, a correction or a suggestion for the site, or to support this study of the Lalita Sahasranama.";

export const metadata = pageMetadata({
  title: "Contact",
  shareTitle: `Write to ${SITE_NAME}`,
  description: DESCRIPTION,
  path: PATH,
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact",
            description: DESCRIPTION,
            url: absoluteUrl(PATH),
          },
          {
            "@context": "https://schema.org",
            ...breadcrumbs([
              ["Lalitā Sahasranāma", "/"],
              ["Contact", PATH],
            ]),
          },
        ]}
      />

      <header className="mb-10">
        <p className="eyebrow text-sindura">Saṃvāda &middot; Conversation</p>
        <h1 className="display mt-2 text-[2.4rem] leading-[1.1] text-ink sm:text-[3.1rem]">Write to me</h1>
        <p className="mt-4 text-[1.15rem] leading-relaxed text-ink-muted">
          A question about a name or a verse, a mistake in the text or its meanings, an idea for the site, or a
          wish to help this work along: all are welcome. I read every message, and reply to as many as I can.
        </p>
      </header>

      {/* The fallback is the same form, so it is in the page's HTML before the query string is read. */}
      <Suspense fallback={<ContactForm />}>
        <PresetContactForm />
      </Suspense>
    </div>
  );
}
