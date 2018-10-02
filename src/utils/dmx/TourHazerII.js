import RangeParam from '/libs/fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class TourHazerII extends DmxDevice {
  constructor(options) {
    options.params = {
      pump: new RangeParam(1, { min: 0, max: 255 }),
      fan: new RangeParam(2, { min: 0, max: 255 })
    }
    super(options)

    this.channels = 2
    this.weight = 14.5
  }
}
