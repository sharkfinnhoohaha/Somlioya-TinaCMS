import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import ScrollCue from "@/components/ScrollCue";

export default function HomePage() {
  return (
    <div style={{ background: "#111111" }}>
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/60" />
        {/* Blend hero into dark page */}
        <div
          className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, #111111 0%, transparent 100%)" }}
        />

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <h1
            className="font-heading text-white font-light tracking-[0.08em] leading-tight opacity-0 animate-fade-up"
            style={{
              fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
              animationDelay: "0.3s",
            }}
          >
            Sømliøya
          </h1>
          <p
            className="font-heading text-white/80 italic font-light tracking-wide mt-3 mb-12 opacity-0 animate-fade-up"
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
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
              className="text-[0.8rem] font-sans font-medium tracking-[0.25em] uppercase px-10 py-4 bg-white text-charcoal hover:bg-gold hover:text-white hover:-translate-y-0.5 hover:shadow-xl transition-all duration-500"
            >
              Explore
            </Link>
            <Link
              href="/contact"
              className="text-[0.8rem] font-sans font-medium tracking-[0.25em] uppercase px-10 py-4 bg-transparent text-white border border-white/50 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-500"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <ScrollCue />
      </section>

      {/* ═══════ POETIC INTRO — overlaid on image ═══════ */}
      <ParallaxImage
        src="/images/IMG_9794.jpeg"
        alt="Mirror-still fjord at sunset with mountains"
        height="min-h-[90vh]"
        fadeTop
        fadeBottom
        overlay
        quality={85}
      >
        <div className="max-w-2xl w-full mx-auto">
          <Reveal>
            <div className="divider mb-10" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-white/85 font-light leading-[1.9] text-xl md:text-2xl">
              Water that constantly changes colour. Skies that shift slowly, from
              grey, gold, blue, sometimes pink.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-6">
            <p className="font-sans text-white/85 font-light leading-[1.9] text-xl md:text-2xl">
              The weather moves quickly, the wind comes and goes.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-6">
            <p className="font-sans text-white/85 font-light leading-[1.9] text-xl md:text-2xl">
              The island is small. Simple. Private.
            </p>
          </Reveal>
          <Reveal delay={0.4} className="mt-6">
            <p className="font-sans text-white/85 font-light leading-[1.9] text-xl md:text-2xl">
              No roads, no traffic, only water and rocks. Birds, trees and space.
            </p>
          </Reveal>
        </div>
      </ParallaxImage>

      {/* ═══════ SECOND TEXT + MAP CTA — overlaid on closing image ═══════ */}
      <ParallaxImage
        src="/images/14cbdfe1c283435fb747c96413ad655d.jpg"
        alt="Dramatic orange and pink sunset over the Norwegian fjord"
        height="min-h-[120vh]"
        fadeTop
        fadeBottom
        overlay
        quality={85}
      >
        <div className="max-w-2xl w-full mx-auto text-center">
          <Reveal>
            <p className="font-sans text-white/85 font-light leading-[1.9] text-xl md:text-2xl">
              You come here to be. To write. To think.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <p className="font-sans text-white/85 font-light leading-[1.9] text-xl md:text-2xl">
              Some come to celebrate something. Others come to say goodbye.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-6">
            <p className="font-sans text-white/85 font-light leading-[1.9] text-xl md:text-2xl">
              Fires are lit by the edge of the water, fish are caught and eaten,
              kayaks glide through the fjord.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <div className="divider mx-auto mb-8" />
            <p className="font-heading text-gold italic text-2xl md:text-3xl font-light">
              It is a place where you can step outside the world for a while.
            </p>
          </Reveal>

          {/* 3D Map CTA */}
          <Reveal delay={0.4} className="mt-20">
            <p className="font-sans text-white/40 text-[0.7rem] uppercase tracking-[0.35em] mb-4">
              65°03′N · 11°55′E
            </p>
            <h2 className="font-heading text-white font-light tracking-wide text-3xl md:text-4xl mb-5">
              See the island from above
            </h2>
            <p className="font-sans text-white/65 font-light leading-relaxed text-lg mb-8 max-w-md mx-auto">
              An interactive 3D model of Sømliøya rendered in real time from
              satellite data. Fly over the fjords, explore the coastline.
            </p>
            <Link
              href="/map"
              className="inline-block text-[0.8rem] font-sans font-medium tracking-[0.25em] uppercase px-10 py-4 bg-white/10 border border-white/40 text-white hover:bg-gold hover:border-gold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-500"
            >
              Open 3D Map
            </Link>
          </Reveal>
        </div>
      </ParallaxImage>

      <Footer />
    </div>
  );
}
