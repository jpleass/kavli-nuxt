<script lang="tsx" setup>
import type { KirbyBlock } from "#nuxt-kql";
import type { LinkProps } from "~/queries/links";

type LinkBlock = {
  link: LinkProps;
};

defineProps<{
  block: KirbyBlock<"link", LinkBlock>;
}>();
</script>

<template>
  <UtilsLinkResolver v-slot="uiLinkProps" v-bind="{ ...block.content.link }">
    <UILink v-bind="uiLinkProps" />
  </UtilsLinkResolver>
</template>
