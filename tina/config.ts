import { defineConfig } from "tinacms";

// ─── Reusable field groups ───────────────────────────────────────────────────

type ToolbarItem =
  | "heading"
  | "link"
  | "image"
  | "quote"
  | "ul"
  | "ol"
  | "code"
  | "codeBlock"
  | "bold"
  | "italic"
  | "raw"
  | "embed"
  | "mermaid"
  | "table";

const richTextToolbar: ToolbarItem[] = [
  "heading",
  "bold",
  "italic",
  "link",
  "image",
  "quote",
  "ul",
  "ol",
  "code",
  "table",
  "embed",
];

const pageHeroFields = [
  {
    type: "image" as const,
    name: "image",
    label: "Hero Image or Video",
  },
  {
    type: "string" as const,
    name: "imageAlt",
    label: "Image / Video Description",
  },
  {
    type: "string" as const,
    name: "title",
    label: "Title",
    required: true,
  },
  {
    type: "string" as const,
    name: "subtitle",
    label: "Subtitle",
  },
];

const richTextField = (name: string, label: string) => ({
  type: "rich-text" as const,
  name,
  label,
  overrides: {
    toolbar: richTextToolbar,
  },
});

// ─── TinaCMS Configuration ────────────────────────────────────────────────────

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",

  // Use local mode (no Tina Cloud account needed for development)
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ── Home Page ──────────────────────────────────────────────────────────
      {
        name: "homePage",
        label: "Home Page",
        path: "content/pages",
        match: { include: "home" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/",
        },
        fields: [
          {
            type: "object" as const,
            name: "hero",
            label: "Hero",
            fields: pageHeroFields,
          },
          richTextField("poeticParagraphs", "Poetic Intro Paragraphs"),
          richTextField("secondParagraphs", "Second Text Block"),
          {
            type: "string" as const,
            name: "pullQuote",
            label: "Pull Quote",
          },
          {
            type: "object" as const,
            name: "mapCta",
            label: "Map CTA",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              richTextField("description", "Description"),
            ],
          },
          {
            type: "object" as const,
            name: "firstImage",
            label: "First Parallax Image",
            fields: [
              { type: "image" as const, name: "src", label: "Image" },
              { type: "string" as const, name: "alt", label: "Alt Text" },
            ],
          },
          {
            type: "object" as const,
            name: "secondImage",
            label: "Second Parallax Image",
            fields: [
              { type: "image" as const, name: "src", label: "Image" },
              { type: "string" as const, name: "alt", label: "Alt Text" },
            ],
          },
        ],
      },

      // ── Activities Page ────────────────────────────────────────────────────
      {
        name: "activitiesPage",
        label: "Activities Page",
        path: "content/pages",
        match: { include: "activities" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/activities",
        },
        fields: [
          {
            type: "object" as const,
            name: "hero",
            label: "Hero",
            fields: pageHeroFields,
          },
          richTextField("intro", "Intro"),
          {
            type: "object" as const,
            name: "waterSection",
            label: "On the Water Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              {
                type: "object" as const,
                name: "items",
                label: "Activities",
                list: true,
                fields: [
                  { type: "image" as const, name: "image", label: "Image" },
                  { type: "string" as const, name: "imageAlt", label: "Image Alt" },
                  { type: "string" as const, name: "title", label: "Title" },
                  { type: "string" as const, name: "description", label: "Description", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object" as const,
            name: "landSection",
            label: "On Land Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              {
                type: "object" as const,
                name: "items",
                label: "Activities",
                list: true,
                fields: [
                  { type: "image" as const, name: "image", label: "Image" },
                  { type: "string" as const, name: "imageAlt", label: "Image Alt" },
                  { type: "string" as const, name: "title", label: "Title" },
                  { type: "string" as const, name: "description", label: "Description", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object" as const,
            name: "regionSection",
            label: "Exploring the Region Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              {
                type: "object" as const,
                name: "places",
                label: "Places",
                list: true,
                fields: [
                  { type: "string" as const, name: "name", label: "Name" },
                  richTextField("description", "Description"),
                ],
              },
              { type: "image" as const, name: "image", label: "Image" },
              { type: "string" as const, name: "imageAlt", label: "Image Alt" },
            ],
          },
          {
            type: "object" as const,
            name: "fireSection",
            label: "Around the Fire Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              richTextField("text", "Text"),
              { type: "image" as const, name: "closingImage", label: "Closing Image" },
              { type: "string" as const, name: "closingImageAlt", label: "Closing Image Alt" },
            ],
          },
        ],
      },

      // ── Staying Page ───────────────────────────────────────────────────────
      {
        name: "stayingPage",
        label: "Sleeping & Living Page",
        path: "content/pages",
        match: { include: "staying" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/staying",
        },
        fields: [
          {
            type: "object" as const,
            name: "hero",
            label: "Hero",
            fields: pageHeroFields,
          },
          richTextField("intro", "Intro"),
          {
            type: "object" as const,
            name: "buildingImages",
            label: "Building Images",
            list: true,
            fields: [
              { type: "image" as const, name: "src", label: "Image" },
              { type: "string" as const, name: "alt", label: "Alt Text" },
            ],
          },
          {
            type: "object" as const,
            name: "sleepingSection",
            label: "Sleeping Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
              { type: "image" as const, name: "image", label: "Image" },
              { type: "string" as const, name: "imageAlt", label: "Image Alt" },
            ],
          },
          {
            type: "object" as const,
            name: "sharedSpacesSection",
            label: "Shared Spaces Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
            ],
          },
          {
            type: "object" as const,
            name: "galleryImages",
            label: "Gallery Images",
            list: true,
            fields: [
              { type: "image" as const, name: "src", label: "Image" },
              { type: "string" as const, name: "alt", label: "Alt Text" },
            ],
          },
          {
            type: "object" as const,
            name: "groupSpacesSection",
            label: "Group Spaces Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
            ],
          },
          {
            type: "object" as const,
            name: "closingImage",
            label: "Closing Image",
            fields: [
              { type: "image" as const, name: "src", label: "Image" },
              { type: "string" as const, name: "alt", label: "Alt Text" },
            ],
          },
        ],
      },

      // ── Island Page ────────────────────────────────────────────────────────
      {
        name: "islandPage",
        label: "About the Island Page",
        path: "content/pages",
        match: { include: "island" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/island",
        },
        fields: [
          {
            type: "object" as const,
            name: "hero",
            label: "Hero",
            fields: pageHeroFields,
          },
          richTextField("intro", "Intro"),
          {
            type: "object" as const,
            name: "climateSection",
            label: "Climate Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
              { type: "image" as const, name: "image", label: "Image" },
              { type: "string" as const, name: "imageAlt", label: "Image Alt" },
            ],
          },
          {
            type: "object" as const,
            name: "mountainsSection",
            label: "Mountains Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
              { type: "image" as const, name: "image", label: "Image" },
              { type: "string" as const, name: "imageAlt", label: "Image Alt" },
            ],
          },
          {
            type: "object" as const,
            name: "wildlifeSection",
            label: "Wildlife Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
              { type: "image" as const, name: "image", label: "Image" },
              { type: "string" as const, name: "imageAlt", label: "Image Alt" },
            ],
          },
        ],
      },

      // ── Rituals Page ───────────────────────────────────────────────────────
      {
        name: "ritualsPage",
        label: "Rituals Page",
        path: "content/pages",
        match: { include: "rituals" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/rituals",
        },
        fields: [
          {
            type: "object" as const,
            name: "hero",
            label: "Hero",
            fields: pageHeroFields,
          },
          richTextField("intro", "Intro"),
          {
            type: "object" as const,
            name: "midImage",
            label: "Mid-page Image",
            fields: [
              { type: "image" as const, name: "src", label: "Image" },
              { type: "string" as const, name: "alt", label: "Alt Text" },
            ],
          },
          richTextField("secondParagraphs", "Second Paragraphs"),
          {
            type: "object" as const,
            name: "shapedTogetherSection",
            label: "Shaped Together Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
              { type: "image" as const, name: "image", label: "Image" },
              { type: "string" as const, name: "imageAlt", label: "Image Alt" },
            ],
          },
          {
            type: "object" as const,
            name: "gatheringsSection",
            label: "Other Gatherings Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
              { type: "string" as const, name: "pullQuote", label: "Pull Quote" },
            ],
          },
        ],
      },

      // ── Contact Page ───────────────────────────────────────────────────────
      {
        name: "contactPage",
        label: "Contact Page",
        path: "content/pages",
        match: { include: "contact" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/contact",
        },
        fields: [
          {
            type: "object" as const,
            name: "hero",
            label: "Hero",
            fields: pageHeroFields,
          },
          {
            type: "string" as const,
            name: "introText",
            label: "Intro Text",
            ui: { component: "textarea" },
          },
        ],
      },
    ],
  },
});
