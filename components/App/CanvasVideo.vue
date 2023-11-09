<script lang="tsx" setup>
const props = defineProps<{
  playVideo: boolean
  color: {
    red: number
    green: number
    blue: number
  }
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
import videoURL from '~/assets/videos/kavli_landing_animation-1920.mp4'
import mobileVideoUrl from '~/assets/videos/kavli_landing_animation-1024.mp4'

const ready = ref(false)
let frame = 0

onMounted(() => {
  const video = document.createElement('video')
  video.src = window.innerWidth < 768 ? mobileVideoUrl : videoURL
  video.muted = true
  video.loop = true
  video.playsInline = true
  video.crossOrigin = 'anonymous'

  video.addEventListener('loadedmetadata', () => {
    const color = props.color

    if (canvas.value) {
      ready.value = true
      // Set canvas dimensions to 1920x1080
      canvas.value.width = window.innerWidth > 1024 ? 1920 : 1024
      canvas.value.height = window.innerWidth > 1024 ? 1080 : 576
      const ctx = canvas.value.getContext('2d', {
        willReadFrequently: true,
      })
      if (!ctx) return

      // Scale the video to fit the canvas dimensions
      const scale = Math.min(
        canvas.value.width / video.videoWidth,
        canvas.value.height / video.videoHeight,
      )
      const width = video.videoWidth * scale
      const height = video.videoHeight * scale

      // Center the video on the canvas
      const x = (canvas.value.width - width) / 2
      const y = (canvas.value.height - height) / 2

      const draw = () => {
        if (!canvas.value) return
        if (video.paused || video.ended) return

        if (frame % 2 === 0 && props.playVideo) {
          ctx?.drawImage(video, x, y, width, height)
          // Get the image data and manipulate pixel colors
          const imageData = ctx?.getImageData(x, y, width, height)
          if (imageData) {
            const data = imageData.data

            for (let i = 0; i < data.length; i += 4) {
              // Check if the pixel is white (R, G, and B channels are all 255)
              if (data[i] > 128 && data[i + 1] > 128 && data[i + 2] > 128) {
                // Set alpha channel (transparency) to 0 for white pixels
                data[i + 3] = 0
              } else {
                // For non-white pixels, set alpha channel to 255 (fully opaque)
                // Set color for non-white
                const { red, green, blue } = color
                data[i] = red
                data[i + 1] = green
                data[i + 2] = blue

                data[i + 3] = 255
              }
            }

            // Put the manipulated image data back to the canvas
            ctx?.putImageData(imageData, x, y)
          }
        }

        frame++
        requestAnimationFrame(draw)
      }

      video.play()
      draw()
    }
  })
})
</script>

<template>
  <canvas
    ref="canvas"
    class="w-full h-full object-cover transition-all dur3tion-1000"
    :class="{
      'opacity-0 scale-110 rotate-3': !ready,
      'opacity-100': ready,
    }"
  />
</template>
