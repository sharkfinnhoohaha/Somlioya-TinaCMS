"use client";

import { useState } from "react";

const FALLBACK_EMAIL = "hello@somlioya.no";

const inputClass =
  "w-full py-4 bg-transparent border-b border-black/10 font-sans text-base font-light text-charcoal outline-none focus:border-gold transition-colors placeholder:text-black/25";

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
    <div className="max-w-xl mx-auto px-6 py-20">
      <div className="divider mb-8" />
      <p className="font-sans text-smoke font-light leading-[1.85] mb-4">
        {introText ?? "Just get in touch to ask for whatever you need."}
      </p>
      <p className="font-sans text-smoke font-light leading-[1.85] mb-10">
        Prefer to write directly? Email us at{" "}
        <a
          href={`mailto:${email}`}
          className="text-fjord-deep underline underline-offset-2 hover:text-gold transition-colors"
        >
          {email}
        </a>
        .
      </p>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-0">
          <label htmlFor="contact-name" className="sr-only">
            Your name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your name"
            required
            autoComplete="name"
            className={`${inputClass} mb-6`}
          />
          <label htmlFor="contact-email" className="sr-only">
            Your email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Your email"
            required
            autoComplete="email"
            className={`${inputClass} mb-6`}
          />
          <label htmlFor="contact-message" className="sr-only">
            Your message
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Your moment — tell us what brings you here"
            rows={5}
            required
            className={`${inputClass} resize-y min-h-[120px] mb-10`}
          />
          <button
            type="submit"
            className="text-[0.72rem] font-sans font-medium tracking-[0.25em] uppercase px-12 py-4 bg-fjord-deep text-white hover:bg-gold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-400 cursor-pointer"
          >
            Connect
          </button>
        </form>
      ) : (
        <div className="text-center py-12">
          <p className="font-heading text-fjord-deep text-2xl font-light mb-3">
            Thank you
          </p>
          <p className="font-sans text-smoke font-light">
            Your email app should have opened with your message ready to send.
            If it didn&apos;t, please write to us at{" "}
            <a
              href={`mailto:${email}`}
              className="text-fjord-deep underline underline-offset-2 hover:text-gold transition-colors"
            >
              {email}
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
