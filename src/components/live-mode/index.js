import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { setLive } from '../../actions/index.js'
import { getLive } from '../../selectors/index.js'

/*
 * Handle the LIVE mode
 */
class LiveMode extends connect(store)(LitElement) {

  static get properties() {
    return { live: { type: Boolean } }
  }

  _stateChanged(state) {
    this.live = getLive(state)
  }

  handleLive() {
    store.dispatch(setLive(!this.live))
  }

  render() {
    const liveLabel = this.live 
    ? 'Live'
    : 'Edit'

    return html`
      <div>
        Mode: <button @click="${e => this.handleLive(e)}">${liveLabel}</button>
      </div>
    `
  }
}

customElements.define('live-mode', LiveMode)
