import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'

/*
 * A animation list item
 */
class AnimationListItem extends PolymerElement {
  static get properties() {
    return { animation: Object }
  }

  static get template() {
    return html`
      <div>
        [[animation.name]]
      </div>
    `
  }

}

customElements.define('animation-list-item', AnimationListItem)
