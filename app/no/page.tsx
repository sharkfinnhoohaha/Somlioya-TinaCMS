import type { Metadata } from "next";
import { getHomePage } from "@/tina/lib/client";
import { pageAlternates } from "@/lib/i18n";
import HomePageClient from "../HomePageClient";

export const metadata: Metadata = {
  title: "Sømliøya — Der verden blir stillere",
  description:
    "Et privat øy-retreat i Nærøysund, Trøndelag. Leies ut for en dag, en helg eller en uke.",
  alternates: pageAlternates("/", "no"),
};

// Norwegian pages read content/pages/no/*.json directly; they are edited via
// the "(Norsk)" collections in /admin (no live-preview wiring, by design).
export default function NorwegianHomePage() {
  const props = {
    data: { homePage: getHomePage("no") as any },
    query: "",
    variables: { relativePath: "home.json" },
  };
  return <HomePageClient {...props} />;
}
