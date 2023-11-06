import type { KirbyQueryResponse, KirbyQuerySchema } from '#nuxt-kql'
import type { KirbyPageDataSlim } from './page'
import { pageQuery } from './page'
import type { LinkData } from './links'
import type { KirbySeoData } from './seo'
import { seoSiteQuery } from './seo'

export interface KirbySiteData {
  title: string
  url: string
  description: string
  navigationPages: KirbyPageDataSlim[]
  children: KirbyPageDataSlim[]
  footer: {
    copyright: string
    links: { id: number; link: LinkData }[]
    logos: { id: string; url: true }[]
    contacts: { id: number; link: LinkData }[]
    newsletter: {
      text: string
      url: string
    }
  }
  seo: KirbySeoData
}

export type KirbySiteResponse = KirbyQueryResponse<KirbySiteData>

export const siteQuery: KirbyQuerySchema = {
  query: 'site',
  select: {
    url: true,
    title: true,
    description: true,
    navigationPages: {
      query: 'site.navigationPages.toPages',
      select: pageQuery,
    },
    children: {
      query: 'site.children',
      select: pageQuery,
    },
    footer: {
      query: 'site',
      select: {
        copyright: 'site.footer_copyright',
        logos: {
          query: 'site.footer_logos.toFiles',
          select: {
            id: true,
            url: true,
          },
        },
        contacts: {
          query: 'site.footer_contacts.toStructure',
        },
        newsletter: {
          query: 'site',
          select: {
            text: 'site.footer_newsletter_text',
            url: 'site.footer_newsletter_url',
          },
        },
        links: {
          query: 'site.footer_links.toStructure',
        },
      },
    },
    seo: {
      query: 'site',
      select: seoSiteQuery,
    },
  },
}
