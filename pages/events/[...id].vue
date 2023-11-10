<script setup lang="ts">
import type { KirbyEventPageResponse } from '~/queries/events'
import { getEventPageQuery } from '~/queries/events'

const headerStore = useHeader()
const kirbyPath = useRoute().path
const { data: pageData } = await useKql<KirbyEventPageResponse>(
  getEventPageQuery(kirbyPath),
)

const data = pageData?.value

// Set the current page data for the global page context
const page = data?.result
setPage(page)
</script>

<template>
  <AppPageWrapper2Columns v-if="page">
    <template #left>
      <div
        class="sticky top-gap transition-transform duration-200"
        :class="{
          'md:translate-y-24':
            !headerStore.isHidden && !headerStore.isAboveThreshold,
        }"
      >
        <h4 v-reveal v-html="page.heading || page.title" />
        <h4
          v-if="page.subheading"
          v-reveal
          class="font-normal"
          v-html="page.subheading"
        />

        <div v-reveal class="flex gap-gap mt-gap pt-gap caption">
          <div class="flex gap-1">
            <div class="font-symbols">calendar_month</div>
            <UtilsDates :dates="page.dates" />
          </div>
          <div class="flex gap-1">
            <div class="font-symbols">location_on</div>
            <div v-html="page.location"></div>
          </div>
        </div>

        <div v-reveal class="flex gap-gap mt-gap caption">
          <a :href="page.registerLink" target="_blank">
            <UIButton :type="'primary'">Register</UIButton>
          </a>
          <a v-for="link in page.links" :key="link.url" :href="link.url">
            <UIButton :type="'secondary'">{{ link.text }}</UIButton>
          </a>
        </div>

        <AppSocialShare v-reveal class="mt-gap-2 pb-gap" />
      </div>
    </template>
    <template #right>
      <div v-reveal class="mb-gap-2 max-w-sm">
        <KirbyBlockImage :block="page.cover" />
      </div>
      <KirbyLayouts v-if="page.layouts" :layouts="page.layouts ?? []" />
    </template>
  </AppPageWrapper2Columns>
</template>
