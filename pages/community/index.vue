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

    <ClientOnly>
      <AppSection v-reveal class="md:mt-gap-2 md:pt-gap-2">
        <div class="md:grid md:grid-cols-10 gap-gap-2">
          <AppCommunityFilter
            class="md:col-span-2"
            :filters="page.filters"
            :filter-store="filterStore"
            @update-filter="(id, value) => (filterStore[id] = value)"
          />

          <div class="md:col-span-8 mt-gap">
            <div class="grid md:grid-cols-4 grid-cols-2 gap-gap">
              <NuxtLink
                v-for="(item, i) in fiteredCommunityMembers"
                :key="i"
                :to="`/${item.uri}`"
              >
                <AppCardsCommunityCard :item="item" />
              </NuxtLink>
              <div v-if="fiteredCommunityMembers.length === 0">
                No members found...
              </div>
            </div>
          </div>
        </div>
      </AppSection>
    </ClientOnly>
  </AppPageWrapper>
</template>
