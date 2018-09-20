import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addScene } from '../../actions/index.js'
import { getScenesSorted, getFixtures, getAnimations } from '../../selectors/index.js'
import '../scene-bee/index.js'

/*
 * Handle a list of scenes
 * @TODO: Allow adding multiple animations aswell
 */
class SceneManager extends connect(store)(LitElement) {
  static get properties() {
    return {
      scenes: { type: Array },
      fixtureManager: { type: Array },
      animationManager: { type: Array },
      _fixtures: { type: Array },
      _animations: { type: Array }
    }
  }

  _stateChanged(state) {
    this.scenes = getScenesSorted(state)
    this.fixtureManager = getFixtures(state)
    this.animationManager = getAnimations(state)
  }

  /*
   * Add a scene
   */
  handleSubmitScene(e) {
    // Prevent sending data to server
    e.preventDefault()

    store.dispatch(addScene({
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

    store.dispatch(addScene({
      id: uuidV1(),
      fixtures: this._fixtures,
      animations: this._animations,
      duration,
      name,
      isRunning: false
    }))

    this._fixtures = []
    this._animations = []
  }

  /*
   * Add an animation to a scene, which will be used in handleSubmitSceneAnimationFixtures
   */
  handleAddAnimation(e) {
    const { event, animationId } = e.detail

    // Prevent sending data to server & reset all fields
    event.preventDefault()

    this._animations = [animationId]
  }

  /*
   * Add fixtures to a scene, which will be used in handleSubmitSceneAnimationFixtures
   */
  handleAddFixtures(e) {
    const { event, fixtureIds } = e.detail

    // Prevent sending data to server & reset all fields
    event.preventDefault()

    this._fixtures = fixtureIds
  }

  render() {
    const { scenes, _animations, animationManager, _fixtures, fixtureManager } = this

    return html`
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

      <form @submit="${e => this.handleSubmitScene(e)}">
        <label for="name">Name</label>
        <input name="name" type="text" @change="${e => this.handleName(e)}" required />

        <label for="duration">Duration</label>
        <input name="duration" type="number" min="0" @change="${e => this.handleDuration(e)}" required />

        <button type="submit">Add scene</button>
      </form>

      <br>

      <form @submit="${e => this.handleSubmitSceneAnimationFixtures(e)}">
        <div class="flex">

          <div class="flex-item">
            <label for="name">Name</label>
            <input name="name" type="text" @change="${e => this.handleName(e)}" required />
          </div>

          <div class="flex-item">
            <animation-list
              name="animation"
              @add-animation="${e => this.handleAddAnimation(e)}"
              @remove-animation="${e => this.handleRemoveAnimation(e)}"
              .animations="${_animations}"
              .animationManager="${animationManager}">
            </animation-list>
          </div>

          <div class="flex-item">
            <fixture-list
              name="fixtures"
              @add-fixtures="${e => this.handleAddFixtures(e)}"
              @remove-fixture="${e => this.handleRemoveFixture(e)}"
              .fixtures="${_fixtures}"
              .fixtureManager="${fixtureManager}">
            </fixture-list>
          </div>

          <div class="flex-item">
            <button type="submit">Add</button>
          </div>
        </div>
      </form>

      <br>

      <div class="container">

        ${repeat(scenes, scene => scene.id, (scene, index) => html`

          <div class="item" data-name="${scene.name}">

            <scene-bee
              index="${index}"
              name="${scene.name}"
              id="${scene.id}"
              duration="${scene.duration}"
              .fixtures="${scene.fixtures}"
              .animations="${scene.animations}"
              .fixtureManager="${fixtureManager}"
              .animationManager="${animationManager}">
            </scene-bee>

          </div>     
        
        `)}

      </div>
    `
  }
}

customElements.define('scene-manager', SceneManager)
