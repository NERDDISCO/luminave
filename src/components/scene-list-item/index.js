import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'

/*
 * A scene list item
 */
class SceneListItem extends PolymerElement {
  static get properties() {
    return {
      scene: Object
    }
  }

  static get template() {
    return html`
      <div>
        [[scene.name]]
      </div>
    `
  }

}

customElements.define('scene-list-item', SceneListItem)
