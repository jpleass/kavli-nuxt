<script lang="tsx" setup>
const page = usePage()
</script>

<template>
  <div class="small flex gap-em items-center">
    <div class="leading-tight">Share this<br />page on:</div>

    <ClientOnly>
      <ShareNetwork network="twitter" :url="page.url" :title="page.title">
        <div class="icon-wrapper">
          <img class="h-full" src="~/assets/icons/x.svg" />
        </div>
      </ShareNetwork>
    </ClientOnly>

    <ClientOnly>
      <ShareNetwork network="facebook" :url="page.url" :title="page.title">
        <div class="icon-wrapper">
          <img class="h-full" src="~/assets/icons/facebook.svg" />
        </div>
      </ShareNetwork>
    </ClientOnly>

    <ClientOnly>
      <ShareNetwork network="linkedIn" :title="page.title" :url="page.url">
        <div class="icon-wrapper">
          <img class="h-full" src="~/assets/icons/linkedin.svg" />
        </div>
      </ShareNetwork>
    </ClientOnly>
  </div>
</template>

<style lang="postcss" scoped>
.icon-wrapper {
  @apply w-10 h-10 bg-white rounded-md flex items-center justify-center p-2 relative;
}
</style>
