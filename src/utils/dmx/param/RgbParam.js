import { default as FivetwelveRgbParam } from 'fivetwelve/lib/param/RgbParam.js'


/**
 * 
 */
export default class RgbParam extends FivetwelveRgbParam {

  /**
   * Create a new RGB-Param.
   * 
   * @param {Array<number>} channels - The assigned DMX-channels within the
   * device (1-based channel number passed as [r,g,b]).
   * 
   * @param {RgbParam.RGB|RgbParam.CMY} format - The color-format used by the
   * device.
   */
  constructor(channels, format = RgbParam.RGB) {
    super(channels, format)
  }

  setValue(device, color) {
    this.color.set(color)

    const colorData = this.format === RgbParam.RGB
        ? this.color.rgb 
        : this.color.cmy
        
    for (let i = 0; i < 3; i++) {
      device.setChannelValue(this.channels[i], colorData[i])
    }
  }

  getValue(device) {
    // make sure color is initialized
    if (!this.color) {
      this.color = new Color()
    }

    let channelValues = [
      device.getChannelValue(this.channels[0]),
      device.getChannelValue(this.channels[1]),
      device.getChannelValue(this.channels[2])
    ]

    if (this.format === RgbParam.RGB) {
      this.color.rgb = channelValues
    } else if (this.format === RgbParam.CMY) {
      this.color.cmy = channelValues
    }

    return this.color
  }

}
