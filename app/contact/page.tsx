import type { Metadata } from "next";
import { pageAlternates } from "@/lib/i18n";
import { getContactPage } from "@/tina/lib/client";
import { ContactPageDocument } from "@/tina/__generated__/types";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Ask about availability, pricing and what is possible on Sømliøya. The island is for rent for a day, a weekend or a week.",
  alternates: pageAlternates("/contact", "en"),
};

export default async function ContactPage() {
  // Strip contactEmail before it reaches the client — page props are
  // serialized into the HTML, and the delivery address is private. The
  // /api/contact route reads it from the CMS server-side.
  const { contactEmail, ...page } = getContactPage() ?? {};
  const props = {
    data: { contactPage: page as any },
    query: ContactPageDocument,
    variables: { relativePath: "contact.json" },
  };
  return <ContactClient {...props} />;
}
