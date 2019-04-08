
import { LitElement, html } from 'lit-element/lit-element.js'

/*
 * Handle a WebSocket integration
 */
class IntegrationWebsocket extends LitElement {

  static get properties() {
    return {
      name: { type: String, reflect: true },
      url: { type: String },
      reconnect: { type: Boolean },
      connectionStatus: { type: String },
    }
  }

  constructor() {
    super()

    this.connected = false
    this.name = 'WebSocket'
    this.socket = null
    this.reconnect = false
    this.reconnectInterval = 5000
    this.connectionStatus = 'disconnected'
    this._reconnectTimer = undefined
  }

  connectedCallback() {
    super.connectedCallback()

    // Try to create the connection when the component is loaded
    if (this.reconnect) {
      this.connect()
    }
  }

  /**
   * Create a new WebSocket connection.
   */
  connect() {
    this.socket = new WebSocket(this.url)

    // Connection was opened
    this.socket.addEventListener('open', () => {
      console.info(`${this.name} opened to ${this.url}`)
      this.connected = true
      this.connectionStatus = 'connected'

      const { connected, connectionStatus } = this

      this.dispatchEvent(new CustomEvent('connection-opened', { detail: { connected, connectionStatus } }))
    })

    // Connection was closed
    this.socket.addEventListener('close', event => {
      console.info(`${this.name} closed:`, event)
      this.connected = false
      // @TODO: Handle "error" state, because the close event is always fired, also when an error occurs
      this.connectionStatus = 'disconnected'

      const { connected, connectionStatus } = this

      this.dispatchEvent(new CustomEvent('connection-closed', { detail: { connected, connectionStatus } }))
    })

    // Error with connection
    this.socket.addEventListener('error', error => {
      console.error(`${this.name} error:`, error)
      this.connected = false
      this.connectionStatus = 'error'

      const { connected, connectionStatus } = this

      this.dispatchEvent(new CustomEvent('connection-error', { detail: { connected, error, connectionStatus } }))
      this.doReconnect()
    })

    // Listen for messages
    this.socket.addEventListener('message', event => {
      const { data } = event

      this.dispatchEvent(new CustomEvent('message-received', { detail: { data } }))
    })
  }

  /**
   * Close the active connection
   */
  disconnect() {
    if (this.connected) {
      this.socket.close()
    }
  }

  /**
   * Try to reopen a WebSocket connection. 
   */
  doReconnect() {
    if (this.reconnect) {
      // Cancel an old timeout
      clearTimeout(this._reconnectTimer)

      console.info(`${this.name} reconnect in ${this.reconnectInterval} ms`)

      // Create a new timeout
      this._reconnectTimer = setTimeout(() => {
        this.connect()
      }, this.reconnectInterval)
    }
  }

  render() {
    return html``
  }
}

customElements.define('integration-websocket', IntegrationWebsocket)
