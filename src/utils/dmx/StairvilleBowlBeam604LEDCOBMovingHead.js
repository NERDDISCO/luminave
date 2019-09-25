import RgbParam from './param/RgbParam.js'
import RangeParam from './param/RangeParam.js'
import HiResParam from 'fivetwelve/lib/param/HiResParam.js'
import PanTiltParam from './param/PanTiltParam.js'

import DmxDevice from './DmxDevice.js'

export default class StairvilleBowlBeam604LEDCOBMovingHead extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        // pan: new HiResParam([1, 2], { min: -270, max: 270 }),
        // tilt: new HiResParam([3, 4], { min: -135, max: 135 }),

        panTilt: new PanTiltParam(
          new HiResParam([1, 2], { min: 0, max: 180 }), 
          new HiResParam([3, 4], { min: 0, max: 120 })
        ),

        // // @TODO: Should be a MappedRange
        // panTilt: new RangeParam(5, {
        //   min: 0,
        //   max: 255
        // }),
        panEndless: new RangeParam(6, {
          min: 0,
          max: 255
        }),
        tiltEndless: new RangeParam(7, {
          min: 0,
          max: 255
        }),
        color: new RgbParam([8, 9, 10]),
        white: new RangeParam(11, {
          min: 0,
          max: 255
        }),
        strobe: new RangeParam(12, {
          min: 0,
          max: 255
        }),
        dimmer: new RangeParam(13, {
          min: 0,
          max: 255
        })
      //   colorMix: new RangeParam(14, {
      //     min: 0,
      //     max: 255
      //   }),
      //   colorStatic: new RangeParam(15, {
      //     min: 0,
      //     max: 255
      //   }),
      //   colorStaticDimmer: new RangeParam(16, {
      //     min: 0,
      //     max: 255
      //   }),
      //   reset: new RangeParam(17, {
      //     min: 0,
      //     max: 255
      //   }),
      //   ambient1Color: new RgbParam([18, 19, 20]),
      //   ambient2Color: new RgbParam([21, 22, 23]),
      //   ambient3Color: new RgbParam([24, 25, 26]),
      //   ambient4Color: new RgbParam([27, 28, 29]),
      //   ambientStrobe: new RangeParam(30, {
      //     min: 0,
      //     max: 255
      //   }),
      //   ambientDimmer: new RangeParam(31, {
      //     min: 0,
      //     max: 255
      //   }),
      //   ambientAutomatic: new RangeParam(32, {
      //     min: 0,
      //     max: 255
      //   }),
      //   ambientAutomaticSpeed: new RangeParam(33, {
      //     min: 0,
      //     max: 255
      //   })

      }
    }))

    this.channels = 33
    this.weight = 5.1
  }
}
