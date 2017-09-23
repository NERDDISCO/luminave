import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

class ChannelGrid extends PolymerElement {

  constructor() {
    super();
  }

  ready(){
    super.ready()
  }


  static get template() {
    const items = Array.apply(null, new Array(512)).map((e, i) => `Item ${i + 1}`)
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
        ${items.map(e => `<div class="item">${e}</div>`).join('')}
      </div>
    `
  }
}

customElements.define('channel-grid', ChannelGrid)
