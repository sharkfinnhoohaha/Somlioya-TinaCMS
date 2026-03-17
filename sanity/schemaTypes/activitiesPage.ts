import { defineField, defineType, defineArrayMember } from 'sanity'
import { ThListIcon } from '@sanity/icons'

const activityCard = defineField({
  name: 'items',
  title: 'Activities',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        }),
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'description', type: 'text', rows: 3, title: 'Description' }),
      ],
      preview: {
        select: { title: 'title' },
      },
    }),
  ],
})

export const activitiesPage = defineType({
  name: 'activitiesPage',
  title: 'Activities Page',
  type: 'document',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'pageHero',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Paragraphs',
      type: 'richText',
    }),
    defineField({
      name: 'waterSection',
      title: 'On the Water',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Section Heading' }),
        activityCard,
      ],
    }),
    defineField({
      name: 'landSection',
      title: 'On Land',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Section Heading' }),
        activityCard,
      ],
    }),
    defineField({
      name: 'regionSection',
      title: 'Exploring the Region',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Section Heading' }),
        defineField({
          name: 'places',
          title: 'Places',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'name', type: 'string', title: 'Place Name' }),
                defineField({ name: 'description', type: 'richText', title: 'Description' }),
              ],
              preview: { select: { title: 'name' } },
            }),
          ],
        }),
        defineField({
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        }),
      ],
    }),
    defineField({
      name: 'fireSection',
      title: 'Around the Fire',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Section Heading' }),
        defineField({ name: 'text', type: 'richText', title: 'Text' }),
        defineField({
          name: 'closingImage',
          title: 'Closing Image',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Activities Page' }),
  },
})
