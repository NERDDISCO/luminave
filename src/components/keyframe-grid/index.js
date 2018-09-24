import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import { shared } from '../../styles/shared.js'

/*
 * Show keyframes in a grid
 */
class KeyframeGrid extends LitElement {
  static get properties() {
    return { keyframes: { type: Object } }
  }

  _toArray(object) {
    const array = []

    for (const step in object) {
      array.push({
        step: parseFloat(step),
        value: object[step]
      })
    }

    array.sort((a, b) => a.step - b.step)

    return array
  }

  render() {
    const { keyframes } = this

    return html`
      ${shared}
      <style>
        .item {
          font-size: 0.8em;
        }
      </style>

      <div class="items">

        ${repeat(this._toArray(keyframes), keyframe => html`
          <div class="item">${keyframe.step}: ${JSON.stringify(keyframe.value)}</div>
        `)}

      </div>
    `
  }

}

customElements.define('keyframe-grid', KeyframeGrid)
