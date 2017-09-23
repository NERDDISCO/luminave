import USBSerial from './USBSerial.js'

/**
 * Manage USB ports.
 */
export default class USBManager {
  constructor(param) {

    this.config = param.config

    this.port = null

    // List of MIDI controller
    this.list = new Map()

    this.serial = new USBSerial({})
  }


  enable() {
    this.serial.requestPort().then(selectedPort => {

      this.port = selectedPort
      this.connect()

    }).
    catch(error => {
      console.error(error)
    })
  }


  connect() {
    this.port.connect().then(() => {

      this.port.onReceive = data => {
        const textDecoder = new TextDecoder()
        console.log(textDecoder.decode(data))
      }

      this.port.onReceiveError = error => {
        console.error(error)
      }

    }, error => {
      console.error(error)
    })
  }


  update(values) {
    const data = new Uint8Array(512)
    data.fill(0)

    this.port.send(data)

    console.log(data)
    console.log(values)
  }

}
