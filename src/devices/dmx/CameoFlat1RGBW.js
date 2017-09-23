import fivetwelve from '/libs/fivetwelve/index.js'

export default class CameoFlat1RGBW extends fivetwelve.DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        dimmer: new fivetwelve.param.RangeParam(1, { min: 0, max: 255 }),
        strobe: new fivetwelve.param.RangeParam(2, { min: 0, max: 255 }),
        color: new fivetwelve.param.RgbParam([3, 4, 5]),
        white: new fivetwelve.param.RangeParam(6, { min: 0, max: 255 })
      }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1
  }
}
