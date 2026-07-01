import type { Metadata } from "next";
import { getIslandPage } from "@/tina/lib/client";
import { pageAlternates } from "@/lib/i18n";
import IslandClient from "../../island/IslandClient";

export const metadata: Metadata = {
  title: "Om øya",
  description:
    "Sømliøya ligger i Årsetfjorden, Nærøysund, Trøndelag — en norsk øy med stille strandlinjer, nordlig lys, fjell og dyreliv.",
  alternates: pageAlternates("/island", "no"),
};

export default function NorwegianIslandPage() {
  const props = {
    data: { islandPage: getIslandPage("no") as any },
    query: "",
    variables: { relativePath: "island.json" },
  };
  return <IslandClient {...props} />;
}
