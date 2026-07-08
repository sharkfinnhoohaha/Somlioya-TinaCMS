import type { Metadata } from "next";
import { pageAlternates } from "@/lib/i18n";
import { getActivitiesPage } from "@/tina/lib/client";
import { ActivitiesPageDocument } from "@/tina/__generated__/types";
import ActivitiesClient from "./ActivitiesClient";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "On the water, on land, exploring the region or gathered around the fire — discover what to do on and around Sømliøya.",
  alternates: pageAlternates("/activities", "en"),
};

export default async function ActivitiesPage() {
  const props = {
    data: { activitiesPage: getActivitiesPage() as any },
    query: ActivitiesPageDocument,
    variables: { relativePath: "activities.json" },
  };
  return <ActivitiesClient {...props} />;
}
