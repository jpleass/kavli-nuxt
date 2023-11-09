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

const ratio = ref<string | null>(null)
onMounted(() => {
  if (window.innerWidth < 768) {
    ratio.value = '1/1'
  } else {
    ratio.value = '1/1.4'
  }
})
</script>

<template>
  <AppPageWrapper2Columns v-if="page">
    <template #left>
      <AppBreadcrumbs />
      <div class="mt-gap-2 sticky top-20">
        <h4 v-html="page.title" />
        <h4 class="font-normal italic" v-html="page.occupation" />
        <div class="flex flex-col sm:flex-row gap-gap mt-gap">
          <KirbyBlockImage
            v-if="ratio"
            class="lg:w-1/2 w-full"
            :block="page.cover"
            :ratio="ratio"
          />
          <div
            class="sm:flex sm:flex-col grid grid-cols-2 gap-gap caption lg:w-1/2"
          >
            <!-- Filters -->
            <div v-for="(group, key) in page.filters" :key="key">
              <div class="font-bold" v-html="key"></div>
              <div v-for="(tag, i) in group" :key="i" v-html="tag"></div>
            </div>

            <!-- Contact -->
            <div class="flex flex-col gap-em">
              <div class="font-bold -mb-em-half">Contact</div>
              <a
                v-if="page.contact.tel"
                :href="'tel:' + page.contact.tel"
                class="flex gap-em-half link"
              >
                <span class="font-symbols scale-125">phone</span>
                <span v-html="page.contact.tel"></span>
              </a>
              <a
                v-if="page.contact.email"
                :href="'mailto:' + page.contact.email"
                class="flex gap-em-half link"
              >
                <span class="font-symbols scale-125 translate-y-[0.25em]"
                  >alternate_email</span
                >
                <span v-html="page.contact.email"></span>
              </a>
              <a
                v-if="page.contact.website"
                :href="page.contact.website"
                target="_blank"
                class="flex gap-em-half link"
              >
                <span class="font-symbols scale-125">language</span>
                <span v-html="getWebsiteDisplay(page.contact.website)"></span>
              </a>
              <div v-if="page.contact.location" class="flex gap-em-half link">
                <span class="font-symbols scale-125">location_on</span>
                <span v-html="page.contact.location"></span>
              </div>

              <div class="flex gap-2">
                <a
                  v-if="page.contact.twitter"
                  :href="page.contact.twitter"
                  class="icon-wrapper-small md:hover:opacity-70 transition-opacity"
                >
                  <img class="h-full" src="~/assets/icons/x.svg" />
                </a>
                <a
                  v-if="page.contact.facebook"
                  :href="page.contact.facebook"
                  class="icon-wrapper-small md:hover:opacity-70 transition-opacity"
                >
                  <img class="h-full" src="~/assets/icons/facebook.svg" />
                </a>
                <a
                  v-if="page.contact.linkedin"
                  :href="page.contact.linkedin"
                  class="icon-wrapper-small md:hover:opacity-70 transition-opacity"
                >
                  <img class="h-full" src="~/assets/icons/linkedin.svg" />
                </a>
              </div>
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
