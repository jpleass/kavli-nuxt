import type { KirbyBlock, KirbyLayout } from '#nuxt-kql'

const wordsPerMinute = 250 // Global average.

export const calcTimeToRead = (layouts: KirbyLayout[]) => {
  const blocks =
    layouts
      .flatMap((layout) => layout.columns)
      .flatMap((column) => column.blocks || []) || []
  const textBlocks = blocks.filter(
    (block): block is KirbyBlock<'text'> => block.type === 'text',
  )
  const text = textBlocks
    .map((block) => block.content.text)
    .join(' ')
    .replace(/(<([^>]+)>)/gi, '')
    .split(' ')

  const minutes = text.length / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return readTime
}
