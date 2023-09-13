<script setup lang="ts">
const site = useSite()
</script>

<template>
  <footer class="mx-gap-2 mb-gap">
    <div class="bg-white rounded-lg w-full p-gap flex flex-col">
      <div class="w-48">
        <SVGLogoWithText />
      </div>
    </div>
    <div class="small opacity-60 p-gap flex justify-between">
      <div v-html="site.footer.copyright"></div>
      <div class="flex gap-gap">
        <div>Terms of use</div>
        <div>Privacy</div>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
