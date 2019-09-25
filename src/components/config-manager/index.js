import { LitElement, html } from 'lit-element'
import { STORAGE_STATE } from '/src/constants/index.js'

/*
 * Handle the configuration
 */
class ConfigManager extends LitElement {

  static get properties() {
    return {}
  }

  /*
   * Create a downloadable version of the config by using a Data URL
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
   */
  generateDownload() {
    return `data:text/json;charset=utf-8,${encodeURIComponent(localStorage.getItem(STORAGE_STATE))}`
  }

  // @TODO: implement
  handleDownload(e) {
    const { target } = e
  }

  render() {
    return html`
      Config
      <a @click="${e => this.handleDownload(e)}" href="${this.generateDownload()}">Download</a>
    `
  }
}

customElements.define('config-manager', ConfigManager)
