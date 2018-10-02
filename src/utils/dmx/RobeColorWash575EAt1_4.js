import RangeParam from '/libs/fivetwelve/lib/param/RangeParam.js'
import MappedParam from '/libs/fivetwelve/lib/param/MappedParam.js'
import HiResParam from '/libs/fivetwelve/lib/param/HiResParam.js'

import DmxDevice from './DmxDevice.js'

export default class RobeColorWash575EAt1_4 extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        pan: new HiResParam([1, 2], { min: -265, max: 265 }),
        tilt: new HiResParam([3, 4], { min: -140, max: 140 }),
        speed: new RangeParam(5, { min: 0, max: 255 }),
        // Power/Special functions 6
        panTiltMacro: new MappedParam(7, RobeColorWash575EAt1_4.PANTILTMACRO),
        panTiltMacroSpeed: new RangeParam(8, { min: 0, max: 255 }),
        // colorWheel1 9
        // colorWheel2 10
        gobo: new MappedParam(11, RobeColorWash575EAt1_4.GOBOS),
        goboWheelRotating: new RangeParam(12, { min: 0, max: 255 }),
        goboRotation: new RangeParam(13, { min: 0, max: 255 }),
        prism: new RangeParam(14, { min: 0, max: 255 }),
        prismRotation: new RangeParam(15, { min: 0, max: 255 }),
        frost: new RangeParam(16, { min: 0, max: 255 }),
        iris: new RangeParam(17, { min: 0, max: 255 }),
        zoom: new RangeParam(18, { min: 0, max: 255 }),
        focus: new RangeParam(19, { min: 0, max: 255 }),
        strobe: new RangeParam(20, { min: 0, max: 255 }),
        dimmer: new RangeParam(21, { min: 0, max: 255 })
      }
    }))

    this.channels = 21
    this.weight = 3
  }
}

RobeColorWash575EAt1_4.PANTILTMACRO = {
  off: [0, 9],
  circle: [32, 63],
  horizontalEight: [64, 95],
  verticalEight: [96, 127],
  rectangle: [128, 159],
  triangle: [160, 191],
  fivePointedStar: [192, 223],
  cross: [224, 255]
}
RobeColorWash575EAt1_4.GOBOS = {
  open: [0, 1],
  gobo1: [7, 8],
  gobo2: [13, 14],
  gobo3: [19, 20],
  gobo4: [26, 27],
  gobo5: [32, 33],
  gobo6: [39, 40],
  gobo7: [45, 46],
  gobo8: [51, 52],
  gobo9: [64, 65]
}
