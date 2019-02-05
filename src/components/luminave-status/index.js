import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { getUsbDmxControllerConnected, getModvConnected, getFivetwelveConnected } from '../../selectors/index.js'

import '../usb-dmx-manager/index.js'
import '../modv-manager/index.js'
import '../fivetwelve-manager/index.js'
import '../dekk-manager/index.js'
import './indicator.js'
import '../color-grid/index.js'
import '../ui-spacer/index.js'


class LuminaveStatus extends connect(store)(LitElement) {
  static get properties() {
    return {
      usbConnected: { type: Boolean },
      modvConnected: { type: Boolean },
      fivetwelveConnected: { type: Boolean }
    }
  }

  _stateChanged(state) {
    this.usbConnected = getUsbDmxControllerConnected(state)
    this.modvConnected = getModvConnected(state)
    this.fivetwelveConnected = getFivetwelveConnected(state)
  }

  render() {
    const { usbConnected, modvConnected, fivetwelveConnected } = this

    return html`
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
        <luminave-status-indicator ?status="${usbConnected}">WebUSB-DMX512</luminave-status-indicator>

        <div class="item">
          <luminave-status-indicator ?status="${modvConnected}">modV</luminave-status-indicator>
        </div>
        <luminave-status-indicator ?status="${fivetwelveConnected}">fivetwelve</luminave-status-indicator>
      </div>
    `
  }
}

customElements.define('luminave-status', LuminaveStatus)
