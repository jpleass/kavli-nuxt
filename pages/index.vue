<script setup lang="ts">
import type { KirbyHomePageResponse } from '~/queries'
import { getHomePageQuery } from '~/queries'

const query = getHomePageQuery()
const { data } = await useKql<KirbyHomePageResponse>(query)

const page = data.value?.result
setPage(page)
</script>

<template>
  <div>
    <!-- Body -->
    <AppSection>
      <KirbyLayouts v-if="page && page.layouts" :layouts="page.layouts ?? []" />
    </AppSection>
  </div>
</template>

<style lang="postcss"></style>
