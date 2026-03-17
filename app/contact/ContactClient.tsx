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

  return (
    <>
      <Nav />
      <PageHero
        src={page?.hero?.image ?? "/images/352DA88B4DA84CDEBDF5A7A07AB23C3F.jpg"}
        alt={page?.hero?.imageAlt ?? "Aerial winter view of Sømliøya and surrounding fjord"}
        title={page?.hero?.title ?? "Get in Touch"}
        subtitle={page?.hero?.subtitle ?? "The island is for rent for a day, a weekend or a week."}
        height="h-[50vh] min-h-[350px]"
      />
      <ContactForm introText={page?.introText} />
      <Footer />
    </>
  );
}
