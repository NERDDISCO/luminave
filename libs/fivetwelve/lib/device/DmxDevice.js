import DmxParam from '../param/DmxParam.js'

/**
 * The dmx-device represents the basic functionality any dmx-device has,
 * mainly mapping device-channels to a dmx-buffer and providing the interface
 * to interact with cues/sequences etc. (i.e. serializing and deserializing
 * parameter-values).
 *
 * Inheriting classes represent specific devices and/or device-families and
 * will add the parameter-configuration for the specific device.
 */
export default class DmxDevice {

  /**
   * Creates a new device-instance.
   * @param {object} options
   * @param {Number} options.address DMX-Adress (1-based) of the first
   *     dmx-channel of this device.
   * @param {Number=} options.universe Number of the Universe this device is
   *     assigned to.
   * @param {Object.<String, DmxParam>=} options.params parameters of this
   *     device.
   */
  constructor(options) {
    if (arguments.length === 2) {
      options = {
        address: arguments[0],
        params: arguments[1],
        universe: 1
      }
    }

    /**
     * @private {Number}
     */
    this.bufferOffset = options.address - 1

    /**
     * @type {Buffer}
     */
    this.dmxBuffer = null

    /**
     * @private {number}
     */
    this.universe = options.universe || 1

    /**
     * @type {Object.<String, DmxParam>}
     */
    this.params = options.params

    this.attachParamProperties()
  }

  /**
   * Set the dmx-output to write data to.
   * @param {DmxOutput} output the output to write to.
   */
  setOutput(output) {
    if (output !== null) {
      this.setDmxBuffer(output.getBuffer(this.universe))
    }
  }

  /**
   * Sets the DMX-Buffer to be used by this device.
   * @param {Buffer} dmxBuffer
   */
  setDmxBuffer(dmxBuffer) {
    this.dmxBuffer = dmxBuffer
  }

  /**
   * Creates dynamic properties for all parameters, using the parameters
   * getValue/setValue-functions as getter and setter.
   * @param {Object} target The object to which properties should be attached
   * @param {Object} params The params for which properties should be assigned
   * @private
   */
  attachParamProperties(target = this, params = this.params) {
    for (const name in params) {
      if (!params.hasOwnProperty(name)) {
        continue
      }

      const param = params[name]

      // handle nested parameter-groups
      if (param instanceof DmxParam) {
        Object.defineProperty(target, name, {
          enumerable: true,
          get: param.getValue.bind(param, this),
          set: param.setValue.bind(param, this)
        })
      } else {
        this[name] = {}
        this.attachParamProperties(this[name], params[name])
      }
    }
  }


  /**
   * Sets the values for a given set of parameters. The values given are
   * logical values, not dmx-channel values.
   * @param {Object.<String, *>} params Parameter-names and (logical) values.
   */
  setParams(params) {
    for (const name in params) {
      if (!params.hasOwnProperty(name)) {
        continue
      }

      if (name in this.params) {
        this.params[name].setValue(this, params[name])
      }
    }
  }


  /**
   * Get all params for this device. This returns the logical values, not the
   * underlying dmx-channel values.
   * @returns {Object} The logical values for all device-parameters.
   */
  getParams() {
    const ret = {}

    for (const name in this.params) {
      if (!this.params.hasOwnProperty(name)) {
        continue
      }

      ret[name] = this.params[name].getValue(this)
    }

    return ret
  }


  /**
   * Retrieves the value for a DMX channel from the dmx-buffer.
   * @param {Number} channelNumber The 1-based channel number.
   * @returns {Number} The current value of the channel.
   */
  getChannelValue(channelNumber) {
    if (!Number.isInteger(channelNumber)) {
      throw new Error(`invalid channel-number: ${channelNumber}`, 'INVALID_CHANNEL')
    }

    if (!this.dmxBuffer) {
      return 0
    }

    return this.dmxBuffer[this.bufferOffset + channelNumber - 1]
  }


  /**
   * Sets the value of a dmx-channel for this device and writes it into
   * the dmx-buffer.
   * @param {Number} channelNumber The DMX channel-number (1-based).
   * @param {Number} value The (uint8) value for the channel.
   */
  setChannelValue(channelNumber, value) {
    if (!Number.isInteger(channelNumber)) {
      throw new Error(`invalid channel-number: ${channelNumber}`, 'INVALID_CHANNEL')
    }

    // console.log('set channel %s@%s (%s) to %s',
    //  channelNumber, this.bufferOffset + 1,
    //  this.bufferOffset + channelNumber, value);

    if (!this.dmxBuffer) {
      return
    }

    this.dmxBuffer[this.bufferOffset + channelNumber - 1] = Math.round(value)
  }

  /**
   * Override to implement bootup-behaviour (like switching on the lamps).
   */
  boot() {}

  /**
   * Override if there need to be dmx-preparations for shutting down the
   * device (Like switching off the lamp).
   */
  shutdown() {}

  /**
   * Override this function to implement any custom reset-behaviour you like.
   * (this usually involves setting some special value on the shutter-channel)
   */
  reset() {}
}
