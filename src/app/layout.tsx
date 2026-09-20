import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Výškové mytí oken bez plošiny | KAPE čištění",
    template: "%s | KAPE čištění",
  },
  description: site.description,
  keywords: [
    "výškové mytí oken",
    "mytí fasád",
    "PuraQleen",
    "SpaceVac",
    "Teplice",
    "KAPE čištění",
    "čištění hal",
    "solární panely",
  ],
  authors: [{ name: site.name }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: site.url,
    siteName: site.name,
    title: "Nic není tak vysoké, abychom tam nedosáhli. | KAPE čištění",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "KAPE čištění s.r.o.",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" className={`${plusJakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd />
        <a
          href="#obsah"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Přeskočit na obsah
        </a>
        {children}
      </body>
    </html>
  );
}
