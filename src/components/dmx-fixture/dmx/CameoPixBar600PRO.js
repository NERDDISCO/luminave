import RgbParam from '/libs/fivetwelve/lib/param/RgbParam.js'
import RangeParam from '/libs/fivetwelve/lib/param/RangeParam.js'

import DmxDevice from '../DmxDevice.js'

/**
 * The Cameo PixBar 600 PRO has 12 LEDs beside each other.
 */
export default class CameoPixBar600PRO extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        dimmer: new RangeParam(1, { min: 0, max: 255 }),
        strobe: new RangeParam(2, { min: 0, max: 255 }),

        led1: {
          color: new RgbParam([3, 4, 5]),
          white: new RangeParam(6, { min: 0, max: 255 }),
          amber: new RangeParam(7, { min: 0, max: 255 }),
          uv: new RangeParam(8, { min: 0, max: 255 })
        },

        led2: {
          color: new RgbParam([9, 10, 11]),
          white: new RangeParam(12, { min: 0, max: 255 }),
          amber: new RangeParam(13, { min: 0, max: 255 }),
          uv: new RangeParam(14, { min: 0, max: 255 })
        },

        led3: {
          color: new RgbParam([15, 16, 17]),
          white: new RangeParam(18, { min: 0, max: 255 }),
          amber: new RangeParam(19, { min: 0, max: 255 }),
          uv: new RangeParam(20, { min: 0, max: 255 })
        },

        led4: {
          color: new RgbParam([21, 22, 23]),
          white: new RangeParam(24, { min: 0, max: 255 }),
          amber: new RangeParam(25, { min: 0, max: 255 }),
          uv: new RangeParam(26, { min: 0, max: 255 })
        },

        led5: {
          color: new RgbParam([27, 28, 29]),
          white: new RangeParam(30, { min: 0, max: 255 }),
          amber: new RangeParam(31, { min: 0, max: 255 }),
          uv: new RangeParam(32, { min: 0, max: 255 })
        },

        led6: {
          color: new RgbParam([33, 34, 35]),
          white: new RangeParam(36, { min: 0, max: 255 }),
          amber: new RangeParam(37, { min: 0, max: 255 }),
          uv: new RangeParam(38, { min: 0, max: 255 })
        },

        led7: {
          color: new RgbParam([39, 40, 41]),
          white: new RangeParam(42, { min: 0, max: 255 }),
          amber: new RangeParam(43, { min: 0, max: 255 }),
          uv: new RangeParam(44, { min: 0, max: 255 })
        },

        led8: {
          color: new RgbParam([45, 46, 47]),
          white: new RangeParam(48, { min: 0, max: 255 }),
          amber: new RangeParam(49, { min: 0, max: 255 }),
          uv: new RangeParam(50, { min: 0, max: 255 })
        },

        led9: {
          color: new RgbParam([51, 52, 53]),
          white: new RangeParam(54, { min: 0, max: 255 }),
          amber: new RangeParam(55, { min: 0, max: 255 }),
          uv: new RangeParam(56, { min: 0, max: 255 })
        },

        led10: {
          color: new RgbParam([57, 58, 59]),
          white: new RangeParam(60, { min: 0, max: 255 }),
          amber: new RangeParam(61, { min: 0, max: 255 }),
          uv: new RangeParam(62, { min: 0, max: 255 })
        },

        led11: {
          color: new RgbParam([63, 64, 65]),
          white: new RangeParam(66, { min: 0, max: 255 }),
          amber: new RangeParam(67, { min: 0, max: 255 }),
          uv: new RangeParam(68, { min: 0, max: 255 })
        },

        led12: {
          color: new RgbParam([69, 70, 71]),
          white: new RangeParam(72, { min: 0, max: 255 }),
          amber: new RangeParam(73, { min: 0, max: 255 }),
          uv: new RangeParam(74, { min: 0, max: 255 })
        }

      }
    }))

    this.layout = {}
    this.layout.width = 12
    this.layout.height = 1

    this.channels = 74
    this.weight = 6
  }

  // reset() {
    // const defaultColor = 'rgb(0, 255, 0)'
    //
    // this.led1.color = defaultColor
    // this.led2.color = defaultColor
    // this.led3.color = defaultColor
    // this.led4.color = defaultColor
    // this.led5.color = defaultColor
    // this.led6.color = defaultColor
    // this.led7.color = defaultColor
    // this.led8.color = defaultColor
    // this.led9.color = defaultColor
    // this.led10.color = defaultColor
    // this.led11.color = defaultColor
    // this.led12.color = defaultColor
  // }
}
