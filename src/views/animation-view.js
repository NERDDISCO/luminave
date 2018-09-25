import { html } from '@polymer/lit-element'
import { PageViewElement } from './page-view-element.js'

import '../components/animation-manager/index.js'

// These are the shared styles needed by this element.
// import { SharedStyles } from './shared-styles.js'

class AnimationView extends PageViewElement {
  render() {
    return html`
      <section>
        <animation-manager></animation-manager>
      </section>
    `
  }
}

window.customElements.define('animation-view', AnimationView)
