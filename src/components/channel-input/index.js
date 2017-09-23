import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

class ChannelInput extends PolymerElement {

  constructor() {
    super();
  }

  ready(){
    super.ready()
    this.channel = this.attributes.channel.value
  }

  handleInput(e) {
    const channel = this.attributes.channel.value
    this.dispatchEvent(new CustomEvent('update', {
      detail: {
        channel,
        value: e.target.value
      }
    }))
    this.channel = channel

  }

  static get template() {
    return `
       <style>
        .item {
          display: flex;
          align-items: center;
          background: #eee;
        }

        .item span {
          flex: 0 0 3em;
          padding: 0.5em;
          display: flex;
          justify-content: flex-end;
        }
        input {
          flex: 1;
          width: auto;
          max-width: calc(100% - 3em);
          margin: 0;
          font-size: 1em;
          padding: 0.5em;
          box-sizing: border-box;
          background: #222;
          color: #fff;
          border: 0;
          border-bottom: 1px solid #aaa;
        }
      </style>
      <label class="item">
        <span>[[channel]]</span>
        <input on-input="handleInput" type="number"/>
      </label>
    `
  }
}

customElements.define('channel-input', ChannelInput)
