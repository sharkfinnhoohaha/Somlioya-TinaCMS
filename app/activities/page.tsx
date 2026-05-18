import type { Metadata } from "next";
import client from "@/tina/__generated__/client";
import { getActivitiesPage } from "@/tina/lib/client";
import ActivitiesClient from "./ActivitiesClient";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "On the water, on land, exploring the region or gathered around the fire — discover what to do on and around Sømliøya.",
};

export default async function ActivitiesPage() {
  let props: { data: any; query: string; variables: object };
  try {
    props = await client.queries.activitiesPage({ relativePath: "activities.json" });
  } catch {
    props = {
      data: { activitiesPage: getActivitiesPage() as any },
      query: "",
      variables: { relativePath: "activities.json" },
    };
  }
  return <ActivitiesClient {...props} />;
}
