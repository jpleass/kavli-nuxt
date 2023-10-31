import type {
  KirbyBlock,
  KirbyQueryRequest,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'
import type { KirbyImageData } from '.'
import { generateQuery, pageQuery } from '.'
import type { KirbyPageData, KirbyPageDataSlim } from './page'
import { pageQuerySlim } from './page'
import { kirbyImageQuery } from '~/queries'

// PREVIEW DATA
export interface KirbyEventPagePreviewData extends KirbyPageDataSlim {
  type: string
  heading: string
  subheading: string
  dates: (KirbyBlock<'date'> | KirbyBlock<'daterange'>)[]
  location: string
  registerLink: string
  cover: KirbyBlock<'image'>
  images: KirbyImageData[]
}

const eventPagePreviewQuery: KirbyQuerySchema['select'] = {
  type: 'page.type',
  heading: 'page.heading',
  subheading: 'page.subheading',
  dates: 'page.dates.toBlocks',
  location: 'page.location',
  registerLink: 'page.registerLink',
  cover: 'page.cover.toBlocks.first',
  images: {
    query: 'page.images',
    select: kirbyImageQuery,
  },
}

export const getEventItemsQuery = (
  limit: number,
  page: number,
): KirbyQueryRequest =>
  generateQuery(
    'page("events").children.listed',
    { ...pageQuerySlim, ...eventPagePreviewQuery },
    limit,
    page,
  )

// EVENT PAGE DATA
export type KirbyEventPageData = KirbyEventPagePreviewData &
  KirbyPageData & {
    links: {
      id: string
      text: string
      url: string
    }[]
  }
export type KirbyEventPageResponse = KirbyQueryResponse<KirbyEventPageData>
export const getEventPageQuery = (pageId: string): KirbyQuerySchema =>
  generateQuery(`page("${pageId}")`, {
    ...pageQuery,
    ...eventPagePreviewQuery,
    links: 'page.links.toStructure',
  })
