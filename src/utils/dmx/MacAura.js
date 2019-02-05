import RangeParam from 'fivetwelve/lib/param/RangeParam.js'
import HiResParam from 'fivetwelve/lib/param/HiResParam.js'
import RgbParam from 'fivetwelve/lib/param/RgbParam.js'
import MappedParam from 'fivetwelve/lib/param/MappedParam.js'

import DmxDevice from './DmxDevice.js'

export default class MacAura extends DmxDevice {
  constructor(options) {
    super(Object.assign(options, {
      params: {

        beamShutter: new MappedParam(1, MacAura.SHUTTER),

        beamDimmer: new RangeParam(2, { min: 0, max: 255 }),

        // Wide → narrow
        zoom: new RangeParam(3, { min: 0, max: 255 }),

        pan: new HiResParam([4, 5], { min: -270, max: 270 }),
        tilt: new HiResParam([15, 16], { min: -116, max: 116 }),


        // Fixture control settings: 8
        // Beam color wheel effect: 9

        // Beam
        beamColor: new RgbParam([10, 11, 12]),
        white: new RangeParam(13, { min: 0, max: 255 }),

        // Beam CTC (Color Temeratur Control): 14
        // FX1 select: 15
        // FX1 adjust, sync speed adjust: 16
        // FX2 select: 17
        // FX2 adjust: 18
        // Sync (FX sync): 19

        auraShutter: new MappedParam(20, MacAura.SHUTTER),
        auraDimmer: new RangeParam(21, { min: 0, max: 255 }),

        // Aura color wheel effect: 22
        
        auraColor: new RgbParam([23, 24, 25])
      }
    }))

    this.channels = 25
    this.weight = 5.6
  }

  set color(value) {
    this.beamColor = value
    this.auraColor = value
  }

  set shutter(value) {
    this.beamShutter = value
    this.auraShutter = value
  }

  set dimmer(value) {
    this.beamDimmer = value
    this.auraDimmer = value
  }

}


MacAura.SHUTTER = {
  closed: [0, 19],
  open: [20, 24],
  strobe1: [25, 64],
  strobe2: [70, 84],
  strobe3: [90, 104],
  strobe4: [110, 124],
  strobe5: [130, 144],
  strobe6: [150, 164],
  strobe7: [170, 184],
  strobe8: [190, 204],
  strobe9: [210, 224],
  strobe10: [230, 244]
}
