"use strict";

var fivetwelve = require('fivetwelve/es5');

export default class MiniLed extends fivetwelve.DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        pan: new fivetwelve.param.HiResParam([1, 2], { min: -270, max: 270 }),
        tilt: new fivetwelve.param.HiResParam([3, 4], { min: -115, max: 90 }),
        speed: new fivetwelve.param.RangeParam(5),
        brightness: new fivetwelve.param.MultiRangeParam(6, {
          default: { range: [8, 134], values: [1, 0] },
          strobe: { range: [135, 239], values: [0, 1] }
        }),
        // strobe: new param.RangeParam(6, {rangeStart: 135, rangeEnd: 239}),
        color: new fivetwelve.param.RgbParam([7, 8, 9]),
        colorPreset: new fivetwelve.param.MappedParam(10, MiniLed.FIXED_COLORS),
        colorSpeed: new fivetwelve.param.RangeParam(11),
        // left out here: movement macros
        gobo: new fivetwelve.param.MappedParam(13, MiniLed.GOBOS)
        // left out: gobo-shake, gobo-wheel-rotate
      }
    }));
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
};

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
};
