import type {
  KirbyBlock,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'
import { generateQuery } from '.'
import type { KirbyPageData } from './page'
import { pageQuery } from './page'

type NonSplitStringArray = string // Not split.

export interface KirbyCommunityFilter {
  id: string
  tags: NonSplitStringArray
  title: string
}

export interface KirbyCommunityIndexData extends KirbyPageData {
  filters: KirbyCommunityFilter[]
  children: KirbyCommunityPageData[]
}

export interface KirbyCommunityContactInfo {
  tel: string
  email: string
  website: string
  location: string
  twitter: string
  facebook: string
  linkedin: string
}

export interface KirbyCommunityPublication {
  heading: string
  subheading: string
  url: string
}

export interface KirbyCommunityPageData extends KirbyPageData {
  cover: KirbyBlock<'image'>
  name: string
  occupation: string
  filters: Record<string, string[]>
  contact: KirbyCommunityContactInfo
  bio: string
  publications: KirbyCommunityPublication[]
}

const communityPageQuery: KirbyQuerySchema['select'] = {
  cover: 'page.cover.toBlocks.first',
  name: 'page.name',
  occupation: 'page.occupation',
  filters: 'page.getFilters(page.filters)',
  contact: {
    query: 'page',
    select: {
      tel: 'page.tel',
      email: 'page.email',
      website: 'page.website',
      location: 'page.location',
      twitter: 'page.twitter',
      facebook: 'page.facebook',
      linkedin: 'page.linkedin',
    },
  },
  bio: 'page.bio.kt',
  publications: 'page.publications.toStructure',
}

const communityIndexQuery: KirbyQuerySchema['select'] = {
  filters: 'page.filters.toStructure',
  children: {
    query: 'page.children',
    select: {
      ...pageQuery,
      ...communityPageQuery,
    },
  },
}

export type KirbyCommunityIndexResponse =
  KirbyQueryResponse<KirbyCommunityIndexData>
export type KirbyCommunityPageResponse =
  KirbyQueryResponse<KirbyCommunityPageData>

export const getCommunityPageQuery = (pageId: string): KirbyQuerySchema =>
  generateQuery(`page("${pageId}")`, { ...pageQuery, ...communityPageQuery })

export const getCommunityIndexQuery = (): KirbyQuerySchema =>
  generateQuery('page("community")', {
    ...pageQuery,
    ...communityIndexQuery,
  })
