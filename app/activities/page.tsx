import client from "@/tina/__generated__/client";
import ActivitiesClient from "./ActivitiesClient";

export default async function ActivitiesPage() {
  const tinaData = await client.queries.activitiesPage({ relativePath: "activities.json" });
  return <ActivitiesClient {...tinaData} />;
}
