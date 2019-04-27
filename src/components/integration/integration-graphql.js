
import { LitElement, html } from 'lit-element/lit-element.js'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { persistCache } from 'apollo-cache-persist'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'

/*
 * Handle a GraphQL integration
 */
class IntegrationGraphql extends LitElement {

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
    this.name = 'GraphQL'
    this.client = null
    this.reconnect = false
    this.reconnectInterval = 5000
    this.connectionStatus = 'disconnected'
    this._reconnectTimer = undefined

    // Apollo Client
    this.client = undefined

    // Apollo WebSocket Link
    this.websocketLink = undefined
  }

  connectedCallback() {
    super.connectedCallback()

    // Try to create the connection when the component is loaded
    if (this.reconnect) {
      this.connect()
    }
  }

  /**
   * Create a new GraphQL connection.
   */
  async connect() {
    const { url, reconnect } = this

    // WebSocket connection
    this.websocketLink = new WebSocketLink({ 
      uri: url, 
      options: {
        reconnect
      } 
    })

    // Connection was opened
    this.websocketLink.subscriptionClient.on('connected', () => {
      console.info(`%c${this.name}`+`%c integrated via ${this.url}`, "color: #fff; font-style: bold; background-color: #111;padding: 2px", "")

      this.connected = true
      this.connectionStatus = 'connected'
      const { connected, connectionStatus } = this

      this.dispatchEvent(new CustomEvent('connection-opened', { detail: { connected, connectionStatus } }))
    }, this)

    // Connection was closed
    this.websocketLink.subscriptionClient.on('disconnected', () => {

      if (this.connectionStatus === 'error') {
        return
      }

      console.info(`${this.name} closed`)

      this.connected = false
      this.connectionStatus = 'disconnected'
      const { connected, connectionStatus } = this

      this.dispatchEvent(new CustomEvent('connection-closed', { detail: { connected, connectionStatus } }))
    }, this)

    // Error with connection
    this.websocketLink.subscriptionClient.on('error', error => {
      console.error(`${this.name} error`)

      this.connected = false
      this.connectionStatus = 'error'
      const { connected, connectionStatus } = this

      this.dispatchEvent(new CustomEvent('connection-error', { detail: { connected, error, connectionStatus } }))
    }, this)

    // Stitch different links together
    const link = ApolloLink.from([
      this.websocketLink
    ])

    // Cache
    const cache = new InMemoryCache().restore(window.__APOLLO_STATE__)
    await persistCache({
      cache, 
      storage: window.localStorage 
    })

    // Create a new client
    this.client = new ApolloClient({ cache, link, ssrForceFetchDelay: 100, debug: true })
  }

  /**
   * Close the active connection
   */
  disconnect() {
    if (this.connected) {
      this.websocketLink.subscriptionClient.close()
    }
  }

  render() {
    return html``
  }
}

customElements.define('integration-graphql', IntegrationGraphql)
