import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Noto_Serif, Noto_Serif_Devanagari } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/** Noto Serif covers the full IAST diacritic range (ṛ ṝ ḷ ṃ ḥ ś ṣ ñ ṅ ṭ ḍ ṇ). */
const notoSerif = Noto_Serif({
  variable: "--font-iast",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const notoDeva = Noto_Serif_Devanagari({
  variable: "--font-deva",
  subsets: ["devanagari", "latin"],
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
  themeColor: "#100b0c",
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
          Applied before paint so a chosen light theme doesn't flash dark.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} ${notoSerif.variable} ${notoDeva.variable} antialiased`}
      >
        <div className="relative z-10 flex min-h-dvh flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
