import { html } from '@polymer/lit-element'
import { PageViewElement } from './page-view-element.js'
import { getFixture } from '../selectors/index.js'
import { store } from '../reduxStore.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '../components/dmx-fixture/index.js'

class FixtureDetailView extends connect(store)(PageViewElement) {

  static get properties() {
    return { 
      fixtureId: { type: String },
      fixture: {
        type: Object,
        hasChanged: (newValue, oldValue) => !Object.is(newValue, oldValue)
      }
    }
  }

  _stateChanged(state) {
    const { fixtureId } = this
    this.fixture = getFixture(state, { fixtureId })
  }

  render() {
    const { fixtureId } = this
    this.fixture = getFixture(store.getState(), { fixtureId })

    const { fixture } = this

    return html`
      <style>
        .item {
          position: relative;
          margin-top: calc(var(--padding-basic) * 2);
          padding: calc(var(--padding-basic) * 3) var(--padding-basic) var(--padding-basic) var(--padding-basic);
          border: 3px solid var(--dark-primary-color);
          background: var(--dark-primary-color);
        }
      </style>


      <div class="item">

        <dmx-fixture
          .name="${fixture.name}"
          .properties="${fixture.properties}"
          id="${fixture.id}"
          type="${fixture.type}"
          address="${fixture.address}"
          universe="${fixture.universe}">
        </dmx-fixture>
        
     </div>
    `
  }
}

window.customElements.define('fixture-detail-view', FixtureDetailView)
