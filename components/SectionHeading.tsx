import { type ReactNode } from "react";
import AnimatedDivider from "./AnimatedDivider";

/**
 * Consistent section heading: optional eyebrow, serif heading, gold divider.
 * Replaces the ad-hoc `<h3>` + `.divider` blocks scattered across pages.
 */
export default function SectionHeading({
  children,
  eyebrow,
  as: Tag = "h2",
  align = "left",
  className = "",
}: {
  children: ReactNode;
  eyebrow?: string;
  as?: "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}) {
  const sizeClass = Tag === "h2" ? "text-h2" : "text-h3";
  const centered = align === "center";

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="font-sans text-eyebrow uppercase tracking-[0.3em] text-smoke mb-3">
          {eyebrow}
        </p>
      )}
      <Tag className={`font-heading ${sizeClass} font-normal text-fjord-deep text-balance`}>
        {children}
      </Tag>
      <AnimatedDivider className={`mt-5 ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}
