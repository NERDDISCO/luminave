import { uuid } from '../../../libs/abcq/uuid.js'
import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { setChannel, addUniverse, removeUniverse } from '../../actions/index.js'
import '../channel-grid/index.js'
import '../bpm-meter/index.js'
import '../tap-button/index.js'
import '../connect-button/index.js'
import '../usb/index.js'

class MyView extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      universes: {
        type: Array,
        statePath: 'universeManager'
      },
      bpm: {
        type: Number,
        statePath: 'bpm'
      }
    }
  }

  addUniverse() {
    const id = uuid()
    this.dispatch(addUniverse({ id, channels: [...Array(512)].map(() => 0), name: `demo universe ${id}` }))
  }

  removeUniverse(e) {
    const { dataset } = e.target
    this.dispatch(removeUniverse(parseInt(dataset.index, 10)))
  }

  static get template() {
    return `
      <button on-click="addUniverse">Add universe</button>

      <template is="dom-repeat" items="[[universes]]" as="universe">
        <div>
          [[universe.name]]
          <button on-click="removeUniverse" data-index$="[[index]]">Remove</button>

          <div>
            <channel-grid array="[[universe.channels]]"></channel-grid>
          </div>

        </div>
      </template>

      <usb-controller></usb-controller>

      <connect-button type="usb" label="USB"></connect-button>
      <connect-button type="bluetooth" label="BLUETOOTH"></connect-button>

      <bpm-meter bpm="[[bpm]]"></bpm-meter>
      <tap-button></tap-button>
    `
  }
}

customElements.define('my-view', MyView)
