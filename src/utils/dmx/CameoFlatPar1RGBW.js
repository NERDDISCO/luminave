import RgbParam from '/libs/fivetwelve/lib/param/RgbParam.js'
import RangeParam from '/libs/fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class CameoFlatPar1RGBW extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        color: new RgbParam([3, 4, 5]),
        white: new RangeParam(6, { min: 0, max: 255 }),
        dimmer: new RangeParam(1, { min: 0, max: 255 }),
        strobe: new RangeParam(2, { min: 0, max: 255 }),
        colorMacro: new RangeParam(7, { min: 0, max: 255 }),
        sound: new RangeParam(8, { min: 0, max: 255 })
      }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1

    this.channels = 8
    this.weight = 1.2
  }
}
