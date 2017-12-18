import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuid } from '../../../libs/abcq/uuid.js'
import { addFixture, removeFixture } from '../../actions/index.js'
import '../dmx-fixture/index.js'

/*
 *
 */
class FixtureManager extends ReduxMixin(PolymerElement) {

  constructor() {
    super()

    this.types = ['', 'FunGenerationSeParQuadLedRgbUv', 'EuroliteTMH8']
  }

  static get properties() {
    return {
      fixtures: {
        type: Array,
        statePath: 'fixtureManager'
      }
    }
  }

  addFixture(e) {
    // @TODO: SUPER HACKY AND MAGIC NUMBERS!!! 🔥🤓
    const [, form] = e.path
    const { elements } = form
    let valid = true

    // Validate every field of the form
    for (let i = 0; i < elements.length; i++) {
      valid = valid && elements[i].validity.valid
    }

    // Add the fixture
    if (valid) {
      const id = uuid()
      const universe = 0

      this.dispatch(addFixture({
        id,
        type: this.type,
        name: `fixture ${id}`,
        universe,
        address: this.address
      }))
    }
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

  handleSubmit(e) {
    e.preventDefault()

    const { elements } = e.target

    for (let i = 0; i < elements.length; i++) {
      // Reset input
      if (elements[i].tagName === 'INPUT') {
        elements[i].value = ''
      }
    }
  }

  static get template() {
    return `
    <style>
      .grid {
        width: 50vw;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }

      .fixture {
        width: 30vw;
      }

    </style>

      <form on-submit="handleSubmit">
        <select name="type" on-change="handleSelectedType" required>
          <template is="dom-repeat" items="{{types}}" as="type">
            <option value="[[type]]">[[type]]</option>
          </template>
        </select>

        <input name="address" type="number" min="1" max="255" on-change="handleAddress" required></input>
        <button on-click="addFixture">Add fixture</button>
      </form>

      <div class="grid">

        <template is="dom-repeat" items="{{fixtures}}" as="fixture">
          <div class="fixture">
            <dmx-fixture
              name="[[fixture.name]]"
              type="[[fixture.type]]"
              address="[[fixture.address]]"
              universe="[[fixture.universe]]"></dmx-fixture>

            <button on-click="removeFixture" data-index$="[[index]]">Remove</button>
          </div>
        </template>

      </div>
    `
  }
}

customElements.define('fixture-manager', FixtureManager)
