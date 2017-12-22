import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addScene, runScene, removeScene } from '../../actions/index.js'

/*
 * Handle a list of scenes
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
    const id = uuidV1()
    this.dispatch(addScene({ id, animations: [], name: `demo scene ${id}`, isRunning: false }))
  }

  addAnimation() {
    // @TODO: Implement
  }

  removeAnimation() {
    // @TODO: Implement
  }

  runScene(e) {
    const { dataset } = e.target
    this.dispatch(runScene(parseInt(dataset.index, 10)))
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
          <button on-click="runScene" data-index$="[[index]]">Run</button>
          <button on-click="removeScene" data-index$="[[index]]">Remove</button>

          <!-- @TODO: <animation-grid> -->
        </div>
      </template>
    `
  }
}

customElements.define('scene-manager', SceneManager)
