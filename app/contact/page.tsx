import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { getContactPage } from "@/tina/lib/client";

export default async function ContactPage() {
  const data = getContactPage();

  return (
    <>
      <Nav />
      <PageHero
        src={data?.hero?.image ?? "/images/352DA88B4DA84CDEBDF5A7A07AB23C3F.jpg"}
        alt={data?.hero?.imageAlt ?? "Aerial winter view of Sømliøya and surrounding fjord"}
        title={data?.hero?.title ?? "Get in Touch"}
        subtitle={data?.hero?.subtitle ?? "The island is for rent for a day, a weekend or a week."}
        height="h-[50vh] min-h-[350px]"
      />
      <ContactForm introText={data?.introText} />
      <Footer />
    </>
  );
}
