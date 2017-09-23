"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fivetwelve = require('fivetwelve/es5');
var Serialport = require('serialport');
if (process.env.NODE_ENV === 'development') {
  Serialport = require('virtual-serialport');
}

/**
 * Manages the connection to a DMX USB interface (e.g. Enttec DMX USB PRO Mk2) to control DMX devices.
 *
 */

var DmxUsbInterface = function DmxUsbInterface(param) {
  _classCallCheck(this, DmxUsbInterface);

  this.config = param.config;

  // Load the driver
  var fivetwelve_driver = require(this.config.dmxInterface.driver);

  // USB connection to the DMX interface
  var usbProSerialport = new Serialport(this.config.dmxInterface.serialport.path);

  // Initialize the driver using the serial connection
  var driver = new fivetwelve_driver(usbProSerialport);

  // Create the output by using the driver and set the amount of universes that are controlled by this interface
  this.output = fivetwelve.default(driver, this.config.dmxInterface.universeAmount);
};

exports.default = DmxUsbInterface;