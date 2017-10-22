import Layer from './Layer.js'
// Import { Observable, fromEvent, filter } from '/node_modules/@reactivex/rxjs/index.js'

/**
 * A set of animations & DMX devices that can be controlled by using MIDI devices.
 *
 * - Control a set of animations
 * - Each animation is in it's own layer
 * - Each animation gets initialized in a scene
 * - A scene can be played / paused / restarted
 * - A scene is coupled to a MIDI input
 * - Creates the connection between DMX devices, animations & MIDI devices
 * - Each animation in each layer can start at any point in time
 * - Manages the status of playback for each animation
 */
export default class Scene {
  constructor(param) {
    this.id = param.id
    this.name = param.name

    this.config = param.config

    // Reference to all animations
    this.animationManager = param.animationManager

    // The layers of this scene
    this.layers = []

    // Reference to the MIDI device thate is associated with the scene
    this.midi = this.config.midi

    // The progress in terms of time of this scene
    this.progress = 0

    // Is this scene playing?
    this.isPlaying = false

    this.count = 0

    this.register()

    this.listen()
  }

  register() {
    this.config.layers.forEach(element => {

      const layer = new Layer({
        id: element.layerId,
        animations: element.animations,
        animationManager: this.animationManager,
        devices: element.devices
      })

      this.add(element.layerId, layer)

    })
  }

  add(layerId, layer) {
    this.layers.push(layer)
  }

  play() {
    this.isPlaying = true

    this.layers.forEach(element => {
      // @TODO: Move this into this.stop()
      element.stop()
      element.play()
    })
  }

  stop() {
    this.isPlaying = false
    this.progress = 0
  }

  /*
   * - Iterate over all layers and run them
   * - Keep track of the progress
   */
  run(delta) {
    if (this.isPlaying) {

      this.progress += delta

      this.count = 0

      this.layers.forEach((element, index, array) => {
        element.run(this.progress, delta)

        if (element.isPlaying === true) {
          this.count++
        }
      })

      if (this.count === 0) {
        this.stop()

        console.log('Scene', '-', this.id, 'stopped')
      }

    }
  }

  /*
   * Listen to events to start this Scene.
   *
   * @TODO: Does this make any sense at this position / class?
   */
  listen() {

    window.addEventListener('MidiController', event => {
      const data = event.detail


      // Only allow the MIDI controller that was attachted to this scene
      if (data.controllerId === this.midi.controllerId) {

        // Only allow a specific input element (button or knob) from the MIDI controller
        if (data.partId === this.midi.partId) {
          this.stop()
          this.play()
        }
      }
    })
  }
}
