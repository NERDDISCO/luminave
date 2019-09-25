import RgbParam from './param/RgbParam.js'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class FunGenerationSeParQuadLedRgbUv extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        color: new RgbParam([1, 2, 3]),
        uv: new RangeParam(4, { min: 0, max: 255 }),
        dimmer: new RangeParam(5, { min: 0, max: 255 }),
        strobe: new RangeParam(6, { min: 0, max: 255 })
      }
    }))

    this.channels = 6
    this.weight = 1.1
  }
}
