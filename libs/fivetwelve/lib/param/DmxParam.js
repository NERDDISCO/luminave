/**
 * The DMXParam-class is the base-class for any dmx-parameter that can be
 * added to a device. Think of it as an abstract view on DMX-Channels.
 * The key-responsibility is to convert between dmx-channels/-values
 * and their conceptual representation.
 *
 * Parameters are meant to be created in device-implementations and are
 * always bound to a specific device. The device provides the interface to
 * read and manipulate the dmx-values for specific channels.
 */
export default class DmxParam {
  /**
   * creates a dmx-parameter for the givven channels
   * @param {Array.<Number>} channels
   */
  constructor(channels) {
    this.channels = channels;
  }

  // stub-implementations for getter/setter-interface
  getValue(device) {} // eslint-disable-line no-unused-vars
  setValue(device, value) {} // eslint-disable-line no-unused-vars
}
