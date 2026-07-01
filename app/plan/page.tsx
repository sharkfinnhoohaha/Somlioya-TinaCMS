import type { Metadata } from "next";
import client from "@/tina/__generated__/client";
import { getPlanPage } from "@/tina/lib/client";
import { pageAlternates } from "@/lib/i18n";
import PlanClient from "./PlanClient";

export const metadata: Metadata = {
  title: "Plan Your Stay",
  description:
    "How renting Sømliøya works — enquire with your dates, shape the stay together with us, and arrive. Practical details and rates.",
  alternates: pageAlternates("/plan", "en"),
};

export default async function PlanPage() {
  let props: { data: any; query: string; variables: object };
  try {
    props = await client.queries.planPage({ relativePath: "plan.json" });
  } catch {
    props = {
      data: { planPage: getPlanPage() as any },
      query: "",
      variables: { relativePath: "plan.json" },
    };
  }
  return <PlanClient {...props} />;
}
