import RangeParam from '/libs/fivetwelve/lib/param/RangeParam.js'
import HiResParam from '/libs/fivetwelve/lib/param/HiResParam.js'
import RgbParam from '/libs/fivetwelve/lib/param/RgbParam.js'

import DmxDevice from './DmxDevice.js'

export default class Rollapix100 extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {

        color: new RgbParam([1, 2, 3]),
        white: new RangeParam(4, { min: 0, max: 255 }),
        shutter: new RangeParam(5, { min: 0, max: 255 }),
        // dimmer: new RangeParam(8, { min: 0, max: 255 }),
        dimmer: new RangeParam(16, { min: 0, max: 255 }),
        tilt: new HiResParam([14, 15], { min: -135, max: 135 }),
        zoom: new RangeParam(12, { min: 0, max: 255 }),
        zoom2: new RangeParam(13, { min: 0, max: 255 })
      }
    }))

    this.channels = 17
    this.weight = 5.6
  }

  set dimmer(value) {
    this.beamDimmer = value
    this.auraDimmer = value
  }

}
