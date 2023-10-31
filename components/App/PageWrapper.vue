<template>
  <div class="max-w-[72em] mx-auto px-gap">
    <div class="pb-6">
      <div class="absolute">
        <slot name="breadcrumbs" />
      </div>
    </div>
    <div class="my-gap-2 pb-gap-2">
      <slot name="default" />
    </div>
  </div>
</template>
