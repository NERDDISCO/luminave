import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'

/*
 * A scene list item
 */
class SceneListItem extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      scene: Object
    }
  }

  static get template() {
    return `
      <div>
        [[scene.name]]
      </div>
    `
  }

}

customElements.define('scene-list-item', SceneListItem)
