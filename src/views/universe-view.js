import { html } from 'lit-element'
import { PageViewElement } from './page-view-element.js'

import '../components/universe-manager/universe-manager.js'

// These are the shared styles needed by this element.
// import { SharedStyles } from './shared-styles.js'

class UniverseView extends PageViewElement {
  render() {
    return html`
      <section>
        <universe-manager></universe-manager>
      </section>
    `
  }
}

window.customElements.define('universe-view', UniverseView)
