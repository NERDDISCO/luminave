import RangeParam from '/libs/fivetwelve/lib/param/RangeParam.js'
import DmxDevice from './DmxDevice.js'

export default class LTHLedParCob250w extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        dimmer: new RangeParam(1, { min: 0, max: 255 }),
        strobe: new RangeParam(2, { min: 0, max: 255 }),
        white1: new RangeParam(3, { min: 0, max: 255 }),
        white2: new RangeParam(4, { min: 0, max: 255 }),
        white3: new RangeParam(5, { min: 0, max: 255 }),
        white4: new RangeParam(6, { min: 0, max: 255 }),
        white5: new RangeParam(7, { min: 0, max: 255 })
      }
    }))

    this.channels = 7
    this.weight = 3.8
  }
}
