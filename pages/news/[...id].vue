<script setup lang="ts">
import type { KirbyNewsPageResponse } from '~/queries/news'
import { getNewsPageQuery } from '~/queries/news'

const kirbyPath = useRoute().path
const { data: pageData } = await useKql<KirbyNewsPageResponse>(
  getNewsPageQuery(kirbyPath),
)

const data = pageData?.value

// Set the current page data for the global page context
const page = data?.result
setPage(page)
</script>

<template>
  <AppPageWrapper v-if="page">
    <div class="grid grid-cols-12 grid-gap">
      <div class="col-span-5">
        <div class="mb-gap">
          <AppBreadcrumbs />
        </div>
        <div class="sticky top-24">
          <h4 class="" v-html="page.title" />
          <div class="small mt-gap" v-html="page.date"></div>
          <div class="mt-gap-2 small flex gap-em items-center">
            <div class="leading-tight">Share this<br />page on:</div>

            <ClientOnly>
              <ShareNetwork
                network="twitter"
                :url="page.url"
                :title="page.title"
                :description="page.text"
                :quote="page.text"
              >
                <div class="icon-wrapper">
                  <img class="h-full" src="~/assets/icons/x.svg" />
                </div>
              </ShareNetwork>
            </ClientOnly>

            <ClientOnly>
              <ShareNetwork
                network="facebook"
                :url="page.url"
                :title="page.title"
                :description="page.text"
                :quote="page.text"
              >
                <div class="icon-wrapper">
                  <img class="h-full" src="~/assets/icons/facebook.svg" />
                </div>
              </ShareNetwork>
            </ClientOnly>

            <ClientOnly>
              <ShareNetwork
                network="linkedIn"
                :title="page.title"
                :url="page.url"
              >
                <div class="icon-wrapper">
                  <img class="h-full" src="~/assets/icons/linkedin.svg" />
                </div>
              </ShareNetwork>
            </ClientOnly>
          </div>
        </div>
      </div>
      <div class="col-span-6">
        <div class="mb-gap-2">
          <KirbyBlockImage :block="page.cover" />
        </div>
        <KirbyLayouts v-if="page.layouts" :layouts="page.layouts ?? []" />
      </div>
    </div>
  </AppPageWrapper>
</template>

<style lang="postcss" scoped>
.icon-wrapper {
  @apply w-10 h-10 bg-white rounded-md flex items-center justify-center p-2 relative;
}
</style>
