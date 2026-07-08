import type { Metadata } from "next";
import { getHomePage } from "@/tina/lib/client";
import { pageAlternates } from "@/lib/i18n";
import { HomePageDocument } from "@/tina/__generated__/types";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  alternates: pageAlternates("/", "en"),
};

export default async function HomePage() {
  const props = {
    data: { homePage: getHomePage() as any },
    query: HomePageDocument,
    variables: { relativePath: "home.json" },
  };
  return <HomePageClient {...props} />;
}
