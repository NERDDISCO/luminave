import RgbParam from 'fivetwelve/lib/param/RgbParam.js'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'
import MultiRangeParam from 'fivetwelve/lib/param/MultiRangeParam.js'
import HiResParam from 'fivetwelve/lib/param/HiResParam.js'

import DmxDevice from './DmxDevice.js'

/*
 * @see https://www.thomann.de/gb/eurolite_led_tmh7_moving_head_wash.htm
 */
export default class EuroliteTMH8 extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        pan: new HiResParam([1, 10], { min: -270, max: 270 }),
        tilt: new HiResParam([2, 11], { min: -135, max: 135 }),
        speed: new RangeParam(3, { min: 0, max: 255 }),
        color: new RgbParam([4, 5, 6]),
        // colorMacro: 7
        brightness: new MultiRangeParam(8, {
          dimmer: { range: [11, 20], values: [0, 255] },
          strobe: { range: [31, 200], values: [0, 255] }
        }),

        dimmer: new RangeParam(9, { min: 0, max: 255 })
      }
    }))

    this.channels = 11
    this.weight = 3
  }
}
