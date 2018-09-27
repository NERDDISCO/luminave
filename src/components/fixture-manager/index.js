import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/uuid/uuid.js'
import { addFixture, removeFixtureFromEverywhere } from '../../actions/index.js'
import * as Fixtures from '../../utils/dmx-fixtures.js'
import { FIXTURE_TYPES } from '../../constants/index.js'
import { getFixturesSorted } from '../../selectors/index.js'
import { buttons } from '../../styles/buttons.js'

import '@polymer/paper-card/paper-card.js'
import '@polymer/paper-dialog/paper-dialog.js'
import '@material/mwc-button/mwc-button.js'
import '@material/mwc-icon/mwc-icon.js'

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
    this.fixtures = getFixturesSorted(state)
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

  removeFixture(e) {
    // Dialog was closed
    if (e.type === 'iron-overlay-closed') {

      // Dialog was confirmed
      if (e.detail.confirmed) {
        store.dispatch(removeFixtureFromEverywhere(this._removeFixtureId))
        this._removeFixtureId = undefined
      }

    // Dialog should be opened
    } else {
      const dialog = this.shadowRoot.getElementById('dialog')

      // Save the ID of the current fixture to be deleted
      this._removeFixtureId = e.target.fixtureId

      dialog.positionTarget = e.target
      dialog.open()
    }
  }

  render() {
    const { types, fixtures } = this

    return html`
      ${buttons}

      <style>
        @import url('node_modules/@material/layout-grid/dist/mdc.layout-grid.css');

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
      </style>

      <custom-style>
        <style>
          paper-card {
            width: 100%;
            color: var(--mdc-theme-on-surface);

            --paper-card-header-color: var(--mdc-theme-on-surface);

            --paper-card-header-text: {
              font-size: 1.25em;
              overflow: hidden;
              white-space: nowrap;
            };
          }

          mwc-button.card {
            color: var(--mdc-theme-on-primary)
          }
        </style>
      </custom-style>

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

        <div class="mdc-layout-grid mdc-layout-grid--align-left">
          <div class="mdc-layout-grid__inner">

            ${repeat(fixtures, fixture => html`

              <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">

                <paper-card heading="${fixture.name}" alt="${fixture.name}">
                  <div class="card-content">
                    ${fixture.address}
                  </div>

                  <div class="card-actions">
                    <a href="/fixture/${fixture.id}" tabindex="-1"><mwc-button class="card" icon="edit"></mwc-button></a>
                    <mwc-button class="card" icon="delete" @click="${e => this.removeFixture(e)}" .fixtureId="${fixture.id}"></mwc-button>
                  </div>
                </paper-card>

              </div>

            `)}

          </div>
        </div>


        <paper-dialog id="dialog" no-overlap horizontal-align="left" vertical-align="top" dynamic-align="true" @iron-overlay-closed="${e => this.removeFixture(e)}">
          <h2>Delete Fixture?</h2>
          <div class="buttons">
            <paper-button dialog-dismiss>No</paper-button>
            <paper-button raised dialog-confirm autofocus>Yes</paper-button>
          </div>
        </paper-dialog>
    `
  }
}

customElements.define('fixture-manager', FixtureManager)
