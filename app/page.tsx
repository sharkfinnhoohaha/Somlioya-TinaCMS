import client from "@/tina/__generated__/client";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const tinaData = await client.queries.homePage({ relativePath: "home.json" });
  return <HomePageClient {...tinaData} />;
}
