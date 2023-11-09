<script lang="tsx" setup>
import { setLoading, useLoading } from '~/composables/loader'

const router = useRouter()
const localLoadingStateTimer = ref<NodeJS.Timeout | null>(null)
const localLoadingState = ref(false)

router.beforeEach(() => {
  setLoading({ loading: true })
})

const loading = computed(() => {
  return useLoading().value.loading
})

// Only show loading state if it takes longer than 250ms to load
watch(loading, (value) => {
  if (value) {
    localLoadingStateTimer.value = setTimeout(() => {
      localLoadingState.value = value
    }, 250)
  } else {
    localLoadingStateTimer.value && clearTimeout(localLoadingStateTimer.value)
    localLoadingState.value = value
  }
})
</script>

<template>
  <Transition name="loading">
    <div
      v-if="localLoadingState"
      class="fixed top-0 left-0 z-50 w-full h-full bg-white opacity-50 pointer-events-none"
    ></div>
  </Transition>
</template>

<style>
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.3s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
</style>
