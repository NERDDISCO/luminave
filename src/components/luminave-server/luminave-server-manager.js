
import { LitElement, html, css } from 'lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { setLuminaveServer } from '../../actions/luminave-server.js'
import { getLuminaveServerUrl, getLuminaveServerConnected, getLuminaveServerReconnect } from '../../selectors/luminave-server.js'
import '../integration/integration-configuration.js'
import '../integration/integration-websocket.js'

/**
 * Handle the connection to the luminave-server
 */
class LuminaveServerManager extends connect(store)(LitElement) {

  static get properties() {
    return {
      connected: { type: Boolean },
      url: { type: String }
    }
  }

  constructor() {
    super()

    // State of the actual WebSocket connection (connected vs disconnected)
    this._connected = false
    // State of the actual WebSocket connection as text
    this._connectionStatus = undefined
  }

  _stateChanged(state) {
    this.url = getLuminaveServerUrl(state)
    this.connected = getLuminaveServerConnected(state)
    this.reconnect = getLuminaveServerReconnect(state)
  }

  firstUpdated() {
    this._websocket = this.shadowRoot.querySelector('#websocket')
  }

  /**
   * Update the URL that is pointing to the luminave-server
   * 
   * @param {Object} e - The event
   */
  handleUrlChanged(e) {
    const { url } = e.detail
    store.dispatch(setLuminaveServer({ url }))
  }

  /**
   * Update the flag that indicates if auto-reconnect should happen or not
   * 
   * @param {Object} e - The event
   */
  handleReconnectChanged(e) {
    const { reconnect } = e.detail
    store.dispatch(setLuminaveServer({ reconnect }))
  }

  /**
   * Update the connection status (connected vs disconnected)
   * 
   * @param {Object} e - The event
   */
  handleConnection(e) {
    const { connected, connectionStatus } = e.detail
    store.dispatch(setLuminaveServer({ connected }))

    this._connectionStatus = connectionStatus
    this._connected = connected
    this.requestUpdate()
  }

  static get styles() {
    return css`
    `
  }

  render() {
    const { url, reconnect, _connectionStatus, _connected } = this

    return html`
      <integration-websocket
        .url="${url}"
        .reconnect="${reconnect}"
        .name="luminave-server"

        id="websocket"

        @connection-opened="${e => this.handleConnection(e)}"
        @connection-closed="${e => this.handleConnection(e)}"
        @connection-error="${e => this.handleConnection(e)}"
      >
      </integration-websocket>

      <integration-configuration 
        .url="${url}"
        .reconnect="${reconnect}"
        .name="luminave-server"
        .connectionStatus="${_connectionStatus}"
        .connected="${_connected}"

        @url-changed="${e => this.handleUrlChanged(e)}"
        @reconnect-changed="${e => this.handleReconnectChanged(e)}"
        @open-connection="${e => this._websocket.connect()}"
        @close-connection="${e => this._websocket.disconnect()}"
      >
      </integration-configuration>
    `
  }
}

customElements.define('luminave-server-manager', LuminaveServerManager)
