import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'
import { reduxMixin } from '../../reduxStore.js'
import { STORAGE_STATE } from '/src/constants/index.js'

/*
 * Handle the configuration
 */
class ConfigManager extends reduxMixin(PolymerElement) {

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

  /*
   * Create a downloadable version of the config by using a Data URL
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
   */
  generateDownload() {
    return `data:text/json;charset=utf-8,${encodeURIComponent(localStorage.getItem(STORAGE_STATE))}`
  }

  handleDownload(e) {
    const { target } = e

    console.log(target)
  }

  static get template() {
    return html`
      Config
      <a on-click="handleDownload" href="{{generateDownload()}}">Download</a>
    `
  }
}

customElements.define('config-manager', ConfigManager)
