import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { reduxMixin } from '../../reduxStore.js'
import { connectModv } from '../../actions/index.js'
import { setModvData, modvData } from '../../utils/index.js'

/*
 * Handle the connection to modV
 */
class ModvManager extends reduxMixin(PolymerElement) {

  static get properties() {
    return {
      live: {
        type: Boolean,
        statePath: 'live'
      },
      editMode: {
        type: Boolean,
        computed: 'computeEditMode(live)'
      },
      connected: {
        type: Boolean,
        statePath: 'modvManager.connected'
      },
      url: String,
      connectedLabel: {
        type: String,
        computed: 'computeConnectedLabel(connected)'
      },
      averageColor: Array,
      colors: Array
    }
  }

  computeEditMode(live) {
    return !live
  }

  computeConnectedLabel(connected) {
    return connected ? 'disconnect': 'connect'
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
      this.dispatch(connectModv(false))

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

      this.dispatch(connectModv(true))
    })

    // Connection was closed
    this.socket.addEventListener('close', event => {
      console.info('modV WebSocket closed:', event)

      this.dispatch(connectModv(false))
    })

    // Error with connection
    this.socket.addEventListener('error', error => {
      console.error('modV WebSocket error:', error)

      this.dispatch(connectModv(false))
    })

    // Listen for messages
    this.socket.addEventListener('message', event => {
      const { data } = event

      // Save color into global object instead of dispatch it into state because of performance issues
      setModvData(JSON.parse(data))

      this.averageColor = modvData.average
      this.colors = modvData.colors

      const now = new Date()

      // Received data from modV
      window.dispatchEvent(new CustomEvent('received-data-from-modv', { detail: { now } }))
    })
  }

  static get template() {
    return `
        modV: <button on-click="handleClick">[[connectedLabel]]</button>
    `
  }
}

customElements.define('modv-manager', ModvManager)
