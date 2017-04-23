"use strict";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

/**
 * Handles the WebSocket connection to the server.
 *
 * {String} url - The URL of the WebSocket-Server, e.g. ws://localhost:
 * {Number} port - The port of the WebSocket-Server, e.g. 3000
 * {String} path - The path of the WebSocket-Server, e.g. /midi
 */
export default class WebSocketClient {
  constructor(param) {
    this.url = param.url;
    this.port = param.port;
    this.path = param.path;

    // Create a connection to the server
    this.connection = new WebSocket(this.url + this.port + this.path);

    // Listen for messages from the server
    this.connection.addEventListener('message', this.fromServer.bind(this));


    var midi$ = Observable.fromEvent(document.body, 'MidiControllerEvent');

    // Subscribe to the ndAudioEvent stream
    midi$.subscribe(midiEvent => {
      console.log(midiEvent);

      this.connection.send(JSON.stringify(midiEvent.data));
    });
  }

  fromServer(message) {
    console.log("this is from", message);
  }
}
