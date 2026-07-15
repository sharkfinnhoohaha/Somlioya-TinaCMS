"use client";

import { useState } from "react";
import Button from "./Button";
import AnimatedDivider from "./AnimatedDivider";

const labelClass =
  "font-sans text-caption uppercase tracking-[0.16em] text-fjord";
const inputClass =
  "w-full py-3 bg-transparent border-b border-charcoal/20 font-sans text-body text-charcoal outline-none focus:border-fjord transition-colors placeholder:text-smoke-soft/60";

type Status = "idle" | "sending" | "sent" | "error";

interface Labels {
  intro: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  sent: string;
  error: string;
}

const LABELS: Record<"en" | "no", Labels> = {
  en: {
    intro: "Just get in touch to ask for whatever you need.",
    name: "Your name",
    namePlaceholder: "Jane Doe",
    email: "Your email",
    emailPlaceholder: "jane@example.com",
    message: "Your message",
    messagePlaceholder:
      "Tell us what brings you here — the dates you have in mind, how many of you, and what you hope the island can be.",
    send: "Send enquiry",
    sending: "Sending…",
    sent: "Thank you — your enquiry has been sent. We will reply as soon as we can.",
    error:
      "Something went wrong sending your message. Please try again in a moment.",
  },
  no: {
    intro: "Ta kontakt og spør om det du måtte lure på.",
    name: "Navnet ditt",
    namePlaceholder: "Kari Nordmann",
    email: "E-postadressen din",
    emailPlaceholder: "kari@example.com",
    message: "Meldingen din",
    messagePlaceholder:
      "Fortell oss hva som bringer deg hit — datoene du har i tankene, hvor mange dere er, og hva du håper øya kan være.",
    send: "Send forespørsel",
    sending: "Sender…",
    sent: "Takk — forespørselen din er sendt. Vi svarer så snart vi kan.",
    error: "Noe gikk galt under sendingen. Prøv gjerne igjen om litt.",
  },
};

export default function ContactForm({
  introText,
  locale = "en",
}: {
  introText?: string;
  locale?: "en" | "no";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const t = LABELS[locale];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const fromEmail = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const company = String(form.get("company") ?? "");

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: fromEmail, message, company }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-16 md:py-24">
      <AnimatedDivider className="mb-8" />
      <p className="font-sans text-body text-smoke mb-10 whitespace-pre-line">
        {introText ?? t.intro}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className={labelClass}>
            {t.name}
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder={t.namePlaceholder}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className={labelClass}>
            {t.email}
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            className={inputClass}
          />
        </div>

        {/* Honeypot — hidden from real visitors, catches naive spam bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className={labelClass}>
            {t.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            placeholder={t.messagePlaceholder}
            className={`${inputClass} resize-y min-h-[130px]`}
          />
        </div>

        <div className="flex items-center gap-5 flex-wrap pt-1">
          <Button type="submit" variant="primary">
            {status === "sending" ? t.sending : t.send}
          </Button>
          {status === "sent" && (
            <p role="status" className="font-sans text-caption text-smoke max-w-xs">
              {t.sent}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="font-sans text-caption text-smoke max-w-xs">
              {t.error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
