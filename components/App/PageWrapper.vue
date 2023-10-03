<template>
  <div class="max-w-[62em] mx-auto px-gap">
    <div class="absolute top-0">
      <slot name="breadcrumbs" />
    </div>
    <div class="my-gap-2 pb-gap-2">
      <slot name="content" />
    </div>
  </div>
</template>
