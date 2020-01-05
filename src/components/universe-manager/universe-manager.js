import { LitElement, html } from 'lit-element'
import { repeat } from 'lit-html/directives/repeat.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import uuidv1 from 'uuid/v1.js'
import { addUniverse, removeUniverse, resetUniverseAndFixtures, setChannel, setUniverse } from '../../actions/index.js'
import { getUniverses, getLive } from '../../selectors/index.js'
import '../channel-grid/channel-grid.js'
import { addToBatch } from '../../utils/index.js'

import '@polymer/paper-button/paper-button.js'
import { buttons } from '../../styles/buttons.js'

/*
 * Handle all DMX512 universes
 */
class UniverseManager extends connect(store)(LitElement) {
  static get properties() {
    return {
      universes: { type: Array },
      live: { type: Boolean }
    }
  }

  _stateChanged(state) {
    this.universes = getUniverses(state)
    this.live = getLive(state)
  }

  addUniverse() {
    const id = uuidv1()
    store.dispatch(addUniverse({ 
      id, 
      channels: [...Array(512)].map(() => 0), 
      name: `${id}`,
      refresh: true
    }))
  }

  removeUniverse(e) {
    const { universeId } = e.target
    store.dispatch(removeUniverse(universeId))
  }

  resetUniverse(e) {
    store.dispatch(resetUniverseAndFixtures(0))
  }

  /**
   * Update a specific channel. 
   * 
   * @param {Object} e - The event that contains the channel and the value
   */
  updateChannel(e) {
    const { channelIndex, channelValue } = e.detail

    store.dispatch(setChannel(0, channelIndex, channelValue))

    addToBatch(channelIndex, channelValue)

    const now = new Date()

    // Send the universe to the UsbDmxManager
    window.dispatchEvent(new CustomEvent('send-universe-to-usb-dmx-controller', { detail: { now } }))

    // Send the universe to the FivetwelveManager
    window.dispatchEvent(new CustomEvent('send-universe-to-fivetwelve', { detail: { now } }))
  }

  /**
   * Value of refresh was updated
   * 
   * @param {Object} e - The event
   */
  handleRefreshChange(e) {
    const { universeId } = e.target
    const refresh = e.target.checked

    store.dispatch(setUniverse(universeId, { refresh }))
  }

  render() {
    const { universes, live } = this

    return html`
      ${buttons}

      ${
        live 
        ? ''
        : html`<paper-button @click="${e => this.addUniverse(e)}" class="primary">Add universe</paper-button>`
      }

      ${repeat(universes, universe => html`
        <div>

          ${
            live 
            ? ''
            : html`
              <h3>${universe.name}</h3>
              <paper-button @click="${e => this.removeUniverse(e)}" .universeId="${universe.id}" class="warning">Remove</paper-button>
            `
          }

          <paper-button @click="${e => this.resetUniverse(e)}" .universeId="${universe.id}">Reset</paper-button>

          <label for="refresh">Auto-Refresh</label>
          <input 
            name="refresh" 
            type="checkbox" 
            .checked="${universe.refresh}"
            .universeId="${universe.id}"
            @click="${e => this.handleRefreshChange(e)}" />

          <div>
            <channel-grid 
              .channels="${universe.channels}"
              @update-channel="${e => this.updateChannel(e)}"
              .refresh="${universe.refresh}"
            ></channel-grid>
          </div>

        </div>

      `)}

    `
  }
}

customElements.define('universe-manager', UniverseManager)
