import { html, PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

import './components/luminave-menu/index.js'
import './components/luminave-dashboard/index.js'

class Luminave extends PolymerElement {
  constructor() {
    super()
  }

  static get template() {
    return html`
      <luminave-menu></luminave-menu>
      <luminave-dashboard></luminave-dashboard>
    `
  }
}

customElements.define('lumi-nave', Luminave)
