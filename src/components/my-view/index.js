import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import '../channel-grid/index.js'
import '../bpm-meter/index.js'
import '../tap-button/index.js'
import '../connect-button/index.js'
import '../usb-manager/index.js'
import '../universe-manager/index.js'
import '../scene-manager/index.js'

class MyView extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      universes: {
        type: Array,
        statePath: 'universeManager'
      },
      bpm: {
        type: Number,
        statePath: 'bpm'
      }
    }
  }

  static get template() {
    return `
      <universe-manager universes={{universeManager}}></universe-manager>

      <scene-manager scenes={{sceneManager}}></scene-manager>

      <usb-manager></usb-manager>

      <connect-button type="usb" label="USB"></connect-button>
      <connect-button type="bluetooth" label="BLUETOOTH"></connect-button>

      <bpm-meter bpm="[[bpm]]"></bpm-meter>
      <tap-button></tap-button>
    `
  }
}

customElements.define('my-view', MyView)
