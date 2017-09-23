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

    this.data = new Uint8Array(512)
    this.data.fill(0)
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
    console.log(values)
    values.fill(0, values.length, this.data.length)

    this.port.send(values)

    console.log(this.data)
    console.log(values)
  }

}
