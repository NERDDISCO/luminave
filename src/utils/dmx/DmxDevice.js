import { addToBatch, batch } from '/src/utils/index.js'

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
export default class DmxDevice extends fivetwelve.DmxDevice {
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

    // console.log('getChannelValue', [...store.getState().universeManager[0].channels], [...batch])

    return batch[this.bufferOffset + channelNumber - 1]

    // return store.getState().universeManager[0].channels[this.bufferOffset + channelNumber - 1]
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

    // console.log('setChannelValue', this.universe, this.bufferOffset + channelNumber - 1, value)

    addToBatch(this.bufferOffset + channelNumber - 1, Math.round(value))

    //store.dispatch(setChannel(this.universe, this.bufferOffset + channelNumber - 1, value))
  }


  /*
   * Returns a list of properties (e.g. color, dimmer, pan, tilt...) for this fixture
   */
  getParamsList() {
    return Object.entries(this.params)
      // ignore non DMX until implemented. A simple filter will do for now
      // @TODO use switch case or similar
      // @TODO Handle nested DmxParam's
      .filter(([name, param]) => param instanceof DmxParam)
      .map(([name, param]) => {

        const { min = 0, max = 0, map = {}, channels } = param

        // handle (map|mapping) inconsistency.
        // if mapping is available we can use its keys
        // if map is used (fallback defined above) we need to prefix it with an empty string
        // {@see https://github.com/NERDDISCO/VisionLord/commit/e54cbaedb35d8e2ce8c858688d01a03626f78d63#diff-fbbc7eb32e6a63e1dd48789843a0192fR78}
        const mapping = param.mapping ?
          Object.keys(param.mapping) : ['', ...Object.keys(map)]

        return {
          min,
          max,
          name,
          channels,
          mapping,
          isRgb: param instanceof RgbParam,
          isRange: param instanceof RangeParam,
          isMapped: param instanceof MappedParam,
          isMultiRange: param instanceof MultiRangeParam,
          isHiRes: param instanceof HiResParam
        }
      })
  }
}
