import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addFixture, removeFixtureFromEverywhere } from '../../actions/index.js'
import '../dmx-fixture/index.js'
import * as Fixtures from '../../utils/dmx-fixtures.js'
import { FIXTURE_TYPES } from '../../constants/index.js'
import { getFixtures } from '../../selectors/index.js';

/*
 * Handle DMX fixtures
 */
class FixtureManager extends connect(store)(LitElement) {

  constructor() {
    super()

    this.types = FIXTURE_TYPES
    this.types.sort()
  }

  static get properties() {
    return { fixtures: { type: Array } }
  }

  _stateChanged(state) {
    this.fixtures = getFixtures(state)
  }

  removeFixture(e) {
    const { dataset } = e.target
    store.dispatch(removeFixtureFromEverywhere(dataset.id))
  }

  handleSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)

    const type = data.get('type')
    const name = data.get('name')
    // @TODO: Set the universe individually
    const universe = 0
    const address = parseInt(data.get('address'), 10)
    const amount = parseInt(data.get('amount'), 10)

    // Amount was not specified, so we just add one fixture
    if (isNaN(amount)) {
      store.dispatch(addFixture({
        id: uuidV1(),
        type,
        name,
        universe,
        address,
        properties: {}
      }))

    // Add multiple fixtures specified by amount
    } else {
      // Create an instance of the fixture
      const bulkFixture = new Fixtures[type]({
        address,
        universe
      })

      // Use the total amount of channels of the fixture as the offset
      const offset = bulkFixture.channels

      // Add multiple fixtures
      for (let i = 0; i < amount; i++) {
        const bulkAddress = address + (offset * i)

        store.dispatch(addFixture({
          id: uuidV1(),
          type,
          name: `${name}${bulkAddress}`,
          universe,
          address: bulkAddress,
          properties: {}
        }))
      }
    }
  }

  render() {
    const { types, fixtures } = this

    return html`
    <style>
      :host {
        --width: 4;
      }

      @media (min-width: 1024px) {
        :host {
          --width: 5;
        }
      }

      .container {
        display: grid;
        grid-template-columns: repeat(var(--width), auto);
        row-gap: calc(var(--padding-basic) * 2);
        column-gap: var(--padding-basic);
      }

      .item {
        position: relative;
        margin-top: calc(var(--padding-basic) * 2);
        padding: calc(var(--padding-basic) * 3) var(--padding-basic) var(--padding-basic) var(--padding-basic);
        border: 3px solid var(--background-dark);
        background: var(--background-dark);
      }

      .item::before {
        content: attr(data-name);
        position: absolute;
        top: calc(var(--padding-basic) * -3);
        overflow: visible;
        background: var(--background-dark);
        color: var(--color-light);
        padding: var(--padding-basic);
      }

    </style>

        <form @submit="${e => this.handleSubmit(e)}">
          <label for="type">Type</label>
          <select name="type" required>
            <option value=""></option>
            ${repeat(types, type => html`
              <option value="${type}">${type}</option>
            `)}
          </select>

          <label for="address">Address</label>
          <input name="address" type="number" min="1" max="512" required />

          <label for="name">Name</label>
          <input name="name" type="text" />

          <label for="amount">Amount</label>
          <input name="amount" type="number" min="1" max="512" />

          <button type="submit">Add</button>
        </form>

        <br>

        <div class="container">

          ${repeat(fixtures, fixture => html`
          
            <div class="item" data-name="${fixture.name}">
              <dmx-fixture
                name="${fixture.name}"
                .properties="${fixture.properties}"
                id="${fixture.id}"
                type="${fixture.type}"
                address="${fixture.address}"
                universe="${fixture.universe}"></dmx-fixture>

              <button @click="${e => this.removeFixture(e)}" data-id="${fixture.id}">Remove</button>
            </div>

          `)}

        </div>
    `
  }
}

customElements.define('fixture-manager', FixtureManager)
