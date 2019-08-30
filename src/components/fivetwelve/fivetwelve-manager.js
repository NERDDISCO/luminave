import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { setFivetwelve } from '../../actions/fivetwelve.js'
import { getLive, getUniverses } from '../../selectors/index.js'
import { getFivetwelveUrl, getFivetwelveConnected, getFivetwelveReconnect } from '../../selectors/fivetwelve.js'
import '../integration/integration-configuration.js'
import '../integration/integration-websocket.js'
import Buffer from 'buffer'


/*
 * Handle the connection to luminave-fivetwelve
 *
 */
class FivetwelveManager extends connect(store)(LitElement) {

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
    this.url = getFivetwelveUrl(state)
    this.connected = getFivetwelveConnected(state)
    this.reconnect = getFivetwelveReconnect(state)
    this.universes = getUniverses(state)
  }

  connectedCallback() {
    super.connectedCallback()

    window.addEventListener('send-universe-to-fivetwelve', this.listenSendUniverse.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    window.removeEventListener('send-universe-to-fivetwelve', this.listenSendUniverse.bind(this))
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
   * Update the URL that is pointing to modV
   * 
   * @param {Object} e - The event
   */
  handleUrlChanged(e) {
    const { url } = e.detail
    store.dispatch(setFivetwelve({ url }))
  }

  /**
   * Update the flag that indicates if auto-reconnect should happen or not
   * 
   * @param {Object} e - The event
   */
  handleReconnectChanged(e) {
    const { reconnect } = e.detail
    store.dispatch(setFivetwelve({ reconnect }))
  }

  /**
   * Update the connection status (connected vs disconnected)
   * 
   * @param {Object} e - The event
   */
  handleConnection(e) {
    const { connected, connectionStatus } = e.detail
    store.dispatch(setFivetwelve({ connected }))

    this._connectionStatus = connectionStatus
    this._connected = connected
    this.requestUpdate()
  }

  /**
   * When ever a message was send from fivetwelve it should be saved into a global object
   * (because of performance issues) and other components should be informed about it
   * by triggering a global event "received-data-from-fivetwelve"
   * 
   * @param {Object} e - The event
   */
  handleMessage(e) {
    const now = new Date()

    // Received data from modV
    window.dispatchEvent(new CustomEvent('received-data-from-fivetwelve', { detail: { now } }))
  }

  send(universe) {
    if (this.connected && this._websocket !== undefined) {
      const batch = this.universes[0].channels

      // bring diff into binary format
      const messageBuffer = new Buffer.Buffer(batch.length * 3)

      for (let channel = 0; channel < batch.length; channel++) {

        // Fivetwelve is starting at Universe 1 and not 0 as we do
        // That's why we have to change the value of the channels according to the universe we send
        // Examples:
        // Channel 1 / Universe 0 = Channel 512 in the buffer
        // Channel 2 / Universe 0 = Channel 513 in the buffer
        let channelNo = ((universe + 1) << 9) | (channel & 0x01ff)

        // Channel
        messageBuffer.writeUInt16BE(channelNo, channel * 3)
        // Value
        messageBuffer.writeUInt8(batch[channel], (channel * 3) + 2)
      }

      this._websocket.socket.send(messageBuffer)
    }
  }

  render() {
    const { url, reconnect, _connectionStatus, _connected } = this
    const integrationName = 'fivetwelve'
    const binaryType = 'arraybuffer'

    return html`
      <integration-websocket
        .url="${url}"
        .reconnect="${reconnect}"
        .name="${integrationName}"
        .binaryType="${binaryType}"

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

customElements.define('fivetwelve-manager', FivetwelveManager)
