import RgbParam from './param/RgbParam.js'
import RangeParam from 'fivetwelve/lib/param/RangeParam.js'
import MappedParam from 'fivetwelve/lib/param/MappedParam.js'
import MultiRangeParam from 'fivetwelve/lib/param/MultiRangeParam.js'
import HiResParam from 'fivetwelve/lib/param/HiResParam.js'

import DmxDevice from './DmxDevice.js'

/*
 * @see https://www.thomann.de/gb/eurolite_led_tmh_8_moving_head_spot.htm
 */
export default class EuroliteTMH8 extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        pan: new HiResParam([1, 2], { min: -270, max: 270 }),
        tilt: new HiResParam([3, 4], { min: -115, max: 115 }),
        speed: new RangeParam(5, { min: 0, max: 255 }),
        brightness: new MultiRangeParam(6, {
          dimmer: { range: [8, 134], values: [0, 255] },
          strobe: { range: [135, 232], values: [0, 255] }
        }),
        color: new RgbParam([7, 8, 9]),
        white: new RangeParam(10, { min: 0, max: 255 }),
        // colorMacro: new MappedParam(11, EuroliteTMH8.FIXED_COLORS),
        colorSpeed: new RangeParam(12, { min: 0, max: 255 }),
        movement: new MappedParam(13, EuroliteTMH8.MOVEMENTS),
        gobo: new MappedParam(14, EuroliteTMH8.GOBOS)
      }
    }))

    this.channels = 14
    this.weight = 3
  }
}

EuroliteTMH8.MOVEMENTS = {
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

// EuroliteTMH8.FIXED_COLORS = {
//   white: [8, 21],
//   red: [22, 34],
//   green: [35, 49],
//   blue: [50, 63],
//   cyan: [64, 77],
//   magenta: [78, 91],
//   yellow: [92, 105],
//   purple: [106, 119],
//   orange: [120, 133],
//   chartreuse: [134, 147],
//   pink: [148, 161],
//   brown: [162, 175],
//   gold: [176, 189],
//   crimson: [190, 203],
//   violet: [204, 217],
//   crape: [218, 231],
//   changing: [232, 255]
// }

EuroliteTMH8.GOBOS = {
  clear: [0, 7],
  flower: [8, 15],
  spiral: [16, 23],
  arrowCircle: [24, 31],
  hearts: [32, 39],
  flowers: [40, 47],
  shards: [48, 55],
  spiraltunnel: [56, 63],
  bars: [64, 71],
  flowers2: [72, 79],
  flowerShake: [80, 94],
  spiralShake: [95, 109],
  arrowCircleShake: [110, 124],
  heartsShake: [125, 139],
  flowersShake: [140, 154],
  shardsShake: [155, 169],
  spiraltunnelShake: [170, 184],
  barsShake: [185, 199],
  flowers2Shake: [200, 214]
}
