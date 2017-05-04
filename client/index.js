"use strict";

import WebSocketClient from './core/WebSocketClient';
import MidiManager from './core/MidiManager';

// Get the config from the hidden element
var visionLordConfigElement = document.getElementById('VisionLordConfig');
var config = JSON.parse(visionLordConfigElement.value);
console.log('config', '-', 'loaded for', config.name);


// Manage connected MIDI devices
let midiManager = new MidiManager({ config: config });
// Expose it globally so we can use it in the console
window.midiManager = midiManager;

// Create a WebSocket client to exchange MIDI data
let midiWebSocketClient = new WebSocketClient({
  url: config.server.websocket.url,
  port: config.server.port,
  path: config.server.websocket.path.midi
});
