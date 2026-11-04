import type { MetadataRoute } from "next";

import { getModuleSummaries, getNamaIndex } from "@/lib/content";
import { absoluteUrl, namaPath, shlokaPath } from "@/lib/site";
import { SCRIPT_PAGES } from "@/lib/script-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  });

  return [
    page("/", 1),
    page("/how-to-learn", 0.9),
    page("/shlokas", 0.9),
    page("/namas/list", 0.9),
    page("/namas/recite", 0.8),
    page("/chant", 0.8),
    page("/learn", 0.6),
    page("/jam", 0.5),
    page("/contact", 0.3),
    ...SCRIPT_PAGES.map((s) => page(`/text/${s.slug}`, 0.8)),
    ...getModuleSummaries().map((s) => page(shlokaPath(s.id), 0.7)),
    ...getNamaIndex().map((n) => page(namaPath(n.index), 0.5)),
  ];
}
