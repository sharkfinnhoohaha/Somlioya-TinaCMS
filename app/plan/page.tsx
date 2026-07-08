import type { Metadata } from "next";
import { getPlanPage } from "@/tina/lib/client";
import { PlanPageDocument } from "@/tina/__generated__/types";
import { pageAlternates } from "@/lib/i18n";
import PlanClient from "./PlanClient";

export const metadata: Metadata = {
  title: "Plan Your Stay",
  description:
    "How renting Sømliøya works — enquire with your dates, shape the stay together with us, and arrive. Practical details and rates.",
  alternates: pageAlternates("/plan", "en"),
};

export default async function PlanPage() {
  const props = {
    data: { planPage: getPlanPage() as any },
    query: PlanPageDocument,
    variables: { relativePath: "plan.json" },
  };
  return <PlanClient {...props} />;
}
