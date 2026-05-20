"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * Drop-in replacement for next/image that renders a neutral placeholder if
 * the source fails to load or the src is empty. Prevents an unset/broken
 * image from leaving a silent blank rectangle on the page — the editor sees
 * "Image unavailable" instead of nothing, which is much easier to diagnose.
 */
export default function SafeImage(props: ImageProps) {
  const { src, alt, className, ...rest } = props;
  const [failed, setFailed] = useState(false);

  const missing = !src || (typeof src === "string" && src.trim() === "");

  if (missing || failed) {
    return (
      <div
        role="img"
        aria-label={typeof alt === "string" ? alt || "Image unavailable" : "Image unavailable"}
        className={`flex items-center justify-center bg-bone text-smoke-soft ${className ?? ""}`}
        style={rest.fill ? { position: "absolute", inset: 0 } : undefined}
      >
        <span className="font-sans text-eyebrow uppercase tracking-[0.25em]">
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
