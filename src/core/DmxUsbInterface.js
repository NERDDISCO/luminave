import fivetwelve from '/node_modules/fivetwelve'

import ArduinoLeonardoETHDriver from '/src/devices/dmx/driver/ArduinoLeonardoETHDriver.js'

/**
 * Manages the connection to a DMX USB interface via WebUSB to control DMX devices.
 *
 */
export default class DmxUsbInterface {
  constructor(param) {
    this.config = param.config

    // Initialize the driver using the serial connection
    const driver = new ArduinoLeonardoETHDriver()

    // Create the output by using the driver and set the amount of universes that are controlled by this interface
    this.output = fivetwelve.default(driver, 1)
  }
}
