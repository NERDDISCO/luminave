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
import '../midi-manager/index.js'
import '../timeline-manager/index.js'
import '../live-mode/index.js'
import '../modv-manager/index.js'

class VisionLordDashboard extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      bpm: {
        type: Number,
        statePath: 'bpm'
      },
      live: {
        type: Boolean,
        statePath: 'live'
      },
      editMode: {
        type: Boolean,
        computed: 'computeEditMode(live)'
      }
    }
  }

  computeEditMode(live) {
    return !live
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

        <live-mode></live-mode>

        <modv-manager></modv-manager>
      </div>

      <timeline-manager></timeline-manager>
      <hr>

      <template is="dom-if" if="[[editMode]]">
        <universe-manager universes={{universeManager}}></universe-manager>
        <hr>
      </template>

      <fixture-manager fixtures={{fixtureManager}}></fixture-manager>

      <template is="dom-if" if="[[editMode]]">
        <hr>
        <scene-manager scenes={{sceneManager}}></scene-manager>
        <hr>
        <animation-manager animations="{{animationManager}}"></animation-manager>
        <hr>
      </template>

      <midi-manager controllers="{{midiManager}}"></midi-manager>
    `
  }
}

customElements.define('visionlord-dashboard', VisionLordDashboard)
