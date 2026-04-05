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
    if (node.underline) content = <span className="underline" key={index}>{content}</span>;
    if (node.strikethrough) content = <s key={index}>{content}</s>;
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
    case "h1":
      return (
        <h1 key={index} className={`font-heading font-light tracking-wide mt-8 first:mt-0 ${dark ? "text-white text-4xl md:text-5xl" : "text-fjord-deep text-3xl md:text-4xl"}`}>
          {children}
        </h1>
      );
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
    case "h4":
      return (
        <h4 key={index} className={`font-heading font-light mt-6 first:mt-0 ${dark ? "text-white/85 text-xl" : "text-fjord-deep text-lg"}`}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 key={index} className={`font-heading font-normal mt-4 first:mt-0 ${dark ? "text-white/80 text-base" : "text-fjord-deep text-base"}`}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 key={index} className={`font-heading font-normal mt-4 first:mt-0 ${dark ? "text-white/80 text-sm" : "text-fjord-deep text-sm"}`}>
          {children}
        </h6>
      );
    case "ul":
      return (
        <ul key={index} className={`list-disc pl-6 mt-5 space-y-2 font-sans font-light leading-[1.85] ${dark ? "text-white/70 text-lg" : "text-smoke"}`}>
          {children}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className={`list-decimal pl-6 mt-5 space-y-2 font-sans font-light leading-[1.85] ${dark ? "text-white/70 text-lg" : "text-smoke"}`}>
          {children}
        </ol>
      );
    case "li":
      return <li key={index}>{children}</li>;
    case "lic":
      return <React.Fragment key={index}>{children}</React.Fragment>;
    case "blockquote":
      return (
        <blockquote key={index} className={`border-l-2 pl-5 my-6 font-heading font-light italic ${dark ? "border-gold/60 text-white/70 text-lg" : "border-gold text-smoke text-lg"}`}>
          {children}
        </blockquote>
      );
    case "a":
      if (!node.url) {
        return <React.Fragment key={index}>{children}</React.Fragment>;
      }
      return (
        <a key={index} href={node.url} className={`underline underline-offset-2 transition-colors ${dark ? "text-white/80 hover:text-gold" : "text-fjord-deep hover:text-gold"}`} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    case "img":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={index} src={node.url ?? ""} alt={node.alt ?? ""} className="max-w-full rounded mt-5" />
      );
    case "hr":
      return <div key={index} className={`w-10 h-px mx-auto my-8 ${dark ? "bg-gold/50" : "bg-gold"}`} />;
    case "strong":
      return <strong key={index} className="font-medium">{children}</strong>;
    case "em":
      return <em key={index} className="italic">{children}</em>;
    case "code":
      return <code key={index} className={`font-mono text-sm px-1.5 py-0.5 rounded ${dark ? "bg-white/10 text-white/80" : "bg-black/5 text-smoke"}`}>{children}</code>;
    case "code_block":
      return (
        <pre key={index} className={`font-mono text-sm rounded p-4 mt-5 overflow-x-auto ${dark ? "bg-white/10 text-white/80" : "bg-black/5 text-smoke"}`}>
          <code>{children}</code>
        </pre>
      );
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
