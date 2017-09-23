import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

class BPMMeter extends PolymerElement {

  constructor() {
    super();
  }

  static get template() {
    return `
        <h3>[[bpm]]</h3>
    `
  }
}

customElements.define('bpm-meter', BPMMeter)
