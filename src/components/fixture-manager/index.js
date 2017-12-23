import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addFixture, removeFixture } from '../../actions/index.js'
import '../dmx-fixture/index.js'

/*
 * Handle DMX fixtures
 */
class FixtureManager extends ReduxMixin(PolymerElement) {

  constructor() {
    super()

    this.types = ['', 'EuroliteTMH8', 'FunGenerationSeParQuadLedRgbUv',
      'AdjStarburst', 'CameoFlatPar1RGBW', 'CameoPixBar600PRO', 'CameoWookie200RGY',
      'StairvilleAF150', 'StairvilleBowlBeam604LEDCOBMovingHead']
    this.types.sort()
  }

  static get properties() {
    return {
      fixtures: {
        type: Array,
        statePath: 'fixtureManager'
      }
    }
  }

  addFixture() {
    const id = uuidV1()
    const universe = 0

    this.dispatch(addFixture({
      id,
      type: this.type,
      name: this.name,
      universe,
      address: this.address
    }))
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
    // Prevent sending data to server
    e.preventDefault()

    // Reset all fields
    e.target.reset()

    this.addFixture()
  }

  static get template() {
    return `
    <style>
      .grid {
        width: 100vw;
        display: flex;
        flex-direction: column;
      }

      .fixture {
        border: 1px solid var(--color-lighter);
        margin: 0 0 .25em 0;
      }

    </style>

      <form on-submit="handleSubmit">
        <select name="type" on-change="handleSelectedType" required>
          <template is="dom-repeat" items="{{types}}" as="type">
            <option value="[[type]]">[[type]]</option>
          </template>
        </select>

        <input name="address" type="number" min="1" max="255" on-change="handleAddress" required></input>

        <input name="name" type="text" on-change="handleName" required></input>

        <button type="submit">Add fixture</button>
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
