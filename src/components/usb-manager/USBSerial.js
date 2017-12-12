import USBPort from './USBPort.js'

export default class USBSerial {

  constructor() {
    // Only request the port for specific devices
    this.filters = [
    // Arduino LLC (9025)
    {
      'vendorId': 0x2341,
      'productId': 0x8036
    },
    // Arduino LLC (9025)
    {
      'vendorId': 0x2341,
      'productId': 0x8037
    },
    // Arduino LLC (10755), Leonardo ETH (32832)
    {
      'vendorId': 0x2a03,
      'productId': 0x8040
    }]

    this.devices = null
  }

  getPorts() {
    return navigator.usb.getDevices().
      then(devices => {
        this.devices = devices

        return devices.map(device => new USBPort({ device }))
      })
  }

  requestPort() {
    // Request access to the USB device
    return navigator.usb.requestDevice({ filters: this.filters }).
      then(device => new USBPort({ device }))
  }


}
