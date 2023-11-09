let frame = 0
self.onmessage = function (event) {
  const { canvas, video, x, y, width, height } = event.data

  const offscreen = canvas.transferControlToOffscreen()
  const offscreenCtx = offscreen.getContext('2d')

  function draw() {
    if (video.paused || video.ended) return

    if (frame % 3 === 0) {
      offscreenCtx.drawImage(video, x, y, width, height)
      const imageData = offscreenCtx.getImageData(x, y, width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 120 && data[i + 1] > 120 && data[i + 2] > 120) {
          data[i + 3] = 0
        } else {
          data[i] = 243
          data[i + 1] = 177
          data[i + 2] = 129
          data[i + 3] = 255
        }
      }

      offscreenCtx.putImageData(imageData, x, y)
    }

    frame++
    requestAnimationFrame(draw)
  }

  video.play()
  draw()
}
