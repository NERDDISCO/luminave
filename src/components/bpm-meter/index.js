import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

/*
 * Show BPM (Beats per Minute)
 */
class BPMMeter extends PolymerElement {

  constructor() {
    super()
  }

  static get template() {
    return `
      <div>[[bpm]]</div>
    `
  }
}

customElements.define('bpm-meter', BPMMeter)
