import type { KirbyBlock, KirbyLayout } from '#nuxt-kql'

export function usePreviousBlock(id: string): KirbyBlock | undefined {
  const page = usePage()
  const blocks: KirbyBlock[] =
    page.value?.layouts.flatMap((layout: KirbyLayout) =>
      layout.columns.flatMap((col) => col.blocks),
    ) ?? []
  const index = blocks.findIndex((block: KirbyBlock) => block.id === id)
  const previousBlock = blocks[index - 1]
  return previousBlock
}
