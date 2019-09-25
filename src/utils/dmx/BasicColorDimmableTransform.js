import RgbParam from './param/RgbParam.js'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class BasicColor extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        color: new RgbParam([1, 2, 3]),
        dimmer: new RangeParam(1, { min: 0, max: 255 })
      }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1

    this.channels = 3
    this.weight = 0

    this.colorTransform = this.colorTransform.bind(this)
  }
  colorTransform(input) {
    return input.map(value => Math.round(value * this.dimmer / 255))
  }
}
