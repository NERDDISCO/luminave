import RgbParam from 'fivetwelve/lib/param/RgbParam.js'
import RangeParam from './param/RangeParam.js'
import HiResParam from './param/HiResParam.js'
import MappedParam from 'fivetwelve/lib/param/MappedParam.js'

import DmxDevice from './DmxDevice.js'

/*
 * @see https://www.robe.cz/index.php?type=10898&tx_odproducts_f%5baction%5d=downloadFile&tx_odproducts_f%5bfile%5d=robe/downloads/user_manuals/User_manual_Robin_300_LEDWash_plus.pdf
 */
export default class RobeRobin300LEDWash extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {
        // pan: new HiResParam([1, 2], { min: -90, max: 90 }),
        pan: new RangeParam(1, { min: -90, max: 90 }),
        tilt: new RangeParam(3, { min: -60, max: 60 }),
        // tilt: new HiResParam([3, 4], { min: -60, max: 60 }),  
        speed: new RangeParam(5, { min: 0, max: 255 }),
        // special functions on 6
        color: new RgbParam([7, 8, 9]),
        white: new RangeParam(10, { min: 0, max: 255 }),
        // CTC on 11
        // virtual color wheel on 12
        zoom: new RangeParam(13, { min: 0, max: 255 }),
        shutter: new MappedParam(14, RobeRobin300LEDWash.SHUTTER),
        dimmer: new RangeParam(15, { min: 0, max: 255 })
      }
    }))

    this.channels = 15
    this.weight = 8.2
  }
}

RobeRobin300LEDWash.SHUTTER = {
  open: [224, 255],
  closed: [0, 31],
  strobeSlow: [64, 65],
  strobeFast: [94, 95],
  pulseOpening: [128, 129],
  pulseClosing: [144, 145],
  strobeSlowRandom: [192, 193],
  strobeFastRandom: [222, 223],
}
