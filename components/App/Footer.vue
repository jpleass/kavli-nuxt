<script setup lang="ts">
import type { LinkProps } from '~/queries/links'

const site = useSite()
const footerLinks = computed(
  () => site.value.footer?.links.map((link) => link.link) || [],
) as ComputedRef<LinkProps[]>

const footerContacts = computed(
  () => site.value.footer?.contacts.map((link) => link.link) || [],
) as ComputedRef<LinkProps[]>
</script>

<template>
  <footer class="md:mx-gap-2 mx-gap mb-gap overflow-hidden relative z-10">
    <div
      class="bg-white rounded-lg w-full p-gap py-em flex md:flex-row flex-col justify-between items-center"
    >
      <!-- Left -->
      <div class="flex gap-gap items-center">
        <div class="md:w-48 w-32">
          <SVGLogoWithText />
        </div>
        <div class="lg:block h-12 w-px bg-black"></div>
        <div v-for="logo in site.footer?.logos" :key="logo.id">
          <img :src="logo.url" />
        </div>
      </div>

      <!-- Right -->
      <div
        class="flex md:flex-col flex-wrap flex-row xl:flex-row xl:gap-gap gap-em items-center md:items-end xl:items-center mt-gap md:mt-0"
      >
        <UtilsLinkResolver
          v-for="footerLink in footerContacts"
          :key="footerLink.value"
          v-slot="uiLinkProps"
          v-bind="{ ...footerLink }"
        >
          <UILink class="small" v-bind="uiLinkProps" />
        </UtilsLinkResolver>
        <div class="xl:block hidden h-12 w-px bg-black"></div>

        <div v-if="site.footer" class="md:flex gap-em-half items-center hidden">
          <UtilsLinkResolver
            v-slot="uiLinkProps"
            v-bind="{
              type: 'url',
              value: site.footer.newsletter.url,
              text: site.footer.newsletter.text,
            }"
          >
            <UILink v-bind="uiLinkProps" />
          </UtilsLinkResolver>
        </div>
      </div>
    </div>

    <!-- Below footer -->
    <div class="small opacity-60 p-gap flex justify-between">
      <div v-if="site.footer" v-html="site.footer.copyright"></div>

      <!-- Footer links. -->
      <div class="flex gap-gap">
        <UtilsLinkResolver
          v-for="footerLink in footerLinks"
          :key="footerLink.value"
          v-slot="{ url, text }"
          v-bind="{ ...footerLink }"
        >
          <NuxtLink :to="url">
            {{ text }}
          </NuxtLink>
        </UtilsLinkResolver>
      </div>
    </div>
  </footer>
</template>
