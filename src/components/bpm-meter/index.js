import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'

/*
 * Show BPM (Beats per Minute)
 */
class BPMMeter extends PolymerElement {

  static get properties() {
    return {
      bpm: {
        type: Number,
        statePath: 'bpm'
      }
    }
  }

  static get template() {
    return html`
      <div>[[bpm]]</div>
    `
  }
}

customElements.define('bpm-meter', BPMMeter)
