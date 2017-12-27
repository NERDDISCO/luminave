import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

/*
 * A fixture list item
 */
class FixtureListItem extends PolymerElement {
  static get properties() {
    return {
      fixture: Object
    }
  }

  static get template() {
    return `
      <div>
        [[fixture.name]]
      </div>
    `
  }

}

customElements.define('fixture-list-item', FixtureListItem)
