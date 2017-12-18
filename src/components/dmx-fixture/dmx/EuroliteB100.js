import fivetwelve from '/libs/fivetwelve/index.js'

export default class EuroliteB100 extends fivetwelve.DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        motor: new fivetwelve.param.MappedParam(1, {
          off: [0, 127],
          on: [128, 255]
        }),
        fan: new fivetwelve.param.MappedParam(2, {
          off: [0, 127],
          on: [128, 255]
        }),
      }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1
  }
}
