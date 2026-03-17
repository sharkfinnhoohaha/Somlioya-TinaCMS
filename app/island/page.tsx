import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export default function IslandPage() {
  return (
    <>
      <Nav />

      <PageHero
        src="/images/IMG_5184.jpeg"
        alt="Aerial view of the island in summer with mountains behind"
        title="About the Island"
        subtitle="Nærøysund municipality, Trøndelag"
      />

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        <div className="divider mb-8" />
        <p className="font-sans text-smoke font-light leading-[1.85]">
          Sømliøya lies in Nærøysund municipality in Trøndelag. The island sits
          in Årsetfjorden, part of the fjord landscape that shapes this stretch
          of the Norwegian coast.
        </p>
        <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
          The land here was formed during the last Ice Age. The shoreline is
          irregular, and the sea moves quietly between skerries and narrow
          inlets.
        </p>
      </Reveal>

      {/* ═══════ CLIMATE ═══════ */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <div>
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">
            Climate
          </h3>
          <div className="divider mb-6" />
          <p className="font-sans text-smoke font-light leading-[1.85]">
            Life here follows the rhythm of the northern seasons.
          </p>
          <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
            In summer the light hardly disappears. Around the solstice the sky
            remains pale through the night and the fjord reflects the soft
            northern light twenty-four hours a day.
          </p>
          <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
            Winter is quieter and darker. Storms pass through the fjord, the sea
            turns steel grey, and clear nights fill the sky with stars and
            northern lights.
          </p>
        </div>
        <div className="relative h-[500px]">
          <Image
            src="/images/dji_fly_20251123_133742_0223_1763901492851_photo.jpg"
            alt="The island buildings in golden winter light"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            quality={80}
          />
        </div>
      </Reveal>

      {/* ═══════ MOUNTAINS ═══════ */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <div className="relative h-[500px] md:order-1">
          <Image
            src="/images/IMG_2336.jpeg"
            alt="Heilhornet and mountain peaks across the fjord in winter"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            quality={80}
          />
        </div>
        <div className="md:order-0">
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">
            Mountains and Views
          </h3>
          <div className="divider mb-6" />
          <p className="font-sans text-smoke font-light leading-[1.85]">
            Across the fjord rise the mountains of the Nordland coast. The
            distinctive peak of Heilhornet, together with Breivasstinden and
            Hestmannen. Their steep silhouettes form a familiar horizon above
            the sea.
          </p>
        </div>
      </Reveal>

      {/* ═══════ WILDLIFE ═══════ */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16 pb-24">
        <div>
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">
            Wildlife
          </h3>
          <div className="divider mb-6" />
          <p className="font-sans text-smoke font-light leading-[1.85]">
            Wildlife is part of the landscape. Moose and roe deer move through
            nearby forests, while majestic sea eagles circle above the fjord.
            Along the shore seabirds gather, and the waters hold fish typical for
            the Norwegian coast.
          </p>
        </div>
        <div className="relative h-[500px]">
          <Image
            src="/images/IMG_1440.jpeg"
            alt="Reindeer silhouetted against the northern sky on rocks"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            quality={80}
          />
        </div>
      </Reveal>

      <Footer />
    </>
  );
}
