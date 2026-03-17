import { defineField, defineType, defineArrayMember } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const stayingPage = defineType({
  name: 'stayingPage',
  title: 'Staying Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'pageHero' }),
    defineField({
      name: 'intro',
      title: 'Intro Paragraphs',
      type: 'richText',
    }),
    defineField({
      name: 'buildingImages',
      title: 'Building Images (pair)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        }),
      ],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: 'sleepingSection',
      title: 'Sleeping',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'paragraphs', type: 'richText' }),
        defineField({
          name: 'image',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        }),
      ],
    }),
    defineField({
      name: 'sharedSpacesSection',
      title: 'Shared Spaces',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'paragraphs', type: 'richText' }),
      ],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images (horizontal scroll)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        }),
      ],
    }),
    defineField({
      name: 'groupSpacesSection',
      title: 'Group Spaces',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'paragraphs', type: 'richText' }),
      ],
    }),
    defineField({
      name: 'closingImage',
      title: 'Closing Full-Width Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Staying Page' }),
  },
})
