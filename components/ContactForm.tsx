"use client";

import { useState } from "react";

export default function ContactForm({ introText }: { introText?: string }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-xl mx-auto px-6 py-20">
      <div className="divider mb-8" />
      <p className="font-sans text-smoke font-light leading-[1.85] mb-10">
        {introText ?? "Just get in touch to ask for whatever you need."}
      </p>
      {!submitted ? (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-0">
          <input type="text" name="name" placeholder="Your name" required
            className="w-full py-4 bg-transparent border-b border-black/10 font-sans text-base font-light text-charcoal outline-none focus:border-gold transition-colors placeholder:text-black/25 mb-6" />
          <input type="email" name="email" placeholder="Your email" required
            className="w-full py-4 bg-transparent border-b border-black/10 font-sans text-base font-light text-charcoal outline-none focus:border-gold transition-colors placeholder:text-black/25 mb-6" />
          <textarea name="message" placeholder="Your moment — tell us what brings you here" rows={5}
            className="w-full py-4 bg-transparent border-b border-black/10 font-sans text-base font-light text-charcoal outline-none focus:border-gold transition-colors placeholder:text-black/25 resize-y min-h-[120px] mb-10" />
          <button type="submit"
            className="text-[0.72rem] font-sans font-medium tracking-[0.25em] uppercase px-12 py-4 bg-fjord-deep text-white hover:bg-gold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-400 cursor-pointer">
            Connect
          </button>
        </form>
      ) : (
        <div className="text-center py-12">
          <p className="font-heading text-fjord-deep text-2xl font-light mb-3">Thank you</p>
          <p className="font-sans text-smoke font-light">We&apos;ll be in touch soon.</p>
        </div>
      )}
    </div>
  );
}
