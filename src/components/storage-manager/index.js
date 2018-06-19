import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'
import { store, reduxMixin } from '../../reduxStore.js'
import { STORAGE_STATE } from '/src/constants/index.js'

/*
 * Handle state in localStorage
 *
 * @TODO: Use https://github.com/PolymerElements/app-storage instead
 */
class StorageManager extends reduxMixin(PolymerElement) {

  static get properties() {
    return {
      live: {
        type: Boolean,
        statePath: 'live'
      },
      editMode: {
        type: Boolean,
        computed: 'computeEditMode(live)'
      }
    }
  }

  computeEditMode(live) {
    return !live
  }

  ready() {
    super.ready()

    // Listen to every change in redux store
    store.subscribe(() => {
      // Save the state into localStorage when in editMode, otherwise it's super slow
      if (this.editMode) {
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

  static get template() {
    return html`
      <!--<button on-click="resetStorage">Reset storage</button>
      <button on-click="printStorage">Print storage</button>-->
    `
  }
}

customElements.define('storage-manager', StorageManager)
