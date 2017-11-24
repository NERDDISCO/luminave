import fivetwelve from '/libs/fivetwelve/index.js'

export default class InvolightStratus700 extends fivetwelve.DmxDevice {
  constructor(options) {
    options.params = {
      fan: new fivetwelve.param.RangeParam(1),
      pump: new fivetwelve.param.RangeParam(2)
    }
    super(options)
  }
}
