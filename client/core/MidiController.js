"use strict";

import WebMidi from 'webmidi';
import { eventService } from './EventService';

/**
 * Handle the input / output port of a single MIDI controller.
 *
 * @param {string} controllerId - Unqiue identifier for this controller
 * @param {string} input - The name of the input port
 * @param {string} output - The name of the output port
 */
export default class MidiController {
  constructor(param) {
    this.controllerId = param.controllerId;

    // Get a reference to the input port
    this.input = WebMidi.getInputByName(param.input);

    // Get a reference to the output port
    this.output = WebMidi.getOutputByName(param.output);

    // Input is defined
    if (this.input) {
      // Listen to "noteon" events
      this.input.addListener('noteon', 'all', this.noteon.bind(this));
    }

  }

  /*
   * Handle "noteon" events
   */
  noteon(event) {
    let data = event.data;
    let note = data[1];
    let velocity = data[2];

    let eventData = {
      note: note,
      controllerId: this.controllerId
    };

    eventService.emit('MidiController', eventData);
  }
}
