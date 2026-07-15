import type { Metadata } from "next";
import { getContactPage } from "@/tina/lib/client";
import { pageAlternates } from "@/lib/i18n";
import ContactClient from "../../contact/ContactClient";

export const metadata: Metadata = {
  title: "Ta kontakt",
  description:
    "Spør om ledige datoer, priser og hva som er mulig på Sømliøya. Øya leies ut for en dag, en helg eller en uke.",
  alternates: pageAlternates("/contact", "no"),
};

export default function NorwegianContactPage() {
  // Strip contactEmail before it reaches the client — page props are
  // serialized into the HTML, and the delivery address is private. The
  // /api/contact route reads it from the CMS server-side.
  const { contactEmail, ...page } = getContactPage("no") ?? {};
  const props = {
    data: { contactPage: page as any },
    query: "",
    variables: { relativePath: "contact.json" },
  };
  return <ContactClient {...props} />;
}
