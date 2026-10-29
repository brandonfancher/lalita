import { absoluteUrl, SITE_NAME, SITE_NAME_PLAIN, SITE_URL } from "@/lib/site";

/** Structured data for search engines. `<` is escaped so the text can never close the script. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** The stotra itself, which every shloka and name page is part of. */
export const STOTRA = {
  "@type": "CreativeWork",
  "@id": `${SITE_URL}/#stotra`,
  name: "Śrī Lalitā Sahasranāma Stotram",
  alternateName: [
    SITE_NAME_PLAIN,
    "Lalitha Sahasranamam",
    "Sri Lalitha Sahasranama Stotram",
    "श्रीललितासहस्रनामस्तोत्रम्",
    "ललिता सहस्रनाम",
  ],
  inLanguage: "sa",
  isPartOf: { "@type": "Book", name: "Brahmāṇḍa Purāṇa" },
  url: SITE_URL,
};

export const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: [SITE_NAME_PLAIN, "Lalitha Sahasranamam study", "lalita.study"],
  url: SITE_URL,
  inLanguage: "en",
};

/** Breadcrumbs from the home page down, as [name, path] pairs. */
export function breadcrumbs(trail: [string, string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}
