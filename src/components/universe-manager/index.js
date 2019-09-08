import { LitElement, html } from 'lit-element'
import { repeat } from 'lit-html/directives/repeat.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import uuidv1 from 'uuid/v1.js'
import { addUniverse, removeUniverse, resetUniverseAndFixtures } from '../../actions/index.js'
import { getUniverses, getLive } from '../../selectors/index.js'
import '../channel-grid/index.js'

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
      name: `${id}` 
    }))
  }

  removeUniverse(e) {
    const { universeId } = e.target
    store.dispatch(removeUniverse(universeId))
  }

  resetUniverse(e) {
    store.dispatch(resetUniverseAndFixtures(0))
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

          <div>
            <channel-grid .channels="${universe.channels}"></channel-grid>
          </div>

        </div>

      `)}

    `
  }
}

customElements.define('universe-manager', UniverseManager)
