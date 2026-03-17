import client from "@/tina/__generated__/client";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  const tinaData = await client.queries.contactPage({ relativePath: "contact.json" });
  return <ContactClient {...tinaData} />;
}
