import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'

import './components/luminave-menu/index.js'
import './components/luminave-dashboard/index.js'

class Luminave extends LitElement {
  _render() {
    return html`
      <luminave-menu></luminave-menu>

      <ui-spacer></ui-spacer>
      <ui-spacer></ui-spacer>
      <ui-spacer></ui-spacer>
      <ui-spacer></ui-spacer>
      <ui-spacer></ui-spacer>

      <luminave-dashboard></luminave-dashboard>
    `
  }
}

customElements.define('lumi-nave', Luminave)
