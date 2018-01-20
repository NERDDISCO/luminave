import RgbParam from '/libs/fivetwelve/lib/param/RgbParam.js'
import RangeParam from '/libs/fivetwelve/lib/param/RangeParam.js'
import MappedParam from '/libs/fivetwelve/lib/param/MappedParam.js'
import MultiRangeParam from '/libs/fivetwelve/lib/param/MultiRangeParam.js'
import HiResParam from '/libs/fivetwelve/lib/param/HiResParam.js'

import DmxDevice from '../DmxDevice.js'

export default class MiniLed extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        pan: new HiResParam([1, 2], { min: -270, max: 270 }),
        tilt: new HiResParam([3, 4], { min: -115, max: 90 }),
        speed: new RangeParam(5),
        brightness: new MultiRangeParam(6, {
          default: { range: [8, 134], values: [1, 0] },
          strobe: { range: [135, 239], values: [0, 1] }
        }),
        // strobe: new param.RangeParam(6, {rangeStart: 135, rangeEnd: 239}),
        color: new RgbParam([7, 8, 9]),
        colorPreset: new MappedParam(10, MiniLed.FIXED_COLORS),
        colorSpeed: new RangeParam(11),
        // left out here: movement macros
        gobo: new MappedParam(13, MiniLed.GOBOS)
        // left out: gobo-shake, gobo-wheel-rotate
      }
    }))

    this.channels = 13
    this.weight = 3
  }
}

MiniLed.FIXED_COLORS = {
  white: [8, 21],
  red: [22, 34],
  green: [35, 49],
  blue: [50, 63],
  cyan: [64, 77],
  magenta: [78, 91],
  yellow: [92, 105],
  purple: [106, 119],
  orange: [120, 133],
  chartreuse: [134, 147],
  pink: [148, 161],
  brown: [162, 175],
  gold: [176, 189],
  crimson: [190, 203],
  violet: [204, 217],
  crape: [218, 231],
  changing: [232, 255]
}

MiniLed.GOBOS = {
  clear: [0, 7],
  flower: [8, 15],
  spiral: [16, 23],
  arrowCircle: [24, 31],
  hearts: [32, 39],
  flowers: [40, 47],
  shards: [48, 55],
  spiraltunnel: [56, 63],
  bars: [64, 71],
  flowers2: [72, 79]
}
