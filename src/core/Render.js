/*
 * Handle the rendering of all animations in a specific timeline / scene.
 */
export default class Render {
  constructor(param) {
    this.config = param.config.getConfig()
    this.configuration = param.config

    this.dmxUsbInterface = param.dmxUsbInterface

    // Reference to all scenes
    this.sceneManager = param.sceneManager

    // Time between now and last time loop was called
    this.delta = 0

    // The last time loop was called
    this.lastTime = 0
  }

  run() {
    // terate over all scenes
    // this.sceneManager.list.forEach(element => {
      // Run each scene
      // element.run(this.delta)

      // Call loop again
      this.dmxUsbInterface.output.requestDmxFrame()

      // Save the config with localStorage
      // window.configuration.sync()
    // })
  }
}
