import client from "@/tina/__generated__/client";
import { getRitualsPage } from "@/tina/lib/client";
import RitualsClient from "./RitualsClient";

export default async function RitualsPage() {
  try {
    const tinaData = await client.queries.ritualsPage({ relativePath: "rituals.json" });
    return <RitualsClient {...tinaData} />;
  } catch {
    const data = getRitualsPage();
    return (
      <RitualsClient
        data={{ ritualsPage: data as any }}
        query=""
        variables={{ relativePath: "rituals.json" }}
      />
    );
  }
}
