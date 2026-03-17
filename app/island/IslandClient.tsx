"use client";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import { useTina } from "tinacms/dist/react";

export default function IslandClient(props: {
  data: any;
  query: string;
  variables: object;
}) {
  const { data } = useTina(props);
  const page = data.islandPage;

  const heroSrc = page?.hero?.image ?? "/images/IMG_5184.jpeg";
  const heroAlt = page?.hero?.imageAlt ?? "Aerial view of the island in summer with mountains behind";

  const intro = page?.intro ?? null;
  const climate = page?.climateSection ?? { heading: "Climate", paragraphs: null, image: undefined, imageAlt: undefined };
  const mountains = page?.mountainsSection ?? { heading: "Mountains and Views", paragraphs: null, image: undefined, imageAlt: undefined };
  const wildlife = page?.wildlifeSection ?? { heading: "Wildlife", paragraphs: null, image: undefined, imageAlt: undefined };

  return (
    <>
      <Nav />
      <PageHero
        src={heroSrc}
        alt={heroAlt}
        title={page?.hero?.title ?? "About the Island"}
        subtitle={page?.hero?.subtitle ?? "Nærøysund municipality, Trøndelag"}
      />

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        <div className="divider mb-8" />
        <RichText value={intro} />
      </Reveal>

      {/* Climate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <Reveal direction="left">
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">{climate.heading}</h3>
          <div className="divider mb-6" />
          <RichText value={climate.paragraphs} />
        </Reveal>
        <Reveal direction="right" delay={0.15}>
          <div className="relative h-[500px]">
            <Image
              src={climate.image ?? "/images/dji_fly_20251123_133742_0223_1763901492851_photo.jpg"}
              alt={climate.imageAlt ?? "The island buildings in golden winter light"}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              quality={80}
            />
          </div>
        </Reveal>
      </div>

      {/* Mountains */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <Reveal direction="left" delay={0.15}>
          <div className="relative h-[500px] md:order-1">
            <Image
              src={mountains.image ?? "/images/IMG_2336.jpeg"}
              alt={mountains.imageAlt ?? "Heilhornet and mountain peaks across the fjord in winter"}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              quality={80}
            />
          </div>
        </Reveal>
        <Reveal direction="right">
          <div className="md:order-0">
            <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">{mountains.heading}</h3>
            <div className="divider mb-6" />
            <RichText value={mountains.paragraphs} />
          </div>
        </Reveal>
      </div>

      {/* Wildlife */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16 pb-24">
        <Reveal direction="left">
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">{wildlife.heading}</h3>
          <div className="divider mb-6" />
          <RichText value={wildlife.paragraphs} />
        </Reveal>
        <Reveal direction="right" delay={0.15}>
          <div className="relative h-[500px]">
            <Image
              src={wildlife.image ?? "/images/IMG_1440.jpeg"}
              alt={wildlife.imageAlt ?? "Reindeer silhouetted against the northern sky on rocks"}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              quality={80}
            />
          </div>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
