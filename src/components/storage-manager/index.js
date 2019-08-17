import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { STORAGE_STATE } from '../../constants/index.js'
import { getLive } from '../../selectors/index.js'

/*
 * Handle state in localStorage
 *
 * @TODO: Use https://github.com/PolymerElements/app-storage instead
 */
class StorageManager extends connect(store)(LitElement) {

  static get properties() {
    return { live: { type: Boolean } }
  }

  connectedCallback() {
    super.connectedCallback()

    // Update localstorage even when in live mode
    window.addEventListener('save-config-into-localstorage', () => {
      localStorage.setItem(STORAGE_STATE, JSON.stringify(store.getState()))
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    window.removeEventListener('save-config-into-localstorage')
  }

  _stateChanged(state) {
    this.live = getLive(state)
  }

  firstUpdated() {
    // Listen to every change in redux store
    store.subscribe(() => {
      // Save the state into localStorage when not live, otherwise it's super slow
      if (!this.live) {
        localStorage.setItem(STORAGE_STATE, JSON.stringify(store.getState()))
      }
    })
  }

  resetStorage() {
    localStorage.removeItem(STORAGE_STATE)

    // Reload page
    window.location.reload(true)
  }

  printStorage() {
    console.log(store.getState())
  }

  /*
   * Create a downloadable version of the config by using a Data URL
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
   */
  downloadStorage() {
    return `data:text/json;charset=utf-8,${encodeURIComponent(localStorage.getItem(STORAGE_STATE))}`
  }

  render() {
    return html`
      <!--<button on-click="resetStorage">Reset storage</button>
      <button on-click="printStorage">Print storage</button>-->
    `
  }
}

customElements.define('storage-manager', StorageManager)
