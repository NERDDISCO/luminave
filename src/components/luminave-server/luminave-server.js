import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import gql from 'graphql-tag'

/*
 * Handle communication with the server
 */
class LuminaveServer extends connect(store)(LitElement) {

  constructor() {
    super()
  }

  static get properties() {
    return { venues: { type: Array } }
  }

  _stateChanged(state) {
  }

  render() {
    return html`
      <h3>Luminave Server</h3>
    `
  }
}

customElements.define('luminave-server', LuminaveServer)
