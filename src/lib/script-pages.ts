import type { SpellingId } from "./transliterate";

/**
 * The whole stotra in one script per page, for readers who learned to chant
 * it from a booklet in their own script, and for the searches they make
 * ("Lalitha Sahasranamam lyrics in Telugu").
 */
export type ScriptPage = {
  slug: string;
  spelling: SpellingId;
  /** In English, as it follows "in": "Telugu". */
  name: string;
  /** The script's own name for itself. */
  native?: string;
  /** The stotra's title as it is usually printed in this script. */
  stotraTitle: string;
  /** The page title, phrased as the search people make. */
  searchTitle: string;
};

export const SCRIPT_PAGES: ScriptPage[] = [
  {
    slug: "sanskrit",
    spelling: "deva",
    name: "Sanskrit (Devanagari)",
    native: "संस्कृतम्",
    stotraTitle: "श्री ललिता सहस्रनाम स्तोत्रम्",
    searchTitle: "Lalita Sahasranama in Sanskrit & Hindi (Devanagari) — Full Text",
  },
  {
    slug: "english",
    spelling: "iast",
    name: "English transliteration",
    stotraTitle: "Śrī Lalitā Sahasranāma Stotram",
    searchTitle: "Lalitha Sahasranamam Lyrics in English — Full Text with Transliteration",
  },
  {
    slug: "telugu",
    spelling: "telugu",
    name: "Telugu",
    native: "తెలుగు",
    stotraTitle: "శ్రీ లలితా సహస్రనామ స్తోత్రం",
    searchTitle: "Lalitha Sahasranamam Lyrics in Telugu",
  },
  {
    slug: "kannada",
    spelling: "kannada",
    name: "Kannada",
    native: "ಕನ್ನಡ",
    stotraTitle: "ಶ್ರೀ ಲಲಿತಾ ಸಹಸ್ರನಾಮ ಸ್ತೋತ್ರಂ",
    searchTitle: "Lalitha Sahasranamam Lyrics in Kannada",
  },
  {
    slug: "tamil",
    spelling: "tamil",
    name: "Tamil",
    native: "தமிழ்",
    stotraTitle: "ஸ்ரீ லலிதா ஸஹஸ்ரநாம ஸ்தோத்ரம்",
    searchTitle: "Lalitha Sahasranamam Lyrics in Tamil",
  },
  {
    slug: "malayalam",
    spelling: "malayalam",
    name: "Malayalam",
    native: "മലയാളം",
    stotraTitle: "ശ്രീ ലളിതാ സഹസ്രനാമ സ്തോത്രം",
    searchTitle: "Lalitha Sahasranamam Lyrics in Malayalam",
  },
  {
    slug: "gujarati",
    spelling: "gujarati",
    name: "Gujarati",
    native: "ગુજરાતી",
    stotraTitle: "શ્રી લલિતા સહસ્રનામ સ્તોત્રમ્",
    searchTitle: "Lalita Sahasranama in Gujarati",
  },
  {
    slug: "bengali",
    spelling: "bengali",
    name: "Bengali",
    native: "বাংলা",
    stotraTitle: "শ্রী ললিতা সহস্রনাম স্তোত্রম্",
    searchTitle: "Lalita Sahasranama in Bengali",
  },
];

export const scriptPage = (slug: string) => SCRIPT_PAGES.find((s) => s.slug === slug);
