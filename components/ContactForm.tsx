"use client";

import { useState } from "react";
import Button from "./Button";
import AnimatedDivider from "./AnimatedDivider";

const FALLBACK_EMAIL = "hello@somlioya.no";

const labelClass =
  "font-sans text-caption uppercase tracking-[0.16em] text-fjord";
const inputClass =
  "w-full py-3 bg-transparent border-b border-charcoal/20 font-sans text-body text-charcoal outline-none focus:border-fjord transition-colors placeholder:text-smoke-soft/60";

export default function ContactForm({
  introText,
  contactEmail,
}: {
  introText?: string;
  contactEmail?: string;
}) {
  const email = contactEmail?.trim() || FALLBACK_EMAIL;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const fromEmail = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");

    const subject = `Island enquiry from ${name || "the website"}`;
    const body = `${message}\n\n— ${name}\n${fromEmail}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-16 md:py-24">
      <AnimatedDivider className="mb-8" />
      <p className="font-sans text-body text-smoke mb-4">
        {introText ?? "Just get in touch to ask for whatever you need."}
      </p>
      <p className="font-sans text-body text-smoke mb-10">
        Prefer to write directly? Email us at{" "}
        <a
          href={`mailto:${email}`}
          className="text-fjord-deep underline underline-offset-2 decoration-gold/70 hover:decoration-gold hover:decoration-2 transition-all"
        >
          {email}
        </a>
        .
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className={labelClass}>
            Your name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className={labelClass}>
            Your email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className={labelClass}>
            Your message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            placeholder="Tell us what brings you here — the dates you have in mind, how many of you, and what you hope the island can be."
            className={`${inputClass} resize-y min-h-[130px]`}
          />
        </div>

        <div className="flex items-center gap-5 flex-wrap pt-1">
          <Button type="submit" variant="primary">
            Send enquiry
          </Button>
          {submitted && (
            <p role="status" className="font-sans text-caption text-smoke max-w-xs">
              Your email app should have opened with the message ready to send.
              If it didn&apos;t, please write to{" "}
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
