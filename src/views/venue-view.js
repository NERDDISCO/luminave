import { html } from '@polymer/lit-element'
import { PageViewElement } from './page-view-element.js'

import '../components/venue/manager.js'

class VenueView extends PageViewElement {
  render() {
    return html`
      <section>
        <venue-manager></venue-manager>
      </section>
    `
  }
}

window.customElements.define('venue-view', VenueView)
