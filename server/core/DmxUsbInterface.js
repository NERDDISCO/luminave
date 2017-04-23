"use strict";

let fivetwelve = require('fivetwelve/es5');
let Serialport = require('serialport');
if (process.env.NODE_ENV === 'development') {
  Serialport = require('virtual-serialport');
}

/**
 * Manages the connection to a DMX USB interface (e.g. Enttec DMX USB PRO Mk2) to control DMX devices.
 *
 */
export default class DmxUsbInterface {
  constructor(param) {

    this.config = param.config;

    // Load the driver
    let fivetwelve_driver = require(this.config.dmxInterface.driver);

    // USB connection to the DMX interface
    const usbProSerialport = new Serialport(this.config.dmxInterface.serialport.path);

    // Initialize the driver using the serial connection
    const driver = new fivetwelve_driver(usbProSerialport);

    // Create the output by using the driver and set the amount of universes that are controlled by this interface
    this.output = fivetwelve.default(driver, this.config.dmxInterface.universeAmount);
  }
}
