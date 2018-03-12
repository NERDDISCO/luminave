import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { reduxMixin } from '../../reduxStore.js'
import { connectDekk } from '../../actions/index.js'
import { dekk } from '../../utils/index.js'

/*
 * Handle the connection to Dekk
 */
class DekkManager extends reduxMixin(PolymerElement) {

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
        statePath: 'dekkManager.connected'
      },
      url: String,
      connectedLabel: {
        type: String,
        computed: 'computeConnectedLabel(connected)'
      }
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
    this.url = 'ws://localhost:3001/visionLord'

    // Try to create the connection when the component is loaded
    if (this.connected) {
      this.createWebsocket()
    }
  }

  handleClick() {
    // Close active WebSocket connection
    if (this.connected) {
      this.socket.close()
      this.dispatch(connectDekk(false))

    // Create new WebSocket connection
    } else {
      this.createWebsocket()
    }
  }

  createWebsocket() {
    this.socket = new WebSocket(this.url)

    // Connection was opened
    this.socket.addEventListener('open', () => {
      console.info('Dekk WebSocket opened to', this.url)

      this.dispatch(connectDekk(true))
    })

    // Connection was closed
    this.socket.addEventListener('close', event => {
      console.info('Dekk WebSocket closed:', event)

      this.dispatch(connectDekk(false))
    })

    // Error with connection
    this.socket.addEventListener('error', error => {
      console.error('Dekk WebSocket error:', error)

      this.dispatch(connectDekk(false))
    })

    // Listen for messages
    this.socket.addEventListener('message', event => {
      const { data } = event

      // Save color into global object instead of dispatch it into state because of performance issues
      dekk(JSON.parse(data))

      console.log(dekk)
    })
  }

  static get template() {
    return `
      Dekk: <button on-click="handleClick">[[connectedLabel]]</button>
    `
  }
}

customElements.define('dekk-manager', DekkManager)
