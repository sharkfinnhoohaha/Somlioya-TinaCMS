import { NextResponse } from "next/server";
import { getContactPage } from "@/tina/lib/client";

const MAX_LENGTHS = { name: 200, email: 320, message: 5000 };

/**
 * Contact form endpoint. Sends the enquiry by email through Resend to the
 * address configured in the CMS (Contact Page → Contact Email Address).
 * The form is the only contact channel — no address is shown publicly and
 * there is no mailto fallback, so both RESEND_API_KEY and the CMS address
 * must be configured for enquiries to get through.
 *
 * Env vars (see .env.example):
 *   RESEND_API_KEY      — Resend API key (required in production)
 *   CONTACT_FROM_EMAIL  — verified sender, e.g. "Sømliøya <noreply@somlioya.net>"
 */
export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot — real visitors never fill this hidden field.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim().slice(0, MAX_LENGTHS.name);
  const email = (body.email ?? "").trim().slice(0, MAX_LENGTHS.email);
  const message = (body.message ?? "").trim().slice(0, MAX_LENGTHS.message);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide your name, a valid email and a message." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = getContactPage()?.contactEmail?.trim();
  if (!apiKey || !to) {
    console.error(
      "Contact form is not configured:",
      apiKey ? "no contactEmail set in the CMS" : "RESEND_API_KEY is not set"
    );
    return NextResponse.json(
      { error: "Email sending is not configured." },
      { status: 503 }
    );
  }

  const from = process.env.CONTACT_FROM_EMAIL || "Sømliøya <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Island enquiry from ${name}`,
      text: `${message}\n\n— ${name}\n${email}`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", res.status, await res.text());
    return NextResponse.json(
      { error: "Could not send your message right now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
