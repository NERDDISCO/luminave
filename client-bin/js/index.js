(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _MidiManager = require('./midi/MidiManager');

var _MidiManager2 = _interopRequireDefault(_MidiManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _MidiManager2.default();

// Get the config from the hidden element
var visionLordConfigElement = document.getElementById('VisionLordConfig');
var config = JSON.parse(visionLordConfigElement.value);

// Save config into global scope
window.config = config;

var connection = new WebSocket(config.server.websocket.url + config.server.port + config.server.websocket.path);

var output = document.getElementById('outputModV');
output.innerHTML = "Connection: 💀";

// Listen for messages from the server
connection.addEventListener('message', function (msg) {
  // Format the output and show it in the frontend
  output.innerHTML = "Connection: " + msg.data;

  connection.send(JSON.stringify({ test: 'data' }));
});

},{"./midi/MidiManager":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MidiManager = function MidiManager(params) {
  _classCallCheck(this, MidiManager);

  console.log("MidiManager asdf");
};

exports.default = MidiManager;

},{}]},{},[1]);
