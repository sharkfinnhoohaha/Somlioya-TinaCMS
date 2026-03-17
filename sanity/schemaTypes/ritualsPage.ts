import { defineField, defineType, defineArrayMember } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const ritualsPage = defineType({
  name: 'ritualsPage',
  title: 'Rituals Page',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'pageHero' }),
    defineField({
      name: 'intro',
      title: 'Intro Paragraphs',
      type: 'array',
      of: [defineArrayMember({ type: 'text', rows: 3 })],
    }),
    defineField({
      name: 'midImage',
      title: 'Mid-Page Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({
      name: 'secondParagraphs',
      title: 'Second Text Block',
      type: 'array',
      of: [defineArrayMember({ type: 'text', rows: 3 })],
    }),
    defineField({
      name: 'shapedTogetherSection',
      title: 'Shaped Together',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({
          name: 'paragraphs',
          type: 'array',
          of: [defineArrayMember({ type: 'text', rows: 3 })],
        }),
        defineField({
          name: 'image',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        }),
      ],
    }),
    defineField({
      name: 'gatheringsSection',
      title: 'Other Gatherings',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({
          name: 'paragraphs',
          type: 'array',
          of: [defineArrayMember({ type: 'text', rows: 3 })],
        }),
        defineField({
          name: 'pullQuote',
          type: 'string',
          title: 'Pull Quote',
          description: 'The italic quote at the bottom of this section.',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Rituals Page' }),
  },
})
