import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export default function RitualsPage() {
  return (
    <>
      <Nav />

      <PageHero
        src="/images/IMG_5345.jpeg"
        alt="Decorated fabric banners hanging from birch trees with set table behind"
        title="Rituals"
        subtitle="Some moments in life ask for a place."
      />

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        <div className="divider mb-8" />
        <p className="font-sans text-smoke font-light leading-[1.85]">
          A place to pause, to reflect, and to mark something that matters.
        </p>
        <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
          On Sømliøya we create space for personal rituals — simple, meaningful
          moments connected to the landscape and the sea.
        </p>
        <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
          Across cultures and throughout history, people have created rituals to
          give shape to important moments in life. Birth, loss, transitions,
          promises, endings and beginnings. Rituals help us slow down, step
          outside daily life and acknowledge what has changed.
        </p>
      </Reveal>

      <Reveal>
        <div className="relative w-full h-[60vh] min-h-[400px]">
          <Image
            src="/images/IMG_5352.jpeg"
            alt="Community gathering at table under decorated fabric banners"
            fill
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
        </div>
      </Reveal>

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        <p className="font-sans text-smoke font-light leading-[1.85]">
          The island offers a quiet setting for these moments. Open, natural and
          removed from the noise of the world.
        </p>
        <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
          People come here for many different reasons. To say goodbye to someone
          they loved. To scatter the ashes of a person or a beloved animal. To
          celebrate a new beginning. To mark a turning point in life. To gather
          family or friends around a shared memory.
        </p>
        <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
          Some simply want a place to pause and acknowledge something important.
        </p>
      </Reveal>

      {/* ═══════ SHAPED TOGETHER ═══════ */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <div>
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">
            Shaped Together
          </h3>
          <div className="divider mb-6" />
          <p className="font-sans text-smoke font-light leading-[1.85]">
            If you wish, we can help shape a ritual that fits you and the
            moment.
          </p>
          <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
            The rituals on Sømliøya are created together with{" "}
            <strong className="font-medium text-charcoal">
              Marijke Ottema
            </strong>
            , a psychologist, and{" "}
            <strong className="font-medium text-charcoal">Maria Groot</strong>,
            an artist. Together we combine psychological insight with creative
            and symbolic elements to design something personal and meaningful.
          </p>
          <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
            Some rituals are very simple: a walk across the island, a fire by
            the water, a few words spoken at the edge of the fjord. Others may
            include music, writing, symbolic gestures, or time spent in silence.
          </p>
          <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
            Each ritual is different and always shaped in conversation with the
            people involved.
          </p>
        </div>
        <div className="relative h-[500px]">
          <Image
            src="/images/IMG_9780.jpeg"
            alt="Artist painting at an easel among birch trees"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            quality={80}
          />
        </div>
      </Reveal>

      {/* ═══════ OTHER GATHERINGS ═══════ */}
      <div className="bg-bone">
        <Reveal className="max-w-2xl mx-auto px-6 py-20">
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">
            Other Gatherings
          </h3>
          <div className="divider mb-6" />
          <p className="font-sans text-smoke font-light leading-[1.85]">
            The island can also be used for other meaningful gatherings — small
            family celebrations, remembering someone together, marking an
            anniversary or transition, trying out an idea or ceremony, or
            creative and reflective gatherings with friends.
          </p>
          <p className="font-sans text-smoke font-light leading-[1.85] mt-5">
            The landscape often becomes part of the experience.
          </p>
          <div className="divider my-8" />
          <p className="font-heading text-fjord italic text-lg font-light">
            Sømliøya does not prescribe how these moments should look. It just
            offers the space — and sometimes a little guidance in shaping
            something that feels right.
          </p>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
