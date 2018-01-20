import MappedParam from '/libs/fivetwelve/lib/param/MappedParam.js'

import DmxDevice from '../DmxDevice.js'

export default class EuroliteB100 extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        motor: new MappedParam(1, {
          off: [0, 127],
          on: [128, 255]
        }),
        fan: new MappedParam(2, {
          off: [0, 127],
          on: [128, 255]
        }),
      }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1

    this.channels = 2
    this.weight = 2.3
  }
}
