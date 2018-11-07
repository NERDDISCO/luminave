import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import { shared } from '../../styles/shared.js'

/*
 * Show DMX512 channels in a grid
 */
class ChannelGrid extends LitElement {
  static get properties() {
    return { channels: Array }
  }

  render() {
    const { channels } = this

    return html`
      ${shared}

      <style>q
        .item {
          flex: 0 0 2em;
        }
      </style>

      <div class="items">
        ${repeat(channels, channel => html`
          <div class="item">${channel}</div>
        `)}
      </div>
    `
  }

}

customElements.define('channel-grid', ChannelGrid)
