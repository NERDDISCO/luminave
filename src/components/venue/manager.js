import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { repeat } from 'lit-html/directives/repeat.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import uuidv1 from 'uuid/v1.js'
import { addVenue, removeVenue } from '../../actions/venue.js'
import { getVenuesSorted } from '../../selectors/index.js'
import { buttons } from '../../styles/buttons.js'

import '@polymer/paper-card/paper-card.js'
import '@polymer/paper-dialog/paper-dialog.js'
import '@material/mwc-button/mwc-button.js'
import '@material/mwc-icon/mwc-icon.js'

/*
 * Handle venues
 */
class VenueManager extends connect(store)(LitElement) {

  constructor() {
    super()
  }

  static get properties() {
    return { venues: { type: Array } }
  }

  _stateChanged(state) {
    this.venues = getVenuesSorted(state)
  }

  handleSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)

    const name = data.get('name')
    const width = parseInt(data.get('width'), 10)
    const height = parseInt(data.get('height'), 10)
    const modv = {}
    modv.width = parseInt(data.get('modvWidth'), 10)
    modv.height = parseInt(data.get('modvHeight'), 10)

    store.dispatch(addVenue({
      id: uuidv1(),
      name,
      width,
      height,
      modv,
      slots: []
    }))
  }

  removeVenue(e) {
    // Dialog was closed
    if (e.type === 'iron-overlay-closed') {

      // Dialog was confirmed
      if (e.detail.confirmed) {
        store.dispatch(removeVenue(this._removeVenueId))
        this._removeVenueId = undefined
      }

    // Dialog should be opened
    } else {
      const dialog = this.shadowRoot.getElementById('dialog')

      // Save the ID of the current fixture to be deleted
      this._removeVenueId = e.target.venueId

      dialog.positionTarget = e.target
      dialog.open()
    }
  }

  render() {
    const { venues } = this

    return html`
      ${buttons}

      <style>
        @import url('@material/layout-grid/dist/mdc.layout-grid.css');

        :host {
          --width: 4;
        }

        @media (min-width: 1024px) {
          :host {
            --width: 5;
          }
        }

        h3 {
          display: inline;
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
          <h3>Venue</h3>
          <label for="name">Name</label>
          <input name="name" type="text" required />

          <label for="width">Width</label>
          <input name="width" type="number" min="1" />

          <label for="height">Height</label>
          <input name="height" type="number" min="1" />

          <br />

          <h3>modV</h3>
          <label for="modvWidth">Width</label>
          <input name="modvWidth" type="number" min="1" />

          <label for="modvHeight">Height</label>
          <input name="modvHeight" type="number" min="1" />

          <br />

          <button type="submit">Add</button>
        </form>

        <br>

        <div class="mdc-layout-grid mdc-layout-grid--align-left">
          <div class="mdc-layout-grid__inner">

            ${repeat(venues, venue => html`

              <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">

                <paper-card heading="${venue.name}" alt="${venue.name}">
                  <div class="card-actions">
                    <a href="/venue/${venue.id}" tabindex="-1"><mwc-button icon="edit"></mwc-button></a>
                    <mwc-button icon="delete" @click="${e => this.removeVenue(e)}" .venueId="${venue.id}"></mwc-button>
                  </div>
                </paper-card>

              </div>

            `)}

          </div>
        </div>


        <paper-dialog id="dialog" no-overlap horizontal-align="left" vertical-align="top" dynamic-align="true" @iron-overlay-closed="${e => this.removeVenue(e)}">
          <h2>Delete Venue?</h2>
          <div class="buttons">
            <paper-button dialog-dismiss>No</paper-button>
            <paper-button raised dialog-confirm autofocus>Yes</paper-button>
          </div>
        </paper-dialog>
    `
  }
}

customElements.define('venue-manager', VenueManager)
