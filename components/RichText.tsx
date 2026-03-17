import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-sans text-smoke font-light leading-[1.85] mt-5 first:mt-0">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-fjord-deep text-xl font-light mt-8 first:mt-0">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
}

export default function RichText({
  value,
  className,
}: {
  value: PortableTextBlock[] | null | undefined
  className?: string
}) {
  if (!value?.length) return null
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  )
}
