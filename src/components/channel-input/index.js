import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

class ChannelInput extends PolymerElement {

  constructor() {
    super();
  }

  ready(){
    super.ready()
  }

  handleInput(e) {
    this.dispatchEvent(new CustomEvent('update', {
      detail: {
        value: e.target.value,
        channel:this.attributes.channel.value
      } 
    }))

  }

  static get template() {
    return `
      <div>
        <input on-input="handleInput" type="text">
      </div>
    `
  }
}

customElements.define('channel-input', ChannelInput)
