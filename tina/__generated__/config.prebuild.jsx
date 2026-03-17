// tina/config.ts
import { defineConfig } from "tinacms";
var pageHeroFields = [
  {
    type: "image",
    name: "image",
    label: "Hero Image"
  },
  {
    type: "string",
    name: "imageAlt",
    label: "Image Alt Text"
  },
  {
    type: "string",
    name: "title",
    label: "Title",
    required: true
  },
  {
    type: "string",
    name: "subtitle",
    label: "Subtitle"
  }
];
var richTextField = (name, label) => ({
  type: "rich-text",
  name,
  label
});
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main",
  // Use local mode (no Tina Cloud account needed for development)
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "523da489-c704-4aaf-8d32-1ff42bf31028",
  token: process.env.TINA_TOKEN || "2d7dcb5e1d33ee3b466b01e105a9e5510f9cf976",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
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
          router: () => "/"
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: pageHeroFields
          },
          richTextField("poeticParagraphs", "Poetic Intro Paragraphs"),
          richTextField("secondParagraphs", "Second Text Block"),
          {
            type: "string",
            name: "pullQuote",
            label: "Pull Quote"
          },
          {
            type: "object",
            name: "mapCta",
            label: "Map CTA",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              richTextField("description", "Description")
            ]
          },
          {
            type: "object",
            name: "firstImage",
            label: "First Parallax Image",
            fields: [
              { type: "image", name: "src", label: "Image" },
              { type: "string", name: "alt", label: "Alt Text" }
            ]
          },
          {
            type: "object",
            name: "secondImage",
            label: "Second Parallax Image",
            fields: [
              { type: "image", name: "src", label: "Image" },
              { type: "string", name: "alt", label: "Alt Text" }
            ]
          }
        ]
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
          router: () => "/activities"
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: pageHeroFields
          },
          richTextField("intro", "Intro"),
          {
            type: "object",
            name: "waterSection",
            label: "On the Water Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "items",
                label: "Activities",
                list: true,
                fields: [
                  { type: "image", name: "image", label: "Image" },
                  { type: "string", name: "imageAlt", label: "Image Alt" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "landSection",
            label: "On Land Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "items",
                label: "Activities",
                list: true,
                fields: [
                  { type: "image", name: "image", label: "Image" },
                  { type: "string", name: "imageAlt", label: "Image Alt" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "regionSection",
            label: "Exploring the Region Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "places",
                label: "Places",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Name" },
                  richTextField("description", "Description")
                ]
              },
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "imageAlt", label: "Image Alt" }
            ]
          },
          {
            type: "object",
            name: "fireSection",
            label: "Around the Fire Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              richTextField("text", "Text"),
              { type: "image", name: "closingImage", label: "Closing Image" },
              { type: "string", name: "closingImageAlt", label: "Closing Image Alt" }
            ]
          }
        ]
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
          router: () => "/staying"
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: pageHeroFields
          },
          richTextField("intro", "Intro"),
          {
            type: "object",
            name: "buildingImages",
            label: "Building Images",
            list: true,
            fields: [
              { type: "image", name: "src", label: "Image" },
              { type: "string", name: "alt", label: "Alt Text" }
            ]
          },
          {
            type: "object",
            name: "sleepingSection",
            label: "Sleeping Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "imageAlt", label: "Image Alt" }
            ]
          },
          {
            type: "object",
            name: "sharedSpacesSection",
            label: "Shared Spaces Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs")
            ]
          },
          {
            type: "object",
            name: "galleryImages",
            label: "Gallery Images",
            list: true,
            fields: [
              { type: "image", name: "src", label: "Image" },
              { type: "string", name: "alt", label: "Alt Text" }
            ]
          },
          {
            type: "object",
            name: "groupSpacesSection",
            label: "Group Spaces Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs")
            ]
          },
          {
            type: "object",
            name: "closingImage",
            label: "Closing Image",
            fields: [
              { type: "image", name: "src", label: "Image" },
              { type: "string", name: "alt", label: "Alt Text" }
            ]
          }
        ]
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
          router: () => "/island"
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: pageHeroFields
          },
          richTextField("intro", "Intro"),
          {
            type: "object",
            name: "climateSection",
            label: "Climate Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "imageAlt", label: "Image Alt" }
            ]
          },
          {
            type: "object",
            name: "mountainsSection",
            label: "Mountains Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "imageAlt", label: "Image Alt" }
            ]
          },
          {
            type: "object",
            name: "wildlifeSection",
            label: "Wildlife Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "imageAlt", label: "Image Alt" }
            ]
          }
        ]
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
          router: () => "/rituals"
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: pageHeroFields
          },
          richTextField("intro", "Intro"),
          {
            type: "object",
            name: "midImage",
            label: "Mid-page Image",
            fields: [
              { type: "image", name: "src", label: "Image" },
              { type: "string", name: "alt", label: "Alt Text" }
            ]
          },
          richTextField("secondParagraphs", "Second Paragraphs"),
          {
            type: "object",
            name: "shapedTogetherSection",
            label: "Shaped Together Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "imageAlt", label: "Image Alt" }
            ]
          },
          {
            type: "object",
            name: "gatheringsSection",
            label: "Other Gatherings Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              richTextField("paragraphs", "Paragraphs"),
              { type: "string", name: "pullQuote", label: "Pull Quote" }
            ]
          }
        ]
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
          router: () => "/contact"
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: pageHeroFields
          },
          {
            type: "string",
            name: "introText",
            label: "Intro Text",
            ui: { component: "textarea" }
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
