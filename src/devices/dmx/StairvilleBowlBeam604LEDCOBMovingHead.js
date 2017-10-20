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
