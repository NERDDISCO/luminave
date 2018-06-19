import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'
import reduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addUniverse, removeUniverse, resetUniverseAndFixtures } from '../../actions/index.js'
import '../channel-grid/index.js'

/*
 *
 */
class UniverseManager extends reduxMixin(PolymerElement) {
  static get properties() {
    return {
      universes: {
        type: Array,
        statePath: 'universeManager'
      },
      live: {
        type: Boolean,
        statePath: 'live'
      },
      editMode: {
        type: Boolean,
        computed: 'computeEditMode(live)'
      }
    }
  }

  computeEditMode(live) {
    return !live
  }

  addUniverse() {
    const id = uuidV1()
    this.dispatch(addUniverse({ id, channels: [...Array(512)].map(() => 0), name: `${id}` }))
  }

  removeUniverse(e) {
    const { dataset } = e.target
    this.dispatch(removeUniverse(parseInt(dataset.index, 10)))
  }

  resetUniverse(e) {
    const { dataset } = e.target
    this.dispatch(resetUniverseAndFixtures(parseInt(dataset.index, 10)))
  }

  static get template() {
    return html`
      <template is="dom-if" if="[[editMode]]">
        <button on-click="addUniverse">Add universe</button>
      </template>

      <template is="dom-repeat" items="{{universes}}" as="universe">
        <div>
          <template is="dom-if" if="[[editMode]]">
            <h3>[[universe.name]]</h3>
            <button on-click="removeUniverse" data-index$="[[index]]">Remove</button>
          </template>

          <button on-click="resetUniverse" data-index$="[[index]]">Reset</button>

          <div>
            <channel-grid channels="[[universe.channels]]"></channel-grid>
          </div>
        </div>
      </template>
    `
  }
}

customElements.define('universe-manager', UniverseManager)
