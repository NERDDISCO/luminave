import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

import ReduxMixin from '../../reduxStore.js'
import '../usb-dmx-manager/index.js'
import '../modv-manager/index.js'
import '../fivetwelve-manager/index.js'
import '../dekk-manager/index.js'
import './indicator.js'
import '../color-grid/index.js'

import { modvData } from '../../utils/index.js'


class LuminaveStatus extends ReduxMixin(PolymerElement) {
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
      },
      usbConnected: {
        type: Boolean,
        statePath: 'connectionManager.usb.connected'
      },
      modvConnected: {
        type: Boolean,
        statePath: 'modvManager.connected'
      },
      modvColors: Array,
      fivetwelveConnected: {
        type: Boolean,
        statePath: 'fivetwelveManager.connected'
      }
    }
  }

  computeEditMode(live) {
    return !live
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('received-data-from-modv', this.listenReceivedModvData.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('received-data-from-modv', this.listenReceivedModvData.bind(this))
  }

  listenReceivedModvData(e) {
    this.modvColors = modvData.colors
  }

  static get template() {
    return `
      <style>
        .grid {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          padding: .5em;
        }

        .item {
          display: inline-flex;
          padding: 0 var(--padding-basic)
        }

        .item color-grid {
          width: 33vw;
        }

        color-grid {
          width: 100%;
        }
      </style>

      <div class="grid">
        <luminave-status-indicator status="[[usbConnected]]">WebUSB-DMX512</luminave-status-indicator>

        <div class="item">
          <luminave-status-indicator status="[[modvConnected]]">modV</luminave-status-indicator>
          <template is="dom-if" if="[[modvConnected]]">
            <color-grid width="4" height="1" colors="[[modvColors]]"></color-grid>
          </template>
        </div>
        <luminave-status-indicator status="[[fivetwelveConnected]]">fivetwelve</luminave-status-indicator>
      </div>
    `
  }
}

customElements.define('luminave-status', LuminaveStatus)
