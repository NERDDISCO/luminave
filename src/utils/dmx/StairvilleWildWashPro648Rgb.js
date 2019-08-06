import RgbParam from 'fivetwelve/lib/param/RgbParam.js'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'

import DmxDevice from './DmxDevice.js'

// https://www.thomann.de/de/stairville_wild_wash_pro_648_led_rgb_dmx.htm
export default class StairvilleWildWashPro648Rgb extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        dimmer: new RangeParam(1, { min: 0, max: 255 }),
        strobe: new RangeParam(2, { min: 0, max: 255 }),
        color: new RgbParam([3, 4, 5])
        // 6: audio reactive
      }
    }))

    this.channels = 6
    this.weight = 3.25
  }
}
