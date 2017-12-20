import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { store } from '../../reduxStore.js'
import { STORAGE_STATE } from '/src/constants/index.js'

/*
 * Handle state in localStorage
 *
 * @TODO: Use https://github.com/PolymerElements/app-storage instead
 */
class StorageManager extends PolymerElement {

  ready() {
    super.ready()

    // Listen to every change in redux store
    store.subscribe(() => {
      // Save the state into localStorage
      localStorage.setItem(STORAGE_STATE, JSON.stringify(store.getState()))
    })
  }

  resetStorage() {
    localStorage.removeItem(STORAGE_STATE)

    // Reload page
    window.location.reload(true)
  }

  static get template() {
    return `
      <button on-click="resetStorage">Reset storage</button>
    `
  }
}

customElements.define('storage-manager', StorageManager)
