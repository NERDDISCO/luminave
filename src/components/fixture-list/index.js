import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import '../fixture-list-item/index.js'

/*
 * A list of fixtures
 */
class FixtureList extends LitElement {
  static get properties() {
    return {
      fixtures: { type: Array },
      fixtureManager: { type: Array }
    }
  }

  handleFixtureSubmit(e) {
    const { path } = e
    const [ form ] = path
    const [ select ] = form

    const fixtureIds = [...select.selectedOptions].map(fixture => fixture.value)

    this.dispatchEvent(new CustomEvent('add-fixtures', {
      detail: {
        event: e,
        fixtureIds
      }
    }))
  }

  handleRemoveFixture(e) {
    this.dispatchEvent(new CustomEvent('remove-fixture', {
      detail: {
        event: e,
        fixtureIndex: e.target.fixtureIndex
      }
    }))
  }

  getFixture(fixtureId) {
    return this.fixtureManager.filter(fixture => fixture.id === fixtureId)[0]
  }

  render() {
    if (this.fixtures === undefined) {
      this.fixtures = []
    }

    const { fixtureManager, fixtures } = this

    return html`
      <style>
        .items {
          display: flex;
          flex-wrap: wrap;
        }
        .item {
          flex: 0 0 2em;
        }

        .fixture-list {
          width: 120px;
          height: 120px;
        }
      </style>

      <form @submit="${e => this.handleFixtureSubmit(e)}">
        <select name="type" class="fixture-list" required multiple>
          <option value=""></option>
          ${repeat(fixtureManager, fixture => html`
            <option value="${fixture.id}">${fixture.name}</option>
          `)}
        </select>

        <button type="submit">Add fixture</button>
      </form>

      <div class="items">
        ${repeat(fixtures, fixtureId => fixtureId, (fixtureId, index) => html`
          <fixture-list-item class="item" .fixture="${this.getFixture(fixtureId)}"></fixture-list-item>
          <button @click="${e => this.handleRemoveFixture(e)}" .fixtureIndex="${index}">x</button>
        `)}
      </div>
    `
  }

}

customElements.define('fixture-list', FixtureList)
