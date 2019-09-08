import { LitElement, html } from 'lit-element'

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
