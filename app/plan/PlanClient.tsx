"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import AnimatedDivider from "@/components/AnimatedDivider";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import { useTina } from "tinacms/dist/react";

export default function PlanClient(props: {
  data: any;
  query: string;
  variables: object;
}) {
  const { data } = useTina(props);
  const page = data.planPage;

  const heroSrc = page?.hero?.image ?? "/images/IMG_5123.jpeg";
  const heroAlt = page?.hero?.imageAlt ?? "Outdoor picnic tables with fjord view";
  const heroPoster = page?.hero?.posterImage ?? undefined;

  const steps = (page?.steps ?? []).filter((s: any) => s?.title);
  const practical = page?.practicalSection ?? {};
  const facts = (practical.facts ?? []).filter((f: any) => f?.label);
  const rates = page?.ratesSection ?? {};

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHero
          src={heroSrc}
          alt={heroAlt}
          poster={heroPoster}
          title={page?.hero?.title ?? "Plan Your Stay"}
          subtitle={page?.hero?.subtitle}
        />

        <Section width="prose">
          <Reveal>
            <AnimatedDivider className="mb-8" />
            <RichText value={page?.intro} />
          </Reveal>
        </Section>

        {steps.length > 0 && (
          <Section width="wide" padding="compact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 max-w-5xl mx-auto">
              {steps.map((step: any, i: number) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="font-heading text-h1 font-light text-gold/80 mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-heading text-h3 font-normal text-fjord-deep mb-3">
                    {step.title}
                  </h2>
                  <p className="font-sans text-body text-smoke">{step.description}</p>
                </Reveal>
              ))}
            </div>
          </Section>
        )}

        {(practical.heading || facts.length > 0) && (
          <Section width="wide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start max-w-5xl mx-auto">
              <Reveal direction="left">
                <SectionHeading as="h2">{practical.heading}</SectionHeading>
                <div className="mt-6">
                  <RichText value={practical.paragraphs} />
                </div>
              </Reveal>
              <Reveal direction="right" delay={0.1}>
                <dl className="grid gap-6 border-l-2 border-gold/50 pl-6">
                  {facts.map((fact: any, i: number) => (
                    <div key={i}>
                      <dt className="font-sans text-eyebrow uppercase tracking-[0.25em] text-smoke mb-1.5">
                        {fact.label}
                      </dt>
                      <dd className="font-sans text-body text-charcoal">{fact.detail}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </Section>
        )}

        {rates.heading && (
          <section className="bg-bone">
            <Section width="prose">
              <Reveal>
                <SectionHeading as="h2">{rates.heading}</SectionHeading>
                <div className="mt-6">
                  <RichText value={rates.paragraphs} />
                </div>
              </Reveal>
            </Section>
          </section>
        )}

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
