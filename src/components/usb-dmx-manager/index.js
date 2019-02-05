import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import Controller from 'webusb-dmx512-controller/controller.js'
import { connectUsb } from '../../actions/index.js'
import '../connect-button/index.js'
import { getUsbDmxControllerConnected, getUniverses } from '../../selectors/index.js'

/*
 * Handle the connection to a WebUSB DMX512 Controller
 * @see https://github.com/NERDDISCO/webusb-dmx512-controller
 */
class UsbDmxManager extends connect(store)(LitElement) {

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
        console.error(error)
        store.dispatch(connectUsb(false))
      })
  }

  static get properties() {
    return {
      usbConnected: { type: Boolean },
      universes: { type: Array }
    }
  }

  _stateChanged(state) {
    this.usbConnected = getUsbDmxControllerConnected(state)
    this.universes = getUniverses(state)
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
    if (this.usbConnected) {
      // Send universe 0 to the USB DMX controller
      this.controller.send(this.universes[0].channels)
      .catch(error => {
        console.error(error.code, error)

        switch (error.code) {
          // The device was disconnected
          case 8:
          // A transfer error has occurred
          case 19:
          // The transfer was cancelled
          case 20:

            store.dispatch(connectUsb(false))
            break;
        
          default:
            break;
        }
      })
    }
  }

  handleConnectButtonClick() {

    // Disconnect from USB controller
    if (this.usbConnected) {

      if (this.controller.device === undefined) {
        store.dispatch(connectUsb(false))
      } else {
        this.controller.disconnect().then(() => {
          // Disconnected
          store.dispatch(connectUsb(false))
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
      store.dispatch(connectUsb(true))

      // // Receive data
      // this.controller.device.onReceive = data => {
      //   // const textDecoder = new TextDecoder()
      //   // console.log(textDecoder.decode(data))
      // }
      //
      // // Receive error
      // this.controller.device.onReceiveError = error => {
      //   // USB is disconnected
      //   store.dispatch(connectUsb(false))
      //   console.log(error)
      // }

    }, error => {
      // USB is disconnected
      store.dispatch(connectUsb(false))
      console.error(error)
    })
  }

  render() {
    return html`
      <connect-button type="usb" label="USB" @click="${() => this.handleConnectButtonClick()}"></connect-button>
    `
  }
}

customElements.define('usb-dmx-manager', UsbDmxManager)
