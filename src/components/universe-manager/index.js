import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
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
    const id = uuidV1()
    this.dispatch(addUniverse({ id, channels: [...Array(512)].map(() => 0), name: `demo universe ${id}` }))
  }

  removeUniverse(e) {
    const { dataset } = e.target
    this.dispatch(removeUniverse(parseInt(dataset.index, 10)))
  }

  static get template() {
    return `
      <h2>Universes</h2>

      <button on-click="addUniverse">Add universe</button>

      <template is="dom-repeat" items="{{universes}}" as="universe">
        <div>
          <h3>[[universe.name]]</h3>
          <button on-click="removeUniverse" data-index$="[[index]]">Remove</button>

          <div>
            <channel-grid channels="[[universe.channels]]"></channel-grid>
          </div>
        </div>
      </template>
    `
  }
}

customElements.define('universe-manager', UniverseManager)
