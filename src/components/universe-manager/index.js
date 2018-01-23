import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { setChannels, addUniverse, removeUniverse, resetAllFixtures } from '../../actions/index.js'
import { batch, clearBatch } from '../../utils/index.js'

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

  resetUniverse() {
    this.dispatch(resetAllFixtures())

    // Update the channels of universe 0 with the batch of values collected for the fixtures
    this.dispatch(setChannels(0, [...batch]))

    // Reset the batch so that if a scene is done the values for the attachted fixtures are also reset
    clearBatch()
  }

  static get template() {
    return `
      <h2>Universes</h2>

      <button on-click="addUniverse">Add universe</button>

      <template is="dom-repeat" items="{{universes}}" as="universe">
        <div>
          <h3>[[universe.name]]</h3>
          <button on-click="resetUniverse" data-index$="[[index]]">Reset</button>
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
