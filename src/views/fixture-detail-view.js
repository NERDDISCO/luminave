import { html } from '@polymer/lit-element'
import { PageViewElement } from './page-view-element.js'
import { getFixture } from '../selectors/index.js'
import { store } from '../reduxStore.js'
import '../components/dmx-fixture/index.js'

class FixtureDetailView extends PageViewElement {

  static get properties() {
    return { fixtureId: { type: String } }
  }

  render() {
    const { fixtureId } = this

    const fixture = getFixture(store.getState(), { fixtureId })

    return html`
      <style>
        .item {
          position: relative;
          margin-top: calc(var(--padding-basic) * 2);
          padding: calc(var(--padding-basic) * 3) var(--padding-basic) var(--padding-basic) var(--padding-basic);
          border: 3px solid var(--dark-primary-color);
          background: var(--dark-primary-color);
        }

        .item::before {
          content: attr(data-name);
          position: absolute;
          top: calc(var(--padding-basic) * -3);
          overflow: visible;
          background: var(--dark-primary-color);
          color: var(--text-primary-color);
          padding: var(--padding-basic);
        }
      </style>


      <div class="item" data-name="${fixture.name}">

        <dmx-fixture
          name="${fixture.name}"
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
