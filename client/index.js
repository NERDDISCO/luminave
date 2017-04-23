"use strict";

import WebSocketClient from './core/WebSocketClient';
import MidiManager from './core/MidiManager';

// Get the config from the hidden element
var visionLordConfigElement = document.getElementById('VisionLordConfig');
var config = JSON.parse(visionLordConfigElement.value);


// Manage connected MIDI devices
let midiManager = new MidiManager({ config: config });

// Create a WebSocket client to exchange MIDI data
let midiWebSocketClient = new WebSocketClient({
  url: config.server.websocket.url,
  port: config.server.port,
  path: config.server.websocket.path.midi
});

// let output = document.getElementById('outputModV');
// output.innerHTML = "Connection: 💀";
//
// // Listen for messages from the server
// connection.addEventListener('message', (msg) => {
//   // Format the output and show it in the frontend
//   output.innerHTML = "Connection: " + msg.data;
//
//   connection.send(JSON.stringify({ test: 'data' }));
// });
