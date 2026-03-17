import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sømliøya — Where the world becomes quieter",
  description:
    "A private island retreat in Nærøysund, Trøndelag, Norway. Rent for a day, a weekend, or a week.",
  openGraph: {
    title: "Sømliøya",
    description: "A place to step outside the world for a while.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Karla:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain">
        {children}
        <SanityLive />
        {isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
