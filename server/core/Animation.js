"use strict";

import Color from 'color';
import keytime from 'keytime';

/**
 * A single animation with different sequences
 * Saves the state of the animation
 */
export default class Animation {

  constructor(param) {
    // @TODO: Use this as a factor to control the speed of the animation
    this.speed = param.speed || 1;

    // @TODO: Do we really need this here?
    this.deviceManager = param.deviceManager;

    // A list of dmx devices
    this.devices = param.devices;

    // Duration of this animation
    this.duration = param.duration;

    // Progress in terms of time
    this.progress = 0;

    // The single keyframes
    this.timeline = new keytime(param.timeline);

    // The values of the animation in terms of the point in time
    this.values = [];
  }

  /*
   * Start the animation for the associated devices.
   *
   * @BUG: When the animation is retriggered while it is running, the last color that was send to the device stays forever at the device.
   */
  run(delta) {
    // If animationProgress is smaller than duration we know that duraction is not reached yet
    if ((this.progress + delta) <= this.duration) {
      // So we add the delta to animationProgress
      this.progress += delta;

      this.values = this.timeline.values(this.progress);

      this.devices.forEach((element, index, array) => {
        this.deviceManager.get(element).color = new Color(this.values.color).rgb().string();
      });

    } else {
      // @TODO: Do we really need this?
      console.log('test');
      //this.stop();
    }
  }

  stop() {
    this.progress = 0;

    // Reset all devices
    // @TODO: Is this really ok? If we reset the device, all other animations for this device will also die :/
    this.devices.forEach((element, index, array) => {
      this.deviceManager.get(element).color = new Color(this.timeline.value).rgb().string();
    });
  }

  // @TODO: Implement
  play() {}

  // @TODO: Implement
  pause() {

  }

  // @TODO: Implement
  restart() {

  }

  // @TODO: Implement
  reverse() {

  }
}
