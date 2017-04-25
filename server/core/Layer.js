"use strict";

/**
 * Handle animations.
 */
export default class Layer {
  constructor(param) {
    this.animations = param.animations;

    // Reference to all animations
    this.animationManager = param.animationManager;

    // List of animations in this layer
    this.list = [];
  }

  register() {
    // this.animations.forEach((element, index, array) => {
    //   this.list.push(this.animationManager.get(element.animationId));
    // });
  }

  run(progress, delta) {

    this.animations.forEach((element, index, array) => {

      let animation = this.animationManager.get(element.animationId);

      // Start the animation if the start time is reached & duration is not reached yet
      if (progress >= element.start && progress <= (element.start + animation.duration + delta)) {
        animation.run(delta);
      } else {

        // @BUG: This is running forever
        // @TODO: We need a way to know when a layer is done, then kill the animation
        console.log('Layer', 'done');
        animation.stop();
      }

    });
  }
}
