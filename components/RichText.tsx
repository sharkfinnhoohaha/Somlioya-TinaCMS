/**
 * TinaRichText renderer
 *
 * Supports `dark` prop for rendering on dark parallax backgrounds (landing page)
 * vs. the default light-background style used on all inner pages.
 */

import type { TinaRichText, TinaRichTextNode } from "@/tina/lib/client";
import React from "react";

/** Allow only safe protocols and true relative paths to prevent javascript: injection. */
function sanitizeHref(url: string | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  // Reject protocol-relative URLs (e.g. //example.com) which can be used to bypass checks
  if (trimmed.startsWith("//")) return null;
  if (/^(https?:|mailto:|\/(?!\/)|#)/i.test(trimmed)) return trimmed;
  return null;
}

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
      // Treat any non-text child (inline image, link, etc.) as content so we
      // don't incorrectly drop paragraphs that contain only embedded nodes.
      const hasContent = node.children?.some(
        (n) => n.type !== "text" || (n.text ?? "").trim() !== ""
      );
      if (!hasContent) return null;
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
    case "a": {
      const href = sanitizeHref(node.url);
      if (!href) {
        return <React.Fragment key={index}>{children}</React.Fragment>;
      }
      const isExternal = /^https?:/i.test(href);
      return (
        <a key={index} href={href} className={`underline underline-offset-2 transition-colors ${dark ? "text-white/80 hover:text-gold" : "text-fjord-deep hover:text-gold"}`} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
          {children}
        </a>
      );
    }
    case "img": {
      if (!node.url) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={index} src={node.url} alt={node.alt ?? "Rich text image"} className="max-w-full rounded mt-5" />
      );
    }
    case "table":
      return (
        <div key={index} className="overflow-x-auto mt-5">
          <table className={`w-full text-sm border-collapse font-sans font-light ${dark ? "text-white/70" : "text-smoke"}`}>
            {children}
          </table>
        </div>
      );
    case "thead":
      return <thead key={index}>{children}</thead>;
    case "tbody":
      return <tbody key={index}>{children}</tbody>;
    case "tr":
      return <tr key={index} className={`border-b ${dark ? "border-white/20" : "border-black/10"}`}>{children}</tr>;
    case "th":
      return (
        <th key={index} className={`px-4 py-2 text-left font-medium ${dark ? "text-white/90 border-b border-white/30" : "text-fjord-deep border-b border-black/20"}`}>
          {children}
        </th>
      );
    case "td":
      return <td key={index} className="px-4 py-2">{children}</td>;
    case "embed": {
      if (!node.url) return null;
      const safeUrl = sanitizeHref(node.url);
      if (!safeUrl) return null;
      return (
        <div key={index} className="relative mt-5 w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={safeUrl}
            title={node.caption ?? node.alt ?? "Embedded content"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
            className="absolute inset-0 w-full h-full rounded"
          />
        </div>
      );
    }
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
