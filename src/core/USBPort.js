/*
 * USB port on the computer
 */
export default class USBPort {

  constructor(param) {
    this.device = param.device
  }

  connect() {
    return this.device.open().
    // @TODO: What is this?
    then(() => {
      if (this.device.configuration === null) {
        // @TODO: What is this?
        return this.device.selectConfiguration(1)
      }
    }).
    // @TODO: What is this?
    then(() => this.device.claimInterface(2)).
    // @TODO: What is this?
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
    // @TODO: What is this?
    return this.device.transferOut(4, data)
  }

}
