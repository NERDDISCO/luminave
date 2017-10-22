import Animation from './Animation.js'

/**
 * Handle all animations and keep a reference to them.
 */
export default class AnimationManager {
  constructor(param) {
    // A list of animations
    this.list = new Map()

    // Handle devices
    this.deviceManager = param.deviceManager

    this.config = param.config
  }

  register() {
    this.config.animations.forEach(element => {

      const animation = new Animation({
        animationId: element.animationId,
        duration: element.duration,
        timeline: element.timeline,
        deviceManager: this.deviceManager,
        devices: element.devices
      })

      this.add(element.animationId, animation)
    })
  }

  add(animationId, animation) {
    this.list.set(animationId, animation)
  }

  get(animationId) {
    return this.list.get(animationId)
  }
}
