import createImageUrlBuilder from '@sanity/image-url'

const builder = createImageUrlBuilder({ projectId: 'blv6hhaq', dataset: 'production' })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}
