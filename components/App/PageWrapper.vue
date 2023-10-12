<template>
  <div class="max-w-[72em] mx-auto px-gap">
    <div class="absolute top-0">
      <slot name="breadcrumbs" />
    </div>
    <div class="my-gap-2 pb-gap-2">
      <slot name="default" />
    </div>
  </div>
</template>
