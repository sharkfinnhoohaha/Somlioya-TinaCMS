"use client";

import Reveal from "./Reveal";
import AnimatedDivider from "./AnimatedDivider";
import { useLocale } from "@/hooks/useLocale";
import type { Testimonial } from "@/tina/lib/client";

/**
 * Guest quotes band. Renders nothing until quotes are added in the CMS, so
 * the section can ship dark and light up when real testimonials exist.
 */
export default function TestimonialBand({
  heading,
  items,
  instagramUrl,
}: {
  heading?: string;
  items?: Testimonial[];
  instagramUrl?: string;
}) {
  const locale = useLocale();
  const quotes = (items ?? []).filter((t) => t.quote?.trim());
  if (quotes.length === 0) return null;

  const defaultHeading = locale === "no" ? "Ord fra øya" : "Words from the island";
  const followLabel = locale === "no" ? "Følg øya på Instagram" : "Follow the island on Instagram";

  return (
    <section className="bg-ivory">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <Reveal>
          <p className="font-sans text-eyebrow uppercase tracking-[0.3em] text-smoke mb-4">
            {heading ?? defaultHeading}
          </p>
          <AnimatedDivider className="mx-auto mb-12" />
        </Reveal>
        <div className="grid gap-12 md:gap-14">
          {quotes.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <blockquote>
                <p className="font-heading text-h3 font-light italic text-fjord-deep text-balance">
                  “{t.quote}”
                </p>
                {t.attribution && (
                  <footer className="mt-4 font-sans text-caption uppercase tracking-[0.2em] text-smoke">
                    — {t.attribution}
                  </footer>
                )}
              </blockquote>
            </Reveal>
          ))}
        </div>
        {instagramUrl && (
          <Reveal delay={0.15} className="mt-14">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-caption uppercase tracking-[0.2em] text-fjord-deep underline underline-offset-4 decoration-gold/70 hover:decoration-gold transition-all"
            >
              {followLabel}
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
