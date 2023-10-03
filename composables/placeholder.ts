import type { NewsPreviewProps } from '~/@types'
import { type KirbyImageData, kirbyImageQuery } from '~/queries'
import { LoremIpsum } from 'lorem-ipsum'
import type { KirbyQueryResponse } from '#nuxt-kql'

export const generatePlaceholderText = (words: number): string => {
  const text = new LoremIpsum().generateWords(words)
  // Sentence case
  return text.charAt(0).toUpperCase() + text.slice(1) + '.'
}

export const generatePlaceholderImageData = async () => {
  const { data: allImageData } = await useKql<
    KirbyQueryResponse<KirbyImageData[]>
  >({
    query: `site.index.files`,
    select: kirbyImageQuery,
  })

  if (allImageData.value.result) {
    const randomImage =
      allImageData.value.result[
        Math.floor(Math.random() * allImageData.value.result.length)
      ]
    return randomImage
  }
  return undefined
}

export const generatePlaceholderNewsPreviewProps = async (
  n: number,
): Promise<NewsPreviewProps[]> => {
  const propsArray = await Promise.all(
    new Array(n).fill(null).map(async () => {
      const image = await generatePlaceholderImageData()
      return {
        heading: generatePlaceholderText(5),
        text: generatePlaceholderText(20),
        date: new Date().toDateString(),
        image,
      }
    }),
  )

  return propsArray
}
