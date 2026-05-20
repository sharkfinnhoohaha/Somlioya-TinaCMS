"use client";

import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  /** Set when the control sits on dark imagery — inverts colours and focus ring. */
  onDark?: boolean;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  "aria-label"?: string;
}

const base =
  "inline-flex items-center justify-center text-center font-sans font-medium uppercase " +
  "text-[0.78rem] tracking-[0.2em] px-9 py-4 transition-all duration-300 " +
  "hover:-translate-y-0.5 motion-reduce:hover:transform-none select-none cursor-pointer";

function variantClasses(variant: Variant, onDark: boolean): string {
  if (variant === "primary") {
    return onDark
      ? "bg-ivory text-fjord-deep hover:bg-gold hover:text-fjord-deep hover:shadow-xl"
      : "bg-fjord-deep text-ivory hover:bg-gold hover:text-fjord-deep hover:shadow-lg";
  }
  return onDark
    ? "border border-white/55 text-white hover:border-white hover:bg-white/10"
    : "border border-fjord-deep/35 text-fjord-deep hover:border-fjord-deep hover:bg-fjord-deep/[0.04]";
}

export default function Button({
  children,
  variant = "primary",
  onDark = false,
  href,
  onClick,
  type = "button",
  className = "",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const cls = `${base} ${variantClasses(variant, onDark)} ${
    onDark ? "focus-ring-light" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
