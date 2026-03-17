import client from "@/tina/__generated__/client";
import { getHomePage } from "@/tina/lib/client";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  try {
    const tinaData = await client.queries.homePage({ relativePath: "home.json" });
    return <HomePageClient {...tinaData} />;
  } catch {
    const data = getHomePage();
    return (
      <HomePageClient
        data={{ homePage: data as any }}
        query=""
        variables={{ relativePath: "home.json" }}
      />
    );
  }
}
