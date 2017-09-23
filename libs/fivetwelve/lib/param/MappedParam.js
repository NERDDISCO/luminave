import Param from './DmxParam.js';

/**
 * MappedParams are basically the enums of the paramter-types. They have a
 * fixed association of a set of logical values with the corresponding
 * dmx-values.
 */
export default class MappedParam extends Param {
  constructor(channel, mapping) {
    super([channel]);

    this.map = mapping;

    if (!mapping) {
      throw new Error('need to provide a mapping for the parameter');
    }
  }

  setValue(device, key) {
    if (this.map[key]) {
      device.setChannelValue(this.channels[0], this.map[key][0]);
    } else {
      device.setChannelValue(this.channels[0], 0);
    }
  }

  getValue(device) {
    let dmxValue = device.getChannelValue(this.channels[0]);

    for (let key in this.map) {
      if (!this.map.hasOwnProperty(key)) {
        continue;
      }

      let range = this.map[key];
      if (dmxValue >= range[0] && dmxValue <= range[1]) {
        return key;
      }
    }
  }
}
