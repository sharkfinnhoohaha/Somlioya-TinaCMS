"use client";
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
import CtaBand from "@/components/CtaBand";
import { useTina } from "tinacms/dist/react";

export default function RitualsClient(props: {
  data: any;
  query: string;
  variables: object;
}) {
  const { data } = useTina(props);
  const page = data.ritualsPage;

  const heroSrc = page?.hero?.image ?? "/images/IMG_5345.jpeg";
  const heroAlt =
    page?.hero?.imageAlt ??
    "Decorated fabric banners hanging from birch trees with set table behind";
  const heroPoster = page?.hero?.posterImage ?? "/images/IMG_5345.jpeg";

  const intro = page?.intro ?? null;
  const midImgSrc = page?.midImage?.src ?? "/images/IMG_5352.jpeg";
  const midImgAlt =
    page?.midImage?.alt ??
    "Community gathering at table under decorated fabric banners";
  const secondParagraphs = page?.secondParagraphs ?? null;
  const shaped = page?.shapedTogetherSection ?? { heading: "Shaped Together", paragraphs: null };
  const gatherings = page?.gatheringsSection ?? {
    heading: "Other Gatherings",
    paragraphs: null,
    pullQuote: null,
  };

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHero
          src={heroSrc}
          alt={heroAlt}
          poster={heroPoster}
          title={page?.hero?.title ?? "Rituals"}
          subtitle={page?.hero?.subtitle ?? "Some moments in life ask for a place."}
        />

        <Section width="prose">
          <Reveal>
            <AnimatedDivider className="mb-8" />
            <RichText value={intro} />
          </Reveal>
        </Section>

        <FullBleedImage src={midImgSrc} alt={midImgAlt} />

        <Section width="prose">
          <Reveal>
            <RichText value={secondParagraphs} />
          </Reveal>
        </Section>

        <FeatureRow
          heading={shaped.heading}
          body={shaped.paragraphs}
          image={shaped.image ?? "/images/IMG_9780.jpeg"}
          imageAlt={shaped.imageAlt ?? "Artist painting at an easel among birch trees"}
          reverse
        />

        <Section width="prose">
          <Reveal>
            <SectionHeading as="h2">{gatherings.heading}</SectionHeading>
            <div className="mt-6">
              <RichText value={gatherings.paragraphs} />
            </div>
            {gatherings.pullQuote && (
              <>
                <AnimatedDivider className="my-8" />
                <p className="font-heading text-fjord italic text-lead font-light">
                  {gatherings.pullQuote}
                </p>
              </>
            )}
          </Reveal>
        </Section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
