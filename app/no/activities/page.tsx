import type { Metadata } from "next";
import { getActivitiesPage } from "@/tina/lib/client";
import { pageAlternates } from "@/lib/i18n";
import ActivitiesClient from "../../activities/ActivitiesClient";

export const metadata: Metadata = {
  title: "Aktiviteter",
  description:
    "På vannet, på land, i regionen eller rundt bålet — oppdag hva du kan gjøre på og rundt Sømliøya.",
  alternates: pageAlternates("/activities", "no"),
};

export default function NorwegianActivitiesPage() {
  const props = {
    data: { activitiesPage: getActivitiesPage("no") as any },
    query: "",
    variables: { relativePath: "activities.json" },
  };
  return <ActivitiesClient {...props} />;
}
