import type { Metadata } from "next";
import { getRitualsPage } from "@/tina/lib/client";
import { pageAlternates } from "@/lib/i18n";
import RitualsClient from "../../rituals/RitualsClient";

export const metadata: Metadata = {
  title: "Ritualer",
  description:
    "Bryllup, feiringer og samlinger på Sømliøya — noen øyeblikk i livet ber om et sted.",
  alternates: pageAlternates("/rituals", "no"),
};

export default function NorwegianRitualsPage() {
  const props = {
    data: { ritualsPage: getRitualsPage("no") as any },
    query: "",
    variables: { relativePath: "rituals.json" },
  };
  return <RitualsClient {...props} />;
}
