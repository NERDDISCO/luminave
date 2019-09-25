import { html } from 'lit-element'
import { PageViewElement } from './page-view-element.js'

// import '../luminave-server/luminave-server.js'

class GeneralView extends PageViewElement {
  render() {
    return html`
      <section>
        <h3>Luminave Server</h3>
         <!-- <luminave-server></luminave-server> -->
      </section>
    `
  }
}

window.customElements.define('general-view', GeneralView)
