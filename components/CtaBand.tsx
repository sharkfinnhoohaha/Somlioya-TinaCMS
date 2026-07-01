"use client";

import Button from "./Button";
import AnimatedDivider from "./AnimatedDivider";
import Reveal from "./Reveal";
import { useLocale, localeHref, type Locale } from "@/hooks/useLocale";

const COPY: Record<Locale, { heading: string; text: string; cta: string }> = {
  en: {
    heading: "Plan your time on the island",
    text: "Sømliøya is for rent for a day, a weekend or a week. Tell us what you have in mind and we will help shape it.",
    cta: "Make an enquiry",
  },
  no: {
    heading: "Planlegg tiden din på øya",
    text: "Sømliøya leies ut for en dag, en helg eller en uke. Fortell oss hva du har i tankene, så hjelper vi deg å forme det.",
    cta: "Send en forespørsel",
  },
};

/**
 * Conversion band placed before the footer on every content page, so each
 * page funnels toward an enquiry instead of dead-ending at the footer.
 */
export default function CtaBand({
  heading,
  text,
}: {
  heading?: string;
  text?: string;
}) {
  const locale = useLocale();
  const t = COPY[locale];

  return (
    <section className="bg-bone">
      <Reveal className="max-w-2xl mx-auto px-6 py-20 md:py-28 text-center">
        <AnimatedDivider className="mx-auto mb-8" />
        <h2 className="font-heading text-h2 font-normal text-fjord-deep mb-4 text-balance">
          {heading ?? t.heading}
        </h2>
        <p className="font-sans text-body text-smoke mb-9 max-w-md mx-auto">
          {text ?? t.text}
        </p>
        <Button href={localeHref(locale, "/contact")} variant="primary">
          {t.cta}
        </Button>
      </Reveal>
    </section>
  );
}
