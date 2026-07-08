import type { Metadata } from "next";
import { pageAlternates } from "@/lib/i18n";
import { getRitualsPage } from "@/tina/lib/client";
import { RitualsPageDocument } from "@/tina/__generated__/types";
import RitualsClient from "./RitualsClient";

export const metadata: Metadata = {
  title: "Rituals",
  description:
    "Weddings, celebrations and gatherings on Sømliøya — some moments in life ask for a place.",
  alternates: pageAlternates("/rituals", "en"),
};

export default async function RitualsPage() {
  const props = {
    data: { ritualsPage: getRitualsPage() as any },
    query: RitualsPageDocument,
    variables: { relativePath: "rituals.json" },
  };
  return <RitualsClient {...props} />;
}
