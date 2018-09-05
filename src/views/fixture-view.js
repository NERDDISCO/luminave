import { html } from '@polymer/lit-element'
import { PageViewElement } from './page-view-element.js'

import '../components/fixture-manager/index.js'

// These are the shared styles needed by this element.
// import { SharedStyles } from './shared-styles.js'

class FixtureView extends PageViewElement {
  _render(props) {
    return html`
      <section>
        <fixture-manager></fixture-manager>
      </section>
    `
  }
}

window.customElements.define('fixture-view', FixtureView)
