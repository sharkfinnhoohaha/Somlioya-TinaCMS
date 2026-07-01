import type { Metadata } from "next";
import { getPlanPage } from "@/tina/lib/client";
import { pageAlternates } from "@/lib/i18n";
import PlanClient from "../../plan/PlanClient";

export const metadata: Metadata = {
  title: "Planlegg oppholdet",
  description:
    "Slik fungerer det å leie Sømliøya — send en forespørsel med datoene dine, form oppholdet sammen med oss, og kom frem. Praktisk informasjon og priser.",
  alternates: pageAlternates("/plan", "no"),
};

export default function NorwegianPlanPage() {
  const props = {
    data: { planPage: getPlanPage("no") as any },
    query: "",
    variables: { relativePath: "plan.json" },
  };
  return <PlanClient {...props} />;
}
