import type { Vue3Lottie } from 'vue3-lottie'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    LottieAnimation: typeof Vue3Lottie
  }
}
export {}
