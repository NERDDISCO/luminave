import RangeParam from 'fivetwelve/lib/param/RangeParam.js'
import RgbParam from './param/RgbParam.js'

import DmxDevice from './DmxDevice.js'

export default class DunarniaLedPar extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        dimmer: new RangeParam(1, { min: 0, max: 255 }),
        color: new RgbParam([2, 3, 4]),
        white: new RangeParam(6, { min: 0, max: 255 }),
        amber: new RangeParam(5, { min: 0, max: 255 }),
        strobe: new RangeParam(7, { min: 0, max: 255 })
      }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1

    this.channels = 7
    this.weight = 1.2
  }
}
