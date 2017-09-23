import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

class ConnectButton extends PolymerElement {

  constructor() {
    super();
  }
  ready(){
    super.ready()
  }

  handleClick(e) {
    if (this.connected){
      this.dispatchEvent(new CustomEvent('disconnect', { detail: { connected: false } }))
    } else {
       this.dispatchEvent(new CustomEvent('connect', { detail: { connected: true } }))
    }
  }

  static get template() {
    return `
      <button on-click="handleClick">Connected: [[connected]]</button>
    `
  }
}

customElements.define('connect-button', ConnectButton)
