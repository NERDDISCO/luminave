import { store } from '/src/reduxStore.js'
import { setChannel } from '/src/actions/index.js'

import fivetwelve from '/libs/fivetwelve/index.js'
import DmxParam from '/libs/fivetwelve/lib/param/DmxParam.js'
import RgbParam from '/libs/fivetwelve/lib/param/RgbParam.js'
import RangeParam from '/libs/fivetwelve/lib/param/RangeParam.js'
import MappedParam from '/libs/fivetwelve/lib/param/MappedParam.js'
import MultiRangeParam from '/libs/fivetwelve/lib/param/MultiRangeParam.js'
import HiResParam from '/libs/fivetwelve/lib/param/HiResParam.js'

/**
 *
 */
export default class DmxFixture extends fivetwelve.DmxDevice {
  constructor(options) {
    super(options)

    this.universe = options.universe
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

    console.log('getChannelValue', store.getState().universeManager[0].channels[this.bufferOffset + channelNumber - 1])

    return store.getState().universeManager[0].channels[this.bufferOffset + channelNumber - 1]
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

    console.log('setChannelValue', this.universe, this.bufferOffset + channelNumber - 1, value)

    store.dispatch(setChannel(this.universe, this.bufferOffset + channelNumber - 1, value))
  }


  /*
   * Returns a list of properties (e.g. color, dimmer, pan, tilt...) for this fixture
   */
  getParamsList() {
    const list = []

    for (const name in this.params) {
      if (!this.params.hasOwnProperty(name)) {
        continue
      }

      const param = this.params[name]
      let mapping = ['']
      let min = 0
      let max = 0

      // @see MappedParam
      if (param.hasOwnProperty('map')) {
        mapping = mapping.concat(Object.keys(param.map))
      }

      // @see MultiRangeParam
      if (param.hasOwnProperty('mapping')) {
        mapping = Object.keys(param.mapping)
      }

      // @see HiResParam
      if (param.hasOwnProperty('min')) {
        min = param.min
        max = param.max
      }

      // handle nested parameter-groups
      if (param instanceof DmxParam) {
        list.push({
          name,
          channels: param.channels,
          mapping,
          min,
          max,
          isRgb: param instanceof RgbParam,
          isRange: param instanceof RangeParam,
          isMapped: param instanceof MappedParam,
          isMultiRange: param instanceof MultiRangeParam,
          isHiRes: param instanceof HiResParam
        })
      } else {
        console.log('not implemented')
        // @TODO: Handle nested params
        // this[name] = {}
        // this.attachParamProperties(this[name], params[name])
      }
    }

    return list
  }
}
