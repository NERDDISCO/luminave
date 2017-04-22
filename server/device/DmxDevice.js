'use strict';

import CameoPixBar600PRO from './dmx/CameoPixBar600PRO.js';
import CameoFlat1RGBW from './dmx/CameoFlat1RGBW';
import CameoWookie200RGY from './dmx/CameoWookie200RGY';
import AdjStarburst from './dmx/AdjStarburst';

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

    // The mapping exists
    if (this.deviceMapping.get(this.type) !== undefined) {
      // Create the instance of one specified device
      this.instance = new(this.deviceMapping.get(this.type))(param);
    } else {
      throw new Error(this.type + ' is not defined in deviceMapping');
    }


    // Set the output
    this.instance.setOutput(param.output);

    /*
     * @TODO: Maybe extend CameoPixBar600PRO with Device and to something like Device.dmx.CameoPixBar600PRO to create a new instance
     */
  }

  createMapping() {
    this.deviceMapping.set('CameoPixBar600PRO', CameoPixBar600PRO);
    this.deviceMapping.set('CameoFlat1RGBW', CameoFlat1RGBW);
    this.deviceMapping.set('CameoWookie200RGY', CameoWookie200RGY);
    this.deviceMapping.set('AdjStarburst', AdjStarburst);
  }
}
