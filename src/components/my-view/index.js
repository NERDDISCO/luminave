import app from '../../myApp.js'
import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import '../channel-grid/index.js'
import '../bpm-meter/index.js'
import '../tap-button/index.js'

class MyView extends app.ReduxMixin(PolymerElement) {

  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()
  }

  setChannel() {
    this.dispatch(app.actions.setChannel(Math.floor(Math.random() * 511), Math.floor(Math.random() * 254)))
  }

  static get properties() {
    return {
      channels: {
        type: Array,
        statePath: 'channels'
      },
      bpm: {
        type: Number,
        statePath: 'bpm'
      }
    }
  }

  static get template() {
    return `
      <button on-click="setChannel">Set Channel</button>
      <bpm-meter bpm="{{bpm}}"></bpm-meter>
      <tap-button></tap-button>
      <channel-grid array="{{channels}}"></channel-grid>
    `
  }
}

customElements.define('my-view', MyView)
