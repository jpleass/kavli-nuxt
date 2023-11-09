<script lang="tsx" setup>
const canvas = ref<HTMLCanvasElement | null>(null)
import videoURL from '~/assets/videos/kavli_landing_animation-01.mp4'

const ready = ref(false)
onMounted(() => {
  const video = document.createElement('video')
  video.src = videoURL
  video.muted = true
  video.loop = true
  video.crossOrigin = 'anonymous'

  video.addEventListener('loadedmetadata', () => {
    if (canvas.value) {
      ready.value = true
      // Set canvas dimensions to 1920x1080
      canvas.value.width = 1920
      canvas.value.height = 1080
      const ctx = canvas.value.getContext('2d')
      if (!ctx) return
      // ctx.imageSmoothingEnabled = true
      // ctx.imageSmoothingQuality = 'high' // or 'medium' or 'low'

      const draw = () => {
        if (!canvas.value) return
        if (video.paused || video.ended) return

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

        ctx?.drawImage(video, x, y, width, height)

        // Get the image data and manipulate pixel colors
        const imageData = ctx?.getImageData(x, y, width, height)
        if (imageData) {
          const data = imageData.data

          for (let i = 0; i < data.length; i += 4) {
            // Check if the pixel is white (R, G, and B channels are all 255)
            if (data[i] > 120 && data[i + 1] > 120 && data[i + 2] > 120) {
              // Set alpha channel (transparency) to 0 for white pixels
              data[i + 3] = 0
            } else {
              // For non-white pixels, set alpha channel to 255 (fully opaque)
              // Set color for non-white
              data[i] = 243
              data[i + 1] = 177
              data[i + 2] = 129
              data[i + 3] = 255
            }
          }

          // Put the manipulated image data back to the canvas
          ctx?.putImageData(imageData, x, y)
        }

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
    class="w-full h-full object-cover transition-all duration-1000"
    :class="{
      'opacity-0 scale-110 rotate-3': !ready,
      'opacity-100': ready,
    }"
  />
</template>
