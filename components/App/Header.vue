<script setup lang="ts">
const site = useSite()
</script>

<template>
  <header
    class="sticky top-0 left-0 flex w-full justify-between mb-gap-2 px-gap py-2 z-10"
  >
    <NuxtLink to="/">
      <div class="flex items-center gap-4">
        <div class="w-[57%]">
          <SVGLogo />
        </div>
        <div class="font-bold leading-none w-full">
          institue of <br />
          nanoscience delft
        </div>
      </div>
    </NuxtLink>

    <nav class="flex md:gap-gap-2 gap-gap items-center">
      <router-link
        v-for="page in site.navigationPages"
        :key="page.id"
        class="lowercase font-bold"
        :to="`/${page.uri}`"
      >
        {{ page.title }}
      </router-link>
    </nav>
  </header>
</template>
