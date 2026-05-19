"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import AnimatedDivider from "@/components/AnimatedDivider";
import FeatureRow from "@/components/FeatureRow";
import CtaBand from "@/components/CtaBand";
import { useTina } from "tinacms/dist/react";

export default function IslandClient(props: {
  data: any;
  query: string;
  variables: object;
}) {
  const { data } = useTina(props);
  const page = data.islandPage;

  const heroSrc = page?.hero?.image ?? "/images/IMG_5184.jpeg";
  const heroAlt =
    page?.hero?.imageAlt ??
    "Aerial view of the island in summer with mountains behind";
  const heroPoster = page?.hero?.posterImage ?? "/images/IMG_5184.jpeg";

  const intro = page?.intro ?? null;
  const climate = page?.climateSection ?? { heading: "Climate", paragraphs: null };
  const mountains = page?.mountainsSection ?? { heading: "Mountains and Views", paragraphs: null };
  const wildlife = page?.wildlifeSection ?? { heading: "Wildlife", paragraphs: null };

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHero
          src={heroSrc}
          alt={heroAlt}
          poster={heroPoster}
          title={page?.hero?.title ?? "About the Island"}
          subtitle={page?.hero?.subtitle ?? "Nærøysund municipality, Trøndelag"}
        />

        <Section width="prose">
          <Reveal>
            <AnimatedDivider className="mb-8" />
            <RichText value={intro} />
          </Reveal>
        </Section>

        <FeatureRow
          heading={climate.heading}
          body={climate.paragraphs}
          image={
            climate.image ??
            "/images/dji_fly_20251123_133742_0223_1763901492851_photo.jpg"
          }
          imageAlt={climate.imageAlt ?? "The island buildings in golden winter light"}
        />
        <FeatureRow
          heading={mountains.heading}
          body={mountains.paragraphs}
          image={mountains.image ?? "/images/IMG_2336.jpeg"}
          imageAlt={
            mountains.imageAlt ??
            "Heilhornet and mountain peaks across the fjord in winter"
          }
          reverse
        />
        <FeatureRow
          heading={wildlife.heading}
          body={wildlife.paragraphs}
          image={wildlife.image ?? "/images/IMG_1440.jpeg"}
          imageAlt={
            wildlife.imageAlt ??
            "Reindeer silhouetted against the northern sky on rocks"
          }
        />

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
