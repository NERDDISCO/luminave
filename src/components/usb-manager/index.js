import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import USB from './USBManager.js'

class UsbManager extends ReduxMixin(PolymerElement) {

  constructor() {
    super()
    this.usb = new USB()
  }

  static get properties() {
    return {
      usbConnection: {
        type: Boolean,
        statePath: 'connectionManager.usb',
        observer: 'activeChanged'
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
      this.usb.update(this.universes[0].channels)
    }
  }

  activeChanged() {
    // this.usb.update(1, 100)
    // this.usb.update(4, 100)

    // if (this.usbConnection.send) {
    //   this.usb.update(1, 100)
    // }

    if (this.usbConnection.connected) {
      this.usb.enable()
    }
  }

  static get template() {
    return `
      <connect-button type="usb" label="USB"></connect-button>
    `
  }
}

customElements.define('usb-manager', UsbManager)
