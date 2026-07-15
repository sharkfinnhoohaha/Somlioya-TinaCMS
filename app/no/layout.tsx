import type { Metadata } from "next";

export const metadata: Metadata = {
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

// Only the root layout may render <html>/<body> — rendering them here again
// produced nested <html> tags on every /no page and React hydration errors.
// The lang attribute is switched to "nb" on /no routes by <LangSetter> in the
// root layout; fonts, global CSS and the skip link also come from there.
export default function NorwegianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
