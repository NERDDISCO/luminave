import { LitElement, html } from 'lit-element'
import { defaultValue } from '../../directives/default-value.js'

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
        ${defaultValue(scene.name, '')}
      </div>
    `
  }

}

customElements.define('scene-list-item', SceneListItem)
