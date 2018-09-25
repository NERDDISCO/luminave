import { html } from '@polymer/lit-element'
import { PageViewElement } from './page-view-element.js'

import '../components/scene-manager/index.js'

// These are the shared styles needed by this element.
// import { SharedStyles } from './shared-styles.js'

class SceneView extends PageViewElement {
  render() {
    return html`
      <section>
        <scene-manager></scene-manager>
      </section>
    `
  }
}

window.customElements.define('scene-view', SceneView)
