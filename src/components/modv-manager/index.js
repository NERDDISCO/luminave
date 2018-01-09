import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { reduxMixin } from '../../reduxStore.js'
import { modvcolor } from '../../utils/index.js'

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
      connected: Boolean
    }
  }

  computeEditMode(live) {
    return !live
  }

  ready() {
    super.ready()

    const socket = new WebSocket('ws://localhost:3000/visionLord')

    socket.onerror = error => {
      console.error('nerdV: DMX WebSocket: Error:', error)
    }

    socket.onopen = () => {
      console.info('nerdV: DMX WebSocket: Opened')
    }

    // Listen for messages
    socket.addEventListener('message', event => {
      const { data } = event

      // Save color into global object instead of dispatch it into state because of performance issues
      modvcolor(JSON.parse(data))
    })

    this.connected = true
  }

  static get template() {
    return `
      Connected: [[connected]]
    `
  }
}

customElements.define('modv-manager', ModvManager)
