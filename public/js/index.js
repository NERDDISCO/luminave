"use strict";

// Get the config from the hidden element
var visionLordConfigElement = document.getElementById('VisionLordConfig');
var config = JSON.parse(visionLordConfigElement.value);

// Save config into global scope
window.config = config;

let connection = new WebSocket(config.server.websocket.url + config.server.port + config.server.websocket.path);




let output = document.getElementById('outputModV');

// Listen for messages from the server
connection.addEventListener('message', function(message) {
  // Format the output and show it in the frontend
  output.innerHTML = message.data;
});
