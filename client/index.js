"use strict";

import MidiManager from './midi/MidiManager';

new MidiManager();

// Get the config from the hidden element
var visionLordConfigElement = document.getElementById('VisionLordConfig');
var config = JSON.parse(visionLordConfigElement.value);

// Save config into global scope
window.config = config;

let connection = new WebSocket(config.server.websocket.url + config.server.port + config.server.websocket.path);




let output = document.getElementById('outputModV');
output.innerHTML = "Connection: 💀";

// Listen for messages from the server
connection.addEventListener('message', (msg) => {
  // Format the output and show it in the frontend
  output.innerHTML = "Connection: " + msg.data;

  connection.send(JSON.stringify({ test: 'data' }));
});
