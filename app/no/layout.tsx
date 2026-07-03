import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "@/app/globals.css";

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

const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Sømliøya",
  description:
    "Et privat øy-retreat i Nærøysund, Trøndelag, Norge. Leies ut for en dag, en helg eller en uke.",
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
    default: "Sømliøya — Der verden blir stillere",
    template: "%s · Sømliøya",
  },
  description:
    "Et privat øy-retreat i Nærøysund, Trøndelag. Leies ut for en dag, en helg eller en uke.",
  openGraph: {
    title: "Sømliøya",
    description: "Et sted å tre ut av verden for en stund.",
    type: "website",
    locale: "nb_NO",
  },
};

export default function NorwegianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className={`${cormorant.variable} ${karla.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Hopp til innhold
        </a>
        {children}
      </body>
    </html>
  );
}
