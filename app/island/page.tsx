import type { Metadata } from "next";
import client from "@/tina/__generated__/client";
import { getIslandPage } from "@/tina/lib/client";
import IslandClient from "./IslandClient";

export const metadata: Metadata = {
  title: "About the Island",
  description:
    "Sømliøya lies in Årsetfjorden, Nærøysund, Trøndelag — a Norwegian island of quiet shorelines, northern light, mountains and wildlife.",
};

export default async function IslandPage() {
  let props: { data: any; query: string; variables: object };
  try {
    props = await client.queries.islandPage({ relativePath: "island.json" });
  } catch {
    props = {
      data: { islandPage: getIslandPage() as any },
      query: "",
      variables: { relativePath: "island.json" },
    };
  }
  return <IslandClient {...props} />;
}
