import { defineConfig, type Collection } from "tinacms";

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

// Deliberately minimal. A non-technical editor only needs basic formatting,
// and headings are intentionally excluded — every page section heading is a
// dedicated string field, so body copy can never be accidentally styled as an
// oversized heading (which previously broke the page typography).
const richTextToolbar: ToolbarItem[] = [
  "bold",
  "italic",
  "link",
  "image",
  "quote",
  "ul",
  "ol",
];

const pageHeroFields = [
  {
    type: "image" as const,
    name: "image",
    label: "Hero Image or Video",
  },
  {
    type: "image" as const,
    name: "posterImage",
    label: "Hero Video Poster",
    description:
      "A still image shown while a hero video loads, and if autoplay is blocked. Recommended whenever the hero is a video; ignored for image heroes.",
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

// ─── Page collections (English) ───────────────────────────────────────────────

const pageCollections: (Collection & { ui: { router: () => string } })[] = [
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
          { type: "string" as const, name: "poeticParagraphs", label: "Poetic Intro Paragraphs", ui: { component: "textarea" } },
          { type: "string" as const, name: "secondParagraphs", label: "Second Text Block", ui: { component: "textarea" } },
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
              { type: "string" as const, name: "description", label: "Description", ui: { component: "textarea" } },
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
          {
            type: "object" as const,
            name: "testimonialsSection",
            label: "Testimonials",
            description:
              "Guest quotes shown near the end of the home page. The section is hidden until at least one quote is added.",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              {
                type: "object" as const,
                name: "items",
                label: "Quotes",
                list: true,
                ui: {
                  itemProps: (item: { attribution?: string }) => ({
                    label: item?.attribution || "Quote",
                  }),
                },
                fields: [
                  {
                    type: "string" as const,
                    name: "quote",
                    label: "Quote",
                    ui: { component: "textarea" },
                  },
                  { type: "string" as const, name: "attribution", label: "Attribution" },
                ],
              },
            ],
          },
          {
            type: "string" as const,
            name: "instagramUrl",
            label: "Instagram URL",
            description:
              "Full URL to the island's Instagram profile. Shown as a follow link in the testimonials band and the footer when set.",
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
                  { type: "string" as const, name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "number" as const, name: "lat", label: "Latitude (optional — positions the map marker)" },
                  { type: "number" as const, name: "lng", label: "Longitude (optional — positions the map marker)" },
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

      // ── Plan Your Stay Page ────────────────────────────────────────────────
      {
        name: "planPage",
        label: "Plan Your Stay Page",
        path: "content/pages",
        match: { include: "plan" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/plan",
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
            name: "steps",
            label: "How It Works — Steps",
            list: true,
            ui: {
              itemProps: (item: { title?: string }) => ({
                label: item?.title || "Step",
              }),
            },
            fields: [
              { type: "string" as const, name: "title", label: "Title" },
              {
                type: "string" as const,
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object" as const,
            name: "practicalSection",
            label: "Practical Details Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
              {
                type: "object" as const,
                name: "facts",
                label: "Key Facts",
                list: true,
                ui: {
                  itemProps: (item: { label?: string }) => ({
                    label: item?.label || "Fact",
                  }),
                },
                fields: [
                  { type: "string" as const, name: "label", label: "Label" },
                  { type: "string" as const, name: "detail", label: "Detail", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object" as const,
            name: "ratesSection",
            label: "Rates Section",
            fields: [
              { type: "string" as const, name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
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
          {
            type: "string" as const,
            name: "contactEmail",
            label: "Contact Email Address",
            description:
              "Where contact form enquiries are delivered. This address is never shown to visitors.",
            required: true,
          },
        ],
      },
];

// ─── Norwegian mirrors ────────────────────────────────────────────────────────
// Each English collection gets a Norwegian twin backed by content/pages/no/,
// served at /no/... — same fields, so the two languages can never drift
// structurally. Note: /no pages are rendered from these files but don't have
// Tina live-preview wiring; edit them via the /admin collection list.

const norwegianCollections = pageCollections.map((collection) => ({
  ...collection,
  name: `${collection.name}No`,
  label: `${collection.label} (Norsk)`,
  path: "content/pages/no",
  ui: {
    ...collection.ui,
    router: () => {
      const en = collection.ui.router();
      return en === "/" ? "/no" : `/no${en}`;
    },
  },
}));

// ─── TinaCMS Configuration ────────────────────────────────────────────────────

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",

  // Tina Cloud credentials from env vars. Set NEXT_PUBLIC_TINA_CLIENT_ID and
  // TINA_TOKEN (plus TINA_CLOUD_ACTIVE=true) in Vercel env vars to enable
  // cloud-based editing in production. Without them the build falls back to
  // local mode (content served from JSON files, no visual editor).
  // Media is repo-based (public/images/), so images never depend on
  // assets.tina.io CDN.
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  // mediaRoot MUST match the folder the photo library actually lives in
  // (public/images). Tina does not treat image paths in the JSON as literal
  // strings: on every save it normalises each `image` field against mediaRoot,
  // prefixing the root when the stored value doesn't already start with it.
  //
  // Pointing mediaRoot at a second folder therefore rewrites the whole page's
  // images on the next save — a previous "uploads" setting silently turned
  // /images/hero.jpg into /uploads/images/hero.jpg across four pages, which
  // fails the prebuild content-image check and blocks every deploy after it.
  // The rewrite is idempotent, so with mediaRoot="images" an existing
  // /images/... value round-trips unchanged.
  //
  // Keeping the editor in the same folder also means the media browser shows
  // the existing photo library, so images can be reused instead of re-uploaded.
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [...pageCollections, ...norwegianCollections],
  },
});
