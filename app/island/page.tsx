import type { Metadata } from "next";
import { pageAlternates } from "@/lib/i18n";
import { getIslandPage } from "@/tina/lib/client";
import { IslandPageDocument } from "@/tina/__generated__/types";
import IslandClient from "./IslandClient";

export const metadata: Metadata = {
  title: "About the Island",
  description:
    "Sømliøya lies in Årsetfjorden, Nærøysund, Trøndelag — a Norwegian island of quiet shorelines, northern light, mountains and wildlife.",
  alternates: pageAlternates("/island", "en"),
};

export default async function IslandPage() {
  const props = {
    data: { islandPage: getIslandPage() as any },
    query: IslandPageDocument,
    variables: { relativePath: "island.json" },
  };
  return <IslandClient {...props} />;
}
