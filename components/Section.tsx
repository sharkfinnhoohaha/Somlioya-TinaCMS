import { type ReactNode } from "react";

type Width = "narrow" | "prose" | "wide";
type Padding = "default" | "compact" | "none";

const widths: Record<Width, string> = {
  narrow: "max-w-xl",
  prose: "max-w-2xl",
  wide: "max-w-[1400px]",
};

const paddings: Record<Padding, string> = {
  default: "py-16 md:py-24",
  compact: "py-10 md:py-14",
  none: "",
};

/**
 * Shared layout container — gives every page the same gutters and vertical
 * rhythm so spacing stays consistent regardless of which page edits it.
 */
export default function Section({
  children,
  width = "prose",
  padding = "default",
  className = "",
  id,
}: {
  children: ReactNode;
  width?: Width;
  padding?: Padding;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${widths[width]} mx-auto px-6 md:px-10 ${paddings[padding]} ${className}`}
    >
      {children}
    </section>
  );
}
