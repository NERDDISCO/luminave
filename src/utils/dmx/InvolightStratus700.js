import RangeParam from 'fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class InvolightStratus700 extends DmxDevice {
  constructor(options) {
    options.params = {
      fan: new RangeParam(1, { min: 0, max: 255 }),
      pump: new RangeParam(2, { min: 0, max: 255 })
    }
    super(options)

    this.channels = 2
    this.weight = 8.5
  }
}
