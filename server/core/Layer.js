"use strict";

import Animation from './Animation';

/**
 * Handle animations.
 */
export default class Layer {
  constructor(param) {
    this.layerId = param.id;

    this.animationConfigs = param.animations;

    // Reference to all animations
    this.animationManager = param.animationManager;

    // Reference to DMX devices
    this.devices = param.devices;

    // List of animations in this layer
    this.animations = [];

    // Is this Layer playing?
    this.isPlaying = false;

    this.register();
  }

  /*
   * Initialize animations that are part of this layer.
   */
  register() {
    this.animationConfigs.forEach((element, index, array) => {

      let instance = this.animationManager.get(element.animationId);

      let animation = new Animation({
        animationId: element.animationId,
        duration: instance.duration,
        start: element.start,
        timeline: instance.timeline,
        deviceManager: instance.deviceManager,
        devices: this.devices
      });

      this.add(animation);
    });
  }

  /*
   * Add animation to the list of animations.
   */
  add(animation) {
    this.animations.push(animation);
  }

  /*
   * Play animations.
   */
  play() {
    this.isPlaying = true;

    // Run all animations
    this.animations.forEach((element, index, array) => {
      // @TODO: Move this into this.stop()
      element.stop();
      element.play();
    });
  }

  /*
   * Stop the playback.
   */
  stop() {
    this.isPlaying = false;
  }


  /*
   * Run the animations based on the progress of the parent Scene "progressScene" and
   * the "delta" between the last iteration and now.
   */
  run(progressScene, delta) {

    if (this.isPlaying) {

      this.count = 0;

      // Run all animations
      this.animations.forEach((element, index, array) => {

        // Start the animation if the start time is reached & duration is not reached yet
        element.run(progressScene, delta);

        // The animation is not stopped yet
        if (element.isPlaying) {
          this.count++;
        }

      });

      // All animations are stopped
      if (this.count === 0) {
        this.stop();
        console.log('Layer', '-', this.layerId, 'stopped');
      }

    }
  }

}
