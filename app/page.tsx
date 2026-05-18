import client from "@/tina/__generated__/client";
import { getHomePage } from "@/tina/lib/client";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  let props: { data: any; query: string; variables: object };
  try {
    props = await client.queries.homePage({ relativePath: "home.json" });
  } catch {
    props = {
      data: { homePage: getHomePage() as any },
      query: "",
      variables: { relativePath: "home.json" },
    };
  }
  return <HomePageClient {...props} />;
}
