import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import ScrollCue from "@/components/ScrollCue";

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* ═══════ HERO / LANDING ═══════ */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 animate-slow-zoom">
          <Image
            src="/images/352DA88B4DA84CDEBDF5A7A07AB23C3F.jpg"
            alt="Aerial view of Sømliøya in winter light"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/40 to-black/55" />
        {/* Gentle fade from hero into page */}
        <div
          className="absolute inset-x-0 bottom-0 h-52 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, #FAFAF8 0%, transparent 100%)" }}
        />

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <h1
            className="font-heading text-white font-light tracking-[0.08em] leading-tight opacity-0 animate-fade-up"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              animationDelay: "0.3s",
            }}
          >
            Sømliøya
          </h1>
          <p
            className="font-heading text-white/80 italic font-light tracking-wide mt-2 mb-10 opacity-0 animate-fade-up"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              animationDelay: "0.6s",
            }}
          >
            Where the world becomes quieter
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.9s" }}
          >
            <Link
              href="/island"
              className="text-[0.72rem] font-sans font-medium tracking-[0.25em] uppercase px-10 py-4 bg-white text-charcoal hover:bg-gold hover:text-white hover:-translate-y-0.5 hover:shadow-xl transition-all duration-500"
            >
              Explore
            </Link>
            <Link
              href="/contact"
              className="text-[0.72rem] font-sans font-medium tracking-[0.25em] uppercase px-10 py-4 bg-transparent text-white border border-white/50 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-500"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <ScrollCue />
      </section>

      {/* ═══════ POETIC INTRO ═══════ */}
      <div className="max-w-2xl mx-auto px-6 py-24 md:py-36">
        <Reveal>
          <div className="divider mb-8" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-sans text-smoke font-light leading-[1.85] text-base">
            Water that constantly changes colour. Skies that shift slowly, from
            grey, gold, blue, sometimes pink.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-5">
          <p className="font-sans text-smoke font-light leading-[1.85] text-base">
            The weather moves quickly, the wind comes and goes.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-5">
          <p className="font-sans text-smoke font-light leading-[1.85] text-base">
            The island is small. Simple. Private.
          </p>
        </Reveal>
        <Reveal delay={0.4} className="mt-5">
          <p className="font-sans text-smoke font-light leading-[1.85] text-base">
            No roads, no traffic, only water and rocks. Birds, trees and space.
          </p>
        </Reveal>
      </div>

      {/* ═══════ FULL-BLEED IMAGE ═══════ */}
      <ParallaxImage
        src="/images/IMG_9794.jpeg"
        alt="Mirror-still fjord at sunset with mountains"
        height="h-[65vh] min-h-[450px]"
        fadeTop
        fadeBottom
        quality={85}
      />

      {/* ═══════ SECOND TEXT BLOCK ═══════ */}
      <div className="max-w-2xl mx-auto px-6 py-24 md:py-36">
        <Reveal>
          <p className="font-sans text-smoke font-light leading-[1.85] text-base">
            You come here to be. To write. To think.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-5">
          <p className="font-sans text-smoke font-light leading-[1.85] text-base">
            Some come to celebrate something. Others come to say goodbye.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-5">
          <p className="font-sans text-smoke font-light leading-[1.85] text-base">
            Fires are lit by the edge of the water, fish are caught and eaten,
            kayaks glide through the fjord.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-8">
          <div className="divider mb-8" />
          <p className="font-heading text-fjord italic text-lg font-light">
            It is a place where you can step outside the world for a while.
          </p>
        </Reveal>
      </div>

      {/* ═══════ 3D MAP CTA ═══════ */}
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24 text-center">
        <Reveal>
          <div className="divider mb-10" />
          <p className="font-heading text-smoke/50 text-[0.65rem] uppercase tracking-[0.35em] mb-4">
            65°03′N · 11°55′E
          </p>
          <h2 className="font-heading text-charcoal font-light tracking-wide text-2xl md:text-3xl mb-4">
            See the island from above
          </h2>
          <p className="font-sans text-smoke font-light leading-relaxed text-sm mb-8 max-w-md mx-auto">
            An interactive 3D model of Sømliøya rendered in real time from satellite data. Fly over the fjords, explore the coastline.
          </p>
          <Link
            href="/map"
            className="inline-block text-[0.72rem] font-sans font-medium tracking-[0.25em] uppercase px-10 py-4 bg-charcoal text-white hover:bg-gold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-500"
          >
            Open 3D Map
          </Link>
          <div className="divider mt-10" />
        </Reveal>
      </div>

      {/* ═══════ CLOSING IMAGE ═══════ */}
      <ParallaxImage
        src="/images/14cbdfe1c283435fb747c96413ad655d.jpg"
        alt="Dramatic orange and pink sunset over the Norwegian fjord"
        height="h-[65vh] min-h-[450px]"
        fadeTop
        fadeBottom
        quality={85}
      />

      <Footer />
    </>
  );
}
