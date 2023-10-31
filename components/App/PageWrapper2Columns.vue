<template>
  <div class="mx-auto px-gap max-w-[72em]">
    <div class="grid md:grid-cols-12 grid-cols-1 gap-gap -mt-4 pb-gap-2">
      <div class="md:col-span-5 col-span-1">
        <slot name="left" />
      </div>
      <div class="md:col-span-6 col-span-1">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
