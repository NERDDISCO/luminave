import { LitElement, html } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "../fixture-list-item/index.js";
import { shared } from "../../styles/shared.js";

/*
 * A list of fixtures
 */
class FixtureList extends LitElement {
  static get properties() {
    return {
      fixtures: { type: Array },
      fixtureManager: { type: Array },
    };
  }

  handleFixtureSubmit(e) {
    e.preventDefault();

    const select = e.target[0];

    const fixtureIds = [...select.selectedOptions].map(
      (fixture) => fixture.value
    );

    this.dispatchEvent(
      new CustomEvent("add-fixtures", {
        detail: {
          event: e,
          fixtureIds,
        },
      })
    );
  }

  handleRemoveFixture(e) {
    const { fixtureId } = e.target;

    this.dispatchEvent(
      new CustomEvent("remove-fixture", {
        detail: {
          event: e,
          fixtureId,
        },
      })
    );
  }

  getFixture(fixtureId) {
    return this.fixtureManager.filter((fixture) => fixture.id === fixtureId)[0];
  }

  render() {
    if (this.fixtures === undefined) {
      this.fixtures = [];
    }

    const { fixtureManager, fixtures } = this;

    return html`
      ${shared}

      <style>
        .fixture-list {
          width: 160px;
          height: 120px;
        }
      </style>

      <form @submit="${(e) => this.handleFixtureSubmit(e)}">
        <select name="type" class="fixture-list" required multiple>
          <option value=""></option>
          ${repeat(
            fixtureManager,
            (fixture) => html`
              <option value="${fixture.id}">${fixture.name}</option>
            `
          )}
        </select>

        <button type="submit">Add fixture</button>
      </form>

      <div class="items">
        ${repeat(
          fixtures,
          (fixtureId) => html`
            <fixture-list-item
              class="item"
              .fixture="${this.getFixture(fixtureId)}"
            ></fixture-list-item>
            <button
              @click="${(e) => this.handleRemoveFixture(e)}"
              .fixtureId="${fixtureId}"
            >
              x
            </button>
          `
        )}
      </div>
    `;
  }
}

customElements.define("fixture-list", FixtureList);
