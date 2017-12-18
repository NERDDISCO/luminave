import fivetwelve from '/libs/fivetwelve/index.js'
import DmxDevice from '../DmxDevice.js'

export default class FunGenerationSeParQuadLedRgbUv extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        color: new fivetwelve.param.RgbParam([1, 2, 3]),
        uv: new fivetwelve.param.RangeParam(4, { min: 0, max: 255 }),
        dimmer: new fivetwelve.param.RangeParam(5, { min: 0, max: 255 }),
        strobe: new fivetwelve.param.RangeParam(6, { min: 0, max: 255 })
      }
    }))
  }
}
