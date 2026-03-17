import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemaTypes'

const singletonTypes = ['homePage', 'activitiesPage', 'stayingPage', 'islandPage', 'ritualsPage', 'contactPage']

export default defineConfig({
  name: 'default',
  title: 'Sømliøya',
  projectId: 'blv6hhaq',
  dataset: 'production',
  plugins: [
    presentationTool({
      previewUrl: {
        baseUrl: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Pages')
          .items([
            S.listItem().title('Home').id('homePage').child(
              S.document().schemaType('homePage').documentId('homePage')
            ),
            S.listItem().title('Activities').id('activitiesPage').child(
              S.document().schemaType('activitiesPage').documentId('activitiesPage')
            ),
            S.listItem().title('Sleeping & Living').id('stayingPage').child(
              S.document().schemaType('stayingPage').documentId('stayingPage')
            ),
            S.listItem().title('About the Island').id('islandPage').child(
              S.document().schemaType('islandPage').documentId('islandPage')
            ),
            S.listItem().title('Rituals').id('ritualsPage').child(
              S.document().schemaType('ritualsPage').documentId('ritualsPage')
            ),
            S.listItem().title('Contact').id('contactPage').child(
              S.document().schemaType('contactPage').documentId('contactPage')
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.includes(context.schemaType)
        ? input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})
