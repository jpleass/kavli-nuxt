<template>
  <div class="mx-auto px-gap max-w-[72em] pt-32">
    <div class="grid lg:grid-cols-12 grid-cols-1 gap-gap pb-gap-2">
      <div class="lg:col-span-5 col-span-1">
        <slot name="left" />
      </div>
      <div class="lg:col-span-6 col-span-1">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
