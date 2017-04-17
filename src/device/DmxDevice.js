'use strict';

import CameoPixBar600PRO from './dmx/CameoPixBar600PRO.js';

/**
 *
 *
 * @param {string} type - e.g. "CameoPixBar600PRO"
 * @param {string} deviceId - Unique identifier e.g. "cameopixbar600_1"
 * @param {string} name - e.g. "Cameo PixBar 600 PRO"
 * @param {number} universe - The parent universe the device is part of, e.g. 1
 * @param {number} address - Address of the device in the universe, e.g. 10
 *
 */
export default class DmxDevice {
  constructor(param) {

    this.type = param.type || undefined;
    this.deviceId = param.deviceId || undefined;
    this.name = param.name || undefined;

    // Mapping of devices
    this.deviceMapping = new Map();
    this.createMapping();

    // Create the instance of one specified device
    this.instance = new (this.deviceMapping.get(this.type))(param);

    // Set the output
    this.instance.setOutput(param.output);

    /*
     * @TODO: Maybe extend CameoPixBar600PRO with Device and to something like Device.dmx.CameoPixBar600PRO to create a new instance
     */
  }

  createMapping() {
    this.deviceMapping.set('CameoPixBar600PRO', CameoPixBar600PRO);
  }
}
