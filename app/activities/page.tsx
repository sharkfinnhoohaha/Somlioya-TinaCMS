import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ActivityCard from "@/components/ActivityCard";

export default function ActivitiesPage() {
  return (
    <>
      <Nav />

      <PageHero
        src="/images/IMG_4928.jpeg"
        alt="Mountain panorama at sunset with hikers"
        title="Activities"
        subtitle="There is always something to do. And always space to do nothing at all."
      />

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        <div className="divider mb-8" />
        <p className="font-sans text-smoke font-light leading-[1.85]">
          Life on Sømliøya happens mostly outside.
        </p>
        <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
          The island and the surrounding fjord offer space for simple things:
          exploring the landscape, spending time by the water or gathering
          around a fire.
        </p>
      </Reveal>

      {/* ═══════ ON THE WATER ═══════ */}
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-[6vw] pb-16">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-6">
          On the Water
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ActivityCard
            src="/images/IMG_4762.jpeg"
            alt="View across the fjord with a small boat"
            title="Kayaking"
            description="The fjord is calm and sheltered in many places, making it possible to explore the coast and quiet bays by kayak."
          />
          <ActivityCard
            src="/images/IMG_1476.jpeg"
            alt="Fishing rods against the fjord with mountain backdrop"
            title="Fishing"
            description="Fishing has always been part of life along the fjord. Cod, pollock and mackerel are common in these waters."
          />
          <ActivityCard
            src="/images/IMG_2192.jpeg"
            alt="Person fishing from rocks in Norwegian sweater"
            title="Swimming"
            description="The sea is cold and clear. You can jump from the rocks and warm up afterwards by the fire or in the house."
          />
        </div>
      </Reveal>

      {/* ═══════ ON LAND ═══════ */}
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-[6vw] pb-16">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-6">
          On Land
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ActivityCard
            src="/images/IMG_1432.jpeg"
            alt="Two hikers at mountain summit at sunset"
            title="Walking & Hiking"
            description="The island and nearby areas offer simple coastal walks across rocks, forest paths and open shoreline."
          />
          <ActivityCard
            src="/images/IMG_1460.jpeg"
            alt="Silhouette of hiker against dramatic orange sunset"
            title="Heilhornet"
            description="One of the most distinctive peaks in the region. A day trip to the summit offers wide views across fjords, islands and the open Norwegian Sea."
          />
          <ActivityCard
            src="/images/IMG_1496.jpeg"
            alt="Hikers on rocky mountain summit ridge"
            title="Wildlife Watching"
            description="Sea eagles are often seen above the fjord, and roe deer and moose move through nearby forests."
          />
        </div>
      </Reveal>

      {/* ═══════ EXPLORING THE REGION ═══════ */}
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">
          Exploring the Region
        </h3>
        <div className="divider mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mt-8">
          <div>
            <h4 className="font-heading text-fjord text-xl font-medium mb-3">
              Island of Leka
            </h4>
            <p className="font-sans text-smoke font-light leading-[1.85]">
              About half an hour lies Leka, known for its unusual red and golden
              rock formations and open coastal landscapes. The island is part of
              the Leka Ophiolite Complex, one of the few places in the world
              where parts of the Earth&apos;s oceanic crust are visible above
              the surface.
            </p>
            <h4 className="font-heading text-fjord text-xl font-medium mb-3 mt-8">
              Coastal Villages
            </h4>
            <p className="font-sans text-smoke font-light leading-[1.85]">
              Small communities such as Gravvik and Rørvik reflect the
              traditional coastal life of this region, shaped for centuries by
              fishing and the sea.
            </p>
          </div>
          <div className="relative h-[500px]">
            <Image
              src="/images/IMG_1467.jpeg"
              alt="Two people at summit cairn overlooking fjords at sunset"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              quality={80}
            />
          </div>
        </div>
      </Reveal>

      {/* ═══════ AROUND THE FIRE ═══════ */}
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-[6vw] py-12">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">
          Around the Fire
        </h3>
        <div className="divider mb-6" />
        <p className="font-sans text-smoke font-light leading-[1.85] max-w-2xl">
          A fire by the shoreline is a natural gathering place in the evening.
          Fish from the fjord or simple meals prepared together in the house or
          outside. Evenings are often quiet, sometimes with music, sometimes
          just with the sound of the sea.
        </p>
      </Reveal>

      <Reveal>
        <div className="relative w-full h-[60vh] min-h-[400px]">
          <Image
            src="/images/IMG_5214.jpeg"
            alt="Group of people dining at outdoor table by the fjord"
            fill
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
        </div>
      </Reveal>

      <Footer />
    </>
  );
}
