import { html } from '@polymer/lit-element'
import { PageViewElement } from './page-view-element.js'

import { modvData } from '../utils/index.js'
import '../components/color-grid/index.js'
import '../components/ui-spacer/index.js'

// These are the shared styles needed by this element.
// import { SharedStyles } from './shared-styles.js'

class modvView extends PageViewElement {

  static get properties() {
    return { 
      active: { type: Boolean },
      visible: { type: Boolean },
      colors: { type: Array }
    }
  }

  constructor() {
    super()

    // bind() is creating a new function reference, so we have to save it in order to be able 
    // to remove it again, see https://stackoverflow.com/a/22870717/1012875
    this.listener = this.listenReceivedModvData.bind(this)

    this.colors = []
  }

  listenReceivedModvData() {
    this.colors = modvData.colors
  }

  // Only render this page if it's actually visible.
  shouldUpdate() {
    // View gets active and visible for the first time
    // @TODO: This nonsense is only needed because colors is a property 
    // on the modv-view component. Instead we should create a new component
    // that handles everything related to modV so we can go back to the default
    // funtionality of PageViewElement and don't add our own properties which will
    // force _shouldUpdate update every time a property is changing
    if (this.active && !this.visible) {
      this.visible = true
      window.addEventListener('received-data-from-modv', this.listener)
    }

    // View gets inactive
    if (!this.active) {
      this.visible = false
      window.removeEventListener('received-data-from-modv', this.listener)
    }

    return this.active
  }

  render() {

    const { colors } = this

    return html`
      <section>
        <ui-spacer></ui-spacer>
        
        <color-grid rows="6" .colors="${colors}"></color-grid>
      </section>
    `
  }
}

window.customElements.define('modv-view', modvView)
