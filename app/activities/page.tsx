import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ActivityCard from "@/components/ActivityCard";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { ACTIVITIES_PAGE_QUERY } from "@/sanity/lib/queries";
import RichText from "@/components/RichText";

function imgSrc(sanityImg: any, fallback: string, width = 1200): string {
  if (sanityImg?.asset?._id) return urlFor(sanityImg).width(width).url();
  return fallback;
}

const DEFAULT_WATER = [
  { _key: "k1", image: null, alt: "View across the fjord with a small boat", title: "Kayaking", description: "The fjord is calm and sheltered in many places, making it possible to explore the coast and quiet bays by kayak.", src: "/images/IMG_4762.jpeg" },
  { _key: "k2", image: null, alt: "Fishing rods against the fjord with mountain backdrop", title: "Fishing", description: "Fishing has always been part of life along the fjord. Cod, pollock and mackerel are common in these waters.", src: "/images/IMG_1476.jpeg" },
  { _key: "k3", image: null, alt: "Person fishing from rocks in Norwegian sweater", title: "Swimming", description: "The sea is cold and clear. You can jump from the rocks and warm up afterwards by the fire or in the house.", src: "/images/IMG_2192.jpeg" },
];

const DEFAULT_LAND = [
  { _key: "l1", image: null, alt: "Two hikers at mountain summit at sunset", title: "Walking & Hiking", description: "The island and nearby areas offer simple coastal walks across rocks, forest paths and open shoreline.", src: "/images/IMG_1432.jpeg" },
  { _key: "l2", image: null, alt: "Silhouette of hiker against dramatic orange sunset", title: "Heilhornet", description: "One of the most distinctive peaks in the region. A day trip to the summit offers wide views across fjords, islands and the open Norwegian Sea.", src: "/images/IMG_1460.jpeg" },
  { _key: "l3", image: null, alt: "Hikers on rocky mountain summit ridge", title: "Wildlife Watching", description: "Sea eagles are often seen above the fjord, and roe deer and moose move through nearby forests.", src: "/images/IMG_1496.jpeg" },
];

export default async function ActivitiesPage() {
  const { data } = await sanityFetch({ query: ACTIVITIES_PAGE_QUERY }).catch(() => ({ data: null }));

  const heroSrc = imgSrc(data?.hero?.image, "/images/IMG_4928.jpeg");
  const heroAlt = data?.hero?.image?.alt ?? "Mountain panorama at sunset with hikers";

  const intro = data?.intro ?? null;

  const waterItems = data?.waterSection?.items ?? DEFAULT_WATER;
  const landItems = data?.landSection?.items ?? DEFAULT_LAND;

  const regionHeading = data?.regionSection?.heading ?? "Exploring the Region";
  const regionPlaces = data?.regionSection?.places ?? [
    { _key: "r1", name: "Island of Leka", description: "About half an hour lies Leka, known for its unusual red and golden rock formations and open coastal landscapes. The island is part of the Leka Ophiolite Complex, one of the few places in the world where parts of the Earth's oceanic crust are visible above the surface." },
    { _key: "r2", name: "Coastal Villages", description: "Small communities such as Gravvik and Rørvik reflect the traditional coastal life of this region, shaped for centuries by fishing and the sea." },
  ];
  const regionImgSrc = imgSrc(data?.regionSection?.image, "/images/IMG_1467.jpeg");
  const regionImgAlt = data?.regionSection?.image?.alt ?? "Two people at summit cairn overlooking fjords at sunset";

  const fireHeading = data?.fireSection?.heading ?? "Around the Fire";
  const fireText = data?.fireSection?.text ?? null;
  const fireImgSrc = imgSrc(data?.fireSection?.closingImage, "/images/IMG_5214.jpeg");
  const fireImgAlt = data?.fireSection?.closingImage?.alt ?? "Group of people dining at outdoor table by the fjord";

  return (
    <>
      <Nav />
      <PageHero
        src={heroSrc}
        alt={heroAlt}
        title={data?.hero?.title ?? "Activities"}
        subtitle={data?.hero?.subtitle ?? "There is always something to do. And always space to do nothing at all."}
      />

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        <div className="divider mb-8" />
        <RichText value={intro} />
      </Reveal>

      {/* On the Water */}
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-[6vw] pb-16">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-6">{data?.waterSection?.heading ?? "On the Water"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {waterItems.map((item: any) => (
            <ActivityCard
              key={item._key}
              src={item.image?.asset?._id ? urlFor(item.image).width(800).url() : item.src}
              alt={item.image?.alt ?? item.alt}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Reveal>

      {/* On Land */}
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-[6vw] pb-16">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-6">{data?.landSection?.heading ?? "On Land"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {landItems.map((item: any) => (
            <ActivityCard
              key={item._key}
              src={item.image?.asset?._id ? urlFor(item.image).width(800).url() : item.src}
              alt={item.image?.alt ?? item.alt}
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
              <div key={place._key} className={i > 0 ? "mt-8" : ""}>
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
