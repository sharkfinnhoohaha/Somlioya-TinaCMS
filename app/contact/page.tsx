import type { Metadata } from "next";
import { pageAlternates } from "@/lib/i18n";
import { getContactPage } from "@/tina/lib/client";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Ask about availability, pricing and what is possible on Sømliøya. The island is for rent for a day, a weekend or a week.",
  alternates: pageAlternates("/contact", "en"),
};

export default async function ContactPage() {
  const props = {
    data: { contactPage: getContactPage() as any },
    query: "",
    variables: { relativePath: "contact.json" },
  };
  return <ContactClient {...props} />;
}
