import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import '../channel-input/index.js'

class ChannelGrid extends PolymerElement {

  constructor() {
    super()
  }

  ready() {
    super.ready()
    console.log([this])
  }

  handleUpdate(e) {
    const {value, channelId} = e.detail
    this.dispatchEvent(new CustomEvent('update', {
      detail: {
        value,
        channelId
      }
    }))
  }

  static get template() {
    const items = Array.apply(null, new Array(512)).map((e, i) => i)
    return `
      <style>
        .flex {
          display: flex;
          flex-wrap: wrap;
        }
        channel-input {
          flex: 0 0 100px;
        }
      </style>
      <div class="flex">
        ${items.map(e => `<channel-input channel="${e}" on-update="handleUpdate"></channel-input>`).join('')}
      </div>
    `
  }
}

customElements.define('channel-grid', ChannelGrid)
