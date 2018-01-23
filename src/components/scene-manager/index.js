import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addScene, addSceneToTimeline, removeScene } from '../../actions/index.js'
import '../scene-bee/index.js'

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

  runScene(e) {
    this.dispatch(addSceneToTimeline(e.target.sceneId))
  }

  removeScene(e) {
    const { dataset } = e.target
    this.dispatch(removeScene(parseInt(dataset.index, 10)))
  }

  handleSubmit(e) {
    // Prevent sending data to server & reset all fields
    e.preventDefault()
    e.target.reset()

    this.dispatch(addScene({
      id: uuidV1(),
      fixtures: [],
      animations: [],
      duration: this.duration,
      name: this.name,
      isRunning: false
    }))
  }

  handleName(e) {
    this.name = e.target.value
  }

  handleDuration(e) {
    this.duration = e.target.value
  }

  static get template() {
    return `
      <style>
        h3 {
          margin-bottom: 0em;
          margin-top: 1em;
          border-top: 2px solid var(--background-darker);
        }
        .grid {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          flex-wrap: wrap;
        }
      </style>

      <h2>Scenes</h2>

      <form on-submit="handleSubmit">
        <label for="name">Name</label>
        <input name="name" type="text" on-change="handleName" required></input>

        <label for="duration">Duration</label>
        <input name="duration" type="number" min="0" on-change="handleDuration" required></input>

        <button type="submit">Add scene</button>
      </form>



      <div class="grid">

        <template is="dom-repeat" items="{{scenes}}" as="scene">
          <div>

            <h3>[[scene.name]] ([[scene.duration]])</h3>

            <button on-click="removeScene" data-index$="[[index]]">Remove</button>
            <button on-click="runScene" scene-id="[[scene.id]]">Run</button>

            <scene-bee
              index$="[[index]]"
              name="[[scene.name]]"
              duration="[[scene.duration]]"
              fixtures="[[scene.fixtures]]"
              animations="[[scene.animations]]"></scene-bee>

          </div>
        </template>

      </div>
    `
  }
}

customElements.define('scene-manager', SceneManager)
