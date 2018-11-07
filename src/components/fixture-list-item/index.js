import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'

/*
 * A fixture list item
 */
class FixtureListItem extends LitElement {
  static get properties() {
    return { fixture: { type: Object } }
  }

  render() {
    const { fixture } = this

    return html`
      <div>
        <a href="/fixture/${fixture.id}">${fixture.name}</a>
      </div>
    `
  }

}

customElements.define('fixture-list-item', FixtureListItem)
