import type { Metadata } from "next";
import Link from "next/link";
import RealisticIslandMap from "@/components/RealisticIslandMap";
import { pageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "3D-kart over øya",
  description:
    "Utforsk Sømliøya i en interaktiv 3D-modell, gjengitt i sanntid fra satellittdata.",
  alternates: pageAlternates("/map", "no"),
};

export default function NorwegianMapPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <main
        id="main-content"
        className="flex h-screen flex-col items-center justify-center gap-5 bg-[#0d1622] px-6 text-center"
      >
        <p className="font-heading text-lead font-light italic text-white/75">
          Det interaktive kartet hviler akkurat nå.
        </p>
        <p className="font-sans text-caption text-white/50 max-w-xs">
          3D-visningen av øya er midlertidig utilgjengelig. Utforsk gjerne
          resten av øya i mellomtiden.
        </p>
        <Link
          href="/no"
          className="focus-ring-light font-sans text-[0.72rem] uppercase tracking-[0.2em] text-white/85 border border-white/25 px-6 py-3 hover:bg-white/10 transition-colors"
        >
          ← Tilbake til Sømliøya
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content" className="h-screen w-screen">
      <RealisticIslandMap apiKey={apiKey} />
    </main>
  );
}
