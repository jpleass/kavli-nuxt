<script lang="tsx" setup>
defineProps<{
  type: string
}>()
</script>

<template>
  <div
    class="border font-bold px-8 py-2 cursor-pointer border-current rounded md:hover:text-kavli-blue"
  >
    <slot />
  </div>
</template>
