"use client";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ActivityCard from "@/components/ActivityCard";
import RichText from "@/components/RichText";
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

  const intro = page?.intro ?? null;

  const waterItems = page?.waterSection?.items ?? [];
  const landItems = page?.landSection?.items ?? [];

  const regionHeading = page?.regionSection?.heading ?? "Exploring the Region";
  const regionPlaces = page?.regionSection?.places ?? [];
  const regionImgSrc = page?.regionSection?.image ?? "/images/IMG_1467.jpeg";
  const regionImgAlt = page?.regionSection?.imageAlt ?? "Two people at summit cairn overlooking fjords at sunset";

  const fireHeading = page?.fireSection?.heading ?? "Around the Fire";
  const fireText = page?.fireSection?.text ?? null;
  const fireImgSrc = page?.fireSection?.closingImage ?? "/images/IMG_5214.jpeg";
  const fireImgAlt = page?.fireSection?.closingImageAlt ?? "Group of people dining at outdoor table by the fjord";

  return (
    <>
      <Nav />
      <PageHero
        src={heroSrc}
        alt={heroAlt}
        title={page?.hero?.title ?? "Activities"}
        subtitle={page?.hero?.subtitle ?? "There is always something to do. And always space to do nothing at all."}
      />

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        <div className="divider mb-8" />
        <RichText value={intro} />
      </Reveal>

      {/* On the Water */}
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-[6vw] pb-16">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-6">{page?.waterSection?.heading ?? "On the Water"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {waterItems.map((item: any, i: number) => (
            <ActivityCard
              key={i}
              src={item.image ?? item.src}
              alt={item.imageAlt ?? item.alt}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Reveal>

      {/* On Land */}
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-[6vw] pb-16">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-6">{page?.landSection?.heading ?? "On Land"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {landItems.map((item: any, i: number) => (
            <ActivityCard
              key={i}
              src={item.image ?? item.src}
              alt={item.imageAlt ?? item.alt}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Reveal>

      {/* Exploring the Region */}
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">{regionHeading}</h3>
        <div className="divider mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mt-8">
          <div>
            {regionPlaces.map((place: any, i: number) => (
              <div key={i} className={i > 0 ? "mt-8" : ""}>
                <h4 className="font-heading text-fjord text-xl font-medium mb-3">{place.name}</h4>
                <RichText value={place.description} />
              </div>
            ))}
          </div>
          <div className="relative h-[500px]">
            <Image src={regionImgSrc} alt={regionImgAlt} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" quality={80} />
          </div>
        </div>
      </Reveal>

      {/* Around the Fire */}
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-[6vw] py-12">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">{fireHeading}</h3>
        <div className="divider mb-6" />
        <RichText value={fireText} className="max-w-2xl" />
      </Reveal>

      <Reveal>
        <div className="relative w-full h-[60vh] min-h-[400px]">
          <Image src={fireImgSrc} alt={fireImgAlt} fill className="object-cover" sizes="100vw" quality={85} />
        </div>
      </Reveal>

      <Footer />
    </>
  );
}
