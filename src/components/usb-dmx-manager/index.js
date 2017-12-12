import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import fivetwelve from '/libs/fivetwelve/index.js'
import USBPort from './USBPort.js'
import ArduinoLeonardoETHDriver from './ArduinoLeonardoETHDriver.js'
import { connectUsb } from '../../actions/index.js'

class UsbDmxManager extends ReduxMixin(PolymerElement) {

  constructor() {
    super()

    // USBPort
    this.port = null

    // @TODO: Move ALL OF THIS into it's own module
    const driver = new ArduinoLeonardoETHDriver(this.port, {})

    // Create the output by using the driver and set the amount of universes that are controlled by this interface
    // DmxOutput
    this.output = fivetwelve.default(driver, 1)

    // Only request the port for specific devices
    this.usbDeviceFilter = [
      // Arduino LLC (9025)
      { 'vendorId': 0x2341, 'productId': 0x8036 },
      // Arduino LLC (9025)
      { 'vendorId': 0x2341, 'productId': 0x8037 },
      // Arduino LLC (10755), Leonardo ETH (32832)
      { 'vendorId': 0x2a03,'productId': 0x8040 }
    ]

    this.usbDevices = null

    // Check for USB devices that are already paired
    this.getUsbPorts().then(list => {
      if (list[0] !== undefined && list[0].hasOwnProperty('device')) {
        [this.port] = list

        // Auto connect
        this.connect()
      }
    })
  }

  static get properties() {
    return {
      usbConnection: {
        type: Boolean,
        statePath: 'connectionManager.usb'
      },
      universes: {
        type: Array,
        statePath: 'universeManager',
        observer: 'universeChanged'
      }
    }
  }

  universeChanged() {
    if (this.universes[0] !== undefined) {
      this.output.driver.send(this.universes[0].channels)
    }
  }

  handleConnectButtonClick() {

    // Disconnect from USB controller
    if (this.usbConnection.connected) {
      this.port.disconnect().then(() => {
        // Disconnected
      }, error => {
        console.error(error)
      })

    // Pair with USB controller
    } else {
      this.enable()
    }
  }

  /*
   * Get a list of USB devices that are already paired
   */
  getUsbPorts() {
    return navigator.usb.getDevices().
      then(devices => {
        this.devices = devices

        return devices.map(device => new USBPort({ device }))
      })
  }

  /*
   * Get access to USB devices that match the provided filters
   */
  requestUsbPort() {
    // Request access to the USB device
    return navigator.usb.requestDevice({ filters: this.usbDeviceFilter }).
      then(device => new USBPort({ device }))
  }

  /*
   * Enable WebUSB and request a USBPort
   */
  enable() {
    this.requestUsbPort().then(selectedPort => {
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

      // USB is connected
      this.dispatch(connectUsb(true))

      // Receive data
      this.port.onReceive = data => {
        // const textDecoder = new TextDecoder()
        // console.log(textDecoder.decode(data))
      }

      // Receive error
      this.port.onReceiveError = error => {
        // USB is disconnected
        this.dispatch(connectUsb(false))

        console.log(error)
      }

    }, error => {
      // USB is disconnected
      this.dispatch(connectUsb(false))

      console.error(error)
    })
  }

  static get template() {
    return `
      <connect-button type="usb" label="USB" on-click="handleConnectButtonClick"></connect-button>
    `
  }
}

customElements.define('usb-dmx-manager', UsbDmxManager)
