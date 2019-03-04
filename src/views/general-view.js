import { html } from '@polymer/lit-element'
import { PageViewElement } from './page-view-element.js'

import '../components/modv/manager.js'

class GeneralView extends PageViewElement {
  render() {
    return html`
      <section>
        <h3>modV</h3>
        <modv-manager></modv-manager>
      </section>
    `
  }
}

window.customElements.define('general-view', GeneralView)
