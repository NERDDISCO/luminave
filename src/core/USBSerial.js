import USBPort from './USBPort.js'

export default class USBSerial {

  constructor() {

  }

  getPorts() {
    return navigator.usb.getDevices().then(devices => {
      return devices.map(device => new USBPort(device))
    })
  }

  requestPort() {
    // Only request the port for specific devices
    const filters = [
      { 'vendorId': 0x2341, 'productId': 0x8036 },
      { 'vendorId': 0x2341, 'productId': 0x8037 }, // Arduino LLC (9025),
      { 'vendorId': 0x2a03, 'productId': 0x8040 }, // Arduino LLC (10755), Leonardo ETH (32832)
    ]
    // Request access to the USB device
    return navigator.usb.requestDevice({ filters: filters }).then(
      device => new USBPort({ device: device })
    )
  }


}
