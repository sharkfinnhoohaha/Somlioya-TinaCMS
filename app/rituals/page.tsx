import type { Metadata } from "next";
import client from "@/tina/__generated__/client";
import { getRitualsPage } from "@/tina/lib/client";
import RitualsClient from "./RitualsClient";

export const metadata: Metadata = {
  title: "Rituals",
  description:
    "Weddings, celebrations and gatherings on Sømliøya — some moments in life ask for a place.",
};

export default async function RitualsPage() {
  let props: { data: any; query: string; variables: object };
  try {
    props = await client.queries.ritualsPage({ relativePath: "rituals.json" });
  } catch {
    props = {
      data: { ritualsPage: getRitualsPage() as any },
      query: "",
      variables: { relativePath: "rituals.json" },
    };
  }
  return <RitualsClient {...props} />;
}
