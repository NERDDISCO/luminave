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

  /*
   * Start rendering all elements in "list" by using the desired fps
   */
  start(fps) {
    // @TODO: Is this correct? Don't we need to just call loop?
    this.dmxUsbInterface.output.requestDmxFrame(time => this.loop(time))

    // Start the DMX output with the specified fps
    this.dmxUsbInterface.output.start(1000 / fps)
  }

  loop(time) {
    // Delta between the current call and the last time loop was called
    this.delta = time - this.lastTime

    // terate over all scenes
    this.sceneManager.list.forEach(element => {
      // Run each scene
      element.run(this.delta)
    })

    // Save the current time into lastTime so we can calculate the delta for the next call of loop
    this.lastTime = time

    // Call loop again
    this.dmxUsbInterface.output.requestDmxFrame(this.loop.bind(this))

    // Save the config with localStorage
    this.configuration.sync()
  }
}
