import fivetwelve from '/libs/fivetwelve/index.js'
import USBSerial from '/src/core/USBSerial.js'
import ArduinoLeonardoETHDriver from '/src/devices/dmx/driver/ArduinoLeonardoETHDriver.js'

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

    // @TODO: Move ALL OF THIS into it's own module
    const driver = new ArduinoLeonardoETHDriver({ serialport: this.port })
    // Create the output by using the driver and set the amount of universes that are controlled by this interface
    this.output = fivetwelve.default(driver, 1)
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


  // update(values) {
  //   // console.log(values)
  //
  //   // values.fill(0, values.length, this.data.length)
  //
  //   // this.data[7 - 1] = 255
  //   // this.data[10] = 255
  //   //
  //   // this.data[14 - 1] = 255
  //   // this.data[16] = 255
  //   console.log(this.data)
  //
  //   if (this.port) {
  //     this.port.send(this.data)
  //   }
  // }

  update(channel, value) {
    if (this.port) {
      this.data[channel] = value
      this.port.send(this.data)
    }
  }

}
