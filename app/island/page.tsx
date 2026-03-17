import client from "@/tina/__generated__/client";
import IslandClient from "./IslandClient";

export default async function IslandPage() {
  const tinaData = await client.queries.islandPage({ relativePath: "island.json" });
  return <IslandClient {...tinaData} />;
}
