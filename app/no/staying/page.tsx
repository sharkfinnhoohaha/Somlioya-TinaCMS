import type { Metadata } from "next";
import { getStayingPage } from "@/tina/lib/client";
import { pageAlternates } from "@/lib/i18n";
import StayingClient from "../../staying/StayingClient";

export const metadata: Metadata = {
  title: "Soving og opphold",
  description:
    "Husene, soverommene og fellesrommene på Sømliøya — bevisst enkelt, delt, og nær naturen.",
  alternates: pageAlternates("/staying", "no"),
};

export default function NorwegianStayingPage() {
  const props = {
    data: { stayingPage: getStayingPage("no") as any },
    query: "",
    variables: { relativePath: "staying.json" },
  };
  return <StayingClient {...props} />;
}
