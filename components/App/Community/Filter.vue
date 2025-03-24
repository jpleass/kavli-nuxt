<script lang="tsx" setup>
import type { KirbyCommunityFilter } from '~/queries/community'
import { Vue3SlideUpDown } from 'vue3-slide-up-down'

const props = defineProps<{
  filters: KirbyCommunityFilter[]
  filterStore: Record<string, string | null>
}>()

const emit = defineEmits<{
  (e: 'update-filter', id: string, value: string | null): void
}>()

const headerStore = useHeader()
const open = ref(false)
const el = ref<HTMLElement | null>(null)
const isCurrentlySticky = ref(false)
const observer = ref<IntersectionObserver | null>(null)
const activeFilters = computed(() => {
  return Object.values(props.filterStore).filter((f) => f !== null) as string[]
})

const updateFilter = (id: string, value: string | null) => {
  emit('update-filter', id, value?.trim() || null)
}
const clearTag = (tag: string) => {
  for (const [key, value] of Object.entries(props.filterStore)) {
    if (value === tag) {
      updateFilter(key, null)
    }
  }
}

const onIntersection = (entries: IntersectionObserverEntry[]) => {
  const entry = entries[0]
  isCurrentlySticky.value = !entry.isIntersecting
}

onMounted(() => {
  observer.value = new IntersectionObserver((e) => onIntersection(e), {
    threshold: [1],
  })
  if (el.value) observer.value.observe(el.value)

  if (window.innerWidth > 768) {
    open.value = true
  }
})
onUnmounted(() => {
  if (el.value) observer.value?.unobserve(el.value)
})
</script>

<template>
  <div ref="el" class="sticky top-[-1px] z-10 md:relative md:top-0">
    <div class="pt-gap">
      <div
        class="rounded-lg transition-all"
        :class="{
          'translate-y-[4.5em] md:translate-y-0':
            !headerStore.isHidden && isCurrentlySticky,
          'bg-white md:bg-transparent': isCurrentlySticky,
          'bg-white  md:bg-transparent bg-opacity-80': !isCurrentlySticky,
        }"
      >
        <div
          class="flex gap-2 border-b border-kavli-bg items-center p-3 md:hidden"
        >
          <div v-if="activeFilters.length" class="w-full flex flex-wrap gap-2">
            <div
              v-for="(filter, index) in activeFilters"
              :key="index"
              class="filter-button"
              @click="clearTag(filter)"
            >
              <div class="flex gap-1">
                <div v-html="filter"></div>
                <div class="font-symbols translate-y-px">close</div>
              </div>
            </div>
          </div>
          <div v-else class="w-full opacity-50" @click="open = !open">
            No filters...
          </div>
          <div>
            <button class="px-2" @click="open = !open">
              <div class="font-symbols scale-150">filter_list</div>
            </button>
          </div>
        </div>

        <Vue3SlideUpDown v-model="open" :duration="300" :opacity-closed="0">
          <div class="flex flex-col gap-gap p-em md:p-0">
            <div v-for="(group, index) in filters" :key="index">
              <div class="md:h5 mb-1" v-html="group.title"></div>

              <div
                class="flex flex-wrap md:flex-col md:items-start gap-1 md:gap-0"
              >
                <button
                  class="md:hover:opacity-100 filter-button md:filter-button-desktop"
                  :class="{
                    'opacity-50': filterStore[group.title] !== null,
                  }"
                  @click="updateFilter(group.title, null)"
                >
                  All
                </button>

                <button
                  v-for="(tag, i) in group.tags.split(',')"
                  :key="i"
                  class="md:hover:opacity-100 md:block filter-button md:filter-button-desktop"
                  :class="{
                    'opacity-50': filterStore[group.title] !== tag,
                  }"
                  @click="updateFilter(group.title, tag)"
                  v-html="tag"
                ></button>
              </div>
            </div>
          </div>
        </Vue3SlideUpDown>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.filter-button {
  @apply p-1 px-2 md:p-0 md:px-0 bg-kavli-bg rounded small md:text-base inline-block md:block text-left;
}
</style>
