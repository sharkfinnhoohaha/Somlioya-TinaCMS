import client from "@/tina/__generated__/client";
import { getActivitiesPage } from "@/tina/lib/client";
import ActivitiesClient from "./ActivitiesClient";

export default async function ActivitiesPage() {
  try {
    const tinaData = await client.queries.activitiesPage({ relativePath: "activities.json" });
    return <ActivitiesClient {...tinaData} />;
  } catch {
    const data = getActivitiesPage();
    return (
      <ActivitiesClient
        data={{ activitiesPage: data as any }}
        query=""
        variables={{ relativePath: "activities.json" }}
      />
    );
  }
}
