import client from "@/tina/__generated__/client";
import { getIslandPage } from "@/tina/lib/client";
import IslandClient from "./IslandClient";

export default async function IslandPage() {
  try {
    const tinaData = await client.queries.islandPage({ relativePath: "island.json" });
    return <IslandClient {...tinaData} />;
  } catch {
    const data = getIslandPage();
    return (
      <IslandClient
        data={{ islandPage: data as any }}
        query=""
        variables={{ relativePath: "island.json" }}
      />
    );
  }
}
