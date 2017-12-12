import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import '../channel-grid/index.js'
import '../bpm-meter/index.js'
import '../tap-button/index.js'
import '../connect-button/index.js'
import '../usb-dmx-manager/index.js'
import '../universe-manager/index.js'
import '../fixture-manager/index.js'
import '../scene-manager/index.js'

class VisionLordDashboard extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      bpm: {
        type: Number,
        statePath: 'bpm'
      }
    }
  }

  static get template() {
    return `
      <usb-dmx-manager></usb-dmx-manager>

      <bpm-meter bpm="[[bpm]]"></bpm-meter>
      <tap-button></tap-button>

      <fixture-manager fixtures={{fixtureManager}}></fixture-manager>

      <universe-manager universes={{universeManager}}></universe-manager>

      <scene-manager scenes={{sceneManager}}></scene-manager>
    `
  }
}

customElements.define('visionlord-dashboard', VisionLordDashboard)
