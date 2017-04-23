"use strict";

import Layer from './Layer';

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
    this.id = param.id;
    this.name = param.name;

    this.config = param.config;

    // Reference to all animations
    this.animationManager = param.animationManager;

    // The layers of this scene
    this.layers = [];

    // Reference to the MIDI device that is associated with the scene
    this.midi = this.config.midi;

    // The progress in terms of time of this scene
    this.progress = 0;

    this.register();
  }

  register() {
    this.config.layers.forEach((element, index, array) => {

      let layer = new Layer({
        id: element.layerId,
        animations: element.animations,
        animationManager: this.animationManager
      });

      this.add(element.layerId, layer);

    });
  }

  add(layerId, layer) {
    this.layers.push(layer);
  }

  /*
   * - Iterate over all layers and run them
   * - Keep track of the progress
   */
  run(delta) {
    this.progress += delta;

    this.layers.forEach((element, index, array) => {
      element.run(this.progress, delta);
    });
  }
}
