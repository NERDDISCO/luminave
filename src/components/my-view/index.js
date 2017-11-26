import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { setChannel, connectUsb, connectBluetooth } from '../../actions/index.js'
import '../channel-grid/index.js'
import '../bpm-meter/index.js'
import '../tap-button/index.js'
import '../connect-button/index.js'

class MyView extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      channels: {
        type: Array,
        statePath: 'channels'
      },
      bpm: {
        type: Number,
        statePath: 'bpm'
      },
      usb: {
        type: Boolean,
        statePath: 'connections.usb'
      },
      bluetooth: {
        type: Boolean,
        statePath: 'connections.bluetooth'
      }
    }
  }

  connectUsb(e) {
    this.dispatch(connectUsb(true))
  }

  disconnectUsb(e) {
    this.dispatch(connectUsb(false))
  }

  connectBluetooth(e) {
    this.dispatch(connectBluetooth(true))
  }

  disconnectBluetooth(e) {
    this.dispatch(connectBluetooth(false))
  }

  static get template() {
    return `
      <h1>USB: {{usb}}</h1>
      <connect-button label="USB" on-connect="connectUsb" on-disconnect="disconnectUsb" connected="{{usb}}"></connect-button>
      <connect-button label="BLUETOOTH" on-connect="connectBluetooth" on-disconnect="disconnectBluetooth" connected="{{bluetooth}}"></connect-button>
      <bpm-meter bpm="{{bpm}}"></bpm-meter>
      <tap-button></tap-button>
      <channel-grid array="{{channels}}"></channel-grid>
    `
  }
}

customElements.define('my-view', MyView)
