import RgbParam from 'fivetwelve/lib/param/RgbParam.js'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'
import MappedParam from 'fivetwelve/lib/param/MappedParam.js'
import MultiRangeParam from 'fivetwelve/lib/param/MultiRangeParam.js'
import HiResParam from 'fivetwelve/lib/param/HiResParam.js'

import DmxDevice from './DmxDevice.js'

/*
 * Added for JSFest 2018, see https://www.youtube.com/watch?v=9iXr8yYk_H4
 */
export default class JsFestMovingHeadWash extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        // 540
        // pan: new HiResParam([1, 2], { min: -270, max: 270 }),
        // 630
        pan: new HiResParam([1, 2], { min: -315, max: 315 }),
        // 280
        tilt: new HiResParam([3, 4], { min: -140, max: 140 }),
        dimmer: new RangeParam(5, { min: 0, max: 255 }),
        strobeMacro: new MultiRangeParam(6, {
          off: { range: [0, 6] },
          slowToFast: { range: [7, 65], values: [7, 65] },
          pulseSlowToFast: { range: [70, 128], values: [70, 128] },
          fadingSlowToFast: { range: [133, 191], values: [133, 191] },
          fadingOutSlowToFast: { range: [196, 255], values: [196, 255] }
        }),
        color: new RgbParam([7, 8, 9]),
        white: new RangeParam(10, { min: 0, max: 255 }),
        zoom: new RangeParam(11, { min: 0, max: 255 }),
        scanSpeed: new RangeParam(12, { min: 0, max: 255 }),

        rgbwMacro: new RangeParam(13, { min: 0, max: 255 }),
        resetAuto: new RangeParam(14, { min: 0, max: 255 })
      }
    }))

    this.channels = 14
    this.weight = 5
  }
}

JsFestMovingHeadWash.MOVEMENTS = {
  macro1: [8, 23],
  macro2: [24, 39],
  macro3: [40, 55],
  macro4: [56, 71],
  macro5: [72, 87],
  macro6: [88, 103],
  macro7: [104, 119],
  macro8: [120, 135]
  // @TODO: Add missing music controlled macros
}
