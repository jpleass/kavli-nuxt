import type {
  KirbyBlock,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'
import { generateQuery } from '.'
import type { KirbyPageData } from './page'
import { pageQuery } from './page'

export interface KirbyCommunityPageData extends KirbyPageData {
  cover: KirbyBlock<'image'>
  name: string
  occupation: string
  other: {
    title: string
    text: string
  }[]
  contact: {
    tel: string
    email: string
    website: string
    location: string
    twitter: string
    facebook: string
    linkedin: string
  }
  bio: string
  publications: {
    heading: string
    subheading: string
    url: string
  }[]
}

const communityPageQuery: KirbyQuerySchema['select'] = {
  cover: 'page.cover.toBlocks.first',
  name: 'page.name',
  occupation: 'page.occupation',
  other: 'page.other.toStructure',
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

export type KirbyCommunityPageResponse =
  KirbyQueryResponse<KirbyCommunityPageData>

export const getCommunityPageQuery = (pageId: string): KirbyQuerySchema =>
  generateQuery(`page("${pageId}")`, { ...pageQuery, ...communityPageQuery })
