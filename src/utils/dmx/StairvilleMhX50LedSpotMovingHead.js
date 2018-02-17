import RangeParam from '/libs/fivetwelve/lib/param/RangeParam.js'
import MappedParam from '/libs/fivetwelve/lib/param/MappedParam.js'
import MultiRangeParam from '/libs/fivetwelve/lib/param/MultiRangeParam.js'

import DmxDevice from './DmxDevice.js'

export default class StairvilleMhX50LedSpotMovingHead extends DmxDevice {

  /*
   * @see https://www.thomann.de/gb/stairville_mhx50_led_spot_moving_head.htm
   */
  constructor(options) {
    super(Object.assign(options, {
      params: {
        pan: new RangeParam(1, {
          min: 0,
          max: 255
        }),
        tilt: new RangeParam(2, {
          min: 0,
          max: 255
        }),
        panFine: new RangeParam(3, {
          min: 0,
          max: 255
        }),
        tiltFine: new RangeParam(4, {
          min: 0,
          max: 255
        }),
        responseSpeed: new RangeParam(5, {
          min: 0,
          max: 255
        }),

        colorWheel: new MappedParam(6, StairvilleMhX50LedSpotMovingHead.FIXED_COLORS),

        shutter: new MultiRangeParam(7, {
          open: { range: [4, 7] },
          closed: { range: [0, 3] },
          strobe: { range: [14, 215] }
        }),

        dimmer: new RangeParam(8, {
          min: 0,
          max: 255
        }),

        gobo: new MultiRangeParam(9, StairvilleMhX50LedSpotMovingHead.FIXED_GOBO),

        goboRotation: new MultiRangeParam(10, {
          fixed: { range: [0, 63] },
          positive: { range: [64, 147] },
          negative: { range: [148, 231] },
          bouncing: { range: [232, 255] }
        }),

        // @TODO: special functions: 11
        // @TODO: build in programs functions: 12

        prism: new MultiRangeParam(13, {
          fixed: { range: [248, 255] },
          rotate: { range: [8, 247] }
        }),

        focus: new RangeParam(14, {
          min: 0,
          max: 255
        })
      }
    }))

    this.channels = 14
    this.weight = 8
  }

}

StairvilleMhX50LedSpotMovingHead.FIXED_COLORS = {
  white: [0, 6],
  yellow: [7, 13],
  pink: [14, 20],
  green: [21, 27],
  peachblow: [28, 34],
  blue: [35, 41],
  kellyGreen: [42, 48],
  red: [49, 55],
  darkBlue: [56, 63],
  whiteYellow: [64, 70],
  yellowPink: [71, 77],
  pinkGreen: [78, 84],
  greenPeachblow: [85, 91],
  peachblowBlue: [92, 98],
  blueKellyGreen: [99, 105],
  kellyGreenRed: [106, 112],
  redDarkBlue: [113, 119],
  darkBlueWhite: [120, 127],
  rainbowPositive: [128, 191],
  rainbowNegative: [192, 255]
}

StairvilleMhX50LedSpotMovingHead.FIXED_GOBO = {
  open: { range: [0, 7] },
  gobo2: { range: [8, 15] },
  gobo3: { range: [16, 23] },
  gobo4: { range: [24, 31] },
  gobo5: { range: [32, 39] },
  gobo6: { range: [40, 47] },
  gobo7: { range: [48, 55] },
  gobo8: { range: [56, 63] },
  gobo8Shake: { range: [64, 71], values: [0, 1] },
  gobo7Shake: { range: [72, 79], values: [0, 1] },
  gobo6Shake: { range: [80, 87], values: [0, 1] },
  gobo5Shake: { range: [88, 95], values: [0, 1] },
  gobo4Shake: { range: [96, 103], values: [0, 1] },
  gobo3Shake: { range: [104, 111], values: [0, 1] },
  gobo2Shake: { range: [112, 119], values: [0, 1] },
  rainbowPositive: { range: [128, 191] },
  rainbowNegative: { range: [192, 255] }
}
