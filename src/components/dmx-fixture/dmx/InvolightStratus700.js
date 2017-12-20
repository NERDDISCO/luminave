import RangeParam from '/libs/fivetwelve/lib/param/RangeParam.js'

import DmxDevice from '../DmxDevice.js'

export default class InvolightStratus700 extends DmxDevice {
  constructor(options) {
    options.params = {
      fan: new RangeParam(1),
      pump: new RangeParam(2)
    }
    super(options)

    this.channels = 2
    this.weight = 8.5
  }
}
