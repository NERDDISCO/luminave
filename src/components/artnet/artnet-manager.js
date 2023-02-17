import { LitElement, html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { setArtnet } from '../../actions/index.js'
import { getLive, getArtnetUrl, getArtnetConnected, getArtnetReconnect, getUniverses } from '../../selectors/index.js'
// import { setArtnetData } from '../../utils/index.js'
import '../integration/integration-configuration.js'
import '../integration/integration-websocket.js'

/*
 * Handle the connection to Art-Net
 *
 * Note: As of now there should only be one instance of the ArtnetManager because the event
 */
class ArtnetManager extends connect(store)(LitElement) {

  static get properties() {
    return {
      live: { type: Boolean },
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
    this.live = getLive(state)
    this.url = getArtnetUrl(state)
    this.connected = getArtnetConnected(state)
    this.reconnect = getArtnetReconnect(state)
    this.universes = getUniverses(state)
  }

  connectedCallback() {
    super.connectedCallback()

    window.addEventListener('send-universe-to-artnet', this.listenSendUniverse.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    window.removeEventListener('send-universe-to-artnet', this.listenSendUniverse.bind(this))
  }

  listenSendUniverse() {
    this.handleSend()
  }

  /*
   * @TODO: Create a diff and don't send everything all the time, @see BridgeClientDriver#send
   */
  handleSend() {
    this.send(0)
  }

  firstUpdated() {
    this._websocket = this.shadowRoot.querySelector('#websocket')
  }

  /**
   * Update the URL that is pointing to Art-Net
   * 
   * @param {Object} e - The event
   */
  handleUrlChanged(e) {
    const { url } = e.detail
    store.dispatch(setArtnet({ url }))
  }

  /**
   * Update the flag that indicates if auto-reconnect should happen or not
   * 
   * @param {Object} e - The event
   */
  handleReconnectChanged(e) {
    const { reconnect } = e.detail
    store.dispatch(setArtnet({ reconnect }))
  }

  /**
   * Update the connection status (connected vs disconnected)
   * 
   * @param {Object} e - The event
   */
  handleConnection(e) {
    const { connected, connectionStatus } = e.detail
    store.dispatch(setArtnet({ connected }))

    this._connectionStatus = connectionStatus
    this._connected = connected
    this.requestUpdate()
  }

  /**
   * When ever a message was send from Art-Net it should be saved into a global object
   * (because of performance issues) and other components should be informed about it
   * by triggering a global event "received-data-from-Art-Net"
   * 
   * @param {Object} e - The event
   */
  handleMessage(e) {
    const now = new Date()

    // Received data from Art-Net
    window.dispatchEvent(new CustomEvent('received-data-from-artnet', { detail: { now } }))
  }

  send(universe) {
    if (this.connected && this._websocket !== undefined) {
      const batch = this.universes[0].channels

      this._websocket.socket.send(JSON.stringify(batch))
    }
  }


  render() {
    const { url, reconnect, _connectionStatus, _connected } = this
    const integrationName = "Art-Net"

    return html`
      <integration-websocket
        .url="${url}"
        .reconnect="${reconnect}"
        .name="${integrationName}"

        id="websocket"

        @connection-opened="${e => this.handleConnection(e)}"
        @connection-closed="${e => this.handleConnection(e)}"
        @connection-error="${e => this.handleConnection(e)}"
        @message-received="${e => this.handleMessage(e)}"
      >
      </integration-websocket>

      <integration-configuration 
        .url="${url}"
        .reconnect="${reconnect}"
        .name="${integrationName}"
        .connectionStatus="${_connectionStatus}"
        .connected="${_connected}"
        .reconnectIntervalConfigurable="${true}"

        @url-changed="${e => this.handleUrlChanged(e)}"
        @reconnect-changed="${e => this.handleReconnectChanged(e)}"
        @open-connection="${e => this._websocket.connect()}"
        @close-connection="${e => this._websocket.disconnect()}"
      >
      </integration-configuration>
    `
  }
}

customElements.define('artnet-manager', ArtnetManager)
