import type { Metadata, Viewport } from "next";
import { EB_Garamond, Instrument_Sans, Tiro_Devanagari_Sanskrit } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

/** EB Garamond covers the full IAST diacritic range (ṛ ṝ ḷ ṃ ḥ ś ṣ ñ ṅ ṭ ḍ ṇ). */
const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Drawn specifically for Sanskrit, including its conjuncts and Vedic marks. */
const tiro = Tiro_Devanagari_Sanskrit({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-ui",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lalitā Sahasranāma — a study",
    template: "%s · Lalitā Sahasranāma",
  },
  description:
    "An interactive study of the Lalitā Sahasranāma: chant, translation, grammar, and background for all 182 shlokas.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5eddf" },
    { media: "(prefers-color-scheme: dark)", color: "#15100c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Applied before paint so the page never flashes the wrong theme. An
          explicit choice wins; otherwise follow the system setting. The
          chosen script is restored the same way, defaulting to both, and so
          is the word-breaks switch, defaulting to off.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement,t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.dataset.theme=t;var s=localStorage.getItem("script");if(s==="deva"||s==="iast")d.dataset.script=s;if(localStorage.getItem("word-breaks")==="on")d.dataset.wordBreaks="on"}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${garamond.variable} ${tiro.variable} ${instrumentSans.variable} antialiased`}
      >
        <div className="relative z-10 flex min-h-dvh flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
