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
import '../storage-manager/index.js'
import '../animation-manager/index.js'

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
      <style>
        .grid {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          width: 100vw;
        }
      </style>

      <div class="grid">
        <usb-dmx-manager></usb-dmx-manager>
        <storage-manager></storage-manager>

        <div>
          <bpm-meter bpm="[[bpm]]"></bpm-meter>
          <tap-button></tap-button>
        </div>
      </div>

      <universe-manager universes={{universeManager}}></universe-manager>

      <scene-manager scenes={{sceneManager}}></scene-manager>

      <animation-manager animations="{{animationManager}}"></animation-manager>
    `
  }
}

customElements.define('visionlord-dashboard', VisionLordDashboard)
