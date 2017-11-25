import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { html } from '/node_modules/lit-html/lit-html.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'

class ChannelGrid extends PolymerElement {

  constructor() {
    super()
  }

  ready() {
    super.ready()
  }

  handleUpdate(e) {
    const { value, channelId } = e.detail
    this.dispatchEvent(new CustomEvent('update', {
      detail: {
        value,
        channelId
      }
    }))
  }

  connectedCallback() {
    super.connectedCallback()
 }

  static get template() {
    return `
      <style>
        .flex {
          display: flex;
          flex-wrap: wrap;
        }
        .item {
          flex: 0 0 2em;
        }

        .view {
          background: var(--background);
          color: var(--color);
        }
      </style>
      <div class="flex view">
        <template is="dom-repeat" items="{{ array }}" as="channel">
          <div class="item">{{channel}}</div>
        </template>
      </div>
    `
  }
  static get properties() {
    return {
      list: {
          Type: Array,
          notify: true
      }
    }
  }
}

customElements.define('channel-grid', ChannelGrid)
