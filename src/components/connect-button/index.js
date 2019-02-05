import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { getConnections } from '../../selectors/index.js'

import '@polymer/paper-button/paper-button.js'
import { buttons } from '../../styles/buttons.js'

/*
 * Connect to an external system via USB or Bluetooth
 */
class ConnectButton extends connect(store)(LitElement) {

  static get properties() {
    return {
      label: { type: String },
      type: { type: String },
      connected: { type: Boolean },
      connections: { type: Object }
    }
  }

  _stateChanged(state) {
    this.connections = getConnections(state)
    this.connected = this.connections[this.type].connected
  }

  computeClass(connected) {
    return connected 
      ? 'primary'
      : 'warning'
  }

  render() {
    const { connected, label } = this

    return html`
      ${buttons}

      <paper-button class="${this.computeClass(connected)}">${label}</paper-button>
    `
  }
}

customElements.define('connect-button', ConnectButton)
