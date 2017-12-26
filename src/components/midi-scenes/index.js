import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'

/*
 * Show MIDI buttons in a grid
 */
class MidiScenes extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      scenes: Array
    }
  }

  static get template() {
    return `
      <template is="dom-repeat" items="{{scenes}}" as="scene">
        {{scene}}
      </template>
    `
  }

}

customElements.define('midi-scenes', MidiScenes)
