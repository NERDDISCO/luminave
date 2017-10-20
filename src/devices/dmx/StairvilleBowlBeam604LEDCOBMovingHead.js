import fivetwelve from '/libs/fivetwelve/index.js'

export default class StairvilleBowlBeam604LEDCOBMovingHead extends fivetwelve.DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        pan: new fivetwelve.param.RangeParam(1, {
          min: 0,
          max: 255,
          rangeStart: 0,
          rangeEnd: 255
        }),
        tilt: new fivetwelve.param.HiResParam(
          [3, 4],
          {
            min: -115,
            max: 90
          }
        ),
        speed: new fivetwelve.param.RangeParam(5),
        brightness: new fivetwelve.param.MultiRangeParam(6, {
          default: {
            range: [8, 134],
            values: [1, 0]
          },
          strobe: {
            range: [135, 239],
            values: [0, 1]
          }
        }),
        // strobe: new param.RangeParam(6, {rangeStart: 135, rangeEnd: 239}),
        color: new fivetwelve.param.RgbParam([7, 8, 9])
        // colorPreset: new fivetwelve.param.MappedParam(10, MiniLed.FIXED_COLORS),
        // colorSpeed: new fivetwelve.param.RangeParam(11),
        // left out here: movement macros
        // gobo: new fivetwelve.param.MappedParam(13, MiniLed.GOBOS)
        // left out: gobo-shake, gobo-wheel-rotate
      }
    }))
  }
}
