/**
 * USB port on the computer
 *
 * @deprecated Please remove this after webusb-dmx512-controller/controller.js is feature complete
 */
export default class USBPort {

  constructor(param) {
    this.device = param.device
  }

  connect() {
    return this.device.open().

    // OS did not select a USB configuration yet
    then(() => {
      if (this.device.configuration === null) {
        // Select the first USB configuration
        // = How is the device is powered?
        // = What is its maximum power consumption?
        // = How many interfaces does it have?
        return this.device.selectConfiguration(1)
      }
    }).

    // Get exclusive access to the interface
    then(() => this.device.claimInterface(2)).

    //
    then(() => this.device.controlTransferOut({
      'requestType': 'class',
      'recipient': 'interface',
      'request': 0x22,
      'value': 0x01,
      'index': 0x02
    })).
    then(() => {
      this.readLoop()
    })
  }

  readLoop() {
    // @TODO: What is this?
    this.device.transferIn(5, 512).then(result => {
      this.onReceive(result.data)
      this.readLoop()
    }, error => {
      this.onReceiveError(error)
    })
  }

  disconnect() {
    // @TODO: What is this?
    return this.device.controlTransferOut({
      'requestType': 'class',
      'recipient': 'interface',
      'request': 0x22,
      'value': 0x00,
      'index': 0x02
    }).
    then(() => this.device.close())
  }

  send(data) {
    // Send data to the USB device
    return this.device.transferOut(4, data)
  }

}
