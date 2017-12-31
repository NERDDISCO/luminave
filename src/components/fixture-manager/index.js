import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addFixture, removeFixture } from '../../actions/index.js'
import '../dmx-fixture/index.js'
import { FIXTURE_TYPES } from '../../constants/index.js'

/*
 * Handle DMX fixtures
 */
class FixtureManager extends ReduxMixin(PolymerElement) {

  constructor() {
    super()

    this.types = FIXTURE_TYPES
    this.types.sort()
  }

  static get properties() {
    return {
      fixtures: {
        type: Array,
        statePath: 'fixtureManager'
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

  removeFixture(e) {
    const { dataset } = e.target
    this.dispatch(removeFixture(parseInt(dataset.index, 10)))
  }

  handleSelectedType(e) {
    this.type = e.target.selectedOptions[0].value
  }

  handleAddress(e) {
    this.address = e.target.value
  }

  handleName(e) {
    this.name = e.target.value
  }

  handleSubmit(e) {
    // Prevent sending data to server & reset all fields
    e.preventDefault()
    e.target.reset()

    // @TODO: Set the universe individually
    this.dispatch(addFixture({
      id: uuidV1(),
      type: this.type,
      name: this.name,
      universe: 0,
      address: this.address,
      properties: {}
    }))
  }

  _toJson(object) {
    return JSON.stringify(object, null, 4)
  }

  static get template() {
    return `
      <template is="dom-if" if="[[editMode]]">

        <style>
          .grid {
            width: 100vw;
            display: flex;
            flex-direction: column;
          }

          .fixture {
            display: block;
            border: 1px solid var(--color-lighter);
            margin: 0 0 .25em 0;
          }
        </style>


        <h2>Fixtures</h2>

        <form on-submit="handleSubmit">
          <label for="type">Type</label>
          <select name="type" on-change="handleSelectedType" required>
            <option value=""></option>
            <template is="dom-repeat" items="{{types}}" as="type">
              <option value="[[type]]">[[type]]</option>
            </template>
          </select>

          <label for="address">Address</label>
          <input name="address" type="number" min="1" max="512" on-change="handleAddress" required></input>

          <label for="name">Name</label>
          <input name="name" type="text" on-change="handleName" required></input>

          <button type="submit">Add fixture</button>
        </form>

        <br>

        <div class="grid">

      </template>

          <template is="dom-repeat" items="{{fixtures}}" as="fixture">

          <pre>
          [[_toJson(fixture)]]
          </pre>

              <dmx-fixture
                class="fixture"
                name="[[fixture.name]]"
                properties$="{{fixture.properties}}"
                id="[[fixture.id]]"
                type="[[fixture.type]]"
                address="[[fixture.address]]"
                universe="[[fixture.universe]]"></dmx-fixture>

              <template is="dom-if" if="[[editMode]]">
                <button on-click="removeFixture" data-index$="[[index]]">Remove</button>
              </template>
          </template>

      <template is="dom-if" if="[[editMode]]">
        </div>
      </template>
    `
  }
}

customElements.define('fixture-manager', FixtureManager)
