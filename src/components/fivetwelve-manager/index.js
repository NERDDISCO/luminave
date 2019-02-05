import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { connectFivetwelve } from '../../actions/index.js'
import { getFivetwelveConnected, getUniverses } from '../../selectors/index.js'
import Buffer from 'buffer'

/*
 * Handle the connection to fivetwelve
 */
class FivetwelveManager extends connect(store)(LitElement) {

  static get properties() {
    return {
      connected: { type: Boolean },
      url: { type: String }
    }
  }

  _stateChanged(state) {
    this.connected = getFivetwelveConnected(state)
    this.universes = getUniverses(state)
  }

  connectedCallback() {
    super.connectedCallback()

    // Set the URL of the server we want to create a connection to
    this.url = 'ws://localhost:1234/'

    // Try to create the connection when the component is loaded
    if (this.connected) {
      this.createWebsocket()
    }

    window.addEventListener('send-universe-to-fivetwelve', this.listenSendUniverse.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.disconnect()

    window.removeEventListener('send-universe-to-fivetwelve', this.listenSendUniverse.bind(this))
  }

  listenSendUniverse(e) {
    this.handleSend()
  }

  disconnect() {
    // Close active WebSocket connection
    if (this.connected) {
      this.socket.close()
      store.dispatch(connectFivetwelve(false))
    }
  }

  handleClick() {
    // Close active WebSocket connection
    if (this.connected) {
      this.disconnect()

    // Create new WebSocket connection
    } else {
      this.createWebsocket()
    }
  }

  /*
   * @TODO: Create a diff and don't send everything all the time, @see BridgeClientDriver#send
   */
  handleSend() {
    this.send(0)
  }

  createWebsocket() {
    this.socket = new WebSocket(this.url)

    // Set data type to ArrayBuffer
    this.socket.binaryType = 'arraybuffer'

    // Connection was opened
    this.socket.addEventListener('open', () => {
      console.info('fivetwelve WebSocket opened to', this.url)

      store.dispatch(connectFivetwelve(true))
    })

    // Connection was closed
    this.socket.addEventListener('close', event => {
      console.info('fivetwelve WebSocket closed:', event)

      store.dispatch(connectFivetwelve(false))
    })

    // Error with connection
    this.socket.addEventListener('error', error => {
      console.error('fivetwelve WebSocket error:', error)

      store.dispatch(connectFivetwelve(false))
    })

    // Listen for messages
    this.socket.addEventListener('message', event => {
      const { data } = event
      console.log('fivetwelve WebSocket message:', event)
    })
  }

  send(universe) {
    if (this.connected && this.socket !== undefined) {
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

      this.socket.send(messageBuffer)
    }
  }

  render() {
    const { connected } = this

    const connectedLabel = connected
      ? 'disconnect'
      : 'connect'

    return html`
      fivetwelve: <button @click="${e => this.handleClick(e)}">${connectedLabel}</button>

      <button @click="${e => this.handleSend(e)}">Send</button>
    `
  }
}

customElements.define('fivetwelve-manager', FivetwelveManager)
