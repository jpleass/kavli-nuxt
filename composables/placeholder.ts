import type { NewsPreviewProps } from '~/@types'
import { type KirbyImageData, kirbyImageQuery } from '~/queries'
import { LoremIpsum } from 'lorem-ipsum'
import type { KirbyBlock, KirbyQueryResponse } from '#nuxt-kql'

export const generatePlaceholderText = (words: number): string => {
  const text = new LoremIpsum().generateWords(words)
  // Sentence case
  return text.charAt(0).toUpperCase() + text.slice(1) + '.'
}

export const generatePlaceholderImageBlock = async () => {
  const { data: allImageData } = await useKql<
    KirbyQueryResponse<KirbyImageData[]>
  >({
    query: `site.index.files`,
    select: kirbyImageQuery,
  })

  if (allImageData.value.result) {
    const randomImage: KirbyImageData =
      allImageData.value.result[
        Math.floor(Math.random() * allImageData.value.result.length)
      ]

    const block: KirbyBlock<'image'> = {
      id: randomImage.uuid,
      isHidden: false,
      type: 'image',
      content: {
        location: 'web',
        image: [randomImage.uuid],
        src: randomImage.src,
        alt: randomImage.alt,
        caption: randomImage.caption,
        ratio: 'auto',
        crop: false,
      },
    }
    return block
  }
  return undefined
}

export const generatePlaceholderNewsPreviewProps = async (
  n: number,
): Promise<NewsPreviewProps[]> => {
  const propsArray = await Promise.all(
    new Array(n).fill(null).map(async () => {
      const image = await generatePlaceholderImageBlock()
      return {
        title: generatePlaceholderText(12),
        text: generatePlaceholderText(20),
        date: new Date().toDateString(),
        cover: image,
      }
    }),
  )

  return propsArray
}
