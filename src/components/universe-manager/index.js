import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuid } from '../../../libs/abcq/uuid.js'
import { setChannel, addUniverse, removeUniverse } from '../../actions/index.js'

/*
 *
 */
class UniverseManager extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      universes: {
        type: Array,
        statePath: 'universeManager'
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

  setChannel(e) {
    const { dataset } = e.target
    this.dispatch(setChannel(dataset.index, 0, Math.floor(Math.random() * 254)))
    console.log(this.universes)
  }

  static get template() {
    return `
      <button on-click="addUniverse">Add universe</button>

      <template is="dom-repeat" items="{{universes}}" as="universe">
        <div>
          [[universe.name]]
          <button on-click="removeUniverse" data-index$="[[index]]">Remove</button>
          <button on-click="setChannel" data-index$="[[index]]">Set Channel</button>

          <div>
            <channel-grid universe="[[index]]"></channel-grid>
          </div>

        </div>
      </template>
    `
  }
}

customElements.define('universe-manager', UniverseManager)
