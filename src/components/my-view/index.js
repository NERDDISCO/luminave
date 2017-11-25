import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { setChannel } from '../../actions/index.js'
import '../channel-grid/index.js'
import '../bpm-meter/index.js'
import '../tap-button/index.js'

class MyView extends ReduxMixin(PolymerElement) {
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
      <bpm-meter bpm="{{bpm}}"></bpm-meter>
      <tap-button></tap-button>
      <channel-grid array="{{channels}}"></channel-grid>
    `
  }
}

customElements.define('my-view', MyView)
