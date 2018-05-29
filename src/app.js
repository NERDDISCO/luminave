import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { html } from '/node_modules/lit-html/lit-html.js'
import { render } from '/node_modules/lit-html/lib/lit-extended.js'

import './components/luminave-menu/index.js'
import './components/luminave-dashboard/index.js'

class Luminave extends PolymerElement {
  constructor() {
    super()
  }

  static get template() {
    return render(html`
        <style>
          body {
            padding: .5em;
            margin: 4em 0 0 0;
          }
        </style>

      <luminave-menu></luminave-menu>
      <luminave-dashboard></luminave-dashboard>

    `, document.body)
  }
}

customElements.define('lumi-nave', Luminave)
