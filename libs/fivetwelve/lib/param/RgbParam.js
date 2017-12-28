import Param from './DmxParam.js'
import Color from '../util/Color.js'

/**
 * RGB-Params are used to control a color-mixing-unit of a light-fixture.
 */
export default class RgbParam extends Param {

  /**
   * Create a new RGB-Param.
   * @param {Array.<Number>} channels The assigned DMX-channels within the
   *   device (1-based channel number passed as [r,g,b]).
   * @param {RgbParam.RGB|RgbParam.CMY} format The  color-format used by the
   *   device.
   */
  constructor(channels, format = RgbParam.RGB) {
    super(channels)

    this.color = new Color(0, 0, 0)
    this.format = format
  }


  setValue(device, color) {
    this.color.set(color)

    const colorData = this.format === RgbParam.RGB
        ? this.color.rgb : this.color.cmy
    for (let i = 0; i < 3; i++) {
      device.setChannelValue(this.channels[i], colorData[i])
    }
  }


  getValue(device) {
    // make sure color is initialized
    if (!this.color) {
      this.color = new Color()
    }

    const channelValues = [device.getChannelValue(this.channels[0]),
      device.getChannelValue(this.channels[1]),
      device.getChannelValue(this.channels[2])]

    if (this.format === RgbParam.RGB) {
      this.color.rgb = channelValues
    } else if (this.format === RgbParam.CMY) {
      this.color.cmy = channelValues
    }

    return this.color
  }
}

RgbParam.RGB = Symbol('RGB')
RgbParam.CMY = Symbol('CMY')
