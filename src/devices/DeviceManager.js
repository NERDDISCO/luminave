import DmxDevice from './DmxDevice.js'

/**
 * Handle all devices
 */
export default class DeviceManager {
  constructor(param) {
    this.list = new Map()
    this.config = param.config
    this.output = param.output
  }

  register() {

    // Initialize all dmx devices
    this.config.devices.dmx.forEach((element, index, array) => {

      let device = new DmxDevice({
        type: element.type,
        output: this.output,
        universe: element.universe,
        address: element.address
      })

      // Set default values

      if (device.instance.hasOwnProperty('dimmer')) {
        device.instance.dimmer = this.config.global.dimmer
      }

      if (device.instance.hasOwnProperty('strobe')) {
        device.instance.strobe = 0
      }

      if (device.instance.hasOwnProperty('mode')) {
        device.instance.mode = 'dmx'
      }

      if (device.instance.hasOwnProperty('color')) {
        device.instance.color = 'rgb(0, 0, 0)'
      }

      this.add(element.deviceId, device)
    })

  }

  add(deviceId, device) {
    this.list.set(deviceId, device)
  }

  get(deviceId) {
    return this.list.get(deviceId).instance
  }

  reset() {
    this.list.forEach((element, key, map) => {

      if (typeof element.reset === 'function') {
        element.reset()
      }

    })
  }
}
