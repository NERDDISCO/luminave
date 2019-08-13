import RgbParam from 'fivetwelve/lib/param/RgbParam.js'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class OppskPar extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        config: new RangeParam(1, { min: 0, max: 0 }),
        color: new RgbParam([5, 6, 7]),
        dimmer: new RangeParam(4, { min: 0, max: 255 }),
        uv: new RangeParam(8, { min: 0, max: 255 })
      }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1

    this.channels = 8
    this.weight = 0
  }
}
