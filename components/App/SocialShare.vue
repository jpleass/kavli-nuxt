<script lang="tsx" setup>
const page = usePage()
</script>

<template>
  <div class="small flex gap-em-half items-center">
    <div class="leading-tight mr-1">Share this<br />page on:</div>

    <ClientOnly>
      <ShareNetwork network="twitter" :url="page.url" :title="page.title">
        <div class="icon-wrapper md:hover:opacity-70 transition-opacity">
          <img class="h-full" src="~/assets/icons/x.svg" />
        </div>
      </ShareNetwork>
    </ClientOnly>

    <ClientOnly>
      <ShareNetwork network="facebook" :url="page.url" :title="page.title">
        <div class="icon-wrapper md:hover:opacity-70 transition-opacity">
          <img class="h-full" src="~/assets/icons/facebook.svg" />
        </div>
      </ShareNetwork>
    </ClientOnly>

    <ClientOnly>
      <ShareNetwork network="linkedIn" :title="page.title" :url="page.url">
        <div class="icon-wrapper md:hover:opacity-70 transition-opacity">
          <img class="h-full" src="~/assets/icons/linkedin.svg" />
        </div>
      </ShareNetwork>
    </ClientOnly>
  </div>
</template>
