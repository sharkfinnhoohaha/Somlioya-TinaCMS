import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { RITUALS_PAGE_QUERY } from "@/sanity/lib/queries";
import RichText from "@/components/RichText";

function imgSrc(sanityImg: any, fallback: string, width = 1200): string {
  if (sanityImg?.asset?._id) return urlFor(sanityImg).width(width).url();
  return fallback;
}

export default async function RitualsPage() {
  const { data } = await sanityFetch({ query: RITUALS_PAGE_QUERY }).catch(() => ({ data: null }));

  const heroSrc = imgSrc(data?.hero?.image, "/images/IMG_5345.jpeg");
  const heroAlt = data?.hero?.image?.alt ?? "Decorated fabric banners hanging from birch trees with set table behind";

  const intro = data?.intro ?? null;

  const midImgSrc = imgSrc(data?.midImage, "/images/IMG_5352.jpeg");
  const midImgAlt = data?.midImage?.alt ?? "Community gathering at table under decorated fabric banners";

  const secondParagraphs = data?.secondParagraphs ?? null;
  const shaped = data?.shapedTogetherSection ?? { heading: "Shaped Together", paragraphs: null };
  const gatherings = data?.gatheringsSection ?? { heading: "Other Gatherings", paragraphs: null, pullQuote: null };

  return (
    <>
      <Nav />
      <PageHero
        src={heroSrc}
        alt={heroAlt}
        title={data?.hero?.title ?? "Rituals"}
        subtitle={data?.hero?.subtitle ?? "Some moments in life ask for a place."}
      />

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        <div className="divider mb-8" />
        <RichText value={intro} />
      </Reveal>

      <Reveal>
        <div className="relative w-full h-[60vh] min-h-[400px]">
          <Image src={midImgSrc} alt={midImgAlt} fill className="object-cover" sizes="100vw" quality={85} />
        </div>
      </Reveal>

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        <RichText value={secondParagraphs} />
      </Reveal>

      {/* Shaped Together */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <div>
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">{shaped.heading}</h3>
          <div className="divider mb-6" />
          <RichText value={shaped.paragraphs} />
        </div>
        <div className="relative h-[500px]">
          <Image
            src={imgSrc(shaped.image, "/images/IMG_9780.jpeg")}
            alt={shaped.image?.alt ?? "Artist painting at an easel among birch trees"}
            fill className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw" quality={80}
          />
        </div>
      </Reveal>

      {/* Other Gatherings */}
      <div className="bg-bone">
        <Reveal className="max-w-2xl mx-auto px-6 py-20">
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">{gatherings.heading}</h3>
          <div className="divider mb-6" />
          <RichText value={gatherings.paragraphs} />
          <div className="divider my-8" />
          <p className="font-heading text-fjord italic text-lg font-light">{gatherings.pullQuote}</p>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
