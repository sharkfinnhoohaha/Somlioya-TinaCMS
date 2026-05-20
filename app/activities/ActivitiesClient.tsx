"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import AnimatedDivider from "@/components/AnimatedDivider";
import SectionHeading from "@/components/SectionHeading";
import ActivityCard from "@/components/ActivityCard";
import RegionMap from "@/components/RegionMap";
import FullBleedImage from "@/components/FullBleedImage";
import CtaBand from "@/components/CtaBand";
import { useTina } from "tinacms/dist/react";

export default function ActivitiesClient(props: {
  data: any;
  query: string;
  variables: object;
}) {
  const { data } = useTina(props);
  const page = data.activitiesPage;

  const heroSrc = page?.hero?.image ?? "/images/IMG_4928.jpeg";
  const heroAlt = page?.hero?.imageAlt ?? "Mountain panorama at sunset with hikers";
  const heroPoster = page?.hero?.posterImage ?? "/images/IMG_4928.jpeg";

  const intro = page?.intro ?? null;
  const waterItems = page?.waterSection?.items ?? [];
  const landItems = page?.landSection?.items ?? [];
  const regionHeading = page?.regionSection?.heading ?? "Exploring the Region";
  const regionPlaces = page?.regionSection?.places ?? [];
  const fireHeading = page?.fireSection?.heading ?? "Around the Fire";
  const fireText = page?.fireSection?.text ?? null;
  const fireImgSrc = page?.fireSection?.closingImage ?? "/images/IMG_5214.jpeg";
  const fireImgAlt =
    page?.fireSection?.closingImageAlt ??
    "Group of people dining at outdoor table by the fjord";

  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHero
          src={heroSrc}
          alt={heroAlt}
          poster={heroPoster}
          title={page?.hero?.title ?? "Activities"}
          subtitle={
            page?.hero?.subtitle ??
            "There is always something to do. And always space to do nothing at all."
          }
        />

        <Section width="prose">
          <Reveal>
            <AnimatedDivider className="mb-8" />
            <RichText value={intro} />
          </Reveal>
        </Section>

        {/* On the Water */}
        <Section width="wide" padding="compact">
          <Reveal>
            <SectionHeading as="h2">
              {page?.waterSection?.heading ?? "On the Water"}
            </SectionHeading>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {waterItems.map((item: any, i: number) => (
              <Reveal key={i} delay={i * 0.1}>
                <ActivityCard
                  src={item.image ?? item.src}
                  alt={item.imageAlt ?? item.alt}
                  title={item.title}
                  description={item.description}
                />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* On Land */}
        <Section width="wide" padding="compact">
          <Reveal>
            <SectionHeading as="h2">
              {page?.landSection?.heading ?? "On Land"}
            </SectionHeading>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {landItems.map((item: any, i: number) => (
              <Reveal key={i} delay={i * 0.1}>
                <ActivityCard
                  src={item.image ?? item.src}
                  alt={item.imageAlt ?? item.alt}
                  title={item.title}
                  description={item.description}
                />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Exploring the Region */}
        <Section width="wide">
          <Reveal>
            <SectionHeading as="h2">{regionHeading}</SectionHeading>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mt-8">
            <Reveal direction="left">
              {regionPlaces.map((place: any, i: number) => (
                <div key={i} className={i > 0 ? "mt-8" : ""}>
                  <h3 className="font-heading text-h3 font-normal text-fjord mb-3">
                    {place.name}
                  </h3>
                  <RichText value={place.description} />
                </div>
              ))}
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <RegionMap places={regionPlaces} apiKey={mapsApiKey} />
            </Reveal>
          </div>
        </Section>

        {/* Around the Fire */}
        <Section width="wide" padding="compact">
          <Reveal>
            <SectionHeading as="h2">{fireHeading}</SectionHeading>
            <div className="mt-6 max-w-2xl">
              <RichText value={fireText} />
            </div>
          </Reveal>
        </Section>

        <FullBleedImage src={fireImgSrc} alt={fireImgAlt} />

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
