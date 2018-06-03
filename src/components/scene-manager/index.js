import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addScene } from '../../actions/index.js'
import { getScenesSorted } from '../../selectors/index.js'
import '../scene-bee/index.js'

/*
 * Handle a list of scenes
 * @TODO: Allow adding multiple animations aswell
 */
class SceneManager extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      scenes: {
        type: Array,
        // @TODO: getScenesSorted has to be fixed in order to support "scene1, scene2, scene10" in correct order
        statePath: 'sceneManager'
      },
      fixtureManager: {
        type: Array,
        statePath: 'fixtureManager'
      },
      animationManager: {
        type: Array,
        statePath: 'animationManager'
      }
    }
  }

  /*
   * Add a scene
   */
  handleSubmitScene(e) {
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

  /*
   * Add a scene that has already a set of animations and fixtures
   */
  handleSubmitSceneAnimationFixtures(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)

    const duration = 20
    const name = data.get('name')

    this.dispatch(addScene({
      id: uuidV1(),
      fixtures: this.fixtures,
      animations: this.animations,
      duration,
      name,
      isRunning: false
    }))

    this.fixtures = []
    this.animations = []
  }

  /*
   * Add an animation to a scene, which will be used in handleSubmitSceneAnimationFixtures
   */
  handleAddAnimation(e) {
    const { event, animationId } = e.detail

    // Prevent sending data to server & reset all fields
    event.preventDefault()

    this.animations = [animationId]
  }

  /*
   * Add fixtures to a scene, which will be used in handleSubmitSceneAnimationFixtures
   */
  handleAddFixtures(e) {
    const { event, fixtureIds } = e.detail

    // Prevent sending data to server & reset all fields
    event.preventDefault()

    this.fixtures = fixtureIds
  }

  static get template() {
    return `
      <style>
        :host {
          --width: 4;
        }

        @media (min-width: 1024px) {
          :host {
            --width: 8;
          }
        }

        .container {
          display: grid;
          grid-template-columns: repeat(var(--width), auto);
          row-gap: calc(var(--padding-basic) * 2);
          column-gap: var(--padding-basic);
        }

        .item {
          position: relative;
          margin-top: calc(var(--padding-basic) * 2);
          padding: calc(var(--padding-basic) * 3) var(--padding-basic) var(--padding-basic) var(--padding-basic);
          border: 3px solid var(--background-dark);
          background: var(--background-dark);
        }

        .item::before {
          content: attr(data-name);
          position: absolute;
          top: calc(var(--padding-basic) * -3);
          overflow: visible;
          background: var(--background-dark);
          color: var(--color-light);
          padding: var(--padding-basic);
        }


        .flex {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
        }

        .flex-item {
          flex: 0 1em;
          margin: 0 1em 0 0;
        }

      </style>

      <form on-submit="handleSubmitScene">
        <label for="name">Name</label>
        <input name="name" type="text" on-change="handleName" required></input>

        <label for="duration">Duration</label>
        <input name="duration" type="number" min="0" on-change="handleDuration" required></input>

        <button type="submit">Add scene</button>
      </form>

      <br>

      <form on-submit="handleSubmitSceneAnimationFixtures">
        <div class="flex">

          <div class="flex-item">
            <label for="name">Name</label>
            <input name="name" type="text" on-change="handleName" required></input>
          </div>

          <div class="flex-item">
            <animation-list
              name="animation"
              on-add-animation="handleAddAnimation"
              on-remove-animation="handleRemoveAnimation"
              animations="{{animations}}"
              animation-manager$="[[animationManager]]"></animation-list>
          </div>

          <div class="flex-item">
            <fixture-list
              name="fixtures"
              on-add-fixtures="handleAddFixtures"
              on-remove-fixture="handleRemoveFixture"
              fixtures="{{fixtures}}"
              fixture-manager="[[fixtureManager]]"></fixture-list>
          </div>

          <div class="flex-item">
            <button type="submit">Add</button>
          </div>
        </div>
      </form>

      <br>

      <div class="container">

        <template is="dom-repeat" items="{{scenes}}" as="scene">
          <div class="item" data-name$="[[scene.name]]">

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
