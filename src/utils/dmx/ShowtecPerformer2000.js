import RgbParam from './param/RgbParam.js'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class ShowtecPerformer2000 extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        dimmer: new RangeParam(1, { min: 0, max: 255 }),
        color: new RgbParam([2, 3, 4]),
        amber: new RangeParam(5, { min: 0, max: 255 }),
        lime: new RangeParam(6, { min: 0, max: 255 }),
        // 7: color presets
        strobe:  new RangeParam(8, { min: 0, max: 255 }),
        zoom:  new RangeParam(9, { min: 0, max: 255 }),
        dimmerSpeed: new RangeParam(6, { min: 0, max: 255 })
      }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1

    this.channels = 10
    this.weight = 0
  }
}
