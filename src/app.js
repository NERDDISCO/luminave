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
      <div><h1>VisionLord<h1></div>
      <visionlord-dashboard></visionlord-dashboard>
    `, document.body)
  }
}

customElements.define('vision-lord', VisionLord)
