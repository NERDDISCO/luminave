import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import '../channel-input/index.js'

class ChannelGrid extends PolymerElement {

  constructor() {
    super();
  }

  ready(){
    super.ready()
  }

  handleUpdate(e) {
    const {value, channel} = e.detail
    console.log('value:', value, 'channel:', channel)
  }

  static get template() {
    const items = Array.apply(null, new Array(512)).map((e, i) => i)
    return `
      <style>
        .flex {
          display: flex;
          flex-wrap: wrap;
        }
        .item {
          flex: 0 0 20%;
        }
      </style>
      <div class="flex">
        ${items.map(e => `<channel-input channel="${e}" on-update="handleUpdate"></channel-input>`).join('')}
      </div>
    `
  }
}

customElements.define('channel-grid', ChannelGrid)
