"use strict";

import WebMidi from 'webmidi';

/**
 * Handle the input / output port of a single MIDI controller.
 *
 * {String} controllerId - Unqiue identifier for this controller
 * {String} input - The name of the input port
 * {String} output - The name of the output port
 */
export default class MidiController {
  constructor(param) {
    this.controllerId = param.controllerId;

    // Get a reference to the input port
    this.input = WebMidi.getInputByName(param.input);

    // Get a reference to the output port
    this.output = WebMidi.getOutputByName(param.output);

    // Listen von "noteon" events
    this.input.addListener('noteon', 'all', this.noteon.bind(this));

    // Create a CustomEvent
    this.event = new CustomEvent("MidiControllerEvent", { data: {} });
  }

  /*
   * Handle "noteon" messages
   */
  noteon(e) {
    let data = e.data;
    let note = data[1];
    let velocity = data[2];

    console.log(note, velocity);

    this.event = new CustomEvent("MidiControllerEvent", { data: {} });

    let eventData = {
      note: note,
      controllerId: this.controllerId
    };

    this.event.data = eventData;

    document.body.dispatchEvent(this.event);
  }
}
