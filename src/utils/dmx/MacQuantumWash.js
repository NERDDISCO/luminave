import RangeParam from 'fivetwelve/lib/param/RangeParam.js'
import HiResParam from 'fivetwelve/lib/param/HiResParam.js'
import RgbParam from 'fivetwelve/lib/param/RgbParam.js'

import DmxDevice from './DmxDevice.js'

export default class MacQuantumWash extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {

        // Shutter open: 20
        strobe: new RangeParam(1, { min: 0, max: 255 }),
        dimmer: new HiResParam([2, 3], { min: 0, max: 255 }),

        // Red fine: 5
        // Green fine: 7 
        // Blue fine: 9
        color: new RgbParam([4, 6, 8]),

        // CTC: 10
        // color wheel: 11

        // 0 - 200: Flood → spot
        zoom: new RangeParam(12, { min: 0, max: 255 }),

        pan: new HiResParam([13, 14], { min: -270, max: 270 }),
        tilt: new HiResParam([15, 16], { min: -135, max: 135 }),

        // calibration: 17
      }
    }))

    this.channels = 17
    this.weight = 21
  }
}
