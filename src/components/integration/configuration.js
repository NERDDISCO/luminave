
import { LitElement, html } from 'lit-element/lit-element.js'
import { defaultValue } from '../../directives/default-value.js'
import { classMap } from 'lit-html/directives/classMap.js'

/*
 * Handle the configuration of an integration (like the API of modV)
 */
class IntegrationConfiguration extends LitElement {

  static get properties() {
    return {
      name: { type: String, reflect: true },
      connected: { type: Boolean },
      url: { type: String },
      reconnect: { type: Boolean },
      connectionStatus: { type: String }
    }
  }

  constructor() {
    super()

    this._name = 'WebSocket'
    this.socket = null
    this.reconnect = false
    this.reconnectInterval = 5000
    this.connectionStatus = 'disconnected'
    this._reconnectTimer = undefined
  }

  firstUpdated() {
    // Use the default value if "name" was not specified by the user
    if (this.name === undefined) {
      this.name = this._name
    }
  }

  connectedCallback() {
    super.connectedCallback()

    // Try to create the connection when the component is loaded
    if (this.reconnect) {
      this.createWebsocket()
    }
  }

  handleUrlChange(e) {
    const url = e.target.value
    this.url = url
    this.dispatchEvent(new CustomEvent('url-changed', { detail: { url } }))
  }

  handleReconnectChange(e) {
    const reconnect = e.target.checked
    this.reconnect = reconnect
    this.dispatchEvent(new CustomEvent('reconnect-changed', { detail: { reconnect } }))
  }

  handleClick(e) {
    e.preventDefault()

    // Close active WebSocket connection
    if (this.connected) {
      this.handleDisconnect()

    // Create new WebSocket connection
    } else {
      this.createWebsocket()
    }
  }

  handleDisconnect() {
    if (this.connected) {
      this.socket.close()
      this.dispatchEvent(new CustomEvent('close-connection', { detail: {} }))
    }
  }

  handleReconnect() {
    if (this.reconnect) {
      // Cancel an old timeout
      clearTimeout(this._reconnectTimer)

      console.info(`${this.name} reconnect in ${this.reconnectInterval} ms`)

      // Create a new timeout
      this._reconnectTimer = setTimeout(() => {
        this.createWebsocket()
      }, this.reconnectInterval)
    }
  }

  createWebsocket() {
    this.socket = new WebSocket(this.url)

    // Connection was opened
    this.socket.addEventListener('open', () => {
      console.info(`${this.name} opened to ${this.url}`)
      this.connected = true
      const { connected } = this
      this.connectionStatus = 'connected'
      this.dispatchEvent(new CustomEvent('connection-opened', { detail: { connected } }))
    })

    // Connection was closed
    this.socket.addEventListener('close', event => {
      console.info(`${this.name} closed:`, event)
      this.connected = false
      const { connected } = this
      // @TODO: Handle "error" state, because the close event is always fired, also when an error occurs
      // this.connectionStatus = 'disconnected'
      this.dispatchEvent(new CustomEvent('connection-closed', { detail: { connected } }))
    })

    // Error with connection
    this.socket.addEventListener('error', error => {
      console.error(`${this.name} error:`, error)
      this.connected = false
      this.connectionStatus = 'error'
      const { connected } = this
      this.dispatchEvent(new CustomEvent('connection-error', { detail: { connected, error } }))
      this.handleReconnect()
    })

    // Listen for messages
    this.socket.addEventListener('message', event => {
      const { data } = event

      this.dispatchEvent(new CustomEvent('message-received', { detail: { data } }))
    })
  }

  render() {
    const { connected, url, reconnect, connectionStatus, reconnectInterval } = this

    const connectedLabel = connected 
    ? 'disconnect'
    : 'connect'

    return html`
      <style>
        .width {
          width: 220px;
        }

        .status {
          width: 1.75em;
          height: .95em;
          background: #ccc;
          display: inline-block;
          border: 3px solid var(--light-primary-color);
        }

        .status.connected {
          background: var(--default-success-color);
        }

        .status.error {
          background: var(--default-warning-color);
        }
      </style>

      <div class="status ${connectionStatus}"></div>

      <label for="url">URL</label>
      <input class="width" name="url" type="text" 
        value="${defaultValue(url, 'ws://localhost:3000')}" 
        @change="${e => this.handleUrlChange(e)}" required />

      <label for="reconnect">Auto-Reconnect</label>
      <input name="reconnect" type="checkbox" 
        .checked="${reconnect}"
        @click="${e => this.handleReconnectChange(e)}" />

      ${
        reconnect 
        ? html`
          <input name="reconnectInterval" type="number" 
            value="${reconnectInterval}"
            @change="${e => this.handleIntervalChange(e)}" />
        `
        : ''
      }

      <button @click="${e => this.handleClick(e)}">${connectedLabel}</button>
    `
  }
}

customElements.define('integration-configuration', IntegrationConfiguration)
