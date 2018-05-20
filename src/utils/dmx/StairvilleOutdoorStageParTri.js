import RgbParam from '/libs/fivetwelve/lib/param/RgbParam.js'
import RangeParam from '/libs/fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class StairvilleOutdoorStageParTri extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        color: new RgbParam([2, 3, 4]),
        dimmer: new RangeParam(1, { min: 0, max: 255 }),
        strobe: new RangeParam(5, { min: 0, max: 255 })

        // 6: RGB Mix, 0 = disabled
        // 7: Control all DMX devices with the same ID, 0 = All IDs
        // 8: Speed to change the fader (1, 2, 3, 4), 0 = fast
      }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1

    this.channels = 8
    this.weight = 3.5
  }
}
