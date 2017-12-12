import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuid } from '../../../libs/abcq/uuid.js'
import { setChannel, addFixture, removeFixture } from '../../actions/index.js'

/*
 *
 */
class FixtureManager extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      fixtures: {
        type: Array,
        statePath: 'fixtureManager'
      }
    }
  }

  addFixture() {
    const id = uuid()
    this.dispatch(addFixture({ id, channels: [...Array(512)].map(() => 0), name: `demo fixture ${id}` }))
  }

  removeFixture(e) {
    const { dataset } = e.target
    this.dispatch(removeFixture(parseInt(dataset.index, 10)))
  }

  setChannel(e) {
    const { dataset } = e.target
    this.dispatch(setChannel(dataset.index, 0, Math.floor(Math.random() * 255)))
    this.dispatch(setChannel(dataset.index, 1, Math.floor(Math.random() * 255)))
    this.dispatch(setChannel(dataset.index, 2, Math.floor(Math.random() * 255)))
    this.dispatch(setChannel(dataset.index, 3, Math.floor(Math.random() * 255)))
    this.dispatch(setChannel(dataset.index, 4, Math.floor(Math.random() * 255)))
  }

  static get template() {
    return `
      <button on-click="addFixture">Add fixture</button>

      <template is="dom-repeat" items="{{fixtures}}" as="fixture">
        <div>
          [[fixture.name]]
          <button on-click="removeFixture" data-index$="[[index]]">Remove</button>
        </div>
      </template>
    `
  }
}

customElements.define('fixture-manager', FixtureManager)
