let isWorkerPlaying = false
let timeoutId = null

// playback-loop
const loop = () => {

  // Only trigger the next iteration if the loop is actually started
  if (isWorkerPlaying) {
    // Inform the main-thread that we are playing
    postMessage(isWorkerPlaying)

    timeoutId = setTimeout(() => {

      // Trigger the next iteration of the playback-loop
      requestAnimationFrame(loop)

    // Limit the loop to max 60 fps
    }, 1000 / 60)
  }

}

// The main-thread might start or stop the playback-loop
self.addEventListener('message', e => {
  const { isPlaying } = e.data

  // Make sure that the loop can't be started or stopped more than once
  if (isPlaying === isWorkerPlaying) {
    return
  }

  isWorkerPlaying = isPlaying

  if (isWorkerPlaying) {
    loop()
  } else {
    clearTimeout(timeoutId)
  }
})
