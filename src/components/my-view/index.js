import app from '../../myApp.js'
import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

class MyView extends app.ReduxMixin(PolymerElement) {

  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()
  }

  static get properties() {
    return {
      channels: {
        type: Array,
        statePath: 'channels'
      },
      actions: {
        type: Object
      }
    }
  }

  static get template() {
    return `<div>{{channels}}</div>`
  }
}

customElements.define('my-view', MyView)
