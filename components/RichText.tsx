/**
 * TinaRichText renderer
 *
 * TinaCMS stores rich text as a tree of nodes (similar to Slate.js format),
 * unlike Sanity's PortableText array-of-blocks format.
 *
 * This component recursively renders TinaCMS rich text nodes into HTML.
 * The styling matches the original Sanity-based PortableText renderer.
 */

import type { TinaRichText, TinaRichTextNode } from "@/tina/lib/client";
import React from "react";

function renderNode(node: TinaRichTextNode, index: number): React.ReactNode {
  // Leaf text node
  if (node.type === "text") {
    let content: React.ReactNode = node.text ?? "";
    if (node.bold) content = <strong className="font-semibold" key={index}>{content}</strong>;
    if (node.italic) content = <em className="italic" key={index}>{content}</em>;
    return content;
  }

  const children = node.children?.map((child, i) => renderNode(child, i));

  switch (node.type) {
    case "root":
      return <React.Fragment key={index}>{children}</React.Fragment>;
    case "p": {
      const textContent = node.children?.map(n => (n as any).text ?? "").join("").trim();
      if (!textContent) return null;
      return (
        <p key={index} className="font-sans text-white/70 font-light leading-[1.85] text-lg mt-5 first:mt-0">
          {children}
        </p>
      );
    }
    case "h2":
      return (
        <h2 key={index} className="font-heading text-white/90 text-3xl md:text-4xl font-light tracking-wide mt-6 first:mt-0">
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className="font-heading text-white/90 text-2xl md:text-3xl font-light leading-relaxed tracking-wide mt-8 first:mt-0">
          {children}
        </h3>
      );
    case "hr":
      return <div key={index} className="w-10 h-px bg-gold/50 mx-auto my-8" />;
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
}: {
  value: TinaRichText | string | null | undefined;
  className?: string;
}) {
  if (!value) return null;

  if (typeof value === "string") {
    return (
      <div className={className}>
        <p className="font-sans text-smoke font-light leading-[1.85] mt-5 first:mt-0">{value}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {value.children?.map((node, i) => renderNode(node, i))}
    </div>
  );
}
