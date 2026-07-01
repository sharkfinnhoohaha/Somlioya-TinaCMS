import type { Metadata } from "next";
import { pageAlternates } from "@/lib/i18n";
import client from "@/tina/__generated__/client";
import { getStayingPage } from "@/tina/lib/client";
import StayingClient from "./StayingClient";

export const metadata: Metadata = {
  title: "Sleeping & Living",
  description:
    "The houses, bedrooms and shared spaces of Sømliøya — intentionally simple, shared, and close to nature.",
  alternates: pageAlternates("/staying", "en"),
};

export default async function StayingPage() {
  let props: { data: any; query: string; variables: object };
  try {
    props = await client.queries.stayingPage({ relativePath: "staying.json" });
  } catch {
    props = {
      data: { stayingPage: getStayingPage() as any },
      query: "",
      variables: { relativePath: "staying.json" },
    };
  }
  return <StayingClient {...props} />;
}
