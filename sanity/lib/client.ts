import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'blv6hhaq',
  dataset: 'production',
  apiVersion: '2026-03-16',
  useCdn: true,
})
