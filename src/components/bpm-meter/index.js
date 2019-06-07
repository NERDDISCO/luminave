import { LitElement, html } from '@polymer/lit-element/lit-element.js'

/*
 * Show BPM (Beats per Minute)
 */
class BPMMeter extends LitElement {

  static get properties() {
    return { bpm: { type: Number } }
  }

  render() {
    const { bpm } = this

    return html`
      <div>${bpm}</div>
    `
  }
}

customElements.define('bpm-meter', BPMMeter)
