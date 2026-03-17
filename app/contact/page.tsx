import client from "@/tina/__generated__/client";
import { getContactPage } from "@/tina/lib/client";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  try {
    const tinaData = await client.queries.contactPage({ relativePath: "contact.json" });
    return <ContactClient {...tinaData} />;
  } catch {
    const data = getContactPage();
    return (
      <ContactClient
        data={{ contactPage: data as any }}
        query=""
        variables={{ relativePath: "contact.json" }}
      />
    );
  }
}
