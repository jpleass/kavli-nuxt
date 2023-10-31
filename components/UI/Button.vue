<script lang="tsx" setup>
defineProps<{
  type: string
}>()
</script>

<template>
  <div
    class="font-bold px-8 py-2 cursor-pointer border-current rounded transition-colors"
    :class="{
      'bg-kavli-peach md:hover:bg-kavli-peach-dark border border-kavli-peach':
        type === 'primary',
      'border md:hover:text-kavli-blue': type === 'secondary',
    }"
  >
    <slot />
  </div>
</template>
