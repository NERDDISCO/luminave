import RgbParam from './param/RgbParam.js'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class SgmXC5 extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        strobe: new RangeParam(1, { min: 0, max: 255 }),
        color: new RgbParam([2, 3, 4]),
        strobeDuration: new RangeParam(5, { min: 0, max: 255 }),
        strobeRate: new RangeParam(6, { min: 0, max: 255 })
        // strobeEffect 7
      }
    }))

    this.channels = 7
    this.weight = 3
  }
}
