import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuid } from '../../../libs/abcq/uuid.js'
import { addScene, removeScene } from '../../actions/index.js'

/*
 *
 */
class SceneManager extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      scenes: {
        type: Array,
        statePath: 'sceneManager'
      }
    }
  }

  addScene() {
    const id = uuid()
    this.dispatch(addScene({ id, scenes: [], name: `demo scene ${id}` }))
  }

  removeScene(e) {
    const { dataset } = e.target
    this.dispatch(removeScene(parseInt(dataset.index, 10)))
  }

  static get template() {
    return `
      <button on-click="addScene">Add scene</button>

      <template is="dom-repeat" items="{{scenes}}" as="scene">
        <div>
          [[scene.name]]
          <button on-click="removeScene" data-index$="[[index]]">Remove</button>
        </div>
      </template>
    `
  }
}

customElements.define('scene-manager', SceneManager)
