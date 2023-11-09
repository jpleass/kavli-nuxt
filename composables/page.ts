import type { KirbyQueryResponse } from '#nuxt-kql'
import { joinURL } from 'ufo'
import type { KirbyErrorResponse } from '~/queries'
import { getPageQuery } from '~/queries'

/**
 * Returns the currently active page, similar to Kirby's `$page` global variable
 */
export function usePage<T extends Record<string, any> = Record<string, any>>() {
  return useState<T>('app.page', () => ({}) as T)
}

/**
 * Sets the currently active page and updates the document head
 */
export function setPage<T extends Record<string, any>>(page?: T) {
  const pageState = usePageState()

  if (!page) {
    pageState.value = 'rejected'
    return
  }

  usePage().value = page

  // Build the page meta tags
  const { siteUrl } = useRuntimeConfig().public
  const site = useSite()

  const metaTitle = page.seo.metaTitle || page.title
  const title = page.title
    ? `${metaTitle} – ${site.value.title}`
    : site.value.title

  const metaImage = page.seo.metaImage || site.value.seo?.metaImage
  const author = page.seo.author || site.value.seo?.author
  const description =
    page.seo.pageMetaDescription || site.value.seo?.pageMetaDescription
  const url = page.seo.ogUrl || page.url || site.value.url
  const twitterCreator =
    page.seo.twitterCreator || site.value.seo?.twitterCreator

  useHead({
    bodyAttrs: {
      'data-template': page.intendedTemplate || 'default',
    },
    link: [{ rel: 'canonical', href: url }],
  })

  useSeoMeta({
    title,
    description,
    author,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: metaImage,
    ogType: 'website',
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: 'summary',
    twitterImage: metaImage,
    twitterCreator,
  })

  pageState.value = 'resolved'
  setLoading({ loading: false })
}

/**
 * Returns a promise that resolves when the page data has been loaded or rejected
 */
export async function hasPage() {
  const state = usePageState()

  await until(state).not.toBe('pending')
  await nextTick()

  return state.value === 'resolved'
}

function usePageState() {
  return useState<'pending' | 'resolved' | 'rejected'>(
    'app.state.page',
    () => 'pending',
  )
}

export const handlePageData = async <T extends KirbyQueryResponse>(data: T) => {
  // If page content is empty, load the error page
  if (!data?.result) {
    const { data: errorPageData } = await useKql<KirbyErrorResponse>(
      getPageQuery('error'),
    )
    setResponseStatus(useRequestEvent(), 404)
    return errorPageData.value
  }
  return data
}
