<script setup lang="ts">
const site = useSite()
</script>

<template>
  <header class="flex w-full justify-between mb-8">
    <NuxtLink to="/">
      {{ site.title }}
    </NuxtLink>

    <nav class="flex gap-2 items-center">
      <router-link
        v-for="page in site.navigationPages"
        :key="page.id"
        :to="page.uri"
      >
        {{ page.title }}
      </router-link>
    </nav>
  </header>
</template>
