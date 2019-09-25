import { LitElement, html } from 'lit-element'
import { repeat } from 'lit-html/directives/repeat.js'
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
        .items {
          overflow-x: scroll;
        }

        .item {
          font-size: 0.8em;
        }
      </style>

      <div class="items">

        ${repeat(this._toArray(keyframes), keyframe => html`
          <div class="item">${keyframe.step}: ${JSON.stringify(keyframe.value, null, '\t')}</div>
        `)}

      </div>
    `
  }

}

customElements.define('keyframe-grid', KeyframeGrid)
