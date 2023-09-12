<script setup lang="ts">
import type { KirbyHomePageResponse } from '~/queries'
import { getHomePageQuery } from '~/queries'

const query = getHomePageQuery()
const { data } = await useKql<KirbyHomePageResponse>(query)

const page = data.value?.result
setPage(page)
</script>

<template>
  <div v-if="page">
    <KirbyLayouts v-if="page.layouts" :layouts="page.layouts ?? []" />
  </div>
</template>

<style lang="postcss"></style>
