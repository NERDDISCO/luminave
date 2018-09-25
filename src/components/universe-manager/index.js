import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addUniverse, removeUniverse, resetUniverseAndFixtures } from '../../actions/index.js'
import { getUniverses, getLive } from '../../selectors/index.js'
import '../channel-grid/index.js'

import '/node_modules/@polymer/paper-button/paper-button.js'
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
    const id = uuidV1()
    store.dispatch(addUniverse({ 
      id, 
      channels: [...Array(512)].map(() => 0), 
      name: `${id}` 
    }))
  }

  removeUniverse(e) {
    const { dataset } = e.target
    store.dispatch(removeUniverse(parseInt(dataset.index, 10)))
  }

  resetUniverse(e) {
    const { dataset } = e.target
    store.dispatch(resetUniverseAndFixtures(parseInt(dataset.index, 10)))
  }

  render() {
    const { universes, live } = this

    return html`
      ${buttons}

      ${
        live 
        ? ''
        : html`<paper-button @click="${(e) => this.addUniverse(e)}" class="primary">Add universe</paper-button>`
      }

      ${repeat(universes, (universe) => universe.id, (universe, index) => html`
        <div>

          ${
            live 
            ? ''
            : html`
              <h3>${universe.name}</h3>
              <paper-button @click="${(e) => this.removeUniverse(e)}" data-index="${index}" class="warning">Remove</paper-button>
            `
          }

          <paper-button @click="${(e) => this.resetUniverse(e)}" data-index="${index}">Reset</paper-button>

          <div>
            <channel-grid .channels="${universe.channels}"></channel-grid>
          </div>

        </div>

      `)}

    `
  }
}

customElements.define('universe-manager', UniverseManager)
