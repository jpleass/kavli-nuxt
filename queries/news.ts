import type {
  KirbyBlock,
  KirbyQueryRequest,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'
import { generateQuery } from '.'
import type { KirbyPageData } from './page'
import { pageQuery } from './page'

export interface KirbyNewsPagePreviewData extends KirbyPageData {
  date: string
  cover: KirbyBlock<'image'>
  text: string
}

const newsPageQuery: KirbyQuerySchema['select'] = {
  date: 'page.date.toDate("D M m, Y")',
  text: 'page.text.kt',
  cover: 'page.cover.toBlocks.first',
}

export const getNewsItemsQuery = (
  limit: number,
  page: number,
): KirbyQueryRequest =>
  generateQuery(
    'page("news").children.listed',
    { ...pageQuery, ...newsPageQuery },
    limit,
    page,
  )

export const getLatestNewsQuery = (pageId: string): KirbyQuerySchema =>
  generateQuery(`page("${pageId}").latestNews`, {
    ...pageQuery,
    ...newsPageQuery,
  })

export type KirbyNewsPageData = KirbyNewsPagePreviewData
export type KirbyNewsPageResponse = KirbyQueryResponse<KirbyNewsPageData>

export const getNewsPageQuery = (pageId: string): KirbyQuerySchema =>
  generateQuery(`page("${pageId}")`, { ...pageQuery, ...newsPageQuery })
