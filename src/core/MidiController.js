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

    // Layout & mapping
    this.layout = param.layout;

    // Mapped elements
    this.elementMapping = new Map();

    // Input is defined
    if (this.input) {
      // Map input elements to an internal identifier
      this.mapping();

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

    // Mapping exists for this note
    if (this.elementMapping.get(note) !== undefined) {
      let eventData = {
        controllerId: this.controllerId,
        partId: this.elementMapping.get(note).partId
      };

      console.log('MidiContoller|map', '-', 'noteon', eventData);

      eventService.emit('MidiController', eventData);
    } else {
      console.log('MidiContoller|raw', '-', 'noteon', note);
    }

  }

  mapping() {
    // Create a mapping for the input elements of the controller
    this.layout.parts.forEach((element, index, array) => {
      // MIDI note => partId
      this.elementMapping.set(element.note, element);
    });
  }
}
