import RgbParam from '/libs/fivetwelve/lib/param/RgbParam.js'
import RangeParam from '/libs/fivetwelve/lib/param/RangeParam.js'
import MappedParam from '/libs/fivetwelve/lib/param/MappedParam.js'
import DmxDevice from './DmxDevice.js'

export default class AdjSweeperBeamQuadLed extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        tilt: new RangeParam(1, { min: 0, max: 255 }),
        tiltMacro: new RangeParam(2, { min: 0, max: 255 }),
        tiltMacroSpeed: new RangeParam(3, { min: 0, max: 255 }),
        chase: new MappedParam(4, AdjSweeperBeamQuadLed.CHASES),
        chaseSpeed: new RangeParam(5, { min: 0, max: 255 }),
        dimmer: new RangeParam(6, { min: 0, max: 255 }),
        strobe: new RangeParam(7, { min: 0, max: 255 }),

        led1: { 
          color: new RgbParam([8, 9, 10]),
          white: new RangeParam(11, { min: 0, max: 255 })
        },

        led2: { 
          color: new RgbParam([12, 13, 14]),
          white: new RangeParam(15, { min: 0, max: 255 })
        },

        led3: { 
          color: new RgbParam([16, 17, 18]),
          white: new RangeParam(19, { min: 0, max: 255 })
        },

        led4: { 
          color: new RgbParam([20, 21, 22]),
          white: new RangeParam(23, { min: 0, max: 255 })
        },

        led5: { 
          color: new RgbParam([24, 25, 26]),
          white: new RangeParam(27, { min: 0, max: 255 })
        },

        led6: { 
          color: new RgbParam([28, 29, 30]),
          white: new RangeParam(31, { min: 0, max: 255 })
        },

        led7: { 
          color: new RgbParam([32, 33, 34]),
          white: new RangeParam(35, { min: 0, max: 255 })
        },

        led8: { 
          color: new RgbParam([36, 37, 38]),
          white: new RangeParam(39, { min: 0, max: 255 })
        }
      }
    }))

    this.layout = {}
    this.layout.width = 8
    this.layout.height = 1

    this.channels = 39
    this.weight = 6.3
  }

  /*
   * Set Color on all LEDs at once
   */
  set color(value) {
    this.led1.color = value
    this.led2.color = value
    this.led3.color = value
    this.led4.color = value
    this.led5.color = value
    this.led6.color = value
    this.led7.color = value
    this.led8.color = value
  }

  /*
   * Set white on all LEDs at once
   */
  set white(value) {
    this.led1.white = value
    this.led2.white = value
    this.led3.white = value
    this.led4.white = value
    this.led5.white = value
    this.led6.white = value
    this.led7.white = value
    this.led8.white = value
  }
}

AdjSweeperBeamQuadLed.CHASES = {
  off: [0, 7],
  chase1: [8, 22],
  chase2: [23, 37],
  chase3: [38, 52],
  chase4: [53, 67],
  chase5: [68, 82],
  chase6: [83, 97],
  chase7: [98, 112],
  chase8: [113, 127],
  chase9: [128, 142],
  chase10: [143, 157],
  chase11: [158, 172],
  chase12: [173, 187],
  chase13: [188, 202],
  chase14: [203, 217],
  chase15: [218, 232],
  chase16: [233, 247],
  full: [248, 255],
}