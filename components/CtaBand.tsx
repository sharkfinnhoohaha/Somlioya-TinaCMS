import Button from "./Button";
import AnimatedDivider from "./AnimatedDivider";
import Reveal from "./Reveal";

/**
 * Conversion band placed before the footer on every content page, so each
 * page funnels toward an enquiry instead of dead-ending at the footer.
 */
export default function CtaBand({
  heading = "Plan your time on the island",
  text = "Sømliøya is for rent for a day, a weekend or a week. Tell us what you have in mind and we will help shape it.",
}: {
  heading?: string;
  text?: string;
}) {
  return (
    <section className="bg-bone">
      <Reveal className="max-w-2xl mx-auto px-6 py-20 md:py-28 text-center">
        <AnimatedDivider className="mx-auto mb-8" />
        <h2 className="font-heading text-h2 font-normal text-fjord-deep mb-4 text-balance">
          {heading}
        </h2>
        <p className="font-sans text-body text-smoke mb-9 max-w-md mx-auto">
          {text}
        </p>
        <Button href="/contact" variant="primary">
          Make an enquiry
        </Button>
      </Reveal>
    </section>
  );
}
