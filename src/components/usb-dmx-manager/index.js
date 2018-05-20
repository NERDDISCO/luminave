import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import Controller from '/node_modules/webusb-dmx512-controller/controller.js'
import { connectUsb } from '../../actions/index.js'

/*
 * Handle the connection to a WebUSB DMX512 Controller
 * @see https://github.com/NERDDISCO/webusb-dmx512-controller
 */
class UsbDmxManager extends ReduxMixin(PolymerElement) {

  constructor() {
    super()

    this.controller = new Controller({
      filters: [
        // Arduino LLC (9025)
        { vendorId: 0x2341, productId: 0x8036 },
        // Arduino LLC (9025)
        { vendorId: 0x2341, productId: 0x8037 },
        // Arduino LLC (10755), Leonardo ETH (32832)
        { vendorId: 0x2a03, productId: 0x8040 }
      ]
    })

    // Automatically connect to already paired WebUSB DMX512 Controller
    this.controller.autoConnect()
      .then(() => {
        this.connect()
      })
      .catch(error => {
        console.log(error)
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
        statePath: 'universeManager'
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('send-universe-to-usb-dmx-controller', this.listenSendUniverse.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('send-universe-to-usb-dmx-controller', this.listenSendUniverse.bind(this))
  }

  listenSendUniverse(e) {
    if (this.usbConnection.connected) {
      // Send universe 0 to the USB DMX controller
      this.controller.send(this.universes[0].channels)
      .catch(error => {
        console.error(error)
      })
    }
  }

  handleConnectButtonClick() {

    // Disconnect from USB controller
    if (this.usbConnection.connected) {

      if (this.controller.device === undefined) {
        this.dispatch(connectUsb(false))
      } else {
        this.controller.disconnect().then(() => {
          // Disconnected
          this.dispatch(connectUsb(false))
        }, error => {
          console.error(error)
        })
      }

    // Pair with USB controller
    } else {
      this.enable()
    }
  }

  /*
   * Enable WebUSB and request a USBPort
   */
  enable() {
    this.controller.enable().then(() => {
      // Create a connection to the selected Arduino
      this.connect()
    })
    .catch(error => {
      console.error(error)
    })
  }

  /*
   * Connect to a selected USBPort
   */
  connect() {

    this.controller.connect().then(() => {

      // USB is connected
      this.dispatch(connectUsb(true))

      // // Receive data
      // this.controller.device.onReceive = data => {
      //   // const textDecoder = new TextDecoder()
      //   // console.log(textDecoder.decode(data))
      // }
      //
      // // Receive error
      // this.controller.device.onReceiveError = error => {
      //   // USB is disconnected
      //   this.dispatch(connectUsb(false))
      //   console.log(error)
      // }

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
