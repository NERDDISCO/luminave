"use strict";

import WebMidi from 'webmidi';
import MidiController from './MidiController';

/**
 * Manage (almost) all MIDI controller that are connected.
 */
export default class MidiManager {
  constructor(param) {

    this.config = param.config;

    // Is Web MIDI enabled yet?
    this.isEnabled = false;

    // List of MIDI controller
    this.list = new Map();

    // Enable Web MIDI
    WebMidi.enable((err) => {

      if (err) {
        console.log('Web MIDI API could not be enabled:', err);
      } else {
        // MIDI input / output ports (from a single device) are connected to the computer
        WebMidi.addListener('connected', function(event) {
          console.log(event.hasOwnProperty('input') ? 'input' : 'output', 'port for device', event.name, 'was added');
        });

        // Web MIDI is enabled
        this.isEnabled = true;

        // Register MIDI controller
        this.register();
      }

    });

  }

  /*
   * Register all MIDI controller
   */
  register() {
    this.config.devices.midi.forEach((element, index, array) => {

      let midiController = new MidiController({
        controllerId: element.controllerId,
        input: element.input,
        output: element.output
      });

      this.list.set(element.controllerId, midiController);
    });
  }
}
