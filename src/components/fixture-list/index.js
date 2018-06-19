import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import '../fixture-list-item/index.js'

/*
 * A list of fixtures
 */
class FixtureList extends PolymerElement {
  static get properties() {
    return {
      fixtures: Array,
      fixtureManager: Array
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

  handleSelectedFixtures(e) {
    this.fixtureIds = e.target.selectedOptions
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

  static get template() {
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

      <form on-submit="handleFixtureSubmit">
        <select name="type" on-change="handleSelectedFixtures" class="fixture-list" required multiple>
          <option value=""></option>

          <template is="dom-repeat" items="{{fixtureManager}}" as="fixture">
            <option value="[[fixture.id]]">[[fixture.name]]</option>
          </template>
        </select>

        <button type="submit">Add fixture</button>
      </form>

      <div class="items">
        <template is="dom-repeat" items="{{fixtures}}" as="fixtureId">
          <fixture-list-item class="item" fixture="{{getFixture(fixtureId)}}"></fixture-list-item>
          <button on-click="handleRemoveFixture" fixture-index="[[index]]">x</button>
        </template>
      </div>
    `
  }

}

customElements.define('fixture-list', FixtureList)
