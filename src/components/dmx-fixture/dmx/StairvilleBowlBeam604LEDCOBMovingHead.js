import fivetwelve from '/libs/fivetwelve/index.js'

export default class StairvilleBowlBeam604LEDCOBMovingHead extends fivetwelve.DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        pan: new fivetwelve.param.RangeParam(1, {
          min: 0,
          max: 255
        }),
        panFine: new fivetwelve.param.RangeParam(2, {
          min: 0,
          max: 255
        }),
        tile: new fivetwelve.param.RangeParam(3, {
          min: 0,
          max: 255
        }),
        tileFine: new fivetwelve.param.RangeParam(4, {
          min: 0,
          max: 255
        }),
        panTilt: new fivetwelve.param.RangeParam(5, {
          min: 0,
          max: 255
        }),
        panEndless: new fivetwelve.param.RangeParam(6, {
          min: 0,
          max: 255
        }),
        tiltEndless: new fivetwelve.param.RangeParam(7, {
          min: 0,
          max: 255
        }),
        color: new fivetwelve.param.RgbParam([8, 9, 10]),
        white: new fivetwelve.param.RangeParam(11, {
          min: 0,
          max: 255
        }),
        strobe: new fivetwelve.param.RangeParam(12, {
          min: 0,
          max: 255
        }),
        dimmer: new fivetwelve.param.RangeParam(13, {
          min: 0,
          max: 255
        }),
        colorMix: new fivetwelve.param.RangeParam(14, {
          min: 0,
          max: 255
        }),
        colorStatic: new fivetwelve.param.RangeParam(15, {
          min: 0,
          max: 255
        }),
        colorStaticDimmer: new fivetwelve.param.RangeParam(16, {
          min: 0,
          max: 255
        }),
        reset: new fivetwelve.param.RangeParam(17, {
          min: 0,
          max: 255
        }),
        ambient1Color: new fivetwelve.param.RgbParam([18, 19, 20]),
        ambient2Color: new fivetwelve.param.RgbParam([21, 22, 23]),
        ambient3Color: new fivetwelve.param.RgbParam([24, 25, 26]),
        ambient4Color: new fivetwelve.param.RgbParam([27, 28, 29]),
        ambientStrobe: new fivetwelve.param.RangeParam(30, {
          min: 0,
          max: 255
        }),
        ambientDimmer: new fivetwelve.param.RangeParam(31, {
          min: 0,
          max: 255
        }),
        ambientAutomatic: new fivetwelve.param.RangeParam(32, {
          min: 0,
          max: 255
        }),
        ambientAutomaticSpeed: new fivetwelve.param.RangeParam(33, {
          min: 0,
          max: 255
        })

        // panTilt: new fivetwelve.param.MultiRangeParam(5, {
        //   slowToFast: {
        //     range: [0, 225],
        //     values: [0, 225]
        //   },
        //   black: {
        //     range: [226, 235],
        //     values: [0, 1]
        // }
        // })
      }
    }))
  }
}
