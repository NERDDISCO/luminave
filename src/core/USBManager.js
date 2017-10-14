import fivetwelve from '/libs/fivetwelve/index.js'
import USBSerial from './USBSerial.js'
import ArduinoLeonardoETHDriver from '/src/devices/dmx/driver/ArduinoLeonardoETHDriver.js'

/**
 * Manage USB ports.
 */
export default class USBManager {
  constructor(param) {

    this.config = param.config

    // List of MIDI controller
    this.list = new Map()

    // USBSerial
    this.serial = new USBSerial({})

    // USBPort
    this.port = null

    this.devices = null

    // @TODO: Move ALL OF THIS into it's own module
    const driver = new ArduinoLeonardoETHDriver(this.port, {})
    // Create the output by using the driver and set the amount of universes that are controlled by this interface
    // DmxOutput
    this.output = fivetwelve.default(driver, 1)

    // Check for USB devices that are already paired
    this.serial.getPorts().then(list => {

      if (list[0] !== undefined && list[0].hasOwnProperty('device')) {
        [this.port] = list
        this.connect()
      }

    })
  }


  /*
   * Enable WebUSB and request a USBPort
   */
  enable() {
    this.serial.requestPort().then(selectedPort => {

      this.port = selectedPort
      this.connect()

    }).
    catch(error => {
      console.error(error)
    })
  }

  /*
   * Connect to a selected USBPort
   */
  connect() {

    this.output.driver.serialport = this.port

    this.port.connect().then(() => {

      // Receive data
      this.port.onReceive = data => {
        const textDecoder = new TextDecoder()
        // console.log(textDecoder.decode(data))
      }

      // Receive error
      this.port.onReceiveError = error => {
        console.error(error)
      }

    }, error => {
      console.error(error)
    })
  }

  /*
   * Update the value of a specific channel
   *
   * @TODO: Does this make any sense here? Shouldn't it be moved into the driver?
   */
  update(channel, value) {
    // @TODO: Fix for multiple universes
    this.output.getBuffer(1)[channel] = value

    // @TODO: Remove after debugging
    console.log(this.output.getBuffer(1))
  }

}
