"use client";

import { useState } from "react";
import Button from "./Button";
import AnimatedDivider from "./AnimatedDivider";

const FALLBACK_EMAIL = "hello@somlioya.no";

const labelClass =
  "font-sans text-caption uppercase tracking-[0.16em] text-fjord";
const inputClass =
  "w-full py-3 bg-transparent border-b border-charcoal/20 font-sans text-body text-charcoal outline-none focus:border-fjord transition-colors placeholder:text-smoke-soft/60";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

interface Labels {
  intro: string;
  preferEmail: [string, string];
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  sent: string;
  mailtoNote: [string, string];
  error: string;
}

const LABELS: Record<"en" | "no", Labels> = {
  en: {
    intro: "Just get in touch to ask for whatever you need.",
    preferEmail: ["Prefer to write directly? Email us at", "."],
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
    mailtoNote: [
      "Your email app should have opened with the message ready to send. If it didn't, please write to",
      ".",
    ],
    error: "Something went wrong. Please email us directly at",
  },
  no: {
    intro: "Ta kontakt og spør om det du måtte lure på.",
    preferEmail: ["Vil du heller skrive direkte? Send e-post til", "."],
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
    mailtoNote: [
      "E-postprogrammet ditt skal ha åpnet seg med meldingen klar. Hvis ikke, skriv til",
      ".",
    ],
    error: "Noe gikk galt. Send oss gjerne en e-post direkte på",
  },
};

export default function ContactForm({
  introText,
  contactEmail,
  locale = "en",
}: {
  introText?: string;
  contactEmail?: string;
  locale?: "en" | "no";
}) {
  const email = contactEmail?.trim() || FALLBACK_EMAIL;
  const [status, setStatus] = useState<Status>("idle");
  const t = LABELS[locale];

  const openMailto = (name: string, fromEmail: string, message: string) => {
    const subject = `Island enquiry from ${name || "the website"}`;
    const body = `${message}\n\n— ${name}\n${fromEmail}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  };

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
      if (res.ok) {
        setStatus("sent");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (data?.fallback) {
        // Server-side sending isn't configured — open the visitor's mail app.
        openMailto(name, fromEmail, message);
        return;
      }
      setStatus("error");
    } catch {
      openMailto(name, fromEmail, message);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-16 md:py-24">
      <AnimatedDivider className="mb-8" />
      <p className="font-sans text-body text-smoke mb-4 whitespace-pre-line">
        {introText ?? t.intro}
      </p>
      <p className="font-sans text-body text-smoke mb-10">
        {t.preferEmail[0]}{" "}
        <a
          href={`mailto:${email}`}
          className="text-fjord-deep underline underline-offset-2 decoration-gold/70 hover:decoration-gold hover:decoration-2 transition-all"
        >
          {email}
        </a>
        {t.preferEmail[1]}
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
          {status === "mailto" && (
            <p role="status" className="font-sans text-caption text-smoke max-w-xs">
              {t.mailtoNote[0]}{" "}
              <a
                href={`mailto:${email}`}
                className="text-fjord-deep underline underline-offset-2"
              >
                {email}
              </a>
              {t.mailtoNote[1]}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="font-sans text-caption text-smoke max-w-xs">
              {t.error}{" "}
              <a
                href={`mailto:${email}`}
                className="text-fjord-deep underline underline-offset-2"
              >
                {email}
              </a>
              .
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
