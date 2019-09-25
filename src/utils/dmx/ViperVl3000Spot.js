import RangeParam from 'fivetwelve/lib/param/RangeParam.js'
import MappedParam from 'fivetwelve/lib/param/MappedParam.js'
import HiResParam from 'fivetwelve/lib/param/HiResParam.js'
import RgbParam from './param/RgbParam.js'

import DmxDevice from './DmxDevice.js'

export default class ViperVl3000Spot extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        intensity: new RangeParam(1, { min: 0, max: 255 }),
        pan: new HiResParam([2, 3], { min: -270, max: 270 }),
        tilt: new HiResParam([4, 5], { min: -135, max: 135 }),
        edge: new RangeParam(6, { min: 0, max: 255 }),
        zoom: new RangeParam(7, { min: 0, max: 255 }),
        ctoMixer: new RangeParam(8, { min: 0, max: 255 }),

        /**
         * 9: Blue
         * 10: Amber (Yellow)
         * 11: Magenta
         */
        color: new RgbParam([9, 11, 10], RgbParam.CMY),
        colorWheel: new RangeParam(12, { min: 0, max: 255 }),

        gobo1: new MappedParam(13, ViperVl3000Spot.GOBOS),
        gobo1Rotation: new HiResParam([14, 15], { min: 0, max: 65535 }),

        gobo2: new MappedParam(16, ViperVl3000Spot.GOBOS),
        gobo2Rotation: new HiResParam([17, 18], { min: 0, max: 65535 }),

        gobo3: new MappedParam(19, ViperVl3000Spot.GOBOS2),
        gobo3Rotation: new HiResParam([20, 21], { min: 0, max: 65535 }),

        // Small - Open
        beamIris: new RangeParam(22, { min: 0, max: 255 }),

        // Open - Max
        strobe: new RangeParam(23, { min: 0, max: 255 }),

        focusTime: new RangeParam(24, { min: 0, max: 255 }),
        colorTime: new RangeParam(25, { min: 0, max: 255 }),
        beamTime: new RangeParam(26, { min: 0, max: 255 }),
        goboTime: new RangeParam(27, { min: 0, max: 255 }),

        control: new RangeParam(28, { min: 0, max: 255 })
      }
    }))

    this.channels = 28
    this.weight = 37
  }
}

ViperVl3000Spot.GOBOS = {
  open: [0, 7],
  gobo1: [8, 25],
  gobo2: [26, 44],
  gobo3: [45, 63],
  gobo4: [64, 82],
  gobo5: [83, 99]
}

ViperVl3000Spot.GOBOS2 = {
  open: [0, 10],
  gobo1: [11, 33],
  gobo2: [34, 54],
  gobo3: [55, 75],
  gobo4: [76, 97]
}
