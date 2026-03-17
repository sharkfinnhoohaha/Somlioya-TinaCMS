import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
          ],
        }),
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'subtitle', type: 'string', title: 'Subtitle' }),
      ],
    }),
    defineField({
      name: 'poeticParagraphs',
      title: 'Poetic Intro Paragraphs',
      description: 'The short lines of text overlaid on the first image.',
      type: 'richText',
    }),
    defineField({
      name: 'secondParagraphs',
      title: 'Second Text Block',
      description: 'The paragraphs overlaid on the closing image.',
      type: 'richText',
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull Quote',
      description: 'The italic quote: "It is a place where you can step outside…"',
      type: 'string',
    }),
    defineField({
      name: 'mapCta',
      title: '3D Map Call-to-Action',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'description', type: 'richText', title: 'Description' }),
      ],
    }),
    defineField({
      name: 'firstImage',
      title: 'First Parallax Image (Poetic Intro)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
      ],
    }),
    defineField({
      name: 'secondImage',
      title: 'Second Parallax Image (Closing)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Home Page' }),
  },
})
