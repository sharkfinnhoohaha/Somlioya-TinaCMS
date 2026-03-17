import client from "@/tina/__generated__/client";
import RitualsClient from "./RitualsClient";

export default async function RitualsPage() {
  const tinaData = await client.queries.ritualsPage({ relativePath: "rituals.json" });
  return <RitualsClient {...tinaData} />;
}
