"use client";

import Image from "next/image";
import { useRef } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

const galleryImages = [
  { src: "/images/IMG_7429.jpeg", alt: "Gathering room with tables and sunflower paintings" },
  { src: "/images/IMG_7414.jpeg", alt: "Large dining room with wooden floors" },
  { src: "/images/IMG_7422.jpeg", alt: "Living room with fireplace and couches" },
  { src: "/images/IMG_1256.jpeg", alt: "People cooking together in the kitchen" },
  { src: "/images/IMG_5123.jpeg", alt: "Outdoor picnic tables with fjord view" },
  { src: "/images/IMG_6710.jpeg", alt: "Yellow house exterior with wooden deck" },
];

export default function StayingPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Nav />

      <PageHero
        src="/images/569F22A4217156A6F9DEF31BB8B2F7CC.JPG"
        alt="Aerial view of island buildings surrounded by forest and fjord"
        title="Sleeping & Living"
        subtitle="Intentionally simple, shared, and close to nature."
      />

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        <div className="divider mb-8" />
        <p className="font-sans text-smoke font-light leading-[1.85]">
          Life on Sømliøya is simple and shared.
        </p>
        <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
          There are two buildings on the island, offering space for sleeping,
          gathering and spending time together. The houses are modest and
          practical, designed for small groups who come to stay close to nature.
        </p>
      </Reveal>

      {/* ═══════ TWO BUILDINGS ═══════ */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        <div className="relative h-[45vh] min-h-[300px]">
          <Image
            src="/images/A4D4C1444081F165FD87951C3F619B8B.jpg"
            alt="Aerial view of both island buildings"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            quality={80}
          />
        </div>
        <div className="relative h-[45vh] min-h-[300px]">
          <Image
            src="/images/IMG_3215.jpeg"
            alt="Main house exterior with stairs and pine tree"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            quality={80}
          />
        </div>
      </Reveal>

      {/* ═══════ SLEEPING ═══════ */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <div>
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">
            Sleeping
          </h3>
          <div className="divider mb-6" />
          <p className="font-sans text-smoke font-light leading-[1.85]">
            The island has simple bedrooms spread across both buildings. Most
            rooms are small and quiet, intended mainly as a comfortable place to
            rest after a day outside.
          </p>
          <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
            For those who prefer sleeping closer to the landscape, there is of
            course also space to pitch a tent on the island.
          </p>
          <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
            Accommodation on Sømliøya is intentionally simple, in keeping with
            the character of the place.
          </p>
        </div>
        <div className="relative h-[500px]">
          <Image
            src="/images/IMG_3202.jpeg"
            alt="Main house with deck, garden and dog"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            quality={80}
          />
        </div>
      </Reveal>

      {/* ═══════ SHARED SPACES ═══════ */}
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-[6vw] py-10">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">
          Shared Spaces
        </h3>
        <div className="divider mb-6" />
        <p className="font-sans text-smoke font-light leading-[1.85] max-w-2xl">
          The main house contains a large shared kitchen and living room, where
          people cook, eat and spend the evenings together. A fireplace makes
          it a warm place to gather after time outside by the water.
        </p>
        <p className="font-sans text-smoke font-light leading-[1.85] max-w-2xl mt-5">
          Bathrooms are shared, with toilets and hot showers available.
        </p>
      </Reveal>

      {/* ═══════ HORIZONTAL SCROLL GALLERY ═══════ */}
      <Reveal>
        <div
          ref={scrollRef}
          className="overflow-x-auto hide-scrollbar whitespace-nowrap py-6 px-[6vw]"
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="inline-block relative h-[50vh] min-h-[350px] w-auto mr-4 last:mr-0"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={700}
                height={500}
                className="h-full w-auto object-cover"
                quality={75}
              />
            </div>
          ))}
        </div>
      </Reveal>

      {/* ═══════ GROUP SPACES ═══════ */}
      <Reveal className="max-w-2xl mx-auto px-6 py-16">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">
          Group Spaces
        </h3>
        <div className="divider mb-6" />
        <p className="font-sans text-smoke font-light leading-[1.85]">
          The second building on the island serves as a workshop and gathering
          space for groups, retreats and creative work. Some additional simple
          bedrooms are also located here.
        </p>
        <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
          In the basement of the main house, there is another room that can be
          used for meetings, workshops or quiet work.
        </p>
      </Reveal>

      <Reveal>
        <div className="relative w-full h-[60vh] min-h-[400px]">
          <Image
            src="/images/IMG_5184.jpeg"
            alt="Outdoor volleyball net surrounded by forest"
            fill
            className="object-cover"
            sizes="100vw"
            quality={80}
          />
        </div>
      </Reveal>

      <Footer />
    </>
  );
}
