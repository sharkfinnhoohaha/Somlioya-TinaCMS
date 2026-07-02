import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import LangSetter from "@/components/LangSetter";
import "./globals.css";

// Self-hosted via next/font — no render-blocking Google Fonts stylesheet,
// no flash of fallback type, and automatic size-adjusted fallbacks so text
// doesn't shift when the webfonts arrive.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-karla",
});

// Structured data for search engines — the island is a rentable lodging.
const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Sømliøya",
  description:
    "A private island retreat in Nærøysund, Trøndelag, Norway. Rent for a day, a weekend, or a week.",
  url: SITE_URL,
  email: "hello@somlioya.no",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nærøysund",
    addressRegion: "Trøndelag",
    addressCountry: "NO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 65.064,
    longitude: 11.931,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sømliøya — Where the world becomes quieter",
    template: "%s · Sømliøya",
  },
  description:
    "A private island retreat in Nærøysund, Trøndelag, Norway. Rent for a day, a weekend, or a week.",
  openGraph: {
    title: "Sømliøya",
    description: "A place to step outside the world for a while.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${karla.variable}`}>
      <body className="grain">
        <LangSetter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
