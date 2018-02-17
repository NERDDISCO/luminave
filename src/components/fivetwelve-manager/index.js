import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { reduxMixin } from '../../reduxStore.js'
import { connectFivetwelve } from '../../actions/index.js'
import { batch } from '../../utils/index.js'

/*
 * Handle the connection to fivetwelve
 */
class FivetwelveManager extends reduxMixin(PolymerElement) {

  static get properties() {
    return {
      connected: {
        type: Boolean,
        statePath: 'fivetwelveManager.connected'
      },
      url: String,
      connectedLabel: {
        type: String,
        computed: 'computeConnectedLabel(connected)'
      }
    }
  }

  computeConnectedLabel(connected) {
    return connected ? 'disconnect': 'connect'
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
      this.dispatch(connectFivetwelve(false))
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

      this.dispatch(connectFivetwelve(true))
    })

    // Connection was closed
    this.socket.addEventListener('close', event => {
      console.info('fivetwelve WebSocket closed:', event)

      this.dispatch(connectFivetwelve(false))
    })

    // Error with connection
    this.socket.addEventListener('error', error => {
      console.error('fivetwelve WebSocket error:', error)

      this.dispatch(connectFivetwelve(false))
    })

    // Listen for messages
    this.socket.addEventListener('message', event => {
      const { data } = event
      console.log('fivetwelve WebSocket message:', event)
    })
  }

  send(universe) {
    if (this.connected && this.socket !== undefined) {
      // bring diff into binary format
      const messageBuffer = new window.buffer.Buffer(batch.length * 3)

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

  static get template() {
    return `
      fivetwelve: <button on-click="handleClick">[[connectedLabel]]</button>

      <button on-click="handleSend">Send</button>
    `
  }
}

customElements.define('fivetwelve-manager', FivetwelveManager)
