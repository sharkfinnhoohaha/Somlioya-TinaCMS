import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { CONTACT_PAGE_QUERY } from "@/sanity/lib/queries";

function imgSrc(sanityImg: any, fallback: string, width = 1920): string {
  if (sanityImg?.asset?._id) return urlFor(sanityImg).width(width).url();
  return fallback;
}

export default async function ContactPage() {
  const data = await client.fetch(CONTACT_PAGE_QUERY).catch(() => null);

  return (
    <>
      <Nav />
      <PageHero
        src={imgSrc(data?.hero?.image, "/images/352DA88B4DA84CDEBDF5A7A07AB23C3F.jpg")}
        alt={data?.hero?.image?.alt ?? "Aerial winter view of Sømliøya and surrounding fjord"}
        title={data?.hero?.title ?? "Get in Touch"}
        subtitle={data?.hero?.subtitle ?? "The island is for rent for a day, a weekend or a week."}
        height="h-[50vh] min-h-[350px]"
      />
      <ContactForm introText={data?.introText} />
      <Footer />
    </>
  );
}
