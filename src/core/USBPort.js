"use strict";

export default class USBPort {

  constructor(param) {
    this.device_ = param.device;
  }

  connect() {
    let readLoop = () => {

      this.device_.transferIn(5, 64).then(result => {
        this.onReceive(result.data);
        readLoop();
      }, error => {
        this.onReceiveError(error);
      });
    };

    return this.device_.open()
      .then(() => {
        if (this.device_.configuration === null) {
          return this.device_.selectConfiguration(1);
        }
      })
      .then(() => this.device_.claimInterface(2))
      .then(() => this.device_.controlTransferOut({
        'requestType': 'class',
        'recipient': 'interface',
        'request': 0x22,
        'value': 0x01,
        'index': 0x02
      }))
      .then(() => {
        readLoop();
      });
  }

  disconnect() {
    return this.device_.controlTransferOut({
        'requestType': 'class',
        'recipient': 'interface',
        'request': 0x22,
        'value': 0x00,
        'index': 0x02
      })
      .then(() => this.device_.close());
  }

  send(data) {
    return this.device_.transferOut(4, data);
  }

}
