import RgbParam from 'fivetwelve/lib/param/RgbParam.js'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class BasicRGBDimmer extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        color: new RgbParam([1, 2, 3]),
        dimmer: new RangeParam(4, { min: 0, max: 255 })
      }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1

    this.channels = 4
    this.weight = 0
  }
}
