
import RgbParam from './param/RgbParam.js'
import PanTiltParam from './param/PanTiltParam'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'
import HiResParam from 'fivetwelve/lib/param/HiResParam.js'

import DmxDevice from './DmxDevice.js'

export default class CameoHydrabeam100RGBW extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        panTilt: new PanTiltParam(
          new HiResParam([1, 2], { min: 0, max: 180 }), 
          new HiResParam([3, 4], { min: 0, max: 120 })
        ),

        speed: new RangeParam(5, {
          min: 0,
          max: 255
        }),
        dimmer: new RangeParam(6, {
          min: 0,
          max: 255
        }),
        strobe: new RangeParam(7, {
          min: 0,
          max: 255
        }),
        // 8: color control, default 0
        // 9: control, default 0
        // 10: sound sentivity
        
        color: new RgbParam([11, 12, 13]),

        white: new RangeParam(14, {
          min: 0,
          max: 255
        })

        // 13: Device settings
        // 14: Color Ring Macro
        // 15: Color Ring Maacro Speed
      }
    }))

    this.channels = 14
    this.weight = 5.1
  }
}
