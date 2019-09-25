import DmxDevice from './DmxDevice.js'
import RgbParam from './param/RgbParam.js'
import Color from 'fivetwelve/lib/util/Color'

export default class BasicColorCMY extends DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: { color: new RgbParam([1, 2, 3], Color.CMY) }
    }))

    this.layout = {}
    this.layout.width = 1
    this.layout.height = 1

    this.channels = 3
    this.weight = 1.2
  }
}
