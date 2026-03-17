/**
 * TinaRichText renderer
 *
 * Supports `dark` prop for rendering on dark parallax backgrounds (landing page)
 * vs. the default light-background style used on all inner pages.
 */

import type { TinaRichText, TinaRichTextNode } from "@/tina/lib/client";
import React from "react";

function renderNode(node: TinaRichTextNode, index: number, dark: boolean): React.ReactNode {
  if (node.type === "text") {
    let content: React.ReactNode = node.text ?? "";
    if (node.bold) content = <strong className="font-medium" key={index}>{content}</strong>;
    if (node.italic) content = <em className="italic" key={index}>{content}</em>;
    return content;
  }

  const children = node.children?.map((child, i) => renderNode(child, i, dark));

  switch (node.type) {
    case "root":
      return <React.Fragment key={index}>{children}</React.Fragment>;
    case "p": {
      const textContent = node.children?.map(n => (n as any).text ?? "").join("").trim();
      if (!textContent) return null;
      return (
        <p key={index} className={`font-sans font-light leading-[1.85] mt-5 first:mt-0 ${dark ? "text-white/70 text-lg" : "text-smoke"}`}>
          {children}
        </p>
      );
    }
    case "h2":
      return (
        <h2 key={index} className={`font-heading font-light tracking-wide mt-6 first:mt-0 ${dark ? "text-white/90 text-3xl md:text-4xl" : "text-fjord-deep text-2xl md:text-3xl"}`}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className={`font-heading font-light mt-8 first:mt-0 ${dark ? "text-white/90 text-2xl md:text-3xl leading-relaxed tracking-wide" : "text-fjord-deep text-xl"}`}>
          {children}
        </h3>
      );
    case "hr":
      return <div key={index} className={`w-10 h-px mx-auto my-8 ${dark ? "bg-gold/50" : "bg-gold"}`} />;
    case "strong":
      return <strong key={index} className="font-medium">{children}</strong>;
    case "em":
      return <em key={index} className="italic">{children}</em>;
    default:
      return <React.Fragment key={index}>{children}</React.Fragment>;
  }
}

export default function RichText({
  value,
  className,
  dark = false,
}: {
  value: TinaRichText | string | null | undefined;
  className?: string;
  dark?: boolean;
}) {
  if (!value) return null;

  if (typeof value === "string") {
    return (
      <div className={className}>
        <p className={`font-sans font-light leading-[1.85] mt-5 first:mt-0 ${dark ? "text-white/70 text-lg" : "text-smoke"}`}>{value}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {value.children?.map((node, i) => renderNode(node, i, dark))}
    </div>
  );
}
