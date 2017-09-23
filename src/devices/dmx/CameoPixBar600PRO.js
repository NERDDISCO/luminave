import fivetwelve from '/libs/fivetwelve/index.js'

// import RgbWAUvParam from './param/RgbWAUvParam.js'

/**
 * The Cameo PixBar 600 PRO has 12 LEDs beside each other.
 */
export default class CameoPixBar600PRO extends fivetwelve.DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        dimmer: new fivetwelve.param.RangeParam(1, { min: 0, max: 255 }),
        strobe: new fivetwelve.param.RangeParam(2, { min: 0, max: 255 }),

        led1: {
          color: new fivetwelve.param.RgbParam([3, 4, 5]),
          white: new fivetwelve.param.RangeParam(6, { min: 0, max: 255 }),
          amber: new fivetwelve.param.RangeParam(7, { min: 0, max: 255 }),
          uv: new fivetwelve.param.RangeParam(8, { min: 0, max: 255 })
        },

        led2: {
          color: new fivetwelve.param.RgbParam([9, 10, 11]),
          white: new fivetwelve.param.RangeParam(12, { min: 0, max: 255 }),
          amber: new fivetwelve.param.RangeParam(13, { min: 0, max: 255 }),
          uv: new fivetwelve.param.RangeParam(14, { min: 0, max: 255 })
        },

        led3: {
          color: new fivetwelve.param.RgbParam([15, 16, 17]),
          white: new fivetwelve.param.RangeParam(18, { min: 0, max: 255 }),
          amber: new fivetwelve.param.RangeParam(19, { min: 0, max: 255 }),
          uv: new fivetwelve.param.RangeParam(20, { min: 0, max: 255 })
        },

        led4: {
          color: new fivetwelve.param.RgbParam([21, 22, 23]),
          white: new fivetwelve.param.RangeParam(24, { min: 0, max: 255 }),
          amber: new fivetwelve.param.RangeParam(25, { min: 0, max: 255 }),
          uv: new fivetwelve.param.RangeParam(26, { min: 0, max: 255 })
        },

        led5: {
          color: new fivetwelve.param.RgbParam([27, 28, 29]),
          white: new fivetwelve.param.RangeParam(30, { min: 0, max: 255 }),
          amber: new fivetwelve.param.RangeParam(31, { min: 0, max: 255 }),
          uv: new fivetwelve.param.RangeParam(32, { min: 0, max: 255 })
        },

        led6: {
          color: new fivetwelve.param.RgbParam([33, 34, 35]),
          white: new fivetwelve.param.RangeParam(36, { min: 0, max: 255 }),
          amber: new fivetwelve.param.RangeParam(37, { min: 0, max: 255 }),
          uv: new fivetwelve.param.RangeParam(38, { min: 0, max: 255 })
        },

        led7: {
          color: new fivetwelve.param.RgbParam([39, 40, 41]),
          white: new fivetwelve.param.RangeParam(42, { min: 0, max: 255 }),
          amber: new fivetwelve.param.RangeParam(43, { min: 0, max: 255 }),
          uv: new fivetwelve.param.RangeParam(44, { min: 0, max: 255 })
        },

        led8: {
          color: new fivetwelve.param.RgbParam([45, 46, 47]),
          white: new fivetwelve.param.RangeParam(48, { min: 0, max: 255 }),
          amber: new fivetwelve.param.RangeParam(49, { min: 0, max: 255 }),
          uv: new fivetwelve.param.RangeParam(50, { min: 0, max: 255 })
        },

        led9: {
          color: new fivetwelve.param.RgbParam([51, 52, 53]),
          white: new fivetwelve.param.RangeParam(54, { min: 0, max: 255 }),
          amber: new fivetwelve.param.RangeParam(55, { min: 0, max: 255 }),
          uv: new fivetwelve.param.RangeParam(56, { min: 0, max: 255 })
        },

        led10: {
          color: new fivetwelve.param.RgbParam([57, 58, 59]),
          white: new fivetwelve.param.RangeParam(60, { min: 0, max: 255 }),
          amber: new fivetwelve.param.RangeParam(61, { min: 0, max: 255 }),
          uv: new fivetwelve.param.RangeParam(62, { min: 0, max: 255 })
        },

        led11: {
          color: new fivetwelve.param.RgbParam([63, 64, 65]),
          white: new fivetwelve.param.RangeParam(66, { min: 0, max: 255 }),
          amber: new fivetwelve.param.RangeParam(67, { min: 0, max: 255 }),
          uv: new fivetwelve.param.RangeParam(68, { min: 0, max: 255 })
        },

        led12: {
          color: new fivetwelve.param.RgbParam([69, 70, 71]),
          white: new fivetwelve.param.RangeParam(72, { min: 0, max: 255 }),
          amber: new fivetwelve.param.RangeParam(73, { min: 0, max: 255 }),
          uv: new fivetwelve.param.RangeParam(74, { min: 0, max: 255 })
        }

        // led1: { rgbwauv: new RgbWAUvParam(3) },
        // led2: { rgbwauv: new RgbWAUvParam(9) },
        // led3: { rgbwauv: new RgbWAUvParam(15) },
        // led4: { rgbwauv: new RgbWAUvParam(21) },
        // led5: { rgbwauv: new RgbWAUvParam(27) },
        // led6: { rgbwauv: new RgbWAUvParam(33) },
        // led7: { rgbwauv: new RgbWAUvParam(39) },
        // led8: { rgbwauv: new RgbWAUvParam(45) },
        // led9: { rgbwauv: new RgbWAUvParam(51) },
        // led10: { rgbwauv: new RgbWAUvParam(57) },
        // led11: { rgbwauv: new RgbWAUvParam(63) },
        // led12: { rgbwauv: new RgbWAUvParam(69) },
      }
    }))

    this.layout = {}
    this.layout.width = 12
    this.layout.height = 1
  }

  reset() {
    console.log('asdf')
    let defaultColor = 'rgb(0, 255, 0)'

    this.led1.color = defaultColor
    this.led2.color = defaultColor
    this.led3.color = defaultColor
    this.led4.color = defaultColor
    this.led5.color = defaultColor
    this.led6.color = defaultColor
    this.led7.color = defaultColor
    this.led8.color = defaultColor
    this.led9.color = defaultColor
    this.led10.color = defaultColor
    this.led11.color = defaultColor
    this.led12.color = defaultColor
  }
}
