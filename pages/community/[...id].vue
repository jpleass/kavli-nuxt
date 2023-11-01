<script setup lang="ts">
import type { KirbyCommunityPageResponse } from '~/queries/community'
import { getCommunityPageQuery } from '~/queries/community'

const kirbyPath = useRoute().path
const { data } = await useKql<KirbyCommunityPageResponse>(
  getCommunityPageQuery(kirbyPath),
)

// Set the current page data for the global page context
const page = data?.value?.result
setPage(page)

const getWebsiteDisplay = (url: string) => {
  // Get last directory of url
  const urlParts = url.split('/')
  return '/' + urlParts[urlParts.length - 1]
}
</script>

<template>
  <AppPageWrapper2Columns v-if="page">
    <template #left>
      <AppBreadcrumbs />
      <div class="mt-gap-2 sticky top-20">
        <h4 v-html="page.title" />
        <h4 class="font-normal italic" v-html="page.occupation" />
        <div class="flex gap-gap mt-gap">
          <KirbyBlockImage :block="page.cover" />
          <div class="flex flex-col gap-gap caption">
            <div v-for="(item, i) in page.other" :key="i">
              <div class="font-bold" v-html="item.title"></div>
              <div v-html="item.text"></div>
            </div>
            <div class="font-bold -mb-em-half">Contact</div>
            <a :href="'tel:' + page.contact.tel" class="flex gap-em-half link">
              <span class="font-symbols scale-125">phone</span>
              <span v-html="page.contact.tel"></span>
            </a>
            <a
              :href="'mailto:' + page.contact.email"
              class="flex gap-em-half link"
            >
              <span class="font-symbols scale-125 translate-y-[0.25em]"
                >alternate_email</span
              >
              <span v-html="page.contact.email"></span>
            </a>
            <a
              :href="page.contact.website"
              target="_blank"
              class="flex gap-em-half link"
            >
              <span class="font-symbols scale-125">language</span>
              <span v-html="getWebsiteDisplay(page.contact.website)"></span>
            </a>
            <div class="flex gap-em-half link">
              <span class="font-symbols scale-125">location_on</span>
              <span v-html="page.contact.location"></span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #right>
      <AppSection class="mt-gap-2 pt-gap">
        <h5 class="font-bold mb-em-half">Bio & Activities</h5>
        <div v-router-links class="body-text" v-html="page.bio"></div>
      </AppSection>
      <AppSection v-if="page.publications.length">
        <h5 class="font-bold mb-em-half">Publications</h5>
        <div class="flex gap-gap flex-col mt-gap">
          <div v-for="(pub, i) in page.publications" :key="i">
            <UtilsLinkResolver
              v-slot="uiLinkProps"
              :type="'url'"
              :value="pub.url"
              :text="pub.heading"
            >
              <UILink v-bind="uiLinkProps"> </UILink>
            </UtilsLinkResolver>
            <div
              class="ml-[2em] caption text-kavli-blue"
              v-html="pub.subheading"
            ></div>
          </div>
        </div>
      </AppSection>
    </template>
  </AppPageWrapper2Columns>
</template>
