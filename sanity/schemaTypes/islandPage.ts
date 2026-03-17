import { defineField, defineType, defineArrayMember } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

const imageTextField = (name: string, heading: string) =>
  defineField({
    name,
    title: heading,
    type: 'object',
    fields: [
      defineField({ name: 'heading', type: 'string', title: 'Section Heading' }),
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
  })

export const islandPage = defineType({
  name: 'islandPage',
  title: 'Island Page',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'pageHero' }),
    defineField({
      name: 'intro',
      title: 'Intro Paragraphs',
      type: 'array',
      of: [defineArrayMember({ type: 'text', rows: 3 })],
    }),
    imageTextField('climateSection', 'Climate'),
    imageTextField('mountainsSection', 'Mountains and Views'),
    imageTextField('wildlifeSection', 'Wildlife'),
  ],
  preview: {
    prepare: () => ({ title: 'Island Page' }),
  },
})
