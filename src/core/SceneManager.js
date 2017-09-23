"use strict";

import Scene from './Scene';

/**
 * Handle all scenes.
 * @TODO: Listen to MIDI events and start scenes accordingly
 */
export default class SceneManager {
  constructor(param) {
    this.list = new Map();
    this.config = param.config;

    // Reference to all animations
    this.animationManager = param.animationManager;
  }

  register() {

    // Initialize all scenes
    this.config.scenes.forEach((element, index, array) => {

      let scene = new Scene({
        config: element,
        id: element.sceneId,
        name: element.name,
        animationManager: this.animationManager
      });

      this.add(element.sceneId, scene);
    });

  }

  add(sceneId, scene) {
    this.list.set(sceneId, scene);
  }

  get(sceneId) {
    return this.list.get(sceneId);
  }
}
