import { html } from '@polymer/lit-element'
import { PageViewElement } from './page-view-element.js'

import '../components/midi-manager/index.js'

// These are the shared styles needed by this element.
// import { SharedStyles } from './shared-styles.js'

class MidiView extends PageViewElement {
  _render(props) {
    return html`
      <section>
        <midi-manager></midi-manager>
      </section>
    `
  }
}

window.customElements.define('midi-view', MidiView)
