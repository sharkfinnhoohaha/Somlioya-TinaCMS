import type { Metadata } from "next";
import { pageAlternates } from "@/lib/i18n";
import client from "@/tina/__generated__/client";
import { getContactPage } from "@/tina/lib/client";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Ask about availability, pricing and what is possible on Sømliøya. The island is for rent for a day, a weekend or a week.",
  alternates: pageAlternates("/contact", "en"),
};

export default async function ContactPage() {
  let props: { data: any; query: string; variables: object };
  try {
    props = await client.queries.contactPage({ relativePath: "contact.json" });
  } catch {
    props = {
      data: { contactPage: getContactPage() as any },
      query: "",
      variables: { relativePath: "contact.json" },
    };
  }
  return <ContactClient {...props} />;
}
