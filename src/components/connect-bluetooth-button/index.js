import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

class ConnectBluetoothButton extends PolymerElement {

  constructor() {
    super()
  }
  ready(){
    super.ready()
  }

  handleClick(e) {
    if (this.connected){
      this.dispatchEvent(new CustomEvent('disconnect'))
    } else {
      this.dispatchEvent(new CustomEvent('connect'))
    }
  }

  computeLabel(connected) {
    return `Bluetooth ${connected ? '☀️' : '⛈'}`
  }

  computeVars(connected) {
    const vars = {
      '--on': connected ? 1 : 0,
      '--off': connected ? 0 : 1
    }
    return Object.keys(vars).map(key => {
      return [key, vars[key]].join(':')
    } ).join(';')
  }

  static get template() {
    return `
        <style>
        button {

          --background: rgba(calc(var(--off) * 150), calc(var(--on) * 150), 0, 1);
          /*--color: hsla(120, 40%, 60%, var(--connected));*/

            box-sizing: border-box;
            height: 2em;
            border: 0;
            font-size: 1em;
            line-height: 1em;
            margin: 05.em;
            padding: 0.5em 1em;
            font-family: monospace;
            border-radius: 0;
            color: var(--color);
            background: var(--background);
            box-shadow: 0 0 0 1px var(--color);
            cursor: pointer;
          }

        button:focus {
          outline: 0;
          --color: var(--focus-color);
          /* --background: var(--focus-background); */
        }

        button:active {
          --background: var(--background-darker);
          /* --color: var(--color-lighter); */
        }
      </style>
      <button on-click="handleClick" style="[[computeVars(connected)]]">[[computeLabel(connected)]]</button>
    `
  }
}

customElements.define('connect-bluetooth-button', ConnectBluetoothButton)
