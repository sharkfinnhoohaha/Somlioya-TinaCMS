import client from "@/tina/__generated__/client";
import { getStayingPage } from "@/tina/lib/client";
import StayingClient from "./StayingClient";

export default async function StayingPage() {
  try {
    const tinaData = await client.queries.stayingPage({ relativePath: "staying.json" });
    return <StayingClient {...tinaData} />;
  } catch {
    const data = getStayingPage();
    return (
      <StayingClient
        data={{ stayingPage: data as any }}
        query=""
        variables={{ relativePath: "staying.json" }}
      />
    );
  }
}
