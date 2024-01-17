<template>
  <div>
    <ClientOnly>
      <div
        class="max-w-[72em] mx-auto md:px-gap-2 px-gap pt-16 lg:pt-32 min-h-screen"
      >
        <div class="pb-6">
          <div class="absolute">
            <slot name="breadcrumbs" />
          </div>
        </div>
        <div class="my-gap-2 pb-gap-2">
          <slot name="default" />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
