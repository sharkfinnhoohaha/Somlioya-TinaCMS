"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { useTina } from "tinacms/dist/react";

export default function ContactClient(props: {
  data: any;
  query: string;
  variables: object;
}) {
  const { data } = useTina(props);
  const page = data.contactPage;

  const heroSrc = page?.hero?.image ?? "/images/352DA88B4DA84CDEBDF5A7A07AB23C3F.jpg";
  const heroPoster =
    page?.hero?.posterImage ?? "/images/352DA88B4DA84CDEBDF5A7A07AB23C3F.jpg";

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHero
          src={heroSrc}
          poster={heroPoster}
          alt={
            page?.hero?.imageAlt ??
            "Aerial winter view of Sømliøya and surrounding fjord"
          }
          title={page?.hero?.title ?? "Get in Touch"}
          subtitle={
            page?.hero?.subtitle ??
            "The island is for rent for a day, a weekend or a week."
          }
          height="h-[52vh] min-h-[360px]"
        />
        <ContactForm
          introText={page?.introText}
          contactEmail={page?.contactEmail}
        />
      </main>
      <Footer />
    </>
  );
}
