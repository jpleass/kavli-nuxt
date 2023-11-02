<script setup lang="ts">
import type {
  KirbyCommunityIndexResponse,
  KirbyCommunityPageData,
} from '~/queries/community'
import { getCommunityIndexQuery } from '~/queries/community'

const query = getCommunityIndexQuery()
const { data: pageData } = await useKql<KirbyCommunityIndexResponse>(query)
// Set the current page data for the global page context
const page = pageData?.value?.result
setPage(page)

const filterStore = ref<Record<string, string | null>>({})

// Set filterStoreGroups
page?.filters?.forEach((group) => {
  filterStore.value[group.title] = null
})

const communityMembers = ref(page?.children ?? [])
const fiteredCommunityMembers = computed<KirbyCommunityPageData[]>(() => {
  const members = communityMembers.value
  // Filter is reductive, so only items that have all the filters are shown.
  const filteredMembers = members.filter((member) => {
    let show = true
    for (const [key, value] of Object.entries(filterStore.value)) {
      if (value === null) continue
      if (!member.filters[key].includes(value)) {
        show = false
        break
      }
    }
    return show
  })
  return filteredMembers
})
</script>

<template>
  <AppPageWrapper v-if="page">
    <AppSection>
      <KirbyLayouts v-if="page.layouts" :layouts="page.layouts ?? []" />
    </AppSection>

    <AppSection class="mt-gap-2 pt-gap-2">
      <div class="grid lg:grid-cols-10 grid-cols-1">
        <aside class="col-span-2 hidden lg:block">
          <div
            v-for="(group, index) in page.filters"
            :key="index"
            class="mb-gap"
          >
            <div class="h5 mb-1" v-html="group.title"></div>
            <div>
              <div>
                <button
                  class="md:hover:opacity-100"
                  :class="{
                    'opacity-50': filterStore[group.title] !== null,
                  }"
                  @click="filterStore[group.title] = null"
                >
                  All
                </button>
              </div>
              <div v-for="(tag, i) in group.tags.split(',')" :key="i">
                <button
                  class="md:hover:opacity-100"
                  :class="{
                    'opacity-50': filterStore[group.title] !== tag,
                  }"
                  @click="filterStore[group.title] = tag"
                  v-html="tag"
                ></button>
              </div>
            </div>
          </div>
        </aside>

        <div class="col-span-8">
          <div class="grid lg:grid-cols-4 grid-cols-2 gap-gap">
            <NuxtLink
              v-for="(item, i) in fiteredCommunityMembers"
              :key="i"
              :to="`/${item.uri}`"
            >
              <div class="rounded-md overflow-hidden">
                <KirbyBlockImage
                  :block="item.cover"
                  :collection="item.images"
                  :ratio="'2/3'"
                />
              </div>
              <div class="my-em-half font-bold" v-html="item.name"></div>
              <div
                v-for="(group, key) in item.filters"
                :key="key"
                class="small mb-em-half"
                :class="{
                  hidden: group.length === 0,
                }"
              >
                <div class="font-bold" v-html="key"></div>
                <div v-for="(tag, index) in group" :key="index" class="inline">
                  <span v-html="tag"></span>
                  <span v-if="index < group.length - 1">, </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </AppSection>
  </AppPageWrapper>
</template>
