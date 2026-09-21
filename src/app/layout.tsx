import type { Metadata } from "next";
import { Archivo, Fredoka, Quicksand } from "next/font/google";
import Script from "next/script";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin", "latin-ext"],
  weight: "700",
  variable: "--font-fredoka",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | KAPE čištění",
  },
  description: site.description,
  keywords: [
    "výškové mytí oken",
    "mytí fasád",
    "PuraQleen",
    "SpaceVac",
    "Kränzle",
    "Oertzen",
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
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="cs"
      className={`${archivo.variable} ${fredoka.variable} ${quicksand.variable}`}
    >
      <body>
        <JsonLd />
        {children}
        <Script src="/kape-runtime.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
