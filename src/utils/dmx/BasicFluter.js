import RgbParam from './param/RgbParam.js'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class BasicFluter extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        color: new RgbParam([4, 5, 6]),
        white: new RangeParam(7, { min: 0, max: 255 }),
        dimmer: new RangeParam(3, { min: 0, max: 255 }),
        strobe: new RangeParam(1, { min: 0, max: 255 })

        // 2 = no function
      }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1

    this.channels = 7
    this.weight = 1.2
  }
}
