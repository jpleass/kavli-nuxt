import type { KirbyQuerySchema } from '#nuxt-kql'

export type KirbySeoData = {
  metaTitle: string
  pageMetaDescription: string
  canonicalUrl: string
  metaImage: string
  author: string
  date: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogImageWidth: string
  ogImageHeight: string
  ogSiteName: string
  ogUrl: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  twitterSite: string
  twitterCreator: string
}

export const seoPageQuery: KirbyQuerySchema['select'] = {
  metaTitle: 'page.meta_title ? page.meta_title : page.title',
  pageMetaDescription: 'page.meta_description',
  canonicalUrl:
    'page.meta_canonical_url ? page.meta_canonical_url : page.canonicalUrl',
  metaImage:
    'page.meta_image.isNotEmpty ? page.meta_image.toFile.resize(1200, 630, 80, true).url : null',
  author: 'page.meta_author',
  date: 'page.modified',
  ogTitle: 'page.og_title',
  ogDescription: 'page.og_description',
  ogImage:
    'page.og_image ?? page.og_image.toFile.resize(1200, 630, 80, true).url',
  ogSiteName: 'page.og_site_name',
  ogUrl: 'page.og_url ? page.og_url : page.url',
  twitterTitle: 'page.twitter_title',
  twitterDescription: 'page.twitter_description',
  twitterImage:
    'page.twitter_image ?? page.twitter_image.toImage.resize(1200, 630, 80, true).url',
  twitterSite: 'page.twitter_site',
  twitterCreator: 'page.twitter_creator',
}

export const seoSiteQuery: KirbyQuerySchema['select'] = {
  metaTitle: 'site.meta_title ? site.meta_title : site.title',
  pageMetaDescription: 'site.meta_description',
  canonicalUrl:
    'site.meta_canonical_url ? site.meta_canonical_url : site.canonicalUrl',
  metaImage:
    'site.meta_image.isNotEmpty ? site.meta_image.toFile.resize(1200, 630, 80, true).url : null',
  author: 'site.meta_author',
  date: 'site.modified',
  ogTitle: 'site.og_title',
  ogDescription: 'site.og_description',
  ogImage:
    'site.og_image.isNotEmpty ? site.og_image.toFile.resize(1200, 630, 80, true).url : null',
  ogSiteName: 'site.og_site_name',
  ogUrl: 'site.og_url ? site.og_url : site.url',
  twitterTitle: 'site.twitter_title',
  twitterDescription: 'site.twitter_description',
  twitterImage:
    'site.twitter_image ?? site.twitter_image.toFile.resize("1200", "630", "80", true).url',
  twitterSite: 'site.twitter_site',
  twitterCreator: 'site.twitter_creator',
}
