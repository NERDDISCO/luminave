import { html } from '@polymer/lit-element'
import { PageViewElement } from './page-view-element.js'
import { getVenue } from '../selectors/index.js'
import { store } from '../reduxStore.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { setVenue } from '../actions/venue.js'
import '../components/venue/slot-grid.js'
import '../components/ui-spacer/index.js'
import '../components/modv/mapper.js'

class VenueDetailView extends connect(store)(PageViewElement) {

  static get properties() {
    return { 
      venueId: { type: String },
      venue: {
        type: Object,
        hasChanged: (newValue, oldValue) => !Object.is(newValue, oldValue)
      }
    }
  }

  _stateChanged(state) {
    const { venueId } = this
    this.venue = getVenue(state, { venueId })
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

    store.dispatch(setVenue(this.venueId, {
      name,
      width,
      height,
      modv
    }))
  }

  render() {
    const { venueId } = this
    this.venue = getVenue(store.getState(), { venueId })

    const { venue } = this

    return html`
      <style>
        .item {
          position: relative;
          background: var(--dark-primary-color);
        }
        h3 {
          display: inline;
        }

        .sticky {
          position: sticky;
          top: 0;
          z-index: 1337;
        }
      </style>


      <div class="item">

        <form @submit="${e => this.handleSubmit(e)}">
          <h3>Venue</h3>
          <label for="name">Name</label>
          <input name="name" type="text" value="${venue.name}" required />

          <label for="width">Width</label>
          <input name="width" type="number" min="1" value="${venue.width}" />

          <label for="height">Height</label>
          <input name="height" type="number" min="1" value="${venue.height}" />

          <br />

          <h3>modV</h3>
          <label for="modvWidth">Width</label>
          <input name="modvWidth" type="number" min="1" value="${venue.modv.width}" />

          <label for="modvHeight">Height</label>
          <input name="modvHeight" type="number" min="1" value="${venue.modv.height}" />

          <br />

          <button type="submit">Update</button>
        </form>
      </div>

      <ui-spacer></ui-spacer>
      
      <div class="item sticky">
        <ui-spacer></ui-spacer>
        <ui-spacer></ui-spacer>
        <modv-mapper 
          .width="${venue.modv.width}"
          .height="${venue.modv.height}"
          .slots="${venue.slots}"
        >
        </modv-mapper>
        <ui-spacer></ui-spacer>
      </div>

      <ui-spacer></ui-spacer>

      <div>
        <ui-spacer></ui-spacer>
        <venue-slot-grid
          .venueId="${venue.id}"
          .venueName="${venue.name}"
          .slots="${venue.slots}"
          .width="${venue.width}"
          .height="${venue.height}"
        >
        </venue-slot-grid>
        <ui-spacer></ui-spacer>
      </div>
        
     </div>
    `
  }
}

window.customElements.define('venue-detail-view', VenueDetailView)
