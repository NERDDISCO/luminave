import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { html } from '/node_modules/lit-html/lit-html.js'
import { render } from '/node_modules/lit-html/lib/lit-extended.js'

import './components/visionlord-dashboard/index.js'

class VisionLord extends PolymerElement {
  constructor() {
    super()
}

  static get template() {
    return render(html`

      <style>
        .space {
          padding: .5em;
        }
      </style>
      
      <div class="space">

      <h1>VisionLord</h1>
      <visionlord-dashboard></visionlord-dashboard>

      </div>
    `, document.body)
  }
}

customElements.define('vision-lord', VisionLord)
