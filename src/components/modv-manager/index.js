import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { connectModv } from '../../actions/index.js'
import { getLive, getModvConnected } from '../../selectors/index.js'
import { setModvData } from '../../utils/index.js'

/*
 * Handle the connection to modV
 */
class ModvManager extends connect(store)(LitElement) {

  static get properties() {
    return {
      live: { type: Boolean },
      connected: { type: Boolean },
      url: { type: String }
    }
  }

  _stateChanged(state) {
    this.live = getLive(state)
    this.connected = getModvConnected(state)
  }

  connectedCallback() {
    super.connectedCallback()

    // Set the URL of the server we want to create a connection to
    this.url = 'ws://localhost:3000/luminave'

    // Try to create the connection when the component is loaded
    if (this.connected) {
      this.createWebsocket()
    }
  }

  handleClick() {
    // Close active WebSocket connection
    if (this.connected) {
      this.socket.close()
      store.dispatch(connectModv(false))

    // Create new WebSocket connection
    } else {
      this.createWebsocket()
    }
  }

  createWebsocket() {
    this.socket = new WebSocket(this.url)

    // Connection was opened
    this.socket.addEventListener('open', () => {
      console.info('modV WebSocket opened to', this.url)

      store.dispatch(connectModv(true))
    })

    // Connection was closed
    this.socket.addEventListener('close', event => {
      console.info('modV WebSocket closed:', event)

      store.dispatch(connectModv(false))
    })

    // Error with connection
    this.socket.addEventListener('error', error => {
      console.error('modV WebSocket error:', error)

      store.dispatch(connectModv(false))
    })

    // Listen for messages
    this.socket.addEventListener('message', event => {
      const { data } = event

      // Save color into global object instead of dispatch it into state because of performance issues
      // average: Of all colors that is grabbed from Canvas we get the average
      // colors: An array of colors grabbed from specific points from the Canvas (configurable in modV)
      setModvData(JSON.parse(data))

      const now = new Date()

      // Received data from modV
      window.dispatchEvent(new CustomEvent('received-data-from-modv', { detail: { now } }))
    })
  }

  render() {
    const { connected } = this

    const connectedLabel = connected 
    ? 'disconnect'
    : 'connect'

    return html`
      modV: <button @click="${e => this.handleClick(e)}">${connectedLabel}</button>
    `
  }
}

customElements.define('modv-manager', ModvManager)
