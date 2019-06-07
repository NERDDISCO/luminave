
import { LitElement, html, css } from 'lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { setLuminaveServer } from '../../actions/luminave-server.js'
import { getLuminaveServerUrl, getLuminaveServerConnected, getLuminaveServerReconnect, getLuminaveServerAnimation } from '../../selectors/luminave-server.js'
import '../integration/integration-configuration.js'
import '../integration/integration-graphql.js'
import './luminave-server-subscription-animation.js'
import './luminave-server-subscription-timeline.js'


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

    // State of the actual GraphQL connection (connected vs disconnected)
    this._connected = false
    // State of the actual GraphQL connection as text
    this._connectionStatus = undefined
    // GraphQL client
    this._client = undefined
  }

  _stateChanged(state) {
    this.url = getLuminaveServerUrl(state)
    this.connected = getLuminaveServerConnected(state)
    this.reconnect = getLuminaveServerReconnect(state)
    this.animationId = getLuminaveServerAnimation(state)
  }

  firstUpdated() {
    this._graphql = this.shadowRoot.querySelector('#graphql')
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
    const { connected, connectionStatus, client } = e.detail
    store.dispatch(setLuminaveServer({ connected }))

    // Apollo Client
    if (client !== undefined) {
      this._client = client
    }

    this._connectionStatus = connectionStatus
    this._connected = connected
    this.requestUpdate()
  }

  /**
   * New dynamic animation was added.
   * 
   * @param {Object} e - The event.
   */
  handleAnimationAdded(e) {
    const { animationId } = e.detail
    store.dispatch(setLuminaveServer({ animationId }))
  }

  static get styles() {
    return css`
    `
  }

  render() {
    const { url, reconnect, _connectionStatus, _connected, _client, animationId } = this
    const integrationName = 'luminave-server'

    return html`
      <integration-graphql
        .url="${url}"
        .reconnect="${reconnect}"
        .name="${integrationName}"

        id="graphql"

        @connection-opened="${e => this.handleConnection(e)}"
        @connection-closed="${e => this.handleConnection(e)}"
        @connection-error="${e => this.handleConnection(e)}"
      >
      </integration-graphql>

      <integration-configuration 
        .url="${url}"
        .reconnect="${reconnect}"
        .name="${integrationName}"
        .connectionStatus="${_connectionStatus}"
        .connected="${_connected}"

        @url-changed="${e => this.handleUrlChanged(e)}"
        @reconnect-changed="${e => this.handleReconnectChanged(e)}"
        @open-connection="${e => this._graphql.connect()}"
        @close-connection="${e => this._graphql.disconnect()}"
      >
      </integration-configuration>

      <luminave-server-subscription-animation 
        .client="${_client}"
        .animationId="${animationId}"

        @added-animation="${e => this.handleAnimationAdded(e)}"
      ></luminave-server-subscription-animation>

      <luminave-server-subscription-timeline 
        .client="${_client}"
      ></luminave-server-subscription-timeline>
    `
  }
}

customElements.define('luminave-server-manager', LuminaveServerManager)
