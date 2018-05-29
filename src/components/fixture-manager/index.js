import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addFixture, removeFixtureFromEverywhere } from '../../actions/index.js'
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
      }
    }
  }

  removeFixture(e) {
    const { dataset } = e.target
    this.dispatch(removeFixtureFromEverywhere(dataset.id))
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

  static get template() {
    return `
    <style>
      :host {
        --width: 3;
      }

      @media (min-width: 1024px) {
        :host {
          --width: 3;
        }
      }

      .container {
        display: grid;
        grid-template-columns: repeat(var(--width), auto);
        row-gap: var(--padding-basic);
        column-gap: var(--padding-basic);
      }

      .item {
        position: relative;
        margin-top: calc(var(--padding-basic) * 2);
        padding: calc(var(--padding-basic) * 3) var(--padding-basic) var(--padding-basic) var(--padding-basic);
        border: 3px solid var(--background-light);
      }

      .item::before {
        content: attr(data-name);
        position: absolute;
        top: calc(var(--padding-basic) * -3);
        overflow: visible;
        background: var(--background-light);
        color: var(--color-dark);
        padding: var(--padding-basic);
      }

    </style>

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

        <div class="container">

          <template is="dom-repeat" items="[[fixtures]]" as="fixture">

              <div class="item" data-name$="[[fixture.name]]">
                <dmx-fixture
                  name="[[fixture.name]]"
                  properties="[[fixture.properties]]"
                  id="[[fixture.id]]"
                  type="[[fixture.type]]"
                  address="[[fixture.address]]"
                  universe="[[fixture.universe]]"></dmx-fixture>

                <button on-click="removeFixture" data-id$="[[fixture.id]]">Remove</button>
              </div>
          </template>

        </div>
    `
  }
}

customElements.define('fixture-manager', FixtureManager)
