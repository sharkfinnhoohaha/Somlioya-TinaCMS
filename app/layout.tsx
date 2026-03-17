import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      </body>
    </html>
  );
}
