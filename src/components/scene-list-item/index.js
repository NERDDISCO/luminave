import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'

/*
 * A scene list item
 */
class SceneListItem extends LitElement {
  static get properties() {
    return { scene: { type: Object } }
  }

  render() {
    const { scene } = this

    return html`
      <div>
        ${scene.name}
      </div>
    `
  }

}

customElements.define('scene-list-item', SceneListItem)
