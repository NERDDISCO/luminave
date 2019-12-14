import RgbParam from './param/RgbParam.js'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class InvolightMovingBar1808 extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        tilt: new RangeParam(1, { min: 0, max: 255 }),
        tiltSpeed: new RangeParam(2, { min: 0, max: 255 }),
        // 3: Program
        // 4: Program Speed
        dimmer: new RangeParam(5, { min: 0, max: 255 }),
        strobe: new RangeParam(6, { min: 0, max: 255 }),
        color: new RgbParam([7, 8, 9]),
        white: new RangeParam(10, { min: 0, max: 255 })
      }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1

    this.channels = 10
    this.weight = 1.2
  }
}
