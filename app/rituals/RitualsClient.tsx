"use client";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import { useTina } from "tinacms/dist/react";

export default function RitualsClient(props: {
  data: any;
  query: string;
  variables: object;
}) {
  const { data } = useTina(props);
  const page = data.ritualsPage;

  const heroSrc = page?.hero?.image ?? "/images/IMG_5345.jpeg";
  const heroAlt = page?.hero?.imageAlt ?? "Decorated fabric banners hanging from birch trees with set table behind";

  const intro = page?.intro ?? null;

  const midImgSrc = page?.midImage?.src ?? "/images/IMG_5352.jpeg";
  const midImgAlt = page?.midImage?.alt ?? "Community gathering at table under decorated fabric banners";

  const secondParagraphs = page?.secondParagraphs ?? null;
  const shaped = page?.shapedTogetherSection ?? { heading: "Shaped Together", paragraphs: null, image: undefined, imageAlt: undefined };
  const gatherings = page?.gatheringsSection ?? { heading: "Other Gatherings", paragraphs: null, pullQuote: null };

  return (
    <>
      <Nav />
      <PageHero
        src={heroSrc}
        alt={heroAlt}
        title={page?.hero?.title ?? "Rituals"}
        subtitle={page?.hero?.subtitle ?? "Some moments in life ask for a place."}
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
            src={shaped.image ?? "/images/IMG_9780.jpeg"}
            alt={shaped.imageAlt ?? "Artist painting at an easel among birch trees"}
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
