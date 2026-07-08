import type { Metadata } from "next";
import { pageAlternates } from "@/lib/i18n";
import { getStayingPage } from "@/tina/lib/client";
import { StayingPageDocument } from "@/tina/__generated__/types";
import StayingClient from "./StayingClient";

export const metadata: Metadata = {
  title: "Sleeping & Living",
  description:
    "The houses, bedrooms and shared spaces of Sømliøya — intentionally simple, shared, and close to nature.",
  alternates: pageAlternates("/staying", "en"),
};

export default async function StayingPage() {
  const props = {
    data: { stayingPage: getStayingPage() as any },
    query: StayingPageDocument,
    variables: { relativePath: "staying.json" },
  };
  return <StayingClient {...props} />;
}
