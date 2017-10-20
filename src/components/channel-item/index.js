import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

class ChannelItem extends PolymerElement {

  constructor() {
    super();
  }

  ready(){
    super.ready()
  }

  connectedCallback() {
    super.connectedCallback()
    this.channel =  parseInt(this.attributes.channel.value, 10)
  }

  static get template() {
    return `
       <style>
        :host {
          --channel-width: 3em;
          box-sizing: border-box;
          padding: 0.25em;
          flex: 0 0 var(--channel-width);
          display: flex;
          box-shadow: inset 0 0 0 1px;
        }
        .item {
          display: flex;
          align-items: center;
          font-family: monospace;
        }
        channel-item {
          box-sizing: border-box;
          flex: 0 0 var(--channel-width);
          display: flex;
        }
      </style>
      <label class="item">
        <span class="channel">CH[[channel]]</span>
     </label>
    `
  }
}

customElements.define('channel-item', ChannelItem)
