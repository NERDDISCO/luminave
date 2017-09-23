import DmxParam from '../param/DmxParam.js';

/**
 * A device-group represents an arbitrary group of devices, that will behave
 * exactly like a single device. Anything you do with a group will always be
 * applied to all devices. The group inherits all virtual attributes that
 * are provided by any of the member-devices.
 *
 * @fixme
 *     Reading values from device-groups assumes that all devices in
 *     the group do have the same value. There isn't an easy way to fix this,
 *     but in order to have the group usable like a single device there are not
 *     many options how to handle this.
 */
export default class DeviceGroup {
  /**
   * Create a new device-group containing the given devices.
   * @param {Array.<DmxDevice>} devices
   */
  constructor(devices) {
    this.devices = devices;

    this.params = this.devices.reduce((params, device) => {
      if (device.params) {
        Object.keys(device.params).forEach(paramName => {
          params[paramName] = device.params[paramName];
        });
      }
      return params;
    }, {});

    this.initParamProperties(this, this.devices, this.params);
  }

  /**
   * Creates dynamic properties for all parameters, using the parameters
   * getValue/setValue-functions as getter and setter.
   * @param {Object} target The object to which properties should be attached
   * @param {Object} devices list of devices holding the real parameters
   * @param {Object} params The params for which properties should be assigned
   * @private
   */
  initParamProperties(target, devices, params) {
    Object.keys(params).forEach(name => {
      if (params[name] instanceof DmxParam) {
        Object.defineProperty(target, name, {
          enumerable: true,
          get: this.getParamValue.bind(this, devices, name),
          set: this.setParamValue.bind(this, devices, name)
        });
      } else {
        this[name] = {};
        this.initParamProperties(
          this[name], devices.map(dev => dev[name]), params[name]);
      }
    });
  }

  /**
   * Set the dmx-output to write data to.
   * @param {DmxOutput} output the output to write to.
   */
  setOutput(output) {
    this.setDmxBuffer(output.getBuffer());
  }

  /**
   * Set the dmx-buffer to be used by all devices in this group.
   * @param {Buffer} buffer
   */
  setDmxBuffer(buffer) {
    this.devices.forEach(device => device.setDmxBuffer(buffer));
  }

  /**
   * Gets the value of the first device having the specified parameter defined.
   * @param {Array.<DmxDevice>} devices
   * @param {String} name
   * @returns {*} parameter value
   * @private
   */
  getParamValue(devices, name) {
    devices = devices.filter(
      device => device.hasOwnProperty(name));

    return devices[0][name];
  }

  /**
   * Sets the parameter-value on all devices supporting it.
   * @param {Array.<DmxDevice>} devices
   * @param {String} name
   * @param {*} value
   * @private
   */
  setParamValue(devices, name, value) {
    devices.forEach(device => {
      if (device.hasOwnProperty(name)) {
        device[name] = value;
      }
    });
  }

  /**
   * Returns the DMX-Channel value from the first device in this group.
   *
   * @param {Number} channelNumber the 1-based dmx channel number
   * @returns {Number}
   */
  getChannelValue(channelNumber) {
    return this.devices[0].getChannelValue(channelNumber);
  }

  /**
   * Sets a raw dmx-channel value on all group-devices.
   * @param {Number} channelNumber
   * @param {Number} value
   */
  setChannelValue(channelNumber, value) {
    this.devices.forEach(
      device => device.setChannelValue(channelNumber, value));
  }

  /**
   * Returns parameter-values for all devices.
   * @fixme should definitely return single params object
   * @returns {Array.<Object>}
   */
  getParams() {
    return this.devices.map(device => device.getParams());
  }

  /**
   * Sets the passed parameters on all group-devices.
   * @param {Object.<String, *>} params The parameters-object
   */
  setParams(params) {
    this.devices.forEach(device => device.setParams(params));
  }

  /**
   * Boots all group-devices.
   */
  boot() {
    this.devices.forEach(device => device.boot());
  }

  /**
   * Shuts all group-devices down.
   */
  shutdown() {
    this.devices.forEach(device => device.shutdown());
  }

  /**
   * Resets all group-devices.
   */
  reset() {
    this.devices.forEach(device => device.reset());
  }
}
