import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { ISLAND_PAGE_QUERY } from "@/sanity/lib/queries";
import RichText from "@/components/RichText";

function imgSrc(sanityImg: any, fallback: string, width = 1200): string {
  if (sanityImg?.asset?._id) return urlFor(sanityImg).width(width).url();
  return fallback;
}

export default async function IslandPage() {
  const { data } = await sanityFetch({ query: ISLAND_PAGE_QUERY }).catch(() => ({ data: null }));

  const heroSrc = imgSrc(data?.hero?.image, "/images/IMG_5184.jpeg");
  const heroAlt = data?.hero?.image?.alt ?? "Aerial view of the island in summer with mountains behind";

  const intro = data?.intro ?? null;
  const climate = data?.climateSection ?? { heading: "Climate", paragraphs: null };
  const mountains = data?.mountainsSection ?? { heading: "Mountains and Views", paragraphs: null };
  const wildlife = data?.wildlifeSection ?? { heading: "Wildlife", paragraphs: null };

  return (
    <>
      <Nav />
      <PageHero
        src={heroSrc}
        alt={heroAlt}
        title={data?.hero?.title ?? "About the Island"}
        subtitle={data?.hero?.subtitle ?? "Nærøysund municipality, Trøndelag"}
      />

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        <div className="divider mb-8" />
        <RichText value={intro} />
      </Reveal>

      {/* Climate */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <div>
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">{climate.heading}</h3>
          <div className="divider mb-6" />
          <RichText value={climate.paragraphs} />
        </div>
        <div className="relative h-[500px]">
          <Image
            src={imgSrc(climate.image, "/images/dji_fly_20251123_133742_0223_1763901492851_photo.jpg")}
            alt={climate.image?.alt ?? "The island buildings in golden winter light"}
            fill className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw" quality={80}
          />
        </div>
      </Reveal>

      {/* Mountains */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <div className="relative h-[500px] md:order-1">
          <Image
            src={imgSrc(mountains.image, "/images/IMG_2336.jpeg")}
            alt={mountains.image?.alt ?? "Heilhornet and mountain peaks across the fjord in winter"}
            fill className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw" quality={80}
          />
        </div>
        <div className="md:order-0">
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">{mountains.heading}</h3>
          <div className="divider mb-6" />
          <RichText value={mountains.paragraphs} />
        </div>
      </Reveal>

      {/* Wildlife */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16 pb-24">
        <div>
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">{wildlife.heading}</h3>
          <div className="divider mb-6" />
          <RichText value={wildlife.paragraphs} />
        </div>
        <div className="relative h-[500px]">
          <Image
            src={imgSrc(wildlife.image, "/images/IMG_1440.jpeg")}
            alt={wildlife.image?.alt ?? "Reindeer silhouetted against the northern sky on rocks"}
            fill className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw" quality={80}
          />
        </div>
      </Reveal>

      <Footer />
    </>
  );
}
