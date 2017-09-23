"use strict";

import EventEmitter2 from 'eventemitter2';

/**
 * Handles events between services in a kindof "pub/sub" style, well, nope, but still :/
 * You can import the instance of EventService into your Class and listen to "global" events.
 *
 * @example
 * import { eventService } from './EventService';
 *
 * class MyClass {
 *   constructor() {
 *     // Listen to eventName
 *     eventService.on("eventName", (eventData) => {});
 *
 *     // Send a event with name "eventName" that contains the data from "eventData"
 *     eventService.emit("eventName", eventData);
 *   }
 * }
 *
 */
export default class EventService extends EventEmitter2 {
  constructor(param) {
    super();
  }
}

export let eventService = new EventService();
