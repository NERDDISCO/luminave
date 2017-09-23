/*
 * USB port on the computer
 */
export default class USBPort {

  constructor(param) {
    this.device = param.device
  }

  connect() {
    const readLoop = () => {

      this.controller.transferIn(5, 64).then(result => {
        this.onReceive(result.data)
        readLoop()
      }, error => {
        this.onReceiveError(error)
      })
    }

    return this.device.open().
    then(() => {
      if (this.device.configuration === null) {
        return this.device.selectConfiguration(1)
      }
    }).
    then(() => this.device.claimInterface(2)).
    then(() => this.device.controlTransferOut({
      'requestType': 'class',
      'recipient': 'interface',
      'request': 0x22,
      'value': 0x01,
      'index': 0x02
    })).
    then(() => {
      readLoop()
    })
  }

  disconnect() {
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
    return this.device.transferOut(4, data)
  }

}
