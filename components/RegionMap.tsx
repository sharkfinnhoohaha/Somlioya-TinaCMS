"use client";

import { useState } from "react";
import Link from "next/link";

interface PlaceInput {
  name: string;
  description?: unknown;
  lat?: number;
  lng?: number;
}

interface PlaceMarker {
  name: string;
  description: string;
  lat: number;
  lng: number;
  isSelf: boolean;
}

// Fallback coordinates for known regional places (used when the CMS entry
// has no explicit lat/lng — see the optional fields in tina/config.ts).
const PLACE_COORDS: Record<string, { lat: number; lng: number }> = {
  "Island of Leka": { lat: 65.1, lng: 11.62 },
  "Coastal Villages": { lat: 64.86, lng: 11.24 },
  Sømliøya: { lat: 65.064, lng: 11.931 },
};

const BOUNDS = { latMin: 64.72, latMax: 65.35, lngMin: 11.0, lngMax: 12.2 };

function toPct(lat: number, lng: number) {
  return {
    left: ((lng - BOUNDS.lngMin) / (BOUNDS.lngMax - BOUNDS.lngMin)) * 100,
    top: (1 - (lat - BOUNDS.latMin) / (BOUNDS.latMax - BOUNDS.latMin)) * 100,
  };
}

/** Pull plain text from a CMS string or TinaCMS rich-text object. */
function plainText(d: unknown): string {
  if (typeof d === "string") return d;
  if (d && typeof d === "object") {
    const node = d as { children?: Array<{ children?: Array<{ text?: string }> }> };
    return node.children?.[0]?.children?.[0]?.text ?? "";
  }
  return "";
}

export default function RegionMap({
  places,
  apiKey,
}: {
  places: PlaceInput[];
  apiKey?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  const bgUrl = apiKey
    ? `https://maps.googleapis.com/maps/api/staticmap?center=65.0,11.65&zoom=9&size=900x550&scale=2&maptype=satellite&key=${apiKey}`
    : null;

  const markers: PlaceMarker[] = [
    {
      name: "Sømliøya",
      ...PLACE_COORDS["Sømliøya"],
      description: "Our private island retreat in Nærøysund.",
      isSelf: true,
    },
    ...places.map((p) => {
      const coords =
        typeof p.lat === "number" && typeof p.lng === "number"
          ? { lat: p.lat, lng: p.lng }
          : PLACE_COORDS[p.name] ?? { lat: 65.1, lng: 11.7 };
      return {
        name: p.name,
        ...coords,
        description: plainText(p.description),
        isSelf: false,
      };
    }),
  ];

  return (
    <div
      className="relative h-[480px] md:h-[520px] overflow-hidden rounded-sm bg-[#0a1020]"
      style={
        bgUrl
          ? { backgroundImage: `url(${bgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
          : {}
      }
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a1020]/70 via-transparent to-[#0a1020]/40 pointer-events-none" />

      {!bgUrl && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      )}

      {markers.map((m) => {
        const pos = toPct(m.lat, m.lng);
        const isActive = active === m.name;
        // Flip the label and card to the left for markers near the right edge.
        const flip = pos.left > 60;

        return (
          <button
            key={m.name}
            className="absolute z-20 flex h-11 w-11 items-center justify-center group"
            style={{ left: `${pos.left}%`, top: `${pos.top}%`, transform: "translate(-50%, -50%)" }}
            onClick={() => setActive(isActive ? null : m.name)}
            aria-pressed={isActive}
            aria-label={m.name}
          >
            <span
              className={`absolute h-5 w-5 rounded-full animate-ping ${
                m.isSelf ? "bg-gold/40" : "bg-white/25"
              }`}
            />
            <span
              className={`relative block h-3 w-3 rounded-full border-2 shadow-lg transition-transform duration-200 group-hover:scale-125 ${
                m.isSelf ? "bg-gold border-gold/80" : "bg-white/85 border-white/50"
              }`}
            />
            <span
              className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-[0.65rem] uppercase tracking-[0.15em] transition-opacity duration-200 ${
                flip ? "right-full mr-3 text-right" : "left-full ml-3"
              } ${m.isSelf ? "text-gold" : "text-white/80"} ${
                isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
              }`}
            >
              {m.name}
            </span>

            {isActive && m.description && (
              <div
                className={`absolute top-6 w-60 rounded-sm border border-white/10 bg-[#0a1020]/95 p-4 text-left shadow-xl backdrop-blur-md ${
                  flip ? "right-full mr-3" : "left-full ml-3"
                }`}
              >
                <h3 className="font-heading text-sm font-light tracking-wide text-white mb-1.5">
                  {m.name}
                </h3>
                <p className="font-sans text-caption leading-relaxed text-white/70">
                  {m.description}
                </p>
              </div>
            )}
          </button>
        );
      })}

      <p className="absolute left-4 top-4 z-20 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-white/45 pointer-events-none">
        65°N · Nærøysund
      </p>

      <Link
        href="/map"
        className="focus-ring-light absolute bottom-4 right-4 z-20 font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] px-5 py-2.5 bg-[#0a1020]/70 border border-white/25 text-white hover:bg-gold hover:border-gold hover:text-fjord-deep transition-colors duration-300 backdrop-blur-sm"
      >
        View 3D Map →
      </Link>
    </div>
  );
}
