import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'

class Usb extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      usb: {
        type: Boolean,
        statePath: 'connections.usb',
        observer: 'activeChanged'
      }
    }
  }

  activeChanged() {
    console.log(this.usb)
  }

  static get template() {
    return null
  }
}

customElements.define('usb-controller', Usb)
