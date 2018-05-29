import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addScene } from '../../actions/index.js'
import { getScenesSorted } from '../../selectors/index.js'
import '../scene-bee/index.js'

/*
 * Handle a list of scenes
 */
class SceneManager extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      scenes: {
        type: Array,
        statePath: getScenesSorted
      }
    }
  }

  handleSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

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
        :host {
          --width: 6;
        }

        @media (min-width: 1024px) {
          :host {
            --width: 10;
          }
        }

        .container {
          display: grid;
          grid-template-columns: repeat(var(--width), auto);
        }

        .item {
          border: 1px solid rgba(0, 0, 0, 0.25);
          margin: 0.15em;
          min-height: 1.5em;
          overflow: hidden;
        }
      </style>

      <form on-submit="handleSubmit">
        <label for="name">Name</label>
        <input name="name" type="text" on-change="handleName" required></input>

        <label for="duration">Duration</label>
        <input name="duration" type="number" min="0" on-change="handleDuration" required></input>

        <button type="submit">Add scene</button>
      </form>

      <br>

      <div class="container">

        <template is="dom-repeat" items="{{scenes}}" as="scene">
          <div class="item">

            <scene-bee
              index$="[[index]]"
              name="[[scene.name]]"
              id="[[scene.id]]"
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
