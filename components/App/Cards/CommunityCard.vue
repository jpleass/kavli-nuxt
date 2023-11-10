<script lang="tsx" setup>
import type { KirbyCommunityPageData } from '~/queries/community'

defineProps<{
  item: KirbyCommunityPageData
}>()
</script>

<template>
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
</template>
