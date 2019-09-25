
import RgbParam from './param/RgbParam.js'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class InvolightLedPar64 extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        dimmer: new RangeParam(1, { min: 0, max: 255 }),
        color: new RgbParam([2, 3, 4]),
        white: new RangeParam(4, { min: 0, max: 255 })
      }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1

    this.channels = 5
    this.weight = 1.2
  }
}
