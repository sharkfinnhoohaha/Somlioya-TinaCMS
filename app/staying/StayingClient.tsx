"use client";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import AnimatedDivider from "@/components/AnimatedDivider";
import SectionHeading from "@/components/SectionHeading";
import FeatureRow from "@/components/FeatureRow";
import FullBleedImage from "@/components/FullBleedImage";
import StayingGallery from "@/components/StayingGallery";
import CtaBand from "@/components/CtaBand";
import { useTina } from "tinacms/dist/react";

export default function StayingClient(props: {
  data: any;
  query: string;
  variables: object;
}) {
  const { data } = useTina(props);
  const page = data.stayingPage;

  const heroSrc = page?.hero?.image ?? "/images/569F22A4217156A6F9DEF31BB8B2F7CC.JPG";
  const heroAlt =
    page?.hero?.imageAlt ??
    "Aerial view of island buildings surrounded by forest and fjord";
  const heroPoster =
    page?.hero?.posterImage ?? "/images/569F22A4217156A6F9DEF31BB8B2F7CC.JPG";

  const intro = page?.intro ?? null;

  const buildingImgs = page?.buildingImages?.length
    ? page.buildingImages
    : [
        { src: "/images/A4D4C1444081F165FD87951C3F619B8B.jpg", alt: "Aerial view of both island buildings" },
        { src: "/images/IMG_3215.jpeg", alt: "Main house exterior with stairs and pine tree" },
      ];
  const oddBuildings = buildingImgs.length % 2 === 1;

  const sleeping = page?.sleepingSection ?? { heading: "Sleeping", paragraphs: null };
  const sharedSpaces = page?.sharedSpacesSection ?? { heading: "Shared Spaces", paragraphs: null };

  const galleryImages = page?.galleryImages?.length
    ? page.galleryImages.map((img: any) => ({ src: img.src ?? "", alt: img.alt ?? "" }))
    : [
        { src: "/images/IMG_7429.jpeg", alt: "Gathering room with tables and sunflower paintings" },
        { src: "/images/IMG_7414.jpeg", alt: "Large dining room with wooden floors" },
        { src: "/images/IMG_7422.jpeg", alt: "Living room with fireplace and couches" },
        { src: "/images/IMG_1256.jpeg", alt: "People cooking together in the kitchen" },
        { src: "/images/IMG_5123.jpeg", alt: "Outdoor picnic tables with fjord view" },
        { src: "/images/IMG_6710.jpeg", alt: "Yellow house exterior with wooden deck" },
      ];

  const groupSpaces = page?.groupSpacesSection ?? { heading: "Group Spaces", paragraphs: null };

  const closingImgSrc = page?.closingImage?.src ?? "/images/IMG_5184.jpeg";
  const closingImgAlt = page?.closingImage?.alt ?? "Outdoor volleyball net surrounded by forest";

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHero
          src={heroSrc}
          alt={heroAlt}
          poster={heroPoster}
          title={page?.hero?.title ?? "Sleeping & Living"}
          subtitle={page?.hero?.subtitle ?? "Intentionally simple, shared, and close to nature."}
        />

        <Section width="prose">
          <Reveal>
            <AnimatedDivider className="mb-8" />
            <RichText value={intro} />
          </Reveal>
        </Section>

        {/* Building images — adapts to any number of images */}
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 md:px-6">
          {buildingImgs.map((img: any, i: number) => (
            <div
              key={i}
              className={`relative aspect-[3/2] ${
                oddBuildings && i === 0 ? "sm:col-span-2 sm:aspect-[2/1]" : ""
              }`}
            >
              <Image
                src={img.src ?? ""}
                alt={img.alt ?? ""}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
                quality={80}
              />
            </div>
          ))}
        </Reveal>

        <FeatureRow
          heading={sleeping.heading}
          body={sleeping.paragraphs}
          image={sleeping.image ?? "/images/IMG_3202.jpeg"}
          imageAlt={sleeping.imageAlt ?? "Main house with deck, garden and dog"}
          reverse
        />

        <Section width="prose">
          <Reveal>
            <SectionHeading as="h2">{sharedSpaces.heading}</SectionHeading>
            <div className="mt-6">
              <RichText value={sharedSpaces.paragraphs} />
            </div>
          </Reveal>
        </Section>

        <Reveal>
          <StayingGallery images={galleryImages} />
        </Reveal>

        <Section width="prose">
          <Reveal>
            <SectionHeading as="h2">{groupSpaces.heading}</SectionHeading>
            <div className="mt-6">
              <RichText value={groupSpaces.paragraphs} />
            </div>
          </Reveal>
        </Section>

        <FullBleedImage src={closingImgSrc} alt={closingImgAlt} />

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
