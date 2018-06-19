import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'
import reduxMixin from '../../reduxStore.js'
import { connectUsb, connectBluetooth } from '../../actions/index.js'

const actions = {
  usb: connectUsb,
  bluetooth: connectBluetooth
}

/*
 * Connect to an external system via USB or Bluetooth
 */
class ConnectButton extends reduxMixin(PolymerElement) {

  static get properties() {
    return {
      label: { type: String },
      type: { type: String },
      connections: {
        type: Object,
        statePath: 'connectionManager',
        observer: 'connectionChanged'
      }
    }
  }

  connectionChanged() {
    this.connected = this.connections[this.type].connected
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
    return html`
        <style>
        button {
          --background: rgba(calc(var(--off) * 50), calc(var(--on) * 50), 0, 1);
          --color: rgba(calc(var(--off) * 255), calc(var(--on) * 255), 0, 1);

            box-sizing: border-box;
            border: 0;
            font-size: inherit;
            margin: 0.5em;
            padding: 0.5em 1em;
            font-family: monospace;
            border-radius: 0;
            color: var(--color);
            background: var(--background);
            box-shadow: 0 0 0 1px var(--color);
            cursor: pointer;
          }
      </style>
      <button style="{{computeVars(connected)}}">[[label]]</button>
    `
  }
}

customElements.define('connect-button', ConnectButton)
