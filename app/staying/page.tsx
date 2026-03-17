import client from "@/tina/__generated__/client";
import StayingClient from "./StayingClient";

export default async function StayingPage() {
  const tinaData = await client.queries.stayingPage({ relativePath: "staying.json" });
  return <StayingClient {...tinaData} />;
}
